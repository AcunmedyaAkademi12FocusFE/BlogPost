import { useState } from "react";

export default function AuthBox({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30, 
      }),
      // credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
      .then(res => res.json())
      .then((data) => {
        if (data.accessToken) {
          onLogin({ username: data.username });
        }
      })
      // .then(console.log);
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