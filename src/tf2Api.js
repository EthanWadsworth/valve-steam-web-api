const fetch = require('node-fetch')
const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, STEAM_USER_STATS, TF2_STORE_ECON, STEAM_ECONOMY} = require('./constants')

class Tf2Api {
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    // returns percentage of global playerbase that has earned each ingame achievement
    getGlobalAchievementPercentagesForTF2(gameid="440") {
        const query_params = {
            key: this.apiKey,
            gameid
        }

        return fetch(BASE_URL + STEAM_USER_STATS + 'GetGlobalAchievementPercentagesForApp/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // grab individual steam user achievements for dota
    // steam profile must be of public status
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

    // returns game name, version, and ingame stats tracked, dota has none as of now
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

    // returns number of current ingame players
    getNumberOfCurrentPlayers(appid=440) {
        const query_params = {
            key: this.apiKey,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetNumberOfCurrentPlayers/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // get tf2 news according to filter parameters
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

    // returns users who are currently in possession of golden wrenches
    getGoldenWrenches() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + 'ITFItems_440/GetGoldenWrenches/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // steam store endpoints
    getPlayerItems(steamid) {
        const query_params = {
            key: this.apiKey,
            steamid
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // returns link to schema of items ingame
    getItemSchemaURL() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetSchemaURL/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // describes how ingame items are classified and their associated ids
    getItemSchemaOverview(language) {
        const query_params = {
            key: this.apiKey,
            language
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetSchemaOverview/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // returns steam market metadata for the TF2 market
    getSteamStoreMetaData(language) {
        const query_params = {
            key: this.apiKey,
            language
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetStoreMetaData/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // current TF2 store status
    // call largely undocumented - status codes unknown
    getStoreStatus() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetStoreStatus/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // endpoints for ISteamEconomy: involves getting cosmetic item information
    // gets full list of purchasable items that have associated class ids and their properties
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

    // gets item info by class id
    // can return a certain number of classes, and each class can be filtered by instance
    // so for example, if a hat comes in genuine, normal, vintage, and unusual varities, these can be filtered 
    // out according to the desired instance id - if known
    getAssetClassInfo(language, class_count, class_id_list, appid="440") {
        try {
            const query_params = {
                key: this.apiKey,
                class_count,
                language,
                appid
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