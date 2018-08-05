const Discord = require('discord.js')
const hiveMC = require('hiveapi');
const http = require("http");
const request = require('request');
const buildURL = require("build-url");
function getJSON(url, cb){
    request(url, {json: true}, (err, res, body) => {
        // if (err) return err;
        cb(err, res);
    })
}

module.exports.run = async (bot, message, args) => {
    // if(message.channel.id != '314375187208339459') return;
    if(!args[0]) return message.reply("נא לציין את שם המשתמש להוצאת הנתונים.");
    if(!args[1]) return message.reply('נא לציין את סוג המשחק.');

    let pname = args[0];
    let gameType = args[1];
    
    let baseURL = "http://35.164.215.24/mcEtvBot/index.php";
    let avatarURL = message.member.user.avatarURL.replace("2048", "128");

    uriBuilder = buildURL(baseURL, {
        queryParams: {
            pname: pname,
            game: gameType.toLowerCase(),
            avatar: avatarURL,
            server: "hive"
        }
    });

    const attachment = new Discord.Attachment(uriBuilder, `${message.author.username}_${pname}.png`);
    message.channel.send("", attachment);

/*
    getJSON(`http://api.hivemc.com/v1/player/${mcusername}`, (err, res) => {
      if(res.body == 'Error')  message.reply('שם המשתמש אינו קיים במסד הנתונים של HIVEMC, יש לבדוק את השם ולנסות שוב.');
    })
    // if(res.body == 'Error') return message.reply('שם המשתמש אינו קיים במסד הנתונים של HIVEMC, יש לבדוק את השם ולנסות שוב.');
    getJSON(`http://api.hivemc.com/v1/game/${gameType}`, (err, res) => {
        if (res.body == 'Error') return message.reply('סוג המשחק לא אותר, כניראה כי הוא אינו קיים, נא לבדוק ולנסות שוב.');
    })
    
    getJSON(`http://api.hivemc.com/v1/player/${mcusername}/${gameType}`, (err, res) => {
        if(res.body.code == 404) return message.reply('המשתמש לא שיחק בסוג משחק זה בחיים, לכן אין נתונים להצגה.');
        // console.log(res.body);
        let RichEmbed = new Discord.RichEmbed();
        switch (gameType) {
            case 'SG':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Survival Games')
                    .addField('Victories', (res.body.victories == undefined ? 0 : res.body.victories), true)
                    .addField('Totlal Points', (res.body.total_points == undefined ? 0 : res.body.total_points), true)
                    
                break;
            case 'BP':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Block Party')
                    .addField('Games played', (res.body.games_played == undefined ? 0 : res.body.games_played), true)
                    .addField('Total points', (res.body.total_points == undefined ? 0 : res.body.total_points), true)
                    
                break;
            case 'CAI':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Cowboys and Indians')
                    .addField('Total points', (res.body.total_points == undefined ? 0 : res.body.total_points))
                   
                break;
            case 'CR':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Cranked')
                    .addField('Total points', (res.body.total_points == undefined ? 0 : res.body.total_points), true)
                    .addField('Victories', (res.body.victories == undefined ? 0 : res.body.victories), true)
                    .addBlankField()
                    .addField('Kills', (res.body.kills == undefined ? 0 : res.body.kills), true)
                    .addField('Deaths', (res.body.deaths == undefined ? 0 : res.body.deaths), true)
                    .addField('Gmaes played', (res.body.gamesplayed == undefined ? 0 : res.body.gamesplayed), true)
                    .addBlankField()
                    .addField('Rcat count', (res.body.rccat_count == undefined ? 0 : res.body.rccat_count), true)
                    .addField('Rcat kills', (res.body.rccat_kills == undefined ? 0 : res.body.rccat_kills), true)
                    .addBlankField()
                    .addField('Airstrike kills', (res.body.airstrike_kills == undefined ? 0 : res.body.airstrike_kills))
                    
                break;
            case 'DR':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'DeathRun')
                    .addField('Total points', res.body.total_points)
                    .addBlankField()
                    .addField('Victories', res.body.victories, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('Games played', res.body.games_played)
                    
                break;
            case 'HB':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'The Herobrine')
                    .addField('Kills', res.body.kills, true)
                    .addField('deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('Points', res.body.points)
                    
                break;
            case 'HERO':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'SG:Heroes')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Victories', res.body.victories, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('1VS1 wins', res.body.one_vs_ones_wins, true)
                    .addField('Games Played', res.body.games_played, true)
                    .addBlankField()
                    .addField('DeathMatches', res.body.deathmatches, true)
                    .addBlankField()
                    .addField('Tnt used', res.body.tnt_used, true)
                    
                break;
            case 'HIDE':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Hide and Seek')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Victories', res.body.victories, true)
                    .addBlankField()
                    .addField('HiderKills', res.body.hiderkills, true)
                    .addField('SeekerKills', res.body.seekerkills, true)
                    .addBlankField()
                    .addField('Deaths', res.body.deaths, true)
                    .addField('Games played', res.body.gamesplayed, true)

                break;
            case 'OITC':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'One in the Chamber')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Victories', res.body.victories, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('ArrowsFired', res.body.arrowsfired, true)
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    
                break;
            case 'SP':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Splegg')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    .addBlankField()
                    .addField('Egg fire', res.body.eggfire, true)
                    .addField('Blocks destroyed', res.body.blocksdestroyed)
                    .addBlankField()
                    .addField('deaths', res.body.deaths, true)
                    .addField('Points', res.body.points, true);

                break;
            case 'TIMV':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Trouble in Mineville')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Most points', res.body.most_points, true)
                    .addBlankField()
                    .addField('Role points', res.body.role_points, true)
                    .addField('T points', res.body.t_points, true)
                    .addBlankField()
                    .addField('I points', res.body.i_points, true)
                    .addField('D points', res.body.d_points, true)
                    
                break;
            case 'SKY':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'SkyWars')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Victories', res.body.victories, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    .addField('MostPoints', res.body.most_points, true)

                break;
            case 'LAB':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'The Lab')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Victories', res.body.victories, true)
                    
                break;
            case 'DRAW':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Draw It')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Victories', res.body.victories, true)
                    .addBlankField()
                    .addField('Correct guesses', res.body.correct_guesses, true)
                    .addField('Incorrect guesses', res.body.incorrect_guesses, true)
                    
                break;
            case 'SLAP':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Slaparoo')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    .addBlankField()
                    .addField('Points', res.body.points, true)
                    
                break;
            case 'EF':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Electric Floor')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    .addBlankField()
                    .addField('Points', res.body.points, true)
                    .addField('Out lived', res.body.outlived, true)
                break;
            case 'MM':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Music Masters')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    .addBlankField()
                    .addField('Points', res.body.points, true)
                    .addBlankField()
                    .addField('Correct notes', res.body.correctnotes, true)
                    .addField('Incorrect notes', res.body.incorrectnotes, true)
                    .addBlankField()
                    .addField('Notes perfect', res.body.notes_perfect, true)
                    .addField('Noted good', res.body.notes_good, true)
                    
                break;
            case 'GRAV':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Gravity')
                    .addField('Victories', res.body.victories)
                    .addField('GamesPlayed', res.body.gamesplayed)
                    .addField('Points', res.body.points)
                break;
            case 'RR':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Restaurant Rush')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.gamesplayed, true)
                    .addBlankField()
                    .addField('Tables Cleared', res.body.tablescleared, true)
                    .addField('Points', res.body.points, true)
                    
                break;
            case 'GNT':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'SkyGiants')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.games_played, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('Gold earned', res.body.gold_earned, true)
                    .addField('Beasts slain', res.body.beasts_slain, true)
                    
                break;
            case 'GNTM':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'SkyGiants')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.games_played, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('Gold earned', res.body.gold_earned, true)
                    .addField('Beasts slain', res.body.beasts_slain, true)
                    
                break;
            case 'SGN':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Survival Games 2')
                    .addField('Victories', res.body.victories, true)
                    .addField('GamesPlayed', res.body.games_played, true)
                    .addBlankField()
                    .addField('DeathMatches', res.body.deathmatches, true)
                    .addField('Crates opened', res.body.crates_opened)
                    .addBlankField()
                    .addField('Total points', res.body.total_points, true)
                    .addField('Most points', res.body.most_points, true)

                break;
            case 'BD':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'BatteryDash')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Kills', res.body.kills, true)
                    .addBlankField()
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('Engergy collected', res.body.energy_collected, true)
                    .addField('Batteries charged', res.body.batteries_charged, true)
                    
                break;
            case 'SPL':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Sploop')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Games Played', res.body.games_played, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)

                break;
            case 'MIMV':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Murder in Mineville')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Games Played', res.body.games_played, true)
                    .addBlankField()
                    .addField('Vicotries', res.body.victories, true)
                    .addField('Last used emote', res.body.lastUsedEmote, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    
                break;
            case 'BED':
                RichEmbed
                    .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                    .setColor('#2b9f4')
                    .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                    .addField('Game', 'Bed Wars')
                    .addField('Total points', res.body.total_points, true)
                    .addField('Games Played', res.body.games_played, true)
                    .addBlankField()
                    .addField('Vicotries', res.body.victories, true)
                    .addBlankField()
                    .addField('Kills', res.body.kills, true)
                    .addField('Deaths', res.body.deaths, true)
                    .addBlankField()
                    .addField('Beds destroyed', res.body.beds_destroyed, true)
                    .addField('Teams eliminated', res.body.teams_eliminated, true)
                    
                break;
                case 'EE':
                    RichEmbed
                        .setAuthor(mcusername, `https://minotar.net/avatar/${mcusername}`)
                        .setColor('#2b9f4')
                        .setThumbnail('https://hivemc.com/img/header-logo-new.png')
                        .addField('Game', 'Explosive Eggs')
                        .addField('Leaps', res.body.leaps, true)
                        .addField('Games Played', res.body.gamesplayed, true)
                        .addBlankField()
                        .addField('Vicotries', res.body.victories, true)
                        .addField('Points', res.body.points)
                    break;
        }
        message.channel.send(RichEmbed);
    })
    
 */   

}

module.exports.help = {
    name: "hive"
}