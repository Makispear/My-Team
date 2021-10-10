const db = require('../db/connection')

viewDepartments = () => {
    const sql = `SELECT * FROM departments`

    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
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
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        console.log("\nRoles:\n")
        console.table(rows)
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}

viewEmployees = () => {
    const sql = `SELECT * FROM employees`

    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        console.log("\nEmployees:\n")
        console.table(rows)
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}




module.exports = {viewDepartments, viewRoles, viewEmployees}