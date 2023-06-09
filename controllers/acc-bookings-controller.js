
const Acc_bookingsDao = require('../dao/acc-bookings-dao');
const Acc_datesDao = require('../dao/acc-dates-dao');

class Acc_bookingsController {
    constructor(db) {
        // Create DAO for communicating with the databases
        this.dao = new Acc_bookingsDao(db, "acc_bookings");
		this.datesdao=new Acc_datesDao(db,"acc_dates")
    }

   
    async findAllacc_bookings(req, res) {
         try {
            const acc_b = await this.dao.findAllacc_bookings();
            res.json(acc_b);    
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

  
 
    async book(req, res) {

        try {   
			console.log(req.body)
			if (req.body.accID && req.body.thedate && req.body.npeople){			
			    const accid = await this.dao.book(req.body.accID, req.body.thedate,req.body.npeople);
				const acc_d = await this.datesdao.reduce_avalibility(accid);
			    res.json({id: accid});
		    }else{
				res.status(401).json({error: "Fill all the fields"});
				 
			}
			    
				  
        } catch(e) {
			console.log(e)
            res.status(500).json({error: e});
		}	
}
}
module.exports =Acc_bookingsController; // so that the router can use it
/////////////////////////////