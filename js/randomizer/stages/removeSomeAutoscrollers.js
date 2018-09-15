function removeSomeAutoscrollers(ROM) {
	var levels = rom.getLevelsWithProperty(function(obj) {
		if (obj.hasOwnProperty("type")) {
			if ((obj.type & LevelType.Regular) !== 0) {
				return true;
			}
			if ((obj.type & LevelType.Ship) !== 0) {
				return true;
			}
		}

		return false;
	});

	ui.addSpoiler("Removed Some Autoscrollers");
	for (var i = 0; i < 8; i++) {
		var worldLevels = levels[i];

		if (worldLevels.length > 0) {
			ui.addSpoiler("&#9;World " + (i+1));
			var removedSomeAutoScroller = false;

			for (var j = 0; j < levels[i].length; j++) {
				var level = levels[i][j];
				if (level.enemyCount === 0) {
					continue;
				}

				ui.addSpoiler("&#9;&#9;" + level.name);

				var addedSpoilerForLevel = false;
				for (var k = 0; k < level.enemyCount; k++) {
					if (i !== 7 && level.type === LevelType.Ship) {
						continue;
					}

					var offset = k*3;
					var enemyPointer = level.enemyPointer+1+offset;

					var enemyID = ROM[enemyPointer];
					
					if (enemyID === 0xD3) {
						var enemyX = ROM[enemyPointer+1];

						var enemyY = ROM[enemyPointer+2];
						var autoScrollVertVel = (enemyY & 0b11000000) >> 6;
						if (autoScrollVertVel > 1) {
							autoScrollVertVel = -1;
						}

						var autoScrollHoriVel = (enemyY & 0b00110000) >> 4;
						if (autoScrollHoriVel > 1) {
							autoScrollHoriVel = -1;
						}

						//var autoScrollRepeat =  (enemyY & 0b00001111);
						//ui.addSpoiler("&#9;&#9;&#9;" + ROM[enemyPointer].toString(16));
						//ui.addSpoiler("&#9;&#9;&#9;&#9;x: " + enemyX);
						//ui.addSpoiler("&#9;&#9;&#9;&#9;vertical velocity: " + autoScrollVertVel);
						//ui.addSpoiler("&#9;&#9;&#9;&#9;horizontal velocity: " + autoScrollHoriVel);
						//ui.addSpoiler("&#9;&#9;&#9;&#9;repeat command: " + autoScrollRepeat);

						// if this autoscroller isnt the type we are looking for
						if (!(
							// normal autoscrollers in 1-4, 3-6, 5-6, 6-2, 6-7, 7-4, 8-battleship & 8-crap ship
							(autoScrollVertVel === 0 && autoScrollHoriVel === 0) || 

							// can probably remove this one too if patch.disableVerticalScrollLock is used
							// autoscroller in 5-9
							// why horizontal velocity is negative when it scrolls to the right? i dont know
							// it has a vertical motion to scrolling but vertical scrolling is 0
							// bits 4-7 (repeating movement command) are 0 too
							// probably all hardcoded somewhere in PRG009.asm, PRG009_B922 
							// ASM_UNK8 or ASM_UNK9 maybe since 5-9 isnt mentioned and those are labeled after 5-6
							/*************************************************************/
							// (autoScrollVertVel === 0 && autoScrollHoriVel === -1) ||
							/*************************************************************/

							// fast autoscrollers but only in world 8 (the tank levels)
							(autoScrollVertVel === 0 && autoScrollHoriVel === 1 && i === 7)
						)) {
							continue;
						}

						ROM[enemyPointer] = 0x00;

						addedSpoilerForLevel = true;
						removedSomeAutoScroller = true;
					} else {
						continue;
					}
				}
				if (!addedSpoilerForLevel) {
					ui.popSpoiler();
				}
			}

			if (!removedSomeAutoScroller) {
				ui.popSpoiler();
			}
		}
	}
	ui.addSpoiler();
}