function letHammerBreakLocks(ROM) {
	jsps.applyObjectInline(patch.allowHammerToBreakLocks, ROM);
}