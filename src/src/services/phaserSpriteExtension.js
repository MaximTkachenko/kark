import Constants from "./globalConstants";
import MetadataCalculator from "./metadataCalculator";

export default function extendSpritePrototype (tileProto) {
    "use strict";

    tileProto.getCorners = function () {
        var x = this.position.x;
        var y = this.position.y;
        var halfSize = Constants.HALF_SIZE;

        return {
            leftTop: { x: x - halfSize, y: y - halfSize },
            rightTop: { x: x + halfSize, y: y - halfSize },
            leftBottom: { x: x - halfSize, y: y + halfSize },
            rightBottom: { x: x + halfSize, y: y + halfSize }
        };
    };

    tileProto.getEdgeStr = function (edge) {
        return MetadataCalculator.getEdgeStr(this.metadata.content, edge, this.angle);
    }

    tileProto.getContent = function (edge) {
        return MetadataCalculator.getContent(this.metadata.content, edge, this.angle);
    }

    tileProto.getFullContent = function () {
        return MetadataCalculator.getFullContent(this.metadata.content, this.angle);
    }
};