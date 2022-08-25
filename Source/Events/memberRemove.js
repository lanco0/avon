const config = require("../Configs/serverConfig")
const userModel = require("../Models/registerData");

module.exports = async member => { 
 if (!member.user.bot) {
  let userData = await userModel.findOne({ guildID: member.guild.id, userID: member.user.id });
  let data = userData && userData.register
   if (data === true) {
    await userModel.findOneAndUpdate(
      { guildID: member.guild.id, userID: member.user.id },
      {
        $push: {
          registerNames: [
            {
              yetkili: member.user.id,
              tür: "Sunucudan Ayrılma",
              rol: "Sunucudan Ayrılma",
              isim: member.nickname || member.user.username
            }
          ]
        }
      },
      { upsert: true }
    );
     
   await userModel.findOneAndUpdate(
     { guildID: member.guild.id, userID: member.user.id },
     { register: false },
     { upsert: true }
   );
   }
  }
};
module.exports.conf = {
  name: "guildMemberRemove"
};
 