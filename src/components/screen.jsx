import React from "react";
import GameSelector from "./gameSelector";
import GameArea from "./gameArea";
import GameInfo from "./gameInfo";
import playerService from '../services/playerService';
import KarkGame from '../services/karkGame';

export default class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameStarted: false, assetsLoaded: false };
        this.startTheGame = this.startTheGame.bind(this);
        this.assetsLoaded = this.assetsLoaded.bind(this);

        this.defaultUsers = [
            {name: "Frodo Baggins", color: "#FF333C", hexColor: 0xFF333C},
            {name: "Gandalf the Grey", color: "#3933FF", hexColor: 0x3933FF},
            {name: "Aragorn", color: "#010106", hexColor: 0x010106},
            {name: "Sauron", color: "#F47C41", hexColor: 0xF47C41}
        ];
    }

    startTheGame(tileSetSize, playersCount){
        for (var i = 0; i < playersCount; i++){
            playerService.add(this.defaultUsers[i].name, this.defaultUsers[i].color, this.defaultUsers[i].hexColor);
        }

        const game = new KarkGame(tileSetSize);

        this.setState({ gameStarted: true });
    }

    componentDidMount(){
        document.addEventListener('assetsLoaded', this.assetsLoaded);
    }

    assetsLoaded(){
        this.setState({ assetsLoaded: true });
    }

    render(){
        const assetsLoadingMessageStyle = {
            position: 'absolute',
            top: '30%',
            left: '40%',
            fontSize: 'xx-large',
            fontWeight: 900
        };        

        const assetsLoadingMessage = this.state.assetsLoaded
            ? <React.Fragment></React.Fragment>
            : <div style={assetsLoadingMessageStyle}>LOADING ASSETS...</div>;

        return this.state.gameStarted ? 
            <React.Fragment>
                {assetsLoadingMessage}
                <GameArea></GameArea>  
                <GameInfo></GameInfo>                
            </React.Fragment> 
            :            
            <React.Fragment>
                <GameSelector onStartTheGame={this.startTheGame}></GameSelector>
            </React.Fragment>;
    }
};