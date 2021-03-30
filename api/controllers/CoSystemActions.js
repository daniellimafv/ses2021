const sql = require('mssql')
const { poolPromise } = require('../../mssql-db')

module.exports = app => {
    const controller = {};

        //List all System Actions
        controller.listSystemActions = (req, res) => {

          (async function () {
    
            try {
    
              const pool = await poolPromise
    
              const result = await pool.request()
                .query('Select * From [ses-db].[dbo].[SystemActions]')
    
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