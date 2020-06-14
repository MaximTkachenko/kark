import React from "react";

export default class GameArea extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate(){
        if(this.props.gameStarted)
        {
            //todo start the game;
        }
    }

    render(){
        if(this.props.gameStarted)
        {
            return 
                <React.Fragment>
                    <div id="game-container" style="overflow: hidden;"></div>
                </React.Fragment>;
        }
        
        return <React.Fragment></React.Fragment>;
    }
};