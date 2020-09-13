let csgoApi = require('../csgoApi')
const assert = require('chai').assert

let csgoSteamApi

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
    csgoSteamApi = new csgoApi(process.env.STEAM_API_KEY);
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

describe('CSGO: getGameMapsPlaytime', () => {
    it('call with valid parameters', done => {
        const testInterval = 'day'
        const testGamemode = 'competitive'
        const testGroup = 'operation'
        csgoSteamApi.getGameMapsPlaytime(testInterval, testGamemode, testGroup)
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.Rows, undefinedProp)
            assert.isArray(response.result.Rows, isNotArray)
            assert.isAtLeast(response.result.Rows.length, 1, minRequiredSize)
        })
        .then(() => done(), (e) => done(e))
    })

    it('call with missing required parameters', done => {
        csgoSteamApi.getGameMapsPlaytime()
        .catch(e => assert.isTrue(e.message.startsWith(invalidJson)), uncaughtError)
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getGameServersStatus', () => {
    it('valid call', done => {
        csgoSteamApi.getGameServersStatus()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.services, undefinedProp)
            assert.exists(response.result.datacenters, undefinedProp)
            assert.exists(response.result.matchmaking, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getSchema', () => {
    it('call with default parameters', done => {
        csgoSteamApi.getSchema()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items_game_url, undefinedProp)
            assert.exists(response.result.qualities, undefinedProp)
            assert.exists(response.result.items, undefinedProp)
            assert.isArray(response.result.items, isNotArray)
            assert.exists(response.result.attributes, undefinedProp)
            assert.isArray(response.result.attributes, isNotArray)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getSchemaURL', () => {
    it('call with default parameters', done => {
        csgoSteamApi.getSchemaURL()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.items_game_url, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getStoreMetaData', () => {
    it('grab steam store/market filtering and sorting metadata',done => {
        csgoSteamApi.getStoreMetaData()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.tabs, undefinedProp)
            assert.isArray(response.result.tabs, isNotArray)
            assert.isAtLeast(response.result.tabs.length, 1, minRequiredSize)
            assert.exists(response.result.filters, undefinedProp)
            assert.isArray(response.result.filters, isNotArray)
            assert.isAtLeast(response.result.filters.length, 1, minRequiredSize)
            assert.exists(response.result.sorting, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getServerVersion', () => {
    it('call with no parameters', done => {
        csgoSteamApi.getServerVersion()
        .then(response => {
            assert.exists(response.result, undefinedResult)
            assert.exists(response.result.success, undefinedProp)
            assert.isTrue(response.result.success, isNotEqual)
            assert.exists(response.result.active_version)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getNewsForCSGOApp', () => {
    it('get news items with valid count and appid', done => {
        const testCount = 10
        const csgoAppid= 730
        csgoSteamApi.getNewsForCSGOApp(null, null, testCount, null, csgoAppid)
        .then(response => {
            assert.exists(response.appnews, undefinedProp)
            assert.exists(response.appnews.appid, undefinedProp)
            assert.equal(response.appnews.appid, csgoAppid, isNotEqual)
            assert.exists(response.appnews.newsitems, undefinedProp)
            assert.isArray(response.appnews.newsitems, isNotArray)
            assert.equal(response.appnews.newsitems.length, testCount, isNotEqual)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getGlobalAchievementPercentagesForCSGO', () => {
    it('global achievement percentages', done => {
        csgoSteamApi.getGlobalAchievementPercentagesForCSGO()
        .then(response => {
            assert.exists(response.achievementpercentages, missingAchievements)
            assert.exists(response.achievementpercentages.achievements, undefinedProp)
            assert.isArray(response.achievementpercentages.achievements, isNotArray)
            assert.isAtLeast(response.achievementpercentages.achievements.length, 1, minRequiredSize)
        }).then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getCSGOPlayerAchievements', () => {
    it('test with valid steam id', done => {
        csgoSteamApi.getCSGOPlayerAchievements(process.env.STEAM_ACC_ID)
        .then(response => {
            assert.exists(response.playerstats, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getSchemaForCSGO', () => {
    it('valid call with default parameters', done => {
        csgoSteamApi.getSchemaForCSGO()
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

describe('CSGO: getNumberOfCurrentPlayers', () => {
    it('valid call with default parameters', done => {
        csgoSteamApi.getNumberOfCurrentPlayers()
        .then(response => {
            assert.exists(response.response, undefinedProp)
            assert.exists(response.response.player_count, undefinedProp)
        })
        .then(() => done(), (e) => done(e))
    })
})

describe('CSGO: getAssetPrices', () => {
    it('test with default parameters', done => {
        csgoSteamApi.getAssetPrices()
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

describe('CSGO: getAssetClassInfo', () => {
    it('testing with valid class count and class id list', done => {
        const requestedClasses = 2
        const classesList = [3761545710, 3946324333]
        csgoSteamApi.getAssetClassInfo(null, requestedClasses, classesList)
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
            csgoSteamApi.getAssetClassInfo(null, 0, [0])
        }
        catch(error) {
            assert.equal(error.message, "Error: a minimum of 1 class ids is required", isNotEqual)
        }
    })

    it('testing with invalid classId list', () => {
        try {
            csgoSteamApi.getAssetClassInfo(null, 1, 14521032)
        }
        catch(error) {
            assert.equal(error.message, "Error: class_id_list must be an array", isNotEqual)
        }
    })
})