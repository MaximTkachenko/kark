import React from "react";

export default class GameArea extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidUpdate(){
        
    }

    render() {
        return (
            <React.Fragment>
                <div id="game-container"></div>
            </React.Fragment>);
    }
};