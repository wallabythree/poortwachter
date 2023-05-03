import config from '../config.js';

/**
 * Poortwachter - an OU SSO cookie refresher
 *
 * Periodically refreshes the OU Single Sign-On cookies so reauthentication is
 * no longer required.
 */
class Poortwachter {
    #config;
    #period;

    /**
     * Create a Poortwachter instance.
     *
     * @param settings A config object with preconfigured settings
     * @param period The period between authentication updates.
     */
    constructor(settings = config, period = 5) {
        this.#config = settings;
        this.#period = period;

        chrome.alarms.onAlarm.addListener((alarmInfo) => {
            if (alarmInfo.name === this.#config.ALARM_NAME) {
                this.refresh();
            }
        });
    }

    /**
     * Check if Poortwachter is active
     *
     * @return true if Poortwachter is active, else false
     */
    async isActive() {
        const alarm = await chrome.alarms.get(this.#config.ALARM_NAME);
        return alarm != null;
    }

    /*
     * Get the OU SSO cookie, if present.
     *
     * @return the SSO cookie if present, else null
     */
    async getCookie() {
        return await chrome.cookies.get({
            name: this.#config.SSO_COOKIE_NAME,
            url: this.#config.BASE_URL
        });
    }

    /*
     * Delete the SSO cookie, if present.
     */
    async deleteCookie() {
        await chrome.cookies.remove({
            name: this.#config.SSO_COOKIE_NAME,
            url: this.#config.BASE_URL
        });
    }

    async hasCookie() {
        const cookie = await this.getCookie();
        return cookie != null;
    }

    /**
     * Refresh the OU SSO cookie.
     */
    async refresh() {
        const cookie = await this.getCookie();

        // if we don't have a cookie, stop trying to refresh it
        if (!cookie) {
            this.stop();
            return;
        }

        // construct a valid refresh request body
        // https://backstage.forgerock.com/docs/am/7/sessions-guide/managing-sessions-REST.html#rest-api-session-refresh
        const body = {
            tokenId: cookie.value
        };

        // request OpenAM Callback Information object
        const response = await fetch(
            this.#config.SSO_REFRESH_URL,
            { 
                method: "POST",
                credentials: "omit",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        const json = await response.json();

        // delete our cookie if the server says it has expired
        if (json && json.valid === false) {
            this.deleteCookie();
        }

        // if we receive an unexpected response,
        // stop trying to refresh the cookie
        if (response.status !== 200
            || !json
            || !json.uid
        ) {
            this.stop();
        }
    }

    /**
     * Start keeping the cookie fresh.
     */
    async start() {
        await this.stop();

        // authenticate once before scheduling alarm to verify credentials
        await chrome.alarms.create(
            this.#config.ALARM_NAME,
            {
                when: 1,
                periodInMinutes: this.#period
            }
        );
    }

    /**
     * Stop keeping the cookie fresh.
     */
    async stop() {
        await chrome.alarms.clear(this.#config.ALARM_NAME);
    }
}

const poortwachter = new Poortwachter();

export default poortwachter;

