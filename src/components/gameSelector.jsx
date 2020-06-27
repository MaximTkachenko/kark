import React from "react";

export default class GameSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {titleSetSize: 1, playersCount: 2};
        this.startTheGame = this.startTheGame.bind(this);
        this.setTitleSetSize = this.setTitleSetSize.bind(this);
        this.setPlayersCount = this.setPlayersCount.bind(this);
    }

    startTheGame(){
        this.props.onStartTheGame(this.state.titleSetSize, this.state.playersCount);
    }

    setTitleSetSize(e){
        this.setState({titleSetSize: e.target.value});
    }

    setPlayersCount(e){
        this.setState({playersCount: e.target.value});
    }

    render(){
        const ruleLinkStyle = { paddingTop: '130px'};
        const ruleLinkContainerStyle = { color: 'white'};

        return (        
            <div id="mode-selector" style={ruleLinkStyle}>
                <div id="mode-selector-inner">
                    <h1>New game</h1>
                    <div className="row">
                        <div className="col-md-12">
                            <form className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="local-game-tiles-set">Tiles</label>
                                    <select id="local-game-tiles-set" className="form-control" onChange={this.setTitleSetSize}>
                                        <option value="1">x 1</option>
                                        <option value="2">x 2</option>
                                        <option value="3">x 3</option>
                                        <option value="4">x 4</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="local-game-users-number">Users</label>
                                    <select id="local-game-users-number" className="form-control" onChange={this.setPlayersCount}>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={this.startTheGame}>Start!</button>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={ruleLinkStyle}>
                            <a href="https://www.youtube.com/watch?v=d89u-gXjIVY" style={ruleLinkContainerStyle} target="_blank">How to play carcassonne</a>
                        </div>
                    </div>
                </div>
            </div>);
    }
};