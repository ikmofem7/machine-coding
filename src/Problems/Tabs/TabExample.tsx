import { useState } from "react";
import { Tab, TabPane, Tabs } from "./Tabs";

const TabExample = () => {
  const [value, setValue] = useState<string | null | undefined>();
  const handleValueChange = (id?: string | null) => {
    console.log({ id });
    setValue(id);
  };
  return (
    <>
      <Tabs onChange={handleValueChange} value={value} defaultActiveTab={"2"}>
        <div>
          <Tab id={"1"}>Tab 1</Tab>
          <Tab id={"2"}>Tab 2</Tab>
          <Tab id={"3"}>Tab 3</Tab>
        </div>
        <div>
          <TabPane id="1">Content 1</TabPane>
          <TabPane id="2">Content 2</TabPane>
          <TabPane id="3">Content 3</TabPane>
        </div>
      </Tabs>
    </>
  );
};

export { TabExample };
