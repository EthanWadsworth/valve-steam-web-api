# dota2-steam-api-backend
JS Wrapper for the Steam Web Api for all Valve online multiplayer games (Dota2 TF2 CS:GO - support coming)

Official Documentation provided by Steam can be found here - https://wiki.teamfortress.com/wiki/WebAPI

The documentation for other endpoints not officially documented in the above link can be found here - https://steamapi.xpaw.me
## Installation and Setup
First, get a developer api key for access to the steam web api here - https://steamcommunity.com/dev/

To install the package, type the following into your terminal/shell:
```
npm install valve_steam_api
```
The module contains two usable classes, one for Dota 2 and one for TF2. The classes can be accessed in the following ways:

For Dota 2:
```
const valveSteamApi = require('valve_steam_api')
const dotaSteamApi = new valveSteamApi.dotaSteamApi('<yourSteamApiKey>')
```
or
```
let {dotaSteamApi} = require('valve_steam_api')
dotaSteamApi = new dotaSteamApi('<yourSteamApiKey>')
```
For TF2:
```
const valveSteamApi = require('valve_steam_api')
const tf2SteamApi = new valveSteamApi.tf2SteamApi('<yourSteamApiKey>')
```
or
```
let {tf2SteamApi} = require('valve_steam_api')
tf2SteamApi = new tf2SteamApi('<yourSteamApiKey>')
```
## Dota2 Response Methods
All methods except those that return img urls will return a Promise that can be handled

### getMatchDetails
Gets in-depth details about the requested match

Parameters:
* match_id - match id of desire Dota 2 match
```
const sampleMatchId = 5577982773
dotaSteamApi.getMatchDetails(sampleMatchId)
.then(data => console.log(data))
```

### getLeagueListing - Deprecated
Returns a list of all leagues supported in-game via DotaTV

Parameters:
* language - (optional) ISO_639-1 language code

ISO_639-1 codes can be found at the following link: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

The default language is English
```
dotaSteamApi.getLeagueListing()
.then(data => console.log(data))
```

### getLiveLeagueGames
Gets live league matches and their current individual match details

Parameters: None
```
dotaSteamApi.getLiveLeagueGames()
.then(data => console.log(data))
```

### getMatchHistory
Retrieves a list of matches that can be filtered by the following parameters.

