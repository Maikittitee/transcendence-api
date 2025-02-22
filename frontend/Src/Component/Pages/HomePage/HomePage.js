import { Component } from "../../Component.js";

const name = "home-page";

const componentStyle = `
  .menu {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      color: rgb(0, 0, 0);
      font-family: 'Itim', sans-serif;
      text-align: center;
      height: 80%;
      width: 50%;
  }

  .menu ul {
      list-style: none;
      padding-top: min(25%, 50px);
      margin: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .menu ul li {
      margin-bottom: 5vh;
      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: max(4vw, 25px);
      transition: color 0.3s;
      cursor: pointer;
      user-select: none;
  }

  .menu ul li:hover {
      color: #FFD700;
  }

  #MeowPongTitle{
      padding: 0;
      margin: 0;
      width: max(100%, 300px);
  }
`;

  export class HomePage extends Component 
  { 
  constructor() {
    super(componentStyle);
  }

  render()
  {
    const imgSrc = window.Images.getFile("MeowPongTitle.png");
    return `
    <div class = "menu">
      <img id = "MeowPongTitle" src=${imgSrc}>

      <ul id="loginOption">
          <li id="login42"> 42 Login </li>
          <li id="guestLogin"> Guest Login </li>
          <li id="register"> Register </li>
          <li id="check"> Check </li>
      </ul>
    </div>
    `;
  }

  postCreate() {
    sessionStorage.setItem('status', name);
    this.addComponentEventListener(  this.querySelector("#login42"),
                                      "click",
                                      this.login42);

    this.addComponentEventListener( this.querySelector("#guestLogin"),
                                    "click",
                                    () => window.Router.navigate('/guest-login-page/'));
                                    
    this.addComponentEventListener( this.querySelector("#register"),
                                    "click",
                                    () => window.Router.navigate('/register-page/'));

    this.addComponentEventListener( this.querySelector("#check"),
                                    "click",
                                    this.check);
  }

  async login42()
  {
    const response = await fetchData('/auth/oauth_url/', null, 'GET', false);
    console.log(response.oauth_url);
    sessionStorage.setItem('oauthRedirectInProgress', true);
    window.location.href = response.oauth_url;
  }

  async check()
  {
    const response = await fetchData('/auth/', null, 'GET', false);
    console.log(response);
  }
}

customElements.define(name, HomePage);