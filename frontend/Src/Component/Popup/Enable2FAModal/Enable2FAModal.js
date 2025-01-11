import { Component } from "../../Component.js";
import { getCookie, getProfileData, fetchData, setCookie, updateUserData } from "../../../../utils.js";

const name = 'enable-2fa-modal';

const componentStyle = `
  .inputs input {
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      border: #1e4950 3px solid;
  }

  .form-control:focus {
      box-shadow: none;
      border: 2px solid red
  }

  #qr-code{
    height: 50%;
    width: auto;
  }

  .modal-body{
    display:  flex;
    flex-direction: column;
    align-items: center;
  }
`;

export class Enable2FAModal extends Component {
  #modal;
  #qr_code;
  #otpInputs;
  #bootstrapModal;
  
  constructor() {
    super(componentStyle);
  }

  render() {
    return `
      <div class="modal fade" id="modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 h2">Please enter the OTP to verify your account</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">

              <div id = "qr-code" class = "d-flex flex-column justify-content-center"></div>

              <div class="position-relative">
                <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                    <input class="m-2 text-center form-control rounded" type="text" id="first" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="second" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="third" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button id="submit-otp" class="btn btn-primary" data-bs-dismiss="modal">Submit-OTP</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  postCreate()
  {
    this.#modal = super.querySelector('#modal');
    this.#qr_code = super.querySelector('#qr-code');
    this.#otpInputs = super.querySelectorAll("#otp input");
    this.#bootstrapModal = new bootstrap.Modal(this.#modal);
    
    this.#otpInputs.forEach((input, index) => {
      input.addEventListener("input", (event) => {
        const currentInput = event.target;
        if (currentInput.value.length === 1 && index < this.#otpInputs.length - 1) {
          this.#otpInputs[index + 1].focus();
        }
      });
  
      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && input.value === "" && index > 0) {
          this.#otpInputs[index - 1].focus();
        }
      });
    });

    super.addComponentEventListener(this.querySelector("#submit-otp"),
    "click",
    this.enable_otp);
  }

  openModal() {
    this.#bootstrapModal.show();
  }

  closeModal() {
    this.#bootstrapModal.hide();
  }

  create_qr() {
    if (!getCookie("qr-link")) {
      console.log("QR link cookie not found");
      return;
    }
  
    if (this.#qr_code.children.length > 0) {
      console.log("QR Code already created");
      return;
    }

    const qr_link = getCookie("qr-link");
    new QRCode(this.#qr_code, {
      text: qr_link,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  async enable_otp() {
    const username = document.querySelector("#usernameInput");
    const password = document.querySelector("#passwordInput");
    const otpValue = Array.from(this.#otpInputs)
    .map(input => input.value)
    .join("");
    let requestBody;
    try {
      if (password && username)
      {
        requestBody = {
          username: username.value,
          password: password.value,
          otp: otpValue,
        };
        const res = await fetchData('auth/login/', requestBody, 'POST', false);
        setCookie("access", 7, res.access);
        setCookie("refresh", 7, res.refresh);
        window.Router.navigate('/game-menu-page/');
      }
      else{
        requestBody = {
          otp: otpValue,
        };
        this.toggle_2fa_enable(requestBody);
      }
    } 
    catch (error) {
      alert("Invalid OTP")
    }
  }

  async toggle_2fa_enable(requestBody)
  {
    const data = await getProfileData();
    let res;
    if(!data.mfa_enabled)
    {
      console.log('enable 2fa!');
      res = await fetchData('/auth/2fa/enable/', requestBody, 'POST');
      await updateUserData(res);
      const button2fa = document.querySelector('#button_2fa');
      if(button2fa)
      {
        button2fa.innerHTML = 'disable 2FA';
        button2fa.classList.remove('btn-success');
        button2fa.classList.add('btn-danger');
      }
    }
    else
    {
      console.log('disable 2fa!');
      res = await fetchData('/auth/2fa/disable/', requestBody, 'POST');
      await updateUserData(res);
      const button2fa = document.querySelector('#button_2fa');
      if(button2fa)
      {
        button2fa.innerHTML = 'enable 2FA';
        button2fa.classList.remove('btn-danger');
        button2fa.classList.add('btn-success');
      }
    }
  }
}
  
  // Register Custom Element
  customElements.define(name, Enable2FAModal);