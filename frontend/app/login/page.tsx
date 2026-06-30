'use client';
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (!isLogin && !name) { setError('Please enter your name'); return; }
    setLoading(true); setError('');
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.detail || 'Something went wrong'); setLoading(false); return; }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.replace('/dashboard');
    } catch {
      setError('Cannot connect to server.');
      setLoading(false);
    }
  };

  return (
    <div style={{background:'#09090F',minHeight:'100vh',color:'#F8FAFC',fontFamily:'Inter,sans-serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <a href="/" style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'22px',fontWeight:700,background:'linear-gradient(135deg,#7C3AED,#06B6D4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textDecoration:'none',marginBottom:'2rem'}}>CreatorAI</a>
      <div style={{background:'#111118',border:'1px solid #2a2a35',borderRadius:'16px',padding:'2rem',width:'100%',maxWidth:'400px'}}>
        <div style={{display:'flex',background:'#18181F',borderRadius:'10px',padding:'4px',marginBottom:'1.75rem'}}>
          <button onClick={() => {setIsLogin(true);setError('');}} style={{flex:1,padding:'.6rem',borderRadius:'8px',border:'none',fontSize:'14px',fontWeight:500,cursor:'pointer',background:isLogin?'#111118':'transparent',color:isLogin?'#F8FAFC':'#8B8FA8'}}>Sign In</button>
          <button onClick={() => {setIsLogin(false);setError('');}} style={{flex:1,padding:'.6rem',borderRadius:'8px',border:'none',fontSize:'14px',fontWeight:500,cursor:'pointer',background:!isLogin?'#111118':'transparent',color:!isLogin?'#F8FAFC':'#8B8FA8'}}>Sign Up</button>
        </div>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'1.4rem',fontWeight:700,marginBottom:'.4rem'}}>{isLogin?'Welcome back':'Create your account'}</h2>
        <p style={{fontSize:'14px',color:'#8B8FA8',marginBottom:'1.5rem'}}>{isLogin?'Sign in to access your AI studio':'Start generating content for free'}</p>
        {!isLogin && (
          <div style={{marginBottom:'1rem'}}>
            <label style={{fontSize:'13px',fontWeight:500,display:'block',marginBottom:'.4rem'}}>Full Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"
              style={{width:'100%',background:'#18181F',border:'1px solid #2a2a35',borderRadius:'8px',padding:'.65rem .75rem',color:'#F8FAFC',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
          </div>
        )}
        <div style={{marginBottom:'1rem'}}>
          <label style={{fontSize:'13px',fontWeight:500,display:'block',marginBottom:'.4rem'}}>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
            style={{width:'100%',background:'#18181F',border:'1px solid #2a2a35',borderRadius:'8px',padding:'.65rem .75rem',color:'#F8FAFC',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
        </div>
        <div style={{marginBottom:'1.25rem'}}>
          <label style={{fontSize:'13px',fontWeight:500,display:'block',marginBottom:'.4rem'}}>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
            style={{width:'100%',background:'#18181F',border:'1px solid #2a2a35',borderRadius:'8px',padding:'.65rem .75rem',color:'#F8FAFC',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
        </div>
        {error && <div style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.3)',borderRadius:'8px',padding:'.65rem .75rem',fontSize:'13px',color:'#F87171',marginBottom:'1rem'}}>{error}</div>}
        <button onClick={handleSubmit} disabled={loading}
          style={{width:'100%',padding:'.75rem',borderRadius:'10px',background:loading?'#3D3D52':'linear-gradient(135deg,#7C3AED,#06B6D4)',border:'none',color:'#fff',fontSize:'14px',fontWeight:600,cursor:loading?'not-allowed':'pointer'}}>
          {loading?'⏳ Please wait...':isLogin?'Sign In →':'Create Account →'}
        </button>
      </div>
      <p style={{fontSize:'13px',color:'#8B8FA8',marginTop:'1.5rem'}}>
        {isLogin?"Don't have an account? ":"Already have an account? "}
        <button onClick={() => {setIsLogin(!isLogin);setError('');}} style={{background:'none',border:'none',color:'#A78BFA',cursor:'pointer',fontSize:'13px',fontWeight:500}}>
          {isLogin?'Sign up free':'Sign in'}
        </button>
      </p>
    </div>
  );
}