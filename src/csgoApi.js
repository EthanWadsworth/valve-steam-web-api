const fetch = require('node-fetch')
const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, CSGO_STORE_ECON, STEAM_USER_STATS, STEAM_ECONOMY} = require('./constants')

/**
 * Wrapper class for the steam web api specically for CSGO
 */
class csgoApi {
    /**
     * Steam api key required, get one at: https://steamcommunity.com/dev/apikey
     * @param {string} steamApiKey 
     */
    constructor(apiKey) {
        this.key = apiKey
    }

    /**
     * Retrieves CSGO maps and their respective playtimes over the given interval
     * @param {string} interval 
     * @param {string} gamemode 
     * @param {string} mapgroup
     */
    getGameMapsPlaytime(interval, gamemode, mapgroup) {
        const query_params = {
            key: this.key,
            interval,
            gamemode,
            mapgroup
        }
        return fetch(BASE_URL + 'ICSGOServers_730/GetGameMapsPlaytime/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }
    
    /**
     * Retrieves current CSGO game server statuses
     */
    getGameServersStatus() {
        const query_params = {
            key: this.key
        }
        return fetch(BASE_URL + 'ICSGOServers_730/GetGameServersStatus/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Describes ingame weapon properties and details and how CS:GO classifies ingame activities and features
     * @param {string} language (optional)
     */
    getSchema(language) {
        const query_params = {
            key: this.key,
            language
        }
        return fetch(BASE_URL + CSGO_STORE_ECON + 'GetSchema/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns url to ingame item schema file
     */
    getSchemaURL() {
        const query_params = {
            key: this.key
        }
        return fetch(BASE_URL + CSGO_STORE_ECON + '/GetSchemaURL/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Retrieves metadata on how the steam market filters CS:GO ingame items such as cosmetics
     * @param {string} language (optional)
     */
    getStoreMetaData(language) {
        const query_params = {
            key: this.key,
            language
        }
        return fetch(BASE_URL + CSGO_STORE_ECON + 'GetStoreMetaData/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Retrieves information about CSGO ingame servers
     */
    getServerVersion() {
        const query_params = {
            key: this.key
        }
        return fetch(BASE_URL + 'IGCVersion_730/GetServerVersion/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Get recent news for CSGO by the filterable parameters
     * The appid should not be changed, default is 730
     * @param {number} maxlength (optional - uint32)
     * @param {number} enddate (optional - uint32 unix epoch timestamp)
     * @param {number} count (optional - uint32)
     * @param {string} feeds (optional)
     * @param {number} appid (uint32)
     */
    getNewsForCSGOApp(maxlength, enddate, count, feeds, appid="730") {
        const query_params = {
            key: this.key,
            appid,
            maxlength,
            enddate,
            count,
            feeds
        }

        return fetch(BASE_URL + 'ISteamNews/GetNewsForApp/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Return list of ingame achievements and the percentage of the global playerbase that has earned each one
     * Method can and should be called with no parameters as CSGO is already specified
     * @param {number} gameid (uint64)
     */
    getGlobalAchievementPercentagesForCSGO(gameid="730") {
        const query_params = {
            key: this.key,
            gameid
        }

        return fetch(BASE_URL + STEAM_USER_STATS + 'GetGlobalAchievementPercentagesForApp/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of earned achievements for the given steam user
     * Steam user profile must be public for api call to work successfully
     * @param {number} steamid (uint64)
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getCSGOPlayerAchievements(steamid, language, appid="730") {
        const query_params = {
            key: this.key,
            steamid,
            appid,
            l: language
        }

        return fetch(BASE_URL + STEAM_USER_STATS + 'GetPlayerAchievements/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns game name, version, and list of ingame stats tracked
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getSchemaForCSGO(language, appid="730") {
        const query_params = {
            key: this.key,
            l: language,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetSchemaForGame/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns current number of ingame players
     * @param {number} appid (uint32)
     */
    getNumberOfCurrentPlayers(appid=730) {
        const query_params = {
            key: this.key,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetNumberOfCurrentPlayers/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns full list of purchasable items and their individual class ids and properties
     * appid should be left as default value for CSGO cosmetic item information
     * @param {string} currency (optional)
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getAssetPrices(currency, language, appid="730") {
        const query_params = {
            key: this.key,
            currency,
            language,
            appid
        }
        return fetch(BASE_URL + STEAM_ECONOMY + 'GetAssetPrices/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns item info by class id from the class_id_list array
     * To get item class ids, use getAssetPrices
     * appid should be left out of method call, default value set to CSGO
     * @param {string} language (optional)
     * @param {number} class_count (uint32)
     * @param {Array(number)} class_id_list 
     * @param {number} appid (uint32)
     */
    getAssetClassInfo(language, class_count, class_id_list, appid="730") {
        try {
            const query_params = {
                key: this.key,
                class_count,
                language,
                appid
            }

            if(!Array.isArray(class_id_list)) {
                throw new Error("Error: class_id_list must be an array")
            }

            if(class_id_list < 1 || class_id_list.length < 1) {
                throw new Error("Error: a minimum of 1 class ids is required")
            }
            
            for(let i = 0; i < class_id_list.length; i++) {
                query_params["classid" + i] = class_id_list[i];
            }

            return fetch(BASE_URL + STEAM_ECONOMY + 'GetAssetClassInfo/v1/?' + handleQueryParams(query_params))
            .then(response => responseHandler(response))
            .catch(e => e)
        } catch(e) {
            return e;
        }
    }
}

module.exports = csgoApi