const { readFileSync } = require('fs');
var holidaysArray = [];

const getCalendar = (req, res) => {

    const yearParam = req.params.yyyymm.substring(0, 4);
    const monthParam = req.params.yyyymm.substring(4, 6) - 1; // value from 0 to 11

    if (yearParam < 1800 || yearParam > 2200 || monthParam < 0 || monthParam > 11)
        res.status(200).json({'error': 'Bad request'});
    else {
        const firstDay = getFirstDayOfMonth(yearParam, monthParam);
        const today = getTodaysDay();
        const monthLength = getMonthLength(yearParam, monthParam);

        getHolidaysForMonth(monthParam + 1, yearParam);

        var response = {'firstDay': firstDay, 'today': today, 'length': monthLength, 'holidays': holidaysArray};

        res.status(200).json(response);
    }
}

function getHolidaysForMonth(month, year) {

    // delete all previous results
    holidaysArray = [];

    const holidays = syncReadFile('./holidays.txt');

    for (var i = 0; i < holidays.length; i++) {
        var holidayMonth = holidays[i].substring(3, 5);

        if (month == holidayMonth) {
            var isRepeating = holidays[i].substring(holidays[i].length-1, holidays[i].length);

            if (isRepeating == 't') {
                holidaysArray.push(holidays[i].substring(0, 2) + holidays[i].substring(10, holidays[i].length-2));
            } else {
                var holidayYear = holidays[i].substring(6, 10);

                if (year == holidayYear) {
                    holidaysArray.push(holidays[i].substring(0, 2) + holidays[i].substring(10, holidays[i].length-2));
                }
            }
        }
    }
}

function isLeapYear(year) { 
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

function getFirstDayOfMonth(year, month) {
    return (new Date(year, month, 1)).toString().substring(0, 3);
}

function getTodaysDay() {
    return (new Date().getDate());
}

function getMonthLength(year, month) {
    const monthValues = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeapYear(year)) monthValues[1] = 29;

    return (monthValues[month]);
}

// reads ASCII txt file and returns the content delimited by \n in an array
function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);  
    return arr;
  }

module.exports = {
    getCalendar,
};