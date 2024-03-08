const db = require('../../models/index')
class UpdateTaskController {
    async update(req, res) {
        try {
            let id = req.params.id;
            const task = await db.Task.findByPk(id);
            if (!task) {
                console.log('Không tìm thấy task');
                return;
            }
            task.title = req.body.title;
            task.description = req.body.description;
            task.due_date = req.body.due_date;
            task.priority = req.body.priority1;
            task.completed = req.body.completed;
            await task.save();
            res.status(200).json('ok');
        } catch (error) {
            console.error('Lỗi khi xóa task:', error);
        }
    }
    async updateTaskStatus(req, res) {
        let id = req.params.id
        let status_id = req.body.status_id
        let x = req.body.x
        try {
            const task = await db.Task.findByPk(id);
            if (!task) {
                console.log('Không tìm thấy task');
                return;
            }
            task.status_id = parseInt(status_id) + x
            await task.save()
            console.log('Task đã được xóa thành công');
            res.status(200).json('ok');
        } catch (error) {
            console.error('Lỗi khi xóa task:', error);
        }
    }
}
module.exports = new UpdateTaskController;