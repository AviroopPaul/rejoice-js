import { styled, keyframes } from "rejoice-js";

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const iconPop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12); }
  100% { transform: scale(1); }
`;

// ── Page shell ────────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  font-family:
    "Geist",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  transition:
    background 0.3s ease,
    color 0.3s ease;
`;

// ── Header ────────────────────────────────────────────────────────────────────

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(12px);
  background: ${({ theme }) => (theme.isDark ? "rgba(20,20,20,0.88)" : "rgba(255,255,255,0.88)")};

  @media (max-width: 640px) {
    padding: 14px 20px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

export const BrandName = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BrandTagline = styled.span`
  font-size: 12px;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)")};

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)")};
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")};
    color: ${({ theme }) => theme.colors.text};
  }
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 80px 24px 72px;
  position: relative;

  /* dot grid */
  background-image: ${({ theme }) => `radial-gradient(
    ${theme.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px
  )`};
  background-size: 28px 28px;

  /* fade out dot grid at edges */
  mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 55%, transparent 100%);
`;

export const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 560px;
  width: 100%;
  animation: ${fadeUp} 0.5s ease both;
`;

export const HeroLabel = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)")};
  margin: 0 0 16px;
`;

export const HeroTitle = styled.h1`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const HeroSub = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)")};
  margin: 0 0 40px;
`;

export const CounterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 40px 36px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? "0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)"
      : "0 0 0 1px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.08)"};
`;

export const HappinessIconWrap = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  transition: color 0.4s ease;
  animation: ${iconPop} 0.35s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

export const HappinessValue = styled.div<{ $color: string }>`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 1;
  color: ${({ $color }) => $color};
  transition: color 0.4s ease;
  letter-spacing: -2px;

  span {
    font-size: 32px;
    opacity: 0.6;
    letter-spacing: 0;
  }
`;

export const HappinessMeta = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)")};
  margin: 2px 0 0;
`;

export const ProgressWrap = styled.div`
  width: 100%;
  margin: 20px 0 4px;

  .ant-progress-line {
    margin: 0;
  }
  .ant-progress-bg {
    transition:
      width 0.3s ease,
      background-color 0.4s ease !important;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

export const CounterBtn = styled.button<{ $primary?: boolean; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border-radius: 10px;
  font-family: "Geist", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: 1px solid ${({ theme, $primary }) => ($primary ? "transparent" : theme.colors.border)};
  background: ${({ theme, $primary }) => ($primary ? theme.colors.primary : "transparent")};
  color: ${({ theme, $primary }) => ($primary ? "#fff" : theme.colors.text)};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  transition:
    opacity 0.15s,
    transform 0.12s,
    box-shadow 0.12s;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ $primary }) =>
      $primary ? "0 4px 16px rgba(22,119,255,0.35)" : "0 4px 12px rgba(0,0,0,0.1)"};
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// ── Divider ───────────────────────────────────────────────────────────────────

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`;

// ── Shared section wrapper ────────────────────────────────────────────────────

export const SectionWrap = styled.section<{ $center?: boolean }>`
  padding: 80px 48px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  text-align: ${({ $center }) => ($center ? "center" : "left")};

  @media (max-width: 640px) {
    padding: 56px 20px;
  }
`;

export const SectionEyebrow = styled.p`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 10px;
`;

export const SectionHeading = styled.h2`
  font-family: "DM Serif Display", Georgia, serif;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 400;
  line-height: 1.15;
  margin: 0 0 10px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionSub = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)")};
  margin: 0 auto 48px;
  max-width: 520px;
  text-align: center;
`;

// ── Features grid ─────────────────────────────────────────────────────────────

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  text-align: left;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div<{ $delay?: number }>`
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${fadeUp} 0.5s ease both;
  animation-delay: ${({ $delay }) => $delay ?? 0}ms;
  transition: background 0.2s ease;
  position: relative;
  overflow: hidden;

  /* accent line on top that appears on hover */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
  &:hover {
    background: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.015)")};
  }

  /* remove double borders at grid edges */
  &:nth-child(4n) {
    border-right: none;
  }
  @media (max-width: 960px) {
    &:nth-child(4n) {
      border-right: 1px solid ${({ theme }) => theme.colors.border};
    }
    &:nth-child(2n) {
      border-right: none;
    }
  }
  @media (max-width: 520px) {
    &:nth-child(n) {
      border-right: none;
    }
  }
`;

export const FeatureIconWrap = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => `${$color}15`};
  flex-shrink: 0;
`;

export const FeatureTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.1px;
`;

export const FeatureDesc = styled.p`
  font-size: 13px;
  line-height: 1.65;
  margin: 0;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)")};
`;

// ── Agents ────────────────────────────────────────────────────────────────────

export const AgentsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const AgentPill = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 24px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) =>
      theme.isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)"};
  }
`;

export const AgentLogoWrap = styled.div<{ $bg: string }>`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  flex-shrink: 0;
`;

export const AgentLogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

export const AgentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
`;

export const AgentName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.1px;
`;

export const AgentMaker = styled.span`
  font-size: 12px;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)")};
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
  padding: 24px 48px;

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)")};

  code {
    font-family: "JetBrains Mono", monospace;
    font-size: 11.5px;
    background: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")};
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

export const FooterLink = styled.a`
  font-size: 12.5px;
  color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)")};
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => (theme.isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)")};
  }
`;
