import { Form } from "./components";
import { GRAPHIC_URL } from "./constant";
import "./index.css";
const AutoComplete = () => {
  return (
    <div className="App">
      <div className="auto-complete-container">
        <img src={GRAPHIC_URL} alt="Payment Graphic" />
        <Form />
      </div>
    </div>
  );
};

export { AutoComplete };
