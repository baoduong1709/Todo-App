const { checkStringLength } = require("../utils/checkStringLength");

class ValidateMiddleware {
    validateTaskData(req, res, next) {
        const { title, due_date, priority_id, description } = req.body;
        if (!title || !due_date || !priority_id) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        if (checkStringLength(title, 100) === true) { 
            return res.status(400).json({ msg: 'Title should be less than or equal to 100 characters' });
        }
        if (checkStringLength(description, 255) === true) {
            return res.status(400).json({ msg:'Description should be less than or equal to 255 characters' });
        }
        next();
    }
    
    validateUserData(req, res, next) {
        const { name, password, email, dateOfBirth, gender, address } = req.body;
        if (!name || !password || !email || !dateOfBirth || !gender || !address) {
            return res.status(400).json({ msg: "Missing required fields" });
        }
        if (checkStringLength(name, 50) === true) {
            return res.status(400).json({ msg: "Name should be less than or equal to 50 characters" });
        }
        if (checkStringLength(password, 255) === true) {
            return res.status(400).json({ msg: "Name should be less than or equal to 255 characters" });
        }
        if (checkStringLength(email, 50) === true) {
            return res.status(400).json({ msg: "Email should be less than or equal to 50 characters" });
        }
        if (checkStringLength(address, 100) === true) {
            return res.status(400).json({ msg: "Email should be less than or equal to 100 characters" });
        }
        next();
    }
}

module.exports = new ValidateMiddleware();
