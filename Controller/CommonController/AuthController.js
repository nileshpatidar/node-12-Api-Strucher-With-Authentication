// import { signup } from '../../Services/AuthService'
// import validate from '../../Helper/JoiValidation'
// import { customError } from '../../Helper/Common'

const { signup, verifyuser, resendCode, signin ,UserProfile ,UserforgetPassword} = require('../../Services/AuthService');
const validate = require('../../Helper/JoiValidation');
const customResponceHandler = require('../../Helper/Common');
const Joi = require('joi');

const register = async (req, res) => {
    const datavalidate = { password: req.body.password, username: req.body.username, type: req.body.type }
    const result = Joi.validate(datavalidate, validate.register);
    if (result.error) return customResponceHandler(res, { statusCode: 422, result })
    if (req.body.type === 'mobile') {
        datavalidate.phone = req.body.phone
    }
    if (req.body.type === 'email') {
        datavalidate.email = req.body.email
    }
    if (req.body.email || req.body.phone) {
        signup(datavalidate).then((user) => {
            return customResponceHandler(res, { statusCode: 200, result: user })
        }).catch((err) => {
            return customResponceHandler(res, err.statusCode ? err : { statusCode: 400 })
        })
    }
}

const verification = async (req, res) => {
    const datavalidate = { otp: req.body.otp, role: req.body.role }
    const result = Joi.validate(datavalidate, validate.verify);
    if (result.error) return customResponceHandler(res, { statusCode: 422, result })
    if (req.body.phone) {
        datavalidate.phone = req.body.phone
    }
    if (req.body.email) {
        datavalidate.email = req.body.email
    }
    datavalidate.ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    datavalidate.ua = req.headers['user-agent'];
    verifyuser(datavalidate).then((user) => {
        return customResponceHandler(res, user.statusCode ? user : { statusCode: 200, result: user })
    }).catch((err) => {
        return customResponceHandler(res, err.statusCode ? err : { statusCode: 400 })
    })
}

const resendOtp = async (req, res) => {
    const datavalidate = { role: req.body.role }
    const result = Joi.validate(datavalidate, validate.resendcode);

    if (result.error) return customResponceHandler(res, { statusCode: 422, result })
    if (req.body.phone) {
        datavalidate.phone = req.body.phone
    }
    if (req.body.email) {
        datavalidate.email = req.body.email
    }
    resendCode(datavalidate).then(code => {
        return customResponceHandler(res, { statusCode: 204, message: "sent" })
    }).catch(err => {
        return customResponceHandler(res, err.statusCode ? err : { statusCode: 400 })
    })


}

const login = async (req, res) => {
    const datavalidate = { password: req.body.password }
    const result = Joi.validate(datavalidate, validate.signin);
    if (result.error) return customResponceHandler(res, { statusCode: 422, result })
    datavalidate.ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    datavalidate.ua = req.headers['user-agent'];
    if (req.body.phone ) {
        datavalidate.phone = req.body.phone
    }
    if (req.body.email  ) {
        datavalidate.email = req.body.email
    }
    signin(datavalidate).then(userlogin => {
        return customResponceHandler(res, { statusCode: 200, result: userlogin })
    }).catch(err => {
        return customResponceHandler(res, err.statusCode ? err : { statusCode: 400 })
    })
}



const UserDetailsUpdate = async (req, res) => {

}

const getUserProfile =async (req,res)=>{
    const datavalidate = { _id: req.query._id }
    const result = Joi.validate(datavalidate, validate.id);
    if (result.error) return customResponceHandler(res, { statusCode: 422, result })
    UserProfile(req.query._id).then(details=>{
       if(details){return customResponceHandler(res, { statusCode: 200, result: details })}
    }).catch(err=>{
        return customResponceHandler(res, err.statusCode ? err : { statusCode: 400 })
        
    })
}
const forgetPassword = async (req, res) => {
    const datavalidate = {role: req.body.role }
    const result = Joi.validate(datavalidate, validate.role);
    if (result.error) return customResponceHandler(res, { statusCode: 422, result })
    UserforgetPassword(req.body).then(details=>{
        if(details){return customResponceHandler(res, { statusCode: 200, result: details })}
     }).catch(err=>{
         console.log(err);
         
         return customResponceHandler(res, err.statusCode ? err : { statusCode: 400 ,err:err})
     })
}



module.exports = {
    register,
    verification,
    resendOtp,
    login,
    UserDetailsUpdate,
    getUserProfile,
    forgetPassword
}