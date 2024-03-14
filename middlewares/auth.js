let jwt = require("jsonwebtoken");
const db = require("../models/index");
require("dotenv").config();
class checkLoginEmployee {
    async verifyToken(req, res, next) {
        let token = req.cookies.token;
        let key_token = process.env.KEY_TOKEN;
        try {
            if (!token) {
                return res.status(401).redirect("/user/login");
            } else {
                let tokenVerify = jwt.verify(token, key_token);
                let email = tokenVerify.email;
                await db.User.findOne({ where: { email: email } }).then(
                    (data) => {
                        if (data) {
                            req.data = data;
                            next();
                        } else {
                            return res
                                .status(404)
                                .send("Tài khoản không tồn tại");
                        }
                    }
                );
            }
        } catch (err) {
            return res.status(401).send("Token không hợp lệ");
        }
    }
    async checkLogin(req, res, next) {
        let token = req.cookies.token;
        if (!token) {
            next();
        } else {
            let key_token = process.env.KEY_TOKEN;
            try {
                let tokenVerify = jwt.verify(token, key_token);
                let email = tokenVerify.email;
                await db.User.findOne({ where: { email: email } })
                    .then(() => {
                        res.redirect('/task/view')
                    })
                    .catch(() => {
                        next()
                    });
            } catch (err) {
                return res.status(401).send("Token không hợp lệ");
            }
        }
    }
}
module.exports = new checkLoginEmployee();
