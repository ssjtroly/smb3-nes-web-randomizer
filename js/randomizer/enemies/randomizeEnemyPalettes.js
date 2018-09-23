function randomizeEnemyPalettes(ROM) {
	ui.addSpoiler("Randomzed Enemy Palettes")

	var palette = getNESColorPalette();

	for (var i = 0; i < rom.levelStylePalettePointer.length; i++) {
		for (var j = 8*16; j < 12*16; j++) {
			if (ROM[rom.levelStylePalettePointer[i]+j] === 0x0F) {
				// skip black which is *probably* an outline (or a bullet bill/cannonball)
				continue;
			}

			var color = getRandomNESPaletteColor(palette);
			
			// completely random colors
			//ROM[rom.levelStylePalettePointer[i]+j] = color; 

			// keeps shading completely the same
			//ROM[rom.levelStylePalettePointer[i]+j] = (ROM[rom.levelStylePalettePointer[i]+j] & 0xF0) | (color & 0x0F);

			// keep shading similar
			let tint = (ROM[rom.levelStylePalettePointer[i]+j] & 0xF0) >> 4;
			if (tint < 2) {
				tint = getRandomInt(2);
			} else {
				tint = getRandomInt(2)+2;
			}

			ROM[rom.levelStylePalettePointer[i]+j] = (tint << 4) | (color & 0x0F)
		}
	}

	ui.addSpoiler();
}