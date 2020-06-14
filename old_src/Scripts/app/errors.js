function GameOver() {
    this.name = "GameOver";
    this.message = "game over";
}

GameOver.prototype = new Error();
GameOver.prototype.constructor = GameOver;