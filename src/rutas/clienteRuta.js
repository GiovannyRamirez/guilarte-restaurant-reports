const router = require("express").Router()
const clienteController = require("../controladores/clienteControl")

const { ENDPOINTS } = require("../endpoints")

router.route(ENDPOINTS.BASE).get(clienteController.TOP_MENUS),
router.route(ENDPOINTS.MOST_VALUED_MENUS).get(clienteController.TOP_PAID_CLIENTS),

module.exports = router