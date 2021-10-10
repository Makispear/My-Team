const db = require('../db/connection')
const inquirer = require('inquirer')


updateEmployeeRole = () => {
    const sql = `SELECT * FROM employees`
    db.query(sql, (err, rows) => {
        if (err) {
            return console.log(err)
        }

        const empChoices = rows.map(({ first_name, last_name, role_id }) => ({
            name: `${role_id}: ${first_name} ${last_name}`,
        }));

        inquirer.prompt([
            {
                message: 'Which employee do you want to update?',
                type: 'list',
                name: 'employeeSelector',
                choices: empChoices
            },
        ])
    })

            // {
            //     message: 'What role do you want to give this employee?',
            //     type: 'list',
            //     name: 'roleSelector',
            //     choices: ['1', '2', '3']
            // }
       
        // .then(answers => {
        //     const {employeeSelector, roleSelector} = answers
        //     const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
        //     const params = [employeeSelector, roleSelector]

        //     db.query(sql, params, (err, results) => {
        //         if (err) {
        //             return console.log(err)
        //         }
        //         console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
        //         console.log('You have successfully updated an employee')
        //         console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

        //         return promptUser()
        //     })
        // })

}

module.exports = {updateEmployeeRole}