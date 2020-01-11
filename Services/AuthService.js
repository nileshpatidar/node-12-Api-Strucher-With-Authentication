// import { customError } from '../Helper/Common.js'
// import { findUserByUsername } from '../Model/Query/index.js'
const { findUserByEmail, UserRegister, updateuserDetails,
  LoginLogSave, findVerificationCode, findUserWithArgu, findUserDetails } = require('../Model/Query/index.js').auth;
const OtherServices = require('../Helper/OtherServices');
let jwt = require('jsonwebtoken');
require('dotenv').config()
var SECRET_KEY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

var md5 = require('md5');


function signup(data) {
  return findUserByEmail(data)
    .then(async (user) => {
      if (user) return Promise.reject(({ statusCode: 409, result: `User with this ${data.email || data.phone} already exists` }));
      data.verification_code = await OtherServices.generateVerification("6")
      return UserRegister(data).then(registered => {
        var users = { ...registered._doc }
        delete users.role
        delete users.password
        delete users.isVerified
        users.type === 'email' ? (OtherServices.email(users.email, `Verification Code ${users.verification_code}`, users)) : "here is the mobile otp code "
        delete users.verification_code
        return users
      })
    }).catch(Error => {
      return Promise.reject(Error.message);
    })
}

function verifyuser(data) {
  return findUserByEmail(data)
    .then(async (user) => {
      if (!user) {
        return Promise.reject(({ statusCode: 404, result: `User with this ${data.email || data.phone} Not exists` }));
      } else if (user.isVerified) {
        return Promise.resolve(({ statusCode: 201, result: `User with this ${data.email || data.phone} Verified` }));
      } else {
        if (data.otp !== user.verification_code) { return Promise.reject(({ statusCode: 400, result: `Invalid Verification Code` })) }

        return updateuserDetails(user._id, { isVerified: true }).then(async updatestatus => {
          var ret = data.ip.replace('::ffff:', '');
          /*PLEASE cheange on live time  var =>   ret in parameter insted of static ip address 
                                                 /\'182.70.122.187'
                                                 ||                                                     */
          var details = await OtherServices.ipdetails(ret);
          var ip_data = JSON.parse(details);
          var i_p = ip_data.ip;
          var country = ip_data.country_name;
          var city = ip_data.city;
          var latitude = ip_data.latitude;
          var longitude = ip_data.longitude;
          var time_zone = ip_data.time_zone.current_time;
          var ua = data.ua

          var browser = '';
          if (/firefox/i.test(ua))
            browser = 'firefox';
          else if (/chrome/i.test(ua))
            browser = 'chrome';
          else if (/safari/i.test(ua))
            browser = 'safari';
          else if (/msie/i.test(ua))
            browser = 'msie';
          else
            browser = 'unknown';
          var date = new Date();
          var timestamp = date.getTime();
          let secret_key =  jwt.sign({ auth :user._id + timestamp},process.env.SECRET_KEY  , { expiresIn: '6m' });

          // var secret_key = md5(user._id + timestamp);
          var loginlog = {
            user_id: user._id,
            ip_address: i_p,
            country: country,
            city: city,
            latitude: latitude,
            longitude: longitude,
            time_zone: time_zone,
            web_browser: browser,
            operating_system: process.platform,
            platform: process.platform,
            your_port: "",
            secret_key: secret_key,
            device_token: data.device_token,
            role: user._id.role
          };
          // let save_log = new LogModel(loginlog);
          // save_log.save();
          await LoginLogSave(loginlog)
          var users = { ...updatestatus._doc }
          delete users.role
          delete users.password
          delete users.isVerified
          delete users.verification_code
          var userdata = {
            user_id: updatestatus._id,
            username: updatestatus.username,
            role: updatestatus.role,
            email: updatestatus.email,
            phone: updatestatus.phone,
            profile_image: updatestatus.profile_image,
            // parent_id: updatestatus.parent_id,
            key: secret_key,
          };
          return userdata
        })
      }

    })
}

