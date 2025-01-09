// gameMenu.js

export async function renderGameMenu() {
	const html		= await fetch('pages/gameMenu/gameMenu.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#DynamicContent');
	const DynamicStyle = document.querySelector('#dynamicStyle');
	const flexContainer = document.createElement("div");

	flexContainer.classList.add("flex-container");
	flexContainer.innerHTML = htmlText;
    const profileImage = flexContainer.querySelector('#profileImage');
	const profileName = flexContainer.querySelector('#profileName');
	const profileDataString = localStorage.getItem('profileData');
	if (profileDataString) {
		const profileData = await JSON.parse(profileDataString);
		profileImage.src = profileData.profile;
		profileName.innerHTML = profileData.username;
	} else {
		profileImage.src = "GraphicElement/1.png";
		profileName.innerHTML = "Nameless";
	}
	DynamicStyle.href = "pages/gameMenu/gameMenu.css";
	dynamicContent.innerHTML = '';
	dynamicContent.appendChild(flexContainer);
}

// addEventListener('click', async function(

// ));