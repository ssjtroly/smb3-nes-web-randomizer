function rgbToName(rgb) {
	return "#" + rgb[0].toString(16).padStart(2, '0') + rgb[1].toString(16).padStart(2, '0') + rgb[2].toString(16).padStart(2, '0');
}

function getNESColorPalette() {
	var palette = [];

	for (var i = 0; i < 4; i++) {
		var row = [];

		if (i === 0 || i === 1) {
			for (var j = 0; j < 12; j++) {
				var paletteIndex = (i << 4) | (j+1);
				row.push(paletteIndex);
			}
		} else {
			for (var j = 0; j < 13; j++) {
				var paletteIndex = (i << 4) | (j+1);
				row.push(paletteIndex);
			}
		}

		palette.push(row);
	}

	return palette;
}

function getRandomNESPaletteColor(palette) {
	var row = getRandomInt(4);
	var col = -1;
	if (row === 0 || row === 1) {
		col = getRandomInt(12);
	} else {
		col = getRandomInt(13);
	}

	return palette[row][col];
}

function getRandomMarioColors(palette, overrideSkinColor = null) {
	var complexionIndex = getRandomInt(2) === 0 ? getBiasRandomIntRange(0, 4, 2, 1.0) : getBiasRandomIntRange(0, 4, 0, 1.0);

	var toneIndex = (complexionIndex === 0 || complexionIndex === 1) ? getBiasRandomIntRange(0, 0xC, 0x5, 1.0) : getBiasRandomIntRange(1, 0xD, 0x5, 1.0);
	var toneLowerBound = toneIndex-2;
	var toneUpperBound = toneIndex+2;

	if (toneLowerBound < 0) {
		toneLowerBound = 0xC+toneLowerBound;
	}

	// wrap bounds
	if (complexionIndex === 0 || complexionIndex === 1) {
		toneLowerBound = wrap(toneLowerBound, 0, 0xC);
		toneUpperBound = wrap(toneUpperBound, 0, 0xC);
	} else {
		toneLowerBound = wrap(toneLowerBound, 1, 0xD);
		toneUpperBound = wrap(toneUpperBound, 1, 0xD);
	}

	// one of the bounds had wrapped around
	var hasWrapped = false;
	if (toneUpperBound < toneLowerBound) {
		hasWrapped = true;
	}

	var skinColor = palette[complexionIndex][toneIndex];
	var clothesBrightnessIndex = getRandomInt(4);
	var clothesHueIndex = -1;
	if (hasWrapped) {
		// only get value within upper and lower
		clothesHueIndex = getRandomIntRange(toneUpperBound, toneLowerBound+1);
	} else {
		// only get value outside of upper and lower
		var useLower = getRandomInt(2);
		if (useLower === 0) {
			clothesHueIndex = getRandomIntRange(0, toneLowerBound+1);
		} else {
			if (complexionIndex === 0 || complexionIndex === 1) {
				clothesHueIndex = getRandomIntRange(toneUpperBound, 0xC);
			} else {
				clothesHueIndex = getRandomIntRange(toneUpperBound, 0xD);
			}
		}
	}

	var clothesColor = palette[clothesBrightnessIndex][clothesHueIndex];

	if (overrideSkinColor !== null) {
		return [ clothesColor, overrideSkinColor ];
	} else {
		return [ clothesColor, skinColor ];
	}
}

