function letHammerBreakLocks(ROM) {
	jsps.applyObjectInline(patch.allowHammerToBreakLocks, ROM);
	ui.addSpoiler("Let Hammers Break Locks Enabled");
}