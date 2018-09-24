function shuffleWorld8Ships(ROM) {
	var levelList = rom.getLevelsWithProperty(
		function(level) {
			if (((level.type & LevelType.Ship) !== 0) && ((level.type & LevelType.Entrance) !== 0)) {
				return true;
			}

			return false;
		},
		WorldFlag.World8
	);

	var levelPool = [];
	var worldData = new WorldData(ROM, 7);

	// copy level list
	for (var j = 0; j < levelList[7].length; j++) {
		levelPool.push(levelList[7][j]);
	}

	ui.addSpoiler("Shuffled World 8 Ships");
	for (var j = 0; j < levelList[7].length; j++) {
		var level = levelList[7][j];

		var randomLevelIndex = getRandomInt(levelPool.length)
		var randomLevel = levelPool[randomLevelIndex];

		writeMapLevelPointers(ROM, worldData, level, worldData, randomLevel);

		ui.addSpoiler("&#9;&#9;" + level.name + " > " + randomLevel.name);

		levelPool.splice(randomLevelIndex, 1);
	}

	ui.addSpoiler(); // add blank line to spoiler log
}