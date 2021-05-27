const sql = require('mssql')
const { poolPromise } = require('../../mssql-db')
var tools = require('../../tools');

module.exports = app => {
    const controller = {};
  
    //List all Users
    controller.listUsers = (req, res) => {

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      (async function () {

        try {

          const pool = await poolPromise

          const result = await pool.request()
            .query('Exec [dbo].[ListAllUsers]')

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

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

          const {
            userid,
          } = req.params;

          (async function () {
    
            try {
    
              const pool = await poolPromise
    
              //tools.validateGUID(userid)

              const result = await pool.request()
                .input('id', sql.VarChar(100), userid)
                .query('Exec dbo.[ListOneUsers] @id')
    
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

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      (async function () {

        try {

          const pool = await poolPromise

          tools.validateName(req.body.name)
          tools.validateUserName(req.body.username)
          tools.validateOneTimeId(req.body.onetimeid)
          tools.validateGUID(req.body.clearancelevel)

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

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      const {
        userid,
      } = req.params;

      (async function () {

        try {

          const pool = await poolPromise

          tools.validateGUID(userid)

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

    //Update User
    controller.updateUser = (req, res) => {

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      const {
        userid,
      } = req.params;

      (async function () {

        try {

          const pool = await poolPromise

          tools.validateGUID(userid)
          tools.validateGUID(req.body.clearancelevel)
          tools.validateName(req.body.name)

          const result = await pool.request()
            .input('name', sql.VarChar(100), req.body.name)
            .input('clearancelevel', sql.UniqueIdentifier, req.body.clearancelevel)
            .input('id', sql.UniqueIdentifier, userid)
            .query('Update a set a.Name = @name, a.ClearanceLevel = @clearancelevel From [User] a Where a.id = @id')

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

    return controller;
  }