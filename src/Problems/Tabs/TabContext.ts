import React, { useContext } from "react";

const defaultValue = {
    activeTab: null,
    handleActiveTab: () => { }
}

type TabContextProps = {
    activeTab?: string | null,
    handleActiveTab: (activeTab?: string | null) => void
}

const TabContext = React.createContext<TabContextProps>(defaultValue)

const useTab = () => {
    const context = useContext(TabContext)
    return context
}

export { TabContext, useTab, TabContextProps }