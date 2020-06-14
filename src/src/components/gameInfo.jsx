import React from "react";
import PlayersList from "./playerList";

export default class GameInfo extends React.Component {
    startNewGame(){
        if (confirm('You are going to start a new game.')) {
            location.href = location.href;
        }
    }

    render(){
        return ( 
            <div id="game-info" className="hidden">
                <div id="players">
                    <PlayersList/>
                </div>
                <div className="feedback-link-container">
                    <button onClick={this.startNewGame} className="btn btn-primary">New game</button>
                </div>
            </div>       
        );
    }
};