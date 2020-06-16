/*
r - road
t - town
f - field
c - church
e - end of road
*/
var tilesMetadata = {
    tile1: {
        content: [["", "f1", "f1", "f1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["r1", "r1", "r1", "r1", "r1"], 
            ["f2", "f2", "f2", "f2", "f2"],
            ["", "f2", "f2", "f2", ""]],
        count: 4
    },    
    tile2: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "t1", "t1", "t1"], 
            ["f1", "f1", "f1", "t1", "t1"], 
            ["f1", "f1", "f1", "f1", "t1"],
            ["", "f1", "f1", "f1", ""]],
        count: 2,
        fieldToTown: { "f1": {"t1": 1} }
    },    
    tile3: {
        content: [["", "f1", "f1", "f1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "c1", "r1", "r1"], 
            ["f1", "f1", "f1", "f1", "f1"],
            ["", "f1", "f1", "f1", ""]],
        count: 2,
        hasChurch: true
    },    
    tile4: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "f1", "f1", "t2"], 
            ["f1", "f1", "f1", "f1", "t2"], 
            ["f1", "f1", "f1", "f1", "t2"],
            ["", "f1", "f1", "f1", ""]],
        count: 2,
        fieldToTown: { "f1": { "t1": 1, "t2": 1 } }
    },    
    tile5: {
        content: [["", "f1", "f1", "f1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "c1", "f1", "f1"], 
            ["f1", "f1", "f1", "f1", "f1"],
            ["", "f1", "f1", "f1", ""]],
        count: 4,
        hasChurch: true
    },    
    tile6: {
        content: [["", "f1", "r1", "f2", ""], 
            ["f1", "f1", "r1", "f2", "f2"], 
            ["f1", "f1", "", "r2", "r2"], 
            ["f1", "f1", "r3", "f3", "f3"],
            ["", "f1", "r3", "f3", ""]],
        count: 4
    },    
    tile7: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "t1", "t1", "t1"], 
            ["r1", "r1", "t1", "t1", "t1"], 
            ["f2", "f2", "t1", "t1", "t1"],
            ["", "t1", "t1", "t1", ""]],
        count: 2,
        fieldToTown: { "f1": { "t1": 1 }, "f2": { "t1": 1 } }
    },    
    tile8: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["r1", "r1", "r1", "r1", "r1"], 
            ["f2", "f2", "f2", "f2", "f2"],
            ["", "f2", "f2", "f2", ""]],
        count: 4,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile9: {
        content: [["", "f1", "f1", "f1", ""], 
            ["t1", "t1", "t1", "t1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"],
            ["", "f2", "f2", "f2", ""]],
        count: 2,
        fieldToTown: { "f1": { "t1": 1 }, "f2": { "t1": 1 } }
    },    
    tile10: {
        content: [["", "f1", "r1", "f2", ""], 
            ["t1", "f1", "f1", "r1", "f2"], 
            ["t1", "t1", "f1", "f1", "r1"], 
            ["t1", "t1", "t1", "f1", "f1"],
            ["", "t1", "t1", "t1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile11: {
        content: [["", "f1", "r1", "f2", ""], 
            ["t1", "f1", "r1", "f2", "f2"], 
            ["t1", "f1", "f1", "r1", "r1"], 
            ["t1", "f1", "f1", "f1", "f1"],
            ["", "f1", "f1", "f1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile12: {
        content: [["", "f1", "f1", "f1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["r1", "r1", "r1", "r1", "r1"], 
            ["f2", "f2", "f2", "f2", "f2"],
            ["", "f2", "f2", "f2", ""]],
        count: 4
    },    
    tile13: {
        content: [["", "t1", "t1", "t1", ""], 
            ["t1", "t1", "t1", "f1", "f1"], 
            ["t1", "t1", "t1", "f1", "f1"], 
            ["t1", "t1", "t1", "f1", "f1"],
            ["", "t1", "t1", "t1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile14: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["r1", "r1", "r1", "r1", "r1"], 
            ["f2", "f2", "r1", "f3", "f3"],
            ["", "f2", "r1", "f3", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile15: {
        content: [["", "f1", "f1", "f1", ""], 
            ["t1", "f1", "f1", "f1", "f1"], 
            ["t1", "f1", "f1", "f1", "f1"], 
            ["t1", "f1", "f1", "f1", "f1"],
            ["", "f1", "f1", "f1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile16: {
        content: [["", "f1", "f1", "f1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "r1", "r1", "r1"], 
            ["f1", "f1", "r1", "f2", "f2"],
            ["", "f1", "r1", "f2", ""]],
        count: 6
    },    
    tile17: {
        content: [["", "f1", "f1", "f1", ""], 
            ["t1", "f1", "f1", "f1", "f1"], 
            ["t1", "t1", "f1", "f1", "f1"], 
            ["t1", "t1", "t1", "f1", "f1"],
            ["", "t1", "t1", "t1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile18: {
        content: [["", "t2", "t2", "t2", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "f1", "f1", "f1"],
            ["", "t1", "t1", "t1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1, "t2": 1 } }
    },    
    tile19: {
        content: [["", "f1", "f1", "f1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "r1", "r1", "r1"], 
            ["f1", "f1", "r1", "f2", "f2"],
            ["", "f1", "r1", "f2", ""]],
        count: 3
    },    
    tile20: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["r1", "r1", "f1", "f1", "f1"], 
            ["f2", "f2", "r1", "f1", "f1"],
            ["", "f2", "r1", "f1", ""]],
        count: 3,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile21: {
        content: [["", "f2", "r1", "f1", ""], 
            ["f2", "r1", "f1", "f1", "t1"], 
            ["r1", "f1", "f1", "t1", "t1"], 
            ["f1", "f1", "t1", "t1", "t1"],
            ["", "t1", "t1", "t1", ""]],
        count: 1,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile22: {
        content: [["", "t1", "t1", "t1", ""], 
            ["t1", "t1", "t1", "t1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"],
            ["", "t1", "t1", "t1", ""]],
        count: 1
    },    
    tile23: {
        content: [["", "t1", "t1", "t1", ""], 
            ["t1", "t1", "t1", "f1", "f1"], 
            ["t1", "t1", "t1", "r1", "r1"], 
            ["t1", "t1", "t1", "f2", "f2"],
            ["", "t1", "t1", "t1", ""]],
        count: 1,
        fieldToTown: { "f1": { "t1": 1 }, "f2": { "t1": 1 } }
    },    
    tile24: {
        content: [["", "f2", "r1", "f1", ""], 
            ["f2", "r1", "f1", "f1", "t1"], 
            ["r1", "f1", "f1", "t1", "t1"], 
            ["f1", "f1", "t1", "t1", "t1"],
            ["", "t1", "t1", "t1", ""]],
        count: 1,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile25: {
        content: [["", "t1", "t1", "t1", ""], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "f1", "f1", "f1"], 
            ["f1", "f1", "f1", "f1", "f1"],
            ["", "f1", "f1", "f1", ""]],
        count: 2,
        fieldToTown: { "f1": { "t1": 1 } }
    },    
    tile26: {
        content: [["", "f1", "f1", "f1", ""], 
            ["t1", "f1", "f1", "f1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"],
            ["", "t1", "t1", "t1", ""]],
        count: 1,
        fieldToTown: { "f1": { "t1": 1 } }
    },
    tile27: {
        content: [["", "f1", "r1", "f2", ""], 
            ["f1", "f1", "r1", "f2", "f2"], 
            ["r4", "r4", "", "r2", "r2"], 
            ["f4", "f4", "r3", "f3", "f3"],
            ["", "f4", "r3", "f3", ""]],
        count: 1
    },    
    tile28: {
        content: [["", "f1", "f1", "f1", ""], 
            ["t1", "t1", "t1", "t1", "t1"], 
            ["t1", "t1", "t1", "t1", "t1"],
            ["t1", "t1", "t1", "t1", "t1"],
            ["", "f2", "f2", "f2", ""]],
        count: 1,
        fieldToTown: { "f1": { "t1": 1 }, "f2": { "t1": 1 } }
    }
};