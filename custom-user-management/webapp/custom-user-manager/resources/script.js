window.addEventListener("load", function() {

	var timestamp = new Date().getTime();
	var currentUrl = window.location.href;
	var queryString = currentUrl.split('?')[1];
	var params = new URLSearchParams(queryString);

	var scopeValue = params.get('scope');
    var url = "";
	if (params.has('scope')) {
		console.log("Scope parameter is present.");
        console.log("Scope is:"+ scopeValue);
		
		var projectScope = scopeValue.split('project/')[1];
		var projectId = projectScope.split('/')[0];
	    var url = `usermana?action=getUserDetails&projectId=${projectId}&_nocache=${timestamp}`;
	    console.log("Url"+url);

	} else {
		console.log("Scope parameter is not present.");
	}


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
	let isLightRow = true;

	// Clear existing table rows
	userTableBody.innerHTML = '';

	// Iterate over userMap properties and populate each row separately
	for (const userId in userMap) {
		if (userMap.hasOwnProperty(userId)) {
			const userName = userMap[userId];


			const newRow = document.createElement("tr");

			// Add a class to the new row based on the light/dark alternating logic
			newRow.classList.add(isLightRow ? "polarion-rpw-table-content-row-light" : "polarion-rpw-table-content-row-dark");

			// Toggle the light/dark status for the next row
			isLightRow = !isLightRow;

			const cellId = document.createElement("td");
			const cellName = document.createElement("td");


			cellId.textContent = userId;
			cellName.textContent = userName;


			newRow.appendChild(cellId);
			newRow.appendChild(cellName);


			userTableBody.appendChild(newRow);
		}
	}
}