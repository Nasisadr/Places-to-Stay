const Acc_datesDao = require('../dao/acc-dates-dao');


class Acc_datesController {
    constructor(db) {
        // Create DAO for communicating with the databases
        this.dao = new Acc_datesDao(db, "acc_dates");
    }

   
    async findAllacc_dates(req, res) {
         try {
            const acc_d = await this.dao.findAllacc_dates();
            res.json(acc_d);    
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

  
 
    async reduce_avalibility(req, res) {
        try {
			const accid = await this.dao.reduce_avalibility(req.params.accid);
		
            res.json({id: accid});
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
	
	
}

module.exports =Acc_datesController; // so that the router can use it
/////////////////////////////