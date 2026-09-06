/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║   МАТРИЦА СУДЬБЫ · NATA DRACONIS  — версия 5 (финал)    ║
 * ╠══════════════════════════════════════════════════════════╣
 * ║  [1]  Драконья тема — ПОЛНОСТЬЮ УДАЛЕНА                  ║
 * ║  [2]  Hero: новый заголовок + слоган + цена + формат     ║
 * ║  [3]  О методе: 10 аспектов + блок «20 тем разбора»      ║
 * ║  [4]  О специалисте: родолог, без стажа/астрологии,      ║
 * ║        реальное фото + плейсхолдер ФОТО NATA DRACONIS    ║
 * ║  [5]  Формат: документ Word ~150 страниц (не созвон)     ║
 * ║  [6]  Раздел «Обучение» ПОЛНОСТЬЮ УДАЛЁН                 ║
 * ║  [7]  Все эмодзи → SVG/CSS; Древо Рода, мандала          ║
 * ║  [8]  Соцсети: только VK + TikTok                        ║
 * ║  [9]  Палитра: фиолет + золото                           ║
 * ║ [10]  Цена 3 690 ₽ — hero, темы, контакты                ║
 * ║ [11]  Анкета из 10 вопросов                              ║
 * ║ [12]  Форма Formspree (xqpklgbg) с обработкой ответа     ║
 * ╚══════════════════════════════════════════════════════════╝
 */

import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════
   УТИЛИТЫ: анимация при скролле
═══════════════════════════════════════ */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const fu = (v: boolean, d = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "translateY(0)" : "translateY(32px)",
  transition: `opacity .72s ease ${d}ms, transform .72s ease ${d}ms`,
});
const fl = (v: boolean, d = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "translateX(0)" : "translateX(-44px)",
  transition: `opacity .72s ease ${d}ms, transform .72s ease ${d}ms`,
});
const fr = (v: boolean, d = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "translateX(0)" : "translateX(44px)",
  transition: `opacity .72s ease ${d}ms, transform .72s ease ${d}ms`,
});
const fs = (v: boolean, d = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "scale(1)" : "scale(0.87)",
  transition: `opacity .65s ease ${d}ms, transform .65s ease ${d}ms`,
});

/* ═══════════════════════════════════════
   SVG-ИКОНКИ (без эмодзи — [7])
═══════════════════════════════════════ */

