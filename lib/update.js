const db = require('../db/connection')
const inquirer = require('inquirer')
const server = require('../server')
const get = require('../lib/get')
const promise = require('mysql2/promise');

let roles = [];
let managers = [];
let departments = [];
let employees = [];

// create promises which return the necessary data to sub-prompts, as mysql queries cannot use async/await syntax
getEmployees = () => {
   return new Promise((resolve, reject) => {
      db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees`, function (err, res) {
         if (err) {
            reject('Something went wrong!' + err);
         }
         let resObjArr = JSON.parse(JSON.stringify(res));
         for (res of resObjArr) {
            employees.push(`${res.id}: ` + res.name);
         }
         resolve(employees);
      })
   });
};


getRoles = () => {
   return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM roles`, function (err, res) {
         if (err) {
            reject('Something went wrong!' + err);
         }
         let resObjArr = JSON.parse(JSON.stringify(res));
         for (res of resObjArr) {
            roles.push(`${res.id}: ` + res.title);
         }
         resolve(roles);
      })
   });
};

getDepartments = () => {
   return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM departments`, function (err, res) {
         if (err) {
            reject('Something went wrong!' + err);
         }
         let resObjArr = JSON.parse(JSON.stringify(res));
         for (res of resObjArr) {
            departments.push(`${res.id}: ` + res.name);
         }
         resolve(departments);
      })
   });
};

getManagers = () => {
   return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM managers`, function (err, res) {
         if (err) {
            reject('Something went wrong!' + err);
         }
         let resObjArr = JSON.parse(JSON.stringify(res));
         for (res of resObjArr) {
            managers.push(`${res.id}: ` + res.name);
         }
         resolve(managers);
      })
   });
};

updateEmployeeRole = (employeeId, roleId) => {
    const query = `UPDATE employees
                   SET role_id = ?
                   WHERE id = ?;`
    const params = [roleId, employeeId];
    db.query(query, params, function (err, res) {
       if (err) {
          console.log(`Something went wrong: ${err}`);
          return;
       }
       console.log(`\n\nEmployee Role Updated.`);
       console.log(`Press UP or DOWN to continue...`);
    });
    promptUser();
 };

module.exports =
updateEmployeeRolePrompt = async function () {
    const updateRole = await inquirer
        .prompt([
        {
            type: 'list',
            name: 'employee',
            message: `What is the name of the employee being updated?`,
            choices: await getEmployees()
        },
        {
            type: 'list',
            name: 'role',
            message: `What is the employee's new role?`,
            choices: await getRoles(),
        }
        ]);
    // convert to integers to pass through id fields
    return updateEmployeeRole(updateRole.employee.charAt(0), updateRole.role.charAt(0));
};