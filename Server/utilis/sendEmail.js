const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);


const sendMail = async (to, subject, text) => {
  try {
    await resend.emails.send({
      from: '<onboarding@resend.dev>',
      to,
      subject,
      text,
    });
    console.log("Email sent successfully via Resend!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendMail;
