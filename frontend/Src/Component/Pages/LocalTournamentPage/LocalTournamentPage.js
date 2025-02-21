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
    background-color: white;
    padding: 2%;
  }

  #local-tournament-title
  {
    background-color: red;
    width: 100%;
    height: 12vh;
    font-size: 10vh;
  }

  #local-tournament-content
  {
    background-color: black;
    width: 100%;
    height: 80%;
  }

  #player-board-section
  {
    background-color: green;
    width: 40%;
    height: 100%;
    border-radius: 5%;
  }

  #tournament-match-result-section
  {
    background-color: green;
    width: 55%;
    height: 100%;
    border-radius: 5%;
  }
`;

export class LocalTournamentPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    return ` 
    <div id = "local-tournament-background" class = "d-flex justify-content-center align-items-center">

      <div id = "local-tournament-container" class = "d-flex flex-column justify-content-between align-items-center">

        <div id = "local-tournament-title" class = "d-flex justify-content-center align-items-center"> Tournament Room Meow~ </div>

        <div id = "local-tournament-content" class = "d-flex justify-content-between align-items-center">

          <div id = "player-board-section"></div>
          <div id = "tournament-match-result-section"></div>

        </div>

      </div>

    </div>
    `;
  }

  postCreate() {

  }
}

customElements.define(name, LocalTournamentPage);
