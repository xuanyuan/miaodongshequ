const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    connectMongo = require('connect-mongo'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    rfs = require('rotating-file-stream'),
    history = require('connect-history-api-fallback'),
    http = require('http'),
    routes = require('./routes'),
    credentials = require('./credentials');

const app = express();
// 跨域设置
app.use('/api', cors());
// 端口
app.set('port', process.env.PORT || 8000);

// logger
switch (app.get('env')) {
    case 'development':
        // std
        app.use(morgan('combined'));
        break;
    case 'production':
        let logDirectory = path.join(__dirname, 'log');
        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        // create a rotating write stream
        let accessLogStream = rfs('access.log', {
            interval: '1d', // rotate daily
            path: logDirectory
        });
        // setup the logger
        app.use(morgan('combined', {stream: accessLogStream}));
        break;
}
// use domains for better error handling
app.use(function (req, res, next) {
    // create a domain for this request
    let domain = require('domain').create();
    // handle errors on this domain
    domain.on('error', function (err) {
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);
        try {
            // failsafe shutdown in 5 seconds
            setTimeout(function () {
                console.error('Failsafe shutdown.');
                process.exit(1);
            }, 5000);
            // disconnect from the cluster
            let worker = require('cluster').worker;
            if (worker && Object.keys(worker).length !== 0) worker.disconnect();
            // stop taking new requests
            server.close();

            try {
                // attempt to use Express error route
                next(err);
            } catch (error) {
                // if Express error route failed try plain Node response
                console.error('Express error mechanism failed.\n', error.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Server error.');
            }
        } catch (error) {
            console.error('Unable to send 500 response.\n', error.stack);
        }
    });
    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);
    // execute the rest of the request chain in the domain
    domain.run(next);
});
// session
mongoose.set('debug', credentials.mongo[app.get('env')].debug);
const mongooseOptions = {
    keepAlive: 1,
    useNewUrlParser: true
};
const MongoStore = connectMongo(session);
// session 持久化
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.createConnection(credentials.mongo[app.get('env')].connectionString, mongooseOptions)}),
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser(credentials.cookieSecret));
//请求方式为GET（前端路由请求的当然要是GET）
// 接受文件类型为text/html（即ajax请求中的dataType）
// 与options.rewrites中提供的模式不匹配（即自定义规则中没写到的
// 请求会转发到index.html
// app.use(history({
//     htmlAcceptHeaders: ['text/html']
// }));
// // 指定静态文件路径(比如样式表、图片等)
// app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// mongodb database configuration
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, mongooseOptions);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, mongooseOptions);
        break;
    default:
        throw new Error(`Unknown execution environment: ${app.get('env')}`);
}

// flash message middleware
app.use(function (req, res, next) {
    // if there's a flash message, transfer
    // it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// create "admin" subdomain...this should appear
// before all your other routes
/*
const admin = express.Router();
app.use(require('vhost')('admin.*', admin));

// create admin routes; these can be defined anywhere
admin.get('/', function (req, res) {
    res.render('admin/home');
});
admin.get('/users', function (req, res) {
    res.render('admin/users');
});
*/

// add routes
// routes(express.Router());

app.use('/', routes);
const subscriberController = require('./controller/subscriber');
const route = express.Router();
subscriberController.registerRoutes(route);
app.use(route);

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.json("Not Found");
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
// 创建server
let server;

function startServer() {
    server = http.createServer(app).listen(app.get('port'), function () {
        console.log(`Express started in ${app.get('env')} mode on port:${app.get('port')}; press Ctrl-C to terminate.`);
    });
}

if (require.main === module) {
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}
