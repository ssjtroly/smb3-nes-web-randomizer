function shuffleSfx(ROM) {
	var playerSfxPool = rom.playerSfx.value.slice(0);
	var playerSfxNames = rom.playerSfx.name.slice(0);

	ui.addSpoiler("Randomized Sound Effects");

	for (var i = 0; i < rom.playerSfx.pointer.length; i++) {
		var randomPlayerSfxIndex = getRandomInt(playerSfxPool.length);
		ui.addSpoiler("&#9;" + rom.playerSfx.name[i] + " > " + playerSfxNames[randomPlayerSfxIndex]);

		if (i === 2) {
			ROM[rom.not2Pointer] = ~playerSfxPool[randomPlayerSfxIndex];
		}

		for (var j = 0; j < rom.playerSfx.pointer[i].length; j++) {
			ROM[rom.playerSfx.pointer[i][j]] = playerSfxPool[randomPlayerSfxIndex];
		}

		playerSfxPool.splice(randomPlayerSfxIndex, 1);
		playerSfxNames.splice(randomPlayerSfxIndex, 1);
	}
	
	ui.addSpoiler();
}