import Comment from "./components/comment/Comment";
import Reply from "./components/Reply";
import { useAppSelector } from "./hooks/useRedux";

const App = () => {
  const { comments } = useAppSelector((state) => state.comments);
  return (
    <div className="min-h-screen pt-4 pb-40 bg-neutral-veryLightGray">
      <div className="max-w-[700px] w-[95%] mx-auto space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>

      <div className="max-w-[700px] w-full left-1/2 translate-x-[-50%] fixed bottom-0">
        <Reply  mode="send" />
      </div>
    </div>
  );
};

export default App;
