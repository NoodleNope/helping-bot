class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, args, databaseFile) {
    if (message.author.id === message.guild.ownerID) {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**PREFIX**\nPlease specify a new prefix.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        if (args[0].length > 1) {
          let embed = new this.Discord.RichEmbed()
            .setDescription("**PREFIX**\nThe new prefix has to be 1 character only.")
            .setColor("#ff0000");
          message.channel.send(embed);
        } else {
          databaseFile[message.guild.id].commandPrefix = args[0];
          let embed = new this.Discord.RichEmbed()
            .setDescription("**PREFIX**\nSet the new prefix to '" + args[0] + "'.")
            .setColor("#00ff00");
          message.channel.send(embed);
        }
      }
    } else {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**PREFIX**\nYou have to be the owner of the server to set the new prefix.")
        .setColor("#ff0000");
      message.channel.send(embed);
    }
  }
}

module.exports = Command;
