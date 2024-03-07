let jwt = require('jsonwebtoken')
const db = require('../models/index')
require('dotenv').config();
class checkLoginEmployee{
    async check(req, res, next){
        let token = req.session.token
        let key_token = process.env.KEY_TOKEN
        try{
            if (token == undefined){
                return res.status(401).send('Chưa đăng nhập')
            }
            let tokenVerify = jwt.verify(token,key_token)
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