import React, { useContext } from "react";

type AccordionContext = {
  activePanel?: string;
  handleOnclick?: (id: string) => void;
};

const AccordionContext = React.createContext<AccordionContext | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error("Must be used with in context");
  }
  return context;
};

export { AccordionContext, useAccordion };
