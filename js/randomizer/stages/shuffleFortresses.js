function shuffleFortresses(ROM) {
	var levelList = rom.getLevelsWithProperty(
		function(level) {
			if (((level.type & LevelType.Fortress) !== 0) && ((level.type & LevelType.Entrance) !== 0)) {
				return true;
			}

			return false;
		},
	);

	var levelPool = [];
	var worldData = [];
	for (var i = 0; i < 8; i++) {
		// initialize world data
		worldData.push(new WorldData(ROM, i));

		// copy level list
		var worldLevels = [];
		for (var j = 0; j < levelList[i].length; j++) {
			worldLevels.push(levelList[i][j]);
		}
		levelPool.push(worldLevels);
	}

	ui.addSpoiler("Shuffled Fortresses");

	for (var i = 0; i < 8; i++) {
		ui.addSpoiler("&#9;World " + (i+1));

		for (var j = 0; j < levelList[i].length; j++) {
			var level = levelList[i][j];

			var randomWorld = getRandomInt(8);
			while (levelPool[randomWorld].length === 0) {
				randomWorld = getRandomInt(8);
			}

			var randomLevelIndex = getRandomInt(levelPool[randomWorld].length)
			var randomLevel = levelPool[randomWorld][randomLevelIndex];

			writeMapLevelPointers(ROM, worldData[i], level, worldData[randomWorld], randomLevel);

			ui.addSpoiler("&#9;&#9;" + level.name + " > World " + worldData[randomWorld].name + " " + randomLevel.name);

			levelPool[randomWorld].splice(randomLevelIndex, 1);
		}

		ui.addSpoiler(); // add blank line to spoiler log
	}
}