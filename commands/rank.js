class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, args, databaseFile) {
    if (message.channel.id === databaseFile[message.guild.id].rank_channel || databaseFile[message.guild.id].rank_channel === null) {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**RANK**\n\n**Server Ranking:** " + "unknown" + "\n**Level:** " + databaseFile[message.guild.id].users[message.author.id].level + "\n**Total Experience:** " + databaseFile[message.guild.id].users[message.author.id].experience + "\n**Experience For Next Level:** " + databaseFile[message.guild.id].users[message.author.id].experience_next_level)
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        if (args[0].toLowerCase() === "setchannel") {
          if (message.author.id === message.guild.ownerID) {
            if (args.length === 1) {
              let embed = new this.Discord.RichEmbed()
                .setDescription("**RANK**\nPlease specify a channel to set the rank command for.")
                .setColor("#00ff00");
              message.channel.send(embed);
            } else {
              if (args[1].toLowerCase() === "null") {
                databaseFile[message.guild.id].rank_channel = null;
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**RANK**\nSet the channel for the rank command to nothing. You can chat with me anywhere now.")
                  .setColor("#00ff00");
                message.channel.send(embed);
              }
              let channel = message.guild.channels.find("id", args[1].slice(2, -1));
              if (channel === null) {
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**RANK**\nCouldn't find channel.")
                  .setColor("#ff0000");
                message.channel.send(embed);
              } else {
                databaseFile[message.guild.id].rank_channel = channel.id;
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**RANK**\nSet the channel for the rank command to " + channel + ".")
                  .setColor("#00ff00");
                message.channel.send(embed);
              }
            }
          } else {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**RANK**\nOnly the owner of this discord server can set the channel for the rank command.")
              .setColor("#ff0000");
            message.channel.send(embed);
          }
        } else {
          let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if (target === null) {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**RANK**\nCouldn't find user.")
              .setColor("#ff0000");
            message.channel.send(embed);
          } else {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**" + target.user.username.toUpperCase() + "'S RANKING**\n\n**Server Ranking:** " + "unknown" + "\n**Level:** " + databaseFile[message.guild.id].users[target.id].level + "\n**Total Experience:** " + databaseFile[message.guild.id].users[target.id].experience + "\n**Experience For Next Level:** " + databaseFile[message.guild.id].users[target.id].experience_next_level)
              .setColor("#00ff00");
            message.channel.send(embed);
          }
        }
      }
    } else {
      if (message.guild.channels.find("id", databaseFile[message.guild.id].rank_channel) === null) {
        databaseFile[message.guild.id].rank_channel = null;
      }
    }
  }
}

module.exports = Command;
