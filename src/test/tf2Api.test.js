let tf2SteamApi = require('../tf2Api')
const {assert, expect} = require('chai')

let tf2Api

before('Setting up testing', () => {
    tf2Api = new tf2SteamApi(process.env.STEAM_API_KEY);
})

describe('getGlobalAchievementPercentagesForTF2', () => {
    it('global achievement percentages', done => {
        tf2Api.getGlobalAchievementPercentagesForTF2()
        .then(response => {
            assert.exists(response.achievementpercentages)
            assert.exists(response.achievementpercentages.achievements)
            assert.isArray(response.achievementpercentages.achievements)
            assert.isAtLeast(response.achievementpercentages.achievements.length, 1)
        }).then(() => done(), () => done())
    })
})

describe('getTF2PlayerAchievements', () => {
    it('test with valid steam id', done => {
        tf2Api.getTF2PlayerAchievements(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.playerstats)
        })
        .then(() => done(), () => done())
    })
})

describe('getSchemaForTF2', () => {
    it('valid call with default parameters', done => {
        tf2Api.getSchemaForTF2()
        .then(response => {
            assert.exists(response.game)
            assert.exists(response.game.availableGameStats)
            assert.exists(response.game.availableGameStats.stats)
            assert.isArray(response.game.availableGameStats.stats)
            assert.isAtLeast(response.game.availableGameStats.stats.length, 1)
        })
        .then(() => done(), () => done())
    })
})

describe('getNumberOfCurrentPlayers', () => {
    it('valid call with default parameters', done => {
        tf2Api.getNumberOfCurrentPlayers()
        .then(response => {
            assert.exists(response.response)
            assert.exists(response.response.player_count)
        })
        .then(() => done(), () => done())
    })
})

describe('getNewsForTF2App', () => {
    it('get news items with valid count and appid', done => {
        const testCount = 10
        const tf2AppId= 440
        tf2Api.getNewsForTF2App(null, null, testCount, null, tf2AppId)
        .then(response => {
            assert.exists(response.appnews)
            assert.exists(response.appnews.appid)
            assert.equal(response.appnews.appid, tf2AppId)
            assert.exists(response.appnews.newsitems)
            assert.isArray(response.appnews.newsitems)
            assert.equal(response.appnews.newsitems.length, testCount)
        })
        .then(() => done(), () => done())
    })
})

describe('getGoldenWrenches', () => {
    it('call with default parameters', done => {
        tf2Api.getGoldenWrenches()
        .then(response => {
            assert.exists(response.results)
            assert.exists(response.results.wrenches)
            assert.isArray(response.results.wrenches)
            assert.isAtLeast(response.results.wrenches.length, 1)
        })
        .then(() => done(), () => done())
    })
})

describe('getPlayerItems', () => {
    it('call with valid steam id', done => {
        tf2Api.getPlayerItems(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items)
            assert.isArray(response.result.items)
            assert.isAtLeast(response.result.items.length, 1)
        }).then(() => done(), () => done())
    })

    it('call with invalid steam id', done => {
        const invalidSteamId = 0
        tf2Api.getPlayerItems(invalidSteamId)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.status)
            assert.notEqual(response.result.status, 1)
        }).then(() => done(), () => done())
        // .catch(e => e)
    })

    it('call without required parameter - steamid', done => {
        tf2Api.getPlayerItems()
        .catch(e => assert.isTrue(e.message.startsWith('invalid json')))
        .then(() => done(), () => done())
    })
})

describe('getItemSchemaURL', () => {
    it('call with default parameters', done => {
        tf2Api.getItemSchemaURL()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.items_game_url)
        })
        .then(() => done(), () => done())
    })
})

describe('getItemSchemaOverview', () => {
    it('call with default parameters', done => {
        tf2Api.getItemSchemaOverview()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.status)
            assert.equal(response.result.status, 1)
        })
        .then(() => done(), () => done())
    })
})

describe('getSteamStoreMetaData', () => {
    it('grab steam store/market filtering and sorting metadata',done => {
        tf2Api.getSteamStoreMetaData()
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

describe('getStoreStatus', () => {
    it('test with default parameters', done => {
        tf2Api.getStoreStatus()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.status)
            assert.equal(response.result.status, 1)
            assert.exists(response.result.store_status)
        })
        .then(() => done(), () => done())
    })
})

describe('getAssetPrices', () => {
    it('test with default parameters', done => {
        tf2Api.getAssetPrices()
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.success)
            assert.isTrue(response.result.success)
            assert.exists(response.result.assets)
            assert.isArray(response.result.assets)
            assert.isAtLeast(response.result.assets.length, 1)
        }).then(() => done(), () => done())
    })
})

describe('getAssetClassInfo', () => {
    it('testing with valid class count and class id list', done => {
        const requestedClasses = 2
        const classesList = [195151, 211447708]
        tf2Api.getAssetClassInfo(null, requestedClasses, classesList)
        .then(response => {
            assert.exists(response.result)
            assert.exists(response.result.success)
            assert.isTrue(response.result.success)

            const returnedClasses = Object.keys(response.result)
            assert.equal(returnedClasses.length, requestedClasses + 1)
            assert.equal(returnedClasses[0], classesList[0])
            assert.equal(returnedClasses[1], classesList[1])
        })
        .then(() => done(), () => done())
    })

    it('testing with invalid class count', () => {
        try {
            tf2Api.getAssetClassInfo(null, 0, [0])
        }
        catch(error) {
            assert.equal(error.message, "Error: a minimum of 1 class ids is required")
        }
    })

    it('testing with invalid classId list', () => {
        try {
            tf2Api.getAssetClassInfo(null, 1, 14521032)
        }
        catch(error) {
            assert.equal(error.message, "Error: class_id_list must be an array")
        }
    })
})