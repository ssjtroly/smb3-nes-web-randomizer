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