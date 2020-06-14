import React from "react";
import GameSelector from "./gameSelector";
import GameArea from "./gameArea";

export default class Screen extends Component {
    render(){
        return (        
            <React.Fragment>
                <GameSelector></GameSelector>
                <GameArea></GameArea>  
                <GameInfo></GameInfo>                
            </React.Fragment>);
    }
};