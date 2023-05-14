/** @jsxImportSource jsx-slack */
import JSXSlack, {
  Home,
  Image,
  Header,
  Divider,
  Section,
  Actions,
  RadioButtonGroup,
  RadioButton,
  Button,
} from "jsx-slack";

export const AppHome = () => {
  return (
    <Home>
      <Image src="https://source.unsplash.com/random/960x240?home" alt="home" />
      <Header>Welcome back to my home! :house_with_garden:</Header>
      <Divider />
      <Section>What's next?</Section>
      <Actions>
        <RadioButtonGroup actionId="next">
          <RadioButton value="tickets" checked>
            <b>See assigned tickets</b> :ticket:
            <small>
              <i>Check your tickets to start your work.</i>
            </small>
          </RadioButton>
          <RadioButton value="reminder">
            <b>Remind a task later</b> :memo:
            <small>
              <i>I'll remember a task for you.</i>
            </small>
          </RadioButton>
          <RadioButton value="pomodoro">
            <b>Start pomodoro timer</b> :tomato:
            <small>
              <i>Get focused on your time, with tomato!</i>
            </small>
          </RadioButton>
        </RadioButtonGroup>
        <Button actionId="start" style="primary">
          Start working
        </Button>
      </Actions>
    </Home>
  );
};
