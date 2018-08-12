(function (tileProto) {
    "use strict";

    tileProto.getCorners = function () {
        var x = this.position.x;
        var y = this.position.y;
        var halfSize = SIZE / 2;

        return {
            leftTop: { x: x - halfSize, y: y - halfSize },
            rightTop: { x: x + halfSize, y: y - halfSize },
            leftBottom: { x: x - halfSize, y: y + halfSize },
            rightBottom: { x: x + halfSize, y: y + halfSize }
        };
    };

    tileProto.getEdgeStr = function (edge) {
        return metadataCalculator.getEdgeStr(this.metadata.content, edge, this.angle);
    }

    tileProto.getContent = function (edge) {
        return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
    }

    tileProto.getFullContent = function () {
        return metadataCalculator.getFullContent(this.metadata.content, this.angle);
    }
})(Phaser.Sprite.prototype);