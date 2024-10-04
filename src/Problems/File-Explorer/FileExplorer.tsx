import { useState } from "react";
import { Folder } from "./components";
import data from "./data.json";
import { Explorer } from "./types";
import { useAddItems } from "./hooks";

const FileExplorer = () => {
  const [explorer, setExplorer] = useState<Explorer>(data);
  const { insertNode, deleteNode } = useAddItems();
  const handleAddTree = (
    id: Explorer["id"],
    item: Explorer["name"],
    isFolder: boolean
  ) => {
    console.log({ id, item, isFolder });
    const latestTree = insertNode(explorer, id, item, isFolder);
    setExplorer(latestTree);
  };

  const handleDeleteElement = (id: Explorer["id"]) => {
    console.log({ id });

    const latestTree = deleteNode(explorer, id);
    setExplorer(latestTree);
  };

  return (
    <Folder
      explorer={explorer}
      handleAddTree={handleAddTree}
      handleDeleteElement={handleDeleteElement}
    />
  );
};

export { FileExplorer };
