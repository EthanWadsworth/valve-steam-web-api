const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, DOTA_ECON, DOTA_MATCHES, BASE_CDN, DOTA_VERSION, DOTA_STORE_ECON, STEAM_USER_STATS} = require('./constants')

class dotaSteamApi {
    constructor(steamApiKey) {
        this.apiKey = steamApiKey
    }

    // return match details for match with match_id
    async getMatchDetails(match_id) {
        query_params = {
            key: this.apiKey,
            match_id
        }
        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetMatchDetails/v1?' + handleQueryParams(query_params))
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    // warning: this method is deprecated 
    // english string is returned be default
    // to find language code: go here :https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    async getLeagueListing(language) {
        query_params = {
            key: this.apiKey,
            language
        }
        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetLeagueListing/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    // returns list of games in progess
    async getLiveLeagueGames() {
        query_params = {
            key: this.apiKey
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetLiveLeagueGames/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    async getMatchHistory(hero_id, game_mode, skill, min_players, account_id, league_id, start_at_match_id, matches_requested, tournament_games_only) {
        query_params = {
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

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetMatchHistory/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    async getMatchHistoryBySequenceNum(start_at_match_id_seq_num, matches_requested) {
        query_params = {
            key: this.apiKey,
            start_at_match_id_seq_num,
            matches_requested
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetMatchHistoryBySequenceNum/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    //deprecated 
    async getScheduledLeagueGames(date_min, date_max) {
        query_params = {
            key: this.apiKey,
            date_min,
            date_max
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetScheduledLeagueGames/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    async getTeamInfoByTeamId(start_at_team_id, teams_requested) {
        query_params = {
            key: this.apiKey,
            start_at_team_id,
            teams_requested
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetTeamInfoByTeamID/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    // undocumented api call
    // access denied on valid match entry, key verification required
    async getMatchMVPVotes(match_id) {
        query_params = {
            key: this.apiKey,
            match_id
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetMatchMVPVotes/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    // not sure what partner does exactly
    async getTopLiveEventGame(partner) {
        query_params = {
            key: this.apiKey,
            partner
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetTopLiveEventGame/v1/?' + handleQueryParams(query_params));
                return responseHandler(query_params);
        }
        catch (e) {
            return e;
        }
    }

    // not sure what partner does again
    async getTopLiveGame(partner) {
        query_params = {
            key: this.apiKey,
            partner
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetTopLiveGame/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    async getTournamentPlayerStats(account_id, league_id, hero_id, time_frame) {
        query_params = {
            key: this.apiKey,
            account_id,
            league_id,
            hero_id,
            time_frame
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetTournamentPlayerStats/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    async getTopWeekendTourneyGames(partner, home_divison) {
        query_params = {
            key: this.apiKey,
            partner,
            home_divison
        }

        try {
            const response = await fetch(BASE_URL + DOTA_MATCHES + 'GetTopWeekendTourneyGames/v1/?' + handleQueryParams(query_params));
                return responseHandler(response);
        }
        catch (e) {
            return e;
        }
    }

    // Econ Dota 2
    getGameItems(language) {
        query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetGameItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    getHeroes(language) {
        query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetHeroes/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    getTournamentPrizePool(leagueid) {
        query_params = {
            key: this.apiKey,
            leagueid
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetTournamentPrizePool/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    getRarities(language) {
        query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_ECON + 'GetRarities/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // for grabbing image urls

    // getting hero icon with desired size
    getHeroIcon(heroName, size) {
        try {
            const sizes = ['sb.png', 'lg.png', 'full.png', 'vert.jpg'];
            if (size < 0 || size >= sizes.length) {
                throw new Error("Error: Please enter valid size")
            }
            const imgSize = sizes[Number(size)]
            const name = heroName.replace(/npc_dota_hero_/gi, '') + '_';
            return BASE_CDN + `heroes/${name}${imgSize}`;
        } catch(e) {
            return e;
        }
    }

    // getting item icon
    getItemIcon(itemName) {
        const name = itemName.replace(/item_/gi, '') + '_';
        return BASE_CDN + `items/${name}lg.png`
    }

    // valve currrently offers no known endpoint to get ability ids and names
    // user will have to know the correct name of the desired ability
    getAbilityIcon(heroName, abilityName) {
        const name = heroName.replace(/npc_dota_hero_/gi, '') + '_';
        return BASE_CDN + `abilities/${name}${abilityName}_lg.png`
    }

    // check for error handling from getHeroIcon
    // returns promise with list of heroes with hero icon urls attached 
    getHeroesWithIcons(language, size) {
        this.getHeroes(language)
        .then(heroData => {
            heroData.result.heroes.forEach(hero => {
                hero['heroIcon'] = this.getHeroIcon(hero.name, size)
            })
            return new Promise(function(resolve, reject) {
                if(heroData.result.heroes[0]['heroIcon']) {
                    resolve(heroData)
                } else {
                    reject(Error("Error: Failed to add hero icon urls"))
                }
            })
        })
        .catch(e => e)
    }

    // returns promise with list of items with item icon urls attached to each object
    getItemsWithIcons(language) {
        this.getGameItems(language)
        .then(itemData => {
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
        })
        .catch(e => e)
    }

    // methods for dota 2 client and dota 2 server versions

    // for getting dota 2 client version
    getClientVersion() {
        query_params = {
            key: this.apiKey
        }

        return fetch(BASE_URL + DOTA_VERSION + 'GetClientVersion/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // for getting dota 2 server version
    getServerVersion() {
        query_params = {
            key: this.apiKey
        }

        return fetch(BASE_URL + DOTA_VERSION + 'GetServerVersion/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // methods related to steam users and the steam economy market store for dota 2

    // returns current steam market data for the dota 2 page, including featured items and filters for each hero and category
    getStoreMetaData(language) {
        query_params = {
            key: this.apiKey,
            language
        }

        return fetch(BASE_URL + DOTA_STORE_ECON + 'GetStoreMetaData/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // get all dota 2 cosmetics currently owned by the steam user
    getPlayerItems(steamid) {
        query_params = {
            key: this.apiKey,
            steamid
        }

        return fetch(BASE_URL + DOTA_STORE_ECON +' GetPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // get items equipped for each hero by player
    getEquippedPlayerItems(steamid, class_id) {
        query_params = {
            key: this.apiKey,
            steamid,
            class_id
        }

        return fetch(BASE_URL + DOTA_STORE_ECON + 'GetEquippedPlayerItems/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // return realitime stats with steam server id
    getRealtimeStats(server_steam_id) {
        query_params = {
            key: this.apiKey,
            server_steam_id
        }

        return fetch(BASE_URL + 'IDOTA2MatchStats_570/GetRealtimeStats/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // get dota 2 news according to filter parameters
    getNewsForDotaApp(maxlength, enddate, count, feeds, appid="570") {
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

    // getting steam user and playerbase dota 2 global stats

    // dota 2 does not currently have any achievements, but it if ever does, use these methods

    // returns percentage of global playerbase that has earned each ingame achievement
    getGlobalAchievementPercentagesForDota(gameid="570") {
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
    getDotaPlayerAchievements(steamid, language, appid="570") {
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
    getSchemaForDota(language, appid="570") {
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
    getNumberOfCurrentPlayers(appid="570") {
        query_params = {
            key: this.apiKey,
            appid
        }
        return fetch(BASE_URL + STEAM_USER_STATS + 'GetNumberOfCurrentPlayers/v1/?' + handleQueryParams(query_params))
        .then(response => responseHandler(response))
        .catch(e => e)
    }

    // endpoints for ISteamEconomy: involves getting cosmetic item information

    // gets full list of purchasable items that have associated class ids and their properties
    getAssetPrices(currency, language, appid="570") {
        query_params = {
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
    // can return a certain number of classes
    getAssetClassInfo(language, class_count, class_id_list, appid="570") {
        try {
            query_params = {
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

module.exports = dotaSteamApi