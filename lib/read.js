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
    const update = `
    UPDATE employees SET manager_id = NULL WHERE employees.id = employees.manager_id`
    db.query(update, (err, result) => {
        if (err) {
            console.log('An error has occurred!')
            return console.log(err)
        }
    })
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

viewEmployeesByManager = () => {
    const sql = `
    SELECT
        employees.id AS employee_id,
        employees.first_name,
        employees.last_name,
        employees.role_id AS role
    WHERE role(id) = 1`

    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("Managers:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    viewEmployeesByManager
}