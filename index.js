let Discord = require("discord.js");
let bot = new Discord.Client({
  disableEveryone: true
});

let fs = require("fs");
let ms = require("ms");

let guildDatabase = JSON.parse(fs.readFileSync("./database/guild_database.json"));

let setprefixCommandFile = require("./commands/setprefix.js");
let setonlychannelCommandFile = require("./commands/setonlychannel.js");
let statusCommandFile = require("./commands/status.js");
let helpCommandFile = require("./commands/help.js");
let balanceCommandFile = require("./commands/balance.js");
let gambleCommandFile = require("./commands/gamble.js");
let payCommandFile = require("./commands/pay.js");
let permbanCommandFile = require("./commands/permban.js");
let tempbanCommandFile = require("./commands/tempban.js");
let mutedCommandFile = require("./commands/mute.js");
let rankCommandFile = require("./commands/rank.js");
let broadcastCommandFile = require("./commands/broadcast.js");
let setjoinleavechannelCommandFile = require("./commands/setjoinleavechannel.js");

let setprefixCommand = new setprefixCommandFile(Discord);
let setonlychannelCommand = new setonlychannelCommandFile(Discord);
let statusCommand = new statusCommandFile(Discord);
let helpCommand = new helpCommandFile(Discord);
let balanceCommand = new balanceCommandFile(Discord);
let gambleCommand = new gambleCommandFile(Discord);
let payCommand = new payCommandFile(Discord);
let permbanCommand = new permbanCommandFile(Discord);
let tempbanCommand = new tempbanCommandFile(Discord);
let mutedCommand = new mutedCommandFile(Discord);
let rankCommand = new rankCommandFile(Discord);
let broadcastCommand = new broadcastCommandFile(Discord);
let setjoinleavechannelCommand = new setjoinleavechannelCommandFile(Discord);

let defaultPrefix = "!";

bot.on("ready", () => {
  let usersInServer = "";
  let botGuildSize = bot.guilds.size;
  bot.guilds.forEach(function(key, value) {
    let guild = bot.guilds.get(value);
    usersInServer += "\n\u001b[31mUsers In \u001b[34m" + guild.name + "\u001b[33;1m: \u001b[33m" + guild.memberCount + "\u001b[0m";
    if (guildDatabase.hasOwnProperty(guild.id) === false) {
      guildDatabase[guild.id] = {
        "command_prefix": "!",
        "only_channel": null,
        "join_leave_channel": null,
        "economy_channel": null,
        "rank_channel": null,
        "users": {}
      };
    }
    guild.members.forEach(function(guildMember, guildMemberId) {
      if (!(guildDatabase[guild.id].users[guildMember.id])) {
        guildDatabase[guild.id].users[guildMember.id] = {
          "experience": 0,
          "balance": 100,
          "level": 1,
          "experience_next_level": 500,
          "ms_on_unban": null,
          "ms_on_unmute": null
        };
      }
    });
  });
  console.log("\n\u001b[35m-----------------------\n\u001b[34m" + bot.user.username + "\n\u001b[35m-----------------------\n\u001b[36mServers Operating On: \u001b[32m" + botGuildSize + "\n" + usersInServer + "\u001b[0m\n\n");
  setInterval(function() {
    let currentMs = Date.now();
    for (let i in guildDatabase) {
      let guild = bot.guilds.get(i);
      let mutedRole = guild.roles.find("name", "Muted");
      for (let user in guildDatabase[i].users) {
        if (guildDatabase[i].users[user].ms_on_unmute <= currentMs && guildDatabase[i].users[user].ms_on_unmute !== null) {
          let member = guild.members.get(guildDatabase[i].users[user]);
          guildDatabase[i].users[user].ms_on_unmute = null;
          try {
            member.removeRole(mutedRole);
          } catch (e) {
            console.log("Could not unmute user.");
          }
        }
      }
    }
  }, 10000);
});

