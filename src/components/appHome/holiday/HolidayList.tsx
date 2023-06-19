/** @jsxImportSource jsx-slack */
/**
 * HolidayListコンポーネント
 */
import {
  Header,
  Section,
  Actions,
  RadioButtonGroup,
  RadioButton,
  Button,
} from "jsx-slack";

export type HolidayInfo = {
  date: string;
  division: "午前休" | "午後休" | "全休"
  userIcon: string;
}

export const HolidayList = (props: HolidayInfo) => {
  const { date, division, userIcon } = props;
  return (
    <Section>
    <b>{date}</b> {division} {userIcon}
  </Section>
  );
};
