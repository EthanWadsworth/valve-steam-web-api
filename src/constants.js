const BASE_URL = "https://api.steampowered.com/"
// change to 205790 for Dota 2 Beta
const DOTA_TYPE = "570"
const DOTA_ECON = "IEconDOTA2_" + DOTA_TYPE + '/'
const DOTA_VERSION = "IGCVERSION_" + DOTA_TYPE + '/'
const DOTA_MATCHES = "IDOTA2Match_" + DOTA_TYPE + '/'
const DOTA_STORE_ECON = "IEconItems_" + DOTA_TYPE + '/'
const STEAM_USER_STATS = "ISteamUserStats/"
const BASE_CDN = 'http://cdn.dota2.com/apps/dota2/images/'

const TF2_APPID = "440"
const TF2_STORE_ECON = "IEconItems_" + TF2_APPID + '/'

const STEAM_ECONOMY = "ISteamEconomy/"

const CSGO_APPID = "730"
const CSGO_STORE_ECON = "IEconItems_" + CSGO_APPID + '/'

module.exports = {
    BASE_URL,
    DOTA_ECON,
    DOTA_MATCHES,
    BASE_CDN,
    DOTA_VERSION,
    DOTA_STORE_ECON,
    STEAM_USER_STATS,
    TF2_STORE_ECON,
    STEAM_ECONOMY,
    CSGO_STORE_ECON
}