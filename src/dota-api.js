const fetch = require('node-fetch')
const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, DOTA_ECON, DOTA_MATCHES, BASE_CDN, DOTA_VERSION, DOTA_STORE_ECON, STEAM_USER_STATS, STEAM_ECONOMY} = require('./constants')

/**
 * Wrapper class for the steam web api specically for Dota 2
 */
class dotaSteamApi {
    /**
     * Steam api key required, get one at: https://steamcommunity.com/dev/apikey
     * @param {string} steamApiKey 
     */
    constructor(steamApiKey) {
        this.apiKey = steamApiKey
    }


    /**
     * IDOTA2MATCH_570: interface methods for dota 2 matches
     */


    /**
     * Returns detailed match results for match with given id
     * @param {number} match_id (uint64)
     */
    getMatchDetails(match_id) {
        const query_params = {
            key: this.apiKey,
            match_id
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetMatchDetails/v1?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * WARNING: This method is deprecated
     * Returns a list of all leagues supported in-game via DotaTV.
     * @param {string} language (optional - ISO_639-1 code)
     * Codes found here: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
     */
    getLeagueListing(language) {
        query_params = {
            key: this.apiKey,
            language
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetLeagueListing/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Gets live league games and their individual details
     */
    getLiveLeagueGames() {
        const query_params = {
            key: this.apiKey
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetLiveLeagueGames/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Retrieves list of matches with given filterable parameters
     * Use null to ignore undesired filters
     * @param {number} hero_id (optional - uint32)
     * @param {number} game_mode (optional - uint32)
     * @param {number} skill (optional - uint32)
     * @param {string} min_players (optional)
     * @param {string} account_id (optional)
     * @param {string} league_id (optional)
     * @param {string} start_at_match_id (optional)
     * @param {string} matches_requested (optional)
     * @param {string} tournament_games_only (optional)
     */
    getMatchHistory(hero_id, game_mode, skill, min_players, account_id, league_id, start_at_match_id, matches_requested, tournament_games_only) {
        const query_params = {
            key: this.apiKey,
            hero_id,
            game_mode,
            skill,
            min_players,
            account_id,
            league_id,
            start_at_match_id,
            matches_requested,
            tournament_games_only
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetMatchHistory/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Retrieves lists of matches with given sequence range
     * Starts at random sequence number if no start or end sequence specified
     * @param {number} start_at_match_seq_num (optional - uint64)
     * @param {number} matches_requested (optional - uint32)
     */
    getMatchHistoryBySequenceNum(start_at_match_seq_num, matches_requested) {
        const query_params = {
            key: this.apiKey,
            start_at_match_seq_num,
            matches_requested
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetMatchHistoryBySequenceNum/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * WARNING: This call is deprecated
     * Retrieves list of upcoming scheduled league games within given timestamp range
     * @param {number} date_min (optional - uint32)
     * @param {number} date_max (optional - uint32)
     */
    getScheduledLeagueGames(date_min, date_max) {
        query_params = {
            key: this.apiKey,
            date_min,
            date_max
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetScheduledLeagueGames/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of teams using the optional parameters
     * @param {number} start_at_team_id (optional - uint64)
     * @param {number} teams_requested (optional - uint32)
     */
    getTeamInfoByTeamId(start_at_team_id, teams_requested) {
        const query_params = {
            key: this.apiKey,
            start_at_team_id,
            teams_requested
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetTeamInfoByTeamID/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Undocumented API call, currently restricts access even with valid key
     * @param {number} match_id (uint64)
     */
    getMatchMVPVotes(match_id) {
        const query_params = {
            key: this.apiKey,
            match_id
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetMatchMVPVotes/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns information about the most popular live tournament game
     * @param {number} partner (int32)
     */
    getTopLiveEventGame(partner) {
        const query_params = {
            key: this.apiKey,
            partner
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetTopLiveEventGame/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns information about the most popular live game currently
     * @param {number} partner (int32)
     */
    getTopLiveGame(partner) {
        const query_params = {
            key: this.apiKey,
            partner
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetTopLiveGame/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Retrieves pro player stats from games played at the International 
     * Dota 2 Championships
     * Currently only supports matches played at the International (league_id=65006)
     * Team and player ids can be grabbed by using getTeamInforByTeamId
     * @param {string} account_id 
     * @param {string} hero_id (optional)
     * @param {string} time_frame (optional)
     * @param {number} match_id (optional - uint32)
     * @param {string} league_id (optional)
     */
    getTournamentPlayerStats(account_id, hero_id, time_frame, match_id, league_id=65006) {
        const query_params = {
            key: this.apiKey,
            account_id,
            league_id,
            hero_id,
            time_frame,
            match_id
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetTournamentPlayerStats/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }
    
    /**
     * Possibly deprecated
     * Returns list of best tournament games over the weekend
     * @param {number} partner (int32)
     * @param {number} home_divison (optional - int32)
     */
    getTopWeekendTourneyGames(partner, home_divison) {
        const query_params = {
            key: this.apiKey,
            partner,
            home_divison
        }
        return fetch(BASE_URL + DOTA_MATCHES + 'GetTopWeekendTourneyGames/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * IEconDOTA2_570: interface methods for ingame objects
     */


    /**
     * Returns list of ingame items with their name and price
     * @param {string} language (optional)
     */
    getGameItems(language) {
        const query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetGameItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of ingame heroes with their names and hero ids
     * @param {string} language (optional)
     */
    getHeroes(language) {
        const query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetHeroes/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns community funded portion of a tournament's prize pool
     * The default leagueid is that of the Dota 2 International
     * @param {number} leagueid (optional - int)
     */
    getTournamentPrizePool(leagueid=65006) {
        const query_params = {
            key: this.apiKey,
            leagueid
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetTournamentPrizePool/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of consmetic item rarities, and their corresponding name, id, and hex color
     * @param {string} language (optional)
     */
    getRarities(language) {
        const query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetRarities/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * Methods for returning dota 2 imgame object urls
     */


    /**
     * Returns hero icon url with desired size
     * @param {string} heroName 
     * @param {number} size 
     * 0: sb.png - smallest horizontal icon size (59 x 33)
     * 1: lg.png - middle horizontal icon size (205 x 115)
     * 2: full.png - largest of the 3 horizontal icons (256 x 144)
     * 3: vert.jpg - ingame icon shown to left of hp and mana bars (235 x 272)
     */
    getHeroIcon(heroName, size=0) {
        try {
            const sizes = ['sb.png', 'lg.png', 'full.png', 'vert.jpg'];
            if (size < 0 || size >= sizes.length) {
                throw new Error("Error: Please enter valid size")
            }
            const imgSize = sizes[Number(size)]
            const name = heroName.replace(/npc_dota_hero_/gi, '') + '_';
            return BASE_CDN + `heroes/${name}${imgSize}`;
        } catch(e) {
            return e.message;
        }
    }

    /**
     * Returns item icon url with given name
     * @param {string} itemName 
     */
    getItemIcon(itemName) {
        const name = itemName.replace(/item_/gi, '') + '_';
        return BASE_CDN + `items/${name}lg.png`
    }

    /**
     * Returns ability icon url
     * Valve currently offers no api endpoint to retrieve ability ids and names
     * @param {string} heroName 
     * @param {string} abilityName 
     */
    getAbilityIcon(heroName, abilityName) {
        const name = heroName.replace(/npc_dota_hero_/gi, '') + '_';
        return BASE_CDN + `abilities/${name}${abilityName}_lg.png`
    }
 
    /**
     * Returns list of heroes, their names, and ids, as well as their icons with desired size
     * @param {string} language (optional)
     * @param {number} size 
     * 0: sb.png - smallest horizontal icon size (59 x 33) (default)
     * 1: lg.png - middle horizontal icon size (205 x 115)
     * 2: full.png - largest of the 3 horizontal icons (256 x 144)
     * 3: vert.jpg - ingame icon shown to left of hp and mana bars (235 x 272)
     */
    async getHeroesWithIcons(language, size=0) {
        const heroData = await this.getHeroes(language)
        heroData.result.heroes.forEach(hero => {
            hero['heroIcon'] = this.getHeroIcon(hero.name, size)
        })
        return new Promise((resolve, reject) => {
            if(heroData.result.heroes[0]['heroIcon']) {
                resolve(heroData)
            } else {
                reject(new Error("Error: Failed to add hero icon urls"))
            }
        })
    }

    /**
     * Returns promise with list of items with item icon urls attached to each object
     * @param {string} language (optional)
     */
    async getItemsWithIcons(language) {
        const itemData = await this.getGameItems(language)
        itemData.result.items.forEach(item => {
            item['icon'] = this.getItemIcon(item.name)
        })
        return new Promise(function(resolve, reject) {
            if(itemData.result.items[0]['icon']) {
                resolve(itemData)
            } else {
                reject(Error("Error: Failed to add item icon urls"))
            }
        })
    }


    /**
     * IGGVERSION_570: Dota 2 version endpoints
     */


    /**
     * Returns current active version of the Dota 2 game client
     */
    getClientVersion() {
        const query_params = {
            key: this.apiKey
        }

        return fetch(BASE_URL + DOTA_VERSION + 'GetClientVersion/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * Returns current active version of Dota 2 game servers
     */
    getServerVersion() {
        const query_params = {
            key: this.apiKey
        }

        return fetch(BASE_URL + DOTA_VERSION + 'GetServerVersion/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * IEconItems_570: Dota 2 steam market and owned player cosmetics endpoints
     */


    /**
     * Returns current steam market data for the dota 2 page, including featured items and filters for each hero and category
     * @param {string} language (optional)
     */
    getStoreMetaData(language) {
        const query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_STORE_ECON + 'GetStoreMetaData/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of all dota 2 cosmetics and their information owned by given user
     * @param {number} steamid (uint64)
     */
    getPlayerItems(steamid) {
        const query_params = {
            key: this.apiKey,
            steamid
        }

        return fetch(BASE_URL + DOTA_STORE_ECON + 'GetPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of cosmetic items that steam user has equipped for given hero id
     * @param {number} steamid (uint64)
     * @param {number} class_id (uint32)
     */
    getEquippedPlayerItems(steamid, class_id) {
        const query_params = {
            key: this.apiKey,
            steamid,
            class_id
        }

        return fetch(BASE_URL + DOTA_STORE_ECON + 'GetEquippedPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * Miscellaneous endpoints
     */


    /**
     * Return realtime stats for the given steam server id
     * @param {number} server_steam_id (uint64)
     */
    getRealtimeStats(server_steam_id) {
        const query_params = {
            key: this.apiKey,
            server_steam_id
        }

        return fetch(BASE_URL + 'IDOTA2MatchStats_570/GetRealtimeStats/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Get recent news for Dota 2 by the filterable parameters
     * The appid should not be changed, default is 570
     * @param {number} maxlength (optional - uint32)
     * @param {number} enddate (optional - uint32 unix epoch timestamp)
     * @param {number} count (optional uint32)
     * @param {string} feeds (optional)
     * @param {number} appid (uint32)
     */
    getNewsForDotaApp(maxlength, enddate, count, feeds, appid="570") {
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
     * ISteamUserStats: getting steam user and playerbase dota 2 global stats
     * Dota 2 does not currently support player achievements 
     */


    /**
     * Returns list of achievement and percentage of global playerbase that have earned each
     * Can be called with no parameters because the default is set to Dota2's gameid
     * @param {number} gameid (uint64)
     */
    getGlobalAchievementPercentagesForDota(gameid="570") {
        const query_params = {
            key: this.apiKey,
            gameid
        }

        return fetch(BASE_URL + STEAM_USER_STATS + 'GetGlobalAchievementPercentagesForApp/v2/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    /**
     * Returns list of steam user achievements
     * Profile of user must be public
     * the appid parameter should not be used - default is already set to Dota
     * @param {number} steamid (uint64)
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getDotaPlayerAchievements(steamid, language, appid="570") {
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
     * Returns game name, version, and ingame stats tracked, Dota has none as of now
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getSchemaForDota(language, appid="570") {
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
     * Returns number of current ingame players
     * @param {number} appid (uint32)
     */
    getNumberOfCurrentPlayers(appid="570") {
        const query_params = {
            key: this.apiKey,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetNumberOfCurrentPlayers/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }


    /**
     * ISteamEconomy: endpoints for dota 2 cosmetic item information
     */


    /**
     * Returns full list of purchasable items and their individual class ids and properties
     * appid should be left as default value for Dota2 cosmetic item information
     * @param {string} currency (optional)
     * @param {string} language (optional)
     * @param {number} appid (uint32)
     */
    getAssetPrices(currency, language, appid="570") {
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
     * appid should be left out of method call, default value set to Dota2
     * @param {string} language (optional)
     * @param {number} class_count (uint32)
     * @param {Array(number)} class_id_list 
     * @param {number} appid (uint32)
     */
    getAssetClassInfo(language, class_count, class_id_list, appid="570") {
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

module.exports = dotaSteamApi