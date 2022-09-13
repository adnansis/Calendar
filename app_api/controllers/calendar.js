const getCalendar = (req, res) => {

    const year = req.params.yyyymm.substring(0, 4);
    const month = req.params.yyyymm.substring(4, 6) - 1;

    const firstDay = getFirstDayOfMonth(year, month);
    const isLeap = isLeapYear(year);

    var myJSON = {'firstDay': firstDay, 'isLeap': isLeap};

    res.status(200).json(myJSON);
}

function isLeapYear(year) { 
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

function getFirstDayOfMonth(year, month) {
    return (new Date(year, month, 1)).toString().substring(0, 3);
}

module.exports = {
    getCalendar,
};