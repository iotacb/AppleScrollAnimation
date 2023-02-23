const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 79;

const currentFrame = (index) => {
	const path = `./images/${index.toString().padStart(3, "0")}.png`;
	return path;
};

const images = [];

// Map a value from one range to another
const map = (value, x1, y1, x2, y2) =>
	((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

// Preload all images and store them in an array
// This is done to prevent the images from flickering
// And that images are not loaded multiple times
const preloadImages = () => {
	for (let i = 1; i <= frameCount; i++) {
		const img = new Image();
		img.onload = () => {
			images.push(img); // Store the image in the array
			if (i == frameCount) {
				// When last image is finished loading, handle the effect
				doEffect();
			}
		};
		img.src = currentFrame(i); // Set image source
	}
};

// Start loading all images
preloadImages();

// Will be called when all images have been loaded
function doEffect() {
	// Hide loading text
	document.getElementById("loader").style.display = "none";
	// Update each frame when scrolling
	const updateImage = (index) => {
		// Make sure the index is in the range of the array
		if (index >= frameCount) return;

		// Clear the canvas before drawing the next frame
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Draw the next frame
		context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
	};

	// Draw the first frame
	updateImage(0);

	// Handle scroll event
	window.addEventListener("scroll", () => {
		const scrollTop = html.scrollTop;
		const maxScrollTop = html.scrollHeight - window.innerHeight;
		const scrollFraction = scrollTop / maxScrollTop;
		const scrollProgress =
			Math.round((scrollFraction + Number.EPSILON) * 100) / 100;
		const frameIndex = Math.floor(map(scrollProgress, 0, 1, 1, frameCount - 1));

		console.log(scrollProgress, frameIndex);
		
		// Update the image on the canvas
		updateImage(frameIndex);
	});
}
