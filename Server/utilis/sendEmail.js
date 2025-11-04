
const axios = require("axios");

const sendMail = async (to, subject, html) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("API_KEY loaded:", !!process.env.API_KEY);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Shopnest Ecommerce",
          email: process.env.EMAIL_USER,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
  }
};

module.exports = sendMail;
