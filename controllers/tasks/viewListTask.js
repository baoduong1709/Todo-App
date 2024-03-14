const db = require("../../models/index");
const { Op } = require('sequelize');
class ViewListTaskController {
    async view(req, res) {
        try {
            let filter = req.query.filter
            let number = 0
            let page = req.query.page
            if (page > 0) {
                number = page -1;
            } else {
                number = 0
            }
            let name = req.data.name;
            let user_id = req.data.id;
            let tasksTodo = []
            if (filter == 'ASC' || filter == 'DESC') {
                tasksTodo = await db.Task.findAll({
                    where: {
                        user_id: user_id,
                        status_id: 1,
                    },
                    offset:parseInt(number)*6,
                    limit: 6,
                    order: [['title', filter]],
                });
            } else {
                tasksTodo = await db.Task.findAll({
                    where: {
                        user_id: user_id,
                        status_id: 1,
                    },
                    offset:parseInt(number)*6,
                    limit: 6,
                });
            }
            const tasksInprogress = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id: 2,
                },
                offset:parseInt(number)*6,
                limit: 6,
                order: [['title', 'DESC']]
            });
            const tasksCompleted = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id: 3,
                },
                offset:parseInt(number)*6,
                limit: 6,
            });
            let priorityTable = await db.Priority.findAll({});
            res.render("tasks/viewListTask", {
                tasksTodo: tasksTodo,
                tasksInprogress: tasksInprogress,
                tasksCompleted: tasksCompleted,
                priorityTable: priorityTable,
                name: name,
            });
        } catch {
            res.status(503).send(Error);
        }
    }
}
module.exports = new ViewListTaskController();
