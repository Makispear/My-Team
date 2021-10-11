const db = require('../db/connection')

getEmployees = () => {
let employees = [];

   return new Promise((resolve, reject) => {
      db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees`, function (err, res) {
         if (err) {
            reject(`error: ${err}`);
         }
         let formattedResult = JSON.parse(JSON.stringify(res));
         for (res of formattedResult) {
            employees.push(`${res.id}: ` + res.name);
         }
         resolve(employees);
      })
   });
};


getRoles = () => {
   let roles = [];

   return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM roles`, function (err, res) {
         if (err) {
            reject(`error: ${err}`);
         }
         let formattedResult = JSON.parse(JSON.stringify(res));
         for (res of formattedResult) {
            roles.push(`${res.id}: ` + res.title);
         }
         resolve(roles);
      })
   });
};

getDepartments = () => {
   let departments = []

   return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM departments`, function (err, res) {
         if (err) {
            reject(`error: ${err}`);
         }
         let formattedResult = JSON.parse(JSON.stringify(res));
         for (res of formattedResult) {
            departments.push(`${res.id}: ` + res.name);
         }
         resolve(departments);
      })
   });
};


updateEmployeeRole = (employeeId, roleId) => {
    const sql = `UPDATE employees
                   SET role_id = ?
                   WHERE id = ?;`
    const params = [roleId, employeeId];
    db.query(sql, params, function (err, res) {
       if (err) {
          console.log(`Something went wrong: ${err}`);
          return;
       }
       console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
            console.log('Employee role has been updated successfully!')
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
       return promptUser();
    });
 };

eraseEmployee = (employeeId) => {
   const sql = `DELETE FROM employees WHERE id = ?`
   const params = [employeeId]

   db.query(sql, params, (err, results) => {
      if (err) {
         return console.log(err)
      }
      console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
      console.log('Employee role has been deleted successfully!')
      console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
      return promptUser();
   })
}

updateEmployeeManager = (employeeId, manager_id) => {
   const sql = `UPDATE employees
                  SET manager_id = ?
                  WHERE id = ?;`
   const params = [manager_id, employeeId]
   db.query(sql, params, (err, results) => {
      if (err) {
         return console.log(err.message)
      }
      console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
      console.log("Employee's manager has been updated successfully!")
      console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
      return promptUser()
   })
}

eraseRole = (roleId) => {
   const sql = `DELETE FROM roles WHERE id = ?`
   const params = [roleId]

   db.query(sql, params, (err, results) => {
      if (err) {
         return console.log(err)
      }
      console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
      console.log('Role has been deleted successfully!')
      console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
      return promptUser();
   })
}

eraseDepartment = (departmentId) => {
   const sql = `DELETE FROM Departments WHERE id = ?`
   const params = [departmentId]

   db.query(sql, params, (err, results) => {
      if (err) {
         return console.log(err)
      }
      console.log("\nooooooooooooooooooooooooooooooooooooooooooooooooooooo")
      console.log('Department has been deleted successfully!')
      console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooo\n")
      return promptUser();
   })
}


 module.exports = 
{
   getEmployees,
   getRoles,
   getDepartments,
   updateEmployeeRole,
   updateEmployeeManager,
   eraseEmployee,
   eraseRole,
   eraseDepartment
}