export async function renderPlay() {
	const html		= await fetch('pages/play/play.html');
	const htmlText	= await html.text();
    const dynamicContent = document.querySelector('#DynamicContent');
    
    dynamicContent.innerHTML = htmlText;
    // Manually create and append the script element
    let script = document.createElement('script');
    script.src = './pages/play/pong.js';
    script.defer = true;
    dynamicContent.appendChild(script);
}