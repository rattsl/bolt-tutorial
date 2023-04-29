import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.use(async ({ next }) => {
  await next();
});

app.message(
  "health check",
  async ({ say }) => {
    await say(':wave:');
  }
);

// app.message("hello", async ({ message, say }) => {
//   // Filter out message events with subtypes (see https://api.slack.com/events/message)
//   if (message.subtype === undefined || message.subtype === "bot_message") {
//     // say() sends a message to the channel where the event was triggered
//     await say({
//       blocks: [
//         {
//           type: "section",
//           text: {
//             type: "mrkdwn",
//             text: `Hey there <@${message.channel}>!`,
//           },
//         },
//       ],
//       text: `Hey there <@${message.channel}>!`,
//     });
//   }
// });

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
