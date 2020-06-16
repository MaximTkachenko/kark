import obj from '../services/tileObjectsService';

describe("tileObjectsService", () => {

    describe("getObjectItemId", () => {
        test("should produce correct tile object id", () => {
            //var obj = tileObjectsService();
            var fakeTile = {uid: "tile_8"};

            expect(obj.getObjectItemId("t1", fakeTile)).toEqual("tile_8_t1");
        });
    });

    describe("applyChanges", () => {
        test("should create tile objects for each unique object on tile [ROAD, TOWN, FIELD]", () => {
            //var obj = tileObjectsService();
            var fakeTile = {
                uid: "tile_8",
                metadata: {
                    content: [
                        ["", "f1", "r1", "f2", ""],
                        ["t1", "f1", "f1", "r1", "f2"],
                        ["t1", "t1", "f1", "f1", "r1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {}
            };
            obj.applyChanges(fakeTile);

            expect(Object.keys(obj.objects).length).toEqual(4);

            expect(obj.objects["tile_8_f1"].type).toEqual("FIELD");
            expect(obj.objects["tile_8_f1"].slots).toEqual(2);
            expect(obj.objects["tile_8_f1"].owners).toEqual({});
            expect(obj.objects["tile_8_f1"].objectItems["tile_8_f1"].uid).toEqual("tile_8");

            expect(obj.objects["tile_8_f2"].type).toEqual("FIELD");
            expect(obj.objects["tile_8_f2"].slots).toEqual(2);
            expect(obj.objects["tile_8_f2"].owners).toEqual({});
            expect(obj.objects["tile_8_f2"].objectItems["tile_8_f2"].uid).toEqual("tile_8");

            expect(obj.objects["tile_8_r1"].type).toEqual("ROAD");
            expect(obj.objects["tile_8_r1"].slots).toEqual(2);
            expect(obj.objects["tile_8_r1"].owners).toEqual({});
            expect(obj.objects["tile_8_r1"].objectItems["tile_8_r1"].uid).toEqual("tile_8");

            expect(obj.objects["tile_8_t1"].type).toEqual("TOWN");
            expect(obj.objects["tile_8_t1"].slots).toEqual(6);
            expect(obj.objects["tile_8_t1"].owners).toEqual({});
            expect(obj.objects["tile_8_t1"].objectItems["tile_8_t1"].uid).toEqual("tile_8");
        });

        test("should create tile objects for each unique object on tile [CHURCH, FIELD, ROAD]", () => {
            //var obj = tileObjectsService();
            var fakeTile = {
                uid: "tile_8",
                metadata: {
                    content: [
                        ["", "f1", "f1", "f1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["f1", "f1", "c1", "r1", "r1"],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["", "f1", "f1", "f1", ""]
                    ]
                },
                neighbours: {},
                cells: {}
            };
            obj.applyChanges(fakeTile);

            expect(Object.keys(obj.objects).length).toEqual(3);

            expect(obj.objects["tile_8_f1"].type).toEqual("FIELD");
            expect(obj.objects["tile_8_f1"].slots).toEqual(11);
            expect(obj.objects["tile_8_f1"].owners).toEqual({});
            expect(obj.objects["tile_8_f1"].objectItems["tile_8_f1"].uid).toEqual("tile_8");

            expect(obj.objects["tile_8_r1"].type).toEqual("ROAD");
            expect(obj.objects["tile_8_r1"].slots).toEqual(1);
            expect(obj.objects["tile_8_r1"].owners).toEqual({});
            expect(obj.objects["tile_8_r1"].objectItems["tile_8_r1"].uid).toEqual("tile_8");

            expect(obj.objects["tile_8_c1"].type).toEqual("CHURCH");
            expect(obj.objects["tile_8_c1"].slots).toEqual(0);
            expect(obj.objects["tile_8_c1"].owners).toEqual({});
            expect(obj.objects["tile_8_c1"].objectItems["tile_8_c1"].uid).toEqual("tile_8");
        });

        test("throws error in case of call the method for the same tile twice", () => {
            //var obj = tileObjectsService();
            var fakeTile = {
                uid: "tile_8",
                metadata: {
                    content: [
                        ["", "f1", "f1", "f1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["f1", "f1", "c1", "r1", "r1"],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["", "f1", "f1", "f1", ""]
                    ]
                },
                neighbours: {},
                cells: {}
            };
            obj.applyChanges(fakeTile);

            expect(function () { obj.applyChanges(fakeTile); }).toThrowError("this tile is already processed.");
        });

        test("should set proper slot count for church object", () => {
            //var obj = tileObjectsService();
            var fakeTile = {
                uid: "tile_3",
                metadata: {
                    content: [
                        ["", "f1", "f1", "f1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["f1", "f1", "c1", "r1", "r1"],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["", "f1", "f1", "f1", ""]
                    ],
                    hasChurch: true
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            obj.applyChanges(fakeTile);

            expect(obj.objects["tile_3_c1"].slots).toEqual(8);
        });

        test("should update slot count for church when new tile has beed connected", () => {
            //var obj = tileObjectsService();
            var fakeTile1 = {
                uid: "tile_3",
                metadata: {
                    content: [
                        ["", "f1", "f1", "f1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["f1", "f1", "c1", "r1", "r1"],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["", "f1", "f1", "f1", ""]
                    ],
                    hasChurch: true
                },
                angle: -180,
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };

            var fakeTile2 = {
                uid: "tile_16",
                metadata: {
                    content: [
                        ["", "f1", "f1", "f1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["f1", "f1", "r1", "r1", "r1"],
                        ["f1", "f1", "r1", "f2", "f2"],
                        ["", "f1", "r1", "f2", ""]
                    ]
                },
                angle: 0,
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            obj.applyChanges(fakeTile1);
            fakeTile1.neighbours.right = fakeTile2;
            fakeTile2.neighbours.left = fakeTile1;
            obj.applyChanges(fakeTile2);

            expect(obj.objects["tile_3_c1"].slots).toEqual(7);
        });

        test("should connect tile objects for connected tiles properly", () => {
            //var obj = tileObjectsService();
            var fakeTile1 = {
                uid: "tile_10",
                angle: 0,
                metadata: {
                    content: [
                        ["", "f1", "r1", "f2", ""],
                        ["t1", "f1", "f1", "r1", "f2"],
                        ["t1", "t1", "f1", "f1", "r1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            var fakeTile2 = {
                uid: "tile_8",
                angle: 0,
                metadata: {
                    content: [
                        ["", "t1", "t1", "t1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["r1", "r1", "r1", "r1", "r1"],
                        ["f2", "f2", "f2", "f2", "f2"],
                        ["", "f2", "f2", "f2", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            obj.applyChanges(fakeTile1);
            fakeTile1.neighbours = { right: fakeTile2 };
            fakeTile2.neighbours = { left: fakeTile1 };
            obj.applyChanges(fakeTile2);

            expect(Object.keys(obj.objects).length).toEqual(8);
            expect(obj.objects["tile_10_r1"]).toEqual(obj.objects["tile_8_r1"]);
            expect(Object.keys(obj.objects["tile_10_r1"].objectItems).length).toEqual(2);
            expect(obj.objects["tile_10_r1"].slots).toEqual(2);
            expect(obj.objects["tile_10_f1"]).toEqual(obj.objects["tile_8_f2"]);
            expect(Object.keys(obj.objects["tile_10_f1"].objectItems).length).toEqual(2);
            expect(obj.objects["tile_10_f1"].slots).toEqual(5);
            expect(obj.objects["tile_10_f2"]).toEqual(obj.objects["tile_8_f1"]);
            expect(Object.keys(obj.objects["tile_10_f2"].objectItems).length).toEqual(2);
            expect(obj.objects["tile_10_f2"].slots).toEqual(2);
        });

        test("should connect tile objects for connected tiles properly if current tile has angle 180", () => {
            //var obj = tileObjectsService();
            var fakeTile1 = {
                uid: "tile_10",
                angle: 0,
                metadata: {
                    content: [
                        ["", "f1", "r1", "f2", ""],
                        ["t1", "f1", "f1", "r1", "f2"],
                        ["t1", "t1", "f1", "f1", "r1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            var fakeTile2 = {
                uid: "tile_8",
                angle: -180,
                metadata: {
                    content: [
                        ["", "t1", "t1", "t1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["r1", "r1", "r1", "r1", "r1"],
                        ["f2", "f2", "f2", "f2", "f2"],
                        ["", "f2", "f2", "f2", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            obj.applyChanges(fakeTile1);
            fakeTile1.neighbours = { right: fakeTile2 };
            fakeTile2.neighbours = { left: fakeTile1 };
            obj.applyChanges(fakeTile2);

            expect(Object.keys(obj.objects).length).toEqual(8);
            expect(obj.objects["tile_10_r1"]).toEqual(obj.objects["tile_8_r1"]);
            expect(Object.keys(obj.objects["tile_10_r1"].objectItems).length).toEqual(2);
            expect(obj.objects["tile_10_r1"].slots).toEqual(2);
            expect(obj.objects["tile_10_f1"]).toEqual(obj.objects["tile_8_f1"]);
            expect(Object.keys(obj.objects["tile_10_f1"].objectItems).length).toEqual(2);
            expect(obj.objects["tile_10_f1"].slots).toEqual(2);
            expect(obj.objects["tile_10_f2"]).toEqual(obj.objects["tile_8_f2"]);
            expect(Object.keys(obj.objects["tile_10_f2"].objectItems).length).toEqual(2);
            expect(obj.objects["tile_10_f2"].slots).toEqual(5);
        });

        test("should connect tile objects for connected tiles properly [COMPLEX CASE]", () => {
            //var obj = tileObjectsService();
            var fakeTile1 = {
                uid: "tile_10",
                angle: 0,
                metadata: {
                    content: [
                        ["", "f1", "r1", "f2", ""],
                        ["t1", "f1", "f1", "r1", "f2"],
                        ["t1", "t1", "f1", "f1", "r1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            var fakeTile2 = {
                uid: "tile_8",
                angle: -180,
                metadata: {
                    content: [
                        ["", "t1", "t1", "t1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["r1", "r1", "r1", "r1", "r1"],
                        ["f2", "f2", "f2", "f2", "f2"],
                        ["", "f2", "f2", "f2", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            var fakeTile3 = {
                uid: "tile_17",
                angle: -180,
                metadata: {
                    content: [
                        ["", "t1", "t1", "t1", ""],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            var fakeTile4 = {
                uid: "tile_13",
                angle: 90,
                metadata: {
                    content: [
                        ["", "f1", "f1", "f1", ""],
                        ["t1", "f1", "f1", "f1", "f1"],
                        ["t1", "t1", "f1", "f1", "f1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {},
                getContent: function (edge) {
                    return metadataCalculator.getContent(this.metadata.content, edge, this.angle);
                }
            };
            //step 1
            obj.applyChanges(fakeTile1);
            //step 2
            fakeTile1.neighbours = { right: fakeTile2 };
            fakeTile2.neighbours = { left: fakeTile1 };
            obj.applyChanges(fakeTile2);
            obj.setOwnerForObject("tile_8_t1", "spider-man");
            //step 3
            fakeTile1.neighbours.bottom = fakeTile3;
            fakeTile3.neighbours = { top: fakeTile1 };
            obj.applyChanges(fakeTile3);
            obj.setOwnerForObject("tile_17_t1", "dr. octopus");
            //step 4
            fakeTile2.neighbours.bottom = fakeTile4;
            fakeTile3.neighbours.right = fakeTile4;
            fakeTile4.neighbours = { top: fakeTile2, left: fakeTile3 };
            obj.applyChanges(fakeTile4);

            expect(Object.keys(obj.objects).length).toEqual(12);
            expect(obj.objects["tile_10_t1"]).toEqual(obj.objects["tile_8_t1"]);
            expect(obj.objects["tile_8_t1"]).toEqual(obj.objects["tile_17_t1"]);
            expect(obj.objects["tile_17_t1"]).toEqual(obj.objects["tile_13_t1"]);
            expect(Object.keys(obj.objects["tile_13_t1"].objectItems).length).toEqual(4);
            expect(obj.objects["tile_13_t1"].owners).toEqual({ "spider-man": 1, "dr. octopus": 1 });
            expect(obj.objects["tile_13_t1"].slots).toEqual(6);
        });
    });

    describe("setOwnerForObject", () => {

        test("should set owner for object", () => {
            //var obj = tileObjectsService();
            var fakeTile = {
                uid: "tile_8",
                metadata: {
                    content: [
                        ["", "f1", "r1", "f2", ""],
                        ["t1", "f1", "f1", "r1", "f2"],
                        ["t1", "t1", "f1", "f1", "r1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {}
            };
            obj.applyChanges(fakeTile);
            obj.setOwnerForObject("tile_8_f1", "spider-man");

            expect(Object.keys(obj.objects["tile_8_f1"].owners).length).toEqual(1);
            expect(obj.objects["tile_8_f1"].owners["spider-man"]).toEqual(1);
        });

        test("should throw error in case of call the method twice for the same object", () => {
            //var obj = tileObjectsService();
            var fakeTile = {
                uid: "tile_8",
                metadata: {
                    content: [
                        ["", "f1", "r1", "f2", ""],
                        ["t1", "f1", "f1", "r1", "f2"],
                        ["t1", "t1", "f1", "f1", "r1"],
                        ["t1", "t1", "t1", "f1", "f1"],
                        ["", "t1", "t1", "t1", ""]
                    ]
                },
                neighbours: {},
                cells: {}
            };
            obj.applyChanges(fakeTile);
            obj.setOwnerForObject("tile_8_f1", "spider-man");

            expect(function () { obj.setOwnerForObject("tile_8_f1", "spider-man"); }).toThrowError("this object already has owner.");
        });
    });
});
