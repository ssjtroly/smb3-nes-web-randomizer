function setInfiniteLives(ROM) {
	jsps.applyObjectInline(patch.disable1Ups, ROM);
	jsps.applyObjectInline(patch.infiniteLives, ROM);

	ROM[rom.startingLivesPointer] = rom.livesQuestionMarkValue;
	ROM[rom.continueLivesPointer] = rom.livesQuestionMarkValue;
	ui.addSpoiler("Infinite Lives Enabled");
	ui.addSpoiler();
}