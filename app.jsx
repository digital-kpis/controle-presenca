const { useState, useEffect, useMemo, useCallback, useRef } = React;
const h = React.createElement;

// ====== ÍCONES ======
function Icon({ children, size=16, strokeWidth=2, color="currentColor", style }) {
  return h("svg", { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth, strokeLinecap:"round", strokeLinejoin:"round", style }, children);
}
const Search       = p => h(Icon,p, h("circle",{cx:11,cy:11,r:7}), h("path",{d:"M21 21l-4.3-4.3"}));
const FileText     = p => h(Icon,p, h("path",{d:"M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}), h("path",{d:"M14 3v6h6M8 13h8M8 17h5"}));
const Sun          = p => h(Icon,p, h("circle",{cx:12,cy:12,r:4}), h("path",{d:"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"}));
const AlertTri     = p => h(Icon,p, h("path",{d:"M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"}), h("path",{d:"M12 9v4M12 17h.01"}));
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
  { id:"manha",         label:"Manhã",        horario:"07:00 – 15:20", cor:"#F5A300" },
  { id:"intermediario", label:"Intermediário", horario:"10:00 – 18:20", cor:"#2E86DE" },
  { id:"tarde",         label:"Tarde",         horario:"14:00 – 22:20", cor:"#E67E22" },
  { id:"noite",         label:"Madrugada",     horario:"22:00 – 05:20", cor:"#34495E" },
  { id:"treinamento",   label:"Treinamento",   horario:"Conforme agenda", cor:"#8E44AD" },
  { id:"plenos",        label:"Plenos",        horario:"Conforme escala", cor:"#00A19B" },
  { id:"afastados",     label:"Afastados",     horario:"Fora da escala",  cor:"#8D6E63" },
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
    callback(snap.docs.map(d=>({id:d.id,...d.data()})), snap.metadata);
  });
}

