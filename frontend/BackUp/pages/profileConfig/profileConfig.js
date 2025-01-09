// profileConfig.js
export async function renderProfileConfig() {
	const html		= await fetch('pages/profileConfig/profileConfig.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#DynamicContent');
	const dynamicStyle = document.querySelector('#dynamicStyle');

	dynamicContent.innerHTML = '';
	const flexContainer = document.createElement("div");
	flexContainer.classList.add("flex-container");
	flexContainer.innerHTML = htmlText;
	dynamicStyle.href = "pages/profileConfig/profileConfig.css";
	dynamicContent.appendChild(flexContainer);
}