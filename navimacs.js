'use strict';

const stepsPerPage = 5;

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
		const scrollYStep = window.innerHeight / stepsPerPage;
		const scrollXStep = window.innerWidth / stepsPerPage;
		var newX = window.scrollX;
		var newY = window.scrollY;

		if (event.ctrlKey) {
				switch(event.keyCode) {
				case 78:
						// C-n, scroll step down
						newY += scrollYStep;
						break;
				case 80:
						// C-p, scroll step up
						newY -= scrollYStep;
						break;
				case 70:
						// C-f, scroll step right
						newX += scrollXStep;
						break;
				case 66:
						// C-b, scroll step left
						newX -= scrollXStep;
						break;
				case 86:
						// C-v, scroll page down
						newY += window.innerHeight;
						break;
				}
		}

		if (event.altKey || event.metaKey) {
				if (event.shiftKey) {
						switch(event.keyCode) {
						case 188:
								// M-<, scroll top
								newY = 0;
								break;
						case 190:
								// M->, scroll bottom
								newY = window.scrollMaxY;
								break;
						}
				} else {
						switch(event.keyCode) {
						case 86:
								// C-v, scroll page up
								newY -= window.innerHeight;
								break;
						}
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
