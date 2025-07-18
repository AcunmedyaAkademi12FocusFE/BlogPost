import { useContext, useState } from "react"
import BlogCentext from "../context/BlogContext"

export default function BlogForm() {

  const { addNewPost } = useContext(BlogCentext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    const newPost = {
      id: Date.now(),
      title: formObj.title,
      body: formObj.body,
      reactions: { 
        like:0, 
        dislikes: 0
      }
    }
    addNewPost(newPost);

    setTitle('');
    setBody('');
  }

  return(
    <form onSubmit={handleSubmit} className="blog-form">
      <input 
        name="title" 
        type="text" 
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-title-input" 
        required
      />
      <textarea 
        name="body" 
        placeholder="İçerik"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="form-body-textarea"
        required
        ></textarea>
      <button 
        className="form-submit-btn"
      >Gönder</button>
    </form>
  )
}