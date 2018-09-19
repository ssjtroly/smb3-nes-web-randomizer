function randomizeItemBlocks(ROM) {
	ui.addSpoiler("Randomzied Item Blocks");
	for (var i = 0; i < 8; i++) {
		var levels = rom.levels[i];

		ui.addSpoiler("&#9;World " + (i+1));
		for (var j = 0; j < levels.length; j++) {
			if ((levels[j].type & LevelType.Start) !== 0 ||
				(levels[j].type & LevelType.Boss) !== 0 ||
				(levels[j].type & LevelType.ToadHouse) !== 0 ||
				(levels[j].type & LevelType.Spade) !== 0
			) {
				continue;
			}

			ui.addSpoiler("&#9;&#9;" + levels[j].name);
			var levelData = new LevelData(ROM, i, j);
			var wroteLevelSpoiler = false;
			var lastX = 0, lastY = 0;
			for (var k = 0; k < levelData.object3.length; k++) {
				var obj3 = levelData.object3[k];

				var randomBank = null;
				var randomBlock = null;
				var orginalBlock = null;

				if (orginalBlock = rom.getItemBlockObject(ItemBlockType.Question, obj3.bank, obj3.id)) {
					if (obj3.x-lastX >= 0x10 || obj3.y-lastY >= 0x0C) {
						randomBank = obj3.bank;
						var itemBlocks = rom.getItemBlockObjects(ItemBlockType.Question, randomBank);
						var randomIndex = getRandomInt(itemBlocks.length);
						randomBlock = itemBlocks[randomIndex];
					} else {
						// just use no powerup block until last powerup is offscreen
						randomBank = 1;
						randomBlock = rom.getItemBlockObject(ItemBlockType.Question, randomBank, 32);
					}
				} 

				else if (orginalBlock = rom.getItemBlockObject(ItemBlockType.Brick, obj3.bank, obj3.id)) {
					// ignore last x since normal brick not in the randomized pool
					// could lead to disappearing powerups when more than 1 is on the screen
					// but thats better than breaking a level
					randomBank = obj3.bank;
					var itemBlocks = rom.getItemBlockObjects(ItemBlockType.Brick, randomBank);
					var randomIndex = getRandomInt(itemBlocks.length);
					randomBlock = itemBlocks[randomIndex];
				} 

				else if (orginalBlock = rom.getItemBlockObject(ItemBlockType.MovableWooden, obj3.bank, obj3.id)) {
					if (obj3.x-lastX >= 0x10 || obj3.y-lastY >= 0x0C) {
						randomBank = getRandomIntRange(1, 3);
						var itemBlocks = rom.getItemBlockObjects(ItemBlockType.MovableWooden, randomBank);
						var randomIndex = getRandomInt(itemBlocks.length);
						randomBlock = itemBlocks[randomIndex];
					} else {
						// just use no powerup block until last powerup is offscreen
						randomBank = 1;
						randomBlock = rom.getItemBlockObject(ItemBlockType.Question, randomBank, 112);
					}
				}

				else if (orginalBlock = rom.getItemBlockObject(ItemBlockType.Invisible, obj3.bank, obj3.id)) {
					if (obj3.x-lastX >= 0x10 || obj3.y-lastY >= 0x0C) {
						randomBank = obj3.bank;
						var itemBlocks = rom.getItemBlockObjects(ItemBlockType.Invisible, randomBank);
						var randomIndex = getRandomInt(itemBlocks.length);
						randomBlock = itemBlocks[randomIndex];
					} else {
						// just use no powerup block until last powerup is offscreen
						randomBank = 1;
						randomBlock = rom.getItemBlockObject(ItemBlockType.Invisible, randomBank, 15);
					}
				} 

				else if (orginalBlock = rom.getItemBlockObject(ItemBlockType.Note, obj3.bank, obj3.id)) {
					if (obj3.x-lastX >= 0x10 || obj3.y-lastY >= 0x0C) {
						randomBank = getRandomIntRange(1, 3);
						var itemBlocks = rom.getItemBlockObjects(ItemBlockType.Note, randomBank);
						var randomIndex = getRandomInt(itemBlocks.length);
						randomBlock = itemBlocks[randomIndex];
					} else {
						// just use no powerup block until last powerup is offscreen
						randomBank = 1;
						randomBlock = rom.getItemBlockObject(ItemBlockType.Note, randomBank, 96);
					}
				}

				if (orginalBlock && randomBank && randomBlock) {
					ROM[obj3.pointer] = (randomBank << 5) | obj3.y;
					ROM[obj3.pointer+2] = randomBlock.id;

					lastX = obj3.x;
					lastY = obj3.y;

					ui.addSpoiler("&#9;&#9;&#9;" + orginalBlock.name + " > " + randomBlock.name);
					wroteLevelSpoiler = true;
				}
			}

			if (!wroteLevelSpoiler) {
				ui.popSpoiler();
			}
		}
	}
	ui.addSpoiler();
}