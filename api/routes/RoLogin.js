module.exports = app => {
    const controller = app.controllers.CoLogin;
  
    //app.route('/api/v1/Login')
      //.get(controller.login) //Return Users data and access level

    app.route('/api/v1/ValidadeOneTimeId')
      .get(controller.validadeOneTimeid); //Validate OneTimeId
  }