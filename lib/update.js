const inquirer = require('inquirer')
const intermediaries = require('../intermediaries/get')

changeEmployeeRole = async function() {
    const updateRole = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: `What is the name of the employee being updated?`,
            choices: await intermediaries.getEmployees()
        },
        {
            type: 'list',
            name: 'role',
            message: `What is the employee's new role?`,
            choices: await intermediaries.getRoles()
        }
        ]);
    // convert to integers to pass through id fields
    updateEmployeeRole(updateRole.employee.charAt(0), updateRole.role.charAt(0));
}

changeEmployeeManager = async function() {
    const updateManager = await inquirer
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
        ])
    updateEmployeeManager(updateManager.employee.charAt(0), updateManager.chooseManager.charAt(0))
}

module.exports = {changeEmployeeRole, changeEmployeeManager}
