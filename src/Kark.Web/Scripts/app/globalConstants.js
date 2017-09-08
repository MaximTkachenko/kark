var SIZE = 91;
var MAN_SIZE = SIZE / 5;
var MAN_SIZE_HALF = SIZE / 10;
var GAME_WORLD_SIZE = 3500;
var HALF_SIZE = SIZE / 2;

var TOP = "top";
var BOTTOM = "bottom";
var LEFT = "left";
var RIGHT = "right";
var EDGE_ARR = [TOP, LEFT, BOTTOM, RIGHT];
var TILE_INDEX_MAX = 4;
var FIRST_TILE = 'tile8';

var DRAG_OK_BORDER_COLOR = 0x67BC6C;
var PRECALC_DRAG_OK_COLOR = 0xDFFAB6;
var MAIN_COLOR_HASH = "#EBF4F7";
var MAIN_COLOR_HEX = 0xEBF4F7;
var FLAG_BORDER_COLOR = 0xEEEF442;

var CHURCH_KEY = "c1";
var CHURCH_FULL_SCORE = 9;

var ObjectTypes = {
    ROAD: "ROAD",
    TOWN: "TOWN",
    FIELD: "FIELD",
    CHURCH: "CHURCH",
    getType: function (code) {
        switch (code[0]) {
            case "r":
                return this.ROAD;
            case "t":
                return this.TOWN;
            case "f":
                return this.FIELD;
            case "c":
                return this.CHURCH;
            case "e":
            default:
                return null;
        }
    }
};