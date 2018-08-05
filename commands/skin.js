const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
	if(message.channel.id != '314375187208339459') return;
    if (!args[0]) return message.reply("נא לציין את שם המשתמש שאת עיצוב המשתמש שלו ברצונך לראות!");

    let RichEmbed = new Discord.RichEmbed()
        .setImage(`https://minotar.net/body/${args[0]}/100.png`);
    message.channel.send(RichEmbed);
}

module.exports.help = {
    name: "skin"
}