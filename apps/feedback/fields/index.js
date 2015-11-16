'use strict'

module.exports = {

    'feedback-radio': {
        validate: ['required'],
        className: ['inline', 'form-group'],
        legend: {
            className: 'visuallyhidden',
            value: ''
        },
        options: [{
            value: 'Very satisfied',
            label: 'fields.feedback-radio.options.very-satisfied.label'
        },  {
            value: 'Satisfied',
            label: 'fields.feedback-radio.options.satisfied.label'
        },  {
            value: 'Neither satisfied or dissatisfied',
            label: 'fields.feedback-radio.options.neither.label'
        },  {
            value: 'Dissatisfied',
            label: 'fields.feedback-radio.options.dissatisfied.label'
        },  {
            value: 'Very dissatisfied',
            label: 'fields.feedback-radio.options.very-dissatisfied.label'
        }]
    },

    'howto-improve': {
        label: 'fields.howto-improve.label'
    }

};
