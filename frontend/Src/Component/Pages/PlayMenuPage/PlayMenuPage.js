import { Component } from "../../Component.js";
import { errorDisplay, getValueFromSession } from "../../../../utils.js";

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

  #meow-pow {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Ensures proper alignment */
    height: auto; /* Let it adjust based on content */
    width: 90%;
    padding: 5% 0; /* Reduce excessive padding */
    flex-wrap: wrap; /* Allows elements to stack on small screens */
  }

  #meow-pow-l, #meow-pow-r {
    height: auto;
    max-height: 80px; /* Prevents excessive stretching */
    max-width: 20%;
    transform: rotate(90deg);
  }

  .play-button{
      height: 10%;
      width: 75%;
      padding-top: 2.5%;
      margin-top: 2.5%;
      margin-bottom: 2.5%;
      font-size: 1.5 rem
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
        font-size: 1 rem;
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

    #match-result-win {
        font-size: 1.25em;
        font-weight: bold;
        color: rgb(76, 146, 67);
    }

    #match-result-loss {
        font-size: 1.25em;
        font-weight: bold;
        color: rgb(199, 47, 47);
    }

    .history-block h1 {
        font-size: 2em;
        font-weight: bold;
        margin-top: 3%;
        margin-bottom: 3%;
    }

    .profileFrame {
    width: 60%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 10px solid palevioletred;
}

@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
        width: 95%;
        height: auto;
        padding: 2vw;
    }

    .profile-Block,
    .history-block,
    .menu-block {
        width: 90%;
        max-width: none;
    }
    .play-button{
      height: 5%;
      width: 60%;
      font-size: 1 rem
  }

    #meow-pow {
        flex-direction: column; /* Stack elements vertically */
        align-items: center;
        padding: 2% 0;
    }

    #meow-pow-l, #meow-pow-r {
        max-height: 60px; /* Reduce size */
        max-width: 40%; /* Prevent stretching */
        transform: rotate(0deg); /* Remove rotation if needed */
    }

    #fight-meow{
      font-size: 1.5 rem;
  }
}

