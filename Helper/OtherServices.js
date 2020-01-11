  var nodemailer = require('nodemailer');
// var hbs = require('nodemailer-express-handlebars');
var request = require('request');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mayank@itservicesindia.com',
    pass: 'itservice123'
  }
});

var data = {
  generateVerification: function (length) {
    return   new Promise((resolve, reject) => {
      var code = Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
        resolve(code);
    });
  },

  email: function (to, subect, parameters, callback) {
    return new Promise((resolve, reject) => {
      var mailOptions = {
        from: 'mayank@itservicesindia.com',
        to: to,
        subject: subect,
        html: `Hello <b>${parameters.username}</b> Your Account verification code is <b>${parameters.verification_code}<b>`,
        // template: template_name,
        // context: parameters
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(error);
        } else {
          resolve(info);
        }
      });
    })
  },
   
//   email_invitemember: function (to, subect, parameters, callback) {
//     return new Promise((resolve, reject) => {
//       //   transporter.use('compile',hbs({
//       //     viewEngine: {
//       //       extName: '.hbs',
//       //       partialsDir: path,
//       //       layoutsDir: path,
//       //       defaultLayout: template_name+'.hbs',
//       //     },
//       //     viewPath:path,
//       //     extName: '.hbs'
//       //   }))
//       var mailOptions = {
//         from: 'mayank@itservicesindia.com',
//         to: to,
//         subject: subect,
//         html: `Hello <b>${parameters.Username}</b> Officially invite at <b> ${parameters.Companyname}</b> and  your verification code is`,
//         // template: template_name,
//         // context: parameters
//       };
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           resolve(error);
//         } else {
//           resolve(info);
//         }
//       });
//     })
//   },

  ipdetails: function (ret, callback) {
    return new Promise((resolve, reject) => {
      request("https://api.ipapi.com/api/" + ret + "?access_key=6910b3ac8efdbe59198800806a38e5b7", function (error, response, body) {
        resolve(response.body);
      });
    })
  },
}

module.exports = data;