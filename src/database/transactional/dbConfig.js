const mysql = require("mysql2")
const { promisify } = require("util")
const { DB_PARAMS } = require("./dbParams")

const pool = mysql.createPool(DB_PARAMS)

pool.getConnection((err, connection) => {
    if(err) console.error(`errorDB: ${JSON.stringify(err)}`)
    if(connection) {
        connection.release()
        console.log("DB Connected")
        return
    }
})

pool.query = promisify(pool.query)

module.exports = pool