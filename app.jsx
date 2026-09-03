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
const UtensilsCrossed = p => h(Icon,p, h("path",{d:"M3 3l18 18"}), h("path",{d:"M14.28 14.28A4 4 0 1 0 9.73 9.72"}), h("path",{d:"M21 15a3 3 0 1 1-6 0"}), h("path",{d:"M3 7v2a4 4 0 0 0 4 4h0"}), h("path",{d:"M7 3v4"}));
const Printer      = p => h(Icon,p, h("polyline",{points:"6 9 6 2 18 2 18 9"}), h("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}), h("rect",{x:6,y:14,width:12,height:8}));
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
  { id:"presente", label:"Presente",    short:"P",  color:"#0A8043", bg:"#C8F0D8" },
  { id:"falta",    label:"Falta",       short:"F",  color:"#D32F2F", bg:"#FFCDD2" },
  { id:"folga",    label:"Folga (DSR)", short:"D",  color:"#546E7A", bg:"#ECEFF1" },
  { id:"ferias",   label:"Férias",      short:"FF", color:"#E65100", bg:"#FFE0B2" },
  { id:"atestado", label:"Atestado",    short:"AT", color:"#6A1B9A", bg:"#E1BEE7" },
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
const DIAS_SEMANA = [
  {id:0,label:"Dom"}, {id:1,label:"Seg"}, {id:2,label:"Ter"},
  {id:3,label:"Qua"}, {id:4,label:"Qui"}, {id:5,label:"Sex"}, {id:6,label:"Sáb"},
];
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

// ====== FIREBASE STORAGE ======
const FB_CFG = {
  apiKey:            "AIzaSyAlL1uM_2YzRm1QyaJFiyAhjz04xKMkpCk",
  authDomain:        "presenca-11857.firebaseapp.com",
  projectId:         "presenca-11857",
  storageBucket:     "presenca-11857.firebasestorage.app",
  messagingSenderId: "1042660702835",
  appId:             "1:1042660702835:web:3c61c2a080fae0c4f50806"
};

// SDK do Firebase carregado via CDN no index.html
// window.firebase estará disponível
function getDB(){
  if(window.__FB_DB__) return window.__FB_DB__;
  const app = window.firebase.initializeApp(FB_CFG);
  window.__FB_DB__ = window.firebase.firestore(app);
  return window.__FB_DB__;
}

// Cache local (leitura rápida enquanto Firebase carrega)
const LC = {
  get(key,fb){ try{ const v=localStorage.getItem("cp:"+key); return v?JSON.parse(v):fb; }catch(e){ return fb; } },
  set(key,val){ try{ localStorage.setItem("cp:"+key,JSON.stringify(val)); }catch(e){} },
};

// ── Leitura ──
async function fbGet(col){
  const db = getDB();
  const snap = await db.collection(col).get();
  return snap.docs.map(d=>({id:d.id,...d.data()}));
}

// ── Escrita de um documento ──
async function fbSet(col, id, data){
  const db = getDB();
  await db.collection(col).doc(id).set(data, {merge:true});
}

// ── Exclusão de um documento ──
async function fbDel(col, id){
  const db = getDB();
  await db.collection(col).doc(id).delete();
}

// ── Substitui coleção inteira (batch) ──
async function fbSetAll(col, docs){
  const db = getDB();
  const batch = db.batch();
  // Apaga todos existentes
  const snap = await db.collection(col).get();
  snap.docs.forEach(d => batch.delete(d.ref));
  // Insere novos
  docs.forEach(d => {
    const ref = db.collection(col).doc(d.id||String(Date.now()+Math.random()));
    batch.set(ref, d);
  });
  await batch.commit();
}

// ── Listener realtime ──
function fbListen(col, callback){
  const db = getDB();
  return db.collection(col).onSnapshot(snap=>{
    callback(snap.docs.map(d=>({id:d.id,...d.data()})));
  });
}

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


// ====== APP PRINCIPAL ======
function ControlePresenca(){
  const [pronto,       setPronto]       = useState(false);
  const [salvando,     setSalvando]     = useState(false);
  const [online,       setOnline]       = useState(navigator.onLine);
  const [colaboradores,setColaboradores]= useState([]);
  const [presencas,    setPresencas]    = useState({});
  const [tiposStatus,  setTiposStatus]  = useState([]);
  const [bancoHoras,   setBancoHoras]   = useState([]);
  const [almocos,      setAlmocos]      = useState({});
  const [almocoData,   setAlmocoData]   = useState(()=>isoDate(new Date()));
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
  const [showPrint,    setShowPrint]    = useState(false);
  const [toast,        setToast]        = useState(null);

  const presencasRef = useRef({});
  const [modalStatus, setModalStatus] = useState(null); // {colabId, dateIso, nome}
  const saveTimer    = useRef(null);

  const showToast = useCallback((msg,err=false)=>{
    setToast({msg,err}); setTimeout(()=>setToast(null),3000);
  },[]);

  useEffect(()=>{
    const on=()=>setOnline(true), off=()=>setOnline(false);
    window.addEventListener("online",on); window.addEventListener("offline",off);
    return()=>{ window.removeEventListener("online",on); window.removeEventListener("offline",off); };
  },[]);

  useEffect(()=>{
    const cc=LC.get("colaboradores",null), ct=LC.get("tiposStatus",null);
    const cp=LC.get("presencas",{}), cb=LC.get("bancoHoras",[]), ca=LC.get("almocos",{});
    if(cc) setColaboradores(cc);
    if(ct) setTiposStatus(ct);
    presencasRef.current=cp; setPresencas(cp);
    setBancoHoras(cb); setAlmocos(ca);

    const unsubs=[];

    unsubs.push(fbListen("colaboradores", docs=>{
      if(docs.length===0){ SEED_COLABORADORES.forEach(c=>fbSet("colaboradores",c.id,c)); return; }
      const sorted=docs.sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"));
      setColaboradores(sorted); LC.set("colaboradores",sorted);
      setPronto(true);
    }));

    unsubs.push(fbListen("tiposStatus", docs=>{
      if(docs.length===0){ STATUS_SEED.forEach((t,i)=>fbSet("tiposStatus",t.id,{...t,ordem:i})); return; }
      const sorted=docs.sort((a,b)=>(a.ordem||0)-(b.ordem||0));
      setTiposStatus(sorted); LC.set("tiposStatus",sorted);
    }));

    fbGet("presencas").then(docs=>{
      const map={};
      docs.forEach(d=>{ if(d.data) Object.assign(map,d.data); });
      presencasRef.current=map; setPresencas({...map}); LC.set("presencas",map);
    });

    unsubs.push(fbListen("bancoHoras", docs=>{
      const sorted=docs.sort((a,b)=>(b.data||"").localeCompare(a.data||""));
      setBancoHoras(sorted); LC.set("bancoHoras",sorted);
    }));

    fbGet("almocos").then(docs=>{
      const map={};
      docs.forEach(d=>{ if(d.data) Object.assign(map,d.data); });
      setAlmocos(map); LC.set("almocos",map);
    });

    return()=>unsubs.forEach(u=>u());
  },[]);

  const flushPresencas = useCallback(()=>{
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      const snap=presencasRef.current;
      setSalvando(true);
      try{
        await fbSet("presencas","mapa",{data:snap});
        LC.set("presencas",snap);
        showToast("Salvo ✓");
      }catch(e){ showToast("Erro ao salvar: "+e.message,true); }
      finally{ setSalvando(false); }
    },1500);
  },[showToast]);

  const setStatus=useCallback((colabId,dateIso,next)=>{
    const key=`${colabId}:${dateIso}`;
    setPresencas(prev=>{
      const nm={...prev};
      if(!next||next==="vazio") delete nm[key]; else nm[key]=next;
      presencasRef.current=nm;
      flushPresencas();
      return nm;
    });
    setModalStatus(null);
  },[flushPresencas]);

  const openModalStatus=useCallback((colabId,dateIso,nome)=>{
    setModalStatus({colabId,dateIso,nome});
  },[]);

  const gerarFolgas=useCallback((colabId,diaSemana,presencasAtual)=>{
    if(diaSemana===null||diaSemana===undefined) return presencasAtual;
    const idFolga=tiposStatus.find(t=>t.id==="folga")?.id||"folga";
    const next={...presencasAtual};
    const hoje=new Date(); hoje.setHours(0,0,0,0);
    const inicio=new Date(hoje); inicio.setFullYear(inicio.getFullYear()-1);
    const fim=new Date(hoje); fim.setFullYear(fim.getFullYear()+1);
    while(inicio.getDay()!==diaSemana) inicio.setDate(inicio.getDate()+1);
    const d=new Date(inicio);
    while(d<=fim){ next[`${colabId}:${isoDate(d)}`]=idFolga; d.setDate(d.getDate()+7); }
    return next;
  },[tiposStatus]);

  const handleSaveColab=useCallback(async colab=>{
    const isNovo=!colab.id||!colaboradores.some(c=>c.id===colab.id);
    const colabId=colab.id||`c${Date.now()}`;
    const colabFinal={...colab,id:colabId};
    setSalvando(true);
    try{
      await fbSet("colaboradores",colabId,colabFinal);
      if(colabFinal.diaFolga!==null&&colabFinal.diaFolga!==undefined){
        let base={...presencasRef.current};
        if(!isNovo){
          const ant=colaboradores.find(c=>c.id===colabId);
          if(ant?.diaFolga!==colabFinal.diaFolga){
            const idF=tiposStatus.find(t=>t.id==="folga")?.id||"folga";
            Object.keys(base).forEach(k=>{ if(k.startsWith(colabId+":")&&base[k]===idF) delete base[k]; });
          }
        }
        const np=gerarFolgas(colabId,colabFinal.diaFolga,base);
        presencasRef.current=np; setPresencas({...np});
        await fbSet("presencas","mapa",{data:np});
        LC.set("presencas",np);
      }
      showToast(isNovo?"Colaborador cadastrado":"Colaborador atualizado");
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
    setShowCadastro(false); setEditingColab(null);
  },[colaboradores,tiposStatus,gerarFolgas,showToast]);

  const handleDeleteColab=useCallback(async id=>{
    setSalvando(true);
    try{
      await fbDel("colaboradores",id);
      const np={...presencasRef.current};
      Object.keys(np).forEach(k=>{ if(k.startsWith(id+":")) delete np[k]; });
      presencasRef.current=np; setPresencas({...np});
      await fbSet("presencas","mapa",{data:np});
      LC.set("presencas",np);
      showToast("Colaborador removido");
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
    setConfirmDelColab(null);
  },[showToast]);

  const handleSaveTipo=useCallback(async tipo=>{
    const id=tipo.id||`t${Date.now()}`;
    setSalvando(true);
    try{ await fbSet("tiposStatus",id,{...tipo,id}); showToast("Tipo salvo"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleDeleteTipo=useCallback(async id=>{
    setSalvando(true);
    try{
      await fbDel("tiposStatus",id);
      const np={...presencasRef.current};
      Object.keys(np).forEach(k=>{ if(np[k]===id) delete np[k]; });
      presencasRef.current=np; setPresencas({...np});
      await fbSet("presencas","mapa",{data:np});
      showToast("Tipo removido");
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleSaveLanc=useCallback(async lanc=>{
    const id=lanc.id||`bh${Date.now()}`;
    setSalvando(true);
    try{ await fbSet("bancoHoras",id,{...lanc,id}); showToast("Horas salvas"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
    setShowLanc(false); setEditingLanc(null);
  },[showToast]);

  const handleDeleteLanc=useCallback(async id=>{
    setSalvando(true);
    try{ await fbDel("bancoHoras",id); showToast("Lançamento removido"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleSaveAlmoco=useCallback(async(colabId,data,saida,retorno)=>{
    const key=`${colabId}:${data}`;
    const next={...almocos};
    if(!saida&&!retorno) delete next[key]; else next[key]={saida,retorno};
    setAlmocos(next);
    setSalvando(true);
    try{ await fbSet("almocos","mapa",{data:next}); LC.set("almocos",next); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[almocos,showToast]);

  const sincronizar=useCallback(async()=>{
    setSalvando(true);
    try{
      const docs=await fbGet("presencas");
      const map={};
      docs.forEach(d=>{ if(d.data) Object.assign(map,d.data); });
      presencasRef.current=map; setPresencas({...map}); LC.set("presencas",map);
      showToast("Sincronizado ✓");
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const getStatusInfo=useCallback(id=>{
    if(!id||id==="vazio") return STATUS_VAZIO;
    return tiposStatus.find(t=>t.id===id)||STATUS_VAZIO;
  },[tiposStatus]);

  const saldosPorColab=useMemo(()=>{
    const m={}; bancoHoras.forEach(b=>{ m[b.colab_id]=(m[b.colab_id]||0)+b.minutos; }); return m;
  },[bancoHoras]);

  const weekDays=useMemo(()=>getWeekDays(anchorDate),[anchorDate]);
  const isVisaoTodos=turnoAtivo==="todos";
  const colaboradoresDoTurno=useMemo(()=>
    colaboradores.filter(c=>c.turno===turnoAtivo).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")),
    [colaboradores,turnoAtivo]
  );
  const gruposPorTurno=useMemo(()=>
    TURNOS.map(t=>({turno:t,items:colaboradores.filter(c=>c.turno===t.id).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"))})).filter(g=>g.items.length>0),
    [colaboradores]
  );

  if(!pronto) return h("div",{style:S.loadingScreen},
    h("div",{style:S.loadingDot}),
    h("p",{style:{color:"#C9BC9A",fontSize:13,marginTop:14}},"Conectando ao Firebase…")
  );

  const turnoInfo=isVisaoTodos?VISAO_TODOS:TURNOS.find(t=>t.id===turnoAtivo);

  return h("div",{style:S.app},
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
          salvando&&h("span",{style:S.salvandoBadge},"Salvando…"),
          h("div",{style:{width:8,height:8,borderRadius:"50%",background:online?"#22C55E":"#EF4444",flexShrink:0},title:online?"Online":"Offline"}),
          h("button",{style:S.iconBtn2,onClick:sincronizar,title:"Sincronizar"},h(RefreshCw,{size:16,color:"#C9BC9A",strokeWidth:2.2})),
          h("button",{style:S.iconBtn2,onClick:()=>setShowPrint(true),title:"Imprimir"},h(Printer,{size:16,color:"#C9BC9A",strokeWidth:2.2})),
          h("button",{style:S.addBtn,onClick:()=>{setEditingColab(null);setShowCadastro(true);}},
            h(UserPlus,{size:15,strokeWidth:2.2}),h("span",null,"Cadastrar")
          )
        )
      ),
      h("div",{style:S.navTabs},
        h("button",{style:{...S.navTab,...(tela==="presenca"?S.navTabAtivo:{})},onClick:()=>setTela("presenca")},
          h(CalendarDays,{size:14,color:tela==="presenca"?"#FF6D00":"#C9BC9A",strokeWidth:2.2}),h("span",null,"Escala")
        ),
        h("button",{style:{...S.navTab,...(tela==="bancohoras"?S.navTabAtivo:{})},onClick:()=>setTela("bancohoras")},
          h(TrendingUp,{size:14,color:tela==="bancohoras"?"#FF6D00":"#C9BC9A",strokeWidth:2.2}),h("span",null,"Banco de Horas")
        ),
        h("button",{style:{...S.navTab,...(tela==="almoco"?S.navTabAtivo:{})},onClick:()=>setTela("almoco")},
          h(UtensilsCrossed,{size:14,color:tela==="almoco"?"#FF6D00":"#C9BC9A",strokeWidth:2.2}),h("span",null,"Almoço")
        )
      ),
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

    tela==="presenca"&&h("div",null,
      h(ResumoDia,{colaboradores,presencas,tiposStatus,dataRef:isoDate(new Date())}),
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
                  ...grupo.items.map((c,i)=>rowColab(c,i,weekDays,presencas,openModalStatus,
                    ()=>{setEditingColab(c);setShowCadastro(true);},()=>setConfirmDelColab(c),getStatusInfo))
                )):
                h("tbody",null,...colaboradoresDoTurno.map((c,i)=>rowColab(c,i,weekDays,presencas,openModalStatus,
                  ()=>{setEditingColab(c);setShowCadastro(true);},()=>setConfirmDelColab(c),getStatusInfo)))
            )
          )
      )
    ),

    tela==="bancohoras"&&h(TelaBancoHoras,{colaboradores,bancoHoras,saldosPorColab,bhFiltro,setBhFiltro,
      onNovo:()=>{setEditingLanc(null);setShowLanc(true);},
      onEditar:l=>{setEditingLanc(l);setShowLanc(true);},
      onDeletar:handleDeleteLanc,
    }),
    tela==="almoco"&&h(TelaAlmoco,{colaboradores,presencas,almocos,almocoData,setAlmocoData,onSave:handleSaveAlmoco,tiposStatus}),

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
    modalStatus&&h(ModalStatus,{
      colabId:modalStatus.colabId,
      dateIso:modalStatus.dateIso,
      nome:modalStatus.nome,
      statusAtual:presencas[`${modalStatus.colabId}:${modalStatus.dateIso}`]||"vazio",
      tiposStatus,
      onSelect:setStatus,
      onClose:()=>setModalStatus(null),
    }),
    showPrint&&h(PrintModal,{colaboradores,presencas,tiposStatus,weekDays,onClose:()=>setShowPrint(false)}),
    toast&&h("div",{style:{...S.toast,background:toast.err?"#D32F2F":"#1A1208"}},toast.msg)
  );
}

// ====== MODAL DE SELEÇÃO DE STATUS ======
function ModalStatus({ colabId, dateIso, nome, statusAtual, tiposStatus, onSelect, onClose }) {
  const dataFmt = dateIso.split("-").reverse().join("/");
  const WEEKDAY = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
  const dia = WEEKDAY[new Date(dateIso+"T12:00:00").getDay()];

  return h("div", { style:{ ...S.modalOverlay, alignItems:"center" }, onClick:onClose },
    h("div", {
      style:{
        background:"#FAF8F4",
        borderRadius:18,
        padding:"20px 16px 24px",
        width:"92%", maxWidth:380,
        animation:"fadeIn 0.18s ease-out",
        boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
      },
      onClick:e=>e.stopPropagation()
    },

      // Cabeçalho
      h("div",{style:{marginBottom:16}},
        h("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}},
          h("p",{style:{fontSize:11,fontWeight:700,color:"#9C9586",textTransform:"uppercase",letterSpacing:"0.05em",margin:0}},
            `${dia}, ${dataFmt}`
          ),
          h("button",{style:{border:"none",background:"#EFEBE2",borderRadius:8,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},onClick:onClose},
            h(X,{size:16,color:"#5C5648"})
          )
        ),
        h("p",{style:{fontSize:15,fontWeight:800,color:"#1A1208",margin:0}},nome)
      ),

      // Opções de status
      h("div",{style:{display:"flex",flexDirection:"column",gap:8}},

        // Botão limpar (só aparece se tiver algo marcado)
        statusAtual!=="vazio" && h("button",{
          onClick:()=>onSelect(colabId,dateIso,"vazio"),
          style:{
            display:"flex",alignItems:"center",gap:12,
            padding:"11px 14px",borderRadius:12,
            border:"1.5px dashed #D8CDB8",
            background:"#FAFAF8",cursor:"pointer",
          }
        },
          h("div",{style:{
            width:40,height:40,borderRadius:10,
            background:"#F4F1EA",border:"1.5px solid #D8CDB8",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:18,
          }},"✕"),
          h("div",null,
            h("div",{style:{fontSize:13.5,fontWeight:700,color:"#5C5648"}}, "Limpar marcação"),
            h("div",{style:{fontSize:11,color:"#9C9586",marginTop:1}}, "Remove o status deste dia")
          )
        ),

        // Tipos de status
        ...tiposStatus.map(t => {
          const ativo = statusAtual === t.id;
          return h("button",{
            key:t.id,
            onClick:()=>onSelect(colabId,dateIso,t.id),
            style:{
              display:"flex",alignItems:"center",gap:12,
              padding:"11px 14px",borderRadius:12,
              border: ativo?`2px solid ${t.color}`:"1.5px solid #EFEBE2",
              background: ativo?t.bg:"#FFFFFF",
              cursor:"pointer",
              boxShadow: ativo?`0 2px 12px ${t.color}44`:"none",
              transform: ativo?"scale(1.01)":"scale(1)",
              transition:"all 0.1s",
            }
          },
            // Badge
            h("div",{style:{
              width:40,height:40,borderRadius:10,flexShrink:0,
              background:ativo?t.color:t.bg,
              border:`2px solid ${t.color}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,fontWeight:900,
              color:ativo?"#FFF":t.color,
              letterSpacing:"-0.5px",
              boxShadow:ativo?`0 2px 8px ${t.color}66`:"none",
            }},t.short),
            // Info
            h("div",{style:{flex:1}},
              h("div",{style:{fontSize:13.5,fontWeight:ativo?800:600,color:ativo?t.color:"#1A1208"}},t.label),
              ativo && h("div",{style:{fontSize:11,color:t.color,marginTop:1,fontWeight:600}},"✓ Selecionado")
            ),
            // Indicador ativo
            ativo && h("div",{style:{
              width:10,height:10,borderRadius:"50%",
              background:t.color,flexShrink:0,
              boxShadow:`0 0 6px ${t.color}`,
            }})
          );
        })
      )
    )
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
          onClick:()=>onCycle(colab.id,dateIso,colab.nome),
          title: marcado?s.label:"Clique para marcar",
          style:{
            ...S.cellBtn,
            background: isToday&&!marcado?"#FEF9F0":marcado?s.color:"#FFFFFF",
            borderColor: isToday?"#E65100":marcado?s.color:"#E8E3D8",
            borderWidth: isToday||marcado?2:1,
            color: marcado?"#FFFFFF":isToday?"#E65100":"#BDC3C7",
            fontWeight: marcado?900:600,
            boxShadow: marcado?`0 2px 8px ${s.color}66`:"none",
            position:"relative",
          }
        },
          marcado ? s.short : h("span",{style:{fontSize:16,opacity:.3}},"+")
        )
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
  const [nome,     setNome]     = useState(initial?.nome||"");
  const [matricula,setMatricula]= useState(initial?.matricula||"");
  const [funcao,   setFuncao]   = useState(initial?.funcao||FUNCOES[0]);
  const [turno,    setTurno]    = useState(initial?.turno||"manha");
  const [diaFolga, setDiaFolga] = useState(initial?.diaFolga!==undefined ? initial.diaFolga : null);
  const [error,    setError]    = useState("");

  const submit=()=>{
    if(!nome.trim()){setError("Informe o nome.");return;}
    if(!matricula.trim()){setError("Informe a matrícula.");return;}
    onSave({id:initial?.id, nome:nome.trim(), matricula:matricula.trim(), funcao, turno, diaFolga});
  };

  return h("div",{style:S.modalOverlay,onClick:onClose},
    h("div",{style:S.modalCard,onClick:e=>e.stopPropagation()},
      h("div",{style:S.modalHeader},
        h("h2",{style:S.modalTitle},isEdit?"Editar colaborador":"Novo colaborador"),
        h("button",{style:S.modalClose,onClick:onClose},h(X,{size:18}))
      ),

      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Nome completo"),
        h("input",{style:S.input,value:nome,onChange:e=>setNome(e.target.value),placeholder:"Ex.: Anna Caroline",autoFocus:true})
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Matrícula"),
        h("input",{style:S.input,value:matricula,onChange:e=>setMatricula(e.target.value.replace(/[^0-9]/g,"")),placeholder:"Ex.: 7153570",inputMode:"numeric"})
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Função"),
        h("div",{style:S.chipRow},...FUNCOES.map(f=>h("button",{key:f,onClick:()=>setFuncao(f),style:{...S.chip,...(funcao===f?S.chipActive:{})}},f)))
      ),
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Turno"),
        h("div",{style:S.chipRow},...TURNOS.map(t=>h("button",{key:t.id,onClick:()=>setTurno(t.id),
          style:{...S.chip,...(turno===t.id?{background:t.cor,borderColor:t.cor,color:"#FFF",fontWeight:700,boxShadow:`0 2px 8px ${t.cor}55`}:{})}
        },t.label))),
        h("p",{style:S.hintText},TURNOS.find(t=>t.id===turno)?.horario)
      ),

      // Dia de folga semanal
      h("div",{style:S.formGroup},
        h("label",{style:S.label},"Dia de folga semanal (DSR)"),
        h("p",{style:{...S.hintText,marginBottom:8}},"As folgas serão lançadas automaticamente toda semana neste dia."),
        h("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},
          // Botão "Nenhum"
          h("button",{
            onClick:()=>setDiaFolga(null),
            style:{
              ...S.chip,
              ...(diaFolga===null?{...S.chipActive,background:"#8A8478",borderColor:"#8A8478"}:{})
            }
          },"Nenhum"),
          ...DIAS_SEMANA.map(d=>h("button",{
            key:d.id,
            onClick:()=>setDiaFolga(d.id),
            style:{
              ...S.chip,
              ...(diaFolga===d.id?{
                background:"#7F8C8D",borderColor:"#7F8C8D",
                color:"#FFF",fontWeight:700,
                boxShadow:"0 2px 8px #7F8C8D55"
              }:{})
            }
          },d.label))
        ),
        diaFolga!==null&&h("div",{style:{
          marginTop:8,padding:"8px 12px",borderRadius:8,
          background:"#EAEDED",border:"1px solid #BDC3C7",
          fontSize:12,color:"#5D6D7E",fontWeight:600,
        }},
          `✓ Folga toda ${DIAS_SEMANA.find(d=>d.id===diaFolga)?.label} — lançada para ±1 ano automaticamente`
        )
      ),

      error&&h("p",{style:S.errorText},error),
      h("div",{style:S.modalActions},
        h("button",{style:S.btnGhost,onClick:onClose},"Cancelar"),
        h("button",{style:S.btnPrimary,onClick:submit},
          h(Check,{size:15,strokeWidth:2.5}),
          isEdit?"Salvar":"Cadastrar"
        )
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

// ====== RESUMO DO DIA ======
function ResumoDia({ colaboradores, presencas, tiposStatus, dataRef }) {
  const hoje = isoDate(new Date());

  // Conta por status para HOJE
  const contagem = useMemo(() => {
    const map = {};
    colaboradores.forEach(c => {
      const st = presencas[`${c.id}:${hoje}`] || "vazio";
      map[st] = (map[st] || 0) + 1;
    });
    return map;
  }, [colaboradores, presencas, hoje]);

  const total = colaboradores.length;
  const semLancamento = contagem["vazio"] || 0;
  const comLancamento = total - semLancamento;

  // Monta chips por tipo
  const chips = tiposStatus
    .map(t => ({ ...t, qtd: contagem[t.id] || 0 }))
    .filter(t => t.qtd > 0);

  const dataFmt = hoje.split("-").reverse().join("/");

  return h("div", { style: S.resumoWrap },
    h("div", { style: S.resumoHeader },
      h("span", { style: S.resumoTitulo }, `Resumo de hoje — ${dataFmt}`),
      h("span", { style: S.resumoSubtitulo },
        `${comLancamento} lançados · ${semLancamento} sem marcação`
      )
    ),
    h("div", { style: S.resumoChips },
      chips.map(t =>
        h("div", { key: t.id, style: {
          display: "flex", alignItems: "center", gap: 6,
          background: t.bg,
          border: `1.5px solid ${t.color}`,
          borderRadius: 10, padding: "6px 10px",
          flexShrink: 0,
        }},
          h("span", { style: {
            width: 26, height: 22, borderRadius: 6,
            background: t.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 900, color: "#FFF",
          }}, t.short),
          h("div", null,
            h("div", { style: { fontSize: 18, fontWeight: 900, color: t.color, lineHeight: 1 } }, t.qtd),
            h("div", { style: { fontSize: 10, color: t.color, opacity: 0.8, lineHeight: 1, marginTop: 1 } }, t.label)
          )
        )
      ),
      semLancamento > 0 && h("div", { style: {
        display: "flex", alignItems: "center", gap: 6,
        background: "#F4F1EA", border: "1.5px solid #D8D2C5",
        borderRadius: 10, padding: "6px 10px", flexShrink: 0,
      }},
        h("span", { style: {
          width: 26, height: 22, borderRadius: 6, background: "#BDC3C7",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 900, color: "#FFF",
        }}, "—"),
        h("div", null,
          h("div", { style: { fontSize: 18, fontWeight: 900, color: "#8A8478", lineHeight: 1 } }, semLancamento),
          h("div", { style: { fontSize: 10, color: "#8A8478", lineHeight: 1, marginTop: 1 } }, "Sem marcação")
        )
      )
    )
  );
}

// ====== TELA ALMOÇO ======
function TelaAlmoco({ colaboradores, presencas, almocos, almocoData, setAlmocoData, onSave, tiposStatus }) {

  const horaAgora = () => {
    const n = new Date();
    return `${pad2(n.getHours())}:${pad2(n.getMinutes())}`;
  };

  const clicar = async (colab) => {
    const key = `${colab.id}:${almocoData}`;
    const reg = almocos[key] || {};
    if (!reg.saida) {
      // 1º clique — marca saída
      await onSave(colab.id, almocoData, horaAgora(), "");
    } else if (!reg.retorno) {
      // 2º clique — marca retorno
      await onSave(colab.id, almocoData, reg.saida, horaAgora());
    } else {
      // 3º clique — limpa
      await onSave(colab.id, almocoData, "", "");
    }
  };

  const duracao = (saida, retorno) => {
    if (!saida || !retorno) return null;
    const [sh,sm] = saida.split(":").map(Number);
    const [rh,rm] = retorno.split(":").map(Number);
    const diff = (rh*60+rm) - (sh*60+sm);
    if (diff <= 0) return null;
    return `${Math.floor(diff/60)}h${pad2(diff%60)}`;
  };

  const presentes = useMemo(() => {
    return colaboradores
      .filter(c => {
        const st = presencas[`${c.id}:${almocoData}`];
        return st === "presente"; // somente P confirmado
      })
      .sort((a,b) => {
        const ordem = ["manha","intermediario","tarde","noite"];
        const ta = ordem.indexOf(a.turno), tb = ordem.indexOf(b.turno);
        return ta !== tb ? ta - tb : a.nome.localeCompare(b.nome,"pt-BR");
      });
  }, [colaboradores, presencas, almocoData]);

  let ultimoTurno = null;

  return h("div", { style:{ padding:"12px 16px", paddingBottom:60 } },

    // Seletor de data + contador
    h("div", { style:{ background:"#FFF", borderRadius:12, border:"1px solid #EFEBE2", padding:"12px 14px", marginBottom:14 } },
      h("div", { style:{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 } },
        h("div", null,
          h("label", { style:{ ...S.label, marginBottom:6 } }, "Data"),
          h("input", { type:"date", value:almocoData, onChange:e=>setAlmocoData(e.target.value),
            style:{ ...S.input, width:"auto", padding:"8px 10px" } })
        ),
        h("div", { style:{ textAlign:"right" } },
          h("div", { style:{ fontSize:22, fontWeight:900, color:"#2B2620" } }, presentes.length),
          h("div", { style:{ fontSize:11, color:"#9C9586" } }, "presentes")
        )
      ),
      h("div", { style:{ display:"flex", gap:16, marginTop:10, padding:"8px 0 0", borderTop:"1px solid #F4F1EA" } },
        h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
          h("div", { style:{ width:10, height:10, borderRadius:3, background:"#F4F1EA", border:"1.5px solid #E8E3D8" } }),
          h("span", { style:{ fontSize:11, color:"#9C9586" } }, "Não registrado")
        ),
        h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
          h("div", { style:{ width:10, height:10, borderRadius:3, background:"#FFF3CD", border:"1.5px solid #F39C12" } }),
          h("span", { style:{ fontSize:11, color:"#9C9586" } }, "Saiu")
        ),
        h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
          h("div", { style:{ width:10, height:10, borderRadius:3, background:"#D4F0E0", border:"1.5px solid #1A7A4A" } }),
          h("span", { style:{ fontSize:11, color:"#9C9586" } }, "Voltou")
        )
      )
    ),

    presentes.length === 0 ?
      h("div", { style:S.emptyState },
        h(UtensilsCrossed, { size:28, color:"#BDC3C7" }),
        h("p", { style:S.emptyTitle }, "Nenhum colaborador com presença nesta data"),
        h("p", { style:{ fontSize:12.5, color:"#9C9586", margin:0 } }, "Marque a presença na aba Escala primeiro.")
      ) :
      h("div", { style:{ display:"flex", flexDirection:"column", gap:8 } },
        presentes.map(colab => {
          const key  = `${colab.id}:${almocoData}`;
          const reg  = almocos[key] || {};
          const dur  = duracao(reg.saida, reg.retorno);
          const info = TURNOS.find(t=>t.id===colab.turno);
          const showHeader = colab.turno !== ultimoTurno;
          ultimoTurno = colab.turno;

          // Estado visual
          const estado = !reg.saida ? "livre"
                       : !reg.retorno ? "saiu"
                       : "voltou";

          const cores = {
            livre:  { bg:"#FAFAFA",   borda:"#E8E3D8", badge:"#F4F1EA",   badgeText:"#9C9586",  label:"Toque para registrar saída" },
            saiu:   { bg:"#FFFBF0",   borda:"#F39C12", badge:"#FFF3CD",   badgeText:"#B7770D",  label:"Toque para registrar retorno" },
            voltou: { bg:"#F0FAF4",   borda:"#1A7A4A", badge:"#D4F0E0",   badgeText:"#1A7A4A",  label:"Toque para limpar" },
          }[estado];

          return h("div", { key:colab.id },

            // Cabeçalho de turno
            showHeader && h("div", { style:{ display:"flex", alignItems:"center", gap:6, padding:"4px 0 6px" } },
              h("span", { style:{ width:8, height:8, borderRadius:"50%", background:info?.cor||"#ccc", flexShrink:0, display:"inline-block" } }),
              h("span", { style:{ fontSize:11, fontWeight:800, color:"#6B6458", textTransform:"uppercase", letterSpacing:"0.05em" } },
                info?.label||colab.turno, " · ", info?.horario||""
              )
            ),

            // Card clicável
            h("button", {
              onClick: () => clicar(colab),
              style:{
                width:"100%", textAlign:"left", cursor:"pointer",
                background: cores.bg,
                border: `2px solid ${cores.borda}`,
                borderRadius:12, padding:"12px 14px",
                display:"flex", alignItems:"center", gap:12,
                boxShadow: estado!=="livre" ? `0 2px 8px ${cores.borda}44` : "none",
                transition:"all 0.15s",
              }
            },

              // Indicador de estado (bolinha)
              h("div", { style:{
                width:40, height:40, borderRadius:10, flexShrink:0,
                background: cores.badge,
                border: `2px solid ${cores.borda}`,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:1,
              }},
                estado === "livre"   && h(UtensilsCrossed, { size:16, color:"#BDC3C7", strokeWidth:2 }),
                estado === "saiu"    && h("span", { style:{ fontSize:11, fontWeight:900, color:"#B7770D", lineHeight:1 } }, "SAIU"),
                estado === "voltou"  && h("span", { style:{ fontSize:10, fontWeight:900, color:"#1A7A4A", lineHeight:1 } }, "OK")
              ),

              // Info colaborador + horários
              h("div", { style:{ flex:1, minWidth:0 } },
                h("div", { style:{ fontSize:13, fontWeight:700, color:"#2B2620" } }, colab.nome),
                h("div", { style:{ fontSize:10.5, color:"#9C9586", marginTop:1 } }, colab.matricula+" · "+colab.funcao),
                h("div", { style:{ display:"flex", gap:8, marginTop:5, flexWrap:"wrap" } },
                  reg.saida && h("span", { style:{
                    fontSize:12, fontWeight:700,
                    background:"#FFF3CD", color:"#B7770D",
                    borderRadius:6, padding:"2px 7px",
                  }}, `↑ ${reg.saida}`),
                  reg.retorno && h("span", { style:{
                    fontSize:12, fontWeight:700,
                    background:"#D4F0E0", color:"#1A7A4A",
                    borderRadius:6, padding:"2px 7px",
                  }}, `↓ ${reg.retorno}`),
                  dur && h("span", { style:{
                    fontSize:11, fontWeight:600,
                    background:"#EFEBE2", color:"#5C5648",
                    borderRadius:6, padding:"2px 7px",
                  }}, dur)
                )
              ),

              // Instrução
              h("div", { style:{
                fontSize:10, color: cores.badgeText,
                fontWeight:600, textAlign:"right", flexShrink:0,
                maxWidth:70, lineHeight:1.3,
              }}, cores.label)
            )
          );
        })
      )
  );
}

// ====== MODAL DE IMPRESSÃO ======
function PrintModal({ colaboradores, presencas, tiposStatus, weekDays, onClose }) {

  const getStatus = (colabId, dateIso) => {
    const id = presencas[`${colabId}:${dateIso}`] || "vazio";
    if(id === "vazio") return { short:"", color:"#BDC3C7", bg:"#F8F8F8", label:"" };
    return tiposStatus.find(t=>t.id===id) || { short:id, color:"#999", bg:"#EEE", label:id };
  };

  const imprimir = () => {
    const semana = `${pad2(weekDays[0].getDate())}/${pad2(weekDays[0].getMonth()+1)} – ${pad2(weekDays[6].getDate())}/${pad2(weekDays[6].getMonth()+1)}/${weekDays[6].getFullYear()}`;
    const colsWidth = [200, ...weekDays.map(()=>70)];

    // Agrupa por turno
    const grupos = TURNOS.map(t=>({
      turno:t,
      items: colaboradores.filter(c=>c.turno===t.id).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"))
    })).filter(g=>g.items.length>0);

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<title>Escala ${semana}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 11px; color: #1A1208; background: #FFF; }
  .header { background: #1A1208; color: #FFF; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; }
  .header h1 { font-size: 15px; }
  .header p  { font-size: 11px; opacity: .7; margin-top:2px; }
  .semana { font-size: 13px; font-weight: bold; color: #FF6D00; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th { background: #2C1F0A; color: #FAF8F4; padding: 6px 4px; text-align: center; font-size: 10px; border: 1px solid #3D2E10; }
  th.nome { text-align: left; padding-left: 8px; min-width: 180px; }
  td { padding: 5px 4px; border: 1px solid #E8E0D0; text-align: center; vertical-align: middle; }
  td.nome { text-align: left; padding-left: 8px; }
  td .nm { font-weight: 700; font-size: 11px; }
  td .mt { font-size: 9px; color: #888; }
  .badge { display: inline-block; min-width: 28px; padding: 2px 5px; border-radius: 5px; font-weight: 900; font-size: 11px; }
  .turno-header td { background: #F0EBE0; border-left: 4px solid; font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: .05em; }
  .today th { background: #E65100; }
  .today-col { background: #FFF3E0 !important; }
  tr:nth-child(even) td { background: #FAFAF8; }
  .legenda { display: flex; gap: 10px; flex-wrap: wrap; padding: 6px 0; margin-top: 6px; }
  .leg-item { display: flex; align-items: center; gap: 4px; font-size: 10px; }
  .leg-swatch { width: 18px; height: 14px; border-radius: 3px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 9px; color: #FFF; }
  .totais { margin-top: 10px; display: flex; gap: 12px; flex-wrap: wrap; }
  .total-item { background: #F0EBE0; border-radius: 6px; padding: 4px 10px; }
  .total-item strong { font-size: 14px; display: block; }
  .total-item span { font-size: 9px; color: #666; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>Controle de Presença</h1>
    <p>${colaboradores.length} colaboradores · ${grupos.length} turnos</p>
  </div>
  <div class="semana">${semana}</div>
</div>

<!-- Legenda -->
<div class="legenda">
  ${tiposStatus.map(t=>`<div class="leg-item"><span class="leg-swatch" style="background:${t.color}">${t.short}</span>${t.label}</div>`).join("")}
  <div class="leg-item"><span class="leg-swatch" style="background:#BDC3C7">—</span>Sem marcação</div>
</div>

<!-- Totais do dia de hoje -->
${(()=>{
  const hoje = isoDate(new Date());
  const cnt = {};
  colaboradores.forEach(c=>{ const s=presencas[c.id+":"+hoje]||"vazio"; cnt[s]=(cnt[s]||0)+1; });
  const parts = tiposStatus.filter(t=>cnt[t.id]).map(t=>`<div class="total-item"><strong style="color:${t.color}">${cnt[t.id]}</strong><span>${t.label}</span></div>`);
  if(cnt["vazio"]) parts.push(`<div class="total-item"><strong style="color:#BDC3C7">${cnt["vazio"]}</strong><span>Sem marcação</span></div>`);
  return parts.length ? `<div class="totais">${parts.join("")}</div>` : "";
})()}

<table>
  <thead>
    <tr>
      <th class="nome">Colaborador</th>
      ${weekDays.map((d,i)=>{
        const isToday = isoDate(d)===isoDate(new Date());
        return `<th style="${isToday?"background:#E65100;":""}">
          <div>${WEEKDAY_LABELS[d.getDay()]}</div>
          <div>${pad2(d.getDate())}/${pad2(d.getMonth()+1)}</div>
        </th>`;
      }).join("")}
    </tr>
  </thead>
  <tbody>
    ${grupos.map(({turno:t, items})=>`
      <tr class="turno-header">
        <td colspan="${1+weekDays.length}" style="border-left-color:${t.cor}; color:${t.cor}">
          ${t.label} · ${t.horario} · ${items.length} pessoa${items.length!==1?"s":""}
        </td>
      </tr>
      ${items.map((c,i)=>{
        const isEven = i%2===0;
        return `<tr>
          <td class="nome" style="${isEven?"":"background:#FAFAF8"}">
            <div class="nm">${c.nome}</div>
            <div class="mt">${c.matricula} · ${c.funcao}</div>
          </td>
          ${weekDays.map(d=>{
            const di = isoDate(d);
            const isToday = di===isoDate(new Date());
            const s = getStatus(c.id, di);
            return `<td style="${isEven?"":"background:#FAFAF8"}${isToday?"background:#FFF3E0;":""}" class="${isToday?"today-col":""}">
              ${s.short ? `<span class="badge" style="background:${s.color};color:#FFF">${s.short}</span>` : `<span style="color:#DDD">·</span>`}
            </td>`;
          }).join("")}
        </tr>`;
      }).join("")}
    `).join("")}
  </tbody>
</table>

<div style="margin-top:12px;font-size:9px;color:#AAA;text-align:right">
  Impresso em ${new Date().toLocaleString("pt-BR")} · Controle de Presença
</div>

<script>window.onload=()=>window.print();</script>
</body>
</html>`;

    const w = window.open("","_blank","width=900,height=700");
    w.document.write(html);
    w.document.close();
  };

  const semanaLabel = `${pad2(weekDays[0].getDate())}/${pad2(weekDays[0].getMonth()+1)} – ${pad2(weekDays[6].getDate())}/${pad2(weekDays[6].getMonth()+1)}`;

  return h("div",{style:S.modalOverlay,onClick:onClose},
    h("div",{style:{...S.modalCard,maxWidth:400},onClick:e=>e.stopPropagation()},
      h("div",{style:S.modalHeader},
        h("h2",{style:S.modalTitle},"Imprimir escala"),
        h("button",{style:S.modalClose,onClick:onClose},h(X,{size:18}))
      ),
      h("div",{style:{background:"#F0EBE0",borderRadius:10,padding:"14px",marginBottom:16}},
        h("p",{style:{fontSize:13,fontWeight:700,color:"#2B2620",margin:"0 0 4px"}},"Semana selecionada"),
        h("p",{style:{fontSize:18,fontWeight:900,color:"#E65100",margin:0}},semanaLabel),
        h("p",{style:{fontSize:11.5,color:"#6B6458",margin:"6px 0 0"}},
          `${colaboradores.length} colaboradores · todos os turnos`
        )
      ),
      h("p",{style:{fontSize:12.5,color:"#6B6458",marginBottom:16,lineHeight:1.6}},
        "A impressão abre numa nova janela com a escala completa da semana, agrupada por turno, com os status de cada dia e o resumo de hoje."
      ),
      h("div",{style:S.modalActions},
        h("button",{style:S.btnGhost,onClick:onClose},"Cancelar"),
        h("button",{style:{...S.btnPrimary,background:"#E65100",boxShadow:"0 2px 8px #E6510066"},onClick:imprimir},
          h(Printer,{size:15,strokeWidth:2.5,color:"#FFF"}), "Imprimir agora"
        )
      )
    )
  );
}

// ====== ROOT ======
function Root(){
  return h(ControlePresenca, null);
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
  header:{background:"#1A1208",borderBottom:"1px solid #3D2E10",position:"sticky",top:0,zIndex:10},
  headerTop:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",gap:10},
  brandRow:{display:"flex",alignItems:"center",gap:10,minWidth:0},
  brandMark:{width:34,height:34,borderRadius:9,background:"#2B2620",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  brandTitle:{fontFamily:FD,fontSize:17,fontWeight:700,margin:0,lineHeight:1.2,whiteSpace:"nowrap",color:"#FAF8F4"},
  brandSub:{fontSize:11,color:"#C9BC9A",margin:"2px 0 0"},
  addBtn:{display:"flex",alignItems:"center",gap:5,background:"#E65100",color:"#FFF",border:"none",borderRadius:8,padding:"8px 12px",fontSize:12.5,fontWeight:700,flexShrink:0,boxShadow:"0 2px 8px #E6510066"},
  iconBtn2:{width:32,height:32,borderRadius:8,border:"1px solid #3D2E10",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center"},
  pendenteBadge:{fontSize:11,fontWeight:700,color:"#D68910",background:"#FEF9F0",border:"1px solid #F9A825",borderRadius:999,padding:"3px 8px"},
  salvandoBadge:{fontSize:11,fontWeight:700,color:"#2980B9",background:"#EBF5FB",border:"1px solid #3498DB",borderRadius:999,padding:"3px 8px"},
  navTabs:{display:"flex",borderBottom:"2px solid #3D2E10",margin:"0",padding:"0 16px",background:"#1A1208"},
  navTab:{display:"flex",alignItems:"center",gap:6,padding:"10px 12px",fontSize:13,fontWeight:600,color:"#C9BC9A",border:"none",background:"transparent",borderBottom:"2px solid transparent",marginBottom:-2,cursor:"pointer"},
  navTabAtivo:{color:"#FF6D00",borderBottomColor:"#FF6D00",fontWeight:800},
  tabsRow:{display:"flex",gap:5,padding:"8px 12px",overflowX:"auto",alignItems:"center",background:"#F8F4EE",borderBottom:"1px solid #E8E0D0"},
  tab:{display:"flex",alignItems:"center",gap:5,background:"#F4F1EA",border:"1.5px solid transparent",borderRadius:999,padding:"6px 11px",fontSize:12,whiteSpace:"nowrap",flexShrink:0},
  tabActive:{background:"#FFF",boxShadow:"0 1px 3px rgba(43,38,32,0.08)"},
  tabDot:{width:6,height:6,borderRadius:"50%",flexShrink:0},
  tabCount:{background:"#EFEBE2",borderRadius:999,padding:"1px 6px",fontSize:10,fontWeight:700,color:"#8A8478"},
  tabDivider:{width:1,alignSelf:"stretch",background:"#E8E3D8",margin:"2px 2px",flexShrink:0},
  resumoWrap:{background:"linear-gradient(135deg,#1A1208 0%,#2C1F0A 100%)",borderBottom:"2px solid #FF6D00",padding:"10px 16px 14px"},
  resumoHeader:{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:8,marginBottom:8,flexWrap:"wrap"},
  resumoTitulo:{fontSize:12,fontWeight:800,color:"#FAF8F4"},
  resumoSubtitulo:{fontSize:11,color:"#C9BC9A"},
  resumoChips:{display:"flex",gap:8,overflowX:"auto",paddingBottom:2},
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
  thName:{textAlign:"left",fontSize:10,fontWeight:700,color:"#5C5648",textTransform:"uppercase",letterSpacing:"0.05em",padding:"9px 12px",position:"sticky",left:0,background:"#F0EBE0",borderBottom:"2px solid #D8CDB8",minWidth:180,zIndex:2},
  thDay:{textAlign:"center",padding:"7px 3px",borderBottom:"2px solid #D8CDB8",borderLeft:"1px solid #E8E0D0",color:"#3D3028",fontWeight:700,minWidth:52},
  thDayToday:{background:"#FFF3E0",borderBottomColor:"#E65100"},
  thDaySunday:{background:"#FBFAF7"},
  tdName:{padding:"7px 12px",borderBottom:"1px solid #F4F1EA",position:"sticky",left:0,backgroundColor:"#FFF",zIndex:1},
  nameCell:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6},
  nameText:{fontSize:12.5,fontWeight:600,color:"#2B2620"},
  nameMeta:{fontSize:10,color:"#9C9586",marginTop:1},
  nameActions:{display:"flex",gap:3,flexShrink:0},
  iconBtn:{width:22,height:22,borderRadius:6,border:"none",background:"transparent",color:"#9C9586",display:"flex",alignItems:"center",justifyContent:"center"},
  tdCell:{padding:"5px 3px",borderBottom:"1px solid #F4F1EA",borderLeft:"1px solid #F4F1EA",textAlign:"center"},
  cellBtn:{width:38,height:32,borderRadius:8,border:"2px solid",fontSize:11.5,fontWeight:900,display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"all 0.12s",letterSpacing:"-0.3px"},
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
