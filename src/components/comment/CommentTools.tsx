import { useAppDispatch } from "../../hooks/useRedux";
import { removeComRep } from "../../rtk/slices/commentsSlice";
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";

const CommentTools = ({
  id,
  handelEdit,
}: {
  id: number;
  handelEdit: () => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => dispatch(removeComRep(id))}
        className="flex gap-1 items-center text-primary-softRed"
      >
        <FaTrash className="text-md max-sm:text-sm" />
        Delete
      </button>
      <button
        onClick={handelEdit}
        className="flex gap-1 items-center text-primary-moderateBlue"
      >
        <PiPencilSimpleFill className="text-xl max-sm:text-md" />
        Edit
      </button>
    </div>
  );
};

export default CommentTools;
