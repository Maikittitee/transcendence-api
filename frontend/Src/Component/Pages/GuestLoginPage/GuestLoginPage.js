import { Component } from "../../Component.js";
import { setCookie, errorDisplay } from "../../../../utils.js";

const name = "guest-login-page";

const componentStyle = `
  .menu {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      color: rgb(0, 0, 0);
      font-family: 'Itim', sans-serif;
      text-align: center;
      height: 80%;
      width: 50%;
  }

  .frame {
    height: auto;
    width: 60%;
    border: #1e4950 3px solid;
    border-radius: 30px;
    background-color: rgba(146,220,253, 0.5);
    padding: 35px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .frame div {
      padding-bottom: 20px;
  }

  .frame h1 {
      display: flex;
      flex-direction: row;
      align-self: start;
      padding-bottom: 20px;
      font-size: 50px;
  }

  .frame button {
      font-size: 30px;
  }

  #backButton {
      display: flex;
  }

  #MeowPongTitle{
      padding: 0;
      margin: 0;
      width: max(100%, 300px);
  }

  #error-msg{
      color: red;
  }
`;

export class GuestLoginPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    return `

      <div class = "menu">
        <img id = "MeowPongTitle" src=${meowTitleSrc}>
    
        <div class = "container-sm frame">
                
            <h1>LOGIN</h1>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="usernameInput" placeholder="Username" required>
                <label for="usernameInput">Username</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                <label for="passwordInput">Password</label>
            </div>

            <div id = "error-msg" class = "text-start"></div>

            <button type="login" class="btn btn-primary">login</button>

        </div>
      </div>

      <enable-2fa-modal></enable-2fa-modal>
      <error-modal></error-modal>
    `;
  }
  postCreate() {
    sessionStorage.setItem('status', name);
    super.addComponentEventListener(this.querySelector(".btn-primary"),
    "click",
    this.login_as_guest);
  }

  async login_as_guest()
  {
    const username = this.querySelector("#usernameInput").value;
    const password = this.querySelector("#passwordInput").value;

	// Create the request body
	const requestBody = {
		username: username,
		password: password,
	};

  try 
  {
    const res = await fetchData('/auth/login/', requestBody, 'POST', false);
    setCookie("access", 1, res.access);
    setCookie("refresh", 7, res.refresh);
    window.Router.redirect('/game-menu-page/');
  } 
  catch (error) 
  {
    if(error.body.detail === '2FA token required')
    {
      const modal = this.querySelector('enable-2fa-modal');
      modal.openModal();
    }
    else
    {
      const errModal = this.querySelector("error-modal");
      errorDisplay(errModal, error);
    }
  }
}
}

customElements.define(name, GuestLoginPage);