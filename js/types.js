var WorldData = function(ROM, world) {
	this.name = (world+1).toString();
	this.index = world;
	this.mapLocationPointer = rom.worlds[world].mapLocationPointer;
	this.header = [  // copy header
		ROM[this.mapLocationPointer], 
		ROM[this.mapLocationPointer+1], 
		ROM[this.mapLocationPointer+2], 
		ROM[this.mapLocationPointer+3]
	];
	this.count = rom.worlds[world].mapLocationCount; // number of tiles player can move to in a world

	this.dataPointer = [
		[], [], [], []
	];
	this.data = [
		[], [], [], []
	];
	this.tiles = [];

	var startPtr = this.mapLocationPointer+4;
	for (var i = 0; i < this.count; i++) {
		var datasetWPointer = startPtr+i; // 1 byte per count
		var datasetXPointer = startPtr+this.count+i;  // 1 byte per count
		var datasetYPointer = startPtr+this.count+this.count+(i*2);  // 2 bytes per count
		var datasetZPointer = startPtr+this.count+this.count+(this.count*2)+(i*2); // 2 bytes per count

		this.dataPointer[0].push(datasetWPointer);
		this.dataPointer[1].push(datasetXPointer);
		this.dataPointer[2].push(datasetYPointer);
		this.dataPointer[3].push(datasetZPointer);
		
		// copy level pointer data
		this.data[0].push(ROM[datasetWPointer]);

		this.data[1].push(ROM[datasetXPointer]);

		this.data[2].push([ ROM[datasetYPointer], ROM[datasetYPointer+1] ]);

		this.data[3].push([ ROM[datasetZPointer], ROM[datasetZPointer+1] ]);
	}

	var offset = rom.worlds[world].mapSpritePointer;
	var reachedEnd = false;
	for (var z = 0; z < 4; z++) {
		var screen = [];
		for (var y = 0; y < 9; y++) {
			var row = [];
			for (var x = 0; x < 16; x++) {
				var index = conversion.three.to1D(x, y, z, 16, 9);
				var tileSpriteOffset = offset+index;

				if (!reachedEnd) {
					if (ROM[tileSpriteOffset] === 0xFF) {
						reachedEnd = true;
					}
				}

				if (reachedEnd) {
					row.push(null);
				} else {
					row.push(tileSpriteOffset);
				}
			}

			if (reachedEnd) {
				screen.push(null);
			} else {
				screen.push(row);
			}
		}

		if (reachedEnd) {
			this.tiles.push(null);
		} else {
			this.tiles.push(screen);
		}
	}
};

var LevelObject = function(ROM, bank, id, x, y, width, pointer, is4Byte) {
	// 1st byte is the bank & y position
	// 		first 3 bits is the bank
	// 		next 5 bits is the y position
	// 2nd byte is the x position
	// 3rd byte is the id
	// 4th byte is the width, only for 4 byte objects

	this.pointer = pointer;
	this.bank = bank;
	this.y = y;
	this.id = id;
	this.x = x;
	this.width = width
}

var LevelData = function(ROM, world, levelIndex) {
	this.level = rom.levels[world][levelIndex];
	this.header = [ 
		ROM[this.level.objectPointer], 
		ROM[this.level.objectPointer+1],
		ROM[this.level.objectPointer+2],
		ROM[this.level.objectPointer+3],
		ROM[this.level.objectPointer+4],
		ROM[this.level.objectPointer+5],
		ROM[this.level.objectPointer+6],
		ROM[this.level.objectPointer+7],
		ROM[this.level.objectPointer+8],
	];
	this.object3 = [];
	this.object4 = [];

	var objectSet = this.header[7] & 0b00011111;
	var pointer = this.level.objectPointer+9;
	for (var i = 0; i < this.level.bytes3+this.level.bytes4; i++) {
		let bank = (ROM[pointer] & 0b11100000) >> 5;
		let id = ROM[pointer+2];
		let y = ROM[pointer] & 0b00011111;
		let x = ROM[pointer+1];

		var is4Byte = rom.isObject4Byte(objectSet, bank, id);
		if (is4Byte) {
			let width = ROM[pointer+2];
			this.object4.push(new LevelObject(ROM, bank, id, x, y, width, pointer, is4Byte));
			pointer += 4;
		} else {
			this.object3.push(new LevelObject(ROM, bank, id, x, y, -1, pointer, is4Byte));
			pointer += 3;
		}
	}
};

