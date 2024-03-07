const db = require("../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config()
class LoginUserController {
    async login(req, res) {
        let key_token = process.env.KEY_TOKEN
        let email = req.body.email;
        try {
            const acc = await db.User.findOne({ where: { email: email } });
            if (acc === null) {
                return res.status(401);

            } else if (acc.is_active === null) { 
                return res.status(403)
                
            } else {
                let checkPassword = bcrypt.compareSync(
                    req.body.password,
                    acc.password
                );
                if (checkPassword === true) {
                    let token = jwt.sign({ email: acc.email }, key_token);
                    req.session.token = token;
                    return res.status(200);
                } else {
                    return res.status(401);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    view(req, res) {
        res.render("users/login", { title: "Express" });
    }
}
module.exports = new LoginUserController();
