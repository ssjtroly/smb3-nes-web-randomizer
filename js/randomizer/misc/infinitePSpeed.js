function setInfinitePSpeed(ROM) {
	jsps.applyObjectInline(rom.infinitePSpeedPatch, ROM);

	ui.addSpoiler("Infinite P Speed Enabled");
	ui.addSpoiler();
}