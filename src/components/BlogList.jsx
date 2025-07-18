import { useContext, useEffect } from "react"
import BlogCentext from "../context/BlogContext"
import BlogPost from "./BlogPost";

export default function BlogList() {

  const { posts, setPosts, pageLimit, loadMorePosts, userPosts } = useContext(BlogCentext);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetch(`https://dummyjson.com/posts?limit=${pageLimit}`).then(r => r.json());
      setPosts(data.posts);
    }
    fetchPosts();
  }, [pageLimit, setPosts]);

  return(
    <div className="blog-list">
      {userPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}

      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}

      <button 
        className="load-more-btn" 
        onClick={loadMorePosts}
      >Daha Fazla</button>
    </div>
  )
}