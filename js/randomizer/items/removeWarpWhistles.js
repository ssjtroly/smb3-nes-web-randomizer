function removeWarpWhistles(ROM) {
	ui.addSpoiler("Removed Warp Whistles");
	
	var allowedToadHouseItems = [ 2, 3, 4, 5, 6, 7 ];
	var whistleToadHouseItem = allowedToadHouseItems[getRandomInt(allowedToadHouseItems.length)];
	ROM[rom.whistleToadHousePointer] = whistleToadHouseItem;
	ui.addSpoiler("&#9;Toad House > " + rom.toadHouseItemName[whistleToadHouseItem]);

	var allowedHammerBroItems = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];
	var whistleHammerBroItem = allowedHammerBroItems[getRandomInt(allowedHammerBroItems.length)];
	ROM[rom.whistleHammerBroPointer] = whistleHammerBroItem;
	ui.addSpoiler("&#9;Hammer Bro > " + rom.inventoryItemName[whistleHammerBroItem]);

	var whistleW1FortressItem = allowedHammerBroItems[getRandomInt(allowedHammerBroItems.length)]-1;
	ROM[rom.whistleW1FortressPointer] = whistleW1FortressItem;
	ui.addSpoiler("&#9;World 1 Fortress > " + rom.inventoryItemName[whistleW1FortressItem]);

	ui.addSpoiler();
}