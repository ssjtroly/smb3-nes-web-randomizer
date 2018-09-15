var headerImage = {
	context: null,
	image: null,

	onDraw: function() {
		var spriteIndex = getRandomInt(7);
		var spriteX = Math.floor(spriteIndex % 3);
		var spriteY = Math.floor(spriteIndex / 3);

		headerImage.context.clearRect(0, 0, ui.headerCanvas.width, ui.headerCanvas.height);
	 	headerImage.context.drawImage(headerImage.image, spriteX*32, spriteY*32, 32, 32, 0, 0, 32, 32 );
	 	imageData = headerImage.context.getImageData(0, 0, 32, 32);

	 	var palette = getNESColorPalette();
		var randomMarioColor = getRandomMarioColors(palette);
		if (spriteX === 2 && spriteY === 1) {
			while (randomMarioColor[0] === 0x16) {
				randomMarioColor = getRandomMarioColors(palette);
			}
		}

	 	for (var i = 0; i < imageData.data.length; i+=4) {
	 		if (imageData.data[i] === 255 && imageData.data[i+1] === 0 && imageData.data[i+2] === 255) {
	 			var color = lookupNESRGB(randomMarioColor[0]);
	 			imageData.data[i] = color[0];
	 			imageData.data[i+1] = color[1];
	 			imageData.data[i+2] = color[2];
	 		}

	 		if (imageData.data[i] === 0 && imageData.data[i+1] === 255 && imageData.data[i+2] === 0) {
	 			var color = lookupNESRGB(randomMarioColor[1]);
	 			imageData.data[i] = color[0];
	 			imageData.data[i+1] = color[1];
	 			imageData.data[i+2] = color[2];
	 		}
	 	}

	 	headerImage.context.putImageData(imageData, 0, 0);
	},

	initialize: function() {
		headerImage.context = ui.headerCanvas.getContext('2d');
		headerImage.image = new Image();

		headerImage.image.onload = function() {
			headerImage.onDraw();
		};
		headerImage.image.src = headerImage.imageData;
	},

	imageData: `data:image/png;base64,
		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`
};