bot.on("message", message => {
  if (message.author.bot === false && (message.channel.type === "dm") === false) {
    if (message.channel.id === guildDatabase[message.guild.id].only_channel || guildDatabase[message.guild.id].only_channel === null) {
      let messageArray = message.content.split(" ");
      let command = messageArray[0].toLowerCase();
      let commandArguments = messageArray.slice(1);
      let date = new Date();
      let currentTime = date.getFullYear() + "/" + date.getMonth() + 1 + "/" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      console.log("\u001b[36m" + currentTime + " \u001b[31m- \u001b[35m(" + message.guild.name + " || " + message.guild.id + ") \u001b[34m(" + message.channel.name + ") \u001b[33m(" + message.author.username + "): \u001b[32m" + message + "\u001b[0m");

      let guildId = message.guild.id;
      registerGuild(message.guild);
      updatelevel(message, guildId);
      let commandPrefix = guildDatabase[guildId].command_prefix;
      if (command === defaultPrefix + "getprefix") {
        let embed = new Discord.RichEmbed()
          .setDescription("**PREFIX**\nYou forgot the command prefix? Well, it's '" + commandPrefix + "'.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else if (command === commandPrefix + "setprefix") {
        setprefixCommand.performCommand(message, commandArguments, guildDatabase);
      } else if (command === commandPrefix + "setonlychannel") {
        setonlychannelCommand.performCommand(message, commandArguments, guildDatabase);
      } else if (command === commandPrefix + "status") {
        statusCommand.performCommand(message, bot);
      } else if (command === commandPrefix + "help") {
        helpCommand.performCommand(message, bot, commandPrefix, defaultPrefix);
      } else if (command === commandPrefix + "balance") {
        balanceCommand.performCommand(message, commandArguments, guildDatabase, guildId);
      } else if (command === commandPrefix + "gamble") {
        gambleCommand.performCommand(message, commandArguments, guildDatabase);
      } else if (command === commandPrefix + "pay") {
        payCommand.performCommand(message, commandArguments, guildDatabase);
      } else if (command === commandPrefix + "permban") {
        permbanCommand.performCommand(message, commandArguments);
      } else if (command === commandPrefix + "mute") {
        mutedCommand.performCommand(message, commandArguments, guildDatabase, ms);
      } else if (command === commandPrefix + "rank") {
        rankCommand.performCommand(message, commandArguments, guildDatabase);
      } else if (command === commandPrefix + "broadcast") {
        broadcastCommand.performCommand(message, commandPrefix, bot);
      } else if (command === commandPrefix + "setjoinleavechannel") {
        setjoinleavechannelCommand.performCommand(message, commandArguments, guildDatabase);
      }
      fs.writeFile("./database/guild_database.json", JSON.stringify(guildDatabase), function(error) {
        if (error) throw error;
      });
    } else {
      if (message.guild.channels.find("id", databaseFile[message.guild.id].only_channel) === null) {
        databaseFile[message.guild.id].only_channel = null;
      }
    }
  }
});

function registerGuild(guild) {
  if (guildDatabase.hasOwnProperty(guild.id) === false) {
    guildDatabase[guild.id] = {
      "command_prefix": "!",
      "only_channel": null,
      "join_leave_channel": null,
      "economy_channel": null,
      "rank_channel": null,
      "users": {}
    };
    guild.members.forEach(function(guildMember, guildMemberId) {
      if (!(guildDatabase[guild.id].users[guildMember.id])) {
        guildDatabase[guild.id].users[guildMember.id] = {
          "experience": 0,
          "balance": 100,
          "level": 1,
          "experience_next_level": 500,
          "ms_on_unban": null,
          "ms_on_unmute": null
        };
      }
    });
  }
}

function updatelevel(message, guildId) {
  if (guildDatabase[guildId].users[message.author.id].experience_next_level <= 0) {
    guildDatabase[guildId].users[message.author.id].level++;
    guildDatabase[guildId].users[message.author.id].experience_next_level = Math.floor(Math.pow(guildDatabase[guildId].users[message.author.id].level * 0.75, 2) + 500);
    message.channel.send(new Discord.RichEmbed()
      .setDescription("**LEVEL UP**\nYou leveled up. You are now level " + guildDatabase[guildId].users[message.author.id].level + ".")
      .setColor("#00ff00"));
  } else {
    guildDatabase[guildId].users[message.author.id].experience_next_level--;
    guildDatabase[guildId].users[message.author.id].experience++;
  }
}

bot.login("NDI5Mjg5OTU1OTgzMDk3ODY2.DZ_e8g.LQh7QiJA2vmI1bn_EjXRNuXXdaU");
