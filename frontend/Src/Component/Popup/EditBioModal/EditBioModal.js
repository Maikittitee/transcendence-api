import { Component } from "../../Component.js";
import { fetchData, updateUserData } from "../../../../utils.js";

const name = 'edit-bio-modal';

const componentStyle = `
  #title {
    font-size: 1.5em;
    font-weight: bold;
  }

  #modal-block {
    height: 50vh;
    width: 50vw;
    max-height: 50vh;
    max-width: 50vw;
    padding: 20px;
    overflow: auto;
  }

  #bio-input {
      font-size: 1.5em;
      background: rgb(255, 255, 255);
      border-radius: 30px;
      height: 40vh;
      width: 40vw;
      padding: 10px;
      resize: none;
      overflow-y: auto;
      overflow-x: hidden;
      word-wrap: break-word;
      white-space: pre-wrap;
  }
`;

export class EditBioModal extends Component {
  #modal
  #bootstrapModal;
  
  constructor() {
    super(componentStyle);
  }

  render() {
    return `
      <div class="modal fade" id="modal">
        <div id="modal-block" class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div id="content-space" class="modal-body">
              <div id="title" class="mb-3"> Edit your profile </div>
              <textarea id="bio-input" class="mb-3"></textarea>
              <button id="save" class="btn btn-success btn-lg mb-3"> save </button>
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
    super.addComponentEventListener(this.querySelector("#save"),
    "click",
    this.save_bio);
  }

  async save_bio() {
    try
    {
        const new_bio = this.querySelector("#bio-input").value;
        const body = {bio: new_bio};
        const res = await fetchData('/auth/users/me/', body, 'PATCH');
        const bio_content = document.querySelector("#bio-content");
        updateUserData(res);
        const bio = sessionStorage.getItem('bio').replace(/\"/g, '');
        bio_content.textContent = bio;
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
  customElements.define(name, EditBioModal);