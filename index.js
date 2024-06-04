import { parseEvent, parseTicks, parseHeader } from '@laihoe/demoparser2';

const pathToDemo = "/Users/antonalekseev/dev/rcl/demo-parser/42_xgod-gun5_de_ancient.dem"

let gameEndTick = Math.max(...parseEvent(pathToDemo,"round_end").map(x => x.tick))

let fields = ["kills_total", "deaths_total", "assists_total", "team_clan_name", "team_rounds_total"]
let rawScoreboard = parseTicks(pathToDemo, fields, [gameEndTick])
let map = parseHeader(pathToDemo);

let teams = Array.from(new Set(rawScoreboard.map(player => player.team_clan_name))).map(teamName => {
    let playersInTeam = rawScoreboard.filter(player => player.team_clan_name === teamName);
    return {
        name: teamName,
        score: playersInTeam[0].team_rounds_total
    }
});

let scoreboard = {
    playerStats: rawScoreboard.map(player => ({
        steamId: player.steamid,
        nickName: player.name,
        kills: player.kills_total,
        assists: player.assists_total,
        deaths: player.deaths_total
    })),
    mapName: map.map_name,
    team1: teams[0],
    team2: teams[1]
}

console.log(JSON.stringify(scoreboard, null, 2));