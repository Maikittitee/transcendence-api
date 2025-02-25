import {A_API} from "../A_API/A_API.js"

export class OAuth42API extends A_API {
    constructor() {
        super();
    }

    set_url() {
        const clientId = '';
        const redirectUri = 'http://localhost:8000/';
        const responseType = 'code';
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: responseType
        });
        return `http://api.intra.42.fr/oauth/authorize?${params.toString()}`;
    }

    set_method() {
        return 'GET';
    }

    set_header() {
        return { 'Content-Type': 'application/json' };
    }

    set_body() {
        return null; // ไม่ใช้ body ในกรณีนี้
    }

    after_fetch(responseData) {
        console.log('OAuth authorization request sent successfully!');
        window.location.href = responseData.url;
    }
}