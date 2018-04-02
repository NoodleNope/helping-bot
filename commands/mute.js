class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  async performCommand(message, args, databaseFile, ms) {
    if (message.member.hasPermission("MANAGE_MESSAGES") === false) {
      let embed = new this.Discord.RichEmbed()
        .setDescription("**MUTE**\nYou do not have the permission to mute users.")
        .setColor("#ff0000");
      message.channel.send(embed);
    } else {
      let role = message.guild.roles.find("name", "Muted");
      if (role === null) {
        // Create the 'Muted' role
        try {
          role = await (message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions: []
          }));
        } catch (e) {
          let embed = new this.Discord.RichEmbed()
            .setDescription("**MUTE**\nError while creating the 'Muted' role.")
            .setColor("#ff0000");
          message.channel.send(embed);
          return;
        }
      }
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**MUTE**\nPlease specify a user and an amount of time to mute.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (target === null) {
          let embed = new this.Discord.RichEmbed()
            .setDescription("**MUTE**\nCouldn't find user.")
            .setColor("#ff0000");
          message.channel.send(embed);
        } else {
          if (target.hasPermission("MANAGE_MESSAGES")) {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**MUTE**\nYou can not mute that user.")
              .setColor("#ff0000");
            message.channel.send(embed);
          } else {
            if (args.length === 1) {
              let embed = new this.Discord.RichEmbed()
                .setDescription("**MUTE**\nPlease specify an amount of time to mute.")
                .setColor("#00ff00");
              message.channel.send(embed);
            } else {
              let time = parseInt(ms(args[1]));
              if (time === null) {
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**MUTE**\nUnvalid amount of time.")
                  .setColor("#ff0000");
                message.channel.send(embed);
              } else {
                try {
                  target.addRole(role);
                } catch (e) {
                  let embed = new this.Discord.RichEmbed()
                    .setDescription("**MUTE**\nSomething went wrong while trying to mute that user.")
                    .setColor("#ff0000");
                  return;
                }
                databaseFile[message.guild.id].users[target.id].ms_on_unmute = time + Date.now();
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**MUTE**\nMuted " + target + ".\nTime Period: " + time)
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
