const pool = require("../database/transactional/dbConfig")
const { QUERIES } = require("../queries")

module.exports = {
    async TOP_MENU_TYPES (req, res) {
        try {
            const { query: { startDate, endDate } } = req
            const topTiposMenu = await pool.query(QUERIES.GET_TOP_MENU_TYPES(startDate, endDate))
            return res.status(200).json({
                results: topTiposMenu,
                xAxis: "nombre_tipo_menu",
                yAxis: "Total Vendido",
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
}