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
        updateEmployeeRole(answer.employee.charAt(0), answer.role.charAt(0));
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
        updateEmployeeManager(answer.employee.charAt(0), answer.chooseManager.charAt(0))

        })
}

module.exports = {changeEmployeeRole, changeEmployeeManager}
