/** @jsxImportSource jsx-slack */
/**
 * HolidayListコンポーネント
 */
import {
  Mrkdwn,
  Image,
  Context
} from "jsx-slack";

export type HolidayInfo = {
  userName: string;
  date: string;
  division: "午前休" | "午後休" | "全休"
  iconUrl: string;
}

export const HolidayList = (props: HolidayInfo) => {
  const { userName, date, division, iconUrl } = props;
  return (
    <Context>
      <Mrkdwn>
        <code>{date}</code>&nbsp;
        <b>{division}</b>
      </Mrkdwn>
      -
      <Image src={iconUrl} alt={userName} />
    </Context>
  );
};
