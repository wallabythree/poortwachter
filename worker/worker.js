import poortwachter from '../domain/Poortwachter.js';
import config from "../config.js";

async function updateStatus() {
    const hasPermissions = await browser.permissions.contains({
        origins: [config.ORIGINS]
    });

    if (hasPermissions) {
        poortwachter.start();
    }
    else {
        poortwachter.stop();
    }
}

browser.permissions.onAdded.addListener(() => {
    updateStatus();
});

browser.permissions.onRemoved.addListener(() => {
    updateStatus();
});

browser.cookies.onChanged.addListener(
    () => poortwachter.start()
);

browser.runtime.onInstalled.addListener(
    () => {
        poortwachter.start();
    }
);

