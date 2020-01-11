// import express from 'express'
// import bodyParser from 'body-parser';
// import cors from 'cors';
// const config = require('config').server;
// const cluster = require('express-cluster');
// import routes from "./Routers/index";

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const routes = require('./Routers');
function run() {
    const app = express();
    app.set('root', `${__dirname}/..`);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cors());
    switch ("production") {
        case 'production':
            app.set('trust proxy', 'loopback');
            app.use(cors());
            // app.set('baseUrl', config.baseUrl);
            // app.use();
            app.use(routes);
            app.listen(8000, () => {
                console.log(`app running on 8000  `);
            })
            break;
        default:
            app.use(cors());
            // app.use(errorhandler());
            // app.set('baseUrl', config.baseUrl);
            app.use(require('./Routers'));
            app.listen(8888, (res) => {
                console.log(`app running on 8888, `);
                // printIp();
            });
            break;
    }
}
module.exports = run;

if (require.main === module) {
    run();
}