const sql = require('mssql')
const { poolPromise } = require('../../mssql-db')
var tools = require('../../tools');

module.exports = app => {
    const controller = {};

        //ValidadeOneTimeId
        controller.validadeOneTimeid = (req, res) => {

          (async function () {
    
            try {
    
              const pool = await poolPromise

              tools.validateUserName(req.body.userName)
              tools.validateOneTimeId(req.body.oneTimeId)
    
              const result = await pool.request()
                .input('username', sql.VarChar(8), req.body.userName)
                .input('onetimeid', sql.VarChar(12), req.body.oneTimeId)
                .query('Exec dbo.ValidadeOneTimeId @username, @onetimeid')
    
              res.status(200).json(result.recordset)
    
              return result.recordset
    
            }
            catch (err) {
              return res.status(500).send({
                err: err.message,
                response: null
              });
            }
    
          })()
    
        };

        //updateLoginData
        controller.updateLoginData = (req, res) => {

          (async function () {
    
            try {
    
              const pool = await poolPromise

              tools.validateUserName(req.body.userName)
    
              const result = await pool.request()
                .input('username', sql.VarChar(8), req.body.userName)
                .input('ip', sql.VarChar(50), req.body.ip)
                .query('Exec dbo.updateLoginData @username, @ip')
    
              res.status(200).json(result.recordset)
    
              return result.recordset
    
            }
            catch (err) {
              return res.status(500).send({
                err: err.message,
                response: null
              });
            }
    
          })()
    
        };

    return controller;
  }