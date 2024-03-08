const db = require("../../models/index");
const { Op } = require("sequelize");
class ViewListTaskController {
    async view(req, res) {
        try {
            let user_id = req.data.id;
            let today = new Date();
            let startOfDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
            );
            let tasksTodo = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id:1
                },
            });
            let tasksInprogress = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id:3
                },
            });
            let tasksCompleted = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id:2
                },
            })
            res.render("tasks/viewListTask", {
                tasksTodo: tasksTodo,
                tasksInprogress: tasksInprogress,
                tasksCompleted: tasksCompleted,
            });
        } catch {
            res.status(503).send(Error);
        }
    }
}
module.exports = new ViewListTaskController();
