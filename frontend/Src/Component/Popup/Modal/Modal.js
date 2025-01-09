import { Component } from "../../Component.js";

const name = 'modal-component';

const componentStyle = `

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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    }
  
    openModal(title = "Modal Title", message = "Modal content goes here.") {
      this.#modalTitle.innerHTML = title;
      this.#modalBody.innerHTML = message;
  
      const modal = new bootstrap.Modal(this.#modal);
      modal.show();
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