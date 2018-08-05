const Discord = require('discord.js');
const buildrUrl = require('build-url');
const request = require('request');

function getJSON(url, cb){
    request(url, {json: false}, (err, res, body) => {
        // if (err) return err;
        cb(err, res);
    })
}

module.exports.run = async (bot, message, args) => {
    if(!args.length) return message.reply("נא לציין את ההישג!")
    if(message.channel.id != '314375187208339459') return;
    
    let title = `You got an advancement!`;
    let body = args.join("+")
    var english = /[a-zA-Z_0-9\s]/;
    if(!english.test(body)){
        return message.reply("המערכת מקבלת רק אנגלית ומספרים!")
    }
    if (!args.length > 25){
		return message.reply("לכל היותר, מספר התווים הוא 25, אני קולט שיש: args.length תווים, נא לתקן!")
	}
    let id = Math.floor(Math.random() * Math.floor(39)).toString();
	uri = buildrUrl("http://35.164.215.24/mcEtvBot/adv.php?i=1&t=AK - ALON KING&h=You got an advancement!&username=AK");
    uriBuilder = buildrUrl("https://www.minecraftskinstealer.com/achievement/a.php",{ 
        queryParams: {
            i: id,
            h: title.split(" ").join("+"),
            t: body,
            }
        }
    );
	getJSON("http://35.164.215.24/mcEtvBot/adv.php?i=1&t=AK - ALON KING&h=You got an advancement!&username=AK", (err, res) => {
		if (err) return console.log(err);
	})
	let re = new Discord.RichEmbed()
		.setImage(uriBuilder);
	message.channel.send(re);

} 

module.exports.help = {
    name: "advancement"
}