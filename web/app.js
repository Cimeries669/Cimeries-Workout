const DAYS=[
{id:"monday",name:"Lunes",short:"Lun",label:"Push · Pecho, hombro y tríceps"},
{id:"tuesday",name:"Martes",short:"Mar",label:"Pull · Espalda y bíceps"},
{id:"wednesday",name:"Miércoles",short:"Mié",label:"Piernas A · Cuádriceps"},
{id:"thursday",name:"Jueves",short:"Jue",label:"Descanso / movilidad"},
{id:"friday",name:"Viernes",short:"Vie",label:"Upper · Torso completo"},
{id:"saturday",name:"Sábado",short:"Sáb",label:"Piernas B · Glúteos e isquios"},
{id:"sunday",name:"Domingo",short:"Dom",label:"Libre"}
];
const SEED=[
["Press de pecho en máquina","Pecho","Máquina",3,6,10,2,150,["monday","friday"],"Escápulas apoyadas, recorrido controlado."],
["Press inclinado en máquina","Pecho","Máquina",3,8,12,2,120,["monday"],"Controla la bajada y usa recorrido cómodo."],
["Press de hombros en máquina","Hombros","Máquina",3,8,12,2,120,["monday"],"Ajusta el asiento a la altura de hombros."],
["Pec deck / mariposa","Pecho","Máquina",2,10,15,1,90,["monday","friday"],"Junta los brazos y vuelve lento."],
["Elevación lateral en máquina o polea","Hombros","Máquina / polea",3,12,20,1,75,["monday","friday"],"Evita encoger trapecios."],
["Extensión de tríceps en polea","Tríceps","Polea",3,10,15,1,90,["monday"],"Codos pegados al cuerpo."],
["Jalón al pecho","Espalda","Máquina / polea",3,6,10,2,150,["tuesday","friday"],"Pecho alto y codos hacia abajo."],
["Remo sentado en máquina","Espalda","Máquina",3,8,12,2,120,["tuesday","friday"],"Tira con control y no balancees el tronco."],
["Pullover en máquina o polea","Espalda","Máquina / polea",2,10,15,1,90,["tuesday"],"Siente el dorsal y evita impulso."],
["Reverse pec deck","Deltoide posterior","Máquina",3,12,20,1,90,["tuesday"],"Abre hacia atrás sin subir hombros."],
["Curl de bíceps en máquina","Bíceps","Máquina",3,8,12,1,90,["tuesday"],"Controla la bajada."],
["Curl en polea con cuerda","Bíceps","Polea",2,10,15,1,90,["tuesday"],"Agarre neutro y muñecas firmes."],
["Prensa de piernas o Hack squat","Cuádriceps","Máquina",3,6,10,2,150,["wednesday"],"Lumbar apoyada y profundidad cómoda."],
["Extensión de piernas","Cuádriceps","Máquina",3,10,15,1,90,["wednesday"],"Alinea rodilla con el eje."],
["Curl femoral sentado","Isquios","Máquina",3,8,12,1,105,["wednesday"],"No despegues la cadera."],
["Sentadilla búlgara en Smith","Cuádriceps / glúteos","Smith",2,8,12,2,120,["wednesday"],"Paso cómodo y rodilla estable."],
["Pantorrillas en máquina","Pantorrillas","Máquina",3,10,15,1,90,["wednesday"],"Pausa arriba y abajo."],
["Crunch abdominal en máquina o polea","Core","Máquina / polea",3,10,15,1,75,["wednesday","saturday"],"Exhala al contraer."],
["Fondos asistidos / tríceps máquina","Tríceps","Máquina",2,8,12,1,90,["friday"],"Baja con control."],
["Curl de bíceps en máquina Upper","Bíceps","Máquina",2,10,15,1,90,["friday"],"Sin balancear el torso."],
["Peso muerto rumano en Smith","Isquios / glúteos","Smith",3,6,10,2,150,["saturday"],"Cadera atrás y espalda neutra."],
["Prensa de piernas","Piernas","Máquina",3,8,12,2,150,["saturday"],"Sin rebotes y lumbar apoyada."],
["Curl femoral sentado B","Isquios","Máquina",3,10,15,1,105,["saturday"],"Aprieta isquios y vuelve lento."],
["Hip thrust en máquina o Smith","Glúteos","Máquina / Smith",3,8,12,1,120,["saturday"],"Aprieta glúteos arriba."],
["Extensión de piernas B","Cuádriceps","Máquina",2,12,15,1,90,["saturday"],"Sin impulso."],
["Pantorrillas en máquina B","Pantorrillas","Máquina",3,12,20,1,90,["saturday"],"Recorrido completo."]
].map((x,i)=>({id:"ex_"+(i+1),name:x[0],muscle:x[1],equipment:x[2],sets:x[3],min:x[4],max:x[5],rir:x[6],rest:x[7],days:x[8],tip:x[9],youtube:""}));

