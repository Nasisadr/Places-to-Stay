//user middleware in a seperate file into a funtion
const dotenv = require('dotenv').config();
function usermiddleware(req, res, next) {
	if (!req.session.username) {
		// process.env.APP_USER does not exist (it's undefined)
		// Return a 401 (Unauthorized) HTTP code, with a JSON error message
		res.status(401).json({ error: "You're not logged in. Go away!" });
	} else {
		next();
	}
}

module.exports = usermiddleware;
