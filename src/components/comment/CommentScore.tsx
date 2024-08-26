import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { addScore, removeScore } from "../../rtk/slices/commentsSlice";
interface CommentScoreProps {
  score: number;
  id: number;
  username: string;
}
const CommentScore = ({ score, id, username }: CommentScoreProps) => {
  const dispach = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.user);
  const [addedScore, setAddedScore] = useState<boolean>(false);
  const [removedScore, setRemovedScore] = useState<boolean>(false);

  const handelAddScore = (): void => {
    if (username === currentUser?.username) {
      return;
    }
    if (!addedScore) {
      dispach(addScore(id));
      setAddedScore(true);
      setRemovedScore(false);
    }
  };

  const handelRemoveScore = (): void => {
    if (username === currentUser?.username) {
      return;
    }

    if (!removedScore) {
      dispach(removeScore(id));
      setAddedScore(false);
      setRemovedScore(true);
    }
  };
  return (
    <div className="bg-neutral-veryLightGray w-fit p-2 max-sm:text-sm gap-2 rounded-lg flex flex-col items-center px-4 max-sm:flex-row  max-sm:gap-4">
      <button
        onClick={handelAddScore}
        className="text-primary-lightGrayishBlue transition-colors hover:text-primary-moderateBlue font-semibold"
      >
        +
      </button>

      <span className="text-primary-moderateBlue font-semibold">{score}</span>

      <button
        onClick={handelRemoveScore}
        className="text-primary-lightGrayishBlue transition-colors hover:text-primary-moderateBlue font-semibold"
      >
        -
      </button>
    </div>
  );
};

export default CommentScore;
