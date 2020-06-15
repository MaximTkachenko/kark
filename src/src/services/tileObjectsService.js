import {guid, getOpposite} from "./utils"
import Constants from "./globalConstants";

function tileObjectsService() {
    "use strict";

    var objects = {};
    var processedTileUids = {};

    var getObjectItemId = function (code, tile) {
        return tile.uid + "_" + code;
    }

    var getObject = function (code, tile) {
        var object = objects[getObjectItemId(code, tile)];
        if (!object) {
            throw new Error("there is no object with such id.");
        }
        return objects[getObjectItemId(code, tile)];
    }

    var createNewObjects = function (tile) {
        if (processedTileUids[tile.uid]) {
            throw new Error("this tile is already processed.");
        }

        for (var i = 0, imax = tile.metadata.content.length; i < imax; i++) {
            for (var j = 0, jmax = tile.metadata.content[i].length; j < jmax; j++) {
                if (!tile.metadata.content[i][j]) continue;

                var code = tile.metadata.content[i][j];

                var objectId = getObjectItemId(code, tile);

                var object = objects[objectId];
                if (!object) {
                    var objectItems = {};
                    objectItems[objectId] = tile;

                    object = { uid: guid(), type: Constants.ObjectTypes.getType(code), objectItems: objectItems, slots: 0, owners: {} };
                    objects[objectId] = object;
                }
                if (i === 0 || j === 0 || i === Constants.TILE_INDEX_MAX || j === Constants.TILE_INDEX_MAX) {
                    object.slots++;
                }
            }
        }

        processedTileUids[tile.uid] = 1;
    };

    var updateSlotsForChurch = function (tile) {
        var slots = Constants.CHURCH_FULL_SCORE - 1,
            object,
            neighbourTile;
        
        neighbourTile = tile.neighbours.top;
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = tile.neighbours.bottom;
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = tile.neighbours.left;
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = tile.neighbours.right;
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = (tile.neighbours.top && tile.neighbours.top.neighbours.left)
            ? tile.neighbours.top.neighbours.left
            : (tile.cells.top ? tile.cells.top.left : null);
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = (tile.neighbours.top && tile.neighbours.top.neighbours.right)
            ? tile.neighbours.top.neighbours.right
            : (tile.cells.top ? tile.cells.top.right : null);
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = (tile.neighbours.bottom && tile.neighbours.bottom.neighbours.left)
            ? tile.neighbours.bottom.neighbours.left
            : (tile.cells.bottom ? tile.cells.bottom.left : null);
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        neighbourTile = (tile.neighbours.bottom && tile.neighbours.bottom.neighbours.right)
            ? tile.neighbours.bottom.neighbours.right
            : (tile.cells.bottom ? tile.cells.bottom.right : null);
        if (neighbourTile) {
            slots--;
            if (neighbourTile.metadata.hasChurch) {
                object = getObject(Constants.CHURCH_KEY, neighbourTile);
                object.slots = object.slots - 1;
            }
        }

        if (!tile.metadata.hasChurch) {
            return;
        }

        object = getObject(Constants.CHURCH_KEY, tile);
        object.slots = slots;
    };

    var setOwnerForObject = function (objectId, ownerId) {
        var object = objects[objectId];
        if (!object) {
            throw new Error("there is no object with such id.");
        }

        var ownerKeys = Object.keys(objects[objectId].owners);
        if (ownerKeys && ownerKeys.length > 0) {
            throw new Error("this object already has owner.");
        }

        object.owners[ownerId] = 1;
    }

    var connectTiles = function (tile) {
        if (tile.neighbours.top) {
            connectTilesForEdge(tile, Constants.TOP);
        }
        if (tile.neighbours.right) {
            connectTilesForEdge(tile, Constants.RIGHT);
        }
        if (tile.neighbours.left) {
            connectTilesForEdge(tile, Constants.LEFT);
        }
        if (tile.neighbours.bottom) {
            connectTilesForEdge(tile, Constants.BOTTOM);
        }
    }

    function connectTilesForEdge(tile, edge) {
        var tileEdge = tile.getContent(edge);
        var neighbourEdge = tile.neighbours[edge].getContent(getOpposite(edge));

        for (var i = 0, imax = tileEdge.length; i < imax; i++) {
            if (!tileEdge[i]) continue;

            if (tileEdge[i][0] !== neighbourEdge[i][0]) throw new Error("invalid data while connecting tiles!");

            var existingObject = getObject(neighbourEdge[i], tile.neighbours[edge]);
            var currentObject = getObject(tileEdge[i], tile);

            if (existingObject.uid !== currentObject.uid) {
                mergeObjects(existingObject, currentObject);
            }

            existingObject.slots = existingObject.slots - 2;
        }
    }

    function mergeObjects(targetObject, object) {
        targetObject.slots = targetObject.slots + object.slots;

        for (var objectItemId in object.objectItems) {
            if (object.objectItems.hasOwnProperty(objectItemId)) {
                targetObject.objectItems[objectItemId] = object.objectItems[objectItemId];
                objects[objectItemId] = targetObject;
            }
        }

        for (var owner in object.owners) {
            if (object.owners.hasOwnProperty(owner)) {
                var flags = object.owners[owner];
                if (targetObject.owners[owner]) {
                    flags += targetObject.owners[owner];
                }
                targetObject.owners[owner] = flags;
            }
        }
    }

    var applyChanges = function(tile) {
        createNewObjects(tile);
        connectTiles(tile);
        updateSlotsForChurch(tile);
    }

    return {
        getObjectItemId: getObjectItemId,
        getObject: getObject,
        setOwnerForObject: setOwnerForObject,
        applyChanges: applyChanges,
        //todo hide this property
        objects: objects
    };
}

const tileObjectsServiceInstance = tileObjectsService();
export default tileObjectsServiceInstance;