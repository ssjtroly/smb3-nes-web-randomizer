function setOHKOMode(ROM) {
	ROM[rom.playerGetsHurtPointer] = rom.playerGetsHurtOHKOValue;
	ui.addSpoiler("OHKO Mode Enabled");
	ui.addSpoiler();
}