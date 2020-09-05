const {responseHandler, handleQueryParams} = require('./utils')
const {BASE_URL, DOTA_ECON, DOTA_MATCHES} = require('./constants')

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
            const response = await fetch(BASE_URL + DOTA_MATCHES + '/GetMatchDetails/v1?' + handleQueryParams(query_params))
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
            const response = await fetch(BASE_URL + DOTA_MATCHES + '/GetLeagueListing/v1/?' + handleQueryParams(query_params));
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
}