var patch = {
	frogFix6_3Patch: {
		"caa1": [
			"19"
		],
		"cab0": [
			"19"
		]
	},

	frogFix6_5Patch: {
		"20858": [
			"33",
			"4a",
			"80",
			"2f",
			"4c",
			"80",
			"37",
			"4c",
			"d"
		],
		"20966": [
			"34",
			"18"
		],
		"20969": [
			"30",
			"1a"
		],
		"c60e": [
			"6d",
			"4e",
			"5",
			"33"
		],
		"c613": [
			"8",
			"40"
		],
		"c616": [
			"18"
		],
		"208a2": [
			"32",
			"27"
		],
		"208a5": [
			"2e",
			"25",
			"e",
			"2b",
			"4a",
			"80"
		],
		"2095e": [
			"4c",
			"80"
		],
		"2096c": [
			"2c",
			"18"
		],
		"2096f": [
			"28",
			"1a"
		]
	},

	frogFix6_F1Patch: {
		"d4e8": [
			"15",
			"c"
		],
		"d4eb": [
			"16",
			"14",
			"5a"
		],
		"2b23f": [
			"13",
			"2"
		],
		"2b254": [
			"e4"
		],
		"2b25c": [
			"e8"
		],
		"2b25f": [
			"16"
		],
		"2b261": [
			"c",
			"15"
		],
		"2b294": [
			"f",
			"24",
			"c1"
		]
	},

	frogFix6_F2Patch: {
		"22c1b": [
			"3e"
		],
		"22c1d": [
			"72"
		]
	},

	frogFix7_7Patch: {
		"23dae": [
			"34",
			"47"
		],
		"23e1e": [
			"6f"
		],
		"23e96": [
			"93"
		],
		"23e99": [
			"93"
		],
		"23e9c": [
			"93"
		],
		"23e9f": [
			"94"
		],
		"23eec": [
			"2b"
		]
	},

	frogFix7_F1Patch: {
		"2b410": [
			"29",
			"14",
			"62"
		],
		"2b42d": [
			"2a",
			"1b",
			"14"
		],
		"2b447": [
			"2c",
			"26",
			"60"
		],
		"2b453": [
			"2e",
			"2c",
			"60"
		]
	},

	frogFix7_F2Patch: {
		"2b006": [
			"e6"
		],
		"2b00a": [
			"e6"
		]
	},

	frogFix8_1Patch: {
		"c452": [
			"17"
		],
		"1f84b": [
			"52",
			"50"
		],
		"1f855": [
			"57"
		]
	},

	frogFix8_F1Patch: {
		"2baaa": [
			"e6"
		],
		"2baac": [
			"17"
		]
	},

	// stolen from fcoughlin's randomizer, not sure what all this does exactly
	// the commented instructions could be wrong because im a noob to nes assembly
	koopalingHPPatch: {
		"2FE1": [ 0x20, 0xB0, 0xBF ], // JSR $BFB0

		"3037": [ 0x05 ], // ORA
		"3197": [ 0x4C, 0x20, 0xB8 ], // JMP $B820

		"3830": [
			0xB5, 0x7F, // LDA $7F,X
			0xAC, 0x27, 0x07, // LDY $0727
			0xD9, 0x30, 0xB8, // CMP $B830,Y
			0xB0, 0x03, // BCS LABEL_383E
			0x4C, 0x8D, 0xB1, // JMP $B18D

			// LABEL_383E:
			0x4C, 0x93, 0xB1, // JMP $B193
			// KoopalingHP:
			0x03, 0x03, 0x03, 0x03, 0x03, 0x03, 0x03 // .byte $03, $03, $03, $03, $03, $03, $03
		], 

		"3FC0": [ 
			0x98, // TYA
			0xC9, 0x02, // CMP #$02
			0x90, 0x02, // BCC LABEL_3FC8
			0xA9, 0x02, // LDA #$02

			// LABEL_3FC8:
			0xA8, // TAY
			0xB9, 0x82, 0xAE, // LDA $AE82,Y
			0x60 // RTS
		]
	},

	infiniteLivesPatch: {
		// found in PRG030.asm, PRG030_910C
		// NOP out "DEC Player_Lives,X" so that "BMI PRG030_9133" is never true
		"3D133": [0xEA, 0xEA, 0xEA, 0xEA, 0xEA]
	},

	useDeathCounterPatch: {
		// found in PRG030.asm, PRG030_910C
		// change "DEC Player_Lives,X" to "INC Player_Lives,X"
		"3D133": [ 0xFE ],
	},

	disablePowerupsPatch: {
		// found in PRG001.asm, PRG001_A818
		// replaces...
		//		TAY
		//		LDA PUp_StarOrSuitFrames,Y
		// with...
		// 		JMP PRG001_A837
		// 		NOP
		"2828": [0x4C, 0x37, 0xA8, 0xEA ],
		// found in PRG001.asm, PRG001_A897
		// replaces...
		// 		LDA #$02
		//		STA Player_QueueSuit
		// with...
		// 		JMP PRG001_A837
		// 		NOP
		//		NOP
		"28AE": [0x4C, 0x37, 0xA8, 0xEA, 0xEA ],
		// found in PRG001.asm, PRG001_AA05
		// replaces...
		//		CMP #$02
		//		BEQ PRG001_AA13
		// with...
		// 		JMP PRG001_A837
		// 		NOP
		"2A15": [0x4C, 0x37, 0xA8, 0xEA ],
		// found in PRG001.asm, PRG001_AC40
		// replaces...
		//		LDA Sound_QLevel1
		// with...
		// 		JMP PRG001_A837
		"2C50": [0x4C, 0x37, 0xA8 ],
		// found in PRG026.asm, PRG026_A5D9
		// replaces...
		//		LDA InvItem_PerPowerUp_Disp,X	; Store proper power-up to display -> A
		//		LDX Player_Current	 	; X = Player_Current
		//		STA Map_Power_Disp	 	; Power-up to display -> Map_Power_Disp
		// with...
		//		NOP (x9)
		"34605": [ 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA ]
	},

	infinitePSpeedPatch: {
		// found in PRG_008.asm, PRG008_A242
		// replaces...
		//		LDA Map_Power_Disp
		// with...
		// 		LDA #$08
		// 		NOP
		"10276": [ 0xA9, 0x08, 0xEA ],
		// found in PRG_008.asm, PRG008_AC9E
		// replaces...
		//		STA Player_FlyTime ; Clear Player_FlyTime
		// with...
		// 		NOP (x3)
		"10530": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG_008.asm, Player_PowerUpdate
		// replaces...
		//		DEY			 
		//		STY Player_FlyTime ; Player_FlyTime--
		// with...
		// 		NOP (x4)
		"104E1": [ 0xEA, 0xEA, 0xEA, 0xEA ],
		// found in PRG_008.asm, PRG008_AC9E
		// replaces...
		//		LDA #$00
		// with...
		//		LDA #$FF
		"10CBC": [ 0xFF ]
	},

	disable1UpsPatch: {
		// found in PRG002.asm, EndLevelCard_Give1UpsAndCycle
		"5D99": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG007.asm, PRG007_AACF
		"EB0F": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG009.asm, PRG009_A03E
		"12085": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG009.asm, PRG009_A03E
		"12088": [ 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA ],
		// found in PRG022.asm, PRG022_CD65
		"2CD78": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG022.asm, PRG022_D28C
		"2D2BE": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG022.asm, Card_MatchPairReward
		"2DD50": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG024.asm, PRG024_AD0C
		"30D47": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG024.asm, PRG024_AD69
		"30D7A": [ 0xEA, 0xEA, 0xEA ],
		// found in PRG026.asm, PRG026_B07D
		"350A7": [ 0xEA, 0xEA, 0xEA ],
	},

	disablePlayerSuitChangeOnTimeUp: {
		// found in PRG030.asm, PRG030_8F31
		// replaces...
		//		LDA <Player_Suit
		// with...
		//		LDA $#00
		"3CF48": [ 0xA9, 0x00 ],
	},

	disableVerticalScrollLock: {
		// found in PRG030.asm, PRG030_8F31
		// replaces...
		//		LDA <Vert_Scroll
		// with...
		//		LDA #$00
		"11256": [ 0xA5, 0x00 ],
	},

	allowHammerToBreakLocks: {
		// found in PRG026.asm, added to end of ROM bank at offset $35530
		// this adds 0x3C bytes, 0xAA4 bytes remaining in this bank 
		"35530": [
			// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
			// ; Hack to allow hammers to break fortress locks
			// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

			// PRG026_GetMapOffset: ; load map tile into register A
			"a4", "0", // LDY <Temp_Var1	 		; Y = LDY <Temp_Var1
			"20", "69", "d3", // JSR MapTile_Get_By_Offset	; Get map tile nearby player (on page 10)
			"60", // RTS

			// PRG026_AllowHammerToBreakLocks:
			//; original functionality, only check rocks
			"20", "20", "b5", // JSR PRG026_GetMapOffset ; set A with map tile
			"38", "e9", "51", // SUB #TILE_ROCKBREAKH	 ; Offset to rock tiles
			"c9", "2", // CMP #$02	 ; See if value is less than 2 (rock to break)
			"90", "1f", // BLT PRG026_HammerCanBreakRock	 ; If rock, jump to PRG026_A6D2

			//; added functionality, check locks
			//; Lock variables - TILE_LOCKVERT, TILE_ALTLOCK, TILE_LOCKHORZ

			"20", "20", "b5", // JSR PRG026_GetMapOffset ; reload map tile since 'SUB #TILE_ROCKBREAKH' changes it
			"38", "e9", "54", // SUB #TILE_LOCKVERT ; Offset to vertical lock
			"c9", "0", // CMP #$00 ; tile lock values are not sequential like rocks
			"f0", "18", // BEQ PRG026_HammerCanBreakLockVert ; SUB will result in 0 if this is a vertical lock

			"20", "20", "b5", // JSR PRG026_GetMapOffset ; reload map tile since 'SUB #TILE_LOCKVERT' changes it
			"38", "e9", "e4", // SUB #TILE_ALTLOCK ; only found on world 5 (blue lock on cloud side)? only breaks horiztonally
			"c9", "0", // CMP #$00 ; tile lock values are not sequential like rocks
			"f0", "13", // BEQ PRG026_HammerCanBreakLockHorz ; SUB will result in 0 if this is a alternate lock

			"20", "20", "b5", // JSR PRG026_GetMapOffset ; reload map tile since 'SUB #TILE_ALTLOCK' changes it
			"38", "e9", "56", // SUB #TILE_LOCKHORZ ; Offset to horiztonal lock
			"c9", "0", // CMP #$00 ; tile lock values are not sequential like rocks
			"f0", "9", // BEQ PRG026_HammerCanBreakLockHorz ; SUB will result in 0 if this is a horiztonal lock

			"60", // RTS ; return back to PRG026_A6BF to continue loop

			// PRG026_HammerCanBreakRock:
			//; 'SUB #TILE_ROCKBREAKH' will result in 0 or 1 depending on the rock
			//; since TILE_ROCKBREAKH and TILE_ROCKBREAKV are sequential
			"4c", "d2", "a6", // JMP PRG026_A6D2

			// PRG026_HammerCanBreakLockVert:
			"a9", "1", // LDA #$01 ; tells PRG026_A6D2 we need a vertical path
			"4c", "d2", "a6", // JMP PRG026_A6D2

			// PRG026_HammerCanBreakLockHorz:
			"a9", "0", // LDA #$00 ; tells PRG026_A6D2 we need a horizatonal path
			"4c", "d2", "a6" // JMP PRG026_A6D2
		],

		// found in PRG026.asm, PRG026_A6BF
		"346cf": [
			// JSR PRG026_AllowHammerToBreakLocks ; create hijack to added subroutine
			"20", "26", "b5",
			// some NOPs to keep ROM aligned
			"ea", "ea", "ea", "ea", "ea", "ea", "ea", "ea", "ea"
		]
	}
}