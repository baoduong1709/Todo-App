const db = require("../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkLogin = require("../../middlewares/checkLogin");
require("dotenv").config();
class LoginUserController {
    async login(req, res) {
        let key_token = process.env.KEY_TOKEN;
        let email = req.body.email;
        let password = req.body.password;
        try {
            const acc = await db.User.findOne({ where: { email: email } });
            if (acc === null) {
                return res.status(401).json('Email or Password is incorrect!');
            } else if (acc.is_active === null) {
                return res.status(403).json('Account has not been activated');
            } else {
                let checkPassword = bcrypt.compareSync(password, acc.password);
                if (checkPassword === true) {
                    let token = jwt.sign({ email: acc.email }, key_token);
                    req.session.token = token;
                    return res.status(200).json("Logged in successfully");
                } else {
                    return res.status(401).json('password is correct')
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    view(req, res) {
        res.render("users/login", { title: "Express" });
    }
    async logout(req, res) {
        await req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('asddas');
                return res.status(200)
            }
        });
    }
}
module.exports = new LoginUserController();
