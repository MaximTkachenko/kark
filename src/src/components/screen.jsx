import React from "react";
import GameSelector from "./gameSelector";
import GameArea from "./gameArea";
import GameInfo from "./gameInfo";

export default class Screen extends React.Component {
    render(){
        return (        
            <React.Fragment>
                <GameSelector></GameSelector>
                <GameArea></GameArea>  
                <GameInfo></GameInfo>                
            </React.Fragment>);
    }
};