function parseConfiguration(buffer) {
	var str = "";
	for (var i = 0; i < buffer.length; i++) {
		str += String.fromCharCode(buffer[i]);
	}
	var obj = null;
	try {
		obj = JSON.parse(str.replace("\t", "").replace("\n", ""));
	}
	catch(e) {
		if (e instanceof SyntaxError) {
			alert("Invalid configuration file.\n" + e);
		} else {
			alert("Invalid configuration file.");
		}
	}

	return obj;
};

var Configuration = function(buffer = null) {
	if (buffer !== null) {
		var obj = parseConfiguration(buffer);

		this.flags = obj.flags;
		this.marioColor = obj.marioColor;
		this.marioComplexion = obj.marioComplexion;
		this.startingLives = obj.startingLives;
		this.infiniteLives = obj.infiniteLives;
		this.useDeathCounter = obj.useDeathCounter;
		this.permanentPowerup = obj.permanentPowerup;

		this.debugMode = obj.debugMode;
		this.debugAddItemToStartingInventory = obj.debugAddItemToStartingInventory;
		this.debugStartingInventoryItem = obj.debugStartingInventoryItem;

		this.text = [
			obj.text[0],
			obj.text[1],
			obj.text[2],
			obj.text[3],
		];
	} else {
		this.flags = [ 0, 0 ];
		this.marioColor = -1;
		this.marioComplexion = -1;
		this.startingLives = 4;
		this.infiniteLives = false;
		this.useDeathCounter = false;
		this.permanentPowerup = -1;

		this.debugMode = false;
		this.debugAddItemToStartingInventory = false;
		this.debugStartingInventoryItem = 8;

		this.text = [];
	}

	this.load = function(ui) {
		this.flags = [ 0, 0 ];

		if (ui.shuffleRegularStages.checked) {
			this.flags[0] |= 1 << 0;
		}

		if (ui.addLostStages.checked) {
			this.flags[0] |= 1 << 1;
		}

		if (ui.shuffleFortresses.checked) {
			this.flags[0] |= 1 << 2;
		}

		if (ui.shuffleWorld8Ships.checked) {
			this.flags[0] |= 1 << 3;
		}

		if (ui.shuffleCastles.checked) {
			this.flags[0] |= 1 << 4;
		}

		if (ui.randomizeHammerBroLevels.checked) {
			this.flags[0] |= 1 << 5;
		}

		if (ui.removeSomeAutoscrollers.checked) {
			this.flags[0] |= 1 << 6;
		}

		if (ui.removeBonusAutoscrollers.checked) {
			this.flags[0] |= 1 << 7;
		}

		if (ui.removeShipAutoscrollers.checked) {
			this.flags[0] |= 1 << 8;
		}

		if (ui.shuffleOverworldPipes.checked) {
			this.flags[0] |= 1 << 9;
		}

		if (ui.shuffleWorldOrder.checked) {
			this.flags[0] |= 1 << 10;
		}

		if (ui.shuffleWarpZones.checked) {
			this.flags[0] |= 1 << 11;
		}

		if (ui.shuffleWorldPalettes.checked) {
			this.flags[0] |= 1 << 12;
		}

		if (ui.randomizeWorldPalettes.checked) {
			this.flags[0] |= 1 << 13;
		}

		if (ui.randomizeEnemies.checked) {
			this.flags[0] |= 1 << 14;
		}

		if (ui.randomizeKoopaEarthquakes.checked) {
			this.flags[0] |= 1 << 15;
		}

		if (ui.randomizeKoopaKidHP.checked) {
			this.flags[0] |= 1 << 16;
		}

		if (ui.randomizeHammerBros.checked) {
			this.flags[0] |= 1 << 17;
		}

		if (ui.shuffleNGame.checked) {
			this.flags[0] |= 1 << 18;
		}

		if (ui.shuffleNGamePrizes.checked) {
			this.flags[0] |= 1 << 19;
		}

		if (ui.randomizeCastleItems.checked) {
			this.flags[0] |= 1 << 20;
		}

		if (ui.randomizeAnchorAbility.checked) {
			this.flags[0] |= 1 << 21;
		}

		if (ui.randomizeItemBlocks.checked) {
			this.flags[0] |= 1 << 22;
		}

		if (ui.removeWarpWhistles.checked) {
			this.flags[0] |= 1 << 23;
		}

		if (ui.shuffleChestItems.checked) {
			this.flags[0] |= 1 << 24;
		}

		if (ui.shuffleToadHouses.checked) {
			this.flags[0] |= 1 << 25;
		}

		if (ui.letHammerBreakLocks.checked) {
			this.flags[0] |= 1 << 26;
		}

		if (ui.randomizeMusic.checked) {
			this.flags[0] |= 1 << 27;
		}

		if (ui.shuffleSfx.checked) {
			this.flags[0] |= 1 << 28;
		}

		if (ui.ohkoMode.checked) {
			this.flags[0] |= 1 << 29;
		}

		if (ui.alwaysRevertToSmall.checked) {
			this.flags[0] |= 1 << 30;
		}

		if (ui.infinitePSpeed.checked) {
			this.flags[0] |= 1 << 31;
		}

		this.marioColor = parseInt(ui.marioColor.value);
		this.marioComplexion = parseInt(ui.marioComplexion.value);
		this.startingLives = parseInt(ui.startingLives.value);
		this.infiniteLives = ui.infiniteLives.checked;
		this.useDeathCounter = ui.useDeathCounter.checked;
		this.permanentPowerup = parseInt(ui.permanentPowerup.value);

		this.debugMode = ui.debugMode.checked;
		this.debugAddItemToStartingInventory = ui.debugAddItemToStartingInventory.checked;
		this.debugStartingInventoryItem = parseInt(ui.debugStartingInventoryItem.value);

		this.text = [
			ui.loadedToadHouseText,
			ui.loadedToadKingText,
			ui.loadedWorldLetterText,
			ui.loadedFinalLetterText
		];
	};

	this.applyFlags = function(ui) {
		for (var i = 0; i < ui.flaggableOptions.length; i++) {
			ui.flaggableOptions[i].checked = false;
		}
		
		if (this.flags[0] & (1 << 0)) {
			if (!ui.shuffleRegularStages.disabled) {
				ui.shuffleRegularStages.checked = true;
			}
		}

		if (this.flags[0] & (1 << 1)) {
			if (!ui.addLostStages.disabled) {
				ui.addLostStages.checked = true;
			}
		}

		if (this.flags[0] & (1 << 2)) {
			if (!ui.shuffleFortresses.disabled) {
				ui.shuffleFortresses.checked = true;
			}
		}

		if (this.flags[0] & (1 << 3)) {
			if (!ui.shuffleWorld8Ships.disabled) {
				ui.shuffleWorld8Ships.checked = true;
			}
		}

		if (this.flags[0] & (1 << 4)) {
			if (!ui.shuffleCastles.disabled) {
				ui.shuffleCastles.checked = true;
			}
		}

		if (this.flags[0] & (1 << 5)) {
			if (!ui.randomizeHammerBroLevels.disabled) {
				ui.randomizeHammerBroLevels.checked = true;
			}
		}

		if (this.flags[0] & (1 << 6)) {
			if (!ui.removeSomeAutoscrollers.disabled) {
				ui.removeSomeAutoscrollers.checked = true;
			}
		}

		if (this.flags[0] & (1 << 7)) {
			if (!ui.removeBonusAutoscrollers.disabled) {
				ui.removeBonusAutoscrollers.checked = true;
			}
		}

		if (this.flags[0] & (1 << 8)) {
			if (!ui.removeShipAutoscrollers.disabled) {
				ui.removeShipAutoscrollers.checked = true;
			}
		}

		if (this.flags[0] & (1 << 9)) {
			if (!ui.shuffleOverworldPipes.disabled) {
				ui.shuffleOverworldPipes.checked = true;
			}
		}

		if (this.flags[0] & (1 << 10)) {
			if (!ui.shuffleWorldOrder.disabled) {
				ui.shuffleWorldOrder.checked = true;
			}
		}

		if (this.flags[0] & (1 << 11)) {
			if (!ui.shuffleWarpZones.disabled) {
				ui.shuffleWarpZones.checked = true;
			}
		}

		if (this.flags[0] & (1 << 12)) {
			if (!ui.shuffleWorldPalettes.disabled) {
				ui.shuffleWorldPalettes.checked = true;
			}
		}

		if (this.flags[0] & (1 << 13)) {
			if (!ui.randomizeWorldPalettes.disabled) {
				ui.randomizeWorldPalettes.checked = true;
			}
		}

		if (this.flags[0] & (1 << 14)) {
			if (!ui.randomizeEnemies.disabled) {
				ui.randomizeEnemies.checked = true;
			}
		}

		if (this.flags[0] & (1 << 15)) {
			if (!ui.randomizeKoopaEarthquakes.disabled) {
				ui.randomizeKoopaEarthquakes.checked = true;
			}
		}

		if (this.flags[0] & (1 << 16)) {
			if (!ui.randomizeKoopaKidHP.disabled) {
				ui.randomizeKoopaKidHP.checked = true;
			}
		}

		if (this.flags[0] & (1 << 17)) {
			if (!ui.randomizeHammerBros.disabled) {
				ui.randomizeHammerBros.checked = true;
			}
		}

		if (this.flags[0] & (1 << 18)) {
			if (!ui.shuffleNGame.disabled) {
				ui.shuffleNGame.checked = true;
			}
		}

		if (this.flags[0] & (1 << 19)) {
			if (!ui.shuffleNGamePrizes.disabled) {
				ui.shuffleNGamePrizes.checked = true;
			}
		}

		if (this.flags[0] & (1 << 20)) {
			if (!ui.randomizeCastleItems.disabled) {
				ui.randomizeCastleItems.checked = true;
			}
		}

		if (this.flags[0] & (1 << 21)) {
			if (!ui.randomizeAnchorAbility.disabled) {
				ui.randomizeAnchorAbility.checked = true;
			}
		}

		if (this.flags[0] & (1 << 22)) {
			if (!ui.randomizeItemBlocks.disabled) {
				ui.randomizeItemBlocks.checked = true;
			}
		}

		if (this.flags[0] & (1 << 23)) {
			if (!ui.removeWarpWhistles.disabled) {
				ui.removeWarpWhistles.checked = true;
			}
		}

		if (this.flags[0] & (1 << 24)) {
			if (!ui.shuffleChestItems.disabled) {
				ui.shuffleChestItems.checked = true;
			}
		}

		if (this.flags[0] & (1 << 25)) {
			if (!ui.shuffleToadHouses.disabled) {
				ui.shuffleToadHouses.checked = true;
			}
		}

		if (this.flags[0] & (1 << 26)) {
			if (!ui.letHammerBreakLocks.disabled) {
				ui.letHammerBreakLocks.checked = true;
			}
		}

		if (this.flags[0] & (1 << 27)) {
			if (!ui.randomizeMusic.disabled) {
				ui.randomizeMusic.checked = true;
			}
		}

		if (this.flags[0] & (1 << 28)) {
			if (!ui.shuffleSfx.disabled) {
				ui.shuffleSfx.checked = true;
			}
		}

		if (this.flags[0] & (1 << 29)) {
			if (!ui.ohkoMode.disabled) {
				ui.ohkoMode.checked = true;
			}
		}

		if (this.flags[0] & (1 << 30)) {
			if (!ui.alwaysRevertToSmall.disabled) {
				ui.alwaysRevertToSmall.checked = true;
			}
		}

		if (this.flags[0] & (1 << 31)) {
			if (!ui.infinitePSpeed.disabled) {
				ui.infinitePSpeed.checked = true;
			}
		}
	};

	this.apply = function(ui) {
		this.applyFlags(ui);

		ui.marioColor.value = this.marioColor;
		ui.marioComplexion.value = this.marioComplexion;
		ui.startingLives.value = this.startingLives;
		ui.infiniteLives.checked = this.infiniteLives;
		ui.useDeathCounter.checked = this.useDeathCounter;
		ui.permanentPowerup.value = this.permanentPowerup;

		ui.debugMode.checked = this.debugMode;
		ui.debugAddItemToStartingInventory.checked = this.debugAddItemToStartingInventory;
		ui.debugStartingInventoryItem.value = this.debugStartingInventoryItem;

		ui.loadedToadHouseText = this.text[0];
		ui.loadedToadKingText = this.text[1];
		ui.loadedWorldLetterText = this.text[2];
		ui.loadedFinalLetterText = this.text[3];
	};

	return this;
};