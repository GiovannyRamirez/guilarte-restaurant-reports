const pool = require("../database/transactional/dbConfig")
const { REPORTS } = require("../database/documental/dbParams")

const Behavior = require("../modelos/behavior")
const Data = require("../modelos/data")
const Report = require("../modelos/reports")

const { QUERIES } = require("../queries")

module.exports = {
    async TOP_MENUS (req, res) {
        try {
            const { query: { startDate, endDate } } = req
            const topConsumo = await pool.query(QUERIES.GET_TOP_MENUS(startDate, endDate))
            const mostConsumed = topConsumo[0]
            const lessConsumed = topConsumo[topConsumo.length - 1]
            const saveMost = await Data.create({
                name: mostConsumed[REPORTS.MENUS.REPORTS.CONSUMED.XAXIS],
                total: mostConsumed[REPORTS.MENUS.REPORTS.CONSUMED.YAXIS],
            })
            const saveLess = await Data.create({
                name: lessConsumed[REPORTS.MENUS.REPORTS.CONSUMED.XAXIS],
                total: lessConsumed[REPORTS.MENUS.REPORTS.CONSUMED.YAXIS],
            })
            const saveReport = await Report.create({
                start_date: startDate,
                end_date: endDate,
                evaluated: topConsumo.length,
                most: [saveMost],
                less: [saveLess],
            })
            await topConsumo.forEach(async item => {
                const saveTop = await Data.create({
                    name: item[REPORTS.MENUS.REPORTS.CONSUMED.XAXIS],
                    total: item[REPORTS.MENUS.REPORTS.CONSUMED.YAXIS],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: REPORTS.MENUS.REPORTS.CONSUMED.NAME })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topConsumo,
                xAxis: REPORTS.MENUS.REPORTS.CONSUMED.XAXIS,
                yAxis: REPORTS.MENUS.REPORTS.CONSUMED.YAXIS,
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
    async MOST_VALUED_MENU (req, res) {
        try {
            const { query: { startDate, endDate } } = req
            const topValor = await pool.query(QUERIES.GET_MOST_VALUED_MENUS(startDate, endDate))
            const mostPaid = topValor[0]
            const lessPaid = topValor[topValor.length - 1]
            const saveMost = await Data.create({
                name: mostPaid[REPORTS.MENUS.REPORTS.PAYS.XAXIS],
                total: mostPaid[REPORTS.MENUS.REPORTS.PAYS.YAXIS],
            })
            const saveLess = await Data.create({
                name: lessPaid[REPORTS.MENUS.REPORTS.PAYS.XAXIS],
                total: lessPaid[REPORTS.MENUS.REPORTS.PAYS.YAXIS],
            })
            const saveReport = await Report.create({
                start_date: startDate,
                end_date: endDate,
                evaluated: topValor.length,
                most: [saveMost],
                less: [saveLess],
            })
            await topValor.forEach(async item => {
                const saveTop = await Data.create({
                    name: item[REPORTS.MENUS.REPORTS.PAYS.XAXIS],
                    total: item[REPORTS.MENUS.REPORTS.PAYS.YAXIS],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: REPORTS.MENUS.REPORTS.PAYS.NAME })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topValor,
                xAxis: REPORTS.MENUS.REPORTS.PAYS.XAXIS,
                yAxis: REPORTS.MENUS.REPORTS.PAYS.YAXIS,
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    }
}