export default class GameOver extends Error {
    constructor()
    {
        super("game over");
        this.name = "GameOver";
    }
};