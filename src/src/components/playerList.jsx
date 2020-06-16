import React from "react";
import playerService from '../services/playerService';

const Player = props => {
    var playerClasses = ["player-details"];
    if(props.current){
        playerClasses.push("player-details__current");
    }            
    var playerClassFinal = playerClasses.join(" ");

    var nameStyle = { color: props.color };

    return (
        <div className={playerClassFinal} id={props.name}>
            <div><label style={nameStyle}>{props.name}</label></div>
            <div>score: {props.score}</div>
            <div>flags: {props.availableFlags}</div>
        </div>);
};

export default class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: playerService.getPlayers() };
    }

    componentDidMount(){
        console.log('FIRED!');
        document.addEventListener('playersChanged', () => {this.updatePlayers();});
    }

    updatePlayers(){
        this.setState({ players: playerService.getPlayers() });
        console.log(this.state.players);
    }

    render(){
        return (<div>
            {this.state.players.map(function(player){
                return <Player key={player.name} {...player}/>
            })}
        </div>);
    }
};