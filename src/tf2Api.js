const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, STEAM_USER_STATS, TF2_STORE_ECON} = require('./constants')

class Tf2Api {
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    // returns percentage of global playerbase that has earned each ingame achievement
    getGlobalAchievementPercentagesForTF2(gameid="440") {
        query_params = {
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
        query_params = {
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
    getSchemaForDota(language, appid=570) {
        query_params = {
            key: this.apiKey,
            l: language,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetSchemaForGame/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // returns number of current ingame players
    getNumberOfCurrentPlayers(appid=570) {
        query_params = {
            key: this.apiKey,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetNumberOfCurrentPlayers/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // get tf2 news according to filter parameters
    getNewsForDotaApp(maxlength, enddate, count, feeds, appid="440") {
        query_params = {
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
        query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + 'ITFItems_440/GetGoldenWrenches/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // steam store endpoints
    getPlayerItems(steamid) {
        query_params = {
            key: this.apiKey,
            steamid
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // returns link to schema of items ingame
    getItemsSchemaURL() {
        query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetSchemaURL/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // describes how ingame items are classified and their associated ids
    getItemsSchemaOverview(language) {
        query_params = {
            key: this.apiKey,
            language
        }
        return fetch(BASE_URL + TF2_STORE_ECON + 'GetSchemaOverview/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    
}

module.exports = Tf2Api