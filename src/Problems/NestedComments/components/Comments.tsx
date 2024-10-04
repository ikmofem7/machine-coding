import { useState } from "react";
import { Comments } from "../type";
import "./index.css";
type Props = {
  comments: Comments;
  handleAddReply: (newComment: Comments, commentId: string) => void;
};

const Comments = (props: Props) => {
  const { comments, handleAddReply } = props;
  const [isReply, setIsReply] = useState<boolean>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputReply = (e: any) => {
    if (e.key === "Enter" && e.target?.value) {
      handleAddReply(
        {
          id: Date.now().toString(),
          content: e.target?.value,
          name: "Dummy user",
        },
        comments?.id
      );
      setIsReply(false);
    }
  };

  return (
    <div className="comment-conatiner">
      <p>Name: {comments.name}</p>
      <div className="name-wrapper">
        <p>{comments.content}</p>
        <button onClick={() => setIsReply((prev) => !prev)}>
          {isReply ? "Cancel" : "Reply"}
        </button>
      </div>
      <div>
        {isReply ? (
          <input type="sss" autoFocus onKeyDown={handleInputReply} />
        ) : null}
      </div>

      <div className="" style={{ marginLeft: 12 }}>
        {comments?.replies?.map((reply) => {
          return (
            <Comments
              comments={reply}
              key={reply.id}
              handleAddReply={handleAddReply}
            />
          );
        })}
      </div>
    </div>
  );
};

export { Comments };
