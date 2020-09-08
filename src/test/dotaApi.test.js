let dotaSteamApi = require('../dota-api')
// let assert = require('assert');
const {assert, expect} = require('chai')

let dotaApi

before('Setting up testing', () => {
    dotaApi = new dotaSteamApi(process.env.STEAM_API_KEY);
})

describe('getMatchDetails', () => {
    const testMatchId = 5577982773
    it('Return valid response with detailed match results', done => {
        dotaApi.getMatchDetails(testMatchId)
        .then(response => {
            assert.exists(response.result, 'no result returned from api call')
            assert.equal(response.result.match_id, testMatchId, 'requested match id and returned id do not match')
            assert.exists(response.result.players)
            assert.isArray(response.result.players)
            assert.isAtMost(response.result.players.length, 10)
        })
        .then(() => done())
    })
})

describe('getLiveLeagueGames', () => {
    it('returns professional games in progress', done => {
        dotaApi.getLiveLeagueGames()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.games)
            assert.isArray(response.result.games)
            assert.isAtLeast(response.result.games.length, 1)
        })
        .then(() => done())
    })
})

describe('getMatchHistory', () => {
    it('return response with and without hero_id parameter', done => {
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
        .then(() => done())
    })

    it('return respones with correct number of matches requested', done => {
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
        .then(() => done())
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
    it('should return information for team with selected team id', () => {
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

describe('getTopLiveEventGame', () => {
    it('return information with top live event games', () => {
        const requestedPartner = 0
        dotaApi.getTopLiveEventGame(requestedPartner)
        .then(response => {
            assert.exists(response.game_list)
            assert.isArray(response.game_list)
            assert.isAtLeast(response.game_list.length, 1)
            assert.exists(response.game_list[0].players)
            assert.isAtLeast(response.game_list[0].players.length, 1)
        })
    })
})

describe('getTopLiveGame', () => {
    it('return information with top live games from dota client', () => {
        const requestedPartner = 0
        dotaApi.getTopLiveGame(requestedPartner)
        .then(response => {
            assert.exists(response.game_list)
            assert.isArray(response.game_list)
            assert.isAtLeast(response.game_list.length, 1)
            assert.exists(response.game_list[0].players)
        })
    })
})

describe('getTournamentPlayerStats', () => {
    it('return player info stats from matches at the International', () => {
        // account id for one of OG's players
        const requestedPlayerId = 16769223
        dotaApi.getTournamentPlayerStats(requestedPlayerId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.matches)
            assert.isArray(response.result.matches)
            assert.isAtLeast(response.result.matches.length, 1)
            assert.exists(response.result.account_id)
            assert.equal(response.result.account_id, requestedPlayerId)
        })
    })
})

// IEcon Dota methods

describe('getGameItems', () => {
    it('return ingame item info', () => {
        dotaApi.getGameItems()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items)
            assert.isArray(response.result.items)
            assert.isAtLeast(response.result.items.length, 1)
            assert.exists(response.result.items[0].name)
        })
    })
})

describe('getHeroes', () => {
    it('return ingame hero info', () => {
        dotaApi.getHeroes()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.heroes)
            assert.isArray(response.result.heroes)
            assert.isAtLeast(response.result.heroes.length, 1)
            assert.exists(response.result.heroes[0].name)
        })
    })
})

describe('getTournamentPrizePool', () => {
    it('return tournament prize pool amount', () => {
        // The International id
        const requestedTourneyId = 65006
        dotaApi.getTournamentPrizePool(requestedTourneyId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.prize_pool)
            assert.equal(response.result.league_id, requestedTourneyId)
        })
    })
})

describe('getRarities', () => {
    it('return cosmetic item rarity descriptors', () => {
        dotaApi.getRarities()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.rarities)
            assert.isArray(response.result.rarities)
            assert.isAtLeast(response.result.rarities.length, 1)
            assert.exists(response.result.rarities[0].name)
        })
    })
})