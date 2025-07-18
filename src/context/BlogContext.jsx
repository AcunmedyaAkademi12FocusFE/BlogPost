import { createContext, useState } from "react";

const BlogCentext = createContext();

export function BlogProvider({ children }) {

  const [posts, setPosts] = useState([]); 
  const [userPosts, setUserPosts] = useState([]);
  const [pageLimit, setPageLimit] = useState(10);

  function loadMorePosts() {
    setPageLimit((prev) => prev + 10);
  }

  function addNewPost(newPost) {
    setUserPosts((prevPosts) => [newPost, ...prevPosts]); 
  }

  return (
    <BlogCentext.Provider
      value={{ posts, setPosts, pageLimit, loadMorePosts, userPosts, addNewPost }}
    >
      {children}
    </BlogCentext.Provider>
  )
}

export default BlogCentext;