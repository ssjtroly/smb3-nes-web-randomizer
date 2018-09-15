function setAlwaysRevertToSmall(ROM) {
	ROM[rom.alwaysRevertToSmallPointer] = rom.alwaysRevertToSmallValue;

	ui.addSpoiler("Always Revert To Small Enabled");
	ui.addSpoiler();
}