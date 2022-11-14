const pool = require("../database/transactional/dbConfig")
const { REPORTS } = require("../database/documental/dbParams")

const Behavior = require("../modelos/behavior")
const Data = require("../modelos/data")
const Report = require("../modelos/reports")

const { QUERIES } = require("../queries")

module.exports = {
    async TOP_MENU_TYPES (req, res) {
        try {
            const { query: { startDate, endDate } } = req
            const topTiposMenu = await pool.query(QUERIES.GET_TOP_MENU_TYPES(startDate, endDate))
            const mostConsumed = topTiposMenu[0]
            const lessConsumed = topTiposMenu[topTiposMenu.length - 1]
            const saveMost = await Data.create({
                name: mostConsumed[REPORTS.MENU_TYPES.REPORTS.TYPES.XAXIS],
                total: mostConsumed[REPORTS.MENU_TYPES.REPORTS.TYPES.YAXIS],
            })
            const saveLess = await Data.create({
                name: lessConsumed[REPORTS.MENU_TYPES.REPORTS.TYPES.XAXIS],
                total: lessConsumed[REPORTS.MENU_TYPES.REPORTS.TYPES.YAXIS],
            })
            const saveReport = await Report.create({
                start_date: startDate,
                end_date: endDate,
                evaluated: topTiposMenu.length,
                most: [saveMost],
                less: [saveLess],
            })
            await topTiposMenu.forEach(async item => {
                const saveTop = await Data.create({
                    name: item[REPORTS.MENU_TYPES.REPORTS.TYPES.XAXIS],
                    total: item[REPORTS.MENU_TYPES.REPORTS.TYPES.YAXIS],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: REPORTS.MENU_TYPES.REPORTS.TYPES.NAME })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topTiposMenu,
                xAxis: REPORTS.MENU_TYPES.REPORTS.TYPES.XAXIS,
                yAxis: REPORTS.MENU_TYPES.REPORTS.TYPES.YAXIS,
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
}