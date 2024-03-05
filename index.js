const express = require('express')
const mongoose = require('mongoose')

// Importaciones de APIs
const userApi = require("./routes/userApi");
const cardApi = require("./routes/cardApi");
const moveApi = require("./routes/moveApi");
const cuentaApi = require("./routes/cuentaApi");

// connect to database
dbConfig()

// create application
const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.use("/api/users", userApi);
app.use("/api/cards", cardApi);
app.use("/api/moves", moveApi);
app.use("/api/cuentas", cuentaApi);

app.listen(2000, () => {
    console.log("listening port 2000")
})

// ---- CONFIGURACIÓN BASE DE DATOS -------------------------------------------
// En Docker, accederemos al contenedor de Mongo en lugar de localhost

function dbConfig() {
    mongoose.connect(`mongodb://mongo:27017/atm-db`);
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Error de conexión a MongoDB"));
    db.once("open", () => {
      console.log("Conectado correctamente a la base de datos!");
    });
  }