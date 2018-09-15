var WorldData = function(ROM, world) {
	this.name = (world+1).toString();
	this.mapLocationPotiner = rom.worlds[world].mapLocationPotiner;
	this.header = [  // copy header
		ROM[this.mapLocationPotiner], 
		ROM[this.mapLocationPotiner+1], 
		ROM[this.mapLocationPotiner+2], 
		ROM[this.mapLocationPotiner+3]
	];
	this.count = rom.worlds[world].mapLocationCount; // number of tiles player can move to in a world

	this.dataPointer = [
		[], [], [], []
	];
	this.data = [
		[], [], [], []
	];

	var startPtr = this.mapLocationPotiner+4;
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
};

var ConfigurationObject = function() {
	this.flags = 0;
	this.marioColor = -1;
	this.marioComplexion = -1;
	this.lives = 4;
	this.texts = [];
};