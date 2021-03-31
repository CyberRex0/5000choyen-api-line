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
			if (lns.length > 2) {
				if (lns[0].length > 50 || lns[1].length > 50) {
					events_processed.push(bot.replyMessage(event.replyToken, {
						type: 'text',
						text: 'text is too long.'
					});
					return;
				}
				const imageurl = 'https://gsapi.cyberrex.ml/image?top=' + encodeURI(lns[0]) + '&bottom=' + encodeURI(lns[1]);
				events_processed.push(bot.replyMessage(event.replyToken, {
					type: 'image',
					originalContentUrl: imageurl,
					previewImageUrl: imageurl+'&type=jpeg&q=50'
				});
			}
		}
	});

	Promise.all(events_processed).then((response) => {
		console.log(`${response.length} event(s) processed.`);
	});

});
