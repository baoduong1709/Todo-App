const db = require('../../models/index')
class CreateTaskController {
    async create(req, res) {
        const { title, description, due_date, priority_id } = req.body;
        let user_id = req.data.id
        try {
            await db.Task.create({
                user_id,
                title,
                description,
                due_date,
                priority_id,
                status_id: 1
            });
            res.status(200).json('ok');
        } catch (error){
            console.log(error);
        }
    }
}
module.exports = new CreateTaskController;