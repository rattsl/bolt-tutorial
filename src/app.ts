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
import { HolidayMessage } from "./components/message/holidayMessage";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

type User = {
  id: string;
  real_name: string;
  image_url: string;
  is_bot: boolean;
};

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

    // ユーザー一覧取得
    const usersList = await client.users.list();
    const members = usersList.members;
    // ボット以外のユーザー名取得
    const memberNames = members
      .filter((member) => {
        return member.is_bot === false;
      })
      .map((member) => {
        return member.real_name;
      });
    // console.log("usersList: " + JSON.stringify(names));

    const modalView = await CreateHolidayModal({ memberNames: memberNames });

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

    // console.log("body: " + JSON.stringify(body));
    console.log("view: " + JSON.stringify(view));

    // const user_id: string = body.user.id;

    const formViewStateValues = view.state.values;
    console.log("formViewStateValues: " + JSON.stringify(formViewStateValues));

    // TODO: キャメルとスネークが混在してるのどうにかする
    const selectedUser =
      formViewStateValues.holidayModalName.name.selected_user;
    const selectedDate =
      formViewStateValues.holidayModalActions.date.selected_date;
    const selectedDivision =
      formViewStateValues.holidayModalActions.division.selected_option.value;
    const note = formViewStateValues.holidayModalNote.note.value;
    const mention =
      formViewStateValues.holidayModalMention.mention.selected_options;

    const messageBlock = HolidayMessage({
      selectedUser: selectedUser,
      selectedDate: selectedDate,
      selectedDivision: selectedDivision,
      note: note,
      mention: mention,
    });

    app.client.chat.postMessage({
      token: context.botToken,
      channel: "C048YLXNNPM",
      blocks: JSXSlack(messageBlock),
    });
  }
);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
