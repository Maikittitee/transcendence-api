import { Component } from "../../Component.js";
import { getCookie, getProfileData, fetchData, setCookie } from "../../../../utils.js";

const name = 'accept-friend-modal';

const componentStyle = `
  #title {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center
  }

  input {
      background-color:  white;
      width: 400px;
      border: 3px solid #000;
      border-radius: 10px;
      font-size: 30px;
  }

  #friend-img {
    width: 50%;
  }

  #content-space {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  #modal-block {
    height: 50%;
    width: 50%;
  }

  #display-name {
    width: 80%;
  }
`;

export class AcceptFriendModal extends Component {
  #modal
  #bootstrapModal;
  
  constructor() {
    super(componentStyle);
  }

  render() {
    const default_profile = window.Images.getFile("1.png");
    return `
      <div class="modal fade" id="modal">
        <div id="modal-block" class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div id="content-space" class="modal-body">

              <img id="friend-img" src=${default_profile}>

              <div id="title" class="m-3"> Are you sure you want to accept default_username as your friend? </div>
              
              <div class="d-flex justify-content-between w-50">
                <button id="no" class="btn btn-danger btn-lg mb-3"> Nahh </button>
                <button id="yes" class="btn btn-success btn-lg mb-3"> Yes! </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;
  }

  postCreate()
  {
    this.#modal = super.querySelector('#modal');
    this.#bootstrapModal = new bootstrap.Modal(this.#modal);
    super.addComponentEventListener(this.querySelector("#no"),
    "click",
    this.closeModal);
  }

  openModal() {
    this.#bootstrapModal.show();
  }

  closeModal() {
    this.#bootstrapModal.hide();
  }
}
  
  // Register Custom Element
  customElements.define(name, AcceptFriendModal);