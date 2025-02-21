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
                <div id = "display-name-player" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card2" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player2_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 2 </div>
                <div id = "display-name-player" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card3" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player3_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 3 </div>
                <div id = "display-name-player" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

            <div id = "player-card4" class = "d-flex justify-content-between align-items-center rounded">
              <div class="mini-profile bg-secondary bg-white rounded-circle"> 
                  <img id="profile-img" src=${player4_img}> 
              </div>
              <div class = "w-100 px-4">
                <div class = "fs-3 mb-4"> player 4 </div>
                <div id = "display-name-player" class = "fs-4 bg-white rounded p-2"> p </div>
              </div>
              <span class="bi bi-pencil-fill fs-3 ms-2 text-success"></span>
            </div>

          </div>

          <div id = "tournament-match-result-section">
          </div>

        </div>

      </div>

    </div>
    `;
  }

  postCreate() {

  }
}

customElements.define(name, LocalTournamentPage);
