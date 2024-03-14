require('dotenv').config();
const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const db = require("../models/index");

class confirmEmail {
    async send(req, res, next) {
        let email = req.body.email;
        if ((await db.User.findOne({ where: { email: email } })) != null) {
            return res.status(409).json("Email already in use");
        }
        if (!req.session.myTable) {
            req.session.myTable = [];
        }
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            GOOGLE_MAILER_CLIENT_ID,
            GOOGLE_MAILER_CLIENT_SECRET
        );
        oauth2Client.setCredentials({
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        });
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                type: "OAuth2",
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: oauth2Client.getAccessToken(),
            },
        });

        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        const numberAsString = randomNumber.toString();
        req.session.myTable = req.session.myTable.filter(function(record) {
            return record.email !== email;
        });
        
        var newRecord = {
            email: email,
            code: numberAsString
        };
        req.session.myTable.push(newRecord);
        let mailOptions = {
            from: "",
            to: email,
            subject: "Account Confirmation - Verification Code",
            text: `Hello,\n\nWe have received your request to confirm your account on our system. To complete this process, please use the following verification code:\n\nVerification Code: ${numberAsString}\n\nPlease enter this code on our website or app to confirm your account. Ensure that you do not share this code with anyone else as it is necessary to protect your personal information.\n\nIf you did not request this code, please disregard this email and ensure that your account remains secure.\n\nThank you for using our services.\n\nBest regards,\nBao Duong\nAdmin`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
                req.data = numberAsString
                next();
            }
        });
    }
}

module.exports = new confirmEmail();
