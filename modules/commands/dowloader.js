const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "dowloader",
  version: "9.0.2",
  credits: "Lorenzo",
  hasPermssion: 0,
  description: "Download videos from  Facebook, Tiktok, cupcut",
  usePrefix: true,
  usages: "dowloader [video link]",
  commandCategory: "media",
  cooldowns: 10,
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    var ok = event.body.toLowerCase();
    if (ok.startsWith("dl") || ok.startsWith("download") || ok.startsWith("downloader")) {
      const args = event.body.split(/\s+/);
      args.shift();

      let link = args.join("");
      if (!link) {
        api.sendMessage(`missing link!!`, event.threadID, event.messageID);
        return;
      }

      api.sendMessage(`Video is now downloading, please wait for a minute`, event.threadID, event.messageID);

      const response = await axios.get(`https://lorenzorestapi.onrender.com/dl?link=${encodeURIComponent(link)}`);
      const video = response.data.url;
      const title = response.data.title || "N/A";

      let pathie = path.join(__dirname, `/cache/${event.senderID}.mp4`);

      const { data } = await axios.get(video, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(pathie, data);

      api.sendMessage({ body: `Downloaded successfully\n\nTitle: ${title}`, attachment: fs.createReadStream(pathie) }, event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage(`Error: ${error}`, event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {}; 