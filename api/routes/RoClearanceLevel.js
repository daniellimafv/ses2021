module.exports = app => {
    const controller = app.controllers.CoClearanceLevel;

    app.route('/api/v1/ClearanceLevel')
      .get(controller.listClearanceLevel);
  }