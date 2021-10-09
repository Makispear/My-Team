const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')
// const inputCheck = require('./utils/inputCheck')

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

addDepartment = () => {
    inquirer.prompt([
        {
           name: 'addDepartment',
           message: 'What is the name of the department you want to add?',
           type: 'input', 
           validate: answer => {
               if (!answer) {
                   return false
               } else {
                   return true
               }
           }
        }
    ]).then(answer => {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        params = answer.addDepartment.trim()
        
        db.query(sql, params, (err, results) => {
            if (err) {
                return console.log(err.message)
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

            console.log('You have successfully added a department')
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

            return promptUser()
        })
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
                break
            case "view all roles":
                viewRoles()
                break
            case "view all employees":
                viewEmployees()
                break
            case "add a department":
                addDepartment()
                break
        }
    }).catch(err => console.log(err))
} 

// starts the app 
promptUser()