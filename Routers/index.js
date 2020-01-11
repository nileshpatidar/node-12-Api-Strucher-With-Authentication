var app = module.exports = require('express')();


app.get('/nilesh', (req, res) => { res.send({ msg: 'hello! Server is up and running' }) });


app.use('/auth', require('./Authenticate'));
app.all('*', (req, res) => { res.status(404).send({ msg: 'Not found' }) });
