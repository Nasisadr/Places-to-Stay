//database module


const mysql = require('mysql2');
//global

const con = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: 'admin',
	database: 'waddb',
});

con.connect((err) => {
	if (err) {
		console.log(`Error connecting to mysql: ${err}`);
		process.exit(1); // Quit the Express server with an error code of 1
	} else {
		// Once we have successfully connected to MySQL, we can setup our
		// routes, and start the server.
		console.log('connected to mysql ok');


    };

});

//exporting database module to using in the other modules
module.exports = con;
