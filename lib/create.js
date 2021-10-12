const inquirer = require('inquirer')
const db = require('../db/connection')
const inputCheck = require('../utils/inputCheck')
const lettersOnly = /^[a-zA-Z\s]*$/
const numbersOnly = /^[0-9]*$/

addDepartment = () => {
    inquirer.prompt([
        {
           name: 'addDepartment',
           message: 'What is the name of the department you want to add?',
           type: 'input', 
           validate: answer => {
               if (!answer) {
                console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                console.log(`Please enter a department name!`)
                 console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                   return false
               } else {
                   if (!answer.match(lettersOnly)) {
                        console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                       console.log(`Make sure to use letters only!`)
                        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                       return false
                   }
                   return true
               }
           }
        }
    ]).then(answer => {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        params = answer.addDepartment.trim()
                // VALIDATOR 
                const errors = inputCheck(answer, 'addDepartment')
                if (errors) {
                    console.log(`error: ${errors}`)
                    return addDepartment()
                }
        
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(`\nerror: ${err.message}
                Try again!\n`)
                return addDepartment()
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            console.log('You have successfully added a department')
            console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

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
             console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
             console.log(`Please enter a role name!`)
              console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                return false
            } else {
                if (!answer.match(lettersOnly)) {
                     console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                    console.log(`Make sure to use letters only!`)
                     console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                    return false
                }
                return true
            }
        }
        }, 
        {
            name: 'roleSalary',
            message: 'What is the salary for this role? (Optional)',
            type: 'input',
            validate: answer => {
                    if (!answer.match(numbersOnly)) {
                         console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                        console.log(`Make sure to use whole numbers only!`)
                         console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                        return false
                    }
                    return true
            }
        },
        {
            name: 'roleDepartment',
            message: 'What is the department for this role?',
            type: 'input',
            validate: answer => {
                if (!answer) {
                 console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                 console.log(`Please enter this role's department number!`)
                  console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                    return false
                } else {
                    if (!answer.match(numbersOnly)) {
                         console.log("\n\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                        console.log(`Make sure to use whole numbers only!`)
                         console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
                        return false
                    }
                    return true
                }
            }
        }
    ]).then(answer => {
        const {roleName, roleSalary, roleDepartment} = answer

        let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`
        let params = [roleName.trim(), roleSalary.trim(), roleDepartment.trim()]
        // if salary wasn't passed 
        if (!roleSalary || roleSalary === 'undefined') {
            sql = `INSERT INTO roles (title, department_id) VALUES (?,?)`
            params = [roleName.trim(), roleDepartment.trim()]    
        }
        
        db.query(sql, params, (err, results) => {
               if (err) {
                console.log(`\nerror: ${err.message}
                Try again!\n`)
                return addRole()
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            console.log('You have successfully added a role')
            console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

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
            message: 'Who is the manager for this employee? (Optional)',
            type: 'input',
        }
    ]).then(answer => {
        const {employeeFirstName, employeeLastName, employeeRole, employeeManager} = answer

        // if manager id was passed 
        let params = [employeeFirstName.trim(), employeeLastName.trim(), employeeRole.trim(), employeeManager.trim()]
        let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
            // if manager id wasn't passed 
            if (!employeeManager || employeeManager === 'undefined') {
                sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`
                params = [employeeFirstName.trim(), employeeLastName.trim(), employeeRole.trim()]    
            }

        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(`\nerror: ${err.message}
                Try again!\n`)
                return this.addEmployee()
            }
            console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            console.log('You have successfully added an employee')
            console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")

            return promptUser()
        })
    })
}


module.exports = {addDepartment, addRole, addEmployee}