/* Кольцо-мандала */
const IcRing = ({ s = 32, c = "#B57EDC" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="20" stroke={c} strokeWidth="1.6" strokeDasharray="5 3" />
    <circle cx="24" cy="24" r="12" stroke={c} strokeWidth="1.1" opacity=".5" />
    <circle cx="24" cy="24" r="5" fill={c} opacity=".85" />
  </svg>
);

/* Звезда-ромб */
const IcStar = ({ s = 18, c = "#C9963A" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L13.8 8.2H20L14.9 11.8L16.7 18L12 14.4L7.3 18L9.1 11.8L4 8.2H10.2Z"
      fill={c} opacity=".92" />
  </svg>
);

/* Ключ */
const IcKey = ({ s = 36, c = "#C9963A" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="17" cy="17" r="11" stroke={c} strokeWidth="2" />
    <circle cx="17" cy="17" r="5.5" stroke={c} strokeWidth="1.4" opacity=".4" />
    <line x1="25" y1="25" x2="44" y2="44" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="36" y1="36" x2="36" y2="43" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="40" x2="40" y2="44" stroke={c} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* Луна */
const IcMoon = ({ s = 36, c = "#E6D5F7" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M30 8A16 16 0 1 0 30 40A12 12 0 1 1 30 8Z" fill={c} opacity=".88" />
  </svg>
);

/* Спираль — карма */
const IcSpiral = ({ s = 36, c = "#B57EDC" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M24 24Q24 12 36 12Q48 12 48 24Q48 40 30 40Q10 40 10 20Q10 4 28 4"
      stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".82" />
  </svg>
);

/* Компас — путь */
const IcCompass = ({ s = 36, c = "#B57EDC" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="21" stroke={c} strokeWidth=".9" opacity=".35" />
    <line x1="24" y1="3" x2="24" y2="45" stroke={c} strokeWidth="1.4" strokeDasharray="4 3" />
    <line x1="3" y1="24" x2="45" y2="24" stroke={c} strokeWidth="1.4" strokeDasharray="4 3" />
    <circle cx="24" cy="24" r="4.5" fill={c} />
  </svg>
);

/* Сердце */
const IcHeart = ({ s = 36, c = "#C9963A" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M24 38S6 28 6 17A10 10 0 0 1 24 12A10 10 0 0 1 42 17C42 28 24 38 24 38Z"
      stroke={c} strokeWidth="2" fill="none" opacity=".85" />
    <path d="M24 22V32M18 27H30" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
  </svg>
);

/* Монета */
const IcCoin = ({ s = 36, c = "#E8C06A" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="18" stroke={c} strokeWidth="2" />
    <circle cx="24" cy="24" r="11" stroke={c} strokeWidth="1.3" opacity=".45" />
    <text x="24" y="30" textAnchor="middle" fill={c} fontSize="14" fontWeight="bold" opacity=".85">₽</text>
  </svg>
);

/* Глаз */
const IcEye = ({ s = 36, c = "#B57EDC" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M4 24C4 24 12 10 24 10C36 10 44 24 44 24C44 24 36 38 24 38C12 38 4 24 4 24Z"
      stroke={c} strokeWidth="1.8" fill="none" />
    <circle cx="24" cy="24" r="6" fill={c} opacity=".7" />
    <circle cx="24" cy="24" r="3" fill={c} />
  </svg>
);

/* Раскрытие */
const IcUnfold = ({ s = 36, c = "#C9963A" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <line x1="24" y1="8" x2="24" y2="40" stroke={c} strokeWidth="2" />
    <polyline points="14,30 24,40 34,30" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
    <line x1="15" y1="15" x2="33" y2="15" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="9" x2="37" y2="9" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
  </svg>
);

/* Шеврон */
const IcChevron = ({ s = 22, c = "#B57EDC" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c}
    strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* Документ */
const IcDoc = ({ s = 36, c = "#B57EDC" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="8" y="4" width="28" height="36" rx="3" stroke={c} strokeWidth="1.8" />
    <path d="M36 4L44 12H36V4Z" stroke={c} strokeWidth="1.5" fill="none" />
    <line x1="14" y1="18" x2="34" y2="18" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
    <line x1="14" y1="24" x2="34" y2="24" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
    <line x1="14" y1="30" x2="26" y2="30" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
  </svg>
);

/* VK [8] */
const IcVK = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24
    22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.727
    -1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846
    0-3.896-1.118-5.335-3.202C5.077 11.6 4.1 9.5 4.1 9.06c0-.254.101-.491.593-.491h1.744c.44 0 .61.203
    .779.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.74c-.068-1.186-.695-1.287-.695
    -1.71 0-.204.17-.407.44-.407h2.743c.373 0 .508.203.508.643v3.473c0 .372.169.508.271.508.22 0 .407
    -.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27
    .525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745
    .847 1.32 1.558 1.473 2.049.17.491-.085.745-.576.745z" />
  </svg>
);

/* TikTok [8] */
const IcTikTok = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89
    0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34
    0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.52V6.76
    a4.85 4.85 0 01-1.02-.07z" />
  </svg>
);

/* ═══════════════════════════════════════
   SVG: ДРЕВО РОДА [7]
═══════════════════════════════════════ */
const FamilyTree = () => (
  <svg viewBox="0 0 260 320" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 260, height: "auto",
      filter: "drop-shadow(0 0 22px rgba(107,45,139,.55))" }}
    aria-label="Древо рода" role="img">
    <defs>
      <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C9963A" stopOpacity=".92" />
        <stop offset="100%" stopColor="#6B2D8B" stopOpacity=".75" />
      </linearGradient>
      <radialGradient id="cg" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#B57EDC" stopOpacity=".22" />
        <stop offset="100%" stopColor="#B57EDC" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rg" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#C9963A" stopOpacity=".2" />
        <stop offset="100%" stopColor="#C9963A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#B57EDC" stopOpacity=".88" />
        <stop offset="100%" stopColor="#E6D5F7" stopOpacity=".32" />
      </linearGradient>
    </defs>
    <ellipse cx="130" cy="118" rx="94" ry="94" fill="url(#cg)" />
    <ellipse cx="130" cy="262" rx="80" ry="38" fill="url(#rg)" />
    {/* Корни */}
    <path d="M130 222 L130 272" stroke="url(#tg)" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M127 242 Q109 257 93 267" stroke="#C9963A" strokeWidth="2.2" strokeLinecap="round" opacity=".72" />
    <path d="M125 252 Q104 270 86 278" stroke="#C9963A" strokeWidth="1.6" strokeLinecap="round" opacity=".5" />
    <path d="M133 242 Q151 257 167 267" stroke="#C9963A" strokeWidth="2.2" strokeLinecap="round" opacity=".72" />
    <path d="M135 252 Q156 270 174 278" stroke="#C9963A" strokeWidth="1.6" strokeLinecap="round" opacity=".5" />
    {/* Ствол */}
    <rect x="123.5" y="160" width="13" height="67" rx="5.5" fill="url(#tg)" />
    {/* Ветви */}
    <path d="M128 177 Q104 159 80 148" stroke="url(#bg)" strokeWidth="3" strokeLinecap="round" />
    <path d="M128 187 Q99 169 73 165" stroke="url(#bg)" strokeWidth="2.6" strokeLinecap="round" opacity=".8" />
    <path d="M80 148 Q68 137 60 126" stroke="#B57EDC" strokeWidth="1.6" strokeLinecap="round" opacity=".62" />
    <path d="M80 148 Q76 134 74 120" stroke="#B57EDC" strokeWidth="1.6" strokeLinecap="round" opacity=".52" />
    <path d="M73 165 Q60 154 50 146" stroke="#B57EDC" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    <path d="M132 177 Q156 159 180 148" stroke="url(#bg)" strokeWidth="3" strokeLinecap="round" />
    <path d="M132 187 Q161 169 187 165" stroke="url(#bg)" strokeWidth="2.6" strokeLinecap="round" opacity=".8" />
    <path d="M180 148 Q192 137 200 126" stroke="#B57EDC" strokeWidth="1.6" strokeLinecap="round" opacity=".62" />
    <path d="M180 148 Q184 134 186 120" stroke="#B57EDC" strokeWidth="1.6" strokeLinecap="round" opacity=".52" />
    <path d="M187 165 Q200 154 210 146" stroke="#B57EDC" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    <path d="M130 163 Q118 147 109 130" stroke="url(#bg)" strokeWidth="2.6" strokeLinecap="round" opacity=".72" />
    <path d="M130 163 Q142 147 151 130" stroke="url(#bg)" strokeWidth="2.6" strokeLinecap="round" opacity=".72" />
    <path d="M130 163 L130 126" stroke="url(#bg)" strokeWidth="2.6" strokeLinecap="round" />
    {/* Точки-предки */}
    {([
      [60,124],[74,118],[50,144],[64,150],
      [200,124],[186,118],[210,144],[196,150],
      [109,128],[130,120],[151,128],[92,168],[164,170],
    ] as [number,number][]).map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r={i<8?4.5:3.5} fill="#B57EDC" opacity={.72-i*.02}>
        <animate attributeName="opacity" values={`${.72-i*.02};1;${.72-i*.02}`}
          dur={`${2.6+i*.38}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* Центральный узел */}
    <circle cx="130" cy="163" r="7.5" fill="#C9963A" opacity=".92">
      <animate attributeName="r" values="7.5;9.5;7.5" dur="3.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="130" cy="163" r="4" fill="#E8C06A" />
    <circle cx="130" cy="163" r="19" stroke="#B57EDC" strokeWidth=".7" opacity=".28" strokeDasharray="3 4.5" />
    <circle cx="130" cy="163" r="31" stroke="#C9963A" strokeWidth=".5" opacity=".18" strokeDasharray="2 7" />
  </svg>
);

/* ═══════════════════════════════════════
   МАНДАЛА-ФОН (hero) [7]
═══════════════════════════════════════ */
const MandalaBg = () => (
  <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ position:"absolute", top:"50%", left:"50%",
      transform:"translate(-50%,-50%)", width:"min(740px,94vw)",
      height:"min(740px,94vw)", opacity:.1, pointerEvents:"none", zIndex:1 }}>
    {[240,200,160,120,80,40].map((r,i) => (
      <circle key={r} cx="300" cy="300" r={r}
        stroke={i%2===0?"#B57EDC":"#C9963A"}
        strokeWidth={i===0?1:.55}
        strokeDasharray={i%2===0?"8 6":"3 9"} />
    ))}
    {Array.from({length:12},(_,i)=>{
      const a=(i*30*Math.PI)/180;
      return <line key={i} x1={300+35*Math.cos(a)} y1={300+35*Math.sin(a)}
        x2={300+240*Math.cos(a)} y2={300+240*Math.sin(a)}
        stroke="#B57EDC" strokeWidth=".5" opacity=".55"/>;
    })}
    {Array.from({length:12},(_,i)=>{
      const a=(i*30*Math.PI)/180;
      return <circle key={i} cx={300+252*Math.cos(a)} cy={300+252*Math.sin(a)}
        r="5" fill="#C9963A" opacity=".45"/>;
    })}
  </svg>
);

/* ═══════════════════════════════════════
   ЗВЁЗДНЫЙ CANVAS [7]
═══════════════════════════════════════ */
function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf: number;
    interface Dot{x:number;y:number;r:number;a:number;da:number;spd:number;hue:number}
    const dots:Dot[] = Array.from({length:190},()=>({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.65+.3, a:Math.random(),
      da:(Math.random()-.5)*.009, spd:Math.random()*.08+.01,
      hue:Math.random()>.62?45:278,
    }));
    function draw(){
      if(!ctx)return;
      ctx.clearRect(0,0,W,H);
      dots.forEach(d=>{
        d.a+=d.da; if(d.a<=0||d.a>=1)d.da*=-1;
        d.y-=d.spd; if(d.y<0){d.y=H;d.x=Math.random()*W;}
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${d.hue},72%,78%,${d.a})`;
        ctx.shadowBlur=5;
        ctx.shadowColor=d.hue===45?"rgba(201,150,58,.58)":"rgba(181,126,220,.58)";
        ctx.fill();
      });
      ctx.shadowBlur=0;
      raf=requestAnimationFrame(draw);
    }
    draw();
    const onResize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener("resize",onResize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,width:"100%",height:"100%",
    pointerEvents:"none",zIndex:0}}/>;
}

/* ═══════════════════════════════════════
   НАВИГАЦИЯ [6] — без «Обучения»
═══════════════════════════════════════ */
const NAV=[
  {href:"#method",         label:"О методе"},
  {href:"#reading-topics", label:"Темы разбора"},
  {href:"#ancestry",       label:"Хранители рода"},
  {href:"#about",          label:"О специалисте"},
  {href:"#reviews",        label:"Отзывы"},
  {href:"#questionnaire",  label:"Анкета"},
  {href:"#contact",        label:"Контакты"},
];

function Navbar(){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  const toggle=useCallback(()=>setOpen(o=>!o),[]);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>55);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  const bg:React.CSSProperties=scrolled
    ?{background:"rgba(9,5,26,.96)",backdropFilter:"blur(18px)",boxShadow:"0 2px 24px rgba(107,45,139,.3)"}
    :{background:"transparent"};

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,
      transition:"background .4s, box-shadow .4s",padding:".65rem 0",...bg}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 1.5rem",
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>

        {/* Логотип */}
        <a href="#" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:".7rem"}}>
          <IcRing s={34} c="#C9963A"/>
          <span>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.22rem",
              fontWeight:700,color:"#E6D5F7",lineHeight:1.05}}>Матрица Судьбы</div>
            <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".6rem",
              letterSpacing:".18em",color:"#C9963A",textTransform:"uppercase"}}>Nata Draconis</div>
          </span>
        </a>

        {/* Ссылки (десктоп) */}
        <ul className="hide-mob" style={{display:"flex",gap:"1.3rem",
          listStyle:"none",alignItems:"center"}}>
          {NAV.map(l=>(
            <li key={l.href}>
              <a href={l.href} style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".8rem",
                color:"#c0b8d0",textDecoration:"none",letterSpacing:".03em",transition:"color .25s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#E8C06A")}
                onMouseLeave={e=>(e.currentTarget.style.color="#c0b8d0")}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Правый блок */}
        <div style={{display:"flex",alignItems:"center",gap:".65rem"}}>
          {/* [8] VK */}
          <a href="https://vk.ru/nata_draconis" target="_blank" rel="noopener noreferrer"
            title="ВКонтакте — Nata Draconis"
            style={{display:"flex",alignItems:"center",gap:".38rem",padding:".4rem .85rem",
              borderRadius:"50px",background:"rgba(70,128,194,.14)",
              border:"1px solid rgba(70,128,194,.4)",color:"#7eb8e8",textDecoration:"none",
              fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".77rem",fontWeight:600,
              transition:"all .3s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(70,128,194,.28)";
              e.currentTarget.style.boxShadow="0 4px 14px rgba(70,128,194,.24)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(70,128,194,.14)";
              e.currentTarget.style.boxShadow="none";}}>
            <IcVK s={14}/><span className="hide-mob">ВКонтакте</span>
          </a>
          <a href="#contact" className="btn btn-primary hide-mob"
            style={{padding:".5rem 1.25rem",fontSize:".82rem"}}>Заказать разбор</a>

          {/* Бургер */}
          <button className="hide-desk" onClick={toggle} aria-label="Открыть меню"
            style={{background:"none",border:"none",cursor:"pointer",
              display:"flex",flexDirection:"column",gap:"5px",padding:".4rem"}}>
            {[0,1,2].map(i=>(
              <span key={i} style={{display:"block",width:24,height:2,borderRadius:2,
                background:"#B57EDC",transition:"transform .3s, opacity .3s",
                transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"scaleX(0)"):"none",
                opacity:open&&i===1?0:1}}/>
            ))}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div style={{overflow:"hidden",maxHeight:open?560:0,transition:"max-height .42s ease",
        background:"rgba(9,5,26,.97)",borderTop:open?"1px solid rgba(181,126,220,.14)":"none"}}>
        <ul style={{listStyle:"none",padding:"1rem 1.5rem",display:"flex",flexDirection:"column",gap:".6rem"}}>
          {NAV.map(l=>(
            <li key={l.href}>
              <a href={l.href} onClick={()=>setOpen(false)}
                style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:"1rem",
                  color:"#E6D5F7",textDecoration:"none",display:"block",padding:".32rem 0"}}>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{marginTop:".5rem"}}>
            <a href="#contact" onClick={()=>setOpen(false)}
              className="btn btn-primary" style={{width:"100%",justifyContent:"center"}}>
              Заказать разбор
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════
   HERO [2][5][10]
