import { useState } from "react";
import "./index.css";
type Props = {
  onAddElement: (title: string) => void;
  title: string;
  className?: string;
};

const AddElement = (props: Props) => {
  const { onAddElement, title, className } = props;
  const [isAddState, setIsAddState] = useState<boolean>(false);
  const [inputField, setInputField] = useState<string>("");
  const handleAdd = () => {
    onAddElement(inputField);
    setIsAddState(false);
    setInputField("");
  };

  if (isAddState) {
    return (
      <div className={`add-element-container ${className}`}>
        <textarea
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
          rows={4}
          className="textArea"
        />
        <button onClick={handleAdd} className="button">
          {title}
        </button>
      </div>
    );
  }

  return (
    <div className={`add-element-container ${className}`}>
      <button onClick={() => setIsAddState(true)} className="button">
        {title}
      </button>
    </div>
  );
};

export { AddElement };
