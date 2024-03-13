const db = require("../../models/index");
class ConfirmEmailController {
    view(req, res) {
        res.render("users/confirmEmail");
    }
    async verify(req, res) {
        try {
            const code = req.body.code;
            const email = req.body.email;
            
            if (req.session.myTable) {
                for (const record of req.session.myTable) {
                    if (record.email === email) {
                        console.log("Code:", record.code);
                        if (code === record.code) {
                            const user = await db.User.findOne({ where: { email: email } });
                            if (!user) {
                                return
                            }
                            user.is_active = true
                            await user.save()
                            res.redirect('/user/login')
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
module.exports = new ConfirmEmailController();
