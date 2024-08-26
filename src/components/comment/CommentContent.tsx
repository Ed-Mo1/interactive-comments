interface CommentContentProps {
  content: string;
  replyingTo?: string;
}
const CommentContent = ({ content, replyingTo }: CommentContentProps) => {
  return (
    <p className="text-neutral-grayishBlue">
      {replyingTo && (
        <span className="text-primary-moderateBlue font-bold">@{replyingTo} </span>
      )}
      {content}
    </p>
  );
};

export default CommentContent;