function setMarioColor(ROM, marioColor, marioComplexion) {
	// in small, big, & leaf
	// byte 1 = clothes color
	// byte 2 = skin color
	// byte 3 = outline/overalls color
	// byte 4 = no apparent change

	// all other powerups
	// byte 1 = no apparent change
	// byte 2 = clothes color
	// byte 3 = skin color
	// byte 4 = outline/overalls color

	var palette = getNESColorPalette();

	var normalColors;
	var fireColors;
	var frogColors;
	var tanookiColors;
	var hammerColors;

	var useDefault = false; // unimplemented option selected
	var colorOption = marioColor;
	var complexionOption = marioComplexion === -1 ? 0x36 : marioComplexion;

	switch (colorOption) {
		case -1:
			useDefault = true;
		break

		default:
			if (complexionOption === 256) {
				normalColors = [ [ colorOption, complexionOption ], getRandomMarioColors(palette) ]; // mario, luigi
				fireColors = [ colorOption, getRandomMarioColors(palette)[1] ];
				frogColors = [ colorOption, getRandomMarioColors(palette)[1] ];
				tanookiColors = [colorOption, getRandomMarioColors(palette)[1] ];
				hammerColors = [ colorOption, getRandomMarioColors(palette)[1] ];
			} else {
				normalColors = [ [ colorOption, complexionOption ], getRandomMarioColors(palette) ]; // mario, luigi
				fireColors = [ colorOption, complexionOption ];
				frogColors = [ colorOption, complexionOption ];
				tanookiColors = [colorOption, complexionOption ];
				hammerColors = [ colorOption, complexionOption ];
			}
		break;

		case 256: 
			var nColM = getRandomMarioColors(palette);
			var nColL = getRandomMarioColors(palette, nColM[1]);
			var fiCol = getRandomMarioColors(palette, nColM[1]);
			var frCol = getRandomMarioColors(palette, nColM[1]);
			var taCol = getRandomMarioColors(palette, nColM[1]);
			var haCol = getRandomMarioColors(palette, nColM[1]);

			normalColors = [ nColM, nColL ]; // mario, luigi

			fireColors = fiCol;
			frogColors = frCol;
			tanookiColors = taCol;
			hammerColors = haCol;
		break;
	}

	if (!useDefault) {
		// in level colors, powerup colors shared between mario and luigi
		ROM[rom.marioColorNormalPointer] = normalColors[0][0];
		ROM[rom.marioColorNormalPointer+1] = normalColors[0][1];
		ROM[rom.luigiColorNormalPointer] = normalColors[1][0];
		ROM[rom.luigiColorNormalPointer+1] = normalColors[1][1];
		ROM[rom.marioColorFirePointer+1] = fireColors[0];
		ROM[rom.marioColorFirePointer+2] = fireColors[1];
		ROM[rom.marioColorFrogPointer+1] = frogColors[0];
		ROM[rom.marioColorFrogPointer+2] = frogColors[1];
		ROM[rom.marioColorTanookiPointer+1] = tanookiColors[0];
		ROM[rom.marioColorTanookiPointer+2] = tanookiColors[1];
		ROM[rom.marioColorHammerPointer+1] = hammerColors[0];
		ROM[rom.marioColorHammerPointer+2] = hammerColors[1];

		// in bonus game
		ROM[rom.marioColorBonusGamePointer+1] = normalColors[0][0];
		ROM[rom.marioColorBonusGamePointer+3] = normalColors[0][1];
		ROM[rom.marioColorBonusGamePointer+5] = normalColors[0][0];
		// use black for overalls because thats how it is in gameplay, not blue like vanilla
		ROM[rom.marioColorBonusGamePointer+7] = 0x0F; 

		ROM[rom.luigiColorBonusGamePointer+1] = normalColors[1][0];
		ROM[rom.luigiColorBonusGamePointer+3] = normalColors[1][1];
		ROM[rom.luigiColorBonusGamePointer+5] = normalColors[1][0];
		// use black for overalls because thats how it is in gameplay, not blue like vanilla
		ROM[rom.luigiColorBonusGamePointer+7] = 0x0F;

		// have no idea what "judgems" means, but apparently its the cloud that skips levels
		ROM[rom.marioColorMapJudgemsPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapJudgemsPointer+2] = normalColors[0][1];

		// in map colors, all shared between mario and luigi 
		// but will use PaletteFix to change primary color
		ROM[rom.marioMapPaletteFix] = normalColors[0][0];
		ROM[rom.luigiMapPaletteFix] = normalColors[1][0];
		ROM[rom.marioMapPalettePostFix] = normalColors[0][0];
		ROM[rom.luigiMapPalettePostFix] = normalColors[1][0];

		ROM[rom.marioMapPaletteFixValuePointer] = normalColors[0][0];

		// this seems to overwrite mario's color to 0x16 (default) no matter the value
		// found in PRG010.asm
		// 		; Get the color we need to patch in...
		// 		LDA Map_PostJC_PUpPP1,Y
		// 		CMP #$16	; rom.marioMapPaletteFixValue2Pointer
		// 		BNE PRG010_CE54	 	; If color <> $16 (Mario's red), jump to PRG010_CE54
		//ROM[rom.marioMapPaletteFixValue2Pointer] = normalColors[0][0];

		ROM[rom.marioColorMapSmallPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapSmallPointer+2] = normalColors[0][1];

		ROM[rom.marioColorMapBigPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapBigPointer+2] = normalColors[0][1];

		ROM[rom.marioColorMapLeafPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapLeafPointer+2] = normalColors[0][1];

		// lines below are commented out because they make the player sprite turn solid grey
		//ROM[rom.marioColorMapFirePointer+1] = fireColors[0][0];
		//ROM[rom.marioColorMapFirePointer+2] = fireColors[0][1];
		//ROM[rom.marioColorMapFirePointer+3] = ROM[rom.marioColorFirePointer+3];

		//ROM[rom.marioColorMapFrogPointer+1] = frogColors[0][0];
		//ROM[rom.marioColorMapFrogPointer+2] = frogColors[0][1];

		//ROM[rom.marioColorMapTanookiPointer+1] = tanookiColors[0][0];
		//ROM[rom.marioColorMapTanookiPointer+2] = tanookiColors[0][1];

		//ROM[rom.marioColorMapHammerPointer+1] = hammerColors[0][0];
		//ROM[rom.marioColorMapHammerPointer+2] = hammerColors[0][1];

		ROM[rom.marioColorMapPWingPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapPWingPointer+2] = normalColors[0][1];

		// these are primary colors
		ROM[rom.marioColorMapPowerUpPost1Pointer] = normalColors[0][0];
		ROM[rom.marioColorMapPowerUpPost1Pointer+1] = normalColors[0][0];
		//ROM[rom.marioColorMapPowerUpPost1Pointer+2] = fireColors[0][0];
		ROM[rom.marioColorMapPowerUpPost1Pointer+3] = normalColors[0][0];
		//ROM[rom.marioColorMapPowerUpPost1Pointer+4] = frogColors[0][0];
		//ROM[rom.marioColorMapPowerUpPost1Pointer+5] = tanookiColors[0][0];
		//ROM[rom.marioColorMapPowerUpPost1Pointer+6] = hammerColors[0][0];

		// these are outline colors
		//ROM[rom.marioColorMapPowerUpPost2Pointer] = 0x0F;
		//ROM[rom.marioColorMapPowerUpPost2Pointer+1] = 0x0F;
		//ROM[rom.marioColorMapPowerUpPost2Pointer+2] = 0x16;
		//ROM[rom.marioColorMapPowerUpPost2Pointer+3] = 0x0F;
		//ROM[rom.marioColorMapPowerUpPost2Pointer+4] = 0x0F;
		//ROM[rom.marioColorMapPowerUpPost2Pointer+5] = 0x0F;
		//ROM[rom.marioColorMapPowerUpPost2Pointer+6] = 0x0F;

		ui.addSpoiler("Randomized Mario Colors");
		ui.addSpoiler("&#9;Mario Small/Big/Leaf Colors > " + rgbToName(lookupNESRGB(normalColors[0][0])) + ", " + rgbToName(lookupNESRGB(normalColors[0][1])));
		ui.addSpoiler("&#9;Luigi Small/Big/Leaf Colors > " + rgbToName(lookupNESRGB(normalColors[1][0])) + ", " + rgbToName(lookupNESRGB(normalColors[1][1])));
		ui.addSpoiler("&#9;Fire Colors > " + rgbToName(lookupNESRGB(fireColors[0])) + ", " + rgbToName(lookupNESRGB(fireColors[1])));
		ui.addSpoiler("&#9;Frog Colors > " + rgbToName(lookupNESRGB(frogColors[0])) + ", " + rgbToName(lookupNESRGB(frogColors[1])));
		ui.addSpoiler("&#9;Tanooki Colors > " + rgbToName(lookupNESRGB(tanookiColors[0])) + ", " + rgbToName(lookupNESRGB(tanookiColors[1])));
		ui.addSpoiler("&#9;Hammer Colors > " + rgbToName(lookupNESRGB(hammerColors[0])) + ", " + rgbToName(lookupNESRGB(hammerColors[1])));
		ui.addSpoiler();
	}
}

