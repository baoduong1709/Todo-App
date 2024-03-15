
const nodemailer = require("nodemailer");

class EmailSender {
    async sendEmail(from, to, subject, text) {
        try {
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    type: "OAuth2",
                    user: from,
                    clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                },
            });
            let mailOptions = {
                from: from,
                to: to,
                subject: subject,
                text: text,
            };
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: " + info.response);
            return info.response;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

module.exports = new EmailSender();
