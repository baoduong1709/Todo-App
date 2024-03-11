const db = require('../../models/index')

class DeleteTaskController {
    async delete(req, res) {
        try {
            let id = req.params.id;
            console.log(id);
            const task = await db.Task.findByPk(id);
            if (!task) {
                console.log('Không tìm thấy task');
                return;
            }
            await task.destroy();
            console.log('Task đã được xóa thành công');
            res.status(200).json('ok');
        } catch (error) {
            console.error('Lỗi khi xóa task:', error);
        }
    }
}
module.exports = new DeleteTaskController;