const server = require('express')();
const line = require('@line/bot-sdk');

const line_config = {
	channelAccessToken: process.env.LINE_ACCESS_TOKEN,
	channelSecret: process.env.LINE_CHANNEL_SECRET
};

server.listen(process.env.PORT || 3000);

server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

	res.sendStatus(200);
	console.log(req.body);

});
