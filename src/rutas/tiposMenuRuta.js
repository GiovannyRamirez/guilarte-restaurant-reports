const router = require("express").Router()
const tiposMenuController = require("../controladores/tiposMenuControl")

const { ENDPOINTS } = require("../endpoints")

router.route(ENDPOINTS.BASE).get(tiposMenuController.TOP_MENU_TYPES),

module.exports = router