/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, MouseEvent } from "react";
import "./index.css";
import { Explorer } from "../types";

type Props = {
  explorer: Explorer;
  handleAddTree: (
    id: Explorer["id"],
    item: Explorer["name"],
    isFolder: boolean
  ) => void;
  handleDeleteElement: (id: Explorer["id"]) => void;
};

const Folder = (props: Props) => {
  const { explorer, handleAddTree, handleDeleteElement } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: boolean;
  }>({
    visible: false,
    isFolder: false,
  });

  const handleToggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleUpdateExplorer = (isFolder: boolean) => (e: MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(true);
    setShowInput({ visible: true, isFolder });
  };

  const addElement = (e: any) => {
    if (e.key === "Enter" && e?.target?.value) {
      handleAddTree(explorer.id, e.target.value, showInput?.isFolder);
      setShowInput({ visible: false, isFolder: false });
    }
  };
  if (!Object.keys(explorer).length) {
    return null;
  }

  if (explorer.isFolder) {
    return (
      <div>
        <button className="folder" onClick={handleToggleExpand}>
          <div>
            <span> {explorer.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteElement(explorer?.id);
              }}
            >
              Delete
            </button>
          </div>
          <div>
            <button onClick={handleUpdateExplorer(true)}>+Folder</button>
            <button onClick={handleUpdateExplorer(false)}>+File</button>
          </div>
        </button>
        <div style={{ display: isExpanded ? "block" : "none", marginLeft: 12 }}>
          {showInput?.visible && (
            <div>
              {showInput?.isFolder ? <>📁</> : <>📃</>}
              <input
                type="text"
                onBlur={() => setShowInput({ visible: false, isFolder: false })}
                autoFocus
                onKeyDown={addElement}
              />
            </div>
          )}
          {explorer.items?.map((item) => {
            return (
              <Folder
                explorer={item}
                key={item.id}
                handleAddTree={handleAddTree}
                handleDeleteElement={handleDeleteElement}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return <div className="file">⬜️{explorer?.name}</div>;
};

export { Folder };
