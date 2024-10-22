import { Task } from "./type";

function groupBy(Task: Task[]): { [status: string]: Task[] } {
  return Object.groupBy(Task, ({ status }) => status);
}

const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Array]";
};

const cloneDeep = (object: Record<string, unknown>) => {
  if (!Object.keys(object).length) return object;
  const result = isArray(object) ? [] : {};

  for (const key in object) {
    const item = object[key];
    if (typeof item === "object") {
      result[key] = cloneDeep(item);
    } else {
      result[key] = item;
    }
  }
  return result;
};

export { groupBy, cloneDeep };
