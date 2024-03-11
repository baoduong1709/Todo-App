const db = require('../../models/index')
const { Op } = require('sequelize');

class SearchTaskController {
    async search(req, res) {
        try {
            const searchTerm = req.query.term;
            const results = await db.Task.findAll({
                where: {
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