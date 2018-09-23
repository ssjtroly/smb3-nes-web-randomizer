function DEBUG_enableDebugMode(ROM) {
	jsps.applyObjectInline(patch.enableDebugMode, ROM);
	ui.addSpoiler("* DEBUG MODE ENABLED *");
	ui.addSpoiler();
}