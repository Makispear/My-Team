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

addRole = () => {
    inquirer.prompt([
        {
           name: 'roleName',
           message: 'What is the name of the role you want to add?',
           type: 'input', 
           validate: answer => {
               if (!answer) {
                   return false
               } else {
                   return true
               }
           }
        }, 
        {
            name: 'roleSalary',
            message: 'What is the salary for this role?',
            type: 'input',
            validate: answer => {
                if (!answer) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: 'roleDepartment',
            message: 'What is the department for this role?',
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
        const {roleName, roleSalary, roleDepartment} = answer

        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`
        params = [roleName.trim(), roleSalary.trim(), roleDepartment.trim()]
        
        db.query(sql, params, (err, results) => {
               if (err) {
                return console.log(err.message)
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
            console.log('You have successfully added a role')
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

            return promptUser()
        })
    })
}

addEmployee = () => {
    inquirer.prompt([
        {
           name: 'employeeFirstName',
           message: 'What is the first name of the employee you want to add?',
           type: 'input', 
           validate: answer => {
               if (!answer) {
                   return false
               } else {
                   return true
               }
           }
        },
        {
            name: 'employeeLastName',
            message: 'What is the last name of the employee you want to add?',
            type: 'input', 
            validate: answer => {
                if (!answer) {
                    return false
                } else {
                    return true
                }
            }
         },
        {
            name: 'employeeRole',
            message: 'What is the role for this employee?',
            type: 'input',
            validate: answer => {
                if (!answer) {
                    return false
                } else {
                    return true
                }
            }
        },
        {
            name: 'employeeManager',
            message: 'Who is the manager for this employee?',
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
        const {employeeFirstName, employeeLastName, employeeRole, employeeManager} = answer

        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        params = [employeeFirstName.trim(), employeeLastName.trim(), employeeRole.trim(), employeeManager]
        
        db.query(sql, params, (err, results) => {
               if (err) {
                return console.log(err.message)
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
            console.log('You have successfully added an employee')
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

            return promptUser()
        })
    })
}

picker = () => {
        const sql = `SELECT * FROM employees`

        db.query(sql, (err, rows) => {
            if (err) {
                return console.log(err)
            }
            console.log(rows)
            const empChoices = rows.map(({ first_name, last_name, role_id }) => ({
                name: `${first_name} ${last_name}`,
                value: role_id
              }));
              return empChoices
        })
}

updateEmployeeRole = () => {
    inquirer.prompt([
        {
            message: 'Which employee do you want to update?',
            type: 'list',
            name: 'employeeSelector',
            choices: [picker()]
        },
        {
            message: 'What role do you want to give this employee?',
            type: 'list',
            name: 'roleSelector',
            choices: ['1', '2', '3']
        }
    ]).then(answers => {
        const {employeeSelector, roleSelector} = answers
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
        const params = [employeeSelector, roleSelector]

        db.query(sql, params, (err, results) => {
            if (err) {
                return console.log(err)
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
            console.log('You have successfully updated an employee')
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

            return promptUser()
        })
    })
}

leave = () => {
    prompt.ui.close()
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
                "update an employee role",
                "(X) Exit Database"]
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
                updateEmployeeRole()
                break
            case "(X) Exit Database":
                console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                console.log('Bye! See you soon :)')
                console.log('Press CTRL/Command + C to exit the command prompt!')
                console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                break
        }
    }).catch(err => console.log(err))
} 

// starts the app 
promptUser()