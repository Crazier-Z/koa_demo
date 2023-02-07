// 服务器的入口文件

// 1.创建koa实例对象
const Koa = require("koa");
const app = new Koa();
// 2.编写响应函数(绑定中间件)
// ctx:上下文，web容器,ctx.request 拿到请求对象 ctx.response 拿到响应对象
// next: 下一个中间件,下一层中间件是否能够得到执行，取决于next这个函数有没有被调用
// 绑定第一层中间件
const respDurationMiddleware = require("./middleware/koa_response_duration");
app.use(respDurationMiddleware);
// app.use((ctx, next) => {
//     console.log('第一层中间件...1');
//     ctx.response.body = 'hellow world'
//     next();
//     console.log('第一层中间件...2');
// });
// 第二层中间件
const respHeaderMiddleware = require("./middleware/koa_response_header");
app.use(respHeaderMiddleware);
// app.use(async (ctx, next) => {
//     console.log('第二层中间件...1');
//     const ret = await next();
//     console.log('ret', ret);
//     console.log('第二层中间件...2');
// });
// 第三层中间件
const respDataMiddleware = require("./middleware/koa_response_data");
app.use(respDataMiddleware);
// app.use((ctx, next) => {
//     console.log('第三层中间件');
//     return 'i love the world';
// });
// 3.绑定端口号 8888
app.listen(8888);

const WebSocket = require('ws')
// 创建WebSocket服务端的对象，绑定的端口号是9998
const wss = new WebSocket.Server({
    port: 9998
})
// 对客户端的连接事件进行监听
// client：代表的是客户端的连接socket对象
wss.on('connection', client => {
    console.log('有客户端连接成功了...');
    // 对客户端的连接对象进行message事件的监听
    // msg：由客户端发给服务端的数据
    client.on('message', msg => {
        console.log('客户端发送数据给服务端了：' + msg);
        // 由服务端往客户端发送数据
        client.send('hello socket from backend')
    })
})
