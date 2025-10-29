const sgMail =  require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, templateId, dynamicData) => {
    try {
        const msg = {
            to,
            from: process.env.EMAIL_USER,
            templateId,
            dynamic_template_data: dynamicData,

        }

        await sgMail.send(msg);
        
    } catch (error) {
        console.error('Error sending email:', error.response?.body || error.message);
    }
}

module.exports = sendMail;

