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
    justify-content: center;
    color: rgb(0, 0, 0);
    font-family: 'Itim', sans-serif;
    text-align: center;
    height: auto;
    width: 90%; /* Adjust width for smaller screens */
    max-width: 500px; /* Prevent excessive stretching */
}

.frame {
    width: 90%;
    max-width: 400px; /* Limits the width on larger screens */
    border: #1e4950 3px solid;
    border-radius: 20px;
    background-color: rgba(146, 220, 253, 0.5);
    padding: 20px; /* Reduce padding on smaller screens */
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.frame div {
    padding-bottom: 15px;
}

.frame h1 {
    display: flex;
    flex-direction: row;
    align-self: start;
    padding-bottom: 15px;
    font-size: 2rem; /* Use rem for scalability */
}

.frame button {
    font-size: 1.5rem;
    padding: 10px;
    width: 100%;
}

#MeowPongTitle {
    padding: 0;
    margin: 0;
    max-width: 100%; /* Prevents the image from overflowing */
    height: auto;
}

@media (max-width: 768px) {
    .menu {
        width: 95%;
        height: auto;
        padding: 10px;
    }

    .frame {
        width: 100%;
        padding: 15px;
    }

    .frame h1 {
        font-size: 1.8rem;
    }

    .frame button {
        font-size: 1.2rem;
    }
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
