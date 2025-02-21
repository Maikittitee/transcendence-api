import { Component } from "../../Component.js";
import { updateUserData, getValueFromSession, removeAllCookies} from "../../../../utils.js";

const name = "game-menu-page";

const componentStyle = `
.flex-container {
    display: flex;
    flex-wrap: wrap; /* Allows items to wrap on smaller screens */
    justify-content: space-between;
    align-items: center;
    width: 85%;
    height: auto;
    margin: auto; /* Centers content */
    position: relative; /* Removes absolute positioning */
}

// .menu ul li {
//     margin-bottom: 5vh;
//     text-decoration: none;
//     color: rgb(0, 0, 0);
//     font-size: max(4vw, 25px);
//     transition: color 0.3s;
//     cursor: pointer;
//     user-select: none;
// }
.menu ul li {
    margin-bottom: 3vh;
    font-size: clamp(18px, 4vw, 25px); /* Scales between 18px and 25px */
}

.menu ul li:hover {
    color: #FFD700;
}

// .list-Block {
//     max-width: 65%;
//     height: 100%;
//     display:  flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     list-style: none;
// }
.list-Block {
    max-width: 100%;
    width: 65%;
    height: auto;
}
.list-Block ul {
    width: 100%;
}
// .list-Block ul {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-around;
//     width: 65%;
//     height: auto;
//     border-radius: 30px;
//     background: rgba(255, 255, 255, 0.5);
//     list-style-type: none;
// }

.profile-Block {
    width: 25%;
    height: auto;
    max-width: 100%;
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
    width: 25%;
    height: auto;
    max-width: 100%;
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
    padding: 10px 10px 10px 10px;
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

loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none; /* ซ่อนเริ่มต้น */
    justify-content: center;
    align-items: center;
    z-index: 9999; /* ให้แสดงเหนือทุกๆ หน้า */
}
@media (max-width: 768px) {
    .flex-container {
        width: 100%;
    }

    .menu ul li {
        font-size: clamp(16px, 4vw, 22px);
    }

    .profile-Block {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .list-Block {
        width: 100%;
    }

    .profile-Block {
        width: 100%;
    }

    #profileName {
        font-size: 1rem;
    }
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
            <div id = "profileName"> Meow~ </div>
            <ul id = "stat">
                <li> <div>win</div>         <div id="win-stat">0</div>          </li>
                <li> <div>loss</div>        <div id="loss-stat">0</div>         </li>
                <li> <div>draw</div>        <div id="draw-stat">0</div>         </li>
                <li> <div>total match</div>  <div id="total-game-stat">0</div>  </li>
            </ul>
        </div>
    </div>

    <loading-page></loading-page>
    <confirm-modal></confirm-modal>
    `;
  }

  async postCreate() {
    const loading_page = this.querySelector("loading-page");
    loading_page.style.display = "block";
    sessionStorage.setItem('status', name);
    super.addComponentEventListener( this.querySelector("#play"),
                                    "click",
                                    () => window.Router.navigate('/play-menu-page/'));
    super.addComponentEventListener( this.querySelector("#editProfile"),
                                    "click",
                                    () => window.Router.navigate('/edit-profile-page/'));
    super.addComponentEventListener(this.querySelector("#logout"),
                                    "click",
                                    this.logout);
    await this.load_game_data();
    loading_page.style.display = "none";
  }

  async load_game_data() {
    await updateUserData();
    const win = this.querySelector("#win-stat");
    const loss = this.querySelector("#loss-stat");
    const draw = this.querySelector("#draw-stat");
    const total_match = this.querySelector("#total-game-stat");
    const profile_name = this.querySelector("#profileName");
    const profileImage = this.querySelector("#profileImage");

    win.textContent = getValueFromSession("win");
    loss.textContent = getValueFromSession("loss");
    draw.textContent = getValueFromSession("draw");
    total_match.textContent = getValueFromSession("total_match");
    profile_name.textContent = getValueFromSession("display_name");
    profileImage.src = sessionStorage.getItem('profile_img');
  }

  confirm_action() {
    const modal = document.querySelector('confirm-modal');
    modal.closeModal();
    removeAllCookies();
    sessionStorage.clear();
    window.Router.redirect('');
  }

  logout() {
        const modal = this.querySelector('confirm-modal');
        console.log("Modal found:", modal);
        modal.set_title_content("Logout!!");
        modal.set_body_content("Are you sure you want to logout?");
        modal.set_confirm_action(this.confirm_action);
        modal.openModal();
    }
}

customElements.define(name, GameMenuPage);
