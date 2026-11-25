import {useRef} from "react";
import {ArrowDown,ArrowDownToLine,ArrowUpRight,MapPin} from "lucide-react";
import Atlas,{type AtlasHandle} from "./Atlas";
import {profile} from "../data/portfolio";

function Scout(){
  return <svg className="scout" viewBox="0 0 80 72" aria-hidden="true">
    <ellipse cx="40" cy="64" rx="23" ry="4" fill="#633e27" opacity=".22"/>
    <g className="scout-body" stroke="#453227" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M34 44l-6 16-7 1m25-17 7 13 7 1" fill="none"/>
      <path d="M36 18l-2-9" fill="none"/><circle cx="33" cy="7" r="3" fill="#cc7351"/>
      <path d="M16 22l9-8 35 4 5 25-11 9-36-4z" fill="#bd7651"/><path d="M16 22l37 5 7-9-35-4z" fill="#f3d5ac"/>
      <path d="M53 27l12-8 2 23-13 10z" fill="#b38361"/>
      <path d="M20 28l28 4 1 13-28-4z" fill="#40382b"/>
      <g className="scout-eyes" fill="#f7ce90" stroke="none"><path d="M26 31h3v6h-3zM39 33h3v6h-3z"/></g>
      <path d="M17 36l-6 2-3-6m57 5 6-5 2-5" fill="none" strokeLinecap="round"/>
    </g></svg>
}
export default function Arrival(){
  const atlas=useRef<AtlasHandle>(null);
  return <section id="home" className="hero wrap arrival" onPointerMove={e=>{
    if(e.pointerType!=='mouse')return;
    const b=e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--look',String(Math.max(-1,Math.min(1,2*(e.clientX-b.left)/b.width-1))));
  }} onPointerLeave={e=>e.currentTarget.style.removeProperty('--look')}>
    <div className="hero-layout"><div className="hero-copy">
      <p className="eyebrow main-label"><span/>Hero Jhoey B. Retuerma</p>
      <h1><span className="title-mask"><b>Hello, I’m</b></span><span className="title-mask"><em>Hero.</em><svg className="pen-trail" viewBox="0 0 190 54" aria-hidden="true"><path pathLength="1" d="M3 41c36-11 85-18 103-16 30 4-11 20-14 11-4-16 49-31 92-29m-17-3 17 3-12 11"/></svg></span></h1>
      <p className="intro">I build software, test how it behaves, and help people get it working again. This is my field atlas, from Flutter development to backend support in Metro Manila.</p>
      <button className="tour-ticket" onClick={()=>atlas.current?.startTour()}><Scout/><span><small>FIELD PASS / ADMIT ONE</small><strong>Tour my career atlas</strong></span><i aria-hidden="true"><ArrowUpRight size={20}/></i></button>
      <div className="arrival-links"><a href="#work">Explore my work <ArrowDown size={15}/></a><a href={profile.resume} download><ArrowDownToLine size={15}/> Download résumé</a></div>
    </div><Atlas ref={atlas}/></div>
    <div className="hero-foot"><span><i className="led"/> L1 Backend Support at PLDT</span><span><MapPin size={14}/> Makati City, PH</span><a href="#experience">Open field notes <ArrowDown size={14}/></a></div>
  </section>
}
