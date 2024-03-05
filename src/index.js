const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(2000, () => {
    console.log("listening port 2000")
})