const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')   // no longer part of express
const axios = require('axios')

// dev
const DEBUG = true

// Importaciones de APIs
const userApi = require("./routes/userApi");
const cardApi = require("./routes/cardApi");
const moveApi = require("./routes/moveApi");
const cuentaApi = require("./routes/cuentaApi");

// connect to database
dbConfig()


// Instancia Axios
const miApi = axios.create({
  baseURL: "http://127.0.0.1:2000/api",
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})

// create application
const app = express()

app.set('port', 2000)
app.set('views', path.join(__dirname, 'views'))   // OS slash compatibility
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));   // enable public folder access

app.get('/', async (req, res) => {
  const userCount = await miApi.get('/users/count')
  const cardCount = await miApi.get('/cards/count')

    res.render('index', {
      title: 'ATM Web Control Panel',
      userCount: userCount?.data?.count,
      cardCount: cardCount?.data?.count,
    })
})

app.get('/front/cards', async (req, res) => {
  const cards = await miApi.get('/cards/all')
  
  res.render('cards', {
    title: 'ATM Web Control Panel',
    cards: cards.data.tarjetas
  })
})

app.get('/front/users', async (req, res) => {
  const users = await miApi.get('/users/all')

  res.render('users', {
    title: 'ATM Web Control Panel',
    users: users.data.Usuarios
  })
})

app.get('/front/adduser', (req, res) => {
  res.render('adduser', {
    title: 'ATM Web Control Panel'
  })
})

app.use("/api/users", userApi);
app.use("/api/cards", cardApi);
app.use("/api/moves", moveApi);
app.use("/api/cuentas", cuentaApi);

app.listen(app.get('port'), () => {
    console.log(`listening port ${app.get('port')}`)
})

// ---- CONFIGURACIÓN BASE DE DATOS -------------------------------------------
// En Docker, accederemos al contenedor de Mongo en lugar de localhost

function dbConfig() {
  const source = DEBUG ? "127.0.0.1" : "mongo"
  mongoose.connect(`mongodb://${source}:27017/atm-db`);
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Error de conexión a MongoDB"));
    db.once("open", () => {
      console.log("Conectado correctamente a la base de datos!");
    });
  }