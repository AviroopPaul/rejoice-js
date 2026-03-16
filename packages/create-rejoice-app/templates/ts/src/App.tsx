import { useTheme, Progress, createGlobalStyle } from "rejoice-js";
import { useAppStore } from "./store/appStore";
import {
  LayoutGrid,
  Paintbrush,
  Boxes,
  Sparkles,
  Zap,
  ShieldCheck,
  Smile,
  Laugh,
  Meh,
  Frown,
  TrendingDown,
  TrendingUp,
  Sun,
  Moon,
} from "lucide-react";
import {
  PageWrapper,
  Header,
  Brand,
  BrandName,
  ThemeToggle,
  HeroSection,
  HeroInner,
  HeroTitle,
  CounterBlock,
  HappinessIconWrap,
  HappinessValue,
  HappinessMeta,
  ProgressWrap,
  Controls,
  CounterBtn,
  SectionWrap,
  SectionEyebrow,
  SectionHeading,
  SectionSub,
  FeaturesGrid,
  FeatureCard,
  FeatureIconWrap,
  FeatureTitle,
  FeatureDesc,
  AgentsRow,
  AgentPill,
  AgentLogoWrap,
  AgentLogoImg,
  AgentInfo,
  AgentName,
  AgentMaker,
  Divider,
  Footer,
  FooterInner,
  FooterLinks,
  FooterLink,
} from "./App.styles";

