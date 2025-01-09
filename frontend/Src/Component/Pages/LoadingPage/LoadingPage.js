import { Component } from "../../Component.js";

const name = "loading-page";

const componentStyle = `

  .spinner-border {
    position: fixed;
    width: 20vw;
    height: 20vw;
    border-width: 1em;
    top: 50%;
    left: 50%;
    margin-top: -10vw;
    margin-left: -10vw;
    color: #ffd700;
  }

  .meow-loading {
    position: fixed;
    width: 10vw;
    height: 10vw;
    top: 50%;
    left: 50%;
    margin-top: -5vw;
    margin-left: -5vw;
  }

    .back-ground {
      height: 100vh;
      width: 100vw;
      background-color: #FFFAF0;
    }
`;

export class LoadingPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    return `
      <div class="back-ground">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <img class="meow-loading" src="1.png" alt="Meow Loading">
      </div>
  `
  }
}

customElements.define(name, LoadingPage);