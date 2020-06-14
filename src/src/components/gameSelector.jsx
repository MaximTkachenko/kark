import React from "react";

export default GameSelector = props => {

    return (        
        <div id="mode-selector">
            <div id="mode-selector-inner">
                <h1>New game</h1>
                <div class="row">
                    <div class="col-md-6">
                        <h2>Local</h2>
                        <form class="form-inline">
                            <div class="form-group">
                                <label for="local-game-tiles-set">Tiles</label>
                                <select id="local-game-tiles-set" class="form-control">
                                    <option value="1">x 1</option>
                                    <option value="2">x 2</option>
                                    <option value="3">x 3</option>
                                    <option value="4">x 4</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="local-game-users-number">Users</label>
                                <select id="local-game-users-number" class="form-control">
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <button type="button" class="btn btn-primary" id="local-game-start-btn">Start!</button>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12" style="padding-top: 130px;">
                        <a href="https://www.youtube.com/watch?v=d89u-gXjIVY" style="color: white;" target="_blank">How to play carassonne</a>
                    </div>
                </div>
            </div>
        </div>);
};