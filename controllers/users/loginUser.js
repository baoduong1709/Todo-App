const db = require("../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class LoginUserController {
    async login(req, res) {
        let email = req.body.email;
        try {
            const acc = await db.User.findOne({ where: { email: email } });
            if (acc === null) {
                return res.status(401).send("Email is incorrect");
            } else {
                let checkPassword = bcrypt.compareSync(
                    req.body.password,
                    acc.password
                );
                if (checkPassword === true) {
                    let token = jwt.sign({ email: acc.email }, "bao1709");
                    req.session.token = token;
                    return res.status(200).json("Logged in successfully");
                } else {
                    return res.status(401).json("Password is incorrect");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    view(req, res) {
        console.log('teedt');
        res.render("users/login", { title: "Express" });
    }
}
module.exports = new LoginUserController();
