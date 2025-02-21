import { Component } from "../../Component.js";
import { EditBioModal } from "../../Popup/EditBioModal/EditBioModal.js";

const name = "local-tournament-page";

const componentStyle = `
  #local-tournament-background 
  {
    width: 100vw;
    height: 100vh;
    background-color: #fae4cf;
    position: fixed;
    z-index: 1;
  }

  #local-tournament-container 
  {
    width: 90%;
    height: 100%;
    padding: 2%;
  }

  #local-tournament-title
  {
    width: 100%;
    height: 12vh;
    font-size: 10vh;
  }

  #local-tournament-content
  {
    width: 100%;
    height: 80%;
  }

  #player-board-section
  {
    background-color: white;
    width: 42%;
    height: 100%;
    border-radius: 5%;
    padding: 2%;
  }

  #tournament-match-result-section
  {
    background-color: white;
    width: 55%;
    height: 100%;
    border-radius: 5%;
    padding: 2%;
  }

  #player-board-title
  {
    font-size: 5vh;
  }

  .mini-profile {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90%;
      aspect-ratio: 1 / 1;
  } 

  .mini-profile img {
      height: 90%;
      aspect-ratio: 1 / 1;
  }

  #display-name-player {
    min-width: 100%;
    max-width: 100%;
  }

  #player-card1
  {
    background-color: #fcacac;
    width: 90%;
    height: 20%;
    padding-left: 5%;
    padding-right: 5%;
  }

  #player-card2 {
    background-color: #5ce1e6;
    width: 90%;
    height: 20%;
    padding-left: 5%;
    padding-right: 5%;
  }

  #player-card3 {
    background-color: #5a76dc;
    width: 90%;
    height: 20%;
    padding-left: 5%;
    padding-right: 5%;
  }

  #player-card4 {
    background-color: #f7c67e;
    width: 90%;
    height: 20%;
    padding-left: 5%;
    padding-right: 5%;
  }

  #match-result-card {
    background-color: #fff3e7;
    width: 90%;
    height: 23%;
    padding-left: 5%;
    padding-right: 5%;
  }

  #match-result-player1-card {
    background-color: #fcacac;
    width: 40%;
  }

  #match-result-player2-card {
    background-color: #5ce1e6;
    width: 40%;
  }
`;

export class LocalTournamentPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    const player1_img = window.Images.getFile("1.png");
    const player2_img = window.Images.getFile("3.png");
    const player3_img = window.Images.getFile("4.png");
    const player4_img = window.Images.getFile("6.png");

    return ` 
    <div id = "local-tournament-background" class = "d-flex justify-content-center align-items-center">

      <div id = "local-tournament-container" class = "d-flex flex-column justify-content-between align-items-center">

        <div id = "local-tournament-title" class = "d-flex justify-content-center align-items-center"> Tournament Room Meow~ </div>

        <div id = "local-tournament-content" class = "d-flex justify-content-between align-items-center">

          <div id = "player-board-section" class = "d-flex flex-column justify-content-between align-items-center">

            <div id = "player-board-title"> Player Board </div>

            <div id = "player-card1" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player1_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 1 </div>
                <div id="display-name-p1" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span id="edit-button-p1" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card2" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player2_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 2 </div>
                <div id = "display-name-p2" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span id="edit-button-p2" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card3" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player3_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 3 </div>
                <div id = "display-name-p3" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span id="edit-button-p3" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card4" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player4_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 4 </div>
                <div id = "display-name-p4" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span id="edit-button-p4" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

          </div>

          <div id = "tournament-match-result-section" class = "d-flex flex-column justify-content-between align-items-center">

            <div id = "player-board-title"> Tournament Match Status</div>

            <div id = "match-result-card" class="d-flex flex-column justify-content-between align-items-center rounded">

              <div class = "d-flex justify-content-between align-items-center h-50 w-100">
                <div id="match-result-player1-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img" src=${player1_img}> 
                  </div>
                  <div id="player1-displayname" class = "fs-4">p1</div>
                </div>

                <div class = "fs-4">VS.</div>

                <div id="match-result-player2-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img" src=${player2_img}> 
                  </div>
                  <div id="player2-displayname" class = "fs-4">p2</div>
                </div>
              </div>

              <div id = "match_status"  class = "d-flex justify-content-around align-items-center h-50 w-100">
                <div id = "win-loss-1" class = "fs-3"> win </div>
                <div id = "match-status" class = "fs-3">game ended</div>
                <div id = "win-loss-2" class = "fs-3"> loss</div>
              </div>

            </div>

            <div id = "match-result-card" class="d-flex flex-column justify-content-between align-items-center rounded">

              <div class = "d-flex justify-content-between align-items-center h-50 w-100">
                <div id="match-result-player1-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img" src=${player1_img}> 
                  </div>
                  <div id="player1-displayname" class = "fs-4">p1</div>
                </div>

                <div class = "fs-4">VS.</div>

                <div id="match-result-player2-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img" src=${player2_img}> 
                  </div>
                  <div id="player2-displayname" class = "fs-4">p2</div>
                </div>
              </div>

              <div id = "match_status"  class = "d-flex justify-content-around align-items-center h-50 w-100">
                <div id = "win-loss-1" class = "fs-3"> win </div>
                <div id = "match-status" class = "fs-3">game ended</div>
                <div id = "win-loss-2" class = "fs-3"> loss</div>
              </div>

            </div>

            <div id = "match-result-card" class="d-flex flex-column justify-content-between align-items-center rounded">

              <div class = "d-flex justify-content-between align-items-center h-50 w-100">
                <div id="match-result-player1-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img" src=${player1_img}> 
                  </div>
                  <div id="player1-displayname" class = "fs-4">p1</div>
                </div>

                <div class = "fs-4">VS.</div>

                <div id="match-result-player2-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img" src=${player2_img}> 
                  </div>
                  <div id="player2-displayname" class = "fs-4">p2</div>
                </div>
              </div>

              <div id = "match_status"  class = "d-flex justify-content-around align-items-center h-50 w-100">
                <div id = "win-loss-1" class = "fs-3"> win </div>
                <div id = "match-status" class = "fs-3">game ended</div>
                <div id = "win-loss-2" class = "fs-3"> loss</div>
              </div>

            </div>

            <button type="button" class="btn btn-lg btn-success fs-3"> start game! </button>

          </div>

        </div>

      </div>

    </div>
	<edit-name-modal></edit-name-modal>>
    `;
  }

  showModal(num) {
	const modal = this.querySelector("edit-name-modal");
	modal.openModal(num); 
  }
  postCreate() {
	super.addComponentEventListener( this.querySelector("#edit-button-p1"),
		"click",
		() => { console.log("Click 1"); this.showModal("1")});
	super.addComponentEventListener( this.querySelector("#edit-button-p2"),
		"click",
		() => { console.log("Click 2"); this.showModal("2")});
	super.addComponentEventListener( this.querySelector("#edit-button-p3"),
		"click",
		() => { console.log("Click 3"); this.showModal("3")});
	super.addComponentEventListener( this.querySelector("#edit-button-p4"),
		"click",
		() => { console.log("Click 4"); this.showModal("4")});
  }
}

customElements.define(name, LocalTournamentPage);
