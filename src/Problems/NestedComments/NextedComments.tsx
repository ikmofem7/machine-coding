import { useState, ChangeEvent } from "react";
import { Comments } from "./components";
import data from "./data.json";
import { Comments as TypeComments } from "./type";
import { useComments } from "./hooks";

const NextedComments = () => {
  const [comments, setComments] = useState<TypeComments[]>(data);
  const { addReply, addComment } = useComments();
  const [comment, setComment] = useState<string>("");

  const handleAddReply = (newComment: TypeComments, commentId: string) => {
    const latestComments = addReply(comments, newComment, commentId);
    setComments(latestComments);
  };

  const handleReply = () => {
    const newComment: TypeComments = {
      content: comment,
      name: "Comment user",
      id: Date.now().toString(),
    };
    const updatedComments = addComment(comments, newComment);
    setComments(updatedComments);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <div>
      <div>
        <input type="input" onChange={handleInputChange} />
        <button onClick={handleReply}>Reply</button>
      </div>
      {comments?.map((comment) => (
        <Comments
          comments={comment}
          key={comment?.id}
          handleAddReply={handleAddReply}
        />
      ))}
    </div>
  );
};

export { NextedComments };
