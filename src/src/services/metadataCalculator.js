import Constants from "./globalConstants";

const metadataCalculator = {
    getEdgeStr: function (metadataArray, edge, angle) {
        var edgeContent = this.getContent(metadataArray, edge, angle);
        return [edgeContent[1][0], edgeContent[2][0], edgeContent[3][0]].join();
    },

    getContent: function (metadataArray, edge, angle) {
        switch (angle) {
            case 0:
                switch (edge) {
                    case Constants.TOP:
                        return metadataArray[0];
                    case Constants.LEFT:
                        return [
                            metadataArray[0][0],
                            metadataArray[1][0],
                            metadataArray[2][0],
                            metadataArray[3][0],
                            metadataArray[4][0]
                        ];
                    case Constants.RIGHT:
                        return [
                            metadataArray[0][4],
                            metadataArray[1][4],
                            metadataArray[2][4],
                            metadataArray[3][4],
                            metadataArray[4][4]
                        ];
                    case Constants.BOTTOM:
                        return metadataArray[4];
                    default:
                        return null;
                }
            case 90:
                switch (edge) {
                    case Constants.TOP:
                        return [
                            metadataArray[4][0],
                            metadataArray[3][0],
                            metadataArray[2][0],
                            metadataArray[1][0],
                            metadataArray[0][0]
                        ];
                    case Constants.LEFT:
                        return metadataArray[4];
                    case Constants.RIGHT:
                        return metadataArray[0];
                    case Constants.BOTTOM:
                        return [
                            metadataArray[4][4],
                            metadataArray[3][4],
                            metadataArray[2][4],
                            metadataArray[1][4],
                            metadataArray[0][4]
                        ];
                    default:
                        return null;
                }
            case -180:
                switch (edge) {
                    case Constants.TOP:
                        return [
                            metadataArray[4][4],
                            metadataArray[4][3],
                            metadataArray[4][2],
                            metadataArray[4][1],
                            metadataArray[4][0]
                        ];
                    case Constants.LEFT:
                        return [
                            metadataArray[4][4],
                            metadataArray[3][4],
                            metadataArray[2][4],
                            metadataArray[1][4],
                            metadataArray[0][4]
                        ];
                    case Constants.RIGHT:
                        return [
                            metadataArray[4][0],
                            metadataArray[3][0],
                            metadataArray[2][0],
                            metadataArray[1][0],
                            metadataArray[0][0]
                        ];
                    case Constants.BOTTOM:
                        return [
                            metadataArray[0][4],
                            metadataArray[0][3],
                            metadataArray[0][2],
                            metadataArray[0][1],
                            metadataArray[0][0]
                        ];
                    default:
                        return null;
                }
            case -90:
                switch (edge) {
                    case Constants.TOP:
                        return [
                            metadataArray[0][4],
                            metadataArray[1][4],
                            metadataArray[2][4],
                            metadataArray[3][4],
                            metadataArray[4][4]
                        ];
                    case Constants.LEFT:
                        return [
                            metadataArray[0][4],
                            metadataArray[0][3],
                            metadataArray[0][2],
                            metadataArray[0][1],
                            metadataArray[0][0]
                        ];
                    case Constants.RIGHT:
                        return [
                            metadataArray[4][4],
                            metadataArray[4][3],
                            metadataArray[4][2],
                            metadataArray[4][1],
                            metadataArray[4][0]
                        ];
                    case Constants.BOTTOM:
                        return [
                            metadataArray[0][0],
                            metadataArray[1][0],
                            metadataArray[2][0],
                            metadataArray[3][0],
                            metadataArray[4][0]
                        ];
                    default:
                        return null;
                }
            default:
                throw new Error("Angle " + angle + "is not supported.");
        }
    },

    getFullContent: function (metadataArray, angle) {
        switch (angle) {
            case 0:
                return metadataArray;
            case 90:
                return [[metadataArray[4][0], metadataArray[3][0], metadataArray[2][0], metadataArray[1][0], metadataArray[0][0]],
                    [metadataArray[4][1], metadataArray[3][1], metadataArray[2][1], metadataArray[1][1], metadataArray[0][1]],
                    [metadataArray[4][2], metadataArray[3][2], metadataArray[2][2], metadataArray[1][2], metadataArray[0][2]],
                    [metadataArray[4][3], metadataArray[3][3], metadataArray[2][3], metadataArray[1][3], metadataArray[0][3]],
                    [metadataArray[4][4], metadataArray[3][4], metadataArray[2][4], metadataArray[1][4], metadataArray[0][4]]];
            case -180:
                return [[metadataArray[4][4], metadataArray[4][3], metadataArray[4][2], metadataArray[4][1], metadataArray[4][0]],
                    [metadataArray[3][4], metadataArray[3][3], metadataArray[3][2], metadataArray[3][1], metadataArray[3][0]],
                    [metadataArray[2][4], metadataArray[2][3], metadataArray[2][2], metadataArray[2][1], metadataArray[2][0]],
                    [metadataArray[1][4], metadataArray[1][3], metadataArray[1][2], metadataArray[1][1], metadataArray[1][0]],
                    [metadataArray[0][4], metadataArray[0][3], metadataArray[0][2], metadataArray[0][1], metadataArray[0][0]]];
            case -90:
                return [[metadataArray[0][4], metadataArray[1][4], metadataArray[2][4], metadataArray[3][4], metadataArray[4][4]],
                    [metadataArray[0][3], metadataArray[1][3], metadataArray[2][3], metadataArray[3][3], metadataArray[4][3]],
                    [metadataArray[0][2], metadataArray[1][2], metadataArray[2][2], metadataArray[3][2], metadataArray[4][2]],
                    [metadataArray[0][1], metadataArray[1][1], metadataArray[2][1], metadataArray[3][1], metadataArray[4][1]],
                    [metadataArray[0][0], metadataArray[1][0], metadataArray[2][0], metadataArray[3][0], metadataArray[4][0]]];
            default:
                throw new Error("Angle " + angle + "is not supported.");
        }
    }
};

export default metadataCalculator;