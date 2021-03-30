const sql = require('mssql')
const { poolPromise } = require('../../mssql-db')

module.exports = app => {
    const controller = {};
  
    //List all Users
    controller.listUsers = (req, res) => {

      (async function () {

        try {

          const pool = await poolPromise

          const result = await pool.request()
            .query('Select * From [User]')

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

        //List one User
        controller.listUser = (req, res) => {

          const {
            userid,
          } = req.params;

          (async function () {
    
            try {
    
              const pool = await poolPromise
    
              const result = await pool.request()
                .input('id', sql.UniqueIdentifier, userid)
                .query('Select a.* From [User] a Where a.id = @id')
    
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

    //Add User
    controller.addUser = (req, res) => {

      (async function () {

        try {

          const pool = await poolPromise

          const result = await pool.request()
            .input('name', sql.VarChar(100), req.body.name)
            .input('username', sql.VarChar(8), req.body.username)
            .input('onetimeid', sql.VarChar(12), req.body.onetimeid)
            .input('clearancelevel', sql.UniqueIdentifier, req.body.clearancelevel)
            .query('Insert Into [User] (id, Name, UserName, OneTimeId, ClearanceLevel) values (NewId(), @name, @username, @onetimeid, @clearancelevel)')

          res.status(201).send({
                msg: 'User inserted'
              })

        }
        catch (err) {
          return res.status(500).send({
            err: err.message,
            response: null
          });
        }

      })()

    }

    //Delete User
    controller.deleteUser = (req, res) => {

      const {
        userid,
      } = req.params;

      (async function () {

        try {

          const pool = await poolPromise

          const result = await pool.request()
            .input('id', sql.UniqueIdentifier, userid)
            .query('Delete a From [User] a Where a.Id = @id')

          res.status(201).send({
                msg: 'User deleted'
              })

        }
        catch (err) {
          return res.status(500).send({
            err: err.message,
            response: null
          });
        }

      })()

    }

    return controller;
  }