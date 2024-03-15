const EmailSender = require("../utils/sendEmail");
const SessionManager = require("../utils/sessionManager");
const db = require("../models/index");
const { randomCode } = require("../utils/randomCode");

class EmailConfirmation {
    async send(req, res, next) {
        try {
            let email = req.body.email;
            if ((await db.User.findOne({ where: { email: email } })) != null) {
                return res.status(409).json("Email already in use");
            }
            let code = randomCode(6,'integer');
            SessionManager.saveRecord(req.session, email, code);

            const subject = "Account Confirmation - Verification Code";
            const text = `Hello,\n\nWe have received your request to confirm your account on our system. To complete this process, please use the following verification code:\n\nVerification Code: ${code}\n\nPlease enter this code on our website or app to confirm your account. Ensure that you do not share this code with anyone else as it is necessary to protect your personal information.\n\nIf you did not request this code, please disregard this email and ensure that your account remains secure.\n\nThank you for using our services.\n\nBest regards,\nBao Duong\nAdmin`;
            const result = await EmailSender.sendEmail(
                process.env.ADMIN_EMAIL_ADDRESS,
                email,
                subject,
                text
            );
            req.data = code;
            next();
        } catch (error) {
            console.error("Error sending confirmation email:", error);
            return res.status(500).json("Error sending confirmation email");
        }
    }
    viewVerifyCode(req, res) {
        res.render("users/confirmEmail");
    }
    async verifyCode(req, res) {
        try {
            const code = req.body.code;
            const email = (req.body.email).replace(/\s/g, '+');
            console.log(req.session);

            if (req.session.myTable) {
                for (const record of req.session.myTable) {
                    if (record.email === email) {
                        if (code === record.code) {
                            const user = await db.User.findOne({ where: { email: email } });
                            if (!user) {
                                return res.status(500).json({msg:"Invalid Email"})
                            }
                            user.is_active = true
                            await user.save()
                            res.redirect('/user/login')
                        } else {
                            res.status(400).json({msg:"Wrong confirmation code"})
                        }
                    } else {
                        console.log("Email không tồn tại trong session");
                    }
                }
            } else {
                console.log("Bảng không tồn tại trong session");
            }
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = new EmailConfirmation();