// ── Google Fonts ──────────────────────────────────────────────────────────────

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;600&family=Geist:wght@400;500;600&display=swap');
`;

// ── Happiness icon + color ────────────────────────────────────────────────────

const getHappinessVisual = (n: number) => {
  if (n >= 80)
    return { icon: <Laugh size={52} strokeWidth={1.5} />, color: "#10b981", label: "Thriving" };
  if (n >= 50)
    return { icon: <Smile size={52} strokeWidth={1.5} />, color: "#1677ff", label: "Good" };
  if (n >= 20) return { icon: <Meh size={52} strokeWidth={1.5} />, color: "#f59e0b", label: "Meh" };
  return { icon: <Frown size={52} strokeWidth={1.5} />, color: "#ef4444", label: "Rough" };
};

// ── Feature list ──────────────────────────────────────────────────────────────

const features = [
  {
    icon: <LayoutGrid size={20} strokeWidth={1.8} />,
    color: "#1677ff",
    title: "Ant Design 5",
    desc: "50+ production-ready components — tables, modals, forms, date pickers — all themed and dark-mode aware out of the box.",
  },
  {
    icon: <Paintbrush size={20} strokeWidth={1.8} />,
    color: "#e879a0",
    title: "styled-components",
    desc: "CSS-in-JS with full theme token access. Component styles that respond to light/dark mode automatically.",
  },
  {
    icon: <Boxes size={20} strokeWidth={1.8} />,
    color: "#f59e0b",
    title: "Zustand",
    desc: "Minimal, boilerplate-free global state. No providers, no reducers — just a store and a hook.",
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.8} />,
    color: "#06b6d4",
    title: "Lucide Icons",
    desc: "500+ crisp SVG icons as React components. Tree-shakeable, fully typed, consistent 24px grid.",
  },
  {
    icon: <Zap size={20} strokeWidth={1.8} />,
    color: "#10b981",
    title: "Zero-config JSX",
    desc: "No import React needed. jsxImportSource is wired so you write components, not boilerplate.",
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.8} />,
    color: "#f97316",
    title: "No peer conflicts",
    desc: "React is a peer dep, not bundled. rejoice-js never ships its own React copy — no duplicate hook errors.",
  },
];

// ── Agents ────────────────────────────────────────────────────────────────────

const agents = [
  {
    src: "/logos/claude.svg",
    alt: "Claude Code",
    name: "Claude Code",
    maker: "Anthropic",
    bg: "transparent",
  },
  {
    src: "/logos/codex.svg",
    alt: "Codex CLI",
    name: "Codex CLI",
    maker: "OpenAI",
    bg: "#000",
    pad: 9,
  },
  {
    src: "/logos/gemini.png",
    alt: "Gemini CLI",
    name: "Gemini CLI",
    maker: "Google",
    bg: "transparent",
  },
];

// ── App ───────────────────────────────────────────────────────────────────────

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { happiness, increase, decrease } = useAppStore();
  const { icon, color, label } = getHappinessVisual(happiness);
  const progressStatus = happiness >= 80 ? "success" : happiness <= 20 ? "exception" : "active";

  return (
    <>
      <GlobalFonts />
      <PageWrapper>
        {/* ── Header ── */}
        <Header>
          <Brand>
            <BrandName>rejoice</BrandName>
          </Brand>
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun size={16} strokeWidth={1.8} />
            ) : (
              <Moon size={16} strokeWidth={1.8} />
            )}
          </ThemeToggle>
        </Header>

        {/* ── Hero ── */}
        <HeroSection>
          <HeroInner>
            <HeroTitle>
              How happy is
              <br />
              your codebase?
            </HeroTitle>

            <CounterBlock>
              <HappinessIconWrap $color={color}>{icon}</HappinessIconWrap>
              <HappinessValue $color={color}>
                {happiness}
                <span>%</span>
              </HappinessValue>
              <HappinessMeta>{label}</HappinessMeta>

              <ProgressWrap>
                <Progress
                  percent={happiness}
                  status={progressStatus}
                  showInfo={false}
                  strokeWidth={6}
                  strokeColor={color}
                />
              </ProgressWrap>

              <Controls>
                <CounterBtn onClick={decrease} disabled={happiness <= 0}>
                  <TrendingDown size={16} />
                  Less Happy
                </CounterBtn>
                <CounterBtn $primary onClick={increase} disabled={happiness >= 100}>
                  <TrendingUp size={16} />
                  More Happy
                </CounterBtn>
              </Controls>
            </CounterBlock>
          </HeroInner>
        </HeroSection>

        <Divider />

        {/* ── Why rejoice? ── */}
        <SectionWrap $center>
          <SectionEyebrow>The stack</SectionEyebrow>
          <SectionHeading>Why rejoice?</SectionHeading>
          <SectionSub>Everything wired. Nothing to configure.</SectionSub>

          <FeaturesGrid>
            {features.map((f, i) => (
              <FeatureCard key={f.title} $delay={i * 40}>
                <FeatureIconWrap $color={f.color}>{f.icon}</FeatureIconWrap>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureDesc>{f.desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </SectionWrap>

        <Divider />

        {/* ── Agents ── */}
        <SectionWrap $center>
          <SectionEyebrow>Compatibility</SectionEyebrow>
          <SectionHeading>Built for coding agents</SectionHeading>
          <SectionSub>
            A known, stable surface — no setup debates, no conflicting patterns.
            <br />
            Faster results with every major AI coding tool.
          </SectionSub>

          <AgentsRow>
            {agents.map((a) => (
              <AgentPill key={a.name}>
                <AgentLogoWrap $bg={a.bg}>
                  <AgentLogoImg
                    src={a.src}
                    alt={a.alt}
                    style={a.pad ? { padding: a.pad } : undefined}
                  />
                </AgentLogoWrap>
                <AgentInfo>
                  <AgentName>{a.name}</AgentName>
                  <AgentMaker>{a.maker}</AgentMaker>
                </AgentInfo>
              </AgentPill>
            ))}
          </AgentsRow>
        </SectionWrap>

        {/* ── Footer ── */}
        <Footer>
          <FooterInner>
            <span>
              Edit <code>src/App.tsx</code> to start building.
            </span>
            <FooterLinks>
              <FooterLink href="https://ant.design" target="_blank" rel="noreferrer">
                Ant Design
              </FooterLink>
              <FooterLink href="https://styled-components.com" target="_blank" rel="noreferrer">
                styled-components
              </FooterLink>
              <FooterLink href="https://zustand-demo.pmnd.rs" target="_blank" rel="noreferrer">
                Zustand
              </FooterLink>
              <FooterLink href="https://lucide.dev" target="_blank" rel="noreferrer">
                Lucide
              </FooterLink>
            </FooterLinks>
          </FooterInner>
        </Footer>
      </PageWrapper>
    </>
  );
};

export default App;
