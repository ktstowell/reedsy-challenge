/***********************************************************************************************************************************************
 * REEDSY FILTERS - DATE TIME
 ***********************************************************************************************************************************************
 * @description
 */
(function() {
  'use strict';

  angular.module('System.Filters')
    .filter('datetime', function() {
      var now = (new Date());
          now.year = now.getFullYear();
          now.month = (now.getMonth())+1;
          now.day = now.getDate();

      var deltaLabelsMap = {
        'years ago': 'year',
        'year ago': 'year',
        'months ago': 'month',
        'month ago': 'month',
        'days ago': 'day',
        'day ago': 'day',
        'today': 'today'
      };

      return function(input) {
        var date = new Date(input),
            value = input,
            published = {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            };

        var delta = {
          year: now.year - published.year,
          month: now.month - published.month,
          day: now.day - published.day,
          today: ''
        };

        var labels = {
          'years ago': (delta.year > 1),
          'year ago': (delta.year === 1),
          'months ago': (!delta.year && delta.month > 1),
          'month ago': (!delta.year && delta.month === 1),
          'days ago': (!delta.year && !delta.month && delta.day > 1),
          'day ago': (!delta.year && !delta.month && delta.day === 1),
          today: (!delta.year && !delta.month && !delta.day)
        };

        for(var label in labels) {
          if(labels[label]) {
            value = delta[deltaLabelsMap[label]] + ' ' + label;
            break;
          }
        }

        return value;
      }
    });
})();
