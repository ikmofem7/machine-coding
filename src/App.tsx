import "./App.css";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionToggle,
} from "./Problems";

function App() {
  return (
    <Accordion defaultActiveKey="2" collapsible>
      <AccordionItem id="1">
        <AccordionToggle>Toggle 1</AccordionToggle>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem id="2">
        <AccordionToggle>Toggle 2</AccordionToggle>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default App;
