let config = {
    ALARM_NAME: "poortwachter",
    SSO_COOKIE_NAME: "ousso",
    BASE_URL: "https://login.ou.nl",
    SSO_PATH: "/am/json/realms/root/realms/ou",
    SSO_SESSIONS_ENDPOINT: "/sessions/",
    SSO_SESSIONS_REFRESH_ACTION: "?_action=refresh"
};

config.SSO_REFRESH_URL = config.BASE_URL
    + config.SSO_PATH
    + config.SSO_SESSIONS_ENDPOINT
    + config.SSO_SESSIONS_REFRESH_ACTION;

Object.freeze(config);

export default config;

