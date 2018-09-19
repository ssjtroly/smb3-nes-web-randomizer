function DEBUG_addItemToStartingInventory(ROM, item) {
	ROM[rom.debugInventoryPointer] = item;
	ui.addSpoiler("Added " + rom.debugInventoryItemName[item] + " To Debug Inventory");
}