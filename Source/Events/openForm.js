const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const emojiConfig = require("../Configs/emojiConfig")
const config = require("../Configs/serverConfig")
const bot = global.client;

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;
 
  if (interaction.customId === "register") {
    if (!config.unRegisterRoles.some(x => interaction.member.roles.cache.has(x)))
      return interaction
        .reply({
          content: `> ${emojiConfig.başarısız} **Başarısız!** Zaten kayıtlısın gibi görünüyor!`,
          ephemeral: true
        })
        .catch(err => {});
    
		const modal = new Modal() 
			.setCustomId('register_form')
			.setTitle('Kayıt Formu');

		const textInput1 = new TextInputComponent()
			.setCustomId('register_1')
			.setLabel("İsminiz Nedir? (Oyun Dışı)")
      .setPlaceholder("Berk")
			.setStyle('SHORT')
      .setMinLength(2)
      .setMaxLength(10)
      .setRequired(true);
  
		const textInput2 = new TextInputComponent()
			.setCustomId('register_2')
			.setLabel("Adınız Soyadınız? (Oyun İçi)")
      .setPlaceholder("Allen Fox")
			.setStyle('SHORT')
      .setMinLength(2)
      .setMaxLength(20)
      .setRequired(true);
  
  		const textInput3 = new TextInputComponent()
			.setCustomId('register_3')
			.setLabel("Yaşınız Nedir?")
      .setPlaceholder("18")
			.setStyle('SHORT')
      .setMinLength(2)
      .setMaxLength(2)
      .setRequired(true);
  
  		const textInput4 = new TextInputComponent()
			.setCustomId('register_4')
			.setLabel("Steam Profil Adresiniz?")
      .setPlaceholder("https://steamcommunity.com/profiles/76561199026240427/")
			.setStyle('SHORT')
      .setMinLength(35)
      .setMaxLength(100)
      .setRequired(true);

  		const textInput5 = new TextInputComponent()
			.setCustomId('register_5')
			.setLabel("Fivem Saatiniz?")
      .setPlaceholder("2000")
			.setStyle('SHORT')
      .setMinLength(2)
      .setMaxLength(5)
      .setRequired(true);
  
		const ActionRow1 = new MessageActionRow().addComponents(textInput1);
		const ActionRow2 = new MessageActionRow().addComponents(textInput2);
		const ActionRow3 = new MessageActionRow().addComponents(textInput3);
		const ActionRow4 = new MessageActionRow().addComponents(textInput4);
		const ActionRow5 = new MessageActionRow().addComponents(textInput5);

		modal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5);
		await interaction.showModal(modal);
  }
};
module.exports.conf = {
  name: "interactionCreate",
};
