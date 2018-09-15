var ui = {
	// static text
	manualTodo: [
		"Refine Enemy Randomizer",
	],

	changelogEntry: [
		{ date: new Date("2018-9-15"), text: "Implemented hammer ability to break fortress locks. This hack actually isn't stolen, see patch.allowHammerToBreakLocks in <a href=\"js/patch.js\">patch.js</a> for assembly documentation." },
		{ date: new Date("2018-9-14"), text: "Implemented music and sound effects randomizer." },
		{ date: new Date("2018-9-9"), text: "Implemented one hit K.O. mode and permanent powerups." },
		{ date: new Date("2018-9-7"), text: "Implemented Mario colors." },
		{ date: new Date("2018-9-5"), text: "Stole independent Koopaling HP hack." },
		{ date: new Date("2018-8-29"), text: "Implemented regular stage shuffle." },
		{ date: new Date("2018-8-28"), text: "Implemented enemy randomizer, but needs improvment. There are still a few incompatibilities that can occur and logical placement needs to be done)" },
		//{ date: new Date("2018-8-26"), text: "Added text editors for letters from Peach/Bowser at beginning of worlds" },
		//{ date: new Date("2018-8-25"), text: "Added text editors for Toad houses" },
		{ date: new Date("2018-8-24"), text: "Started this project." },
	],

	bugsEntry: [
		"Colors for fire, frog, tanooki and hammer suit arent used on the world map<br>" +
		"Colors set in PRG027's InitPals_Per_MapPUp<br>" +
		"Also note they agree with Map_PostJC_PUpPP1/2 in PRG010"
	],

	defaultToadHouseText: [
		" Pick a box.    Its contents   will help you  on your way.                                ",
		"One toot on    this whistle   will send you  to a far~away  land!                         ",
		" Hello! You     found my shop  of strange and wonderful      things!                      "
	],

	defaultWorldLetterText: [
		"If you see any|ghosts,be careful.|They will give chase|if you turn away.|I have enclosed a|jewel that helps|    protect you.",
		"You can stomp on|your enemies using|Goomba's shoe.|I have enclosed a|jewel that helps|    protect you.",
		"The White Block|contains magic|powers that will|enable you to defeat|your enemies.|I have enclosed a|jewel that helps|protect you.",
		"The thief who stole|the Whistle has|escaped to the east|side of the Sand|Dunes.|I have enclosed a|jewel that helps|protect you.",
		"Be careful in the|Ice World. The|creatures trapped in|the ice will come to|life if warmed.|I have enclosed a|jewel that helps|protect you.",
		"I am well. Please|retrieve the Magic|Whistle hidden in|the darkness at the|end of the Third|world. I have|enclosed a jewel|that helps|protect you."
	],

	defaultFinalLetterText: [
		"I kidnapped the|princess while you|were running around.|She's here in my|castle,if you dare|to try and rescue|    her."
	],

	// rom read buffers
	loadedToadHouseText: [
		" ".repeat(rom.toadHouseTextLength),
		" ".repeat(rom.toadHouseTextLength),
		" ".repeat(rom.toadHouseTextLength)
	],

	loadedToadKingText: [
		" ".repeat(rom.toadKingTextLength),
		" ".repeat(rom.toadKingTextLength),
		" ".repeat(rom.toadKingTextLength)
	],

	loadedWorldLetterText: [
		" ".repeat(rom.worldLetterTextLength[0]),
		" ".repeat(rom.worldLetterTextLength[1]),
		" ".repeat(rom.worldLetterTextLength[2]),
		" ".repeat(rom.worldLetterTextLength[3]),
		" ".repeat(rom.worldLetterTextLength[4]),
		" ".repeat(rom.worldLetterTextLength[5])
	],

	loadedFinalLetterText: " ".repeat(rom.finalLetterTextLength),

	// element references
	loadedFile: null,
	randomizedFile: null,

	unimplementedOptions: null,
	flaggableOptions: null,

	headerCanvas: null,
	changelogList: null,
	showChangelog: null,
	todoList: null,
	showTodo: null,
	bugsLabel: null,
	bugsList: null,
	showBugs: null,

	fileInput: null,
	fileInputBrowse: null,
	fileInputFilename: null,
	selectedFileOutput: null,
	selectedFileExtOutput: "",
	selectedFileNameOutput: "",
	seedInput: null,
	randomizeSeed: null,
	marioColor: null,
	marioComplexion: null,
	startingLives: null,
	infiniteLives: null,
	useDeathCounter: null,
	permanentPowerup: null,
	flagsInput: null,

	customizeText: null,
	customTextContainer: null,

	// these editors are functional but the results arent wrote to ROM yet
	generalToadHouseTextEditor: null,
	generalToadHouseTextDefaultButton: null,
	whistleToadHouseTextEditor: null,
	whistleToadHouseTextDefaultButton: null,
	worldLetterTextEditor: null,
	worldLetterTextDefaultButton: null,
	finalLetterTextEditor: null,
	finalLetterTextDefaultButton: null,
	
	// dont think i will make these editable because it would be so restrictive
	// they only have room for "greetings"/"princess toadstool" from peach
	// and "yo!"/"ha ha ha..."/"King of the Koopa" from bowser
	//worldLetterSalutationTextEditor: null,
	//finalLetterSalutationTextEditor: null,

	currentTab: -1,
	tabButtons: null,
	tabContent: null,

	shuffleRegularLevels: null,
	addLostStages: null,
	shuffleFortresses: null,
	shuffleWorld8Ships: null,
	shuffleCastles: null,
	randomizeHammerBroLevels: null,
	removeSomeAutoscrollers: null,
	removeShipAutoscrollers: null,
	shuffleOverworldPipes: null,
	shuffleWorldOrder: null,
	shuffleWarpZones: null,
	randomizeEnemies: null,
	randomizeKoopaEarthquakes: null,
	randomizeKoopaKidHP: null,
	randomizeHammerBros: null,
	shuffleNGame: null,
	shuffleNGamePrizes: null,
	randomizeCastleItems: null,
	randomizeAnchorAbility: null,
	randomizeItemBlocks: null,
	removeWarpWhistles: null,
	shuffleChestItems: null,
	shuffleToadHouses: null,
	letHammerBreakLocks: null,
	randomizeMusic: null,
	shuffleSfx: null,
	ohkoMode: null,
	alwaysRevertToSmall: null,
	infinitePSpeed: null,

	generateRom: null,
	lastGenerated: null,
	saveRom: null,
	generationStatus: null,
	generateSpoilers: null,

	spoilerBuffer: [],
	showSpoilerLog: null,
	spoilerLogContainer: null,
	spoilerLog: null,
	saveSpoilerLog: null,

	// todo
	onShowTODO: function() {
		ui.todoList.style.display = ui.showTodo.checked ? "block" : "none";
	},

	populateTODO: function() {
		for (var i = 0; i < ui.manualTodo.length; i++) {
			var li = document.createElement("li");
			let text = ui.manualTodo[i];
			li.appendChild(document.createTextNode(text));
			li.className = "todo-list-item";
			ui.todoList.appendChild(li);
		}

		for (var i = 0; i < ui.unimplementedOptions.length; i++) {
			var children = ui.unimplementedOptions[i].children;
			for (var j = 0; j < children.length; j++) {
				if (children[j].className === "option-text") {
					var li = document.createElement("li");
					let text = children[j].innerHTML;
					text = text.replaceAll("<i>", "").replaceAll("</i>", "");
					li.appendChild(document.createTextNode(text));
					li.className = "todo-list-item";
					ui.todoList.appendChild(li);
				}

				if (children[j].type === "checkbox") {
					children[j].disabled = true;
					children[j].checked = false;
				} else if (children[j].type === "select-one") {
					children[j].disabled = true;
				}

				if (children[j].className.includes("tooltip-text")) {
					children[j].innerHTML = "<b><i><u>UNIMPLEMENTED</u></i></b><br> " + children[j].innerHTML;
				}
			}

			ui.unimplementedOptions[i].style.display = "none";
		}
	},

	// changelog
	onShowChangelog: function() {
		ui.changelogList.style.display = ui.showChangelog.checked ? "block" : "none";
	},

	populateChangelog: function() {
		for (var i = 0; i < ui.changelogEntry.length; i++) {
			var month = ui.changelogEntry[i].date.getUTCMonth() + 1; //months from 1-12
			var day = ui.changelogEntry[i].date.getUTCDate();
			var year = ui.changelogEntry[i].date.getUTCFullYear();

			var li = document.createElement("li");
			li.innerHTML = "<i>" + year + "-" + month + "-" + day + "</i>: " + ui.changelogEntry[i].text;

  			ui.changelogList.appendChild(li);
		}
	},

	// bugs
	onShowBugs: function() {
		ui.bugsList.style.display = ui.showBugs.checked ? "block" : "none";
	},

	populateBugs: function() {
		if (getRandomInt(2) == 0) {
			ui.bugsLabel.innerHTML = "<b><i>Bugs</b></i>";
		}

		for (var i = 0; i < ui.bugsEntry.length; i++) {
			var li = document.createElement("li");

			li.innerHTML = ui.bugsEntry[i];

  			ui.bugsList.appendChild(li);
		}
	},

	// rom file
	onFileSelected: function() {
		ui.generateRom.disabled = ui.fileInputFilename.value !== "" ? false : true;
		ui.generateSpoilers.disabled = ui.generateRom.disabled;
		ui.onAnyOptionChanged();
	},

	onFileSelect: function(evt) {
		var fileList = evt.target.files;

		if (fileList.length > 0) {
			ui.selectedFileOutput = fileList[0].name;
			var lastDot = ui.selectedFileOutput.lastIndexOf('.');
			if (lastDot !== -1) {
				ui.selectedFileExtOutput = ui.selectedFileOutput.slice(lastDot, ui.selectedFileOutput.length);
				ui.selectedFileNameOutput = ui.selectedFileOutput.slice(0, lastDot);
				ui.fileInputFilename.value = fileList[0].name;
			}

			var fr = new FileReader();
			//fr.onloadend = ui.readROMFinished;
	        fr.onload = function() {
	        	if (fr.result === null) {
	        		console.log("error loading rom: file reader result is null");
	        		return;
	        	}

	        	ui.loadedFile = new Uint8Array(fr.result);

	        	// reads data from selected ROM file
	        	ui.onReadFromROM(ui.loadedFile);

	        	ui.onFileSelected();
	        };
	        fr.readAsArrayBuffer(fileList[0]);
		}
	},

	onReadFromROM: function(romFile) {
		let str = "";
    	for (var i = 0; i < rom.toadHouseTextLength; i++) {
    		var ch = romFile[rom.toadHouseTextPointer[ToadHouseType.General]+i];
    		str += rom.fromRawCharMainText(ch);
    	}
    	ui.setGeneralToadHouseText(str);

    	str = "";
    	for (var i = 0; i < rom.toadHouseTextLength; i++) {
    		var ch = romFile[rom.toadHouseTextPointer[ToadHouseType.Whistle]+i];
    		str += rom.fromRawCharMainText(ch);
    	}
    	ui.setWhistleToadHouseText(str);

    	str = "";
    	for (var i = 0; i < rom.toadHouseTextLength; i++) {
    		var ch = romFile[rom.toadHouseTextPointer[ToadHouseType.Strange]+i];
    		str += rom.fromRawCharMainText(ch);
    	}
    	ui.setStrangeToadHouseText(str);

    	/* for testing 
    	str = "";
    	for (i = 0; i < rom.toadHouseTextLength; i++) {
    		var ch = rom.file[rom.peachPavedTextPointer+i];
    		str += rom.fromRawCharMainText(ch);
    	}

    	console.log("peachPavedText: " + str);
    	ui.setStrangeToadHouseText(str);
    	*/
	},

	// seed
	onRandomSeed: function() {
		ui.seedInput.value = getRandomInt(0xFFFFFFFF).toString(10);
		ui.onAnyOptionChanged();
	},

	// mario color
	onMarioColorChanged: function() {
		if (ui.marioColor.value === "-1" || ui.marioColor.value === "256") {
			ui.marioComplexion.disabled = true;
		} else {
			ui.marioComplexion.disabled = false;
		}
	},

	// infinite lives
	onInfiniteLivesChecked: function() {
		ui.startingLives.disabled = ui.infiniteLives.checked;
		ui.useDeathCounter.disabled = !ui.infiniteLives.checked;
	},

	// permanent powerups
	onPermanentPowerupChanged: function() {
		if (ui.permanentPowerup.value !== "-1") {
			ui.ohkoMode.checked = true;
			ui.ohkoMode.disabled = true;
		} else {
			ui.ohkoMode.checked = false;
			ui.ohkoMode.disabled = false;
		}

		if (ui.permanentPowerup.value === "256" || ui.permanentPowerup.value === "257") {
			ui.infinitePSpeed.checked = true;
			ui.infinitePSpeed.disabled = true;
		} else {
			ui.infinitePSpeed.checked = false;
			ui.infinitePSpeed.disabled = false;
		}

		ui.onFlaggableOptionChanged();
	},

	// flags
	onFlagsFocusOut: function() {
		var falgsValid = ui.onFlagsChanged();
		if (!falgsValid) {
			ui.onFlaggableOptionChanged();
		}
	},

	onFlaggableOptionChanged: function() {
		var flags = 0;

		if (ui.shuffleRegularStages.checked) {
			flags |= 1 << 1;
		}

		if (ui.addLostStages.checked) {
			flags |= 1 << 2;
		}

		if (ui.shuffleFortresses.checked) {
			flags |= 1 << 3;
		}

		if (ui.shuffleWorld8Ships.checked) {
			flags |= 1 << 4;
		}

		if (ui.shuffleCastles.checked) {
			flags |= 1 << 5;
		}

		if (ui.randomizeHammerBroLevels.checked) {
			flags |= 1 << 6;
		}

		if (ui.removeSomeAutoscrollers.checked) {
			flags |= 1 << 7;
		}

		if (ui.removeShipAutoscrollers.checked) {
			flags |= 1 << 8;
		}

		if (ui.shuffleOverworldPipes.checked) {
			flags |= 1 << 9;
		}

		if (ui.shuffleWorldOrder.checked) {
			flags |= 1 << 10;
		}

		if (ui.shuffleWarpZones.checked) {
			flags |= 1 << 11;
		}

		if (ui.randomizeEnemies.checked) {
			flags |= 1 << 12;
		}

		if (ui.randomizeKoopaEarthquakes.checked) {
			flags |= 1 << 13;
		}

		if (ui.randomizeKoopaKidHP.checked) {
			flags |= 1 << 14;
		}

		if (ui.randomizeHammerBros.checked) {
			flags |= 1 << 15;
		}

		if (ui.shuffleNGame.checked) {
			flags |= 1 << 16;
		}

		if (ui.shuffleNGamePrizes.checked) {
			flags |= 1 << 17;
		}

		if (ui.randomizeCastleItems.checked) {
			flags |= 1 << 18;
		}

		if (ui.randomizeAnchorAbility.checked) {
			flags |= 1 << 19;
		}

		if (ui.randomizeItemBlocks.checked) {
			flags |= 1 << 20;
		}

		if (ui.removeWarpWhistles.checked) {
			flags |= 1 << 21;
		}

		if (ui.shuffleChestItems.checked) {
			flags |= 1 << 22;
		}

		if (ui.shuffleToadHouses.checked) {
			flags |= 1 << 23;
		}

		if (ui.letHammerBreakLocks.checked) {
			flags |= 1 << 24;
		}

		if (ui.randomizeMusic.checked) {
			flags |= 1 << 25;
		}

		if (ui.shuffleSfx.checked) {
			flags |= 1 << 26;
		}

		if (ui.ohkoMode.checked) {
			flags |= 1 << 27;
		}

		if (ui.alwaysRevertToSmall.checked) {
			flags |= 1 << 28;
		}

		if (ui.infinitePSpeed.checked) {
			flags |= 1 << 29;
		}

		var changedStartingLives = false;
		if (parseInt(ui.startingLives.value) !== 4) {
			changedStartingLives = true;
		}

		var changedMarioColor = false;
		if (parseInt(ui.marioColor.value) !== -1) {
			changedMarioColor = true;
		}

		if (flags === 0) {
			ui.flagsInput.value = "";

			if (!changedStartingLives && !changedMarioColor) {
				false;
			}
		} else {
			var flagStr = btoa(flags.toString());
			ui.flagsInput.value = flagStr;
		}

		ui.onAnyOptionChanged();
	},

	onFlagsChanged: function() {
		//if (ui.flagsInput.value === "") {
		//	return;
		//}

		var flags;
		try {
			flags = atob(ui.flagsInput.value);
		} catch {
			return false;
		}

		var flags = parseInt(atob(ui.flagsInput.value));

		for (var i = 0; i < ui.flaggableOptions.length; i++) {
			ui.flaggableOptions[i].checked = false;
		}
		
		if (flags & (1 << 1)) {
			if (!ui.shuffleRegularStages.disabled) {
				ui.shuffleRegularStages.checked = true;
			}
		}

		if (flags & (1 << 2)) {
			if (!ui.addLostStages.disabled) {
				ui.addLostStages.checked = true;
			}
		}

		if (flags & (1 << 3)) {
			if (!ui.shuffleFortresses.disabled) {
				ui.shuffleFortresses.checked = true;
			}
		}

		if (flags & (1 << 4)) {
			if (!ui.shuffleWorld8Ships.disabled) {
				ui.shuffleWorld8Ships.checked = true;
			}
		}

		if (flags & (1 << 5)) {
			if (!ui.shuffleCastles.disabled) {
				ui.shuffleCastles.checked = true;
			}
		}

		if (flags & (1 << 6)) {
			if (!ui.randomizeHammerBroLevels.disabled) {
				ui.randomizeHammerBroLevels.checked = true;
			}
		}

		if (flags & (1 << 7)) {
			if (!ui.removeSomeAutoscrollers.disabled) {
				ui.removeSomeAutoscrollers.checked = true;
			}
		}

		if (flags & (1 << 8)) {
			if (!ui.removeShipAutoscrollers.disabled) {
				ui.removeShipAutoscrollers.checked = true;
			}
		}

		if (flags & (1 << 9)) {
			if (!ui.shuffleOverworldPipes.disabled) {
				ui.shuffleOverworldPipes.checked = true;
			}
		}

		if (flags & (1 << 10)) {
			if (!ui.shuffleWorldOrder.disabled) {
				ui.shuffleWorldOrder.checked = true;
			}
		}

		if (flags & (1 << 11)) {
			if (!ui.shuffleWarpZones.disabled) {
				ui.shuffleWarpZones.checked = true;
			}
		}

		if (flags & (1 << 12)) {
			if (!ui.randomizeEnemies.disabled) {
				ui.randomizeEnemies.checked = true;
			}
		}

		if (flags & (1 << 13)) {
			if (!ui.randomizeKoopaEarthquakes.disabled) {
				ui.randomizeKoopaEarthquakes.checked = true;
			}
		}

		if (flags & (1 << 14)) {
			if (!ui.randomizeKoopaKidHP.disabled) {
				ui.randomizeKoopaKidHP.checked = true;
			}
		}

		if (flags & (1 << 15)) {
			if (!ui.randomizeHammerBros.disabled) {
				ui.randomizeHammerBros.checked = true;
			}
		}

		if (flags & (1 << 16)) {
			if (!ui.shuffleNGame.disabled) {
				ui.shuffleNGame.checked = true;
			}
		}

		if (flags & (1 << 17)) {
			if (!ui.shuffleNGamePrizes.disabled) {
				ui.shuffleNGamePrizes.checked = true;
			}
		}

		if (flags & (1 << 18)) {
			if (!ui.randomizeCastleItems.disabled) {
				ui.randomizeCastleItems.checked = true;
			}
		}

		if (flags & (1 << 19)) {
			if (!ui.randomizeAnchorAbility.disabled) {
				ui.randomizeAnchorAbility.checked = true;
			}
		}

		if (flags & (1 << 20)) {
			if (!ui.randomizeItemBlocks.disabled) {
				ui.randomizeItemBlocks.checked = true;
			}
		}

		if (flags & (1 << 21)) {
			if (!ui.removeWarpWhistles.disabled) {
				ui.removeWarpWhistles.checked = true;
			}
		}

		if (flags & (1 << 22)) {
			if (!ui.shuffleChestItems.disabled) {
				ui.shuffleChestItems.checked = true;
			}
		}

		if (flags & (1 << 23)) {
			if (!ui.shuffleToadHouses.disabled) {
				ui.shuffleToadHouses.checked = true;
			}
		}

		if (flags & (1 << 24)) {
			if (!ui.letHammerBreakLocks.disabled) {
				ui.letHammerBreakLocks.checked = true;
			}
		}

		if (flags & (1 << 25)) {
			if (!ui.randomizeMusic.disabled) {
				ui.randomizeMusic.checked = true;
			}
		}

		if (flags & (1 << 26)) {
			if (!ui.shuffleSfx.disabled) {
				ui.shuffleSfx.checked = true;
			}
		}

		if (flags & (1 << 27)) {
			if (!ui.ohkoMode.disabled) {
				ui.ohkoMode.checked = true;
			}
		}

		if (flags & (1 << 28)) {
			if (!ui.alwaysRevertToSmall.disabled) {
				ui.alwaysRevertToSmall.checked = true;
			}
		}

		if (flags & (1 << 29)) {
			if (!ui.infinitePSpeed.disabled) {
				ui.infinitePSpeed.checked = true;
			}
		}

		ui.onAnyOptionChanged();

		return true;
	},

	// text editors
	setGeneralToadHouseText: function(text) {
		var defaultChunks = text.split(rom.toadHouseLineLength);
		if (defaultChunks.length > 0) {
			for (var i = 0; i < ui.generalToadHouseTextEditor.length; i++) {
				ui.generalToadHouseTextEditor[i].value = defaultChunks[i];
			}
		} else {
			console.log("error setting general toad house text: regexp failed to find chunks");
		}
	},

	setWhistleToadHouseText: function(text) {
		var defaultChunks = text.split(rom.toadHouseLineLength);
		if (defaultChunks.length > 0) {
			for (var i = 0; i < ui.whistleToadHouseTextEditor.length; i++) {
				ui.whistleToadHouseTextEditor[i].value = defaultChunks[i];
			}
		} else {
			console.log("error setting whistle toad house text: regexp failed to find chunks");
		}
	},

	setStrangeToadHouseText: function(text) {
		var defaultChunks = text.split(rom.toadHouseLineLength);
		if (defaultChunks.length > 0) {
			for (var i = 0; i < ui.strangeToadHouseTextEditor.length; i++) {
				ui.strangeToadHouseTextEditor[i].value = defaultChunks[i];
			}
		} else {
			console.log("error setting strange toad house text: regexp failed to find chunks");
		}
	},

	setWorldLetterText: function(index, text) {
		ui.worldLetterTextEditor[index].value = text;
	},

	setFinalLetterText: function(text) {
		ui.finalLetterTextEditor.value = text;
	},

	onCustomizeText: function() {
		ui.customTextContainer.style.display = ui.customizeText.checked ? "block" : "none";
	},

	// tab options
	onAnyOptionChanged: function() {
		if (ui.fileInputFilename.value !== "") {
			ui.setGenerationStatus("Ready", "#007F00");
		}
	},

	setTab: function(tabIndex) {
		if (tabIndex === ui.currentTab) {
			return;
		}

		for (var i = 0; i < ui.tabContent.length; i++) {
			ui.tabContent[i].style.display = "none";
		}

		for (var i = 0; i < ui.tabButtons.length; i++) {
			ui.tabButtons[i].className = ui.tabButtons[i].className.replace(" active", "");
		}

		ui.tabContent[tabIndex].style.display = "block";
		ui.tabButtons[tabIndex].className = ui.tabButtons[tabIndex].className += " active";

		ui.currentTab = tabIndex;
	},

	// rom generation
	onSaveROM: function() {
		var outputName = ui.selectedFileNameOutput + "-" + ui.seedInput.value + 
						((ui.flagsInput.value !== "") ? "-" : "") + encodeURIComponent(ui.flagsInput.value) + 
						ui.selectedFileExtOutput;
		downloadBlob(
			ui.randomizedFile, 
			outputName, 
			"application/" + ui.selectedFileExtOutput
		);
	},

	setGenerationStatus: function(text, color) {
		ui.generationStatus.innerHTML = "<i>" + text + "</i>";
		ui.generationStatus.style.color = color;
	},

	// spoilers
	popSpoiler: function() {
		ui.spoilerBuffer.pop();
	},

	addSpoiler: function(line = "") {
		if (ui.generateSpoilers.checked === true) {
			ui.spoilerBuffer.push(line);
			ui.showSpoilerLog.disabled = false;
			ui.saveSpoilerLog.disabled = false;
		}
	},

	clearSpoilers: function() {
		ui.spoilerBuffer.scrollTop = 0;
		ui.spoilerBuffer = [];
		ui.spoilerLog.innerHTML = "";
		ui.showSpoilerLog.disabled = true;
		ui.saveSpoilerLog.disabled = true;
	},

	onShowSpoilerLog: function() {
		if (ui.showSpoilerLog.checked) {
			var tmpStr = "";
			for (var i = 0; i < ui.spoilerBuffer.length; i++) {
				tmpStr += ui.spoilerBuffer[i] + "\n";
			}

			ui.spoilerLog.innerHTML = tmpStr;
			ui.spoilerLogContainer.style.display = "block";
		} else {
			ui.spoilerLogContainer.style.display = "none";
			ui.spoilerLog.innerHTML = "";
		}
	},

	saveSpoilers: function() {
		downloadBlob(
			ui.spoilerLog.textContent, 
			ui.selectedFileNameOutput + "-" + ui.seedInput.value + "-" + encodeURIComponent(ui.flagsInput.value) + "_spoilers.txt", 
			"application/text"
		);
	},

	// general ui
	registerUIEvents: function() {
		ui.showChangelog.addEventListener("change", function() { 
			ui.onShowChangelog();
		});

		ui.showTodo.addEventListener("change", function() { 
			ui.onShowTODO();
		});

		ui.showBugs.addEventListener("change", function() { 
			ui.onShowBugs();
		});

		ui.fileInput.addEventListener("change", ui.onFileSelect, false);
		ui.fileInputBrowse.addEventListener("click", function() {
			ui.fileInput.click();
		});

		ui.randomizeSeed.addEventListener("click", function() { 
			ui.onRandomSeed();
			ui.onAnyOptionChanged();
		});

		ui.seedInput.addEventListener("keydown", function() {
			ui.onAnyOptionChanged();
		});

		ui.marioColor.addEventListener("change", function() {
			ui.onMarioColorChanged();
			ui.onAnyOptionChanged();
		});

		ui.marioComplexion.addEventListener("change", function() {
			ui.onAnyOptionChanged();
		});

		ui.infiniteLives.addEventListener("change", function() {
			ui.onInfiniteLivesChecked();
			ui.onAnyOptionChanged();
		});

		ui.permanentPowerup.addEventListener("change", function() {
			ui.onPermanentPowerupChanged();
			ui.onAnyOptionChanged();
		});

		ui.flagsInput.addEventListener("input", function() { 
			ui.onFlagsChanged();
		});

		ui.flagsInput.addEventListener("focusout", function() { 
			ui.onFlagsFocusOut(); 
		});

		for (var i = 0; i < ui.tabButtons.length; i++) {
			let tabIndex = i;
			ui.tabButtons[i].addEventListener("click", function() { 
				ui.setTab(tabIndex); 
			});
		}

		for (var i = 0; i < ui.flaggableOptions.length; i++) {
			ui.flaggableOptions[i].addEventListener("change", function() { 
				ui.onFlaggableOptionChanged();
			});
		}

		ui.customizeText.addEventListener("change", function() { 
			ui.onCustomizeText(); 
		});

		for (var i = 0; i < ui.generalToadHouseTextEditor.length; i++) {
			let index = i;
			ui.generalToadHouseTextEditor[i].maxLength = rom.toadHouseLineLength;
			ui.generalToadHouseTextEditor[i].addEventListener("keyup", function() { 
				this.value = this.value.replace(mainTextRegExp, '');
				rom.loadedToadHouseText[index] = this.value;
			});
		}
		ui.generalToadHouseTextDefaultButton.addEventListener("click", function() { 
			ui.setGeneralToadHouseText(ui.defaultToadHouseText[ToadHouseType.General]);
		});

		for (var i = 0; i < ui.whistleToadHouseTextEditor.length; i++) {
			let index = i;
			ui.whistleToadHouseTextEditor[i].maxLength = rom.toadHouseLineLength;
			ui.whistleToadHouseTextEditor[i].addEventListener("keyup", function() { 
				this.value = this.value.replace(mainTextRegExp, '');
				rom.loadedToadHouseText[index] = this.value;
			});
		}
		ui.whistleToadHouseTextDefaultButton.addEventListener("click", function() { 
			ui.setWhistleToadHouseText(ui.defaultToadHouseText[ToadHouseType.Whistle]);
		});

		for (var i = 0; i < ui.strangeToadHouseTextEditor.length; i++) {
			let index = i;
			ui.strangeToadHouseTextEditor[i].maxLength = rom.toadHouseLineLength;
			ui.strangeToadHouseTextEditor[i].addEventListener("keyup", function() { 
				this.value = this.value.replace(mainTextRegExp, '');
				rom.loadedToadHouseText[index] = this.value;
			});
		}
		ui.strangeToadHouseTextDefaultButton.addEventListener("click", function() { 
			ui.setStrangeToadHouseText(ui.defaultToadHouseText[ToadHouseType.Strange]);
		});

		for (var i = 0; i < ui.worldLetterTextEditor.length; i++) {
			ui.worldLetterTextEditor[i].maxLength = rom.worldLetterTextLength[i]-1;
			ui.setWorldLetterText(i, ui.defaultWorldLetterText[i]);
			let index = i;
			ui.worldLetterTextEditor[i].addEventListener("keyup", function() { 
				this.value = this.value.replace(mainTextRegExp, '');
				rom.loadedWorldLetterText[index] = this.value;
			});
			ui.worldLetterTextDefaultButton[i].addEventListener("click", function() { 
				ui.setWorldLetterText(index, ui.defaultWorldLetterText[index]);
			});
		}

		ui.finalLetterTextEditor.maxLength = rom.finalLetterTextLength-1;
		ui.setFinalLetterText(rom.defaultFinalLetterText);
		ui.finalLetterTextEditor.addEventListener("keyup", function() { 
			this.value = this.value.replace(mainTextRegExp, '');
			rom.loadedFinalLetterText = this.value;
		});
		ui.finalLetterTextDefaultButton.addEventListener("click", function() { 
			ui.setFinalLetterText(ui.defaultFinalLetterText);
		});

		ui.generateRom.addEventListener("click", function() {
			if (ui.loadedFile === null || ui.loadedFile === undefined) {
				alert("Error generating randomized ROM: input ROM file is null");
				return;
			}

			if (ui.seedInput.value === "") {
				ui.onRandomSeed();
			} 

			ui.setGenerationStatus("Generating...", "#00007F");

			ui.clearSpoilers();

			// set timeout to 250ms otherwise HTML isnt updated before this is actually called
			// works at as little as 100ms but i give it some extra time
			setTimeout(function() {	
				if (randomizer.onRandomizeROM(ui.loadedFile)) {
					ui.spoilerLog.scrollTop = 0;
					ui.saveRom.disabled = false;
					ui.setGenerationStatus("Done", "#007F00");
					ui.lastGenerated.innerHTML = ui.selectedFileNameOutput + "-" + ui.seedInput.value + 
						((ui.flagsInput.value !== "") ? "-" : "") + encodeURIComponent(ui.flagsInput.value);
					ui.onShowSpoilerLog();
				} else {
					alert("Nothing to randomize");
					ui.setGenerationStatus("Ready", "#007F00");
				}
			}, 250);
		});

		ui.saveRom.addEventListener("click", function() {
			ui.onSaveROM();
		});

		ui.showSpoilerLog.addEventListener("change", function() { 
			ui.onShowSpoilerLog();
		});

		ui.saveSpoilerLog.addEventListener("click", function() {
			ui.saveSpoilers();
		});
	},

	initialzeValues: function() {
		// populate Changelog List
		ui.populateChangelog();

		// populate TODO list
		ui.populateTODO();

		// populate bugs list
		ui.populateBugs();

		ui.setGeneralToadHouseText(ui.defaultToadHouseText[ToadHouseType.General]);
		ui.setWhistleToadHouseText(ui.defaultToadHouseText[ToadHouseType.Whistle]);
		ui.setStrangeToadHouseText(ui.defaultToadHouseText[ToadHouseType.Strange]);

		if (ui.showChangelog.checked) {
			ui.onShowChangelog();
		}
		if (ui.showTodo.checked) {
			ui.onShowTODO();
		}
		if (ui.showBugs.checked) {
			ui.onShowBugs();
		}
		if (ui.customizeText.checked) {
			ui.onCustomizeText();
		}

		ui.setTab(0);

		ui.fileInputFilename.value = "";
		ui.fileInput.value = "";

		ui.generateRom.disabled = true;
		ui.generateSpoilers.disabled = true;
		ui.generateSpoilers.checked = true;
		ui.saveRom.disabled = true;
		
		// textarea needs to be visible for scrollTop to work
		ui.spoilerLogContainer.style.display = "block";
		ui.spoilerLog.scrollTop = 0;

		ui.clearSpoilers();
		ui.showSpoilerLog.checked = false;
		ui.showSpoilerLog.disabled = true;
		ui.saveSpoilerLog.disabled = true;
		ui.onShowSpoilerLog();

		ui.onMarioColorChanged();
		ui.onInfiniteLivesChecked();
		ui.onPermanentPowerupChanged();

		ui.setGenerationStatus("Need input ROM", "#7F0000");
	},

	initialize: function() {
		// dont store this, its only used to show the page when javascript is working
		document.getElementById("javascript-enabled").style.display = "block";

		// store ui elements
		ui.headerCanvas = document.getElementById("header-canvas");

		ui.unimplementedOptions = document.getElementsByClassName("unimplemented");

		ui.changelogList = document.getElementById("changelog-list");
		ui.showChangelog = document.getElementById("show-changelog");

		ui.todoList = document.getElementById("todo-list");
		ui.showTodo = document.getElementById("show-todo");

		ui.bugsList = document.getElementById("bugs-list");
		ui.showBugs = document.getElementById("show-bugs");
		ui.bugsLabel = document.getElementById("bugs-label");

		ui.fileInput = document.getElementById("file-input");
		ui.fileInputBrowse = document.getElementById("file-input-browse");
		ui.fileInputFilename = document.getElementById("file-input-filename");;
		ui.selectedFileOutput = document.getElementById("selected-file");
		ui.randomizeSeed = document.getElementById("randomize-seed");
		ui.seedInput = document.getElementById("seed-input");
		ui.flagsInput = document.getElementById("flags-input");
		ui.flaggableOptions = document.getElementsByClassName("flaggable");

		ui.startingLives = document.getElementById("starting-lives-input");
		ui.infiniteLives = document.getElementById("infinite-lives");
		ui.useDeathCounter = document.getElementById("use-death-counter");
		ui.marioColor = document.getElementById("mario-color");
		ui.marioComplexion = document.getElementById("mario-complexion");
		ui.permanentPowerup = document.getElementById("permanent-powerup");

		ui.customizeText = document.getElementById("customize-text");
		ui.customTextContainer = document.getElementById("custom-text-container");
		ui.generalToadHouseTextEditor = document.getElementsByClassName("general-toad-house-text-editor");
		ui.generalToadHouseTextDefaultButton = document.getElementById("general-toad-house-text-default");
		ui.whistleToadHouseTextEditor = document.getElementsByClassName("whistle-toad-house-text-editor");
		ui.whistleToadHouseTextDefaultButton  = document.getElementById("whistle-toad-house-text-default");
		ui.strangeToadHouseTextEditor = document.getElementsByClassName("strange-toad-house-text-editor");
		ui.strangeToadHouseTextDefaultButton  = document.getElementById("strange-toad-house-text-default");

		ui.worldLetterTextEditor = document.getElementsByClassName("world-letter-text-editor");
		ui.worldLetterTextDefaultButton  = document.getElementsByClassName("world-letter-text-default");
		ui.finalLetterTextEditor = document.getElementById("final-letter-text-editor");
		ui.finalLetterTextDefaultButton  = document.getElementById("final-letter-text-default");

		ui.tabButtons = document.getElementsByClassName("tab");
		ui.tabContent = document.getElementsByClassName("tab-content");

		ui.shuffleRegularStages = document.getElementById("shuffle-regular-stages");
		ui.addLostStages = document.getElementById("add-lost-stages");
		ui.shuffleFortresses = document.getElementById("shuffle-fortresses");
		ui.shuffleWorld8Ships = document.getElementById("shuffle-world-8-ships");
		ui.shuffleCastles = document.getElementById("shuffle-castles");
		ui.randomizeHammerBroLevels = document.getElementById("random-hammer-bros-levels");
		ui.removeSomeAutoscrollers = document.getElementById("remove-some-autoscrollers");
		ui.removeShipAutoscrollers = document.getElementById("remove-ship-autoscrollers");
		ui.shuffleOverworldPipes = document.getElementById("shuffle-overworld-pipes");
		ui.shuffleWorldOrder = document.getElementById("shuffle-world-order");
		ui.shuffleWarpZones = document.getElementById("shuffle-warp-zones");

		ui.randomizeEnemies = document.getElementById("randomize-enemies");
		ui.randomizeKoopaEarthquakes = document.getElementById("randomize-koopa-earthquakes");
		ui.randomizeKoopaKidHP = document.getElementById("randomize-koopa-kid-HP");
		ui.randomizeHammerBros = document.getElementById("randomize-hammer-bros");

		ui.shuffleNGame = document.getElementById("shuffle-n-game");
		ui.shuffleNGamePrizes = document.getElementById("randomize-n-game-prizes");
		ui.randomizeCastleItems = document.getElementById("randomize-castle-items");
		ui.randomizeAnchorAbility = document.getElementById("randomize-anchor-ability");
		ui.randomizeItemBlocks = document.getElementById("randomize-item-blocks");
		ui.removeWarpWhistles = document.getElementById("remove-warp-whistles");
		ui.shuffleChestItems = document.getElementById("shuffle-chest-items");
		ui.shuffleToadHouses = document.getElementById("shuffle-toad-houses");
		ui.letHammerBreakLocks = document.getElementById("let-hammer-break-locks");

		ui.randomizeMusic = document.getElementById("randomize-music");
		ui.shuffleSfx = document.getElementById("shuffle-sfx");
		ui.ohkoMode = document.getElementById("ohko-mode");
		ui.alwaysRevertToSmall = document.getElementById("always-revert-to-small");
		ui.infinitePSpeed = document.getElementById("infinite-p-speed");

		ui.generateRom = document.getElementById("generate-rom");
		ui.lastGenerated = document.getElementById("last-generated");
		ui.saveRom = document.getElementById("save-rom");
		ui.generationStatus = document.getElementById("generation-status");
		ui.generateSpoilers = document.getElementById("generate-spoilers");

		ui.showSpoilerLog = document.getElementById("show-spoiler-log");
		ui.spoilerLogContainer = document.getElementById("spoiler-log-container");
		ui.spoilerLog = document.getElementById("spoiler-log");
		ui.saveSpoilerLog = document.getElementById("save-spoiler-log");

		// register event listeners
		ui.registerUIEvents();

		// set some initial values
		ui.initialzeValues();
	},
};
