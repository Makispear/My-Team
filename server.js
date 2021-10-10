const inquirer = require('inquirer')
const cTable = require('console.table')
const get = require('./lib/get')
const add = require('./lib/add')
const db = require('./db/connection')
const updateEmployeeRolePrompt = require('./lib/update')
// const inputCheck = require('./utils/inputCheck')

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
                "update an employee role",
                "(X) EXIT APPLICATION"
            ]
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
            case "add a role":
                addRole()
                break
            case "add an employee":
                addEmployee()
                break
            case "update an employee role":
                updateEmployeeRolePrompt()
                break
            case "(X) EXIT APPLICATION":
                db.end()
                break
        }
    }).catch(err => console.log(err))
} 

// starts the app 
promptUser()