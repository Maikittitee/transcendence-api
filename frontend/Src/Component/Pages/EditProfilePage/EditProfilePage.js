import { Component } from "../../Component.js";
import { getValueFromSession, setCookie, updateUserData } from "../../../../utils.js";

const name = "edit-profile-page";

const componentStyle = `

.flex-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display:  flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 90%;
}

#MeowPongTitle{
    width: 50%;
    height: auto;
}

.sub-container {
    display:  flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 75%;
    background-color: rgba(162, 162, 162, 0.8);
    border-radius: 30px;
    padding: 30px;
}

.profile-Block {
    max-width: 25%;
    height: 100%;
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

#profileImage {
    max-width: 60%;
    height: auto;
}

#profileName {
    padding: 10px 20px 10px 20px;
    background-color: rgb(94, 190, 158);
    border-radius: 10px;
    color: aliceblue;
}

#inputBox {
	width: 80%;
	height: auto;
	display: flex;
	flex-direction: column;
}

#inputBox > label {
    font-size: 30px;
    margin: 10px;
}

#inputBox > div {
    display: flex;
}

#fill-display-name {
    background-color:  white;
    width: 400px;
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 30px;
    margin-right: 30px;
}

.profileconfig-Block {
    display: flex;
    max-width: 40%;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    padding: 25px;
}

.profileconfig-Block > button {
    width: 300px;
}

.bio-Block {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30%;
    height: 100%;
    background: rgb(255, 255, 255);
    border-radius: 30px;
    padding: 25px;
}

.bio-Block h1 {
    font-size: 30px;
}

#bio-content {
    background: rgb(255, 255, 255);
    border-radius: 30px;
    padding: 10px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
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
    
`;


export class EditProfilePage extends Component { 
    constructor() {
    super(componentStyle);
    }

    render() {
        const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
        const profile_img = sessionStorage.getItem('profile_img');
    
        return `
            <div class="flex-container">
                <img id="MeowPongTitle" src="${meowTitleSrc}">
        
                <div class="sub-container">
                    <div class="profile-Block">
                        <img id="profileImage" class="profileFrame" src="${profile_img}">
                        <div id="profileName">profile name</div>
                        <ul id="stat">
                            <li> <div>win</div>         <div id="win-stat">0</div>          </li>
                            <li> <div>loss</div>        <div id="loss-stat">0</div>         </li>
                            <li> <div>draw</div>        <div id="draw-stat">0</div>         </li>
                            <li> <div>total match</div>  <div id="total-game-stat">0</div>  </li>
                        </ul>
                    </div>

                    <div class="bio-Block">
                        <h1 class="mb-3"> Bio </h1>
                        <div id="bio-content"> </div>
                    </div>

                    <div class="profileconfig-Block">
                        <div id="inputBox">
                            <label for="profileName">Edit your username</label>
                            <div>
                                <input id="fill-display-name" type="text">
                                <button id="save-display-name-button" class="btn btn-primary btn-lg">save</button>
                            </div>
                        </div>
        
                        <button id = "button_2fa"></button>
        
                        <div id="inputBox">
                            <label for="profileImageUpload">Upload your profile picture</label>
                            <div class = "d-flex justify-content-center align-items-center">
                                <input class="form-control m-4" id="profileImageUpload" type="file" accept="image/*">
                                <button id="uploadProfilePictureButton" class="btn btn-primary btn-lg">Upload</button>
                            </div>
                        </div>
        
                        <button id="edit-bio-button" class="btn btn-success btn-lg">Edit Bio</button>
                    </div>
                </div>
            </div>
        
            <enable-2fa-modal></enable-2fa-modal>
            <edit-bio-modal></edit-bio-modal>
        `;
    }

    postCreate() {
        const button_2fa = this.querySelector('#button_2fa');
        button_2fa.classList.add("btn", "btn-lg");
        button_2fa.setAttribute("data-bs-toggle", "modal");
        button_2fa.setAttribute("data-bs-target", "#modal");
        const data = getValueFromSession("mfa_enabled");
        if (data) {
            console.log(data);
            button_2fa.classList.add("btn-danger");
            button_2fa.innerHTML = "disable 2FA";
        }
        else {
            console.log(data);
            button_2fa.classList.add("btn-success");
            button_2fa.innerHTML = "enable 2FA";
        }
        super.addComponentEventListener(this.querySelector("#button_2fa"),
                                        "click",
                                        this.handle_2FA);
        super.addComponentEventListener(this.querySelector("#save-display-name-button"),
                                        "click",
                                        this.save_display_name);
        super.addComponentEventListener(this.querySelector("#edit-bio-button"),
                                        "click",
                                        this.edit_bio_popup);
        super.addComponentEventListener(this.querySelector("#uploadProfilePictureButton"),
                                        "click",
                                        this.uploadProfilePicture);
            
        const win = this.querySelector("#win-stat");
        const loss = this.querySelector("#loss-stat");
        const draw = this.querySelector("#draw-stat");
        const total_match = this.querySelector("#total-game-stat");
        const profile_name = this.querySelector("#profileName");
        const bio = this.querySelector("#bio-content");
        win.textContent = getValueFromSession("win");
        loss.textContent = getValueFromSession("loss");
        draw.textContent = getValueFromSession("draw");
        total_match.textContent = getValueFromSession("total_match");
        profile_name.textContent = getValueFromSession("display_name");
        bio.textContent = getValueFromSession("bio");
    }

    edit_bio_popup()
    {
      const edit_bio_modal = this.querySelector("edit-bio-modal");
      edit_bio_modal.openModal();
    }

    async save_display_name()
    { 
        try
        {
            const new_name = this.querySelector("#fill-display-name").value;;
            const body = {display_name: new_name};
            const res = await fetchData('auth/users/me/', body, 'PATCH');
            const profileName = this.querySelector("#profileName");
            await updateUserData(res);
            console.log("after update")
            const display_name = sessionStorage.getItem('display_name').replace(/\"/g, '');
            profileName.textContent = display_name;
        } 
        catch (error)
        {
            console.log(error);
            alert("error: " + error.body.detail);
        }
    }

    async handle_2FA() 
    {
        try
        {
            const res = await fetchData('auth/2fa/qr/', null);
            console.log(res.otp_uri);
            setCookie("qr-link", 1, res.otp_uri);
        } 
        catch (error)
        {
            console.log("this is error from handle 2fa");
        }
        const modal = this.querySelector("enable-2fa-modal");
        modal.create_qr();
    }

    async uploadProfilePicture() {
        try {
            const fileInput = this.querySelector("#profileImageUpload");
            if (!fileInput.files.length) {
                alert("Please select a file to upload.");
                return;
            }
    
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("avatar", file);
            await fetchData('auth/avatar/', formData, 'PUT', true, {});
            updateUserData();
    
            // อัปเดตรูปภาพใหม่ในหน้าโปรไฟล์
            const profileImage = this.querySelector("#profileImage");
            profileImage.src = URL.createObjectURL(file);
            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Failed to upload profile picture.");
        }
    }
}

customElements.define(name, EditProfilePage);
