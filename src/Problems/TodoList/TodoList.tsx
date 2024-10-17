import { useState, KeyboardEvent, useMemo, MouseEvent } from "react";
import { List } from "./type";
import { Item } from "./components";
import "./index.css";

type CurrentListState = "all" | "active" | "completed";
const filterTodos = (
  list: List[],
  currentListState: CurrentListState
): List[] => {
  switch (currentListState) {
    case "active":
      return list.filter((item) => item.status === "todo");
    case "completed":
      return list.filter((item) => item.status === "completed");
    default:
      return list;
  }
};

const buttons = [
  {
    label: "All",
    id: "all",
  },
  {
    label: "Active",
    id: "active",
  },
  {
    label: "Completed",
    id: "completed",
  },
];

const TodoList = () => {
  const [list, setList] = useState<List[]>([]);
  const [currentListState, setCurrentListState] =
    useState<CurrentListState>("all");
  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e;
    if (key.toLowerCase() == "enter") {
      const title = (target as HTMLInputElement)?.value;
      setList((list) => {
        return [...list, { title, status: "todo", id: Date.now() }];
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      e.target.value = "";
    }
  };

  const handleItemStatusChange = (id: List["id"]) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        item.status = item?.status === "todo" ? "completed" : "todo";
      }
      return item;
    });
    setList(updatedList);
  };

  const handleRemoveItem = (id: List["id"]) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const handleSelectButton = () => {
    const isAllCompleted = list.every((item) => item.status === "completed");
    const getUpdatedList = (list: List[]) => {
      let updatedList = [...list];
      if (isAllCompleted) {
        updatedList = list.map((item) => ({ ...item, status: "todo" }));
      } else {
        updatedList = list.map((item) => ({ ...item, status: "completed" }));
      }
      return updatedList;
    };
    setList(getUpdatedList);
  };

  const handleUpdateItem = (updatedItem: List) => {
    const getUpdatedList = (list: List[]) => {
      return list.map((item) => {
        if (item.id == updatedItem.id) {
          return { ...updatedItem };
        }
        return item;
      });
    };
    setList(getUpdatedList);
  };

  const handleListState = (e: MouseEvent<HTMLButtonElement>) => {
    const currentListState = (e.target as HTMLButtonElement)
      .id as CurrentListState;
    setCurrentListState(currentListState);
  };

  const handleClearCompleted = () => {
    const getUpdatedList = (list: List[]) => {
      return list.filter((item) => item.status !== "completed");
    };
    setList(getUpdatedList);
  };

  const filteredList = useMemo(
    () => filterTodos(list, currentListState),
    [list, currentListState]
  );

  return (
    <div>
      <h2 className="heading">TodoList</h2>
      <div className="todo-container">
        <div className="input-container">
          <div className="down-button-wrapper">
            {Boolean(list.length) && (
              <button onClick={handleSelectButton} className="down-button">
                👇🏻
              </button>
            )}
          </div>
          <input
            placeholder="Whats needs to be done?"
            onKeyDown={handleInput}
            className="todo-input"
          />
        </div>
        {list.length ? (
          <>
            {filteredList?.length ? (
              <ul className="list">
                {filteredList?.map((item) => (
                  <Item
                    {...item}
                    key={item.id}
                    handleItemStatusChange={handleItemStatusChange}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
              </ul>
            ) : null}
            <div className="footer">
              <div>
                <p>{list.length} items left!</p>
              </div>
              <div>
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    className={`button ${
                      button.id === currentListState ? "active" : ""
                    }`}
                    id={button.id}
                    onClick={handleListState}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              <div>
                <button className="button" onClick={handleClearCompleted}>
                  Clear Completed
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export { TodoList };
