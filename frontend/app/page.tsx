export default function Home() {
  return (
    <div style={{background:'#09090F',minHeight:'100vh',color:'#F8FAFC',fontFamily:'Inter,sans-serif'}}>
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem 2rem',borderBottom:'1px solid #2a2a35',background:'rgba(9,9,15,0.85)',position:'sticky',top:0,zIndex:100}}>
        <span style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'18px',fontWeight:700,background:'linear-gradient(135deg,#7C3AED,#06B6D4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CreatorAI</span>
        <div style={{display:'flex',gap:'1.5rem',alignItems:'center'}}>
          <a href="#features" style={{color:'#8B8FA8',fontSize:'14px',textDecoration:'none'}}>Features</a>
          <a href="#pricing" style={{color:'#8B8FA8',fontSize:'14px',textDecoration:'none'}}>Pricing</a>
          <a href="/login" style={{background:'#7C3AED',color:'#fff',border:'none',padding:'.55rem 1.25rem',borderRadius:'8px',fontSize:'14px',fontWeight:500,cursor:'pointer',textDecoration:'none'}}>Get started</a>
        </div>
      </nav>

      <div style={{textAlign:'center',padding:'5rem 2rem 4rem',maxWidth:'860px',margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'.5rem',background:'rgba(124,58,237,.12)',border:'1px solid rgba(124,58,237,.3)',borderRadius:'100px',padding:'.35rem 1rem',fontSize:'13px',color:'#A78BFA',marginBottom:'1.5rem',fontWeight:500}}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#A78BFA',display:'inline-block'}}></span>
          Now live on Whop — built for faceless creators
        </div>
        <h1 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:700,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'1.25rem'}}>
          The only AI studio<br/>
          <span style={{background:'linear-gradient(135deg,#7C3AED,#06B6D4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>faceless creators need</span>
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B8FA8',maxWidth:'560px',margin:'0 auto 2rem',lineHeight:1.7}}>Script, hook, SEO, hashtags, thumbnail prompt, caption — generate everything for your next video in under 60 seconds.</p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'3rem'}}>
          <a href="/login" style={{padding:'.8rem 2rem',borderRadius:'10px',fontSize:'15px',fontWeight:600,cursor:'pointer',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',color:'#fff',border:'none',textDecoration:'none'}}>Start free on Whop ↗</a>
          <a href="#features" style={{padding:'.8rem 2rem',borderRadius:'10px',fontSize:'15px',fontWeight:600,cursor:'pointer',background:'transparent',color:'#F8FAFC',border:'1px solid #2a2a35',textDecoration:'none'}}>See all features</a>
        </div>
        <div style={{background:'#111118',border:'1px solid #2a2a35',borderRadius:'14px',padding:'1.25rem 1.5rem',maxWidth:'620px',margin:'0 auto',textAlign:'left'}}>
          <div style={{display:'flex',gap:'.4rem',marginBottom:'1rem',alignItems:'center'}}>
            <span style={{width:'10px',height:'10px',borderRadius:'50%',background:'#ff5f56',display:'inline-block'}}></span>
            <span style={{width:'10px',height:'10px',borderRadius:'50%',background:'#ffbd2e',display:'inline-block'}}></span>
            <span style={{width:'10px',height:'10px',borderRadius:'50%',background:'#27c93f',display:'inline-block'}}></span>
            <span style={{fontSize:'12px',color:'#8B8FA8',marginLeft:'.5rem'}}>CreatorAI — Script Generator</span>
          </div>
          <div style={{fontFamily:'monospace',fontSize:'13px',lineHeight:1.8}}>
            <div><span style={{color:'#8B8FA8'}}>niche</span> <span style={{color:'#22D3EE'}}>→</span> <span style={{color:'#F8FAFC'}}>Faceless YouTube / Finance</span></div>
            <div><span style={{color:'#8B8FA8'}}>topic</span> <span style={{color:'#22D3EE'}}>→</span> <span style={{color:'#F8FAFC'}}>5 habits that keep you poor</span></div>
            <div style={{marginTop:'.75rem'}}><span style={{color:'#A78BFA'}}>generating script...</span></div>
            <div style={{marginTop:'.5rem'}}><span style={{color:'#34D399'}}>✓ Hook: </span><span style={{color:'#F8FAFC'}}>"Most people will retire broke. Here is why."</span></div>
            <div><span style={{color:'#34D399'}}>✓ Script: </span><span style={{color:'#F8FAFC'}}>2,400 words · 12 min · 3 act structure</span></div>
            <div><span style={{color:'#34D399'}}>✓ SEO title: </span><span style={{color:'#F8FAFC'}}>5 Habits Keeping You Broke (Most People Do #3)</span></div>
            <div style={{marginTop:'.5rem'}}><span style={{color:'#8B8FA8'}}>done in </span><span style={{color:'#A78BFA'}}>4.2s ▋</span></div>
          </div>
        </div>
      </div>

      <div id="features" style={{padding:'4rem 2rem',maxWidth:'1080px',margin:'0 auto'}}>
        <div style={{fontSize:'12px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#7C3AED',marginBottom:'.75rem'}}>What's inside</div>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:700,marginBottom:'.75rem'}}>7 tools. One workspace.</h2>
        <p style={{color:'#8B8FA8',maxWidth:'520px',marginBottom:'3rem'}}>Stop switching between 6 different apps. Everything you need to go from idea to upload-ready.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.25rem'}}>
          {[
            {icon:'🎬',title:'Script Generator',desc:'Full video scripts with hook, body, and CTA.',badge:'5 credits'},
            {icon:'🪝',title:'Hook Writer',desc:'Get 5 viral hook variations per topic.',badge:'2 credits'},
            {icon:'💡',title:'Idea Generator',desc:'30-day content calendar from your niche.',badge:'3 credits'},
            {icon:'🔍',title:'SEO Optimizer',desc:'YouTube title, description, and keywords.',badge:'2 credits'},
            {icon:'#️⃣',title:'Hashtag Generator',desc:'Platform-specific hashtags for every post.',badge:'1 credit'},
            {icon:'🖼️',title:'Thumbnail Prompt',desc:'Midjourney and DALL-E prompts ready to paste.',badge:'2 credits'},
            {icon:'📱',title:'Caption Writer',desc:'Instagram and TikTok captions with CTA.',badge:'1 credit'},
          ].map((f,i)=>(
            <div key={i} style={{background:'#111118',border:'1px solid #2a2a35',borderRadius:'14px',padding:'1.5rem'}}>
              <div style={{fontSize:'24px',marginBottom:'1rem'}}>{f.icon}</div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:600,marginBottom:'.4rem'}}>{f.title}</div>
              <div style={{fontSize:'14px',color:'#8B8FA8',lineHeight:1.6,marginBottom:'.75rem'}}>{f.desc}</div>
              <span style={{fontSize:'11px',padding:'.2rem .6rem',borderRadius:'6px',background:'rgba(124,58,237,.15)',color:'#A78BFA',fontWeight:500}}>{f.badge}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="pricing" style={{padding:'4rem 2rem',maxWidth:'1080px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'3rem'}}>
          <div style={{fontSize:'12px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#7C3AED',marginBottom:'.75rem'}}>Pricing</div>
          <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:700,marginBottom:'.75rem'}}>Start free. Scale as you grow.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.25rem'}}>
          {[
            {name:'Free',price:'$0',credits:'50 credits/month',features:['All 7 AI tools','Script Generator','Hook Writer'],btn:'Join free',grad:false},
            {name:'Starter',price:'$9',credits:'500 credits/month',features:['All 7 AI tools','Credits roll over','Faster generation','Download history'],btn:'Get Starter',grad:true},
            {name:'Pro',price:'$29',credits:'2,000 credits/month',features:['Everything in Starter','Priority queue','Bulk generation','API access'],btn:'Go Pro',grad:false},
          ].map((p,i)=>(
            <div key={i} style={{background:p.grad?'rgba(124,58,237,.06)':'#111118',border:`1px solid ${p.grad?'#7C3AED':'#2a2a35'}`,borderRadius:'16px',padding:'1.75rem',position:'relative'}}>
              {p.grad && <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',color:'#fff',fontSize:'11px',fontWeight:700,padding:'.3rem .9rem',borderRadius:'100px',whiteSpace:'nowrap'}}>MOST POPULAR</div>}
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:600,color:p.grad?'#A78BFA':'#F8FAFC'}}>{p.name}</div>
              <div style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'2.4rem',fontWeight:700,margin:'.5rem 0 .25rem'}}>{p.price}<span style={{fontSize:'14px',fontWeight:400,color:'#8B8FA8'}}>/mo</span></div>
              <div style={{fontSize:'13px',color:'#8B8FA8',marginBottom:'1.25rem',paddingBottom:'1.25rem',borderBottom:'1px solid #2a2a35'}}>{p.credits}</div>
              {p.features.map((f,j)=><div key={j} style={{fontSize:'13px',color:'#8B8FA8',padding:'.3rem 0'}}><span style={{color:'#34D399'}}>✓ </span>{f}</div>)}
              <a href="/login" style={{display:'block',width:'100%',marginTop:'1.5rem',padding:'.7rem',borderRadius:'8px',fontSize:'14px',fontWeight:600,cursor:'pointer',background:p.grad?'linear-gradient(135deg,#7C3AED,#06B6D4)':'transparent',color:'#F8FAFC',border:p.grad?'none':'1px solid #2a2a35',textDecoration:'none',textAlign:'center'}}>{p.btn}</a>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#111118',borderTop:'1px solid #2a2a35',borderBottom:'1px solid #2a2a35',padding:'3rem 2rem',textAlign:'center'}}>
        <div style={{fontSize:'12px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#7C3AED',marginBottom:'.75rem'}}>What creators say</div>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:700,marginBottom:'2rem'}}>Built for people who make videos, not code</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'1rem',maxWidth:'900px',margin:'0 auto'}}>
          {[
            {init:'RK',name:'Rahul K.',handle:'Finance faceless · 48K subs',text:'"I used to spend 3 hours on a single video setup. Now my entire content pipeline takes 20 minutes."'},
            {init:'PD',name:'Priya D.',handle:'Mindset creator · 21K subs',text:'"The hook writer alone is worth the price. My CTR went from 3% to 8.4% in two weeks."'},
            {init:'AM',name:'Arjun M.',handle:'Tech faceless · 95K subs',text:'"Finally an AI tool that actually understands YouTube. The SEO output is way better."'},
          ].map((t,i)=>(
            <div key={i} style={{background:'#18181F',border:'1px solid #2a2a35',borderRadius:'12px',padding:'1.25rem',textAlign:'left'}}>
              <div style={{color:'#F59E0B',fontSize:'13px',marginBottom:'.75rem'}}>★★★★★</div>
              <p style={{fontSize:'14px',lineHeight:1.7,marginBottom:'1rem',color:'#F8FAFC'}}>{t.text}</p>
              <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:700,color:'#fff',flexShrink:0}}>{t.init}</div>
                <div>
                  <div style={{fontSize:'13px',fontWeight:500}}>{t.name}</div>
                  <div style={{fontSize:'12px',color:'#8B8FA8'}}>{t.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:'center',padding:'5rem 2rem',background:'radial-gradient(ellipse at 50% 0,rgba(124,58,237,.12) 0,transparent 70%)',borderTop:'1px solid #2a2a35'}}>
        <h2 style={{fontFamily:'Space Grotesk,sans-serif',fontSize:'2rem',fontWeight:700,marginBottom:'.75rem'}}>Your next video starts here.</h2>
        <p style={{color:'#8B8FA8',marginBottom:'2rem'}}>Join faceless creators already inside. Free to start.</p>
        <a href="/login" style={{padding:'.8rem 2rem',borderRadius:'10px',fontSize:'15px',fontWeight:600,cursor:'pointer',background:'linear-gradient(135deg,#7C3AED,#06B6D4)',color:'#fff',border:'none',textDecoration:'none'}}>Start free on Whop ↗</a>
      </div>

      <div style={{textAlign:'center',padding:'1.5rem',borderTop:'1px solid #2a2a35',color:'#8B8FA8',fontSize:'13px'}}>© 2026 CreatorAI Toolkit · Built for creators, by creators</div>
    </div>
  );
}