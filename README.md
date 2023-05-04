# Poortwachter

*Note: this extension is not made or endorsed by the Open Universiteit.*

![](https://raw.githubusercontent.com/wallabythree/poortwachter/main/images/dev/screenshot-firefox-cropped.png)

Poortwachter is a browser extension for Firefox and Chrome / Edge that keeps you
signed in with the Open Universiteit for as long as your browser is active.

## Installation

### Firefox

Click
[here](https://github.com/wallabythree/poortwachter/releases/latest/download/poortwachter-firefox.xpi)
to install the latest release.

After installation, click on the Poortwachter icon and press **Geef toegang** to
grant the necessary permissions.

### Chrome / Edge

The Chrome version is awaiting approval from the Chrome Web Store. In the
meantime, follow these steps to install Poortwachter manually:

1. Download
[poortwachter-chrome.zip](https://github.com/wallabythree/poortwachter/releases/latest/download/poortwachter-chrome.zip).
2. Unzip the extension in a dedicated folder.
3. Browse to [chrome://extensions](chrome://extensions).
4. Select **Developer mode** in the top right of the screen. (Edge users: open
the menu in the top left of the screen).
5. Select **Load unpacked** and choose the folder where you unzipped
Poortwachter. This will install the extension.

After installation, click on the Poortwachter icon and press **Geef toegang** to
grant Poortwachter the necessary permissions.

## How does it work?

Poortwachter extends the lifetime of your OU Single Sign On (SSO) session.

When you sign in to the Open Universiteit, the OU login server installs a cookie
in your browser that lets you use any OU application without needing to sign in
again.

By default, the login session associated with this cookie becomes invalid after
only 50 minutes of inactivity. Poortwachter prevents this by periodically
asking the OU login server to keep your session alive.

### Technical notes

The OU uses [OpenAM](https://github.com/OpenIdentityPlatform/OpenAM) for access
management. OpenAM provides a specific REST endpoint for refreshing server-side
refreshing server-side sessions. Poortwachter calls this endpoint periodically
with the SSO cookie value as *tokenId*. See the
[ForgeRock AM documentation](https://backstage.forgerock.com/docs/am/7.3/sessions-guide/managing-sessions-REST.html#rest-api-session-refresh)
for a full explanation.

## Privacy

Poortwachter processes your OU Single Sign On cookie. Information in this cookie
is periodically sent to <https://login.ou.nl> to refresh the cookie. No other
information is collected, and neither the Poortwachter developers nor any other
third party will receive any information about you.

## Disclaimer

Your use of Poortwachter is entirely at your own risk. The developers accept no
responsibility or liability. Poortwachter is not made by or endorsed in any way
by the Open Universiteit.

