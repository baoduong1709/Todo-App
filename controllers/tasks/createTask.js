const db = require('../../models/index')
class CreateTaskController {
    async create(req, res) {
        let user_id = req.data.id
        let title = req.body.title;
        let description = req.body.description;
        let due_date = req.body.due_date;
        let priority_id = req.body.priority1;
        console.log('ads',req.body);
        try {
            await db.Task.create({
                user_id: user_id,
                title: title,
                description: description,
                due_date: due_date,
                priority_id: priority_id,
                status_id: 1
            });
            res.status(200).json('ok');
            return

        } catch (error){
            console.log(error);
        }
    }
}
module.exports = new CreateTaskController;