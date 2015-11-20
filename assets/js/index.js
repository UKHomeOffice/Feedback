'use strict';

var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);

var $ = require('jquery');
var typeahead = require('typeahead.js-browserify');
var Bloodhound = require('typeahead.js-browserify').Bloodhound;

typeahead.loadjQueryPlugin();

var nonEuCountries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: require('./countries').nonEuCountries
});

var allCountries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: require('./countries').allCountries
});

var wordCounts = {};

function wordCount(field) {
  var number = 0;
  var matches = $(field).val().match(/\b/g);
  if (matches) {
    number = matches.length / 2;
  }
  wordCounts[field] = number;
  var finalCount = 0;
  $.each(wordCounts, function count(k, v) {
    finalCount += v;
  });
  $('#finalCount').text(finalCount);
}

$('#howto-improve').keyup(function keyup() {
  wordCount(this);
});


$('#nationality, #nationality-error, #nominated-nationality')
.typeahead({
  minLength: 1,
  hint: false,
  limit: 5
}, {
  name: 'nonEuCountries',
  source: nonEuCountries
});

$('#country, #someone-else-nationality, #change-person-nationality').typeahead({
  minLength: 1,
  hint: false,
  limit: 5
}, {
  name: 'allCountries',
  source: allCountries
});
