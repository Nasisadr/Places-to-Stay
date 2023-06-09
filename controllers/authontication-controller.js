// assume the DAO is in a 'student.js' file within the 
//'dao' folder of the project, as described above
const AuthonticationDao = require('../dao/authontication-dao'); 

class AuthonticationController {
    constructor(db) {
        // Create a DAO for communicating with the database
        this.dao = new AuthonticationDao(db, "acc_users");
    }

    // findStudentById()
    // calls the DAO's findStudentById() method, passing the ID parameter to
    // it, and formats the JSON returned.
  	
	
	async userlogin(req, res) {
      
			try {
				console.log("controller")
				console.log(req.body.username)
				console.log(req.body.password)
			
				const user = await this.dao.userlogin(req.body.username,req.body.password);
				   // Remember from the DAO that the promise resolves with null if there are no result
				
				console.log(user)
				if(user == null) {
					res.status(404).json({error: "username or password is wrong"});
				} else {
					req.session.username = req.body.username;
					res.status(200).json({username:req.body.username})    
				}
			} catch(e) {
				res.status(500).json({error: e});
			}
	        
			
    }
	
	 async userlogout(req, res) {
        try {
			   
               req.session = null;
               res.json({'success': 1 });    
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
	
	
	async usergetlogin(req, res) {
        try { 
			   console.log("88888")
			   console.log(req.session.username)
               res.json({username: req.session.username || null} );    
			   console.log(req.session.username)
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
	
	
	
}

module.exports = AuthonticationController; // so that the router can use it