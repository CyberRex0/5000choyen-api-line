const server = require('express')();
const line = require('@line/bot-sdk');

const line_config = {
	channelAccessToken: process.env.LINE_ACCESS_TOKEN,
	channelSecret: process.env.LINE_CHANNEL_SECRET
};

server.listen(process.env.PORT || 3000);

const bot = new line.Client(line_config);

server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {

	res.sendStatus(200);
	console.log(req.body);

	let events_processed = [];

	req.body.events.forEach((event) => {
		if (event.type == 'message' && event.message.type == 'text') {
			const lns = event.message.text.split('\n');
			console.log(lns);
		}
	});

	Promise.all(events_processed).then((response) => {
		console.log(`${response.length} event(s) processed.`);
	});

});
