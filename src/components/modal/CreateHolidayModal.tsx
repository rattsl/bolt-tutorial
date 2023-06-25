/** @jsxImportSource jsx-slack */
/**
 * CreateHolidayModalコンポーネント
 */
import {
  Modal,
  Section,
  Actions,
  RadioButtonGroup,
  RadioButton,
  DatePicker,
  Button,
  UsersSelect,
  Select,
  Option,
  Textarea,
} from "jsx-slack";

type Props = {
  name: string;
};

export const CreateHolidayModal = (Props: Props) => {
  return (
    <Modal
      title="休暇連絡 新規登録"
      close="Cancel"
      callbackId="send_holiday_form"
    >
      <UsersSelect label="名前" required />

      <RadioButtonGroup label="日時" required>
        <RadioButton value="1" checked>
          終日
        </RadioButton>
        <RadioButton value="2">連日</RadioButton>
      </RadioButtonGroup>

      <Actions>
        <DatePicker actionId="date_picker_from" />
        <Select>
          <Option value="value-0">午前休</Option>
          <Option value="value-1">午後休</Option>
          <Option value="value-2">全休</Option>
        </Select>
      </Actions>

      <Textarea label="休暇理由" required />

      <Select label="メンション先" multiple>
        <Option value="value-a">user1</Option>
        <Option value="value-b">user2</Option>
        <Option value="value-c">user3</Option>
        <Option value="value-d">user4</Option>
        <Option value="value-e">user5</Option>
      </Select>
    </Modal>
  );
};
