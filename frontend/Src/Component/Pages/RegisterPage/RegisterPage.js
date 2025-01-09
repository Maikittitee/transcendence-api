import { Component } from "../../Component.js";

const name = "register-page";

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

    .menu ul {
        list-style: none;
        padding-top: min(25%, 50px);
        margin: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .menu ul li {
        margin-bottom: 5vh;
        text-decoration: none;
        color: rgb(0, 0, 0);
        font-size: max(4vw, 25px);
        transition: color 0.3s;
        cursor: pointer;
        user-select: none;
    }

    .menu ul li:hover {
        color: #FFD700;
    }

    #MeowPongTitle{
        padding: 0;
        margin: 0;
        width: max(100%, 300px);
    }
        .frame {
        height: auto;
        width: 60%;
        border: #1e4950 3px solid;
        border-radius: 30px;
        background-color: rgba(146,220,253, 0.5);
        padding: 40px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        }

        .frame h1 {
        display: flex;
        flex-direction: row;
        align-self: start;
        padding-bottom: 15px;
        font-size: 45px;
        }

        .frame button {
        font-size: 30px;
        }

        #backButton {
        display: flex;
        }

`;

export class RegisterPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    return `
    
        <div class="menu">
            <img id="MeowPongTitle" src=${meowTitleSrc} alt="MeowPong Title">
            
            <div class="container-sm frame">
            <h1>REGISTER</h1>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="usernameInput" placeholder="Username" required>
                <label for="usernameInput">Username</label>
            </div>

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" required>
                <label for="emailInput">Email</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                <label for="passwordInput">Password</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="confirmPasswordInput" placeholder="Password">
                <label for="confirmPasswordInput">Confirm Password</label>
            </div>

            <button type="button" class="btn btn-primary">Create Account</button>
            </div>
        </div>

        <modal-component></modal-component>
    `;
  }

  postCreate() {
    super.addComponentEventListener(this.querySelector(".btn-primary"),
                                    "click",
                                    this.create_account);
  }

  async create_account() {
    const username = this.querySelector("#usernameInput").value;
    const email = this.querySelector("#emailInput").value;
    const password = this.querySelector("#passwordInput").value;
    const confirm_password = this.querySelector("#confirmPasswordInput").value;
  
    const requestBody = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password,
    };
  
    try {
        const res = await fetchData('auth/register/', requestBody, 'POST', false);
        const errModal = this.querySelector("modal-component");
        errModal.set_title_style({
          color: 'green',
          fontWeight: 'bold',
          fontSize: '36px'
        });
        errModal.openModal("Notification", `<div>Create Account Successful!</div>`);
        window.Router.navigate('/guest-login-page/')
    } catch (error) {
        if (error.status && error.body) {
          const errorMessages = Object.entries(error.body)
            .map(([field, messages]) => `<div>${field}: ${messages}</div>`) 
            .join('\n'); 
          const errModal = this.querySelector("modal-component");
          errModal.set_title_style({
            color: 'red',
            fontWeight: 'bold',
            fontSize: '36px'
          });
          errModal.openModal("Error", `<div>Registration failed </div> ${errorMessages}`);
        } else {
          const errModal = this.querySelector("modal-component");
          errModal.openModal("Error", 'Unexpected error occurred during registration.');
        }
    }
  }
}

customElements.define(name, RegisterPage);