═══════════════════════════════════════ */
function Hero(){
  const [rdy,setRdy]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setRdy(true),90);return()=>clearTimeout(t);},[]);

  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",
      justifyContent:"center",position:"relative",overflow:"hidden",
      background:"radial-gradient(ellipse at 50% 0%,#3a1660 0%,#2E1A47 25%,#150930 55%,#09051a 100%)"}}>

      <MandalaBg/>
      {/* Центральное свечение */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
        width:530,height:530,borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(107,45,139,.18) 0%,transparent 72%)",
        pointerEvents:"none",zIndex:1}}/>

      {/* Вращающееся кольцо */}
      <div style={{position:"absolute",top:"50%",left:"50%",
        width:"min(550px,88vw)",height:"min(550px,88vw)",borderRadius:"50%",
        border:"1px solid rgba(201,150,58,.12)",animation:"spin-cw 60s linear infinite",
        transformOrigin:"0 0",marginLeft:"calc(min(550px,88vw)/-2)",
        marginTop:"calc(min(550px,88vw)/-2)",zIndex:1,pointerEvents:"none"}}>
        {Array.from({length:8},(_,i)=>{
          const a=(i*45*Math.PI)/180;
          return <div key={i} style={{position:"absolute",
            top:`calc(50% + ${Math.sin(a)*48}%)`,left:`calc(50% + ${Math.cos(a)*48}%)`,
            transform:"translate(-50%,-50%)",width:7,height:7,borderRadius:"50%",
            background:i%2===0?"#C9963A":"#B57EDC",
            boxShadow:`0 0 9px ${i%2===0?"#C9963A":"#B57EDC"}`,
            animation:`twinkle ${2+i*.32}s ease-in-out infinite`,
            animationDelay:`${i*.27}s`}}/>;
        })}
      </div>

      {/* Сетка: текст + древо */}
      <div className="hero-grid" style={{position:"relative",zIndex:10,maxWidth:1100,
        margin:"0 auto",padding:"7rem 1.5rem 4rem",
        display:"grid",gridTemplateColumns:"1fr auto",gap:"3rem",alignItems:"center"}}>
        <div>
          {/* Метка */}
          <p style={{...fu(rdy,0),fontFamily:"'Montserrat',system-ui,sans-serif",
            fontSize:".72rem",letterSpacing:".25em",color:"#C9963A",
            textTransform:"uppercase",marginBottom:"1rem",
            display:"flex",alignItems:"center",gap:".6rem"}}>
            <IcStar s={13} c="#C9963A"/>
            Хранители рода · Исцеление кармы
            <IcStar s={13} c="#C9963A"/>
          </p>

          {/* [2] Заголовок */}
          <h1 style={{...fu(rdy,120),fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(2.4rem,7vw,5.4rem)",fontWeight:700,lineHeight:1.1,
            background:"linear-gradient(135deg,#E6D5F7 0%,#B57EDC 38%,#C9963A 78%,#E8C06A 100%)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            backgroundClip:"text",marginBottom:"1rem"}}>
            Матрица Судьбы:<br/>исцеление кармы рода
          </h1>

          {/* [2] Подзаголовок */}
          <p style={{...fu(rdy,240),fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(1rem,2.5vw,1.36rem)",fontStyle:"italic",
            color:"#c0b8d0",marginBottom:"1.2rem",lineHeight:1.65}}>
            Разборы проводит <strong style={{color:"#E8C06A"}}>Nata Draconis</strong> —
            родолог, помогающий раскрыть родовые силы<br className="hide-mob"/>
            и освободиться от негативных кармических программ
          </p>

          {/* Слоган */}
          <div style={{...fu(rdy,340),margin:"1.2rem 0 1.6rem",padding:"1rem 1.4rem",
            borderLeft:"2px solid rgba(201,150,58,.55)",
            background:"rgba(46,26,71,.35)",borderRadius:"0 .8rem .8rem 0"}}>
            <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",
              fontSize:"clamp(.95rem,1.8vw,1.1rem)",color:"#E6D5F7",lineHeight:1.72}}>
              «Когда ты слышишь голос своих Хранителей рода —<br/>
              ты обретаешь силу, которой тысячи лет»
            </p>
          </div>

          {/* [5][10] Цена + формат */}
          <div style={{...fu(rdy,420),display:"flex",gap:"1rem",
            flexWrap:"wrap",marginBottom:"2rem",alignItems:"stretch"}}>
            <div style={{display:"flex",alignItems:"center",gap:".85rem",
              padding:".85rem 1.4rem",background:"rgba(201,150,58,.1)",
              border:"1px solid rgba(201,150,58,.4)",borderRadius:"1rem"}}>
              <IcStar s={20} c="#C9963A"/>
              <div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                  color:"#c0b8d0"}}>Стоимость разбора</div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.7rem",
                  fontWeight:700,color:"#E8C06A",lineHeight:1}}>3 690 ₽</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:".85rem",
              padding:".85rem 1.4rem",background:"rgba(181,126,220,.08)",
              border:"1px solid rgba(181,126,220,.3)",borderRadius:"1rem"}}>
              <IcDoc s={32} c="#B57EDC"/>
              <div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                  color:"#c0b8d0"}}>Формат разбора</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".85rem",
                  color:"#E6D5F7",fontWeight:600,lineHeight:1.3}}>
                  Документ Word<br/>~150 страниц
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div style={{...fu(rdy,500),display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <a href="#contact" className="btn btn-primary">Заказать разбор</a>
            <a href="#method" className="btn btn-outline">Узнать о методе</a>
          </div>
        </div>

        {/* Древо (только десктоп) */}
        <div className="hide-mob" style={{...fr(rdy,200),display:"flex",
          justifyContent:"center",minWidth:220,animation:"floatY 7s ease-in-out infinite"}}>
          <FamilyTree/>
        </div>
      </div>

      {/* Скролл-индикатор */}
      <div style={{position:"absolute",bottom:"1.8rem",left:"50%",
        transform:"translateX(-50%)",display:"flex",flexDirection:"column",
        alignItems:"center",gap:".4rem",zIndex:10,
        animation:"scroll-bounce 2s ease-in-out infinite"}}>
        <span style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".62rem",
          letterSpacing:".2em",color:"#B57EDC",textTransform:"uppercase"}}>далее</span>
        <IcChevron s={20} c="#B57EDC"/>
      </div>

      <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent,rgba(181,126,220,.28),rgba(201,150,58,.18),transparent)"}}/>
      <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════
   О МЕТОДЕ [3] — 10 аспектов
═══════════════════════════════════════ */
function MethodSection(){
  const {ref,visible}=useReveal();

  const aspects=[
    {icon:<IcCompass s={36} c="#B57EDC"/>,title:"Личное предназначение",
      text:"Каков твой путь и какие задачи стоят перед тобой в этой жизни. Матрица показывает жизненную программу и главные уроки воплощения."},
    {icon:<IcEye s={36} c="#E6D5F7"/>,title:"Духовное предназначение",
      text:"Как раскрыть свою душу и углубить связь с высшим. Твой духовный вектор, заложенный в числах рождения."},
    {icon:<IcUnfold s={36} c="#C9963A"/>,title:"Социальное предназначение",
      text:"Как реализоваться в обществе, профессии и среди людей. Где твои силы максимально востребованы внешним миром."},
    {icon:<IcRing s={36} c="#B57EDC"/>,title:"Высшая суть",
      text:"Твоя глубинная природа и истинное «я». То, чем ты являешься на самом высоком уровне — за пределами ролей и масок."},
    {icon:<IcStar s={36} c="#E8C06A"/>,title:"Таланты и способности",
      text:"Скрытые способности и сильные стороны, данные от рождения. Твои природные дары, которые ждут раскрытия."},
    {icon:<IcCoin s={36} c="#E8C06A"/>,title:"Финансовая карма",
      text:"Какие денежные блоки и программы мешают благополучию. Финансовые ограничения из прошлых жизней и рода."},
    {icon:<IcUnfold s={36} c="#C9963A"/>,title:"Денежный канал",
      text:"Как настроить поток изобилия и процветания. Твой личный способ привлекать деньги органично и без сопротивления."},
    {icon:<IcHeart s={36} c="#C9963A"/>,title:"Любовный канал и отношения",
      text:"Как строить гармоничные отношения и какие сценарии повторяются в любви. Паттерны в партнёрстве и путь к истинной близости."},
    {icon:<IcSpiral s={36} c="#B57EDC"/>,title:"Карма прошлых жизней",
      text:"Как прошлые воплощения влияют на текущую жизнь. Незакрытые долги, незавершённые уроки и силы, принесённые из прошлого."},
    {icon:<IcKey s={36} c="#C9963A"/>,title:"Родовые программы и Хранители",
      text:"Связь с предками, исцеление негативных сценариев, передающихся из поколения в поколение. Восстановление ресурса рода."},
  ];

  return (
    <section id="method" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse at 50% 30%,rgba(46,26,71,.5) 0%,transparent 65%)"}}/>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">О методе</p>
          <h2 className="sec-title">Матрица Судьбы — система самопознания</h2>
          <div className="divider"/>
        </div>

        <div style={{maxWidth:760,margin:"0 auto 3.5rem",textAlign:"center",...fu(visible,110)}}>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:"1rem",
            color:"#c0b8d0",lineHeight:1.9,marginBottom:"1rem"}}>
            <strong style={{color:"#B57EDC"}}>Матрица Судьбы</strong> по методу Натальи Ладини —
            глубокая система самопознания, которая через числа даты рождения строит энергетическую
            карту личности и раскрывает все ключевые сферы жизни человека.
          </p>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:"1rem",
            color:"#c0b8d0",lineHeight:1.9}}>
            В работе <span style={{color:"#E8C06A"}}>Nata Draconis</span> особое место занимает тема рода:
            родовые программы, Хранители рода и кармические сценарии поколений — как основа судьбы каждого.
          </p>
        </div>

        {/* 10 аспектов */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"1.35rem"}}>
          {aspects.map((c,i)=>(
            <div key={i} className="card" style={{padding:"1.8rem 1.5rem",...fu(visible,140+i*65)}}>
              <div style={{marginBottom:".85rem"}}>{c.icon}</div>
              <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.18rem",
                color:"#E6D5F7",marginBottom:".55rem",fontWeight:600}}>{c.title}</h3>
              <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".85rem",
                color:"#b0a8c0",lineHeight:1.74}}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   20 ТЕМ РАЗБОРА [3]
