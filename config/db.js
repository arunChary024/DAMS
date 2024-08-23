const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dams'
})

connection.connect()

module.exports = connection