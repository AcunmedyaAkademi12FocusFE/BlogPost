import { useState } from "react";
import CommentBox from "./CommentBox";

export default function BlogPost({ post }) {
  const [likes, setLikes] = useState(post.reactions?.likes || 0);
  const [dislikes, setDislikes] = useState(post.reactions?.dislikes || 0);

  function handleLike() {
    setLikes(function (prev) {
      return prev + 1;
    })
  }

  function handleDislike() {
    setDislikes(function (prev) {
      return prev + 1;
    })
  }

  return (
    <div className="blog-post">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <div className="reactions">
        <button className="like-btn" onClick={handleLike}>👍🏼 {likes}</button>
        <button className="dislike-btn" onClick={handleDislike}>👎🏼 {dislikes}</button>
      </div>
      <CommentBox postId={post.id} />
    </div>
  )
}