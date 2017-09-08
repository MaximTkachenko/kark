var KarkGame = function (playersInst, tileObjects, gameDragger, tilesMetadata, tileQueueServiceObj, phaser) {
    "use strict";

    var game = new phaser.Game("100", "100", phaser.CANVAS, "game-container", { preload: preload, create: create, update: update });

    var cells = {};
    var tileLayer;
    var cellLayer;
    var flagsLayer;
    var currentTile;
    var currentFlags;
    var emitters = {};

//event handlers

    function preload()
    {
        game.world.resize(GAME_WORLD_SIZE, GAME_WORLD_SIZE);
        game.camera.x = (GAME_WORLD_SIZE - game.width) / 2;
        game.camera.y = (GAME_WORLD_SIZE - game.height) / 2;

        game.stage.backgroundColor = MAIN_COLOR_HASH;
        game.canvas.oncontextmenu = function(e) { e.preventDefault(); };
        game.renderer.renderSession.roundPixels = true;

        for (var key in tilesMetadata) {
            if (!tilesMetadata.hasOwnProperty(key)) continue;

            game.load.image(key, "assets/tiles/" + key + ".jpg");
        };

        //load emiters' assets
        for (var m = 0, players = playersInst.getPlayers(), mmax = players.length; m < mmax; m++) {
            var color = players[m].color.split('#')[1];
            game.load.image(color, "assets/pixels/" + color + ".png");
        }
    }

    function create() {

        game.input.addMoveCallback(function(pointer, x, y) {
            if (currentTile && currentTile.active) {
                currentTile.x = x + game.camera.x;
                currentTile.y = y + game.camera.y;
                handleDrag(false);
            }
        });

        cellLayer = game.add.group();
        tileLayer = game.add.group();
        flagsLayer = game.add.group();

        //create particles
        for (var m = 0, players = playersInst.getPlayers(), mmax = players.length; m < mmax; m++) {
            var color = players[m].color.split('#')[1];

            var emitter = game.add.emitter(0, 0, 15);
            flagsLayer.add(emitter);
            emitter.makeParticles(color);
            emitter.setYSpeed(-150, 150);
            emitter.setXSpeed(-150, 150);
            emitter.setScale(2, 0, 2, 0, 800);
            emitter.gravity = 0;

            emitters[players[m].color] = emitter;
        }

        nextTile(true, FIRST_TILE);
        if (!currentTile) {
            return;
        }

        createEmptyCells(currentTile);

        tileObjects.applyChanges(currentTile);

        nextTile();
    }

    function update() {
        gameDragger.update(game, currentTile);
    }

    var previousCell;
    var currentCell;

    function handleDrag(force) {
        var x = currentTile.x,
            y = currentTile.y;

        //still at the same cell
        if (!force &&
            previousCell &&
            previousCell.x < x &&
            x < previousCell.x1 &&
            previousCell.y < y &&
            y < previousCell.y1) {
            return;
        }

        currentTile.dragOk = false;

        currentCell = null;
        for (var key in cells) {
            if (!cells.hasOwnProperty(key)) continue;

            var rect = cells[key];
            if (!rect) continue;

            if (rect.x < x && x < rect.x1 && rect.y < y && y < rect.y1) {
                currentCell = rect;

                currentTile.dragOk = check(currentCell);

                rect.rect.clear();
                if (currentTile.dragOk) {
                    rect.rect.beginFill(PRECALC_DRAG_OK_COLOR, 1);
                    rect.rect.lineStyle(5, DRAG_OK_BORDER_COLOR, 1);
                    rect.rect.drawRect(rect.x, rect.y, SIZE, SIZE);
                    rect.rect.endFill();
                } else {
                    rect.rect.beginFill(rect.color, 1);
                    rect.rect.lineStyle(0, 0x000000, 0);
                    rect.rect.drawRect(rect.x, rect.y, SIZE, SIZE);
                    rect.rect.endFill();
                }
            }
        }

        if (!force && previousCell) {
            previousCell.rect.clear();

            previousCell.rect.beginFill(previousCell.color, 1);
            previousCell.rect.lineStyle(0, 0x000000, 0);
            previousCell.rect.drawRect(previousCell.x, previousCell.y, SIZE, SIZE);
            previousCell.rect.endFill();
        }

        previousCell = currentCell;
    }

    function handleAreaClick(area) {
        tileObjects.setOwnerForObject(area.areaId, playersInst.current().name);
        for (var i = 0, imax = currentFlags.length; i < imax; i++) {
            if (currentFlags[i].areaId === area.areaId) {
                var currentShape = currentFlags[i].graphicsData[0].shape;

                var g = game.add.graphics(0, 0);
                g.beginFill(playersInst.current().hexColor, 1);
                g.drawCircle(currentShape.x, currentShape.y, MAN_SIZE);
                g.endFill();
                g.flagColor = playersInst.current().color;
                g.hexColor = playersInst.current().hexColor;
                flagsLayer.add(g);

                currentTile.ownerFlag = g;

                currentTile.ownerFlag.objectItemId = area.areaId;
                currentTile.ownerFlag.ownerName = playersInst.current().name;

                playersInst.decrementFlags();
            };

            currentFlags[i].destroy();
        }

        var promise = updateObjectCompletion();

        promise.then(function() { nextTile(); });
    }

    function handleTileClick() {
        for (var i = 0, imax = currentFlags.length; i < imax; i++) {
            currentFlags[i].destroy();
        }
        nextTile();
    }

//logic
    function nextTile(isFirst, number) {
        if (currentTile) {
            currentTile.inputEnabled = false;
        }

        var cellsToPut, keysToReturn = [], next;

        try {
            do {
                if (number && keysToReturn.length === 1) {
                    next = tileQueueServiceObj.getNextTile();
                } else {
                    next = tileQueueServiceObj.getNextTile(number);
                }

                if (isFirst) break;

                cellsToPut = findSuitableCells(tilesMetadata[next.assetName].content, cells);
                if (cellsToPut.length > 0) {
                    for (var i = 0, imax = cellsToPut.length; i < imax; i++) {
                        var cell = cells[cellsToPut[i]];

                        cell.rect.clear();
                        cell.rect.beginFill(PRECALC_DRAG_OK_COLOR, 1);
                        cell.rect.drawRect(cell.x, cell.y, SIZE, SIZE);
                        cell.rect.endFill();
                        cell.color = PRECALC_DRAG_OK_COLOR;
                    }
                    break;
                }

                keysToReturn.push(next);

                if (cellsToPut.length === 0 && tileQueueServiceObj.getLength() === 0) {
                    throw new GameOver();
                }
            } while (true);
        } catch (ex) {
            if (ex instanceof GameOver) {
                var promise = finishScoreCalculation();
                promise.then(function() {
                    //todo handle it as event
                    $("#game-over-dialog").modal();
                });
                return;
            }
        }

        if (keysToReturn.length > 0) {
            tileQueueServiceObj.putToQueue(keysToReturn);
        }

        var offset = isFirst ? GAME_WORLD_SIZE / 2 : 0;
        var tile = tileLayer.create(offset, offset, next.assetName);
        tile.anchor.setTo(0.5, 0.5);
        tile.metadata = tilesMetadata[next.assetName];
        tile.uid = next.key;
        if (!isFirst) {
            tile.inputEnabled = true;
            tile.active = true;
            tile.events.onInputDown.add(doubleclick, this);
            tile.checkWorldBounds = true;
        }
        tile.neighbours = { top: null, right: null, left: null, bottom: null };
        tile.cells = { top: null, right: null, left: null, bottom: null };

        currentTile = tile;

        if (!isFirst) {
            playersInst.next();
        }
    }

    function createEmptyCells(tile) {
        var corners = tile.getCorners();

        if (!tile.neighbours.top) {
            drawCell(corners.leftTop.x, corners.leftTop.y - SIZE, TOP, tile);
        }

        if (!tile.neighbours.bottom) {
            drawCell(corners.leftBottom.x, corners.leftBottom.y, BOTTOM, tile);
        }
        if (!tile.neighbours.left) {
            drawCell(corners.leftTop.x - SIZE, corners.leftTop.y, LEFT, tile);
        }
        if (!tile.neighbours.right) {
            drawCell(corners.rightTop.x, corners.rightTop.y, RIGHT, tile);
        }
    }

    function drawCell(x, y, place, tile) {
        var cellKey = getCellKey(x, y);
        var cell;
        if (!cells[cellKey]) {
            var g = game.add.graphics(0, 0);
            g.beginFill(MAIN_COLOR_HEX, 1);
            g.drawRect(x, y, SIZE, SIZE);
            g.endFill();

            cellLayer.add(g);

            var rectA = g.graphicsData[0].shape;
            cell = { x: rectA.x, y: rectA.y, x1: rectA.x + SIZE, y1: rectA.y + SIZE, rect: g, color: MAIN_COLOR_HEX };
            cells[cellKey] = cell;
        } else cell = cells[cellKey];

        cell[getOpposite(place)] = tile;
        tile.cells[place] = cell;
    }

    function handleDragStop() {
        if (!currentTile.dragOk || !currentTile.active) return;

        currentTile.active = false;
        currentTile.x = currentCell.x + HALF_SIZE;
        currentTile.y = currentCell.y + HALF_SIZE;

        //reset cells
        for (var key in cells) {
            if (!cells.hasOwnProperty(key)) continue;

            var cell = cells[key];

            cell.rect.clear();
            cell.rect.beginFill(MAIN_COLOR_HEX, 1);
            cell.rect.drawRect(cell.x, cell.y, SIZE, SIZE);
            cell.rect.endFill();
            cell.color = MAIN_COLOR_HEX;
        }

        if (currentCell.top) {
            currentTile.neighbours.top = currentCell.top;
            currentTile.neighbours.top.neighbours.bottom = currentTile;
        }

        if (currentCell.left) {
            currentTile.neighbours.left = currentCell.left;
            currentTile.neighbours.left.neighbours.right = currentTile;
        }

        if (currentCell.right) {
            currentTile.neighbours.right = currentCell.right;
            currentTile.neighbours.right.neighbours.left = currentTile;
        }

        if (currentCell.bottom) {
            currentTile.neighbours.bottom = currentCell.bottom;
            currentTile.neighbours.bottom.neighbours.top = currentTile;
        }

        delete cells[getCellKey(currentCell.x, currentCell.y)];

        createEmptyCells(currentTile);

        tileObjects.applyChanges(currentTile);

        if (playersInst.current().availableFlags > 0) {
            show();
            currentTile.events.onInputDown.add(function() { handleTileClick(); });
        }

        var promise = updateObjectCompletion();
        
        if (playersInst.current().availableFlags === 0 || currentFlags.length === 0) {
            promise.then(function () {
                    nextTile();
            });
        }
    }

    //todo unit tests
    function check(cell) {
        var topOk = true;
        var leftOk = true;
        var rightOk = true;
        var bottomOk = true;

        if (cell.top) {
            topOk = currentTile.getEdgeStr(TOP) === cell.top.getEdgeStr(BOTTOM);
        }
        if (cell.left) {
            leftOk = currentTile.getEdgeStr(LEFT) === cell.left.getEdgeStr(RIGHT);
        }
        if (cell.right) {
            rightOk = currentTile.getEdgeStr(RIGHT) === cell.right.getEdgeStr(LEFT);
        }
        if (cell.bottom) {
            bottomOk = currentTile.getEdgeStr(BOTTOM) === cell.bottom.getEdgeStr(TOP);
        }
        return topOk && leftOk && rightOk && bottomOk;
    }

    var mylatesttap;
    var timeoutId;

    function doubleclick(item, pointer) {
        if (!currentTile.active) {
            return;
        }

        if (pointer.rightButton.isDown) {
            return;
        }

        var now = new Date().getTime();
        var timesince = now - mylatesttap;
        if ((timesince < 300) && (timesince > 0)) {
            clearTimeout(timeoutId);
            currentTile.angle += 90;
            handleDrag(true);
        } else {
            timeoutId = setTimeout(function() { handleDragStop(); }, 310);
        }
        mylatesttap = new Date().getTime();
    }

    function show() {
        var i, j, imax, jmax;
        currentFlags = [];

        var data = {};
        var content = currentTile.getFullContent();

        for (i = 0, imax = content.length; i < imax; i++) {
            for (j = 0, jmax = content[i].length; j < jmax; j++) {
                if (!content[i][j]) continue;

                if (!data[content[i][j]]) {
                    data[content[i][j]] = [];
                }
                data[content[i][j]].push({
                    x: currentTile.x - HALF_SIZE + MAN_SIZE * j + MAN_SIZE_HALF,
                    y: currentTile.y - HALF_SIZE + MAN_SIZE * i + MAN_SIZE_HALF,
                    i: i,
                    j: j
                });
            }
        }

        var g, objectCell, flagColor = playersInst.current().hexColor;
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;

            var object = tileObjects.getObject(key, currentTile);
            if (!object || Object.keys(object.owners).length > 0) continue;

            g = game.add.graphics(0, 0);
            g.beginFill(flagColor, 1);
            g.lineStyle(3, FLAG_BORDER_COLOR, 1);

            objectCell = getObjectCellIndex(ObjectTypes.getType(key), data[key]);
            g.drawCircle(objectCell.x, objectCell.y, MAN_SIZE);
            g.endFill();

            g.areaId = tileObjects.getObjectItemId(key, currentTile);
            g.inputEnabled = true;
            g.events.onInputDown.add(function(item) { handleAreaClick(item); }, this);

            flagsLayer.add(g);
            currentFlags.push(g);
        }
    }

    //todo unit tests
    function getObjectCellIndex(objectType, objectCells) {
        if (objectCells.length === 0) {
            throw new Error("Invalid object.");
        }

        if (objectCells.length === 1) {
            return objectCells[0];
        }

        for (var i = 0, imax = objectCells.length; i < imax; i++) {
            var cell = objectCells[i];

            if (objectType === ObjectTypes.FIELD) {
                if ((cell.i === 1 && cell.j === 0) ||
                    (cell.i === 3 && cell.j === 0) ||
                    (cell.i === 1 && cell.j === 4) ||
                    (cell.i === 3 && cell.j === 4) ||
                    (cell.i === 0 && cell.j === 1) ||
                    (cell.i === 0 && cell.j === 3) ||
                    (cell.i === 4 && cell.j === 1) ||
                    (cell.i === 4 && cell.j === 3)) {
                    return cell;
                }
            } else if (objectType === ObjectTypes.ROAD || objectType === ObjectTypes.TOWN) {
                if ((cell.i === 2 && cell.j === 0) ||
                    (cell.i === 0 && cell.j === 2) ||
                    (cell.i === 4 && cell.j === 2) ||
                    (cell.i === 2 && cell.j === 4)) {
                    return cell;
                }
            }
        }

        var index = getRandomInt(0, objectCells.length - 1);
        return objectCells[index];
    }

    //todo unit tests
    function updateObjectCompletion() {
        //road and town
        var invocationList = processCompletionForRoadAndTown();
        //church
        invocationList = invocationList.concat(processCompletionForChurch());

        var promise = runInvocatonList(invocationList);
        return promise;
    }

    function runInvocatonList(invocationList) {
        var deferred = $.Deferred();
        if (invocationList.length > 0) {
            var flagCount = 0;
            for (var funcIndex = 0, funcMax = invocationList.length; funcIndex < funcMax; funcIndex++) {
                var currentFunction = invocationList[funcIndex];
                var delay = flagCount * 850;

                setTimeout(invocationList[funcIndex], delay);
                if (funcIndex === funcMax - 1) {
                    setTimeout(function () { deferred.resolve(); }, delay + 50);
                }
                if (currentFunction.flagDestroyer) {
                    flagCount++;
                }
            }
        } else {
            deferred.resolve();
        }
        return deferred.promise();
    }

    function processCompletionForRoadAndTown() {
        var invocationList = [];

        for (var i = 0, imax = currentTile.metadata.content.length; i < imax; i++) {
            for (var j = 0, jmax = currentTile.metadata.content[i].length; j < jmax; j++) {
                if (!currentTile.metadata.content[i][j]) {
                    continue;
                }

                var obj = tileObjects.getObject(currentTile.metadata.content[i][j], currentTile);

                if (obj.type !== ObjectTypes.ROAD && obj.type !== ObjectTypes.TOWN) {
                    continue;
                }

                if (!obj ||
                    obj.slots > 0 ||
                    Object.keys(obj.owners).length === 0 ||
                    obj.processed) {
                    continue;
                }

                var scores = calculateScores(obj);
                invocationList = invocationList.concat(createFlagDeletionFunction(obj, scores));
                invocationList.push(createScoreSetFunction(obj, scores));

                obj.processed = true;
            }
        }

        return invocationList;
    }

    //todo unit tests
    function processCompletionForChurch() {

        var processChurch = function(churchTile) {
            var invocationListIternal = [];

            if (!churchTile.metadata.hasChurch) {
                return [];
            }

            var object = tileObjects.getObject(CHURCH_KEY, churchTile);

            if (!object || object.slots > 0 || Object.keys(object.owners).length === 0 || object.processed) {
                return [];
            }

            object.processed = true;

            var scores = calculateScores(object);
            invocationListIternal = invocationListIternal.concat(createFlagDeletionFunction(object, scores));
            invocationListIternal.push(createScoreSetFunction(object, scores));

            return invocationListIternal;
        };

        var invocationList = processChurch(currentTile);
        if (currentTile.neighbours.top) {
            if (currentTile.neighbours.top.metadata.hasChurch) {
                invocationList = invocationList.concat(processChurch(currentTile.neighbours.top));
            }
            if (currentTile.neighbours.top.neighbours.left &&
                currentTile.neighbours.top.neighbours.left.metadata.hasChurch) {
                invocationList = invocationList.concat(processChurch(currentTile.neighbours.top.neighbours.left));
            }
            if (currentTile.neighbours.top.neighbours.right &&
                currentTile.neighbours.top.neighbours.right.metadata.hasChurch) {
                invocationList = invocationList.concat(processChurch(currentTile.neighbours.top.neighbours.right));
            }
        }
        if (currentTile.neighbours.bottom) {
            if (currentTile.neighbours.bottom.metadata.hasChurch) {
                invocationList = invocationList.concat(processChurch(currentTile.neighbours.bottom));
            }
            if (currentTile.neighbours.bottom.neighbours.left &&
                currentTile.neighbours.bottom.neighbours.left.metadata.hasChurch) {
                invocationList = invocationList.concat(processChurch(currentTile.neighbours.bottom.neighbours.left));
            }
            if (currentTile.neighbours.bottom.neighbours.right &&
                currentTile.neighbours.bottom.neighbours.right.metadata.hasChurch) {
                invocationList = invocationList.concat(processChurch(currentTile.neighbours.bottom.neighbours.right));
            }
        }
        if (currentTile.neighbours.right && currentTile.neighbours.right.metadata.hasChurch) {
            invocationList = invocationList.concat(processChurch(currentTile.neighbours.right));
        }
        if (currentTile.neighbours.left && currentTile.neighbours.left.metadata.hasChurch) {
            invocationList = invocationList.concat(processChurch(currentTile.neighbours.left));
        }

        return invocationList;
    }

    function createFlagDeletionFunction(obj, scores) {
        var invocationList = [],
            processedOwners = {};

        var createFlagDestroyer = function(flag, score) {
            return function(){ dropFlag(flag, score);}
        }

        for (var objectItemId in obj.objectItems) {
            if (!obj.objectItems.hasOwnProperty(objectItemId)) {
                continue;
            }

            var ownerFlag = obj.objectItems[objectItemId].ownerFlag;
            if (!ownerFlag) {
                continue;
            }

            if (ownerFlag.objectItemId === objectItemId) {
                var flagDestroyer = createFlagDestroyer(ownerFlag, processedOwners[ownerFlag.ownerName] ? 0 : scores[ownerFlag.ownerName]);
                flagDestroyer.flagDestroyer = true;
                invocationList.push(flagDestroyer);

                processedOwners[ownerFlag.ownerName] = 1;
            }
        }

        return invocationList;
    }

    //todo unit tests
    function calculateScores(obj) {
        var score = 0,
            ownerFlagsThreshold = 1,
            flagsCount,
            owner,
            scores = {};

        if (obj.type === ObjectTypes.TOWN || obj.type === ObjectTypes.ROAD) {
            score = Object.keys(obj.objectItems).length * (obj.type === ObjectTypes.TOWN ? (obj.slots === 0 ? 2 : 1) : 1);

        } else if (obj.type === ObjectTypes.CHURCH) {
            score = CHURCH_FULL_SCORE - obj.slots;
        } else if (obj.type === ObjectTypes.FIELD) {
            var processedTowns = {};

            for (var tileObjectKey in obj.objectItems) {
                if (!obj.objectItems.hasOwnProperty(tileObjectKey)) {
                    continue;
                }

                var fieldToTown = obj.objectItems[tileObjectKey].metadata.fieldToTown;

                if (!fieldToTown) {
                    continue;
                }

                var parts = tileObjectKey.split("_");
                var fieldKey = parts[2];

                var towns = fieldToTown[fieldKey];
                for (var townKey in towns) {
                    if (!towns.hasOwnProperty(townKey)) {
                        continue;
                    }

                    var townObjectKey = parts[0] + "_" + parts[1] + "_" + townKey;

                    var townObject = tileObjects.objects[townObjectKey];
                    if (townObject && townObject.slots === 0 && !processedTowns[townObject.uid]) {
                        score += 3;
                        processedTowns[townObject.uid] = 1;
                    }
                }
            }
        }

        for (owner in obj.owners) {
            if (!obj.owners.hasOwnProperty(owner)) {
                continue;
            }

            flagsCount = obj.owners[owner];
            if (flagsCount > ownerFlagsThreshold) {
                ownerFlagsThreshold = flagsCount;
            }
        }


        for (owner in obj.owners) {
            if (obj.owners.hasOwnProperty(owner)) {
                flagsCount = obj.owners[owner];
                scores[owner] = flagsCount === ownerFlagsThreshold ? score : 0;
            }
        }

        return scores;
    }

    function createScoreSetFunction(obj, scores) {
        return function() {
            for (var owner in scores) {
                if (scores.hasOwnProperty(owner)) {
                    playersInst.update(owner, obj.owners[owner], scores[owner]);
                }
            }
        };
    }

    //todo unit tests
    function findSuitableCells(contentArr, cells) {
        var i,
            imax,
            j,
            jmax,
            cellsToPut = [];

        for (var cellKey in cells) {
            if (!cells.hasOwnProperty(cellKey)) continue;

            var cell = cells[cellKey],
                cellEdges = {},
                edgeCount = 0;

            for (i = 0, imax = EDGE_ARR.length; i < imax; i++) {
                var currentEdge = EDGE_ARR[i];

                cellEdges[currentEdge] = null;
                if (cell[currentEdge]) {
                    cellEdges[currentEdge] = cell[currentEdge].getEdgeStr(getOpposite(currentEdge));
                    edgeCount++;
                }
            }

            var isOk = false,
                requiredEdgeChecksCount = 0,
                currentEdgeCount = 0;

            if (edgeCount === 1) {
                requiredEdgeChecksCount = 4;
            } else if (edgeCount === 2) {
                requiredEdgeChecksCount = 3;
            } else if (edgeCount === 3) {
                requiredEdgeChecksCount = 2;
            } else if (edgeCount === 4) {
                requiredEdgeChecksCount = 1;
            }

            for (i = 0, imax = EDGE_ARR.length; i < imax; i++) {
                var edgeContent = metadataCalculator.getEdgeStr(contentArr, EDGE_ARR[i], 0);

                for (j = 0, jmax = EDGE_ARR.length; j < jmax; j++) {
                    var currentCellEdge = cellEdges[EDGE_ARR[j]];

                    if (edgeContent === currentCellEdge) {
                        isOk = tileCellSequenceEqual(contentArr, cellEdges, i, j);

                        if (isOk) {
                            cellsToPut.push(cellKey);

                            break;
                        }
                    }
                }

                currentEdgeCount++;
                if (isOk || currentEdgeCount === requiredEdgeChecksCount) {
                    break;
                }
            }
        }

        return cellsToPut;
    }

    function dropFlag(ownerFlag, score) {
        var shape = ownerFlag.graphicsData[0].shape;

        var g = game.add.graphics(0, 0);
        g.beginFill(ownerFlag.hexColor, 0.7);
        g.drawCircle(shape.x, shape.y, MAN_SIZE + 4);
        g.endFill();
        flagsLayer.add(g);

        var emitter = emitters[ownerFlag.flagColor];
        emitter.x = shape.x;
        emitter.y = shape.y;
        emitter.start(true, 800, null, 15);

        ownerFlag.destroy();

        if (score) {
            var text = game.add.text(shape.x,
                shape.y + 3,
                score,
                { font: "18px Arial", fill: "#fff", align: "center" });
            text.anchor.setTo(0.5, 0.5);
        }
    }

    //todo unit tests
    function tileCellSequenceEqual(contentArr, cellEdges, tileEdgeIndex, cellEdgeIndex) {
        var i = 0;

        do {
            tileEdgeIndex = (tileEdgeIndex + 1) % TILE_INDEX_MAX;
            cellEdgeIndex = (cellEdgeIndex + 1) % TILE_INDEX_MAX;

            if (cellEdges[EDGE_ARR[cellEdgeIndex]] !== null &&
                metadataCalculator.getEdgeStr(contentArr, EDGE_ARR[tileEdgeIndex], 0) !==
                cellEdges[EDGE_ARR[cellEdgeIndex]]) {
                break;
            }

            i++;
        } while (i < TILE_INDEX_MAX);


        return i === TILE_INDEX_MAX;
    }

    //todo unit tests
    function finishScoreCalculation() {
        var invocationList = [];

        for (var tileObjectKey in tileObjects.objects) {
            if (!tileObjects.objects.hasOwnProperty(tileObjectKey)) {
                continue;
            }

            var currentObject = tileObjects.objects[tileObjectKey];

            if (currentObject.processed) {
                continue;
            }

            if (!Object.keys(currentObject.owners).length) {
                currentObject.processed = true;
                continue;
            }

            var scores = calculateScores(currentObject);
            invocationList = invocationList.concat(createFlagDeletionFunction(currentObject, scores));
            invocationList.push(createScoreSetFunction(currentObject, scores));

            currentObject.processed = true;
        }

        var promise = runInvocatonList(invocationList);
        return promise;
    }

    function getCellKey(x, y) {
        return Math.trunc(x) + "_" + Math.trunc(y);
    }
}


function GameDragger() {
    "use strict";

    var prevx = -1;
    var prevy = -1;

    this.update = function (game, tile) {
        if (!game.input.activePointer.leftButton.isDown) {
            prevx = -1;
            prevy = -1;
            return;
        }

        if (prevx < 0 || prevy < 0) {
            prevx = game.input.x;
            prevy = game.input.y;
        } else {
            var newx = game.input.x;
            var newy = game.input.y;

            var deltax = newx - prevx;
            var deltay = newy - prevy;

            game.camera.x -= deltax;
            if (tile && tile.active) {
                tile.x -= deltax;
            }
            game.camera.y -= deltay;
            if (tile && tile.active) {
                tile.y -= deltay;
            }

            prevx = newx;
            prevy = newy;
        }
    }
};
