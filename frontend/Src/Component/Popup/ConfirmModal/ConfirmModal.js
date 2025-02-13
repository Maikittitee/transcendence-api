import { Component } from "../../Component.js";

const name = 'confirm-modal';

const componentStyle = `

`;

export class ConfirmModal extends Component {

    #modal;
    #modalTitle;
    #modalBody;
    #modalFooter;
    #bootstrapModal
    
    constructor() {
      super(componentStyle);
    }
  
    render() {
      return `
        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Modal Title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Modal content goes here.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button id="comfirm-button" type="button" class="btn btn-primary">Yes</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    postCreate()
    {
      this.#modal = super.querySelector('#modal');
      this.#modalTitle = super.querySelector('.modal-title');
      this.#modalBody = super.querySelector('.modal-body');
      this.#modalFooter = super.querySelector('.modal-footer');
      this.#bootstrapModal = new bootstrap.Modal(this.#modal);
    }
  
    openModal(title = "Modal Title", message = "Modal content goes here.") {
      this.#modalTitle.innerHTML = title;
      this.#modalBody.innerHTML = message;
      this.#bootstrapModal.show();
    }

    closeModal() {
      this.#bootstrapModal.hide();
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

    set_title_content(content) {
      setTimeout(() => {
         this.#modalTitle.innerHTML = content;
      }, 0);
   }
   
   set_body_content(content) {
      console.log("Setting body content:", content);
      setTimeout(() => {
         this.#modalBody.innerHTML = content;
      }, 0);
   }

    set_footer_content(Content) {
      this.#modalFooter.innerHTML = Content;
    }

    set_confirm_action(callback) {
      const confirmButton = this.#modalFooter.querySelector("#comfirm-button");
      if (confirmButton) {
        setTimeout(() => {
        confirmButton.onclick = callback;
      }, 0);
      }
    }
  }
  
  // Register Custom Element
  customElements.define(name, ConfirmModal);