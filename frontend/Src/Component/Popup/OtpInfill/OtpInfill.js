import { Component } from "../../Component.js";

const name = 'modal-component';

const componentStyle = `
    .height-100 {
        height: 100vh
    }

    .card {
        width: 400px;
        border: none;
        height: 300px;
        box-shadow: 0px 5px 20px 0px #d2dae3;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center
    }

    .card h6 {
        color: red;
        font-size: 20px
    }

    .inputs input {
        width: 40px;
        height: 40px
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0
    }

    .card-2 {
        background-color: #fff;
        padding: 10px;
        width: 350px;
        height: 100px;
        bottom: -50px;
        left: 20px;
        position: absolute;
        border-radius: 5px
    }

    .card-2 .content {
        margin-top: 50px
    }

    .card-2 .content a {
        color: red
    }

    .form-control:focus {
        box-shadow: none;
        border: 2px solid red
    }

    .validate {
        border-radius: 20px;
        height: 40px;
        background-color: red;
        border: 1px solid red;
        width: 140px
    }
`;

export class Modal extends Component {

    #modal;
    #modalTitle;
    #modalBody;
    #modalFooter;
    
    constructor() {
      super(componentStyle);
    }
  
    render() {
      return `

      `;
    }

    postCreate()
    {
        document.addEventListener("DOMContentLoaded", function() {
            function OTPInput() {
                const inputs = document.querySelectorAll('#otp > input');
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].addEventListener('input', function() {
                        if (this.value.length > 1) {
                            this.value = this.value[0]; //    
                        }
                        if (this.value !== '' && i < inputs.length - 1) {
                            inputs[i + 1].focus(); //   
                        }
                    });
                    inputs[i].addEventListener('keydown', function(event) {
                        if (event.key === 'Backspace') {
                            this.value = '';
                            if (i > 0) {
                                inputs[i - 1].focus();   
                            }
                        }
                    });
                }
            }
            OTPInput();
            const validateBtn = document.getElementById('validateBtn');
            validateBtn.addEventListener('click', function() {
                let otp = '';
                document.querySelectorAll('#otp > input').forEach(input => otp += input.value);
                alert(`Entered OTP: ${otp}`);  
            });
        });
    }
  
    openModal(title = "Modal Title", message = "Modal content goes here.") {
      this.#modalTitle.innerHTML = title;
      this.#modalBody.innerHTML = message;
  
      const modal = new bootstrap.Modal(this.#modal);
      modal.show();
    }
  
    closeModal() {
      const modal = new bootstrap.Modal(this.#modal);
      modal.hide();
    }


    // Method to set title style
    set_title_style(style) {
      // Apply custom styles to modal title
      Object.assign(this.#modalTitle.style, style);
    }

    // Method to set body style
    set_body_style(style) {
      // Apply custom styles to modal body
      Object.assign(this.#modalBody.style, style);
    }

    // Method to set modal style
    set_modal_style(style) {
      // Apply custom styles to the modal container
      Object.assign(this.#modal.style, style);
    }

    // Method to modify modal footer content
    modify_footer(footerContent) {
      // Set custom content for the footer
      this.#modalFooter.innerHTML = footerContent;
    }
  }
  
  // Register Custom Element
  customElements.define(name, Modal);