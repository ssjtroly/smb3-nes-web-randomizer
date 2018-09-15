function setUseDeathCounter(ROM) {
	jsps.applyObjectInline(patch.disable1Ups, ROM);
	jsps.applyObjectInline(patch.useDeathCounter, ROM);

	ROM[rom.startingLivesPointer] = 0;
	ROM[rom.continueLivesPointer] = 0;
	ui.addSpoiler("Death Counter Enabled");
	ui.addSpoiler();
}