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

function mod(x, m) {
    return (x%m + m)%m;
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

function eraseArrayElement(arr, index) {
	var first = arr.slice(0, index);
	var second = arr.slice(index+1);
	arr = first.concat(second);
}

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