/** @jsxImportSource jsx-slack */
/**
 * AppHomeコンポーネント
 */
import { Home, Divider } from "jsx-slack";

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
    date: '7月1日(月)',
    division: '全休',
    userIcon: ''
    },
    {
    date: '7月2日(火)',
    division: '午前休',
    userIcon: ''
    },
    {
      date: '7月3日(水)',
      division: '午後休',
      userIcon: ''
    }
  ]
  return (
    <Home>
      <AppHomeHeader name={name} />
      <Divider />
      {holidayDummy.map(holiday => {
        return <HolidayList {...holiday}/>
      })}
      {/* <HolidayList /> */}
      <HolidayButtons />
    </Home>
  );
};
