function randomizeKoopaKidHP(ROM) {
	// patch must be applied for koopalingHPPointer to be functional
	jsps.applyObjectInline(patch.koopalingHP, ROM);

	ui.addSpoiler("Randomized Koopaling HP");
	for (var i = 0; i < 8; i++) {
		var hp = getRandomIntRange(1, 6);
		ROM[rom.koopalingHPPointer+i] = hp;
		ui.addSpoiler("&#9;World " + (i+1) + " > " + hp + " HP");
	}
	ui.addSpoiler();
}