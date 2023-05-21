/** @jsxImportSource jsx-slack */
/**
 * Holidayコンポーネント
 */
import {
  Header,
  Section,
  Actions,
  RadioButtonGroup,
  RadioButton,
  Button,
} from "jsx-slack";

import { HolidayButtons } from "./HolidayButtons";
import { HolidayList } from "./HolidayList";

export const Holiday = () => {
  return (
    <Section>
      <HolidayList />
      <HolidayButtons />
    </Section>
  );
};
