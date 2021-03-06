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
                self.fromDate = self.fromTimestamp.date();
                self.fromHour = self.fromTimestamp.hour();
                self.fromMinute = self.fromTimestamp.minute();
                self.fromSecond = self.fromTimestamp.second();
                self.fromEOM = self.fromTimestamp.clone().endOf("month").date();

                self.modYears = 0;
                self.modMonths = 0;
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

                self.fromEOM = self.fromTimestamp.clone().endOf("month").date();

                self.fromTimestampFormatted = self.fromTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

                calculateTo();
            }

            function calculateMod () {
                self.toTimestamp
                    .year(self.toYear)
                    .month(self.toMonth)
                    .date(self.toDate)
                    .hour(self.toHour)
                    .minute(self.toMinute)
                    .second(self.toSecond);

                self.toEOM = self.toTimestamp.clone().endOf("month").date();

                self.toTimestampFormatted = self.toTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

                self.modYears = self.toYear - self.fromYear;
                self.modMonths = self.toMonth - self.fromMonth;
                self.modDays = self.toDate - self.fromDate;
                self.modHours = self.toHour - self.fromHour;
                self.modMinutes = self.toMinute - self.fromMinute;
                self.modSeconds = self.toSecond - self.fromSecond;
            }

            function calculateTo () {
                self.toTimestamp = self.fromTimestamp
                    .clone()
                    .add(self.modYears, 'years')
                    .add(self.modMonths, 'months')
                    .add(self.modDays, 'days')
                    .add(self.modHours, 'hours')
                    .add(self.modMinutes, 'minutes')
                    .add(self.modSeconds, 'seconds');

                self.toEOM = self.toTimestamp.clone().endOf("month").date();

                self.toTimestampFormatted = self.toTimestamp.format("dddd, MMMM Do YYYY, h:mm:ss a");

                self.toYear = self.toTimestamp.year();
                self.toMonth = self.toTimestamp.month();
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
