import { useTheme, Button, Typography, Space, Progress, Switch } from "rejoice-js";
import { useAppStore } from "./store/appStore";
import {
  PageWrapper,
  Header,
  Brand,
  HappinessCard,
  ClaudeLogo,
  Controls,
  Footer,
} from "./App.styles";

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { happiness, increase, decrease } = useAppStore();

  const status = happiness >= 80 ? "success" : happiness <= 20 ? "exception" : "active";
  const emoji = happiness >= 80 ? "🎉" : happiness >= 50 ? "😊" : happiness >= 20 ? "😐" : "😢";

  return (
    <PageWrapper>
      <Header>
        <Brand>
          <Typography.Text strong style={{ fontSize: 20 }}>
            rejoice
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            React, but set up already.
          </Typography.Text>
        </Brand>
        <Space>
          <Typography.Text type="secondary">{isDarkMode ? "Dark" : "Light"}</Typography.Text>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </Space>
      </Header>

      <HappinessCard>
        <ClaudeLogo>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M32 4L60 32L32 60L4 32L32 4Z" fill="currentColor" opacity="0.9" />
            <path d="M32 16L48 32L32 48L16 32L32 16Z" fill="white" opacity="0.6" />
          </svg>
        </ClaudeLogo>

        <Typography.Title level={2} style={{ marginTop: 16, marginBottom: 4 }}>
          {emoji} Happiness: {happiness}%
        </Typography.Title>
        <Typography.Text type="secondary">Powered by Zustand</Typography.Text>

        <Progress
          percent={happiness}
          status={status}
          style={{ marginTop: 20, width: 280 }}
          strokeWidth={10}
        />

        <Controls>
          <Button size="large" onClick={decrease} disabled={happiness <= 0}>
            − Less Happy
          </Button>
          <Button size="large" type="primary" onClick={increase} disabled={happiness >= 100}>
            + More Happy
          </Button>
        </Controls>
      </HappinessCard>

      <Footer>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          Edit <code>src/App.jsx</code> to start building · Ant Design · styled-components · Zustand
          · rejoice
        </Typography.Text>
      </Footer>
    </PageWrapper>
  );
};

export default App;