═══════════════════════════════════════ */
const READING_TOPICS=[
  {n:1, short:"Вступление",      title:"Понятие «Матрицы Судьбы» и порядок проработки"},
  {n:2, short:"Твой портрет",    title:"Кто ты есть на самом деле"},
  {n:3, short:"Зона комфорта",   title:"Твоя зона комфорта"},
  {n:4, short:"Код силы",        title:"Твой код внутренней силы"},
  {n:5, short:"Высшая суть",     title:"Твоя Высшая суть"},
  {n:6, short:"Страхи и желания",title:"Твои главные страхи и самые сильные желания"},
  {n:7, short:"Самореализация",  title:"Самореализация и творческий потенциал"},
  {n:8, short:"Деньги",          title:"Твой денежный канал"},
  {n:9, short:"Любовь",          title:"Твой канал отношений и любви + совместимость с партнёром"},
  {n:10,short:"Предназначение",  title:"Твоё предназначение души (4 уровня)"},
  {n:11,short:"Карма 40 лет",    title:"Кармические задачи (Карма 40 лет) и Финансовая карма"},
  {n:12,short:"Карма рода",      title:"Детско-родительская карма"},
  {n:13,short:"Прошлые жизни",   title:"Карма прошлых жизней. Кармический хвост."},
  {n:14,short:"Сила рода",       title:"Твоя сила рода"},
  {n:15,short:"Родовая карма",   title:"Твоя родовая карма"},
  {n:16,short:"Энергии года",    title:"Энергии года"},
  {n:17,short:"Здоровье",        title:"Твоя карта здоровья (по чакрам)"},
  {n:18,short:"Нумерология",     title:"Нумерологический аспект (Число Судьбы и Число Души)"},
  {n:19,short:"Сексуальность",   title:"Твоя сексуальность"},
  {n:20,short:"Заключение",      title:"Возвращение к себе, итоговый портрет, зоны риска, «клад» и напутствие"},
];

function ReadingTopicsSection(){
  const {ref,visible}=useReveal();
  return (
    <section id="reading-topics" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"linear-gradient(180deg,transparent,rgba(21,9,48,.55) 50%,transparent)"}}/>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">Содержание разбора</p>
          <h2 className="sec-title">Что раскроет ваш разбор</h2>
          <div className="divider"/>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".95rem",
            color:"#c0b8d0",maxWidth:640,margin:"0 auto 2rem",lineHeight:1.8,...fu(visible,100)}}>
            Персональный разбор охватывает{" "}
            <strong style={{color:"#E8C06A"}}>20 глубоких тем</strong> и предоставляется в формате
            подробного документа объёмом{" "}
            <strong style={{color:"#E8C06A"}}>около 150 страниц</strong>
          </p>
        </div>

        {/* Карточки 20 тем */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1rem"}}>
          {READING_TOPICS.map((t,i)=>(
            <div key={t.n} className="card"
              style={{padding:"1.2rem 1.4rem",display:"flex",gap:"1rem",
                alignItems:"flex-start",...fs(visible,100+i*38)}}>
              <div style={{width:38,height:38,borderRadius:"50%",flexShrink:0,
                background:"linear-gradient(135deg,rgba(107,45,139,.6),rgba(74,31,106,.6))",
                border:"1px solid rgba(201,150,58,.4)",
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontSize:"1rem",fontWeight:700,color:"#E8C06A"}}>{t.n}</span>
              </div>
              <div>
                <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                  color:"#C9963A",letterSpacing:".06em",textTransform:"uppercase",
                  marginBottom:".2rem"}}>{t.short}</p>
                <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".84rem",
                  color:"#E6D5F7",lineHeight:1.55}}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA-баннер */}
        <div style={{marginTop:"3rem",
          background:"linear-gradient(135deg,rgba(46,26,71,.65),rgba(74,31,106,.4))",
          border:"1px solid rgba(201,150,58,.3)",borderRadius:"1.5rem",
          padding:"2.2rem 2rem",textAlign:"center",...fu(visible,850)}}>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",
            fontSize:"clamp(1.1rem,2.5vw,1.5rem)",color:"#E6D5F7",lineHeight:1.65,
            marginBottom:"1.5rem"}}>
            Все 20 тем — в вашем персональном документе.<br/>
            Готовый разбор, который можно перечитывать и возвращаться к нему снова.
          </p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",
            flexWrap:"wrap",alignItems:"center"}}>
            <a href="#contact" className="btn btn-primary">Заказать разбор</a>
            <div style={{padding:".65rem 1.3rem",background:"rgba(201,150,58,.12)",
              border:"1px solid rgba(201,150,58,.4)",borderRadius:"50px",
              fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".85rem",color:"#c0b8d0"}}>
              Стоимость{" "}
              <strong style={{color:"#E8C06A",fontFamily:"'Cormorant Garamond',Georgia,serif",
                fontSize:"1.15rem"}}>3 690 ₽</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ХРАНИТЕЛИ РОДА [1]
═══════════════════════════════════════ */
function AncestrySection(){
  const {ref,visible}=useReveal();
  return (
    <section id="ancestry" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"linear-gradient(180deg,transparent,rgba(21,9,48,.58) 50%,transparent)"}}/>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">Родовые силы</p>
          <h2 className="sec-title">Хранители рода</h2>
          <div className="divider"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
          gap:"3rem",alignItems:"center"}}>
          <div style={{...fl(visible,100)}}>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:"1rem",
              color:"#c0b8d0",lineHeight:1.9,marginBottom:"1.2rem"}}>
              <strong style={{color:"#B57EDC"}}>Хранители рода</strong> — это предки,
              завершившие земное существование, но продолжающие сопровождать потомков.
              Их мудрость, сила и любовь заложены в самой основе каждого человека.
            </p>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:"1rem",
              color:"#c0b8d0",lineHeight:1.9,marginBottom:"1.2rem"}}>
              Когда связь с родом прервана — через обиды, отречения или непережитые травмы —
              человек теряет доступ к этому ресурсу. Родовые программы начинают тяготить.
            </p>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:"1rem",
              color:"#c0b8d0",lineHeight:1.9,marginBottom:"2rem"}}>
              Через Матрицу Судьбы{" "}
              <span style={{color:"#E8C06A"}}>Nata Draconis</span>{" "}
              помогает восстановить эту связь — вернуть тепло рода и силу предков.
            </p>
            {[
              {icon:<IcRing s={28} c="#B57EDC"/>,title:"Целостность рода",
                text:"Понимание своего места в родовой системе"},
              {icon:<IcKey s={28} c="#C9963A"/>,title:"Доступ к ресурсу",
                text:"Восстановление связи с силой предков"},
              {icon:<IcUnfold s={28} c="#E8C06A"/>,title:"Трансформация",
                text:"Исцеление кармических программ рода"},
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:"1rem",alignItems:"flex-start",
                marginBottom:"1rem",padding:".95rem 1.2rem",
                background:"rgba(46,26,71,.35)",
                border:"1px solid rgba(181,126,220,.15)",borderRadius:"1rem"}}>
                <div style={{flexShrink:0}}>{item.icon}</div>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.04rem",
                    color:"#E6D5F7",fontWeight:600,marginBottom:".22rem"}}>{item.title}</div>
                  <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".82rem",
                    color:"#b0a8c0"}}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{...fr(visible,200)}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"2rem",
              animation:"floatY 8s ease-in-out infinite"}}>
              <FamilyTree/>
            </div>
            <div style={{background:"linear-gradient(135deg,rgba(46,26,71,.6),rgba(74,31,106,.35))",
              border:"1px solid rgba(201,150,58,.3)",borderRadius:"1.2rem",padding:"1.5rem 1.75rem"}}>
              <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",
                fontSize:"1.12rem",color:"#E6D5F7",lineHeight:1.7,marginBottom:".85rem"}}>
                «Сила твоего рода — это не то, что тебе нужно заслужить.
                Это то, что ждёт тебя с самого рождения»
              </p>
              <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".74rem",
                color:"#C9963A",letterSpacing:".08em"}}>— Nata Draconis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   О СПЕЦИАЛИСТЕ [4][5]
   Без стажа, без астрологии
