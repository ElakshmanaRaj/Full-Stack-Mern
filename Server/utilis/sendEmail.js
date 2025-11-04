const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {

  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.SMTP_KEY,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html, 
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendMail;
