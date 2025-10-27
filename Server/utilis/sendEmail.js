
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, 
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
    tls: {
      rejectUnauthorized: false, 
    },
    family: 4, 
});

const sendMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Error sending email:", error); 
        if (error.response) {
            console.error("SMTP Response:", error.response);
        }
        throw new Error("Error sending email to check otp", error);
    }
}

module.exports = sendMail;