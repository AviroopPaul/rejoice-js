// React core (hooks + DOM)
export { useState, useEffect, useLayoutEffect, useReducer, useRef,
  useContext, createContext, useMemo, useCallback, useId,
  useTransition, useDeferredValue, useSyncExternalStore,
  memo, lazy, Suspense, StrictMode, Fragment, createElement,
  forwardRef } from "react";
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

// Ant Design (key components — tree-shakeable)
export { Button, Input, Select, Table, Form, Modal, Drawer, Layout,
  Menu, Tabs, Card, Badge, Tag, Tooltip, Dropdown, DatePicker,
  Upload, Spin, Progress, Slider, Switch, Checkbox, Radio,
  Typography, Space, Row, Col, List, Avatar, Divider, Breadcrumb,
  Steps, Alert, Result, Empty, Skeleton, ConfigProvider,
  theme as antdTheme } from "antd";

// Types
export type { ThemeMode, ThemeState, RejoiceProviderProps } from "./types";
