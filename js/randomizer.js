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

		var flags = 0;

		if (ui.shuffleRegularStages.checked) {
			shuffleRegularStages(ROM);
			flags |= 1 << 0;
		}

		if (ui.addLostStages.checked) {
			addLostStages(ROM);
			flags |= 1 << 1;
		}

		if (ui.shuffleFortresses.checked) {
			shuffleFortresses(ROM);
			flags |= 1 << 2;
		}

		if (ui.shuffleWorld8Ships.checked) {
			shuffleWorld8Ships(ROM);
			flags |= 1 << 3;
		}

		if (ui.shuffleCastles.checked) {
			shuffleCastles(ROM);
			flags |= 1 << 4;
		}

		if (ui.randomizeHammerBroLevels.checked) {
			randomizeHammerBroLevels(ROM);
			flags |= 1 << 5;
		}

		if (ui.removeSomeAutoscrollers.checked) {
			removeSomeAutoscrollers(ROM);
			flags |= 1 << 6;
		}

		if (ui.removeBonusAutoscrollers.checked) {
			removeBonusAutoscrollers(ROM);
			flags |= 1 << 7;
		}

		if (ui.removeShipAutoscrollers.checked) {
			removeShipAutoscrollers(ROM);
			flags |= 1 << 8;
		}

		if (ui.shuffleOverworldPipes.checked) {
			shuffleOverworldPipes(ROM);
			flags |= 1 << 9;
		}

		if (ui.shuffleWorldOrder.checked) {
			shuffleWorldOrder(ROM);
			flags |= 1 << 10;
		}

		if (ui.shuffleWarpZones.checked) {
			shuffleWarpZones(ROM);
			flags |= 1 << 11;
		}

		if (ui.shuffleWorldPalettes.checked) {
			shuffleWorldPalettes(ROM);
			flags |= 1 << 12;
		}

		if (ui.randomizeWorldPalettes.checked) {
			randomizeWorldPalettes(ROM);
			flags |= 1 << 13;
		}

		if (ui.randomizeEnemies.checked) {
			randomizeEnemies(ROM);
			flags |= 1 << 14;
		}

		if (ui.randomizeKoopaEarthquakes.checked) {
			randomizeKoopaEarthquakes(ROM);
			flags |= 1 << 15;
		}

		if (ui.randomizeKoopaKidHP.checked) {
			randomizeKoopaKidHP(ROM);
			flags |= 1 << 16;
		}

		if (ui.randomizeHammerBros.checked) {
			randomizeHammerBros(ROM);
			flags |= 1 << 17;
		}

		if (ui.shuffleNGame.checked) {
			shuffleNGame(ROM);
			flags |= 1 << 18;
		}

		if (ui.shuffleNGamePrizes.checked) {
			shuffleNGamePrizes(ROM);
			flags |= 1 << 19;
		}

		if (ui.randomizeCastleItems.checked) {
			randomizeCastleItems(ROM);
			flags |= 1 << 20;
		}

		if (ui.randomizeAnchorAbility.checked) {
			randomizeAnchorAbility(ROM);
			flags |= 1 << 21;
		}

		if (ui.randomizeItemBlocks.checked) {
			randomizeItemBlocks(ROM);
			flags |= 1 << 22;
		}

		if (ui.removeWarpWhistles.checked) {
			removeWarpWhistles(ROM);
			flags |= 1 << 23;
		}

		if (ui.shuffleChestItems.checked) {
			shuffleChestItems(ROM);
			flags |= 1 << 24;
		}

		if (ui.shuffleToadHouses.checked) {
			shuffleToadHouses(ROM);
			flags |= 1 << 25;
		}

		if (ui.letHammerBreakLocks.checked) {
			letHammerBreakLocks(ROM);
			flags |= 1 << 26;
		}

		if (ui.randomizeMusic.checked) {
			randomizeMusic(ROM);
			flags |= 1 << 27;
		}

		if (ui.shuffleSfx.checked) {
			shuffleSfx(ROM);
			flags |= 1 << 28;
		}

		if (ui.ohkoMode.checked) {
			setOHKOMode(ROM);
			flags |= 1 << 29;
		}

		if (ui.alwaysRevertToSmall.checked) {
			setAlwaysRevertToSmall(ROM);
			flags |= 1 << 30;
		}

		if (ui.infinitePSpeed.checked) {
			setInfinitePSpeed(ROM);
			flags |= 1 << 31;
		}

		// if this gets to 52 bits, will need a new variable

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

		if (flags === 0) {
			ui.flagsInput.value = "";

			if (!changedMarioColor && 
				!changedStartingLives && 
				!changedPermanentPowerup && 

				!changedDebugMode) 
			{
				return false;
			}
		} else {
			var flagStr = btoa(flags.toString());
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