import { Comments } from "../type";

const useComments = () => {
  const addReply = (
    comments: Comments[],
    newReply: Comments,
    commentId: string
  ) => {
    const updatedComments = comments?.map((comment) => {
      if (comment.id === commentId) {
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies.push(newReply);
      } else {
        if (!comment?.replies) comment.replies = [] as Comments[];
        const replies = addReply(comment.replies, newReply, commentId);
        comment.replies = replies;
      }
      return comment;
    });
    return updatedComments;
  };

  const addComment = (comments: Comments[], newReply: Comments) => {
    const updatedComments = [...comments, newReply];
    return updatedComments;
  };

  return { addReply, addComment };
};
export { useComments };
