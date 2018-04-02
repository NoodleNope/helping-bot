class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  async performCommand(message, args, databaseFile, ms) {
    if (message.member.hasPermission("BAN_MEMBERS") === false) {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**BAN**\nYou do not have the permission to ban users.")
        .setColor("#ff0000");
      message.channel.send(embed);
    } else {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**BAN**\nPlease specify a user and an amount of time to ban.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (target === null) {
          let embed = new this.Discord.RichEmbed()
            .setDescription("**BAN**\nCouldn't find user.")
            .setColor("#ff0000");
          message.channel.send(embed);
        } else {
          if (target.hasPermission("BAN_MEMBERS")) {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**BAN**\nYou can not ban that user.")
              .setColor("#ff0000");
            message.channel.send(embed);
          } else {
            if (args.length === 1) {
              let embed = new this.Discord.RichEmbed()
                .setDescription("**BAN**\nPlease specify an amount of time to ban.")
                .setColor("#00ff00");
              message.channel.send(embed);
            } else {
              let time = parseInt(ms(args[1]));
              if (time === null) {
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**BAN**\nUnvalid amount of time.")
                  .setColor("#ff0000");
                message.channel.send(embed);
              } else {
                try {
                  message.guild.member(target).ban("because.");
                } catch (e) {
                  let embed = new this.Discord.RichEmbed()
                    .setDescription("**BAN**\nSomething went wrong while trying to ban that user.")
                    .setColor("#ff0000");
                  return;
                }
                databaseFile[message.guild.id].users[target.id].ms_on_unban = time + Date.now();
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**BAN**\nTemporarily Banned " + target + ".\nTime Period: " + time)
                  .setColor("#00ff00");
                message.channel.send(embed);
              }
            }
          }
        }
      }
    }
  }
}

module.exports = Command;
