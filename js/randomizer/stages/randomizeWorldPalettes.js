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

			if (orginalColor === 0x0F || (orginalColor & 0x0F) === 0x0) {
				// skip black which is *probably* an outline
				// also skip black or white/grey
				continue;
			}

			var color = getRandomNESPaletteColor(palette);
			// this is just a workaround until i fix all my palette stuff
			// allowing black and white/grey to be generated should be a parameter
			// right now i have no idea what getRandomNESPaletteColor will do MonkaS
			while ((color & 0x0F) > 0xC || (color & 0x0F) === 0x0) {
				color = getRandomNESPaletteColor(palette);
			}

			// completely random colors
			//ROM[rom.mapPalettePointer+colorOffset] = color;

			// keeps shading completely the same
			ROM[rom.mapPalettePointer+colorOffset] = (ROM[rom.mapPalettePointer+colorOffset] & 0xF0) | (color & 0x0F);

			/*
			// keep shading similar
			var tint = (ROM[rom.mapPalettePointer+colorOffset] & 0xF0) >> 4;
			if (tint < 2) {
				tint = getRandomInt(2);
			} else {
				tint = getRandomInt(2)+2;
			}

			ROM[rom.mapPalettePointer+colorOffset] = (tint << 4) | (color & 0x0F);
			*/
		}

		// im too lazy to write detailed spoilers for this, does it really matter?
	}

	ui.addSpoiler("");
}