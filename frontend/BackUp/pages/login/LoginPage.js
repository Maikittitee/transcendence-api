// LoginPage.js

export async	function renderLoginPage() {
    let html		= await fetch('pages/login/LoginPage.html');
	let htmlText	= await html.text();
	
	const DynamicContent = document.getElementById('DynamicContent');
	DynamicContent.innerHTML = htmlText;
}

document.addEventListener('click', function(event) {
    event.preventDefault();

    // Get the href attribute of the clicked element
    const href = event.target.getAttribute('href');

    // Ignore clicks where href is null or undefined
    if (!href) {
        return;
    }

    const loginType = href.replace('#', '');
    if (loginType === "42Login") {
        oauth42Api();
    }
});

async function oauth42Api() {
    const clientId = 'u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227';
    const redirectUri = 'http://localhost:8000/';
    const responseType = 'code';

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: responseType
    });
    const Oauth42Uri = `http://api.intra.42.fr/oauth/authorize?${params.toString()}`;
    console.log("Oauth42Uri = " + Oauth42Uri);
    let requestHeader = {
        method: 'GET',
        redirect: 'manual',
    };
    let response = await fetch(Oauth42Uri, requestHeader);
    sessionStorage.setItem('oauthRedirectInProgress', true);
    window.location.href = response.url;
    const currentURL = window.location.href;
    console.log(currentURL);
}