'use strict';

// Register the `calculator` component on the `calculator` module
angular.
    module('calculator').
    component('calculator', {
        templateUrl: 'js/app/calculator/calculator.template.html',
        controller: function TimeCalcController() {
            var self = this;
            
            self.fromDate = 0;
            
            self.modYears = 0;
            self.modMonths = 0;
            self.modWeeks = 0;
            self.modDays = 0;
            self.modHours = 0;
            self.modMinutes = 0;
            self.modSeconds = 0;
            
            self.toDate = 0;
            
            self.increment = function increment () {
                self.toDate = self.fromDate + self.modYears;
            }
        }
    });
