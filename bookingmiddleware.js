//user middleware in a seperate file into a funtion
const dotenv = require('dotenv').config();
function usermiddleware(req, res, next) {
	console.log("middleware!")
	if ((req.body.thedate == null)||(req.body.npeople== null)) {
		console.log("is nul!!!")
		// process.env.APP_USER does not exist (it's undefined)
		// Return a 401 (Unauthorized) HTTP code, with a JSON error message
		res.status(401).json({ error: "Please fill all fields- you missed one of your fileds empty!" });
	} else {
		next();
	}
}

module.exports = usermiddleware;

