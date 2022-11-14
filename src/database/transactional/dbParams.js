require("dotenv")

module.exports = {
    DB_PARAMS: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
    TABLE_NAMES: {
        MENU: "menus",
        MENU_TYPES: "tipos_menu",
        CLIENTES: "clientes",
        ORDERS: "ordenes_servicio",
        ORDERS_MENUS: "ordenes_servicio_menus",
    },
}
