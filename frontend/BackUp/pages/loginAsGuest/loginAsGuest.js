import { navigateTo } from "../../router.js";

export async function renderLoginAsGuest() {
	const html		= await fetch('pages/loginAsGuest/loginAsGuest.html');
	const htmlText	= await html.text();
	const menuElement = document.querySelector('.menu');
	const frameMenuElement = document.createElement("div");
	const loginOption = document.querySelector('#loginOption');

	if (loginOption) {
		loginOption.remove();
	}
	dynamicStyle.href = "pages/loginAsGuest/loginAsGuest.css";
	frameMenuElement.classList.add("container-sm");
	frameMenuElement.classList.add("frame");
	frameMenuElement.innerHTML = htmlText;
	menuElement.appendChild(frameMenuElement);

	const loginButton = document.querySelector('.btn.btn-primary');
	loginButton.addEventListener('click', loginAsGuest);
}

async function loginAsGuest() {
	const username = document.getElementById("floatingInput").value;
	const password = document.getElementById("floatingPassword").value;

	// Create the request body
	const requestBody = {
		username: username,
		password: password
	};

	// Set up the request headers and options for a POST request
	let requestHeader = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody)  // Convert the JavaScript object to a JSON string
	};

	// Fetch data from the server with a POST request
	const response = await fetch("http://localhost:9000/auth/login", requestHeader);

	// Handle the response
	if (response.ok) {
		const responseData = await response.json();
		// Check for specific message in response data
		if (responseData) {
			console.log("Login successfully!: ", responseData);
			navigateTo("gameMenu")
		}
	} else {
		console.error("Error: ", response.statusText);
	}
}
