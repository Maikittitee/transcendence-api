import { Component } from "../../Component.js";
import { fetchData } from "../../../../utils.js";

const name = "game-play-page";

const componentStyle = `

`;

export class GamePlayPage extends Component { 
    constructor() {
        super(componentStyle);
    }

    render()
    {
        return ` 
            
        `;
    }

    postCreate() 
    {
        
    }
}

customElements.define(name, GamePlayPage);