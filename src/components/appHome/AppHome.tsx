/** @jsxImportSource jsx-slack */
/**
 * AppHomeコンポーネント
 */
import { Home, Divider, Section, Context, Image } from "jsx-slack";

import { AppHomeHeader } from "./AppHomeHeader";
import { HolidayList } from "./holiday/HolidayList";
import { HolidayButtons } from "./holiday/HolidayButtons";
import { HolidayInfo } from "./holiday/HolidayList";

type Props = {
  name: string;
};

export const AppHome = ({ name }: Props) => {
  const holidayDummy: HolidayInfo[] = [
    {
      userName: 'testA',
      date: '7月1日(月)',
      division: '全休',
      iconUrl: 'https://api.slack.com/img/blocks/bkb_template_images/profile_1.png'
    },
    {
      userName: 'testB',
      date: '7月2日(火)',
      division: '午前休',
      iconUrl: 'https://api.slack.com/img/blocks/bkb_template_images/profile_2.png'
    },
    {
      userName: 'testC',
      date: '7月3日(水)',
      division: '午後休',
      iconUrl: 'https://api.slack.com/img/blocks/bkb_template_images/profile_3.png'
    }
  ]
  return (
    <Home>
      <AppHomeHeader name={name} />
      <Divider />
      <Section>
      :calendar: |&nbsp;&nbsp;&nbsp;<b>直近の休暇状況</b>&nbsp;&nbsp;| :calendar:
      </Section>
      {holidayDummy.map(holiday => {
        return (<HolidayList {...holiday}/>)
      })}
      <HolidayButtons />
    </Home>
  );
};
