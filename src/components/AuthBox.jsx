import { useState } from "react";

export default function AuthBox({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    // giriş yapmadan önce ls'ı kontrol eder kullanı var mı yok mu diye
    const localData = localStorage.data && JSON.parse(localStorage.data); 
    
    if (localData && 
        localData.username === formObj.username && 
        localData.password === formObj.password
      ) // uzuuuuuun bir if koşulu 
      {
        onLogin(localData);
        return;
        // eğer bu scope içi çalışırsa yani kullanıcıyı ls'dan bulursa
        // artık fetch işlemine gerek kalmadan return ile işlemi burada keser
      }

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj),
    })
      .then(res => {
        if (!res.ok) throw new Error('Giriş başarısız');
        return res.json();
      })
      .then(data => {
        onLogin(data);
      })
      .catch(() => {
        alert('Giriş Başarısız')
      });
  }

  return (
    <form onSubmit={handleSubmit} className="authbox-form" autoComplete="off">
      <h2>Giriş Yap</h2>
      <input
        type="text"
        name="username"
        placeholder="Kullanıcı adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Giriş yap</button>
    </form>
  )
}