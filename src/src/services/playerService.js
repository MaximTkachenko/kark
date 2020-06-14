var playerService = function () {
    var self = this,
        currentPlayerIndex = -1,
        changeCallback,
        players = [],
        playersHashObject = {};


    self.add = function (name, color, hexColor) {
        if (playersHashObject[name]) {
            throw new Error('Player with name "' + name + '" is already registered.');
        }

        const newPlayer = {name: name, color: color, hexColor: hexColor, availableFlags: 8, score: 0, current: false};
        playersHashObject[newPlayer.name] = newPlayer;
        players.push(newPlayer);

        if (changeCallback) {
            changeCallback();
        }
    };

    self.next = function () {
        if (currentPlayerIndex > -1) {
            players[currentPlayerIndex].current = false;
        }

        currentPlayerIndex++;
        currentPlayerIndex = currentPlayerIndex % players.length;

        players[currentPlayerIndex].current = true;

        if (changeCallback) {
            changeCallback();
        }
    };

    self.current = function () {
        if (currentPlayerIndex < 0) {
            throw new Error("there is no players");
        }
        return players[currentPlayerIndex];
    };

    self.decrementFlags = function () {
        var player = self.current();

        if (player.availableFlags === 0) {
            throw new Error('No free flags for"' + player.name + '".');
        }

        player.availableFlags--;

        if (changeCallback) {
            changeCallback();
        }
    };

    self.update = function (playerName, flags, scores) {
        var player = playersHashObject[playerName];

        if (!player) {
            throw new Error('There is no player with name "' + playerName + '".');
        }

        player.score += scores;
        player.availableFlags += flags;

        if (player.availableFlags > 8) {
            throw new Error('Too much free flags for "' + playerName + '".');
        }

        if (changeCallback) {
            changeCallback();
        }
    };

    self.getPlayers = function () {
        return players;
    };

    self.getWinners = function () {
        var maxScore = 0, i, imax;
        for (i = 0, imax = players.length; i < imax; i++) {
            if (players[i].score > maxScore) {
                maxScore = players[i].score;
            }
        }

        var winners = [];
        for (i = 0, imax = players.length; i < imax; i++) {
            if (players[i].score === maxScore) {
                winners.push(players[i]);
            }
        }

        return winners;
    };

    self.registerChangeListener = function (callback) {
        if (callback && callback instanceof Function) {
            changeCallback = callback;
        }
    };
};

var ps = new playerService();
export default ps;