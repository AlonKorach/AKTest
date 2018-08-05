// d52f294b-accb-45ae-97df-1f23aa29f8cb
const Discord = require('discord.js');
const HypixelAPI = require('hypixel');
const client = new HypixelAPI({key: 'd52f294b-accb-45ae-97df-1f23aa29f8cb'});
const mojangAPI = require('mojang-api');
const buildUrl = require("build-url");
const request = require("request");
var http = require("http");

function getMojangProfile(username, func){
   mojangAPI.nameToUuid(username, func);
}


function gotoPHPServer(url, cb){
    request(url, {json: false}, (err, res, body) => {
        // console.log(body); 
        cb(err, res);
    })
}
  

module.exports.run = async(bot, message, args) => {
    if(message.channel.id != '314375187208339459') return; // 435455589418532865
    if (!args[0]) return message.reply('שם משתמש?');
    if (!args[1]) return message.reply("משחק?");

    let pname = args[0];
    let gameType = args[1];
    let baseURL = "http://35.164.215.24/mcEtvBot/index.php";



    // var url = `${baseURL}&pname=${pname}&game=${gameType}&avatar=${message.member.user.avatarURL}`;
    var avatarURL = message.member.user.avatarURL.replace("2048", "128")
    uriBuilder = buildUrl(baseURL, {
        queryParams: {
            pname: pname,
            game: gameType.toLowerCase(),
            avatar: avatarURL,
            server: "hypixel"
        }
    });

    const attachment = new Discord.Attachment(uriBuilder, `${message.author.username}_${pname}.png`);
    message.channel.send("", attachment);
   }

module.exports.help = {
    name: "hypixel"
}
