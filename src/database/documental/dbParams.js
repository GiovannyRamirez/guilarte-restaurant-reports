module.exports = {
    REPORTS: {
        MENUS: {
            REPORTS: {
                CONSUMED: {
                    NAME: "Top Menús Consumidos",
                    XAXIS: "nombre_menu",
                    YAXIS: "Total Ordenado",
                },
                PAYS: {
                    NAME: "Top Menús Valorados",
                    XAXIS: "nombre_menu",
                    YAXIS: "Valor representado",
                },
            },
        },
        MENU_TYPES: {
            REPORTS: {
                TYPES: {
                    NAME: "Top Tipos Menú",
                    XAXIS: "nombre_tipo_menu",
                    YAXIS: "Total Vendido",
                },
            },
        },
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
    },
}