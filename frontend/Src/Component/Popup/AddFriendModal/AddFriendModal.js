import { Component } from "../../Component.js";
import { getCookie, getProfileData, fetchData, setCookie } from "../../../../utils.js";

const name = 'add-friend-modal';

const componentStyle = `
#title {
    font-size: clamp(1.2em, 2vw, 2em); /* Adjusts size based on viewport */
    font-weight: bold;
    text-align: center;
}

input {
    background-color: white;
    width: 100%;
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 1.5rem; /* Relative font size */
    padding: 8px;
}

#add-frind-img {
    width: 50%;
    max-width: 200px; /* Prevents excessive scaling */
    height: auto;
}

#content-space {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 600px; /* Prevents stretching on larger screens */
    margin: auto;
    text-align: center;
}

#modal-block {
    height: auto; /* Allows content to adjust dynamically */
    width: 80%;
    max-width: 500px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

#display-name {
    width: 90%;
}

/* Responsive Design */
@media (max-width: 768px) {
    #modal-block {
        width: 90%;
    }

    input {
        max-width: 500px;
        width: 80%
    }

    #title {
        font-size: 1.2em;
    }

    input {
        font-size: 1rem;
    }

    #add-frind-img {
        width: 70%;
    }
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
