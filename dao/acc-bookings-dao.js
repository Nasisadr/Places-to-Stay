class Acc_bookingsDao {
    // conn is our mysql database connection
    // table is the table storing the students
    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }
	
	findAllacc_bookings() {
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


    // book an accomodation

    book(accid,date,number) {
        return new Promise ( (resolve, reject) => {
            this.conn.query(`INSERT INTO  ${this.table}(accID,thedate,npeople) VALUES (?,?,?)`, [accid,date,number],
                (err, results, fields) => {
                    if(err) {
						console.log(err)
                        reject(err);
			
                    } else {
                        resolve(results.insertId); // resolve with the record's allocated ID
                    }
                });
        });
	  
    }
                            

  
	
	 
}

module.exports = Acc_bookingsDao; // so that other code can use it