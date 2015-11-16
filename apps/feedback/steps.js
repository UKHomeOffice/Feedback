'use strict';

module.exports = {
    '/': {
        template: 'feedback.html',
        controller: require('./controllers/send-feedback'),
        fields: [
            'feedback-radio',
            'howto-improve'
        ],
        next: '/confirm'
    },
    '/confirm': {
        template: 'confirm.html'
    }
};
