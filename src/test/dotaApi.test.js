let dotaSteamApi = require('../dota-api')
// let assert = require('assert');
const {assert, expect} = require('chai')

let dotaApi

before('Setting up testing', () => {
    dotaApi = new dotaSteamApi(process.env.STEAM_API_KEY);
})

describe('getMatchDetails', () => {
    const testMatchId = 5577982773
    it('Return valid response with detailed match results', async () => {
        const response = await dotaApi.getMatchDetails(testMatchId)
        assert.exists(response.result, 'no result returned from api call')
        assert.equal(response.result.match_id, testMatchId, 'requested match id and returned id do not match')
        assert.exists(response.result.players)
        assert.isArray(response.result.players)
        assert.isAtMost(response.result.players.length, 10)
    })
})

describe('getLiveLeagueGames', () => {
    it('returns professional games in progress', () => {
        dotaApi.getLiveLeagueGames()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.games)
            assert.isArray(response.result.games)
            assert.isAtLeast(response.result.games.length, 1)
        })
    })
})

describe('getMatchHistory', () => {
    it('return response with and without hero_id parameter', () => {
        const testHeroId = 1
        dotaApi.getMatchHistory(testHeroId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.num_results)
            assert.isAtLeast(response.result.num_results, 1)

            assert.exists(response.result.matches)
            assert.isArray(response.result.matches)
            assert.isAtLeast(response.result.matches.length, 1)

            assert.exists(response.result.matches[0].players)

            // check to ensure that hero is in result match
            const heroFilter = response.result.matches[0].players.filter(player => player.hero_id === testHeroId)
            assert.isAtLeast(heroFilter.length, 1)
        })
    })

    it('return respones with correct number of matches requested', () => {
        const numMatchesRequested = 20
        dotaApi.getMatchHistory(null, null, null, null, null, null, null, numMatchesRequested)
        // dotaApi.getMatchHistory(matches_requested=numMatchesRequested)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.num_results)
            assert.isAtLeast(response.result.num_results, 1)
            assert.exists(response.result.matches)
            assert.isArray(response.result.matches)
            assert.isAtLeast(response.result.matches.length, 1)
            assert.isAtMost(response.result.matches.length, numMatchesRequested)
        })
    })
})

describe('getMatchHistoryBySequenceNum', () => {
    it('should return matches starting at requested match sequence num', () => {
        const startMatchSeqNum = 4706807932
        const numMatchesRequested = 15
        dotaApi.getMatchHistoryBySequenceNum(startMatchSeqNum, numMatchesRequested)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.matches)
            assert.isArray(response.result.matches)
            assert.isAtLeast(response.result.matches.length, 1)
            assert.exists(response.result.matches[0].match_seq_num)
            assert.isAtLeast(response.result.matches[0].match_seq_num, startMatchSeqNum)
        })
    })
})

describe('getTeamInfoByTeamId', () => {
    it('should return ', () => {
        // team id for Team Liquid
        const teamIdrequested = 2163
        const teamsRequested = 10
        dotaApi.getTeamInfoByTeamId(teamIdrequested, teamsRequested)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.teams)
            assert.isArray(response.result.teams)
            assert.isAtLeast(response.result.teams.length, 1)
            assert.exists(response.result.teams[0].tag)
            assert.equal(response.result.teams[0].tag, 'Liquid')
            assert.isAtLeast(response.result.teams.length, teamsRequested)
        })
    })
})