import {A_API} from "../A_API/A_API.js"

class OAuthCodeAPI extends A_API {
    constructor(oauthCode) {
        super();
        this.oauthCode = oauthCode;
    }

    set_url() {
        return `http://localhost:9000/auth/callback?code=${this.oauthCode}`;
    }

    set_method() {
        return 'POST';
    }

    set_header() {
        return {'Content-Type': 'application/json'};
    }

    set_body() {
        return null;
    }

    after_fetch(responseData) {
        console.log('Backend response:', responseData);
    }
}