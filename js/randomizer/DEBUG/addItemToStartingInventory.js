function DEBUG_addItemToStartingInventory(ROM, item) {
	ROM[rom.debugInventoryPointer] = item;
	ui.addSpoiler("Added " + rom.inventoryItemName[item] + " To Debug Inventory");
	ui.addSpoiler();
}