Parameters:
* hero_id - (optional) only return matches with requested hero_id (hero ids can be found using getHeroes())
* game_mode - (optional) only return matches with the desired game_mode (ids can be found here: https://wiki.teamfortress.com/wiki/WebAPI/GetMatchHistory)
* skill - (optional) only return matches of desired skill level [0 - 3] where 3 is the highest skill level and 0 is any
* min_players - (optional) minimum number of players required to be in the match
* account_id - (optional) only return matches where user with steam account_id was a player 
* league_id - (optional) only returns matches with the requested league_id
* start_at_match_id - (optional) only grab matches that started at and after the requested match_id
* matches_requested - (optional) limit the number of matches returned (default: 100)
* tournament_games_only - (optional) limit results to only tournament matches (0 = false, 1 = true)
```
const heroId = 1 // Anti-Mage
const matchesRequested = 25
dotaSteamApi.getMatchHistory(heroId, null, null, null, null, null, null, matchesRequested)
.then(data => console.log(data))
```

### getMatchHistoryBySequenceNum
Retrieves a list of matches starting at provided sequence value. Starts at a random value if no parameters are provided.

Parameters:
* start_at_match_seq_num - (optional) match sequence number to begin requesting at
* matches_requested - (optional) the number of desired matches
```
const startingMatchSeqNum = 4706807932
const numMatches = 15
dotaSteamApi.getMatchHistoryBySequenceNum(startingMatchSeqNum, numMatches)
.then(data => console.log(data))
```

### getScheduledLeagueGames - Deprecated
Retrieves a list of upcoming Dota league games

Parameters:
* date_min - (optional Unix timestamp) starting datetime
* date_max - (optional Unix timestamp) ending datetime
```
dotaSteamApi.getScheduledLeagueGames()
.then(data => console.log(data))
```

### getTeamInfoByTeamId
Retrieves list of Dota2 teams by filterable parameters

Parameters:
* start_at_team_id - (optional) team id to start returning at
* teams_requested - (optional) number of teams to return
```
// team id for Team Liquid
const teamIdrequested = 2163
const teamsRequested = 10
dotaSteamApi.getTeamInfoByTeamId(teamIdrequested, teamsRequested)
.then(data => console.log(data))
```

### getMatchMVPVotes - Undocumented
Currently unstable and not working. Do not use until more documentation is available.

Parameters:
* match_id - match id to return MVP votes for
```
const sampleMatchId = 5577982773
dotaSteaApi.getMatchMVPVotes(sampleMatchId)
.then(data => console.log(data))
```

### getTopLiveEventGame
Retrieves current top live tournament game. Unsure what partner stands for currently.

Parameters:
* partner - ?
```
const samplePartner = 0
dotaSteamApi.getTopLiveEventGame(samplePartner)
.then(data => console.log(data))
```

### getTopLiveGame
Retrieves current top live public game. Unsure what partner stands for currently.

Parameters:
* partner - ?
```
const samplePartner = 0
dotaSteamApi.getTopLiveGame(samplePartner)
.then(data => console.log(data))
```

### getTournamentPlayerStats
Retrieves pro player stats from games played at the International Dota 2 Championships

Parameters:
* account_id - steam account id
* hero_id - (optional) return games where player played requested hero (hero ids can be found using getHeroes())
* time_frame - (optional) requested time frame
* match_id - (optional) filter results to look for specific match only
* league_id (optional) DO NOT CHANGE OR USE: only supports the International (default is already league_id=65006)
```
const requestedPlayerId = 16769223
dotaSteamApi.getTournamentPlayerStats(requestedPlayerId)
.then(data => console.log(data))
```

### getTopWeekendTourneyGames - Potentially Deprecated
Retrieves list of weekend tournament games.

Parameters:
* partner - ?
* home_division - (optional) filter matches to prefer matches from chosen division
```
dotaSteamApi.getTopWeekendTourneyGames(0)
.then(data => console.log(data))
```

### getGameItems 
Retrieves list of ingame items with their name and price

Parameters:
* language - (optional) language to return item names in
```
dotaSteamApi.getGameItems()
.then(data => console.log(data))
```

### getHeroes 
Retrieves list of ingame items with their names and hero ids

Parameters:
* language - (optional) language to return hero names in
```
dotaSteamApi.getHeroes()
.then(data => console.log(data))
```

### getTournamentPrizePool
Retrieves community funded portion of a tournament's prize pool.

Parameters:
* leagueid - (default=65006) Default is the Dota 2 International
```
dotaSteamApi.getTournamentPrizePool()
.then(data => console.log(data))
```

### getRarities
Retrieves list of consmetic item rarities, and their corresponding name, id, and hex color

Parameters: None
```
dotaSteamApi.getRarities()
.then(data => console.log(data))
```

### getHeroIcon
Returns desired hero icon url

Parameters:
* heroName - Name of the desired hero in the form npc_dota_hero_heroName (hero data can be retrieved from getHeroes)
* size - Size of the img linked to by the returned url
    * 0: sb.png - smallest horizontal icon size (59 x 33)
    * 1: lg.png - middle horizontal icon size (205 x 115)
    * 2: full.png - largest of the 3 horizontal icons (256 x 144)
    * 3: vert.jpg - ingame icon shown to left of hp and mana bars (235 x 272)
```
const requestedHeroName = 'npc_dota_hero_antimage'
const requestedSize = 0
const antiMageHeroIcon = dotaSteamApi.getHeroIcon(requestedHeroName, requestedSize)
```

### getItemIcon
Returns item icon with given item name

Parameters:
* itemName - Name of desired item icon in the form item_itemName (item data can be retrieved from getGameItems())
```
const requestedItem = "item_blink"
const blinkDaggerIcon = dotaSteamApi.getItemIcon(requestedItem)
```

### getAbilityIcon
Returns url to ability requested ability icon. The Steam Api does not currently support the retrieval of ability ids and names

Parameters:
* heroName - Name of the desired hero in the form npc_dota_hero_heroName (hero data can be retrieved from getHeroes)
* abilityName - Name of ability to retrieve url of 
```
const heroRequested = "npc_dota_hero_antimage"
const abilityRequested = "blink"
const abilityUrl = dotaSteamApi.getAbilityIcon(heroRequested, abilityRequested)
```

### getHeroesWithIcons
Returns list of heroes, their names, and ids, as well as their image urls with the desired size

Parameters:
* language - (optional) Language to return hero names in
* size - Size of the img linked to by the returned url
    * 0: sb.png - smallest horizontal icon size (59 x 33)
    * 1: lg.png - middle horizontal icon size (205 x 115)
    * 2: full.png - largest of the 3 horizontal icons (256 x 144)
    * 3: vert.jpg - ingame icon shown to left of hp and mana bars (235 x 272)
```
dotaSteamApi.getHeroesWithIcons(null, 0)
.then(data => console.log(data))
```

### getItemsWithIcons
Returns list of items with their names and image urls

Parameters:
* language - (optional) language to return item names in
```
dotaSteamApi.getItemsWithIcons()
.then(data => console.log(data))
```

### getClientVersion
Returns current active version of the Dota 2 game client

Parameters: None
```
dotaSteamApi.getClientVersion()
.then(data => console.log(data))
```

### getServerVersion
Returns current active version of the Dota 2 servers

Parameters: None
```
* dotaSteamApi.getServerVersion()
```

### getStoreMetaData
Returns current steam market data for the dota 2 page, including featured items and filters for each hero and category

Parameters:
* language - (optional) language to return results in
```
dotaSteamApi.getStoreMetaData()
.then(data => console.log(data))
```

### getPlayerItems
Returns list of all dota 2 cosmetics owned by given steam user and each item's details

Parameters:
* steamid - steam user id
```
dotaSteamApi.getPlayerItems('<uint64_steamid>')
.then(data => console.log(data))
```

### getEquippedPlayerItems
Returns list of cosmetic items that steam user has equipped for given hero id

Parameters:
* steamid - steam user id
* class_id - hero class id (hero ids can be found using getHeroes())
```
const heroClassID = 1 // Anti-Mage
dotaSteamApi.getEquippedPlayerItems('<uint64_steamid', heroClassID)
.then(data => console.log(data))
```

### getNewsForDotaApp
Get recent news for Dota 2 by filterable parameters

Parameters:
* maxlength - (optional) 	Maximum length for the content to return, 0 for full content, if it's less then a blurb is generated to fit
* enddate - (optional) Retrieve posts earlier than this date (unix epoch timestamp)
* count - (optional) # of posts to retrieve (default 20)
* feeds - (optional) Comma-separated list of feed names to return news for
```
const testCount = 10
dotaApi.getNewsForDotaApp(null, null, testCount, null)
.then(data => console.log(data))
```

### getGlobalAchievementPercentagesForDota
Returns list of achievement and percentage of global playerbase that have earned each

Dota 2 currently does not contain any earnable player achievements

Parameters: None
```
dotaSteamApi.getGlobalAchievementPercentagesForDota()
.then(data => console.log(data))
```

### getDotaPlayerAchievements
Returns list of steam user achievements. Dota 2 currently does not contain any earnable player achievements.

Profile of requested steam user must be public.

Parameters:
* steamid - steam user id
* language - (optional) language to return results in
```
dotaSteamApi.getDotaPlayerAchievements('<uint64_steamid>')
.then(data => console.log(data))
```

### getSchemaForDota
Returns game name, version, and ingame stats tracked, Dota has none as of now

Parameters:
* language - (optional) language to return results in
```
dotaSteamApi.getSchemaForDota()
.then(data => console.log(data))
```

### getNumberOfCurrentPlayers
Returns number of current ingame players

Parameters: None
```
dotaSteamApi.getNumberOfCurrentPlayers()
.then(data => console.log(data))
```

### getAssetPrices
Returns full list of purchasable items and their individual class ids and properties

Parameters:
* currency - (optional) currency type to format price of return items in
* language - (optional) language to return item results in
```
dotaSteamApi.getAssetPrices()
.then(data => console.log(data))
```

### getAssetClassInfo
Returns individual item info by class id from the class_id_list array provided. To get class ids, use getAssetPrices()

Parameters:
* language - (optional) language to return item results in
* class_count - number of items requested
* class_id_list - (Array object) array of item class ids to return details for
```
const requestedClasses = 2
const classesList = [57939591, 57939593] // 2 pieces of the Demon Blood item set for axe
dotaSteamApi.getAssetClassInfo(null, requestedClasses, classesList)
.then(data => console.log(data))
```
