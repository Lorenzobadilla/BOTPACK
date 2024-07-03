const axios = require("axios");

module.exports.config = {
  name: "pickupline",
  version: "1.0.0",
  role: 0,
    usePrefix: false,
    hasPermission: 0,
  credits: "Lorenzo",
  description: "Random pickuplines English/Tagalog",
  commandCategory: "fun",
  cooldowns: 5
};

module.exports.run = async ({ api, event, }) => {
const res = await axios.get(`https://lorenzorestapi.onrender.com/api/pickupline`);
  var pickupline = res.data.pickupline;
return api.sendMessage(`『 𝗛𝗲𝗿𝗲𝘀 𝘆𝗼𝘂𝗿 𝗿𝗮𝗻𝗱𝗼𝗺 𝗽𝗶𝗰𝗸𝘂𝗽𝗹𝗶𝗻𝗲 』\n${pickupline}`, event.threadID, event.messageID)
}