import { UserType } from "../../types/userType";
import UserImg from "../UserImg";
import { calcTime } from "../../utils/calcTime";
import { useAppSelector } from "../../hooks/useRedux";
import CommentTools from "./CommentTools";
import ReplyBtn from "./ReplyBtn";

interface CommentHeaderProps {
  user: UserType;
  createdAt: string | number;
  handelShowReply: () => void;
  id: number;
  handelEdit: () => void;
}
const CommentHeader = ({
  user,
  handelEdit,
  createdAt,
  id,
  handelShowReply,
}: CommentHeaderProps) => {
  const { user: currentUser } = useAppSelector((state) => state.user);

  return (
    <div className="flex ga-2 w-full justify-between items-center">
      <div className="flex gap-3 flex-wrap items-center">
        <UserImg img={user.image.png} />

        <h4 className="text-neutral-darkBlue font-bold">{user.username}</h4>

        {user.username === currentUser?.username && (
          <h4 className="text-neutral-white bg-primary-moderateBlue  py-1 px-3 text-xs  rounded ">
            <i>You</i>
          </h4>
        )}
        <h4 className="text-neutral-grayishBlue font-normal">
          {typeof createdAt === "string" ? createdAt : calcTime(createdAt)}
        </h4>
      </div>

      {user.username === currentUser?.username && (
        <div className="max-sm:hidden">
          <CommentTools id={id} handelEdit={handelEdit} />
        </div>
      )}
      {user.username !== currentUser?.username && (
        <div className="max-sm:hidden">
          <ReplyBtn handelShowReply={handelShowReply} />
        </div>
      )}
    </div>
  );
};

export default CommentHeader;
