/** @jsxImportSource jsx-slack */
/**
 * AppHomeContentsHolidayコンポーネント
 */
import {
  Header,
  Section,
  Actions,
  RadioButtonGroup,
  RadioButton,
  Button,
} from "jsx-slack";

export const AppHomeContentsHoliday = () => {
  return (
    <Actions>
      <Button actionId="create_holiday" style="primary">
        新規登録
      </Button>
      <Button value="help">ヘルプ</Button>
    </Actions>
  );
};
