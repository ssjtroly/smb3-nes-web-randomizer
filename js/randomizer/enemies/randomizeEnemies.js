function getVerticalPage(y) {
	if (y < 0x02) {
		return -1;
	}

	return Math.floor((y-2)/12);
}

var lakituPlaced = 0;
function getRandomEnemyOnRegularLevel(clan, group, originalEnemy, x, y, nextEnemy, lastX, nextX, levelHasLakitu) {
	var randomEnemy = { object: null, x: null, y: null };

	var objs = null;
	if ((originalEnemy.type & (EnemyType.Any & ~EnemyType.Piranha)) !== 0) {
		// check if lakitu is appropriate
		if (!levelHasLakitu) {
			var lakituObject = rom.getEnemyObject(0x83);
			if (clan === lakituObject.clan && group === lakituObject.group) {
				if (getRandomInt(10) === 0) { // possibly add lakitu
					randomEnemy.object = lakituObject;
					randomEnemy.x = x;

					// place at the top of whichever vertical page the original enemy appears
					var vPage = getVerticalPage(y);
					if (vPage === 0) {
						// +2 to add room to see the spiny being thrown
						randomEnemy.y = (vPage*12)+2+2;
					} else if (vPage > 0) {
						// +2 to add room to see the spiny being thrown
						// another +2 because levels spilt up vertically 
						// usually have 2 tiles of blocks between the layers
						randomEnemy.y = (vPage*12)+2+4;
					} else {
						randomEnemy.y = 0x02+4;
					}

					return randomEnemy;
				}
			}
		}

		objs = rom.getEnemyObjectsWithProperty(function(obj) {
			// get all enemy objects that match this invocation's clan and group
			if (obj.hasOwnProperty("clan") && obj.hasOwnProperty("group")) {
				if (obj.clan === clan && obj.group === group) {
					return true;
				}
			}

			return false;
		}, EnemyType.Enemy);
	}
	else if (originalEnemy.type === EnemyType.Piranha) {
		objs = rom.getEnemyObjectsWithProperty(function(obj) {
			// get all enemy piranhas that match original enemies orientation
			if (obj.hasOwnProperty("orientation")) {
				if (obj.orientation === originalEnemy.orientation) {
					// and make sure piranha's clan and group is not 
					// incompatible with invocation's clan and group
					if (obj.hasOwnProperty("clan") && obj.hasOwnProperty("group")) {
						if (obj.clan === clan && obj.group === group) {
							return true;
						}
					}
				}
			}

			return false;
		}, EnemyType.Piranha);
	}

	if (objs !== null && objs.length > 0) {
		var randomObjIndex = getRandomInt(objs.length);
		var randomEnemyObject = objs[randomObjIndex];

		randomEnemy.object = randomEnemyObject;
		randomEnemy.x = x;

		// specialize y values
		switch (randomEnemy.object.id) {
			case 0x76: // jumping cheep cheep
				// place near top of level for raining cheep cheep effect
				var vPage = getVerticalPage(y);
				if (vPage === 0) {
					randomEnemy.y = 0x00;
				} else if (vPage === 1) {
					randomEnemy.y = getRandomIntRange(0x02, 0x0B);
				} else {
					randomEnemy.y = getRandomIntRange(0x0E, 0x11);
				}
				
			break;

			default:
				randomEnemy.y = y-originalEnemy.yOffset+randomEnemyObject.yOffset;
			break;
		}
		
	}

	return randomEnemy;
}

function getRandomEnemy(level, clan, group, originalEnemy, x, y, nextEnemy, lastX, nextX, levelHasLakitu) {
	if ((level.type & LevelType.Regular) !== 0) {
		return getRandomEnemyOnRegularLevel(clan, group, originalEnemy, x, y, nextEnemy, lastX, nextX, levelHasLakitu);
	} else if ((level.type & LevelType.Fortress) !== 0) {
		return getRandomEnemyOnRegularLevel(clan, group, originalEnemy, x, y, nextEnemy, lastX, nextX, levelHasLakitu);
	} else if ((level.type & LevelType.Ship) !== 0) {
		return getRandomEnemyOnRegularLevel(clan, group, originalEnemy, x, y, nextEnemy, lastX, nextX, levelHasLakitu);
	} else if ((level.type & LevelType.Pipe) !== 0) {
		return getRandomEnemyOnRegularLevel(clan, group, originalEnemy, x, y, nextEnemy, lastX, nextX, levelHasLakitu);
	}

	return { object: null, x: null, y: null };
}

function isRandomEnemyExcluded(enemy) {
	switch (enemy.id) {
		case 0x41: // End-of-level card
		case 0xD3: // autoscroll controller, these will optionally be removed in another option
		case 0xB8: // background clouds
		case 0xBA: // treasure box appears
			return true;
		break;

		default:
			return false;
		break;
	}
}

