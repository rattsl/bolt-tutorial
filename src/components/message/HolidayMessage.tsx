/** @jsxImportSource jsx-slack */
/**
 * HolidayMessageコンポーネント
 */

import type { ViewStateSelectedOption } from "@slack/bolt";
import { Blocks, Section, Divider, Image } from "jsx-slack";

type Props = {
  selectedUser: string;
  selectedDate: string;
  selectedDivision: string;
  note: string | null;
  mention: ViewStateSelectedOption[];
};

export const HolidayMessage = ({
  selectedUser,
  selectedDate,
  selectedDivision,
  note,
  mention,
}: Props) => {
  return (
    <Blocks>
      <Section>{mention} 休暇予定が更新されました。</Section>
      <Divider />
      <Section>
        <Image
          src="https://api.slack.com/img/blocks/bkb_template_images/notifications.png"
          alt="calendar thumbnail"
        />
        <b>休暇者:</b>
        <br />
        {selectedUser}
        <br />
        <b>日時:</b>
        <br />
        <code>{selectedDate}</code> - {selectedDivision}
        <br />
        {/* <b>備考:</b>
        <br />
        私用です。すみませんが、よろしくお願いします。 */}
      </Section>
    </Blocks>
  );
};
