const BASE_URL = "https://api.steampowered.com/"
// change to 205790 for Dota 2 Beta
const DOTA_TYPE = "570"
const DOTA_ECON = "IEconDOTA2_" + DOTA_TYPE + '/'
const DOTA_VERSION = "IGCVERSION_" + DOTA_TYPE + '/'
const DOTA_MATCHES = "IDOTA2Match_" + DOTA_TYPE + '/'
const BASE_CDN = 'http://cdn.dota2.com/apps/dota2/images/'

module.exports = {
    BASE_URL,
    DOTA_ECON,
    DOTA_MATCHES,
    BASE_CDN,
    DOTA_VERSION
}