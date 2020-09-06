const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, DOTA_ECON, DOTA_MATCHES, BASE_CDN} = require('./constants')

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
}



module.exports = dotaSteamApi