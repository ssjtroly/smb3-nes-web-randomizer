var jsps = {
	parsePatchFile: function(bytes) {
		var str = "";
		for (var i = 0; i < bytes.length; i++) {
			str += String.fromCharCode(bytes[i]);
		}
		return JSON.parse(str.replace("\t", "").replace("\n", ""));
	},

	// originalFile & modifiedFile are expected to be raw byte arrays (e.g. Uint8Array)
	create: function(originalFile, modifiedFile) {
		var json = {
			length: modifiedFile.length,
			data: {}
		};

		var i = 0;
		while (i < originalFile.length) {
			if (i < modifiedFile.length) {
				// check if byte differs
				if (originalFile[i] !== modifiedFile[i]) {
					var key = i.toString(16);
					json.data[key] = [];

					var j = 0;
					while (true) {
						if (i+j < modifiedFile.length) {
							if (originalFile[i+j] === modifiedFile[i+j]) {
								break;
							} else {
								// write all differing bytes to json[i]
								json.data[key].push(modifiedFile[i+j].toString(16));
							}
						} else {
							// originalFile is larger than modifiedFile
							return json;
						}

						++j;
					}

					i += j;
				}
			}

			++i;
		}

		// check if modifiedFile has extra bytes
		if (modifiedFile.length > originalFile.length) {
			var i = originalFile.length;
			var key = originalFile.length.toString(16);
			json.data[key] = [];
			while (i < modifiedFile.length) {
				json.data[key].push(modifiedFile[i].toString(16));
				++i;
			}
		}

		return json;
	},

	// patchFile & originalFile are expected to be raw byte arrays (e.g. Uint8Array)
	apply: function(patchFile, originalFile) {
		var patchObject = jsps.parsePatchFile(patchFile);
		// create copy of original file
		var outputFile = originalFile.slice(0, patchObject.length);

		for (var key in patchObject.data) {
			var addr = parseInt(key, 16);
			for (var i = 0; i < patchObject.data[key].length; i++) {
				outputFile[addr+i] = parseInt(patchObject.data[key][i], 16);
			}
		}

		return outputFile;
	},

	// patchFile & target are expected to be raw byte arrays (e.g. Uint8Array)
	applyInline: function(patchFile, target) {
		var patchObject = jsps.parsePatchFile(patchFile);

		for (var key in patchObject.data) {
			var addr = parseInt(key, 16);
			for (var i = 0; i < patchObject.data[key].length; i++) {
				target[addr+i] = parseInt(patchObject.data[key][i], 16);
			}
		}
	},

	// patchObject is expected to be a javascript object
	// originalFile is expected to be a raw byte array (e.g. Uint8Array)
	// object keys are expected to be in hexidecimal
	// object values are expected to be in hexidecimal strings or numbers
	applyObject: function(patchObject, originalFile) {
		// create copy of original file
		var outputFile = originalFile.slice(0, patchObject.length);

		for (var key in patchObject.data) {
			var addr = parseInt(key, 16);

			for (var i = 0; i < patchObject.data[key].length; i++) {
				var value = null;

				// check if value is number or string
				if (typeof(patchObject.data[key][i]) === "string") {
					// interpret as string of hexidecimal
					value = parseInt(patchObject.data[key][i], 16)
				} else if (typeof(patchObject.data[key][i]) === "number") {
					// numbers are only stored in decimal
					value = patchObject.data[key][i];
				} else {
					// error
				}

				if (value !== null) {
					outputFile[addr+i] = value;
				}
			}
		}

		return outputFile;
	},

	// patchObject is expected to be a javascript object
	// target is expected to be a raw byte array (e.g. Uint8Array)
	// object keys are expected to be in hexidecimal
	// object values are expected to be in hexidecimal strings or numbers
	applyObjectInline: function(patchObject, target) {
		for (var key in patchObject) {
			var addr = parseInt(key, 16);

			for (var i = 0; i < patchObject[key].length; i++) {
				var value = null;

				// check if value is number or string
				if (typeof(patchObject[key][i]) === "string") {
					// interpret as string of hexidecimal
					value = parseInt(patchObject[key][i], 16)
				} else if (typeof(patchObject[key][i]) === "number") {
					// numbers are only stored in decimal
					value = patchObject[key][i];
				} else {
					// error
				}
				
				if (value !== null) {
					target[addr+i] = value;
				}
			}
		}
	},
}