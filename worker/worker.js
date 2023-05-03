import poortwachter from '../domain/Poortwachter.js';
import config from "../config.js";

async function updateStatus() {
    const hasPermissions = await chrome.permissions.contains({
        origins: [config.ORIGINS]
    });

    if (hasPermissions) {
        poortwachter.start();
    }
    else {
        poortwachter.stop();
    }
}

chrome.permissions.onAdded.addListener(() => {
    updateStatus();
});

chrome.permissions.onRemoved.addListener(() => {
    updateStatus();
});

chrome.cookies.onChanged.addListener(
    () => updateStatus()
);

chrome.runtime.onInstalled.addListener(
    () => updateStatus()
);

