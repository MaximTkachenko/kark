describe("tileQueueService", function () {
    var tiles = {
        "tile1": { count: 1 },
        "tile4": { count: 3 }
    };

    describe("initialization", function () {

        it("should build queue properly with tilesSetNumber = 1", function () {
            var obj = tileQueueService(tiles, 1);

            expect(obj._queue).toEqual(["tile1_1", "tile4_1", "tile4_2", "tile4_3"]);
        });

        it("should build queue properly with tilesSetNumber = 2", function () {
            var obj = tileQueueService(tiles, 2);

            expect(obj._queue).toEqual(["tile1_1", "tile1_2", "tile4_1", "tile4_2", "tile4_3", "tile4_4", "tile4_5", "tile4_6"]);
        });
    });

    describe("getNextTile", function () {

        it("if tileName is specified and exists in queue should return tile", function () {
            var obj = tileQueueService(tiles, 1);

            expect(obj.getNextTile("tile4")).toEqual({ assetName: "tile4", key: "tile4_1" });
            expect(obj._queue).toEqual(["tile1_1", "tile4_2", "tile4_3"]);
        });

        it("if tileName is specified and doesn't exist in queue should throw error", function () {
            var obj = tileQueueService(tiles, 1);

            expect(function () { obj.getNextTile("wrong_tile_name"); }).toThrow();
        });

        it("if tileName isn't specified should return tile", function () {
            var obj = tileQueueService(tiles, 2);
            var queueLengthBefore = obj.getLength();

            expect(obj.getNextTile()).toBeDefined();
            expect(obj.getLength()).toEqual(queueLengthBefore - 1);
        });

        it("should throw GameError if there is no tiles in queue", function () {
            var obj = tileQueueService(tiles, 1);

            obj.getNextTile();
            obj.getNextTile();
            obj.getNextTile();
            obj.getNextTile();

            expect(function () { obj.getNextTile(); }).toThrow(new GameOver());
        });
    });

    describe("putToQueue", function () {

        it("should add key to queue", function () {
            var obj = tileQueueService(tiles, 1);

            obj.putToQueue([{ assetName: "asset_name", key: "key" }]);

            expect(obj._queue).toEqual(["tile1_1", "tile4_1", "tile4_2", "tile4_3", "key"]);
        });
        
        it("should ignore duplicates", function () {
            var obj = tileQueueService(tiles, 1);

            obj.putToQueue([{ assetName: "tile4", key: "tile4_2" }]);

            expect(obj._queue).toEqual(["tile1_1", "tile4_1", "tile4_2", "tile4_3"]);
        });
    });
});
