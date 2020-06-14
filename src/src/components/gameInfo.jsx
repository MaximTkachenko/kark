import React from "react";

export default class GameInfo extends React.Component {
    render(){
        return ( 
            <div id="game-info" className="hidden">
                <div id="players"></div>
                <div className="feedback-link-container">
                    <button onclick="if (confirm('You are going to start a new game.')) {location.href = location.href;}" className="btn btn-primary">New game</button>
                </div>
            </div>       
        );
    }
};