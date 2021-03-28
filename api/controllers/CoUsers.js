module.exports = () => {
    const UsersDB = require('../data/DaUsers.json');
    const controller = {};
  
    controller.listUsers = (req, res) => res.status(200).json(UsersDB);
  
    return controller;
  }