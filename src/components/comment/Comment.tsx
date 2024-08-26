import { CommentType } from "../../types/commentType";
import CommentScore from "./CommentScore";
import CommentHeader from "./CommentHeader";
import CommentContent from "./CommentContent";
import { useRef, useState } from "react";
import Reply from "../Reply";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { editComRep } from "../../rtk/slices/commentsSlice";
import CommentTools from "./CommentTools";
import ReplyBtn from "./ReplyBtn";

const Comment = ({
  content,
  createdAt,
  id,
  replies = [],
  score,
  user,
  replyingTo,
  parentId,
}: CommentType) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.user);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isEdting, setIsEditing] = useState<boolean>(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const handelShowReply = (): void => {
    setShowReplies(!showReplies);
  };
  const handeShowlEdit = (): void => {
    setIsEditing(!isEdting);
  };

  const handelEdit = (): void => {
    if (contentRef.current?.value === content) {
      setIsEditing(!isEdting);
      return;
    }
    dispatch(
      editComRep({
        id: id,
        text: contentRef.current?.value as string,
      })
    );
    setIsEditing(!isEdting);
  };
  return (
    <>
      <div className="flex gap-8 bg-neutral-white w-full  items-start py-4 px-6 rounded-md shadow-md">
        <div className="max-sm:hidden">
          <CommentScore username={user.username} score={score} id={id} />
        </div>
        <div className="space-y-2 w-full">
          <CommentHeader
            handelEdit={handeShowlEdit}
            id={id}
            handelShowReply={handelShowReply}
            user={user}
            createdAt={createdAt}
          />
          {isEdting ? (
            <div className="w-full">
              <textarea ref={contentRef} defaultValue={content} />
              <button
                onClick={handelEdit}
                className="bg-primary-moderateBlue text-neutral-white py-2 px-4 block ms-auto w-fit rounded-md"
              >
                Edit
              </button>
            </div>
          ) : replyingTo ? (
            <CommentContent content={content} replyingTo={replyingTo} />
          ) : (
            <CommentContent content={content} />
          )}

          <div className="sm:hidden flex justify-between items-center">
            <CommentScore username={user.username} score={score} id={id} />

            {currentUser.username === user.username ? (
              <CommentTools id={id} handelEdit={handeShowlEdit} />
            ) : (
              <ReplyBtn handelShowReply={handelShowReply} />
            )}
          </div>
        </div>
      </div>
      {showReplies && (
        <div className="my-2">
          <Reply
            mode={"reply"}
            setShowReplies={setShowReplies}
            id={parentId || id}
            user={user}
          />
        </div>
      )}
      {replies.length > 0 && (
        <div className="md:ps-16  max-sm:ps-4 sm:ps-8">
          <div className="space-y-3 w-full relative before:absolute before:top-0 before:rounded-full before:left-[-4%] before:w-[2px] before:h-full before:bg-neutral-lightGray">
            {replies.map((reply) => (
              <Comment key={reply.id} {...reply} parentId={id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
