function getWorldNameFromIndex(world) {
	return (((world+1) === 9) ? "Warp Zone" : ("World " + (world+1)));
}

function shuffleWorldPalettes(ROM) {
	var paletteIndexPool = [];

	ui.addSpoiler("Shuffled World Palettes");

	for (var i = 0; i < 9; i++) {
		paletteIndexPool.push({ value: ROM[rom.mapPaletteIndexPointer+i], name: getWorldNameFromIndex(i) });	
	}

	for (var i = 0; i < 9; i++) {
		var randomPaletteIndexIndex = getRandomInt(paletteIndexPool.length);
		ROM[rom.mapPaletteIndexPointer+i] = paletteIndexPool[randomPaletteIndexIndex].value;

		ui.addSpoiler("&#9;" + getWorldNameFromIndex(i) + " > " + paletteIndexPool[randomPaletteIndexIndex].name);

		paletteIndexPool.splice(randomPaletteIndexIndex, 1);
	}

	ui.addSpoiler();
}