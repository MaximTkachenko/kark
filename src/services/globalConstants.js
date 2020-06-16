const constants = { 
    SIZE: 91,
    GAME_WORLD_SIZE: 3500,
    
    TOP: "top",
    BOTTOM: "bottom",
    LEFT: "left",
    RIGHT: "right",
    TILE_INDEX_MAX: 4,
    FIRST_TILE: 'tile8',

    DRAG_OK_BORDER_COLOR: 0x67BC6C,
    PRECALC_DRAG_OK_COLOR: 0xDFFAB6,
    MAIN_COLOR_HASH: "#EBF4F7",
    MAIN_COLOR_HEX: 0xEBF4F7,
    FLAG_BORDER_COLOR: 0xEEEF442,

    CHURCH_KEY: "c1",
    CHURCH_FULL_SCORE: 9,

    ObjectTypes: {
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
    }
};

constants.MAN_SIZE = constants.SIZE / 5;
constants.MAN_SIZE_HALF = constants.SIZE / 10;
constants.HALF_SIZE = constants.SIZE / 2;

constants.EDGE_ARR = [constants.TOP, constants.LEFT, constants.BOTTOM, constants.RIGHT];

export default constants;