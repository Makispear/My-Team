const db = require('../db/connection')
const cTable = require('console.table')
const { result } = require('lodash')

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
    // const update = `
    // UPDATE employees SET manager_id = NULL WHERE employees.id = employees.manager_id`
    // db.query(update, (err, result) => {
    //     if (err) {
    //         console.log('An error has occurred!')
    //         return console.log(err)
    //     }
    // })
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
    const mainSql = `
    SELECT
        employees.id AS employee_id,
        employees.first_name,
        employees.last_name,
        managers.first_name AS manager
    FROM employees
        LEFT JOIN managers ON managers.id = employees.manager_id
    WHERE employees.manager_id IS NOT NULL;`
    // get managers 
    db.query(mainSql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("Employees By managers:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}

viewEmployeesByDepartment = () => {
    const mainSql = `
    SELECT
        employees.id AS emp_id,
        CONCAT(first_name, ' ', last_name) AS name,
        departments.name AS department
    FROM employees
    LEFT JOIN roles
        ON roles.id = employees.id
    Left JOIN departments
        ON departments.id = roles.id`
    // get Departments 
    db.query(mainSql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("Employees By departments:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}

getBudget = () => {
    const sql = `
        SELECT
            departments.id AS dep_id,
            departments.name AS department,
            SUM(roles.salary) AS budget
        FROM departments
        JOIN roles
        ON departments.id = roles.department_id
        GROUP BY departments.id`
    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        console.log("Budget for each department:\n")
        console.table(rows)
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        return promptUser()
    })
}


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    getBudget
}