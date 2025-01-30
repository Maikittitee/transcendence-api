// Src/index.js

// Images
import { Images } from "./Images/Images.js";

export { Images };

// Component and Pages
import { Component } from "./Component/Component.js";
import { LoadingPage }  from "./Component/Pages/LoadingPage/LoadingPage.js";
import { HomePage }  from "./Component/Pages/HomePage/HomePage.js";
import { GuestLoginPage }  from "./Component/Pages/GuestLoginPage/GuestLoginPage.js";
import { RegisterPage }  from "./Component/Pages/RegisterPage/RegisterPage.js";
import { GameMenuPage }  from "./Component/Pages/GameMenuPage/GameMenuPage.js";
import { PlayMenuPage }  from "./Component/Pages/PlayMenuPage/PlayMenuPage.js";
import { EditProfilePage }  from "./Component/Pages/EditProfilePage/EditProfilePage.js";
import { MatchMakingPage }  from "./Component/Pages/MatchMakingPage/MatchMakingPage.js";
import { GamePlayPage }  from "./Component/Pages/GamePlayPage/GamePlayPage.js";

export {        Component,
                LoadingPage,
                HomePage,
                GuestLoginPage,
                RegisterPage,
                GameMenuPage,
                EditProfilePage,
                PlayMenuPage,
                MatchMakingPage,
                GamePlayPage,
};

// Popup
import { Modal }  from "./Component/Popup/Modal/Modal.js";
import { Enable2FAModal }  from "./Component/Popup/Enable2FAModal/Enable2FAModal.js";
import { AddFriendModal }  from "./Component/Popup/AddFriendModal/AddFriendModal.js";
import { EditBioModal }  from "./Component/Popup/EditBioModal/EditBioModal.js";
import { AcceptFriendModal }  from "./Component/Popup/AcceptFriendModal/AcceptFriendModal.js";

export { Modal, Enable2FAModal, AddFriendModal, EditBioModal, AcceptFriendModal};

// Router and Route
import { Router, Route } from "./Router/Router.js";

export { Router, Route };

// API_Service
import {CreateAccountAPI} from "./ApiService/CreateAccountAPI/CreateAccountAPI.js";

export {CreateAccountAPI};

// APIs
import { APIs } from "./ApiService/APIs.js";

export {APIs};