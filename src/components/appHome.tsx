/** @jsxImportSource jsx-slack */
/**
 * AppHomeコンポーネント
 */
import { Home, Divider } from "jsx-slack";

import { AppHomeHeader } from "./AppHomeHeader";
import { AppHomeContents } from "./AppHomeContents";

type Props = {
  name: string;
};

export const AppHome = ({ name }: Props) => {
  return (
    <Home>
      <AppHomeHeader name={name} />
      <Divider />
      <AppHomeContents />
    </Home>
  );
};
