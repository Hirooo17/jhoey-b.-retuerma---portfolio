import { useState } from "react";
import { AudioLines, Pause, Play, Layers, Fingerprint, ShieldCheck, ScanLine } from "lucide-react";

function Selector({labels,value,onChange}:{labels:string[];value:number;onChange:(i:number)=>void}){
  return <div className="stage-choices">{labels.map((label,i)=><button key={label} aria-pressed={value===i} onClick={()=>onChange(i)}>{label}</button>)}</div>
}
function Signal(){
  const [gain,setGain]=useState(58),[running,setRunning]=useState(false);
  const signal=(i:number)=>Array.from({length:201},(_,k)=>{
    const x=k*3, env=.12+Math.exp(-((x-290)**2)/15500);
    return x+','+(100+i*1.6+gain*env*Math.sin(x/(16+i*.13)+i*.16)*Math.cos(x/73+i*.08)).toFixed(1);
  }).join(' ');
  return <div className={'signal-installation '+(running?'sweeping':'')}><div className="stage-kicker"><AudioLines/> Synthetic Voice Detection</div><div className="scope-screen"><svg viewBox="0 0 600 230" role="img" aria-label={'Illustrative waveform at gain '+gain}><path d="M0 117h600" stroke="currentColor" opacity=".3"/>{Array.from({length:24},(_,i)=><polyline key={i} points={signal(i)} fill="none" stroke="currentColor" strokeWidth="1"/>)}</svg><i className="sweep-head"/></div><div className="scope-controls"><button onClick={()=>setRunning(!running)}>{running?<Pause/>:<Play/>}{running?'Freeze sweep':'Run sweep'}</button><label>Gain <input aria-label="Waveform gain" type="range" min="12" max="88" value={gain} onChange={e=>setGain(+e.target.value)}/></label></div><small>Generated waveform study · no audio classification</small></div>
}
function ReportRoute(){
  const [step,setStep]=useState(0);const xs=[94,287,490],ys=[145,75,123];
  return <div className="report-installation"><div className="stage-kicker">Clean.com / Reporting flow</div><svg viewBox="0 0 600 210" role="img" aria-label={'Report stage '+(step+1)}><g stroke="#798774" fill="#c5cfb7" transform="rotate(-12 300 100)">{Array.from({length:42},(_,i)=><rect key={i} x={i%7*103-30} y={Math.floor(i/7)*52-54} width="86" height="38" rx="4"/>)}</g><path d="M94 145V75h193v48h203" fill="none" stroke="#f7f2de" strokeWidth="13"/><path d="M94 145V75h193v48h203" fill="none" stroke="#54694f" strokeWidth="3" strokeDasharray="5 4"/>{xs.map((x,i)=><circle key={x} cx={x} cy={ys[i]} r="9" fill="#f8edd5" stroke="#52664c"/>)}<g style={{transform:'translate('+xs[step]+'px,'+ys[step]+'px)'}} className="report-pin"><path d="M0 0q-23-22-15-36c7-13 26-13 32 0Q23-23 0 0" fill="#954727"/><circle cy="-29" r="6" fill="#fff2da"/></g></svg><Selector labels={['Resident intake','Admin review','Status tracking']} value={step} onChange={setStep}/><small>Illustrated lifecycle · select a stage</small></div>
}
function Phone(){
  const [screen,setScreen]=useState(0);
  return <div className="phone-installation"><div><img className="app-mark" src="/exhibits/goparent.png" alt="GoParent app mark" loading="lazy"/><h4>GoParent</h4><p>Two entry points into the family app.</p><Selector labels={['New account','Returning user']} value={screen} onChange={setScreen}/><small>Captured from the public Flutter web app</small></div><div className="phone-frame"><img key={screen} src={screen?'/exhibits/goparent-returning.jpg':'/exhibits/goparent-login.jpg'} width="390" height="780" loading="lazy" alt={screen?'Actual GoParent login screen':'Actual GoParent account creation screen'}/></div></div>
}
function Dental(){
  const [view,setView]=useState(0);const items=[['booking','Appointment','AppointmentViewerForm.vb'],['patient','Patient','Patient.vb'],['history','History','Patient_history.vb']];
  return <div className="dental-installation"><div className="stage-kicker">Dental Management System / Resource cabinet</div><div className="resource-sample" key={view}><div><span>PLATE 0{view+1}</span><img width="110" height="110" src={'/exhibits/'+items[view][0]+'.png'} alt={items[view][0]+' graphic from the project'} loading="lazy"/></div><div><h4>{items[view][1]}</h4><code>{items[view][2]}</code></div></div><Selector labels={items.map(it=>it[1])} value={view} onChange={setView}/><small>Original project resources paired with related source forms</small></div>
}
function Portfolio(){
 const [mobile,setMobile]=useState(0);
 return <div className="portfolio-installation"><div className="stage-kicker">Personal portfolio / Responsive plates</div><div className={'capture-frame '+(mobile?'narrow':'')}><img loading="lazy" src={'/exhibits/portfolio-'+(mobile?'mobile':'desktop')+'.jpg'} alt={'Portfolio home page captured at '+(mobile?'375':'1440')+' pixels wide'}/></div><Selector labels={['Desktop','Mobile']} value={mobile} onChange={setMobile}/><small>Actual browser captures from this edition</small></div>
}
function Dossier(){
 const [lens,setLens]=useState(0);const Icon=[Layers,ScanLine,ShieldCheck][lens];
 return <div className="dossier-installation"><div className="stage-kicker"><Fingerprint/>Withcenter Inc. / Contract dossier</div><div className="scope-letter" key={lens}><Icon size={42}/><div><small>PUBLIC ROLE OUTLINE</small><h4>{['Flutter development','Quality assurance','Backend security'][lens]}</h4><p>{['Collaborative development of a mobile app for a BPO company.','QA responsibilities alongside collaborative Flutter development.','Contribution to backend security features within the team.'][lens]}</p></div></div><Selector labels={['Development','QA','Security']} value={lens} onChange={setLens}/></div>
}
export default function ExhibitStage({art}:{art:string}){switch(art){case 'audio':return <Signal/>;case 'map':return <ReportRoute/>;case 'steps':return <Phone/>;case 'dental':return <Dental/>;case 'type':return <Portfolio/>;default:return <Dossier/>;}}
