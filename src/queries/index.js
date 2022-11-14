const { TABLE_NAMES } = require("../database/transactional/dbParams")
const { MENU: MENUS, MENU_TYPES, CLIENTES, ORDERS, ORDERS_MENUS } = TABLE_NAMES

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
            JOIN ${CLIENTES} c ON os.id_cliente = c.id_cliente 
            JOIN ${MENUS} m ON osm.id_menu = m.id_menu
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            AND c.telefono_cliente = ${telCliente}
            GROUP BY m.id_menu, c.nombre_cliente 
            ORDER BY SUM(osm.cantidad_menu_en_orden) DESC`,
        GET_TOP_CLIENT_BY_VALUE: (startDate, endDate) => `SELECT c.nombre_cliente, c.telefono_cliente, SUM(os.valor_pagado) AS "Total Pagado", COUNT(DISTINCT(os.id_orden)) AS "Número de órdenes" FROM ${ORDERS_MENUS} osm 
            JOIN ${ORDERS} os ON osm.id_orden = os.id_orden 
            JOIN ${CLIENTES} c ON os.id_cliente = c.id_cliente 
            WHERE os.fecha_orden BETWEEN "${startDate} 00:00:01" AND "${endDate} 23:59:59"
            GROUP BY c.id_cliente
            ORDER BY SUM(os.valor_pagado) DESC`,
        // GET_MESAS: `SELECT * FROM ${MESAS}`,
        // GET_MESEROS: `SELECT * FROM ${MESEROS}`,
        // GET_TIPOS_SERVICIO: `SELECT * FROM ${TIPOS_SERVICIO}`,
        // SELECT_CLIENTES: (tel) => `SELECT * FROM ${CLIENTES} WHERE telefono_cliente = ${tel} LIMIT 1`,
        // INSERT_CLIENTE: (name, tel) => 
        //     `INSERT INTO clientes (nombre_cliente, telefono_cliente) 
        //         VALUES ('${name}', ${tel})`,
        // INSERT_ORDEN: (total, id_cliente, id_mesa, id_mesero, id_tipo_servicio) => 
        //     `INSERT INTO ordenes_servicio (valor_pagado, id_cliente, id_mesa, id_mesero, id_tipo_servicio)
        //         VALUES (${total}, ${id_cliente}, ${id_mesa}, ${id_mesero}, ${id_tipo_servicio})`,
        // INSERT_ORDEN_MENUS: (id_orden, id_menu, cantidad) => 
        //     `INSERT INTO ordenes_servicio_menus (id_orden, id_menu, cantidad_menu_en_orden)
        //         VALUES (${id_orden}, ${id_menu}, ${cantidad})`,
    },
}