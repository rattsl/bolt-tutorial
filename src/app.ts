import { App } from "@slack/bolt";
import type {
  SlackAction,
  BlockButtonAction,
  SlackViewAction,
  KnownEventFromType,
  GenericMessageEvent,
} from "@slack/bolt";
import { JSXSlack } from "jsx-slack";

import { AppHome } from "./components/appHome/AppHome";
import { CreateHolidayModal } from "./components/modal/CreateHolidayModal";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

/**
 * ヘルスチェック
 */
app.message("hc", async ({ say, message }) => {
  console.log("hc");
  console.log("user: " + (message as GenericMessageEvent).user);
  // 現状型キャストするしかなさそう
  // https://github.com/slackapi/bolt-js/issues/904
  await say(`:wave: こんにちは <@${(message as GenericMessageEvent).user}>！`);
});

/**
 * ホームタブ表示時
 */
app.event(
  "app_home_opened",
  async ({ event, body, context, payload, client }) => {
    // 開いたユーザーの情報を取得する
    const userInfo = await client.users.info({
      user: event.user,
    });

    const homeView = await AppHome({ name: userInfo.user.name });
    try {
      await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: JSXSlack(homeView),
      });
    } catch (e) {
      app.error(e);
    }
  }
);

/**
 * 休暇連絡新規登録押下
 */
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

/**
 * 休暇連絡フォームアクション受け取り
 */
app.view<SlackViewAction>(
  "send_holiday_form",
  async ({ ack, body, context, view }) => {
    ack();

    const user_id: string = body.user.id;

    const form_view_state_values = view.state.values;
    const form_title = form_view_state_values.title.title.value;
    const form_tags = form_view_state_values.tags.tags.value;
    const form_body = form_view_state_values.body.body.value;

    app.client.chat.postMessage({
      token: context.botToken,
      channel: user_id,
      text: `Title: ${form_title}\nTags: ${form_tags}\nBody: ${form_body}`,
    });
  }
);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
