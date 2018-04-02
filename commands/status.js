class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, bot) {
    let embed = new this.Discord.RichEmbed()
      .setDescription("**STATUS**\n\n**Uptime:** " + parseInt(bot.uptime / 60000) + " minutes (on this server)\n**Ping:** " + Math.round(bot.ping) + "ms\n**Total Servers Operating On:** " + bot.guilds.size)
      .setColor("#00ff00");
    message.channel.send(embed);
  }
}

module.exports = Command;
