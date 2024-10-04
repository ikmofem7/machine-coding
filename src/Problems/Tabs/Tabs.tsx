import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { TabContext } from "./TabContext";

type Props = {
  defaultActiveTab?: string | null;
  children: ReactNode;
  value?: string | null;
  onChange?: (activeTab?: string | null) => void;
};

type TabProps = {
  id: string;
  children: ReactNode;
};

type TabPaneProps = {
  id: string;
  children: ReactNode;
};

const Tab = (props: TabProps) => {
  const { id, children } = props;
  const { handleActiveTab } = useContext(TabContext);

  return <button onClick={() => handleActiveTab(id)}>{children}</button>;
};

const TabPane = (props: TabPaneProps) => {
  const { id, children } = props;
  const { activeTab } = useContext(TabContext);

  if (id != activeTab) return null;
  return <div>{children}</div>;
};

const Tabs = (props: Props) => {
  const { defaultActiveTab, children, onChange, value } = props;
  const [activeTab, setActiveTab] = useState<string | null | undefined>(
    defaultActiveTab
  );
  const handleActiveTab = useCallback((tabId?: string | null) => {
    setActiveTab(tabId);
    onChange && onChange(tabId);
  }, []);

  const contextValue = useMemo(() => {
    const initial = { activeTab, handleActiveTab };
    if (value) {
      initial.activeTab = value;
    }
    return initial;
  }, [activeTab, handleActiveTab]);

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};

export { Tabs, Tab, TabPane };
