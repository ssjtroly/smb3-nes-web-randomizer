function shuffleWorldOrder(ROM) {
	jsps.applyObjectInline(patch.addWorldOrderArray, ROM);

	ui.addSpoiler("Shuffled World Order");

	var worldPool = [ 0, 1, 2, 3, 4, 5, 6 ];
	for (var i = 0; i < 7; i++) {
		var randomWorldIndex = getRandomInt(worldPool.length);
		var randomWorld = worldPool[randomWorldIndex];

		ROM[rom.worldOrderPointer+i] = randomWorld;
		ui.addSpoiler("&#9; World " + (i+1) + " > World " + (randomWorld+1));

		worldPool.splice(randomWorldIndex, 1);
	}

	ui.addSpoiler();
}