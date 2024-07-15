const axios = require("axios");

module.exports.config = {
  name: "sim",
  version: "1.0.1",
  hasPermission: 0,
  usePrefix: false,
  credits: "Lorenzo",
  description: "Chat with Simsimi",
  usages: "sim [yor message]",
  commandCategory: "Fun",
  cooldowns: 0,
};;

module.exports.run = async ({ api, event, args }) => {
  try {
    let message = args.join(" ");
    if (!message) {
      return api.sendMessage(`Please put a message`, event.threadID, event.messageID);
    }

    const response = await axios.get(`https://sim-and-teach-api.onrender.com/sim?query=${message}`);
    const respond = response.data.respond;
    api.sendMessage(respond, event.threadID, event.messageID);
  } catch (error) {
    console.error("An error occurred:", error);
    api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
  }
};