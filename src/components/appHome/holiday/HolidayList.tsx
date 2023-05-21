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

export const HolidayList = () => {
  return (
    <Section>
      <Button actionId="create_holiday" style="primary">
        新規登録
      </Button>
      <Button value="help">ヘルプ</Button>
    </Section>
  );
};