═══════════════════════════════════════ */
function AboutSection(){
  const {ref,visible}=useReveal();
  const facts=[
    "Сертифицированный практик метода Матрица Судьбы по системе Натальи Ладини",
    "Родолог — специалист по работе с кармическими родовыми программами",
    "Провела более 500 индивидуальных разборов с акцентом на родовые программы",
    "Каждый разбор — подробный документ Word объёмом около 150 страниц",
    "Помогает клиентам восстановить связь с Хранителями рода и силой предков",
    "Ведёт сообщество о родовых программах ВКонтакте и TikTok",
  ];
  const stats=[
    {v:"500+",l:"разборов"},
    {v:"200+",l:"клиентов"},
    {v:"20",  l:"тем в разборе"},
    {v:"~150",l:"страниц"},
  ];
  return (
    <section id="about" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse at 80% 50%,rgba(74,31,106,.2) 0%,transparent 60%)"}}/>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">Ваш проводник</p>
          <h2 className="sec-title">Nata Draconis</h2>
          <div className="divider"/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
          gap:"3.5rem",alignItems:"center"}}>

          {/* ФОТО [4] */}
          <div style={{display:"flex",justifyContent:"center",...fl(visible,100)}}>
            <div style={{position:"relative",maxWidth:360,width:"100%"}}>
              {/* Свечение */}
              <div style={{position:"absolute",inset:-4,borderRadius:"2rem",
                background:"linear-gradient(135deg,rgba(107,45,139,.65),rgba(201,150,58,.4))",
                filter:"blur(10px)",opacity:.72,animation:"pulse-ring 4s ease-in-out infinite"}}/>
              <div style={{position:"absolute",inset:-22,borderRadius:"50%",
                border:"1px solid rgba(201,150,58,.18)",animation:"spin-cw 32s linear infinite"}}/>

              {/* ══════════════════════════════════════
                  ФОТО NATA DRACONIS
                  [4] Плейсхолдер — замените src на путь к реальному фото
                  Пример: src="/images/nata-real.jpg"
                  ══════════════════════════════════════ */}
              <div style={{position:"relative",borderRadius:"2rem",overflow:"hidden",
                border:"1.5px solid rgba(181,126,220,.35)"}}>
                {/* ФОТО NATA DRACONIS */}
                <img
                  src="/nata.jpg"
                  alt="Nata Draconis — родолог, Матрица Судьбы"
                  style={{width:"100%",height:"auto",display:"block",borderRadius:"2rem"}}
                  onError={e=>{
                    (e.currentTarget as HTMLImageElement).style.display="none";
                    const ph=e.currentTarget.nextElementSibling as HTMLElement;
                    if(ph)ph.style.display="flex";
                  }}
                />
                {/* Плейсхолдер — отображается если фото не найдено */}
                <div style={{display:"none",minHeight:380,flexDirection:"column",
                  alignItems:"center",justifyContent:"center",gap:"1rem",
                  background:"rgba(46,26,71,.5)"}}>
                  <div style={{opacity:.45}}><IcRing s={70} c="#B57EDC"/></div>
                  <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.35rem",
                    color:"#B57EDC",opacity:.65}}>Nata Draconis</p>
                  {/* ЗДЕСЬ БУДЕТ ФОТО NATA DRACONIS */}
                  <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".68rem",
                    color:"#c0b8d0",textAlign:"center",padding:"0 1.5rem",opacity:.5}}>
                    Замените src="/nata.jpg" на путь к реальному фото
                  </p>
                </div>
              </div>

              {/* Бейдж */}
              <div style={{position:"absolute",bottom:-14,right:-10,
                background:"linear-gradient(135deg,#2E1A47,#4a1f6a)",
                border:"1px solid rgba(201,150,58,.5)",borderRadius:"1rem",
                padding:".65rem 1rem",backdropFilter:"blur(10px)",textAlign:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.65rem",
                  color:"#E8C06A",fontWeight:700,lineHeight:1}}>500+</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".62rem",
                  color:"#c0b8d0",letterSpacing:".05em"}}>разборов</div>
              </div>
            </div>
          </div>

          {/* Текст [4] — без стажа и астрологии */}
          <div style={{...fr(visible,180)}}>
            <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",
              fontSize:"1.38rem",color:"#E8C06A",marginBottom:"1rem"}}>
              Родолог и проводник к силе рода
            </h3>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".95rem",
              color:"#c0b8d0",lineHeight:1.9,marginBottom:"1rem"}}>
              Путь Nata Draconis начался с личного поиска — повторяющихся жизненных сценариев,
              которые не поддавались объяснению. Именно работа с Матрицей Судьбы по методу
              Натальи Ладини открыла корень этих ситуаций: кармические программы рода.
            </p>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".95rem",
              color:"#c0b8d0",lineHeight:1.9,marginBottom:"1rem"}}>
              Сегодня Nata помогает клиентам восстановить глубинную связь с силой рода —
              найти опору в предках, услышать голос Хранителей и выйти из родовых кармических
              сценариев, тяготивших семью поколениями.
            </p>
            {/* ЗДЕСЬ МОЖНО ДОБАВИТЬ ЛИЧНУЮ ИСТОРИЮ NATA DRACONIS */}
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".95rem",
              color:"#c0b8d0",lineHeight:1.9,marginBottom:"2rem"}}>
              Каждый разбор — это не просто числа. Это подробный персональный документ Word,
              в котором человек встречается со своей судьбой и обретает то, что всегда
              принадлежало ему: силу, мудрость и любовь предков.
            </p>

            {/* [5] Формат */}
            <div style={{display:"flex",alignItems:"center",gap:"1rem",padding:"1rem 1.3rem",
              background:"rgba(181,126,220,.08)",border:"1px solid rgba(181,126,220,.3)",
              borderRadius:"1rem",marginBottom:"1.5rem"}}>
              <IcDoc s={40} c="#B57EDC"/>
              <div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                  color:"#B57EDC",letterSpacing:".06em",textTransform:"uppercase",
                  marginBottom:".2rem"}}>Формат разбора</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".9rem",
                  color:"#E6D5F7",fontWeight:600}}>
                  Текстовый документ Word · около 150 страниц
                </div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".75rem",
                  color:"#b0a8c0"}}>Готовый персональный разбор, который остаётся у вас навсегда</div>
              </div>
            </div>

            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",
              gap:".6rem",marginBottom:"2rem"}}>
              {facts.map((a,i)=>(
                <li key={i} style={{display:"flex",gap:".7rem",alignItems:"flex-start",
                  fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".83rem",color:"#c0b8d0"}}>
                  <span style={{flexShrink:0,marginTop:".15rem"}}><IcStar s={13} c="#C9963A"/></span>
                  {a}
                </li>
              ))}
            </ul>

            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",
              gap:".7rem",marginBottom:"2rem"}}>
              {stats.map((s,i)=>(
                <div key={i} style={{textAlign:"center",padding:".82rem .4rem",
                  background:"rgba(46,26,71,.4)",
                  border:"1px solid rgba(181,126,220,.18)",borderRadius:"1rem"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.5rem",
                    color:"#E8C06A",fontWeight:700}}>{s.v}</div>
                  <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".65rem",
                    color:"#b0a8c0"}}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
              <a href="#contact" className="btn btn-primary">Заказать разбор</a>
              <a href="https://vk.ru/nata_draconis" target="_blank" rel="noopener noreferrer"
                className="btn btn-outline"><IcVK s={15}/> ВКонтакте</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ОТЗЫВЫ
═══════════════════════════════════════ */
function ReviewsSection(){
  const {ref,visible}=useReveal();
  const [idx,setIdx]=useState(0);
  const reviews=[
    {name:"Анастасия М.",city:"Москва",
      text:"После разбора я наконец поняла, почему в семье из поколения в поколение повторялись одни и те же ситуации. Nata увидела программу рода — и я смогла начать её трансформацию. Документ перечитываю снова и снова, каждый раз открывая новое."},
    {name:"Елена К.",city:"Санкт-Петербург",
      text:"Разбор пришёл в формате документа на 150 страниц — невероятный объём информации! Каждая тема раскрыта глубоко и с любовью. Я узнала про своих Хранителей рода — это дало такое ощущение опоры, которого не хватало всю жизнь."},
    {name:"Ольга В.",city:"Екатеринбург",
      text:"Огромный документ с разбором всех сфер жизни — предназначение, деньги, отношения, здоровье, карма рода. Всё детально, с конкретными рекомендациями. Nata — мастер своего дела."},
    {name:"Марина Т.",city:"Минск",
      text:"Разбор изменил моё отношение к предкам. Я больше не чувствую себя одной — за спиной поддержка рода. Особенно тронули темы родовой кармы и кармы прошлых жизней — всё точно до мурашек."},
    {name:"Светлана Р.",city:"Новосибирск",
      text:"150 страниц о себе — это подарок на всю жизнь. Темы здоровья по чакрам и денежный канал перевернули моё понимание. Nata видит очень глубоко, а документ написан тепло и понятно."},
    {name:"Ирина Д.",city:"Казань",
      text:"Разбор помог разобраться с финансовыми блоками. В роду была программа «нельзя богатеть». Nata показала это через матрицу. Уже через пару месяцев ситуация начала меняться."},
  ];
  useEffect(()=>{
    const t=setInterval(()=>setIdx(i=>(i+1)%reviews.length),5000);
    return()=>clearInterval(t);
  },[reviews.length]);
  return (
    <section id="reviews" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"linear-gradient(180deg,transparent,rgba(21,9,48,.5) 50%,transparent)"}}/>
      <div ref={ref} style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">Отзывы</p>
          <h2 className="sec-title">Истории исцеления</h2>
          <div className="divider"/>
        </div>
        <div style={{position:"relative",maxWidth:820,margin:"0 auto",...fu(visible,150)}}>
          <div className="card" style={{padding:"2.5rem 2.5rem 2rem",minHeight:240,position:"relative"}}>
            <div style={{position:"absolute",top:"1.5rem",left:"1.8rem",
              fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"5rem",lineHeight:1,
              color:"rgba(181,126,220,.1)",fontWeight:700,userSelect:"none"}}>"</div>
            <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem"}}>
              <div style={{width:48,height:48,borderRadius:"50%",flexShrink:0,
                background:"linear-gradient(135deg,#6B2D8B,#C9963A)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.35rem",
                color:"#fff",fontWeight:700}}>{reviews[idx].name[0]}</div>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.08rem",
                  color:"#E6D5F7",fontWeight:600}}>{reviews[idx].name}</div>
                <div style={{display:"flex",gap:"3px",marginTop:".18rem"}}>
                  {Array.from({length:5},(_,i)=><IcStar key={i} s={12} c="#C9963A"/>)}
                  <span style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".7rem",
                    color:"#8a8aa0",marginLeft:".4rem"}}>{reviews[idx].city}</span>
                </div>
              </div>
            </div>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".9rem",
              color:"#c0b8d0",lineHeight:1.85,fontStyle:"italic",position:"relative",zIndex:1}}>
              «{reviews[idx].text}»
            </p>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:"1.2rem",alignItems:"center"}}>
            <button onClick={()=>setIdx(i=>(i-1+reviews.length)%reviews.length)}
              style={{width:40,height:40,borderRadius:"50%",cursor:"pointer",
                background:"rgba(46,26,71,.5)",border:"1px solid rgba(181,126,220,.25)",
                color:"#B57EDC",display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"1.2rem",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#C9963A";e.currentTarget.style.color="#C9963A";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(181,126,220,.25)";e.currentTarget.style.color="#B57EDC";}}
              aria-label="Предыдущий">&#8592;</button>
            <div style={{display:"flex",gap:".5rem"}}>
              {reviews.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)} aria-label={`Отзыв ${i+1}`}
                  style={{width:i===idx?22:8,height:8,borderRadius:4,border:"none",cursor:"pointer",
                    background:i===idx?"#C9963A":"rgba(181,126,220,.32)",transition:"all .35s"}}/>
              ))}
            </div>
            <button onClick={()=>setIdx(i=>(i+1)%reviews.length)}
              style={{width:40,height:40,borderRadius:"50%",cursor:"pointer",
                background:"rgba(46,26,71,.5)",border:"1px solid rgba(181,126,220,.25)",
                color:"#B57EDC",display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"1.2rem",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#C9963A";e.currentTarget.style.color="#C9963A";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(181,126,220,.25)";e.currentTarget.style.color="#B57EDC";}}
              aria-label="Следующий">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   АНКЕТА [11]
═══════════════════════════════════════ */
const QUESTIONS=[
  {n:1,q:"В какие моменты своей жизни ты чувствуешь себя наиболее уверенно и наполненно (что тебя заряжает)? А что, наоборот, выбивает из колеи, истощает и заставляет чувствовать слабость?"},
  {n:2,q:"По какому принципу ты обычно выбираешь партнёров? Какая главная проблема или ссора повторяется у тебя в разных отношениях — не только с партнёром, но и с друзьями, коллегами?"},
  {n:3,q:"Что для тебя значит быть успешной(ым) и финансово независимой(ым)? Есть ли ситуации, в которых тебе сложно просить достойную оплату за свой труд, принимать помощь или брать деньги за то, что ты делаешь с душой?"},
  {n:4,q:"Если посмотреть на жизни твоих родителей, бабушек, дедушек — что в их судьбах повторяется (например, проблемы с деньгами, ранние потери, разводы, женское или мужское одиночество)? Есть ли обиды на близких, которые ты всё ещё носишь в себе?"},
  {n:5,q:"Если бы у тебя была возможность заниматься абсолютно любым делом, не думая о деньгах и мнении окружающих, чему бы ты посвятил(а) своё время с радостью и полной отдачей?"},
  {n:6,q:"Есть ли у тебя хронические болезни или частые недомогания (например, боли в животе, горле, пояснице, головные боли)? Замечал(а) ли ты, в каких эмоциональных состояниях они обостряются?"},
  {n:7,q:"Боишься ли ты проявлять себя публично, высказывать своё истинное мнение или показывать свой талант и способности? Что именно тебя останавливает — страх осуждения, чувство, что «не так поймут», или что-то другое?"},
  {n:8,q:"Какая тревога или страх чаще всего возникают в твоей голове (например, страх быть покинутой(ым), страх не успеть, страх провала, страх быть недостаточно хорошей(им))? Повторяются ли эти чувства в разных жизненных ситуациях?"},
  {n:9,q:"Если представить, что ты через 5–10 лет оглядываешься на свою жизнь, какое самое важное личное достижение или состояние ты хотел(а) бы видеть? Что для тебя будет значить «жизнь удалась»?"},
  {n:10,q:"Как бы ты описал(а) своё текущее эмоциональное состояние одним-двумя словами? Есть ли в твоей жизни прямо сейчас что-то, что ты чувствуешь, но пока боишься признать вслух или изменить?"},
];

function QuestionnaireSection(){
  const {ref,visible}=useReveal();
  return (
    <section id="questionnaire" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse at 50% 40%,rgba(74,31,106,.38) 0%,transparent 65%)"}}/>
      <div ref={ref} style={{maxWidth:900,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">Анкета</p>
          <h2 className="sec-title">10 вопросов для точного разбора</h2>
          <div className="divider"/>
        </div>

        <div style={{maxWidth:680,margin:"0 auto 3rem",textAlign:"center",...fu(visible,100)}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"1rem",
            padding:"1rem 1.6rem",background:"rgba(201,150,58,.1)",
            border:"1px solid rgba(201,150,58,.38)",borderRadius:"1rem",marginBottom:"1.5rem"}}>
            <IcRing s={28} c="#C9963A"/>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".9rem",
              color:"#E8C06A",fontWeight:600,textAlign:"left",lineHeight:1.4}}>
              Для более точного и глубокого разбора<br/>ответьте на 10 вопросов ниже
            </p>
          </div>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".95rem",
            color:"#c0b8d0",lineHeight:1.85}}>
            Ответы помогают увидеть живую картину вашей жизни — не просто числа, а реальные
            ситуации и паттерны. Отправьте ответы вместе с заявкой на разбор.
          </p>
        </div>

        {/* Вопросы */}
        <div style={{display:"grid",gap:"1rem"}}>
          {QUESTIONS.map((q,i)=>(
            <div key={q.n} className="card"
              style={{padding:"1.4rem 1.8rem",display:"grid",gridTemplateColumns:"auto 1fr",
                gap:"1.2rem",alignItems:"flex-start",...fs(visible,110+i*55)}}>
              <div style={{width:42,height:42,borderRadius:"50%",flexShrink:0,
                background:"linear-gradient(135deg,rgba(107,45,139,.6),rgba(74,31,106,.6))",
                border:"1px solid rgba(201,150,58,.4)",
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontSize:"1.1rem",fontWeight:700,color:"#E8C06A"}}>{q.n}</span>
              </div>
              <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".9rem",
                color:"#E6D5F7",lineHeight:1.78}}>{q.q}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{marginTop:"3rem",textAlign:"center",...fu(visible,820)}}>
          <div style={{display:"inline-block",padding:"2rem 2.5rem",
            background:"linear-gradient(135deg,rgba(46,26,71,.65),rgba(74,31,106,.4))",
            border:"1px solid rgba(201,150,58,.3)",borderRadius:"1.5rem"}}>
            <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontStyle:"italic",
              fontSize:"clamp(1.05rem,2.2vw,1.4rem)",color:"#E6D5F7",
              lineHeight:1.68,marginBottom:"1.5rem"}}>
              Готовы? Заполните анкету и вставьте ответы в форму ниже —<br/>
              разбор будет максимально точным и полезным
            </p>
            <div style={{display:"flex",gap:"1rem",justifyContent:"center",
              flexWrap:"wrap",alignItems:"center"}}>
              <a href="#contact" className="btn btn-primary">Заказать разбор</a>
              <div style={{padding:".65rem 1.3rem",background:"rgba(201,150,58,.12)",
                border:"1px solid rgba(201,150,58,.4)",borderRadius:"50px",
                fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".85rem",color:"#c0b8d0"}}>
                Стоимость{" "}
                <strong style={{color:"#E8C06A",fontFamily:"'Cormorant Garamond',Georgia,serif",
                  fontSize:"1.15rem"}}>3 690 ₽</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   КОНТАКТЫ + ФОРМА FORMSPREE [12][5][10]
