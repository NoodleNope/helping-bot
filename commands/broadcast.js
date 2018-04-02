class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, commandPrefix, bot) {
    if (message.author.id === "346595338758389760") {
      let braodcastMessage = message.content.slice(10 + commandPrefix.length);
      if (braodcastMessage === null || braodcastMessage === "") {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**GLOBAL BROADCAST**\nPlease type in a message to braodcast.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**GLOBAL BROADCAST**\n\n**This is a global broadcast from my owner to all discord servers using me.**\n\n" + braodcastMessage + "\n\nhttps://discordapp.com/oauth2/authorize?client_id=429289955983097866&scope=bot")
          .setColor("#ff6432");
        bot.guilds.forEach(function(key, value) {
          let guild = bot.guilds.get(value);
          let defaultChannel = guild.channels.find("name", "general");
          if (defaultChannel !== null) {
            defaultChannel.send(embed);
          }
        });
      }
    } else {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**BROADCAST**\nOnly the owner of me can braodcast global messages.")
        .setColor("#ff0000");
      message.channel.send(embed);
    }
  }
}

module.exports = Command;
