require("dotenv")
const mongoose = require ("mongoose")

function documentalConnection() {
  const mongoURI = process.env.MONGO_DB
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once("open", () =>
    console.log("Connected with Restaurante Guilarte Documental DB")
  )

  mongoose.connection.on("error", (err) =>
    console.log(`Something went wrong ${JSON.stringify(err)}`)
  );
}

module.exports = { documentalConnection }