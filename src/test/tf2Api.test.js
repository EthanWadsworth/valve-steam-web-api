let tf2SteamApi = require('../tf2Api')
const assert = require('chai').assert

let tf2Api

let isNotArray
let undefinedResult
let undefinedProp
let minRequiredSize
let missingAchievements
let isNotEqual
let incorrectStatus
let uncaughtError
let invalidJson

before('Setting up testing', () => {
    tf2Api = new tf2SteamApi(process.env.STEAM_API_KEY);
})

beforeEach('Defining error messages', () => {
    isNotArray = "Response property is not of Array typing"
    undefinedResult = "Response result property is missing"
    undefinedProp = "Response is missing property"
    minRequiredSize = "Response property is not meeting minimum value required"
    missingAchievements = "Response achievement container is missing"
    isNotEqual = "Response value and desired value do not match"
    incorrectStatus = "Incorrect status returned"
    uncaughtError = "Intentional error caught incorrectly"
    invalidJson = "invalid json"
})

describe('TF2: getGlobalAchievementPercentagesForTF2', () => {
    it('global achievement percentages', done => {
        tf2Api.getGlobalAchievementPercentagesForTF2()
        .then(response => {
            assert.exists(response.achievementpercentages, missingAchievements)
            assert.exists(response.achievementpercentages.achievements, undefinedProp)
            assert.isArray(response.achievementpercentages.achievements, isNotArray)
            assert.isAtLeast(response.achievementpercentages.achievements.length, 1, minRequiredSize)
        }).then(() => done(), (e) => done(e))
    })
})

describe('TF2: getTF2PlayerAchievements', () => {
    it('test with valid steam id', done => {
        tf2Api.getTF2PlayerAchievements(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.playerstats, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getSchemaForTF2', () => {
    it('valid call with default parameters', done => {
        tf2Api.getSchemaForTF2()
        .then(response => {
            assert.exists(response.game, undefinedProp)
            assert.exists(response.game.availableGameStats, undefinedProp)
            assert.exists(response.game.availableGameStats.stats, undefinedProp)
            assert.isArray(response.game.availableGameStats.stats, isNotArray)
            assert.isAtLeast(response.game.availableGameStats.stats.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getNumberOfCurrentPlayers', () => {
    it('valid call with default parameters', done => {
        tf2Api.getNumberOfCurrentPlayers()
        .then(response => {
            assert.exists(response.response, undefinedProp)
            assert.exists(response.response.player_count, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getNewsForTF2App', () => {
    it('get news items with valid count and appid', done => {
        const testCount = 10
        const tf2AppId= 440
        tf2Api.getNewsForTF2App(null, null, testCount, null, tf2AppId)
        .then(response => {
            assert.exists(response.appnews, undefinedProp)
            assert.exists(response.appnews.appid, undefinedProp)
            assert.equal(response.appnews.appid, tf2AppId, isNotEqual)
            assert.exists(response.appnews.newsitems, undefinedProp)
            assert.isArray(response.appnews.newsitems, isNotArray)
            assert.equal(response.appnews.newsitems.length, testCount, isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getGoldenWrenches', () => {
    it('call with default parameters', done => {
        tf2Api.getGoldenWrenches()
        .then(response => {
            assert.exists(response.results, undefinedResult)
            assert.exists(response.results.wrenches, undefinedProp)
            assert.isArray(response.results.wrenches, isNotArray)
            assert.isAtLeast(response.results.wrenches.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getPlayerItems', () => {
    it('call with valid steam id', done => {
        tf2Api.getPlayerItems(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items, undefinedProp)
            assert.isArray(response.result.items, isNotArray)
            assert.isAtLeast(response.result.items.length, 1, minRequiredSize)
        }).then(() => done(), (e) => done(e))
    })

    it('call with invalid steam id', done => {
        const invalidSteamId = 0
        tf2Api.getPlayerItems(invalidSteamId)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.status, undefinedProp)
            assert.notEqual(response.result.status, 1, incorrectStatus)
        }).then(() => done(), (e) => done(e))
    })

    it('call without required parameter - steamid', done => {
        tf2Api.getPlayerItems()
        .catch(e => assert.isTrue(e.message.startsWith(invalidJson)), uncaughtError)
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getItemSchemaURL', () => {
    it('call with default parameters', done => {
        tf2Api.getItemSchemaURL()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items_game_url, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getItemSchemaOverview', () => {
    it('call with default parameters', done => {
        tf2Api.getItemSchemaOverview()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.status, undefinedProp)
            assert.equal(response.result.status, 1, incorrectStatus)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getSteamStoreMetaData', () => {
    it('grab steam store/market filtering and sorting metadata',done => {
        tf2Api.getSteamStoreMetaData()
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

describe('TF2: getStoreStatus', () => {
    it('test with default parameters', done => {
        tf2Api.getStoreStatus()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.status, undefinedProp)
            assert.equal(response.result.status, 1, isNotEqual)
            assert.exists(response.result.store_status, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('TF2: getAssetPrices', () => {
    it('test with default parameters', done => {
        tf2Api.getAssetPrices()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)
            assert.exists(response.result.assets, undefinedProp)
            assert.isArray(response.result.assets, isNotArray)
            assert.isAtLeast(response.result.assets.length, 1, minRequiredSize)
        }).then(() => done(), (e) => done(e))
    })
})

describe('TF2: getAssetClassInfo', () => {
    it('testing with valid class count and class id list', done => {
        const requestedClasses = 2
        const classesList = [195151, 211447708]
        tf2Api.getAssetClassInfo(null, requestedClasses, classesList)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)

            const returnedClasses = Object.keys(response.result)
            assert.equal(returnedClasses.length, requestedClasses + 1, isNotEqual)
            assert.equal(returnedClasses[0], classesList[0], isNotEqual)
            assert.equal(returnedClasses[1], classesList[1], isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })

    it('testing with invalid class count', () => {
        try {
            tf2Api.getAssetClassInfo(null, 0, [0])
        }
        catch(error) {
            assert.equal(error.message, "Error: a minimum of 1 class ids is required", isNotEqual)
        }
    })

    it('testing with invalid classId list', () => {
        try {
            tf2Api.getAssetClassInfo(null, 1, 14521032)
        }
        catch(error) {
            assert.equal(error.message, "Error: class_id_list must be an array", isNotEqual)
        }
    })
})