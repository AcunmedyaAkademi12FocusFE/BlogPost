import { useState } from "react";

export default function RegisterBox({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    console.log(formObj);

    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    })
      .then(res => res.json())
      .then((data) => {
        localStorage.data = JSON.stringify(data);
        // datayı LS'a stringify formatında data adındaki değişken ile kayıt ettim
        setSuccess(true);
        setTimeout(() => {
          onRegister();
        }, 2000) // 2000ms -> 2sn
      })
      .catch(console.error);
  }

  if(success) {
    return (
      <div className="registerbox-form">
        <h2>Kayıt Ol</h2>
        <div>
          Kayıt oldunuz! Giriş ekranına yönlendiriliyorsunuz ...
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
      <h2>Kayıt Ol</h2>
      <input
        name="username"
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Kayıt Ol</button>
    </form>
  )
}