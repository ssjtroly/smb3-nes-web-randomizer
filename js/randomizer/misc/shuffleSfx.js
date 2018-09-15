function shufflePlayerSfx(ROM) {
	var playerSfxPool = rom.playerSfx.value.slice(0);
	var playerSfxNames = rom.playerSfx.name.slice(0);

	ui.addSpoiler("&#9;Player Sound Effects");
	for (var i = 0; i < rom.playerSfx.pointer.length; i++) {
		var randomPlayerSfxIndex = getRandomInt(playerSfxPool.length);
		ui.addSpoiler("&#9;&#9;" + rom.playerSfx.name[i] + " > " + playerSfxNames[randomPlayerSfxIndex]);

		if (i === 2) {
			ROM[rom.playerSfx.not2Pointer] = ~playerSfxPool[randomPlayerSfxIndex];
		}

		for (var j = 0; j < rom.playerSfx.pointer[i].length; j++) {
			ROM[rom.playerSfx.pointer[i][j]] = playerSfxPool[randomPlayerSfxIndex];
		}

		playerSfxPool.splice(randomPlayerSfxIndex, 1);
		playerSfxNames.splice(randomPlayerSfxIndex, 1);
	}
	ui.addSpoiler();
}

function shuffleLevelSfx1(ROM) {
	var levelSfx1Pool = rom.levelSfx1.value.slice(0);
	var levelSfx1Names = rom.levelSfx1.name.slice(0);

	var or7_9_10Value = 0;

	ui.addSpoiler("&#9;Level Sound Effects (Group 1)");
	for (var i = 0; i < rom.levelSfx1.pointer.length; i++) {
		var randomLevelSfx1Index = getRandomInt(levelSfx1Pool.length);
		ui.addSpoiler("&#9;&#9;" + rom.levelSfx1.name[i] + " > " + levelSfx1Names[randomLevelSfx1Index]);

		if (i === 7 || i === 9 || i === 10) {
			or7_9_10Value |= levelSfx1Pool[randomLevelSfx1Index];
		}

		for (var j = 0; j < rom.levelSfx1.pointer[i].length; j++) {
			ROM[rom.levelSfx1.pointer[i][j]] = levelSfx1Pool[randomLevelSfx1Index];
		}

		levelSfx1Pool.splice(randomLevelSfx1Index, 1);
		levelSfx1Names.splice(randomLevelSfx1Index, 1);
	}
	
	ROM[rom.levelSfx1.not2Pointer] = or7_9_10Value;

	ui.addSpoiler();
}

function shuffleLevelSfx2(ROM) {
	var levelSfx2Pool = rom.levelSfx2.value.slice(0);
	var levelSfx2Names = rom.levelSfx2.name.slice(0);

	ui.addSpoiler("&#9;Level Sound Effects (Group 2)");
	for (var i = 0; i < rom.levelSfx2.pointer.length; i++) {
		var randomLevelSfx2Index = getRandomInt(levelSfx2Pool.length);
		ui.addSpoiler("&#9;&#9;" + rom.levelSfx2.name[i] + " > " + levelSfx2Names[randomLevelSfx2Index]);

		for (var j = 0; j < rom.levelSfx2.pointer[i].length; j++) {
			ROM[rom.levelSfx2.pointer[i][j]] = levelSfx2Pool[randomLevelSfx2Index];
		}

		levelSfx2Pool.splice(randomLevelSfx2Index, 1);
		levelSfx2Names.splice(randomLevelSfx2Index, 1);
	}
	ui.addSpoiler();
}

function shuffleMapSfx(ROM) {
	var mapSfxPool = rom.mapSfx.value.slice(0);
	var mapSfxNames = rom.mapSfx.name.slice(0);

	ui.addSpoiler("&#9;Map Sound Effects");
	for (var i = 0; i < rom.mapSfx.pointer.length; i++) {
		var randomMapSfxIndex = getRandomInt(mapSfxPool.length);
		ui.addSpoiler("&#9;&#9;" + rom.mapSfx.name[i] + " > " + mapSfxNames[randomMapSfxIndex]);

		for (var j = 0; j < rom.mapSfx.pointer[i].length; j++) {
			ROM[rom.mapSfx.pointer[i][j]] = mapSfxPool[randomMapSfxIndex];
		}

		mapSfxPool.splice(randomMapSfxIndex, 1);
		mapSfxNames.splice(randomMapSfxIndex, 1);
	}
	ui.addSpoiler();
}

function shuffleJingles(ROM) {
	var jinglePool = rom.jingle.value.slice(0);
	var jingleNames = rom.jingle.name.slice(0);

	ui.addSpoiler("&#9;Jingles");
	for (var i = 0; i < rom.jingle.pointer.length; i++) {
		var randomJingleIndex = getRandomInt(jinglePool.length);
		ui.addSpoiler("&#9;&#9;" + rom.jingle.name[i] + " > " + jingleNames[randomJingleIndex]);

		for (var j = 0; j < rom.jingle.pointer[i].length; j++) {
			ROM[rom.jingle.pointer[i][j]] = jinglePool[randomJingleIndex];
		}

		jinglePool.splice(randomJingleIndex, 1);
		jingleNames.splice(randomJingleIndex, 1);
	}
	ui.addSpoiler();
}

function shuffleSfx(ROM) {
	ui.addSpoiler("Randomized Sound Effects");

	shufflePlayerSfx(ROM);
	shuffleLevelSfx1(ROM);
	shuffleLevelSfx2(ROM);
	shuffleMapSfx(ROM);
	shuffleJingles(ROM);
}