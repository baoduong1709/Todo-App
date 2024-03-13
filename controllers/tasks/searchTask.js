const db = require('../../models/index')
const { Op } = require('sequelize');

class SearchTaskController {
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
            res.json(results);
        } catch (error) {
            console.error('Lỗi khi xóa task:', error);
        }
    }
}
module.exports = new SearchTaskController;