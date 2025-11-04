const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {

  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.SMTP_KEY,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Shopnest Ecommerce" <${process.env.EMAIL_USER}>`,
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
