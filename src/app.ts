import { App } from "@slack/bolt";
// import JSXSlack from "jsx-slack";
import { JSXSlack, jsxslack } from "jsx-slack";

import { AppHome } from "./components/AppHome";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// app.use(async ({ next }) => {
//   await next();
// });

// ヘルスチェック
app.message("hc", async ({ say, next }) => {
  console.log("hc");
  await say(":wave:");
});

// ホームタブ
app.event("app_home_opened", async ({ event, context, payload }) => {
  console.log("app_home_opened");
  const homeView = await AppHome({ name: "rattsl" });
  try {
    const result = await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: JSXSlack(homeView),
    });
  } catch (e) {
    app.error(e);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
