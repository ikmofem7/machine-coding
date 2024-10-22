import { useReducer } from "react";
import { Bucket, Task } from "../type";
import { cloneDeep } from "../utils";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

const initialState: NormalizedState = {
  buckets: {
    "bucket-1": {
      id: "bucket-1",
      title: "TODO",
      taskIds: ["task-1", "task-4"],
    },
    "bucket-2": {
      id: "bucket-2",
      title: "Inprogress",
      taskIds: ["task-2", "task-3", "task-5", "task-6"],
    },
  },
  tasks: {
    "task-1": { id: "task-1", title: "Task 1" },
    "task-2": { id: "task-2", title: "Task 2" },
    "task-3": { id: "task-3", title: "Task 3" },
    "task-4": { id: "task-4", title: "Task 4" },
    "task-5": { id: "task-5", title: "Task 5" },
    "task-6": { id: "task-6", title: "Task 6" },
  },
  bucketOrder: ["bucket-1", "bucket-2"],
};

type Action =
  | { type: "ADD_BUCKET"; payload: Bucket }
  | {
      type: "DROP_BUCKET";
      payload: {
        draggableId: string;
        sourceIndex: number;
        destinationIndex: number;
      };
    }
  | {
      type: "DROP_TASKS";
      payload: {
        draggableId: string;
        source: { droppableId: string; index: number };
        destination: DraggableLocation | null | undefined;
      };
    }
  | {
      type: "ADD_TASK";
      payload: Task & { bucketId: string };
    };

const reducer = (state: NormalizedState, action: Action): NormalizedState => {
  const { type, payload } = action;
  const updatedState = cloneDeep(state) as NormalizedState;
  switch (type) {
    case "ADD_BUCKET": {
      const { id } = payload;
      updatedState.bucketOrder.push(id);
      updatedState.buckets[id] = payload;
      return updatedState;
    }
    case "DROP_BUCKET": {
      const { destinationIndex, sourceIndex } = payload;
      const bucketOrder = updatedState.bucketOrder;
      [bucketOrder[destinationIndex], bucketOrder[sourceIndex]] = [
        bucketOrder[sourceIndex],
        bucketOrder[destinationIndex],
      ];
      return cloneDeep(updatedState) as NormalizedState;
    }
    case "DROP_TASKS": {
      const { source, destination } = payload;
      const sourceId = source.droppableId,
        sourceIndex = source?.index,
        destinationId = destination?.droppableId || "",
        destinationIndex = destination?.index || 0;

      const removedTasks = updatedState.buckets[sourceId]?.taskIds?.splice(
        sourceIndex,
        1
      );
      if (removedTasks) {
        updatedState.buckets[destinationId]?.taskIds?.splice(
          destinationIndex,
          0,
          ...removedTasks
        );
      }
      return cloneDeep(updatedState) as NormalizedState;
    }
    case "ADD_TASK": {
      const { title, id, bucketId } = payload;
      updatedState.tasks[id] = { id, title };
      updatedState.buckets[bucketId].taskIds?.push(id);
      console.log({ updatedState });
      return cloneDeep(updatedState) as NormalizedState;
    }
    default:
      return state;
  }
};

type NormalizedState = {
  buckets: { [id: string]: Bucket };
  tasks: { [id: string]: Task };
  bucketOrder: string[];
};

const useBoard = () => {
  const [board, dispatch] = useReducer(reducer, initialState);

  const addBuckets = (payload: Bucket) => {
    dispatch({ type: "ADD_BUCKET", payload });
  };

  const dragBuckets = (result: DropResult) => {
    const { draggableId, destination, source, type } = result;
    const sourceIndex = source.index || 0,
      destinationIndex = destination?.index || 0;
    if (type === "Board") {
      if (
        destinationIndex >= 0 &&
        sourceIndex >= 0 &&
        destinationIndex !== sourceIndex
      ) {
        const payload = { draggableId, sourceIndex, destinationIndex };
        dispatch({ type: "DROP_BUCKET", payload });
      }
    } else {
      const payload = { source, destination, draggableId };
      if (destination) {
        dispatch({ type: "DROP_TASKS", payload });
      }
    }
  };

  const addTask = (payload: Task & { bucketId: string }) => {
    console.log({ payload });
    dispatch({ type: "ADD_TASK", payload });
  };

  return {
    board,
    addBuckets,
    dragBuckets,
    addTask,
  };
};

export { useBoard };