// ── Grava SÓ o que mudou num documento-mapa (presencas/almocos). valor null = apagar a chave ──
// (antes o mapa inteiro era regravado com merge: exclusões nunca chegavam ao servidor e aparelhos
//  desatualizados sobrescreviam alterações de outros)
async function fbPatchMapa(col, changes){
  const keys = Object.keys(changes);
  if(!keys.length) return;
  const db = getDB(); const FV = window.firebase.firestore.FieldValue;
  const data = {};
  keys.forEach(k => { data[k] = changes[k] === null ? FV.delete() : changes[k]; });
  await db.collection(col).doc("mapa").set({ data }, { merge:true });
}
function diffMapa(antes, depois){
  const ch = {};
  Object.keys(depois).forEach(k => { if(JSON.stringify(antes[k]) !== JSON.stringify(depois[k])) ch[k] = depois[k]; });
  Object.keys(antes).forEach(k => { if(!(k in depois)) ch[k] = null; });
  return ch;
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
  const [busca,        setBusca]        = useState("");
  const [rh,           setRh]           = useState(()=>LC.get("rh",[]));
  const [relatorioBH,   setRelatorioBH]   = useState(()=>LC.get("bhRel",[]));
  const [ferias,        setFerias]        = useState(()=>LC.get("ferias",[]));
  const [advs,          setAdvs]          = useState(()=>LC.get("faltasAdv",[]));
  const [liberado,      setLiberado]      = useState(()=>{ try{ return sessionStorage.getItem("cp_liberado")==="1"; }catch(e){ return false; } });
  const liberar=()=>{ setLiberado(true); try{ sessionStorage.setItem("cp_liberado","1"); }catch(e){} };
  const bloquear=()=>{ setLiberado(false); try{ sessionStorage.removeItem("cp_liberado"); }catch(e){} setTela("presenca"); };
  const anivMap = useMemo(()=>{
    const hj=new Date(); hj.setHours(0,0,0,0);
    const o={}; rh.forEach(r=>{ const i=infoAniversario(r.nascimento,hj); if(i) o[r.matricula]=i; });
    return o;
  },[rh]);
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
  const pendingRef   = useRef({});   // mudanças de presença ainda não enviadas (chave → valor | null)

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

    unsubs.push(fbListen("rh", docs=>{ setRh(docs); LC.set("rh",docs); }));
    unsubs.push(fbListen("bhRelatorio", docs=>{ setRelatorioBH(docs); LC.set("bhRel",docs); }));
    unsubs.push(fbListen("ferias", docs=>{ setFerias(docs); LC.set("ferias",docs); }));
    unsubs.push(fbListen("faltasAdv", docs=>{ setAdvs(docs); LC.set("faltasAdv",docs); }));

    unsubs.push(fbListen("colaboradores", (docs,meta)=>{
      if(docs.length===0){
        // só semeia se o servidor confirmou que está vazio e não há cópia local (evita "ressuscitar" dados antigos)
        if(meta && !meta.fromCache && !(LC.get("colaboradores",[])||[]).length) SEED_COLABORADORES.forEach(c=>fbSet("colaboradores",c.id,c));
        return;
      }
      const sorted=docs.sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"));
      setColaboradores(sorted); LC.set("colaboradores",sorted);
      setPronto(true);
    }));

    unsubs.push(fbListen("tiposStatus", (docs,meta)=>{
      if(docs.length===0){ if(!meta || meta.fromCache || (LC.get("tiposStatus",[])||[]).length) return; STATUS_SEED.forEach((t,i)=>fbSet("tiposStatus",t.id,{...t,ordem:i})); return; }
      const sorted=docs.sort((a,b)=>(a.ordem||0)-(b.ordem||0));
      setTiposStatus(sorted); LC.set("tiposStatus",sorted);
    }));

    unsubs.push(fbListen("presencas", docs=>{
      const map={};
      docs.forEach(d=>{ if(d.data) Object.assign(map,d.data); });
      Object.entries(pendingRef.current).forEach(([k,v])=>{ if(v===null) delete map[k]; else map[k]=v; });
      presencasRef.current=map; setPresencas({...map}); LC.set("presencas",map);
    }));

    unsubs.push(fbListen("bancoHoras", docs=>{
      const sorted=docs.sort((a,b)=>(b.data||"").localeCompare(a.data||""));
      setBancoHoras(sorted); LC.set("bancoHoras",sorted);
    }));

    unsubs.push(fbListen("almocos", docs=>{
      const map={};
      docs.forEach(d=>{ if(d.data) Object.assign(map,d.data); });
      setAlmocos(map); LC.set("almocos",map);
    }));

    return()=>unsubs.forEach(u=>u());
  },[]);

  const flushPresencas = useCallback(()=>{
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(async()=>{
      const ch=pendingRef.current; pendingRef.current={};
      if(!Object.keys(ch).length) return;
      setSalvando(true);
      try{
        await fbPatchMapa("presencas",ch);
        LC.set("presencas",presencasRef.current);
        showToast("Salvo ✓");
      }catch(e){ pendingRef.current={...ch,...pendingRef.current}; showToast("Erro ao salvar: "+e.message,true); }
      finally{ setSalvando(false); }
    },1500);
  },[showToast]);

  const setStatus=useCallback((colabId,dateIso,next)=>{
    const key=`${colabId}:${dateIso}`;
    setPresencas(prev=>{
      const nm={...prev};
      if(!next||next==="vazio") delete nm[key]; else nm[key]=next;
      pendingRef.current[key]=(!next||next==="vazio")?null:next;
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
    while(d<=fim){ const k=`${colabId}:${isoDate(d)}`; if(!(k in next)) next[k]=idFolga; d.setDate(d.getDate()+7); }
    return next;
  },[tiposStatus]);

  const handleSaveColab=useCallback(async colab=>{
    const isNovo=!colab.id||!colaboradores.some(c=>c.id===colab.id);
    const colabId=colab.id||`c${Date.now()}`;
    const {admissao,nascimento,...colabSemRh}=colab;
    const colabFinal={...colabSemRh,id:colabId};
    setSalvando(true);
    try{
      await fbSet("colaboradores",colabId,colabFinal);
      // Lança / atualiza na aba Contratos (id = matrícula)
      if(admissao){
        const cargo=colabFinal.funcao==="Op. Loja"?"OPERADOR LOJA":colabFinal.funcao==="Pleno"||colabFinal.funcao==="Pleno PREV."?"OPERADOR LOJA PL":(colabFinal.funcao||"").toUpperCase();
        const antigo=colaboradores.find(c=>c.id===colabId);
        if(antigo&&antigo.matricula&&antigo.matricula!==colabFinal.matricula&&rh.some(r=>r.id===antigo.matricula)){
          await fbDel("rh",antigo.matricula);
        }
        await fbSet("rh",colabFinal.matricula,{id:colabFinal.matricula,matricula:colabFinal.matricula,nome:colabFinal.nome,cargo,admissao,nascimento:nascimento||""});
      }
      if(colabFinal.diaFolga!==null&&colabFinal.diaFolga!==undefined){
        const ant=colaboradores.find(c=>c.id===colabId);
        if(isNovo||ant?.diaFolga!==colabFinal.diaFolga){
          const antes=presencasRef.current;
          let base={...antes};
          if(!isNovo){
            const idF=tiposStatus.find(t=>t.id==="folga")?.id||"folga";
            Object.keys(base).forEach(k=>{ if(k.startsWith(colabId+":")&&base[k]===idF) delete base[k]; });
          }
          const np=gerarFolgas(colabId,colabFinal.diaFolga,base);
          presencasRef.current=np; setPresencas({...np});
          await fbPatchMapa("presencas",diffMapa(antes,np));
          LC.set("presencas",np);
        }
      }
      showToast(isNovo?"Colaborador cadastrado":"Colaborador atualizado");
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
    setShowCadastro(false); setEditingColab(null);
  },[colaboradores,tiposStatus,gerarFolgas,showToast,rh]);

  const handleSalvarRelatorioBH=useCallback(async docs=>{
    setSalvando(true);
    try{ await fbSetAll("bhRelatorio",docs); showToast(`Relatório guardado (${docs.length} operadores)`); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleAjustarBH=useCallback(async(ajustes,dataIso)=>{
    setSalvando(true);
    try{
      const [y,m,d]=dataIso.split("-");
      const base=Date.now();
      await Promise.all(ajustes.map((a,i)=>{ const id=`bhaj${base}_${i}`;
        return fbSet("bancoHoras",id,{id,colab_id:a.colab_id,data:dataIso,minutos:a.minutos,descricao:`Ajuste — relatório de saldos ${d}/${m}/${y}`}); }));
      showToast(`${ajustes.length} ajustes lançados`);
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleSaveFerias=useCallback(async d=>{
    setSalvando(true);
    try{ await fbSet("ferias",d.id,d); showToast("Férias salvas"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleDelFerias=useCallback(async id=>{
    setSalvando(true);
    try{ await fbDel("ferias",id); showToast("Agendamento excluído"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleQuitarFerias=useCallback(async(l,k)=>{
    setSalvando(true);
    try{
      const docs=[];
      for(let n=1;n<=k;n++){
        const ja=ferias.filter(f=>f.matricula===l.matricula&&f.periodo===n).reduce((t,f)=>t+(f.dias||0),0);
        if(ja<30) docs.push({id:`q_${l.matricula}_${n}`,matricula:l.matricula,nome:l.nome,periodo:n,quitado:true,dias:30-ja});
      }
      await Promise.all(docs.map(d=>fbSet("ferias",d.id,d)));
      showToast(docs.length?`${docs.length} período(s) marcado(s) como gozado(s)`:"Nada a marcar");
    }catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast,ferias]);

  const handleSaveAdv=useCallback(async d=>{
    setSalvando(true);
    try{ await fbSet("faltasAdv",d.id,d); showToast("Advertência registrada"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleDelAdv=useCallback(async id=>{
    setSalvando(true);
    try{ await fbDel("faltasAdv",id); showToast("Marcação removida"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleSetHorarioAlmoco=useCallback(async(id,hora)=>{
    setSalvando(true);
    try{ await fbSet("colaboradores",id,{horarioAlmoco:hora||""}); showToast(hora?"Horário de almoço salvo":"Horário removido"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleAplicarHorarios=useCallback(async pares=>{
    setSalvando(true);
    try{ await Promise.all(pares.map(p=>fbSet("colaboradores",p.id,{horarioAlmoco:p.hora}))); showToast(`${pares.length} horários de almoço aplicados`); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleSaveRh=useCallback(async row=>{
    setSalvando(true);
    try{ await fbSet("rh",row.id,row); showToast("Contrato salvo"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleDelRh=useCallback(async id=>{
    setSalvando(true);
    try{ await fbDel("rh",id); showToast("Removido da lista de contratos"); }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleDeleteColab=useCallback(async id=>{
    setSalvando(true);
    try{
      await fbDel("colaboradores",id);
      const antes=presencasRef.current, np={...antes};
      Object.keys(np).forEach(k=>{ if(k.startsWith(id+":")) delete np[k]; });
      presencasRef.current=np; setPresencas({...np});
      await fbPatchMapa("presencas",diffMapa(antes,np));
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
      const antes=presencasRef.current, np={...antes};
      Object.keys(np).forEach(k=>{ if(np[k]===id) delete np[k]; });
      presencasRef.current=np; setPresencas({...np});
      await fbPatchMapa("presencas",diffMapa(antes,np));
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

  const handleDeleteLancs=useCallback(async ids=>{
    setSalvando(true);
    try{
      const res=await Promise.allSettled(ids.map(id=>fbDel("bancoHoras",id)));
      const falhas=res.filter(r=>r.status==="rejected").length;
      if(falhas) showToast(`${ids.length-falhas} removidos, ${falhas} com erro`,true);
      else showToast(ids.length===1?"Lançamento removido":`${ids.length} lançamentos removidos`);
    }
    catch(e){ showToast("Erro: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleImportRh=useCallback(async file=>{
    try{
      const buf=await file.arrayBuffer();
      let txt; try{ txt=new TextDecoder("utf-8",{fatal:true}).decode(buf); }catch(e){ txt=new TextDecoder("windows-1252").decode(buf); }
      const linhas=txt.split(/\r?\n/).filter(l=>l.trim());
      const cab=linhas[0].split(";").map(x=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim());
      const ix=k=>cab.findIndex(c=>c.includes(k));
      const iMat=ix("matric"),iNome=ix("nome"),iAdm=ix("admiss"),iCargo=ix("cargo"),iNasc=ix("nasc");
      if(iMat<0||iNome<0||iAdm<0) throw new Error("Colunas Matricula, Nome e Data de admissão não encontradas");
      const toISO=v=>{ const m=/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((v||"").trim()); return m?`${m[3]}-${pad2(+m[2])}-${pad2(+m[1])}`:""; };
      const docs=[];
      linhas.slice(1).forEach(l=>{
        const c=l.split(";"); const mat=(c[iMat]||"").trim(); const adm=toISO(c[iAdm]);
        if(!mat||!adm) return;
        docs.push({id:mat,matricula:mat,nome:(c[iNome]||"").trim(),admissao:adm,cargo:iCargo>=0?(c[iCargo]||"").trim():"",nascimento:iNasc>=0?toISO(c[iNasc]):""});
      });
      if(docs.length===0) throw new Error("Nenhuma linha válida na planilha");
      if(!window.confirm(`Importar ${docs.length} colaboradores? A lista atual de contratos será substituída pela planilha.`)) return;
      setSalvando(true);
      await fbSetAll("rh",docs);
      showToast(`${docs.length} colaboradores importados`);
    }catch(e){ showToast("Erro ao importar: "+e.message,true); }
    finally{ setSalvando(false); }
  },[showToast]);

  const handleSaveAlmoco=useCallback(async(colabId,data,saida,retorno)=>{
    const key=`${colabId}:${data}`;
    const next={...almocos};
    if(!saida&&!retorno) delete next[key]; else next[key]={saida,retorno};
    setAlmocos(next);
    setSalvando(true);
    try{ await fbPatchMapa("almocos",{[key]:(!saida&&!retorno)?null:{saida,retorno}}); LC.set("almocos",next); }
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
    const t=tiposStatus.find(x=>x.id===id);
    if(!t) return STATUS_VAZIO;
    if(t.id==="ferias"&&t.color==="#E65100") return {...t,color:"#1976D2",bg:"#BBDEFB"};
    if(t.id==="folga"&&t.color==="#546E7A")  return {...t,color:"#78909C",bg:"#ECEFF1"};
    return t;
  },[tiposStatus]);

  const saldosPorColab=useMemo(()=>{
    const m={}; bancoHoras.forEach(b=>{ m[b.colab_id]=(m[b.colab_id]||0)+b.minutos; }); return m;
  },[bancoHoras]);

  const weekDays=useMemo(()=>getWeekDays(anchorDate),[anchorDate]);
  const norm=t=>(t||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  const termo=norm(busca);
  const buscando=termo.length>0;
  const isVisaoTodos=turnoAtivo==="todos"||buscando;
  const colaboradoresDoTurno=useMemo(()=>
    colaboradores.filter(c=>c.turno===turnoAtivo).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")),
    [colaboradores,turnoAtivo]
  );
  const gruposPorTurno=useMemo(()=>
    TURNOS.map(t=>({turno:t,items:colaboradores.filter(c=>c.turno===t.id&&(!termo||norm(c.nome).includes(termo)||norm(c.matricula).includes(termo))).sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"))})).filter(g=>g.items.length>0),
    [colaboradores,termo]
  );
  const pessoasVisiveis=gruposPorTurno.reduce((n,g)=>n+g.items.length,0);

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
            h(UserPlus,{size:15,strokeWidth:2.2}),h("span",{className:"hide-m"},"Cadastrar")
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
        ),
        h("button",{style:{...S.navTab,...(tela==="contratos"?S.navTabAtivo:{})},onClick:()=>setTela("contratos")},
          h(FileText,{size:14,color:tela==="contratos"?"#FF6D00":"#C9BC9A",strokeWidth:2.2}),h("span",null,"Contratos")
        ),
        h("button",{style:{...S.navTab,...(tela==="ferias"?S.navTabAtivo:{})},onClick:()=>setTela("ferias")},
          h(Sun,{size:14,color:tela==="ferias"?"#FF6D00":"#C9BC9A",strokeWidth:2.2}),h("span",null,"Férias")
        ),
        h("button",{style:{...S.navTab,...(tela==="faltas"?S.navTabAtivo:{})},onClick:()=>setTela("faltas")},
          h(AlertTri,{size:14,color:tela==="faltas"?"#FF6D00":"#C9BC9A",strokeWidth:2.2}),h("span",null,"Faltas")
        ),
        liberado&&h("button",{onClick:bloquear,style:{...S.navTab,marginLeft:"auto",color:"#C9BC9A",flexShrink:0}},h("span",null,"🔒 Bloquear"))
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
          return h("button",{key:t.id,onClick:()=>setTurnoAtivo(t.id),style:{...S.tab,...(active?{...S.tabActive,borderColor:t.cor,background:t.cor+"22"}:{})}},
            h("span",{style:{...S.tabDot,width:9,height:9,background:t.cor}}),
            h("span",{style:{fontWeight:active?700:500,color:active?"#2B2620":"#6B6458"}},t.label),
            h("span",{style:S.tabCount},count)
          );
        })
      )
    ),

    tela==="presenca"&&h("div",null,
      h(ResumoDia,{colaboradores,presencas,tiposStatus,dataRef:isoDate(new Date()),busca,setBusca,rh}),
      h("div",{style:S.subbar},
        h("div",{style:S.turnoChip},
          h("span",{style:{...S.turnoChipDot,background:turnoInfo.cor}}),
          h(CalendarDays,{size:14,color:"#8A8478"}),
          h("span",{style:S.turnoChipText},isVisaoTodos?`${gruposPorTurno.length} turnos · ${pessoasVisiveis} pessoas`:turnoInfo.horario)
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
      h("main",{className:"tbl-wrap",style:S.tableWrap},
        (isVisaoTodos?(buscando?gruposPorTurno.length===0:colaboradores.length===0):colaboradoresDoTurno.length===0)?
          h("div",{style:S.emptyState},
            h(Users,{size:28,color:"#BDC3C7"}),
            h("p",{style:S.emptyTitle},buscando?`Nenhum operador encontrado para "${busca.trim()}"`:"Nenhum colaborador"),
            buscando?h("button",{style:{...S.addBtn,marginTop:14},onClick:()=>setBusca("")},h("span",null,"Limpar pesquisa")):
            h("button",{style:{...S.addBtn,marginTop:14},onClick:()=>{setEditingColab({turno:isVisaoTodos?"manha":turnoAtivo});setShowCadastro(true);}},
              h(Plus,{size:16}),h("span",null,"Cadastrar")
            )
          ):
          h("div",{style:S.scrollArea},
            h("table",{className:"escala-table",style:S.table},
              h("thead",null,h("tr",null,
                h("th",{className:"th-name",style:S.thName},"Colaborador"),
                ...weekDays.map(d=>{
                  const isToday=isoDate(d)===isoDate(new Date()),isSun=d.getDay()===0;
                  return h("th",{key:d.toISOString(),className:"th-day",style:{...S.thDay,...(isToday?S.thDayToday:{}),...(isSun&&!isToday?S.thDaySunday:{})}},
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
                    ()=>{setEditingColab(c);setShowCadastro(true);},()=>setConfirmDelColab(c),getStatusInfo,anivMap[c.matricula]))
                )):
                h("tbody",null,...colaboradoresDoTurno.map((c,i)=>rowColab(c,i,weekDays,presencas,openModalStatus,
                  ()=>{setEditingColab(c);setShowCadastro(true);},()=>setConfirmDelColab(c),getStatusInfo,anivMap[c.matricula])))
            )
          )
      )
    ),

    tela==="bancohoras"&&liberado&&h(TelaBancoHoras,{relatorioBH,onSalvarRelatorio:handleSalvarRelatorioBH,onAjustar:handleAjustarBH,toast:showToast,colaboradores,bancoHoras,saldosPorColab,bhFiltro,setBhFiltro,
      onNovo:colabId=>{setEditingLanc(colabId?{colab_id:colabId}:null);setShowLanc(true);},
      onEditar:l=>{setEditingLanc(l);setShowLanc(true);},
      onDeletar:handleDeleteLanc,
      onDeletarVarios:handleDeleteLancs,
    }),
    tela==="faltas"&&liberado&&h(TelaFaltas,{colaboradores,presencas,tiposStatus,advs,onSalvar:handleSaveAdv,onExcluir:handleDelAdv}),
    tela==="ferias"&&liberado&&h(TelaFerias,{rh,ferias,onSalvar:handleSaveFerias,onExcluir:handleDelFerias,onQuitar:handleQuitarFerias}),
    tela==="contratos"&&liberado&&h(TelaContratos,{rh,onImportar:handleImportRh,onSalvar:handleSaveRh,onExcluir:handleDelRh}),
    tela==="almoco"&&h(TelaAlmoco,{colaboradores,presencas,almocos,almocoData,setAlmocoData,onSave:handleSaveAlmoco,tiposStatus,onSetHorario:handleSetHorarioAlmoco,onAplicarHorarios:handleAplicarHorarios}),

    tela!=="presenca"&&tela!=="almoco"&&!liberado&&h(TelaSenha,{onOk:liberar}),
    showCadastro&&h(CadastroModal,{liberado,rh,initial:editingColab,onClose:()=>{setShowCadastro(false);setEditingColab(null);},onSave:handleSaveColab}),
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
        maxHeight:"calc(100% - 24px)", overflowY:"auto", WebkitOverflowScrolling:"touch", overscrollBehavior:"contain",
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
      h("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}},

        // Botão limpar (só aparece se tiver algo marcado)
        statusAtual!=="vazio" && h("button",{
          onClick:()=>onSelect(colabId,dateIso,"vazio"),
          style:{
            gridColumn:"1 / -1",
            display:"flex",alignItems:"center",gap:12,
            padding:"8px 12px",borderRadius:12,
            border:"2px dashed #BFB4A0",
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
              display:"flex",alignItems:"center",gap:8,minWidth:0,
              padding:"8px 9px",borderRadius:12,textAlign:"left",fontFamily:"inherit",
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
              width:36,height:36,borderRadius:10,flexShrink:0,
              background:ativo?t.color:t.bg,
              border:`2px solid ${t.color}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,fontWeight:900,
              color:ativo?"#FFF":t.color,
              letterSpacing:"-0.5px",
              boxShadow:ativo?`0 2px 8px ${t.color}66`:"none",
            }},t.short),
            // Info
            h("div",{style:{flex:1,minWidth:0}},
              h("div",{style:{fontSize:12.5,lineHeight:1.15,fontWeight:ativo?800:700,color:ativo?t.color:"#1A1208",wordBreak:"break-word"}},t.label),
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

// ====== RELATÓRIOS RESUMIDOS PARA IMPRESSÃO (A4) ======
const BTN_IMPRIMIR = { padding:"6px 10px", borderRadius:9, border:"2px solid #2B2620", background:"#FFF", color:"#2B2620", fontSize:12, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" };

// cards: [{valor, rotulo}] · secoes: [{titulo, nota?, colunas:[...], linhas:[[cel,...]], rodape?:[...]}]
// cel = texto/número ou { t, b?, cor?, bg? }
function imprimirResumo({ titulo, subtitulo, cards = [], secoes = [] }) {
  const esc = v => String(v == null ? "" : v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const ag = new Date();
  const emitido = `${pad2(ag.getDate())}/${pad2(ag.getMonth()+1)}/${ag.getFullYear()} ${pad2(ag.getHours())}:${pad2(ag.getMinutes())}`;
  const cel = c => (c && typeof c === "object")
    ? `<td style="${c.cor ? "color:"+c.cor+";" : ""}${c.b ? "font-weight:bold;" : ""}${c.bg ? "background:"+c.bg+";" : ""}">${esc(c.t)}</td>`
    : `<td>${esc(c)}</td>`;
  const cardsHtml = cards.length ? `<div class="cards">${cards.map(c => `<div class="card"><b>${esc(c.valor)}</b><span>${esc(c.rotulo)}</span></div>`).join("")}</div>` : "";
  const secHtml = secoes.map(s => `<h2>${esc(s.titulo)}</h2>${s.nota ? `<p class="nota">${esc(s.nota)}</p>` : ""}` +
    (s.linhas.length
      ? `<table><thead><tr>${s.colunas.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${s.linhas.map(l => `<tr>${l.map(cel).join("")}</tr>`).join("")}</tbody>${s.rodape ? `<tfoot><tr>${s.rodape.map(cel).join("")}</tr></tfoot>` : ""}</table>`
      : (s.omitir ? "" : `<p class="vazio">Nenhum registro.</p>`))).join("");
  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"/><title>${esc(titulo)}</title>
<style>
  @page { size: A4; margin: 10mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 11px; color: #1A1208; margin: 0; }
  .cab { background: #1A1208; color: #FFF; padding: 10px 14px; display: flex; justify-content: space-between; align-items: flex-end; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cab h1 { font-size: 16px; margin: 0; } .cab p { font-size: 11px; opacity: .8; margin: 3px 0 0; } .cab .em { font-size: 10px; opacity: .7; text-align: right; }
  .cards { display: flex; gap: 8px; flex-wrap: wrap; margin: 10px 0 2px; }
  .card { border: 2px solid #BFB4A0; border-radius: 6px; padding: 6px 10px; min-width: 96px; }
  .card b { display: block; font-size: 18px; } .card span { font-size: 10px; color: #6B6458; }
  h2 { font-size: 12.5px; margin: 14px 0 4px; border-bottom: 2px solid #1A1208; padding-bottom: 2px; }
  .nota { font-size: 10px; color: #6B6458; margin: 2px 0 4px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #EDE7DA; text-align: left; font-size: 10px; padding: 4px 6px; border: 1px solid #BFB4A0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  td { padding: 3px 6px; border: 1px solid #CFC5B1; font-size: 10.5px; }
  tr { page-break-inside: avoid; } thead { display: table-header-group; }
  tbody tr:nth-child(even) td { background-color: #FAF8F4; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  tfoot td { font-weight: bold; background: #EDE7DA; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .vazio { font-size: 10.5px; color: #8A8478; padding: 4px 0; }
  .rod { margin-top: 14px; font-size: 9px; color: #8A8478; text-align: center; }
</style></head><body>
<div class="cab"><div><h1>${esc(titulo)}</h1><p>${esc(subtitulo)}</p></div><div class="em">Controle de Presença<br/>Emitido em ${emitido}</div></div>
${cardsHtml}${secHtml}
<div class="rod">Controle de Presença · Loja 286 Maracanã</div>
<script>window.onload=()=>window.print();</script>
</body></html>`;
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) { alert("Permita pop-ups deste site para imprimir o relatório."); return; }
  w.document.write(html); w.document.close();
}

// ====== ANIVERSÁRIO (data de nascimento vem da aba Contratos) ======
function infoAniversario(nascIso, hoje) {
  if (!nascIso) return null;
  const [y, m, d] = nascIso.split("-").map(Number);
  if (!y || !m || !d) return null;
  let prox = new Date(hoje.getFullYear(), m - 1, d);
  if (prox < hoje) prox = new Date(hoje.getFullYear() + 1, m - 1, d);
  return { dias: Math.round((prox - hoje) / 86400000), dia: d, mes: m, idade: prox.getFullYear() - y };
}

// ====== LINHA DA TABELA ======
function rowColab(colab,index,weekDays,presencas,onCycle,onEdit,onDelete,getStatusInfo,aniv){
  return h("tr",{key:colab.id,style:index%2===1?{background:"#FBFAF7"}:undefined},
    h("td",{className:"td-name",style:aniv&&aniv.dias===0?{...S.tdName,background:"#FFE3EE"}:S.tdName},
      h("div",{className:"name-cell",style:S.nameCell},
        h("div",null,
          h("div",{style:S.nameText},colab.nome),
          h("div",{style:S.nameMeta},`${colab.matricula} · ${colab.funcao}`),
          aniv&&aniv.dias<=1&&h("div",{style:{display:"inline-block",marginTop:3,padding:"2px 7px",borderRadius:999,fontSize:10.5,fontWeight:900,
            background:aniv.dias===0?"#D81B60":"#FCE4EC",color:aniv.dias===0?"#FFF":"#AD1457",border:"1.5px solid #D81B60"}},
            aniv.dias===0?`🎂 Aniversário hoje! (${aniv.idade} anos)`:"🎂 Amanhã")
        ),
        h("div",{className:"name-actions",style:S.nameActions},
          h("button",{style:S.iconBtn,onClick:onEdit},h(Pencil,{size:13})),
          h("button",{style:{...S.iconBtn,color:"#C0392B"},onClick:onDelete},h(Trash2,{size:13}))
        )
      )
    ),
    ...weekDays.map(d=>{
      const dateIso=isoDate(d),key=`${colab.id}:${dateIso}`;
      const status=presencas[key]||"vazio",s=getStatusInfo(status);
      const isToday=dateIso===isoDate(new Date()),marcado=status!=="vazio";
      return h("td",{key,className:"td-cell",style:S.tdCell},
        h("button",{
          className:"cell-btn",
          onClick:()=>onCycle(colab.id,dateIso,colab.nome),
          title: marcado?s.label:"Clique para marcar",
          style:{
            ...S.cellBtn,
            background: isToday&&!marcado?"#FFF8DC":marcado?s.color:"#FFFFFF",
            borderColor: isToday?"#2B2620":marcado?s.color:"#CFC5B1",
            borderWidth: 2.5,
            color: marcado?"#FFFFFF":isToday?"#2B2620":"#9C9586",
            fontWeight: marcado?900:600,
            boxShadow: isToday&&marcado?`0 0 0 2px #FFF, 0 0 0 4px #2B2620`:marcado?`0 2px 8px ${s.color}66`:"none",
            position:"relative",
          }
        },
          marcado ? s.short : h("span",{style:{fontSize:18,opacity:.45,fontWeight:700}},"+")
        )
      );
    })
  );
}

// ====== TELA BANCO DE HORAS ======
function TelaBancoHoras({relatorioBH,onSalvarRelatorio,onAjustar,toast,colaboradores,bancoHoras,saldosPorColab,bhFiltro,setBhFiltro,onNovo,onEditar,onDeletar,onDeletarVarios}){
  const fileRelRef=useRef(null);
  const [impDados,setImpDados]=useState(null);
  const relMap=useMemo(()=>{ const o={}; (relatorioBH||[]).forEach(r=>{ o[r.matricula]=r; }); return o; },[relatorioBH]);

  // Lê o relatório "Saldos a vencer do banco de horas" (xlsx/csv): Colaborador ("matrícula - NOME"), Cargo, SaldoAtual (HH:MM)
  const lerRelatorio=async file=>{
    try{
      if(!window.XLSX) throw new Error("Leitor de planilhas não carregou. Confira a internet e recarregue o app.");
      const wb=XLSX.read(await file.arrayBuffer(),{type:"array"});
      const linhas=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true,defval:""});
      const nz=t=>(t||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
      const hi=linhas.findIndex(l=>l.some(c=>nz(c).includes("colaborador")));
      if(hi<0) throw new Error("Coluna \"Colaborador\" não encontrada");
      const cab=linhas[hi].map(nz);
      const iCol=cab.findIndex(c=>c.includes("colaborador")), iCargo=cab.findIndex(c=>c.includes("cargo")), iSaldo=cab.findIndex(c=>c.includes("saldo"));
      if(iSaldo<0) throw new Error("Coluna de saldo não encontrada");
      const rows=[];
      linhas.slice(hi+1).forEach(l=>{
        const txt=(l[iCol]||"").toString().trim(); if(!txt) return;
        const m=/^(\d+)\s*-\s*(.+)$/.exec(txt);
        const v=l[iSaldo]; let min=null;
        if(typeof v==="number") min=Math.round(v*1440);
        else { const t=/^(-?)(\d+):(\d{2})$/.exec((v||"").toString().trim()); if(t) min=(t[1]?-1:1)*(+t[2]*60+ +t[3]); }
        if(min===null) return;
        rows.push({matricula:m?m[1]:"",nome:(m?m[2]:txt).trim(),cargo:iCargo>=0?(l[iCargo]||"").toString().trim():"",min});
      });
      if(rows.length===0) throw new Error("Nenhuma linha de saldo encontrada");
      const fd=/(\d{2})(\d{2})(20\d{2})/.exec(file.name);
      setImpDados({rows,arquivo:file.name,dataIso:fd?`${fd[3]}-${fd[2]}-${fd[1]}`:isoDate(new Date())});
    }catch(e){ toast("Erro ao ler: "+e.message,true); }
  };
  const [confirmDel,setConfirmDel]=useState(null);
  const [modoSel,setModoSel]=useState(false);
  const [selIds,setSelIds]=useState([]);
  const [confirmMulti,setConfirmMulti]=useState(null);
  const toggleSel=id=>setSelIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const sairSel=()=>{setModoSel(false);setSelIds([]);};
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

  const imprimirBH=()=>{
    const lista=colabsFiltrados.map(c=>({c,min:saldosPorColab[c.id]||0,rel:relMap[c.matricula]})).sort((a,b)=>a.min-b.min||a.c.nome.localeCompare(b.c.nome,"pt-BR"));
    const pos=lista.filter(x=>x.min>0), neg=lista.filter(x=>x.min<0);
    const soma=a=>a.reduce((t,x)=>t+x.min,0);
    const temRel=(relatorioBH||[]).length>0;
    const nTurno=c=>(TURNOS.find(t=>t.id===c.turno)||{}).label||c.turno;
    const dRel=temRel&&relatorioBH[0].data?relatorioBH[0].data.split("-").reverse().join("/"):"";
    const linhas=lista.map(x=>{
      const row=[x.c.nome,nTurno(x.c),{t:fmtSaldo(x.min).txt,b:true,cor:x.min<0?"#B71C1C":x.min>0?"#0F5A34":"#6B6458"}];
      if(temRel) row.push(x.rel?{t:fmtSaldo(x.rel.min).txt,b:x.rel.min!==x.min,cor:x.rel.min===x.min?"#6B6458":"#B71C1C"}:"—");
      return row;
    });
    imprimirResumo({titulo:"Resumo do banco de horas",
      subtitulo:`${filtroTurno==="todos"?"Todos os turnos":(TURNOS.find(t=>t.id===filtroTurno)||{}).label}${dRel?` · relatório de ${dRel}`:""}`,
      cards:[{valor:lista.length,rotulo:"colaboradores"},{valor:pos.length,rotulo:`com saldo positivo (${fmtSaldo(soma(pos)).txt})`},{valor:neg.length,rotulo:`com saldo negativo (${fmtSaldo(soma(neg)).txt})`},{valor:fmtSaldo(soma(lista)).txt,rotulo:"saldo líquido total"}],
      secoes:[{titulo:"Saldo por colaborador (do menor para o maior)",nota:temRel?"Saldo no app = lançamentos feitos aqui. Saldo no relatório = importado do sistema (em vermelho quando diferente).":"",
        colunas:["Colaborador","Turno","Saldo no app"].concat(temRel?["Saldo no relatório"]:[]),linhas,
        rodape:["Total ("+lista.length+")","",{t:fmtSaldo(soma(lista)).txt}].concat(temRel?[""]:[])}]});
  };

  return h("div",{style:S.bhWrap},
    h("div",{style:S.bhSaldosSection},
      h("div",{style:S.bhSaldosHeader},
        h("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}},
          h("span",{style:S.bhSaldosTitle},"Saldo por colaborador"),
          h("input",{ref:fileRelRef,type:"file",accept:".xlsx,.xls,.csv",style:{display:"none"},
            onChange:e=>{const f=e.target.files&&e.target.files[0]; if(f) lerRelatorio(f); e.target.value="";}}),
          h("button",{style:{padding:"6px 10px",borderRadius:9,border:"2px solid #2B2620",background:"#FFF",color:"#2B2620",fontSize:12,fontWeight:800,cursor:"pointer"},
            onClick:()=>fileRelRef.current&&fileRelRef.current.click()},"📥 Importar relatório de saldos"),
          h("button",{style:BTN_IMPRIMIR,onClick:imprimirBH},"🖨 Imprimir resumo")
        ),
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
          return h("button",{key:c.id,style:{...S.bhSaldoCard,...(ativo?{background:"#2B2620",borderColor:"#2B2620"}:{})},onClick:()=>{setBhFiltro(c.id);onNovo(c.id);}},
            h("div",{style:{...S.bhSaldoNome,...(ativo?{color:"#FAF8F4"}:{})}},c.nome),
            h("div",{style:{...S.bhSaldoMeta,...(ativo?{color:"#C9C3B8"}:{})}},c.funcao+" · "+(TURNOS.find(t=>t.id===c.turno)?.label||"")),
            h("div",{style:{fontSize:14,fontWeight:900,background:ativo?"rgba(255,255,255,0.12)":bg,color:ativo?(min===0?"#C9C3B8":min>0?"#8FD4A8":"#F4A198"):color,borderRadius:8,padding:"3px 8px",marginTop:4}},txt),
            relMap[c.matricula]&&h("div",{style:{fontSize:10.5,marginTop:3,fontWeight:700,color:ativo?"#C9C3B8":(relMap[c.matricula].min===min?"#6B6458":"#B71C1C")}},
              `Relatório: ${relMap[c.matricula].min<0?"-":""}${minParaHora(relMap[c.matricula].min)}${relMap[c.matricula].min===min?"":" ≠"}`)
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
        h("div",{style:{display:"flex",gap:6,alignItems:"center"}},
          h("button",{style:{padding:"8px 12px",borderRadius:10,border:"2px solid "+(modoSel?"#2B2620":"#BFB4A0"),background:modoSel?"#2B2620":"#FFF",color:modoSel?"#FAF8F4":"#5C5648",fontSize:12.5,fontWeight:700,cursor:"pointer"},
            onClick:()=>modoSel?sairSel():setModoSel(true)},modoSel?"Cancelar":"Selecionar"),
          h("button",{style:S.addBtn,onClick:()=>onNovo(bhFiltro||null)},h(Plus,{size:15,strokeWidth:2.5}),h("span",null,"Lançar horas"))
        )
      ),
      // Barra de ações em lote
      (modoSel||colabSel)&&lancsFiltrados.length>0&&h("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",padding:"8px 14px",background:"#FAF8F4",borderBottom:"2px solid #D9CFBC"}},
        modoSel&&h("button",{style:{padding:"7px 10px",borderRadius:8,border:"2px solid #BFB4A0",background:"#FFF",fontSize:12,fontWeight:700,color:"#5C5648",cursor:"pointer"},
          onClick:()=>setSelIds(selIds.length===lancsFiltrados.length?[]:lancsFiltrados.map(b=>b.id))},
          selIds.length===lancsFiltrados.length?"Desmarcar todos":"Selecionar todos"),
        modoSel&&h("button",{disabled:selIds.length===0,style:{padding:"7px 12px",borderRadius:8,border:"none",background:selIds.length?"#C0392B":"#E8E3D8",color:"#FFF",fontSize:12,fontWeight:700,cursor:selIds.length?"pointer":"default"},
          onClick:()=>setConfirmMulti({ids:selIds,titulo:`Remover ${selIds.length} lançamento${selIds.length>1?"s":""}?`,texto:"Os lançamentos selecionados serão apagados e o saldo será recalculado."})},
          `Remover selecionados (${selIds.length})`),
        colabSel&&h("button",{style:{marginLeft:"auto",padding:"7px 10px",borderRadius:8,border:"1.5px solid #C0392B",background:"#FFF",color:"#C0392B",fontSize:12,fontWeight:700,cursor:"pointer"},
          onClick:()=>setConfirmMulti({ids:lancsFiltrados.map(b=>b.id),titulo:`Limpar tudo de ${colabSel.nome}?`,texto:`Serão removidos todos os ${lancsFiltrados.length} lançamentos deste colaborador. Não dá para desfazer.`})},
          "Limpar todos do colaborador")
      ),
      lancsFiltrados.length===0?
        h("div",{style:S.bhEmpty},
          h("p",{style:S.bhEmptyTitle},"Nenhum lançamento"),
          h("p",{style:S.bhEmptySub},"Use 'Lançar horas' para registrar créditos ou débitos.")
        ):
        h("div",{style:S.bhLancsList},
          lancsFiltrados.map(b=>{
            const colab=colaboradores.find(c=>c.id===b.colab_id),{txt,color,bg}=fmtSaldo(b.minutos);
            const marcado=selIds.includes(b.id);
            return h("div",{key:b.id,style:{...S.bhLancCard,...(modoSel&&marcado?{background:"#FFF3F1"}:{}),...(modoSel?{cursor:"pointer"}:{})},onClick:modoSel?()=>toggleSel(b.id):undefined},
              modoSel&&h("div",{style:{width:22,height:22,borderRadius:6,flexShrink:0,border:"2px solid "+(marcado?"#C0392B":"#C9C3B8"),background:marcado?"#C0392B":"#FFF",color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900}},marcado?"✓":""),
              h("div",{style:S.bhLancLeft},
                h("div",{style:{...S.bhLancTipo,background:b.minutos>0?"#D4F0E0":"#FADBD8",color:b.minutos>0?"#1A7A4A":"#C0392B"}},b.minutos>0?"+":"−"),
                h("div",null,
                  h("div",{style:S.bhLancNome},colab?colab.nome:b.colab_id),
                  h("div",{style:S.bhLancMeta},b.data.split("-").reverse().join("/")+(b.descricao?" · "+b.descricao:""))
                )
              ),
              h("div",{style:S.bhLancRight},
                h("span",{style:{fontSize:14,fontWeight:800,color,background:bg,borderRadius:8,padding:"4px 10px"}},txt),
                !modoSel&&h("div",{style:{display:"flex",gap:6,marginTop:6}},
                  h("button",{"aria-label":"Editar",style:{...S.iconBtn,width:38,height:38,borderRadius:10,background:"#F4F1EA",color:"#5C5648",cursor:"pointer"},onClick:()=>onEditar(b)},h(Pencil,{size:18})),
                  h("button",{"aria-label":"Excluir",style:{...S.iconBtn,width:38,height:38,borderRadius:10,background:"#FDECEA",color:"#C0392B",cursor:"pointer"},onClick:()=>setConfirmDel(b)},h(Trash2,{size:18}))
                )
              )
            );
          })
        )
    ),
    impDados&&h(ImportBHModal,{dados:impDados,colaboradores,saldosPorColab,onClose:()=>setImpDados(null),
      onSalvar:async(docs)=>{await onSalvarRelatorio(docs);setImpDados(null);},
      onAjustar:async(ajustes,docs,dataIso)=>{await onSalvarRelatorio(docs);await onAjustar(ajustes,dataIso);setImpDados(null);}}),
    confirmMulti&&h("div",{style:S.modalOverlay,onClick:()=>setConfirmMulti(null)},
      h("div",{style:S.confirmCard,onClick:e=>e.stopPropagation()},
        h("p",{style:S.confirmTitle},confirmMulti.titulo),
        h("p",{style:S.confirmText},confirmMulti.texto),
        h("div",{style:S.confirmActions},
          h("button",{style:S.btnGhost,onClick:()=>setConfirmMulti(null)},"Cancelar"),
          h("button",{style:S.btnDanger,onClick:async()=>{const ids=confirmMulti.ids;setConfirmMulti(null);sairSel();await onDeletarVarios(ids);}},"Remover")
        )
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
  const [tipo,setTipo]=useState(initial?.minutos!=null?(initial.minutos>0?"credito":"debito"):"credito");
  const [horas,setHoras]=useState(initial?.minutos!=null?minParaHora(Math.abs(initial.minutos)):"01:00");
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
function CadastroModal({liberado,rh,initial,onClose,onSave}){
  const isEdit=Boolean(initial&&initial.id);
  const [nome,     setNome]     = useState(initial?.nome||"");
  const [matricula,setMatricula]= useState(initial?.matricula||"");
  const [funcao,   setFuncao]   = useState(initial?.funcao||FUNCOES[0]);
  const [turno,    setTurno]    = useState(initial?.turno||"manha");
  const [diaFolga, setDiaFolga] = useState(initial?.diaFolga!==undefined ? initial.diaFolga : null);
  const rhAtual=(rh||[]).find(r=>r.id===initial?.matricula);
  const [horarioAlmoco,setHorarioAlmoco]=useState(initial?.horarioAlmoco||"");
  const [admissao,  setAdmissao]  = useState(rhAtual?.admissao||"");
  const [nascimento,setNascimento]= useState(rhAtual?.nascimento||"");
  const [error,    setError]    = useState("");

  const submit=()=>{
    if(!nome.trim()){setError("Informe o nome.");return;}
    if(!matricula.trim()){setError("Informe a matrícula.");return;}
    onSave({id:initial?.id, nome:nome.trim(), matricula:matricula.trim(), funcao, turno, diaFolga, horarioAlmoco, admissao:liberado?admissao:"", nascimento:liberado?nascimento:""});
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
        h("label",{style:S.label},"Horário padrão de almoço"),
        h("input",{type:"time",style:S.input,value:horarioAlmoco,onChange:e=>setHorarioAlmoco(e.target.value)})
      ),
      liberado&&h("div",null,
      h("div",{style:{display:"flex",gap:10,flexWrap:"wrap"}},
        h("div",{style:{...S.formGroup,flex:"1 1 140px"}},
          h("label",{style:S.label},"Data de admissão"),
          h("input",{type:"date",style:S.input,value:admissao,onChange:e=>setAdmissao(e.target.value)})
        ),
        h("div",{style:{...S.formGroup,flex:"1 1 140px"}},
          h("label",{style:S.label},"Aniversário (nascimento)"),
          h("input",{type:"date",style:S.input,value:nascimento,onChange:e=>setNascimento(e.target.value)})
        )
      ),
      h("p",{style:{...S.hintText,marginTop:-6,marginBottom:10}},"Com a data de admissão preenchida, o colaborador é lançado na aba Contratos (45 e 90 dias).")
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
function ResumoDia({ colaboradores, presencas, tiposStatus, dataRef, busca, setBusca, rh }) {
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

  // Presentes por horário (turno)
  const porHorario = useMemo(() => {
    const agora = new Date(); const min = agora.getHours()*60 + agora.getMinutes();
    const emAndamento = (hor) => {
      const m = /(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/.exec(hor||"");
      if (!m) return false;
      const ini = +m[1]*60 + +m[2], fim = +m[3]*60 + +m[4];
      return ini <= fim ? (min >= ini && min < fim) : (min >= ini || min < fim);
    };
    return TURNOS.filter(t => t.id !== "afastados").map(t => {
      const lista = colaboradores.filter(c => c.turno === t.id);
      const pres  = lista.filter(c => presencas[`${c.id}:${hoje}`] === "presente").length;
      return { ...t, total: lista.length, pres, agora: emAndamento(t.horario) };
    }).filter(t => t.total > 0);
  }, [colaboradores, presencas, hoje]);
  const totalPresentes = porHorario.reduce((n, t) => n + t.pres, 0);

  // Aniversariantes (hoje e próximos 7 dias) — datas vêm da aba Contratos
  const aniversarios = useMemo(() => {
    const hj = new Date(); hj.setHours(0,0,0,0);
    const curto = n => { const p=(n||"").trim().split(/\s+/); const c=x=>x.charAt(0).toUpperCase()+x.slice(1).toLowerCase(); return p.length<=2?p.map(c).join(" "):c(p[0])+" "+c(p[p.length-1]); };
    const l = (rh||[]).map(r => ({ nome:curto(r.nome), i:infoAniversario(r.nascimento, hj) })).filter(x => x.i && x.i.dias <= 7);
    return { hoje:l.filter(x=>x.i.dias===0), prox:l.filter(x=>x.i.dias>0).sort((a,b)=>a.i.dias-b.i.dias) };
  }, [rh]);

  const imprimirDia = () => {
    const st = c => presencas[`${c.id}:${hoje}`] || "vazio";
    const lab = id => { const t = tiposStatus.find(x => x.id === id); return t ? t.label : id; };
    const ativos = colaboradores.filter(c => c.turno !== "afastados");
    const nTurno = c => (TURNOS.find(t => t.id === c.turno) || {}).label || c.turno;
    const fixos = ["presente", "falta", "folga", "vazio"];
    const ordena = (a, b) => a.nome.localeCompare(b.nome, "pt-BR");
    const tot = k => ativos.filter(c => st(c) === k).length;
    const linhasTurno = TURNOS.filter(t => t.id !== "afastados").map(t => {
      const l = ativos.filter(c => c.turno === t.id); if (!l.length) return null;
      const n = k => l.filter(c => st(c) === k).length;
      return [t.label, t.horario, l.length, { t:n("presente"), b:true, cor:"#0F5A34" }, n("falta") ? { t:n("falta"), b:true, cor:"#B71C1C" } : 0, n("folga"), l.filter(c => !fixos.includes(st(c))).length, n("vazio")];
    }).filter(Boolean);
    const ocorr = ativos.filter(c => !["presente", "folga", "vazio"].includes(st(c))).sort((a, b) => st(a).localeCompare(st(b)) || ordena(a, b))
      .map(c => [c.nome, nTurno(c), { t:lab(st(c)), b:true, cor: st(c) === "falta" ? "#B71C1C" : "#1A1208" }]);
    const sem = ativos.filter(c => st(c) === "vazio").sort(ordena).map(c => [c.nome, nTurno(c)]);
    const secoes = [
      { titulo:"Presença por turno", colunas:["Turno","Horário","Total","Presentes","Faltas","Folgas","Outros","Sem marcação"], linhas:linhasTurno,
        rodape:["Total", "", ativos.length, tot("presente"), tot("falta"), tot("folga"), ativos.filter(c => !fixos.includes(st(c))).length, tot("vazio")] },
      { titulo:"Faltas, férias, atestados e outras ocorrências", colunas:["Colaborador","Turno","Status"], linhas:ocorr },
      sem.length > 0 && { titulo:`Sem marcação hoje (${sem.length})`, colunas:["Colaborador","Turno"], linhas:sem.length <= 30 ? sem : [], omitir:true, nota: sem.length > 30 ? "Lista omitida por ser longa; veja a coluna \"Sem marcação\" da tabela por turno." : "" },
      (aniversarios.hoje.length + aniversarios.prox.length) > 0 && { titulo:"Aniversariantes (hoje e próximos 7 dias)", colunas:["Colaborador","Data","Idade"],
        linhas:aniversarios.hoje.concat(aniversarios.prox).map(x => [x.nome, x.i.dias === 0 ? { t:"HOJE", b:true, cor:"#AD1457" } : `${pad2(x.i.dia)}/${pad2(x.i.mes)}`, `${x.i.idade} anos`]) },
    ].filter(Boolean);
    imprimirResumo({ titulo:"Resumo da presença", subtitulo:`Loja 286 · ${dataFmt}`,
      cards:[{ valor:ativos.length, rotulo:"colaboradores" }, { valor:tot("presente"), rotulo:"presentes" }, { valor:tot("falta"), rotulo:"faltas" }, { valor:tot("folga"), rotulo:"folgas" }, { valor:tot("vazio"), rotulo:"sem marcação" }], secoes });
  };

  return h("div", { style: S.resumoWrap },
    h("div", { style: S.resumoHeader },
      h("span", { style: S.resumoTitulo }, `Resumo de hoje — ${dataFmt}`),
      h("div", { className:"resumo-busca", style: { display:"flex", alignItems:"center", gap:6, flex:"1 1 180px", maxWidth:300, minWidth:150,
          background:"rgba(255,255,255,0.10)", border:"1.5px solid "+(busca?"#FF6D00":"rgba(255,255,255,0.18)"),
          borderRadius:999, padding:"4px 10px" } },
        h(Search, { size:14, color:"#C9BC9A", strokeWidth:2.4 }),
        h("input", { type:"search", value:busca||"", placeholder:"Pesquisar operador", "aria-label":"Pesquisar operador",
          onChange:e=>setBusca(e.target.value),
          style:{ flex:1, minWidth:0, background:"transparent", border:"none", outline:"none", color:"#FAF8F4", fontSize:13, fontFamily:"inherit", WebkitAppearance:"none" } }),
        busca&&h("button", { onClick:()=>setBusca(""), "aria-label":"Limpar pesquisa",
          style:{ background:"transparent", border:"none", color:"#C9BC9A", cursor:"pointer", padding:0, display:"flex" } },
          h(X, { size:14, strokeWidth:2.6 }))
      ),
      h("button", { onClick:imprimirDia, style:{ padding:"5px 10px", borderRadius:999, border:"1.5px solid rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.12)", color:"#FAF8F4", fontSize:12, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" } }, "🖨 Imprimir resumo"),
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
    ),

    // Aniversariantes
    (aniversarios.hoje.length > 0 || aniversarios.prox.length > 0) && h("div", { style: { marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 12, color: "#FAF8F4", lineHeight: 1.5 } },
      aniversarios.hoje.length > 0 && h("div", null, h("span", { style:{ fontWeight:900, color:"#FF80AB" } }, "🎂 Aniversariantes de hoje: "), aniversarios.hoje.map(x => `${x.nome} (${x.i.idade} anos)`).join(", ")),
      aniversarios.prox.length > 0 && h("div", { style:{ color:"#C9BC9A", fontSize:11.5 } }, "Próximos 7 dias: ", aniversarios.prox.map(x => `${x.nome} (${pad2(x.i.dia)}/${pad2(x.i.mes)})`).join(", "))
    ),

    // Presentes por horário
    porHorario.length > 0 && h("div", { style: { marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.12)" } },
      h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 } },
        h("span", { style: { fontSize: 11, fontWeight: 800, color: "#C9BC9A", textTransform: "uppercase", letterSpacing: "0.05em" } }, "Presentes por horário"),
        h("span", { style: { fontSize: 11, color: "#C9BC9A" } }, `${totalPresentes} presentes no total`)
      ),
      h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 } },
        porHorario.map(t => h("div", { key: t.id, style: {
          flexShrink: 0, minWidth: 118, borderRadius: 10, padding: "7px 10px",
          background: "rgba(255,255,255,0.07)",
          border: t.agora ? `1.5px solid ${t.cor}` : "1.5px solid rgba(255,255,255,0.10)",
        }},
          h("div", { style: { display: "flex", alignItems: "center", gap: 5, marginBottom: 3 } },
            h("span", { style: { width: 8, height: 8, borderRadius: "50%", background: t.cor, flexShrink: 0 } }),
            h("span", { style: { fontSize: 11, fontWeight: 800, color: "#FAF8F4" } }, t.label),
            t.agora && h("span", { style: { fontSize: 8.5, fontWeight: 900, color: "#1A1208", background: t.cor, borderRadius: 4, padding: "1px 4px", marginLeft: "auto" } }, "AGORA")
          ),
          h("div", { style: { fontSize: 10, color: "#C9BC9A", marginBottom: 3 } }, t.horario),
          h("div", { style: { display: "flex", alignItems: "baseline", gap: 3 } },
            h("span", { style: { fontSize: 20, fontWeight: 900, color: t.pres === t.total ? "#6EE7A0" : "#FAF8F4", lineHeight: 1 } }, t.pres),
            h("span", { style: { fontSize: 11, color: "#C9BC9A" } }, `/ ${t.total}`)
          )
        ))
      )
    )
  );
}

// ====== TELA ALMOÇO ======
function TelaAlmoco({ colaboradores, presencas, almocos, almocoData, setAlmocoData, onSave, tiposStatus, onSetHorario, onAplicarHorarios }) {
  const [agrupar, setAgrupar] = useState(null);
  const [modalHor, setModalHor] = useState(null);
  const [impAlmoco, setImpAlmoco] = useState(false);
  const comHor = colaboradores.filter(c => c.horarioAlmoco).length;
  const modo = agrupar || (comHor > 0 ? "horario" : "turno");

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

  const grupos = useMemo(() => {
    if (modo === "horario") {
      const m = {};
      presentes.forEach(c => { const k = c.horarioAlmoco || "-"; (m[k] = m[k] || []).push(c); });
      return Object.keys(m).sort((a, b) => a === "-" ? 1 : b === "-" ? -1 : a.localeCompare(b)).map(k => ({
        turno:k,
        info: k === "-" ? { label:"Sem horário definido", horario:"toque no 🕐 do colaborador", cor:"#BDB6A8" } : { label:`🍽 Almoço ${k}`, horario:"horário padrão", cor:"#E67E22" },
        lista: m[k].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")) }));
    }
    const out = [];
    presentes.forEach(c => {
      let g = out[out.length-1];
      if (!g || g.turno !== c.turno) { g = { turno:c.turno, info:TURNOS.find(t=>t.id===c.turno), lista:[] }; out.push(g); }
      g.lista.push(c);
    });
    return out;
  }, [presentes, modo]);

  const nomeCurto = (nome) => {
    const p = (nome||"").trim().split(/\s+/);
    const cap = s => s.charAt(0).toUpperCase()+s.slice(1).toLowerCase();
    if (p.length <= 2) return p.map(cap).join(" ");
    return cap(p[0])+" "+cap(p[p.length-1]);
  };

  const imprimirAlmoco = () => {
    const [y, m, d] = almocoData.split("-");
    const reg = c => almocos[`${c.id}:${almocoData}`] || {};
    const minDur = r => { if (!r.saida || !r.retorno) return null; const diff = horaParaMin(r.retorno) - horaParaMin(r.saida); return diff > 0 ? diff : null; };
    const durs = presentes.map(c => minDur(reg(c))).filter(x => x != null);
    const media = durs.length ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length) : null;
    imprimirResumo({ titulo:"Resumo do almoço", subtitulo:`Loja 286 · ${d}/${m}/${y}`,
      cards:[{ valor:presentes.length, rotulo:"presentes" }, { valor:presentes.filter(c => reg(c).saida).length, rotulo:"já saíram" },
        { valor:presentes.filter(c => reg(c).retorno).length, rotulo:"já voltaram" }, { valor:presentes.filter(c => !reg(c).saida).length, rotulo:"ainda não saíram" },
        { valor: media != null ? `${Math.floor(media/60)}h${pad2(media%60)}` : "—", rotulo:"duração média" }],
      secoes: grupos.map(g => ({ titulo:`${(g.info||{}).label || g.turno} · ${(g.info||{}).horario || ""} (${g.lista.length})`, colunas:["Colaborador","Almoço padrão","Saída","Retorno","Duração"],
        linhas: g.lista.map(c => { const r = reg(c); return [c.nome, c.horarioAlmoco || "—", r.saida || "—", r.saida && !r.retorno ? { t:"fora", b:true, cor:"#B7770D" } : (r.retorno || "—"), duracao(r.saida, r.retorno) || "—"]; }) })) });
  };

  return h("div", { style:{ padding:"12px 16px", paddingBottom:60 } },

    // Seletor de data + contador
    h("div", { style:{ background:"#FFF", borderRadius:12, border:"2px solid #CFC5B1", padding:"12px 14px", marginBottom:14 } },
      h("div", { style:{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 } },
        h("div", null,
          h("label", { style:{ ...S.label, marginBottom:6 } }, "Data"),
          h("input", { type:"date", value:almocoData, onChange:e=>setAlmocoData(e.target.value),
            style:{ ...S.input, width:"auto", padding:"8px 10px" } })
        ),
        h("div", { style:{ textAlign:"right" } },
          h("button", { style:{ ...BTN_IMPRIMIR, marginBottom:6 }, onClick:imprimirAlmoco }, "🖨 Imprimir resumo"),
          h("div", { style:{ fontSize:22, fontWeight:900, color:"#2B2620" } }, presentes.length),
          h("div", { style:{ fontSize:11, color:"#9C9586" } }, "presentes")
        )
      ),
      h("div", { style:{ display:"flex", gap:16, marginTop:10, padding:"8px 0 0", borderTop:"2px solid #D9CFBC" } },
        h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
          h("div", { style:{ width:10, height:10, borderRadius:3, background:"#FFFFFF", border:"1.5px solid #D8D2C5" } }),
          h("span", { style:{ fontSize:11, color:"#9C9586" } }, "Não registrado")
        ),
        h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
          h("div", { style:{ width:10, height:10, borderRadius:3, background:"#FFE08A", border:"1.5px solid #E59E00" } }),
          h("span", { style:{ fontSize:11, color:"#9C9586" } }, "Saiu")
        ),
        h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
          h("div", { style:{ width:10, height:10, borderRadius:3, background:"#BDE8CF", border:"1.5px solid #1A7A4A" } }),
          h("span", { style:{ fontSize:11, color:"#9C9586" } }, "Voltou")
        )
      )
    ),

    h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:12 } },
      h("span", { style:{ fontSize:12, fontWeight:700, color:"#6B6458" } }, "Agrupar por:"),
      h("div", { style:{ display:"inline-flex", borderRadius:9, overflow:"hidden" } },
        [["turno", "Turno"], ["horario", "Horário de almoço"]].map(([id, rot]) => h("button", { key:id, onClick:()=>setAgrupar(id), style:{ padding:"6px 12px", fontSize:12, fontWeight:800, cursor:"pointer", border:"2px solid #2B2620", background:modo === id ? "#2B2620" : "#FFF", color:modo === id ? "#FAF8F4" : "#2B2620" } }, rot))),
      h("button", { style:BTN_IMPRIMIR, onClick:()=>setImpAlmoco(true) }, "📋 Aplicar quadro de horários"),
      h("span", { style:{ fontSize:11, color:"#8A8478" } }, `${comHor} de ${colaboradores.length} com horário padrão`)),

    presentes.length === 0 ?
      h("div", { style:S.emptyState },
        h(UtensilsCrossed, { size:28, color:"#BDC3C7" }),
        h("p", { style:S.emptyTitle }, "Nenhum colaborador com presença nesta data"),
        h("p", { style:{ fontSize:12.5, color:"#9C9586", margin:0 } }, "Marque a presença na aba Escala primeiro.")
      ) :
      h("div", null,
        grupos.map(g => h("div", { key:g.turno, style:{ marginBottom:14 } },

          // Cabeçalho de turno
          h("div", { style:{ display:"flex", alignItems:"center", gap:6, padding:"4px 0 8px" } },
            h("span", { style:{ width:8, height:8, borderRadius:"50%", background:g.info?.cor||"#ccc", flexShrink:0, display:"inline-block" } }),
            h("span", { style:{ fontSize:11, fontWeight:800, color:"#6B6458", textTransform:"uppercase", letterSpacing:"0.05em" } },
              g.info?.label||g.turno, " · ", g.info?.horario||"", "  (", g.lista.length, ")"
            )
          ),

          // Grade de quadradinhos
          h("div", { style:{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(96px, 1fr))", gap:8 } },
            g.lista.map(colab => {
              const key  = `${colab.id}:${almocoData}`;
              const reg  = almocos[key] || {};
              const dur  = duracao(reg.saida, reg.retorno);
              const estado = !reg.saida ? "livre" : !reg.retorno ? "saiu" : "voltou";
              const cores = {
                livre:  { bg:"#FFFFFF", borda:"#D8D2C5", badgeText:"#8A8478", label:"Livre" },
                saiu:   { bg:"#FFE08A", borda:"#E59E00", badgeText:"#6B4500", label:"SAIU" },
                voltou: { bg:"#BDE8CF", borda:"#1A7A4A", badgeText:"#0F5A34", label:"✓ VOLTOU" },
              }[estado];

              return h("div", { key: colab.id, style:{ position:"relative", minWidth:0 } },
              h("button", {
                onClick: () => clicar(colab),
                title: colab.nome,
                style:{
                  aspectRatio:"1 / 1", width:"100%", minWidth:0, cursor:"pointer",
                  background: cores.bg, border:`2px solid ${cores.borda}`,
                  borderRadius:12, padding:"6px 5px",
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between",
                  textAlign:"center", overflow:"hidden",
                  boxShadow: estado!=="livre" ? `0 2px 8px ${cores.borda}44` : "none",
                  transition:"all 0.15s",
                }
              },
                // Ícone / estado
                estado === "livre"
                  ? (colab.horarioAlmoco ? h("span", { style:{ fontSize:10.5, fontWeight:800, color:"#8A8478", lineHeight:1, marginTop:2 } }, "🍽 " + colab.horarioAlmoco) : h(UtensilsCrossed, { size:16, color:"#BDC3C7", strokeWidth:2 }))
                  : h("span", { style:{ fontSize:10, fontWeight:900, color:cores.badgeText, lineHeight:1, marginTop:2 } }, cores.label),

                // Nome
                h("div", { style:{
                  fontSize:11, fontWeight:700, color:"#2B2620", lineHeight:1.15,
                  display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden",
                  wordBreak:"break-word", width:"100%",
                }}, nomeCurto(colab.nome)),

                // Horários
                h("div", { style:{ minHeight:14, fontSize:10, fontWeight:700, lineHeight:1.2, color:cores.badgeText } },
                  reg.saida && h("div", null, `↑${reg.saida}`),
                  reg.retorno && h("div", null, `↓${reg.retorno}`),
                  dur && h("div", { style:{ color:"#5C5648", fontWeight:600 } }, dur)
                )
              ),

              // Horário padrão de almoço
              h("button", { title:"Horário de almoço", "aria-label":"Horário de almoço de "+colab.nome,
                onClick: e => { e.stopPropagation(); setModalHor(colab); },
                style:{ position:"absolute", top:-6, left:-6, width:22, height:22, borderRadius:"50%", background:"#FFF", border:"2px solid #BFB4A0",
                  fontSize:11, lineHeight:1, cursor:"pointer", padding:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 } }, "🕐"),

              // Excluir lançamento
              reg.saida && h("button", {
                title:"Excluir lançamento",
                "aria-label":"Excluir lançamento de "+colab.nome,
                onClick: async (e) => {
                  e.stopPropagation();
                  if (window.confirm("Excluir o lançamento de almoço de "+nomeCurto(colab.nome)+"?")) {
                    await onSave(colab.id, almocoData, "", "");
                  }
                },
                style:{
                  position:"absolute", top:-6, right:-6, width:22, height:22, borderRadius:"50%",
                  background:"#C0392B", color:"#FFF", border:"2px solid #FFF",
                  fontSize:13, fontWeight:900, lineHeight:1, cursor:"pointer", padding:0,
                  display:"flex", alignItems:"center", justifyContent:"center", zIndex:2,
                }
              }, "×")
              );
            })
          )
        ))
      ),
    modalHor && h(HorarioAlmocoModal, { colab:modalHor, onClose:()=>setModalHor(null), onSave: async (id, hora) => { await onSetHorario(id, hora); setModalHor(null); } }),
    impAlmoco && h(ImportAlmocoModal, { colaboradores, onClose:()=>setImpAlmoco(false), onConfirm: async pares => { await onAplicarHorarios(pares); setImpAlmoco(false); } })
  );
}

// ====== CONTRATOS DE EXPERIÊNCIA (45 + 45 = 90 dias) ======
// Contagem: o dia da admissão é o dia 1 → 45º dia = admissão + 44; 90º dia = admissão + 89
function TelaContratos({ rh, onImportar, onSalvar, onExcluir }) {
  const [edit, setEdit] = useState(null);   // linha em edição ({} = novo)
  const [filtro, setFiltro] = useState("exp");
  const [q, setQ] = useState("");
  const fileRef = useRef(null);
  const [mobile, setMobile] = useState(() => window.innerWidth < 720);
  useEffect(() => {
    const f = () => setMobile(window.innerWidth < 720);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const hoje = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const parseISO = iso => { const [y,m,d] = (iso||"").split("-").map(Number); return new Date(y, (m||1)-1, d||1); };
  const fmt = d => d ? `${pad2(d.getDate())}/${pad2(d.getMonth()+1)}/${d.getFullYear()}` : "";
  const fmtIso = iso => iso ? fmt(parseISO(iso)) : "";
  const dif = (a, b) => Math.round((a - b) / 86400000);
  const norm = t => (t||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

  const linhas = useMemo(() => rh.map(r => {
    const adm = parseISO(r.admissao);
    const fim45 = addDays(adm, 44), fim90 = addDays(adm, 89);
    const d45 = dif(fim45, hoje), d90 = dif(fim90, hoje);
    let fase, dias, alvo;
    if (dif(adm, hoje) > 0)  { fase = "futuro"; dias = dif(adm, hoje); alvo = null; }
    else if (d45 >= 0)       { fase = "1";      dias = d45; alvo = "45"; }
    else if (d90 >= 0)       { fase = "2";      dias = d90; alvo = "90"; }
    else                     { fase = "fora";   dias = null; alvo = null; }
    return { ...r, adm, fim45, fim90, fase, dias, alvo, aniv: infoAniversario(r.nascimento, hoje), emExp: fase === "1" || fase === "2" };
  }), [rh, hoje]);

  const emExp = linhas.filter(l => l.emExp);
  const cont = {
    exp: emExp.length,
    f1: emExp.filter(l => l.fase === "1").length,
    f2: emExp.filter(l => l.fase === "2").length,
    sem7: emExp.filter(l => l.dias <= 7).length,
    todos: linhas.length,
    aniv: linhas.filter(l => l.aniv && l.aniv.mes === hoje.getMonth()+1).length,
  };

  const visiveis = useMemo(() => {
    const t = norm(q.trim());
    let l = linhas.filter(x => filtro === "todos" ? true : filtro === "aniv" ? (x.aniv && x.aniv.mes === hoje.getMonth()+1) : filtro === "7d" ? (x.emExp && x.dias <= 7) : x.emExp);
    if (t) l = l.filter(x => norm(x.nome).includes(t) || norm(x.matricula).includes(t) || norm(x.cargo).includes(t));
    return l.sort((a, b) => filtro === "aniv" ? (a.aniv.dia - b.aniv.dia) || a.nome.localeCompare(b.nome, "pt-BR") : filtro === "todos"
      ? a.nome.localeCompare(b.nome, "pt-BR")
      : ((a.dias ?? 9999) - (b.dias ?? 9999)) || a.nome.localeCompare(b.nome, "pt-BR"));
  }, [linhas, filtro, q]);

  const corDias = d => d <= 7 ? { bg:"#FDECEA", fg:"#B71C1C", bd:"#E57373" } : d <= 15 ? { bg:"#FFF3CD", fg:"#7A5200", bd:"#F5A300" } : { bg:"#E3F4EA", fg:"#0F5A34", bd:"#7CC79B" };
  const situacao = l => {
    if (l.fase === "futuro") return h("span", { style:{ color:"#6B6458", fontSize:11 } }, `Inicia em ${l.dias} d`);
    if (l.fase === "fora")   return h("span", { style:{ color:"#8A8478", fontSize:11 } }, "Fora da experiência");
    const c = corDias(l.dias);
    return h("span", { style:{ background:c.bg, color:c.fg, border:`1.5px solid ${c.bd}`, borderRadius:8, padding:"3px 8px", fontSize:11, fontWeight:800, whiteSpace:"nowrap" } },
      l.dias === 0 ? `Vence HOJE (${l.alvo}d)` : `Faltam ${l.dias} d p/ ${l.alvo} dias`);
  };

  const imprimirContratos = () => {
    const rotFiltro = { exp:"em experiência", "7d":"vencem em até 7 dias", aniv:"aniversariantes do mês", todos:"todos os colaboradores" }[filtro];
    const sit = l => l.fase === "futuro" ? `Inicia em ${l.dias} d` : l.fase === "fora" ? "Fora da experiência" : (l.dias === 0 ? "Vence HOJE" : `Faltam ${l.dias} d`) + ` p/ ${l.alvo} dias`;
    const mes = hoje.getMonth() + 1;
    const anivs = linhas.filter(l => l.aniv && l.aniv.mes === mes).sort((a, b) => a.aniv.dia - b.aniv.dia || a.nome.localeCompare(b.nome, "pt-BR"));
    imprimirResumo({ titulo:"Resumo dos contratos de experiência", subtitulo:`Loja 286 · ${fmt(hoje)} · ${rotFiltro}${q.trim() ? ` · busca "${q.trim()}"` : ""}`,
      cards:[{ valor:cont.exp, rotulo:"em experiência" }, { valor:cont.f1, rotulo:"1º período (até 45 d)" }, { valor:cont.f2, rotulo:"2º período (até 90 d)" }, { valor:cont.sem7, rotulo:"vencem em até 7 dias" }, { valor:cont.aniv, rotulo:"aniversariantes do mês" }],
      secoes:[
        { titulo:`Contratos — ${rotFiltro} (${visiveis.length})`, nota:"Contagem: o dia da admissão é o dia 1 (45º dia = admissão + 44; 90º dia = admissão + 89).",
          colunas:["Colaborador","Cargo","Admissão","Término 45 dias","Término 90 dias","Situação"],
          linhas:visiveis.map(l => [l.nome, l.cargo, fmtIso(l.admissao), { t:fmt(l.fim45), b:l.alvo === "45" }, { t:fmt(l.fim90), b:l.alvo === "90" }, { t:sit(l), b:l.emExp && l.dias <= 7, cor:l.emExp && l.dias <= 7 ? "#B71C1C" : undefined }]) },
        { titulo:`Aniversariantes de ${FV_MESES[mes-1]}`, colunas:["Colaborador","Dia","Idade"], linhas:anivs.map(l => [l.nome, `${pad2(l.aniv.dia)}/${pad2(l.aniv.mes)}`, `${l.aniv.idade} anos`]) },
      ] });
  };

  const anivTxt = l => !l.nascimento ? "" : l.aniv && l.aniv.dias === 0 ? `🎂 HOJE · ${fmtIso(l.nascimento)}` : l.aniv && l.aniv.dias <= 7 ? `🎂 em ${l.aniv.dias} d · ${fmtIso(l.nascimento)}` : fmtIso(l.nascimento);
  const th = { padding:"8px 10px", fontSize:11, fontWeight:800, color:"#6B6458", textAlign:"left", background:"#F4F1EA", borderBottom:"2px solid #CFC5B1", whiteSpace:"nowrap", position:"relative" };
  const td = { padding:"8px 10px", fontSize:12.5, color:"#2B2620", borderBottom:"2px solid #D9CFBC", whiteSpace:"nowrap" };
  const chip = (id, label, n) => h("button", { key:id, onClick:()=>setFiltro(id), style:{
      padding:"6px 12px", borderRadius:999, fontSize:12, fontWeight:filtro===id?800:600, cursor:"pointer", whiteSpace:"nowrap",
      border:"2px solid "+(filtro===id?"#2B2620":"#BFB4A0"), background:filtro===id?"#2B2620":"#FFF", color:filtro===id?"#FAF8F4":"#5C5648" } },
    `${label} (${n})`);
  const card = (n, label, cor) => h("div", { style:{ flex:"1 1 120px", background:"#FFF", border:"2px solid #BFB4A0", borderLeft:`5px solid ${cor}`, borderRadius:10, padding:"8px 12px" } },
    h("div", { style:{ fontSize:22, fontWeight:900, color:"#2B2620", lineHeight:1 } }, n),
    h("div", { style:{ fontSize:11, color:"#6B6458", marginTop:3 } }, label));

  return h("div", { style:{ padding:"12px 16px", paddingBottom:60 } },
    h("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:10 } },
      h("div", null,
        h("div", { style:{ fontSize:15, fontWeight:800, color:"#2B2620" } }, "Contratos de experiência"),
        h("div", { style:{ fontSize:11, color:"#8A8478" } }, "Término em 45 e 90 dias, contando o dia da admissão como dia 1")),
      h("div", { style:{ display:"flex", gap:6, flexWrap:"wrap" } },
        h("button", { style:BTN_IMPRIMIR, onClick:imprimirContratos }, "🖨 Imprimir resumo"),
        h("button", { style:{ ...S.addBtn, background:"#FFF", color:"#2B2620", border:"2px solid #BFB4A0" }, onClick:()=>setEdit({}) }, h(Plus,{size:15,strokeWidth:2.4}), h("span",null,"Novo")),
        h("input", { ref:fileRef, type:"file", accept:".csv,text/csv", style:{ display:"none" },
          onChange:e=>{ const f=e.target.files&&e.target.files[0]; if(f) onImportar(f); e.target.value=""; } }),
        h("button", { style:S.addBtn, onClick:()=>fileRef.current&&fileRef.current.click() }, h(FileText,{size:15,strokeWidth:2.2}), h("span",null,"Importar planilha (CSV)")))),

    rh.length === 0
      ? h("div", { style:S.emptyState },
          h(FileText, { size:28, color:"#BDC3C7" }),
          h("p", { style:S.emptyTitle }, "Nenhuma planilha importada"),
          h("p", { style:{ fontSize:12, color:"#8A8478", textAlign:"center", maxWidth:300 } }, "Toque em “Importar planilha (CSV)” e escolha o arquivo de colaboradores ativos (colunas: Matrícula, Nome, Data de admissão, Descrição do cargo, Data de Nascimento)."))
      : h("div", null,
          h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 } },
            card(cont.exp, "Em experiência", "#2E86DE"),
            card(cont.f1, "1º período (até 45 d)", "#F5A300"),
            card(cont.f2, "2º período (até 90 d)", "#8E44AD"),
            card(cont.sem7, "Vencem em até 7 dias", "#D32F2F")),
          h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 } },
            chip("exp", "Em experiência", cont.exp), chip("7d", "Vencem em 7 dias", cont.sem7), chip("aniv", "🎂 Aniversariantes do mês", cont.aniv), chip("todos", "Todos", cont.todos),
            h("div", { style:{ display:"flex", alignItems:"center", gap:6, flex:"1 1 160px", maxWidth:260, background:"#FFF", border:"2px solid #BFB4A0", borderRadius:999, padding:"4px 10px" } },
              h(Search, { size:14, color:"#8A8478", strokeWidth:2.4 }),
              h("input", { type:"search", value:q, placeholder:"Pesquisar", onChange:e=>setQ(e.target.value),
                style:{ flex:1, minWidth:0, border:"none", outline:"none", background:"transparent", fontSize:13, fontFamily:"inherit", color:"#2B2620" } }))),
          mobile
          ? h("div", { style:{ display:"flex", flexDirection:"column", gap:8 } },
              visiveis.length === 0
                ? h("div", { style:{ textAlign:"center", color:"#8A8478", padding:20, fontSize:13 } }, "Nenhum colaborador neste filtro")
                : visiveis.map(l => {
                    const campo = (rot, val, destaque) => h("div", { style:{ minWidth:0, padding:"6px 8px", borderRadius:8, background: typeof destaque === "string" ? destaque : destaque ? corDias(l.dias).bg : "#FAF8F4" } },
                      h("div", { style:{ fontSize:10, color:"#8A8478", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.03em" } }, rot),
                      h("div", { style:{ fontSize:13, color:"#2B2620", fontWeight: destaque ? 900 : 600 } }, val || "—"));
                    return h("div", { key:l.id, style:{ background:"#FFF", border:"2px solid "+(l.aniv && l.aniv.dias===0 ? "#D81B60" : "#BFB4A0"), borderRadius:12, padding:"10px 12px" } },
                      h("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 } },
                        h("div", { style:{ minWidth:0 } },
                          h("div", { style:{ fontSize:14, fontWeight:800, color:"#2B2620", lineHeight:1.2 } }, l.nome),
                          h("div", { style:{ fontSize:11, color:"#8A8478", marginTop:2 } }, `${l.matricula} · ${l.cargo || "—"}`)),
                        h("button", { "aria-label":"Editar "+l.nome, onClick:()=>setEdit(l),
                          style:{ flexShrink:0, width:38, height:38, borderRadius:10, border:"none", background:"#F4F1EA", color:"#5C5648", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" } },
                          h(Pencil, { size:18 }))),
                      h("div", { style:{ margin:"8px 0" } }, situacao(l)),
                      h("div", { style:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 } },
                        campo("Admissão", fmtIso(l.admissao)),
                        campo("Aniversário", anivTxt(l), l.aniv && l.aniv.dias === 0 ? "#FFE3EE" : null),
                        campo("Término 45 dias", fmt(l.fim45), l.alvo === "45"),
                        campo("Término 90 dias", fmt(l.fim90), l.alvo === "90")));
                  }))
          : h("div", { style:{ overflowX:"auto", border:"2px solid #BFB4A0", borderRadius:12, background:"#FFF" } },
            h("table", { style:{ borderCollapse:"separate", borderSpacing:0, width:"100%", minWidth:900 } },
              h("thead", null, h("tr", null,
                ["Matrícula","Nome","Data de admissão","Descrição do cargo","Data de nascimento","Término 45 dias","Término 90 dias","Situação",""].map((t,i) =>
                  h("th", { key:t, style:{ ...th, ...(i===1?{ position:"sticky", left:0, zIndex:2 }:{}) } }, t)))),
              h("tbody", null,
                visiveis.length === 0
                  ? h("tr", null, h("td", { colSpan:9, style:{ ...td, textAlign:"center", color:"#8A8478", padding:"20px" } }, "Nenhum colaborador neste filtro"))
                  : visiveis.map(l => {
                      const dest = k => ({ fontWeight: l.alvo===k?900:500, background: l.alvo===k?(corDias(l.dias).bg):"transparent" });
                      return h("tr", { key:l.id },
                        h("td", { style:{ ...td, color:"#6B6458" } }, l.matricula),
                        h("td", { style:{ ...td, fontWeight:700, position:"sticky", left:0, background:"#FFF", zIndex:1, boxShadow:"2px 0 4px rgba(0,0,0,0.05)" } }, l.nome),
                        h("td", { style:td }, fmtIso(l.admissao)),
                        h("td", { style:td }, l.cargo),
                        h("td", { style:{ ...td, ...(l.aniv && l.aniv.dias===0 ? { background:"#FFE3EE", fontWeight:900, color:"#AD1457" } : {}) } }, anivTxt(l)),
                        h("td", { style:{ ...td, ...dest("45") } }, fmt(l.fim45)),
                        h("td", { style:{ ...td, ...dest("90") } }, fmt(l.fim90)),
                        h("td", { style:td }, situacao(l)),
                        h("td", { style:{ ...td, textAlign:"right" } },
                          h("button", { "aria-label":"Editar "+l.nome, onClick:()=>setEdit(l),
                            style:{ width:34, height:34, borderRadius:9, border:"none", background:"#F4F1EA", color:"#5C5648", cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center" } },
                            h(Pencil, { size:16 }))));
                    }))))
        ),
    edit && h(ContratoModal, { initial: edit, rh, onClose:()=>setEdit(null),
      onSave: async row => { await onSalvar(row); setEdit(null); },
      onDelete: async id => { await onExcluir(id); setEdit(null); } })
  );
}

function ContratoModal({ initial, rh, onClose, onSave, onDelete }) {
  const isEdit = Boolean(initial && initial.id);
  const [nome, setNome] = useState(initial.nome || "");
  const [matricula, setMatricula] = useState(initial.matricula || "");
  const [cargo, setCargo] = useState(initial.cargo || "");
  const [admissao, setAdmissao] = useState(initial.admissao || "");
  const [nascimento, setNascimento] = useState(initial.nascimento || "");
  const [error, setError] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);

  const submit = () => {
    if (!nome.trim()) { setError("Informe o nome."); return; }
    if (!matricula.trim()) { setError("Informe a matrícula."); return; }
    if (!admissao) { setError("Informe a data de admissão."); return; }
    if (!isEdit && rh.some(r => r.id === matricula.trim())) { setError("Já existe um contrato com essa matrícula."); return; }
    onSave({ id: isEdit ? initial.id : matricula.trim(), matricula: matricula.trim(), nome: nome.trim(), cargo: cargo.trim(), admissao, nascimento });
  };

  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:S.modalCard, onClick:e=>e.stopPropagation() },
      h("div", { style:S.modalHeader },
        h("h2", { style:S.modalTitle }, isEdit ? "Editar contrato" : "Novo contrato"),
        h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("div", { style:S.formGroup }, h("label", { style:S.label }, "Nome completo"),
        h("input", { style:S.input, value:nome, onChange:e=>setNome(e.target.value), autoFocus:true })),
      h("div", { style:S.formGroup }, h("label", { style:S.label }, "Matrícula"),
        h("input", { style:{ ...S.input, ...(isEdit?{ background:"#F4F1EA", color:"#8A8478" }:{}) }, value:matricula, disabled:isEdit,
          onChange:e=>setMatricula(e.target.value.replace(/[^0-9]/g,"")), inputMode:"numeric" })),
      h("div", { style:S.formGroup }, h("label", { style:S.label }, "Descrição do cargo"),
        h("input", { style:S.input, value:cargo, onChange:e=>setCargo(e.target.value), placeholder:"Ex.: OPERADOR LOJA" })),
      h("div", { style:{ display:"flex", gap:10, flexWrap:"wrap" } },
        h("div", { style:{ ...S.formGroup, flex:"1 1 140px" } }, h("label", { style:S.label }, "Data de admissão"),
          h("input", { type:"date", style:S.input, value:admissao, onChange:e=>setAdmissao(e.target.value) })),
        h("div", { style:{ ...S.formGroup, flex:"1 1 140px" } }, h("label", { style:S.label }, "Aniversário (nascimento)"),
          h("input", { type:"date", style:S.input, value:nascimento, onChange:e=>setNascimento(e.target.value) }))),
      error && h("p", { style:S.errorText }, error),
      confirmDel
        ? h("div", { style:S.modalActions },
            h("span", { style:{ fontSize:12, color:"#B71C1C", fontWeight:700, flex:1 } }, "Remover da lista de contratos?"),
            h("button", { style:S.btnGhost, onClick:()=>setConfirmDel(false) }, "Não"),
            h("button", { style:S.btnDanger, onClick:()=>onDelete(initial.id) }, "Remover"))
        : h("div", { style:S.modalActions },
            isEdit && h("button", { style:{ ...S.btnGhost, color:"#B71C1C", borderColor:"#E57373" }, onClick:()=>setConfirmDel(true) }, "Excluir"),
            h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"),
            h("button", { style:S.btnPrimary, onClick:submit }, h(Check, { size:15, strokeWidth:2.5 }), "Salvar"))));
}

// ====== FÉRIAS (período aquisitivo → direito → vencimento do período concessivo) ======
const FV_MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const fvParse = iso => { const [y,m,d] = (iso||"").split("-").map(Number); return new Date(y, (m||1)-1, d||1); };
const fvFmt = d => d ? `${pad2(d.getDate())}/${pad2(d.getMonth()+1)}/${d.getFullYear()}` : "";
const fvDif = (a, b) => Math.round((a - b) / 86400000);
function fvAddAnos(d, n) { const r = new Date(d.getFullYear()+n, d.getMonth(), d.getDate()); if (r.getMonth() !== d.getMonth()) r.setDate(0); return r; }
// n-ésimo período: aquisitivo = 12 meses de trabalho; direito = dia seguinte; vencimento = último dia do período concessivo (mais 12 meses)
function periodoFerias(adm, n) {
  return { n, aqIni: fvAddAnos(adm, n-1), aqFim: addDays(fvAddAnos(adm, n), -1), direito: fvAddAnos(adm, n), venc: addDays(fvAddAnos(adm, n+1), -1) };
}

function TelaFerias({ rh, ferias, onSalvar, onExcluir, onQuitar }) {
  const hoje = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mesSel, setMesSel] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [q, setQ] = useState("");
  const [limite, setLimite] = useState(() => LC.get("feriasLimite", 3));
  const [modal, setModal] = useState(null);
  const [quitar, setQuitar] = useState(null);
  const [mobile, setMobile] = useState(() => window.innerWidth < 720);
  useEffect(() => { const f = () => setMobile(window.innerWidth < 720); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, []);
  const norm = t => (t||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

  const lista = ferias || [];
  const comDatas = useMemo(() => lista.filter(f => f.inicio && f.fim), [lista]);
  const porMat = useMemo(() => { const o = {}; lista.forEach(f => { (o[f.matricula] = o[f.matricula] || []).push(f); }); return o; }, [lista]);
  const diasPeriodo = (mat, n) => (porMat[mat] || []).filter(f => f.periodo === n).reduce((s, f) => s + (f.dias || 0), 0);

  const linhas = useMemo(() => (rh || []).filter(r => r.admissao).map(r => {
    const adm = fvParse(r.admissao);
    let n = 1; while (n < 60 && diasPeriodo(r.matricula, n) >= 30) n++;
    const p = periodoFerias(adm, n);
    const dVenc = fvDif(p.venc, hoje), dDireito = fvDif(p.direito, hoje);
    const docs = (porMat[r.matricula] || []).slice().sort((a, b) => (a.inicio || "").localeCompare(b.inicio || ""));
    const agDias = docs.filter(f => f.periodo === n && f.inicio).reduce((s, f) => s + (f.dias || 0), 0);
    const quitados = docs.filter(f => f.quitado).map(f => f.periodo).sort((a, b) => a - b);
    const passados = (() => { let k = 0; while (k < 60 && fvDif(periodoFerias(adm, k+1).direito, hoje) <= 0) k++; return k; })();
    let st;
    if (dDireito > 0)      st = { k:"aquisicao", t:`Em aquisição · direito em ${fvFmt(p.direito)}`, bg:"#E3F0FB", fg:"#0D47A1", bd:"#90CAF9" };
    else if (dVenc < 0)    st = { k:"vencida",   t:`VENCIDAS há ${-dVenc} d`, bg:"#FDECEA", fg:"#B71C1C", bd:"#E57373" };
    else if (dVenc <= 90)  st = { k:"vence",     t:`Vence em ${dVenc} d`, bg: dVenc <= 30 ? "#FDECEA" : "#FFF3CD", fg: dVenc <= 30 ? "#B71C1C" : "#7A5200", bd: dVenc <= 30 ? "#E57373" : "#F5A300" };
    else                   st = { k:"ok",        t:`No prazo · ${dVenc} d`, bg:"#E3F4EA", fg:"#0F5A34", bd:"#7CC79B" };
    return { ...r, adm, n, p, dVenc, st, docs, agDias, quitados, passados, nome: r.nome };
  }), [rh, porMat, hoje]);

  const cont = {
    venc: linhas.filter(l => l.st.k === "vencida").length,
    prox: linhas.filter(l => l.st.k === "vence").length,
    sem: linhas.filter(l => l.st.k !== "aquisicao" && l.agDias === 0).length,
    ag: linhas.filter(l => l.agDias > 0).length,
  };

  const visiveis = useMemo(() => {
    const t = norm(q.trim());
    let l = linhas.filter(x => filtro === "todos" ? true : filtro === "venc" ? (x.st.k === "vencida" || x.st.k === "vence") : filtro === "sem" ? (x.st.k !== "aquisicao" && x.agDias === 0) : x.agDias > 0);
    if (t) l = l.filter(x => norm(x.nome).includes(t) || norm(x.matricula).includes(t));
    return l.sort((a, b) => a.dVenc - b.dVenc || a.nome.localeCompare(b.nome, "pt-BR"));
  }, [linhas, filtro, q]);

  // calendário anual: dia → conjunto de operadores de férias
  const heat = useMemo(() => {
    const m = {};
    comDatas.forEach(f => {
      let d = fvParse(f.inicio); const fim = fvParse(f.fim);
      if (fvDif(fim, d) > 400) return;
      while (d <= fim) { if (d.getFullYear() === ano) { const k = isoDate(d); (m[k] = m[k] || new Set()).add(f.matricula); } d = addDays(d, 1); }
    });
    return m;
  }, [comDatas, ano]);

  const meses = useMemo(() => FV_MESES.map((nome, i) => {
    const nDias = new Date(ano, i+1, 0).getDate(), set = new Set(); let pico = 0, picoDia = null;
    for (let d = 1; d <= nDias; d++) {
      const s = heat[`${ano}-${pad2(i+1)}-${pad2(d)}`];
      if (s) { s.forEach(x => set.add(x)); if (s.size > pico) { pico = s.size; picoDia = d; } }
    }
    return { i, nome, nDias, total: set.size, pico, picoDia, offset: new Date(ano, i, 1).getDay() };
  }), [heat, ano]);

  const corDia = n => n === 0 ? "#F4F1EA" : n > limite ? "#D32F2F" : n === 1 ? "#BBDEFB" : n === 2 ? "#64B5F6" : n === 3 ? "#1E88E5" : "#0D47A1";
  const nomeDe = mat => { const r = (rh || []).find(x => x.matricula === mat); return r ? r.nome : mat; };
  const curto = n => { const p = (n||"").trim().split(/\s+/); const c = x => x.charAt(0).toUpperCase()+x.slice(1).toLowerCase(); return p.length <= 2 ? p.map(c).join(" ") : c(p[0])+" "+c(p[p.length-1]); };

  const doMes = mesSel === null ? [] : comDatas.filter(f => {
    const ini = fvParse(f.inicio), fim = fvParse(f.fim), a = new Date(ano, mesSel, 1), b = new Date(ano, mesSel+1, 0);
    return ini <= b && fim >= a;
  }).sort((a, b) => a.inicio.localeCompare(b.inicio));

  const chip = (id, label, n) => h("button", { key:id, onClick:()=>setFiltro(id), style:{ padding:"6px 12px", borderRadius:999, fontSize:12, fontWeight:filtro===id?800:600, cursor:"pointer", whiteSpace:"nowrap",
      border:"2px solid "+(filtro===id?"#2B2620":"#BFB4A0"), background:filtro===id?"#2B2620":"#FFF", color:filtro===id?"#FAF8F4":"#5C5648" } }, `${label} (${n})`);
  const card = (n, label, cor) => h("div", { style:{ flex:"1 1 120px", background:"#FFF", border:"2px solid #BFB4A0", borderLeft:`5px solid ${cor}`, borderRadius:10, padding:"8px 12px" } },
    h("div", { style:{ fontSize:22, fontWeight:900, color:"#2B2620", lineHeight:1 } }, n),
    h("div", { style:{ fontSize:11, color:"#6B6458", marginTop:3 } }, label));
  const badge = st => h("span", { style:{ background:st.bg, color:st.fg, border:`1.5px solid ${st.bd}`, borderRadius:8, padding:"3px 8px", fontSize:11, fontWeight:800, whiteSpace:"nowrap" } }, st.t);
  const chipFerias = (l, f) => h("button", { key:f.id, onClick:()=>setModal({ l, f }),
    style:{ border:"1.5px solid #90CAF9", background:"#E3F0FB", color:"#0D47A1", borderRadius:8, padding:"2px 7px", fontSize:11, fontWeight:700, cursor:"pointer", marginRight:4, marginBottom:3, whiteSpace:"nowrap" } },
    f.quitado ? `Período ${f.periodo} · já gozado` : `${fvFmt(fvParse(f.inicio))} → ${fvFmt(fvParse(f.fim))} (${f.dias} d)`);
  const acoes = l => h("div", { style:{ display:"flex", gap:6, flexWrap:"wrap" } },
    h("button", { onClick:()=>setModal({ l }), style:{ padding:"6px 10px", borderRadius:8, border:"none", background:"#2B2620", color:"#FAF8F4", fontSize:12, fontWeight:800, cursor:"pointer" } }, "Agendar"),
    l.passados > 0 && h("button", { onClick:()=>setQuitar(l), style:{ padding:"6px 10px", borderRadius:8, border:"2px solid #BFB4A0", background:"#FFF", color:"#5C5648", fontSize:12, fontWeight:700, cursor:"pointer" } }, "Já gozadas"));

  const imprimirFerias = () => {
    const venc = linhas.filter(l => l.st.k === "vencida" || l.st.k === "vence").sort((a, b) => a.dVenc - b.dVenc);
    const doAno = comDatas.filter(f => fvParse(f.inicio).getFullYear() === ano || fvParse(f.fim).getFullYear() === ano).sort((a, b) => a.inicio.localeCompare(b.inicio));
    imprimirResumo({ titulo:"Resumo de férias", subtitulo:`Loja 286 · ${fvFmt(hoje)} · calendário de ${ano} · limite de ${limite} operadores simultâneos`,
      cards:[{ valor:cont.venc, rotulo:"férias vencidas" }, { valor:cont.prox, rotulo:"vencem em até 90 dias" }, { valor:cont.sem, rotulo:"com direito, sem agendamento" }, { valor:cont.ag, rotulo:"com férias agendadas" }],
      secoes:[
        { titulo:"Férias vencidas e vencendo em até 90 dias", nota:"Vencimento = último dia do período concessivo (12 meses após o direito).",
          colunas:["Colaborador","Admissão","Período aquisitivo","Vencimento","Situação","Agendado"],
          linhas:venc.map(l => [l.nome, fvFmt(l.adm), `${fvFmt(l.p.aqIni)} a ${fvFmt(l.p.aqFim)}`, { t:fvFmt(l.p.venc), b:true }, { t:l.st.t, b:true, cor:l.st.k === "vencida" || l.dVenc <= 30 ? "#B71C1C" : "#7A5200" }, `${l.agDias} de 30 d`]) },
        { titulo:`Operadores de férias por mês — ${ano}`, colunas:["Mês","Operadores","Pico simultâneo"],
          linhas:meses.map(m => [m.nome, m.total || "—", m.pico ? { t:`${m.pico} (dia ${m.picoDia})`, b:m.pico > limite, cor:m.pico > limite ? "#B71C1C" : undefined } : "—"]) },
        { titulo:`Férias agendadas — ${ano} (${doAno.length})`, colunas:["Colaborador","Início","Fim","Dias","Período"],
          linhas:doAno.map(f => [nomeDe(f.matricula), fvFmt(fvParse(f.inicio)), fvFmt(fvParse(f.fim)), f.dias, `Período ${f.periodo}`]) },
      ] });
  };

  const th = { padding:"8px 10px", fontSize:11, fontWeight:800, color:"#6B6458", textAlign:"left", background:"#F4F1EA", borderBottom:"2px solid #BFB4A0", whiteSpace:"nowrap" };
  const td = { padding:"8px 10px", fontSize:12.5, color:"#2B2620", borderBottom:"2px solid #D9CFBC", verticalAlign:"top" };

  return h("div", { style:{ padding:"12px 16px", paddingBottom:60 } },
    h("div", { style:{ marginBottom:10 } },
      h("div", { style:{ fontSize:15, fontWeight:800, color:"#2B2620" } }, "Férias"),
      h("div", { style:{ fontSize:11, color:"#8A8478" } }, "Datas calculadas pela admissão (aba Contratos): 12 meses de trabalho dão direito a 30 dias, e as férias precisam ser gozadas nos 12 meses seguintes."),
      h("button", { style:{ ...BTN_IMPRIMIR, marginTop:8 }, onClick:imprimirFerias }, "🖨 Imprimir resumo")),

    (rh || []).length === 0
      ? h("div", { style:S.emptyState }, h("p", { style:S.emptyTitle }, "Nenhum colaborador na aba Contratos"), h("p", { style:{ fontSize:12, color:"#8A8478", textAlign:"center", maxWidth:300 } }, "Importe a planilha na aba Contratos para calcular os vencimentos de férias."))
      : h("div", null,
          h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 } },
            card(cont.venc, "Férias vencidas", "#D32F2F"), card(cont.prox, "Vencem em até 90 dias", "#F5A300"),
            card(cont.sem, "Com direito, sem agendamento", "#2E86DE"), card(cont.ag, "Com férias agendadas", "#2E9E5B")),

          // Calendário anual
          h("div", { style:{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap", marginBottom:8 } },
            h("div", { style:{ display:"flex", alignItems:"center", gap:6 } },
              h("button", { "aria-label":"Ano anterior", onClick:()=>{ setAno(ano-1); setMesSel(null); }, style:{ width:34, height:34, borderRadius:9, border:"2px solid #BFB4A0", background:"#FFF", fontSize:16, fontWeight:900, cursor:"pointer" } }, "‹"),
              h("span", { style:{ fontSize:17, fontWeight:900, color:"#2B2620", minWidth:56, textAlign:"center" } }, ano),
              h("button", { "aria-label":"Próximo ano", onClick:()=>{ setAno(ano+1); setMesSel(null); }, style:{ width:34, height:34, borderRadius:9, border:"2px solid #BFB4A0", background:"#FFF", fontSize:16, fontWeight:900, cursor:"pointer" } }, "›")),
            h("label", { style:{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#5C5648", fontWeight:700 } }, "Máx. de operadores de férias ao mesmo tempo",
              h("input", { type:"number", min:1, max:30, value:limite, style:{ width:56, padding:"5px 6px", borderRadius:8, border:"2px solid #BFB4A0", fontSize:14, fontWeight:800, textAlign:"center", fontFamily:"inherit" },
                onChange:e=>{ const v = Math.max(1, Math.min(30, parseInt(e.target.value||"1", 10) || 1)); setLimite(v); LC.set("feriasLimite", v); } }))),

          h("div", { style:{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(150px, 1fr))", gap:8, marginBottom:8 } },
            meses.map(m => h("button", { key:m.i, onClick:()=>setMesSel(mesSel === m.i ? null : m.i), style:{
                textAlign:"left", cursor:"pointer", background:"#FFF", padding:"8px 8px 6px", borderRadius:12, fontFamily:"inherit",
                border:"2px solid "+(m.pico > limite ? "#D32F2F" : mesSel === m.i ? "#2B2620" : "#BFB4A0"), boxShadow: mesSel === m.i ? "0 0 0 2px #2B2620" : "none" } },
              h("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"baseline" } },
                h("span", { style:{ fontSize:12.5, fontWeight:800, color:"#2B2620" } }, m.nome),
                h("span", { style:{ fontSize:18, fontWeight:900, color:m.total ? (m.pico > limite ? "#B71C1C" : "#0D47A1") : "#BDB6A8", lineHeight:1 } }, m.total)),
              h("div", { style:{ fontSize:10, color:"#8A8478", marginBottom:4 } }, m.total === 0 ? "ninguém de férias" : `${m.total} operador${m.total > 1 ? "es" : ""} · pico ${m.pico} (dia ${m.picoDia})`),
              h("div", { style:{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:1.5 } },
                Array.from({ length:m.offset }, (_, k) => h("span", { key:"o"+k })),
                Array.from({ length:m.nDias }, (_, k) => { const d = k+1, n = (heat[`${ano}-${pad2(m.i+1)}-${pad2(d)}`] || { size:0 }).size;
                  return h("span", { key:d, style:{ fontSize:7.5, lineHeight:"12px", textAlign:"center", borderRadius:2, background:corDia(n), color:n >= 3 || n > limite ? "#FFF" : "#6B6458", fontWeight:n ? 800 : 500 } }, d); })))))
          ,
          h("div", { style:{ display:"flex", gap:10, flexWrap:"wrap", fontSize:10.5, color:"#6B6458", marginBottom:10, alignItems:"center" } },
            "Operadores no dia:",
            [[0,"0"],[1,"1"],[2,"2"],[3,"3"],[4,"4+"]].map(([n, t]) => h("span", { key:n, style:{ display:"inline-flex", alignItems:"center", gap:4 } }, h("span", { style:{ width:12, height:12, borderRadius:3, background:corDia(n), border:"1px solid #D9CFBC", display:"inline-block" } }), t)),
            h("span", { style:{ display:"inline-flex", alignItems:"center", gap:4 } }, h("span", { style:{ width:12, height:12, borderRadius:3, background:"#D32F2F", display:"inline-block" } }), `acima do limite (${limite})`)),

          mesSel !== null && h("div", { style:{ background:"#FFF", border:"2px solid #2B2620", borderRadius:12, padding:"10px 12px", marginBottom:12 } },
            h("div", { style:{ fontSize:13, fontWeight:800, marginBottom:6 } }, `${FV_MESES[mesSel]} de ${ano} — ${doMes.length === 0 ? "nenhuma férias" : doMes.length + " agendamento" + (doMes.length > 1 ? "s" : "")}`),
            doMes.map(f => { const l = linhas.find(x => x.matricula === f.matricula);
              return h("div", { key:f.id, style:{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, padding:"6px 0", borderTop:"1.5px solid #E3DBCB" } },
                h("div", { style:{ minWidth:0 } }, h("div", { style:{ fontSize:13, fontWeight:700 } }, curto(nomeDe(f.matricula))), h("div", { style:{ fontSize:11.5, color:"#6B6458" } }, `${fvFmt(fvParse(f.inicio))} → ${fvFmt(fvParse(f.fim))} · ${f.dias} dias`)),
                l && h("button", { onClick:()=>setModal({ l, f }), "aria-label":"Editar férias", style:{ width:34, height:34, borderRadius:9, border:"none", background:"#F4F1EA", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" } }, h(Pencil, { size:16 }))); })),

          // Lista de operadores
          h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 } },
            chip("todos", "Todos", linhas.length), chip("venc", "Vencidas / vencendo", cont.venc + cont.prox), chip("sem", "Sem agendamento", cont.sem), chip("ag", "Agendados", cont.ag),
            h("div", { style:{ display:"flex", alignItems:"center", gap:6, flex:"1 1 160px", maxWidth:260, background:"#FFF", border:"2px solid #BFB4A0", borderRadius:999, padding:"4px 10px" } },
              h(Search, { size:14, color:"#8A8478", strokeWidth:2.4 }),
              h("input", { type:"search", value:q, placeholder:"Pesquisar", onChange:e=>setQ(e.target.value), style:{ flex:1, minWidth:0, border:"none", outline:"none", background:"transparent", fontSize:13, fontFamily:"inherit", color:"#2B2620" } }))),

          mobile
            ? h("div", { style:{ display:"flex", flexDirection:"column", gap:8 } },
                visiveis.length === 0 ? h("div", { style:{ textAlign:"center", color:"#8A8478", padding:20, fontSize:13 } }, "Nenhum colaborador neste filtro")
                : visiveis.map(l => h("div", { key:l.id, style:{ background:"#FFF", border:"2px solid #BFB4A0", borderRadius:12, padding:"10px 12px" } },
                    h("div", { style:{ fontSize:14, fontWeight:800, color:"#2B2620", lineHeight:1.2 } }, l.nome),
                    h("div", { style:{ fontSize:11, color:"#8A8478", marginTop:2 } }, `${l.matricula} · admissão ${fvFmt(l.adm)}`),
                    h("div", { style:{ margin:"8px 0" } }, badge(l.st)),
                    h("div", { style:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:8 } },
                      [["Período aquisitivo", `${fvFmt(l.p.aqIni)} – ${fvFmt(l.p.aqFim)}`], ["Direito a partir de", fvFmt(l.p.direito)], ["Vencimento", fvFmt(l.p.venc)], ["Agendado", `${l.agDias} de 30 dias`]].map(([r, v]) =>
                        h("div", { key:r, style:{ padding:"6px 8px", borderRadius:8, background:"#FAF8F4" } }, h("div", { style:{ fontSize:10, color:"#8A8478", fontWeight:700, textTransform:"uppercase" } }, r), h("div", { style:{ fontSize:12.5, fontWeight:700 } }, v)))),
                    l.docs.length > 0 && h("div", { style:{ marginBottom:6 } }, l.docs.map(f => chipFerias(l, f))),
                    acoes(l))))
            : h("div", { style:{ overflowX:"auto", border:"2px solid #BFB4A0", borderRadius:12, background:"#FFF" } },
                h("table", { style:{ borderCollapse:"separate", borderSpacing:0, width:"100%", minWidth:980 } },
                  h("thead", null, h("tr", null, ["Matrícula","Nome","Admissão","Período aquisitivo","Direito a partir de","Vencimento","Situação","Agendado",""].map(t => h("th", { key:t, style:th }, t)))),
                  h("tbody", null, visiveis.length === 0 ? h("tr", null, h("td", { colSpan:9, style:{ ...td, textAlign:"center", color:"#8A8478", padding:20 } }, "Nenhum colaborador neste filtro"))
                    : visiveis.map(l => h("tr", { key:l.id },
                        h("td", { style:{ ...td, color:"#6B6458" } }, l.matricula),
                        h("td", { style:{ ...td, fontWeight:700 } }, l.nome),
                        h("td", { style:td }, fvFmt(l.adm)),
                        h("td", { style:{ ...td, whiteSpace:"nowrap" } }, `${fvFmt(l.p.aqIni)} – ${fvFmt(l.p.aqFim)}`),
                        h("td", { style:td }, fvFmt(l.p.direito)),
                        h("td", { style:{ ...td, fontWeight:800 } }, fvFmt(l.p.venc)),
                        h("td", { style:td }, badge(l.st)),
                        h("td", { style:td }, h("div", { style:{ fontSize:11, color:"#6B6458", marginBottom:3 } }, `${l.agDias} de 30 dias`), l.docs.map(f => chipFerias(l, f))),
                        h("td", { style:td }, acoes(l)))))))),

    modal && h(FeriasModal, { l:modal.l, f:modal.f, comDatas, limite, nomeDe, onClose:()=>setModal(null),
      onSave: async d => { await onSalvar(d); setModal(null); }, onDelete: async id => { await onExcluir(id); setModal(null); } }),
    quitar && h(QuitarFeriasModal, { l:quitar, onClose:()=>setQuitar(null), onConfirm: async k => { await onQuitar(quitar, k); setQuitar(null); } })
  );
}

function FeriasModal({ l, f, comDatas, limite, nomeDe, onClose, onSave, onDelete }) {
  const isEdit = Boolean(f);
  const [periodo, setPeriodo] = useState(f ? f.periodo : l.n);
  const [inicio, setInicio] = useState(f ? f.inicio : "");
  const [dias, setDias] = useState(f ? f.dias : 30);
  const [error, setError] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);
  const opcoes = []; for (let n = 1; n <= Math.max(l.n, f ? f.periodo : 1) + 1; n++) opcoes.push(n);
  const p = periodoFerias(l.adm, periodo);
  const fim = inicio && dias >= 1 ? isoDate(addDays(fvParse(inicio), dias - 1)) : "";
  // conflito com outros operadores
  const pico = useMemo(() => {
    if (!inicio || !fim) return 0;
    const outros = comDatas.filter(x => x.matricula !== l.matricula && x.id !== (f && f.id));
    let d = fvParse(inicio), max = 0; const ate = fvParse(fim);
    while (d <= ate) { const iso = isoDate(d); const s = new Set(); outros.forEach(x => { if (x.inicio <= iso && x.fim >= iso) s.add(x.matricula); }); max = Math.max(max, s.size); d = addDays(d, 1); }
    return max;
  }, [inicio, fim, comDatas]);
  const jaNoPeriodo = comDatas.concat([]).filter(x => x.matricula === l.matricula && x.periodo === periodo && x.id !== (f && f.id)).reduce((s, x) => s + (x.dias || 0), 0);

  const submit = () => {
    if (!inicio) { setError("Informe a data de início."); return; }
    if (!(dias >= 5 && dias <= 30)) { setError("Os dias devem ficar entre 5 e 30."); return; }
    if (jaNoPeriodo + dias > 30) { setError(`Esse período já tem ${jaNoPeriodo} dias agendados; o total não pode passar de 30.`); return; }
    onSave({ id: f ? f.id : `fe${Date.now()}`, matricula: l.matricula, nome: l.nome, periodo, inicio, fim, dias });
  };

  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:S.modalCard, onClick:e=>e.stopPropagation() },
      h("div", { style:S.modalHeader }, h("h2", { style:S.modalTitle }, isEdit ? "Editar férias" : "Agendar férias"), h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("p", { style:{ fontSize:13, fontWeight:800, margin:"0 0 2px" } }, l.nome),
      h("p", { style:{ fontSize:11.5, color:"#6B6458", margin:"0 0 10px" } }, `Admissão ${fvFmt(l.adm)} · vencimento do período ${periodo}: ${fvFmt(p.venc)}`),
      h("div", { style:S.formGroup }, h("label", { style:S.label }, "Período aquisitivo"),
        h("select", { style:S.input, value:periodo, onChange:e=>setPeriodo(parseInt(e.target.value, 10)) },
          opcoes.map(n => { const pp = periodoFerias(l.adm, n); return h("option", { key:n, value:n }, `Período ${n} · ${fvFmt(pp.aqIni)} a ${fvFmt(pp.aqFim)}`); }))),
      h("div", { style:{ display:"flex", gap:10, flexWrap:"wrap" } },
        h("div", { style:{ ...S.formGroup, flex:"1 1 150px" } }, h("label", { style:S.label }, "Início das férias"), h("input", { type:"date", style:S.input, value:inicio, onChange:e=>setInicio(e.target.value) })),
        h("div", { style:{ ...S.formGroup, flex:"1 1 110px" } }, h("label", { style:S.label }, "Dias"), h("input", { type:"number", min:5, max:30, style:S.input, value:dias, onChange:e=>setDias(parseInt(e.target.value || "0", 10) || 0) }))),
      h("div", { style:{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 } },
        [30, 20, 15, 10, 5].map(n => h("button", { key:n, onClick:()=>setDias(n), style:{ padding:"5px 10px", borderRadius:999, border:"2px solid "+(dias === n ? "#2B2620" : "#BFB4A0"), background:dias === n ? "#2B2620" : "#FFF", color:dias === n ? "#FAF8F4" : "#5C5648", fontSize:12, fontWeight:700, cursor:"pointer" } }, `${n} dias`))),
      fim && h("p", { style:{ fontSize:12.5, margin:"4px 0", fontWeight:700 } }, `Retorno ao trabalho: ${fvFmt(addDays(fvParse(fim), 1))} · último dia de férias: ${fvFmt(fvParse(fim))}`),
      fim && fvParse(fim) > p.venc && h("p", { style:{ fontSize:12, color:"#B71C1C", fontWeight:700, margin:"4px 0" } }, "⚠ Termina depois do vencimento do período (pagamento em dobro)."),
      fim && h("p", { style:{ fontSize:12, fontWeight:700, margin:"4px 0", color:pico + 1 > limite ? "#B71C1C" : "#0F5A34" } },
        pico === 0 ? "✓ Ninguém mais de férias nessas datas." : `${pico + 1 > limite ? "⚠" : "✓"} Com este agendamento, até ${pico + 1} operadores de férias ao mesmo tempo (limite ${limite}).`),
      h("p", { style:{ fontSize:11, color:"#8A8478", margin:"6px 0" } }, "As férias podem ser divididas em até 3 períodos (um com pelo menos 14 dias e os outros com pelo menos 5 dias)."),
      error && h("p", { style:S.errorText }, error),
      confirmDel
        ? h("div", { style:S.modalActions }, h("span", { style:{ fontSize:12, color:"#B71C1C", fontWeight:700, flex:1 } }, "Excluir este agendamento?"),
            h("button", { style:S.btnGhost, onClick:()=>setConfirmDel(false) }, "Não"), h("button", { style:S.btnDanger, onClick:()=>onDelete(f.id) }, "Excluir"))
        : h("div", { style:S.modalActions },
            isEdit && h("button", { style:{ ...S.btnGhost, color:"#B71C1C", borderColor:"#E57373" }, onClick:()=>setConfirmDel(true) }, "Excluir"),
            h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"),
            h("button", { style:S.btnPrimary, onClick:submit }, h(Check, { size:15, strokeWidth:2.5 }), "Salvar"))));
}

function QuitarFeriasModal({ l, onClose, onConfirm }) {
  const [k, setK] = useState(l.passados);
  const opc = []; for (let n = 1; n <= l.passados; n++) opc.push(n);
  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:S.modalCard, onClick:e=>e.stopPropagation() },
      h("div", { style:S.modalHeader }, h("h2", { style:S.modalTitle }, "Férias já gozadas"), h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("p", { style:{ fontSize:13, fontWeight:800, margin:"0 0 6px" } }, l.nome),
      h("p", { style:{ fontSize:12, color:"#6B6458", margin:"0 0 10px", lineHeight:1.4 } }, "Use para o histórico: marca períodos anteriores como já gozados, sem datas, para o vencimento passar para o período seguinte."),
      h("div", { style:S.formGroup }, h("label", { style:S.label }, "Marcar como gozados os períodos até o nº"),
        h("select", { style:S.input, value:k, onChange:e=>setK(parseInt(e.target.value, 10)) },
          opc.map(n => { const pp = periodoFerias(l.adm, n); return h("option", { key:n, value:n }, `Período ${n} (${fvFmt(pp.aqIni)} a ${fvFmt(pp.aqFim)})`); }))),
      h("div", { style:S.modalActions },
        h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"),
        h("button", { style:S.btnPrimary, onClick:()=>onConfirm(k) }, h(Check, { size:15, strokeWidth:2.5 }), "Confirmar"))));
}

// ====== HORÁRIO PADRÃO DE ALMOÇO ======
// Quadro "Horário de almoço" (nomes como aparecem no quadro; o app procura o colaborador correspondente)
const QUADRO_ALMOCO = [
  ["11:00", ["PRISCILA", "ALEXSANDRA", "CLAUDIA REGINA", "DAYENE", "FERNANDA", "FRANCICLEIDE", "KAMILI", "ALFREDO NASCIMENTO", "EDVALDO", "DAMIANA"]],
  ["12:00", ["LIZANDRA ARAUJO", "JOSELITO", "BRUNA", "ANA BEATRIZ", "DEIVISON VIEIRA", "VICTORIA", "BEATRIZ", "ANDRESSA", "DANILLO"]],
  ["13:00", ["MARIA EDUARDA", "NATANIEL SOUSA", "TAMIRIS NICACIO", "CAMILA", "WILLIANE", "ROSICLEIA", "DANIELE", "LAIZ INDIRA", "BRUNO"]],
  ["14:00", ["MATHEUS LUIZ", "GABRIEL MARTINS", "TALIA MESQUITA", "RAQUEL", "SUELEN", "SULAMITA", "TAISSA FERREIRA", "YURI"]],
  ["16:00", ["ALESSANDRA", "LEONARDO", "ROMULO DAVID", "JULIELEN", "JULIANA FREITAS", "NATALIA", "SARAH", "ADRYELE", "ANA PAULA", "RAYANNE"]],
  ["17:00", ["MARCELO DA SILVA", "THAINA", "ELISANGELA", "LILIAN", "SANDRO", "VICTOR", "JULIA LIMA", "MARIANE", "KELLY"]],
  ["18:00", ["JESSICA", "MATHEUS CHEREM", "JONAS", "GUILHERME", "JUAN", "YANNY", "KAIKY", "CARLA CAROLINE", "WESLEY"]],
];

function distLev(a, b) {
  const d = Array.from({ length:b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j-1] + 1, p + (a[i-1] !== b[j-1] ? 1 : 0)); p = t; } }
  return d[b.length];
}
// exatos; se não houver, nomes parecidos (1 letra de diferença, só para nomes com 6+ letras) marcados com .aprox
function candidatosAlmoco(chave, colaboradores) {
  const nz = t => (t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  const k = nz(chave), ord = (a, b) => a.nome.localeCompare(b.nome, "pt-BR");
  const exatos = colaboradores.filter(c => { const n = nz(c.nome); return k.length === 1 ? n[0] === k[0] : k.every(t => n.includes(t)); }).sort(ord);
  if (exatos.length > 0 || k.length !== 1 || k[0].length < 6) return exatos;
  const p = colaboradores.filter(c => distLev(nz(c.nome)[0] || "", k[0]) <= 1).sort(ord);
  p.aprox = true; return p;
}

function ImportAlmocoModal({ colaboradores, onClose, onConfirm }) {
  const todos = useMemo(() => colaboradores.slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")), [colaboradores]);
  const entradas = useMemo(() => QUADRO_ALMOCO.flatMap(([hora, nomes]) => nomes.map(n => ({ chave:n, hora, cands:candidatosAlmoco(n, colaboradores) }))), [colaboradores]);
  const [esc, setEsc] = useState(() => { const o = {}; entradas.forEach((e, i) => { if (e.cands.length === 1 && !e.cands.aprox) o[i] = e.cands[0].id; }); return o; });
  const nomeDe = id => (colaboradores.find(c => c.id === id) || {}).nome || "";
  const usados = {}; Object.keys(esc).forEach(i => { if (esc[i]) usados[esc[i]] = (usados[esc[i]] || 0) + 1; });
  const duplicados = Object.keys(usados).filter(id => usados[id] > 1);
  const aplicar = Object.keys(esc).filter(i => esc[i]).length;
  const idx = entradas.map((e, i) => i);
  const precisa = idx.filter(i => entradas[i].cands.length !== 1 || entradas[i].cands.aprox);
  const ok = idx.filter(i => entradas[i].cands.length === 1 && !entradas[i].cands.aprox);
  const linha = i => {
    const e = entradas[i]; const aprox = Boolean(e.cands.aprox); const opcoes = e.cands.length > 0 && !aprox ? e.cands : todos;
    return h("div", { key:i, style:{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderTop:"1.5px solid #E3DBCB", flexWrap:"wrap" } },
      h("div", { style:{ flex:"1 1 130px", minWidth:0 } },
        h("div", { style:{ fontSize:12.5, fontWeight:800 } }, e.chave),
        h("div", { style:{ fontSize:11, color: e.cands.length === 0 ? "#B71C1C" : e.cands.length > 1 ? "#7A5200" : "#0F5A34", fontWeight:700 } },
          `🍽 ${e.hora} · ${e.cands.length === 0 ? "não encontrado" : aprox ? "nome parecido: confira" : e.cands.length > 1 ? e.cands.length + " possíveis" : "encontrado"}`)),
      h("select", { value:esc[i] || "", onChange:ev => setEsc({ ...esc, [i]: ev.target.value }),
        style:{ ...S.input, flex:"1 1 170px", minWidth:0, padding:"6px 8px", fontSize:13, border:"2px solid "+(duplicados.includes(esc[i]) ? "#D32F2F" : "#BFB4A0") } },
        h("option", { value:"" }, "— não aplicar —"),
        aprox ? [h("optgroup", { key:"p", label:"Parecidos" }, e.cands.map(c => h("option", { key:"p"+c.id, value:c.id }, c.nome))), h("optgroup", { key:"t", label:"Todos" }, todos.map(c => h("option", { key:c.id, value:c.id }, c.nome)))]
        : opcoes.map(c => h("option", { key:c.id, value:c.id }, c.nome + (c.horarioAlmoco && c.horarioAlmoco !== e.hora ? ` (atual ${c.horarioAlmoco})` : "")))));
  };
  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:{ ...S.modalCard, maxWidth:560 }, onClick:e => e.stopPropagation() },
      h("div", { style:S.modalHeader }, h("h2", { style:S.modalTitle }, "Quadro de horários de almoço"), h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("p", { style:{ fontSize:12, color:"#6B6458", margin:"0 0 8px", lineHeight:1.4 } }, `O quadro tem ${entradas.length} nomes. Confira, escolha o colaborador correto onde houver dúvida e aplique. Quem ficar como "não aplicar" não muda.`),
      precisa.length > 0 && h("div", { style:{ marginBottom:8 } }, h("div", { style:{ fontSize:12, fontWeight:900, color:"#7A5200", marginBottom:2 } }, `Precisam de escolha (${precisa.length})`), precisa.map(linha)),
      h("div", null, h("div", { style:{ fontSize:12, fontWeight:900, color:"#0F5A34", marginBottom:2 } }, `Encontrados (${ok.length})`), ok.map(linha)),
      duplicados.length > 0 && h("p", { style:S.errorText }, `Há ${duplicados.length} colaborador(es) escolhido(s) em mais de uma linha (em vermelho). Ajuste antes de aplicar.`),
      h("div", { style:S.modalActions },
        h("span", { style:{ fontSize:12, color:"#6B6458", flex:1 } }, `${aplicar} a aplicar`),
        h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"),
        h("button", { style:{ ...S.btnPrimary, opacity: aplicar && !duplicados.length ? 1 : 0.5 }, disabled:!aplicar || duplicados.length > 0,
          onClick:() => onConfirm(Object.keys(esc).filter(i => esc[i]).map(i => ({ id:esc[i], hora:entradas[i].hora }))) }, h(Check, { size:15, strokeWidth:2.5 }), `Aplicar ${aplicar}`))));
}

function HorarioAlmocoModal({ colab, onClose, onSave }) {
  const [hora, setHora] = useState(colab.horarioAlmoco || "");
  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:S.modalCard, onClick:e => e.stopPropagation() },
      h("div", { style:S.modalHeader }, h("h2", { style:S.modalTitle }, "Horário de almoço"), h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("p", { style:{ fontSize:13, fontWeight:800, margin:"0 0 10px" } }, colab.nome),
      h("div", { style:S.formGroup }, h("label", { style:S.label }, "Horário padrão"),
        h("input", { type:"time", style:S.input, value:hora, onChange:e => setHora(e.target.value) })),
      h("div", { style:S.modalActions },
        colab.horarioAlmoco && h("button", { style:{ ...S.btnGhost, color:"#B71C1C", borderColor:"#E57373" }, onClick:() => onSave(colab.id, "") }, "Remover"),
        h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"),
        h("button", { style:S.btnPrimary, onClick:() => onSave(colab.id, hora) }, h(Check, { size:15, strokeWidth:2.5 }), "Salvar"))));
}

// ====== SENHA (todas as abas, exceto a Escala) ======
// Obs.: proteção de tela. O código do app é público, então isto não substitui regras de acesso no Firebase.
const SENHA_HASH = "0e747c2546a11bd46a24b0dc95c1325a9753cdaffaada9ed92ad598e7c38341f";
async function sha256Hex(txt) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join("");
}

function TelaSenha({ onOk }) {
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState("");
  const [tent, setTent] = useState(0);
  const [ate, setAte] = useState(0);
  const [, tick] = useState(0);
  useEffect(() => {
    if (!ate) return;
    const id = setInterval(() => { tick(x => x + 1); if (Date.now() >= ate) { setAte(0); setTent(0); setErro(""); } }, 500);
    return () => clearInterval(id);
  }, [ate]);
  const bloqueado = ate > Date.now();
  const entrar = async () => {
    if (bloqueado || !valor) return;
    let ok = false;
    try { ok = (await sha256Hex("controle-presenca:" + valor)) === SENHA_HASH; }
    catch (e) { setErro("Não foi possível verificar a senha neste navegador."); return; }
    if (ok) { onOk(); return; }
    const n = tent + 1; setTent(n); setValor("");
    if (n >= 5) { setAte(Date.now() + 30000); setErro("Muitas tentativas. Aguarde 30 segundos."); }
    else setErro(`Senha incorreta (${n}/5).`);
  };
  return h("div", { style:{ display:"flex", justifyContent:"center", padding:"40px 16px" } },
    h("div", { style:{ width:"100%", maxWidth:340, background:"#FFF", border:"2px solid #BFB4A0", borderRadius:16, padding:"24px 20px", textAlign:"center", boxShadow:"0 6px 24px rgba(0,0,0,0.08)" } },
      h("div", { style:{ fontSize:34, lineHeight:1 } }, "🔒"),
      h("div", { style:{ fontSize:16, fontWeight:900, color:"#2B2620", margin:"8px 0 2px" } }, "Área protegida"),
      h("div", { style:{ fontSize:12, color:"#8A8478", marginBottom:14 } }, "Digite a senha para ver esta aba. A Escala é livre."),
      h("input", { type:"password", inputMode:"numeric", autoComplete:"off", autoFocus:true, value:valor, disabled:bloqueado, placeholder:"Senha", "aria-label":"Senha",
        onChange:e=>{ setValor(e.target.value); setErro(bloqueado ? erro : ""); }, onKeyDown:e=>{ if (e.key === "Enter") entrar(); },
        style:{ ...S.input, textAlign:"center", fontSize:22, letterSpacing:"0.3em", fontWeight:800 } }),
      erro && h("p", { style:{ ...S.errorText, marginTop:8 } }, erro),
      h("button", { onClick:entrar, disabled:bloqueado || !valor, style:{ ...S.btnPrimary, width:"100%", marginTop:12, justifyContent:"center", opacity:bloqueado || !valor ? 0.5 : 1 } }, "Entrar")));
}

// ====== FALTAS (vindas da Escala) + controle de advertência ======
const FT_DIAS = ["dom","seg","ter","qua","qui","sex","sáb"];
const ftFmt = iso => { const [y,m,d] = iso.split("-").map(Number); return `${FT_DIAS[new Date(y, m-1, d).getDay()]} ${pad2(d)}/${pad2(m)}/${y}`; };
const ftFmtCurta = iso => iso ? iso.split("-").reverse().join("/") : "";

function TelaFaltas({ colaboradores, presencas, tiposStatus, advs, onSalvar, onExcluir }) {
  const agora = new Date();
  const mesAtual = `${agora.getFullYear()}-${pad2(agora.getMonth()+1)}`;
  const [periodo, setPeriodo] = useState(mesAtual);   // "" = todo o período
  const [filtro, setFiltro] = useState("todos");      // todos | pend | adv
  const [visao, setVisao] = useState("lista");        // lista | operador
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const norm = t => (t||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const turnoLabel = c => (TURNOS.find(t => t.id === c.turno) || {}).label || c.turno;

  const advMap = useMemo(() => { const o = {}; (advs || []).forEach(a => { o[a.id] = a; }); return o; }, [advs]);
  // status "Falta" (id "falta" ou qualquer status cujo nome contenha "falta")
  const idsFalta = useMemo(() => { const s = new Set(["falta"]); (tiposStatus || []).forEach(t => { if (/falta/i.test(t.label || "")) s.add(t.id); }); return s; }, [tiposStatus]);

  // todas as faltas hoje lançadas na Escala; se virar atestado (ou outro status), sai da lista sozinha
  const todas = useMemo(() => {
    const cm = {}; colaboradores.forEach(c => { cm[c.id] = c; });
    const out = [];
    Object.keys(presencas).forEach(k => {
      if (!idsFalta.has(presencas[k])) return;
      const i = k.lastIndexOf(":"); const c = cm[k.slice(0, i)]; if (!c || c.turno === "afastados") return;   // afastados não entram na lista de faltas
      out.push({ key:k, colab:c, data:k.slice(i+1), adv:advMap[k] || null });
    });
    return out;
  }, [presencas, colaboradores, idsFalta, advMap]);

  const doPeriodo = useMemo(() => todas.filter(f => !periodo || f.data.startsWith(periodo)), [todas, periodo]);
  const visiveis = useMemo(() => {
    const t = norm(q.trim());
    return doPeriodo.filter(f => (filtro === "todos" || (filtro === "pend" ? !f.adv : !!f.adv)) && (!t || norm(f.colab.nome).includes(t) || norm(f.colab.matricula).includes(t)))
      .sort((a, b) => b.data.localeCompare(a.data) || a.colab.nome.localeCompare(b.colab.nome, "pt-BR"));
  }, [doPeriodo, filtro, q]);
  const cont = { faltas:doPeriodo.length, ops:new Set(doPeriodo.map(f => f.colab.id)).size, adv:doPeriodo.filter(f => f.adv).length, pend:doPeriodo.filter(f => !f.adv).length };
  const porOp = useMemo(() => {
    const m = {}; visiveis.forEach(f => { (m[f.colab.id] = m[f.colab.id] || { colab:f.colab, itens:[] }).itens.push(f); });
    return Object.values(m).map(g => ({ ...g, itens:g.itens.sort((a, b) => a.data.localeCompare(b.data)) }))
      .sort((a, b) => b.itens.length - a.itens.length || a.colab.nome.localeCompare(b.colab.nome, "pt-BR"));
  }, [visiveis]);

  const alternar = async f => {
    if (f.adv) { if (window.confirm(`Remover a marcação de advertência de ${f.colab.nome} (${ftFmtCurta(f.data)})?`)) await onExcluir(f.key); }
    else await onSalvar({ id:f.key, colab_id:f.colab.id, data:f.data, advertencia:true, tipo:"", aplicadaEm:isoDate(new Date()), obs:"" });
  };
  const textoAdv = f => f.adv ? `Advertência aplicada${f.adv.tipo ? ` (${f.adv.tipo})` : ""}${f.adv.aplicadaEm ? ` em ${ftFmtCurta(f.adv.aplicadaEm)}` : ""}${f.adv.obs ? ` · ${f.adv.obs}` : ""}` : "Advertência pendente";

  const imprimirFaltas = () => {
    const rotPeriodo = periodo ? `${FV_MESES[+periodo.split("-")[1]-1]} de ${periodo.split("-")[0]}` : "todo o período";
    imprimirResumo({ titulo:"Resumo de faltas e advertências", subtitulo:`Loja 286 · ${rotPeriodo}`,
      cards:[{ valor:cont.faltas, rotulo:"faltas" }, { valor:cont.ops, rotulo:"operadores com falta" }, { valor:cont.adv, rotulo:"advertências aplicadas" }, { valor:cont.pend, rotulo:"advertências pendentes" }],
      secoes:[
        { titulo:`Por operador (${porOp.length})`, colunas:["Colaborador","Turno","Faltas","Datas","Advertências"],
          linhas:porOp.map(g => [g.colab.nome, turnoLabel(g.colab), g.itens.length, g.itens.map(f => ftFmtCurta(f.data).slice(0, 5)).join(", "), { t:`${g.itens.filter(f => f.adv).length} de ${g.itens.length}`, b:true, cor:g.itens.some(f => !f.adv) ? "#B71C1C" : "#0F5A34" }]) },
        { titulo:`Faltas lançadas (${visiveis.length})`, nota:"Faltas trocadas por atestado na Escala saem desta lista.", colunas:["Data","Colaborador","Turno","Advertência"],
          linhas:visiveis.map(f => [ftFmt(f.data), f.colab.nome, turnoLabel(f.colab), { t:textoAdv(f), b:!f.adv, cor:f.adv ? "#0F5A34" : "#B71C1C" }]) },
      ] });
  };

  const chip = (id, label, n) => h("button", { key:id, onClick:()=>setFiltro(id), style:{ padding:"6px 12px", borderRadius:999, fontSize:12, fontWeight:filtro === id ? 800 : 600, cursor:"pointer", whiteSpace:"nowrap",
      border:"2px solid "+(filtro === id ? "#2B2620" : "#BFB4A0"), background:filtro === id ? "#2B2620" : "#FFF", color:filtro === id ? "#FAF8F4" : "#5C5648" } }, `${label} (${n})`);
  const card = (n, label, cor) => h("div", { style:{ flex:"1 1 120px", background:"#FFF", border:"2px solid #BFB4A0", borderLeft:`5px solid ${cor}`, borderRadius:10, padding:"8px 12px" } },
    h("div", { style:{ fontSize:22, fontWeight:900, color:"#2B2620", lineHeight:1 } }, n), h("div", { style:{ fontSize:11, color:"#6B6458", marginTop:3 } }, label));
  const visBtn = (id, label) => h("button", { key:id, onClick:()=>setVisao(id), style:{ padding:"6px 12px", fontSize:12, fontWeight:800, cursor:"pointer", border:"2px solid #2B2620", background:visao === id ? "#2B2620" : "#FFF", color:visao === id ? "#FAF8F4" : "#2B2620" } }, label);

  const linha = f => h("div", { key:f.key, style:{ display:"flex", alignItems:"center", gap:10, background:f.adv ? "#F0FAF4" : "#FFF", border:"2px solid "+(f.adv ? "#7CC79B" : "#BFB4A0"), borderRadius:12, padding:"10px 12px" } },
    h("button", { onClick:()=>alternar(f), "aria-label":f.adv ? "Desmarcar advertência" : "Marcar advertência aplicada",
      style:{ width:36, height:36, flexShrink:0, borderRadius:9, border:"2.5px solid "+(f.adv ? "#1A7A4A" : "#8A8478"), background:f.adv ? "#1A7A4A" : "#FFF", color:"#FFF", fontSize:20, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" } }, f.adv ? "✓" : ""),
    h("div", { style:{ flex:1, minWidth:0 } },
      h("div", { style:{ fontSize:14, fontWeight:800, color:"#2B2620", lineHeight:1.2 } }, f.colab.nome),
      h("div", { style:{ fontSize:11.5, color:"#6B6458", marginTop:2 } }, `${ftFmt(f.data)} · ${turnoLabel(f.colab)}`),
      h("div", { style:{ fontSize:11.5, marginTop:3, fontWeight:700, color:f.adv ? "#0F5A34" : "#7A5200" } }, textoAdv(f))),
    h("button", { onClick:()=>setModal(f), "aria-label":"Detalhes da advertência", style:{ width:36, height:36, flexShrink:0, borderRadius:9, border:"none", background:"#F4F1EA", color:"#5C5648", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" } }, h(Pencil, { size:16 })));

  return h("div", { style:{ padding:"12px 16px", paddingBottom:60 } },
    h("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, flexWrap:"wrap", marginBottom:10 } },
      h("div", null,
        h("div", { style:{ fontSize:15, fontWeight:800, color:"#2B2620" } }, "Faltas e advertências"),
        h("div", { style:{ fontSize:11, color:"#8A8478", maxWidth:520 } }, "Mostra as faltas (FX) lançadas na Escala. Se a falta for trocada por atestado, ela sai daqui sozinha. Toque no quadrado para marcar que a advertência foi aplicada.")),
      h("button", { style:BTN_IMPRIMIR, onClick:imprimirFaltas }, "🖨 Imprimir resumo")),

    h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 } },
      card(cont.faltas, "Faltas no período", "#D32F2F"), card(cont.ops, "Operadores com falta", "#F5A300"), card(cont.adv, "Advertências aplicadas", "#2E9E5B"), card(cont.pend, "Advertências pendentes", "#8E44AD")),

    h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 } },
      h("input", { type:"month", value:periodo, onChange:e=>setPeriodo(e.target.value), style:{ ...S.input, width:"auto", padding:"6px 10px" } }),
      h("button", { onClick:()=>setPeriodo(periodo ? "" : mesAtual), style:{ padding:"6px 12px", borderRadius:999, fontSize:12, fontWeight:700, cursor:"pointer", border:"2px solid #BFB4A0", background:"#FFF", color:"#5C5648" } }, periodo ? "Ver todo o período" : "Voltar ao mês atual"),
      h("div", { style:{ display:"inline-flex", borderRadius:9, overflow:"hidden" } }, visBtn("lista", "Por data"), visBtn("operador", "Por operador"))),

    h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 } },
      chip("todos", "Todas", cont.faltas), chip("pend", "Sem advertência", cont.pend), chip("adv", "Com advertência", cont.adv),
      h("div", { style:{ display:"flex", alignItems:"center", gap:6, flex:"1 1 160px", maxWidth:260, background:"#FFF", border:"2px solid #BFB4A0", borderRadius:999, padding:"4px 10px" } },
        h(Search, { size:14, color:"#8A8478", strokeWidth:2.4 }),
        h("input", { type:"search", value:q, placeholder:"Pesquisar", onChange:e=>setQ(e.target.value), style:{ flex:1, minWidth:0, border:"none", outline:"none", background:"transparent", fontSize:13, fontFamily:"inherit", color:"#2B2620" } }))),

    visiveis.length === 0
      ? h("div", { style:S.emptyState }, h("p", { style:S.emptyTitle }, todas.length === 0 ? "Nenhuma falta lançada na Escala" : "Nenhuma falta neste filtro"),
          h("p", { style:{ fontSize:12, color:"#8A8478", textAlign:"center", maxWidth:300 } }, "As faltas aparecem aqui conforme você marca FX na Escala."))
      : visao === "lista"
        ? h("div", { style:{ display:"flex", flexDirection:"column", gap:8 } }, visiveis.map(linha))
        : h("div", { style:{ display:"flex", flexDirection:"column", gap:8 } },
            porOp.map(g => h("div", { key:g.colab.id, style:{ background:"#FFF", border:"2px solid "+(g.itens.some(f => !f.adv) ? "#BFB4A0" : "#7CC79B"), borderRadius:12, padding:"10px 12px" } },
              h("div", { style:{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:8 } },
                h("div", { style:{ fontSize:14, fontWeight:800, lineHeight:1.2 } }, g.colab.nome),
                h("div", { style:{ fontSize:12, fontWeight:800, color:"#B71C1C", whiteSpace:"nowrap" } }, `${g.itens.length} falta${g.itens.length > 1 ? "s" : ""}`)),
              h("div", { style:{ fontSize:11.5, color:"#6B6458", margin:"2px 0 6px" } }, `${turnoLabel(g.colab)} · ${g.itens.filter(f => f.adv).length} de ${g.itens.length} com advertência`),
              h("div", { style:{ display:"flex", flexWrap:"wrap", gap:6 } },
                g.itens.map(f => h("button", { key:f.key, onClick:()=>setModal(f), style:{ padding:"5px 9px", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer",
                    border:"2px solid "+(f.adv ? "#1A7A4A" : "#D32F2F"), background:f.adv ? "#E3F4EA" : "#FDECEA", color:f.adv ? "#0F5A34" : "#B71C1C" } }, `${f.adv ? "✓ " : ""}${ftFmt(f.data)}`)))))),

    modal && h(AdvertenciaModal, { f:modal, onClose:()=>setModal(null),
      onSave: async d => { await onSalvar(d); setModal(null); }, onRemove: async id => { await onExcluir(id); setModal(null); } })
  );
}

function AdvertenciaModal({ f, onClose, onSave, onRemove }) {
  const [sim, setSim] = useState(true);
  const [tipo, setTipo] = useState((f.adv && f.adv.tipo) || "");
  const [data, setData] = useState((f.adv && f.adv.aplicadaEm) || isoDate(new Date()));
  const [obs, setObs] = useState((f.adv && f.adv.obs) || "");
  const opc = (v, rot) => h("button", { onClick:()=>setSim(v), style:{ flex:1, padding:"10px", borderRadius:10, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit",
    border:"2.5px solid "+(sim === v ? (v ? "#1A7A4A" : "#B71C1C") : "#BFB4A0"), background:sim === v ? (v ? "#E3F4EA" : "#FDECEA") : "#FFF", color:sim === v ? (v ? "#0F5A34" : "#B71C1C") : "#5C5648" } }, rot);
  const salvar = () => {
    if (sim) onSave({ id:f.key, colab_id:f.colab.id, data:f.data, advertencia:true, tipo, aplicadaEm:data, obs:obs.trim() });
    else if (f.adv) onRemove(f.key); else onClose();
  };
  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:S.modalCard, onClick:e=>e.stopPropagation() },
      h("div", { style:S.modalHeader }, h("h2", { style:S.modalTitle }, "Advertência"), h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("p", { style:{ fontSize:13, fontWeight:800, margin:"0 0 2px" } }, f.colab.nome),
      h("p", { style:{ fontSize:12, color:"#6B6458", margin:"0 0 10px" } }, `Falta em ${ftFmt(f.data)}`),
      h("div", { style:{ ...S.formGroup } }, h("label", { style:S.label }, "Foi aplicada advertência?"),
        h("div", { style:{ display:"flex", gap:8 } }, opc(true, "Sim, aplicada"), opc(false, "Não"))),
      sim && h("div", null,
        h("div", { style:{ display:"flex", gap:10, flexWrap:"wrap" } },
          h("div", { style:{ ...S.formGroup, flex:"1 1 150px" } }, h("label", { style:S.label }, "Tipo"),
            h("select", { style:S.input, value:tipo, onChange:e=>setTipo(e.target.value) }, ["", "Verbal", "Escrita", "Suspensão"].map(t => h("option", { key:t, value:t }, t || "Não informado")))),
          h("div", { style:{ ...S.formGroup, flex:"1 1 150px" } }, h("label", { style:S.label }, "Data da aplicação"), h("input", { type:"date", style:S.input, value:data, onChange:e=>setData(e.target.value) }))),
        h("div", { style:S.formGroup }, h("label", { style:S.label }, "Observação"), h("input", { style:S.input, value:obs, placeholder:"Opcional", onChange:e=>setObs(e.target.value) }))),
      h("div", { style:S.modalActions }, h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"), h("button", { style:S.btnPrimary, onClick:salvar }, h(Check, { size:15, strokeWidth:2.5 }), "Salvar"))));
}

// ====== IMPORTAÇÃO DO RELATÓRIO DE SALDOS (BANCO DE HORAS) ======
function ImportBHModal({ dados, colaboradores, saldosPorColab, onClose, onSalvar, onAjustar }) {
  const nz = t => (t||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  const [y, m, d] = dados.dataIso.split("-");
  const linhas = useMemo(() => {
    const byMat = {}, byNome = {};
    colaboradores.forEach(c => { if (c.matricula) byMat[c.matricula] = c; byNome[nz(c.nome)] = c; });
    return dados.rows.map(r => {
      const c = byMat[r.matricula] || byNome[nz(r.nome)];
      const app = c ? (saldosPorColab[c.id] || 0) : null;
      return { ...r, c, app, dif: c ? r.min - app : null };
    });
  }, [dados, colaboradores, saldosPorColab]);
  const achados = linhas.filter(l => l.c);
  const sem = linhas.filter(l => !l.c);
  const diferentes = achados.filter(l => l.dif !== 0);
  const hhmm = v => `${v < 0 ? "-" : ""}${minParaHora(v)}`;
  const docs = () => linhas.filter(l => l.matricula || l.c).map(l => { const mat = l.matricula || l.c.matricula; return { id: mat, matricula: mat, nome: l.nome, cargo: l.cargo, min: l.min, data: dados.dataIso }; });
  const cel = { padding:"6px 8px", fontSize:12.5, borderBottom:"1.5px solid #E3DBCB", whiteSpace:"nowrap" };

  return h("div", { style:S.modalOverlay, onClick:onClose },
    h("div", { style:{ ...S.modalCard, maxWidth:640 }, onClick:e=>e.stopPropagation() },
      h("div", { style:S.modalHeader },
        h("h2", { style:S.modalTitle }, "Importar saldos do relatório"),
        h("button", { style:S.modalClose, onClick:onClose }, h(X, { size:18 }))),
      h("p", { style:{ fontSize:12, color:"#6B6458", margin:"0 0 8px" } }, `${dados.arquivo} · data do relatório ${d}/${m}/${y}`),
      h("div", { style:{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10, fontSize:12, fontWeight:700 } },
        h("span", { style:{ background:"#E3F4EA", color:"#0F5A34", borderRadius:8, padding:"4px 8px" } }, `${achados.length} operadores lidos`),
        h("span", { style:{ background:diferentes.length?"#FFF3CD":"#E3F4EA", color:diferentes.length?"#7A5200":"#0F5A34", borderRadius:8, padding:"4px 8px" } }, `${diferentes.length} com diferença`),
        sem.length > 0 && h("span", { style:{ background:"#FDECEA", color:"#B71C1C", borderRadius:8, padding:"4px 8px" } }, `${sem.length} sem cadastro`)),
      h("div", { style:{ maxHeight:"44vh", overflow:"auto", border:"2px solid #BFB4A0", borderRadius:10, background:"#FFF" } },
        h("table", { style:{ borderCollapse:"collapse", width:"100%" } },
          h("thead", null, h("tr", null, ["Operador","No app","Relatório","Diferença"].map(t => h("th", { key:t, style:{ ...cel, background:"#F4F1EA", textAlign:t==="Operador"?"left":"right", fontWeight:800, position:"sticky", top:0 } }, t)))),
          h("tbody", null, linhas.map((l, i) => h("tr", { key:i, style:{ background: !l.c ? "#FFF5F4" : l.dif ? "#FFFBEA" : "transparent" } },
            h("td", { style:{ ...cel, fontWeight:700, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis" } }, l.nome, !l.c && h("span", { style:{ color:"#B71C1C", fontSize:10.5, marginLeft:6 } }, "sem cadastro")),
            h("td", { style:{ ...cel, textAlign:"right", color:"#6B6458" } }, l.c ? hhmm(l.app) : "—"),
            h("td", { style:{ ...cel, textAlign:"right", fontWeight:800, color:l.min<0?"#B71C1C":l.min>0?"#0F5A34":"#6B6458" } }, hhmm(l.min)),
            h("td", { style:{ ...cel, textAlign:"right", fontWeight:800, color:!l.c?"#8A8478":l.dif===0?"#8A8478":l.dif>0?"#0F5A34":"#B71C1C" } }, !l.c ? "—" : l.dif === 0 ? "ok" : (l.dif > 0 ? "+" : "") + hhmm(l.dif))))))),
      h("p", { style:{ fontSize:11.5, color:"#6B6458", margin:"10px 0 4px", lineHeight:1.4 } },
        "“Guardar relatório” só registra os saldos do relatório (aparecem em cada operador, sem mexer nos lançamentos). “Guardar e ajustar” também cria um lançamento de ajuste por operador para o saldo do app ficar igual ao relatório."),
      h("div", { style:S.modalActions },
        h("button", { style:S.btnGhost, onClick:onClose }, "Cancelar"),
        h("button", { style:S.btnGhost, onClick:()=>onSalvar(docs()) }, "Guardar relatório"),
        h("button", { style:S.btnPrimary, disabled:diferentes.length===0,
          onClick:()=>{ if (window.confirm(`Lançar ${diferentes.length} ajustes para igualar o saldo do app ao relatório de ${d}/${m}/${y}?`)) onAjustar(diferentes.map(l => ({ colab_id:l.c.id, minutos:l.dif })), docs(), dados.dataIso); } },
          `Guardar e ajustar (${diferentes.length})`))));
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
  header:{background:"#1A1208",borderBottom:"1px solid #3D2E10",position:"relative",zIndex:10},
  headerTop:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",gap:10},
  brandRow:{display:"flex",alignItems:"center",gap:10,minWidth:0},
  brandMark:{width:34,height:34,borderRadius:9,background:"#2B2620",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  brandTitle:{fontFamily:FD,fontSize:17,fontWeight:700,margin:0,lineHeight:1.2,whiteSpace:"nowrap",color:"#FAF8F4"},
  brandSub:{fontSize:11,color:"#C9BC9A",margin:"2px 0 0"},
  addBtn:{display:"flex",alignItems:"center",gap:5,background:"#E65100",color:"#FFF",border:"none",borderRadius:8,padding:"8px 12px",fontSize:12.5,fontWeight:700,flexShrink:0,boxShadow:"0 2px 8px #E6510066"},
  iconBtn2:{width:32,height:32,borderRadius:8,border:"1px solid #3D2E10",background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center"},
  pendenteBadge:{fontSize:11,fontWeight:700,color:"#D68910",background:"#FEF9F0",border:"1px solid #F9A825",borderRadius:999,padding:"3px 8px"},
  salvandoBadge:{fontSize:11,fontWeight:700,color:"#2980B9",background:"#EBF5FB",border:"1px solid #3498DB",borderRadius:999,padding:"3px 8px"},
  navTabs:{display:"flex",borderBottom:"2px solid #3D2E10",margin:"0",padding:"0 16px",background:"#1A1208",overflowX:"auto",whiteSpace:"nowrap"},
  navTab:{display:"flex",alignItems:"center",gap:6,padding:"10px 12px",fontSize:13,fontWeight:600,color:"#C9BC9A",border:"none",background:"transparent",borderBottom:"2px solid transparent",marginBottom:-2,cursor:"pointer"},
  navTabAtivo:{color:"#FF6D00",borderBottomColor:"#FF6D00",fontWeight:800},
  tabsRow:{display:"flex",gap:5,padding:"8px 12px",overflowX:"auto",alignItems:"center",background:"#F8F4EE",borderBottom:"2px solid #D9CFBC"},
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
  turnoChip:{display:"flex",alignItems:"center",gap:6,background:"#FFF",border:"2px solid #CFC5B1",borderRadius:8,padding:"5px 10px"},
  turnoChipDot:{width:7,height:7,borderRadius:"50%"},
  turnoChipText:{fontSize:12,fontWeight:600,color:"#5C5648"},
  weekNav:{display:"flex",alignItems:"center",gap:3},
  weekNavBtn:{width:28,height:28,borderRadius:7,border:"2px solid #CFC5B1",background:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",color:"#5C5648"},
  weekLabel:{fontSize:12,fontWeight:700,color:"#2B2620",margin:"0 5px",minWidth:80,textAlign:"center"},
  weekTodayBtn:{border:"2px solid #CFC5B1",background:"#FFF",borderRadius:7,padding:"5px 9px",fontSize:11.5,fontWeight:600,color:"#5C5648",marginLeft:3},
  legend:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:10,padding:"10px 16px 6px"},
  legendItem:{display:"flex",alignItems:"center",gap:4},
  legendSwatch:{width:20,height:18,borderRadius:5,border:"1.5px solid",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  legendText:{fontSize:11,color:"#6B6458"},
  legendManageBtn:{display:"flex",alignItems:"center",gap:4,background:"#F4F1EA",border:"2px solid #BFB4A0",borderRadius:999,padding:"4px 9px",fontSize:11,fontWeight:600,color:"#5C5648"},
  tableWrap:{padding:"4px 16px 0"},
  scrollArea:{overflowX:"auto",borderRadius:12,border:"2px solid #CFC5B1",background:"#FFF"},
  table:{borderCollapse:"collapse",width:"100%",minWidth:580},
  thName:{textAlign:"left",fontSize:10,fontWeight:700,color:"#5C5648",textTransform:"uppercase",letterSpacing:"0.05em",padding:"9px 12px",position:"sticky",left:0,background:"#F0EBE0",borderBottom:"2px solid #D8CDB8",minWidth:180,zIndex:2},
  thDay:{textAlign:"center",padding:"8px 4px",borderBottom:"3px solid #D8CDB8",borderLeft:"1.5px solid #E3DBCB",color:"#3D3028",fontWeight:700,minWidth:52},
  thDayToday:{background:"#FFF3C4",borderBottomColor:"#2B2620"},
  thDaySunday:{background:"#FBFAF7"},
  tdName:{padding:"9px 12px",borderBottom:"2px solid #D9CFBC",position:"sticky",left:0,backgroundColor:"#FFF",zIndex:1},
  nameCell:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6},
  nameText:{fontSize:13,fontWeight:700,color:"#2B2620"},
  nameMeta:{fontSize:10,color:"#9C9586",marginTop:1},
  nameActions:{display:"flex",gap:3,flexShrink:0},
  iconBtn:{width:22,height:22,borderRadius:6,border:"none",background:"transparent",color:"#9C9586",display:"flex",alignItems:"center",justifyContent:"center"},
  tdCell:{padding:"7px 4px",borderBottom:"2px solid #D9CFBC",borderLeft:"1.5px solid #E3DBCB",textAlign:"center"},
  cellBtn:{width:44,height:38,borderRadius:9,border:"2px solid",fontSize:13,fontWeight:900,display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"all 0.12s",letterSpacing:"-0.3px"},
  groupHeaderCell:{padding:"8px 12px",background:"#F4F1EA",borderTop:"2px solid #D9CFBC",borderBottom:"2px solid #D9CFBC",borderLeft:"5px solid",position:"sticky",left:0},
  groupHeaderDot:{display:"inline-block",width:7,height:7,borderRadius:"50%",marginRight:7},
  groupHeaderText:{fontSize:12,fontWeight:800,color:"#2B2620"},
  groupHeaderHorario:{fontSize:10.5,color:"#9C9586",marginLeft:7},
  groupHeaderCount:{fontSize:10.5,color:"#9C9586",marginLeft:7,float:"right"},
  emptyState:{display:"flex",flexDirection:"column",alignItems:"center",padding:"48px 16px",background:"#FFF",border:"2px dashed #BFB4A0",borderRadius:12,textAlign:"center"},
  emptyTitle:{fontSize:14,fontWeight:700,color:"#2B2620",margin:"10px 0 2px"},
  modalOverlay:{position:"fixed",inset:0,background:"rgba(43,38,32,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:50,animation:"fadeIn 0.15s ease-out"},
  modalCard:{background:"#FAF8F4",width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto",borderRadius:"18px 18px 0 0",padding:"18px 18px 28px",border:"2px solid #BFB4A0",borderBottom:"none",boxShadow:"0 -8px 28px rgba(0,0,0,0.22)",animation:"fadeIn 0.2s ease-out"},
  modalHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},
  modalTitle:{fontFamily:FD,fontSize:18,fontWeight:700,margin:0},
  modalClose:{width:28,height:28,borderRadius:8,border:"none",background:"#EFEBE2",display:"flex",alignItems:"center",justifyContent:"center",color:"#5C5648"},
  formGroup:{marginBottom:14},
  label:{display:"block",fontSize:12,fontWeight:700,color:"#6B6458",marginBottom:6},
  input:{width:"100%",padding:"11px 12px",borderRadius:9,border:"2px solid #BFB4A0",fontSize:14,background:"#FFF",color:"#2B2620",outline:"none"},
  chipRow:{display:"flex",flexWrap:"wrap",gap:6},
  chip:{border:"2px solid #BFB4A0",background:"#FFF",borderRadius:999,padding:"7px 11px",fontSize:12,fontWeight:600,color:"#6B6458"},
  chipActive:{background:"#2B2620",borderColor:"#2B2620",color:"#FAF8F4",boxShadow:"0 2px 8px rgba(43,38,32,0.3)"},
  hintText:{fontSize:11.5,color:"#9C9586",marginTop:5},
  errorText:{fontSize:12.5,color:"#C0392B",marginBottom:10,fontWeight:600},
  modalActions:{display:"flex",gap:8,marginTop:8},
  btnGhost:{flex:1,padding:"11px",borderRadius:10,border:"2px solid #BFB4A0",background:"#FFF",color:"#5C5648",fontSize:13.5,fontWeight:700},
  btnPrimary:{flex:2,padding:"11px",borderRadius:10,border:"none",background:"#2B2620",color:"#FAF8F4",fontSize:13.5,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6},
  btnDanger:{flex:2,padding:"11px",borderRadius:10,border:"none",background:"#C0392B",color:"#FFF",fontSize:13.5,fontWeight:700},
  confirmCard:{background:"#FFF",width:"100%",maxWidth:400,margin:16,borderRadius:16,padding:20,animation:"fadeIn 0.2s ease-out"},
  confirmTitle:{fontSize:15,fontWeight:800,margin:"0 0 6px"},
  confirmText:{fontSize:13,color:"#6B6458",margin:"0 0 16px",lineHeight:1.5},
  confirmActions:{display:"flex",gap:8},
  toast:{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",color:"#FAF8F4",padding:"10px 18px",borderRadius:999,fontSize:13,fontWeight:600,boxShadow:"0 4px 16px rgba(0,0,0,0.25)",zIndex:60,animation:"fadeIn 0.2s ease-out",whiteSpace:"nowrap"},
  tiposList:{display:"flex",flexDirection:"column",gap:6,marginBottom:12},
  tipoRow:{display:"flex",alignItems:"center",gap:10,background:"#FFF",border:"2px solid #CFC5B1",borderRadius:10,padding:"8px 10px"},
  tipoSwatch:{width:34,height:28,borderRadius:7,border:"1.5px solid",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0},
  tipoNome:{fontSize:13,fontWeight:600,color:"#2B2620",flex:1},
  tipoFixoBadge:{fontSize:10,fontWeight:700,color:"#9C9586",background:"#F4F1EA",padding:"2px 7px",borderRadius:999},
  tipoActions:{display:"flex",gap:2},
  addTipoBtn:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,border:"1.5px dashed #D8D2C5",background:"transparent",borderRadius:10,padding:"11px",fontSize:13,fontWeight:700,color:"#6B6458",marginBottom:8},
  bhWrap:{padding:"12px 16px",display:"flex",flexDirection:"column",gap:14},
  bhSaldosSection:{background:"#FFF",borderRadius:12,border:"2px solid #CFC5B1",overflow:"hidden"},
  bhSaldosHeader:{padding:"11px 14px",borderBottom:"2px solid #D9CFBC",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},
  bhSaldosTitle:{fontSize:13,fontWeight:800,color:"#2B2620"},
  bhFiltroBtn:{border:"2px solid #BFB4A0",background:"#FFF",borderRadius:999,padding:"4px 10px",fontSize:11.5,fontWeight:600,color:"#6B6458"},
  bhFiltroBtnTodos:{background:"#2B2620",borderColor:"#2B2620",color:"#FFF",fontWeight:700},
  bhSaldosList:{display:"flex",flexWrap:"wrap",gap:8,padding:"10px 14px"},
  bhSaldoCard:{textAlign:"left",background:"#FAF8F4",border:"2px solid #CFC5B1",borderRadius:10,padding:"9px 11px",cursor:"pointer",minWidth:130,flex:"1 1 130px"},
  bhSaldoNome:{fontSize:12,fontWeight:700,color:"#2B2620",marginBottom:2},
  bhSaldoMeta:{fontSize:10,color:"#9C9586"},
  bhLancsSection:{background:"#FFF",borderRadius:12,border:"2px solid #CFC5B1",overflow:"hidden"},
  bhLancsHeader:{padding:"11px 14px",borderBottom:"2px solid #D9CFBC",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"},
  bhLimparFiltro:{border:"none",background:"transparent",color:"#D97757",fontSize:12,fontWeight:700,cursor:"pointer"},
  bhEmpty:{padding:"36px 16px",textAlign:"center"},
  bhEmptyTitle:{fontSize:13,fontWeight:700,color:"#2B2620",margin:"0 0 4px"},
  bhEmptySub:{fontSize:12,color:"#9C9586",margin:0},
  bhLancsList:{display:"flex",flexDirection:"column"},
  bhLancCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderBottom:"2px solid #D9CFBC",gap:10},
  bhLancLeft:{display:"flex",alignItems:"center",gap:10},
  bhLancTipo:{width:30,height:30,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,flexShrink:0},
  bhLancNome:{fontSize:13,fontWeight:600,color:"#2B2620"},
  bhLancMeta:{fontSize:10.5,color:"#9C9586",marginTop:1},
  bhLancRight:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0},
};

const css=`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}html,body{margin:0;padding:0;background:#FAF8F4;overscroll-behavior-y:none}button{font-family:inherit;cursor:pointer}input,select{font-family:inherit}::-webkit-scrollbar{height:6px;width:6px}::-webkit-scrollbar-thumb{background:#D8D2C5;border-radius:6px}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

ReactDOM.createRoot(document.getElementById("root")).render(h(Root,null));
