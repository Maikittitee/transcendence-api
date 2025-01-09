import { Component } from "../../Component.js";

const name = "game-menu-page";

const componentStyle = `
.flex-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display:  flex;
    justify-content: space-between;
    width: 85%;
    height: 90%;
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

.list-Block {
    max-width: 65%;
    height: 100%;
    display:  flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
}

.list-Block ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 65%;
    height: auto;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.5);
    list-style-type: none;
}

.list-Block ul li {
      margin-top: 2.5vh;
      margin-bottom: 2.5vh;
      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: max(4vw, 25px);
      transition: color 0.3s;
      cursor: pointer;
      user-select: none;
}

.list-Block ul li:hover {
    color: #FFD700; /* เปลี่ยนสีเมื่อ hover */
}

.profile-Block {
    max-width: 25%;
    height: auto;
    display:  flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: rgb(0, 0, 0);
    font-size: 35px;
    background: rgba(255, 255, 255, 0.5);
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
    font-size: 25px;
    margin-bottom: 15px;
}

.profile-Block ul li div {
    color: rgb(0, 0, 0);
}

#profileFrame {
    width: 60%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 10px solid palevioletred;    
}

#profileImage {
    width: 100%;
    height: 100%;
    object-fit: cover; /* ปรับให้รูปภาพ fit ในเฟรม */
}

#profileName {
    padding: 10px 20px 10px 20px;
    background-color: rgb(94, 190, 158);
    border-radius: 10px;
    color: aliceblue;
}

#profileLine {
    background-color: rgb(94, 190, 158);
    width: 90%;
    height: 5px;
}

#MeowPongTitle {
    max-width: 90%;
    height: auto;
    flex-shrink: 0;
    margin-bottom: 60px;
}

#profileFriendContainer {
    margin: 20px;
    height: 30%;
}

#profileFriendContainer li {
    width: 90%;
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

`;

export class GameMenuPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const default_profile = window.Images.getFile("1.png");

    return `

    <div class = "flex-container">
        <div class = "list-Block">
            <img id = "MeowPongTitle" src=${meowTitleSrc}>
            <ul>
                <li id="play"> Play </li>
                <li id="editProfile"> Edit Profile </li>
                <li id="logout"> Logout </li>
            </ul>
        </div>
        <div class = "profile-Block">
            <div id = "profileFrame">
                <img id = "profileImage" src=${default_profile}>
            </div>
            <div id = "profileName"></div>
            <ul id = "stat">
                <li> <div>win streaks</div> <div>1</div> </li>
                <li> <div>win rate</div>    <div>1</div> </li>
                <li> <div>Total Game</div>  <div>1</div> </li>
                <li> <div>Rank</div>        <div>1</div> </li>
            </ul>
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
                        <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-danger bg-gradient rounded-circle dot me-2"></div> offline </div>
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
    </div>
    
    `;
  }

  postCreate() {
    super.addComponentEventListener( this.querySelector("#play"),
                                    "click",
                                    () => window.Router.navigate('/play-menu-page/'));

    super.addComponentEventListener( this.querySelector("#editProfile"),
                                    "click",
                                    () => window.Router.navigate('/edit-profile-page/'));

    super.addComponentEventListener(this.querySelector(".btn-primary"),
                                    "click",
                                    this.logout);
  }

  logout()
  {
    console.log("logout");
  }
}

customElements.define(name, GameMenuPage);
