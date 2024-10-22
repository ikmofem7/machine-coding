type Bucket = {
  id: string;
  title: string;
  taskIds?: string[];
};

type Task = {
  id: string;
  title: string;
};

export { Task, Bucket };
