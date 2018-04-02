class Command {
  constructor(Discord) {
    this.Discord = Discord;
  }
  performCommand(message, args, databaseFile) {
    if (message.channel.id === databaseFile[message.guild.id].economy_channel || databaseFile[message.guild.id].economy_channel === null) {
      if (args.length === 0) {
        let embed = new this.Discord.RichEmbed()
          .setDescription("**PAY**\nPlease specify a user and an amount of money to send.")
          .setColor("#00ff00");
        message.channel.send(embed);
      } else {
        if (args[0].toLowerCase() === "setchannel") {
          if (message.author.id === message.guild.ownerID) {
            if (args.length === 1) {
              let embed = new this.Discord.RichEmbed()
                .setDescription("**ECONOMY**\nPlease specify a channel to set the economy commands for.")
                .setColor("#00ff00");
              message.channel.send(embed);
            } else {
              if (args[1].toLowerCase() === "null") {
                databaseFile[message.guild.id].economy_channel = null;
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**ECONOMY**\nSet the channel for all economy commands to nothing. You can chat with me anywhere now.")
                  .setColor("#00ff00");
                message.channel.send(embed);
              } else {
                let channel = message.guild.channels.find("id", args[1].slice(2, -1));
                if (channel === null) {
                  let embed = new this.Discord.RichEmbed()
                    .setDescription("**ECONOMY**\nCouldn't find channel.")
                    .setColor("#ff0000");
                  message.channel.send(embed);
                } else {
                  databaseFile[message.guild.id].economy_channel = channel.id;
                  let embed = new this.Discord.RichEmbed()
                    .setDescription("**ECONOMY**\nSet the channel for all economy commands to " + channel + ".")
                    .setColor("#00ff00");
                  message.channel.send(embed);
                }
              }
            }
          } else {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**ECONOMY**\nOnly the owner of this discord server can set the channel for the economy commands.")
              .setColor("#ff0000");
            message.channel.send(embed);
          }
        } else {
          let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if (target === null) {
            let embed = new this.Discord.RichEmbed()
              .setDescription("**PAY**\nCouldn't find user.")
              .setColor("#ff0000");
            message.channel.send(embed);
          } else {
            if (args.length === 1) {
              let embed = new this.Discord.RichEmbed()
                .setDescription("**PAY**\nPlease specify an amount of money to send.")
                .setColor("#00ff00");
              message.channel.send(embed);
            } else {
              let amount = parseInt(args[1]);
              if (amount === null) {
                let embed = new this.Discord.RichEmbed()
                  .setDescription("**PAY**\nUnvalid amount.")
                  .setColor("#ff0000");
                message.channel.send(embed);
              } else {
                if (amount <= 0) {
                  let embed = new this.Discord.RichEmbed()
                    .setDescription("**PAY**\nUnvalid amount.")
                    .setColor("#ff0000");
                  message.channel.send(embed);
                } else {
                  if (databaseFile[message.guild.id].users[message.author.id].balance < amount) {
                    let embed = new this.Discord.RichEmbed()
                      .setDescription("**PAY**\nYou do not have enough money to send.")
                      .setColor("#ff0000");
                    message.channel.send(embed);
                  } else {
                    let authorsNewBalance = databaseFile[message.guild.id].users[message.author.id].balance - amount;
                    databaseFile[message.guild.id].users[message.author.id].balance = authorsNewBalance;
                    databaseFile[message.guild.id].users[target.id].balance = databaseFile[message.guild.id].users[target.id].balance + amount;
                    let embed = new this.Discord.RichEmbed()
                      .setDescription("**PAY**\nYou sent " + amount + " coins to " + target + ".\nYou now have a balance of '" + authorsNewBalance + "'.")
                      .setColor("#ff0000");
                    message.channel.send(embed);
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (message.guild.channels.find("id", databaseFile[message.guild.id].economy_channel) === null) {
        databaseFile[message.guild.id].economy_channel = null;
      }
    }
  }
}

module.exports = Command;
