module.exports.config = {
	name: "tinyurl",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Joshua Sy",
	usePrefix: true,
	description: "shortlink",
  usages: "[url]",
	commandCategory: "...",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let lorenzo = args.join(" ");
const res = await axios.get(`https://lorenzo-rest-api.onrender.com/tinyurl?url=${lorenzo}`);
var plaintext = res.data.result;
return api.sendMessage(`${plaintext}`, event.threadID, event.messageID)
}