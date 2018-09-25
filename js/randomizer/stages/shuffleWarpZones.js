function shuffleWarpZones(ROM) {
	ui.addSpoiler("Shuffled Warp Zones");

	var worldPool = [ 1, 2, 3, 4, 5, 6 ];
	var randomWorldOrder = [];
	for (var i = 0; i < rom.warpZonePointer.length-1; i++) {
		var randomWorldIndex = getRandomInt(worldPool.length);
		var randomWorld = worldPool[randomWorldIndex];

		ui.addSpoiler("&#9;Pipe " + (i+2) + " > " + "World " + (randomWorld+1));

		ROM[rom.warpZonePointer[i]] = (ROM[rom.warpZonePointer[i]] & 0xF0) | randomWorld;

		var numberSpriteOffset = i*4;
		ROM[rom.warpZoneNumberSpritePointer+numberSpriteOffset+1] = rom.warpZoneNumberSprite[randomWorld];

		randomWorldOrder.push(randomWorld);

		worldPool.splice(randomWorldIndex, 1);
	}

	for (var i = 0; i < randomWorldOrder.length; i++) {
		var randomWorld = randomWorldOrder[i];

		// set random world warp zone landing point to the point of the world it replaces
		ROM[rom.warpZoneLandingYPointer+randomWorld] = rom.warpZoneLandingY[i+1];
		ROM[rom.warpZoneLandingXPointer+randomWorld] = rom.warpZoneLandingX[i+1];
	}

	ui.addSpoiler();
}