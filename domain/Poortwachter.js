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
    constructor(settings = config, period = 1) {
        this.#config = settings;
        this.#period = period;

        console.log("connstruuuct!");

        browser.alarms.onAlarm.addListener((alarmInfo) => {
            if (alarmInfo.name === this.#config.ALARM_NAME) {
                this.refresh();
            }
        });
    }

    async isActive() {
        const alarm = await browser.alarms.get(this.#config.ALARM_NAME);
        console.log(alarm);
        return alarm != null;
    }

    /*
     * Get the OU SSO cookie, if present.
     *
     * @return the SSO cookie if present, else null
     */
    async getCookie() {
        return await browser.cookies.get({
            name: this.#config.SSO_COOKIE_NAME,
            url: this.#config.BASE_URL
        });
    }

    /*
     * Delete the SSO cookie, if present.
     */
    async deleteCookie() {
        await browser.cookies.remove({
            name: this.#config.SSO_COOKIE_NAME,
            url: this.#config.BASE_URL
        });
    }


    async hasCookie() {
        const cookie = await this.getCookie();
        return cookie != null;
    }

    /**
     * Authenticate to the OU SSO service.
     *
     * Grabs a fresh OpenAM SSO cookie. This cookie is automatically added to
     * the browser's cookie store and will be submitted whenever an OU
     * application redirects the user to the login page.
     */
    async refresh() {
        console.log("refreeesh!");
        const cookie = await this.getCookie();

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

        console.log(response);

        const json = await response.json();

        console.log(json);

        if (json && json.valid == "false") {
            console.log("false!");
            console.log(json);
            this.deleteCookie();
            this.stop();
        }
        else if (response.status !== 200
            || !json
            || json.idletime != 0
        ) {
            console.log("bad response!");
            this.stop();
            throw new Error(JSON.stringify(json));
        }
    }


    /**
     * Starts keeping the cookie fresh, if present.
     */
    async start() {
        console.log("staaart!");
        await this.stop();

        // authenticate once before scheduling alarm to verify credentials
        await browser.alarms.create(
            this.#config.ALARM_NAME,
            {
                when: 1,
                periodInMinutes: this.#period
            }
        );
    }

    /**
     * Stops keeping the cookie fresh.
     */
    async stop() {
        await browser.alarms.clear(this.#config.ALARM_NAME);
    }
}

const poortwachter = new Poortwachter();

export default poortwachter;

