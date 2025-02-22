import { Component } from "../../Component.js";

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

  #match-result-title
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

  .match-result-card {
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

  #match-result-player3-card {
    background-color: #5a76dc;
    width: 40%;
  }

  #match-result-player4-card {
    background-color: #f7c67e;
    width: 40%;
  }

  #match-result-player5-card {
    background-color:rgb(255, 0, 0);
    width: 40%;
  }

  .play{
    z-index: 2;
  }
`;

export class LocalTournamentPage extends Component { 

  count;
  match_result_card;
  player1_img;
  player2_img;
  player3_img;
  player4_img;

  constructor() {
    super(componentStyle);
  }

  render() {
    this.player1_img = window.Images.getFile("1.png");
    this.player2_img = window.Images.getFile("3.png");
    this.player3_img = window.Images.getFile("4.png");
    this.player4_img = window.Images.getFile("6.png");
    this.count = 0;
    return ` 
    <div id = "local-tournament-background" class = "d-flex justify-content-center align-items-center">

      <div id = "local-tournament-container" class = "d-flex flex-column justify-content-between align-items-center">

        <div id = "local-tournament-title" class = "d-flex justify-content-center align-items-center"> Tournament Room Meow~ </div>

        <div id = "local-tournament-content" class = "d-flex justify-content-between align-items-center">

          <div id = "player-board-section" class = "d-flex flex-column justify-content-between align-items-center">

            <div id = "player-board-title"> Player Board </div>

            <div id = "player-card1" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${this.player1_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 1 </div>
                <div id="display-name-p1" class = "fs-4 bg-white rounded p-2"> player1 </div>
              </div>
              <span id="edit-button-p1" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card2" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${this.player2_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 2 </div>
                <div id = "display-name-p2" class = "fs-4 bg-white rounded p-2"> player2 </div>
              </div>
              <span id="edit-button-p2" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card3" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${this.player3_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 3 </div>
                <div id = "display-name-p3" class = "fs-4 bg-white rounded p-2"> player3 </div>
              </div>
              <span id="edit-button-p3" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card4" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${this.player4_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 4 </div>
                <div id = "display-name-p4" class = "fs-4 bg-white rounded p-2"> player4 </div>
              </div>
              <span id="edit-button-p4" class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

          </div>

          <div id = "tournament-match-result-section" class = "d-flex flex-column justify-content-between align-items-center">

            <div id = "match-result-title"> Tournament Match Status</div>

            <button id="start-game-button" type="button" class="btn btn-lg btn-success fs-3"> start game! </button>

          </div>

        </div>

      </div>

    </div>
	<edit-name-modal></edit-name-modal>
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


  this.addComponentEventListener( this.querySelector("#start-game-button"),
                                    "click",
                                    this.tournamentStart);

  this.match_result_card = document.createElement('div');
  this.match_result_card.classList.add("d-flex", "flex-column", "justify-content-between", "align-items-center", "rounded", "match-result-card");
  this.match_result_card.innerHTML = 
              `
              <div class = "d-flex justify-content-between align-items-center h-50 w-100">
                <div id="match-result-player1-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img1"> 
                  </div>
                  <div id="player1-displayname" class = "fs-4"></div>
                </div>

                <div class = "fs-4">VS.</div>

                <div id="match-result-player2-card" class="d-flex align-items-center h-75 rounded px-2">
                  <div class="mini-profile bg-white rounded-circle h-75 me-3"> 
                      <img id="profile-img2"> 
                  </div>
                  <div id="player2-displayname" class = "fs-4"></div>
                </div>
              </div>

              <div id = "match_status"  class = "d-flex justify-content-around align-items-center h-50 w-100">
                <div id = "win-loss-1" class = "fs-3"> win </div>
                <div id = "match-status" class = "fs-3">game ended</div>
                <div id = "win-loss-2" class = "fs-3"> loss</div>
              </div>
            `;
            this.renderMatchResult()
  }

  tournamentStart() {
    if (this.count >= 3)
    {
		localStorage.clear();
		window.Router.redirect('/play-menu-page/');
    }
    else {
      this.count++;
      const App = document.querySelector("#App");
      const thisPage = document.querySelector(name);
      const LocalPlayPage = document.createElement("local-play-page");
      LocalPlayPage.classList.add("play");
      thisPage.style.display = "none";
      App.appendChild(LocalPlayPage);
    }
  }

  renderMatchResult() {
    const matchResultTitle = document.querySelector("#match-result-title");
    const match_result_cards = document.querySelectorAll(".match-result-card");
    match_result_cards.forEach(card => {
      card.remove();
    });
    let i = 0;
    while(i <= this.count) {
      if (i == 0) {
        var card1 = this.match_result_card.cloneNode(true);
        card1.querySelector("#profile-img1").src = this.player1_img;
        card1.querySelector("#profile-img2").src = this.player2_img;
        card1.querySelector("#player1-displayname").innerHTML = localStorage.getItem("display-name-player1") || "player1";
        card1.querySelector("#player2-displayname").innerHTML = localStorage.getItem("display-name-player2") || "player2";
        card1.querySelector("#win-loss-1").innerHTML = "pending";
        card1.querySelector("#win-loss-2").innerHTML = "pending";
        card1.querySelector("#match-status").innerHTML = "start to pong";
        matchResultTitle.insertAdjacentElement("afterend", card1);
      } else if (i == 1) {
        const displayname_edit_button = document.querySelectorAll(".bi-pencil-fill");
        displayname_edit_button.forEach(button => {
          button.remove();
        });
        const result1 = localStorage.getItem("result1");
        const result1Json = JSON.parse(result1);
        let winloss1;
        let winloss2;
        var winner1_img;
        var winner1_displayname;
        var winner1_id;
        if (result1Json.winner.player == "left"){
          winloss1 = "win";
          winloss2 = "loss";
          winner1_img = this.player1_img;
          winner1_displayname = localStorage.getItem("display-name-player1") || "player1";
          winner1_id = "match-result-player1-card"
        } else {
          winloss1 = "loss";
          winloss2 = "win";
          winner1_img = this.player2_img;
          winner1_displayname = localStorage.getItem("display-name-player2") || "player2";
          winner1_id = "match-result-player2-card"
        }
        card1.querySelector("#win-loss-1").innerHTML = winloss1;
        card1.querySelector("#win-loss-2").innerHTML = winloss2;
        card1.querySelector("#match-status").innerHTML = "mathc ended!";

        var card2 = this.match_result_card.cloneNode(true);
        card2.querySelector("#match-result-player1-card").id = "match-result-player3-card";
        card2.querySelector("#match-result-player2-card").id = "match-result-player4-card";
        card2.querySelector("#profile-img1").src = this.player3_img;
        card2.querySelector("#profile-img2").src = this.player4_img;
        card2.querySelector("#player1-displayname").innerHTML = localStorage.getItem("display-name-player3") || "player3";
        card2.querySelector("#player2-displayname").innerHTML = localStorage.getItem("display-name-player4") || "player4";
        card2.querySelector("#win-loss-1").innerHTML = "pending";
        card2.querySelector("#win-loss-2").innerHTML = "pending";
        card2.querySelector("#match-status").innerHTML = "start to pong";
        card1.insertAdjacentElement("afterend", card2);
      } else if (i == 2) {
        const result1 = localStorage.getItem("result2");
        const result1Json = JSON.parse(result1);
        let winloss1;
        let winloss2;
        var winner2_img;
        var winner2_displayname;
        var winner2_id;
        if (result1Json.winner.player == "left"){
          winloss1 = "win";
          winloss2 = "loss";
          winner2_img = this.player3_img;
          winner2_displayname = localStorage.getItem("display-name-player3") || "player3";
          winner2_id = "match-result-player3-card"
        } else {
          winloss1 = "loss";
          winloss2 = "win";
          winner2_img = this.player4_img;
          winner2_displayname = localStorage.getItem("display-name-player4") || "player4";
          winner2_id = "match-result-player4-card"
        }
        card2.querySelector("#win-loss-1").innerHTML = winloss1;
        card2.querySelector("#win-loss-2").innerHTML = winloss2;
        card2.querySelector("#match-status").innerHTML = "mathc ended!";

        var card3 = this.match_result_card.cloneNode(true);
        card3.querySelector("#profile-img1").src = winner1_img;
        card3.querySelector("#profile-img2").src = winner2_img;
        card3.querySelector("#player1-displayname").innerHTML = winner1_displayname;
        card3.querySelector("#player2-displayname").innerHTML = winner2_displayname;
        card3.querySelector("#match-result-player1-card").id = "match-result-player5-card";
        card3.querySelector("#match-result-player2-card").id = "match-result-player5-card";
        card3.querySelector("#win-loss-1").innerHTML = "pending";
        card3.querySelector("#win-loss-2").innerHTML = "pending";
        card3.querySelector("#match-status").innerHTML = "start to pong";
        card2.insertAdjacentElement("afterend", card3);

      } else if (i == 3) {
        const result1 = localStorage.getItem("result3");
        const result1Json = JSON.parse(result1);
        let winloss1;
        let winloss2;
        if (result1Json.winner.player == "left"){
          winloss1 = "win";
          winloss2 = "loss";
        } else {
          winloss1 = "loss";
          winloss2 = "win";
        }
        card3.querySelector("#win-loss-1").innerHTML = winloss1;
        card3.querySelector("#win-loss-2").innerHTML = winloss2;
        card3.querySelector("#match-status").innerHTML = "mathc ended!";
      }
      console.log("this.count", this.count);
      console.log("i", i);
      i++;
    }
  }
}

customElements.define(name, LocalTournamentPage);
