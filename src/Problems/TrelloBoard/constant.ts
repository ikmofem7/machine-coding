import { Bucket, Task } from "./type";

const defaultTask: Task[] = [
  { id: "1", title: "Change the world" },
  { id: "2", title: "Collect Feedback" },
];

const defaultBuckets: Bucket[] = [
  {
    id: "ideas",
    title: "Ideas",
    taskIds: ["1"],
  },
  {
    id: "in-progress",
    title: "Inprogress",
    taskIds: ["2"],
  },
];

export { defaultBuckets, defaultTask };
