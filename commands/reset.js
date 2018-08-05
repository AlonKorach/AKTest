const Discord = require("discord.js");
const fs = require("fs");
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC6MLHVqrpZqbegCMfKsTqUQ";
let Parser = require('rss-parser');
let parser = new Parser();
module.exports.run = async (bot, message, args) => {
    if (message.channel.id != 409384605070655489) return;
    if (message.author.id != 259324372882292736 && message.author.id != 396976051172933635) return;

    fs.writeFile("./videos.json", "{}", (err) => {
        if (err) return console.log(`Error: ${err}`);
    })
} 

module.exports.help = {
    name: 'ytreset'
}