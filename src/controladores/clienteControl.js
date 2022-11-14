const pool = require("../database/transactional/dbConfig")
const { QUERIES } = require("../queries")

module.exports = {
    async TOP_MENUS (req, res) {
        try {
            const { body: { startDate, endDate, telCliente } } = req
            const topConsumo = await pool.query(QUERIES.GET_TOP_MENUS_BY_CLIENT(startDate, endDate, telCliente))
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