import { App } from "@slack/bolt";
import type { SlackAction, BlockButtonAction } from "@slack/bolt";
import { JSXSlack } from "jsx-slack";

import { AppHome } from "./components/AppHome";
import { CreateHolidayModal } from "./components/modal/CreateHolidayModal";

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
app.event("app_home_opened", async ({ event, context, payload, logger }) => {
  logger.debug(`user: ${event.user}`);
  const homeView = await AppHome({ name: "r4ttsl" });
  try {
    await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: JSXSlack(homeView),
    });
  } catch (e) {
    app.error(e);
  }
});

// 休暇連絡新規登録押下
app.action<BlockButtonAction>(
  "create_holiday",
  async ({ body, context, ack, client }) => {
    console.log("create_holiday");

    // 処理側に渡されたイベントを処理側が承認しているかどうかをSlackに通知
    await ack();
    const modalView = await CreateHolidayModal({ name: "r4ttsl" });

    try {
      await client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: JSXSlack(modalView),
      });
    } catch (e) {
      console.log(e);
      app.error(e);
    }
  }
);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