═══════════════════════════════════════ */
function ContactSection(){
  const {ref,visible}=useReveal();

  /**
   * [12] Formspree интеграция
   * action="https://formspree.io/f/xqpklgbg"
   * Статусы: idle | sending | success | error
   */
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setStatus("sending");
    const form=e.currentTarget;
    const data=new FormData(form);
    try{
      const res=await fetch("https://formspree.io/f/xqpklgbg",{
        method:"POST",
        body:data,
        headers:{Accept:"application/json"},
      });
      if(res.ok){
        setStatus("success");
        form.reset();
        setTimeout(()=>setStatus("idle"),6000);
      }else{
        setStatus("error");
        setTimeout(()=>setStatus("idle"),5000);
      }
    }catch{
      setStatus("error");
      setTimeout(()=>setStatus("idle"),5000);
    }
  };

  return (
    <section id="contact" style={{position:"relative",zIndex:5,padding:"6rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse at 25% 60%,rgba(107,45,139,.14) 0%,transparent 55%)"}}/>
      <div ref={ref} style={{maxWidth:960,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:"1rem",...fu(visible)}}>
          <p className="sec-label">Записаться</p>
          <h2 className="sec-title">Заказать разбор</h2>
          <div className="divider"/>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".95rem",
            color:"#c0b8d0",maxWidth:520,margin:"0 auto",...fu(visible,100),lineHeight:1.8}}>
            Оставьте заявку — Nata Draconis свяжется с вами для уточнения деталей.
          </p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:"2rem",marginTop:"3rem"}}>

          {/* [12] Форма Formspree */}
          <div style={{...fl(visible,150)}}>
            <div className="card" style={{padding:"2rem 1.8rem"}}>
              {/* Статус: успех */}
              {status==="success"&&(
                <div style={{textAlign:"center",padding:"2.5rem 1rem"}}>
                  <div style={{marginBottom:"1rem",display:"flex",justifyContent:"center"}}>
                    <IcRing s={60} c="#C9963A"/>
                  </div>
                  <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.6rem",
                    color:"#E8C06A",marginBottom:".7rem"}}>Заявка успешно отправлена</h3>
                  <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".88rem",
                    color:"#c0b8d0",lineHeight:1.7}}>
                    Спасибо, ваши данные переданы через Formspree.
                    <br/>Nata Draconis свяжется с вами в ближайшее время.
                    <br/>Хранители рода уже ждут встречи.
                  </p>
                </div>
              )}
              {/* Статус: ошибка */}
              {status==="error"&&(
                <div style={{padding:".85rem 1rem",marginBottom:"1rem",
                  background:"rgba(180,50,50,.15)",border:"1px solid rgba(220,80,80,.3)",
                  borderRadius:".75rem",textAlign:"center",
                  fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".85rem",
                  color:"#f4a0a0"}}>
                  Ошибка отправки. Попробуйте ещё раз или напишите напрямую в ВКонтакте.
                </div>
              )}
              {/* Форма */}
              {(status==="idle"||status==="sending"||status==="error")&&(
                <form
                  onSubmit={handleSubmit}
                  /* [12] Formspree action и method */
                  action="https://formspree.io/f/xqpklgbg"
                  method="POST"
                  style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>

                  {/* Скрытое поле для темы письма */}
                  <input type="hidden" name="_subject" value="Заявка на разбор Матрицы Судьбы" />

                  {/* Имя */}
                  <div>
                    <label style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".74rem",
                      color:"#B57EDC",display:"block",marginBottom:".38rem",
                      letterSpacing:".06em"}}>Ваше имя *</label>
                    <input type="text" name="name" required
                      placeholder="Как вас зовут?"
                      className="field"/>
                  </div>

                  {/* Контактные данные */}
                  <div>
                    <label style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".74rem",
                      color:"#B57EDC",display:"block",marginBottom:".38rem",
                      letterSpacing:".06em"}}>Контактные данные (Email / ВК / TikTok) *</label>
                    <input type="text" name="contact" required
                      placeholder="Как с вами связаться?"
                      className="field"/>
                  </div>

                  {/* Сообщение */}
                  <div>
                    <label style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".74rem",
                      color:"#B57EDC",display:"block",marginBottom:".38rem",
                      letterSpacing:".06em"}}>Сообщение / ответы на анкету</label>
                    <textarea name="message"
                      placeholder="Опишите ситуацию или вставьте ответы на анкету из 10 вопросов..."
                      className="field" rows={5}/>
                  </div>

                  <button type="submit" className="btn btn-primary"
                    disabled={status==="sending"}
                    style={{justifyContent:"center",border:"none",width:"100%",
                      opacity:status==="sending"?.7:1,
                      cursor:status==="sending"?"not-allowed":"pointer"}}>
                    {status==="sending"?"Отправляется...":"Отправить заявку"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Контактный блок */}
          <div style={{display:"flex",flexDirection:"column",gap:"1.1rem",...fr(visible,200)}}>

            {/* [10] Цена + [5] Формат */}
            <div style={{padding:"1.4rem 1.6rem",
              background:"linear-gradient(135deg,rgba(201,150,58,.12),rgba(46,26,71,.5))",
              border:"1px solid rgba(201,150,58,.4)",borderRadius:"1.2rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:".8rem"}}>
                <IcStar s={28} c="#C9963A"/>
                <div>
                  <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                    color:"#c0b8d0"}}>Стоимость индивидуального разбора</div>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"2.1rem",
                    fontWeight:700,color:"#E8C06A",lineHeight:1}}>3 690 ₽</div>
                </div>
              </div>
              {/* [5] без созвона — только Word */}
              <div style={{display:"flex",alignItems:"center",gap:".75rem",
                padding:".7rem 1rem",background:"rgba(181,126,220,.08)",
                border:"1px solid rgba(181,126,220,.2)",borderRadius:".85rem"}}>
                <IcDoc s={28} c="#B57EDC"/>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".82rem",
                  color:"#E6D5F7"}}>
                  Формат: <strong>документ Word · около 150 страниц</strong>
                </div>
              </div>
            </div>

            {/* [8] VK */}
            <a href="https://vk.ru/nata_draconis" target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",gap:"1rem",padding:"1.2rem 1.4rem",
                background:"rgba(46,26,71,.4)",border:"1px solid rgba(70,128,194,.3)",
                borderRadius:"1.2rem",textDecoration:"none",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(70,128,194,.65)";
                e.currentTarget.style.background="rgba(70,128,194,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(70,128,194,.3)";
                e.currentTarget.style.background="rgba(46,26,71,.4)";}}>
              <div style={{width:46,height:46,borderRadius:".9rem",flexShrink:0,
                background:"linear-gradient(135deg,#3a7bd5,#2d5aa8)",
                display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                <IcVK s={20}/>
              </div>
              <div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".88rem",
                  color:"#E6D5F7",fontWeight:600}}>ВКонтакте</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".75rem",
                  color:"#7eb8e8"}}>vk.ru/nata_draconis</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".7rem",
                  color:"#b0a8c0"}}>Сообщество Nata Draconis</div>
              </div>
            </a>

            {/* [8] TikTok */}
            <a href="https://www.tiktok.com/@nata_draconis?_r=1&_t=ZP-99SXXillCLW"
              target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",gap:"1rem",padding:"1.2rem 1.4rem",
                background:"rgba(46,26,71,.4)",border:"1px solid rgba(255,255,255,.12)",
                borderRadius:"1.2rem",textDecoration:"none",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.3)";
                e.currentTarget.style.background="rgba(255,255,255,.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.12)";
                e.currentTarget.style.background="rgba(46,26,71,.4)";}}>
              <div style={{width:46,height:46,borderRadius:".9rem",flexShrink:0,
                background:"linear-gradient(135deg,#010101,#2d2d2d)",
                display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                <IcTikTok s={20}/>
              </div>
              <div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".88rem",
                  color:"#E6D5F7",fontWeight:600}}>TikTok</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".75rem",
                  color:"#d0d0d0"}}>@nata_draconis</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".7rem",
                  color:"#b0a8c0"}}>Видео о Матрице Судьбы и роде</div>
              </div>
            </a>

            {/* [5] Как проходит — без созвона */}
            <div style={{background:"rgba(46,26,71,.4)",border:"1px solid rgba(201,150,58,.2)",
              borderRadius:"1.2rem",padding:"1.4rem"}}>
              <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".7rem",
                letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",
                marginBottom:"1rem"}}>Как проходит разбор</p>
              {[
                {n:"01",t:"Заявка",d:"Заполните форму, прикрепите ответы на анкету"},
                {n:"02",t:"Связь",  d:"Nata свяжется в течение 24 часов, уточнит детали"},
                {n:"03",t:"Оплата",d:"Подтверждаете заказ — стоимость 3 690 ₽"},
                {n:"04",t:"Разбор", d:"Получаете документ Word · около 150 страниц"},
              ].map(s=>(
                <div key={s.n} style={{display:"flex",gap:".85rem",
                  marginBottom:".85rem",alignItems:"flex-start"}}>
                  <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.18rem",
                    color:"#C9963A",fontWeight:700,minWidth:28,lineHeight:1}}>{s.n}</span>
                  <div>
                    <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".82rem",
                      color:"#E6D5F7",fontWeight:600}}>{s.t}</div>
                    <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".75rem",
                      color:"#b0a8c0"}}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   БЛОК СОЦСЕТЕЙ [8]
