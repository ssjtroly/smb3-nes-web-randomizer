function shuffleStagePalettes(ROM) {
	ui.addSpoiler("Shuffled Stage Palettes");

	// copy style palette colors and names
	var styleName = rom.levelStyleName.slice(0);
	var stylePalettes = [];
	for (var style = 0; style < rom.levelStylePalettePointer.length; style++) {
		var bgPal = []; // store colors for each of the 8 bg palettes
		for (var i = 0; i < 8; i++) {
			var iOffset = i*8;
			var colors = []; // store the colors for 1 bg palette

			for (var j = 0; j < 16; j++) {
				colors.push(ROM[rom.levelStylePalettePointer[style]+iOffset+j]);
			}

			bgPal.push(colors);
		}

		stylePalettes.push(bgPal);
	}

	for (var style = 0; style < rom.levelStylePalettePointer.length; style++) {
		var randomStylePalIndex = getRandomInt(stylePalettes.length);
		var randomBGPal = stylePalettes[randomStylePalIndex];

		for (var i = 0; i < 8; i++) {
			var iOffset = i*8;
			var colors = randomBGPal[i];

			for (var j = 0; j < 16; j++) {
				if (ROM[rom.levelStylePalettePointer[style]+iOffset+j] === 0x0F || colors[j] === 0x0F) {
					// skip destination black which is *probably* an outline
					// also skip source black because that could be weird
					continue;
				}

				ROM[rom.levelStylePalettePointer[style]+iOffset+j] = colors[j];
			}
		}

		ui.addSpoiler("&#9;" + rom.levelStyleName[style] + " > " + styleName[randomStylePalIndex]);

		stylePalettes.splice(randomStylePalIndex, 1);
		styleName.splice(randomStylePalIndex, 1);
	}

	ui.addSpoiler();
}