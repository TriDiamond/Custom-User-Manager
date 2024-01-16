window.onload = onLoad;
function onLoad() {
alert("Its Working");
 fetch("userman?action=getUserDetails", {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	    },
	  })
	    .then(function (response) {
	      if (!response.ok) {
	        throw new Error(`Response status: ${response.status}`);
	      }
	      return response.json();
	    })
	    .then(function (data) {
	      const projectId = data.projectId;
	      const selectElement = document.getElementById("projectDropDown");
	      for (const [id, name] of Object.entries(projectId)) {
	        const option = document.createElement("option");
	        option.value = id;
	        option.text = name;
	        selectElement.appendChild(option);
	      }
	    })
	    .catch(function (error) {
	      console.error("Error message is", error.message);
	    });
}