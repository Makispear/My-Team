const inquirer = require('inquirer')
const intermediaries = require('../intermediaries/get')

deleteEmployeePrompt = async function() {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'deleteEmp',
            message: 'Which employee would you like to delete?',
            choices: await intermediaries.getEmployees()
        }
    ]).then(answer => {
        let {deleteEmp} = answer
        let getRid = deleteEmp.split(":")[0]
        eraseEmployee(getRid)
    })
}

deleteDepartmentPrompt = async function() {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'deleteDep',
            message: 'Which Department would you like to delete?',
            choices: await intermediaries.getDepartments()
        }
    ]).then(answer => {
        let {deleteDep} = answer
        let getRid = deleteDep.split(":")[0]
        eraseDepartment(getRid)
    })
}

deleteRolePrompt = async function() {
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'deleteRole',
            message: 'Which role would you like to delete?',
            choices: await intermediaries.getRoles()
        }
    ]).then(answer => {
        let {deleteRole} = answer
        let getRid = deleteRole.split(":")[0]
        eraseRole(getRid)
    })
}

module.exports = {deleteEmployeePrompt, deleteDepartmentPrompt, deleteRolePrompt}
