const app =module.exports= require("express").Router();
// import express  from 'express';
// var router =  module.exports =require("express").Router();
// const app = module.exports = require('express')();
// import { register } from '../Controller/CommonController/AuthController.js'
const {middelware} =require('./midddelware')
const {register,verification,resendOtp,login,getUserProfile,forgetPassword} =require('../Controller/CommonController/AuthController.js')

app.post('/signup' ,register)
app.post('/verifyuser' ,verification)
app.post('/resendOtp' ,resendOtp)
app.post('/signin' ,login)
app.get('/profile' ,middelware ,getUserProfile)
app.get('/forgetPassword' ,forgetPassword)


// export default app