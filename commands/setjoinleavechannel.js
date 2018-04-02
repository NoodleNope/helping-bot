class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, args, databaseFile) {
    if (message.author.id === message.guild.ownerID) {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**JOIN-LEAVE**\nPlease specify a channel for the join-leave messages to appear in.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        if (args[0].toLowerCase() === "null") {
          let embed = new this.Discord.RichEmbed()
            .setDescription("**JOIN-LEAVE**\nSet the channel for the join-leave messages to nothing. No join-leave messages wil apear.")
            .setColor("#00ff00");
          message.channel.send(embed);
        } else {
          let channel = message.guild.channels.find("id", args[0].slice(2, -1));
          if (channel === null) {
            databaseFile[message.guild.id].join_leave_channel = null;
            let embed = new this.Discord.RichEmbed()
              .setDescription("**JOIN-LEAVE**\nCouldn't find channel.")
              .setColor("#ff0000");
            message.channel.send(embed);
          } else {
            databaseFile[message.guild.id].join_leave_channel = channel.id;
            let embed = new this.Discord.RichEmbed()
              .setDescription("**JOIN-LEAVE**\nSet the channel for the join-leave messages to appear in to " + channel + ".")
              .setColor("#00ff00");
            message.channel.send(embed);
          }
        }
      }
    } else {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**JOIN-LEAVE**\nOnly the owner of this discord server can set the channel for the join-leave messages to appear in.")
        .setColor("#ff0000");
      message.channel.send(embed);
    }
  }
}

module.exports = Command;
