function shuffleWorldOrder(ROM) {
	jsps.applyObjectInline(patch.addWorldOrderArray, ROM);

	ui.addSpoiler("Shuffled World Order");

	var worldPool = [ 0, 1, 2, 3, 4, 5, 6 ];
	var randomWorldOrder = [];
	for (var i = 0; i < 7; i++) {
		var randomWorldIndex = getRandomInt(worldPool.length);
		var randomWorld = worldPool[randomWorldIndex];
		randomWorldOrder.push(randomWorld);

		ROM[rom.worldOrderPointer+i] = randomWorld;

		ui.addSpoiler("&#9; World " + (i+1) + " > World " + (randomWorld+1));

		worldPool.splice(randomWorldIndex, 1);
	}

	// update warp pipe destinations
	for (var i = 0; i < rom.warpZonePointer.length-1; i++) {
		var worldWarpZone = randomWorldOrder[i+1];

		ROM[rom.warpZonePointer[i]] = (ROM[rom.warpZonePointer[i]] & 0xF0) | worldWarpZone;

		var numberSpriteOffset = i*4;
		ROM[rom.warpZoneNumberSpritePointer+numberSpriteOffset+1] = rom.warpZoneNumberSprite[worldWarpZone];
	}

	for (var i = 0; i < randomWorldOrder.length; i++) {
		var randomWorld = randomWorldOrder[i];

		// set random world warp zone landing point to the point of the world it replaces
		ROM[rom.warpZoneLandingYPointer+randomWorld] = rom.warpZoneLandingY[i];
		ROM[rom.warpZoneLandingXPointer+randomWorld] = rom.warpZoneLandingX[i];
	}

	ui.addSpoiler();
}