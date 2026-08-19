const { useState, useEffect, useMemo, useCallback, useRef } = React;
const h = React.createElement;

// ====== ÍCONES ======
function Icon({ children, size=16, strokeWidth=2, color="currentColor", style }) {
  return h("svg", { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth, strokeLinecap:"round", strokeLinejoin:"round", style }, children);
}
const Plus         = p => h(Icon,p, h("path",{d:"M12 5v14M5 12h14"}));
const X            = p => h(Icon,p, h("path",{d:"M18 6 6 18M6 6l12 12"}));
const Check        = p => h(Icon,p, h("path",{d:"M20 6 9 17l-5-5"}));
const Clock        = p => h(Icon,p, h("circle",{cx:12,cy:12,r:10}), h("path",{d:"M12 6v6l4 2"}));
const Users        = p => h(Icon,p, h("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}), h("circle",{cx:9,cy:7,r:4}), h("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}), h("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}));
const ChevronLeft  = p => h(Icon,p, h("path",{d:"m15 18-6-6 6-6"}));
const ChevronRight = p => h(Icon,p, h("path",{d:"m9 18 6-6-6-6"}));
const Trash2       = p => h(Icon,p, h("path",{d:"M3 6h18"}), h("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}), h("path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}));
const UserPlus     = p => h(Icon,p, h("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}), h("circle",{cx:9,cy:7,r:4}), h("line",{x1:19,y1:8,x2:19,y2:14}), h("line",{x1:22,y1:11,x2:16,y2:11}));
const CalendarDays = p => h(Icon,p, h("rect",{x:3,y:4,width:18,height:18,rx:2}), h("path",{d:"M16 2v4M8 2v4M3 10h18"}));
const Settings     = p => h(Icon,p, h("circle",{cx:12,cy:12,r:3}), h("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"}));
const Pencil       = p => h(Icon,p, h("path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"}));
const TrendingUp   = p => h(Icon,p, h("polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}), h("polyline",{points:"16 7 22 7 22 13"}));
const RefreshCw    = p => h(Icon,p, h("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}), h("path",{d:"M21 3v5h-5"}), h("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}), h("path",{d:"M8 16H3v5"}));
const Save         = p => h(Icon,p, h("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}), h("polyline",{points:"17 21 17 13 7 13 7 21"}), h("polyline",{points:"7 3 7 8 15 8"}));

// ====== CONSTANTES ======
const TURNOS = [
  { id:"manha",         label:"Manhã",        horario:"07:00 – 15:20", cor:"#D97757" },
  { id:"intermediario", label:"Intermediário", horario:"10:00 – 18:20", cor:"#B08968" },
  { id:"tarde",         label:"Tarde",         horario:"14:00 – 22:20", cor:"#5B8A72" },
  { id:"noite",         label:"Madrugada",     horario:"22:00 – 05:20", cor:"#4A5C7A" },
];
const VISAO_TODOS = { id:"todos", label:"Todos", horario:"Todos os turnos", cor:"#2B2620" };

const STATUS_SEED = [
  { id:"presente", label:"Presente",    short:"P",  color:"#1A7A4A", bg:"#D4F0E0" },
  { id:"falta",    label:"Falta",       short:"F",  color:"#C0392B", bg:"#FADBD8" },
  { id:"folga",    label:"Folga (DSR)", short:"D",  color:"#7F8C8D", bg:"#EAEDED" },
  { id:"ferias",   label:"Férias",      short:"FF", color:"#D68910", bg:"#FDEBD0" },
  { id:"atestado", label:"Atestado",    short:"AT", color:"#6C3483", bg:"#E8DAEF" },
];
const STATUS_VAZIO = { id:"vazio", label:"Não marcado", short:"", color:"#BDC3C7", bg:"#FFFFFF" };

const PALETA_CORES = [
  // Vermelhos / Rosas
  "#E74C3C","#C0392B","#E91E63","#AD1457","#FF1744",
  // Laranjas / Amarelos
  "#FF6B35","#E67E22","#F39C12","#FFB300","#F9A825",
  // Verdes
  "#1A7A4A","#27AE60","#2ECC71","#00C853","#558B2F",
  // Azuis / Ciano
  "#1565C0","#2980B9","#3498DB","#00BCD4","#0097A7",
  // Roxos
  "#6C3483","#8E44AD","#9B59B6","#7B1FA2","#AB47BC",
  // Outros
  "#2C3E50","#7F8C8D","#795548","#FF6F00","#00838F",
];

const FONTES = [
  { id:"system",   label:"Sistema",    css:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  { id:"rounded",  label:"Arredondada", css:"'SF Pro Rounded', 'Nunito', 'Varela Round', sans-serif" },
  { id:"mono",     label:"Mono",        css:"'SF Mono', 'Fira Code', 'Courier New', monospace" },
  { id:"serif",    label:"Serifada",    css:"'Georgia', 'Times New Roman', serif" },
];

const FUNCOES = ["Op. Loja","Pleno","Pleno PREV.","Líder","Estoque","Caixa"];
const WEEKDAY_LABELS = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"];

// ====== HELPERS DATA ======
function pad2(n){ return String(n).padStart(2,"0"); }
function isoDate(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function startOfWeek(date){ const d=new Date(date); d.setDate(d.getDate()-d.getDay()); d.setHours(0,0,0,0); return d; }
function addDays(date,n){ const d=new Date(date); d.setDate(d.getDate()+n); return d; }
function getWeekDays(anchor){ const s=startOfWeek(anchor); return Array.from({length:7},(_,i)=>addDays(s,i)); }
function formatRangeLabel(days){
  const [first,last]=[days[0],days[6]];
  const fmt=(d,wm)=>`${pad2(d.getDate())}${wm?`/${pad2(d.getMonth()+1)}`:""}`;
  return first.getMonth()===last.getMonth()?`${fmt(first,false)} – ${fmt(last,true)}`:`${fmt(first,true)} – ${fmt(last,true)}`;
}

// ====== HELPERS BANCO DE HORAS ======
function fmtSaldo(min){
  if(min===0) return { txt:"0h00", color:"#7F8C8D", bg:"#F2F3F4" };
  const abs=Math.abs(min), hh=Math.floor(abs/60), mm=abs%60;
  return min>0
    ? { txt:`+${hh}h${pad2(mm)}`, color:"#1A7A4A", bg:"#D4F0E0" }
    : { txt:`-${hh}h${pad2(mm)}`, color:"#C0392B", bg:"#FADBD8" };
}
function horaParaMin(str){ const [hh,mm]=(str||"00:00").split(":").map(Number); return (hh||0)*60+(mm||0); }
function minParaHora(min){ const abs=Math.abs(min); return `${pad2(Math.floor(abs/60))}:${pad2(abs%60)}`; }

// ====== GITHUB STORAGE ======
// Lê/salva arquivos JSON direto no repositório via GitHub API
// Token pessoal (classic) com permissão "repo" é necessário

const GH = {
  get owner(){ return localStorage.getItem("gh_owner")||""; },
  get repo(){ return localStorage.getItem("gh_repo")||""; },
  get token(){ return localStorage.getItem("gh_token")||""; },
  get branch(){ return localStorage.getItem("gh_branch")||"main"; },
  configured(){ return !!(this.owner && this.repo && this.token); },

  async _fetch(url, opts, tentativas=3){
    for(let i=0;i<tentativas;i++){
      try{ return await fetch(url,opts); }
      catch(e){
        if(i===tentativas-1) throw new Error("Sem conexão com o GitHub. Verifique sua internet.");
        await new Promise(r=>setTimeout(r,1200*(i+1)));
      }
    }
  },

  async read(path){
    const url=`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`;
    const r=await this._fetch(url,{headers:{"Authorization":`token ${this.token}`,"Accept":"application/vnd.github.v3+json"}});
    if(r.status===401) throw new Error("Token inválido ou expirado. Reconfigure.");
    if(r.status===403) throw new Error("Sem permissão. Token precisa do escopo 'repo'.");
    if(r.status===404) return { data:null, sha:null };
    if(!r.ok){ const e=await r.json().catch(()=>({})); throw new Error(e.message||`GitHub erro ${r.status}`); }
    const j=await r.json();
    const decoded = decodeURIComponent(atob(j.content.replace(/\n/g,"")).split("").map(c=>"%"+c.charCodeAt(0).toString(16).padStart(2,"0")).join(""));
    return { data: JSON.parse(decoded), sha: j.sha };
  },

  async write(path, data, sha){
    const url=`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
    const json = JSON.stringify(data,null,2);
    const encoded = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,(_,p1)=>String.fromCharCode(parseInt(p1,16))));
    const body={ message:`update ${path}`, content:encoded, branch:this.branch };
    if(sha) body.sha=sha;
    const hdrs={"Authorization":`token ${this.token}`,"Accept":"application/vnd.github.v3+json","Content-Type":"application/json"};
    const r=await this._fetch(url,{method:"PUT",headers:hdrs,body:JSON.stringify(body)});
    if(r.status===409){
      const current=await this.read(path);
      body.sha=current.sha;
      const r2=await this._fetch(url,{method:"PUT",headers:hdrs,body:JSON.stringify(body)});
      if(!r2.ok){ const e=await r2.json(); throw new Error(e.message||`GitHub write error ${r2.status}`); }
      const j2=await r2.json();
      return j2.content.sha;
    }
    if(!r.ok){ const e=await r.json(); throw new Error(e.message||`GitHub write error ${r.status}`); }
    const j=await r.json();
    return j.content.sha;
  }
};

// Fila global de saves — garante que apenas um save roda por vez
const saveQueue = {
  _queue: Promise.resolve(),
  add(fn){ this._queue = this._queue.then(()=>fn()).catch(()=>{}); return this._queue; }
};

// Cache local para operações offline e leitura rápida
const LC = {
  get(key,fb){ try{ const v=localStorage.getItem("cp:"+key); return v?JSON.parse(v):fb; }catch(e){ return fb; } },
  set(key,val){ try{ localStorage.setItem("cp:"+key,JSON.stringify(val)); }catch(e){} },
};

// ====== SEED ======
const SEED_COLABORADORES = [
  {id:"c1", matricula:"7153570", nome:"Anna Caroline",           funcao:"Op. Loja",    turno:"manha"},
  {id:"c2", matricula:"5624576", nome:"Cláudia Regina",          funcao:"Op. Loja",    turno:"manha"},
  {id:"c3", matricula:"6427510", nome:"Danillo de Souza",        funcao:"Op. Loja",    turno:"manha"},
  {id:"c4", matricula:"8005225", nome:"Francicleide dos Santos", funcao:"Op. Loja",    turno:"manha"},
  {id:"c5", matricula:"5885264", nome:"Joselito Dias Sobreira",  funcao:"Op. Loja",    turno:"manha"},
  {id:"c6", matricula:"5646375", nome:"Lizandra Araujo",         funcao:"Op. Loja",    turno:"manha"},
  {id:"c7", matricula:"6528910", nome:"Matheus Carlos",          funcao:"Op. Loja",    turno:"manha"},
  {id:"c8", matricula:"7026595", nome:"Maria Eduarda",           funcao:"Op. Loja",    turno:"manha"},
  {id:"c9", matricula:"6899153", nome:"Nataniel Sousa",          funcao:"Op. Loja",    turno:"manha"},
  {id:"c10",matricula:"6755461", nome:"Simone do Carmo",         funcao:"Op. Loja",    turno:"manha"},
  {id:"c11",matricula:"7026013", nome:"Victoria Aquino",         funcao:"Op. Loja",    turno:"manha"},
  {id:"c12",matricula:"6465951", nome:"Alfredo Nascimento",      funcao:"Op. Loja",    turno:"intermediario"},
  {id:"c13",matricula:"5361060", nome:"Gabriel Martins",         funcao:"Op. Loja",    turno:"intermediario"},
  {id:"c14",matricula:"4275195", nome:"Gleyce Kelly",            funcao:"Op. Loja",    turno:"intermediario"},
  {id:"c15",matricula:"5568978", nome:"Felipe Mota",             funcao:"Pleno",       turno:"tarde"},
  {id:"c16",matricula:"7237790", nome:"Flavio Ferreira",         funcao:"Pleno PREV.", turno:"tarde"},
  {id:"c17",matricula:"6926177", nome:"Alohan da Costa",         funcao:"Op. Loja",    turno:"tarde"},
  {id:"c18",matricula:"7237316", nome:"Daniele Teixeira",        funcao:"Op. Loja",    turno:"tarde"},
  {id:"c19",matricula:"7216165", nome:"Deivison Vieira",         funcao:"Op. Loja",    turno:"tarde"},
  {id:"c20",matricula:"7237308", nome:"Fernanda Pereira",        funcao:"Op. Loja",    turno:"tarde"},
  {id:"c21",matricula:"7029578", nome:"Jonas Felipe",            funcao:"Op. Loja",    turno:"tarde"},
  {id:"c22",matricula:"7160542", nome:"Kamili Conceição",        funcao:"Op. Loja",    turno:"tarde"},
  {id:"c23",matricula:"7115261", nome:"Leonard Gerard",          funcao:"Op. Loja",    turno:"tarde"},
  {id:"c24",matricula:"7029322", nome:"Marcelo da Silva",        funcao:"Op. Loja",    turno:"tarde"},
  {id:"c25",matricula:"7014252", nome:"Suelen da Silva",         funcao:"Op. Loja",    turno:"tarde"},
  {id:"c26",matricula:"7122659", nome:"Talia Mesquita",          funcao:"Op. Loja",    turno:"tarde"},
  {id:"c27",matricula:"7164289", nome:"Taissa Ferreira",         funcao:"Op. Loja",    turno:"tarde"},
  {id:"c28",matricula:"7231784", nome:"Andrey da Costa",         funcao:"Op. Loja",    turno:"noite"},
  {id:"c29",matricula:"6259731", nome:"Guilherme Veras",         funcao:"Op. Loja",    turno:"noite"},
  {id:"c30",matricula:"6739733", nome:"Lohan Rodrigues",         funcao:"Op. Loja",    turno:"noite"},
];

// ====== TELA DE CONFIGURAÇÃO GITHUB ======
function TelaConfig({ onConfigurado }){
  const [owner, setOwner] = useState(GH.owner);
  const [repo,  setRepo]  = useState(GH.repo);
  const [token, setToken] = useState(GH.token);
  const [branch,setBranch]= useState(GH.branch||"main");
  const [teste,  setTeste] = useState("");
  const [loading,setLoading]=useState(false);

  const conectar = async () => {
    if(!owner||!repo||!token){ setTeste("Preencha todos os campos."); return; }
    setLoading(true); setTeste("Testando conexão…");
    localStorage.setItem("gh_owner",owner.trim());
    localStorage.setItem("gh_repo", repo.trim());
    localStorage.setItem("gh_token",token.trim());
    localStorage.setItem("gh_branch",branch.trim()||"main");
    try{
      const url=`https://api.github.com/repos/${owner.trim()}/${repo.trim()}`;
      const r=await fetch(url,{headers:{"Authorization":`token ${token.trim()}`}});
      if(!r.ok) throw new Error("Repositório não encontrado ou token sem permissão.");
      setTeste("✓ Conectado!");
      setTimeout(()=>onConfigurado(),800);
    }catch(e){
      setTeste("Erro: "+e.message);
    }
    setLoading(false);
  };

  return h("div",{style:S.configScreen},
    h("div",{style:S.configCard},
      h("div",{style:{...S.brandMark,margin:"0 auto 16px"}},h(Clock,{size:22,color:"#FAF8F4",strokeWidth:2.2})),
      h("h1",{style:S.configTitle},"Configurar GitHub"),
      h("p",{style:S.configSub},
        "Os dados são salvos em arquivos JSON no seu repositório GitHub. ",
        "Precisará de um token com permissão ",h("strong",null,"repo"),"."
      ),

      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Usuário ou organização"),
        h("input",{style:S.input,value:owner,onChange:e=>setOwner(e.target.value),placeholder:"ex: digital-kpis"})
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Repositório"),
        h("input",{style:S.input,value:repo,onChange:e=>setRepo(e.target.value),placeholder:"ex: controle-presenca"})
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Branch"),
        h("input",{style:S.input,value:branch,onChange:e=>setBranch(e.target.value),placeholder:"main"})
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Token pessoal (classic) — permissão repo"),
        h("input",{style:S.input,value:token,onChange:e=>setToken(e.target.value),placeholder:"ghp_...",type:"password"}),
        h("p",{style:{...S.hintText,marginTop:6}},
          "Crie em: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)"
        )
      ),

      teste && h("p",{style:{
        fontSize:13,fontWeight:600,marginBottom:12,
        color:teste.startsWith("✓")?"#1A7A4A":"#C0392B"
      }},teste),

      h("button",{style:{...S.btnPrimary,width:"100%"},onClick:conectar,disabled:loading},
        loading?"Conectando…":"Conectar ao GitHub"
      )
    )
  );
}

// ====== APP PRINCIPAL ======
function ControlePresenca({ onDesconectar }){
  const [pronto,       setPronto]       = useState(false);
  const [salvando,     setSalvando]     = useState(false);
  const [pendentes,    setPendentes]    = useState(0); // mudanças aguardando save
  const [colaboradores,setColaboradores]= useState([]);
  const [presencas,    setPresencas]    = useState({});
  const [tiposStatus,  setTiposStatus]  = useState([]);
  const [bancoHoras,   setBancoHoras]   = useState([]);
  const [tela,         setTela]         = useState("presenca");
  const [turnoAtivo,   setTurnoAtivo]   = useState("manha");
  const [anchorDate,   setAnchorDate]   = useState(()=>new Date());
  const [showCadastro, setShowCadastro] = useState(false);
  const [editingColab, setEditingColab] = useState(null);
  const [confirmDelColab,setConfirmDelColab]=useState(null);
  const [showTipos,    setShowTipos]    = useState(false);
  const [showLanc,     setShowLanc]     = useState(false);
  const [editingLanc,  setEditingLanc]  = useState(null);
  const [bhFiltro,     setBhFiltro]     = useState(null);
  const [toast,        setToast]        = useState(null);

  // SHAs dos arquivos no GitHub (necessário para atualizar)
  const shas = useRef({});
  // Timer para debounce do save de presenças
  const saveTimer = useRef(null);
  // Ref que sempre tem o estado mais atual das presenças (evita closure stale)
  const presencasRef = useRef({});

  const showToast = useCallback((msg,err=false)=>{
    setToast({msg,err}); setTimeout(()=>setToast(null),3000);
  },[]);

  // ---- CARGA INICIAL ----
  useEffect(()=>{
    async function carregar(){
      // Carrega do cache local primeiro (instantâneo)
      const colabsCache  = LC.get("colaboradores", null);
      const tiposCache   = LC.get("tiposStatus", null);
      const presencasCache = LC.get("presencas", {});
      const bhCache      = LC.get("bancoHoras", []);

      if(colabsCache)  setColaboradores(colabsCache);
      if(tiposCache)   setTiposStatus(tiposCache);
      setPresencas(presencasCache);
      setBancoHoras(bhCache);
      if(colabsCache) setPronto(true); // mostra UI com cache enquanto busca do GitHub

      // Busca dados frescos do GitHub
      try{
        // Testa o repositório primeiro
        const testUrl=`https://api.github.com/repos/${GH.owner}/${GH.repo}`;
        const testR=await fetch(testUrl,{headers:{"Authorization":`token ${GH.token}`}});
        if(testR.status===401||testR.status===403) throw new Error("Token inválido ou expirado. Clique em 'Reconfigurar' para atualizar.");
        if(testR.status===404) throw new Error(`Repositório '${GH.owner}/${GH.repo}' não encontrado. Clique em 'Reconfigurar' para corrigir.`);

        const [rc,rt,rp,rb] = await Promise.all([
          GH.read("data/colaboradores.json"),
          GH.read("data/tipos_status.json"),
          GH.read("data/presencas.json"),
          GH.read("data/banco_horas.json"),
        ]);

        if(rc.data){ shas.current.colaboradores=rc.sha; setColaboradores(rc.data); LC.set("colaboradores",rc.data); }
        else {
          // Primeira vez: salva o seed
          const sha = await GH.write("data/colaboradores.json", SEED_COLABORADORES, null);
          shas.current.colaboradores = sha;
          setColaboradores(SEED_COLABORADORES);
          LC.set("colaboradores", SEED_COLABORADORES);
        }

        if(rt.data){ shas.current.tiposStatus=rt.sha; setTiposStatus(rt.data); LC.set("tiposStatus",rt.data); }
        else {
          const sha = await GH.write("data/tipos_status.json", STATUS_SEED, null);
          shas.current.tiposStatus = sha;
          setTiposStatus(STATUS_SEED);
          LC.set("tiposStatus", STATUS_SEED);
        }

        if(rp.data){ shas.current.presencas=rp.sha; presencasRef.current=rp.data; setPresencas(rp.data); LC.set("presencas",rp.data); }
        else { const sha=await GH.write("data/presencas.json",{},null); shas.current.presencas=sha; }

        if(rb.data){ shas.current.bancoHoras=rb.sha; setBancoHoras(rb.data); LC.set("bancoHoras",rb.data); }
        else { const sha=await GH.write("data/banco_horas.json",[],null); shas.current.bancoHoras=sha; }

      }catch(e){
        showToast("Erro ao carregar do GitHub: "+e.message, true);
      }
      setPronto(true);
    }
    carregar();
  },[]);

  // ---- SAVE GENÉRICO COM SHA ----
  const saveGitHub = useCallback((path, data, shaKey)=>{
    return saveQueue.add(async()=>{
      setSalvando(true);
      try{
        const sha = await GH.write(path, data, shas.current[shaKey]||null);
        shas.current[shaKey] = sha;
        LC.set(shaKey, data);
        return true;
      }catch(e){
        showToast("Erro ao salvar: "+e.message, true);
        return false;
      }finally{
        setSalvando(false);
      }
    });
  },[showToast]);

  // ---- PRESENÇA: save em lote com debounce de 2s — agrupa cliques rápidos ----
  const flushPresencas = useCallback(()=>{
    clearTimeout(saveTimer.current);
    setPendentes(p=>p+1);
    saveTimer.current = setTimeout(()=>{
      const snapshot = presencasRef.current;
      saveQueue.add(async()=>{
        setSalvando(true);
        try{
          const sha = await GH.write("data/presencas.json", snapshot, shas.current.presencas||null);
          shas.current.presencas = sha;
          LC.set("presencas", snapshot);
          setPendentes(0);
          showToast("Salvo ✓");
        }catch(e){
          showToast("Erro ao salvar: "+e.message, true);
          setPendentes(0);
        }finally{
          setSalvando(false);
        }
      });
    }, 2000);
  },[showToast]);

  const cycleStatus = useCallback((colabId, dateIso)=>{
    const key=`${colabId}:${dateIso}`;
    setPresencas(prev=>{
      const current = prev[key]||"vazio";
      const ids = ["vazio",...tiposStatus.map(t=>t.id)];
      const next = ids[(ids.indexOf(current)+1)%ids.length];
      const next_map = {...prev};
      if(next==="vazio") delete next_map[key]; else next_map[key]=next;
      // Atualiza a ref ANTES de agendar o save — garante que o timer sempre usa o estado mais atual
      presencasRef.current = next_map;
      flushPresencas();
      return next_map;
    });
  },[tiposStatus, flushPresencas]);

  // ---- COLABORADORES ----
  const handleSaveColab = useCallback(async colab=>{
    let next;
    if(colab.id && colaboradores.some(c=>c.id===colab.id)){
      next = colaboradores.map(c=>c.id===colab.id?{...c,...colab}:c);
    } else {
      next = [...colaboradores,{...colab,id:`c${Date.now()}`}]
        .sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"));
    }
    setColaboradores(next);
    await saveGitHub("data/colaboradores.json", next, "colaboradores");
    showToast(colab.id?"Colaborador atualizado":"Colaborador cadastrado");
    setShowCadastro(false); setEditingColab(null);
  },[colaboradores,saveGitHub,showToast]);

  const handleDeleteColab = useCallback(async id=>{
    const next = colaboradores.filter(c=>c.id!==id);
    setColaboradores(next);
    const nextP = {...presencas};
    Object.keys(nextP).forEach(k=>{ if(k.startsWith(id+":")) delete nextP[k]; });
    setPresencas(nextP);
    await saveGitHub("data/colaboradores.json", next, "colaboradores");
    await saveGitHub("data/presencas.json", nextP, "presencas");
    showToast("Colaborador removido");
    setConfirmDelColab(null);
  },[colaboradores,presencas,saveGitHub,showToast]);

  // ---- TIPOS STATUS ----
  const handleSaveTipo = useCallback(async tipo=>{
    let next;
    if(tipo.id && tiposStatus.some(t=>t.id===tipo.id)){
      next = tiposStatus.map(t=>t.id===tipo.id?{...t,...tipo}:t);
    } else {
      next = [...tiposStatus,{...tipo,id:`t${Date.now()}`}];
    }
    setTiposStatus(next);
    await saveGitHub("data/tipos_status.json", next, "tiposStatus");
    showToast("Tipo salvo");
  },[tiposStatus,saveGitHub,showToast]);

  const handleDeleteTipo = useCallback(async id=>{
    const next = tiposStatus.filter(t=>t.id!==id);
    setTiposStatus(next);
    const nextP = {...presencas};
    Object.keys(nextP).forEach(k=>{ if(nextP[k]===id) delete nextP[k]; });
    setPresencas(nextP);
    await saveGitHub("data/tipos_status.json", next, "tiposStatus");
    await saveGitHub("data/presencas.json", nextP, "presencas");
    showToast("Tipo removido");
  },[tiposStatus,presencas,saveGitHub,showToast]);

  // ---- BANCO DE HORAS ----
  const handleSaveLanc = useCallback(async lanc=>{
    let next;
    if(lanc.id && bancoHoras.some(b=>b.id===lanc.id)){
      next = bancoHoras.map(b=>b.id===lanc.id?{...b,...lanc}:b);
    } else {
      next = [{...lanc,id:`bh${Date.now()}`},...bancoHoras];
    }
    setBancoHoras(next);
    await saveGitHub("data/banco_horas.json", next, "bancoHoras");
    showToast("Horas salvas");
    setShowLanc(false); setEditingLanc(null);
  },[bancoHoras,saveGitHub,showToast]);

  const handleDeleteLanc = useCallback(async id=>{
    const next = bancoHoras.filter(b=>b.id!==id);
    setBancoHoras(next);
    await saveGitHub("data/banco_horas.json", next, "bancoHoras");
    showToast("Lançamento removido");
  },[bancoHoras,saveGitHub,showToast]);

  // Sync manual — puxa dados frescos do GitHub (404 = arquivo ainda não existe, tudo bem)
  const sincronizar = useCallback(async()=>{
    setSalvando(true);
    try{
      // Lê cada arquivo individualmente para que 404 em um não derrube os outros
      const ler = async(path) => { try{ return await GH.read(path); }catch(e){ return {data:null,sha:null}; } };
      const [rc,rt,rp,rb] = await Promise.all([
        ler("data/colaboradores.json"),
        ler("data/tipos_status.json"),
        ler("data/presencas.json"),
        ler("data/banco_horas.json"),
      ]);
      if(rc.data){ shas.current.colaboradores=rc.sha; setColaboradores(rc.data); LC.set("colaboradores",rc.data); }
      if(rt.data){ shas.current.tiposStatus=rt.sha; setTiposStatus(rt.data); LC.set("tiposStatus",rt.data); }
      if(rp.data){ shas.current.presencas=rp.sha; presencasRef.current=rp.data; setPresencas(rp.data); LC.set("presencas",rp.data); }
      if(rb.data){ shas.current.bancoHoras=rb.sha; setBancoHoras(rb.data); LC.set("bancoHoras",rb.data); }
      showToast("Sincronizado ✓");
    }catch(e){
      showToast("Erro ao sincronizar: "+e.message, true);
    }
    setSalvando(false);
  },[showToast]);

  const getStatusInfo = useCallback(id=>{
    if(!id||id==="vazio") return STATUS_VAZIO;
    return tiposStatus.find(t=>t.id===id)||STATUS_VAZIO;
  },[tiposStatus]);

  const saldosPorColab = useMemo(()=>{
    const m={}; bancoHoras.forEach(b=>{ m[b.colab_id]=(m[b.colab_id]||0)+b.minutos; }); return m;
  },[bancoHoras]);

  const weekDays = useMemo(()=>getWeekDays(anchorDate),[anchorDate]);
  const isVisaoTodos = turnoAtivo==="todos";
  const colaboradoresDoTurno = useMemo(()=>
    colaboradores.filter(c=>c.turno===turnoAtivo).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")),
    [colaboradores,turnoAtivo]
  );
  const gruposPorTurno = useMemo(()=>
    TURNOS.map(t=>({turno:t,items:colaboradores.filter(c=>c.turno===t.id).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"))})).filter(g=>g.items.length>0),
    [colaboradores]
  );

  if(!pronto) return h("div",{style:S.loadingScreen},
    h("div",{style:S.loadingDot}),
    h("p",{style:{color:"#9C9586",fontSize:13,marginTop:14}},"Carregando do GitHub…")
  );

  const turnoInfo = isVisaoTodos?VISAO_TODOS:TURNOS.find(t=>t.id===turnoAtivo);

  return h("div",{style:S.app},

    // HEADER
    h("header",{style:S.header},
      h("div",{style:S.headerTop},
        h("div",{style:S.brandRow},
          h("div",{style:S.brandMark},h(Clock,{size:18,color:"#FAF8F4",strokeWidth:2.2})),
          h("div",null,
            h("h1",{style:S.brandTitle},"Controle de Presença"),
            h("p",{style:S.brandSub},`${colaboradores.length} colaboradores`)
          )
        ),
        h("div",{style:{display:"flex",alignItems:"center",gap:6}},
          // Indicador de pendentes / salvando
          pendentes>0&&!salvando&&h("span",{style:S.pendenteBadge},`${pendentes} ✎`),
          salvando&&h("span",{style:S.salvandoBadge},"Salvando…"),
          h("button",{style:S.iconBtn2,onClick:sincronizar,title:"Sincronizar com GitHub"},
            h(RefreshCw,{size:16,color:"#5C5648",strokeWidth:2.2})
          ),
          h("button",{style:{...S.iconBtn2,fontSize:10,fontWeight:700,color:"#9C9586",padding:"0 8px",width:"auto"},
            onClick:onDesconectar,title:"Reconfigurar GitHub"},
            "⚙ Config"
          ),
          h("button",{style:S.addBtn,onClick:()=>{setEditingColab(null);setShowCadastro(true);}},
            h(UserPlus,{size:15,strokeWidth:2.2}),h("span",null,"Cadastrar")
          )
        )
      ),

      // Nav principal
      h("div",{style:S.navTabs},
        h("button",{style:{...S.navTab,...(tela==="presenca"?S.navTabAtivo:{})},onClick:()=>setTela("presenca")},
          h(CalendarDays,{size:14,color:tela==="presenca"?"#2B2620":"#9C9586",strokeWidth:2.2}),h("span",null,"Escala")
        ),
        h("button",{style:{...S.navTab,...(tela==="bancohoras"?S.navTabAtivo:{})},onClick:()=>setTela("bancohoras")},
          h(TrendingUp,{size:14,color:tela==="bancohoras"?"#2B2620":"#9C9586",strokeWidth:2.2}),h("span",null,"Banco de Horas")
        )
      ),

      // Sub-abas de turno (só na escala)
      tela==="presenca"&&h("div",{style:S.tabsRow},
        h("button",{onClick:()=>setTurnoAtivo("todos"),style:{...S.tab,...(isVisaoTodos?{...S.tabActive,borderColor:VISAO_TODOS.cor}:{})}},
          h(Users,{size:12,color:isVisaoTodos?VISAO_TODOS.cor:"#9C9586",strokeWidth:2.4}),
          h("span",{style:{fontWeight:isVisaoTodos?700:500,color:isVisaoTodos?"#2B2620":"#6B6458"}},"Todos"),
          h("span",{style:S.tabCount},colaboradores.length)
        ),
        h("span",{style:S.tabDivider}),
        ...TURNOS.map(t=>{
          const count=colaboradores.filter(c=>c.turno===t.id).length;
          const active=!isVisaoTodos&&t.id===turnoAtivo;
          return h("button",{key:t.id,onClick:()=>setTurnoAtivo(t.id),style:{...S.tab,...(active?{...S.tabActive,borderColor:t.cor}:{})}},
            h("span",{style:{...S.tabDot,background:active?t.cor:"#D8D2C5"}}),
            h("span",{style:{fontWeight:active?700:500,color:active?"#2B2620":"#6B6458"}},t.label),
            h("span",{style:S.tabCount},count)
          );
        })
      )
    ),

    // TELA ESCALA
    tela==="presenca"&&h("div",null,
      h("div",{style:S.subbar},
        h("div",{style:S.turnoChip},
          h("span",{style:{...S.turnoChipDot,background:turnoInfo.cor}}),
          h(CalendarDays,{size:14,color:"#8A8478"}),
          h("span",{style:S.turnoChipText},isVisaoTodos?`${gruposPorTurno.length} turnos · ${colaboradores.length} pessoas`:turnoInfo.horario)
        ),
        h("div",{style:S.weekNav},
          h("button",{style:S.weekNavBtn,onClick:()=>setAnchorDate(d=>addDays(d,-7))},h(ChevronLeft,{size:16})),
          h("span",{style:S.weekLabel},formatRangeLabel(weekDays)),
          h("button",{style:S.weekNavBtn,onClick:()=>setAnchorDate(d=>addDays(d,7))},h(ChevronRight,{size:16})),
          h("button",{style:S.weekTodayBtn,onClick:()=>setAnchorDate(new Date())},"Hoje")
        )
      ),

      h("div",{style:S.legend},
        ...tiposStatus.map(s=>h("div",{key:s.id,style:S.legendItem},
          h("span",{style:{...S.legendSwatch,background:s.bg,borderColor:s.color}},
            h("span",{style:{color:s.color,fontSize:10,fontWeight:900}},s.short)
          ),
          h("span",{style:S.legendText},s.label)
        )),
        h("button",{style:S.legendManageBtn,onClick:()=>setShowTipos(true)},
          h(Settings,{size:12,strokeWidth:2.4}),h("span",null,"Gerenciar tipos")
        )
      ),

      h("main",{style:S.tableWrap},
        (isVisaoTodos?colaboradores.length===0:colaboradoresDoTurno.length===0)?
          h("div",{style:S.emptyState},
            h(Users,{size:28,color:"#BDC3C7"}),
            h("p",{style:S.emptyTitle},"Nenhum colaborador"),
            h("button",{style:{...S.addBtn,marginTop:14},onClick:()=>{setEditingColab({turno:isVisaoTodos?"manha":turnoAtivo});setShowCadastro(true);}},
              h(Plus,{size:16}),h("span",null,"Cadastrar")
            )
          ):
          h("div",{style:S.scrollArea},
            h("table",{style:S.table},
              h("thead",null,h("tr",null,
                h("th",{style:S.thName},"Colaborador"),
                ...weekDays.map(d=>{
                  const isToday=isoDate(d)===isoDate(new Date()),isSun=d.getDay()===0;
                  return h("th",{key:d.toISOString(),style:{...S.thDay,...(isToday?S.thDayToday:{}),...(isSun&&!isToday?S.thDaySunday:{})}},
                    h("div",{style:{fontSize:10,fontWeight:700,letterSpacing:"0.04em"}},WEEKDAY_LABELS[d.getDay()]),
                    h("div",{style:{fontSize:13,fontWeight:800,marginTop:2}},`${pad2(d.getDate())}/${pad2(d.getMonth()+1)}`)
                  );
                })
              )),
              isVisaoTodos?
                gruposPorTurno.map(grupo=>h("tbody",{key:grupo.turno.id},
                  h("tr",null,h("td",{colSpan:8,style:{...S.groupHeaderCell,borderLeftColor:grupo.turno.cor}},
                    h("span",{style:{...S.groupHeaderDot,background:grupo.turno.cor}}),
                    h("span",{style:S.groupHeaderText},grupo.turno.label),
                    h("span",{style:S.groupHeaderHorario},grupo.turno.horario),
                    h("span",{style:S.groupHeaderCount},`${grupo.items.length} pessoas`)
                  )),
                  ...grupo.items.map((c,i)=>rowColab(c,i,weekDays,presencas,cycleStatus,
                    ()=>{setEditingColab(c);setShowCadastro(true);},()=>setConfirmDelColab(c),getStatusInfo))
                )):
                h("tbody",null,...colaboradoresDoTurno.map((c,i)=>rowColab(c,i,weekDays,presencas,cycleStatus,
                  ()=>{setEditingColab(c);setShowCadastro(true);},()=>setConfirmDelColab(c),getStatusInfo)))
            )
          )
      )
    ),

    // TELA BANCO DE HORAS
    tela==="bancohoras"&&h(TelaBancoHoras,{
      colaboradores,bancoHoras,saldosPorColab,bhFiltro,setBhFiltro,
      onNovo:()=>{setEditingLanc(null);setShowLanc(true);},
      onEditar:l=>{setEditingLanc(l);setShowLanc(true);},
      onDeletar:handleDeleteLanc,
    }),

    // MODAIS
    showCadastro&&h(CadastroModal,{initial:editingColab,onClose:()=>{setShowCadastro(false);setEditingColab(null);},onSave:handleSaveColab}),
    showTipos&&h(TiposModal,{tipos:tiposStatus,onClose:()=>setShowTipos(false),onSave:handleSaveTipo,onDelete:handleDeleteTipo}),
    showLanc&&h(LancamentoModal,{initial:editingLanc,colaboradores,onClose:()=>{setShowLanc(false);setEditingLanc(null);},onSave:handleSaveLanc}),
    confirmDelColab&&h("div",{style:S.modalOverlay,onClick:()=>setConfirmDelColab(null)},
      h("div",{style:S.confirmCard,onClick:e=>e.stopPropagation()},
        h("p",{style:S.confirmTitle},"Remover colaborador?"),
        h("p",{style:S.confirmText},`${confirmDelColab.nome} será removido com todo o histórico.`),
        h("div",{style:S.confirmActions},
          h("button",{style:S.btnGhost,onClick:()=>setConfirmDelColab(null)},"Cancelar"),
          h("button",{style:S.btnDanger,onClick:()=>handleDeleteColab(confirmDelColab.id)},"Remover")
        )
      )
    ),
    toast&&h("div",{style:{...S.toast,background:toast.err?"#C0392B":"#2B2620"}},toast.msg)
  );
}

// ====== LINHA DA TABELA ======
function rowColab(colab,index,weekDays,presencas,onCycle,onEdit,onDelete,getStatusInfo){
  return h("tr",{key:colab.id,style:index%2===1?{background:"#FBFAF7"}:undefined},
    h("td",{style:S.tdName},
      h("div",{style:S.nameCell},
        h("div",null,
          h("div",{style:S.nameText},colab.nome),
          h("div",{style:S.nameMeta},`${colab.matricula} · ${colab.funcao}`)
        ),
        h("div",{style:S.nameActions},
          h("button",{style:S.iconBtn,onClick:onEdit},h(Pencil,{size:13})),
          h("button",{style:{...S.iconBtn,color:"#C0392B"},onClick:onDelete},h(Trash2,{size:13}))
        )
      )
    ),
    ...weekDays.map(d=>{
      const dateIso=isoDate(d),key=`${colab.id}:${dateIso}`;
      const status=presencas[key]||"vazio",s=getStatusInfo(status);
      const isToday=dateIso===isoDate(new Date()),marcado=status!=="vazio";
      return h("td",{key,style:S.tdCell},
        h("button",{
          onClick:()=>onCycle(colab.id,dateIso),
          style:{
            ...S.cellBtn,
            background: isToday&&!marcado?"#FEF9F0":marcado?s.color:"#FFFFFF",
            borderColor: isToday?"#2B2620":marcado?s.color:"#E8E3D8",
            borderWidth: isToday||marcado?2:1,
            color: marcado?"#FFFFFF":s.color,
            fontWeight: marcado?900:600,
            boxShadow: marcado?`0 2px 6px ${s.color}55`:"none",
          }
        },s.short)
      );
    })
  );
}

// ====== TELA BANCO DE HORAS ======
function TelaBancoHoras({colaboradores,bancoHoras,saldosPorColab,bhFiltro,setBhFiltro,onNovo,onEditar,onDeletar}){
  const [confirmDel,setConfirmDel]=useState(null);
  const [filtroTurno,setFiltroTurno]=useState("todos");
  const colabsFiltrados=useMemo(()=>
    colaboradores.filter(c=>filtroTurno==="todos"||c.turno===filtroTurno).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")),
    [colaboradores,filtroTurno]
  );
  const lancsFiltrados=useMemo(()=>
    bancoHoras.filter(b=>!bhFiltro||b.colab_id===bhFiltro).sort((a,b)=>b.data.localeCompare(a.data)),
    [bancoHoras,bhFiltro]
  );
  const colabSel=bhFiltro?colaboradores.find(c=>c.id===bhFiltro):null;

  return h("div",{style:S.bhWrap},
    h("div",{style:S.bhSaldosSection},
      h("div",{style:S.bhSaldosHeader},
        h("span",{style:S.bhSaldosTitle},"Saldo por colaborador"),
        h("div",{style:{display:"flex",gap:4,flexWrap:"wrap"}},
          h("button",{style:{...S.bhFiltroBtn,...(filtroTurno==="todos"?S.bhFiltroBtnTodos:{})},onClick:()=>setFiltroTurno("todos")},"Todos"),
          ...TURNOS.map(t=>h("button",{key:t.id,
            style:{...S.bhFiltroBtn,...(filtroTurno===t.id?{background:t.cor,borderColor:t.cor,color:"#FFF",fontWeight:700}:{})},
            onClick:()=>setFiltroTurno(t.id)
          },t.label))
        )
      ),
      h("div",{style:S.bhSaldosList},
        colabsFiltrados.map(c=>{
          const min=saldosPorColab[c.id]||0,{txt,color,bg}=fmtSaldo(min),ativo=bhFiltro===c.id;
          return h("button",{key:c.id,style:{...S.bhSaldoCard,...(ativo?{background:"#2B2620",borderColor:"#2B2620"}:{})},onClick:()=>setBhFiltro(ativo?null:c.id)},
            h("div",{style:{...S.bhSaldoNome,...(ativo?{color:"#FAF8F4"}:{})}},c.nome),
            h("div",{style:{...S.bhSaldoMeta,...(ativo?{color:"#C9C3B8"}:{})}},c.funcao+" · "+(TURNOS.find(t=>t.id===c.turno)?.label||"")),
            h("div",{style:{fontSize:14,fontWeight:900,background:ativo?"rgba(255,255,255,0.12)":bg,color:ativo?(min===0?"#C9C3B8":min>0?"#8FD4A8":"#F4A198"):color,borderRadius:8,padding:"3px 8px",marginTop:4}},txt)
          );
        })
      )
    ),
    h("div",{style:S.bhLancsSection},
      h("div",{style:S.bhLancsHeader},
        h("div",null,
          h("span",{style:S.bhSaldosTitle},colabSel?`Lançamentos — ${colabSel.nome}`:"Todos os lançamentos"),
          colabSel&&h("button",{style:S.bhLimparFiltro,onClick:()=>setBhFiltro(null)},"× Ver todos")
        ),
        h("button",{style:S.addBtn,onClick:onNovo},h(Plus,{size:15,strokeWidth:2.5}),h("span",null,"Lançar horas"))
      ),
      lancsFiltrados.length===0?
        h("div",{style:S.bhEmpty},
          h("p",{style:S.bhEmptyTitle},"Nenhum lançamento"),
          h("p",{style:S.bhEmptySub},"Use 'Lançar horas' para registrar créditos ou débitos.")
        ):
        h("div",{style:S.bhLancsList},
          lancsFiltrados.map(b=>{
            const colab=colaboradores.find(c=>c.id===b.colab_id),{txt,color,bg}=fmtSaldo(b.minutos);
            return h("div",{key:b.id,style:S.bhLancCard},
              h("div",{style:S.bhLancLeft},
                h("div",{style:{...S.bhLancTipo,background:b.minutos>0?"#D4F0E0":"#FADBD8",color:b.minutos>0?"#1A7A4A":"#C0392B"}},b.minutos>0?"+":"−"),
                h("div",null,
                  h("div",{style:S.bhLancNome},colab?colab.nome:b.colab_id),
                  h("div",{style:S.bhLancMeta},b.data.split("-").reverse().join("/")+(b.descricao?" · "+b.descricao:""))
                )
              ),
              h("div",{style:S.bhLancRight},
                h("span",{style:{fontSize:14,fontWeight:800,color,background:bg,borderRadius:8,padding:"4px 10px"}},txt),
                h("div",{style:{display:"flex",gap:2,marginTop:4}},
                  h("button",{style:S.iconBtn,onClick:()=>onEditar(b)},h(Pencil,{size:13})),
                  h("button",{style:{...S.iconBtn,color:"#C0392B"},onClick:()=>setConfirmDel(b)},h(Trash2,{size:13}))
                )
              )
            );
          })
        )
    ),
    confirmDel&&h("div",{style:S.modalOverlay,onClick:()=>setConfirmDel(null)},
      h("div",{style:S.confirmCard,onClick:e=>e.stopPropagation()},
        h("p",{style:S.confirmTitle},"Remover lançamento?"),
        h("p",{style:S.confirmText},`${fmtSaldo(confirmDel.minutos).txt} — ${confirmDel.data.split("-").reverse().join("/")}${confirmDel.descricao?" — "+confirmDel.descricao:""}`),
        h("div",{style:S.confirmActions},
          h("button",{style:S.btnGhost,onClick:()=>setConfirmDel(null)},"Cancelar"),
          h("button",{style:S.btnDanger,onClick:()=>{onDeletar(confirmDel.id);setConfirmDel(null);}},"Remover")
        )
      )
    )
  );
}

// ====== MODAL LANÇAMENTO ======
function LancamentoModal({initial,colaboradores,onClose,onSave}){
  const isEdit=Boolean(initial&&initial.id);
  const [colabId,setColabId]=useState(initial?.colab_id||"");
  const [data,setData]=useState(initial?.data||isoDate(new Date()));
  const [tipo,setTipo]=useState(initial?(initial.minutos>0?"credito":"debito"):"credito");
  const [horas,setHoras]=useState(initial?minParaHora(Math.abs(initial.minutos)):"01:00");
  const [descricao,setDescricao]=useState(initial?.descricao||"");
  const [error,setError]=useState("");
  const submit=()=>{
    if(!colabId){setError("Selecione um colaborador.");return;}
    const min=horaParaMin(horas);
    if(!min){setError("Informe um tempo válido.");return;}
    onSave({id:initial?.id,colab_id:colabId,data,minutos:tipo==="credito"?min:-min,descricao:descricao.trim()});
  };
  return h("div",{style:S.modalOverlay,onClick:onClose},
    h("div",{style:S.modalCard,onClick:e=>e.stopPropagation()},
      h("div",{style:S.modalHeader},
        h("h2",{style:S.modalTitle},isEdit?"Editar lançamento":"Lançar horas"),
        h("button",{style:S.modalClose,onClick:onClose},h(X,{size:18}))
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Colaborador"),
        h("select",{style:{...S.input,color:colabId?"#2B2620":"#9C9586"},value:colabId,onChange:e=>setColabId(e.target.value)},
          h("option",{value:""},"— Selecione —"),
          ...[...colaboradores].sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")).map(c=>h("option",{key:c.id,value:c.id},c.nome+" ("+(TURNOS.find(t=>t.id===c.turno)?.label||c.turno)+")"))
        )
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Tipo"),
        h("div",{style:{display:"flex",gap:8}},
          h("button",{onClick:()=>setTipo("credito"),style:{flex:1,padding:"12px",borderRadius:10,fontSize:13,fontWeight:700,display:"flex",flexDirection:"column",alignItems:"center",gap:3,border:tipo==="credito"?"2px solid #1A7A4A":"2px solid #E8E3D8",background:tipo==="credito"?"#1A7A4A":"#FFF",color:tipo==="credito"?"#FFF":"#9C9586",boxShadow:tipo==="credito"?"0 3px 12px #1A7A4A44":"none"}},
            h("span",{style:{fontSize:22}},"+"),h("span",null,"Crédito"),h("span",{style:{fontSize:11,opacity:.8}},"Horas extras")
          ),
          h("button",{onClick:()=>setTipo("debito"),style:{flex:1,padding:"12px",borderRadius:10,fontSize:13,fontWeight:700,display:"flex",flexDirection:"column",alignItems:"center",gap:3,border:tipo==="debito"?"2px solid #C0392B":"2px solid #E8E3D8",background:tipo==="debito"?"#C0392B":"#FFF",color:tipo==="debito"?"#FFF":"#9C9586",boxShadow:tipo==="debito"?"0 3px 12px #C0392B44":"none"}},
            h("span",{style:{fontSize:22}},"−"),h("span",null,"Débito"),h("span",{style:{fontSize:11,opacity:.8}},"Compensação")
          )
        )
      ),
      h("div",{style:{display:"flex",gap:12}},
        h("div",{style:{...S.formGroup,flex:1}},h("label",{style:S.label},"Data"),h("input",{style:S.input,type:"date",value:data,onChange:e=>setData(e.target.value)})),
        h("div",{style:{...S.formGroup,flex:1}},h("label",{style:S.label},"Horas"),h("input",{style:S.input,type:"time",value:horas,onChange:e=>setHoras(e.target.value),min:"00:01",step:300}))
      ),
      h("div",{style:S.formGroup},h("label",{style:S.label},"Observação (opcional)"),h("input",{style:S.input,value:descricao,onChange:e=>setDescricao(e.target.value),placeholder:"Ex.: Inventário, cobertura de folga…"})),
      error&&h("p",{style:S.errorText},error),
      h("div",{style:S.modalActions},
        h("button",{style:S.btnGhost,onClick:onClose},"Cancelar"),
        h("button",{style:S.btnPrimary,onClick:submit},h(Check,{size:15,strokeWidth:2.5}),isEdit?"Salvar":"Lançar")
      )
    )
  );
}

// ====== MODAL CADASTRO ======
function CadastroModal({initial,onClose,onSave}){
  const isEdit=Boolean(initial&&initial.id);
  const [nome,setNome]=useState(initial?.nome||"");
  const [matricula,setMatricula]=useState(initial?.matricula||"");
  const [funcao,setFuncao]=useState(initial?.funcao||FUNCOES[0]);
  const [turno,setTurno]=useState(initial?.turno||"manha");
  const [error,setError]=useState("");
  const submit=()=>{
    if(!nome.trim()){setError("Informe o nome.");return;}
    if(!matricula.trim()){setError("Informe a matrícula.");return;}
    onSave({id:initial?.id,nome:nome.trim(),matricula:matricula.trim(),funcao,turno});
  };
  return h("div",{style:S.modalOverlay,onClick:onClose},
    h("div",{style:S.modalCard,onClick:e=>e.stopPropagation()},
      h("div",{style:S.modalHeader},
        h("h2",{style:S.modalTitle},isEdit?"Editar colaborador":"Novo colaborador"),
        h("button",{style:S.modalClose,onClick:onClose},h(X,{size:18}))
      ),
      h("div",{style:S.formGroup},h("label",{style:S.label},"Nome completo"),h("input",{style:S.input,value:nome,onChange:e=>setNome(e.target.value),placeholder:"Ex.: Anna Caroline",autoFocus:true})),
      h("div",{style:S.formGroup},h("label",{style:S.label},"Matrícula"),h("input",{style:S.input,value:matricula,onChange:e=>setMatricula(e.target.value.replace(/[^0-9]/g,"")),placeholder:"Ex.: 7153570",inputMode:"numeric"})),
      h("div",{style:S.formGroup},h("label",{style:S.label},"Função"),h("div",{style:S.chipRow},...FUNCOES.map(f=>h("button",{key:f,onClick:()=>setFuncao(f),style:{...S.chip,...(funcao===f?S.chipActive:{})}},f)))),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Turno"),
        h("div",{style:S.chipRow},...TURNOS.map(t=>h("button",{key:t.id,onClick:()=>setTurno(t.id),style:{...S.chip,...(turno===t.id?{background:t.cor,borderColor:t.cor,color:"#FFF",fontWeight:700,boxShadow:`0 2px 8px ${t.cor}55`}:{})}},t.label))),
        h("p",{style:S.hintText},TURNOS.find(t=>t.id===turno)?.horario)
      ),
      error&&h("p",{style:S.errorText},error),
      h("div",{style:S.modalActions},
        h("button",{style:S.btnGhost,onClick:onClose},"Cancelar"),
        h("button",{style:S.btnPrimary,onClick:submit},h(Check,{size:15,strokeWidth:2.5}),isEdit?"Salvar":"Cadastrar")
      )
    )
  );
}

// ====== MODAL TIPOS STATUS ======
function TiposModal({tipos,onClose,onSave,onDelete}){
  const [editing,setEditing]=useState(null);
  const [confirmDel,setConfirmDel]=useState(null);
  if(editing!==null) return h(TipoForm,{initial:editing.id?editing:null,onClose:()=>setEditing(null),onSave:t=>{onSave(t);setEditing(null);}});
  return h("div",{style:S.modalOverlay,onClick:onClose},
    h("div",{style:S.modalCard,onClick:e=>e.stopPropagation()},
      h("div",{style:S.modalHeader},
        h("h2",{style:S.modalTitle},"Tipos de presença"),
        h("button",{style:S.modalClose,onClick:onClose},h(X,{size:18}))
      ),
      h("div",{style:S.tiposList},
        ...tipos.map(t=>h("div",{key:t.id,style:S.tipoRow},
          h("span",{style:{...S.tipoSwatch,background:t.bg,borderColor:t.color,color:t.color,fontWeight:900}},t.short),
          h("span",{style:S.tipoNome},t.label),
          t.fixo&&h("span",{style:S.tipoFixoBadge},"fixo"),
          h("div",{style:S.tipoActions},
            h("button",{style:S.iconBtn,onClick:()=>setEditing(t)},h(Pencil,{size:13})),
            !t.fixo&&h("button",{style:{...S.iconBtn,color:"#C0392B"},onClick:()=>setConfirmDel(t)},h(Trash2,{size:13}))
          )
        ))
      ),
      h("button",{style:S.addTipoBtn,onClick:()=>setEditing({})},h(Plus,{size:15,strokeWidth:2.4})," Novo tipo"),
      h("div",{style:S.modalActions},h("button",{style:{...S.btnPrimary,flex:1},onClick:onClose},"Concluído"))
    ),
    confirmDel&&h("div",{style:S.modalOverlay,onClick:e=>e.stopPropagation()},
      h("div",{style:S.confirmCard,onClick:e=>e.stopPropagation()},
        h("p",{style:S.confirmTitle},`Remover "${confirmDel.label}"?`),
        h("p",{style:S.confirmText},"As marcações com esse tipo voltarão a ficar em branco."),
        h("div",{style:S.confirmActions},
          h("button",{style:S.btnGhost,onClick:()=>setConfirmDel(null)},"Cancelar"),
          h("button",{style:S.btnDanger,onClick:()=>{onDelete(confirmDel.id);setConfirmDel(null);}},"Remover")
        )
      )
    )
  );
}

// ====== FORM TIPO ======
function TipoForm({initial,onClose,onSave}){
  const isEdit=Boolean(initial&&initial.id);
  const [label,setLabel]=useState(initial?.label||"");
  const [short,setShort]=useState(initial?.short||"");
  const [color,setColor]=useState(initial?.color||PALETA_CORES[0]);
  const [fonte,setFonte]=useState(initial?.fonte||"system");
  const [error,setError]=useState("");
  const bg=hex=>hex+"22";
  const submit=()=>{
    if(!label.trim()){setError("Dê um nome.");return;}
    if(!short.trim()){setError("Defina uma sigla.");return;}
    onSave({id:initial?.id,label:label.trim(),short:short.trim().toUpperCase().slice(0,3),color,bg:bg(color),fonte});
  };
  const fonteCss=FONTES.find(f=>f.id===fonte)?.css||FONTES[0].css;
  return h("div",{style:S.modalOverlay,onClick:onClose},
    h("div",{style:{...S.modalCard,maxHeight:"92vh"},onClick:e=>e.stopPropagation()},
      h("div",{style:S.modalHeader},
        h("h2",{style:S.modalTitle},isEdit?"Editar tipo":"Novo tipo"),
        h("button",{style:S.modalClose,onClick:onClose},h(X,{size:18}))
      ),
      h("div",{style:S.formGroup},h("label",{style:S.label},"Nome"),h("input",{style:S.input,value:label,onChange:e=>setLabel(e.target.value),placeholder:"Ex.: Licença médica",autoFocus:true})),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Sigla (até 3 letras)"),
        h("input",{style:{...S.input,maxWidth:100,textTransform:"uppercase",fontFamily:fonteCss,fontSize:16,fontWeight:900},value:short,onChange:e=>setShort(e.target.value.slice(0,3)),placeholder:"LM"})
      ),

      // FONTE
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Fonte da sigla"),
        h("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},
          ...FONTES.map(f=>h("button",{key:f.id,onClick:()=>setFonte(f.id),style:{
            padding:"8px 12px",borderRadius:8,fontSize:13,fontFamily:f.css,fontWeight:700,
            border:fonte===f.id?"2px solid #2B2620":"2px solid #E8E3D8",
            background:fonte===f.id?"#2B2620":"#FFF",
            color:fonte===f.id?"#FAF8F4":"#5C5648",
            boxShadow:fonte===f.id?"0 2px 8px rgba(43,38,32,0.25)":"none",
          }},f.label))
        )
      ),

      // PALETA DE CORES VIVAS
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Cor"),
        h("div",{style:{display:"flex",flexWrap:"wrap",gap:8}},
          ...PALETA_CORES.map(c=>h("button",{key:c,onClick:()=>setColor(c),style:{
            width:32,height:32,borderRadius:"50%",background:c,flexShrink:0,
            border:color===c?"3px solid #2B2620":"3px solid transparent",
            boxShadow:color===c?`0 0 0 2px #FFF inset, 0 3px 10px ${c}88`:`0 1px 3px ${c}66`,
            transform:color===c?"scale(1.2)":"scale(1)",
            transition:"all 0.12s",
          }}))
        )
      ),

      // PRÉ-VISUALIZAÇÃO
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Pré-visualização"),
        h("div",{style:{display:"flex",gap:12,alignItems:"center"}},
          h("div",{style:{
            width:44,height:38,borderRadius:8,
            background:color,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:13,fontWeight:900,color:"#FFF",
            fontFamily:fonteCss,
            boxShadow:`0 2px 8px ${color}66`,
          }},short||"—"),
          h("div",{style:{
            width:44,height:38,borderRadius:8,
            background:bg(color),border:`2px solid ${color}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:13,fontWeight:900,color,
            fontFamily:fonteCss,
          }},short||"—"),
          h("span",{style:{fontSize:11.5,color:"#9C9586"}},"Na célula ativo / Em destaque")
        )
      ),

      error&&h("p",{style:S.errorText},error),
      h("div",{style:S.modalActions},
        h("button",{style:S.btnGhost,onClick:onClose},"Cancelar"),
        h("button",{style:S.btnPrimary,onClick:submit},h(Check,{size:15,strokeWidth:2.5}),isEdit?"Salvar":"Cadastrar")
      )
    )
  );
}

// ====== ROOT ======
function Root(){
  const [configurado,setConfigurado]=useState(GH.configured());
  if(!configurado) return h(TelaConfig,{onConfigurado:()=>setConfigurado(true)});
  return h(ControlePresenca,{onDesconectar:()=>{
    ["gh_owner","gh_repo","gh_token","gh_branch"].forEach(k=>localStorage.removeItem(k));
    setConfigurado(false);
  }});
}

// ====== ESTILOS ======
const FD="'Iowan Old Style',Georgia,serif";
const S={
  app:{minHeight:"100vh",background:"#FAF8F4",color:"#2B2620",paddingBottom:60},
  loadingScreen:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#FAF8F4"},
  loadingDot:{width:10,height:10,borderRadius:"50%",background:"#D97757",animation:"pulse 1.2s ease-in-out infinite"},
  configScreen:{minHeight:"100vh",background:"#FAF8F4",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"20px 0 40px"},
  configCard:{background:"#FFF",borderRadius:16,padding:"24px 20px",maxWidth:460,width:"100%",margin:"0 12px",boxShadow:"0 2px 20px rgba(43,38,32,0.1)"},
  configTitle:{fontFamily:FD,fontSize:20,fontWeight:700,margin:"0 0 6px"},
  configSub:{fontSize:13,color:"#6B6458",margin:"0 0 20px",lineHeight:1.6},
  header:{background:"#FFF",borderBottom:"1px solid #EFEBE2",position:"sticky",top:0,zIndex:10},
  headerTop:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",gap:10},
  brandRow:{display:"flex",alignItems:"center",gap:10,minWidth:0},
  brandMark:{width:34,height:34,borderRadius:9,background:"#2B2620",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  brandTitle:{fontFamily:FD,fontSize:17,fontWeight:700,margin:0,lineHeight:1.2,whiteSpace:"nowrap"},
  brandSub:{fontSize:11,color:"#9C9586",margin:"2px 0 0"},
  addBtn:{display:"flex",alignItems:"center",gap:5,background:"#2B2620",color:"#FAF8F4",border:"none",borderRadius:8,padding:"8px 12px",fontSize:12.5,fontWeight:600,flexShrink:0},
  iconBtn2:{width:32,height:32,borderRadius:8,border:"1px solid #EFEBE2",background:"#FFF",display:"flex",alignItems:"center",justifyContent:"center"},
  pendenteBadge:{fontSize:11,fontWeight:700,color:"#D68910",background:"#FEF9F0",border:"1px solid #F9A825",borderRadius:999,padding:"3px 8px"},
  salvandoBadge:{fontSize:11,fontWeight:700,color:"#2980B9",background:"#EBF5FB",border:"1px solid #3498DB",borderRadius:999,padding:"3px 8px"},
  navTabs:{display:"flex",borderBottom:"2px solid #EFEBE2",margin:"0 16px"},
  navTab:{display:"flex",alignItems:"center",gap:6,padding:"10px 12px",fontSize:13,fontWeight:600,color:"#9C9586",border:"none",background:"transparent",borderBottom:"2px solid transparent",marginBottom:-2,cursor:"pointer"},
  navTabAtivo:{color:"#2B2620",borderBottomColor:"#2B2620",fontWeight:800},
  tabsRow:{display:"flex",gap:5,padding:"8px 12px",overflowX:"auto",alignItems:"center"},
  tab:{display:"flex",alignItems:"center",gap:5,background:"#F4F1EA",border:"1.5px solid transparent",borderRadius:999,padding:"6px 11px",fontSize:12,whiteSpace:"nowrap",flexShrink:0},
  tabActive:{background:"#FFF",boxShadow:"0 1px 3px rgba(43,38,32,0.08)"},
  tabDot:{width:6,height:6,borderRadius:"50%",flexShrink:0},
  tabCount:{background:"#EFEBE2",borderRadius:999,padding:"1px 6px",fontSize:10,fontWeight:700,color:"#8A8478"},
  tabDivider:{width:1,alignSelf:"stretch",background:"#E8E3D8",margin:"2px 2px",flexShrink:0},
  subbar:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,padding:"10px 16px 0"},
  turnoChip:{display:"flex",alignItems:"center",gap:6,background:"#FFF",border:"1px solid #EFEBE2",borderRadius:8,padding:"5px 10px"},
  turnoChipDot:{width:7,height:7,borderRadius:"50%"},
  turnoChipText:{fontSize:12,fontWeight:600,color:"#5C5648"},
  weekNav:{display:"flex",alignItems:"center",gap:3},
  weekNavBtn:{width:28,height:28,borderRadius:7,border:"1px solid #EFEBE2",background:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",color:"#5C5648"},
  weekLabel:{fontSize:12,fontWeight:700,color:"#2B2620",margin:"0 5px",minWidth:80,textAlign:"center"},
  weekTodayBtn:{border:"1px solid #EFEBE2",background:"#FFF",borderRadius:7,padding:"5px 9px",fontSize:11.5,fontWeight:600,color:"#5C5648",marginLeft:3},
  legend:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:10,padding:"10px 16px 6px"},
  legendItem:{display:"flex",alignItems:"center",gap:4},
  legendSwatch:{width:20,height:18,borderRadius:5,border:"1.5px solid",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  legendText:{fontSize:11,color:"#6B6458"},
  legendManageBtn:{display:"flex",alignItems:"center",gap:4,background:"#F4F1EA",border:"1px solid #E8E3D8",borderRadius:999,padding:"4px 9px",fontSize:11,fontWeight:600,color:"#5C5648"},
  tableWrap:{padding:"4px 16px 0"},
  scrollArea:{overflowX:"auto",borderRadius:12,border:"1px solid #EFEBE2",background:"#FFF"},
  table:{borderCollapse:"collapse",width:"100%",minWidth:580},
  thName:{textAlign:"left",fontSize:10,fontWeight:700,color:"#9C9586",textTransform:"uppercase",letterSpacing:"0.05em",padding:"9px 12px",position:"sticky",left:0,background:"#FBFAF7",borderBottom:"1px solid #EFEBE2",minWidth:180,zIndex:2},
  thDay:{textAlign:"center",padding:"7px 3px",borderBottom:"1px solid #EFEBE2",borderLeft:"1px solid #F4F1EA",color:"#6B6458",minWidth:52},
  thDayToday:{background:"#FEF9F0"},
  thDaySunday:{background:"#FBFAF7"},
  tdName:{padding:"7px 12px",borderBottom:"1px solid #F4F1EA",position:"sticky",left:0,backgroundColor:"#FFF",zIndex:1},
  nameCell:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6},
  nameText:{fontSize:12.5,fontWeight:600,color:"#2B2620"},
  nameMeta:{fontSize:10,color:"#9C9586",marginTop:1},
  nameActions:{display:"flex",gap:3,flexShrink:0},
  iconBtn:{width:22,height:22,borderRadius:6,border:"none",background:"transparent",color:"#9C9586",display:"flex",alignItems:"center",justifyContent:"center"},
  tdCell:{padding:"5px 3px",borderBottom:"1px solid #F4F1EA",borderLeft:"1px solid #F4F1EA",textAlign:"center"},
  cellBtn:{width:36,height:30,borderRadius:7,border:"1px solid",fontSize:11,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"all 0.1s"},
  groupHeaderCell:{padding:"8px 12px",background:"#F4F1EA",borderTop:"1px solid #EFEBE2",borderBottom:"1px solid #EFEBE2",borderLeft:"3px solid",position:"sticky",left:0},
  groupHeaderDot:{display:"inline-block",width:7,height:7,borderRadius:"50%",marginRight:7},
  groupHeaderText:{fontSize:12,fontWeight:800,color:"#2B2620"},
  groupHeaderHorario:{fontSize:10.5,color:"#9C9586",marginLeft:7},
  groupHeaderCount:{fontSize:10.5,color:"#9C9586",marginLeft:7,float:"right"},
  emptyState:{display:"flex",flexDirection:"column",alignItems:"center",padding:"48px 16px",background:"#FFF",border:"1px dashed #E8E3D8",borderRadius:12,textAlign:"center"},
  emptyTitle:{fontSize:14,fontWeight:700,color:"#2B2620",margin:"10px 0 2px"},
  modalOverlay:{position:"fixed",inset:0,background:"rgba(43,38,32,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:50,animation:"fadeIn 0.15s ease-out"},
  modalCard:{background:"#FAF8F4",width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto",borderRadius:"18px 18px 0 0",padding:"18px 18px 28px",animation:"fadeIn 0.2s ease-out"},
  modalHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},
  modalTitle:{fontFamily:FD,fontSize:18,fontWeight:700,margin:0},
  modalClose:{width:28,height:28,borderRadius:8,border:"none",background:"#EFEBE2",display:"flex",alignItems:"center",justifyContent:"center",color:"#5C5648"},
  formGroup:{marginBottom:14},
  label:{display:"block",fontSize:12,fontWeight:700,color:"#6B6458",marginBottom:6},
  input:{width:"100%",padding:"11px 12px",borderRadius:9,border:"1.5px solid #E8E3D8",fontSize:14,background:"#FFF",color:"#2B2620",outline:"none"},
  chipRow:{display:"flex",flexWrap:"wrap",gap:6},
  chip:{border:"1.5px solid #E8E3D8",background:"#FFF",borderRadius:999,padding:"7px 11px",fontSize:12,fontWeight:600,color:"#6B6458"},
  chipActive:{background:"#2B2620",borderColor:"#2B2620",color:"#FAF8F4",boxShadow:"0 2px 8px rgba(43,38,32,0.3)"},
  hintText:{fontSize:11.5,color:"#9C9586",marginTop:5},
  errorText:{fontSize:12.5,color:"#C0392B",marginBottom:10,fontWeight:600},
  modalActions:{display:"flex",gap:8,marginTop:8},
  btnGhost:{flex:1,padding:"11px",borderRadius:10,border:"1.5px solid #E8E3D8",background:"#FFF",color:"#5C5648",fontSize:13.5,fontWeight:700},
  btnPrimary:{flex:2,padding:"11px",borderRadius:10,border:"none",background:"#2B2620",color:"#FAF8F4",fontSize:13.5,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6},
  btnDanger:{flex:2,padding:"11px",borderRadius:10,border:"none",background:"#C0392B",color:"#FFF",fontSize:13.5,fontWeight:700},
  confirmCard:{background:"#FFF",width:"100%",maxWidth:400,margin:16,borderRadius:16,padding:20,animation:"fadeIn 0.2s ease-out"},
  confirmTitle:{fontSize:15,fontWeight:800,margin:"0 0 6px"},
  confirmText:{fontSize:13,color:"#6B6458",margin:"0 0 16px",lineHeight:1.5},
  confirmActions:{display:"flex",gap:8},
  toast:{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",color:"#FAF8F4",padding:"10px 18px",borderRadius:999,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,0.25)",zIndex:60,animation:"fadeIn 0.2s ease-out",whiteSpace:"nowrap"},
  tiposList:{display:"flex",flexDirection:"column",gap:6,marginBottom:12},
  tipoRow:{display:"flex",alignItems:"center",gap:10,background:"#FFF",border:"1px solid #EFEBE2",borderRadius:10,padding:"8px 10px"},
  tipoSwatch:{width:34,height:28,borderRadius:7,border:"1.5px solid",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0},
  tipoNome:{fontSize:13,fontWeight:600,color:"#2B2620",flex:1},
  tipoFixoBadge:{fontSize:10,fontWeight:700,color:"#9C9586",background:"#F4F1EA",padding:"2px 7px",borderRadius:999},
  tipoActions:{display:"flex",gap:2},
  addTipoBtn:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,border:"1.5px dashed #D8D2C5",background:"transparent",borderRadius:10,padding:"11px",fontSize:13,fontWeight:700,color:"#6B6458",marginBottom:8},
  bhWrap:{padding:"12px 16px",display:"flex",flexDirection:"column",gap:14},
  bhSaldosSection:{background:"#FFF",borderRadius:12,border:"1px solid #EFEBE2",overflow:"hidden"},
  bhSaldosHeader:{padding:"11px 14px",borderBottom:"1px solid #EFEBE2",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},
  bhSaldosTitle:{fontSize:13,fontWeight:800,color:"#2B2620"},
  bhFiltroBtn:{border:"1.5px solid #E8E3D8",background:"#FFF",borderRadius:999,padding:"4px 10px",fontSize:11.5,fontWeight:600,color:"#6B6458"},
  bhFiltroBtnTodos:{background:"#2B2620",borderColor:"#2B2620",color:"#FFF",fontWeight:700},
  bhSaldosList:{display:"flex",flexWrap:"wrap",gap:8,padding:"10px 14px"},
  bhSaldoCard:{textAlign:"left",background:"#FAF8F4",border:"1.5px solid #EFEBE2",borderRadius:10,padding:"9px 11px",cursor:"pointer",minWidth:130,flex:"1 1 130px"},
  bhSaldoNome:{fontSize:12,fontWeight:700,color:"#2B2620",marginBottom:2},
  bhSaldoMeta:{fontSize:10,color:"#9C9586"},
  bhLancsSection:{background:"#FFF",borderRadius:12,border:"1px solid #EFEBE2",overflow:"hidden"},
  bhLancsHeader:{padding:"11px 14px",borderBottom:"1px solid #EFEBE2",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"},
  bhLimparFiltro:{border:"none",background:"transparent",color:"#D97757",fontSize:12,fontWeight:700,cursor:"pointer"},
  bhEmpty:{padding:"36px 16px",textAlign:"center"},
  bhEmptyTitle:{fontSize:13,fontWeight:700,color:"#2B2620",margin:"0 0 4px"},
  bhEmptySub:{fontSize:12,color:"#9C9586",margin:0},
  bhLancsList:{display:"flex",flexDirection:"column"},
  bhLancCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderBottom:"1px solid #F4F1EA",gap:10},
  bhLancLeft:{display:"flex",alignItems:"center",gap:10},
  bhLancTipo:{width:30,height:30,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,flexShrink:0},
  bhLancNome:{fontSize:13,fontWeight:600,color:"#2B2620"},
  bhLancMeta:{fontSize:10.5,color:"#9C9586",marginTop:1},
  bhLancRight:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0},
};

const css=`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}html,body{margin:0;padding:0;background:#FAF8F4;overscroll-behavior-y:none}button{font-family:inherit;cursor:pointer}input,select{font-family:inherit}::-webkit-scrollbar{height:6px;width:6px}::-webkit-scrollbar-thumb{background:#D8D2C5;border-radius:6px}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

ReactDOM.createRoot(document.getElementById("root")).render(h(Root,null));
