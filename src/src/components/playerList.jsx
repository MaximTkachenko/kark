import React from "react";

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

export default class PlayersList extends Component {
    getInitialState(){
        players.registerChangeListener(this.updateState);
        return { players: players.getPlayers() }; 
    }
    updateState(){
        this.setState({ players: players.getPlayers() });
    }
    render(){
        return (<div>
            {this.state.players.map(function(player){
                return <Player key={player.name} {...player}/>
            })}
        </div>);
    }
};