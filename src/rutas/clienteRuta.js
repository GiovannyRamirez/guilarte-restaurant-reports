const router = require("express").Router()
const clienteController = require("../controladores/clienteControl")

const { ENDPOINTS } = require("../endpoints")

router.route(ENDPOINTS.BASE).get(clienteController.TOP_MENUS),

module.exports = router