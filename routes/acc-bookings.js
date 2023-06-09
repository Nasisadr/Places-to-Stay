//Router for acc-bookings

const express = require('express');
const acc_bookingsRouter = express.Router();
const con=require('../mysqlconn');
const Acc_bookingsController = require('../controllers/acc-bookings-controller'); 


// Create the controller object, and pass in the database connection as an argument
const accbController = new Acc_bookingsController(con);

// search for all accomodation using findAllaccomodation method from AccomodationController
acc_bookingsRouter.get('/all', accbController.findAllacc_bookings.bind(accbController));

// search for accomodation by given location using findaccomodation_location method from AccomodationController
acc_bookingsRouter.post('/book', accbController.book.bind(accbController));







module.exports = acc_bookingsRouter; // so that main application can use it