const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.USERNAME,
        pass: process.env.PASSWORD, 
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
})

const sendMail = (to, url) => {
    const mailOptions = {
        from: 'oluwadamilolaoyelade12@gmail.com',
        to, 
        subject: 'Reset Password',
        text: 'click or copy this link to rest your password  ' + url
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully" + " " + data.response);
        }
      });

}

module.exports = sendMail