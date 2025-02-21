import { Component } from "../../Component.js";
import { fetchData, updateUserData } from "../../../../utils.js";


const name = 'edit-name-modal';

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

export class EditNameModal extends Component {
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
              <textarea id="name-input" class="mb-3"></textarea>
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
        const new_name = this.querySelector("#name-input").value;
		console.log(`display-name-p${this.num}`)
        const name_content = document.querySelector(`#display-name-p${this.num}`);
		console.log("new name ", new_name)
        // const bio = sessionStorage.getItem(`p${num}_name`).replace(/\"/g, '');
        name_content.textContent = new_name;
    this.closeModal();
  }

  openModal(num) {
	console.log("open model: ", num)
	this.num = num
    this.#bootstrapModal.show();
  }

  closeModal() {
    this.#bootstrapModal.hide();
  }
}
  
  // Register Custom Element
customElements.define(name, EditNameModal);