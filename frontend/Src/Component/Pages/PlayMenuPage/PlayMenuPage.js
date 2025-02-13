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

    #friend_req_list;
    #friend_list;
    #friend_action_model;
    #match_history_template;

    constructor() {
    super(componentStyle);
    const default_profile = window.Images.getFile("1.png");
    this.#match_history_template = `
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
    `;
    }

    render ()
    {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const profile_img = sessionStorage.getItem('profile_img');
    const meow_pow_l = window.Images.getFile("9.png");
    const meow_pow_r = window.Images.getFile("10.png");
    const MeowPongTitle = document.createElement('img');
    MeowPongTitle.id = "MeowPongTitle";
    MeowPongTitle.src = meowTitleSrc;

    return `

    <div class = "flex-container">
        <div class = "profile-Block">
            <img id="profileImage" src=${profile_img}>
            <div class = "d-flex flex-column justify-content-center align-items-between">
                <button id="info" class="btn btn-success btn-lg mb-2"> profile name </button>
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
            <button id = "match-making" class="btn btn-primary play-button"> Match making </button>
            <button id = "tournament" class="btn btn-primary play-button"> Tournament </button>
            <button id = "local-play" class="btn btn-primary play-button"> Play with friend </button>
        </div>
    </div>

    <add-friend-modal></add-friend-modal>
    <modal-component></modal-component>
    <accept-friend-modal></accept-friend-modal>
    `;
    }

    async postCreate() {

    super.addComponentEventListener( this.querySelector("#match-making"),
                                    "click",
                                    () => window.Router.navigate('/match-making-page/'));

    super.addComponentEventListener(this.querySelector("#local-play"),
                                    "click",
                                    () => window.Router.navigate('/game-play-page/'));

    super.addComponentEventListener(this.querySelector("#add-friend"),
                                    "click",
                                    this.add_friend_popup);


    this.#friend_req_list = await this.get_friend_req_list();
    this.#friend_list = await this.get_friend_list();
    this.#friend_action_model = this.querySelector("modal-component");
    this.render_friend_req();
    this.render_friend();
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
            alert(error);
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
            alert(error);
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
    
        } catch (error) {
            alert(`Failed to ${action} friend request: ` + error.message);
        }
    }

    logout()
    {
        console.log("logout");
    }
}

customElements.define(name, PlayMenuPage);
