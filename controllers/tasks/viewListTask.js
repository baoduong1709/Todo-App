const db = require("../../models/index");
class ViewListTaskController {
    async view(req, res) {
        try {
            let name = req.data.name
            console.log(name);
            let user_id = req.data.id;
            let today = new Date();
            let tasksTodo = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id:1
                },
            });
            let tasksInprogress = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id:2
                },
            });
            let tasksCompleted = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id:3
                },
            })
            let priorityTable = await db.Priority.findAll({

            })
            let allTasks = await db.Task.findAll({
                where: {
                    user_id: user_id,
                },
            })
            res.render("tasks/viewListTask", {
                priorityTable: priorityTable,
                allTasks: allTasks,
                name: name
            });
        } catch {
            res.status(503).send(Error);
        }
    }
}
module.exports = new ViewListTaskController();
