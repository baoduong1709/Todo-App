let jwt = require('jsonwebtoken')
const db = require('../models/index')
class checkLoginEmployee{
    async check(req, res, next){
        let token = req.session.token
        try{
            if (token == undefined){
                return res.status(401).send('Chưa đăng nhập')
            }
            let tokenVerify = jwt.verify(token,'bao1709')
            let email = tokenVerify.email
            await db.User.findOne({ where: { email:email } })
            .then((data) =>{
                if (data){
                    req.data = data
                    next()
                }else{
                    return res.status(404).send('Tài khoản không tồn tại')
                }
            })
        }catch(err){
            return res.status(401).send('Token không hợp lệ')
        }
    }
}
module.exports = new checkLoginEmployee