function lookupNESRGB(color) {
	switch (color) {
		case 0x00:
			return [124, 124, 124];
		break;
		case 0x01:
			return [0, 0, 252];
		break;
		case 0x02:
			return [0, 0, 188];
		break;
		case 0x03:
			return [68, 40, 188];
		break;
		case 0x04:
			return [148, 0, 132];
		break;
		case 0x05:
			return [168, 0, 32];
		break;
		case 0x06:
			return [168, 16, 0];
		break;
		case 0x07:
			return [138, 20, 0];
		break;
		case 0x08:
			return [80, 48, 0];
		break;
		case 0x09:
			return [0, 120, 0];
		break;
		case 0x0A:
			return [0, 104, 0];
		break;
		case 0x0B:
			return [0, 88, 0];
		break;
		case 0x0C:
			return [0, 64, 88];
		break;

		case 0x10:
			return [188, 188, 188];
		break;
		case 0x11:
			return [0, 120, 248];
		break;
		case 0x12:
			return [0, 88, 148];
		break;
		case 0x13:
			return [104, 68, 252];
		break;
		case 0x14:
			return [216, 0, 204];
		break;
		case 0x15:
			return [228, 0, 88];
		break;
		case 0x16:
			return [248, 56, 0];
		break;
		case 0x17:
			return [228, 92, 16];
		break;
		case 0x18:
			return [172, 124, 0];
		break;
		case 0x19:
			return [0, 184, 0];
		break;
		case 0x1A:
			return [0, 168, 0];
		break;
		case 0x1B:
			return [0, 168, 68];
		break;
		case 0x1C:
			return [0, 136, 136];
		break;

		case 0x20:
			return [248, 248, 248];
		break;
		case 0x21:
			return [60, 188, 252];
		break;
		case 0x22:
			return [104, 136, 252];
		break;
		case 0x23:
			return [152, 120, 248];
		break;
		case 0x24:
			return [248, 120, 248];
		break;
		case 0x25:
			return [248, 88, 152];
		break;
		case 0x26:
			return [248, 120, 88];
		break;
		case 0x27:
			return [252, 160, 68];
		break;
		case 0x28:
			return [248, 184, 0];
		break;
		case 0x29:
			return [184, 248, 24];
		break;
		case 0x2A:
			return [88, 216, 84];
		break;
		case 0x2B:
			return [88, 248, 152];
		break;
		case 0x2C:
			return [0, 232, 216];
		break;
		case 0x2D:
			return [120, 120, 120];
		break;

		case 0x30:
			return [252, 252, 252];
		break;
		case 0x31:
			return [164, 228, 252];
		break;
		case 0x32:
			return [184, 184, 248];
		break;
		case 0x33:
			return [216, 184, 248];
		break;
		case 0x34:
			return [248, 184, 248];
		break;
		case 0x35:
			return [248, 164, 192];
		break;
		case 0x36:
			return [240, 208, 176];
		break;
		case 0x37:
			return [252, 224, 168];
		break;
		case 0x38:
			return [248, 216, 120];
		break;
		case 0x39:
			return [216, 248, 120];
		break;
		case 0x3A:
			return [184, 248, 184];
		break;
		case 0x3B:
			return [184, 248, 216];
		break;
		case 0x3C:
			return [0, 252, 252];
		break;
		case 0x3D:
			return [216, 216, 216];
		break;
		default:
			return [0, 0, 0];
		break;
	}
};