const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 79;

const currentFrame = (index) => {
	const path = `./images/${index.toString().padStart(3, "0")}.png`;
	console.log(index.toString().padStart(3, "0"));
	return path;
};

const images = [];

// Preload all images and store them in an array
// This is done to prevent the images from flickering
// And that images are not loaded multiple times
const preloadImages = () => {
	for (let i = 1; i < frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i);
		images.push(img); // Store the image in the array
	}
};

// Start loading all images
preloadImages();

// When page is done loading handle the scroll effect
window.onload = () => {
	document.getElementById("loader").style.display = "none";
	// Update each frame when scrolling
	const updateImage = (index) => {
		// Make sure the index is in the range of the array
		if (index >= frameCount - 1) return;
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
		const frameIndex = Math.min(
			frameCount,
			Math.ceil(scrollFraction * frameCount)
		);
		// Update the image on the canvas
		updateImage(frameIndex);
	});
};
