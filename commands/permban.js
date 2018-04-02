class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, args) {
    if (message.member.hasPermission("BAN_MEMBERS") === false) {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**BAN**\nYou do not have the permission to ban users.")
        .setColor("#ff0000");
      message.channel.send(embed);
    } else {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**BAN**\nPlease specify a user and a reason to ban.")
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
                .setDescription("**BAN**\nPlease specify a reason to ban.")
                .setColor("#ff0000");
              message.channel.send(embed);
            } else {
              let reason = args.join(" ").slice(22);
              try {
                message.guild.member(target).ban(reason);
              } catch (e) {
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**BAN**\nSomething went wrong while trying to ban that user.")
                  .setColor("#ff0000");
                return;
              }
              let embed = new this.Discord.RichEmbed()
                .setDescription("**BAN**\nPermanently banned " + target + ".\nReason: " + reason)
                .setColor("#00ff00");
              message.channel.send(embed);
            }
          }
        }
      }
    }
  }
}

module.exports = Command;
