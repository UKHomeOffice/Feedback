'use strict';

var logger = require('../../lib/logger');
var nodemailer = require('nodemailer');
var config = require('../../config');
var i18n = require('hof').i18n;
var Hogan = require('hogan.js');
var i18nLookup = require('hof').i18nLookup;
var fs = require('fs');
var path = require('path');

var customerPlainTextTemplates = {
  feedback: fs.readFileSync(
    path.resolve(__dirname, './templates/plain/feedback.mus')).toString('utf8')
};

var translationLocation = {
  feedback: 'feedback'
};

var transport = config.email.auth.user === '' ?
  require('nodemailer-stub-transport') : require('nodemailer-smtp-transport');

function Emailer() {
  this.transporter = nodemailer.createTransport(transport({
    host: config.email.host,
    port: config.email.port,
    secure: true,
    auth: config.email.auth,
    ignoreTLS: false
  }));
}

Emailer.prototype.send = function send(email, callback) {
  var locali18n = i18n({
    path: path.resolve(
      __dirname, '../../apps/', './' + translationLocation[email.template], './translations/__lng__/__ns__.json'
    )
  });

  locali18n.on('ready', function locali18nLoaded() {
    var lookup = i18nLookup(locali18n.translate.bind(locali18n));
    var templateData = {
      data: email.dataToSend,
      t: function t() {
        return function lookupTranslation(translate) {
          // for translations inside our mustache templates
          return lookup(Hogan.compile(translate).render(email.dataToSend));
        };
      }
    };

    function sendCustomerEmail() {
        callback();
    }

    logger.info('Emailing caseworker: ', email.subject);
    this.transporter.sendMail({
      from: config.email.from,
      to: config.email.to,
      subject: email.subject,
      text: Hogan.compile(customerPlainTextTemplates[email.template]).render(templateData),
      html: ''
    }, sendCustomerEmail.bind(this));
  }.bind(this));
};

module.exports = new Emailer();
