import { useState, KeyboardEvent } from "react";
import { List } from "../type";
import "./index.css";

interface Props extends List {
  handleItemStatusChange: (id: List["id"]) => void;
  handleRemoveItem: (id: List["id"]) => void;
  handleUpdateItem: (updatedItem: List) => void;
}
const Item = (props: Props) => {
  const {
    id,
    title,
    status,
    handleItemStatusChange,
    handleRemoveItem,
    handleUpdateItem,
  } = props;
  const [isEditable, setIsEditable] = useState<boolean>();

  const isCompleted = status === "completed";
  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e;
    if (key.toLowerCase() == "enter") {
      const title = (target as HTMLInputElement)?.value;
      handleUpdateItem({ id, title, status });
      setIsEditable(false);
    }
  };
  if (isEditable) {
    return (
      <li className="item">
        <input
          type="text"
          name={title}
          id={id.toString()}
          defaultValue={title}
          className="input"
          onBlur={() => {
            setIsEditable(false);
          }}
          autoFocus
          onKeyDown={handleInput}
        />
      </li>
    );
  }

  return (
    <li
      className="item"
      onDoubleClick={() => {
        setIsEditable(true);
      }}
    >
      <div>
        <input
          type="checkbox"
          name={title}
          id={id.toString()}
          checked={isCompleted}
          onChange={() => handleItemStatusChange(id)}
          onDoubleClick={(e) => {
            e.stopPropagation();
          }}
          className="checkbox"
        />
        <span>{title}</span>
      </div>
      <button
        onClick={() => handleRemoveItem(id)}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
        className="button"
      >
        x
      </button>
    </li>
  );
};

export { Item };
