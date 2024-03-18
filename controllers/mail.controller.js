const EmailSender = require("../utils/sendEmail");
const SessionManager = require("../utils/sessionManager");
const db = require("../models/index");
const { randomCode } = require("../utils/randomCode");
const ejs = require('ejs');
const fs = require('fs');

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
            const ejsTemplate = fs.readFileSync('views/confirmation_email.ejs', 'utf8');
            const html = ejs.render(ejsTemplate, { code });
            await EmailSender.sendEmail(
                process.env.ADMIN_EMAIL_ADDRESS,
                email,
                subject,
                html
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
            if (req.session.myTable) {
                let emailFound = false;
                for (const record of req.session.myTable) {
                    if (record.email === email) {
                        emailFound = true;
                        if (code === record.code) {
                            const user = await db.User.findOne({ where: { email: email } });
                            if (!user) {
                                return res.status(500).json({msg:"Invalid Email"})
                            }
                            user.is_active = true
                            await user.save()
                            return res.redirect('/users/login')
                        } else {
                            return res.status(400).json({msg:"Wrong confirmation code"})
                        }
                    }
                }
                if (!emailFound) {
                    return res.status(500).json({msg:"Email not found in session."});
                }
            } else {
                return res.status(500).json({ msg: "Session data is empty!" })
            }
            
        } catch (error) {
            console.error(error);
            return
        }
    }
}

module.exports = new EmailConfirmation();
