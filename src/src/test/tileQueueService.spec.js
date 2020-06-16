import tileQueueService from '../services/tileQueueService';

describe("tileQueueService", () => {
    var tiles = {
        "tile1": { count: 1 },
        "tile4": { count: 3 }
    };

    describe("initialization", () => {

        test("should build queue properly with tilesSetNumber = 1", () => {
            var obj = tileQueueService(tiles, 1);

            expect(obj._queue).toEqual(["tile1_1", "tile4_1", "tile4_2", "tile4_3"]);
        });

        test("should build queue properly with tilesSetNumber = 2", () => {
            var obj = tileQueueService(tiles, 2);

            expect(obj._queue).toEqual(["tile1_1", "tile1_2", "tile4_1", "tile4_2", "tile4_3", "tile4_4", "tile4_5", "tile4_6"]);
        });
    });

    describe("getNextTile", () => {

        test("if tileName is specified and exists in queue should return tile", () => {
            var obj = tileQueueService(tiles, 1);

            expect(obj.getNextTile("tile4")).toEqual({ assetName: "tile4", key: "tile4_1" });
            expect(obj._queue).toEqual(["tile1_1", "tile4_2", "tile4_3"]);
        });

        test("if tileName is specified and doesn't exist in queue should throw error", () => {
            var obj = tileQueueService(tiles, 1);

            expect(function () { obj.getNextTile("wrong_tile_name"); }).toThrow();
        });

        test("if tileName isn't specified should return tile", () => {
            var obj = tileQueueService(tiles, 2);
            var queueLengthBefore = obj.getLength();

            expect(obj.getNextTile()).toBeDefined();
            expect(obj.getLength()).toEqual(queueLengthBefore - 1);
        });

        test("should throw GameError if there is no tiles in queue", () => {
            var obj = tileQueueService(tiles, 1);

            obj.getNextTile();
            obj.getNextTile();
            obj.getNextTile();
            obj.getNextTile();

            expect(function () { obj.getNextTile(); }).toThrow(new GameOver());
        });
    });

    describe("putToQueue", () => {

        test("should add key to queue", () => {
            var obj = tileQueueService(tiles, 1);

            obj.putToQueue([{ assetName: "asset_name", key: "key" }]);

            expect(obj._queue).toEqual(["tile1_1", "tile4_1", "tile4_2", "tile4_3", "key"]);
        });
        
        test("should ignore duplicates", () => {
            var obj = tileQueueService(tiles, 1);

            obj.putToQueue([{ assetName: "tile4", key: "tile4_2" }]);

            expect(obj._queue).toEqual(["tile1_1", "tile4_1", "tile4_2", "tile4_3"]);
        });
    });
});