@media (max-width: 480px) {
    #meow-pow-l, #meow-pow-r {
        max-height: 50px;
        max-width: 50%;
        transform: none; /* Remove rotation for better layout */
    }
}
`;

export class PlayMenuPage extends Component {

    #friend_req_list;
    #friend_list;
    #history_list;
    #display_name;
    #friend_action_model;
    #match_history_template;

    constructor() {
    super(componentStyle);
    const default_profile = window.Images.getFile("1.png");
    }

    render ()
    {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const profile_img = sessionStorage.getItem('profile_img');
    const meow_pow_l = window.Images.getFile("9.png");
    const meow_pow_r = window.Images.getFile("10.png");
    const MeowPongTitle = document.createElement('img');
    const proflie_name = getValueFromSession("display_name");
    MeowPongTitle.id = "MeowPongTitle";
    MeowPongTitle.src = meowTitleSrc;

    return `

    <div class = "flex-container">
        <div class = "profile-Block">
            <img id="profileImage" class = "profileFrame" src=${profile_img}>
            <div class = "d-flex flex-column justify-content-center align-items-between">
                <button id="info" class="btn btn-success btn-lg mb-2"> ${proflie_name} </button>
                <button id="add-friend" class="btn btn-secondary btn-lg"> Add Friend <span class="bi bi-person-plus ms-2"></span> </button>
            </div>
            <div id = "profileLine"></div>
            <div id = "profileFriendTiTle">Friend list</div>
            <ul id = "profileFriendContainer" class = "overflow-auto">
            </ul>
        </div>

        <div class ="history-block">

            <h1> Match History </h1>
            <ul id = "match-history-container" class = "container overflow-auto">
            </ul>

        </div>

        <div class ="menu-block">
            <h1 id = "fight-meow"> Fight Meow~ </h1>
            <div id = "meow-pow"><img id = "meow-pow-l" src=${meow_pow_l}> <img id = "meow-pow-r" src=${meow_pow_r}></div>
            <button id = "local-play" class="btn btn-primary play-button"> Local Play </button>
            <button id = "tournament" class="btn btn-primary play-button"> Tournament </button>
            <button id = "match-making" class="btn btn-primary play-button"> Match Making </button>
        </div>
    </div>

    <add-friend-modal></add-friend-modal>
    <accept-friend-modal></accept-friend-modal>
    <error-modal></error-modal>
    `;
    }

    async postCreate() {
    sessionStorage.setItem('status', name);
    super.addComponentEventListener( this.querySelector("#local-play"),
                                    "click",
                                    () => window.Router.navigate('/local-play-page/'));

    super.addComponentEventListener(this.querySelector("#match-making"),
                                    "click",
                                    () => window.Router.navigate('/game-play-page/'));

    super.addComponentEventListener(this.querySelector("#add-friend"),
                                    "click",
                                    this.add_friend_popup);


    this.#friend_req_list = await this.get_friend_req_list();
    this.render_friend_req();
    this.#friend_list = await this.get_friend_list();
    this.render_friend();
    this.#history_list = await this.get_history();
    this.render_history();
    }

    async get_friend_req_list()
    {
        try
        {
            const friendsReqList = await fetchData('/friends/friend-requests/');
            console.log('Fetched friendsReqList:', friendsReqList);
            for (let i = 0; i < friendsReqList.length; i++)
            {
                if (friendsReqList[i].from_user.avatar_url === null)
                {
                    friendsReqList[i].from_user.avatar_url = window.Images.getFile("1.png");
                }
                else{
                    const picture = await fetchData(friendsReqList[i].from_user.avatar_url, null);
                    if (picture instanceof Response) {
                    const blob = await picture.blob();
                    friendsReqList[i].from_user.avatar_url = URL.createObjectURL(blob);
                    } else {
                    console.error('The response is not a valid image file.');
                    }
                }
            }
            return friendsReqList;
        }
        catch (error)
        {
            const errModal = this.querySelector("error-modal");
            errorDisplay(errModal, error);
        }
    }

    async get_friend_list()
    {
        try
        {
            const friendsList = await fetchData('/friends/friends/');
            for (let i = 0; i < friendsList.length; i++)
            {
                if (friendsList[i].friend.avatar_url === null)
                {
                    friendsList[i].friend.avatar_url = window.Images.getFile("1.png");
                }
                else{
                    const picture = await fetchData(friendsList[i].friend.avatar_url, null);
                    if (picture instanceof Response) {
                    const blob = await picture.blob();
                    friendsList[i].friend.avatar_url = URL.createObjectURL(blob);
                    } else {
                    console.error('The response is not a valid image file.');
                    }
                }
            }
            return friendsList;
        }
        catch (error)
        {
            const errModal = this.querySelector("error-modal");
            errorDisplay(errModal, error);
        }
    }

    async get_history()
    {
        try
        {
            let ret_history = [];
            const history = await fetchData('/matches/match-history/');
            for (let i = 0; i < history.length; i++)
            {
                if (history[i].status == "COMPLETED")
                {
                    if (history[i].player1.avatar_url === null)
                    {
                        history[i].player1.avatar_url = window.Images.getFile("1.png");
                    }
                    else
                    {
                        const picture = await fetchData(history[i].player1.avatar_url, null);
                        if (picture instanceof Response) {
                        const blob = await picture.blob();
                        history[i].player1.avatar_url = URL.createObjectURL(blob);
                        } else {
                        console.error('The response is not a valid image file.');
                        }
                    }

                    if (history[i].player2.avatar_url === null)
                        {
                            history[i].player2.avatar_url = window.Images.getFile("1.png");
                        }
                        else
                        {
                            const picture = await fetchData(history[i].player2.avatar_url, null);
                            if (picture instanceof Response) {
                            const blob = await picture.blob();
                            history[i].player2.avatar_url = URL.createObjectURL(blob);
                            } else {
                            console.error('The response is not a valid image file.');
                            }
                        }

                    let my_display_name = getValueFromSession("display_name");
                    let my_score;
                    let opponent_display_name;
                    let opponent_avatar_url;
                    let opponent_score;
                    console.log(my_display_name);
                    console.log(history[i].player2.display_name);
                    if(my_display_name !== history[i].player2.display_name)
                    {
                        my_score = history[i].player1_score;
                        opponent_display_name = history[i].player2.display_name;
                        opponent_avatar_url = history[i].player2.avatar_url;
                        opponent_score = history[i].player2_score;
                    }
                    else
                    {
                        my_score = history[i].player2_score;
                        opponent_display_name = history[i].player1.display_name;
                        opponent_avatar_url = history[i].player1.avatar_url;
                        opponent_score = history[i].player1_score;
                    }

                    ret_history[i] = {
                        player2_display_name: opponent_display_name,
                        player2_avatar_url: opponent_avatar_url,
                        player1_score: my_score,
                        player2_score: opponent_score,
                        completed_at: history[i].completed_at
                    };
                }
            }
            console.log('Final ret_history:', ret_history[0]);
            return ret_history;
        }
        catch (error)
        {
            const errModal = this.querySelector("error-modal");
            errorDisplay(errModal, error);
        }
    }

    render_friend_req() {
        for (let i = 0; i < this.#friend_req_list.length; i++) {
            if(this.#friend_req_list[i].status === "pending")
            {
                const friend_req_data = this.#friend_req_list[i].from_user;
                const friend_req_id = this.#friend_req_list[i].id;
                let profile_img = friend_req_data.avatar_url || default_profile;
                const req_id_tick = "req-id-" + friend_req_id + "-tick";
                const req_id_cross = "req-id-" + friend_req_id + "-cross";

                const friend_req = `
                <li class="container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                    <div class="mini-profile bg-secondary bg-gradient rounded-circle">
                        <img id="profile-img" src=${profile_img}>
                    </div>
                    <div class="d-flex flex-column justify-content-center align-items-start me-1">
                        <div class="mini-profile-text text-success mb-1"> Friend Request </div>
                        <div id="display-name" class="mini-profile-text"> ${friend_req_data.display_name} </div>
                    </div>
                    <span id=${req_id_cross} class="bi bi-x text-danger fs-4"></span>
                    <span id=${req_id_tick} class="bi bi-check text-success fs-4"></span>
                </li>
                `;
                const friend_list_container = this.querySelector("#profileFriendContainer");
                friend_list_container.insertAdjacentHTML('beforeend', friend_req);

                // เพิ่ม Event Listener สำหรับ Tick แบะ Cross Icon
                super.addComponentEventListener(this.querySelector(`#${req_id_tick}`),
                    "click",
                    () => this.handle_friend_popup("accept", friend_req_id, friend_req_data.avatar_url, friend_req_data.display_name));
                super.addComponentEventListener(this.querySelector(`#${req_id_cross}`),
                    "click",
                    () => this.handle_friend_popup("reject", friend_req_id, friend_req_data.avatar_url, friend_req_data.display_name));
            }
        }
    }

    render_history()
    {
        for (let i = 0; i < this.#history_list.length; i++)
        {
            const history_data = this.#history_list[i];
            console.log(history_data);
            let game_result;
            if (history_data.player1_score > history_data.player2_score) {
                game_result = `<div class="match-result text-success fw-bold fs-4 ms-2"> WIN ${history_data.player1_score} - ${history_data.player2_score} </div>`;
            } else {
                game_result = `<div class="match-result text-danger fw-bold fs-4 ms-2"> LOSS ${history_data.player1_score} - ${history_data.player2_score} </div>`;
            }

            let completed_at = history_data.completed_at;
            let dateObj = new Date(completed_at);

            // แปลงวันที่เป็น "DD/MM/YYYY"
            let day = String(dateObj.getUTCDate()).padStart(2, '0');
            let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
            let year = dateObj.getUTCFullYear();
            let formattedDate = `${day}/${month}/${year}`;

            // แปลงเวลาเป็น "HH:mm"
            let hours = String(dateObj.getUTCHours()).padStart(2, '0');
            let minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
            let formattedTime = `${hours}:${minutes}`;

            // ใส่ค่าลงใน game_date
            let game_date = `
            <div id="match-date">
                <div> ${formattedDate} </div>
                <div> ${formattedTime} </div>
            </div>`;

            let player2_img = history_data.player2_avatar_url;

            let match_history_card = `
                <li id = "match-history-card" class = "rounded d-flex align-items-center justify-content-between bg-light">
                    ${game_result}
                    ${game_date}
                    <div id="profile-card" class="rounded">
                        <div class = "profile-card-image bg-secondary bg-gradient rounded-circle m-1">
                            <img src=${player2_img}>
                        </div>
                        <div id="profile-name" class = "m-1">
                            ${history_data.player2_display_name}
                        </div>
                    </div>
                </li>
            `;
            const match_history_container = this.querySelector("#match-history-container");
            match_history_container.insertAdjacentHTML('afterbegin', match_history_card);
        }
    }

    render_friend()
    {
        for (let i = 0; i < this.#friend_list.length; i++)
        {
            const friend_data = this.#friend_list[i].friend;
            const profile_img = friend_data.avatar_url;
            const friend_id = this.#friend_list[i].id;
            const req_id_remove = "req-id-" + friend_id + "-remove";

            let online_status;
            if (friend_data.is_online) {
                online_status = `
                <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-success bg-gradient rounded-circle dot me-2"></div> online </div>
                `;
            } else {
                online_status = `
                <div class="d-flex justify-content-start align-items-center mini-profile-text"> <div class="bg-danger bg-gradient rounded-circle dot me-2"></div> offline </div>
                `;
            }
            const friend_req = `
            <li class = "container bg-light h-25 rounded d-flex align-items-center justify-content-between">
                <div class = "mini-profile bg-secondary bg-gradient rounded-circle">
                    <img src=${profile_img}>
                </div>
                <div class = "d-flex flex-column justify-content-center align-items-start">
                    <div class="mini-profile-text mb-1"> ${friend_data.display_name} </div>
                    ${online_status}
                </div>
                <span id=${req_id_remove} class="bi bi-person-dash-fill text-danger"></span>
            </li>
            `;
            const friend_list_container = this.querySelector("#profileFriendContainer");
            friend_list_container.insertAdjacentHTML('beforeend', friend_req);

            super.addComponentEventListener(this.querySelector(`#${req_id_remove}`),
                "click",
                () => this.handle_friend_popup("remove", friend_id, friend_data.avatar_url, friend_data.display_name));
        }
    }

    add_friend_popup()
    {
        const add_friend_model = this.querySelector("add-friend-modal");
        add_friend_model.openModal();
    }

    handle_friend_popup(action, req_id, avatar_url, display_name) {
        const accept_friend_modal = this.querySelector("accept-friend-modal");
        const modal_img = accept_friend_modal.querySelector("#friend-img");
        const modal_title = accept_friend_modal.querySelector("#title");
        const yes_button = accept_friend_modal.querySelector("#yes");

        // อัปเดตข้อมูลใน Modal
        modal_img.src = avatar_url || window.Images.getFile("1.png");

        if (action === "accept") {
            modal_title.textContent = `Are you sure you want to accept ${display_name} as your friend?`;
            modal_title.style.color = "black";
        } else if (action === "reject") {
            modal_title.textContent = `Are you sure you want to reject ${display_name}'s friend request?`;
            modal_title.style.color = "red";
        } else if (action === "remove") {
            modal_title.textContent = `Are you sure you want to remove ${display_name} from your friends list?`;
            modal_title.style.color = "red";
        }

        // ลบ Event Listener เดิม (ถ้ามี)
        yes_button.replaceWith(yes_button.cloneNode(true));
        const new_yes_button = accept_friend_modal.querySelector("#yes");

        // เพิ่ม Event Listener ใหม่
        if (action === "accept") {
            super.addComponentEventListener(new_yes_button, "click", () => this.handle_friend_action('accept', req_id));
        } else if (action === "reject") {
            super.addComponentEventListener(new_yes_button, "click", () => this.handle_friend_action('reject', req_id));
        } else if (action === "remove") {
            super.addComponentEventListener(new_yes_button, "click", () => this.handle_friend_action('remove', req_id));
        }

        // เปิด Modal
        accept_friend_modal.openModal();
    }

    async handle_friend_action(action, req_id) {
        try {
            let endpoint;
            if (action === "accept") {
                endpoint = `/friends/friend-requests/${req_id}/accept/`;
            } else if (action === "reject") {
                endpoint = `/friends/friend-requests/${req_id}/reject/`;
            } else if (action === "remove") {
                endpoint = `/friends/friends/${req_id}/unfriend/`;
            } else {
                throw new Error("Invalid action");
            }

            console.log("endpoint: " + endpoint);
            const res = await fetchData(endpoint, null, 'POST');
            console.log(`Friend request ${action}ed:`, res);

            // ปิด Modal ถ้ามีการยืนยัน
            const accept_friend_modal = this.querySelector("accept-friend-modal");
            if (accept_friend_modal) {
                accept_friend_modal.closeModal();
            }

            // อัปเดตรายการเพื่อนและคำขอเพื่อน
            const friend_list = this.querySelector('#profileFriendContainer');
            this.#friend_req_list = await this.get_friend_req_list();
            this.#friend_list = await this.get_friend_list();
            friend_list.innerHTML = "";
            this.render_friend_req();
            this.render_friend();

        }
        catch (error)
        {
            const errModal = this.querySelector("error-modal");
            errorDisplay(errModal, error);
        }
    }
}

customElements.define(name, PlayMenuPage);
