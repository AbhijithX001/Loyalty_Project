const STORE_KEY='malabar_bites_demo_v1';
function clone(value){return JSON.parse(JSON.stringify(value))}
function getStore(){try{const saved=localStorage.getItem(STORE_KEY);return saved?JSON.parse(saved):resetDemo()}catch(error){return buildSeed()}}
function get(key){return getStore()[key]}
function set(key,value){const data=getStore();data[key]=value;localStorage.setItem(STORE_KEY,JSON.stringify(data));return value}
function update(key,callback){const next=callback(clone(get(key)));set(key,next);return next}
function resetDemo(){const fresh=buildSeed();localStorage.setItem(STORE_KEY,JSON.stringify(fresh));return fresh}
function getCustomerLedger(customerId){return get('ledger').filter(row=>row.customerId===customerId).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))}
function getBalance(customerId){return getCustomerLedger(customerId).reduce((sum,row)=>sum+Number(row.points||0),0)}
function calculatePoints(total,rule=get('restaurant').pointsRule){const amount=Number(total)||0;let points=0;if(rule.mode==='perAmount')points=Math.floor(amount/(Number(rule.perAmount)||1)*(Number(rule.points)||0));else if(rule.mode==='flat')points=Number(rule.flatPoints)||0;else points=Math.floor(amount*(Number(rule.percent)||0)/100);return Math.max(0,Math.floor(points))}
function addLedger(customerId,type,points,refId=null,note=''){const row={id:uid('ledger'),customerId,type,points:Number(points),refId,note,createdAt:new Date().toISOString()};update('ledger',rows=>[...rows,row]);return row}
function getRestaurant(){return get('restaurant')}
