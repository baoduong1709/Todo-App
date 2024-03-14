class ValidateMiddleware{
    validateTaskData(req, res, next) {
        console.log('asdadadasda',req.body);
        const { title, due_date, priority_id } = req.body
        if (!title || !due_date || !priority_id) {
            console.log('asdad');
            return res.status(400).json({message: 'Missing required fields'})
        } else {
            console.log('asdad');
            console.log(req.data.id);
            next()
        }
    }
}
module.exports = new ValidateMiddleware;