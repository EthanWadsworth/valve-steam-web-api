let dotaSteamApi = require('../dota-api')
const assert = require('chai').assert

let dotaApi

let isNotArray
let undefinedResult
let undefinedProp
let minRequiredSize
let isNotEqual
let incorrectStatus
let uncaughtError
let invalidJson
let wrongMatchid
let tooManyItems

before('Setting up testing', () => {
    dotaApi = new dotaSteamApi(process.env.STEAM_API_KEY);
})

beforeEach('Defining error messages', () => {
    isNotArray = "Response property is not of Array typing"
    undefinedResult = "Response result property is missing"
    undefinedProp = "Response is missing property"
    minRequiredSize = "Response property is not meeting minimum value required"
    isNotEqual = "Response value and desired value do not match"
    incorrectStatus = "Incorrect status returned"
    uncaughtError = "Intentional error caught incorrectly"
    invalidJson = "invalid json"
    wrongMatchid = "wrong match id received from response"
    tooManyItems = "too many items returned from response"
})

describe('Dota2: getMatchDetails', () => {
    const testMatchId = 5577982773
    it('Return valid response with detailed match results', done => {
        dotaApi.getMatchDetails(testMatchId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.equal(response.result.match_id, testMatchId, wrongMatchid)
            assert.exists(response.result.players, undefinedProp)
            assert.isArray(response.result.players, isNotArray)
            assert.isAtMost(response.result.players.length, 10, tooManyItems)
        })
        .then(() => done(), (e) => done(e))
    })

    it('test with invalid match id', done => {
        const invalidMatchId = 1
        dotaApi.getMatchDetails(invalidMatchId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.error, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getLiveLeagueGames', () => {
    it('returns professional games in progress', done => {
        dotaApi.getLiveLeagueGames()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.games, undefinedProp)
            assert.isArray(response.result.games, isNotArray)
            assert.isAtLeast(response.result.games.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getMatchHistory', () => {
    it('return response with and without hero_id parameter', done => {
        const testHeroId = 1
        dotaApi.getMatchHistory(testHeroId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.num_results, undefinedProp)
            assert.isAtLeast(response.result.num_results, 1, minRequiredSize)

            assert.exists(response.result.matches, undefinedProp)
            assert.isArray(response.result.matches, isNotArray)
            assert.isAtLeast(response.result.matches.length, 1, minRequiredSize)

            assert.exists(response.result.matches[0].players, undefinedProp)

            // check to ensure that hero is in result match
            const heroFilter = response.result.matches[0].players.filter(player => player.hero_id === testHeroId)
            assert.isAtLeast(heroFilter.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })

    it('return respones with correct number of matches requested', done => {
        const numMatchesRequested = 20
        dotaApi.getMatchHistory(null, null, null, null, null, null, null, numMatchesRequested)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.num_results, undefinedProp)
            assert.isAtLeast(response.result.num_results, 1, minRequiredSize)
            assert.exists(response.result.matches, undefinedProp)
            assert.isArray(response.result.matches, isNotArray)
            assert.isAtLeast(response.result.matches.length, 1, minRequiredSize)
            assert.isAtMost(response.result.matches.length, numMatchesRequested, tooManyItems)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getMatchHistoryBySequenceNum', () => {
    it('should return matches starting at requested match sequence num', done => {
        const startMatchSeqNum = 4706807932
        const numMatchesRequested = 15
        dotaApi.getMatchHistoryBySequenceNum(startMatchSeqNum, numMatchesRequested)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.matches, undefinedProp)
            assert.isArray(response.result.matches, isNotArray)
            assert.isAtLeast(response.result.matches.length, 1, minRequiredSize)
            assert.exists(response.result.matches[0].match_seq_num, undefinedProp)
            assert.isAtLeast(response.result.matches[0].match_seq_num, startMatchSeqNum, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getTeamInfoByTeamId', () => {
    it('should return information for team with selected team id', done => {
        // team id for Team Liquid
        const teamIdrequested = 2163
        const teamsRequested = 10
        dotaApi.getTeamInfoByTeamId(teamIdrequested, teamsRequested)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.teams, undefinedProp)
            assert.isArray(response.result.teams, isNotArray)
            assert.isAtLeast(response.result.teams.length, 1, minRequiredSize)
            assert.exists(response.result.teams[0].tag, undefinedProp)
            assert.equal(response.result.teams[0].tag, 'Liquid', isNotEqual)
            assert.isAtLeast(response.result.teams.length, teamsRequested, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getTopLiveEventGame', () => {
    it('return information with top live event games', done => {
        const requestedPartner = 0
        dotaApi.getTopLiveEventGame(requestedPartner)
        .then(response => {
            assert.exists(response.game_list, undefinedResult)
            assert.isArray(response.game_list, isNotArray)
            assert.isAtLeast(response.game_list.length, 1, minRequiredSize)
            assert.exists(response.game_list[0].players, undefinedProp)
            assert.isAtLeast(response.game_list[0].players.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })

    it('missing required partner parameter', done => {
        dotaApi.getTopLiveEventGame()
        .catch(e => {
            assert.isTrue(e.message.startsWith(invalidJson), isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getTopLiveGame', () => {
    it('return information with top live games from dota client', done => {
        const requestedPartner = 0
        dotaApi.getTopLiveGame(requestedPartner)
        .then(response => {
            assert.exists(response.game_list, undefinedResult)
            assert.isArray(response.game_list, isNotArray)
            assert.isAtLeast(response.game_list.length, 1, minRequiredSize)
            assert.exists(response.game_list[0].players, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })

    it('missing required partner parameter', done => {
        dotaApi.getTopLiveGame()
        .catch(e => {
            assert.isTrue(e.message.startsWith(invalidJson))
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getTournamentPlayerStats', () => {
    it('return player info stats from matches at the International', done => {
        // account id for one of OG's players
        const requestedPlayerId = 16769223
        dotaApi.getTournamentPlayerStats(requestedPlayerId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.matches, undefinedProp)
            assert.isArray(response.result.matches, isNotArray)
            assert.isAtLeast(response.result.matches.length, 1, minRequiredSize)
            assert.exists(response.result.account_id, undefinedProp)
            assert.equal(response.result.account_id, requestedPlayerId, isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })

    it('invalid call - missing player account id', done => {
        dotaApi.getTournamentPlayerStats()
        .catch(error => assert.isTrue(error.message.startsWith(invalidJson), isNotEqual))
        .then(() => done(), (e) => done(e))
    })
})

// IEcon Dota methods

describe('Dota2: getGameItems', () => {
    it('return ingame item info', done => {
        dotaApi.getGameItems()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items, undefinedProp)
            assert.isArray(response.result.items, isNotArray)
            assert.isAtLeast(response.result.items.length, 1, minRequiredSize)
            assert.exists(response.result.items[0].name, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getHeroes', () => {
    it('return ingame hero info', done => {
        dotaApi.getHeroes()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.heroes, undefinedProp)
            assert.isArray(response.result.heroes, isNotArray)
            assert.isAtLeast(response.result.heroes.length, 1, minRequiredSize)
            assert.exists(response.result.heroes[0].name, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getTournamentPrizePool', () => {
    it('return tournament prize pool amount', done => {
        // The International id
        const requestedTourneyId = 65006
        dotaApi.getTournamentPrizePool(requestedTourneyId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.prize_pool, undefinedProp)
            assert.equal(response.result.league_id, requestedTourneyId, isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getRarities', () => {
    it('return cosmetic item rarity descriptors', done => {
        dotaApi.getRarities()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.rarities, undefinedProp)
            assert.isArray(response.result.rarities, isNotArray)
            assert.isAtLeast(response.result.rarities.length, 1, minRequiredSize)
            assert.exists(response.result.rarities[0].name, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getHeroIcon', () => {
    const requestedHeroName = 'npc_dota_hero_antimage'
    it('attempt to get url with invalid size', done => {
        const requestedInvalidSize = 4
        const result = dotaApi.getHeroIcon(requestedHeroName, requestedInvalidSize)
        assert.equal(result,"Error: Please enter valid size", isNotEqual)
        done()
    })

    it('grab valid img url with valid size', done => {
        const requestedSize = 0
        const result = dotaApi.getHeroIcon(requestedHeroName, requestedSize)
        assert.isTrue(result.endsWith('sb.png'), isNotEqual)
        done()
    })
})

describe('Dota2: getItemIcon', () => {
    it('return url with item icon', done => {
        const requestedItem = "item_blink"
        const itemUrl = dotaApi.getItemIcon(requestedItem)
        assert.isTrue(itemUrl.includes('blink'), isNotEqual)
        done()
    })
})

describe('Dota2: getAbilityIcon', () => {
    it('get ability icon with valid hero and ability name', done => {
        const heroRequested = "npc_dota_hero_antimage"
        const abilityRequested = "blink"
        const abilityUrl = dotaApi.getAbilityIcon(heroRequested, abilityRequested)
        assert.isTrue(abilityUrl.includes('antimage'), isNotEqual)
        assert.isTrue(abilityUrl.includes('blink'), isNotEqual)
        done()
    })
})

describe('Dota2: getHeroesWithIcons', () => {
    it('get hero data with img urls for valid size', done => {
        dotaApi.getHeroesWithIcons(null, 0)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.heroes, undefinedProp)
            assert.isArray(response.result.heroes, isNotArray)
            assert.isAtLeast(response.result.heroes.length, 1, minRequiredSize)
            assert.exists(response.result.heroes[0].heroIcon, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getItemsWithIcons', () => {
    it('get item data with item urls', done => {
        dotaApi.getItemsWithIcons()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items, undefinedProp)
            assert.isArray(response.result.items, isNotArray)
            assert.isAtLeast(response.result.items.length, 1, minRequiredSize)
            assert.exists(response.result.items[0].icon, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getClientVersion', () => {
    it('current and active dota client versions', done => {
        dotaApi.getClientVersion()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)
            assert.exists(response.result.min_allowed_version, undefinedProp)
            assert.exists(response.result.active_version, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getServerVersion', () => {
    it('current active dota server versions', done => {
        dotaApi.getServerVersion()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)
            assert.exists(response.result.active_version, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getStoreMetaData', () => {
    it('grab steam store/market filtering and sorting metadata', done => {
        dotaApi.getStoreMetaData()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.tabs, undefinedProp)
            assert.isArray(response.result.tabs, isNotArray)
            assert.isAtLeast(response.result.tabs.length, 1, minRequiredSize)
            assert.exists(response.result.filters, undefinedProp)
            assert.isArray(response.result.filters, isNotArray)
            assert.isAtLeast(response.result.filters.length, 1, minRequiredSize)
            assert.exists(response.result.sorting, undefinedProp)
            assert.exists(response.result.player_class_data, undefinedProp)
            assert.isArray(response.result.player_class_data, isNotArray)
            assert.isAtLeast(response.result.player_class_data.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getPlayerItems', () => {
    it('get cosmetic items with valid steam user id', done => {
        dotaApi.getPlayerItems(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items, undefinedProp)
            assert.isArray(response.result.items, isNotArray)
            assert.isAtLeast(response.result.items.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })

    it('test with invalid steamid', done => {
        const invalidSteamId = 0
        dotaApi.getPlayerItems(invalidSteamId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.status, undefinedProp)
            assert.notEqual(response.result.status, 1, incorrectStatus)
        })
        .then(() => done(), (e) => done(e))
    })

    it('test with no steamid - missing required parameter', done => {
        dotaApi.getPlayerItems()
        .catch(error => assert.isTrue(error.message.startsWith(invalidJson), isNotEqual))
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getEquippedPlayerItems', () => {
    const heroClassID = 1
    it('get hero cosmetics by valid class id and steam user id', done => {
        // id for antimage
        dotaApi.getEquippedPlayerItems(process.env.STEAM_ACC_ID, heroClassID)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items, undefinedProp)
            assert.isArray(response.result.items, isNotArray)
        })
        .then(() => done(), (e) => done(e))
    })

    it('test with invalid steamid', done => {
        const invalidSteamId = 0
        dotaApi.getEquippedPlayerItems(invalidSteamId, heroClassID)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.status, undefinedProp)
            assert.notEqual(response.result.status, 1, incorrectStatus)
        })
        .then(() => done(), (e) => done(e))
    })

    it('test with no steamid - missing required parameter', done => {
        dotaApi.getEquippedPlayerItems(null, heroClassID)
        .catch(error => assert.isTrue(error.message.startsWith(invalidJson), isNotEqual))
        .then(() => done(), (e) => done(e))
    })

    it('test with no classid - missing required parameter', done => {
        dotaApi.getPlayerItems(process.env.STEAM_ACC_ID)
        .catch(error => assert.isTrue(error.message.startsWith(invalidJson), isNotEqual))
        .then(() => done(), (e) => done(e))
    })
})

// describe('getRealtimeStats', () => {

// })

describe('Dota2: getNewsForDotaApp', () => {
    it('get news items with valid count and appid', done => {
        const testCount = 10
        const dotaAppId= 570
        dotaApi.getNewsForDotaApp(null, null, testCount, null, dotaAppId)
        .then(response => {
            assert.exists(response.appnews, undefinedResult)
            assert.exists(response.appnews.appid, undefinedProp)
            assert.equal(response.appnews.appid, dotaAppId, isNotEqual)
            assert.exists(response.appnews.newsitems, undefinedProp)
            assert.isArray(response.appnews.newsitems, isNotArray)
            assert.equal(response.appnews.newsitems.length, testCount, isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getGlobalAchievementPercentagesForDota', () => {
    it('global achievement percentages', done => {
        dotaApi.getGlobalAchievementPercentagesForDota()
        .then(response => {
            assert.exists(response.achievementpercentages, undefinedProp)
            assert.exists(response.achievementpercentages.achievements, undefinedProp)
            assert.isArray(response.achievementpercentages.achievements, isNotArray)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getDotaPlayerAchievements', () => {
    it('individual player achievements', done => {
        dotaApi.getDotaPlayerAchievements(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.playerstats, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getSchemaForDota', () => {
    it('using dota app id', done => {
        dotaApi.getSchemaForDota()
        .then(response => {
            assert.exists(response.game, undefinedProp)
            assert.exists(response.game.availableGameStats, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getNumberOfCurrentPlayers', () => {
    it('using dota app id for current number of ingame players', done => {
        dotaApi.getNumberOfCurrentPlayers()
        .then(response => {
            assert.exists(response.response, undefinedResult)
            assert.exists(response.response.player_count, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getAssetPrices', () => {
    it('with valid default parameters', done => {
        dotaApi.getAssetPrices()
        .then(response => {
            assert.exists(response.result, undefinedResult)
        assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)
            assert.exists(response.result.assets, undefinedProp)
            assert.isArray(response.result.assets, isNotArray)
            assert.isAtLeast(response.result.assets.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('Dota2: getAssetClassInfo', () => {
    it('testing with valid class count and class id list', done => {
        const requestedClasses = 2
        const classesList = [57939591, 57939593]
        dotaApi.getAssetClassInfo(null, requestedClasses, classesList)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)

            const returnedClasses = Object.keys(response.result)
            assert.equal(returnedClasses.length, requestedClasses + 1, isNotEqual)
            assert.equal(returnedClasses[0], classesList[0], isNotEqual)
            assert.equal(returnedClasses[1], classesList[1], isNotEqual)
        }).then(() => done(), (e) => done(e))
    })

    it('testing with invalid class count', () => {
        try {
            dotaApi.getAssetClassInfo(null, 0, [0])
        }
        catch(error) {
            assert.equal(error.message, "Error: a minimum of 1 class ids is required", isNotEqual)
        }
    })

    it('testing with invalid classId list', () => {
        try {
            dotaApi.getAssetClassInfo(null, 1, 14521032)
        }
        catch(error) {
            assert.equal(error.message, "Error: class_id_list must be an array", isNotEqual)
        }
    })
})