const inquirer = require('inquirer')
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes')
// EXPRESS
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// return error for unknown urls 
app.use((req, res) => {
    res.status(404).end()
})

// routes 

app.listen(PORT, () => {
    console.log(`Server rendering on port ${PORT}!`)
})