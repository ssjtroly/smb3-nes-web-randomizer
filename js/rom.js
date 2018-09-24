/*************************************************************************************/
//	WARNING:
//		Watch your step, this place is a mess!
/*************************************************************************************/

var explicitEnemyIncompatibilites = {
	// spiny dud and donut platforms
	// dry bones and green venus firetrap (maybe all piranhas)
};

// some enumations
var ToadHouseType = { 
	General: 		0, 
	Whistle: 		1, 
	Strange: 		2 
};
var Orientation = { // type used primarily for piranha plants
	Up: 			0, 
	Left: 			1, 
	Right: 			2, 
	Down: 			3,
};
var LevelStyle = { // level palette style type as found in ROM
	WorldMap: 		0x0, 
	Plains: 		0x1, 
	Fortress: 		0x2,
	Hills: 			0x3, 
	Sky: 			0x4, 
	Pirahna: 		0x5, 
	Water: 			0x6, 
	Mushroom: 		0x7,
	Pipe: 			0x8,
	Desert: 		0x9,
	Ship: 			0xA,
	Giant: 			0xB,
	Ice: 			0xC,
	Clouds: 		0xD,
	Underground: 	0xE,
	SpadeBonus: 	0xF
};
var LevelType = {
	None: 			0,
	Start: 			1 << 1,
	Regular: 		1 << 2,
	Fortress: 		1 << 3,
	Ship: 			1 << 4,
	HammerBro: 		1 << 5,
	Castle: 		1 << 6,
	Lost: 			1 << 7,
	Boss: 			1 << 8,
	CoinShip: 		1 << 9,
	Pipe: 			1 << 10,
	Hidden: 		1 << 11,
	Tower: 			1 << 12,
	ToadHouse: 		1 << 13,
	Spade: 			1 << 14,
	Entrance: 		1 << 15,
	Exit: 			1 << 16,
	Any: 			0xFFFFFFFF
};
var LevelEnemyType = { // type used for enemy randomizations
	None: 			0,
	Normal: 		1 << 1,
	Amphibious: 	1 << 2,
	Submerged: 		1 << 3,
	Arial: 			1 << 4,
	Plant: 			1 << 5,
	Fortress: 		1 << 6,
	Ship: 			1 << 7,
	HammerBro: 		1 << 8,
	Boss: 			1 << 9,
	Bowser: 		1 << 10,
	CoinShip: 		1 << 11,
	Undefined: 		1 << 12,
	Any: 			0xFFFFFFFF
};
var EnemyType = { // type used for enemy randomizations
	None: 			0,
	Enemy: 			1 << 1,
	Piranha: 		1 << 2,
	Platform: 		1 << 3,
	HammerBro: 		1 << 4,
	Koopaling: 		1 << 5,
	Special: 		1 << 6,
	Water: 			1 << 7,
	Event: 			1 << 8,
	Spawner: 		1 << 9,
	Unique: 		1 << 10,
	NonEnemy: 		1 << 11,
	Any: 			0xFFFFFFFF
};
var WorldFlag = {
	Null: 			0,
	World1: 		1 << 1,
	World2: 		1 << 2,
	World3: 		1 << 3,
	World4: 		1 << 4,
	World5: 		1 << 5,
	World6: 		1 << 6,
	World7: 		1 << 7,
	World8: 		1 << 8,
	WorldLost: 		1 << 9,
	Any: 			0xFFFFFFFF
};
var WorldIndex = { // warp values
	World1: 		0,
	World2: 		1 << 1,
	World3: 		1 << 2,
	World4: 		1 << 3,
	World5: 		1 << 4,
	World6: 		1 << 5,
	World7: 		1 << 6,
	World8: 		1 << 7,
	Any: 			0xFFFFFFFF
};
var ItemBlockType = {
	None: 			0,
	Question: 		1 << 1,
	Brick: 			1 << 2,
	MovableWooden: 	1 << 3,
	Invisible: 		1 << 4,
	Note: 			1 << 5,
	Any: 			0xFFFFFFFF
};