const DEFAULT={version:2,settings:{name:"Cimeries Workout",unit:"lb",goal:"Aumentar masa muscular de forma progresiva con máquinas, poleas y Smith."},exercises:SEED,sessions:[]};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state=load(), draft=null;
function clone(x){return JSON.parse(JSON.stringify(x))}
function load(){try{const x=JSON.parse(localStorage.getItem("cimeriesWorkoutV2"));if(x?.exercises)return x}catch(e){}return clone(DEFAULT)}
function save(){localStorage.setItem("cimeriesWorkoutV2",JSON.stringify(state));renderAll()}
function esc(s=""){return String(s).replace(/[&<>'"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;"}[m]))}
function iso(d=new Date()){const z=d.getTimezoneOffset()*60000;return new Date(d-z).toISOString().slice(0,10)}
function dayId(d=new Date()){return DAYS[(d.getDay()+6)%7].id}
function D(id){return DAYS.find(x=>x.id===id)||DAYS[0]}
function exercises(day){return state.exercises.filter(x=>(x.days||[]).includes(day))}
function fmt(s){return new Date(s+"T12:00:00").toLocaleDateString("es-CL",{weekday:"short",day:"2-digit",month:"short",year:"numeric"})}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function show(v){$$(".view").forEach(x=>x.classList.toggle("active",x.id==="view-"+v));$$(".nav button").forEach(x=>x.classList.toggle("active",x.dataset.view===v));scrollTo({top:0,behavior:"smooth"});if(v==="workout")renderWorkout()}
function prs(){const out={};state.sessions.forEach(s=>s.exercises.forEach(e=>e.sets.forEach(set=>{const w=+set.weight||0,r=+set.reps||0;if(!w)return;const p=out[e.exerciseId];if(!p||w>p.weight||(w===p.weight&&r>p.reps))out[e.exerciseId]={exercise:e.name,weight:w,reps:r,date:s.date}})));return out}
function recent(){const a=[];state.sessions.forEach(s=>s.exercises.forEach(e=>e.sets.forEach(set=>{if(+set.weight>0)a.push({exercise:e.name,weight:+set.weight,reps:+set.reps||0,date:s.date})})));return a.sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5)}
function renderAll(){
document.title=state.settings.name;$(".brand h1").textContent=state.settings.name;$("#appName").value=state.settings.name;$("#unit").value=state.settings.unit;$("#goal").value=state.settings.goal;
const now=new Date(),id=dayId(now),d=D(id),ex=exercises(id);
$("#todayText").textContent=now.toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"long"});
$("#todayTitle").textContent=d.name+" · "+d.label.split("·")[0].trim();$("#todaySubtitle").textContent=d.label.includes("·")?d.label.split("·")[1].trim():d.label;
$("#statExercises").textContent=ex.length;$("#statSessions").textContent=state.sessions.length;$("#statPR").textContent=Object.keys(prs()).length;
$("#startToday").disabled=!ex.length;$("#startToday").textContent=ex.length?"INICIAR":"DÍA LIBRE";
$("#week").innerHTML=DAYS.map(x=>'<button class="day '+(x.id===id?"today":"")+'" data-start="'+x.id+'"><b>'+x.short+'</b><span>'+(exercises(x.id).length||"—")+"</span></button>").join("");
const r=recent();$("#recent").innerHTML=r.length?r.map(x=>'<div class="item"><div><h4>'+esc(x.exercise)+'</h4><p>'+fmt(x.date)+" · "+x.reps+' reps</p></div><span class="badge">'+x.weight+" "+state.settings.unit+"</span></div>").join(""):'<div class="empty">Todavía no hay cargas registradas.</div>';
renderPlan();renderHistory();fillDays();
}
function exerciseRow(e,i){return '<div class="exercise-row"><div class="num">'+(i+1)+'</div><div><h4>'+esc(e.name)+'</h4><p>'+e.sets+" × "+e.min+"–"+e.max+" · RIR "+e.rir+" · "+e.rest+" s · "+esc(e.equipment||"")+"</p></div><div class=row-buttons>"+(e.youtube?'<button class="mini" data-video="'+e.id+'">▶</button>':"")+'<button class="mini" data-edit="'+e.id+'">✎</button></div></div>'}
function renderPlan(){$("#plan").innerHTML=DAYS.map(d=>{const ex=exercises(d.id);return '<article class="panel day-card"><div class="head"><div><span class="kicker">'+d.name.toUpperCase()+'</span><h3>'+esc(d.label)+' <span>'+(ex.length?ex.length+" ejercicios":"sin ejercicios")+'</span></h3></div>'+(ex.length?'<button class="secondary small" data-start="'+d.id+'">ENTRENAR</button>':"")+"</div>"+(ex.length?ex.map(exerciseRow).join(""):'<div class="empty">Día libre. Puedes agregar ejercicios.</div>')+"</article>"}).join("")}
function renderHistory(){const p=Object.values(prs()).sort((a,b)=>b.weight-a.weight),max=p[0]?.weight||1;$("#historyStats").innerHTML='<article><strong>'+state.sessions.length+'</strong><span>sesiones</span></article><article><strong>'+p.length+'</strong><span>ejercicios con carga</span></article><article><strong>'+(p.length?Math.max(...p.map(x=>x.weight)):0)+'</strong><span>'+state.settings.unit+" máximo</span></article>";$("#prs").innerHTML=p.length?p.map(x=>'<div class="item"><div style="width:100%"><h4>'+esc(x.exercise)+'</h4><p>'+x.weight+" "+state.settings.unit+" × "+x.reps+" reps · "+fmt(x.date)+'</p><div class="prbar"><span style="width:'+Math.max(4,x.weight/max*100)+'%"></span></div></div></div>').join(""):'<div class="empty">Sin récords todavía.</div>';$("#history").innerHTML=state.sessions.length?[...state.sessions].sort((a,b)=>b.date.localeCompare(a.date)).map(s=>'<button class="item" style="width:100%;color:inherit;text-align:left" data-session="'+s.id+'"><div><h4>'+fmt(s.date)+" · "+D(s.day).name+'</h4><p>'+s.exercises.length+" ejercicios</p></div><span class=badge>VER</span></button>").join(""):'<div class="empty">Aún no hay sesiones guardadas.</div>'}
function fillDays(){const o=DAYS.map(d=>'<option value="'+d.id+'">'+d.name+"</option>").join("");$("#sessionDay").innerHTML=o;$("#exerciseDays").innerHTML=o}
function start(day=dayId()){const ex=exercises(day);if(!ex.length){toast("Ese día no tiene ejercicios");return}draft={day,date:iso(),exercises:ex.map(e=>({exerciseId:e.id,name:e.name,sets:Array.from({length:e.sets},(_,i)=>({set:i+1,weight:"",reps:"",rir:e.rir}))}))};show("workout")}
function renderWorkout(){if(!draft)return;$("#sessionDay").value=draft.day;$("#sessionDate").value=draft.date;$("#workoutTitle").textContent=D(draft.day).name+" · "+D(draft.day).label;$("#workoutDate").textContent=fmt(draft.date);$("#workout").innerHTML=draft.exercises.map((x,i)=>{const e=state.exercises.find(z=>z.id===x.exerciseId)||{};return '<article class="panel workout-card"><div class="workout-head"><div><span class="kicker">EJERCICIO '+(i+1)+'</span><h3>'+esc(x.name)+'</h3><p class=muted>Objetivo: '+(e.min||"")+"–"+(e.max||"")+" reps · RIR "+(e.rir??"")+" · "+(e.rest||"")+" s</p></div>"+(e.youtube?'<button class="mini" data-video="'+e.id+'">▶ VIDEO</button>':"")+'</div><table class="set-table"><thead><tr><th>Serie</th><th>Peso ('+state.settings.unit+')</th><th>Reps</th><th>RIR</th><th></th></tr></thead><tbody>'+x.sets.map((s,j)=>'<tr><td class=series>'+(j+1)+'</td><td><input type=number step=.5 min=0 value="'+s.weight+'" data-field=weight data-e='+i+" data-s="+j+'></td><td><input type=number min=0 value="'+s.reps+'" data-field=reps data-e='+i+" data-s="+j+'></td><td><input type=number min=0 max=10 value="'+(s.rir??"")+'" data-field=rir data-e='+i+" data-s="+j+'></td><td><button class=mini data-remove="'+i+":"+j+'">×</button></td></tr>').join("")+'</tbody></table><div class=workout-foot><span class=muted>'+esc(e.tip||"")+'</span><button class=mini data-addset="'+i+'">+ SERIE</button></div></article>'}).join("")}
function saveWorkout(){if(!draft)return;if(!draft.exercises.some(e=>e.sets.some(s=>+s.weight>0||+s.reps>0))){toast("Registra al menos una serie");return}state.sessions.push({...clone(draft),id:"s_"+Date.now(),savedAt:new Date().toISOString()});draft=null;save();toast("Entrenamiento guardado");show("history")}
function openExercise(id=""){const f=$("#exerciseForm");f.reset();$("#exerciseId").value="";$("#exerciseSets").value=3;$("#exerciseMin").value=8;$("#exerciseMax").value=12;$("#exerciseRir").value=2;$("#exerciseRest").value=120;$$('#exerciseDays option').forEach(o=>o.selected=false);$("#deleteExercise").classList.add("hide");if(id){const e=state.exercises.find(x=>x.id===id);if(!e)return;$("#dialogTitle").textContent="Editar ejercicio";$("#exerciseId").value=e.id;$("#exerciseName").value=e.name;$("#exerciseMuscle").value=e.muscle;$("#exerciseEquipment").value=e.equipment||"";$("#exerciseSets").value=e.sets;$("#exerciseMin").value=e.min;$("#exerciseMax").value=e.max;$("#exerciseRir").value=e.rir;$("#exerciseRest").value=e.rest;$("#exerciseYoutube").value=e.youtube||"";$("#exerciseTip").value=e.tip||"";$$('#exerciseDays option').forEach(o=>o.selected=(e.days||[]).includes(o.value));$("#deleteExercise").classList.remove("hide")}else $("#dialogTitle").textContent="Nuevo ejercicio";$("#exerciseDialog").showModal()}
function saveExercise(ev){ev.preventDefault();const id=$("#exerciseId").value||"ex_"+Date.now(),e={id,name:$("#exerciseName").value.trim(),muscle:$("#exerciseMuscle").value.trim(),equipment:$("#exerciseEquipment").value.trim(),sets:+$("#exerciseSets").value,min:+$("#exerciseMin").value,max:+$("#exerciseMax").value,rir:+$("#exerciseRir").value,rest:+$("#exerciseRest").value,days:$$('#exerciseDays option:checked').map(o=>o.value),youtube:$("#exerciseYoutube").value.trim(),tip:$("#exerciseTip").value.trim()};if(!e.name||!e.muscle)return;const i=state.exercises.findIndex(x=>x.id===id);i>=0?state.exercises[i]=e:state.exercises.push(e);save();$("#exerciseDialog").close();toast("Ejercicio guardado")}
function delExercise(){const id=$("#exerciseId").value;if(!id||!confirm("¿Eliminar este ejercicio?"))return;state.exercises=state.exercises.filter(x=>x.id!==id);save();$("#exerciseDialog").close();toast("Ejercicio eliminado")}
function embed(url){try{const u=new URL(url);let id=u.hostname.includes("youtu.be")?u.pathname.slice(1).split("/")[0]:u.searchParams.get("v")||u.pathname.split("/").filter(Boolean).pop();return id?"https://www.youtube-nocookie.com/embed/"+id:""}catch(e){return""}}
function video(id){const e=state.exercises.find(x=>x.id===id);if(!e?.youtube)return;$("#videoTitle").textContent=e.name;const v=embed(e.youtube);$("#videoBox").innerHTML=v?'<iframe class=video-frame src="'+v+'" allowfullscreen></iframe>':'<div class=empty>No se pudo incrustar el video.</div>';$("#youtubeLink").href=e.youtube;$("#videoDialog").showModal()}
function sessionDetail(id){const s=state.sessions.find(x=>x.id===id);if(!s)return;$("#sessionDetail").innerHTML='<p class=muted>'+fmt(s.date)+" · "+esc(D(s.day).label)+"</p>"+s.exercises.map(e=>'<article class=item><div><h4>'+esc(e.name)+'</h4><p>'+e.sets.filter(x=>x.weight||x.reps).map(x=>(x.weight||"—")+" "+state.settings.unit+" × "+(x.reps||"—")+" reps · RIR "+(x.rir??"—")).join("<br>")+"</p></div></article>").join("")+'<div class=buttons><button class=danger data-delsession="'+s.id+'">ELIMINAR SESIÓN</button></div>';$("#sessionDialog").showModal()}
function exportData(){const a=document.createElement("a"),b=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});a.href=URL.createObjectURL(b);a.download="cimeries-workout-"+iso()+".json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function importData(file){const r=new FileReader();r.onload=()=>{try{const s=JSON.parse(r.result);if(!s.exercises||!Array.isArray(s.sessions))throw 0;state=s;save();toast("Respaldo importado")}catch(e){alert("Archivo de respaldo no válido")}};r.readAsText(file)}

