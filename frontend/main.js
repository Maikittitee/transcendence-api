// require('dotenv').config()

// const UID = process.env.UID
// const FT_CLIENT_SECRET = process.env.FT_CLIENT_SECRET
// const REDIRECT_URI = process.env.REDIRECT_URI
// const OAUTH_URL = process.env.OAUTH_URL
// const BASE_URL = process.env.BASE_URL

// console.log(UID);
// console.log(FT_CLIENT_SECRET);
// console.log(REDIRECT_URI);
// console.log(OAUTH_URL);
// console.log(BASE_URL);

import * as App from './Src/index.js';
import {handle_42Redirect, fetchData} from './utils.js';

async function initApp() {
    const Images = new App.Images();
    window.Images = Images;
    await window.Images.loadFiles();

    const APIs = new App.APIs(
        ["create-account"], 
        [new App.CreateAccountAPI()]
    );
    window.APIs = APIs;
    window.fetchData = fetchData;
    const app = document.querySelector('#App');
    const Router = new App.Router(app, [
        new App.Route('', 'home-page'),
        new App.Route('/guest-login-page/', 'guest-login-page'),
        new App.Route('/register-page/', 'register-page'),
        new App.Route('/game-menu-page/', 'game-menu-page'),
        new App.Route('/play-menu-page/', 'play-menu-page'),
        new App.Route('/edit-profile-page/', 'edit-profile-page'),
        new App.Route('/match-making-page/', 'match-making-page'),
        new App.Route('/game-play-page/', 'game-play-page'),
        new App.Route('/loading/', 'loading-page'),
    ]);
    window.Router = Router; // make Router as a global object
    let is_oauthRedirectInProgress = sessionStorage.getItem('oauthRedirectInProgress');
    if (is_oauthRedirectInProgress == null)
    {
        console.log("is_oauthRedirectInProgress: " + is_oauthRedirectInProgress);
        Router.init();
    }
}

initApp();
document.addEventListener('DOMContentLoaded', handle_42Redirect);