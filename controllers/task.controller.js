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
            res.status(200).json('Create a successful mission');
        } catch (error){
            
        }
    }
}
module.exports = new TaskController;