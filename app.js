const inquirer = require('inquirer')
const read = require('./lib/read')
const create = require('./lib/create')
const db = require('./db/connection')
const update = require('./lib/update')
const del = require('./lib/delete')
const get = require('./intermediaries/get')

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
                "view employees by manager",
                "view employees by department",
                "view budget",
                "add department",
                "add role",
                "add employee",
                "update employee role",
                "update employee manager",
                "delete employee",
                "delete department",
                "delete role",
                "(X) EXIT APPLICATION"
            ]
        }
    ]).then(answer => {
        switch(answer.mainList){
            case "view all departments":  
                read.viewDepartments() 
                break
            case "view all roles":
                read.viewRoles()
                break
            case "view all employees":
                read.viewEmployees()
                break
            case "view employees by manager":
                read.viewEmployeesByManager()
                break
            case "view employees by department":
                read.viewEmployeesByDepartment()
                break
            case "view budget":
                read.getBudget()
                break
            case "add department":
                create.addDepartment()
                break
            case "add role":
                create.addRole()
                break
            case "add employee":
                create.addEmployee()
                break
            case "update employee role":
                update.changeEmployeeRole()
                break
            case "update employee manager":
                update.changeEmployeeManager()
                break
            case "delete employee":
                del.deleteEmployeePrompt()
                break
            case "delete department":
                del.deleteDepartmentPrompt()
                break
            case "delete role":
                del.deleteRolePrompt()
                break
            case "(X) EXIT APPLICATION":
                db.end()
                break
        }
    }).catch(err => console.log(err))
} 

// starts the app 
promptUser()