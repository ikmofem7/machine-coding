import React, { FC, ReactNode, useState } from "react";
import { AccordionContext, useAccordion } from "./AccordionContext";

type AccordionToggleProps = {
  children: ReactNode;
  id?: string;
  activePanel?: string;
  handleOnclick?: (id: string) => void;
};

const AccordionToggle: FC<AccordionToggleProps> = ({ children, id }) => {
  const context = useAccordion();
  const handleOnclick = context?.handleOnclick;
  return (
    <button
      style={{
        width: "100%",
        height: "30px",
        border: "1px solid #ebebeb",
        textAlign: "left",
        padding: "0 20px",
      }}
      onClick={() => handleOnclick && handleOnclick(id ?? "")}
    >
      {children}
    </button>
  );
};
const AccordionPanel: FC<AccordionToggleProps> = ({ children, id }) => {
  const context = useAccordion();
  const activePanel = context?.activePanel;
  if (id !== activePanel) return null;
  return (
    <div
      style={{
        border: "1px solid #ebebeb",
        textAlign: "left",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
};
type AccordionItemProps = {
  children: ReactNode;
  id?: string;
  activePanel?: string;
  handleOnclick?: (id: string) => void;
};
const AccordionItem: FC<AccordionItemProps> = ({ children, id }) => {
  return (
    <div>
      {React.Children.map(children, (child2) => {
        return React.cloneElement(child2, { id });
      })}
    </div>
  );
};

type AccordionProps = {
  children: ReactNode;
  defaultActiveKey?: string;
  collapsible?: boolean;
};
const Accordion: FC<AccordionProps> = ({
  children,
  collapsible,
  defaultActiveKey,
}) => {
  const [activePanel, setActivePanel] = useState<string | undefined>(
    defaultActiveKey
  );
  const handleOnclick = (id: string) => {
    if (collapsible && activePanel === id) {
      setActivePanel(undefined);
      return;
    }
    setActivePanel(id);
  };
  return (
    <AccordionContext.Provider value={{ activePanel, handleOnclick }}>
      {children}
    </AccordionContext.Provider>
  );
};

export { Accordion, AccordionItem, AccordionPanel, AccordionToggle };
