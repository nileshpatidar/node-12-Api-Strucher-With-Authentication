const Joi = require('joi');
const data = {
    register: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().required(),
        type: Joi.string().required()
        // email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        // phone: Joi.number().required(),
        // role: Joi.string().alphanum().min(2).max(100).required(),
        // status: Joi.string().alphanum().min(2).max(100).required()
    }),
    verify: Joi.object().keys({
        otp: Joi.number().required(),
        role: Joi.string().required()
    }),
    resendcode: Joi.object().keys({
        // otp: Joi.number().required(),
        role: Joi.string().required()
    }),
    signin: Joi.object().keys({
        // email: Joi.string().required(),
        password: Joi.string().required()
    }),
    id: Joi.object().keys({
        _id: Joi.string().required()
    }),
    role: Joi.object().keys({
        role: Joi.string().required()
    }),
}
module.exports = data;

// export default data;