function randomizeEnemies(ROM) {
	var levels = rom.getLevelsWithProperty(function(obj) {
		if (obj.hasOwnProperty("type")) {
			if (((obj.type & LevelType.Regular) !== 0) || 
				((obj.type & LevelType.Pipe) !== 0) ||
				((obj.type & LevelType.Fortress) !== 0) ||
				((obj.type & LevelType.Ship) !== 0)
			) {
				if ((obj.type & LevelType.Lost) !== 0) {
					return false;
				}

				return true;
			}
		}

		return false;
	});

	var includedTypes = 
		EnemyType.Enemy | 
		EnemyType.Piranha  | 

		// didnt mean to keep this after messing around
		//EnemyType.Platform | 

		// exclude enemy spawners
		// this was kind of broken anyways since some enemies would spawn inside the spawner tile and be stuck
		// also could relieve some potential difficulty with the jump in 8-1 that expects a red turtle between bullet bills
		// the bullet bills will now spawn again meaning enemies like discs wont spawn but there still may not be a red turtle
		//EnemyType.Spawner | 

		EnemyType.Event | 
		EnemyType.Special | 
		EnemyType.Unique | 
		EnemyType.Water |
		EnemyType.NonEnemy;

	var clanGroups = rom.getEnemyClanGroups(EnemyType.Enemy);

	ui.addSpoiler("Randomized Enemies");

	// for each world
	for (var i = 0; i < levels.length; i++) {
		var worldLevels = levels[i];

		if (worldLevels.length > 0) {
			ui.addSpoiler("&#9;World " + (i+1));

			// for each level in world
			for (var j = 0; j < levels[i].length; j++) {
				var levelSpoilers = [];

				var level = levels[i][j];
				if (level.enemyCount === 0) {
					continue;
				}

				var group = [ 0, 0 ];
				
				// reduce the chance of dry bones clan group to 1/10
				var dryBonesProb = getRandomInt(10);
				if (dryBonesProb > 0) {
					group[0] = clanGroups[0][getRandomIntRange(1, clanGroups[0].length)];
				} else {
					group[0] = clanGroups[0][0];
				}

				// reduce the chance of hammer bros clan group to 1/10
				var hammerBroProb = getRandomInt(10);
				if (hammerBroProb > 0) {
					group[1] = clanGroups[1][getRandomIntRange(1, clanGroups[1].length)];
				} else {
					group[1] = clanGroups[1][0];
				}

				var levelHasLakitu = false;
				var lastX = -1, nextX = -1;

				ui.addSpoiler("&#9;&#9;" + level.name);

				var levelHadEnemySpoilers = false;
				// for each enemy in level
				for (var k = 0; k < level.enemyCount; k++) {
					var clan = getRandomInt(2);
					var offset = k*3;

					var nextEnemyObject = null;
					var nextEnemyX = null;
					var nextEnemyY = null;
					if (k < level.enemyCount-1) {
						var nextOffset = (k+1)*3;
						var nextEnemyPointer = level.enemyPointer+1+nextOffset;
						var nextEnemyID = ROM[nextEnemyPointer];
						nextEnemyX = ROM[nextEnemyPointer+1];
						nextEnemyY = ROM[nextEnemyPointer+2];

						nextEnemyObject = rom.getEnemyObject(nextEnemyID);
					}

					var enemyPointer = level.enemyPointer+1+offset;
					var enemyID = ROM[enemyPointer];
					var enemyX = ROM[enemyPointer+1];
					var enemyY = ROM[enemyPointer+2];

					var enemyObject = rom.getEnemyObject(enemyID);
					if (enemyObject !== null && ((enemyObject.type & includedTypes) !== 0)) {
						if (isRandomEnemyExcluded(enemyObject)) {
							continue;
						}

						var randomEnemy = getRandomEnemy(
							level,
							clan,
							group[clan],
							enemyObject,
							enemyX, 
							enemyY, 
							nextEnemyObject, 
							lastX, 
							nextX,
							levelHasLakitu
						);

						if (randomEnemy !== null && randomEnemy.object !== null) {
							if (randomEnemy.object.id === 0x83) {
								levelHasLakitu = true;
							}

							ROM[enemyPointer] = randomEnemy.object.id;
							if (randomEnemy.x !== null) {
								ROM[enemyPointer+1] = randomEnemy.x;
							}
							if (randomEnemy.y !== null) {
								ROM[enemyPointer+2] = randomEnemy.y;
							}

							ui.addSpoiler("&#9;&#9;&#9;" + enemyObject.name + " > " + randomEnemy.object.name);
						} else {
							ui.addSpoiler("&#9;&#9;&#9;" + enemyObject.name + " > " + enemyObject.name);
						}

						levelHadEnemySpoilers = true;
					}

					lastX = enemyX;
				}

				if (!levelHadEnemySpoilers) {
					ui.popSpoiler();
				}
			}
		}
	}

	ui.addSpoiler(); // add blank line to spoiler log
}