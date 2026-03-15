import { styled } from "rejoice-js";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease, color 0.3s ease;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HappinessCard = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 48px 24px;
`;

export const ClaudeLogo = styled.div`
  color: #1677ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Controls = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
