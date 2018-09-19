function writeMapLevelPointers(ROM, oldWorldData, oldLevel, newWorldData, newLevel) {
	//console.log(newLevel);

	var vanillaV1 = oldWorldData.data[0][oldLevel.mapOffset];
	var randomV1 = newWorldData.data[0][newLevel.mapOffset];
	ROM[oldWorldData.dataPointer[0][oldLevel.mapOffset]] = (vanillaV1 & 0xF0) | (randomV1 & 0x0F);

	// not sure what this does but appears to have something 
	// to do with the location of the level on the world map
	// shuffling this value will make some levels appear as
	// hammer bro stages without enemies (i.e. empty tiles
	// where hammer bros can march to but there is no hammer bro)
	//var vanillaV2 = oldWorldData.data[1][oldLevel.mapOffset];
	//var randomV2 = newWorldData.data[1][newLevel.mapOffset];
	//ROM[oldWorldData.dataPointer[1][oldLevel.mapOffset]] = vanillaV2;

	var randomB1V3 = newWorldData.data[2][newLevel.mapOffset][0];
	var randomB2V3 = newWorldData.data[2][newLevel.mapOffset][1];
	ROM[oldWorldData.dataPointer[2][oldLevel.mapOffset]] = randomB1V3;
	ROM[oldWorldData.dataPointer[2][oldLevel.mapOffset]+1] = randomB2V3;

	var randomB1V4 = newWorldData.data[3][newLevel.mapOffset][0];
	var randomB2V4 = newWorldData.data[3][newLevel.mapOffset][1];
	ROM[oldWorldData.dataPointer[3][oldLevel.mapOffset]] = randomB1V4;
	ROM[oldWorldData.dataPointer[3][oldLevel.mapOffset]+1] = randomB2V4;
}

function shuffleRegularStages(ROM) {
	var levelList = rom.getLevelsWithProperty(
		function(level) {
			if (((level.type & LevelType.Regular) !== 0) && ((level.type & LevelType.Entrance) !== 0)) {
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

	ui.addSpoiler("Shuffled Regular Stages");
	
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

			ui.addSpoiler("&#9;&#9;" + level.name + " > " + worldData[randomWorld].name + "-" + randomLevel.name);

			levelPool[randomWorld].splice(randomLevelIndex, 1);
		}

		ui.addSpoiler(); // add blank line to spoiler log
	}
}
