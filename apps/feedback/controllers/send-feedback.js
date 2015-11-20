'use strict';

var util = require('util');
var _ = require('underscore');

var Controller = require('../../../lib/base-controller');
var Model = require('../../common/models/email');
var Logger = require('../../../lib/logger');

var Submit = function Submit() {
    Controller.apply(this, arguments);
};

util.inherits(Submit, Controller);

function getReports(req) {
    var sessionData = _.pick(req.sessionModel.toJSON(), _.identity);
    var data = sessionData.report;
    return data;
}

Submit.prototype.getValues = function locals(req) {
    /* get Form Name */
    var formName = req.query.formName;
    if (formName !== undefined) {
      req.sessionModel.set('formName', formName);
    } else {
      Logger.error('Form Name has not been added.');
    }

    Controller.prototype.getValues.apply(this, arguments);
};

Submit.prototype.saveValues = function saveValues(req, res, callback) {
  var array = [];
  var formValues = req.form.values;
  array.push(formValues);
  req.sessionModel.set('report', array);
  var data = getReports(req);
  var formName = req.sessionModel.get('formName');

  if (formName === undefined) {
    formName = 'Unknown Form';
    Logger.error('Form Name is unknown.');
  }

  if (data && data.length) {
      data.forEach(function sendEachReport(d) {
          var model = new Model(d);
          var service = {
              template: 'feedback',
              subject: 'Feedback for ' + formName
          };

          if (service) {
              model.set('template', service.template);
              model.set('subject', service.subject);
          } else {
              throw new Error('no service found');
          }

          model.save(callback);

      });
  } else {
    Logger.error('There is no data! No email sent!');
  }
};

module.exports = Submit;
