function randomizeWorldPalettes(ROM) {
	// give world 3 and warp zone their own palettes
	ROM[rom.mapPaletteIndexPointer+2] = 0x0A; // world 1
	ROM[rom.mapPaletteIndexPointer+8] = 0x0B // world 1

	var palette = getNESColorPalette();

	ui.addSpoiler("Randomized World Palettes");

	for (var i = 0; i < 12; i++) {
		var paletteOffset = i*16;

		for (var j = 0; j < 16; j++) {
			var colorOffset = paletteOffset+j;
			var orginalColor = ROM[rom.mapPalettePointer+colorOffset];

			if (orginalColor === 0x0F || orginalColor === 0xFF) {
				// dont randomize black
				continue;
			}

			var value = palette[getRandomInt(4)][getRandomIntRange(0x1, 0xC)];
			ROM[rom.mapPalettePointer+colorOffset] = value;
		}

		// im too lazy to write detailed spoilers for this, does it really matter?
	}

	ui.addSpoiler("");
}