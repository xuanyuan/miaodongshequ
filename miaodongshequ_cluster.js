const cluster = require('cluster');

function startWorker() {
    let worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

if (cluster.isMaster) {
    require('os').cpus().forEach(() => startWorker());

    // 记录所有断开的工作线程。如果工作线程断开了，他应该退出
    // 因此我们可以等待exit事件后繁衍出一个新工作线程来代替它
    cluster.on('disconnect', worker => console.log('CLUSTER: Worker %d disconnect from the cluster.', worker.id));
    cluster.on('exit', (worker, code, signal) => {
        console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
        startWorker();
    });
} else {
    // 在这个工作线程上启动我们的应用服务器，参见miaodongshequ.js
    require('./miaodongshequ')();
}
