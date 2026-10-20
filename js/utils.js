const money=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
function formatMoney(value){return money.format(Number(value)||0)}
function formatDate(value,options={day:'numeric',month:'short',year:'numeric'}){return new Intl.DateTimeFormat('en-IN',options).format(new Date(value))}
function formatShortDate(value){return formatDate(value,{day:'numeric',month:'short'})}
function uid(prefix='id'){return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}
function qs(selector,root=document){return root.querySelector(selector)}
function qsa(selector,root=document){return [...root.querySelectorAll(selector)]}
function toast(message){let el=qs('#toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.append(el)}el.textContent=message;el.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
function openSheet(id){const el=typeof id==='string'?document.getElementById(id):id;if(el)el.classList.add('open')}
function closeSheet(id){const el=typeof id==='string'?document.getElementById(id):id;if(el)el.classList.remove('open')}
function setupSheets(){qsa('[data-close-sheet]').forEach(btn=>btn.addEventListener('click',()=>closeSheet(btn.closest('.sheet-backdrop'))))}
function sparkline(values,color='var(--accent)'){const nums=values.map(Number),max=Math.max(...nums,1),min=Math.min(...nums),range=max-min||1;const points=nums.map((v,i)=>`${(i/(nums.length-1||1))*100},${100-((v-min)/range)*82-9}`).join(' ');return `<svg class="chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Trend chart"><polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`}
function barChart(values,labels=[],selected=-1){const max=Math.max(...values,1);return `<div class="bar-chart" role="img" aria-label="Bar chart">${values.map((v,i)=>`<div class="bar ${i===selected?'selected':''}"><i style="height:${Math.max(5,(v/max)*100)}%" title="${v}"></i><small>${labels[i]||''}</small></div>`).join('')}</div>`}
function daysAgo(days){const date=new Date();date.setDate(date.getDate()-days);return date.toISOString()}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]))}
