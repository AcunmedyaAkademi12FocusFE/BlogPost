import { useState } from "react"

export default function CommentBox({ postID }) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  function handleAddComment() {
    if (newComment.trim()) {
      setComments(function (prev) {
        return [...prev, newComment.trim()];
      });
      // setComments(''); -> hatalı kod
      setNewComment(''); /* doğru kod  */
      /* 
        setComments('') 'in sayesinde comments string olarak görünüyor ve buda 
        map fonksiyonunun çalışmamasına sebep oluyor 
        çünkü map metodu yalnızca array'lerde kullanılıyor

        handleAddComment fonksiyonu içindeki setComments('')'i 
        setNewComment('') ile değiştirdim çünkü sadece state'i sıfırlıyoruz
        böylelikle comments array olarak tutuyoruz ve map yapabiliyoruz
      */
    }
  }

  return (
    <div className="comment-box">
      <h4 className="comment-title">Yorumlar</h4>
      <ul className="comment-list">
        {comments.map((comment, i) => (
          <li key={i} className="comment-item">
            {comment}
          </li>
        ))}
      </ul>
      <div className="comment-form">
        <input 
          type="text" 
          placeholder="Yorum yaz..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input" 
        />
        <button 
          onClick={handleAddComment}
          className="comment-submit-btn"
        >Gönder</button>
      </div>
    </div>
  )
}