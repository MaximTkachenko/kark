import tilesMeta from '../services/metadata';
import {getRandomInt} from "./utils"

const tileQueueService = function (tilesSetNumber) {
    "use strict";

    var queue = [];
    var queueObject = {};

    for (var tileKey in tilesMeta) {
        if (!tilesMeta.hasOwnProperty(tileKey)) {
            continue;
        }

        for (var i = 1, imax = tilesMeta[tileKey].count * tilesSetNumber; i <= imax; i++) {
            var item = tileKey + "_" + i;
            queue.push(item);
            queueObject[item] = 1;
        }
    };

    var getNextTile = function(tileName) {
        var index = -1;

        if (queue.length === 0) {
            throw new GameOver();
        }

        if (tileName) {
            for (var j = 0, jmax = queue.length; j < jmax; j++) {
                if (queue[j].indexOf(tileName + "_") !== 0) continue;

                index = j;
                break;
            }

            if (index < 0) {
                throw new GameOver("sorry, no tiles with name '" + tileName + "'!");
            }
        } else {
            index = getRandomInt(0, queue.length - 1);
        }

        var assetName = queue[index].split('_')[0];
        var key = queue[index];

        queue.splice(index, 1);
        delete queueObject[key];

        return { assetName: assetName, key: key };
    };

    var putToQueue = function(keys) {
        for (var j = 0, jmax = keys.length; j < jmax; j++) {
            var item = keys[j].key;

            if (queueObject[item]) {
                continue;
            }
            queue.push(item);
        }
    };

    var getLength = function() {
        return queue.length;
    };

    return {
        getNextTile: getNextTile,
        putToQueue: putToQueue,
        getLength: getLength,
        _queue: queue
    };
};

export default tileQueueService;