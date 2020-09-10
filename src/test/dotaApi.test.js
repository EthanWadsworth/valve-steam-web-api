let dotaSteamApi = require('../dota-api')
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
        .then(() => done(), () => done())
    })

    it('test with invalid match id', done => {
        const invalidMatchId = 1
        dotaApi.getMatchDetails(invalidMatchId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.error)
        })
        .then(() => done(), () => done())
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
        .then(() => done(), () => done())
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
        .then(() => done(), () => done())
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
        .then(() => done(), () => done())
    })
})

describe('getMatchHistoryBySequenceNum', () => {
    it('should return matches starting at requested match sequence num', done => {
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
        .then(() => done(), () => done())
    })
})

describe('getTeamInfoByTeamId', () => {
    it('should return information for team with selected team id', done => {
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
        .then(() => done(), () => done())
    })
})

describe('getTopLiveEventGame', () => {
    it('return information with top live event games', done => {
        const requestedPartner = 0
        dotaApi.getTopLiveEventGame(requestedPartner)
        .then(response => {
            assert.exists(response.game_list)
            assert.isArray(response.game_list)
            assert.isAtLeast(response.game_list.length, 1)
            assert.exists(response.game_list[0].players)
            assert.isAtLeast(response.game_list[0].players.length, 1)
        })
        .then(() => done(), () => done())
    })

    it('missing required partner parameter', done => {
        dotaApi.getTopLiveEventGame()
        .catch(e => {
            assert.isTrue(e.message.startsWith('invalid json'))
        })
        .then(() => done(), () => done())
    })
})

describe('getTopLiveGame', () => {
    it('return information with top live games from dota client', done => {
        const requestedPartner = 0
        dotaApi.getTopLiveGame(requestedPartner)
        .then(response => {
            assert.exists(response.game_list)
            assert.isArray(response.game_list)
            assert.isAtLeast(response.game_list.length, 1)
            assert.exists(response.game_list[0].players)
        })
        .then(() => done(), () => done())
    })

    it('missing required partner parameter', done => {
        dotaApi.getTopLiveGame()
        .catch(e => {
            assert.isTrue(e.message.startsWith('invalid json'))
        })
        .then(() => done(), () => done())
    })
})

describe('getTournamentPlayerStats', () => {
    it('return player info stats from matches at the International', done => {
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
        .then(() => done(), () => done())
    })

    it('invalid call - missing player account id', done => {
        dotaApi.getTournamentPlayerStats()
        .catch(error => assert.isTrue(error.message.startsWith('invalid json')))
        .then(() => done(), () => done())
    })
})

// IEcon Dota methods

describe('getGameItems', () => {
    it('return ingame item info', done => {
        dotaApi.getGameItems()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items)
            assert.isArray(response.result.items)
            assert.isAtLeast(response.result.items.length, 1)
            assert.exists(response.result.items[0].name)
        })
        .then(() => done(), () => done())
    })
})

describe('getHeroes', () => {
    it('return ingame hero info', done => {
        dotaApi.getHeroes()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.heroes)
            assert.isArray(response.result.heroes)
            assert.isAtLeast(response.result.heroes.length, 1)
            assert.exists(response.result.heroes[0].name)
        })
        .then(() => done(), () => done())
    })
})

describe('getTournamentPrizePool', () => {
    it('return tournament prize pool amount', done => {
        // The International id
        const requestedTourneyId = 65006
        dotaApi.getTournamentPrizePool(requestedTourneyId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.prize_pool)
            assert.equal(response.result.league_id, requestedTourneyId)
        })
        .then(() => done(), () => done())
    })
})

describe('getRarities', () => {
    it('return cosmetic item rarity descriptors', done => {
        dotaApi.getRarities()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.rarities)
            assert.isArray(response.result.rarities)
            assert.isAtLeast(response.result.rarities.length, 1)
            assert.exists(response.result.rarities[0].name)
        })
        .then(() => done(), () => done())
    })
})

