module.exports = {
    REPORTS: {
        MENUS: "menus",
        MENU_TYPES: "tipos_menu",
        CUSTOMERS: {
            REPORTS: {
                MENUS: {
                    NAME: "Top Menús Clientes",
                    XAXIS: "nombre_menu",
                    YAXIS: "Total Ordenado",
                },
                PAYS: {
                    NAME: "Top Clientes Valorados",
                    XAXIS: "nombre_cliente",
                    YAXIS: "Total Pagado",
                },
                ORDERS: {
                    NAME: "Top Clientes Órdenes",
                    XAXIS: "nombre_cliente",
                    YAXIS: "Número de órdenes",
                },
            },
        },        
        ORDERS: "ordenes_servicio",
        ORDERS_MENUS: "ordenes_servicio_menus",
    },
}