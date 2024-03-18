const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);

class UserController {
    async create(req, res) {
        try {
            console.log('1');
            let email = req.body.email;
            if ((email === "") | (email === null) | (email === undefined)) {
                return res.status(422).json("Email is required");
            }
            let name = req.body.name;
            let password = bcrypt.hashSync(req.body.password, salt);
            let dateOfBirth = req.body.dateOfBirth;
            let gender = req.body.gender;
            let address = req.body.address;
            await db.User.create({
                email: email,
                name: name,
                password: password,
                dateOfBirth: dateOfBirth,
                gender: gender,
                address: address,
                is_active: false,
            });
            return res.status(200).json(email);
        } catch (error) {
            console.log(error);
            return res.status(400).json({msg:"Error creating user"});
        }
    }
    viewCreateUser(req, res) {
        res.render("users/createUser");
    }
    async login(req, res) {
        let key_token = process.env.KEY_TOKEN;
        let email = req.body.email;
        let password = req.body.password;
        try {
            const acc = await db.User.findOne({ where: { email: email } });
            if (!acc) {
                return res.status(401).json({ msg: "Invalid Email" });
            } else if (acc.is_active === 0) {
                return res
                    .status(403)
                    .json({ msg: "Account has not been activated" });
            } else {
                let checkPassword = bcrypt.compareSync(password, acc.password);
                if (checkPassword === true) {
                    let token = jwt.sign({ email: acc.email }, key_token);
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                    });
                    return res
                        .status(200)
                        .json({ msg: "Logged in successfully" });
                } else {
                    return res.status(401).json({ msg: "Password is correct" });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    viewLoginUser(req, res) {
        res.render("users/login", { title: "Express" });
    }
    logout(req, res) {
        return res.clearCookie("token").status(200).json({ msg: "Logout  Successfully" });
    }
}
module.exports = new UserController();
