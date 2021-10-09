const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maki@1951',
    database: 'employeetracker'
    },
    console.log('Connected to the sql database.')
)

module.exports = db