// the lab
var rom = {
	toadHouseLineLength: 15,
	toadKingRequestLineLength: 20,
	toadKingRescueLineLength: 20,

	toadHouseTextLength: 90,
	toadKingRequestTextLength: 240,
	toadKingRescueTextLength: 120,

	worldLetterTextLength: [
		125,
		103,
		131,
		128,
		139,
		147,
	],
	finalLetterTextLength: 119,
	worldSalutationTextLength: 37,
	finalSalutationTextLength: 35,

	toadHouseTextPointer: [ 
		0x05336, 
		0x05390, 
		0x053EA,
	],

	toadKingRequestTextPointer: 0x3012A,
	toadKingRescueTextPointer: [
		0x362C4,
		0x3633C,
		0x363B4,
		0x3642C
	],

	worldLetterTextPointer: [
		0x36792,
		0x3680F,
		0x36876,
		0x368F9,
		0x36979,
		0x36A04
	],
	finalLetterTextPointer: 0x36A97,
	worldSalutationTextPointer: 0x36B20,
	finalSalutationTextPointer: 0x36B45,

	peachPavedTextPointer: 0x31AD9, // uses toadHouseTextLength

	koopalingHPPointer: 0x3840,

	// ; Player_Suit -- Player's active powerup (see also: Player_QueueSuit)
	// PLAYERSUIT_SMALL	= 0
	// PLAYERSUIT_BIG		= 1
	// PLAYERSUIT_FIRE		= 2
	// PLAYERSUIT_RACCOON	= 3
	// PLAYERSUIT_FROG		= 4
	// PLAYERSUIT_TANOOKI	= 5
	// PLAYERSUIT_HAMMER	= 6

	// World_Map_Power:	
	// " (same as Player_Suit)
	// 7 - Judgems
	// 8 - Pwing
	// 9 - Star

	// found in PRG000.asm, Player_Die
	// value to be stored in Player_QueueSuit (add 1 to Player_Suit value)
	playerSuitChangeOnDeathPointer: 0x1AAD,
	// found in PRG008.asm, PRG008_A3FA
	// value to be stored in Player_Suit
	playerSuitChangeOnPitPointer: 0x10426,
	// found in PRG024.asm, Title_PrepForWorldMap
	// value to be stored in World_Map_Power (same as Player_Suit)
	playerSuitChangeOnMapPrepPointer: 0x30CCC,

	// found in PRG024.asm, Title_PrepForWorldMap
	// value to be stored in World_Map_Power (same as Player_Suit)
	//playerSuitChangeOnMapPrepPointer: 0x1025E,

	// found in PRG008.asm, PRG008_A44D
	// value to be stored in Player_Suit
	playerSuitChangeOnTimeUpPointer: 0x1045E,

	// found in PRG008.asm, PRG008_B246
	// change "LDA <Vert_Scroll" to "LDA #$00" so that "BNE PRG008_B258" is always true
	alwaysAllowVerticalScrollingPointer: 0x11257,
	alwaysAllowVerticalScrollingValue: 0x00,

	startingLivesPointer: 0x308E1, // 1 byte
	continueLivesPointer: 0x3D2D6, // 1 byte
	livesQuestionMarkValue: 0xFB,

	marioColorNormalPointer: 0x1053A, // 1 byte
	luigiColorNormalPointer: 0x1053D, // 4 bytes

	marioColorFirePointer: 0x10541, // 4 bytes
	marioColorFrogPointer: 0x10549, // 4 bytes
	marioColorTanookiPointer: 0x1054D, // 4 bytes
	marioColorHammerPointer: 0x10551, // 4 bytes

	// REMOVED MARIO/LUGI PALETTE CORRECTION STUFF BECAUSE IT WAS A MESS!!!
	// there was something i am missing or i was going about it all wrong, need to look deeper into it
	// luigi gets shafted again

	// ; InitPals_Per_MapPUp
	// ; Palettes as indexed by InitPal_Per_MapPowerup
	// ; Note that the first byte is never actually used.
	// ; Also note this should agree with Map_PostJC_PUpPP1/2 in PRG010
	// .byte $FF, $16, $36, $0F	; 0 Small
	// .byte $FF, $16, $36, $0F	; 1 Big
	// .byte $FF, $27, $36, $16	; 2 Fire
	// .byte $FF, $16, $36, $0F	; 3 Leaf
	// .byte $FF, $2A, $36, $0F	; 4 Frog
	// .byte $FF, $17, $36, $0F	; 5 Tanooki
	// .byte $FF, $30, $36, $0F	; 6 Hammer
	// .byte $FF, $30, $36, $0F	; 7 Judgems
	// .byte $FF, $16, $36, $0F	; 8 P-Wing
	marioColorMapSmallPointer: 0x3782B, // 4 bytes
	marioColorMapBigPointer: 0x3782F, // 4 bytes
	marioColorMapFirePointer: 0x37833, // 4 bytes
	marioColorMapLeafPointer: 0x37837, // 4 bytes
	marioColorMapFrogPointer: 0x3783B, // 4 bytes
	marioColorMapTanookiPointer: 0x3783F, // 4 bytes
	marioColorMapHammerPointer: 0x37843, // 4 bytes
	marioColorMapJudgemsPointer: 0x37847, // 4 bytes
	marioColorMapPWingPointer: 0x3784B, // 4 bytes

	marioColorMapInvUseSmallPointer: 0x3457F,
	marioColorMapInvUseBigPointer: 0x34583,
	marioColorMapInvUseFirePointer: 0x34587,
	marioColorMapInvUseLeafPointer: 0x3458B,
	marioColorMapInvUseFrogPointer: 0x3458F,
	marioColorMapInvUseTanookiPointer: 0x34593,
	marioColorMapInvUseHammerPointer: 0x34597,
	marioColorMapInvUseCloudPointer: 0x3459B,
	marioColorMapInvUsePWingPointer: 0x3459F,

	luigiColorMapInvUseSmallPointer: 0x345A3,
	luigiColorMapInvUseBigPointer: 0x345A7,
	luigiColorMapInvUseFirePointer: 0x345AB,
	luigiColorMapInvUseLeafPointer: 0x345AF,
	luigiColorMapInvUseFrogPointer: 0x345B3,
	luigiColorMapInvUseTanookiPointer: 0x345B7,
	luigiColorMapInvUseHammerPointer: 0x345BB,
	luigiColorMapInvUseCloudPointer: 0x345BF,
	luigiColorMapInvUsePWingPointer: 0x345C3,

	// ; Color table for setting the 2nd entry power up color on the map used for clearing Judgem's cloud!
	// ; NOTE: This is a patch table, you'll want it to agree with PRG027's "InitPals_Per_MapPUp"
	// Map_PostJC_PUpPP1:	.byte $16, $16, $27, $16, $2A, $17, $30
	marioColorMapCloudPostPrimaryPointer: 0x14DCA, // 7 bytes

	// i dont use this because i dont change outline colors
	// ; Color table for setting the 4th entry power up color on the map used for clearing Judgem's cloud!
	// ; NOTE: This is a patch table, you'll want it to agree with PRG027's "InitPals_Per_MapPUp"
	// Map_PostJC_PUpPP2:	.byte $0F, $0F, $16, $0F, $0F, $0F, $0F
	marioColorMapCloudPostOutlinePointer: 0x14DD3, // 7 bytes

	// vanilla values
	// .byte $0F, $16, $30, $36, $0F, $16, $30, $21	; Mario
	// .byte $0F, $1A, $30, $36, $0F, $1A, $30, $31	; Luigi
	marioColorBonusGamePointer: 0x37808, // 8 bytes
	luigiColorBonusGamePointer: 0x37810, // 8 bytes
	// .byte $0F, $30, $30, $36, $0F, $30, $30, $17
	unknownColorBonusGamePointer: 0x37818, // 8 bytes

	// documented in PRG000.asm, PRG000_DA15
	alwaysRevertToSmallPointer: 0x1A2D,
	alwaysRevertToSmallValue: 0x04,

	// found in PRG000.asm, Player_GetHurt and PRG000_DA4E
	playerGetsHurtPointer: 0x19FA, // pointer to a JMP instruction value
	playerGetsHurtOHKOValue: 0x7A, // change the normal JMP address to the address of when mario dies from an enemy hit

	// not sure why i commented these out or what i thought they were used for
	// found in PRG000.asm, Player_Die
	//playerDeathSuitChangePointer: 0x1AAD,
	// found in PRG024.asm, Title_PrepForWorldMap
	//mapStartingPowerUpPointer: 0x30CCC,

	// found in PRG001.asm, PowerUp_DoHitTest
	// pointer to JMP instruction value that checks for collsion with powerups
	disablePowerUpCollisionPointer: 0x28A0, // 2 bytes
	// value for JMP instruction that jumps to PRG001_A892 (which is always RTS)
	// this means collisions for powerups are never checked
	// this may be undesirable because it includes stars
	disablePowerUpCollisionValue: [ 0x92, 0xA8 ],

	mapPalettePointer: [ // 16 bytes each
		0x36BE2, // world 1 and 3
		0x36BF2, // world 2
		0x36C02, // world 9 (warp world?)
		0x36C12, // world 4
		0x36C22, // world 5
		0x36C32, // world 6
		0x36C42, // world 7
		0x36C52, // world 8
		0x36C62, // Map object colors used in World 1-7 + 9
		0x36C72, // Map object colors used in World 8
	],

	levelStyleName: [
		"Plains",
		"Fortress",
		"Hills",
		"Sky",
		"Plant",
		"Water",
		"ToadHouse",
		"Pipe",
		"Desert",
		"Airship",
		"Giant",
		"Ice",
		"Clouds",
		"Underground",
		"Bonus"
	],

	levelStylePointer: [
		0x10010, // plains
		0x14010, // fortress
		0x0FF10,
		0x16010,
		0x18010,
		0x1C010,
		0x1A010,
		0x10010,
		0x1A010,
		0x1E010,
		0x13F10,
		0x1C010,
		0x18010,
		0x1C010,
		0x10010,
		0x10010
	],
	levelStylePalettePointer: [
		// 8 groups of 16 bytes for bg palettes
		// 4 groups of 16 bytes for sprite palettes
		0x36CA2, // plains
		0x36D62, // fortress
		0x36E22, // HillsUnder
		0x36EE2, // HighUp
		0x36FA2, // Plant
		0x37062, // Water
		0x37122, // Toad
		0x371E2, // PipeMaze
		0x372A2, // Desert
		0x37362, // Airship
		0x37422, // Giant
		0x374E2, // Ice
		0x375A2, // Sky
		0x37662, // underground/2p vs
		0x37722 // bonus
	],

	warpZonePointer: [
		0x19C51, 0x19C52, 0x19C53, // entrances to worlds 2, 3, and 4
		0x19C55, 0x19C56, 0x19C57, // entrances to worlds 5, 6, and 7
						  0x19C5A, // entrance to world 8
	],

	mapTilePointer: [
		0x185BA, // world 1
		0x1864B, // world 2
		0x1876C, // world 3
		0x1891D, // world 4
		0x18A3E, // world 5
		0x18B5F, // world 6
		0x18D10, // world 7
		0x18E31, // world 8
		0x19072 // warp zone
	],

	musicGroup1: {
		name: [
			"World 1",
			"World 2",
			"World 3",
			"World 4",
			"World 5",
			"World 6",
			"World 7",
			"World 8",
			"Coin Heaven/Sky World/Warp Zone",
			"Invincibility",
			"Music Box",
			"King's Room",
			"Bonus Game",
			"Ending music",
		],
		pointer: [
			[ 0x143CA, 0x3C424 ], // world 1	
			[ 0x143CB, 0x3C425 ], // world 2
			[ 0x143CC, 0x3C426 ], // world 3
			[ 0x143CD, 0x3C427 ], // world 4
			[ 0x143CE, 0x3C428 ], // world 5
			[ 0x143CF, 0x3C429 ], // world 6
			[ 0x143D0, 0x3C42A ], // world 7
			[ 0x143D1, 0x3C42B ], // world 8
			[ 0x143EF, 0x3C6A4, 0x3D7C6 ], // coin heaven / sky world / warp zone
			[ 0x281C, 0x10187, 0x31965, 0x3D8E8 ], // invincibility
			[ 0x143F9, 0x346B7, 0x3C6AE ], // music box
			[ 0x34E8, 0x3D7C5 ], // King's room
			[ 0x2C8A3, 0x3CD18 ], // Bonus game
			[ 0x31965 ], // Ending music
		],
		value: [
			0x01, // World 1
			0x02, // World 2
			0x03, // World 3
			0x04, // World 4
			0x05, // World 5
			0x06, // World 6
			0x07, // World 7
			0x08, // World 8
			0x09, // coin heaven / sky world / warp zone
			0x0A, // Invincibility
			0x0C, // Music box
			0x0D, // King's room
			0x0E, // Bonus game
			0x0F, // Ending music
		],
	},

	musicGroup2: {
		name: [
			"Overworld 1",
			"Underground",
			"Water",
			"Fortress",
			"Boss",
			"Airship",
			"Hammer Bros",
			"Toad House",
			"Overworld 2",
			"P-Switch",
			"Bowser",
		],
		pointer: [
			[ 0x3D7BC ], // Overworld 1
			[ 0x3D7BD ], // Underground
			[ 0x3D7BE ], // Water
			[ 0x3D7BF ], // Fortress
			[ 0x3D7C0 ], // Boss
			[ 0x3D7C1 ], // Airship
			[ 0x3D7C2 ], // Hammer Bros
			[ 0x3D7C3 ], // Toad House
			[ 0x3D7C4 ], // Overworld 2
			[ 0x11658, 0x3D8E4 ], // P-Switch
			[ 0x3921 ], // Bowser
		],
		value: [
			0x10, // Overworld 1
			0x20, // Underground
			0x30, // Water
			0x40, // Fortress
			0x50, // Boss
			0x60, // Airship
			0x70, // Hammer Bros
			0x80, // Toad House
			0x90, // Overworld 2
			0xA0, // P-Switch
			0xB0, // Bowser
		],
	},

	jingle: {
		name: [
			"Player Death",
			"Game Over",
			"Victory Normal",
			"Victory Super",
			"Bowser Falling",
			"Course Clear",
			"Time Warning"
		],

		pointer: [
			[ 0x1A90, 0x1342A ],
			[ 0x3D16F ],
			[ 0x5FAB, 0x6939, 0xF83F ],
			[ 0x3F13, 0x366A6 ],
			[ 0x3EB0 ],
			[ 0x5F8B ],
			[ 0x34FFC ]
		],

		value: [
			0x01,
			0x02,
			0x04,
			0x08,
			0x10,
			0x20,
			0x40
		],
	},

	playerSfx: {
		name: [
			"Jump",
			"Bump",
			"Swim/Squish",
			"Kick",
			"Pipe/Shrink",
			"Fireball",
			//"Full Power",
			"Frog Hop"
		],

		pointer: [
			[ 0x10C55, 0x11062, 0x11EE6, 0x125C5 ], // jump
			[ 0xCF6, 0x38DF, 0x4342, 0xE64B, 0xEF16, 0xFC07, 0x11740, 0x14DF8, 0x15328 ], // bump
			[ 0x12D1, 0x317D, 0x511B, 0x6E68, 0x83B3, 0x10ACB, 0x10D47, 0x125A6, 0x12AA3, 0x1305F, 0x2D183,  ], // Swim / Squish
			[ 0x2D183 ], // Kick
			[ 0x1A71, 0xFC03, 0x103A7, 0x11F35 ], // Pipe / shrink
			[ 0x89DA, 0xE2CE ], // fireball
			//[ 0x633D, 0x104EF, 0x2D128, 0x382FD ], // full power
			[ 0x10A21 ], // frog hop
		],

		// NOT the values used in pointers[2]
		not2Pointer: 0x131F, // Swim / Squish

		value: [
			0x01, // jump
			0x02, // bump
			0x04, // swim/squish
			0x08, // kick
			0x10, // pipe/shrink
			0x20, // fireball
			//0x40, // full power
			0x80 // frog hop
		],
	},

	levelSfx1: {
		name: [
			"Coin",
			"Powerup Rising From Block",
			"Vine Rising",
			"Cannon Fire",
			"Text Sound/Card Select",
			"Power Up",
			"1-Up",
			"Lost Suit/Wand Shot",
			//"Unused",
			"Lost Kuirbo's Shoe",
			"Tail Wag"
		],

		pointer: [
			[ 0x4BB, 0x5F2B, 0x11627, 0x133C3, 0x2DD6F, 0x30C9D ], // coin
			[ 0x28E1, 0x62F8, 0x164A0 ], // Powerup rising from block
			[ 0x257A, 0x118A6 ], // Vine rising
			[ 0x364E, 0x3A6C, 0x3EE0, 0x6476, 0x679B, 0x6EE9, 0x86D9, 0x8ABE, 0xFEBF, 0x1164E, 0x1369E, 0x13D5E, 0x13DC8 ], // Cannon fire
			[ 0x452, 0x5474, 0x2C929, 0x2DBCB, 0x34452, 0x344C0 ], // Text "type" sound / card select
			[ 0x28CF, 0x3456D, 0x3456E, 0x34570, 0x34572, 0x34573, 0x34574, 0x34688 ], // Power up
			[ 0x5D92, 0xEB03, 0x12019, 0x1201A, 0x1201B, 0x1201C, 0x1201D, 0x1201E, 0x1201F, 0x2D2B2, 0x2DD54, 0x350AB ], // 1 up
			[ 0x1A39, 0x283E, 0x2C54, 0x3087, 0x3F31, 0x62E3, 0x11025, 0x148E1, 0x16A58, 0x16BB3, 0x3456F, 0x34571, 0x346A7, 0x3851B ], // Lost suit / wand shot
			//[ 0x38523 ], // Unknown / lost sound
			[ 0x1A0B, 0x1A46, 0x3852B ], // Lost Kuirbo's Shoe
			[ 0x11069, 0x110EE ], // tail wag
		],

		// OR the values used in pointers[7], pointers[9], & pointers[10] when writing to this location
		or7_9_10Pointer: 0x3853E,

		value: [
			0x01, // coin
			0x02, // Powerup rising from block
			0x04, // Vine rising
			0x08, // Cannon fire
			0x10, // Text "type" sound / card select
			0x20, // Power up
			0x40, // 1-up
			0x80, // Lost suit / wand shot
			//0x90, // Unknown / lost sound
			0xA0, // Lost Kuirbo's Shoe
			0xB0 // Tail wag
		],
	},

	levelSfx2: {
		name: [
			"Crumbling Brick",
			"Flame Jet",
			"Boomerang",
			"Airship Fly",
			"Hammer Bro March",
			"Skid"
		],

		pointer: [
			[ 0x3C7E, 0x43E2, 0x5780, 0x64F3, 0x11862, 0x16AA6, 0x16AB1, 0x3475F ], // Crumbling brick
			[ 0x3BD0, 0x82AE, 0xA48B ], // Flame jet
			[ 0xF8D8, 0xF8DF ], // Boomerang
			[ 0x2F0D, 0x172EB, 0x38675 ], // Airship fly
			[ 0x3342, 0x16F32 ], // Hammer Bros march
			[ 0x10E97, 0x126E1, 0x1664E, 0x166F5, 0x1675F, 0x16849, 0x1691F, 0x1696C ], // skid
		],

		value: [
			0x01, // Crumbling brick
			0x02, // Flame jet
			0x04, // Boomerang
			0x08, // Airship fly
			0x10, // Hammer Bros march
			0x80, // Skid
		],
	},

	mapSfx: {
		name: [
			"World Begin",
			"Path Move",
			"Enter Level",
			"Flip Inventory",
			"Bonus Appears",
			"Denied",
		],
		pointer: [
			[ 0xCF6, 0x38DF, 0x4342, 0xE64B, 0xEF16, 0xFC07, 0x11740, 0x14DF8, 0x15328 ], // World Begin
			[ 0xAF96, 0x1472C, 0x15347, 0x15368, 0x2D0EB, 0x30C6C ], // Path Move
			[ 0x380BD, 0x3C84A, 0x3CD23, 0x3D3B1 ], // Enter Level
			[ 0x1E49, 0x1443D, 0x16A42, 0x2D7E1, 0x34432 ], // Flip Inventory
			[ 0x632B, 0x134DC, 0x16CFC, 0x16D3C, 0x16D6B, 0x16DA8, 0x2DD83 ], // Bonus Appears
			[ 0x2D211, 0x2D879, 0x3469B ], // Denied
		],
		value: [
			0x01, // World Begin
			0x02, // Path Move
			0x04, // Enter Level
			0x08, // Flip Inventory
			0x10, // Bonus Appears
			0x80, // Denied
		],
	},

	mapPalettePointer: 0x36BE2,
	mapPaletteIndexPointer: 0x1842D,

	worlds: [
		{ // world 1
			mapTilePointer: 0x185BA,
			mapLocationPointer: 0x19434,
			mapLocationCount: 21,

			hammerBroItemsPointer: 0x16190,
		},
		{ // world 2
			mapTilePointer: 0x1864B,
			mapLocationPointer: 0x194B6,
			mapLocationCount: 47,

			hammerBroItemsPointer: 0x16199,
		},
		{ // world 3
			mapTilePointer: 0x1876C,
			mapLocationPointer: 0x195D4,
			mapLocationCount: 52,

			hammerBroItemsPointer: 0x161A2,
		},
		{ // world 4
			mapTilePointer: 0x1891D,
			mapLocationPointer: 0x19710,
			mapLocationCount: 34,

			hammerBroItemsPointer: 0x161AB,
		},
		{ // world 5
			mapTilePointer: 0x18A3E,
			mapLocationPointer: 0x197E0,
			mapLocationCount: 42,

			hammerBroItemsPointer: 0x161B4,
		},
		{ // world 6
			mapTilePointer: 0x18B5F,
			mapLocationPointer: 0x198E0,
			mapLocationCount: 57,

			hammerBroItemsPointer: 0x161BD,
		},
		{ // world 7
			mapTilePointer: 0x18D10,
			mapLocationPointer: 0x19A3A,
			mapLocationCount: 46,

			hammerBroItemsPointer: 0x161C6,
		},
		{ // world 8
			mapTilePointer: 0x18E31,
			mapLocationPointer: 0x19B52,
			mapLocationCount: 41,

			hammerBroItemsPointer: 0x161CF,
		},
		{ // warp world
			mapTilePointer: 0x19072,
			mapLocationPointer: 0x19C48, // may not be correct, calculated from world 8 mapLocationPointer+(41+41+(41*2)+(41*2))
			mapLocationCount: 10,

			hammerBroItemsPointer: null,
		}
	],

	toadHouseRandomItemPointer: 0x3B164, // 16 bytes
	toadHouseItemOffsetPointer: 0x3B15A, // 9 bytes
	toadhouseItemToInventoryPointer: 0x3B14B, // 15 bytes 

	// must use patch.addStartingXLocationCheck for this to have any effect
	playerStartingLocationXPointer: 0x3DFC6,

	// accepted values for whistle toadhouse
	// 1 = Warp Whistle
	// 2 = P-Wing
	// 3 = Frog
	// 4 = Tanooki
	// 5 = Hammer
	// 6 = Random Super Suit
	// 7 = Random Basic Item
	toadHouseItemName: [
		"Whistle",
		"P-Wing",
		"Frog",
		"Tanooki",
		"Hammer Suit",
		"Random Super Suit",
		"Random Basic Item"
	],
	toadHouseItemToInventoryName: [
		"Whistle",
		"P-Wing",
		"Frog Suit",
		"Tanooki",
		"Hammer Suit",
		"Frog Suit",
		"Tanooki",
		"Hammer Suit",
		"Mushroom",
		"Fire Flower",
		"Leaf"
	],
	whistleToadHousePointer: 0x2D6D,
	whistleHammerBroPointer: 0x1619D, // use debugInventoryItemName value
	whistleW1FortressPointer: 0xD36A, // use debugInventoryItemName value - 1

	whiteToadHousePointer: 0x19309, // 16 bytes, 2 bytes each world, only first byte used

	// accepted values and names for starting inventory
	inventoryItemName: [
		"NULL", // 0
		"Mushroom", // 1
		"Flower", // 2
		"Leaf", // 3
		"Frog", // 4
		"Tanooki", // 5
		"Hammer Suit", // 6
		"Cloud", // 7
		"P-Wing", // 8
		"Star", // 9
		"Anchor", // A
		"Hammer", // B
		"Whistle", // C
		"Music Box", // D
	],
	debugInventoryPointer: 0x30D8E,
	
	fromRawCharMainText: function(ch) {
		var decoded = rom.mainTextDecodeTable[ch.toString()];
		if (decoded !== undefined) return decoded;
		else return "[" + ch + "]"
	},

	toRawCharMainText: function(ch) {
		var encoded = rom.mainTextEncodeTable[ch.toString()];
		if (encoded !== undefined) return encoded;
		else return "[" + ch + "]"
	},

	getLevelsWithProperty: function(propFunc, world = WorldFlag.Any) {
		var lvls = [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		];

		if ((world & WorldFlag.World1) !== 0) {
			for (var i = 0; i < rom.levels[0].length; i++) {
				var level = rom.levels[0][i];
				if (propFunc(level) === true) {
					lvls[0].push(level);
				}
			}
		}

		if ((world & WorldFlag.World2) !== 0) {
			for (var i = 0; i < rom.levels[1].length; i++) {
				var level = rom.levels[1][i];
				if (propFunc(level) === true) {
					lvls[1].push(level);
				}
			}
		}

		if ((world & WorldFlag.World3) !== 0) {
			for (var i = 0; i < rom.levels[2].length; i++) {
				var level = rom.levels[2][i];
				if (propFunc(level) === true) {
					lvls[2].push(level);
				}
			}
		}

		if ((world & WorldFlag.World4) !== 0) {
			for (var i = 0; i < rom.levels[3].length; i++) {
				var level = rom.levels[3][i];
				if (propFunc(level) === true) {
					lvls[3].push(level);
				}
			}
		}

		if ((world & WorldFlag.World5) !== 0) {
			for (var i = 0; i < rom.levels[4].length; i++) {
				var level = rom.levels[4][i];
				if (propFunc(level) === true) {
					lvls[4].push(level);
				}
			}
		}

		if ((world & WorldFlag.World6) !== 0) {
			for (var i = 0; i < rom.levels[5].length; i++) {
				var level = rom.levels[5][i];
				if (propFunc(level) === true) {
					lvls[5].push(level);
				}
			}
		}

		if ((world & WorldFlag.World7) !== 0) {
			for (var i = 0; i < rom.levels[6].length; i++) {
				var level = rom.levels[6][i];
				if (propFunc(level) === true) {
					lvls[6].push(level);
				}
			}
		}

		if ((world & WorldFlag.World8) !== 0) {
			for (var i = 0; i < rom.levels[7].length; i++) {
				var level = rom.levels[7][i];
				if (propFunc(level) === true) {
					lvls[7].push(level);
				}
			}
		}

		if ((world & WorldFlag.WorldLost) !== 0) {
			for (var i = 0; i < rom.levels[8].length; i++) {
				var level = rom.levels[8][i];
				if (propFunc(level) === true) {
					lvls[8].push(level);
				}
			}
		}

		return lvls;
	},

	getEnemyObject: function(id) {
		for (var i = 0; i < rom.enemyObjects.length; i++) {
			var obj = rom.enemyObjects[i];
			if (obj.id === id) {
				return obj;
			}
		}

		return null;
	},

	getEnemyClanGroups: function(type) {
		var clanGroups = [
			[],
			[]
		];

		for (var i = 0; i < rom.enemyObjects.length; i++) {
			var obj = rom.enemyObjects[i];
			if (obj.hasOwnProperty("clan") && obj.hasOwnProperty("group") && obj.hasOwnProperty("type")) {
				if (obj.clan === -1 || obj.type !== type) {
					continue;
				}

				if (!clanGroups[obj.clan].includes(obj.group)) {
					clanGroups[obj.clan].push(obj.group);
				} 
			}
		}

		return clanGroups;
	},

	getEnemyObjectsWithProperty: function(propFunc, type = EnemyType.Any) {
		var objs = [];

		for (var i = 0; i < rom.enemyObjects.length; i++) {
			var obj = rom.enemyObjects[i];
			if ((obj.type & type) !== 0) {
				if (propFunc(obj)) {
					objs.push(obj);
				}
			}
		}

		return objs;
	},

	enemyObjects: [
		{ id: 0x7F, type: EnemyType.Piranha, clan: 1, group: 8, orientation: Orientation.Up, yOffset: -1, name: "Big Red Piranha" }, // OBJ_BIGREDPIRANHA; Big Red Piranha
		{ id: 0x7D, type: EnemyType.Piranha, clan: 1, group: 8, orientation: Orientation.Up, yOffset: -1, name: "Big Green Piranha" }, // OBJ_BIGGREENPIRANHA; Big Green Piranha
		{ id: 0x46, type: EnemyType.Piranha, clan: 1, group: 6, orientation: Orientation.Up, yOffset: -3, name: "Pipe Ptooie" }, // OBJ_PIRANHASPIKEBALL; Tall plant carrying spike ball
		{ id: 0x56, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Left, yOffset: 0, name: "Left Facing Red Piranha" }, // OBJ_PIRANHASIDEWAYSLEFT; Sideways left-facing red piranha
		{ id: 0x57, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Right, yOffset: 0, name: "Right Facing Red Piranha" }, // OBJ_PIRANHASIDEWAYSRIGHT; Sideways right-facing red piranha
		{ id: 0xA0, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Up, yOffset: -1, name: "Green Piranha" }, // OBJ_GREENPIRANHA; short pipe muncher
		{ id: 0xA2, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Up, yOffset: -1, name: "Red Piranha" }, // OBJ_REDPIRANHA; tall pipe muncher
		{ id: 0xA4, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Up, yOffset: -1, name: "Green Venus Firetrap" }, // OBJ_GREENPIRANHA_FIRE; short green fire plant
		{ id: 0xA6, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Up, yOffset: -1, name: "Red Venus Firetrap" }, // OBJ_VENUSFIRETRAP; Tall red fire plant
		{ id: 0xA1, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Down, yOffset: 1, name: "Upside-down Green Piranha" }, // OBJ_GREENPIRANHA_FLIPPED; upside down short pipe muncher
		{ id: 0xA3, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Down, yOffset: 1, name: "Upside-down Red Piranha" }, // OBJ_REDPIRANHA_FLIPPED; upside down tall pipe muncher
		{ id: 0xA5, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Down, yOffset: 1, name: "Upside-down Green Venus Firetrap" }, // OBJ_GREENPIRANHA_FIREC; upside down short green fire plant
		{ id: 0xA7, type: EnemyType.Piranha, clan: 0, group: 2, orientation: Orientation.Down, yOffset: 1, name: "Upside-down Red Venus Firetrap" }, // OBJ_VENUSFIRETRAP_CEIL; upside down tall fire plant

		{ id: 0x41, type: EnemyType.NonEnemy, name: "End-of-level Card" }, // End-of-level card
		{ id: 0xD3, type: EnemyType.NonEnemy, name: "Autoscroll Controller" }, // Activates auto scrolling for e.g. World 1-4, World 8 Tank, etc.
		{ id: 0xBB, type: EnemyType.NonEnemy, name: "Event Cancel" }, // Cancels Level Event
		{ id: 0xB8, type: EnemyType.NonEnemy, name: "Background Clouds" }, // Begins floating clouds in background 
		{ id: 0xBA, type: EnemyType.NonEnemy, name: "Treasure Box Appears" }, // Causes treasure box to appear
		{ id: 0xB9, type: EnemyType.NonEnemy, name: "Wooden Platform Swarm" }, // Begins random wooden platforms 
		{ id: 0xD4, type: EnemyType.NonEnemy, name: "White Toad House/Coin Ship" }, // Handles the judgement of whether you get a White Toad House / Coin Ship
		{ id: 0xB6, type: EnemyType.NonEnemy, name: "Lakitu Flee" }, // Causes active Lakitu to flee

		{ id: 0xBC, type: EnemyType.Spawner, clan: 0, group: 2, orientation: Orientation.Left|Orientation.Right, yOffset: 0, name: "Bullet Bill Spawner"}, // Bullet Bill cannon
		{ id: 0xBD, type: EnemyType.Spawner, clan: 0, group: 2, orientation: Orientation.Left|Orientation.Right, yOffset: 0, name: "Missile Bill Spawner" }, // Missile Bill (homing Bullet Bill)
		{ id: 0xBE, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left|Orientation.Right, yOffset: 0, name: "Rocky Wrench Spawner" }, // (Re-)Creates Rocky Wrench on timer
		{ id: 0xBF, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Up|Orientation.Down|Orientation.Left|Orientation.Right, yOffset: 0, name: "4-way Cannonball Spawner" }, // 4-way cannon
		{ id: 0xC0, type: EnemyType.Spawner, clan: 0, group: 2, orientation: Orientation.Left, yOffset: 0, name: "Left Goomba Spawner" }, // Goomba pipe (left output)
		{ id: 0xC1, type: EnemyType.Spawner, clan: 0, group: 2, orientation: Orientation.Right, yOffset: 0, name: "Right Goomba Spawner" }, // Goomba pipe (right output)
		{ id: 0xC2, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left|Orientation.Up, yOffset: 0, name: "Horizontal Left Cannonball Spawner" }, // Fires cannonballs horizontally left
		{ id: 0xC3, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left, yOffset: 0, name: "Left Big Cannonball Spawner" }, // Fires BIG cannonballs horizontally left
		{ id: 0xC4, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left|Orientation.Up, yOffset: 0, name: "Upper Left Diagonal Cannonball Spawner" }, // Fires cannonballs diagonally, upper left
		{ id: 0xC5, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right|Orientation.Up, yOffset: 0, name: "Upper Right Diagonal Cannonball Spawner" }, // Fires cannonballs diagonally, upper right
		{ id: 0xC6, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left|Orientation.Down, yOffset: 0, name: "Lower Left Diagonal Cannonball Spawner" }, // Fires cannonballs diagonally, lower left
		{ id: 0xC7, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right|Orientation.Down, yOffset: 0, name: "Lower Right Diagonal Cannonball Spawner" }, // Fires cannonballs diagonally, lower right
		//{ id: 0xC8, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left|Orientation.Up, yOffset: 0, name: "Upper Left Diagonal Cannonball Spawner 2" }, // ?? Same as CFIRE_HLCANNON?
		//{ id: 0xC9, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right|Orientation.Up, yOffset: 0, name: "Upper Right Diagonal Cannonball Spawner 2" }, // ?? Same as CFIRE_ULCANNON?
		//{ id: 0xCA, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left|Orientation.Down, yOffset: 0, name: "Lower Left Diagonal Cannonball Spawner 2" }, // ?? Same as CFIRE_URCANNON?
		//{ id: 0xCB, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right|Orientation.Down, yOffset: 0, name: "Lower Right Diagonal Cannonball Spawner 2" }, // ?? Same as CFIRE_LLCANNON?
		{ id: 0xCC, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right, yOffset: 0, name: "Horizontal Right Cannonball Spawner" }, // Fires cannonballs horizontally right
		{ id: 0xCD, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right, yOffset: 0, name: "Right Big Cannonball Spawner" }, // Fires BIG cannonballs horizontally right
		{ id: 0xCE, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Left, yOffset: 0, name: "Left Bobomb Spawner" }, // Launches fused Bob-ombs to the left
		{ id: 0xCF, type: EnemyType.Spawner, clan: 1, group: 4, orientation: Orientation.Right, yOffset: 0, name: "Right Bobomb Spawner" }, // Launches fused Bob-ombs to the right
		{ id: 0xD0, type: EnemyType.Spawner, clan: 1, group: 2, orientation: Orientation.Right|Orientation.Down|Orientation.Left, yOffset: 0, name: "Laser Spawner" }, // Laser fire

		{ id: 0xB4, type: EnemyType.Event, clan: 0, group: 2, yOffset: 0, name: "Cheep Cheep Swarm" }, // Begins swarm of cheep cheeps
		{ id: 0xB5, type: EnemyType.Event, clan: 1, group: 7, yOffset: 0, name: "Spike Cheep Swarm" }, // Begins Spike Cheeps floating by
		{ id: 0xB7, type: EnemyType.Event, clan: 1, group: 1, yOffset: 0, name: "Parabeetle Swarm" }, // Begins Green and red parabeetles flyby
		{ id: 0xD1, type: EnemyType.Event, clan: 0, group: 2, yOffset: 0, name: "Green Paratroopas School" }, // Spawns up to 3 hopping green paratroops
		{ id: 0xD2, type: EnemyType.Event, clan: 0, group: 2, yOffset: 0, name: "Orange Cheep Cheep School" }, // Spawns up to 3 orange cheep cheeps

		{ id: 0xAF, type: EnemyType.Special, clan: 0, group: 5, yOffset: 0, name: "Sun" }, // Sun
		{ id: 0x5D, type: EnemyType.Special, clan: 0, group: 5, yOffset: 0, name: "Tornado" }, // Tornado

		//{ id: 0x65, type: EnemyType.Water, clan: 0, group: 3, yOffset: 0, name: "Upward Current" }, // Upward Current
		//{ id: 0x66, type: EnemyType.Water, clan: 0, group: 3, yOffset: 0, name: "Downward Current" }, // Downward Current
		{ id: 0x67, type: EnemyType.Water, clan: 0, group: 3, yOffset: -1, name: "Lava Lotus" }, // Lava Lotus

		{ id: 0x24, type: EnemyType.Platform, clan: 0, group: 0, name: "Fast Cloud" },// Fast cloud platform
		{ id: 0x26, type: EnemyType.Platform, clan: 0, group: 0, name: "Wooden Platform Ride" },// Log that rides you to the right after stepping on it
		{ id: 0x27, type: EnemyType.Platform, clan: 0, group: 0, name: "Oscillating Horizontal Wooden Platform" },// Horizontal oscillating log platform
		{ id: 0x28, type: EnemyType.Platform, clan: 0, group: 0, name: "Oscillating Vertical Wooden Platform" },// Vertical Oscillating log platform
		{ id: 0x2C, type: EnemyType.Platform, clan: 0, group: 0, name: "Cloud" },// Cloud platform
		{ id: 0x2E, type: EnemyType.Platform, clan: 0, group: 1, name: "Invisible Lift" },// Invisible (until touched) lift that goes up to fixed position of Y/Hi = 64
		{ id: 0x36, type: EnemyType.Platform, clan: 0, group: 0, name: "Floating Wooden Platform" },// Floating wooden platform
		{ id: 0x37, type: EnemyType.Platform, clan: 0, group: 0, name: "Horizontal Short-Oscillation Wooden Platform" },// left/right short-oscillation log
		{ id: 0x38, type: EnemyType.Platform, clan: 0, group: 0, name: "Vertical Short-Oscillation Wooden Platform" },// Up/down short-oscillation log
		{ id: 0x3A, type: EnemyType.Platform, clan: 0, group: 1, name: "Falling Donut Lift" },// Falling donut lift type platform
		{ id: 0x3C, type: EnemyType.Platform, clan: 0, group: 0, name: "Falling Wooden Platform" },// Falling wooden platform
		{ id: 0x44, type: EnemyType.Platform, clan: 0, group: 0, name: "Fall After Touching Wooden Platform" },// Fall-after-touch log platform
		{ id: 0x54, type: EnemyType.Platform, clan: 0, group: 1, name: "Shaking And Falling Donut Lift" },// Donut lift shake and fall object
		{ id: 0x90, type: EnemyType.Platform, clan: 0, group: 0, name: "Tilting Platform" },// Tilting platform
		{ id: 0x91, type: EnemyType.Platform, clan: 0, group: 0, name: "Non-Stop Clockwise Twirling Platform" },// Twirling platform, clockwise, non-stop
		{ id: 0x92, type: EnemyType.Platform, clan: 0, group: 0, name: "Clockwise Twirling Platform" },// Twirling platform, clockwise
		{ id: 0x93, type: EnemyType.Platform, clan: 0, group: 0, name: "Periodic Twirling Platform" },// Twirling platform, periodic
		{ id: 0xA8, type: EnemyType.Platform, clan: 0, group: 1, name: "Moving One Direction Arrow Platform" },// One direction arrow platform in motion
		{ id: 0xA9, type: EnemyType.Platform, clan: 0, group: 1, name: "Changeable Direction Moving Arrow Platform" },// Changeable direction arrow platform in motion

		{ id: 0x3F, type: EnemyType.Enemy, clan: 0, group: 0, yOffset: 0, name: "Dry Bones" },// Dry Bones
		//{ id: 0x08, type: EnemyType.Enemy, clan: 0, group: 0, name: "P-Switch Door" }, // P-Switch door (fortress)

		//{ id: 0xAC, type: EnemyType.Enemy, clan: 0, group: 1, name: "Left Rocket Engine" }, // Left Rocket Engine
		//{ id: 0x9D, type: EnemyType.Enemy, clan: 0, group: 1, name: "Upward Rocket Engine" }, // Upward Rocket Engine
		//{ id: 0xB1, type: EnemyType.Enemy, clan: 0, group: 1, name: "Right Rocket Engine" }, // Right Rocket Engine
		//{ id: 0xB2, type: EnemyType.Enemy, clan: 0, group: 1, name: "Downward Rocket Engine" }, // Downward Rocket Engine

		{ id: 0x6C, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Green Koopa" }, // Green Koopa
		{ id: 0x80, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Flying Green Koopa" }, // Flying Green Koopa
		{ id: 0x6F, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Flying Red Koopa" }, // Flying Red Koopa
		{ id: 0x6D, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Red Koopa" }, // Red Koopa
		{ id: 0x6E, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Green Hopping Koopa" }, // Green Hopping Koopa
		{ id: 0x72, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Goomba" }, // Goomba
		{ id: 0x74, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Flying Goomba" }, // Flying Goomba
		{ id: 0x6E, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Paratroopa" }, // Paratroopa
		{ id: 0x73, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Paragoomba" }, // Paragoomba
		{ id: 0x6B, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Pile Driver Micro Goomba" }, // Pile Driver Micro Goomba
		{ id: 0x88, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Orange Cheep Cheep" }, // Orange Cheep Cheep
		{ id: 0x76, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Jumping Cheep Cheep" }, // Jumping Cheep Cheep
		{ id: 0x77, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Green Cheep Cheep" }, // Green Cheep Cheep
		{ id: 0x64, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Cheep Cheep Water Hopper" }, // Cheep Cheep Water Hopper
		{ id: 0x3B, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Charging Cheep Cheep" }, // Charging Cheep Cheep
		{ id: 0x42, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Pool-to-pool-to-pool Hopping Cheep Cheep" }, // Pool-to-pool-to-pool Hopping Cheep Cheep
		{ id: 0x43, type: EnemyType.Enemy, clan: 0, group: 2, yOffset: 0, name: "Pool-to-pool Hopping Cheep Cheep" }, // Pool-to-pool Hopping Cheep Cheep

		//{ id: 0x4A, type: EnemyType.Enemy, clan: 0, group: 4, yOffset: 0, name: "Boom-Boom", yOffset: 0 }, // Boom-Boom
		//{ id: 0x4B, type: EnemyType.Enemy, clan: 0, group: 4, yOffset: 0, name: "Jumping Boom-Boom", yOffset: 0 }, // Jumping Boom-Boom
		//{ id: 0x4C, type: EnemyType.Enemy, clan: 0, group: 4, yOffset: 0, name: "Flying Boom-Boom", yOffset: 0 }, // Flying Boom

		{ id: 0x82, type: EnemyType.Enemy, clan: 1, group: 0, yOffset: -1, name: "Boomerang Bro" }, // Boomerang Bros.
		{ id: 0x81, type: EnemyType.Enemy, clan: 1, group: 0, yOffset: -1, name: "Hammer Bro" }, // Hammer Bros.
		{ id: 0x87, type: EnemyType.Enemy, clan: 1, group: 0, yOffset: -1, name: "Fire Bro" }, // Fire Bros.
		{ id: 0x86, type: EnemyType.Enemy, clan: 1, group: 0, yOffset: -2, name: "Sledge Bro" }, // Sledge Bros.

		{ id: 0x59, type: EnemyType.Enemy, clan: 1, group: 1, yOffset: 0, name: "Firesnake" }, // Firesnake
		{ id: 0x58, type: EnemyType.Enemy, clan: 1, group: 1, yOffset: 0, name: "Fire Chomp" }, // Fire Chomp
		{ id: 0x9F, type: EnemyType.Enemy, clan: 1, group: 1, yOffset: 0, name: "Parabeetle" }, // Parabeetle

		{ id: 0x53, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Ceiling Podoboo" }, // Ceiling Podoboo
		{ id: 0x9E, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Podoboo" }, // Podoboo
		{ id: 0x51, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Synced Clockwise Dual Rotodisc" }, // Synced Clockwise Dual Rotodisc
		{ id: 0x5A, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Standard Clockwise Rotodisc" }, // Standard Clockwise Rotodisc
		{ id: 0x5B, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Counter-Clockwise Standard Rotodisc" }, // Counter-Clockwise Standard Rotodisc
		{ id: 0x5E, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Opposite Horizontal Meeting Dual Rotodisc" }, // Opposite Horizontal Meeting Dual Rotodisc
		{ id: 0x5F, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Opposite Vertical Meeting Dual Rotodisc" }, // Opposite Vertical Meeting Dual Rotodisc
		{ id: 0x60, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Synced Counter-Clockwise Dual Rotodisc" }, // Synced Counter-Clockwise Dual Rotodisc
		{ id: 0x8A, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Thwomp" }, // Thwomp
		{ id: 0x8B, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Left Sliding Thwomp" }, // Left Sliding Thwomp
		{ id: 0x8C, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Right Sliding Thwomp" }, // Right Sliding Thwomp
		{ id: 0x8D, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Vertical Sliding Thwomp" }, // Vertical Sliding Thwomp
		{ id: 0x8E, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Diagonal Up-Left Thwomp" }, // Diagonal Up-Left Thwomp
		{ id: 0x8F, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Diagonal Down-Left Thwomp" }, // Diagonal Down-Left Thwomp
		{ id: 0x2F, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Boo Diddley" }, // Boo Diddley
		{ id: 0x31, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Stretch Boo" }, // Stretch
		{ id: 0x32, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Upside-Down Stretch Boo" }, // Upside-Down Stretch Boo
		{ id: 0x30, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Shy Hot Foot" }, // Hot Foot (returns to flame if looked at)
		{ id: 0x45, type: EnemyType.Enemy, clan: 1, group: 2, yOffset: 0, name: "Hot Foot" }, // Hot Foot

		{ id: 0x68, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Upside-Down Buzzy" }, // Buzzy
		{ id: 0x70, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Buzzy" }, // Buzzy
		{ id: 0x84, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Spiny Egg" }, // Spiny Egg
		{ id: 0x85, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Dud Spiny Egg" }, // Dud Spiny Egg
		{ id: 0x69, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Upside-Down Spiny" }, // Upside-Down Spiny
		{ id: 0x71, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Spiny" }, // Spiny
		{ id: 0x83, type: EnemyType.Unique, clan: 1, group: 3, yOffset: 0, name: "Lakitu" }, // Lakitu
		{ id: 0x2B, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Kuribo's Goomba" }, // Kuribo's Goomba
		{ id: 0x55, type: EnemyType.Enemy, clan: 1, group: 3, yOffset: 0, name: "Bobomb" }, // Bobomb

		{ id: 0x50, type: EnemyType.Enemy, clan: 1, group: 4, yOffset: 0, name: "Ready-to-explode Bobomb" }, // Bobomb 2
		{ id: 0xAD, type: EnemyType.Enemy, clan: 1, group: 4, yOffset: 1, name: "Rocky Wrench" }, // Rocky Wrench

		//{ id: 0x0E, type: EnemyType.Enemy, clan: 1, group: 5, yOffset: 0, name: "Koopaling" }, // Koopaling (as appropriate to current world)

		{ id: 0x29, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Spike" }, // Spike
		{ id: 0x89, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Chain Chomp" }, // Chain Chomp
		{ id: 0x4F, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Chain Chomp Head" }, // Chain Chomp head
		{ id: 0x40, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Buster Beetle" }, // Buster Beetle
		{ id: 0x2A, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: -1, name: "Ptooie" }, // Ptooie
		{ id: 0x33, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Nipper" }, // Nipper
		{ id: 0x39, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Walking Nipper" }, // Walking Nipper
		{ id: 0x3D, type: EnemyType.Enemy, clan: 1, group: 6, yOffset: 0, name: "Fire Nipper" }, // Fire Nipper

		{ id: 0x62, type: EnemyType.Enemy, clan: 1, group: 7, yOffset: 0, name: "Blooper" }, // Blooper
		{ id: 0x61, type: EnemyType.Enemy, clan: 1, group: 7, yOffset: 0, name: "Mother Blooper" }, // Mother Bloopers
		{ id: 0x6A, type: EnemyType.Enemy, clan: 1, group: 7, yOffset: 0, name: "Shooting Mother Blooper" }, // Mother Bloopers
		{ id: 0x63, type: EnemyType.Enemy, clan: 1, group: 7, yOffset: 0, name: "Big Bertha" }, // Big Bertha, swims and shoots cheep cheeps
		{ id: 0x2D, type: EnemyType.Unique, clan: 1, group: 7, yOffset: 1, name: "Boss Bass" }, // Boss Bass
		{ id: 0x17, type: EnemyType.Enemy, clan: 1, group: 7, yOffset: 0, name: "Spiny Cheep Cheep" }, // Spiny Cheep Cheep
		{ id: 0x48, type: EnemyType.Enemy, clan: 1, group: 7, yOffset: 0, name: "Tiny Cheep Cheep" }, // Tiny Cheep Cheep

		{ id: 0x7C, type: EnemyType.Enemy, clan: 1, group: 8, yOffset: -1, name: "Big Goomba" }, // Big Goomba
		{ id: 0x7B, type: EnemyType.Enemy, clan: 1, group: 8, yOffset: -1, name: "Big Red Koopa" }, // Big Red Koopa
		{ id: 0x7A, type: EnemyType.Enemy, clan: 1, group: 8, yOffset: -1, name: "Big Green Koopa" }, // Big Green Koopa
		{ id: 0x7E, type: EnemyType.Enemy, clan: 1, group: 8, yOffset: -1, name: "Big Green Paratroopa" }, // Big, bouncing turtle
	],

	levels: [
		[ // world 1
			{ bytes3: 60, bytes4: 1, enemyCount: 11, enemyPointer: 0xCBF5, objectPointer: 0x232CF, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 5 ], },
			{ bytes3: 81, bytes4: 5, enemyCount: 15, enemyPointer: 0xC537, objectPointer: 0x1FB92,
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1", 
				mapOffset: [ 0 ], },
			{ bytes3: 99, bytes4: 32, enemyCount: 16, enemyPointer: 0xC6BA, objectPointer: 0x20F3A, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "2", 
				mapOffset: [ 2 ], },
			{ bytes3: 73, bytes4: 3, enemyCount: 15, enemyPointer: 0xC2FE, objectPointer: 0x1EE19, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "3", 
				mapOffset: [ 3 ], },
			{ bytes3: 94, bytes4: 0, enemyCount: 18, enemyPointer: 0xCC43, objectPointer: 0x23511, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "4", 
				mapOffset: [ 8 ], },
			{ bytes3: 102, bytes4: 55, enemyCount: 13, enemyPointer: 0xC93B, objectPointer: 0x1AA51, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "5", 
				mapOffset: [ 18 ], },
			{ bytes3: 97, bytes4: 11, enemyCount: 12, enemyPointer: 0xCC1D, objectPointer: 0x233B8, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "6", 
				mapOffset: [ 20 ], },
			{ bytes3: 13, bytes4: 39, enemyCount: 12, enemyPointer: 0xD33B, objectPointer: 0x2A96D, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress", 
				mapOffset: [ 11 ], },
			{ bytes3: 62, bytes4: 12, enemyCount: 16, enemyPointer: 0xD6FA, objectPointer: 0x2EDC7, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Ship, name: "Ship",
				mapOffset: [ ], },
			{ bytes3: 12, bytes4: 10, enemyCount: 15, enemyPointer: 0xC016, objectPointer: 0x1FCA3, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 8, bytes4: 6, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x1FA59, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 Bonus",
				mapOffset: [ ], },
			{ bytes3: 68, bytes4: 2, enemyCount: 1, enemyPointer: 0xCFE2, objectPointer: 0x2749A, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 Bonus",
				mapOffset: [ ], },
			{ bytes3: 5, bytes4: 2, enemyCount: 2, enemyPointer: 0xC594, objectPointer: 0x1FE58, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "4 End",
				mapOffset: [ ], },
			{ bytes3: 68, bytes4: 2, enemyCount: 1, enemyPointer: 0xD03C, objectPointer: 0x27884, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Bonus",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FD78, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 End",
				mapOffset: [ ], },
			{ bytes3: 7, bytes4: 12, enemyCount: 5, enemyPointer: 0xD361, objectPointer: 0x2AA3A, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Normal, name: "Fortress Spike Room",
				mapOffset: [ ], },
			{ bytes3: 21, bytes4: 0, enemyCount: 1, enemyPointer: 0xD9F6, objectPointer: 0x2FA12, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.Boss, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 4, bytes4: 1, enemyCount: 2, enemyPointer: 0xC73B, objectPointer: 0x213FB, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 1",
				mapOffset: [ 6, 1, 4, 7, 13, 19, 16 ], },
			{ bytes3: 5, bytes4: 1, enemyCount: 2, enemyPointer: 0xC73B, objectPointer: 0x21415, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 2",
				mapOffset: [ 10, 1, 4, 7, 15 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A847, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Castle",
				mapOffset: [ 17 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2EC39, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Ship Anchor",
				mapOffset: [ ], },
			{ bytes3: 47, bytes4: 3, enemyCount: 3, enemyPointer: 0xDA14, objectPointer: 0x2FC25, 
				type: LevelType.CoinShip, enemyType: LevelEnemyType.Normal, name: "Coin Ship",
				mapOffset: [ ], },
			{ bytes3: 25, bytes4: 0, enemyCount: 3, enemyPointer: 0xDA1F, objectPointer: 0x2FCC8, 
				type: LevelType.CoinShip | LevelType.Boss, enemyType: LevelEnemyType.CoinShipBoss, name: "Coin Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 9 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 14 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade",
				mapOffset: [ 12 ], },
		],
		[ // world 2
			{ bytes3: 5, bytes4: 1, enemyCount: 0, enemyPointer: 0xC012, objectPointer: 0x20CC5, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 22 ], },
			{ bytes3: 150, bytes4: 0, enemyCount: 18, enemyPointer: 0xD199, objectPointer: 0x2946F, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1",
				mapOffset: [ 12 ], },
			{ bytes3: 77, bytes4: 25, enemyCount: 13, enemyPointer: 0xC8A5, objectPointer: 0x218A8, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "2",
				mapOffset: [ 2 ], },
			{ bytes3: 137, bytes4: 0, enemyCount: 16, enemyPointer: 0xD200, objectPointer: 0x29925, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "3",
				mapOffset: [ 10 ], },
			{ bytes3: 216, bytes4: 1, enemyCount: 15, enemyPointer: 0xD26F, objectPointer: 0x29C88, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "4",
				mapOffset: [ 28 ], },
			{ bytes3: 117, bytes4: 1, enemyCount: 15, enemyPointer: 0xD1D1, objectPointer: 0x2974A, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "5",
				mapOffset: [ 40 ], },
			{ bytes3: 104, bytes4: 0, enemyCount: 16, enemyPointer: 0xD232, objectPointer: 0x29ACA, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress",
				mapOffset: [ 13 ], },
			{ bytes3: 38, bytes4: 19, enemyCount: 10, enemyPointer: 0xC853, objectPointer: 0x2161D, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Quicksand",
				mapOffset: [ 32 ], },
			{ bytes3: 80, bytes4: 34, enemyCount: 15, enemyPointer: 0xC5CC, objectPointer: 0x20587, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Pyramid Interior",
				mapOffset: [ ], },
			{ bytes3: 100, bytes4: 10, enemyCount: 19, enemyPointer: 0xD72C, objectPointer: 0x2EEBB, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Ship, name: "Ship" ,
				mapOffset: [ ], },
			{ bytes3: 87, bytes4: 0, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x2963B, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2B5, objectPointer: 0x29F28, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 End",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BA, objectPointer: 0x29F38, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 End",
				mapOffset: [ ], },
			{ bytes3: 28, bytes4: 4, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x298B7, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Bonus",
				mapOffset: [ ], },
			{ bytes3: 38, bytes4: 0, enemyCount: 3, enemyPointer: 0xD264, objectPointer: 0x29C0C, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Normal, name: "Fortress Spike Room",
				mapOffset: [ ], },
			{ bytes3: 58, bytes4: 0, enemyCount: 2, enemyPointer: 0xD107, objectPointer: 0x28F36, 
				type: LevelType.Entrance | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Pyramid",
				mapOffset: [ 42 ], },
			{ bytes3: 25, bytes4: 0, enemyCount: 1, enemyPointer: 0xD9FB, objectPointer: 0x2FA5B, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.ShipBoss, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 5, bytes4: 1, enemyCount: 0, enemyPointer: 0xC012, objectPointer: 0x20CC5, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hidden Hammer Bros",
				mapOffset: [ ], },
			{ bytes3: 11, bytes4: 0, enemyCount: 2, enemyPointer: 0xD15D, objectPointer: 0x29206, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 1",
				mapOffset: [ 1, 3, 4, 27, 29, 30, 6, 7, 8, 9, 11, 33, 14, 15, 35, 37, 17, 20, 21, 41, 23, 24, 44, 45, 46 ], },
			{ bytes3: 11, bytes4: 0, enemyCount: 3, enemyPointer: 0xD152, objectPointer: 0x29206, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 2",
				mapOffset: [ 34, 38, 39, 43 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC153, objectPointer: 0x1ADA9, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 19 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC153, objectPointer: 0x1ADF8, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 16 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A7F7, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Castle",
				mapOffset: [ 36 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2EC07, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Ship Anchor",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 18 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 5 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 3",
				mapOffset: [ 31 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 1",
				mapOffset: [ 0 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 2",
				mapOffset: [ 26 ], },
		],
		[ // world 3
			{ bytes3: 6, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1F3F7, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 22 ], },
			{ bytes3: 111, bytes4: 8, enemyCount: 12, enemyPointer: 0xCE35, objectPointer: 0x2531A, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Submerged, name: "1",
				mapOffset: [ 17 ], },
			{ bytes3: 76, bytes4: 3, enemyCount: 17, enemyPointer: 0xCA33, objectPointer: 0x227E0, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Amphibious, name: "2",
				mapOffset: [ 7 ], },
			{ bytes3: 61, bytes4: 28, enemyCount: 13, enemyPointer: 0xC59E, objectPointer: 0x1FE79, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Amphibious, name: "3",
				mapOffset: [ 3 ], },
			{ bytes3: 107, bytes4: 20, enemyCount: 16, enemyPointer: 0xC9C3, objectPointer: 0x1B729, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "4",
				mapOffset: [ 9 ], },
			{ bytes3: 129, bytes4: 13, enemyCount: 14, enemyPointer: 0xCDFB, objectPointer: 0x2506A, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Submerged, name: "5",
				mapOffset: [ 20 ], },
			{ bytes3: 62, bytes4: 16, enemyCount: 11, enemyPointer: 0xCA73, objectPointer: 0x22949, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "6",
				mapOffset: [ 27 ], },
			{ bytes3: 116, bytes4: 4, enemyCount: 21, enemyPointer: 0xC47E, objectPointer: 0x1F8CC, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "7",
				mapOffset: [ 29 ], },
			{ bytes3: 50, bytes4: 32, enemyCount: 6, enemyPointer: 0xC964, objectPointer: 0x1AC69, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Amphibious, name: "8",
				mapOffset: [ 31 ], },
			{ bytes3: 160, bytes4: 8, enemyCount: 22, enemyPointer: 0xC39F, objectPointer: 0x1F118, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "9",
				mapOffset: [ 38 ], },
			{ bytes3: 39, bytes4: 18, enemyCount: 16, enemyPointer: 0xD3A3, objectPointer: 0x2AB91, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 1",
				mapOffset: [ 13 ], },
			{ bytes3: 12, bytes4: 25, enemyCount: 9, enemyPointer: 0xD372, objectPointer: 0x2AA89, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 2",
				mapOffset: [ 34 ], },
			{ bytes3: 89, bytes4: 7, enemyCount: 21, enemyPointer: 0xD767, objectPointer: 0x2F019, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Normal, name: "Ship",
				mapOffset: [ ], },
			{ bytes3: 3, bytes4: 1, enemyCount: 1, enemyPointer: 0xC4BF, objectPointer: 0x1FA42, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 End",
				mapOffset: [ ], },
			{ bytes3: 27, bytes4: 5, enemyCount: 3, enemyPointer: 0xCA68, objectPointer: 0x228DA, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 End",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 3, enemyCount: 1, enemyPointer: 0xC5C7, objectPointer: 0x1FFAA, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 End",
				mapOffset: [ ], },
			{ bytes3: 39, bytes4: 26, enemyCount: 2, enemyPointer: 0xC990, objectPointer: 0x1B29B, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Bonus",
				mapOffset: [ ], },
			{ bytes3: 8, bytes4: 5, enemyCount: 2, enemyPointer: 0xC32D, objectPointer: 0x1EF0A, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 End",
				mapOffset: [ ], },
			{ bytes3: 8, bytes4: 3, enemyCount: 2, enemyPointer: 0xCA96, objectPointer: 0x22A4D, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "6 End",
				mapOffset: [ ], },
			{ bytes3: 13, bytes4: 2, enemyCount: 4, enemyPointer: 0xCE99, objectPointer: 0x26B5F, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "7 Bonus",
				mapOffset: [ ], },
			{ bytes3: 9, bytes4: 4, enemyCount: 1, enemyPointer: 0xC56B, objectPointer: 0x1FD43, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "8 End",
				mapOffset: [ ], },
			{ bytes3: 39, bytes4: 26, enemyCount: 1, enemyPointer: 0xC993, objectPointer: 0x1B29B, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "9 Bonus",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC3E3, objectPointer: 0x1F322, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "9 End",
				mapOffset: [ ], },
			{ bytes3: 40, bytes4: 23, enemyCount: 3, enemyPointer: 0xD3D5, objectPointer: 0x2AC58, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 1 Water Room",
				mapOffset: [ ], },
			{ bytes3: 8, bytes4: 21, enemyCount: 6, enemyPointer: 0xD38F, objectPointer: 0x2AB1B, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 2 Water Room",
				mapOffset: [ ], },
			{ bytes3: 25, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA00, objectPointer: 0x2FAB0, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.ShipBoss, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1F3F7, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 1",
				mapOffset: [ 1, 25, 14, 5, 6, 10, 16, 37, 44, 28, 32, 45, 30, 50, ], },
			{ bytes3: 5, bytes4: 2, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1F417, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 2",
				mapOffset: [ 11, 15, ], },
			{ bytes3: 6, bytes4: 2, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1FE0B, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 3",
				mapOffset: [ 2, 8, ], },
			{ bytes3: 7, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1FDE8, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 4",
				mapOffset: [ 18, 21, ], },
			// objectPointer points to an address between 0x21294 (7-3) and 0x213FB (world 1 hammer bros)
			// but somehow smb3 workshop has it listed and loads a level for it, lets just pretend this doesnt exist
			//{ bytes3: 4, bytes4: 2, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x213F7,
			//	type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hidden Hammer Bros",
			//	mapOffset: [ ], }, 
			{ bytes3: 16, bytes4: 9, enemyCount: 1, enemyPointer: 0xC158, objectPointer: 0x1AF91, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 23 ], },
			{ bytes3: 16, bytes4: 9, enemyCount: 1, enemyPointer: 0xC158, objectPointer: 0x1AFEF, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 19 ], },
			{ bytes3: 16, bytes4: 8, enemyCount: 1, enemyPointer: 0xC15D, objectPointer: 0x1AE47, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe B End 1",
				mapOffset: [ 26 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 1, enemyPointer: 0xC15D, objectPointer: 0x1AEA4, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe B End 2",
				mapOffset: [ 40 ], },
			{ bytes3: 14, bytes4: 5, enemyCount: 1, enemyPointer: 0xC162, objectPointer: 0x1AF01, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe C End 1",
				mapOffset: [ 39 ], },
			{ bytes3: 14, bytes4: 5, enemyCount: 1, enemyPointer: 0xC162, objectPointer: 0x1AF49, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe C End 2",
				mapOffset: [ 51 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A807, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Castle",
				mapOffset: [ 49 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2EC20, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Ship Anchor",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 0 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 4 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 3",
				mapOffset: [ 36 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 4",
				mapOffset: [ 42 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 5",
				mapOffset: [ 48 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 1",
				mapOffset: [ 12 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 2",
				mapOffset: [ 24 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 3",
				mapOffset: [ 33 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 4",
				mapOffset: [ 33 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 5",
				mapOffset: [ 35 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 6",
				mapOffset: [ 43 ], },
		],
		[ // world 4
			{ bytes3: 5, bytes4: 0, enemyCount: 2, enemyPointer: 0xD0FA, objectPointer: 0x27F6E, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 0 ], },
			{ bytes3: 85, bytes4: 6, enemyCount: 12, enemyPointer: 0xCEA7, objectPointer: 0x26B98, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1",
				mapOffset: [ 32 ], },
			{ bytes3: 68, bytes4: 1, enemyCount: 14, enemyPointer: 0xCF24, objectPointer: 0x27077, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Amphibious, name: "2",
				mapOffset: [ 20 ], },
			{ bytes3: 99, bytes4: 36, enemyCount: 16, enemyPointer: 0xC873, objectPointer: 0x216E5, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 Interior",
				mapOffset: [ ], },
			{ bytes3: 81, bytes4: 2, enemyCount: 6, enemyPointer: 0xCFC9, objectPointer: 0x272BD, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Submerged, name: "4",
				mapOffset: [ 29 ], },
			{ bytes3: 86, bytes4: 0, enemyCount: 19, enemyPointer: 0xCFFC, objectPointer: 0x2773C, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "5",
				mapOffset: [ 12 ], },
			{ bytes3: 95, bytes4: 4, enemyCount: 23, enemyPointer: 0xC267, objectPointer: 0x1EAEF, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "6",
				mapOffset: [ 3 ], },
			{ bytes3: 16, bytes4: 29, enemyCount: 13, enemyPointer: 0xD538, objectPointer: 0x2B6B6, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 1",
				mapOffset: [ 16 ], },
			{ bytes3: 30, bytes4: 33, enemyCount: 10, enemyPointer: 0xD518, objectPointer: 0x2B5CE, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 2",
				mapOffset: [ 9 ], },
			{ bytes3: 109, bytes4: 10, enemyCount: 25, enemyPointer: 0xD7A8, objectPointer: 0x2F14A, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Ship, name: "Ship",
				mapOffset: [ ], },
			{ bytes3: 9, bytes4: 5, enemyCount: 2, enemyPointer: 0xD041, objectPointer: 0x27962, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FDC8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 End",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FDC8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 End",
				mapOffset: [ ], },
			{ bytes3: 26, bytes4: 0, enemyCount: 2, enemyPointer: 0xCF1C, objectPointer: 0x2701F, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "3",
				mapOffset: [ 18 ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FDC8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 End",
				mapOffset: [ ], },
			{ bytes3: 75, bytes4: 5, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x1FA93, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "4 Bonus",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FDC8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "4 End",
				mapOffset: [ ], },
			{ bytes3: 11, bytes4: 5, enemyCount: 2, enemyPointer: 0xC335, objectPointer: 0x1EF40, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Bonus",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FDC8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 End",
				mapOffset: [ ], },
			{ bytes3: 95, bytes4: 4, enemyCount: 23, enemyPointer: 0xC1EA, objectPointer: 0x1E885, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "6 Small",
				mapOffset: [ ], },
			{ bytes3: 24, bytes4: 9, enemyCount: 4, enemyPointer: 0xC978, objectPointer: 0x1B149, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 1 Underground Room",
				mapOffset: [ ], },
			{ bytes3: 45, bytes4: 0, enemyCount: 4, enemyPointer: 0xCE27, objectPointer: 0x25289, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 2 Underground Room",
				mapOffset: [ ], },
			// the address for this is wrong in smb3 workshop, its listed as 0x1B385
			// it skips the "starry background" object, 3 bytes from the actual start of object data
			{ bytes3: 15, bytes4: 11, enemyCount: 2, enemyPointer: 0xC998, objectPointer: 0x1B382, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 2 Bonus",
				mapOffset: [ ], },
			{ bytes3: 25, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6B1, objectPointer: 0x2EC52, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.ShipBoss, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 2, enemyPointer: 0xD0FA, objectPointer: 0x27F6E, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros",
				mapOffset: [ 5, 7, 8, 4, 13, 14, 21, 27, 22, 28, 23, 17, 19, 26 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC167, objectPointer: 0x1ADA9, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 1 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC167, objectPointer: 0x1ADF8, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 31 ], },
			{ bytes3: 16, bytes4: 9, enemyCount: 1, enemyPointer: 0xC16C, objectPointer: 0x1AF91, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe B End 1",
				mapOffset: [ 10 ], },
			{ bytes3: 16, bytes4: 9, enemyCount: 1, enemyPointer: 0xC16C, objectPointer: 0x1AFEF, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe B End 2",
				mapOffset: [ 15 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A817, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Castle",
				mapOffset: [ 6 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2F435, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "ShipAnchor",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 30 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 25 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 3",
				mapOffset: [ 33 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 4",
				mapOffset: [ 2 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 1",
				mapOffset: [ 24 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 2",
				mapOffset: [ 11 ], },
		],
		[ // world 5
			{ bytes3: 5, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x20CC5, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 16 ], },
			{ bytes3: 112, bytes4: 42, enemyCount: 16, enemyPointer: 0xC3F2, objectPointer: 0x1F45B, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1",
				mapOffset: [ 5 ], },
			{ bytes3: 134, bytes4: 58, enemyCount: 21, enemyPointer: 0xC8CE, objectPointer: 0x1A587, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "2",
				mapOffset: [ 1 ], },
			{ bytes3: 115, bytes4: 26, enemyCount: 26, enemyPointer: 0xC2AE, objectPointer: 0x1EC4E, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 Interior",
				mapOffset: [ ], },
			{ bytes3: 54, bytes4: 10, enemyCount: 15, enemyPointer: 0xD049, objectPointer: 0x27A5C, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "4",
				mapOffset: [ 26 ], },
			{ bytes3: 100, bytes4: 1, enemyCount: 14, enemyPointer: 0xCB1A, objectPointer: 0x22F12, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "5",
				mapOffset: [ 23 ], },
			{ bytes3: 53, bytes4: 6, enemyCount: 19, enemyPointer: 0xCF50, objectPointer: 0x27151, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "6",
				mapOffset: [ 41 ], },
			{ bytes3: 91, bytes4: 15, enemyCount: 15, enemyPointer: 0xCEED, objectPointer: 0x26EC8, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "7",
				mapOffset: [ 33 ], },
			{ bytes3: 69, bytes4: 0, enemyCount: 5, enemyPointer: 0xCE80, objectPointer: 0x26A6F, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "8",
				mapOffset: [ 38 ], },
			{ bytes3: 39, bytes4: 11, enemyCount: 20, enemyPointer: 0xCF8B, objectPointer: 0x27212, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "9",
				mapOffset: [ 37 ], },
			{ bytes3: 17, bytes4: 80, enemyCount: 14, enemyPointer: 0xD3E0, objectPointer: 0x2AD36, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 1",
				mapOffset: [ 12 ], },
			{ bytes3: 21, bytes4: 24, enemyCount: 6, enemyPointer: 0xD4FC, objectPointer: 0x2B485, 
				type: LevelType.Tower | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Tower 1",
				mapOffset: [ 10 ], },
			{ bytes3: 22, bytes4: 21, enemyCount: 2, enemyPointer: 0xD510, objectPointer: 0x2B52E, 
				type: LevelType.Tower, enemyType: LevelEnemyType.Fortress, name: "Tower 2",
				mapOffset: [ ], },
			{ bytes3: 32, bytes4: 5, enemyCount: 26, enemyPointer: 0xD2C9, objectPointer: 0x2A8C2, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 2 Room 2",
				mapOffset: [ ], },
			{ bytes3: 74, bytes4: 14, enemyCount: 22, enemyPointer: 0xD6B6, objectPointer: 0x2ECA7, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Ship, name: "Ship",
				mapOffset: [ ], },
			{ bytes3: 9, bytes4: 18, enemyCount: 3, enemyPointer: 0xC424, objectPointer: 0x1F65D, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 123, bytes4: 1, enemyCount: 3, enemyPointer: 0xCE5B, objectPointer: 0x25491, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 Pipe",
				mapOffset: [ ], },
			{ bytes3: 34, bytes4: 10, enemyCount: 2, enemyPointer: 0xC9A0, objectPointer: 0x1B3E8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 Bonus",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FD78, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 End",
				mapOffset: [ ], },
			{ bytes3: 6, bytes4: 3, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x1EC26, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "3",
				mapOffset: [ 3 ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 1, enemyPointer: 0xC570, objectPointer: 0x1FD78, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 End",
				mapOffset: [ ], },
			{ bytes3: 3, bytes4: 1, enemyCount: 2, enemyPointer: 0xCE91, objectPointer: 0x26B48, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "4 End",
				mapOffset: [ ], },
			{ bytes3: 34, bytes4: 10, enemyCount: 1, enemyPointer: 0xC9A3, objectPointer: 0x1B3E8, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Bonus",
				mapOffset: [ ], },
			{ bytes3: 3, bytes4: 1, enemyCount: 2, enemyPointer: 0xCE91, objectPointer: 0x26B48, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "6 End",
				mapOffset: [ ], },
			{ bytes3: 62, bytes4: 4, enemyCount: 3, enemyPointer: 0xC176, objectPointer: 0x1E509, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "7 Bonus",
				mapOffset: [ ], },
			{ bytes3: 3, bytes4: 1, enemyCount: 2, enemyPointer: 0xCE91, objectPointer: 0x26B48, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "8 End",
				mapOffset: [ ], },
			{ bytes3: 3, bytes4: 1, enemyCount: 2, enemyPointer: 0xCE91, objectPointer: 0x26B48, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "9 End",
				mapOffset: [ ], },
			{ bytes3: 15, bytes4: 7, enemyCount: 1, enemyPointer: 0xD40C, objectPointer: 0x2AEB3, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 69, bytes4: 7, enemyCount: 2, enemyPointer: 0xCFF4, objectPointer: 0x27647, 
				type: LevelType.Tower, enemyType: LevelEnemyType.Arial, name: "Tower Outside 1",
				mapOffset: [ ], },
			{ bytes3: 37, bytes4: 4, enemyCount: 2, enemyPointer: 0xCFEC, objectPointer: 0x275BE, 
				type: LevelType.Tower, enemyType: LevelEnemyType.Arial, name: "Tower Outside 2",
				mapOffset: [ ], },
			{ bytes3: 20, bytes4: 0, enemyCount: 1, enemyPointer: 0xCFE7, objectPointer: 0x27578, 
				type: LevelType.Tower | LevelType.Exit, enemyType: LevelEnemyType.Arial, name: "Tower Going Down",
				mapOffset: [ 21 ], },
			{ bytes3: 14, bytes4: 5, enemyCount: 1, enemyPointer: 0xC171, objectPointer: 0x1AF01, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 6 ], },
			{ bytes3: 15, bytes4: 5, enemyCount: 1, enemyPointer: 0xC171, objectPointer: 0x1AF49, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 7 ], },
			{ bytes3: 7, bytes4: 15, enemyCount: 1, enemyPointer: 0xD2C4, objectPointer: 0x2A867, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 2",
				mapOffset: [ 31 ], },
			{ bytes3: 25, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA05, objectPointer: 0x2FB05, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.Ship, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 5, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x20CC5, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 1",
				mapOffset: [ 11, 0, 17, 13, 8, 14, 4, 9, 15 ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x21432, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 2",
				mapOffset: [ 19 ], },
			{ bytes3: 9, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x27FC3, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 3",
				mapOffset: [ 22 ], },
			{ bytes3: 6, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x2799B, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 4",
				mapOffset: [ 36, 24, 30, 25, 32, 39, 27, 34 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A827, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Castle",
				mapOffset: [ 35 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2F44E, 
				type: LevelType.ShipAnchor, enemyType: LevelEnemyType.None, name: "Ship Anchor",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 2 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 20 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 3",
				mapOffset: [ 40 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 1",
				mapOffset: [ 18 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 2",
				mapOffset: [ 28 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 3",
				mapOffset: [ 29 ], },
		],
		[ // world 6
			{ bytes3: 5, bytes4: 0, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x23F20, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 5 ], },
			{ bytes3: 39, bytes4: 5, enemyCount: 11, enemyPointer: 0xCBD2, objectPointer: 0x2323C, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1",
				mapOffset: [ 7 ], },
			{ bytes3: 68, bytes4: 0, enemyCount: 19, enemyPointer: 0xCB62, objectPointer: 0x2315C, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "2",
				mapOffset: [ 2 ], },
			{ bytes3: 93, bytes4: 0, enemyCount: 9, enemyPointer: 0xCA9E, objectPointer: 0x22A7B, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "3",
				mapOffset: [ 15 ], },
			{ bytes3: 129, bytes4: 2, enemyCount: 17, enemyPointer: 0xCC7B, objectPointer: 0x23635, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "4",
				mapOffset: [ 31 ], },
			{ bytes3: 99, bytes4: 33, enemyCount: 11, enemyPointer: 0xC5FB, objectPointer: 0x207E7, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Interior",
				mapOffset: [ ], },
			{ bytes3: 120, bytes4: 55, enemyCount: 31, enemyPointer: 0xC65B, objectPointer: 0x20CEC, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "6 Interior",
				mapOffset: [ ], },
			{ bytes3: 148, bytes4: 0, enemyCount: 4, enemyPointer: 0xCD27, objectPointer: 0x23AFA, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "7",
				mapOffset: [ 37 ], },
			{ bytes3: 132, bytes4: 24, enemyCount: 20, enemyPointer: 0xC9F5, objectPointer: 0x1B8C4, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "8",
				mapOffset: [ 29 ], },
			{ bytes3: 156, bytes4: 64, enemyCount: 16, enemyPointer: 0xC61E, objectPointer: 0x209E7, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "9 Interior",
				mapOffset: [ ], },
			{ bytes3: 111, bytes4: 0, enemyCount: 15, enemyPointer: 0xCCF8, objectPointer: 0x239A3, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Submerged, name: "10",
				mapOffset: [ 56 ], },
			{ bytes3: 24, bytes4: 23, enemyCount: 11, enemyPointer: 0xD4C0, objectPointer: 0x2B161, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 1",
				mapOffset: [ 9 ], },
			{ bytes3: 86, bytes4: 0, enemyCount: 11, enemyPointer: 0xCABB, objectPointer: 0x22B9C, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 2",
				mapOffset: [ 27 ], },
			{ bytes3: 38, bytes4: 30, enemyCount: 16, enemyPointer: 0xD480, objectPointer: 0x2B042, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 3",
				mapOffset: [ 48 ], },
			{ bytes3: 112, bytes4: 6, enemyCount: 15, enemyPointer: 0xD7F5, objectPointer: 0x2F2C3, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Ship, name: "Ship",
				mapOffset: [ ], },
			{ bytes3: 25, bytes4: 0, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x23F39, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 7, bytes4: 2, enemyCount: 1, enemyPointer: 0xCC18, objectPointer: 0x23391, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 End",
				mapOffset: [ ], },
			{ bytes3: 72, bytes4: 36, enemyCount: 2, enemyPointer: 0xC9AB, objectPointer: 0x1B480, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "3 Bonus",
				mapOffset: [ ], },
			{ bytes3: 14, bytes4: 2, enemyCount: 1, enemyPointer: 0xD037, objectPointer: 0x27848, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "4 Bonus",
				mapOffset: [ ], },
			{ bytes3: 71, bytes4: 1, enemyCount: 1, enemyPointer: 0xCAE3, objectPointer: 0x22CFA, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "5",
				mapOffset: [ 39 ], },
			{ bytes3: 28, bytes4: 1, enemyCount: 2, enemyPointer: 0xCCF0, objectPointer: 0x23941, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "6",
				mapOffset: [ 25 ], },
			{ bytes3: 16, bytes4: 1, enemyCount: 2, enemyPointer: 0xCD35, objectPointer: 0x23CC0, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "7 End",
				mapOffset: [ ], },
			{ bytes3: 17, bytes4: 1, enemyCount: 2, enemyPointer: 0xCD3D, objectPointer: 0x23CFE, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "9",
				mapOffset: [ 44 ], },
			{ bytes3: 72, bytes4: 36, enemyCount: 3, enemyPointer: 0xC9A8, objectPointer: 0x1B480, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "9 Bonus",
				mapOffset: [ ], },
			{ bytes3: 72, bytes4: 36, enemyCount: 1, enemyPointer: 0xC9AE, objectPointer: 0x1B480, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "10 Bonus",
				mapOffset: [ ], },
			{ bytes3: 27, bytes4: 13, enemyCount: 5, enemyPointer: 0xD4E3, objectPointer: 0x2B20F, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 1 Spike Room",
				mapOffset: [ ], },
			{ bytes3: 24, bytes4: 0, enemyCount: 1, enemyPointer: 0xCADE, objectPointer: 0x22CA8, 
				type: LevelType.Fortress | LevelType.Boss, enemyType: LevelEnemyType.Fortress, name: "Fortress 2 Boss",
				mapOffset: [ ], },
			{ bytes3: 7, bytes4: 3, enemyCount: 4, enemyPointer: 0xD4B2, objectPointer: 0x2B136, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 3 Fall",
				mapOffset: [ ], },
			{ bytes3: 34, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA0A, objectPointer: 0x2FB5A, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.ShipBoss, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x23F20, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 1",
				mapOffset: [ 6, 13, 3, 10, 11, 24, 32, 34, 40, 18, 20, 35, 41, 19, 21, 28, 36, 22, 43, 30, 47, 54, 45, 55, 46, 49, 50, 51, 52 ], },
			{ bytes3: 6, bytes4: 0, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x23F8E, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 2",
				mapOffset: [ 1, 38, 26 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC149, objectPointer: 0x1ADA9, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 12 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC149, objectPointer: 0x1ADF8, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 4 ], },
			{ bytes3: 10, bytes4: 5, enemyCount: 1, enemyPointer: 0xC14E, objectPointer: 0x1B04D, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe B End 1",
				mapOffset: [ 23 ], },
			{ bytes3: 10, bytes4: 5, enemyCount: 1, enemyPointer: 0xC14E, objectPointer: 0x1B089, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe B End 2",
				mapOffset: [ 17 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A837, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Castle",
				mapOffset: [ 53 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2F467, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Ship Anchor",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 0 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 33 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 1",
				mapOffset: [ 8 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 2",
				mapOffset: [ 16 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 3",
				mapOffset: [ 42 ], },
		],
		[ // world 7
			{ bytes3: 7, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1F438, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 0 ], },
			{ bytes3: 149, bytes4: 0, enemyCount: 15, enemyPointer: 0xCDA3, objectPointer: 0x24BA7, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Interior",
				mapOffset: [ ], },
			{ bytes3: 157, bytes4: 2, enemyCount: 20, enemyPointer: 0xD114, objectPointer: 0x28FFE, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "2",
				mapOffset: [ 19 ], },
			{ bytes3: 87, bytes4: 22, enemyCount: 18, enemyPointer: 0xC703, objectPointer: 0x21294, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "3",
				mapOffset: [ 22 ], },
			{ bytes3: 106, bytes4: 3, enemyCount: 13, enemyPointer: 0xCDD2, objectPointer: 0x24DD4, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Submerged, name: "4 Interior",
				mapOffset: [ ], },
			{ bytes3: 62, bytes4: 38, enemyCount: 17, enemyPointer: 0xC181, objectPointer: 0x1E5DD, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "5 Interior",
				mapOffset: [ ], },
			{ bytes3: 132, bytes4: 0, enemyCount: 8, enemyPointer: 0xCE66, objectPointer: 0x25610, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "6 Interior",
				mapOffset: [ ], },
			{ bytes3: 153, bytes4: 3, enemyCount: 10, enemyPointer: 0xCD45, objectPointer: 0x23D3F, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Piranha, name: "7 Interior",
				mapOffset: [ ], },
			{ bytes3: 129, bytes4: 3, enemyCount: 32, enemyPointer: 0xC33D, objectPointer: 0x1EF7F, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Piranha, name: "8",
				mapOffset: [ 33 ], },
			{ bytes3: 178, bytes4: 0, enemyCount: 15, enemyPointer: 0xD16A, objectPointer: 0x2924F, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "9",
				mapOffset: [ 38 ], },
			{ bytes3: 59, bytes4: 0, enemyCount: 7, enemyPointer: 0xD08C, objectPointer: 0x27C33, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Piranha, name: "Plant 1",
				mapOffset: [ 11 ], },
			{ bytes3: 77, bytes4: 19, enemyCount: 2, enemyPointer: 0xD4F4, objectPointer: 0x2B29E, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 1",
				mapOffset: [ 5 ], },
			{ bytes3: 30, bytes4: 29, enemyCount: 21, enemyPointer: 0xD42B, objectPointer: 0x2AF10, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress 2",
				mapOffset: [ 40 ], },
			{ bytes3: 83, bytes4: 0, enemyCount: 6, enemyPointer: 0xD078, objectPointer: 0x27B30, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Piranha, name: "Plant 2",
				mapOffset: [ 45 ], },
			{ bytes3: 116, bytes4: 10, enemyCount: 27, enemyPointer: 0xD824, objectPointer: 0x2F499, 
				type: LevelType.Ship, enemyType: LevelEnemyType.Ship, name: "Ship",
				mapOffset: [ ], },
			{ bytes3: 15, bytes4: 4, enemyCount: 1, enemyPointer: 0xC25D, objectPointer: 0x1EA71, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1",
				mapOffset: [ 6 ], },
			{ bytes3: 3, bytes4: 1, enemyCount: 1, enemyPointer: 0xC4BF, objectPointer: 0x1FA42, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 End",
				mapOffset: [ ], },
			{ bytes3: 17, bytes4: 10, enemyCount: 1, enemyPointer: 0xC3ED, objectPointer: 0x1F392, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "4",
				mapOffset: [ 16 ], },
			{ bytes3: 16, bytes4: 4, enemyCount: 1, enemyPointer: 0xC566, objectPointer: 0x1FCF9, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "5",
				mapOffset: [ 35 ], },
			{ bytes3: 18, bytes4: 4, enemyCount: 1, enemyPointer: 0xC3E8, objectPointer: 0x1F342, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "6",
				mapOffset: [ 24 ], },
			{ bytes3: 7, bytes4: 6, enemyCount: 1, enemyPointer: 0xC262, objectPointer: 0x1EAB8, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "7",
				mapOffset: [ 25 ], },
			{ bytes3: 14, bytes4: 2, enemyCount: 1, enemyPointer: 0xD102, objectPointer: 0x27F87, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "8 Bonus 1",
				mapOffset: [ ], },
			// the address for this is wrong in smb3 workshop, its listed as 0x1B5F5
			// again, it skips the "starry background" object, 3 bytes from the actual start of object data
			{ bytes3: 16, bytes4: 15, enemyCount: 2, enemyPointer: 0xC9B3, objectPointer: 0x1B5F2,
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "8 Bonus 2",
				mapOffset: [ ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD10F, objectPointer: 0x28FEE, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "9 End",
				mapOffset: [ ], },
			{ bytes3: 43, bytes4: 0, enemyCount: 2, enemyPointer: 0xD0F2, objectPointer: 0x27EE3, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Plant 1 End",
				mapOffset: [ ], },
			{ bytes3: 36, bytes4: 13, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x2B3DB, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 1 Lonely",
				mapOffset: [ ], },
			// the address for this is wrong in smb3 workshop, its listed as 0x1B5F5
			// again, it skips the "starry background" object, 3 bytes from the actual start of object data
			{ bytes3: 16, bytes4: 15, enemyCount: 1, enemyPointer: 0xC9B6, objectPointer: 0x1B5F2,
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress 1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 4, bytes4: 17, enemyCount: 6, enemyPointer: 0xD46C, objectPointer: 0x2AFE8, 
				type: LevelType.Fortress | LevelType.Boss, enemyType: LevelEnemyType.Fortress, name: "Fortress 2 Boss",
				mapOffset: [ ], },
			{ bytes3: 43, bytes4: 0, enemyCount: 2, enemyPointer: 0xD0EA, objectPointer: 0x27E58, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Plant 2 End",
				mapOffset: [ ], },
			{ bytes3: 27, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA0F, objectPointer: 0x2FBCA, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.ShipBoss, name: "Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 7, bytes4: 1, enemyCount: 3, enemyPointer: 0xC650, objectPointer: 0x1F438, 
				type: LevelType.HammerBro, enemyType: LevelEnemyType.HammerBro, name: "Hammer Bros 1",
				mapOffset: [ 1, 2, 26, 12, 32, 15, 18, 39, 44 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC126, objectPointer: 0x1ADA9, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 8 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC126, objectPointer: 0x1ADF8, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 4 ], },
			{ bytes3: 10, bytes4: 5, enemyCount: 1, enemyPointer: 0xC135, objectPointer: 0x1B04D, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe B End 1",
				mapOffset: [ 7 ], },
			{ bytes3: 10, bytes4: 5, enemyCount: 1, enemyPointer: 0xC135, objectPointer: 0x1B089, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe B End 2",
				mapOffset: [ 13 ], },
			{ bytes3: 14, bytes4: 5, enemyCount: 1, enemyPointer: 0xC12B, objectPointer: 0x1AF01, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe C End 1",
				mapOffset: [ 14 ], },
			{ bytes3: 14, bytes4: 5, enemyCount: 1, enemyPointer: 0xC12B, objectPointer: 0x1AF49, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe C End 2",
				mapOffset: [ 3 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 1, enemyPointer: 0xC130, objectPointer: 0x1AE47, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe D End 1",
				mapOffset: [ 20 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 1, enemyPointer: 0xC130, objectPointer: 0x1AEA4, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe D End 2",
				mapOffset: [ 41 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 1, enemyPointer: 0xC121, objectPointer: 0x1AE47, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe E End 1",
				mapOffset: [ 36 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 1, enemyPointer: 0xC121, objectPointer: 0x1AEA4, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe E End 2",
				mapOffset: [ 28 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 0, enemyPointer: 0xC143, objectPointer: 0x1AE47, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe F End 1",
				mapOffset: [ 21 ], },
			{ bytes3: 17, bytes4: 8, enemyCount: 0, enemyPointer: 0xC143, objectPointer: 0x1AEA4, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe F End 2",
				mapOffset: [ 29 ], },
			{ bytes3: 16, bytes4: 9, enemyCount: 1, enemyPointer: 0xC13A, objectPointer: 0x1AF91, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe G End 1",
				mapOffset: [ 10 ], },
			{ bytes3: 16, bytes4: 9, enemyCount: 1, enemyPointer: 0xC13A, objectPointer: 0x1AFEF, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe G End 2",
				mapOffset: [ 37 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC13F, objectPointer: 0x1ADA9, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe H End 1",
				mapOffset: [ 30 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 1, enemyPointer: 0xC13F, objectPointer: 0x1ADF8, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe H End 2",
				mapOffset: [ 27 ], },
			{ bytes3: 2, bytes4: 0, enemyCount: 1, enemyPointer: 0xD2BF, objectPointer: 0x2A857, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Castle",
				mapOffset: [ 43 ], },
			{ bytes3: 5, bytes4: 0, enemyCount: 1, enemyPointer: 0xD6AC, objectPointer: 0x2F480, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Ship Anchor",
				mapOffset: [ ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 1",
				mapOffset: [ 9 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 2",
				mapOffset: [ 42 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.ToadHouse, enemyType: LevelEnemyType.None, name: "Toad House 3",
				mapOffset: [ 34 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 1",
				mapOffset: [ 17 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 2",
				mapOffset: [ 23 ], },
			{ bytes3: 0, bytes4: 0, enemyCount: 0, enemyPointer: 0x0, objectPointer: 0x0, 
				type: LevelType.Spade, enemyType: LevelEnemyType.None, name: "Spade 3",
				mapOffset: [ 31 ], },
		],
		[ // world 8
			{ bytes3: 7, bytes4: 6, enemyCount: 16, enemyPointer: 0xC04D, objectPointer: 0x1EAB8, 
				type: LevelType.Start, enemyType: LevelEnemyType.None, name: "Start",
				mapOffset: [ 1 ], },
			{ bytes3: 89, bytes4: 8, enemyCount: 24, enemyPointer: 0xC434, objectPointer: 0x1F797, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "1",
				mapOffset: [ 25 ], },
			{ bytes3: 144, bytes4: 35, enemyCount: 14, enemyPointer: 0xC90F, objectPointer: 0x1A80B, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "2",
				mapOffset: [ 29 ], },
			{ bytes3: 91, bytes4: 5, enemyCount: 39, enemyPointer: 0xD97F, objectPointer: 0x2F8E3, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.Ship, name: "Tank 1",
				mapOffset: [ 5 ], },
			{ bytes3: 73, bytes4: 18, enemyCount: 26, enemyPointer: 0xD8DC, objectPointer: 0x2F6C1, // 2F6C1
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.Ship, name: "Battleship",
				mapOffset: [ 7 ], },
			{ bytes3: 11, bytes4: 9, enemyCount: 5, enemyPointer: 0xD0C0, objectPointer: 0x27D50, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Hand Trap 1",
				mapOffset: [ 16 ], },
			{ bytes3: 20, bytes4: 7, enemyCount: 9, enemyPointer: 0xD0A3, objectPointer: 0x27CEE, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Arial, name: "Hand Trap 2",
				mapOffset: [ 15 ], },
			{ bytes3: 34, bytes4: 6, enemyCount: 4, enemyPointer: 0xD0D1, objectPointer: 0x27D9F, 
				type: LevelType.Regular | LevelType.Entrance, enemyType: LevelEnemyType.Spawner, name: "Hand Trap 3",
				mapOffset: [ 14 ], },
			{ bytes3: 44, bytes4: 3, enemyCount: 33, enemyPointer: 0xD877, objectPointer: 0x2F627, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.Ship, name: "Crap Ship",
				mapOffset: [ 10 ], },
			{ bytes3: 79, bytes4: 79, enemyCount: 18, enemyPointer: 0xD561, objectPointer: 0x2B88A, 
				type: LevelType.Fortress | LevelType.Entrance, enemyType: LevelEnemyType.Fortress, name: "Fortress",
				mapOffset: [ 26 ], },
			{ bytes3: 65, bytes4: 10, enemyCount: 27, enemyPointer: 0xD92C, objectPointer: 0x2F7EE, 
				type: LevelType.Ship | LevelType.Entrance, enemyType: LevelEnemyType.Ship, name: "Tank 2",
				mapOffset: [ 36 ], },
			{ bytes3: 52, bytes4: 93, enemyCount: 20, enemyPointer: 0xD5DD, objectPointer: 0x2BC3D, 
				type: LevelType.Castle | LevelType.Entrance, enemyType: LevelEnemyType.None, name: "Bowser's Castle",
				mapOffset: [ 40 ], },
			{ bytes3: 36, bytes4: 18, enemyCount: 1, enemyPointer: 0xC9BE, objectPointer: 0x1B66B, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "1 Bonus",
				mapOffset: [ ], },
			{ bytes3: 17, bytes4: 31, enemyCount: 0, enemyPointer: 0xC015, objectPointer: 0x1F6CA, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "2 Bonus",
				mapOffset: [ ], },
			{ bytes3: 13, bytes4: 0, enemyCount: 3, enemyPointer: 0xDA39, objectPointer: 0x2FDB0, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.Ship, name: "Tank 1 Boss",
				mapOffset: [ ], },
			{ bytes3: 13, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA2F, objectPointer: 0x2FD4E, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.Ship, name: "Battleship Boss",
				mapOffset: [ ], },
			{ bytes3: 1, bytes4: 9, enemyCount: 3, enemyPointer: 0xD0DF, objectPointer: 0x27E27, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Hand Trap 1 End",
				mapOffset: [ ], },
			{ bytes3: 1, bytes4: 9, enemyCount: 3, enemyPointer: 0xD0DF, objectPointer: 0x27E27, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Hand Trap 2 End",
				mapOffset: [ ], },
			{ bytes3: 1, bytes4: 9, enemyCount: 3, enemyPointer: 0xD0DF, objectPointer: 0x27E27, 
				type: LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Hand Trap 3 End",
				mapOffset: [ ], },
			{ bytes3: 13, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA34, objectPointer: 0x2FD7F, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.Ship, name: "Crap Ship Boss",
				mapOffset: [ ], },
			{ bytes3: 58, bytes4: 50, enemyCount: 22, enemyPointer: 0xD599, objectPointer: 0x2BABD, 
				type: LevelType.Fortress, enemyType: LevelEnemyType.Fortress, name: "Fortress Room 2",
				mapOffset: [ ], },
			{ bytes3: 13, bytes4: 0, enemyCount: 1, enemyPointer: 0xDA2A, objectPointer: 0x2FD1D, 
				type: LevelType.Ship | LevelType.Boss, enemyType: LevelEnemyType.Ship, name: "Tank 2 Boss",
				mapOffset: [ ], },
			{ bytes3: 7, bytes4: 6, enemyCount: 16, enemyPointer: 0xC04D, objectPointer: 0x1EAB8, 
				type: LevelType.Hidden, enemyType: LevelEnemyType.Normal, name: "Hidden Level",
				mapOffset: [ 4, 6, 3, 13, 19, 24, 31, 32, 33, 27, 21, 22, 23, 37, 38, 39 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC103, objectPointer: 0x1B0C5, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe A End 1",
				mapOffset: [ 2 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC103, objectPointer: 0x1B107, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe A End 2",
				mapOffset: [ 8 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC112, objectPointer: 0x1B0C5, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe B End 1",
				mapOffset: [ 0 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC112, objectPointer: 0x1B107, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe B End 2",
				mapOffset: [ 17 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC117, objectPointer: 0x1B0C5, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe C End 1",
				mapOffset: [ 11 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC117, objectPointer: 0x1B107, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe C End 2",
				mapOffset: [ 28 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC108, objectPointer: 0x1B0C5, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe D End 1",
				mapOffset: [ 9 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC108, objectPointer: 0x1B107, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe D End 2",
				mapOffset: [ 18 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 0, enemyPointer: 0xC11B, objectPointer: 0x1ADA9, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe E End 1",
				mapOffset: [ 30 ], },
			{ bytes3: 15, bytes4: 6, enemyCount: 0, enemyPointer: 0xC11B, objectPointer: 0x1ADF8, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe E End 2",
				mapOffset: [ 34 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC10D, objectPointer: 0x1B0C5, 
				type: LevelType.Pipe | LevelType.Entrance, enemyType: LevelEnemyType.Normal, name: "Pipe F End 1",
				mapOffset: [ 20 ], },
			{ bytes3: 8, bytes4: 8, enemyCount: 1, enemyPointer: 0xC10D, objectPointer: 0x1B107, 
				type: LevelType.Pipe | LevelType.Exit, enemyType: LevelEnemyType.Normal, name: "Pipe F End 2",
				mapOffset: [ 35 ], },
			{ bytes3: 31, bytes4: 78, enemyCount: 14, enemyPointer: 0xD61B, objectPointer: 0x2BE57, 
				type: LevelType.Castle, enemyType: LevelEnemyType.Fortress, name: "Bowser's Trap Room",
				mapOffset: [ ], },
		],
		[ // lost levels
			{ bytes3: 93, bytes4: 2, enemyCount: 15, enemyPointer: 0xC1BB, objectPointer: 0x1E75C, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 1",
				mapOffset: [ ], },
			{ bytes3: 49, bytes4: 6, enemyCount: 14, enemyPointer: 0xC231, objectPointer: 0x1E9BC, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 2",
				mapOffset: [ ], },
			{ bytes3: 107, bytes4: 23, enemyCount: 7, enemyPointer: 0xC6EC, objectPointer: 0x210ED, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 3",
				mapOffset: [ ], },
			{ bytes3: 11, bytes4: 12, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x21452, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 4",
				mapOffset: [ ], },
			{ bytes3: 52, bytes4: 32, enemyCount: 8, enemyPointer: 0xD411, objectPointer: 0x2B764, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 5",
				mapOffset: [ ], },
			{ bytes3: 60, bytes4: 1, enemyCount: 11, enemyPointer: 0xCBF5, objectPointer: 0x232CF,
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 6", 
				mapOffset: [ ], }, // world 1 start block
			{ bytes3: 107, bytes4: 3, enemyCount: 17, enemyPointer: 0xCCB0, objectPointer: 0x237CA, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 7",
				mapOffset: [ ], },
			{ bytes3: 64, bytes4: 30, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x24F28, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 8",
				mapOffset: [ ], },
			{ bytes3: 52, bytes4: 23, enemyCount: 10, enemyPointer: 0xCECD, objectPointer: 0x26CB9, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 9",
				mapOffset: [ ], },
			{ bytes3: 49, bytes4: 1, enemyCount: 10, enemyPointer: 0xCECD, objectPointer: 0x279BB, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 10",
				mapOffset: [ ], },
			{ bytes3: 93, bytes4: 5, enemyCount: 16, enemyPointer: 0xCAE8, objectPointer: 0x22DDD, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 11",
				mapOffset: [ ], },
			{ bytes3: 38, bytes4: 3, enemyCount: 4, enemyPointer: 0xCB46, objectPointer: 0x2304C, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 12",
				mapOffset: [ ], },
			{ bytes3: 38, bytes4: 3, enemyCount: 4, enemyPointer: 0xCB54, objectPointer: 0x230D4, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 13",
				mapOffset: [ ], },
			{ bytes3: 56, bytes4: 1, enemyCount: 0, enemyPointer: 0xC016, objectPointer: 0x26DBB, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 14",
				mapOffset: [ ], },
			{ bytes3: 11, bytes4: 11, enemyCount: 2, enemyPointer: 0xC73B, objectPointer: 0x26E71, 
				type: LevelType.Lost | LevelType.Regular, enemyType: LevelEnemyType.Normal, name: "Lost 15",
				mapOffset: [ ], },
		],
	],

	getItemBlockObject: function(type, bank, id) {
		for (var i = 0; i < rom.itemBlock.length; i++) {
			if (rom.itemBlock[i].type === type && rom.itemBlock[i].bank === bank && rom.itemBlock[i].id === id) {
				return rom.itemBlock[i];
			}
		}

		return null;
	},

	getItemBlockObjects: function(type, bank) {
		var itemBlocks = [];
		for (var i = 0; i < rom.itemBlock.length; i++) {
			if (rom.itemBlock[i].type === type && rom.itemBlock[i].bank === bank) {
				itemBlocks.push(rom.itemBlock[i]);
			}
		}

		return itemBlocks;
	},

	itemBlock: [
		{ type: ItemBlockType.Question, bank: 1, id: 0, name: "? Block With Flower" }, // ? block with flower
		{ type: ItemBlockType.Question, bank: 1, id: 1, name: "? Block With Leaf" }, // ? block with leaf
		{ type: ItemBlockType.Question, bank: 1, id: 2, name: "? Block With Star" }, // ? block with star
		{ type: ItemBlockType.Question, bank: 1, id: 3, name: "? Block With Continuious Star" }, // ? block with continuious star
		{ type: ItemBlockType.Question, bank: 1, id: 4, name: "? Block With Coin" }, // ? block with single coin
		{ type: ItemBlockType.Question, bank: 1, id: 32, name: "? Block" }, // ? block

		{ type: ItemBlockType.Brick, bank: 1, id: 6, name: "Brick With Flower" }, // brick with flower
		{ type: ItemBlockType.Brick, bank: 1, id: 7, name: "Brick With Leaf" }, // brick with leaf
		{ type: ItemBlockType.Brick, bank: 1, id: 8, name: "Brick With Star" }, // brick with star
		{ type: ItemBlockType.Brick, bank: 1, id: 9, name: "Brick With Continuious Star" }, // brick with continuious star
		{ type: ItemBlockType.Brick, bank: 1, id: 10, name: "Brick With Multiple Coins" }, // brick with mutliple coins
		{ type: ItemBlockType.Brick, bank: 1, id: 11, name: "Brick With 1-Up" }, // brick with 1-up
	//	{ type: ItemBlockType.Brick, bank: 1, id: 16, name: "Brick" }, // brick, this could possibly break levels if it randomizes to unbreakable
		{ type: ItemBlockType.Brick, bank: 1, id: 48, name: "Brick With Coin" }, // brick with single coin

		{ type: ItemBlockType.MovableWooden, bank: 1, id: 112, name: "Movable Wooden Block" }, // movable wooden block
		{ type: ItemBlockType.MovableWooden, bank: 2, id: 4, name: "Movable Wooden Block With Flower" }, // movable wooden block with flower
		{ type: ItemBlockType.MovableWooden, bank: 2, id: 5, name: "Movable Wooden Block With Leaf" }, // movable wooden block with leaf
		{ type: ItemBlockType.MovableWooden, bank: 2, id: 6, name: "Movable Wooden Block With Star" }, // movable wooden block with star

		{ type: ItemBlockType.Invisible, bank: 1, id: 14, name: "Invisible Brick With Coin" }, // invisible brick with coin
		{ type: ItemBlockType.Invisible, bank: 1, id: 15, name: "Invisible Brick With 1-Up" }, // invisible brick 1-up

		{ type: ItemBlockType.Note, bank: 1, id: 96, name: "Note Block" }, // note block
		{ type: ItemBlockType.Note, bank: 2, id: 1, name: "Note Block With Flower" }, // note block with flower
		{ type: ItemBlockType.Note, bank: 2, id: 2, name: "Note Block With Leaf" }, // note block with leaf
		{ type: ItemBlockType.Note, bank: 2, id: 3, name: "Note Block With Star" }, // note block with star
	],

	// i dont know of any other way to determine which objects are 3 bytes and which are 4 bytes
	// so i just made the arrays below to lookup 4 byte objects then assume the rest are 3 bytes
	isObject4Byte: function(style, bank, type) {
		var shared4Byte = rom.sharedObjects4Byte;
		var shared4ByteEnd = shared4Byte.start+shared4Byte.length;
		if (bank === shared4Byte.bank && (type >= shared4Byte.start && type < shared4ByteEnd)) {
			return true;
		}

		for (var i = 0; i < rom.objects4Byte[style].length; i++) {
			var obj4Byte = rom.objects4Byte[style][i];
			var obj4ByteEnd = obj4Byte.start+obj4Byte.length;
			if (bank === obj4Byte.bank && (type >= obj4Byte.start && type < obj4ByteEnd)) {
				return true;
			} 
		}

		return false;
	},

	sharedObjects4Byte: {
		bank: 2,
		start: 0x60,
		length: 0x80
	},
	objects4Byte: [
		[ // 0 - mario graphics?
		],
		[ // 1 - plains
			{
				bank: 0,
				start: 0xC0,
				length: 0x20
			},
		],
		[ // 2 - dungeon
			{
				bank: 0,
				start: 0xE0,
				length: 0x20
			},
			{
				bank: 3,
				start: 0x20,
				length: 0x30
			},
			{
				bank: 3,
				start: 0xD0,
				length: 0x10
			},
		],
		[ // 3 - hills
			{
				bank: 4,
				start: 0x10,
				length: 0xC0
			},
		],
		[ // 4 - sky
			// bank 0, 0x10-0x1F
			// bank 3, 0xA0-0xAF
			{
				bank: 0,
				start: 0x10,
				length: 0x10
			},
			{
				bank: 3,
				start: 0xA0,
				length: 0x10
			}
		],
		[ // 5 - plant
			{
				bank: 3,
				start: 0x40,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x70,
				length: 0x10
			},
		],
		[ // 6 - water
			{
				bank: 3,
				start: 0x50,
				length: 0x10
			},
			{
				bank: 3,
				start: 0xD0,
				length: 0x10
			},
		],
		[ // 7 - mushroom
		],
		[ // 8 - Pipe
			{
				bank: 3,
				start: 0x50,
				length: 0x10
			},
			{
				bank: 3,
				start: 0xD0,
				length: 0x10
			},
		],
		[ // 9 - desert
			{
				bank: 0,
				start: 0xB0,
				length: 0x40
			},
		],
		[ // A - ship
			{
				bank: 0,
				start: 0x20,
				length: 0x20
			},
			{
				bank: 3,
				start: 0x40,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x70,
				length: 0x10
			},
		],
		[ // B - giant
			{
				bank: 0,
				start: 0xE0,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x10,
				length: 0x20
			},
			{
				bank: 3,
				start: 0x40,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x70,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x70,
				length: 0x10
			}
		],
		[ // C - ice
			{
				bank: 0,
				start: 0x10,
				length: 0x10
			},
			{
				bank: 3,
				start: 0xA0,
				length: 0x10
			},
		],
		[ // D - cloud
			{
				bank: 0,
				start: 0xE0,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x10,
				length: 0x20
			},
			{
				bank: 3,
				start: 0x40,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x70,
				length: 0x10
			}
		],
		[ // E - underground
			{
				bank: 4,
				start: 0x10,
				length: 0xC0
			}
		],
		[ // F - spade
		],
		// not sure why object sets beyond this exist, they appear to be the same
		[ // 10
		],
		[ // 11
		],
		[ // 12
		],
		[ // 13 - hills?
			{
				bank: 4,
				start: 0x10,
				length: 0xC0
			},
		],
		[ // 14 
		],
		[ // 15  - tank?
			{
				bank: 0,
				start: 0x20,
				length: 0x20
			},
			{
				bank: 3,
				start: 0x40,
				length: 0x10
			},
			{
				bank: 3,
				start: 0x70,
				length: 0x10
			},
		],
		[ // 16
		],
		[ // 17
		],
		[ // 18
		],
		[ // 19
		],
		[ // 1A
			
		],
	],

	mainTextDecodeTable: {
		"0": "|", // world letter new line
		"176": "A",
		"177": "B",
		"178": "C",
		"179": "D",
		"180": "E",
		"181": "F",
		"182": "G",
		"183": "H",
		"184": "I",
		"185": "J",
		"186": "K",
		"187": "L",
		"188": "M",
		"189": "N",
		"190": "O",
		"191": "P",
		"192": "Q",
		"193": "R",
		"194": "S",
		"195": "T",
		"196": "U",
		"197": "V",
		"198": "W",
		"199": "X",
		"200": "Y",
		"201": "Z",
		"208": "a",
		"209": "b",
		"210": "c",
		"211": "d",
		"212": "e",
		"213": "f",
		"214": "g",
		"215": "h",
		"216": "i",
		"217": "j",
		"218": "k",
		"219": "l",
		"220": "m",
		"221": "n",
		"222": "o",
		"223": "p",
		"202": "q",
		"203": "r",
		"204": "s",
		"205": "t",
		"206": "u",
		"207": "v",
		"129": "w",
		"136": "x",
		"140": "y",
		"143": "z",
		"154": ",",
		"233": ".",
		"171": "'",
		"234": "!",
		"235": "?",
		"254": " ",
		"229": "~", // special unknown whitespace character
		"255": "*" // world letter end of text
	},

	mainTextEncodeTable: {
		"|": 0, // world letter new line
		"A": 176,
		"B": 177,
		"C": 178,
		"D": 179,
		"E": 180,
		"F": 181,
		"G": 182,
		"H": 183,
		"I": 184,
		"J": 185,
		"K": 186,
		"L": 187,
		"M": 188,
		"N": 189,
		"O": 190,
		"P": 191,
		"Q": 192,
		"R": 193,
		"S": 194,
		"T": 195,
		"U": 196,
		"V": 197,
		"W": 197,
		"X": 198,
		"Y": 199,
		"Z": 200,
		"a": 208,
		"b": 209,
		"c": 210,
		"d": 211,
		"e": 212,
		"f": 213,
		"g": 214,
		"h": 215,
		"i": 216,
		"j": 217,
		"k": 218,
		"l": 219,
		"m": 220,
		"n": 221,
		"o": 222,
		"p": 223,
		"q": 202,
		"r": 203,
		"s": 204,
		"t": 205,
		"u": 206,
		"v": 207,
		"w": 129,
		"x": 136,
		"y": 140,
		"z": 143,
		",": 154,
		".": 233,
		"'": 171,
		"!": 234,
		"?": 235,
		" ": 254,
		"~": 229, // special unknown whitespace character
		"*": 255 // world letter end of text
	},
};