describe('getHeroIcon', () => {
    const requestedHeroName = 'npc_dota_hero_antimage'
    it('attempt to get url with invalid size', done => {
        const requestedInvalidSize = 4
        const result = dotaApi.getHeroIcon(requestedHeroName, requestedInvalidSize)
        assert.equal(result,"Error: Please enter valid size")
        done()
    })

    it('grab valid img url with valid size', done => {
        const requestedSize = 0
        const result = dotaApi.getHeroIcon(requestedHeroName, requestedSize)
        assert.isTrue(result.endsWith('sb.png'))
        done()
    })
})

describe('getItemIcon', () => {
    it('return url with item icon', done => {
        const requestedItem = "item_blink"
        const itemUrl = dotaApi.getItemIcon(requestedItem)
        assert.isTrue(itemUrl.includes('blink'))
        done()
    })
})

describe('getAbilityIcon', () => {
    it('get ability icon with valid hero and ability name', done => {
        const heroRequested = "npc_dota_hero_antimage"
        const abilityRequested = "blink"
        const abilityUrl = dotaApi.getAbilityIcon(heroRequested, abilityRequested)
        assert.isTrue(abilityUrl.includes('antimage'))
        assert.isTrue(abilityUrl.includes('blink'))
        done()
    })
})

describe('getHeroesWithIcons', () => {
    it('get hero data with img urls for valid size', done => {
        dotaApi.getHeroesWithIcons(null, 0)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.heroes)
            assert.isArray(response.result.heroes)
            assert.isAtLeast(response.result.heroes.length, 1)
            assert.exists(response.result.heroes[0].heroIcon)
        })
        .then(() => done(), () => done())
    })
})

describe('getItemsWithIcons', () => {
    it('get item data with item urls', done => {
        dotaApi.getItemsWithIcons()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items)
            assert.isArray(response.result.items)
            assert.isAtLeast(response.result.items.length, 1)
            assert.exists(response.result.items[0].icon)
        })
        .then(() => done(), () => done())
    })
})

describe('getClientVersion', () => {
    it('current and active dota client versions', done => {
        dotaApi.getClientVersion()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.success)
            assert.isTrue(response.result.success)
            assert.exists(response.result.min_allowed_version)
            assert.exists(response.result.active_version)
        })
        .then(() => done(), () => done())
    })
})

describe('getServerVersion', () => {
    it('current active dota server versions', done => {
        dotaApi.getServerVersion()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.success)
            assert.isTrue(response.result.success)
            assert.exists(response.result.active_version)
        })
        .then(() => done(), () => done())
    })
})

describe('getStoreMetaData', () => {
    it('grab steam store/market filtering and sorting metadata', done => {
        dotaApi.getStoreMetaData()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.tabs)
            assert.isArray(response.result.tabs)
            assert.isAtLeast(response.result.tabs.length, 1)
            assert.exists(response.result.filters)
            assert.isArray(response.result.filters)
            assert.isAtLeast(response.result.filters.length, 1)
            assert.exists(response.result.sorting)
            assert.exists(response.result.player_class_data)
            assert.isArray(response.result.player_class_data)
            assert.isAtLeast(response.result.player_class_data.length, 1)
        })
        .then(() => done(), () => done())
    })
})

describe('getPlayerItems', () => {
    it('get cosmetic items with valid steam user id', done => {
        dotaApi.getPlayerItems(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items)
            assert.isArray(response.result.items)
            assert.isAtLeast(response.result.items.length, 1)
        })
        .then(() => done(), () => done())
    })

    it('test with invalid steamid', done => {
        const invalidSteamId = 0
        dotaApi.getPlayerItems(invalidSteamId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.status)
            assert.notEqual(response.result.status, 1)
        })
        .then(() => done(), () => done())
    })

    it('test with no steamid - missing required parameter', done => {
        dotaApi.getPlayerItems()
        .catch(error => assert.isTrue(error.message.startsWith('invalid json')))
        .then(() => done(), () => done())
    })
})

