const router = require("express").Router()
const menuController = require("../controladores/menuControl")

const { ENDPOINTS } = require("../endpoints")

router.route(ENDPOINTS.BASE).get(menuController.TOP_MENUS),
router.route(ENDPOINTS.MOST_VALUED_MENUS).get(menuController.MOST_VALUED_MENU),

module.exports = router