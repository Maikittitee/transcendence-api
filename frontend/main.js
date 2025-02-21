import * as App from './Src/index.js';
import {pageLoadManager, fetchData, getCookie} from './utils.js';

async function setPageLoadIndex()
{
    sessionStorage.removeItem('pageLoadIndex');
    let oauthRedirectInProgress = sessionStorage.getItem('oauthRedirectInProgress');
    if (oauthRedirectInProgress)
    {
        sessionStorage.removeItem('oauthRedirectInProgress');
        sessionStorage.setItem('pageLoadIndex', "42_login");
        return ;
    }
    else {
    let access_token = await getCookie("access");
    if(access_token == null)
    {
        sessionStorage.setItem('pageLoadIndex', "home");
        return ;
    } else {
            try
            {
                await fetchData('/auth/users/me/');
                sessionStorage.setItem('pageLoadIndex', "game");
            }
            catch (error) 
            {
                sessionStorage.setItem('pageLoadIndex', "home");
            } 
        }
    }
}

async function setApp() {
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
        new App.Route('/local-play-page/', 'local-play-page'),
        new App.Route('/loading/', 'loading-page'),
    ]);
    window.Router = Router; // make Router as a global object
}

await setApp();
await setPageLoadIndex();
pageLoadManager();