═══════════════════════════════════════ */
function SocialSection(){
  const {ref,visible}=useReveal();
  const TIKTOK="https://www.tiktok.com/@nata_draconis?_r=1&_t=ZP-99SXXillCLW";
  return (
    <section style={{position:"relative",zIndex:5,padding:"4rem 1.5rem"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",
        background:"linear-gradient(180deg,transparent,rgba(46,26,71,.22),transparent)"}}/>
      <div ref={ref} style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
        <div style={{...fu(visible)}}>
          <p className="sec-label" style={{marginBottom:".75rem"}}>Сообщество</p>
          <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(1.6rem,4vw,2.4rem)",fontWeight:700,color:"#E6D5F7",
            marginBottom:".75rem"}}>
            Подписывайся на сообщество
          </h2>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".9rem",
            color:"#c0b8d0",lineHeight:1.8,maxWidth:520,margin:"0 auto 2rem"}}>
            Разборы, истории трансформации, практики работы с родом и Хранителями —
            в сообществах ВКонтакте и TikTok
          </p>
        </div>
        <div style={{display:"flex",gap:"1.25rem",justifyContent:"center",
          flexWrap:"wrap",...fu(visible,150)}}>
          {/* VK */}
          <a href="https://vk.ru/nata_draconis" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:".85rem",padding:"1.1rem 2rem",
              background:"rgba(70,128,194,.15)",border:"1px solid rgba(70,128,194,.4)",
              borderRadius:"1rem",textDecoration:"none",transition:"all .35s",
              minWidth:200,justifyContent:"center"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(70,128,194,.28)";
              e.currentTarget.style.transform="translateY(-3px)";
              e.currentTarget.style.boxShadow="0 10px 30px rgba(70,128,194,.25)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(70,128,194,.15)";
              e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <div style={{width:40,height:40,borderRadius:".7rem",
              background:"linear-gradient(135deg,#3a7bd5,#2d5aa8)",
              display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
              <IcVK s={20}/>
            </div>
            <div style={{textAlign:"left"}}>
              <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".88rem",
                color:"#E6D5F7",fontWeight:600}}>ВКонтакте</div>
              <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                color:"#7eb8e8"}}>vk.ru/nata_draconis</div>
            </div>
          </a>
          {/* TikTok */}
          <a href={TIKTOK} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:".85rem",padding:"1.1rem 2rem",
              background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.15)",
              borderRadius:"1rem",textDecoration:"none",transition:"all .35s",
              minWidth:200,justifyContent:"center"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.12)";
              e.currentTarget.style.transform="translateY(-3px)";
              e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";
              e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <div style={{width:40,height:40,borderRadius:".7rem",
              background:"linear-gradient(135deg,#010101,#2d2d2d)",
              display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
              <IcTikTok s={20}/>
            </div>
            <div style={{textAlign:"left"}}>
              <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".88rem",
                color:"#E6D5F7",fontWeight:600}}>TikTok</div>
              <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".72rem",
                color:"#d0d0d0"}}>@nata_draconis</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ПОДВАЛ [8] — только VK + TikTok
