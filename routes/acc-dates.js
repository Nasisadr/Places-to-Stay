//Router for acc-dates

const express = require('express');
const acc_datesRouter = express.Router();
const con=require('../mysqlconn');
const Acc_datesController = require('../controllers/acc-dates-controller'); 


// Create the controller object, and pass in the database connection as an argument
const accdController = new Acc_datesController(con);

// search for all accomodation using findAllaccomodation method from AccomodationController
acc_datesRouter.get('/all', accdController.findAllacc_dates.bind(accdController));

// search for accomodation by given location using findaccomodation_location method from AccomodationController
acc_datesRouter.post('/reduce/:accid', accdController.reduce_avalibility.bind(accdController));







module.exports = acc_datesRouter; // so that main application can use it