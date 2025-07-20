import { useState } from 'react';
import './App.css'
import AuthBox from './components/AuthBox';
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { BlogProvider } from "./context/BlogContext";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  function handleLoginSuccess(user) {
    setLoggedIn(true);
    setUsername(user.username);
    // console.log('test');
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <>
      <BlogProvider>
        {isLoggedIn ? (
          <div className="app">
            <div className="app-header">
              <h1>Blog Uygulaması</h1>
              <button onClick={handleLogout} className="logout-btn">
                {username} &ndash; Çıkış Yap
              </button>
            </div>
            <BlogForm />
            <BlogList />
          </div>
        ) : (
          <AuthBox onLogin={handleLoginSuccess} />
        )}
      </BlogProvider>
    </>
  )
}

// TODO
// localStorage eklenecek
// register form eklenecek
// routes konusu anlatıldıktan sonra revize olacak
// kullanıcı profil sayfası olabilir
// kullanıcı kendi post'larını düzenleyebilmeli ya da silebilmeli
// blog detay - blog title + body altında da yorumlar + varsa img gösterilebilir