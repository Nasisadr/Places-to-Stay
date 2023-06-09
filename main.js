//main.js

const app = require('./setup');
const bookmiddleware = require('./bookingmiddleware');
//Important:Middleware Must be before the routes#

//Middleware fot prevent all access to the /users group of routes unless the username exists in .env.
/*app.use('/users', (req, res, next) => {
	if (process.env.APP_USER === undefined) {
		// process.env.APP_USER does not exist (it's undefined)
		// Return a 401 (Unauthorized) HTTP code, with a JSON error message
		res.status(401).json({ error: "You're not logged in. Go away!" });
	} else {
		next();
	}
});

//Adding middleware to your server so that any POST request can only
//be accessed if the environment variable process.env.APP_USER exists.
app.post('*', (req, res, next) => {
	if (process.env.APP_USER === undefined) {
		// process.env.APP_USER does not exist (it's undefined)
		// Return a 401 (Unauthorized) HTTP code, with a JSON error message
		res.status(401).json({ error: "You're not logged in. Go away!" });
	} else {
		next();
	}
});
*/
// checking username and password
//This part should be before the middle wares
//console.log("111")
//const authorized=require('./routes/authontication');
////app.use('/authontication', authorized);
//console.log("22222")


//middleware should be before routes
// Middleware which protects any routes using POST or DELETE from access by users who are are not logged in
/*
app.use((req, res, next) => {
	//indexOf() will return 0 for POST, 1 for DELETE or -1 for any other method (such as GET)
	
    console.log("33333")
	console.log(req.session.username)
	if (['POST', 'DELETE'].indexOf(req.method) == -1) {
		next();
	} else {
		if (req.session.username) {
			next();
		} else {
			res.status(401).json({ error: "You're not logged in. Go away!" });
		}
	}
});
*/

const authonticationRouter = require('./routes/authontication');
app.use('/authontication', authonticationRouter);


const usermiddleware = require('./usermiddleware');
app.use('/acc_bookings', usermiddleware);






const accomodationRouter = require('./routes/accomodation');
const acc_datesRouter = require('./routes/acc-dates');
const acc_bookingsRouter= require('./routes/acc-bookings');




app.use('/acc_dates', acc_datesRouter);
app.use('/acc_bookings', acc_bookingsRouter);
app.use('/accomodation', accomodationRouter);




app.listen(3000);

async function startApp() {
	try {
		app.listen(3000);
	} catch (e) {
		console.error(`ERROR connecting to database: ${e}`);
	}
}





/*
const acc_bookingsRouter= require('./routes/acc-bookings');


const accomodationRouter = require('./routes/accomodation');
const acc_datesRouter = require('./routes/acc-dates');
app.use('/accomodation', accomodationRouter);

app.use('/acc_dates', acc_datesRouter);
app.use('/acc_bookings', acc_bookingsRouter);





/*

//app.use('/acc_bookings/book',bookingmiddleware);

app.use('/acc_bookings', (req, res, next) => {
	if ((req.body.thedate == null)||(req.body.npeople== null)) {
		// process.env.APP_USER does not exist (it's undefined)
		// Return a 401 (Unauthorized) HTTP code, with a JSON error message
		res.status(401).json({ error: "Please fill all fields" });
	} else {
		next();
	}
});
*/


