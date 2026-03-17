// React core (hooks + DOM)
export {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useContext,
  createContext,
  useMemo,
  useCallback,
  useId,
  useTransition,
  useDeferredValue,
  useSyncExternalStore,
  memo,
  lazy,
  Suspense,
  StrictMode,
  Fragment,
  createElement,
  forwardRef,
} from "react";
export { createRoot, hydrateRoot } from "react-dom/client";

// Rejoice core
export { RejoiceProvider } from "./provider/RejoiceProvider";
export { useTheme } from "./hooks/useTheme";
export { useThemeStore } from "./store/themeStore";

// styled-components
export { styled, css, keyframes, createGlobalStyle } from "styled-components";
export type { DefaultTheme } from "styled-components";

// Zustand
export { create, createStore } from "zustand";
export { persist, devtools, subscribeWithSelector } from "zustand/middleware";
export { useShallow } from "zustand/react/shallow";

// Ant Design (tree-shakeable)
export {
  // Data Entry
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,

  // Data Display
  Avatar,
  Badge,
  Calendar,
  Card,
  Carousel,
  Collapse,
  Descriptions,
  Image,
  List,
  Popover,
  QRCode,
  Segmented,
  Statistic,
  Table,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Tour,
  Tree,
  Typography,

  // Feedback
  Alert,
  Drawer,
  Modal,
  Popconfirm,
  Progress,
  Result,
  Skeleton,
  Spin,
  Watermark,

  // Layout
  Affix,
  Breadcrumb,
  Col,
  Divider,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  Menu,
  Pagination,
  Row,
  Space,
  Splitter,
  Steps,

  // Utility
  App,
  ConfigProvider,
  Empty,
  theme as antdTheme,
} from "antd";

// Types
export type { ThemeMode, ThemeState, RejoiceProviderProps } from "./types";
