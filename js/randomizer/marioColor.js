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

		//ROM[rom.marioColorMapJudgemsPointer+0] = normalColors[0][0];
		ROM[rom.marioColorMapJudgemsPointer+1] = normalColors[0][1];
		ROM[rom.marioColorMapJudgemsPointer+2] = normalColors[0][0];
		//ROM[rom.marioColorMapJudgemsPointer+3] = normalColors[0][1];

		ROM[rom.marioColorMapInvUseSmallPointer] = normalColors[0][0];
		ROM[rom.marioColorMapInvUseSmallPointer+1] = normalColors[0][1];
		ROM[rom.marioColorMapInvUseBigPointer] = normalColors[0][0];
		ROM[rom.marioColorMapInvUseBigPointer+1] = normalColors[0][1];
		ROM[rom.marioColorMapInvUseLeafPointer] = normalColors[0][0];
		ROM[rom.marioColorMapInvUseLeafPointer+1] = normalColors[0][1];
		ROM[rom.marioColorMapInvUseFirePointer] = fireColors[0];
		ROM[rom.marioColorMapInvUseFirePointer+1] = fireColors[1];
		ROM[rom.marioColorMapInvUseFrogPointer] = frogColors[0];
		ROM[rom.marioColorMapInvUseFrogPointer+1] = frogColors[1];
		ROM[rom.marioColorMapInvUseTanookiPointer] = tanookiColors[0];
		ROM[rom.marioColorMapInvUseTanookiPointer+1] = tanookiColors[1];
		ROM[rom.marioColorMapInvUseHammerPointer] = hammerColors[0];
		ROM[rom.marioColorMapInvUseHammerPointer+1] = hammerColors[1];
		ROM[rom.marioColorMapInvUseCloudPointer] = normalColors[0][0];
		ROM[rom.marioColorMapInvUseCloudPointer+1] = normalColors[0][1];
		ROM[rom.marioColorMapInvUsePWingPointer] = normalColors[0][0];
		ROM[rom.marioColorMapInvUsePWingPointer+1] = normalColors[0][1];

		ROM[rom.luigiColorMapInvUseSmallPointer] = normalColors[1][0];
		ROM[rom.luigiColorMapInvUseSmallPointer+1] = normalColors[1][1];
		ROM[rom.luigiColorMapInvUseBigPointer] = normalColors[1][0];
		ROM[rom.luigiColorMapInvUseBigPointer+1] = normalColors[1][1];
		ROM[rom.luigiColorMapInvUseLeafPointer] = normalColors[1][0];
		ROM[rom.luigiColorMapInvUseLeafPointer+1] = normalColors[1][1];
		ROM[rom.luigiColorMapInvUseFirePointer] = fireColors[0];
		ROM[rom.luigiColorMapInvUseFirePointer+1] = fireColors[1];
		ROM[rom.luigiColorMapInvUseFrogPointer] = frogColors[0];
		ROM[rom.luigiColorMapInvUseFrogPointer+1] = frogColors[1];
		ROM[rom.luigiColorMapInvUseTanookiPointer] = tanookiColors[0];
		ROM[rom.luigiColorMapInvUseTanookiPointer+1] = tanookiColors[1];
		ROM[rom.luigiColorMapInvUseHammerPointer] = hammerColors[0];
		ROM[rom.luigiColorMapInvUseHammerPointer+1] = hammerColors[1];
		ROM[rom.luigiColorMapInvUseCloudPointer] = normalColors[1][0];
		ROM[rom.luigiColorMapInvUseCloudPointer+1] = normalColors[1][1];
		ROM[rom.luigiColorMapInvUsePWingPointer] = normalColors[1][0];
		ROM[rom.luigiColorMapInvUsePWingPointer+1] = normalColors[1][1];

		// REMOVED MARIO/LUGI PALETTE CORRECTION STUFF BECAUSE IT WAS A MESS!!!
		// there was something i am missing or i was going about it all wrong, need to look deeper into it
		// luigi gets shafted again

		ROM[rom.marioColorMapSmallPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapSmallPointer+2] = normalColors[0][1];
		ROM[rom.marioColorMapBigPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapBigPointer+2] = normalColors[0][1];
		ROM[rom.marioColorMapLeafPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapLeafPointer+2] = normalColors[0][1];

		// these were solid grey because the values assigned were undefined, oops
		ROM[rom.marioColorMapFirePointer+1] = fireColors[0];
		ROM[rom.marioColorMapFirePointer+2] = fireColors[1];
		ROM[rom.marioColorMapFrogPointer+1] = frogColors[0];
		ROM[rom.marioColorMapFrogPointer+2] = frogColors[1];
		ROM[rom.marioColorMapTanookiPointer+1] = tanookiColors[0];
		ROM[rom.marioColorMapTanookiPointer+2] = tanookiColors[1];
		ROM[rom.marioColorMapHammerPointer+1] = hammerColors[0];
		ROM[rom.marioColorMapHammerPointer+2] = hammerColors[1];
		ROM[rom.marioColorMapPWingPointer+1] = normalColors[0];
		ROM[rom.marioColorMapPWingPointer+2] = normalColors[1];
		ROM[rom.marioColorMapJudgemsPointer+1] + normalColors[0];
		ROM[rom.marioColorMapJudgemsPointer+2] + normalColors[1];

		// palette correction when cloud ends
		// these are primary colors
		ROM[rom.marioColorMapCloudPostPrimaryPointer] = normalColors[0][0];
		ROM[rom.marioColorMapCloudPostPrimaryPointer+1] = normalColors[0][0];
		ROM[rom.marioColorMapCloudPostPrimaryPointer+2] = fireColors[0];
		ROM[rom.marioColorMapCloudPostPrimaryPointer+3] = normalColors[0];
		ROM[rom.marioColorMapCloudPostPrimaryPointer+4] = frogColors[0];
		ROM[rom.marioColorMapCloudPostPrimaryPointer+5] = tanookiColors[0];
		ROM[rom.marioColorMapCloudPostPrimaryPointer+6] = hammerColors[0];
		// these are outline colors
		//ROM[rom.marioColorMapCloudPostOutlinePointer] = 0x0F;
		//ROM[rom.marioColorMapCloudPostOutlinePointer+1] = 0x0F;
		//ROM[rom.marioColorMapCloudPostOutlinePointer+2] = 0x16;
		//ROM[rom.marioColorMapCloudPostOutlinePointer+3] = 0x0F;
		//ROM[rom.marioColorMapCloudPostOutlinePointer+4] = 0x0F;
		//ROM[rom.marioColorMapCloudPostOutlinePointer+5] = 0x0F;
		//ROM[rom.marioColorMapCloudPostOutlinePointer+6] = 0x0F;

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
