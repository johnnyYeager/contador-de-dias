(()=>{"use strict";class e{save(e){localStorage.dates+=e}delete(e){localStorage.dates-=e}}class t{constructor({...t}){console.log(t),this.openBtn=t.openBtn,this.windowElement=t.windowElement,this.submitBtn=t.submitBtn,this.formElement=t.formElement,void 0!==t.requiredInputs&&(this.requiredInputs=t.requiredInputs.map((e=>this.formElement.querySelector(e)))),this.invalidMsg=this.formElement.querySelector(".invalid"),this.mode=t.mode,this.action=t.action,this.firstAction=t.firstAction,this.contadoresSection=document.getElementById("contadores"),this.showWindow=this.showWindow.bind(this),this.removeWindow=this.removeWindow.bind(this),this.handleInit=this.handleInit.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.handleWindowClasses=this.handleWindowClasses.bind(this),this.storageInfo=new e}showWindow(){this.windowElement.classList.add("show"),this.windowElement.addEventListener("click",this.handleWindowClasses),this.submitBtn.addEventListener("click",this.handleSubmit),this.firstAction(this.openBtn)}removeWindow(){this.windowElement.classList.remove("show"),this.windowElement.removeEventListener("click",this.handleWindowClasses),this.submitBtn.removeEventListener("click",this.handleSubmit)}handleWindowClasses(e){e.target===this.windowElement&&this.removeWindow()}handleSubmit(e){e.preventDefault();const t=this.formElement.querySelector("#title");this.requiredInputs.map((e=>!!e.value)).every((e=>!0===e))?t.value.match(/[\\|]/g)?(t.classList.add("error"),this.invalidMsg.classList.add("show"),this.invalidMsg.innerHTML="Carácteres inválidos: &#92;, |",setTimeout((()=>{t.classList.remove("error"),this.invalidMsg.classList.remove("show"),this.invalidMsg.innerText=""}),5e3)):(this.action(this.openBtn),this.removeWindow(),this.formElement.reset()):(this.requiredInputs.forEach((e=>{e.value||(e.classList.add("error"),setTimeout((()=>{e.classList.remove("error")}),5e3))})),this.invalidMsg.classList.add("show"),this.invalidMsg.innerText="Preencha os espaços necessários",setTimeout((()=>{this.invalidMsg.classList.remove("show"),this.invalidMsg.innerText=""}),5e3))}handleInit(){this.openBtn.addEventListener("click",this.showWindow)}init(){switch(this.mode){case"dev":console.log("dev"),console.log(this),window.onload=()=>this.windowElement.classList.add("show");break;case"open":console.log("open"),console.log(this),this.handleInit(),this.showWindow();break;default:this.handleInit()}return this}}function i(e){const t=new Date;let i=e.replace("-","/");i=new Date(i);let n=i.getTime()-t.getTime();n=Math.floor(n/864e5);const s=`${i.getDate()}/${(i.getMonth()+1).toString().padStart(2,"0")}/${i.getFullYear()}`;return n+1===0?`Hoje é ${s}`:n+1===1?`Falta 1 dia para ${s}`:n+1===-1?`${s} foi há 1 dia`:i.getTime()-t.getTime()>0?`Faltam ${n+1} dias para ${s}`:`${s} foi há ${String(n+1).replace("-","")} dias`}function n(e,n,s){const o=document.querySelector("#tela-editar form"),a=document.getElementById("contadores"),d=document.createElement("div");d.classList.add("contador");const r=document.createElement("h2");r.innerText=e;const l=document.createElement("p");l.classList.add("data");const c=document.createElement("p");c.classList.add("desc"),c.innerText=s,d.appendChild(r),d.appendChild(l),d.appendChild(c),d.setAttribute("data-date",n);const h=a.childElementCount;d.setAttribute("data-id",h),d.querySelector("p.data").innerText=i(d.getAttribute("data-date"));const m=document.createElement("img");m.setAttribute("src","img/delete.svg"),m.classList.add("delete");const u=document.createElement("img");u.setAttribute("src","img/edit.svg"),u.classList.add("edit");const p=document.createElement("div");return p.classList.add("buttons"),p.appendChild(m),p.appendChild(u),d.appendChild(p),m.addEventListener("click",(e=>{if("deletar"===prompt('Digite "DELETAR" para confirmar!').toLowerCase()){const t=e.currentTarget.parentNode.parentNode.getAttribute("data-id"),i=localStorage.dates.split("\\");console.log(i[t],t),i.splice(t,1),localStorage.dates=i.join("\\"),e.currentTarget.parentNode.parentNode.remove()}})),new t({openBtn:u,windowElement:document.querySelector("#tela-editar"),formElement:o,submitBtn:document.querySelector("#tela-editar form button"),requiredInputs:["#title","#date"],type:"edit",firstAction(e){console.log(e);const t=e.parentNode.parentNode;o.title.value=t.querySelector("h2").innerText,o.date.value=t.getAttribute("data-date"),o.description.value=t.querySelector("p.desc").innerText},action(e){const t=e.parentNode.parentNode;console.log(t),t.querySelector("h2").innerText=o.title.value;const n=i(o.date.value);t.querySelector("p.data").innerText=n,t.querySelector("p.desc").innerText=o.description.value,t.setAttribute("data-date",o.date.value)}}).init(),d}const s=document.getElementById("contadores");!function(){const e=document.getElementById("contadores"),t=localStorage.dates.split("\\");t.pop(),t.forEach((t=>{const i=t.split("|");e.appendChild(n(i[0],i[1],i[2]))}))}(),localStorage.dates||(localStorage.dates=String()),new t({openBtn:document.querySelector("#btn-adicionar"),windowElement:document.getElementById("tela-adicionar"),formElement:document.querySelector("#tela-adicionar form"),submitBtn:document.querySelector("#tela-adicionar form button"),requiredInputs:["#title","#date"],action(){console.log("a");const e=this.contadoresSection.childElementCount;this.storageInfo.save(`${this.formElement.title.value}|${this.formElement.date.value}|${this.formElement.description.value}|${e}\\`),this.contadoresSection.appendChild(n(this.formElement.title.value,this.formElement.date.value,this.formElement.description.value))}}).init(),document.querySelector("#btn-deletar").addEventListener("click",(()=>{"deletar"===prompt('Digite "DELETAR" para confirmar e deletar TODAS as datas!').toLowerCase()&&(s.innerHTML="",localStorage.dates="")}))})();