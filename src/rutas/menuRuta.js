const router = require("express").Router()
const menuController = require("../controladores/menuControl")

const { ENDPOINTS } = require("../endpoints")

router.route(ENDPOINTS.BASE).get(menuController.LIST),

module.exports = router