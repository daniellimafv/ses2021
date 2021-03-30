module.exports = app => {
    const controller = app.controllers.CoSystemActions;

    app.route('/api/v1/SystemActions')
      .get(controller.listSystemActions);
  }