'use strict';

module.exports = {
    '/': {
        template: 'feedback.html',
        controller: require('./controllers/sendFeedback'),
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
