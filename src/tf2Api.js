const fetch = require('node-fetch')
const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, STEAM_USER_STATS, TF2_STORE_ECON, STEAM_ECONOMY} = require('./constants')

/**
 * Wrapper class for the steam web api specically for Dota 2
 */
class Tf2Api {
    /**
     * Steam api key required, get one at: https://steamcommunity.com/dev/apikey
     * @param {string} steamApiKey 
     */
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    /**
     * Return list of ingame achievements and the percentage of the global playerbase that has earned each one
     * Method can and should be called with no parameters as tf2 is already specified
     * @param {number} gameid (uint64)
     */
    getGlobalAchievementPercentagesForTF2(gameid="440") {
        const query_params = {
            key: this.apiKey,
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
    getTF2PlayerAchievements(steamid, language, appid="440") {
        const query_params = {
            key: this.apiKey,
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
    getSchemaForTF2(language, appid="440") {
        const query_params = {
            key: this.apiKey,
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
    getNumberOfCurrentPlayers(appid=440) {
        const query_params = {
            key: this.apiKey,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetNumberOfCurrentPlayers/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    
    /**
     * Miscellaneous endpoints
     */

     
    // get tf2 news according to filter parameters
    /**
     * Get recent news for TF2 by the filterable parameters
     * The appid should not be changed, default is 440
     * @param {number} maxlength (optional - uint32)
     * @param {number} enddate (optional - uint32 unix epoch timestamp)
     * @param {number} count (optional - uint32)
     * @param {string} feeds (optional)
     * @param {number} appid (uint32)
     */
    getNewsForTF2App(maxlength, enddate, count, feeds, appid="440") {
        const query_params = {
            key: this.apiKey,
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
     * Returns list of users who are currently in possession of golden wrenches
     */
    getGoldenWrenches() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + 'ITFItems_440/GetGoldenWrenches/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * IEconItems_440:  TF2 steam market and owned player cosmetics endpoints
     */


     /**
      * Returns list of all tf2 cosmetics and their information owned by given user
      * @param {number} steamid (uint64)
      */
    getPlayerItems(steamid) {
        const query_params = {
            key: this.apiKey,
            steamid
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns link to online file of schema of ingame items
     */
    getItemSchemaURL() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetSchemaURL/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns description of how ingame items are classified and the propertiers and id of each cosmetic item
     * @param {string} language (optional)
     */
    getItemSchemaOverview(language) {
        const query_params = {
            key: this.apiKey,
            language
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetSchemaOverview/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns current steam market data for the tf2 page, including featured items and filters for each class
     * @param {string} language (optional)
     */
    getSteamStoreMetaData(language) {
        const query_params = {
            key: this.apiKey,
            language
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetStoreMetaData/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Call undocumented - status code meanings unknown
     * Probably should not be used until more information is found
     */
    getStoreStatus() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetStoreStatus/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * ISteamEconomy: endpoints for tf2 cosmetic item information
     */


    /**
     * Returns full list of purchasable items and their individual class ids and properties
     * appid should be left as default value for TF2 cosmetic item information
     * @param {string} currency (optional)
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getAssetPrices(currency, language, appid="440") {
        const query_params = {
            key: this.apiKey,
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
     * appid should be left out of method call, default value set to TF2
     * @param {string} language (optional)
     * @param {number} class_count (uint32)
     * @param {Array(number)} class_id_list 
     * @param {number} appid (uint32)
     */
    getAssetClassInfo(language, class_count, class_id_list, appid="440") {
        try {
            const query_params = {
                key: this.apiKey,
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

module.exports = Tf2Api