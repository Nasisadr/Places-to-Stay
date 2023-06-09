class AccomodationDao {
    // conn is our mysql database connection
   
    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }
	
	findAllaccomodation() {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} `,
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        // resolve with null if no results - this is not considered an error, so we do not reject
                        resolve(null); 
                    } else {
                        // only one student will be found but "results" will still be an array with one member. 
                        // To simplify code which makes use of the DAO, extract the one and only row from the array 
                        // and resolve with that.
                        resolve(results);
                    }
                });
        });
    }


    // find accomodation by location

    findaccomodation_location(location) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE location=?`, [location],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else if (results.length == 0) {
                        // resolve with null if no results - this is not considered an error, so we do not reject
                        resolve(null); 
                    } else {
                        // only one student will be found but "results" will still be an array with one member. 
                        // To simplify code which makes use of the DAO, extract the one and only row from the array 
                        // and resolve with that.
                        resolve(results);
                    }
                });
        });
    }
                            

    // find accomodation by location and type
    findaccomodation_location_type(location, type) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE location=? AND type=?`, [location, type],
                (err, results, fields) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }
	
}

module.exports = AccomodationDao; // so that other code can use it