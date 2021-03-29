const sql = require('mssql')
const config = {
    "user" : "ses",
    "password" : "ses2021!",
    "database" : "ses-db",
    "server" : "34.71.192.53",
    "port" : 1433
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}