
const axios = require("axios");

const sendMail = async (to, subject, html) => {

  try {
    
    const response = await axios.post("https://api.brevo.com/v3/smtp/email", {
      sender: {
        name: "Shopnest Ecommerce",
        email: process.env.EMAIL_USER, 
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    },
  {
    headers:{
      "api-key": process.env.SMTP_KEY,
      "Content-Type":"application/json",
    }
  });

  console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error.message ||  error.response?.data);
  }
};

module.exports = sendMail;
