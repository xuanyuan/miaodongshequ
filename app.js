const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const routes = require('./routes');
const history = require('connect-history-api-fallback');

// 启用压缩，尽量在其他中间件前使用compression
app.use(compression());

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(history());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// 指定静态文件路径(比如样式表、图片等)
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', routes);

// 默认路径
app.get('/', function(req, res) {
    res.send('Not Found');
});

app.listen(app.get('port'), () => {
    console.log('app listening at port: %s', app.get('port'));
});