═══════════════════════════════════════ */
function Footer(){
  const year=new Date().getFullYear();
  const TIKTOK="https://www.tiktok.com/@nata_draconis?_r=1&_t=ZP-99SXXillCLW";
  const footerNav=[
    {href:"#method",         label:"О методе"},
    {href:"#reading-topics", label:"Темы разбора"},
    {href:"#ancestry",       label:"Хранители рода"},
    {href:"#about",          label:"О специалисте"},
    {href:"#reviews",        label:"Отзывы"},
    {href:"#questionnaire",  label:"Анкета"},
    {href:"#contact",        label:"Контакты"},
  ];
  return (
    <footer style={{position:"relative",zIndex:5,background:"rgba(9,5,26,.94)",
      borderTop:"1px solid rgba(181,126,220,.14)",padding:"3rem 1.5rem 2rem"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
          gap:"2rem",marginBottom:"2.5rem"}}>
          {/* Лого */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:".65rem",marginBottom:".85rem"}}>
              <IcRing s={30} c="#C9963A"/>
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.08rem",
                  color:"#E6D5F7",fontWeight:700}}>Матрица Судьбы</div>
                <div style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".57rem",
                  letterSpacing:".15em",color:"#C9963A",textTransform:"uppercase"}}>
                  Nata Draconis
                </div>
              </div>
            </div>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".77rem",
              color:"#8a8aa0",lineHeight:1.72,maxWidth:210}}>
              Разборы Матрицы Судьбы по методу Натальи Ладини.
              Документ Word · ~150 страниц.
              Родовые программы и Хранители рода.
            </p>
          </div>
          {/* Навигация */}
          <div>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".68rem",
              letterSpacing:".14em",textTransform:"uppercase",color:"#B57EDC",
              marginBottom:"1rem"}}>Навигация</p>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".48rem"}}>
              {footerNav.map(l=>(
                <li key={l.href}>
                  <a href={l.href}
                    style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".8rem",
                      color:"#8a8aa0",textDecoration:"none",transition:"color .25s"}}
                    onMouseEnter={e=>e.currentTarget.style.color="#E8C06A"}
                    onMouseLeave={e=>e.currentTarget.style.color="#8a8aa0"}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* [8] Только VK + TikTok */}
          <div>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".68rem",
              letterSpacing:".14em",textTransform:"uppercase",color:"#B57EDC",
              marginBottom:".5rem"}}>Подписывайся</p>
            <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".75rem",
              color:"#8a8aa0",lineHeight:1.6,marginBottom:"1rem"}}>
              Разборы, практики и истории трансформации
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:".6rem"}}>
              <a href="https://vk.ru/nata_draconis" target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",gap:".55rem",textDecoration:"none",
                  color:"#8a8aa0",fontFamily:"'Montserrat',system-ui,sans-serif",
                  fontSize:".82rem",transition:"color .25s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#7eb8e8"}
                onMouseLeave={e=>e.currentTarget.style.color="#8a8aa0"}>
                <div style={{width:28,height:28,borderRadius:".55rem",
                  background:"rgba(70,128,194,.22)",
                  display:"flex",alignItems:"center",justifyContent:"center",color:"#4680C2"}}>
                  <IcVK s={14}/>
                </div>
                ВКонтакте
              </a>
              <a href={TIKTOK} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",gap:".55rem",textDecoration:"none",
                  color:"#8a8aa0",fontFamily:"'Montserrat',system-ui,sans-serif",
                  fontSize:".82rem",transition:"color .25s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#e0e0e0"}
                onMouseLeave={e=>e.currentTarget.style.color="#8a8aa0"}>
                <div style={{width:28,height:28,borderRadius:".55rem",
                  background:"rgba(255,255,255,.08)",
                  display:"flex",alignItems:"center",justifyContent:"center",color:"#d0d0d0"}}>
                  <IcTikTok s={14}/>
                </div>
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div style={{borderTop:"1px solid rgba(181,126,220,.11)",paddingTop:"1.5rem",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          flexWrap:"wrap",gap:".75rem"}}>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".7rem",
            color:"rgba(138,138,160,.55)"}}>
            &copy; {year} Матрица Судьбы &middot; Nata Draconis. Все права защищены.
          </p>
          <p style={{fontFamily:"'Montserrat',system-ui,sans-serif",fontSize:".7rem",
            color:"rgba(138,138,160,.35)"}}>
            Хранители рода &middot; Исцеление кармы
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   ГЛОБАЛЬНЫЕ CSS-АНИМАЦИИ И КЛАССЫ
═══════════════════════════════════════ */
const G=`
@keyframes twinkle{0%,100%{opacity:.15;transform:scale(.78);}50%{opacity:.9;transform:scale(1.25);}}
@keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
@keyframes spin-cw{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes pulse-ring{0%,100%{opacity:.45;transform:scale(1);}50%{opacity:.82;transform:scale(1.04);}}
@keyframes scroll-bounce{
  0%,100%{transform:translateX(-50%) translateY(0);opacity:.62;}
  50%{transform:translateX(-50%) translateY(8px);opacity:1;}
}
/* ── Базовые стили ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;overflow-x:hidden;}
body{
  font-family:'Montserrat',system-ui,sans-serif;
  background:#09051a;color:#E6D5F7;overflow-x:hidden;line-height:1.75;
}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:#09051a;}
::-webkit-scrollbar-thumb{background:#6B2D8B;border-radius:3px;}
::selection{background:rgba(107,45,139,.45);color:#E6D5F7;}
/* ── Типографика утилиты ── */
.sec-label{
  font-family:'Montserrat',system-ui,sans-serif;
  font-size:.72rem;letter-spacing:.25em;text-transform:uppercase;
  color:#C9963A;margin-bottom:.5rem;display:block;
}
.sec-title{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:clamp(2rem,5vw,3.2rem);font-weight:700;
  background:linear-gradient(135deg,#E6D5F7,#B57EDC,#E8C06A);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:1rem;display:block;
}
.divider{
  width:72px;height:1.5px;
  background:linear-gradient(90deg,transparent,#C9963A,#B57EDC,transparent);
  margin:0 auto 2.5rem;
}
/* ── Кнопки ── */
.btn{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.8rem 2rem;border-radius:50px;
  font-family:'Montserrat',system-ui,sans-serif;
  font-size:.88rem;font-weight:600;letter-spacing:.04em;
  text-decoration:none;cursor:pointer;border:none;
  transition:transform .3s ease,box-shadow .3s ease;
  position:relative;overflow:hidden;
}
.btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.07);
  opacity:0;transition:opacity .3s;}
.btn:hover::after{opacity:1;}
.btn:hover{transform:translateY(-2px);}
.btn-primary{
  background:linear-gradient(135deg,#6B2D8B 0%,#4a1f6a 50%,#C9963A 100%);
  color:#fff;box-shadow:0 4px 20px rgba(107,45,139,.35);
}
.btn-primary:hover{box-shadow:0 8px 32px rgba(107,45,139,.55),0 0 0 1px rgba(201,150,58,.4);}
.btn-outline{
  background:transparent!important;color:#B57EDC!important;
  border:1px solid rgba(181,126,220,.5)!important;
}
.btn-outline:hover{border-color:#C9963A!important;color:#E8C06A!important;
  box-shadow:0 4px 20px rgba(201,150,58,.2);}
/* ── Карточки ── */
.card{
  background:rgba(46,26,71,.4);backdrop-filter:blur(14px);
  border:1px solid rgba(181,126,220,.18);border-radius:1.5rem;
  transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease;
}
.card:hover{transform:translateY(-5px);border-color:rgba(201,150,58,.38);
  box-shadow:0 16px 48px rgba(46,26,71,.55),0 0 24px rgba(201,150,58,.1);}
/* ── Поля формы ── */
.field{
  width:100%;padding:.85rem 1.2rem;
  background:rgba(46,26,71,.45);border:1px solid rgba(181,126,220,.28);
  border-radius:.85rem;color:#E6D5F7;
  font-family:'Montserrat',system-ui,sans-serif;font-size:.9rem;
  outline:none;transition:border-color .3s,box-shadow .3s;display:block;
}
.field::placeholder{color:rgba(181,126,220,.45);}
.field:focus{border-color:#C9963A;box-shadow:0 0 0 3px rgba(201,150,58,.12);}
textarea.field{resize:vertical;min-height:130px;}
/* ── Адаптив ── */
@media(max-width:768px){.hide-mob{display:none!important;}}
@media(min-width:769px){.hide-desk{display:none!important;}}
`;

/* ═══════════════════════════════════════
   ГЛАВНЫЙ КОМПОНЕНТ
═══════════════════════════════════════ */
export default function App(){
  return (
    <div style={{position:"relative",minHeight:"100vh",
      background:"linear-gradient(180deg,#09051a 0%,#150930 25%,#09051a 60%,#070310 100%)"}}>

      {/* Глобальные стили и анимации */}
      <style>{G}</style>

      {/* Звёздный фон */}
      <StarCanvas/>

      {/* Навигация [6] без «Обучения» */}
      <Navbar/>

      <main style={{position:"relative",zIndex:5}}>
        {/* [2][5][10] Hero */}
        <Hero/>
        {/* [3] О методе — 10 аспектов */}
        <MethodSection/>
        {/* [3] 20 тем разбора */}
        <ReadingTopicsSection/>
        {/* [1] Хранители рода */}
        <AncestrySection/>
        {/* [4][5] О специалисте */}
        <AboutSection/>
        {/* Отзывы */}
        <ReviewsSection/>
        {/* [11] Анкета */}
        <QuestionnaireSection/>
        {/* [12][5][10] Контакты + Formspree */}
        <ContactSection/>
        {/* [8] VK + TikTok */}
        <SocialSection/>
      </main>

      {/* Подвал [8] */}
      <Footer/>
    </div>
  );
}
