// 'use strict';
// const nodemailer = require('nodemailer');
//
// const output = (
//     <p>hello</p>
// );
//
// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     host: 'mail.google.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'lopresti.chris@gmail.com' // generated ethereal user
//         pass: 'ctrock21' // generated ethereal password
//     }
// });
//
// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"Smoke N\' Mirrors Contact Form" <lopresti.chris@gmail.com>', // sender address
//     to: 'lopresti.chris@yahoo.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: output // html body
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// });
