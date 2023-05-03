import poortwachter from '../domain/Poortwachter.js';

browser.cookies.onChanged.addListener(
    () => poortwachter.start()
);

browser.runtime.onInstalled.addListener(
    () => poortwachter.start()
);

