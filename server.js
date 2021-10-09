const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table');
// const apiRoutes = require('./routes/apiRoutes')
// EXPRESS
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


viewDepartments = () => {
    const sql = `SELECT * FROM departments`

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        console.log("\nDEPARTMENTS:\n")
        console.table(rows)
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}

viewRoles = () => {
    const sql = `SELECT * FROM roles`

    db.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        console.log("\nRoles:\n")
        console.table(rows)
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}


promptUser = () => {
    inquirer.prompt([
        {
            name: 'mainList',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"]
        }
    ]).then(answer => {
        switch(answer.mainList){
            case "view all departments":  
                viewDepartments() 
                break;
            case "view all roles":
                viewRoles()
                break;
        }
    }).catch(err => console.log(err))
} 


// return error for unknown urls 
app.use((req, res) => {
    res.status(404).end()
})

app.listen(PORT, () => {
    console.log(`Server rendering on port ${PORT}!`)
})

// Start server after DB connection
// db.connect(err => {
//     if (err) throw err
//     console.log('Database connected.')
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//     })
// })

promptUser()