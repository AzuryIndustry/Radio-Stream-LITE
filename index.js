const { Client, GatewayIntentBits: gib, Collection, GatewayIntentBits } = require("discord.js");
const { AudioPlayerStatus, createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const https = require('https');
const client = global.client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a)=>{
      return GatewayIntentBits[a]
  }),
});

module.exports = client;

client.login(YOUR_BOT_TOKEN);

client.on('ready', async (client) => {
  const connection = joinVoiceChannel({
        channelId: YOUR_VOICE_ID,
        guildId: YOUR_VOICE_GUILD_ID,
        adapterCreator: YOUR_VOICE_GUILD.voiceAdapterCreator
  });

  const player = createAudioPlayer();
  connection.subscribe(player);

  https.get(`RADIO_MP3_STREAM_GOES_HERE`, (res) => {
    const resource = createAudioResource(res, { inlineVolume: true });
    player.play(resource);
  });
})
