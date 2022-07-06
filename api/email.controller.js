const emailTransporter = require("../utils/emailTransporter");
const emailOptions = require("../constants/mailOptions");

const messageBodyTemplate = (name, email, phone, message) => {
  return `
  <body>
    <p>${message}</p>
    <br />
    <p></p>
    <p>name: ${name}</p>
    <p>email: ${email}</p>
    <p>phone: ${phone}</p>
  </body>
`;
};

module.exports = {
  sendEmailNotification: async (request, response) => {
    const contactOptions = { ...emailOptions };
    const { message, name, email, phone } = request.body;
    contactOptions.html = messageBodyTemplate(name, email, phone, message);

    emailTransporter.sendMail(contactOptions, (error, data) => {
      if (error) {
        console.log("Error " + error);
        throw error;
      } else {
        console.log("Email sent successfully");
        return response.status(200).json({ msg: "email sent" });
      }
    });
    // return ;
  },
};
