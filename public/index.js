const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
//set up a map layer
L.tileLayer
		("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{ attribution: attrib } ).addTo(map);
//set the latitude and longitude of the centre of the map, here latitude=50.908, 
//longitude=-1.4. We pass the latitude and longitude in as a two-member array.            
map.setView([51,-1], 14);
	    
async function ajaxSearch(searchterm) {
	try {
		console.log("search")
		// Send a request to our remote URL
	
		const response = await fetch(`/accomodation/location/${searchterm}`);
		

		// Parse the JSON.
		const accomodations = await response.json();
		accomodations.forEach((accomodation) => {
			const pos = [accomodation.latitude, accomodation.longitude]; 
			L.marker(pos).addTo(map);
			const domDiv = document.createElement('div');
			const Text = document.createTextNode(`Name:${accomodation.name}" "Description:${accomodation.description} `);
			//var text2=` "Name:${accomodation.name}" "Description:${accomodation.description}"`
			domDiv.appendChild(Text);
			///////////////////////////			
			//adding booking details form
			/////////////////////////////
			//adding a label for number of people
			const label1=document.createTextNode("Please add number of people");
			domDiv.appendChild(label1);
			//adding a textbox 
			var np = document.createElement('input');
			np.setAttribute('type', 'Text');
			np.setAttribute('id', 'nptext');
			domDiv.appendChild(np);
			
			//break line
			var BR = document.createElement('BR');
			domDiv.appendChild(BR);


			//adding another label for the date
			const label2=document.createTextNode("Please add the date you wish to book in format(yyyy/mm/dd) ");
			domDiv.appendChild(label2);
			//adding date module
			var BR = document.createElement('BR');
			domDiv.appendChild(BR);
			//adding a textbox  var now = new Date();
			var now = new Date();
			var date = document.createElement('input');
			date.setAttribute('type', 'date');
			date.setAttribute('id', 'datetext');
			domDiv.appendChild(date);
		
			//break line
			var BR = document.createElement('BR');
			domDiv.appendChild(BR);
            //adding date element
			// var date = document.createElement('input');
			// date.setAttribute('Type', 'date');
			// domDiv.appendChild(date);
			// //line break
			// var BR = document.createElement('BR');
			// domDiv.appendChild(BR);
			
			
			//adding booking button
			var btn = document.createElement('input');
			btn.setAttribute('type', 'button');
			btn.setAttribute('value', 'Book');
			domDiv.appendChild(btn)
			
			//adding the whole domDIV to popup
            const marker = L.marker(pos).addTo(map);
			marker.bindPopup(domDiv);
			
			
			
			//we need to define an event listener for the button
			btn.addEventListener('click', async (e) => {

					//reading entered value by user
				const accID = accomodation.ID;
				var npeople=document.getElementById('nptext').value;
				var thedate=document.getElementById('datetext').value;
			
				const date2 = new Date(thedate);
				var thedate=`${date2.getFullYear()-2000}${date2.getMonth()+1}${date2.getDate()}`;
				
				const acc = {
					"accID": accID,
					"thedate": thedate,
					"npeople": npeople
				};
				console.log("acc")
				console.log(acc)
				const response = await fetch(`/acc_bookings/book`, {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json',
					},
					body: JSON.stringify(acc),
					
				});

				if (response.status == 200) {
					var text2=`Accomodation with "ID:${accomodation.ID}" "Name:${accomodation.name}" Successfully Booked!`
					alert(text2);
				}else if (response.status==400)  {
					alert('Please fill all the fields!');
				}else if (response.status==401)  {
					alert('Please Login before book!');
				}else if (response.status==500) {				
					alert('server error');
				}

				// Parse the JSON.
				//const products = await response.json();
			});
		    
			
		});
		//L.marker takes an array of two members, latitude and longitude
		
		map.on("click", e => {
			// "e.latlng" is an object (of type L.LatLng) representing the mouse click 
			// position
			// It has two properties, "lat" is the latitude and "lng" is the longitude.
			alert(`You clicked at:${e.latlng.lat} ${e.latlng.lng}`);
		});



	

		
        /*
		// Loop through the array of JSON objects and add the results to a <div>
		//This is a way to access to HTML elemnts in client side code
		let html = `<table>`;
		html += `<tr>`;
		html += `<th> Name</th>`;
		html += `<th> Type</th>`;
		html += `<th> Location</th>`;
		html += `<th> Description </th>`;
		html += `</tr>`;
		html += `</table>`;
		
		*/
        /*
		accomodations.forEach((accomodation) => {
			// Create a brand new paragraph element 
			var node1 = document.createElement('p');

			// Create a brand new text node 
			var text1 = document.createTextNode(
				`${accomodation.name} -- ${accomodation.type} --${accomodation.location} --${accomodation.description}`
			);
			console.log("text1")
			console.log(text1)

			/* Add the text node to the paragraph 
			node1.appendChild(text1);

			/* Add the new node to the results <div> 
			document.getElementById('results').appendChild(node1);

			//it is better to have input for the button
			var btn = document.createElement('input');
			document.getElementById('results').appendChild(btn);
			btn.setAttribute('type', 'button');
			btn.setAttribute('value', 'Book');
			const accID = accomodation.ID;
			const thedate="220601";
			const npeople= "1";
			const acc = {
				"accID": accID,
				"thedate": thedate,
				"npeople": npeople
			};
			console.log("acc")
            console.log(acc)
			
			//we need to define an event listener for the button
			btn.addEventListener('click', async (e) => {
				const response = await fetch(`/acc_bookings/book`, {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json',
					},
					body: JSON.stringify(acc),
					
				});

				if (response.status == 200) {
					var text2=`Accomodation with "ID:${accomodation.ID}" "Name:${accomodation.name}" Successfully Booked!`
					alert(text2);
				}else if (response.status==401)  {
					alert('Please fill all the fields!');
				}else if (response.status==500) {				
					alert('server error');
				}

				// Parse the JSON.
				//const products = await response.json();
			});
		});
		*/

	} catch (e) {
		alert(`There was an error: ${e}`);
	}


}
async function createlogginform() {
	try {
		//displaying  loggin fprm elements
		document.getElementById('username').style.display = 'block';
		document.getElementById('password').style.display = 'block';
		document.getElementById('ajaxloginbtn').style.display = 'block';
	    document.getElementById('passwordlbl').style.display = 'block';
	    document.getElementById('usernamelbl').style.display = 'block';
		document.getElementById('btnlogout').style.display = 'none';
		document.getElementById('userdetail').style.display = 'none';
		
		

		//eventlisener on loggin button to calling loggin route
		ajaxloginbtn.addEventListener('click', async (e) => {
				//getting username and passport
			const username = document.getElementById('username').value;
			const password = document.getElementById('password').value;
			//creating a user object
			const user = {
				username: username,
				password: password,
			};
			console.log("bbbbb")
		    console.log(user)
			const response = await fetch(`/authontication/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			if (response.status == 200) {
				// Parse the JSON.
	            
			   // const user2 = await response.json();
				console.log("login route successful");
			    createlogginmessage(user);
				
			} else {
				
				alert('Username or Password is wrong');
			}
			
		});

		
	} catch (e) {
		alert(`There was an error: ${e}`);
    }
}

async function createlogginmessage(user) {
	try {
		//displaying  loggin fprm elements
		document.getElementById('username').style.display = 'none';
		document.getElementById('password').style.display = 'none';
		document.getElementById('ajaxloginbtn').style.display = 'none';
	    document.getElementById('passwordlbl').style.display = 'none';
	    document.getElementById('usernamelbl').style.display = 'none';
		document.getElementById('btnlogout').style.display = 'block';
		document.getElementById('userdetail').style.display = 'block';
	
		
		//var node1 = document.createElement('p');
        console.log(user.username)
		/* Create a brand new text node */
		//var text1 = document.createTextNode(`Logged in as ${user.username}`);

		/* Add the text node to the paragraph */
		//node1.appendChild(text1);
		document.getElementById('userdetail').innerHTML=`Logged in as ${user.username}`

		/* Add the new node to the results <div> */
		//document.getElementById('results').appendChild(node1);
		btnlogout.addEventListener('click', async (e) => {
			const response = await fetch(`authontication/logout`, {
				method: 'POST',
			});
			if (response.status == 200) {
				alert('Successfully Logged out');
				//calling loggin form
				 createlogginform();
			} else if (response.status == 401) {
				alert('you are not logged in');
			} else if (response.status == 40) {
				alert('Please fill all the fields');
			}else {
				alert('There is somthing wrong');
			}

		
		});
		
	} catch (e) {
	   alert(`There was an error: ${e}`);
	}
}

// Make the AJAX run when we click a button
document.getElementById('ajaxButton').addEventListener('click', () => {
	// Read the location from a text field
	console.log("ajaxstarted")
	const searchterm = document.getElementById('searchterm').value;
	ajaxSearch(searchterm);
});



//Reload event
//This fuction will be run when the page loads

async function loadpage_event() {
	try {
				
		const response = await fetch(`/authontication/login`);
		const user = await response.json();
		console.log("aaaaa")
		console.log(user)
		if (user.username == null) {
			createlogginform();
		} else {
			createlogginmessage(user);
			console.log(user.username)

		}         
		
	} catch (e) {
		alert(`There was an error: ${e}`);
	}
}

loadpage_event();
