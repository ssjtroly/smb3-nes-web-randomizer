function DEBUG_addHammersToStartingInventory(ROM) {
	ROM[rom.debugInventoryPointer] = 0x07;
	ui.addSpoiler("Added Clouds To Debug Inventory");
}