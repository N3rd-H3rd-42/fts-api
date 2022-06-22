const emailTransporter = require('../../utils/emailTransporter');
const emailOptions = require('../../constants/mailOptions');

module.exports = {
    sendEmailNotification: async (request, response) => {
        emailTransporter.sendMail(emailOptions, (error, data) => {
            if (err) {
                console.log("Error " + error);
                throw error;
              } else {
                console.log("Email sent successfully");
                return;
              }
        })
        return response.status(200).json({ msg: 'email sent'});
    }
}