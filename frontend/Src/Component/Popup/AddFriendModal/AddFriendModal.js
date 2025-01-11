import { Component } from "../../Component.js";
import { getCookie, getProfileData, fetchData, setCookie } from "../../../../utils.js";

const name = 'add-friend-modal';

const componentStyle = `
  #title {
    font-size: 1.5em;
    font-weight: bold;
  }

  input {
      background-color:  white;
      width: 400px;
      border: 3px solid #000;
      border-radius: 10px;
      font-size: 30px;
  }

  #add-frind-img {
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

export class AddFriendModal extends Component {
  #modal
  #bootstrapModal;
  
  constructor() {
    super(componentStyle);
  }

  render() {
    const add_frind_img = window.Images.getFile("8.png");
    return `
      <div class="modal fade" id="modal">
        <div id="modal-block" class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div id="content-space" class="modal-body">

              <img id="add-frind-img" src=${add_frind_img}>

              <div id="title" class="mb-3"> Enter a username to send a friend request. </div>

              <input type=text id="display-name" class="mb-3">

              <button id="info" class="btn btn-success btn-lg mb-3"> ~ Send Meow ~ </button>

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
  }

  openModal() {
    this.#bootstrapModal.show();
  }

  closeModal() {
    this.#bootstrapModal.hide();
  }
}
  
  // Register Custom Element
  customElements.define(name, AddFriendModal);