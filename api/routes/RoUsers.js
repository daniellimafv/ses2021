module.exports = app => {
    const controller = app.controllers.CoUsers;
  
    app.route('/api/v1/Users')
      .get(controller.listUsers)
      .post(controller.addUser);
  }