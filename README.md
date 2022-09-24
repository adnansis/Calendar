# Calendar

## Description

This is a simple Web App that displays a Calendar for any year between 1800 and 2200. Main functionalities are:

- Jump to any date in above mentioned range by typing it in the input box located in upper right corner. Date format is DD/MM/YYYY. Days and months with value below 10 must be written with leading zero (0).
- Jump to any date by selecting a month in dropdown select box and typing in a year in the number input box next to it, both located under the Calendar. Then click the **Go** button.
- Write down holidays that you want to see on the Calendar in a text file **holidays.txt** located in the root folder of the app. A few examples are already in the file. Format is **DD/MM/YYYY;holiday name;repeating** where repeating must have value of **t** for repeating or **f** for not repeating holiday. Every holiday must be written in a separate line.

Sundays are market with red text. Holidays are marked with red rectangle. Hovering over a holiday shows the holiday name.

## How to run

### Prerequirements:

- Installed Node.js on your system. Download links can be found here: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- OS: Microsoft Windows 10 or 11
- Web Browser: Google Chrome

**The Calendar is not tested and not guaranteed to work on any other OS and/or Web Browser combination other than the one mentioned above.**

### Steps to run:

- Clone the repository
- Run the Calendar.ps1 script located in the root folder
- Wait for script to complete. You should get a message **√ Compiled successfully.**
- Open your web browser and visit [http://localhost:4200](http://localhost:4200/)
