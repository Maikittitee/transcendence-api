import { Component } from "../../Component.js";
import { fetchData } from "../../../../utils.js";

const name = 'win-loss-modal';

const componentStyle = `
  #title {
    font-size: 1.5em;
    font-weight: bold;
  }

  #display-img {
    width:  50%;
  }

  #content-space {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  #modal-block {
    max-height: 10vh;
    max-width: 30vw;
  }
`;

export class WinLossModal extends Component {
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

              <div id="game-status" class="mt-3 mb-3"></div>
              <img id="display-img" class="mb-3">
              <div id="game-score" class="mb-3"></div>

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

  set_display(my_score, opponent_score, status) {
    const display_img_element = super.querySelector('#display-img');
    const game_score_element = super.querySelector('#game-score');
    const game_status_element = super.querySelector('#game-status');
  
    let display_img = window.Images.getFile(status === "WIN" ? "18.png" : "19.png");
    game_score_element.innerHTML = `${my_score} - ${opponent_score}`;
    game_score_element.style.fontSize = "4rem";
    game_score_element.style.fontWeight = "bold";
  
    game_status_element.innerHTML = `YOU ${status}`;
    game_status_element.style.fontSize = "7rem";
    game_status_element.style.fontWeight = "bold";
  
    display_img_element.src = display_img;
  }
  
  openModal() {
    this.#bootstrapModal.show();
  }

  closeModal() {
    this.#bootstrapModal.hide();
  }
}
  
  // Register Custom Element
  customElements.define(name, WinLossModal);