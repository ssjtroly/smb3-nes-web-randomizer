function shuffleCastles(ROM) {
	var levelList = rom.getLevelsWithProperty(
		function(level) {
			if (((level.type & LevelType.Castle) !== 0) && ((level.type & LevelType.Entrance) !== 0)) {
				return true;
			}

			return false;
		},
		WorldFlag.World1 | WorldFlag.World2 | WorldFlag.World3 | WorldFlag.World4 | WorldFlag.World5 | WorldFlag.World6 | WorldFlag.World7
	);

	// copy airship layout pointers
	var airshipL = [
		[ ROM[rom.worlds[0].mapAirshipLayoutPointer], ROM[rom.worlds[0].mapAirshipLayoutPointer+1] ],
		[ ROM[rom.worlds[1].mapAirshipLayoutPointer], ROM[rom.worlds[1].mapAirshipLayoutPointer+1] ],
		[ ROM[rom.worlds[2].mapAirshipLayoutPointer], ROM[rom.worlds[2].mapAirshipLayoutPointer+1] ],
		[ ROM[rom.worlds[3].mapAirshipLayoutPointer], ROM[rom.worlds[3].mapAirshipLayoutPointer+1] ],
		[ ROM[rom.worlds[4].mapAirshipLayoutPointer], ROM[rom.worlds[4].mapAirshipLayoutPointer+1] ],
		[ ROM[rom.worlds[5].mapAirshipLayoutPointer], ROM[rom.worlds[5].mapAirshipLayoutPointer+1] ],
		[ ROM[rom.worlds[6].mapAirshipLayoutPointer], ROM[rom.worlds[6].mapAirshipLayoutPointer+1] ],
	];

	var airshipO = [
		[ ROM[rom.worlds[0].mapAirshipObjectPointer], ROM[rom.worlds[0].mapAirshipObjectPointer+1] ],
		[ ROM[rom.worlds[1].mapAirshipObjectPointer], ROM[rom.worlds[1].mapAirshipObjectPointer+1] ],
		[ ROM[rom.worlds[2].mapAirshipObjectPointer], ROM[rom.worlds[2].mapAirshipObjectPointer+1] ],
		[ ROM[rom.worlds[3].mapAirshipObjectPointer], ROM[rom.worlds[3].mapAirshipObjectPointer+1] ],
		[ ROM[rom.worlds[4].mapAirshipObjectPointer], ROM[rom.worlds[4].mapAirshipObjectPointer+1] ],
		[ ROM[rom.worlds[5].mapAirshipObjectPointer], ROM[rom.worlds[5].mapAirshipObjectPointer+1] ],
		[ ROM[rom.worlds[6].mapAirshipObjectPointer], ROM[rom.worlds[6].mapAirshipObjectPointer+1] ],
	];

	var levelPool = [];
	var worldData = [];
	for (var i = 0; i < 7; i++) {
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
	
	for (var i = 0; i < 7; i++) {
		ui.addSpoiler("&#9;World " + (i+1));

		for (var j = 0; j < levelList[i].length; j++) {
			var level = levelList[i][j];

			var randomWorld = getRandomInt(7);
			while (levelPool[randomWorld].length === 0) {
				randomWorld = getRandomInt(7);
			}

			var randomLevelIndex = getRandomInt(levelPool[randomWorld].length)
			var randomLevel = levelPool[randomWorld][randomLevelIndex];

			writeMapLevelPointers(ROM, worldData[i], level, worldData[randomWorld], randomLevel);

			// swap airship pointers for when it flys off
			ROM[rom.worlds[i].mapAirshipLayoutPointer] = airshipL[randomWorld][0];
			ROM[rom.worlds[i].mapAirshipLayoutPointer+1] = airshipL[randomWorld][1];

			ROM[rom.worlds[i].mapAirshipObjectPointer] = airshipO[randomWorld][0];
			ROM[rom.worlds[i].mapAirshipObjectPointer+1] = airshipO[randomWorld][1];

			ui.addSpoiler("&#9;&#9;" + level.name + " > World " + worldData[randomWorld].name + " " + randomLevel.name);

			levelPool[randomWorld].splice(randomLevelIndex, 1);
		}

		ui.addSpoiler(); // add blank line to spoiler log
	}
}