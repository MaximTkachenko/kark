import metadataCalculator from "./metadataCalculator";

describe("metadataCalculator", () => {
    var content = [
            ["", "f1", "r1", "f2", ""], 
            ["f1", "f1", "r1", "f2", "f2"], 
            ["f1", "f1", "xx", "r2", "r2"], 
            ["f5", "f1", "r3", "f3", "f3"], 
            ["", "f1", "r3", "f3", ""]
        ];

    describe("rotate for top", () => {
        test("top edge + 0 angle", () => {
            expect(metadataCalculator.getContent(content, "top", 0)).toEqual(["", "f1", "r1", "f2", ""]);
        });
        test("top edge + 90 angle", () => {
            expect(metadataCalculator.getContent(content, "top", 90)).toEqual(["", "f5", "f1", "f1", ""]);
        });
        test("top edge + -180 angle", () => {
            expect(metadataCalculator.getContent(content, "top", -180)).toEqual(["", "f3", "r3", "f1", ""]);
        });
        test("top edge + -90 angle", () => {
            expect(metadataCalculator.getContent(content, "top", -90)).toEqual(["", "f2", "r2", "f3", ""]);
        });
    });

    describe("rotate for bottom", () => {
        test("bottom edge + 0 angle", () => {
                expect(metadataCalculator.getContent(content, "bottom", 0)).toEqual(["", "f1", "r3", "f3", ""]);
            });
        test("bottom edge + 90 angle", () => {
            expect(metadataCalculator.getContent(content, "bottom", 90)).toEqual(["", "f3", "r2", "f2", ""]);
        });
        test("bottom edge + -180 angle", () => {
            expect(metadataCalculator.getContent(content, "bottom", -180)).toEqual(["", "f2", "r1", "f1", ""]);
        });
        test("bottom edge + -90 angle", () => {
            expect(metadataCalculator.getContent(content, "bottom", -90)).toEqual(["", "f1", "f1", "f5", ""]);
        });
    });

    describe("rotate for left", () => {
        test("left edge + 0 angle", () => {
            expect(metadataCalculator.getContent(content, "left", 0)).toEqual(["", "f1", "f1", "f5", ""]);
        });
        test("left edge + 90 angle", () => {
            expect(metadataCalculator.getContent(content, "left", 90)).toEqual(["", "f1", "r3", "f3", ""]);
        });
        test("left edge + -180 angle", () => {
            expect(metadataCalculator.getContent(content, "left", -180)).toEqual(["", "f3", "r2", "f2", ""]);
        });
        test("left edge + -90 angle", () => {
            expect(metadataCalculator.getContent(content, "left", -90)).toEqual(["", "f2", "r1", "f1", ""]);
        });
    });

    describe("rotate for right", () => {
        test("right edge + 0 angle", () => {
            expect(metadataCalculator.getContent(content, "right", 0)).toEqual(["", "f2", "r2", "f3", ""]);
        });
        test("right edge + 90 angle", () => {
            expect(metadataCalculator.getContent(content, "right", 90)).toEqual(["", "f1", "r1", "f2", ""]);
        });
        test("right edge + -180 angle", () => {
            expect(metadataCalculator.getContent(content, "right", -180)).toEqual(["", "f5", "f1", "f1", ""]);
        });
        test("right edge + -90 angle", () => {
            expect(metadataCalculator.getContent(content, "right", -90)).toEqual(["", "f3", "r3", "f1", ""]);
        });
    });

    describe("full content with rotation", () => {
        test("0 angle", () => {
            expect(metadataCalculator.getFullContent(content, 0)).toEqual(content);
        });
        test("90 angle", () => {
            expect(metadataCalculator.getFullContent(content, 90)).toEqual([
                ["", "f5", "f1", "f1", ""],
                ["f1", "f1", "f1", "f1", "f1"],
                ["r3", "r3", "xx", "r1", "r1"],
                ["f3", "f3", "r2", "f2", "f2"],
                ["", "f3", "r2", "f2", ""]
            ]);
        });
        test("-180 angle", () => {
            expect(metadataCalculator.getFullContent(content, -180)).toEqual([
                ["", "f3", "r3", "f1", ""],
                ["f3", "f3", "r3", "f1", "f5"],
                ["r2", "r2", "xx", "f1", "f1"],
                ["f2", "f2", "r1", "f1", "f1"],
                ["", "f2", "r1", "f1", ""]
            ]);
        });
        test("-90 angle", () => {
            expect(metadataCalculator.getFullContent(content, -90)).toEqual([
                ["", "f2", "r2", "f3", ""],
                ["f2", "f2", "r2", "f3", "f3"],
                ["r1", "r1", "xx", "r3", "r3"],
                ["f1", "f1", "f1", "f1", "f1"],
                ["", "f1", "f1", "f5", ""]
            ]);
        });
    });
});