document.addEventListener("click",ev=>{
const n=ev.target.closest("[data-view]");if(n){show(n.dataset.view);return}
const s=ev.target.closest("[data-start]");if(s){start(s.dataset.start);return}
const e=ev.target.closest("[data-edit]");if(e){openExercise(e.dataset.edit);return}
const v=ev.target.closest("[data-video]");if(v){video(v.dataset.video);return}
const a=ev.target.closest("[data-addset]");if(a&&draft){const i=+a.dataset.addset,ex=state.exercises.find(x=>x.id===draft.exercises[i].exerciseId);draft.exercises[i].sets.push({set:draft.exercises[i].sets.length+1,weight:"",reps:"",rir:ex?.rir??2});renderWorkout();return}
const rm=ev.target.closest("[data-remove]");if(rm&&draft){const [i,j]=rm.dataset.remove.split(":").map(Number);if(draft.exercises[i].sets.length>1){draft.exercises[i].sets.splice(j,1);renderWorkout()}return}
const sd=ev.target.closest("[data-session]");if(sd){sessionDetail(sd.dataset.session);return}
const ds=ev.target.closest("[data-delsession]");if(ds&&confirm("¿Eliminar esta sesión?")){state.sessions=state.sessions.filter(x=>x.id!==ds.dataset.delsession);save();$("#sessionDialog").close();toast("Sesión eliminada")}
});
document.addEventListener("input",ev=>{if(ev.target.matches("[data-field]")&&draft)draft.exercises[+ev.target.dataset.e].sets[+ev.target.dataset.s][ev.target.dataset.field]=ev.target.value});
$(".nav").addEventListener("click",()=>{});
$("#startToday").onclick=()=>start();$("#chooseDay").onclick=()=>show("plan");$("#quickAdd").onclick=()=>openExercise();$("#addExercise").onclick=()=>openExercise();$("#closeExercise").onclick=()=>$("#exerciseDialog").close();$("#exerciseForm").onsubmit=saveExercise;$("#deleteExercise").onclick=delExercise;$("#closeVideo").onclick=()=>{$("#videoBox").innerHTML="";$("#videoDialog").close()};$("#closeSession").onclick=()=>$("#sessionDialog").close();$("#saveWorkout").onclick=saveWorkout;$("#cancelWorkout").onclick=()=>{if(confirm("¿Cancelar sesión?")){draft=null;show("today")}};$("#sessionDate").onchange=e=>{draft.date=e.target.value;renderWorkout()};$("#sessionDay").onchange=e=>{if(confirm("Cambiar el día reemplazará los ejercicios de la sesión."))start(e.target.value);else e.target.value=draft.day};
$("#saveSettings").onclick=()=>{state.settings.name=$("#appName").value.trim()||"Cimeries Workout";state.settings.unit=$("#unit").value;state.settings.goal=$("#goal").value.trim();save();toast("Ajustes guardados")};
$("#exportData").onclick=exportData;$("#exportTop").onclick=exportData;$("#importData").onchange=e=>e.target.files[0]&&importData(e.target.files[0]);$("#resetApp").onclick=()=>{if(confirm("¿Restablecer app y borrar historial?")){state=clone(DEFAULT);save();toast("Aplicación restablecida")}};
renderAll();
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
