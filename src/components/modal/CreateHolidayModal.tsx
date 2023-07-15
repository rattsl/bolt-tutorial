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
  memberNames: string[];
};

export const CreateHolidayModal = ({ memberNames }: Props) => {
  return (
    <Modal title="新規休暇登録" close="Cancel" callbackId="send_holiday_form">
      <UsersSelect
        label="休暇者"
        blockId="holidayModalName"
        actionId="name"
        required
      />

      <RadioButtonGroup
        label="日時"
        blockId="holidayModalRadioButtonGroup"
        required
      >
        <RadioButton value="1" checked>
          1日
        </RadioButton>
        <RadioButton value="2">連日</RadioButton>
      </RadioButtonGroup>

      <Actions blockId="holidayModalActions">
        <DatePicker actionId="date" initialDate={new Date()} />
        <Select actionId="division">
          <Option value="0">午前休</Option>
          <Option value="1">午後休</Option>
          <Option value="2" selected>
            全休
          </Option>
        </Select>
      </Actions>

      <Textarea label="備考" blockId="holidayModalNote" actionId="note" />

      <Select
        label="メンション先"
        blockId="holidayModalMention"
        actionId="mention"
        multiple
      >
        {memberNames.map((name, index) => {
          return <Option value={String(index)}>{name}</Option>;
        })}
      </Select>
    </Modal>
  );
};

const SingleDayActions = () => {
  return (
    <Actions>
      <DatePicker actionId="holidayModalDatePicker" />
      <Select>
        <Option value="0">午前休</Option>
        <Option value="1">午後休</Option>
        <Option value="2">全休</Option>
      </Select>
    </Actions>
  );
};

const MultiDayActions = () => {
  return (
    <Actions>
      <DatePicker actionId="holidayModalDatePickerFrom" />
      <DatePicker actionId="holidayModalDatePickerTo" />
    </Actions>
  );
};
