module.exports = app => {
    const controller = app.controllers.CoLogin;

    app.route('/api/v1/ValidadeOneTimeId')
      .get(controller.validadeOneTimeid) //Validate OneTimeId
      .post(controller.updateLoginData); //UPdate on database the current login data (ip, last ping date) from user

    app.route('/api/v1/updateLoginData')
      .post(controller.updateLoginData); //UPdate on database the current login data (ip, last ping date) from user
  }