describe('getEquippedPlayerItems', () => {
    const heroClassID = 1
    it('get hero cosmetics by valid class id and steam user id', done => {
        // id for antimage
        dotaApi.getEquippedPlayerItems(process.env.STEAM_ACC_ID, heroClassID)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items)
            assert.isArray(response.result.items)
        })
        .then(() => done(), () => done())
    })

    it('test with invalid steamid', done => {
        const invalidSteamId = 0
        dotaApi.getEquippedPlayerItems(invalidSteamId, heroClassID)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.status)
            assert.notEqual(response.result.status, 1)
        })
        .then(() => done(), () => done())
    })

    it('test with no steamid - missing required parameter', done => {
        dotaApi.getEquippedPlayerItems(null, heroClassID)
        .catch(error => assert.isTrue(error.message.startsWith('invalid json')))
        .then(() => done(), () => done())
    })

    it('test with no classid - missing required parameter', done => {
        dotaApi.getPlayerItems(process.env.STEAM_ACC_ID)
        .catch(error => assert.isTrue(error.message.startsWith('invalid json')))
        .then(() => done(), () => done())
    })
})

// describe('getRealtimeStats', () => {

// })

describe('getNewsForDotaApp', () => {
    it('get news items with valid count and appid', done => {
        const testCount = 10
        const dotaAppId= 570
        dotaApi.getNewsForDotaApp(null, null, testCount, null, dotaAppId)
        .then(response => {
            assert.exists(response.appnews)
            assert.exists(response.appnews.appid)
            assert.equal(response.appnews.appid, dotaAppId)
            assert.exists(response.appnews.newsitems)
            assert.isArray(response.appnews.newsitems)
            assert.equal(response.appnews.newsitems.length, testCount)
        })
        .then(() => done(), () => done())
    })
})

describe('getGlobalAchievementPercentagesForDota', () => {
    it('global achievement percentages', done => {
        dotaApi.getGlobalAchievementPercentagesForDota()
        .then(response => {
            assert.exists(response.achievementpercentages)
            assert.exists(response.achievementpercentages.achievements)
            assert.isArray(response.achievementpercentages.achievements)
        })
        .then(() => done(), () => done())
    })
})

describe('getDotaPlayerAchievements', () => {
    it('individual player achievements', done => {
        dotaApi.getDotaPlayerAchievements(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.playerstats)
        })
        .then(() => done(), () => done())
    })
})

describe('getSchemaForDota', () => {
    it('using dota app id', done => {
        dotaApi.getSchemaForDota()
        .then(response => {
            assert.exists(response.game)
            assert.exists(response.game.availableGameStats)
        })
        .then(() => done(), () => done())
    })
})

describe('getNumberOfCurrentPlayers', () => {
    it('using dota app id for current number of ingame players', done => {
        dotaApi.getNumberOfCurrentPlayers()
        .then(response => {
            assert.exists(response.response)
            assert.exists(response.response.player_count)
        })
        .then(() => done(), () => done())
    })
})

describe('getAssetPrices', () => {
    it('with valid default parameters', done => {
        dotaApi.getAssetPrices()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.success)
            assert.isTrue(response.result.success)
            assert.exists(response.result.assets)
            assert.isArray(response.result.assets)
            assert.isAtLeast(response.result.assets.length, 1)
        })
        .then(() => done(), () => done())
    })
})

describe('getAssetClassInfo', () => {
    it('testing with valid class count and class id list', done => {
        const requestedClasses = 2
        const classesList = [57939591, 57939593]
        dotaApi.getAssetClassInfo(null, requestedClasses, classesList)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.success)
            assert.isTrue(response.result.success)

            const returnedClasses = Object.keys(response.result)
            assert.equal(returnedClasses.length, requestedClasses + 1)
            assert.equal(returnedClasses[0], classesList[0])
            assert.equal(returnedClasses[1], classesList[1])
        }).then(() => done(), () => done())
    })

    it('testing with invalid class count', () => {
        try {
            dotaApi.getAssetClassInfo(null, 0, [0])
        }
        catch(error) {
            assert.equal(error.message, "Error: a minimum of 1 class ids is required")
        }
    })

    it('testing with invalid classId list', () => {
        try {
            dotaApi.getAssetClassInfo(null, 1, 14521032)
        }
        catch(error) {
            assert.equal(error.message, "Error: class_id_list must be an array")
        }
    })
})