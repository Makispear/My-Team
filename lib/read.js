const db = require('../db/connection')
const cTable = require('console.table')

viewDepartments = () => {
    const sql = `SELECT * FROM departments`

    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("DEPARTMENTS:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}

viewRoles = () => {
    const sql = `SELECT * FROM roles`

    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("ROLES:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}

viewEmployees = () => {
    const sql = `SELECT * FROM employees`

    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("EMPLOYEES:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}




module.exports = {viewDepartments, viewRoles, viewEmployees}