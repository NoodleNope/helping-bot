class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, args, databaseFile) {
    if (message.author.id === message.guild.ownerID) {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**ONLY CHANNEL**\nPlease specify a channel to set all commands for.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        if (args[0].toLowerCase() === "null") {
          databaseFile[message.guild.id].only_channel = null;
          let embed = new this.Discord.RichEmbed()
            .setDescription("**ONLY CHANNEL**\nSet the channel for all commands to nothing. You can chat with me anywhere now.")
            .setColor("#00ff00");
          message.channel.send(embed);
        } else {
          let channel = message.guild.channels.find("id", args[0].slice(2, -1));
          if (channel === null) {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**ONLY CHANNEL**\nCouldn't find channel.")
              .setColor("#ff0000");
            message.channel.send(embed);
          } else {
            databaseFile[message.guild.id].only_channel = channel.id;
            let embed = new this.Discord.RichEmbed()
              .setDescription("**ONLY CHANNEL**\nSet the channel for all commands to " + channel + ".")
              .setColor("#00ff00");
            message.channel.send(embed);
          }
        }
      }
    } else {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**ONLY CHANNEL**\nYou have to be the owner of the server to set the only channel to interract with me in.")
        .setColor("#ff0000");
      message.channel.send(embed);
    }
  }
}

module.exports = Command;
