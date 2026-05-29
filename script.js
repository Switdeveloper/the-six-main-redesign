/* The Six AI Architects — Static site logic */
(function(){
  'use strict';

  // Smooth scroll
  document.querySelectorAll('[data-scroll]').forEach(b=>{
    b.addEventListener('click',()=>{
      const t=document.querySelector(b.dataset.scroll);
      if(t)t.scrollIntoView({behavior:'smooth'});
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length>1){
        const t=document.querySelector(id);
        if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});closeMobile();}
      }
    });
  });

  // Year
  document.getElementById('year').textContent=new Date().getFullYear();

  // Navbar scroll state
  const nav=document.getElementById('navbar');
  const scrollTop=document.getElementById('scrollTop');
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',window.scrollY>20);
    if(scrollTop) scrollTop.classList.toggle('show',window.scrollY>500);
  });
  if(scrollTop) scrollTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Mobile menu
  const mm=document.getElementById('mobileMenu');
  const navToggle=document.getElementById('navToggle');
  
  navToggle.addEventListener('click',()=>{
    mm.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  mm.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click',()=>{
      mm.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
  
  function closeMobile(){mm.classList.remove('open');navToggle.classList.remove('active');}

  // Reveal observer
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Hero dashboard chart
  const heights=[40,65,45,80,55,90,70,85,60,95];
  const dc=document.getElementById('dashChart');
  heights.forEach((h,i)=>{
    const b=document.createElement('div');
    b.className='bar';b.style.height='0';
    dc.appendChild(b);
    setTimeout(()=>{b.style.height=h+'%'},800+i*60);
  });

  // ------- Outcomes -------
  const outcomes=[
    {icon:'📈',value:60,prefix:'↑ ',suffix:'%',label:'Lead Conversion Rate',desc:'Higher qualified leads closed'},
    {icon:'📉',value:40,prefix:'↓ ',suffix:'%',label:'Operational Costs',desc:'Reduction in overhead expenses'},
    {icon:'⚡',value:10,prefix:'',suffix:'×',label:'Faster Execution',desc:'Speed improvement in workflows'},
    {icon:'🕒',value:24,prefix:'',suffix:'/7',label:'Intelligent Operations',desc:'Always-on automated systems'}
  ];
  const og=document.getElementById('outcomesGrid');
  outcomes.forEach(o=>{
    const c=document.createElement('div');
    c.className='outcome-card reveal';
    c.innerHTML=`<div class="outcome-icon">${o.icon}</div>
      <div class="outcome-value" data-counter="${o.value}" data-prefix="${o.prefix}" data-suffix="${o.suffix}">${o.prefix}0${o.suffix}</div>
      <h3 class="outcome-label">${o.label}</h3>
      <p class="outcome-desc">${o.desc}</p>`;
    og.appendChild(c);io.observe(c);
  });

  // ------- Systems -------
  const systems=[
    {icon:'📊',title:'Revenue & Lead Intelligence',desc:'AI-powered lead scoring and qualification that identifies high-value prospects and accelerates deal velocity.',impact:'35-60% conversion increase'},
    {icon:'📈',title:'Sales & Pipeline Automation',desc:'Intelligent CRM workflows that nurture leads, schedule follow-ups, and close deals while you focus on strategy.',impact:'50% faster sales cycles'},
    {icon:'📣',title:'Marketing Personalization',desc:'Dynamic content generation and audience segmentation for campaigns that resonate and convert.',impact:'3× engagement rates'},
    {icon:'👥',title:'AI Customer Experience',desc:'24/7 intelligent support systems that resolve issues, answer questions, and delight customers at scale.',impact:'80% query resolution'},
    {icon:'🛡️',title:'Fraud & Risk Automation',desc:'Real-time threat detection and prevention systems that protect revenue and maintain compliance.',impact:'95% fraud prevention'},
    {icon:'⚙️',title:'Operations & Workflow',desc:'End-to-end process automation that eliminates bottlenecks and unlocks operational efficiency.',impact:'40% cost reduction'}
  ];
  const sg=document.getElementById('systemsGrid');
  systems.forEach(s=>{
    const c=document.createElement('div');
    c.className='system-card reveal';
    c.innerHTML=`<div class="system-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p><span class="impact-badge">${s.impact}</span>`;
    sg.appendChild(c);io.observe(c);
  });

  // ------- Industries -------
  const industries=[
    {icon:'💼',name:'Immigration Services',desc:'Streamline visa processing & case management'},
    {icon:'⚖️',name:'Law Firms',desc:'Automate legal workflows & client intake'},
    {icon:'🛒',name:'E-commerce',desc:'Optimize sales funnels & customer journeys'},
    {icon:'🔧',name:'HVAC & Plumbing',desc:'Schedule dispatch & service automation'},
    {icon:'🏠',name:'Real Estate',desc:'Lead nurturing & transaction coordination'},
    {icon:'❤️',name:'Healthcare',desc:'Patient engagement & insurance verification'},
    {icon:'✈️',name:'Hospitality & Tourism',desc:'Booking automation & guest experience'},
    {icon:'🎓',name:'Education & E-learning',desc:'Student enrollment & course delivery'},
    {icon:'🧮',name:'Accountants',desc:'Client onboarding & document processing'}
  ];
  const ig=document.getElementById('industriesGrid');
  industries.forEach(i=>{
    const c=document.createElement('div');
    c.className='industry-card reveal';
    c.innerHTML=`<div class="industry-icon">${i.icon}</div><div><h3>${i.name}</h3><p>${i.desc}</p></div>`;
    ig.appendChild(c);io.observe(c);
  });

  // ------- AI Voice -------
  const voice=[
    {n:1,icon:'📣',title:'Lead In',desc:'Capture potential client interest through ads, website forms, or referrals.'},
    {n:2,icon:'📞',title:'AI Call',desc:'Automated AI calls to engage leads, ensuring fast and efficient communication.'},
    {n:3,icon:'✅',title:'Qualify Lead',desc:'Evaluate leads by assessing interest, requirements, and potential fit for services offered.'},
    {n:4,icon:'💾',title:'Update CRM',desc:"Record and update the lead's details in the CRM or database automatically."},
    {n:5,icon:'📅',title:'Book Appointment',desc:'Facilitate seamless booking of appointments with easy-to-use scheduling tools.'},
    {n:6,icon:'✉️',title:'Send Confirmation',desc:'Automatically send confirmation emails and SMS notifications for appointment reminders.'}
  ];
  const vs=document.getElementById('voiceSteps');
  voice.forEach(v=>{
    const d=document.createElement('div');
    d.className='voice-step reveal';
    d.innerHTML=`<div class="vs-num">${v.n}</div><div><h3>${v.icon} ${v.title}</h3><p>${v.desc}</p></div>`;
    vs.appendChild(d);io.observe(d);
  });

  // ------- Pillars -------
  const pillars=[
    {icon:'🧭',title:'Designed, Not Installed',desc:"We don't drop in generic tools. Every system is custom-architected to your unique business model, workflows, and growth trajectory."},
    {icon:'🎯',title:'Results Over Tools',desc:'We measure success in revenue gained, costs reduced, and hours saved—not in features shipped or integrations completed.'},
    {icon:'🏗️',title:'Systems That Scale With You',desc:'Built on enterprise-grade infrastructure, our architectures grow seamlessly from startup to Fortune 500 scale.'}
  ];
  const pg=document.getElementById('pillarsGrid');
  pillars.forEach(p=>{
    const d=document.createElement('div');
    d.className='pillar reveal';
    d.innerHTML=`<div class="pillar-icon">${p.icon}</div><h3>${p.title}</h3><p>${p.desc}</p>`;
    pg.appendChild(d);io.observe(d);
  });

  // ------- Team -------
  const team=[
    {type:'human',role:'Strategy Lead'},
    {type:'robot',role:'AI Assistant'},
    {type:'human',role:'Operations'},
    {type:'robot',role:'Data Analyst'},
    {type:'human',role:'Client Success'}
  ];
  const tr=document.getElementById('teamRow');
  team.forEach(m=>{
    const d=document.createElement('div');
    d.className='team-member';
    d.innerHTML=`<div class="team-avatar ${m.type}">${m.type==='robot'?'🤖':'🧑'}</div><p>${m.role}</p>`;
    tr.appendChild(d);
  });

  // ------- FAQ -------
  const faqs=[
    {q:'What is The Six AI Architects, and what do you offer?',a:"We're an AI automation agency that designs and builds intelligent systems for businesses. From lead qualification to document processing, we create workflows that save time, cut costs, and drive measurable ROI."},
    {q:'How can you help automate my business processes?',a:"We analyze your current workflows, identify bottlenecks, and build custom AI automations tailored to your needs. Whether it's CRM updates, email responses, or data extraction — we handle the heavy lifting."},
    {q:'What kind of AI solutions do you provide?',a:'Lead generation & qualification bots, AI voice agents, document summarizers, automated reporting, customer onboarding systems, and custom workflow automations for virtually any repetitive task.'},
    {q:'Can you tailor solutions to my specific business needs?',a:'Absolutely. Every business is different, and we specialize in building bespoke AI systems that align with your unique requirements, tech stack, and goals.'},
    {q:'How do you ensure the security of my data and projects?',a:'Enterprise-grade data protection, encryption, and access controls. All integrations follow industry best practices, and we are transparent about how data flows through our systems.'},
    {q:'Can you integrate AI into my existing tools and systems?',a:'Yes — we connect with CRMs (HubSpot, Salesforce), project management tools, email platforms, accounting software, and more. If it has an API, we can likely automate it.'},
    {q:'What industries do you serve?',a:'Healthcare, finance, e-commerce, professional services, manufacturing, and more. If your business has repetitive processes that eat up time, we can help.'},
    {q:'How do I get started with The Six AI Architects?',a:"Book a free architecture session. We'll discuss your pain points, map out potential automations, and show you exactly how much time and money you could save."}
  ];
  const fl=document.getElementById('faqList');
  faqs.forEach((f,i)=>{
    const item=document.createElement('div');
    item.className='faq-item';
    item.innerHTML=`<button class="faq-q"><span>${f.q}</span><span class="chev">▾</span></button><div class="faq-a"><p style="padding-top:0">${f.a}</p></div>`;
    item.querySelector('.faq-q').addEventListener('click',()=>{
      item.classList.toggle('open');
    });
    fl.appendChild(item);
  });

  // ------- Lead Scoring bars -------
  const lead=[
    {label:'High Intent',val:94,count:'1,284'},
    {label:'Medium Intent',val:72,count:'3,452'},
    {label:'Nurture Queue',val:45,count:'2,891'}
  ];
  const ls=document.getElementById('leadScoring');
  lead.forEach(l=>{
    const row=document.createElement('div');
    row.innerHTML=`<div class="bar-row"><span class="label">${l.label}</span><span><span class="val">${l.val}%</span><span class="count">(${l.count})</span></span></div><div class="progress-track"><div class="progress-fill" data-w="${l.val}"></div></div>`;
    ls.appendChild(row);
  });

  // ------- Animations on scroll: counters, progress bars, cycle bars, ring -------
  const animObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target;
      if(el.dataset.counter){
        const target=+el.dataset.counter;
        const prefix=el.dataset.prefix||'';
        const suffix=el.dataset.suffix||'';
        const dur=1600;const start=performance.now();
        function tick(now){
          const p=Math.min((now-start)/dur,1);
          const v=Math.floor(p*target);
          el.textContent=prefix+v.toLocaleString()+suffix;
          if(p<1)requestAnimationFrame(tick);
          else el.textContent=prefix+target.toLocaleString()+suffix;
        }
        requestAnimationFrame(tick);
      }
      if(el.classList.contains('progress-fill')){el.style.width=el.dataset.w+'%'}
      if(el.classList.contains('cycle-bar')){el.style.height=el.dataset.h+'%'}
      if(el.id==='ringFill'){
        const v=85;const c=326.7;el.style.strokeDashoffset=(c-(v/100)*c).toString();
      }
      animObs.unobserve(el);
    });
  },{threshold:.3});
  document.querySelectorAll('[data-counter],.progress-fill,.cycle-bar,#ringFill').forEach(el=>animObs.observe(el));

  // ------- Workflow cart -------
  const workflows=[
    {title:'Lead Qualification',timeSaved:'7–12 hrs/month',roi:'5–12×',steps:[['Trigger','Lead form submitted'],['Score','AI validates & scores lead'],['Route','Send to CRM'],['Follow-up','Send tailored email']]},
    {title:'Lead Generation',timeSaved:'20+ hrs/month',roi:'12×+',steps:[['Trigger','Lead submitted via website'],['AI Check','AI validates contact & business needs'],['Score','Lead scored automatically (Hot or Cold)'],['Routing','Forward hot leads to right team member']]},
    {title:'Social Media Content Engine',timeSaved:'12–18 hrs/month',roi:'10×+',steps:[['Input','Topics or long-form content added'],['Generate','AI writes posts, captions, CTAs'],['Schedule','Content posted across all platforms'],['Report','Monthly performance dashboard']]},
    {title:'AI Ad Creative Generator',timeSaved:'15–20 hrs/month',roi:'18×+',steps:[['Generate','AI creates image + text'],['Optimize','AI suggests variations & hooks'],['Sync','Sync to Ads Manager'],['Launch','Campaign launched or drafts saved']]},
    {title:'AI Billing Reminder System',timeSaved:'5–8 hrs/month',roi:'9×+',steps:[['Scan','AI checks overdue invoices'],['Personalize','AI drafts friendly reminders'],['Send','Emails delivered automatically'],['Track','Engagement & payments tracked']]},
    {title:'Legal Document Summarizer',timeSaved:'8–12 hrs/month',roi:'14×+',steps:[['Upload','User uploads contract/terms'],['Summarize','AI extracts key risks & clauses'],['Flag','Risk areas highlighted'],['Store','Summary saved in CRM']]},
    {title:'Employee Performance Summary',timeSaved:'6–10 hrs/month',roi:'8×+',steps:[['Collect','Gather feedback & KPIs'],['Analyze','AI identifies strengths & issues'],['Draft','Performance summary created'],['Share','Delivered to manager']]},
    {title:'Automated Refund Handling',timeSaved:'4–7 hrs/month',roi:'6×+',steps:[['Receive','Refund request received'],['Check','AI validates reason & policy'],['Decision','Approve or forward to agent'],['Notify','Customer notified automatically']]},
    {title:'Supplier Request Automation',timeSaved:'6–9 hrs/month',roi:'8×+',steps:[['Request','Supplier message received'],['Extract','AI extracts items & quantities'],['Sync','Push to procurement system'],['Response','AI sends confirmation']]},
    {title:'Client Onboarding Automation',timeSaved:'7 hrs/month',roi:'6×+',steps:[['Welcome','Welcome package sent'],['Data','AI requests missing onboarding data'],['Setup','CRM & project auto-created'],['Kickoff','Kickoff call scheduled']]},
    {title:'HR Absence Request Automation',timeSaved:'8–10 hrs/month',roi:'6×+',steps:[['Request','Employee submits absence request'],['Check','AI checks dates & conflicts'],['Approve','Manager approval workflow'],['Sync','Update HR system']]},
    {title:'AI Document Classification',timeSaved:'3–6 hrs/month',roi:'8×',steps:[['Upload','User uploads any file'],['Analyze','AI detects type & tags'],['Sort','Document auto-sorted'],['Store','Filed in correct folder']]},
    {title:'AI KPI Anomaly Radar',timeSaved:'8–12 hrs/month',roi:'25×+',steps:[['Collect','Pull daily KPIs'],['Detect','AI spots unusual spikes/drops'],['Alert','Instant Slack/Email alert'],['Explain','AI explains root cause']]},
    {title:'AI Sales Call Debrief',timeSaved:'6 hrs/month',roi:'18×+',steps:[['Record','Sales call recorded'],['Analyze','AI extracts objections & opportunities'],['Score','Call scored on quality metrics'],['Next Steps','AI generates follow-up plan']]},
    {title:'Customer Onboarding Video Generator',timeSaved:'6 hrs/month',roi:'15×+',steps:[['Input','Customer data collected'],['Script','AI generates onboarding script'],['Render','AI renders video with voice-over'],['Deliver','Sent to new customer']]},
    {title:'AI Business Document Translator',timeSaved:'5 hrs/month',roi:'10×',steps:[['Input','Upload PDF or text'],['Translate','AI translates into business English'],['Polish','Style & clarity improvements'],['Export','Save translated version']]},
    {title:'AI Email Reply Generator',timeSaved:'15–30 hrs/month',roi:'7–12×',steps:[['Read','AI reads incoming email'],['Draft','AI generates context-aware reply'],['Review','Agent reviews & approves'],['Send','Email sent automatically']]},
    {title:'Health Insurance Verification',timeSaved:'10–15 hrs/month',roi:'10–12×+',steps:[['Eligibility','AI checks eligibility'],['Verification','AI verifies insurance'],['Reservation','Insurance verified'],['Booking','Patient scheduling confirmed']]},
    {title:'AI Website Sales Qualification Bot',timeSaved:'20+ hrs/month',roi:'12×+',steps:[['Chat','Visitor interacts with AI bot'],['Qualify','AI detects intent & budget'],['Score','Lead score created instantly'],['Book','Auto-booking for qualified leads']]},
    {title:'Automated Google Ads Reporting',timeSaved:'10 hrs/month',roi:'10–20×',steps:[['Pull','Extract data from Google Ads'],['Analyze','AI creates insights & recommendations'],['Generate','Create PDF/Slides report'],['Deliver','Sent to client or management']]}
  ];
  const cart=new Set();
  const wlist=document.getElementById('workflowsList');
  workflows.forEach(w=>{
    const row=document.createElement('div');
    row.className='workflow-row reveal';
    row.dataset.title=w.title;
    const stepsHTML=w.steps.map((s,i)=>{
      return `<div class="wf-step"><span class="num">${i+1}</span><span>${s[0]}</span><div class="tip">${s[1]}</div></div>${i<w.steps.length-1?'<span class="wf-arrow">→</span>':''}`;
    }).join('');
    row.innerHTML=`
      <div class="workflow-inner">
        <div class="wf-meta">
          <h3>${w.title}</h3>
          <div class="wf-tags">
            <span>🕒 ${w.timeSaved}</span>
            <span>📈 ROI: ${w.roi}</span>
          </div>
        </div>
        <div class="wf-steps">${stepsHTML}</div>
        <div class="wf-add">
          <button class="wf-add-btn"><span class="add-icon">+</span> <span class="add-label">Add Workflow</span></button>
        </div>
      </div>`;
    function toggle(){
      if(cart.has(w.title)){cart.delete(w.title);}else{cart.add(w.title);}
      updateRow();updateCartUI();
    }
    function updateRow(){
      const isIn=cart.has(w.title);
      row.classList.toggle('added',isIn);
      row.querySelector('.add-icon').textContent=isIn?'✓':'+';
      row.querySelector('.add-label').textContent=isIn?'Added':'Add Workflow';
    }
    row.addEventListener('click',toggle);
    row.querySelector('.wf-add-btn').addEventListener('click',e=>{e.stopPropagation();toggle();});
    wlist.appendChild(row);io.observe(row);
  });

  // Cart drawer wiring
  const drawer=document.getElementById('cartDrawer');
  const overlay=document.getElementById('cartOverlay');
  const cartFab=document.getElementById('cartFab');
  const cartCount=document.getElementById('cartCount');
  const cartBody=document.getElementById('cartBody');
  function openCart(){drawer.classList.add('open');overlay.classList.add('open')}
  function closeCart(){drawer.classList.remove('open');overlay.classList.remove('open')}
  cartFab.addEventListener('click',openCart);
  document.getElementById('cartClose').addEventListener('click',closeCart);
  overlay.addEventListener('click',closeCart);
  document.getElementById('viewCartLink').addEventListener('click',openCart);

  function updateCartUI(){
    cartCount.textContent=cart.size;
    cartFab.classList.toggle('show',cart.size>0);
    if(cart.size===0){
      cartBody.innerHTML='<div class="cart-empty">No workflows selected yet. Click any workflow above to add it.</div>';
      return;
    }
    cartBody.innerHTML='';
    cart.forEach(title=>{
      const w=workflows.find(x=>x.title===title);
      const item=document.createElement('div');
      item.className='cart-item';
      item.innerHTML=`<div><h4>${w.title}</h4><div class="meta"><span>🕒 ${w.timeSaved}</span><span>📈 ${w.roi}</span></div></div><button aria-label="Remove">✕</button>`;
      item.querySelector('button').addEventListener('click',()=>{
        cart.delete(title);
        const r=document.querySelector(`.workflow-row[data-title="${CSS.escape(title)}"]`);
        if(r){r.classList.remove('added');r.querySelector('.add-icon').textContent='+';r.querySelector('.add-label').textContent='Add Workflow';}
        updateCartUI();
      });
      cartBody.appendChild(item);
    });
  }
  updateCartUI();

  // Chat widget
  const chatWindow=document.getElementById('chatWindow');
  const chatFab=document.getElementById('chatFab');
  const chatMsgs=document.getElementById('chatMessages');
  function pushMsg(role,text){
    const m=document.createElement('div');
    m.className='chat-msg '+role;
    m.textContent=text;
    chatMsgs.appendChild(m);chatMsgs.scrollTop=chatMsgs.scrollHeight;
  }
  pushMsg('bot','Hi there! 👋 How can we help you automate your business today?');
  chatFab.addEventListener('click',()=>{chatWindow.classList.add('open');chatFab.style.display='none';});
  document.getElementById('chatClose').addEventListener('click',()=>{chatWindow.classList.remove('open');chatFab.style.display='';});
  document.getElementById('chatForm').addEventListener('submit',e=>{
    e.preventDefault();
    const inp=document.getElementById('chatInput');
    const v=inp.value.trim();if(!v)return;
    pushMsg('user',v);inp.value='';
    setTimeout(()=>pushMsg('bot','Thanks for reaching out! One of our AI architects will get back to you shortly. In the meantime, feel free to explore our workflow solutions above.'),700);
  });
})();
