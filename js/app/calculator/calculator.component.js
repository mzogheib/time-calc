'use strict';

// Register the `calculator` component on the `calculator` module
angular.
    module('calculator').
    component('calculator', {
        templateUrl: 'js/app/calculator/calculator.template.html',
        controller: function TimeCalcController($scope) {
            var self = this;

            self.calculateFrom = calculateFrom;
            self.calculateMod = calculateMod;
            self.calculateTo = calculateTo;
            self.reset = reset;

            init();

            function init () {
                self.fromTimestamp = moment();
                self.fromTimestampFormatted = self.fromTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

                self.fromYear = self.fromTimestamp.year();
                self.fromMonth = self.fromTimestamp.month();
                self.fromWeek = self.fromTimestamp.week();
                self.fromDate = self.fromTimestamp.date();
                self.fromHour = self.fromTimestamp.hour();
                self.fromMinute = self.fromTimestamp.minute();
                self.fromSecond = self.fromTimestamp.second();

                self.modYears = 0;
                self.modMonths = 0;
                self.modWeeks = 0;
                self.modDays = 0;
                self.modHours = 0;
                self.modMinutes = 0;
                self.modSeconds = 0;

                calculateTo();
            }

            function calculateFrom () {
                self.fromTimestamp
                    .year(self.fromYear)
                    .month(self.fromMonth)
                    .date(self.fromDate)
                    .hour(self.fromHour)
                    .minute(self.fromMinute)
                    .second(self.fromSecond);

                self.fromTimestampFormatted = self.fromTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

                calculateTo();
            }

            function calculateMod () {
                console.log('Yo');
            }

            function calculateTo () {
                self.toTimestamp = self.fromTimestamp
                    .clone()
                    .add(self.modYears, 'years')
                    .add(self.modMonths, 'months')
                    .add(self.modWeeks, 'weeks')
                    .add(self.modDays, 'days')
                    .add(self.modHours, 'hours')
                    .add(self.modMinutes, 'minutes')
                    .add(self.modSeconds, 'seconds');

                self.toTimestampFormatted = self.toTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

                self.toYear = self.toTimestamp.year();
                self.toMonth = self.toTimestamp.month();
                self.toWeek = self.toTimestamp.week();
                self.toDate = self.toTimestamp.date();
                self.toHour = self.toTimestamp.hour();
                self.toMinute = self.toTimestamp.minute();
                self.toSecond = self.toTimestamp.second();
            }

            function reset () {
                init();
            }

        }
    });
