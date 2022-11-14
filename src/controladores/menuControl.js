const pool = require("../database/transactional/dbConfig")
const { QUERIES } = require("../queries")

module.exports = {
    async LIST (req, res) {
        try {
            const { body: { startDate, endDate } } = req
            const topConsumo = await pool.query(QUERIES.GET_TOP_MENUS(startDate, endDate))
            return res.status(200).json({
                topConsumo,
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
}