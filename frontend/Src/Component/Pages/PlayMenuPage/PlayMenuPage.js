import { Component } from "../../Component.js";

const name = "play-menu-page";

const componentStyle = `

  #MeowPongTitle{
      position: fixed;
      top: 1vh;
      right: 1vw;
      width: auto;
      height: 8vh;
  }

  .flex-container {
      position: absolute;
      top: 52.5vh;
      left: 50vw;
      transform: translate(-50%, -50%);
      display:  flex;
      justify-content: space-between;
      width: 90vw;
      height: 85vh;
      padding: 1.5vw;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.5);
  }

  .profile-Block {
      max-width: 23%;
      height: auto;
      display:  flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      color: rgb(0, 0, 0);
      font-size: 30px;
      background-color: white;
      border-radius: 30px;
  }
  .profile-Block ul {
      width: 80%;
  }

  .profile-Block ul li {
      width : 100%;
      display:  flex;
      justify-content: space-between;
      text-align: center;
      font-size: 20px;
      margin-bottom: 15px;
  }

  .profile-Block ul li div {
      color: rgb(0, 0, 0);
  }

  #profileImage {
      max-width: 45%;
      height: auto;
  }

  #profileName {
      padding: 10px 20px 10px 20px;
      background-color: rgb(94, 190, 158);
      border-radius: 10px;
      font-size: 25px;
      color: aliceblue;
  }

  #profileLine {
      background-color: rgb(94, 190, 158);
      width: 90%;
      height: 5px;
  }

  .history-block{
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: white;
      width: 40%;
      border-radius: 30px;
      padding: 15px;
  }
  
  .menu-block{
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: white;
      width: 30%;
      border-radius: 30px;
      padding: 15px;
  }

  #fight-meow{
      font-size: 60px;
      padding-top: 15%;
      padding-bottom: 15%;
  }

  #meow-pow{
      display: flex;
      justify-content: space-between;
      height: 25%;
      width: 90%;
      padding-top: 10%;
      padding-bottom: 10%;
  }

  #meow-pow-l{
      height: 100%;
      transform: rotate(90deg);
  }

  #meow-pow-r{
      height: 100%;
      transform: rotate(-90deg);
  }

  .play-button{
      height: 10%;
      width: 75%;
      font-size: 24px;
      padding-top: 2.5%;
      margin-top: 2.5%;
      margin-bottom: 2.5%;
  }

    .mini-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90%;
        aspect-ratio: 1 / 1;
    }

    .mini-profile img {
        height: 80%;
        aspect-ratio: 1 / 1;
    }

    #profileFriendContainer {
        margin: 10px;
        height: 40%;
    }

    #profileFriendContainer li {
        width: 95%;
    }

    .mini-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90%;
        aspect-ratio: 1 / 1;
    }

    .mini-profile img {
        height: 80%;
        aspect-ratio: 1 / 1;
    }

    .mini-profile-text {
        font-size: 20px
    }

    .dot {
        height: 15px;
        aspect-ratio: 1 / 1;
        place-content: center;
    }

    #match-history-container {
        width: 90%;
    }

    #match-history-container li {
        margin-bottom: 3%;
    }

    #match-history-card {
        height: 75px;
        width: 100%;
        padding: 0% 1% 0% 5%;
    }

    #profile-card {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80%;
        padding: 3px;
        background-color: rgb(233, 182, 182);
    }

    .profile-card-image {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90%;
        aspect-ratio: 1 / 1;
    }

    .profile-card-image img {
        height: 80%;
        aspect-ratio: 1 / 1;
    }

    #match-date div {
        font-size: 1.25em;
        font-weight: bold;
    }

    #profile-name {
        font-size: 1.25em;
        font-weight: bold;
    }

    #match-result {
        font-size: 1.25em;
        font-weight: bold;
        color: rgb(76, 146, 67);
    }

    .history-block h1 {
        font-size: 2.5em;
        font-weight: bold;
        margin-top: 3%;
        margin-bottom: 3%;
    }
`;

