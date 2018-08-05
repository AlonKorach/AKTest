const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if(message.channel.id != '314375187208339459') return;

    let helpCmdEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatrurl)
        .setThumbnail('https://yt3.ggpht.com/-dTFt3S_fg_A/AAAAAAAAAAI/AAAAAAAAAAA/2gWAtAk_hq8/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg')
        .setColor('#42f474')
    if (args[0] == 'hypixel') {
        helpCmdEmbed
            .setTitle('ETVbot | hypixel Games')
            .addField('Hypixel Games', ' HungerGames \n Paintball \n TNTGames \n VampireZ \n Walls \n Walls3 \n UHC \n  BedWars \n SkyWars \n BuildBattle \n Duels \n MegaWalls')
            .addField('הערה:', '**נא לשים דגש על אותיות גדולות- קטנות!**')
            .addBlankField()
    } else if (args[0] == 'hive'){
        let gameTypes = {"SG":"Survival Games","BP":"Block Party","CAI":"Cowboys and Indians","CR":"Cranked","DR":"DeathRun","HB":"The Herobrine","HERO":"SG:Heroes","HIDE":"Hide and Seek","OITC":"One in the Chamber","SP":"Splegg","TIMV":"Trouble in Mineville","SKY":"SkyWars","LAB":"The Lab","DRAW":"Draw It","SLAP":"Slaparoo","EF":"Electric Floor","MM":"Music Masters","GRAV":"Gravity","RR":"Restaurant Rush","GNT":"SkyGiants","SGN":"Survival Games 2","BD":"BatteryDash","SPL":"Sploop","MIMV":"Murder in Mineville","BED":"BedWars","EE":"Explosive Eggs"};
        let games = ''
        for (let game in gameTypes){
            games += `${game} - ${gameTypes[game]}\n`
            
        }
        helpCmdEmbed
            .addField('ETVBot | HiveMC Games', games)
            .addField('הערה:', '**יש לכתוב את שם המשחק באותיות גדולות בלבד!**')
            .addBlankField();
    }
        helpCmdEmbed
            .setTitle('ETVBot | Commadns')
            .addField('!advancement', '!advancement  <text> - return custom minecraft advancement image if the text is under 25 charchters.')
            .addField('!hypixel', '!hypixel <minecraft player name> <game type> - return info about the specifed player in the game soecifed.')
            .addField('!hive', '!hive  <minecraft player name> <game type> - return info about the specifed player in the game soecifed.')
            .addField('!ETVBot', '!ETVBot [hypixel \ hive] - return this message (help), or, if specifed, hypixel \ hiveMC games name.')
			.addField('!skin','!skin <username> - return the skin of the player.');
    
    message.channel.send(helpCmdEmbed);
}

module.exports.help = {
    name: "ETVBot"
}