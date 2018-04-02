class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, bot, commandPrefix, defaultPrefix) {
    let embed = new this.Discord.RichEmbed()
      .setDescription("**HELP MENU**\n\n**General Commands:**\n" + defaultPrefix + "getprefix\n" + commandPrefix + "status\n" + commandPrefix + "balance <user>\n" + commandPrefix + "gamble <amount>\n" + commandPrefix + "pay <user> <amount>\n" + commandPrefix + "rank <user>\n\n**Staff/Admin Commands:**\n" + commandPrefix + "setprefix <prefix>\n" + commandPrefix + "permban <user> <reason>\n" + commandPrefix + "balance setchannel <channel>\n" + commandPrefix + "pay setchannel <channel>\n" + commandPrefix + "gamble setchannel <channel>\n" + commandPrefix + "setonlychannel <channel>\n\n" + "https://discordapp.com/oauth2/authorize?client_id=429289955983097866&scope=bot")
      .setColor("#00ff00");
    message.channel.send(embed);
  }
}

module.exports = Command;
