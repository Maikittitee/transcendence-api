import { Component } from "../../Component.js";
import { errorDisplay } from "../../../../utils.js";

const name = "register-page";

const componentStyle = `

    .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: rgb(0, 0, 0);
    font-family: 'Itim', sans-serif;
    text-align: center;
    height: auto; /* Let the height adjust based on content */
    width: 80%; /* Use a percentage of the screen width */
    max-width: 600px; /* Prevents it from being too wide */
    margin: 10vh auto; /* Centers the menu */
   }

    .menu ul {
        list-style: none;
        padding-top: 5vh; /* Adjusted for better spacing */
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
        width: 100%; /* Ensures it scales with the screen */
        max-width: 300px; /* Keeps a max width */
        text-align: center; /* Centers the title */
    }

    .frame {
        height: auto;
        width: 80%; /* Scales width based on the screen size */
        max-width: 600px; /* Prevents it from getting too wide */
        border: #1e4950 3px solid;
        border-radius: 30px;
        background-color: rgba(146, 220, 253, 0.5);
        padding: 5vw; /* Scales padding based on viewport width */
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .frame h1 {
    display: flex;
    flex-direction: row;
    align-self: start;
    padding-bottom: 15px;
    font-size: 4vw; /* Scalable font size */
    }


      .frame button {
      font-size: 2rem; /* Scales based on font size */
    }

      @media (max-width: 768px) {
        .menu {
        width: 90%; /* Ensure it takes up more space on smaller screens */
      }

        .frame h1 {
            font-size: 5vw; /* Slightly larger for smaller screens */
      }

        .frame button {
           font-size: 1.5rem; /* Slightly smaller on smaller screens */
      }
    }
        #backButton {
        display: flex;
        justify-content: center; /* Center the button */
        align-items: center;
        width: 100%;
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

        <error-modal></error-modal>
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
        const res = await fetchData('/auth/register/', requestBody, 'POST', false);
        const errModal = this.querySelector("error-modal");
        errModal.set_title_style({
          color: 'green',
          fontWeight: 'bold',
          fontSize: '36px'
        });
        errModal.openModal("Notification", `<div>Create Account Successful!</div>`);
        window.Router.navigate('/guest-login-page/');
    } catch (error) {
      const errModal = this.querySelector("error-modal");
      errorDisplay(errModal, error);
    }
  }
}

customElements.define(name, RegisterPage);
