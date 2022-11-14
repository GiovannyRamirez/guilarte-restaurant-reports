const pool = require("../database/transactional/dbConfig")
const { REPORTS } = require("../database/documental/dbParams")

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
                total: mostConsumed[REPORTS.CUSTOMERS.REPORTS.MENUS.YAXIS],
            })
            const saveLess = await Data.create({
                name: lessConsumed.nombre_menu,
                total: lessConsumed[REPORTS.CUSTOMERS.REPORTS.MENUS.YAXIS],
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
                    total: item[REPORTS.CUSTOMERS.REPORTS.MENUS.YAXIS],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: REPORTS.CUSTOMERS.REPORTS.MENUS.NAME })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topConsumo,
                xAxis: REPORTS.CUSTOMERS.REPORTS.MENUS.XAXIS,
                yAxis: REPORTS.CUSTOMERS.REPORTS.MENUS.YAXIS,
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
            const mostPaid = topPagos[0]
            const lessPaid = topPagos[topPagos.length - 1]
            const saveMost = await Data.create({
                name: mostPaid.nombre_cliente,
                total: mostPaid[REPORTS.CUSTOMERS.REPORTS.PAYS.YAXIS],
            })
            const saveLess = await Data.create({
                name: lessPaid.nombre_cliente,
                total: lessPaid[REPORTS.CUSTOMERS.REPORTS.PAYS.YAXIS],
            })
            const saveReport = await Report.create({
                start_date: startDate,
                end_date: endDate,
                evaluated: topPagos.length,
                most: [saveMost],
                less: [saveLess],
            })
            await topPagos.forEach(async item => {
                const saveTop = await Data.create({
                    name: item.nombre_cliente,
                    total: item[REPORTS.CUSTOMERS.REPORTS.PAYS.YAXIS],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: REPORTS.CUSTOMERS.REPORTS.PAYS.NAME })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topPagos,
                xAxis: REPORTS.CUSTOMERS.REPORTS.PAYS.XAXIS,
                yAxis: REPORTS.CUSTOMERS.REPORTS.PAYS.YAXIS,
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
            const mostOrders = topOrdenes[0]
            const lessOrders = topOrdenes[topOrdenes.length - 1]
            const saveMost = await Data.create({
                name: mostOrders.nombre_cliente,
                total: mostOrders[REPORTS.CUSTOMERS.REPORTS.ORDERS.YAXIS],
            })
            const saveLess = await Data.create({
                name: lessOrders.nombre_cliente,
                total: lessOrders[REPORTS.CUSTOMERS.REPORTS.ORDERS.YAXIS],
            })
            const saveReport = await Report.create({
                start_date: startDate,
                end_date: endDate,
                evaluated: topOrdenes.length,
                most: [saveMost],
                less: [saveLess],
            })
            await topOrdenes.forEach(async item => {
                const saveTop = await Data.create({
                    name: item.nombre_cliente,
                    total: item[REPORTS.CUSTOMERS.REPORTS.ORDERS.YAXIS],
                })
                const currentReport = await Report.findById(saveReport._id)
                currentReport.top.push(saveTop)
                await currentReport.save()
            })
            const fullCurrentReport = await Report.findById(saveReport._id)
            const behavior = await Behavior.findOne({ name: REPORTS.CUSTOMERS.REPORTS.ORDERS.NAME })
            behavior.reports.push(fullCurrentReport)
            await behavior.save()
            return res.status(200).json({
                results: topOrdenes,
                xAxis: REPORTS.CUSTOMERS.REPORTS.ORDERS.XAXIS,
                yAxis: REPORTS.CUSTOMERS.REPORTS.ORDERS.YAXIS,
            })
        } catch (err) {
            return res.status(400).json({
                mensaje: "Hubo un error con la petición",
                error: JSON.stringify(err),
            })
        }
    },
}