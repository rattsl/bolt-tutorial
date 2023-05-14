/** @jsxImportSource jsx-slack */
/**
 * AppHomeHeaderコンポーネント
 */
import { Header } from "jsx-slack";

type Props = {
  name: string;
};

export const AppHomeHeader = (Props: Props) => {
  const gm = "おはようございます";
  const hello = "こんにちわ";
  const ge = "こんばんわ";
  const otukare = "おつかれさまです";
  return (
    <Header>
      {otukare} @{Props.name}さん :wave:
    </Header>
  );
};
