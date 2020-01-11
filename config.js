const mongoose = require('mongoose')
mongoose.Promise = mongoose.Promise
require('dotenv').config()
const mongo_url = 'mongodb://127.0.0.1/NetFlixDataBase'
mongoose.connect(mongo_url, { useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify: false }).then(res => console.log('connected mongodb done')).catch(err => console.log('error in mongodb : ', err))

// mongoose.connect(process.env.MONGODB_URL, {
//     auth: {
//         user: process.env.MONGO_USER,
//         password: process.env.MONGO_PWD
//     }
// })
// mongoose.set('useFindAndModify', false);
// mongoose.set('useNewUrlParser', true);

// const db = mongoose.connection;
// db.on('error', console.log.bind(console, 'connection error'));
// db.once('open', () => {
//     console.log('\nSuccessfully connected to Mongo!\n');
// });

module.exports = mongoose