require("dotenv").config()
const express = require("express")

const { ENDPOINTS } = require("./endpoints")
const menuRutas = require("./rutas/menuRuta")
// const mesasRutas = require("./rutas/mesasRuta")
// const meserosRutas = require("./rutas/meserosRuta")
// const tiposServicioRutas = require("./rutas/tiposServicioRuta")

// const ordenesRutas = require("./rutas/ordenesRuta")

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())

app.use(ENDPOINTS.TOP_MENUS, menuRutas)
app.use(ENDPOINTS.MOST_VALUED_MENUS, menuRutas)
// app.use(ENDPOINTS.MESAS, mesasRutas)
// app.use(ENDPOINTS.MESEROS, meserosRutas)
// app.use(ENDPOINTS.TIPOS_SERVICIO, tiposServicioRutas)

// app.use(ENDPOINTS.ORDENES, ordenesRutas)

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`)
})
