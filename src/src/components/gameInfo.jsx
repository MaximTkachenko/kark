import React from "react";

export default class GameInfo extends Component {
    render(){
        return ( 
            <div id="game-info" class="hidden">
                <div id="players"></div>
                <div class="feedback-link-container">
                    <button onclick="if (confirm('You are going to start a new game.')) {location.href = location.href;}" class="btn btn-primary">New game</button>
                </div>
            </div>       
        );
    }
};