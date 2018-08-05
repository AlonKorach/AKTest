const Discord = require("discord.js");
const fs = require("fs");
const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC6MLHVqrpZqbegCMfKsTqUQ";
let Parser = require('rss-parser');
let parser = new Parser();
module.exports.run = async (bot, message, args) => {
	//message.reply(message.author.id);
    if (message.channel.id != 409384605070655489) return;
    if (message.author.id != 396976051172933635 && message.author.id != 259324372882292736) return;
    function rss() {
        (async () => {
            let feed = await parser.parseURL(url);
            let item = feed.items[0];
            
			if (JSON.parse(fs.readFileSync("./videos.json"))['title'] == item.title) return;
			if (item.id == "yt:video:xljwr2sBTvc") return;
            channel = bot.channels.find("id", "411582341715329035");
            channel.send(`העלאתי סרטון חדש! \n אתם מוזמנים לבוא לצפות ולהשאיר תגובה ולייק! \n \n ${item.link} \n \n <@&350378591697240066>`);
			//channel.send(`url for new video: ${item.link}`)
            fs.writeFile('./videos.json', JSON.stringify({title: item.title}), (err) => {
                if (err) console.log(err);
            });
        })()
    }
    rss();
    message.delete().catch(O_o=>{});
} 

module.exports.help = {
    name: 'ytfirst'
}