import UserImg from "./UserImg";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import React, { useRef } from "react";
import { addComment, addReply } from "../rtk/slices/commentsSlice";
import { UserType } from "../types/userType";
import { CommentType } from "../types/commentType";

interface ReplyPropType {
  mode: "reply" | "send";
  id?: number;
  user?: UserType;
  setShowReplies?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Reply = ({ mode, id, user, setShowReplies }: ReplyPropType) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.user);
  const replyRef = useRef<HTMLTextAreaElement>(null);

  const handelClick = (): void => {
    if (mode === "reply" && replyRef.current?.value) {
      const newReply: CommentType = {
        id: new Date().getTime(),
        content: replyRef.current.value as string,
        createdAt: new Date().getTime(),
        score: 0,
        replyingTo: user?.username as string,
        user: currentUser,
      };
      dispatch(addReply({ reply: newReply, id: id as number }));
      setShowReplies?.(false);
    } else {
      if (mode === "send" && replyRef.current?.value) {
        const newComment: CommentType = {
          id: new Date().getTime(),
          content: replyRef.current.value as string,
          createdAt: new Date().getTime(),
          score: 0,
          user: currentUser,
          replies: [],
        };
        dispatch(addComment(newComment));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
        replyRef.current.value = "";
      }
    }
  };
  return (
    <>
      <div className="flex gap-8 bg-neutral-white max-sm:hidden  items-start py-4 px-6 rounded-md shadow-md">
        <UserImg img={currentUser.image.png} />
        <textarea ref={replyRef} />
        <button
          onClick={handelClick}
          className="text-primary-moderateBlue flex items-center gap-1 font-bold"
        >
          {mode === "reply" ? "Reply" : "Send"}
        </button>
      </div>

      <div className="bg-neutral-white py-4 space-y-2 sm:hidden px-6 rounded-md shadow-md">
        <textarea ref={replyRef} />
        <div className="flex justify-between items-center">
          <UserImg img={currentUser.image.png} />
          <button
            onClick={handelClick}
            className="text-primary-moderateBlue flex items-center gap-1 font-bold"
          >
            {mode === "reply" ? "Reply" : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Reply;
