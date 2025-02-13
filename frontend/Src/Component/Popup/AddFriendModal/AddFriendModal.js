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
    const add_frind_img = window.Images.getFile("20.png");
    return `
      <div class="modal fade" id="modal">
        <div id="modal-block" class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div id="content-space" class="modal-body">

              <img id="add-frind-img" src=${add_frind_img}>

              <div id="title" class="mb-3"> Enter a username to send a friend request. </div>

              <input type=text id="req-username" class="mb-3">

              <button id="req-send" class="btn btn-success btn-lg mb-3"> ~ Send Meow ~ </button>

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
    super.addComponentEventListener(this.querySelector("#req-send"),
    "click",
    this.send_friend_req);
  }

  async send_friend_req()
  {
    try
    {
        console.log("send_friend_req");
        const req_username = this.querySelector("#req-username").value;
        const body = {to_user: req_username};
        const res = await fetchData('/friends/friend-requests/', body, 'POST');
        console.log("send_friend_req");
        console.log(res);
    } 
    catch (error)
    {
      alert("error: " + error.body.detail);
    }
    this.closeModal();
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