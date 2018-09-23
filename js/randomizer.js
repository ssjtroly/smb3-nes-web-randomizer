var randomizer = {
	randomize: function(ROM) {		
		var changedDebugMode = false;
		if (ui.debugMode.checked) {
			DEBUG_enableDebugMode(ROM);
			changedDebugMode = true;
		}

		if (changedDebugMode) {
			if (ui.debugAddItemToStartingInventory.checked) {
				var item = parseInt(ui.debugStartingInventoryItem.value);
				DEBUG_addItemToStartingInventory(ROM, item);
			}
		}

		var flags = [ 0, 0 ];

		if (ui.shuffleRegularStages.checked) {
			shuffleRegularStages(ROM);
			flags[0] |= 1 << 0;
		}

		if (ui.addLostStages.checked) {
			addLostStages(ROM);
			flags[0] |= 1 << 1;
		}

		if (ui.shuffleFortresses.checked) {
			shuffleFortresses(ROM);
			flags[0] |= 1 << 2;
		}

		if (ui.shuffleWorld8Ships.checked) {
			shuffleWorld8Ships(ROM);
			flags[0] |= 1 << 3;
		}

		if (ui.shuffleCastles.checked) {
			shuffleCastles(ROM);
			flags[0] |= 1 << 4;
		}

		if (ui.randomizeHammerBroLevels.checked) {
			randomizeHammerBroLevels(ROM);
			flags[0] |= 1 << 5;
		}

		if (ui.removeSomeAutoscrollers.checked) {
			removeSomeAutoscrollers(ROM);
			flags[0] |= 1 << 6;
		}

		if (ui.removeBonusAutoscrollers.checked) {
			removeBonusAutoscrollers(ROM);
			flags[0] |= 1 << 7;
		}

		if (ui.removeShipAutoscrollers.checked) {
			removeShipAutoscrollers(ROM);
			flags[0] |= 1 << 8;
		}

		if (ui.shuffleOverworldPipes.checked) {
			shuffleOverworldPipes(ROM);
			flags[0] |= 1 << 9;
		}

		if (ui.shuffleWorldOrder.checked) {
			shuffleWorldOrder(ROM);
			flags[0] |= 1 << 10;
		}

		if (ui.shuffleWarpZones.checked) {
			shuffleWarpZones(ROM);
			flags[0] |= 1 << 11;
		}

		if (ui.shuffleWorldPalettes.checked) {
			shuffleWorldPalettes(ROM);
			flags[0] |= 1 << 12;
		}

		if (ui.randomizeWorldPalettes.checked) {
			randomizeWorldPalettes(ROM);
			flags[0] |= 1 << 13;
		}

		if (ui.randomizeEnemies.checked) {
			randomizeEnemies(ROM);
			flags[0] |= 1 << 14;
		}

		if (ui.randomizeKoopaEarthquakes.checked) {
			randomizeKoopaEarthquakes(ROM);
			flags[0] |= 1 << 15;
		}

		if (ui.randomizeKoopaKidHP.checked) {
			randomizeKoopaKidHP(ROM);
			flags[0] |= 1 << 16;
		}

		if (ui.randomizeHammerBros.checked) {
			randomizeHammerBros(ROM);
			flags[0] |= 1 << 17;
		}

		if (ui.shuffleNGame.checked) {
			shuffleNGame(ROM);
			flags[0] |= 1 << 18;
		}

		if (ui.shuffleNGamePrizes.checked) {
			shuffleNGamePrizes(ROM);
			flags[0] |= 1 << 19;
		}

		if (ui.randomizeCastleItems.checked) {
			randomizeCastleItems(ROM);
			flags[0] |= 1 << 20;
		}

		if (ui.randomizeAnchorAbility.checked) {
			randomizeAnchorAbility(ROM);
			flags[0] |= 1 << 21;
		}

		if (ui.randomizeItemBlocks.checked) {
			randomizeItemBlocks(ROM);
			flags[0] |= 1 << 22;
		}

		if (ui.removeWarpWhistles.checked) {
			removeWarpWhistles(ROM);
			flags[0] |= 1 << 23;
		}

		if (ui.shuffleChestItems.checked) {
			shuffleChestItems(ROM);
			flags[0] |= 1 << 24;
		}

		if (ui.shuffleToadHouses.checked) {
			shuffleToadHouses(ROM);
			flags[0] |= 1 << 25;
		}

		if (ui.letHammerBreakLocks.checked) {
			letHammerBreakLocks(ROM);
			flags[0] |= 1 << 26;
		}

		if (ui.randomizeMusic.checked) {
			randomizeMusic(ROM);
			flags[0] |= 1 << 27;
		}

		if (ui.shuffleSfx.checked) {
			shuffleSfx(ROM);
			flags[0] |= 1 << 28;
		}

		if (ui.ohkoMode.checked) {
			setOHKOMode(ROM);
			flags[0] |= 1 << 29;
		}

		if (ui.alwaysRevertToSmall.checked) {
			setAlwaysRevertToSmall(ROM);
			flags[0] |= 1 << 30;
		}

		if (ui.infinitePSpeed.checked) {
			setInfinitePSpeed(ROM);
			flags[1] |= 1 << 31;
		}

		if (ui.randomizeEnemyPalettes.checked) {
			randomizeEnemyPalettes(ROM);
			flags[0] |= 1 << 0;
		}

		var changedStartingLives = false;
		if (ui.infiniteLives.checked) {
			if (ui.useDeathCounter.checked) {
				setUseDeathCounter(ROM);
				changedStartingLives = true;
			} else {
				setInfiniteLives(ROM);
				changedStartingLives = true;
			}
		} else {
			var lives = parseInt(ui.startingLives.value);
			if (lives !== 4) {
				setStartingLives(ROM, lives);
				changedStartingLives = true;
			}
		}

		var changedPermanentPowerup = false;
		var powerup = parseInt(ui.permanentPowerup.value);
		if (powerup !== -1) {
			setPermanentPowerup(ROM, powerup);
			changedPermanentPowerup = true;
		}

		var changedMarioColor = false;
		var marioColor = parseInt(ui.marioColor.value);
		if (marioColor !== -1) {
			setMarioColor(ROM, marioColor, parseInt(ui.marioComplexion.value));
			changedMarioColor = true;
		}

		if (flags[0] === 0 && flags[1] === 0) {
			ui.flagsInput.value = "";

			if (!changedMarioColor && 
				!changedStartingLives && 
				!changedPermanentPowerup && 

				!changedDebugMode) 
			{
				return false;
			}
		} else {
			var flagStr = btoa(flags[0].toString() + " " + flags[1].toString());
			ui.flagsInput.value = flagStr;
		}

		return true;
	},

	onRandomizeROM: function(file) {
		ui.randomizedFile = new Uint8Array(file);

		Math.seedrandom(ui.seedInput.value);
		return randomizer.randomize(ui.randomizedFile);
	},
}