const sql = require('mssql')
const { poolPromise } = require('../../mssql-db')

module.exports = app => {
    const UsersDB = app.data.DaUsers;
    const controller = {};
  
    controller.listUsers = (req, res) => {
      res.status(200).json(UsersDB)
    };

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

    return controller;
  }