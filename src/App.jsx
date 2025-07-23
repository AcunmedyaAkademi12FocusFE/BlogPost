import { useEffect, useState } from 'react';
import './App.css'
import AuthBox from './components/AuthBox';
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { BlogProvider } from "./context/BlogContext";
import RegisterBox from './components/RegisterBox';

function LoginPage({ onLogin }) {
  return (
    <>
      <AuthBox onLogin={onLogin} />
      <div className="auth-link">
        <p>Hesabın var mı ? <a href="#/register">Kayıt Ol</a></p>
      </div>
    </>
  )
}

function RegisterPage() {
  return (
    <>
      <RegisterBox onRegister={() => { window.location.hash = '/login'; }} />
      <div className="auth-link">
        <p>Zaten bir hesabın var mı ? <a href="#/login">Giriş Yap</a></p>
      </div>
    </>
  )
}

const routes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
];

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/login');

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if(user) {
        const parsed = JSON.parse(user);
        setLoggedIn(true);
        setUsername(parsed.username);
      }
    } catch (e) {
      localStorage.removeItem('user');
      setLoggedIn(false);
      setUsername('');
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash.replace('#', '') || '/login');
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onhashchange);
  }, []);

  function handleLoginSuccess(user) {
    setLoggedIn(true);
    setUsername(user.username);
    // console.log('test');
    localStorage.user = JSON.stringify(user);
  }

  function handleLogout() {
    setLoggedIn(false);
    setUsername('');
    localStorage.removeItem('user');
  }

  const CurrentRoute = routes.find(r => r.path === route).component || LoginPage;

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
          <CurrentRoute onLogin={handleLoginSuccess} />
        )}
      </BlogProvider>
    </>
  )
}

// TODO
// register form eklenecek - done
// localStorage eklenecek -> done 
// routes konusu anlatıldıktan sonra revize olacak -> done

// Öğrenci ödevi :)

// kullanıcı profil sayfası olabilir
// kullanıcı kendi post'larını düzenleyebilmeli ya da silebilmeli
// blog detay - blog title + body altında da yorumlar + varsa img gösterilebilir