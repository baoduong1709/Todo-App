const db = require('../models/index')
const {Op} = require('sequelize')
class TaskController{
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
            res.status(200).json({msg:"Create task successfully"});
        } catch (error){
            res.status(500).json({msg:"Error creating the task" })
        }
    }
    async delete(req, res) {
        try {
            let id = req.params.id;
            const task = await db.Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ msg: 'This task does not exist.'})
            }
            await task.destroy();
            res.status(200).json({msg:"Delete task successfully"});
        } catch (error) {
            res.status(500).json({msg:"Error deleting the task"})
        }
    }
    async search(req, res) {
        let user_id = req.data.id;
        try {
            const searchTerm = req.query.term;
            const results = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    title: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            });
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({msg:"Error searching the task"})
        }
    }
    async update(req, res) {
        try {
            let id = req.params.id;
            const task = await db.Task.findByPk(id);
            if (!task) {
                return  res.status(404).json({ msg: "The task you are trying to update doesn't exist." })
            }
            task.title = req.body.title;
            task.description = req.body.description;
            task.due_date = req.body.due_date;
            task.priority_id = req.body.priority1;
            task.completed = req.body.completed;
            await task.save();
            return res.status(200).json({msg:"Update task successfully"});
        } catch (error) {
            return res.status(500).json({msg:"Error updating the task"})
        }
    }
    async updateTaskStatus(req, res) {
        let id = req.params.id
        let status_id = req.body.status_id
        let x = req.body.x
        try {
            const task = await db.Task.findByPk(id);
            if (!task) {
                return;
            }
            task.status_id = parseInt(status_id) + x
            await task.save()
            return res.status(200).json({msg:"Update task's status successfully"});
        } catch (error) {
            return res.status(500).json({msg:"Error updating the task' status"})
        }
    }
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
            let commonOptions = {}
            if (filter == 'ASC' || filter == 'DESC') {
                commonOptions = {
                    order: [['title', filter]],
                }
            } else {
                commonOptions = {

                }
            }
            const tasksTodo = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id: 1,
                },
                offset:(number)*6,
                limit: 6,
                ...commonOptions,
            });
            const tasksInprogress = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id: 2,
                },
                offset:(number)*6,
                limit: 6,
                ...commonOptions,
            });
            const tasksCompleted = await db.Task.findAll({
                where: {
                    user_id: user_id,
                    status_id: 3,
                },
                offset:(number)*6,
                limit: 6,
                ...commonOptions,
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
            res.status(503).json({msg:"Error"});
        }
    }

}
module.exports = new TaskController;