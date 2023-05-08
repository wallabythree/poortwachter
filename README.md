# Poortwachter

![](https://raw.githubusercontent.com/wallabythree/poortwachter/main/images/dev/screenshot-firefox-cropped.png)

Poortwachter is a browser extension for Firefox and Chrome / Edge that keeps you
signed in with the Open Universiteit for as long as your browser is active.

## Installation

### Firefox

1. Click
[here](https://github.com/wallabythree/poortwachter/releases/latest/download/poortwachter-firefox.xpi)
to install the latest release.
2. After installation, click on the Poortwachter icon and press **Geef toegang** to
grant the necessary permissions.

### Chrome / Edge

1. Click [here](https://chrome.google.com/webstore/detail/poortwachter/ngbaoghamegfibhenakakgppdpeajcnp)
to install the latest release from the Chrome Web Store.
2. After installation, click on the Poortwachter icon and press **Geef toegang** to
grant the necessary permissions.

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
sessions. Poortwachter simply calls this endpoint periodically with the SSO
cookie value as *tokenId*. See the
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

