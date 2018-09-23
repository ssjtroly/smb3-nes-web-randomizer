function shuffleToadHouses(ROM) {
	ui.addSpoiler("Shuffled Toad House Items");
	var inventoryToItem = [ 0x0C, 0x08, 0x04, 0x05, 0x06, 0x04, 0x05, 0x06, 0x01, 0x02, 0x03, 0x04, 0x02, 0x03, 0x05 ];
	var itemPool = inventoryToItem.slice(1);
	// start on 1 to skip whistles
	for (var i = 1; i < 15; i++) {
		var randomItemPoolIndex = getRandomInt(itemPool.length);
		var randomItem = itemPool[randomItemPoolIndex];
		ROM[rom.toadhouseItemToInventoryPointer+i] = randomItem;
		
		ui.addSpoiler("&#9;" +
			rom.inventoryItemName[inventoryToItem[i]] +
			" > " + 
			rom.inventoryItemName[randomItem]
		);

		itemPool.splice(randomItemPoolIndex, 1);
	}
	ui.addSpoiler();
}