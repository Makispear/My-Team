const inquirer = require('inquirer')
const intermediaries = require('../intermediaries/get')
const lettersOnly = /^[a-zA-Z\s]*$/
const numbersOnly = /^[0-9]*$/

changeEmployeeRole = async () => {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: `Whose role is being updated?`,
            choices: await intermediaries.getEmployees(),
        },
        {
            type: 'list',
            name: 'role',
            message: `What is the employee's new role?`,
            choices: await intermediaries.getRoles()
        }
        ]).then(answer => {
            let {employee, role} = answer
            let employee_id = employee.split(":")[0]
            let employeeRole = role.split(":")[0]
            updateEmployeeRole(employee_id, employeeRole);
        })
}

changeEmployeeManager = async () => {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee's manager do you want to change?",
            choices: await intermediaries.getEmployees()
        },
        {
            type: 'list',
            name: 'chooseManager',
            message: "Who will be the manager for this employee?",
            choices: await intermediaries.getEmployees()
        }
        ]).then(answer => {
            let {employee, chooseManager} = answer
            let employee_id = employee.split(":")[0]
            let manager = chooseManager.split(":")[0]
        updateEmployeeManager(employee_id, manager)

        })
}

module.exports = {changeEmployeeRole, changeEmployeeManager}
