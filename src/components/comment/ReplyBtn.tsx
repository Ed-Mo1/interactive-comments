import { BsFillReplyFill } from "react-icons/bs";

const ReplyBtn = ({ handelShowReply }: { handelShowReply: () => void }) => {
  return (
    <button
      onClick={handelShowReply}
      className="flex gap-2 items-center text-primary-moderateBlue"
    >
      <BsFillReplyFill className="text-xl" />
      Reply
    </button>
  );
};

export default ReplyBtn;
