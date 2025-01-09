import {A_API} from "../A_API/A_API.js"

export class CreateAccountAPI extends A_API {
    constructor() {
        super();
    }

    set_url() {
        return "http://localhost:9000/auth/register";
    }

    set_method() {
        return "POST";
    }

    set_body(username, email, password, confirm_password) {
        console.log(username, email, password, confirm_password);
        this.body = JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password
        });
    }

    pre_fetch() {
        if (!this.body) {
            throw new Error("Body must be set before calling pre_fetch");
        }
        console.log(this.body)
        const body = JSON.parse(this.body);
        if(!body.username || body.username === ""){
            console.error("empthy username data")
            throw new Error("Validation failed: Empty username");
        }
        if(!body.email || body.email === ""){
            console.error("empthy email data")
            throw new Error("Validation failed: Empty email");
        }
        if(!body.password || body.password === ""){
            console.error("empthy password data")
            throw new Error("Validation failed: Empty password");
        }
        if(!body.confirmpassword || body.confirm_password === ""){
            console.error("empthy confirmpassword data")
            throw new Error("Validation failed: Empty confirmpassword");
        }
    }

    async after_fetch(response) {
        if (response.status >= 200 && response.status <= 299) {
            console.log("Successful");
            window.Router.navigate('/guest-login/')
        } else {
            console.log("Failed with status:", response.status);
        }
    }
}