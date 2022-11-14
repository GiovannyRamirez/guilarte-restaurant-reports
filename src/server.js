require("dotenv").config()
const express = require("express")

const { documentalConnection } = require("./database/documental/dbConnect")

const { ENDPOINTS } = require("./endpoints")
const menuRutas = require("./rutas/menuRuta")
const clienteRutas = require("./rutas/clienteRuta")
const tiposMenuRutas = require("./rutas/tiposMenuRuta")

const PORT = process.env.PORT || 8000
const app = express()
documentalConnection()

app.use(express.json())

app.use(ENDPOINTS.TOP_MENUS, menuRutas)
app.use(ENDPOINTS.CUSTOMERS, clienteRutas)
app.use(ENDPOINTS.MENU_TYPES, tiposMenuRutas)

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`)
})
