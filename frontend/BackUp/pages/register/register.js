import { navigateTo } from "../../router.js";

export async function renderRegisterPage() {
	const html		= await fetch('pages/register/register.html');
	const htmlText	= await html.text();
	const menuElement = document.querySelector('.menu');
	const frameMenuElement = document.createElement("div");
	const loginOption = document.querySelector('#loginOption');

	if (loginOption) {
		loginOption.remove();
	}
	dynamicStyle.href = "pages/register/register.css";
	frameMenuElement.classList.add("container-sm");
	frameMenuElement.classList.add("frame");
	frameMenuElement.innerHTML = htmlText;
	menuElement.appendChild(frameMenuElement);

	const createAccountButton = document.querySelector('.btn.btn-primary');
	createAccountButton.addEventListener('click', createAccount);
}

async function createAccount() {
	const username = document.getElementById("usernameInput").value;
	const email = document.getElementById("emailInput").value;
	const password = document.getElementById("passwordInput").value;
	const confirmpassword = document.getElementById("confirmPasswordInput").value;

	// Create the request body
	const requestBody = {
		username: username,
		email: email,
		password: password,
		confirmpassword: confirmpassword
	};
	
	// Validate the request data
	const isValid = isValidCreateAccountReq(requestBody);
	if (!isValid) {
		console.error("Validation failed. Please check input fields.");
		return; // Stop the function if validation fails
	}

	// Set up the request headers and options for a POST request
	let requestHeader = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody)  // Convert the JavaScript object to a JSON string
	};

	// Fetch data from the server with a POST request
	const response = await fetch("http://localhost:9000/auth/register", requestHeader);

	// Handle the response
	if (response.ok) {
		const responseData = await response.json();
		// Check for specific message in response data
		if (responseData.message !== 'Successful') {
			alert("The email or username already exists in the database.");
		} else {
			console.log("Account created successfully:", responseData);
			const frameMenuElement = document.querySelector('.frame');
			frameMenuElement.remove();
			navigateTo("guestLogin")
		}
	} else {
		console.error("Error:", response.statusText);
	}
}

// Validation function to check the request data
function isValidCreateAccountReq(data) {
	// Basic validation example
	if (!data.username || !data.email || !data.password || !data.confirmpassword) {
		alert("All fields are required.");
		return false;
	}
	if (data.password !== data.confirmpassword) {
		alert("Passwords do not match.");
		return false;
	}
	if (data.password.length < 6) {
		alert("Password should be at least 6 characters long.");
		return false;
	}
	// Add any other specific validation rules as needed
	return true;
}