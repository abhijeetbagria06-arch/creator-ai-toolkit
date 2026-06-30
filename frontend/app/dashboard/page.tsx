'use client';
import { useState, useEffect } from 'react';

const tools = [
  { id: 'script', icon: '🎬', name: 'Script Generator', credits: 5 },
  { id: 'hook', icon: '🪝', name: 'Hook Writer', credits: 2 },
  { id: 'idea', icon: '💡', name: 'Idea Generator', credits: 3 },
  { id: 'seo', icon: '🔍', name: 'SEO Optimizer', credits: 2 },
  { id: 'hashtag', icon: '#️⃣', name: 'Hashtag Generator', credits: 1 },
  { id: 'thumbnail', icon: '🖼️', name: 'Thumbnail Prompt', credits: 2 },
  { id: 'caption', icon: '📱', name: 'Caption Writer', credits: 1 },
];

const prompts: Record<string, { label: string; placeholder: string }[]> = {
  script: [
    { label: 'Niche', placeholder: 'e.g. Personal Finance, Tech, Fitness' },
    { label: 'Topic', placeholder: 'e.g. 5 habits that keep you poor' },
    { label: 'Video Length', placeholder: 'e.g. 10 minutes' },
  ],
  hook: [
    { label: 'Niche', placeholder: 'e.g. Personal Finance' },
    { label: 'Topic', placeholder: 'e.g. Why most people stay broke' },
  ],
  idea: [
    { label: 'Niche', placeholder: 'e.g. Faceless YouTube / Finance' },
    { label: 'Days', placeholder: 'e.g. 30' },
  ],
  seo: [
    { label: 'Video Topic', placeholder: 'e.g. How to save money in 2026' },
    { label: 'Target Audience', placeholder: 'e.g. Young adults 18-30' },
  ],
  hashtag: [
    { label: 'Topic', placeholder: 'e.g. Money habits' },
    { label: 'Platform', placeholder: 'e.g. YouTube, Instagram, TikTok' },
  ],
  thumbnail: [
    { label: 'Video Title', placeholder: 'e.g. 5 Habits Keeping You Broke' },
    { label: 'Style', placeholder: 'e.g. Dark, dramatic, minimalist' },
  ],
  caption: [
    { label: 'Topic', placeholder: 'e.g. Morning routine for productivity' },
    { label: 'Platform', placeholder: 'e.g. Instagram / TikTok' },
    { label: 'Tone', placeholder: 'e.g. Motivational, funny, educational' },
  ],
};

