# kark [WORK IN PROGRESS]

[How to Play Carcassonne](https://www.youtube.com/watch?v=d89u-gXjIVY)

This project was created 3 years ago as an experiment with [phaserjs](https://phaser.io/) framework to create a browser game. In last update I removed all C# code used for backend and now it's js-only game. Some things should be done here to improve it:
- separate files for react components (currently they are inside `index.html`)
- install dependencies through npm
- add js modules and webpack
- update react version
- some refactorings should be done also (like splitting `main.js` into smaller and independent parts) because I wrote most of logic more than 2 years ago.

Folders:
- `src\Assets` - images
- `src\Content` - css files
- `src\Scripts\app` - application code
- `src\Scripts\app\test` - tests

Files:
- `src\index.html` - run it in browser to start a new game
- `src\jasmine-spec-runner.html` - run it in browser to run jasmine tests

Tips:
- double click: rotate a tile
- one click: place a tile
- available placements for a tile are marked with green
