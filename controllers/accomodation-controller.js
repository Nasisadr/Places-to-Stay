const AccomodationDao = require('../dao/accomodation-dao');
const Acc_datesDao = require('../dao/acc-dates-dao');

class AccomodationController {
	constructor(db) {
		// Create a DAO for communicating with the database
		this.dao = new AccomodationDao(db, 'accommodation');
	}

	async findAllaccomodation(req, res) {
		try {
			const accomodation = await this.dao.findAllaccomodation();
			res.json(accomodation);
		} catch (e) {
			res.status(500).json({ error: e });
		}
	}

	async findaccomodation_location(req, res) {
		try {
			const accomodation = await this.dao.findaccomodation_location(req.params.location);
			res.json(accomodation);
		} catch (e) {
			res.status(500).json({ error: e });
		}
	}

	async findaccomodation_location_type(req, res) {
		try {
			const accomodation = await this.dao.findaccomodation_location_type(
				req.params.location,
				req.params.type
			);

			res.json(accomodation);
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: e });
		}
	}
}

module.exports = AccomodationController; // so that the router can use it