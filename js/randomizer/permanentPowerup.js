function setPermanentPowerup(ROM, powerup) {
	jsps.applyObjectInline(patch.disablePowerupsPatch, ROM);

	if (powerup === 0 || powerup === 1 || powerup === 2 || powerup === 6) {
		// small or big
		jsps.applyObjectInline(patch.disableVerticalScrollLock, ROM);

		// they just need these fixes because flying is required on these levels
		jsps.applyObjectInline(patch.frogFix_6_5, ROM);
		jsps.applyObjectInline(patch.frogFix_6_F1, ROM);
		jsps.applyObjectInline(patch.frogFix_6_F1, ROM);
		jsps.applyObjectInline(patch.frogFix_7_F1, ROM);
		
		ROM[rom.playerSuitChangeOnDeathPointer] = powerup+1;
		ROM[rom.playerSuitChangeOnMapPrepPointer] = powerup;
		ROM[rom.playerSuitChangeOnTimeUpPointer] = powerup+1;
	} else if (powerup === 4) {
		// frog
		jsps.applyObjectInline(patch.disableVerticalScrollLock, ROM);

		// need all fixes because frog cant fly or duck
		jsps.applyObjectInline(patch.frogFix_6_3, ROM);
		jsps.applyObjectInline(patch.frogFix_6_5, ROM);
		jsps.applyObjectInline(patch.frogFix_6_F1, ROM);
		jsps.applyObjectInline(patch.frogFix_6_F2, ROM);
		jsps.applyObjectInline(patch.frogFix_7_7, ROM);
		jsps.applyObjectInline(patch.frogFix_7_F1, ROM);
		jsps.applyObjectInline(patch.frogFix_7_F2, ROM);
		jsps.applyObjectInline(patch.frogFix_8_1, ROM);
		jsps.applyObjectInline(patch.frogFix_8_F1, ROM);
		
		ROM[rom.playerSuitChangeOnDeathPointer] = powerup+1;
		ROM[rom.playerSuitChangeOnMapPrepPointer] = powerup;
		ROM[rom.playerSuitChangeOnTimeUpPointer] = powerup+1;
	} else if (powerup === 256) {
		// quasi p-wing
		jsps.applyObjectInline(patch.infinitePSpeedPatch, ROM);

		ROM[rom.playerSuitChangeOnDeathPointer] = 3+1;
		ROM[rom.playerSuitChangeOnMapPrepPointer] = 3;
		ROM[rom.playerSuitChangeOnTimeUpPointer] = 3+1;
	} else if (powerup === 257) {
		jsps.applyObjectInline(patch.infinitePSpeedPatch, ROM);

		// quasi p-wing with tanooki suit
		ROM[rom.playerSuitChangeOnDeathPointer] = 5+1;
		ROM[rom.playerSuitChangeOnMapPrepPointer] = 5;
		ROM[rom.playerSuitChangeOnTimeUpPointer] = 5+1;
	} else {
		ROM[rom.playerSuitChangeOnDeathPointer] = powerup+1;
		ROM[rom.playerSuitChangeOnMapPrepPointer] = powerup;
		ROM[rom.playerSuitChangeOnTimeUpPointer] = powerup+1;
	}

	ui.addSpoiler("Permanent Powerup > " + ui.permanentPowerup.options[ui.permanentPowerup.selectedIndex].innerHTML);
	ui.addSpoiler();
}