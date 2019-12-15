---
title: Check-in System
author: Gavin Daly
date: 2019-12-09
hero: ./images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg
hoursSavedPerYear: 50
moneySavedPerYear: $1000 / employee
technologyUsed:
  - Tessel Micro Controller
  - React
  - Ruby on Rails
  - Twilio
---


One of the problems we where having is having staff members keep consistent records, they used to have to calculate everything by hand. There were always errors in their math, and they were not submitting their hours on time.

So what I did was make a Tessel RFID check-in system. It sends a request to the server when the staff activates the RFID. In the app, I made a change request system that they have to fill out to correct any hours they have incorrect.

The check-in system has saved many hours, updating and checking their timesheets. The system saves the client money from not having their staff members spend time calculating their hours.