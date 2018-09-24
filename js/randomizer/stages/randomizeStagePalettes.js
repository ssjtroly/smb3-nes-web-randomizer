function randomizeStagePalettes(ROM) {
	ui.addSpoiler("Randomized Stage Palettes");

	var palette = getNESColorPalette();
	for (var style = 0; style < rom.levelStylePalettePointer.length; style++) {
		for (var i = 0; i < 8; i++) {
			var iOffset = i*16;

			for (var j = 0; j < 16; j++) {
				if (ROM[rom.levelStylePalettePointer[style]+iOffset+j] === 0x0F) {
					// skip black which is *probably* an outline
					continue;
				}

				var color = getRandomNESPaletteColor(palette);

				// this is just a workaround until i fix all my palette stuff
				// allowing black and white to be generated should be a parameter
				// right now i have no idea what getRandomNESPaletteColor will do MonkaS
				while ((color & 0x0F) > 0xC || (color & 0x0F) === 0x0) {
					color = getRandomNESPaletteColor(palette);
				}

				// completely random colors
				//ROM[rom.levelStylePalettePointer[style]+iOffset+j] = color; 

				// keeps shading completely the same
				ROM[rom.levelStylePalettePointer[style]+iOffset+j] = (ROM[rom.levelStylePalettePointer[style]+iOffset+j] & 0xF0) | (color & 0x0F);

				/*
				// keep shading similar
				var tint = (ROM[rom.levelStylePalettePointer[style]+iOffset+j] & 0xF0) >> 4;
				if (tint < 2) {
					tint = getRandomInt(2);
				} else {
					tint = getRandomInt(2)+2;
				}

				ROM[rom.levelStylePalettePointer[style]+iOffset+j] = (tint << 4) | (color & 0x0F);
				*/
			}
		}
	}

	ui.addSpoiler();
}