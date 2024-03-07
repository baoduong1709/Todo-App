const db = require('../../models/index')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

class CreateUserController {
    async create(req, res) {
        console.log(req.body);
        try {
            let email = req.body.email;
            if (email === '' | email === null | email === undefined) {
                return res.status(422).json('Email is required');
            }
            let name = req.body.name;
            let password = bcrypt.hashSync(req.body.password, salt);
            let dateOfBirth = req.body.dateOfBirth
            let gender = req.body.gender
            let address = req.body.address 
            await db.User.create({
                email: email,
                name: name,
                password: password,
                dateOfBirth: dateOfBirth,
                gender: gender,
                address: address,
                is_active: false
            });
            return res.status(200).json(email)
            
        } catch (error) {
            console.log(error);
            return res.status(400).send("Error")
        }
    }
    view(req, res) {
        res.render('users/createUser');
    }
};
module.exports = new CreateUserController;