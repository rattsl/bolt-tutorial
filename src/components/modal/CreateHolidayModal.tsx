/** @jsxImportSource jsx-slack */
/**
 * CreateHolidayModalコンポーネント
 */
import {
  Modal,
  Section,
  Divider,
  RadioButtonGroup,
  RadioButton,
  Button,
  Select,
  Option,
  Textarea,
} from "jsx-slack";

type Props = {
  name: string;
};

export const CreateHolidayModal = (Props: Props) => {
  return (
    <Modal title="休暇連絡 新規登録" close="Cancel">
      <Select
        label="名前※"
        placeholder="被休暇者を選択してください"
        multiple
        required
      >
        <Option value="value-0">user1</Option>
        <Option value="value-1">user2</Option>
        <Option value="value-2">user3</Option>
        <Option value="value-3">user4</Option>
        <Option value="value-4">user5</Option>
      </Select>

      <Select label="メンション先" multiple>
        <Option value="value-a">user1</Option>
        <Option value="value-b">user2</Option>
        <Option value="value-c">user3</Option>
        <Option value="value-d">user4</Option>
        <Option value="value-e">user5</Option>
      </Select>

      <Textarea label="休暇理由" required />
      <Textarea label="Anything else you want to tell us?" />
    </Modal>
  );
};
