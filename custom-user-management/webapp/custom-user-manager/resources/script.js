window.addEventListener("load", function() {
	
	    // Generate a unique timestamp to avoid caching
    var timestamp = new Date().getTime();
 
    // Append the timestamp as a query parameter to the URL
    var url = `usertag?action=getUserDetails&_nocache=${timestamp}`;
    
	fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function(response) {
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			return response.json();
		})
		.then(function(data) {
			const userMap = data.userMap;
			populateTable(userMap);
			console.log("UserMap is:" + userMap);

		})
		.catch(function(error) {
			console.error("Error message is", error.message);
		});
});

function populateTable(userMap) {
    const userTableBody = document.getElementById("userTableBody");
 
    // Clear existing table rows
    userTableBody.innerHTML = "";
 
    // Iterate over userMap properties and populate the table
    for (const userId in userMap) {
        if (userMap.hasOwnProperty(userId)) {
            const userName = userMap[userId];
 
            // Create a new table row
            const row = userTableBody.insertRow();
 
            // Insert user ID cell
            const cellId = row.insertCell(0);
            cellId.textContent = userId;
 
            // Insert user name cell
            const cellName = row.insertCell(1);
            cellName.textContent = userName;
        }
    }
}
