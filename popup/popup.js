import config from "../config.js";

const grantButton = document.forms["permissions"]["grantButton"];
const denyButton = document.forms["permissions"]["denyButton"];
const grantedFields = document.forms["permissions"]["granted"];
const deniedFields = document.forms["permissions"]["denied"];

function showElement(elem) {
    elem.disabled = false;
    elem.style.display = "initial";
    elem.style.visibility = "visible";
}

function hideElement(elem) {
    elem.disabled = true;
    elem.style.display = "none";
    elem.style.visibility = "hidden";
}

async function updateForm() {
    const hasPermissions = await chrome.permissions.contains({
        origins: [config.ORIGINS]
    });

    if (hasPermissions) {
        showElement(grantedFields);
        hideElement(deniedFields)
    }
    else {
        showElement(deniedFields);
        hideElement(grantedFields)
    }
}

chrome.permissions.onAdded.addListener(() => {
    updateForm();
});

chrome.permissions.onRemoved.addListener(() => {
    updateForm();
});

grantButton.addEventListener(
    "click",
    () => {
        chrome.permissions.request({
            origins: [config.ORIGINS]
        });
    }
);

denyButton.addEventListener(
    "click",
    () => {
        chrome.permissions.remove({
            origins: [config.ORIGINS]
        });
    }
);

(async () => {
    updateForm();
})();

