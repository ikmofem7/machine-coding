import { Explorer } from "../types";

const useAddItems = () => {
  const insertNode = (
    tree: Explorer,
    id: Explorer["id"],
    name: Explorer["name"],
    isFolder: boolean
  ): Explorer => {
    if (tree.id == id && tree.isFolder) {
      if (!tree?.items) tree.items = [];
      tree.items?.unshift({
        id: Date.now().toString(),
        name,
        isFolder,
      });
      return tree;
    }
    if (tree.items) {
      tree = {
        ...tree,
        items: tree.items.map((element) =>
          insertNode(element, id, name, isFolder)
        ),
      };
    }

    return { ...tree };
  };
  const deleteNode = (tree: Explorer, id: Explorer["id"]): Explorer => {
    if (tree.id === id) {
      tree = {} as Explorer;
      return tree;
    }
    if (tree.items) {
      tree = {
        ...tree,
        items: tree?.items?.map((item) => deleteNode(item, id)),
      };
    }
    return tree;
  };

  return { insertNode, deleteNode };
};

export { useAddItems };
