import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Calendar } from '../classes/calendar';
import { Day } from '../classes/day';

declare var require: any;
var validateDate = require("validate-date");

var currentMonthNumber = new Date().getMonth() + 1;
var currentMonthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
  new Date()
);
var currentYear = new Date().getFullYear();

var queryParam = currentYear.toString() + currentMonthNumber.toString();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  mySubscription: any;

  constructor (private apiService: ApiService) {};

  title = currentMonthName + ', ' + currentYear;

  day = 1;
  week: Day[] = [];
  month: any[] = [];
  calendar: Calendar;
  dataLoaded = false;

  calendarForm = {'month': '', 'year': ''};
  
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  /*

  */
  private fillInData(): void {
    
    // fill the first week up to first day included
    for (var dayIx = 0; dayIx < 7; dayIx++) {
      if (this.calendar.firstDay == this.weekDays[dayIx]) {

        var returnedHolidayName = this.isHoliday(this.day);

        if (returnedHolidayName == '') {
          this.week.push({'day': this.weekDays[dayIx], 'number': this.day.toString(), 'holiday': false, holidayName: ''});
        } else {
          this.week.push({'day': this.weekDays[dayIx], 'number': this.day.toString(), 'holiday': true, holidayName: returnedHolidayName});
        }
        this.day++;
        
        for (var i = dayIx+1; i < 7; i++) {
          returnedHolidayName = this.isHoliday(this.day);

          if (returnedHolidayName == '') {
            this.week.push({'day': this.weekDays[i], 'number': this.day.toString(), 'holiday': false, holidayName: ''});
          } else {
            this.week.push({'day': this.weekDays[i], 'number': this.day.toString(), 'holiday': true, holidayName: returnedHolidayName});
          }
          this.day++;
        }

        break;
      } else {
        this.week.push({'day': this.weekDays[dayIx], 'number': '-', 'holiday': false, holidayName: ''});
      }
    }

    // add first week to the month object
    this.month.push(this.week);
    // reset week
    this.week = [];

    // fill the rest of weeks in the month
    for (var weekIx = 1; weekIx < 6; weekIx++) {
      for (var dayIx = 0; dayIx < 7; dayIx++) {
        if (this.calendar.length < this.day) {
          this.week.push({'day': this.weekDays[dayIx], 'number': '-', 'holiday': false, holidayName: ''});
        } else {
          var returnedHolidayName = this.isHoliday(this.day);
          
          if (returnedHolidayName == '') {
            this.week.push({'day': this.weekDays[dayIx], 'number': this.day.toString(), 'holiday': false, holidayName: ''});
          } else {
            this.week.push({'day': this.weekDays[dayIx], 'number': this.day.toString(), 'holiday': true, holidayName: returnedHolidayName});
          }

          this.day++;
        };
      }
      this.month.push(this.week);
      this.week = [];
    }
  }

  /*
    Returns the holiday name, if parameter day is found in holiday array. Otherwise returns empty string.
  */
  isHoliday(day: number): string {
    for (var i = 0; i < this.calendar.holidays.length; i++) {
      if (day == parseInt(this.calendar.holidays[i].substring(0, 2))) {
        return this.calendar.holidays[i].substring(3, this.calendar.holidays[i].length);
      }
    }
    return '';
  }

  dateInput = '';
  /*
    Prepares calendar data and refreshes the component if data format in input field is correct.
    Gets called on every keypress if input field is focused.
  */
  onKey(event: any) {

    this.dateInput = event.target.value;

    if (validateDate(this.dateInput, "boolean", "DD/MM/YYYY")) {

      //parse input to yyyymm format for API call
      queryParam = this.dateInput.substring(6, 10) + this.dateInput.substring(3, 5);

      // delete old data
      this.day = 1;
      this.week = [];
      this.month = [];
      this.calendar;
      this.dataLoaded = false;

      currentMonthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
        new Date(queryParam.substring(4, 6))
      );

      this.title = currentMonthName + ', ' + queryParam.substring(0, 4);

      // refresh component
      this.ngOnInit();
    }
  }

  /*
    Prepares calendar data based on calendar form data.
  */
  goToSelectedDate() {

    if (parseInt(this.calendarForm.year) > 2200 || parseInt(this.calendarForm.year) < 1800) {
      alert('Invalid Year. Year value must be between 1800 and 2200.');
    } else {
      queryParam = this.calendarForm.year + this.calendarForm.month;

      // delete old data
      this.day = 1;
      this.week = [];
      this.month = [];
      this.calendar;
      this.dataLoaded = false;

      currentMonthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
        new Date(queryParam.substring(4, 6))
      );

      this.title = currentMonthName + ', ' + queryParam.substring(0, 4);

      // refresh component
      this.ngOnInit();
    }
  }

  ngOnInit(): void {

    // delete input from input field
    const resetInputField = document.getElementById("anyDateInput") as HTMLInputElement | null;
    if (resetInputField != null) {
      resetInputField.value = '';
    }

    // call the main service function to load calendar data
    this.apiService.getCalendarData(queryParam).subscribe((list) => {
      this.calendar = list;
      this.fillInData();
      this.dataLoaded = true;
    },(error) => {
      console.log("err", error);
    });
  }
}