const db = require("../../models/index");
const { Op } = require("sequelize");
class ViewListTaskController {
    async view(req, res) {
        try {
            // let user_id = req.data.id;
            // let today = new Date();
            // let startOfDay = new Date(
            //     today.getFullYear(),
            //     today.getMonth(),
            //     today.getDate(),
            // );
            // let tasksToday = await db.Task.findAll({
            //     where: {
            //         user_id: user_id,
            //         due_date: {
            //             [Op.gte]: startOfDay,
            //             [Op.lt]: new Date(startOfDay.getTime() + 86400000),
            //         },
            //         completed:false
            //     },
            // });
            // let tasksFuture = await db.Task.findAll({
            //     where: {
            //         user_id: user_id,
            //         due_date: {
            //             [Op.gte]: new Date(startOfDay.getTime() + 86400000),
            //         },
            //         completed:false
            //     },
            // });
            // let tasksPrevious = await db.Task.findAll({
            //     where: {
            //         user_id: user_id,
            //         due_date: {
            //             [Op.lt]: new Date(startOfDay.getTime()),
            //         },
            //         completed:false
            //     },
            // });
            // let tasksCompleted = await db.Task.findAll({
            //     where: {
            //         user_id: user_id,
            //         updatedAt: {
            //             [Op.gte]: startOfDay,
            //             [Op.lt]: new Date(startOfDay.getTime() + 86400000),
            //         },
            //         completed:true
            //     },
            // })
            function filterTasksUncompleted(tasks) { 
                return tasks.filter(task => task.dataValues.status == 'todo'  ); 
            }
            function filterTasksCompleted(tasks) { 
                return tasks.filter(task => task.dataValues.status == 'completed'); 
            }
            function filterTasksBeforeToday(tasks) {
                const today = new Date();
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                return tasks.filter(task => new Date(task.dataValues.due_date) < startOfDay);
            }
            
            function filterTasksToday(tasks) {
                const today = new Date();
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfDay = new Date(startOfDay.getTime() + 86400000);
                console.log(startOfDay,endOfDay,tasks);
                return tasks.filter(task => {
                    const taskDate = new Date(task.dataValues.due_date);
                    return taskDate >= startOfDay && taskDate < endOfDay;
                });
            }
            
            function filterTasksAfterToday(tasks) {
                const today = new Date();
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfDay = new Date(startOfDay.getTime() + 86400000);
                return tasks.filter(task => new Date(task.dataValues.due_date) > endOfDay);
            }
            let tasks = await db.Task.findAll();
            let tasksUncompleted =  filterTasksUncompleted(tasks);
            const tasksPrevious = filterTasksBeforeToday(tasksUncompleted);
            const tasksToday = filterTasksToday(tasksUncompleted);
            const tasksFuture = filterTasksAfterToday(tasksUncompleted);
            const tasksCompleted = filterTasksCompleted(tasks)
            res.render("tasks/viewListTask", {
                tasksToday: tasksToday,
                tasksFuture: tasksFuture,
                tasksPrevious: tasksPrevious,
                tasksCompleted: tasksCompleted,
            });
        } catch {
            res.status(503).send(Error);
        }
    }
}
module.exports = new ViewListTaskController();
