module.exports = app => {
    const controller = require('../controllers/CoUsers')();
  
    app.route('/api/v1/Users')
      .get(controller.listUsers);
  }