export default function Dashboard() {
  const [activeTool, setActiveTool] = useState('script');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(50);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<{name:string, email:string, plan:string, credits:number} | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (stored && token) {
        const u = JSON.parse(stored);
        setUser(u);
        setCredits(u.credits);
      }
    } catch(e) { console.error(e); }
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (authChecked && !user) window.location.href = '/login';
  }, [authChecked, user]);

  const tool = tools.find(t => t.id === activeTool)!;
  const fields = prompts[activeTool] || [];

  const handleGenerate = async () => {
    if (credits < tool.credits) { setOutput('Not enough credits. Please upgrade your plan.'); return; }
    setLoading(true); setOutput('');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: activeTool, inputs, token }),
      });
      const data = await response.json();
      if (!response.ok) { setOutput(data.detail || 'Something went wrong'); setLoading(false); return; }
      setOutput(data.result);
      if (data.credits_remaining !== null && data.credits_remaining !== undefined) {
        setCredits(data.credits_remaining);
        const stored = localStorage.getItem('user');
        if (stored) {
          const u = JSON.parse(stored);
          u.credits = data.credits_remaining;
          localStorage.setItem('user', JSON.stringify(u));
        }
      }
    } catch { setOutput('Error connecting to server. Make sure backend is running.'); }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!authChecked) return (
    <div style={{background:'#09090F',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{color:'#8B8FA8',fontSize:'14px'}}>Loading...</div>
    </div>
  );
  if (!user) return null;

  return (
    <div style={{display:'flex',height:'100vh',background:'#09090F',color:'#F8FAFC',fontFamily:'Inter,sans-serif',overflow:'hidden'}}>
      <div style={{width:sidebarOpen?'240px':'60px',background:'#111118',borderRight:'1px solid #2a2a35',display:'flex',flexDirection:'column',transition:'width 0.2s',flexShrink:0}}>
        <div style={{padding:'1.25rem 1rem',borderBottom:'1px solid #2a2a35',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          {sidebarOpen && <span style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:'16px',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CreatorAI</span>}
          <button onClick={() => setSidebarOpen(o=>!o)} style={{background:'none',border:'none',color:'#8B8FA8',cursor:'pointer',fontSize:'16px',padding:'4px'}}>{sidebarOpen?'◀':'▶'}</button>
        </div>
        <div style={{padding:'0.75rem 0.5rem',flex:1,overflowY:'auto'}}>
          {tools.map(t => (
            <button key={t.id} onClick={() => {setActiveTool(t.id);setOutput('');setInputs({});}}
              style={{width:'100%',display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.65rem 0.75rem',borderRadius:'8px',border:'none',cursor:'pointer',marginBottom:'2px',background:activeTool===t.id?'rgba(124,58,237,0.15)':'transparent',color:activeTool===t.id?'#A78BFA':'#8B8FA8',textAlign:'left'}}>
              <span style={{fontSize:'18px',flexShrink:0}}>{t.icon}</span>
              {sidebarOpen && <span style={{fontSize:'13px',fontWeight:activeTool===t.id?600:400,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</span>}
            </button>
          ))}
        </div>
        {sidebarOpen && (
          <div style={{padding:'1rem',borderTop:'1px solid #2a2a35'}}>
            <div style={{fontSize:'11px',color:'#8B8FA8',marginBottom:'0.5rem',textTransform:'uppercase',letterSpacing:'1px'}}>Credits</div>
            <div style={{background:'#18181F',borderRadius:'8px',padding:'0.75rem'}}>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'1.5rem',fontWeight:700,color:credits<10?'#F87171':'#A78BFA'}}>{credits}</div>
              <div style={{fontSize:'11px',color:'#8B8FA8'}}>remaining this month</div>
              <div style={{marginTop:'0.5rem',height:'4px',background:'#2a2a35',borderRadius:'4px'}}>
                <div style={{height:'100%',width:`${Math.min((credits/50)*100,100)}%`,background:'linear-gradient(135deg,#7C3AED,#06B6D4)',borderRadius:'4px',transition:'width 0.3s'}}></div>
              </div>
            </div>
            <button style={{width:'100%',marginTop:'0.75rem',padding:'0.6rem',borderRadius:'8px',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',border:'none',color:'#fff',fontSize:'12px',fontWeight:600,cursor:'pointer'}}>⚡ Upgrade Plan</button>
            <button onClick={() => {localStorage.clear();window.location.href='/login';}} style={{width:'100%',marginTop:'0.5rem',padding:'0.6rem',borderRadius:'8px',background:'transparent',border:'1px solid #2a2a35',color:'#8B8FA8',fontSize:'12px',cursor:'pointer'}}>Sign Out</button>
          </div>
        )}
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{padding:'1rem 1.5rem',borderBottom:'1px solid #2a2a35',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
          <div>
            <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'18px',fontWeight:700}}>{tool.icon} {tool.name}</div>
            <div style={{fontSize:'12px',color:'#8B8FA8',marginTop:'2px'}}>Uses {tool.credits} credit{tool.credits>1?'s':''} per generation</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
            <div style={{fontSize:'13px',color:'#8B8FA8'}}>{user?.plan === 'free' ? 'Free Plan' : user?.plan}</div>
            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:700}}>{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          </div>
        </div>
        <div style={{flex:1,display:'flex',overflow:'hidden'}}>
          <div style={{width:'340px',padding:'1.5rem',borderRight:'1px solid #2a2a35',display:'flex',flexDirection:'column',gap:'1rem',overflowY:'auto',flexShrink:0}}>
            <div style={{fontSize:'12px',fontWeight:600,color:'#8B8FA8',textTransform:'uppercase',letterSpacing:'1px'}}>Input</div>
            {fields.map(f => (
              <div key={f.label}>
                <label style={{fontSize:'13px',fontWeight:500,color:'#F8FAFC',display:'block',marginBottom:'0.4rem'}}>{f.label}</label>
                <input value={inputs[f.label]||''} onChange={e=>setInputs(p=>({...p,[f.label]:e.target.value}))} placeholder={f.placeholder}
                  style={{width:'100%',background:'#18181F',border:'1px solid #2a2a35',borderRadius:'8px',padding:'0.65rem 0.75rem',color:'#F8FAFC',fontSize:'14px',outline:'none',fontFamily:'Inter,sans-serif',boxSizing:'border-box'}} />
              </div>
            ))}
            <button onClick={handleGenerate} disabled={loading}
              style={{marginTop:'0.5rem',padding:'0.8rem',borderRadius:'10px',background:loading?'#3D3D52':'linear-gradient(135deg,#7C3AED,#06B6D4)',border:'none',color:'#fff',fontSize:'14px',fontWeight:600,cursor:loading?'not-allowed':'pointer'}}>
              {loading ? '⏳ Generating...' : `✨ Generate (${tool.credits} credits)`}
            </button>
          </div>
          <div style={{flex:1,padding:'1.5rem',display:'flex',flexDirection:'column',overflowY:'auto'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
              <div style={{fontSize:'12px',fontWeight:600,color:'#8B8FA8',textTransform:'uppercase',letterSpacing:'1px'}}>Output</div>
              {output && <button onClick={handleCopy} style={{fontSize:'12px',padding:'0.35rem 0.75rem',borderRadius:'6px',background:copied?'rgba(52,211,153,0.15)':'#18181F',border:`1px solid ${copied?'#34D399':'#2a2a35'}`,color:copied?'#34D399':'#8B8FA8',cursor:'pointer'}}>{copied?'✓ Copied!':'📋 Copy'}</button>}
            </div>
            {!output && !loading && (
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#3D3D52',textAlign:'center'}}>
                <div style={{fontSize:'48px',marginBottom:'1rem'}}>{tool.icon}</div>
                <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'18px',fontWeight:600,marginBottom:'0.5rem',color:'#8B8FA8'}}>Ready to generate</div>
                <div style={{fontSize:'14px',color:'#3D3D52'}}>Fill in the fields and hit Generate</div>
              </div>
            )}
            {loading && (
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem'}}>
                <div style={{width:'40px',height:'40px',border:'3px solid #2a2a35',borderTop:'3px solid #7C3AED',borderRadius:'50%',animation:'spin 1s linear infinite'}}></div>
                <div style={{color:'#8B8FA8',fontSize:'14px'}}>CreatorAI is generating your content...</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            {output && !loading && (
              <div style={{background:'#111118',border:'1px solid #2a2a35',borderRadius:'12px',padding:'1.5rem',fontSize:'14px',lineHeight:1.8,color:'#F8FAFC',whiteSpace:'pre-wrap',flex:1}}>{output}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}