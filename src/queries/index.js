const { TABLE_NAMES } = require("../database/transactional/dbParams")
const { MENUS, MENU_TYPES, CUSTOMERS, ORDERS, ORDERS_MENUS } = TABLE_NAMES

module.exports = {
    QUERIES: {
        GET_TOP_MENUS: (startDate, endDate) => `SELECT m.nombre_menu, SUM(osm.cantidad_menu_en_orden) AS "Total Ordenado" FROM ${ORDERS} os
            JOIN ordenes_servicio_menus osm ON os.id_orden = osm.id_orden 
            JOIN ${MENUS} m ON osm.id_menu = m.id_menu
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            GROUP BY m.id_menu
            ORDER BY SUM(osm.cantidad_menu_en_orden) DESC`,
        GET_MOST_VALUED_MENUS: (startDate, endDate) => `SELECT m.nombre_menu, SUM(osm.cantidad_menu_en_orden) AS "Total Ordenado", SUM(osm.cantidad_menu_en_orden * m.valor_menu) AS "Valor representado" FROM ${ORDERS} os
            JOIN ${ORDERS_MENUS} osm ON os.id_orden = osm.id_orden 
            JOIN ${MENUS} m ON osm.id_menu = m.id_menu
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            GROUP BY m.id_menu 
            ORDER BY SUM(osm.cantidad_menu_en_orden * m.valor_menu) DESC`,
        GET_TOP_MENUS_BY_CLIENT: (startDate, endDate, telCliente) => `SELECT c.nombre_cliente, m.nombre_menu, SUM(osm.cantidad_menu_en_orden) AS "Total Ordenado" FROM ${ORDERS_MENUS} osm 
            JOIN ${ORDERS} os ON osm.id_orden = os.id_orden 
            JOIN ${CUSTOMERS} c ON os.id_cliente = c.id_cliente 
            JOIN ${MENUS} m ON osm.id_menu = m.id_menu
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            AND c.telefono_cliente = ${telCliente}
            GROUP BY m.id_menu, c.nombre_cliente 
            ORDER BY SUM(osm.cantidad_menu_en_orden) DESC`,
        GET_TOP_CLIENTS_BY_VALUE: (startDate, endDate) => `SELECT c.nombre_cliente, c.telefono_cliente, SUM(os.valor_pagado) AS "Total Pagado", COUNT(DISTINCT(os.id_orden)) AS "Número de órdenes" FROM ${ORDERS_MENUS} osm 
            JOIN ${ORDERS} os ON osm.id_orden = os.id_orden 
            JOIN ${CUSTOMERS} c ON os.id_cliente = c.id_cliente 
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            GROUP BY c.id_cliente
            ORDER BY SUM(os.valor_pagado) DESC`,
        GET_TOP_CLIENTS_BY_ORDERS: (startDate, endDate) => `SELECT c.nombre_cliente, c.telefono_cliente, COUNT(DISTINCT(os.id_orden)) AS "Número de órdenes", SUM(os.valor_pagado) AS "Total Pagado" FROM ${ORDERS_MENUS} osm 
            JOIN ${ORDERS} os ON osm.id_orden = os.id_orden 
            JOIN ${CUSTOMERS} c ON os.id_cliente = c.id_cliente 
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            GROUP BY c.id_cliente
            ORDER BY COUNT(DISTINCT(os.id_orden)) DESC`,
        GET_TOP_MENU_TYPES: (startDate, endDate) => `SELECT tm.nombre_tipo_menu, COUNT(tm.id_tipo_menu) AS "Total Vendido" FROM ${ORDERS} os 
            JOIN ${ORDERS_MENUS} osm ON os.id_orden = osm.id_orden 
            JOIN ${MENUS} m ON osm.id_menu = m.id_menu 
            JOIN ${MENU_TYPES} tm ON tm.id_tipo_menu =m.id_tipo_menu
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            GROUP BY tm.id_tipo_menu
            ORDER BY COUNT(tm.id_tipo_menu) DESC`,
    },
}