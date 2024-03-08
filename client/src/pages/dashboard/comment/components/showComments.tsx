import { FC, ReactNode, useState } from "react";
import { SelectedComment } from "../../../../store/server/comment/interface";
import { useNavigate } from "react-router-dom";
import NewComment from "./newComment";
import { useAuthSlice } from "../../../../store/client/authslice";
// import { useReplyComment } from "../../../../store/server/comment/mutation";

interface ShowCommentProps {
  comment: SelectedComment;
  children?: ReactNode;
  replycmt: SelectedComment[];
  show?: boolean;
  setReplycmt: (replycmt: SelectedComment[]) => void;
}

const ShowComments: FC<ShowCommentProps> = ({
  comment,
  children,
  replycmt,
  setReplycmt,
  show,
}) => {
  const [reply, setReply] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuthSlice();
  // const replyComment = useReplyComment();
  const handleReply = (body: string) => {
    if (!auth?.access_token || !auth.user) return;
    const data = {
      user: auth.user,
      content: body,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      reply_user: comment.user,
      comment_root: comment.id,
      createdAt: new Date().toISOString(),
    };

    console.log(data);
    setReply(false);
    setReplycmt([data, ...replycmt]);

    // const data = {
    //   user: auth.user,
    //   content: body,
    //   blog_id: comment.blog_id,
    //   blog_user_id: comment.blog_user_id,
    //   reply_user: comment.user,
    //   comment_root: comment.comment_root || comment.id,
    //   createdAt: new Date().toISOString(),
    // };

    // setReplycmt([...replycmt, data]);
    // replyComment.mutate(data);

    // setReply(false);
  };

  return (
    <div className=" flex gap-3 flex-col">
      <div className=" flex gap-5 ">
        <div className=" space-y-2">
          <div className=" flex gap-5 items-center justify-center">
            <img
              alt={comment.blog_id}
              className=" w-16 rounded-full  cursor-pointer self-center "
              src={`${comment?.user.avatar}`}
              onClick={() => navigate(`/profile?userId=${comment?.user._id}`)}
            />
            <div>
              <span
                onClick={() => navigate(`/profile?userId=${comment?.user._id}`)}
                className=" hover:underline hover:text-primary-focus mb-4 inline-block text-primary cursor-pointer duration-150 transition"
              >
                {comment?.user.name}
              </span>
              {show && <h1>Reply To</h1>}

              <div
                className=" p-3 bg-base-300 rounded-md w-[500px]"
                dangerouslySetInnerHTML={{
                  __html: comment?.content,
                }}
              />

              <div className=" w-full flex justify-between">
                <small className=" text-xs">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
                <span
                  className=" text-end hover:underline duration-150 transition cursor-pointer"
                  onClick={() => setReply(!reply)}
                >
                  {reply ? "Cancel" : "Reply"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-20">{children}</div>
      <div className=" self-center">
        {reply && <NewComment handleComment={handleReply} />}
      </div>
    </div>
  );
};

export default ShowComments;
