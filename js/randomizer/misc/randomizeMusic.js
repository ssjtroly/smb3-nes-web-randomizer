function randomizeMusicGroup1(ROM) {
	var musicPool = rom.musicGroup1.value.slice(0);
	var musicNames = rom.musicGroup1.name.slice(0);

	ui.addSpoiler("&#9;Group 1");
	for (var i = 0; i < rom.musicGroup1.pointer.length; i++) {
		var randomMusicIndex = getRandomInt(musicPool.length);
		ui.addSpoiler("&#9;&#9;" + rom.musicGroup1.name[i] + " > " + musicNames[randomMusicIndex]);
		for (var j = 0; j < rom.musicGroup1.pointer[i].length; j++) {
			ROM[rom.musicGroup1.pointer[i][j]] = musicPool[randomMusicIndex];
		}

		musicPool.splice(randomMusicIndex, 1);
		musicNames.splice(randomMusicIndex, 1);
	}
	ui.addSpoiler();
}

function randomizeMusicGroup2(ROM) {
	var musicPool = rom.musicGroup2.value.slice(0);
	var musicNames = rom.musicGroup2.name.slice(0);

	ui.addSpoiler("&#9;Group 2");
	for (var i = 0; i < rom.musicGroup2.pointer.length; i++) {
		var randomMusicIndex = getRandomInt(musicPool.length);
		ui.addSpoiler("&#9;&#9;" + rom.musicGroup2.name[i] + " > " + musicNames[randomMusicIndex]);
		for (var j = 0; j < rom.musicGroup2.pointer[i].length; j++) {
			ROM[rom.musicGroup2.pointer[i][j]] = musicPool[randomMusicIndex];
		}

		musicPool.splice(randomMusicIndex, 1);
		musicNames.splice(randomMusicIndex, 1);
	}
	ui.addSpoiler();
}

function randomizeMusic(ROM) {
	ui.addSpoiler("Randomized Music");

	randomizeMusicGroup1(ROM);
	randomizeMusicGroup2(ROM);
}