export class PlayMenuPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render ()
  {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const default_profile = window.Images.getFile("1.png");
    const meow_pow_l = window.Images.getFile("9.png");
    const meow_pow_r = window.Images.getFile("10.png");
    const MeowPongTitle = document.createElement('img');
    MeowPongTitle.id = "MeowPongTitle";
    MeowPongTitle.src = meowTitleSrc;

    return `

    <div class = "flex-container">
      <div class = "profile-Block">
          <img id="profileImage" src=${default_profile}>
          <div class = "d-flex flex-column justify-content-center align-items-between">
              <button id="info" class="btn btn-success btn-lg mb-2"> profile name <span class="bi bi-list ms-2"></span> </button>
              <button id="add-friend" class="btn btn-secondary btn-lg"> Add Friend <span class="bi bi-person-plus ms-2"></span> </button>
          </div>
          <div id = "profileLine"></div>
          <div id = "profileFriendTiTle">Friend list</div>
            <ul id = "profileFriendContainer" class = "overflow-auto">
                <li class = "container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                    <div class = "mini-profile bg-secondary bg-gradient rounded-circle"> 
                        <img src=${default_profile}> 
                    </div>
                    <div class = "d-flex flex-column justify-content-center align-items-start"> 
                        <div class="mini-profile-text mb-1"> profile name </div>
                        <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-success bg-gradient rounded-circle dot me-2"></div> online </div>
                    </div>
                    <span class="bi bi-person-plus"></span>
                </li>
                <li class = "container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                    <div class = "mini-profile bg-secondary bg-gradient rounded-circle"> 
                        <img src=${default_profile}> 
                    </div>
                    <div class = "d-flex flex-column justify-content-center align-items-start"> 
                        <div class="mini-profile-text mb-1"> profile name </div>
                        <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-success bg-gradient rounded-circle dot me-2"></div> online </div>
                    </div>
                    <span class="bi bi-person-plus"></span>
                </li>
                <li class = "container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                    <div class = "mini-profile bg-secondary bg-gradient rounded-circle"> 
                        <img src=${default_profile}> 
                    </div>
                    <div class = "d-flex flex-column justify-content-center align-items-start"> 
                        <div class="mini-profile-text mb-1"> profile name </div>
                        <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-success bg-gradient rounded-circle dot me-2"></div> online </div>
                    </div>
                    <span class="bi bi-person-plus"></span>
                </li>
                <li class = "container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                    <div class = "mini-profile bg-secondary bg-gradient rounded-circle"> 
                        <img src=${default_profile}> 
                    </div>
                    <div class = "d-flex flex-column justify-content-center align-items-start"> 
                        <div class="mini-profile-text mb-1"> profile name </div>
                        <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-success bg-gradient rounded-circle dot me-2"></div> online </div>
                    </div>
                    <span class="bi bi-person-plus"></span>
                </li>
                <li class = "container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                    <div class = "mini-profile bg-secondary bg-gradient rounded-circle"> 
                        <img src=${default_profile}> 
                    </div>
                    <div class = "d-flex flex-column justify-content-center align-items-start"> 
                        <div class="mini-profile-text mb-1"> profile name </div>
                        <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-success bg-gradient rounded-circle dot me-2"></div> online </div>
                    </div>
                    <span class="bi bi-person-plus"></span>
                </li>
            </ul>
      </div>

      <div class ="history-block">

            <h1> Match History </h1>

            <ul id = "match-history-container" class = "container overflow-auto">

                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    <div id="match-result" class = "ms-2">
                        WIN 3-1
                    </div>
                    
                    <div id="match-date">
                        <div> 03/01/2025 </div>
                        <div> 12:00 </div>
                    </div>                    
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1"> 
                            <img src=${default_profile}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            profile name
                        </div>
                    </div>
                </li>

            </ul>
            
      </div>

      <div class ="menu-block">
          <h1 id = "fight-meow"> Fight Meow~ </h1>
          <div id = "meow-pow"><img id = "meow-pow-l" src=${meow_pow_l}> <img id = "meow-pow-r" src=${meow_pow_r}></div>
          <button id = "match-making" class="btn btn-primary play-button"> Match making </button>
          <button id = "tournament" class="btn btn-primary play-button"> Tournament </button>
          <button id = "local-play" class="btn btn-primary play-button"> Play with friend </button>
      </div>
    </div>

    <add-friend-modal></add-friend-modal>
    `;
  }

  postCreate() {
    super.addComponentEventListener( this.querySelector("#match-making"),
                                    "click",
                                    () => window.Router.navigate('/match-making-page/'));

    super.addComponentEventListener(this.querySelector("#local-play"),
                                    "click",
                                    () => window.Router.navigate('/game-play-page/'));

    super.addComponentEventListener(this.querySelector("#add-friend"),
                                    "click",
                                    this.add_friend_popup);
  }

  add_friend_popup()
  {
    const add_friend_model = this.querySelector("add-friend-modal");
    add_friend_model.openModal();
  }

  logout()
  {
    console.log("logout");
  }
}

customElements.define(name, PlayMenuPage);
