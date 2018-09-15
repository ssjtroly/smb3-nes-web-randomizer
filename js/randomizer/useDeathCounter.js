function setUseDeathCounter(ROM) {
	jsps.applyObjectInline(patch.disable1UpsPatch, ROM);
	jsps.applyObjectInline(patch.useDeathCounterPatch, ROM);

	ROM[rom.startingLivesPointer] = 0;
	ROM[rom.continueLivesPointer] = 0;
	ui.addSpoiler("Death Counter Enabled");
	ui.addSpoiler();
}