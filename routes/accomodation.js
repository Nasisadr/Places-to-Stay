//Router for accomodation

const express = require('express');
const accomodationRouter = express.Router();
const con=require('../mysqlconn');
const AccomodationController = require('../controllers/accomodation-controller'); 


// Create the controller object, and pass in the database connection as an argument
const accomoController = new AccomodationController(con);

// search for all accomodation using findAllaccomodation method from AccomodationController
accomodationRouter.get('/all', accomoController.findAllaccomodation.bind(accomoController));

// search for accomodation by given location using findaccomodation_location method from AccomodationController
accomodationRouter.get('/location/:location', accomoController.findaccomodation_location.bind(accomoController));


// search for accomodation by given location and type using findaccomodation_location_type method from AccomodationController
accomodationRouter.get('/location/:location/type/:type', accomoController.findaccomodation_location_type.bind(accomoController));



module.exports = accomodationRouter; // so that main application can use it