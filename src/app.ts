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

app.message("health check", async ({ say }) => {
  await say(":wave:");
});

app.command("/echo", async ({ command, ack, respond, say }) => {
  // コマンドリクエストを確認
  await ack();

  // await respond(`${command.text}`);
  await say("hoge");
});

// コマンド起動をリッスン
app.command("/ticket", async ({ ack, body, client, logger }) => {
  // コマンドのリクエストを確認
  await ack();

  try {
    const result = await client.views.open({
      // 適切な trigger_id を受け取ってから 3 秒以内に渡す
      trigger_id: body.trigger_id,
      // view の値をペイロードに含む
      view: {
        type: "modal",
        // callback_id が view を特定するための識別子
        callback_id: "view_1",
        title: {
          type: "plain_text",
          text: "Modal title",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Welcome to a modal with _blocks_",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Click me!",
              },
              action_id: "button_abc",
            },
          },
          {
            type: "input",
            block_id: "input_c",
            label: {
              type: "plain_text",
              text: "What are your hopes and dreams?",
            },
            element: {
              type: "plain_text_input",
              action_id: "dreamy_input",
              multiline: true,
            },
          },
        ],
        submit: {
          type: "plain_text",
          text: "Submit",
        },
      },
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

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
