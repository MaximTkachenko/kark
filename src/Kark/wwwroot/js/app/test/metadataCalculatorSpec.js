describe("metadataCalculator", function () {
    var content = [
            ["", "f1", "r1", "f2", ""], 
            ["f1", "f1", "r1", "f2", "f2"], 
            ["f1", "f1", "xx", "r2", "r2"], 
            ["f5", "f1", "r3", "f3", "f3"], 
            ["", "f1", "r3", "f3", ""]
        ];

    describe("rotate for top",
        function() {
            it("top edge + 0 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "top", 0)).toEqual(["", "f1", "r1", "f2", ""]);
                });
            it("top edge + 90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "top", 90)).toEqual(["", "f5", "f1", "f1", ""]);
                });
            it("top edge + -180 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "top", -180)).toEqual(["", "f3", "r3", "f1", ""]);
                });
            it("top edge + -90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "top", -90)).toEqual(["", "f2", "r2", "f3", ""]);
                });
        });

    describe("rotate for bottom",
        function() {
            it("bottom edge + 0 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "bottom", 0)).toEqual(["", "f1", "r3", "f3", ""]);
                });
            it("bottom edge + 90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "bottom", 90)).toEqual(["", "f3", "r2", "f2", ""]);
                });
            it("bottom edge + -180 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "bottom", -180)).toEqual(["", "f2", "r1", "f1", ""]);
                });
            it("bottom edge + -90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "bottom", -90)).toEqual(["", "f1", "f1", "f5", ""]);
                });
        });

    describe("rotate for left",
        function() {
            it("left edge + 0 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "left", 0)).toEqual(["", "f1", "f1", "f5", ""]);
                });
            it("left edge + 90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "left", 90)).toEqual(["", "f1", "r3", "f3", ""]);
                });
            it("left edge + -180 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "left", -180)).toEqual(["", "f3", "r2", "f2", ""]);
                });
            it("left edge + -90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "left", -90)).toEqual(["", "f2", "r1", "f1", ""]);
                });
        });

    describe("rotate for right",
        function() {
            it("right edge + 0 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "right", 0)).toEqual(["", "f2", "r2", "f3", ""]);
                });
            it("right edge + 90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "right", 90)).toEqual(["", "f1", "r1", "f2", ""]);
                });
            it("right edge + -180 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "right", -180)).toEqual(["", "f5", "f1", "f1", ""]);
                });
            it("right edge + -90 angle",
                function() {
                    expect(metadataCalculator.getContent(content, "right", -90)).toEqual(["", "f3", "r3", "f1", ""]);
                });
        });

    describe("full content with rotation",
        function () {
            it("0 angle",
                function () {
                    expect(metadataCalculator.getFullContent(content, 0)).toEqual(content);
                });
            it("90 angle",
                function () {
                    expect(metadataCalculator.getFullContent(content, 90)).toEqual([
                        ["", "f5", "f1", "f1", ""],
                        ["f1", "f1", "f1", "f1", "f1"],
                        ["r3", "r3", "xx", "r1", "r1"],
                        ["f3", "f3", "r2", "f2", "f2"],
                        ["", "f3", "r2", "f2", ""]
                    ]);
                });
            it("-180 angle",
                function () {
                    expect(metadataCalculator.getFullContent(content, -180)).toEqual([
                        ["", "f3", "r3", "f1", ""],
                        ["f3", "f3", "r3", "f1", "f5"],
                        ["r2", "r2", "xx", "f1", "f1"],
                        ["f2", "f2", "r1", "f1", "f1"],
                        ["", "f2", "r1", "f1", ""]
                    ]);
                });
            it("-90 angle",
                function () {
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