function resendCode(data) {
  return findVerificationCode(data).then(async (code) => {
    if (!code) return Promise.reject(({ statusCode: 404, result: `User with this ${data.email || data.phone} Not exists` }));
    const vcode = await OtherServices.generateVerification("6")
    return updateuserDetails(user._id, { verification_code: vcode }).then(updatestatus => {
      updatestatus.type === 'email' ? OtherServices.email(updatestatus.email, `Resended Verification Code ${updatestatus.verification_code}`, updatestatus) : "here is the mobile otp code "
      return Promise.resolve(code);
    })
    // return code
  }).catch(Error => {
    return Promise.reject(Error.message);
  })
}

function signin(data) {
  return findUserWithArgu(data)
    .then(async (user) => {
      if (!user) return Promise.reject(({ statusCode: 404, result: `Account with this ${data.email || data.phone} Not Found ` }));
      if (user.password !== md5(data.password)) return Promise.reject(({ statusCode: 406, result: `Invalid Credential` }));
      if (!user.isVerified) {
        user.type === 'email' ? (OtherServices.email(user.email, `Verification Code ${user.verification_code}`, user)) : "here is the mobile otp code "
        return Promise.reject(({ statusCode: 403, result: `Please verify your Account, code sended to Register user.type` }));
      } else {
        var ret = data.ip.replace('::ffff:', '');
        /*PLEASE cheange on live time  var =>   ret in parameter insted of static ip address 
                                               /\'182.70.122.187'
                                               ||                                                     */
        var details = await OtherServices.ipdetails(ret);
        var ip_data = JSON.parse(details);
        var i_p = ip_data.ip;
        var country = ip_data.country_name;
        var city = ip_data.city;
        var latitude = ip_data.latitude;
        var longitude = ip_data.longitude;
        var time_zone = ip_data.time_zone.current_time;
        var ua = data.ua

        var browser = '';
        if (/firefox/i.test(ua))
          browser = 'firefox';
        else if (/chrome/i.test(ua))
          browser = 'chrome';
        else if (/safari/i.test(ua))
          browser = 'safari';
        else if (/msie/i.test(ua))
          browser = 'msie';
        else
          browser = 'unknown';
        var date = new Date();
        var timestamp = date.getTime();
        let secret_key =  jwt.sign({ auth :user._id + timestamp},process.env.SECRET_KEY  , { expiresIn: '6m' });
        // var secret_key = md5(user._id + timestamp);
        var loginlog = {
          user_id: user._id,
          ip_address: i_p,
          country: country,
          city: city,
          latitude: latitude,
          longitude: longitude,
          time_zone: time_zone,
          web_browser: browser,
          operating_system: process.platform,
          platform: process.platform,
          your_port: "",
          secret_key: secret_key,
          device_token: data.device_token,
          role: user.role
        };
        // let save_log = new LogModel(loginlog);
        // save_log.save();
        await LoginLogSave(loginlog)
        var users = { ...user._doc }
        delete users.role
        delete users.password
        delete users.isVerified
        delete users.verification_code
        var userdata = {
          user_id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
          phone: user.phone,
          profile_image: user.profile_image,
          secret_key: secret_key,
          // parent_id: user.parent_id,
        };
        return userdata;
      }

    }).catch(Error => {
      console.log(Error);

      return Promise.reject(Error.message);
    })
}
function UserProfile(id) {
  return findUserDetails(id).then(detail => {
    if (!detail) return Promise.reject(({ statusCode: 404, result: `No Information Found` }));
    var userdata = {
      user_id: detail._id,
      username: detail.username,
      role: detail.role,
      email: detail.email,
      phone: detail.phone,
      profile_image: detail.profile_image,
    };
    return Promise.resolve(userdata)
  }).catch(Error => {
    return Promise.reject(Error.message);
  })
}

function UserforgetPassword(data) {
  return findUserByEmail(data).then(async detail => {
    if (!detail) return Promise.reject(({ statusCode: 404, result: 'Email-ID not found' }));
    var vcode = await OtherServices.generateVerification("6")
    return updateuserDetails(detail._id, { verification_code: vcode }).then(updatestatus => {
      updatestatus.type === 'email' ? OtherServices.email(updatestatus.email, `Resended Verification Code ${updatestatus.verification_code}`, updatestatus) : "here is the mobile otp code "
      return Promise.resolve(true);
    })
  }).catch(Error => {
    return Promise.reject(Error.message);
  })
}





module.exports = { signup, verifyuser, resendCode, signin, UserProfile, UserforgetPassword }