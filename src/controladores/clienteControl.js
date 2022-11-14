const pool = require("../database/transactional/dbConfig")

const Behavior = require("../modelos/behavior")
const Data = require("../modelos/data")
const Report = require("../modelos/reports")

const { QUERIES } = require("../queries")

module.exports = {
    async TOP_MENUS (req, res) {
        try {
            const { query: { startDate, endDate, telCliente } } = req
            const topConsumo = await pool.query(QUERIES.GET_TOP_MENUS_BY_CLIENT(startDate, endDate, telCliente))
            const mostConsumed = topConsumo[0]
            const lessConsumed = topConsumo[topConsumo.length - 1]
            const saveMost = await Data.create({
                name: mostConsumed.nombre_menu,
                total: mostConsumed["Total Ordenado"],
            })
            const saveLess = await Data.create({
                name: lessConsumed.nombre_menu,
                total: lessConsumed["Total Ordenado"],
            })
            const saveReport = await Report.create({
                start_date: startDate,
                end_date: endDate,
                evaluated: topConsumo.length,
                most: [saveMost],
                less: [saveLess],
                additional: `Teléfono Cliente: ${telCliente}`,
            })
            await topConsumo.forEach(async item => {
                const saveTop = await Data.create({
                    name: item.nombre_menu,
                    total: item["Total Ordenado"],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: "Top Menús Clientes" })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topConsumo,
                xAxis: "nombre_menu",
                yAxis: "Total Ordenado",
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
    async TOP_PAID_CLIENTS (req, res) {
        try {
            const { query: { startDate, endDate } } = req
            const topPagos = await pool.query(QUERIES.GET_TOP_CLIENTS_BY_VALUE(startDate, endDate))
            return res.status(200).json({
                results: topPagos,
                xAxis: "nombre_cliente",
                yAxis: "Total Pagado",
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
    async TOP_ORDERS_CLIENTS (req, res) {
        try {
            const { query: { startDate, endDate } } = req
            const topOrdenes = await pool.query(QUERIES.GET_TOP_CLIENTS_BY_ORDERS(startDate, endDate))
            return res.status(200).json({
                results: topOrdenes,
                xAxis: "nombre_cliente",
                yAxis: "Número de órdenes",
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
}