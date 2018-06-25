chrome.runtime.onMessage.addListener((message, sender) => {
	switch(message.action) {
	case 'closeTab':
		chrome.tabs.remove(sender.tab.id);
		break;
	case 'openNewTab':
		chrome.tabs.create({active: true});
		break;
	}
});
