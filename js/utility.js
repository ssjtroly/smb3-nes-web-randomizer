var mainTextRegExp = new RegExp(/[^a-zA-Z\\,\\.\\'\\!\\?\\' \\~]/);

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.split = function(size) {
	var target = this;
	var re = new RegExp('.{1,' + size + '}', 'g');
	return target.match(re);
}

function wrap(value, lower, upper) {
	return (value-lower)%(upper-lower)
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getRandomIntRange(min, max) {
	return Math.floor(Math.random() * (max-min))+min;
}

function getBiasRandomIntRange(min, max, bias, influence) {
	return Math.floor(getBiasRandomRange(min, max, bias, influence)); 
}

function getBiasRandomRange(min, max, bias, influence) {
    var rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return rnd * (1 - mix) + bias * mix;           // mix full range and bias
}

function littleBytesToBigEndian(byte1, byte2) {
	return byte1 | (byte2 << 8);
}

function bigToLittleBytesEndian(num) {
	return [ num & 0x0F, num & 0xF0 ];
}

var conversion = {
	one: {
		to2D: function(i, width) {
			return { x: Math.floor(i%width), y: Math.floor(i/width) };
		},
		to3D: function(i, width, height) {
			return { x: Math.floor(i%width), y: Math.floor((i/width)%height), z: Math.floor(i/(width*height)) };
		},
	},
	two: {
		to1D: function(x, y, width) {
			return Math.floor(y * width + x);
		},
		XYto1D: function(xy, width) {
			return Math.floor(xy.y * width + xy.x);
		},
	},
	three: {
		to1D: function(x, y, z, width, height) {
			return Math.floor(x + y * width + z * width * height);
		},
		XYZto1D: function(xyz, width, height) {
			return Math.floor(xyz.x + xyz.y * width + xyz.z * width * height);
		},
	}
};

var downloadURL = function(data, fileName) {
	var a;
	a = document.createElement("a");
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = "display: none";
	a.click();
	a.remove();
};

var downloadBlob = function(data, fileName, mimeType) {
	var blob, url;
	blob = new Blob([data], {
	type: mimeType
	});
	url = window.URL.createObjectURL(blob);
	downloadURL(url, fileName);
};

function rgbToName(rgb) {
	return "#" + rgb[0].toString(16).padStart(2, '0') + rgb[1].toString(16).padStart(2, '0') + rgb[2].toString(16).padStart(2, '0');
}

function getNESColorPalette() {
	var palette = [];

	for (var i = 0; i < 4; i++) {
		var row = [];

		if (i === 0 || i === 1) {
			for (var j = 0; j < 12; j++) {
				var paletteIndex = (i << 4) | (j+1);
				row.push(paletteIndex);
			}
		} else {
			for (var j = 0; j < 13; j++) {
				var paletteIndex = (i << 4) | (j+1);
				row.push(paletteIndex);
			}
		}

		palette.push(row);
	}

	return palette;
}

function getRandomNESPaletteColor(palette) {
	var row = getRandomInt(4);
	var col = -1;
	if (row === 0 || row === 1) {
		col = getRandomInt(12);
	} else {
		col = getRandomInt(13);
	}

	return palette[row][col];
}

function lookupNESRGB(color) {
	switch (color) {
		case 0x00:
			return [124, 124, 124];
		break;
		case 0x01:
			return [0, 0, 252];
		break;
		case 0x02:
			return [0, 0, 188];
		break;
		case 0x03:
			return [68, 40, 188];
		break;
		case 0x04:
			return [148, 0, 132];
		break;
		case 0x05:
			return [168, 0, 32];
		break;
		case 0x06:
			return [168, 16, 0];
		break;
		case 0x07:
			return [138, 20, 0];
		break;
		case 0x08:
			return [80, 48, 0];
		break;
		case 0x09:
			return [0, 120, 0];
		break;
		case 0x0A:
			return [0, 104, 0];
		break;
		case 0x0B:
			return [0, 88, 0];
		break;
		case 0x0C:
			return [0, 64, 88];
		break;

		case 0x10:
			return [188, 188, 188];
		break;
		case 0x11:
			return [0, 120, 248];
		break;
		case 0x12:
			return [0, 88, 148];
		break;
		case 0x13:
			return [104, 68, 252];
		break;
		case 0x14:
			return [216, 0, 204];
		break;
		case 0x15:
			return [228, 0, 88];
		break;
		case 0x16:
			return [248, 56, 0];
		break;
		case 0x17:
			return [228, 92, 16];
		break;
		case 0x18:
			return [172, 124, 0];
		break;
		case 0x19:
			return [0, 184, 0];
		break;
		case 0x1A:
			return [0, 168, 0];
		break;
		case 0x1B:
			return [0, 168, 68];
		break;
		case 0x1C:
			return [0, 136, 136];
		break;

		case 0x20:
			return [248, 248, 248];
		break;
		case 0x21:
			return [60, 188, 252];
		break;
		case 0x22:
			return [104, 136, 252];
		break;
		case 0x23:
			return [152, 120, 248];
		break;
		case 0x24:
			return [248, 120, 248];
		break;
		case 0x25:
			return [248, 88, 152];
		break;
		case 0x26:
			return [248, 120, 88];
		break;
		case 0x27:
			return [252, 160, 68];
		break;
		case 0x28:
			return [248, 184, 0];
		break;
		case 0x29:
			return [184, 248, 24];
		break;
		case 0x2A:
			return [88, 216, 84];
		break;
		case 0x2B:
			return [88, 248, 152];
		break;
		case 0x2C:
			return [0, 232, 216];
		break;
		case 0x2D:
			return [120, 120, 120];
		break;

		case 0x30:
			return [252, 252, 252];
		break;
		case 0x31:
			return [164, 228, 252];
		break;
		case 0x32:
			return [184, 184, 248];
		break;
		case 0x33:
			return [216, 184, 248];
		break;
		case 0x34:
			return [248, 184, 248];
		break;
		case 0x35:
			return [248, 164, 192];
		break;
		case 0x36:
			return [240, 208, 176];
		break;
		case 0x37:
			return [252, 224, 168];
		break;
		case 0x38:
			return [248, 216, 120];
		break;
		case 0x39:
			return [216, 248, 120];
		break;
		case 0x3A:
			return [184, 248, 184];
		break;
		case 0x3B:
			return [184, 248, 216];
		break;
		case 0x3C:
			return [0, 252, 252];
		break;
		case 0x3D:
			return [216, 216, 216];
		break;
		default:
			return [0, 0, 0];
		break;
	}
};