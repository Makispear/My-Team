const inquirer = require('inquirer')
const intermediaries = require('../intermediaries/get')

deleteEmployeePrompt = async function() {
    const deleteEmployee = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'deleteEmp',
            message: 'Which employee would you like to delete?',
            choices: await intermediaries.getEmployees()
        }
    ])
    eraseEmployee(deleteEmployee.deleteEmp.charAt(0))
}

deleteDepartmentPrompt = async function() {
    const deleteDepartment = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'deleteDep',
            message: 'Which Department would you like to delete?',
            choices: await intermediaries.getDepartments()
        }
    ])
    eraseDepartment(deleteDepartment.deleteDep.charAt(0))
}

deleteRolePrompt = async function() {
    const deleteRole = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'deleteRole',
            message: 'Which role would you like to delete?',
            choices: await intermediaries.getRoles()
        }
    ])
    eraseRole(deleteRole.deleteRole.charAt(0))
}

module.exports = {deleteEmployeePrompt, deleteDepartmentPrompt, deleteRolePrompt}
