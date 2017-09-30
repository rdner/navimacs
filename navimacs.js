const stepsPerPage = 5;

const keyStrokes = {
		'C-78': scroll((x, y) => { return {x, y: y + getScrollSteps().y}; }), // C-n -- scroll step down
		'C-80': scroll((x, y) => { return {x, y: y - getScrollSteps().y}; }), // C-p -- scroll step up
		'C-70': scroll((x, y) => { return {x: x + getScrollSteps().x, y}; }), // C-f -- scroll step right
		'C-66': scroll((x, y) => { return {x: x - getScrollSteps().x, y}; }), // C-b -- scroll step left
		'C-86': scroll((x, y) => { return {x, y: y + window.innerHeight}; }), // C-v -- scroll page down
		'M-86': scroll((x, y) => { return {x, y: y - window.innerHeight}; }), // M-v -- scroll page up
		'M-S-188': scroll((x, y) => { return {x, y: 0}; }), // M-< -- scroll top
		'M-S-190': scroll((x, y) => { return {x, y: document.body.scrollHeight}; }), // M-> -- scroll bottom
		'C-88, 75': sendActionMessage('closeTab'), // C-x, k -- close the current tab
		'C-88, 70': sendActionMessage('openNewTab'), // C-x, f -- open a new tab
};

var prevKeyStroke = '';

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
		var keyStroke = '';
		if (event.altKey || event.metaKey) {
				keyStroke += 'M-';
		}
		if (event.ctrlKey) {
				keyStroke += 'C-';
		}
		if (event.shiftKey) {
				keyStroke += 'S-';
		}
		keyStroke += event.keyCode;

		const longKeyStroke = `${prevKeyStroke}, ${keyStroke}`;
		var action = keyStrokes[longKeyStroke] || keyStrokes[keyStroke] || noop;

		prevKeyStroke = keyStroke;

		// if the keystroke is handled we prevent the default behavior
		if (action(event)) {
				prevKeyStroke = '';
				event.preventDefault();
		}
}

function sendActionMessage(name) {
		return () => {
				chrome.runtime.sendMessage({action: name});
		};
}

function getScrollSteps() {
		return {
				x: window.innerWidth / stepsPerPage,
				y: window.innerHeight / stepsPerPage
		};
}

function scroll(mutator) {
		return event => {
				const element = event.target;
				// the scroll hotkeys are not active while editing text, because in some systems
				// the emacs hotkeys are used for navigation in text
				if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.contentEditable === 'true') {
						return false;
				}

				const xy = mutator(window.scrollX, window.scrollY);
				if (xy.x < 0) {
						xy.x = 0;
				}
				if (xy.y < 0) {
						xy.y = 0;
				}
				if (xy.y > window.scrollMaxY) {
						xy.y = window.scrollMaxY;
				}
				if (xy.x > window.scrollMaxX) {
						xy.x = window.scrollMaxX;
				}

				window.scrollTo(xy.x, xy.y);
				return true;
		}
}

function noop() { return false; }
