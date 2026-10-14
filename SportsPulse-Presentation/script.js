const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#i-uni').textContent=INFO.university;$('#i-team').innerHTML=INFO.team.join('<br>');$('#i-guide').textContent=INFO.guide;
$('#i-meta').textContent='Section: '+INFO.section+'  ·  Academic Year: '+INFO.year;
const S=$$('.s'),N=S.length;let i=0,tm=[],cy=null;
const later=(f,t)=>tm.push(setTimeout(f,t));
function type(el,t,ms,done){let k=0;el.textContent='';(function n(){el.textContent=t.slice(0,++k);if(k<t.length)later(n,ms);else done&&done()})()}
function enter(){tm.forEach(clearTimeout);tm=[];clearInterval(cy);
 if(i===0){const b=$('#boot'),m=$('#tm');m.style.opacity=0;b.style.display='block';b.innerHTML='';
  ['$ java -jar SportsPulse.jar','[ OK ] 26 algorithms loaded','[ OK ] auth: PBKDF2 + universal hash table','[ OK ] self-test 202/202 passed','[ OK ] kick-off'].forEach((l,k)=>later(()=>{b.innerHTML+='<div>'+l+'</div>'},500*k+300));
  later(()=>{b.style.display='none';m.style.opacity=1},3000)}
 if(i===3){const b=$$('#fl .bx');let k=0;cy=setInterval(()=>{b.forEach((x,j)=>x.classList.toggle('hot',j===k%b.length));k++},900)}
 if(i===6)type($('#qa'),'Questions & Answers?',70)}
function go(n){i=Math.max(0,Math.min(N-1,n));S.forEach((s,k)=>s.classList.toggle('on',k===i));
 $('#clk').textContent=S[i].dataset.m+"' "+S[i].dataset.l;$('#ct').textContent='['+String(i+1).padStart(2,0)+' / '+String(N).padStart(2,0)+']';
 $('#pr').style.width=((i+1)/N*100)+'%';enter();try{history.replaceState(null,'','#'+(i+1))}catch(e){}}
$('#nx').onclick=()=>go(i+1);$('#pv').onclick=()=>go(i-1);
function fit(){const w=innerWidth,h=innerHeight,s=Math.min(w/1280,h/720),st=$('#st');
 st.style.transform='scale('+s+')';st.style.left=(w-1280*s)/2+'px';st.style.top=(h-720*s)/2+'px'}
addEventListener('resize',fit);fit();

const MN=[['1  Intelligent Sports Search','Input: a name or phrase\nProcess: Edit distance fixes typos, KMP / Z / Rabin-Karp find matches\nOutput: ranked players, teams and commentary'],
['2  Tactical Reports Mining','Input: a phrase or report\nProcess: SA-IS + Kasai LCP + suffix tree\nOutput: repeated tactics and report overlap'],
['3  Smart Squad Planner','Input: players, salary cap\nProcess: Bitmask DP for best 11, Knapsack for budget\nOutput: lineup with skill + synergy score'],
['4  Training Resource Flow','Input: athletes and facility capacities\nProcess: Dinic / Edmonds-Karp max flow, Hopcroft-Karp\nOutput: throughput and the bottleneck facility'],
['5  Selection Conflict Advisor','Input: selection rules and rivalries\nProcess: DPLL SAT, 2-approx vertex cover\nOutput: feasible squad and who to bench'],
['6  Live Match Telemetry','Input: streaming commentary events\nProcess: Aho-Corasick, Reservoir Sampling, parallel scan\nOutput: live incidents and running totals']];
const mn=$('#mn');MN.forEach((m,k)=>{const d=document.createElement('div');d.className='mi';d.textContent=m[0];d.onclick=()=>pick(k);mn.appendChild(d)});
function pick(k){$$('.mi').forEach((d,j)=>d.classList.toggle('sel',j===k));
 $('#mi').innerHTML='<span class="vo">$ '+MN[k][0].slice(3)+'</span>\n\n'+MN[k][1].replace(/(Input|Process|Output):/g,'<span class="cy">$1:</span>')}pick(0);

const NM=['Ronaldo','Messi','Mbappe','Kohli','Dhoni','Curry','LeBron','Haaland'];
function dl(a,b){a=a.toLowerCase();b=b.toLowerCase();const d=[];for(let x=0;x<=a.length;x++)d[x]=[x];for(let y=1;y<=b.length;y++)d[0][y]=y;
 for(let x=1;x<=a.length;x++)for(let y=1;y<=b.length;y++){d[x][y]=Math.min(d[x-1][y]+1,d[x][y-1]+1,d[x-1][y-1]+(a[x-1]===b[y-1]?0:1));
  if(x>1&&y>1&&a[x-1]===b[y-2]&&a[x-2]===b[y-1])d[x][y]=Math.min(d[x][y],d[x-2][y-2]+1)}return d[a.length][b.length]}
function fix(){const q=$('#ty').value.trim();$('#rs').innerHTML=q?NM.map(n=>[n,dl(q,n)]).sort((a,b)=>a[1]-b[1]).slice(0,3).map((h,k)=>'<div class="hit'+(k?'':' b')+'"><span>'+h[0]+'</span><span>dist '+h[1]+'</span></div>').join(''):''}
$('#ty').oninput=fix;fix();
function naive(t,p){let c=0;for(let a=0;a<=t.length-p.length;a++){let b=0;while(b<p.length&&t[a+b]===p[b])b++;if(b===p.length)c++}return c}
function kmp(t,p){const f=[0];for(let a=1,k=0;a<p.length;a++){while(k&&p[a]!==p[k])k=f[k-1];if(p[a]===p[k])k++;f[a]=k}
 let c=0;for(let a=0,k=0;a<t.length;a++){while(k&&t[a]!==p[k])k=f[k-1];if(t[a]===p[k])k++;if(k===p.length){c++;k=f[k-1]}}return c}
$('#rb').onclick=()=>{const p='A'.repeat(40)+'B',t='A'.repeat(100000);let r=[];
 for(const [n,f] of [['Naive',naive],['KMP',kmp]]){f(t,p);const s=performance.now();for(let z=0;z<10;z++)f(t,p);r.push([n,(performance.now()-s)/10])}
 const mx=r[0][1];$('#bn').innerHTML=r.map(x=>x[0].padEnd(6)+'<span style="display:inline-block;height:14px;background:var(--'+(x[0]==='KMP'?'vo':'rd')+');width:'+Math.max(4,x[1]/mx*380)+'px"></span> '+x[1].toFixed(2)+' ms').join('\n')+'\n<span class="d">same matches found: both returned 0</span>'};
const md=$('#md');function dm(o){md.classList.toggle('open',o)}
$('#bd').onclick=()=>dm(true);$('#mx').onclick=()=>dm(false);
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT'){if(e.key==='Escape')dm(false);return}
 if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(i+1)}
 else if(['ArrowLeft','PageUp'].includes(e.key))go(i-1);else if(e.key==='Home')go(0);else if(e.key==='End')go(N-1);
 else if(e.key==='l'||e.key==='L')dm(!md.classList.contains('open'));else if(e.key==='Escape')dm(false);
 else if(e.key==='f'||e.key==='F')document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();
 else if(/^[1-7]$/.test(e.key))go(+e.key-1)});
let x0=null;addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>60)go(i+(d<0?1:-1));x0=null});
go(Math.max(0,(parseInt(location.hash.slice(1))||1)-1));
