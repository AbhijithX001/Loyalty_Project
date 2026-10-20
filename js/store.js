const STORE_KEY='malabar_bites_demo_v1';
function clone(value){return JSON.parse(JSON.stringify(value))}
function getStore(){try{const saved=localStorage.getItem(STORE_KEY);if(!saved)return resetDemo();const data=JSON.parse(saved);let migrated=false;if(!Array.isArray(data.promotion)){data.promotion=buildSeed().promotion;migrated=true}if(!Array.isArray(data.promotionUsage)){data.promotionUsage=[];migrated=true}if(migrated)localStorage.setItem(STORE_KEY,JSON.stringify(data));return data}catch(error){return buildSeed()}}
function get(key){return getStore()[key]}
function set(key,value){const data=getStore();data[key]=value;localStorage.setItem(STORE_KEY,JSON.stringify(data));return value}
function update(key,callback){const next=callback(clone(get(key)));set(key,next);return next}
function resetDemo(){const fresh=buildSeed();localStorage.setItem(STORE_KEY,JSON.stringify(fresh));return fresh}
function getCustomerLedger(customerId){return get('ledger').filter(row=>row.customerId===customerId).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))}
function getBalance(customerId){return getCustomerLedger(customerId).reduce((sum,row)=>sum+Number(row.points||0),0)}
function calculatePoints(total,rule=get('restaurant').pointsRule){const amount=Number(total)||0;let points=0;if(rule.mode==='perAmount')points=Math.floor(amount/(Number(rule.perAmount)||1)*(Number(rule.points)||0));else if(rule.mode==='flat')points=Number(rule.flatPoints)||0;else points=Math.floor(amount*(Number(rule.percent)||0)/100);return Math.max(0,Math.floor(points))}
function addLedger(customerId,type,points,refId=null,note=''){const row={id:uid('ledger'),customerId,type,points:Number(points),refId,note,createdAt:new Date().toISOString()};update('ledger',rows=>[...rows,row]);return row}
function getRestaurant(){return get('restaurant')}
function getPromotions(restaurantId=getRestaurant().id){return (get('promotion')||[]).filter(row=>row.restaurantId===restaurantId)}
function promotionStatus(promotion,now=Date.now()){if(!promotion.active)return 'inactive';if(promotion.quantityLimit!=null&&Number(promotion.quantityRemaining)<=0)return 'sold-out';if(new Date(promotion.startAt).getTime()>now)return 'scheduled';if(new Date(promotion.endAt).getTime()<=now)return 'expired';return 'active'}
function eligiblePromotions(restaurantId=getRestaurant().id){return getPromotions(restaurantId).filter(row=>promotionStatus(row)==='active'&&row.menuItems?.length&&row.pricing&&Number(row.pricing.offerPrice)>=0)}
function promotionOriginalPrice(promotion){return (promotion.menuItems||[]).reduce((sum,line)=>sum+(Number(line.unitPrice)||0)*(Number(line.qty)||0),0)}
function promotionSavings(promotion){return Math.max(0,promotionOriginalPrice(promotion)-Number(promotion.pricing?.offerPrice||0))}
function promotionCanUse(promotion,quantity=1){return Boolean(promotion)&&promotionStatus(promotion)==='active'&&(promotion.quantityLimit==null||Number(promotion.quantityRemaining)>=quantity)}
