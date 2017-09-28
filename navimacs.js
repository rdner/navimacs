document.addEventListener('keydown', onKeyDown);

const stepsPerPage = 5;
var scrollYStep, scrollXStep;

function setSteps() {
		scrollYStep = window.innerHeight / stepsPerPage;
		scrollXStep = window.innerWidth / stepsPerPage;
}

function onKeyDown(event) {
		setSteps();
		var newX = window.scrollX;
		var newY = window.scrollY;

		if (event.ctrlKey) {
				// C-n, move down
				if (event.keyCode === 78) {
						newY += scrollYStep;
				}

				// C-p, move up
				if (event.keyCode === 80) {
						newY -= scrollYStep;
				}

				// C-f, move right
				if (event.keyCode === 70) {
						newX += scrollXStep;
				}

				// C-b, move left
				if (event.keyCode === 66) {
						newX -= scrollXStep;
				}
		}

		if (event.altKey || event.metaKey && event.shiftKey) {
				// M-<, move top
				if (event.keyCode === 188) {
						newY = 0;
				}

				// M->, move bottom
				if (event.keyCode === 190) {
						newY = window.scrollMaxY;
				}
		}

		if (newX < 0) {
				newX = 0;
		}
		if (newY < 0) {
				newY = 0;
		}
		if (newY > window.scrollMaxY) {
				newY = window.scrollMaxY;
		}
		if (newX > window.scrollMaxX) {
				newX = window.scrollMaxX;
		}

		window.scrollTo(newX, newY);
}
