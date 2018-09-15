function setStartingLives(ROM, lives) {
	ROM[rom.startingLivesPointer] = lives;
	ROM[rom.continueLivesPointer] = lives;

	ui.addSpoiler("Starting Lives > " + lives);
	ui.addSpoiler();
}