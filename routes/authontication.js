const express = require('express');
const AuthonicationRouter = express.Router();
const con=require('../mysqlconn')



const authonticationController = require('../controllers/authontication-controller'); 


// Create the controller object, and pass in the database connection as an argument
const sController = new authonticationController(con);


// handle get requests to route /id/:id using the controller's findAllsong() method
AuthonicationRouter.post('/login', sController.userlogin.bind(sController));
AuthonicationRouter.post('/logout', sController.userlogout.bind(sController));
AuthonicationRouter.get('/login', sController.usergetlogin.bind(sController));

module.exports = AuthonicationRouter; 

