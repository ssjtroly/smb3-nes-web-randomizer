function setInfiniteLives(ROM) {
	jsps.applyObjectInline(patch.disable1UpsPatch, ROM);
	jsps.applyObjectInline(patch.infiniteLivesPatch, ROM);

	ROM[rom.startingLivesPointer] = rom.livesQuestionMarkValue;
	ROM[rom.continueLivesPointer] = rom.livesQuestionMarkValue;
	ui.addSpoiler("Infinite Lives Enabled");
	ui.addSpoiler();
}