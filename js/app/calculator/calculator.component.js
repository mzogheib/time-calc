'use strict';

// Register the `calculator` component on the `calculator` module
angular.
    module('calculator').
    component('calculator', {
        templateUrl: 'js/app/calculator/calculator.template.html',
        controller: function TimeCalcController() {
            var self = this;

            self.calculate = calculate;
            self.reset = reset;

            init();

            function init () {
                self.fromTimestamp = moment();

                self.modYears = 0;
                self.modMonths = 0;
                self.modWeeks = 0;
                self.modDays = 0;
                self.modHours = 0;
                self.modMinutes = 0;
                self.modSeconds = 0;

                self.toTimestamp = null;
            }

            function calculate () {
                self.toTimestamp = self.fromTimestamp
                    .clone()
                    .add(self.modYears, 'years')
                    .add(self.modMonths, 'months')
                    .add(self.modWeeks, 'weeks')
                    .add(self.modDays, 'days')
                    .add(self.modHours, 'hours')
                    .add(self.modMinutes, 'minutes')
                    .add(self.modSeconds, 'seconds');
            }

            function reset () {
                init();
            }
        }
    });
