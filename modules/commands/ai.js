const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
	name: 'ai',
	version: '1.1.0',
	hasPermssion: 0,
	credits: 'Yan Maglinte | Liane Cagara',
	description: 'An AI command using Hercai API!',
	usePrefix: false,
	allowPrefix: true,
	commandCategory: 'chatbots',
	usages: 'Ai [prompt]',
	cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, box }) {
	const prompt = args.join(' ');
	if (!box) {
		return api.sendMessage(`Unsupported.`, event.threadID);
	}

	try {
		// Available Models: "v3", "v3-32k", "turbo", "turbo-16k", "gemini"
		if (!prompt) {
			box.reply('Please specify a message!');
			box.react('❓');
		} else {
			const info = await box.reply(`🔍 |Answering please wait..`);
			box.react('⏱️');
			const response = await herc.question({ model: 'v3', content: prompt });
			await box.edit(response.reply, info.messageID);
			box.react('');
		}
	} catch (error) {
		box.reply('⚠️ Something went wrong: ' + error);
		box.react('⚠️');
	}
};