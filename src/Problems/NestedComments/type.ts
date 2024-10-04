type Comments = {
  id: string;
  content: string;
  name: string;
  replies?: Comments[];
};

export { Comments };
