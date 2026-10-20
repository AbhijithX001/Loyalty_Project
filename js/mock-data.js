/* Deterministic, date-relative demo seed for the Malabar Bites prototype. */
const RESTAURANT_ID = 'rest_malabar_bites';

function seedRandom(seed){
  let state = seed >>> 0;
  return function(){ state = (state * 1664525 + 1013904223) >>> 0; return state / 4294967296; };
}
function seedInt(random,min,max){return Math.floor(random()*(max-min+1))+min}
function seedPick(random,items){return items[Math.floor(random()*items.length)]}
function seedDaysAgo(days,hour=12,minute=0){const d=new Date();d.setDate(d.getDate()-days);d.setHours(hour,minute,0,0);return d.toISOString()}
function seedDateForMonth(random,monthOffset,index,total){
  const now=new Date(), first=new Date(now.getFullYear(),now.getMonth()-monthOffset,1), last=new Date(now.getFullYear(),now.getMonth()-monthOffset+1,0);
  let day=seedInt(random,1,last.getDate());
  if(monthOffset===0) day=Math.min(day,Math.max(1,now.getDate()-1));
  const hour=seedPick(random,[11,12,12,13,14,16,17,18,19,20,21,22]);
  const minute=seedInt(random,0,59), d=new Date(first.getFullYear(),first.getMonth(),day,hour,minute,0,0);
  if(d>now)d.setTime(now.getTime()-3600000);
  return d.toISOString();
}
function seedCustomer(id,name,mobile,code,joinedDays,referredBy=null){
  const d=new Date();d.setDate(d.getDate()-joinedDays);d.setHours(10,0,0,0);
  return {id,restaurantId:RESTAURANT_ID,name,mobile:String(mobile),referralCode:code,referredBy,joinedAt:d.toISOString()};
}

function buildSeed(){
  const random=seedRandom(20261020), now=new Date();
  const restaurant={id:RESTAURANT_ID,name:'Malabar Bites',ownerName:'Anoop Nair',mobile:'9000000000',pointsRule:{mode:'percent',percent:10,points:1,perAmount:100,flatPoints:25},referralReward:50};
  const menuItem=[
    ['menu_1','Kerala Meals','Meals',180],['menu_2','Fish Curry Meals','Meals',260],['menu_3','Chicken Biriyani','Meals',220],['menu_4','Parotta','Meals',25],['menu_5','Beef Roast','Meals',210],['menu_6','Pazhampori','Snacks',60],['menu_7','Banana Fritters','Snacks',50],['menu_8','Samosa','Snacks',35],['menu_9','Fresh Lime','Drinks',70],['menu_10','Sulaimani Tea','Drinks',35],['menu_11','Filter Coffee','Drinks',55],['menu_12','Mango Lassi','Drinks',90],
    ['menu_13','Chicken 65','Snacks',140],['menu_14','Samosa','Snacks',20],['menu_15','Unniyappam','Snacks',50],['menu_16','Payasam','Snacks',60],['menu_17','Egg Curry','Meals',110],['menu_18','Filter Coffee','Drinks',30]
  ].map(([id,name,category,price])=>({id,restaurantId:RESTAURANT_ID,name,category,price,available:true}));
  const reward=[['reward_1','Fresh lime juice',120],['reward_2','Sulaimani tea',70],['reward_3','Snack plate',220],['reward_4','Meal discount',450],['reward_5','Mango lassi',160],['reward_6','Filter Coffee',30],['reward_7','Free Payasam',60],['reward_8','Family Biriyani Combo',800]].map(([id,name,pointsCost])=>({id,restaurantId:RESTAURANT_ID,name,pointsCost,active:true}));
  const fixed=[['Rahul Menon','9000000001','RAH1200',170],['Priya Nair','9000000002','PRI1201',165],['Arjun Kumar','9000000003','ARJ1202',160],['Meera Joseph','9000000004','MEE1203',155],['Nikhil Das','9000000005','NIK1204',150],['Anjali Varma','9000000006','ANJ1205',175],['Vivek Pillai','9000000007','VIV1206',180],['Sara Thomas','9000000008','SAR1207',120]];
  const names=['Kavya Menon','Harish Babu','Neha George','Sanjay Nair','Deepa Mathew','Faisal Rahman','Gokul Raj','Lakshmi Devi','Rohan Varma','Aditi Krishnan','Manu Thomas','Sreeram Pillai','Divya Suresh','Ishan Das','Anu Mohan','Joel Joseph','Naveen Kumar','Keerthi S','Amal Dev','Riya Paul','Abhinav Roy','Maya Nair'];
  const customers=fixed.map((x,i)=>seedCustomer(`cust_${i+1}`,x[0],x[1],x[2],x[3]));
  names.forEach((name,i)=>{const n=i+9, code=name.replace(/[^A-Za-z]/g,'').slice(0,3).toUpperCase()+String(2000+n);const joined=n<=21?75+(n%6)*10:(n<=27?[9,8,7,5,0,0][n-22]:[140,130,120][n-28]);customers.push(seedCustomer(`cust_${n}`,name,9000000000+n,code,joined));});
  const referralPairs=[['cust_1','cust_8','rewarded',155],['cust_1','cust_22','pending',4],['cust_2','cust_9','rewarded',120],['cust_3','cust_10','rewarded',110],['cust_4','cust_11','rewarded',95],['cust_5','cust_12','rewarded',85],['cust_6','cust_13','rewarded',70],['cust_7','cust_14','rewarded',55],['cust_9','cust_23','pending',3],['cust_10','cust_24','pending',2]];
  referralPairs.forEach(([referrer,friend,status,days])=>{const c=customers.find(x=>x.id===friend);c.referredBy=referrer});
  const counts=[34,33,32,31,30,29,28,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,1,1,1,1,1,1], monthCounts=[72,65,54,58,53,47], bills=[];
  const remaining={};customers.forEach((c,i)=>remaining[c.id]=counts[i]||0);
  function addItems(pattern){
    const lines=[], add=(item,qty=1)=>{const found=lines.find(x=>x.itemId===item.id);if(found)found.qty+=qty;else lines.push({itemId:item.id,name:item.name,qty,price:item.price})};
    const meals=menuItem.filter(x=>x.category==='Meals'), snacks=menuItem.filter(x=>x.category==='Snacks'), drinks=menuItem.filter(x=>x.category==='Drinks');
    if(pattern===0){add(seedPick(random,meals));add(seedPick(random,drinks))}
    if(pattern===1){add(seedPick(random,meals));add(seedPick(random,meals));add(seedPick(random,drinks))}
    if(pattern===2){add(seedPick(random,snacks),seedInt(random,1,2));add(seedPick(random,drinks))}
    if(pattern===3){add(menuItem.find(x=>x.id==='menu_3'));add(menuItem.find(x=>x.id==='menu_16'));add(seedPick(random,drinks))}
    if(pattern===4){add(menuItem.find(x=>x.id==='menu_4'),2);add(menuItem.find(x=>x.id==='menu_5'));add(seedPick(random,drinks))}
    if(pattern===5){add(seedPick(random,meals));add(seedPick(random,snacks));add(seedPick(random,drinks),seedInt(random,1,2))}
    return lines;
  }
  function chooseCustomer(createdAt,forceId=null){
    const date=new Date(createdAt), eligible=customers.filter(c=>remaining[c.id]>0&&new Date(c.joinedAt)<=date&&!(c.id>='cust_28'&&date>new Date(Date.now()-45*86400000)));
    let chosen=forceId&&eligible.find(c=>c.id===forceId);if(!chosen)chosen=eligible[Math.floor(random()*eligible.length)]||customers.find(c=>remaining[c.id]>0);
    if(chosen)remaining[chosen.id]--;return chosen||customers[0];
  }
  let serial=1001;
  monthCounts.forEach((count,monthIndex)=>{for(let i=0;i<count;i++){
    let createdAt;
    if(monthIndex===0&&i<3)createdAt=new Date(Date.now()-(25+i*45)*60000).toISOString();
    else if(monthIndex===0&&i<6)createdAt=seedDaysAgo(1,12+(i-3)*3,15);
    else createdAt=seedDateForMonth(random,monthIndex,i,count);
    const customer=chooseCustomer(createdAt,monthIndex===0&&i===0?'cust_1':null),lines=addItems(seedInt(random,0,5));
    bills.push({id:`bill_${serial}`,number:`MB-${serial++}`,restaurantId:RESTAURANT_ID,customerId:customer.id,items:lines,total:lines.reduce((s,x)=>s+x.qty*x.price,0),pointsEarned:0,status:'paid',createdAt});
  }});
  // Fill the tail of the distribution without inventing totals: all items get real sales.
  const usage={};menuItem.forEach(x=>usage[x.id]=0);bills.forEach(b=>b.items.forEach(x=>usage[x.itemId]+=x.qty));
  menuItem.forEach(item=>{while(usage[item.id]<10){const target=bills.find(b=>b.total+item.price<=1200);const line=target.items.find(x=>x.itemId===item.id);if(line)line.qty++;else target.items.push({itemId:item.id,name:item.name,qty:1,price:item.price});usage[item.id]++;target.total=target.items.reduce((s,x)=>s+x.qty*x.price,0)}});
  bills.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt)).forEach((b,i)=>{b.id=`bill_${i+1}`;b.number=`MB-${1001+i}`;b.pointsEarned=Math.floor(b.total*.1)});
  const ledger=[],pushLedger=(customerId,type,points,refId,note,createdAt)=>ledger.push({id:`ledger_${ledger.length+1}`,customerId,type,points,refId:refId||null,note:note||'',createdAt});
  bills.forEach(b=>pushLedger(b.customerId,'earned',b.pointsEarned,b.id,'Bill points',b.createdAt));
  const referrals=referralPairs.map(([referrer,friend,status,days],i)=>({id:`referral_${i+1}`,restaurantId:RESTAURANT_ID,referrerId:referrer,friendId:friend,rewardPoints:50,status,createdAt:seedDaysAgo(days),rewardedAt:null}));
  referrals.filter(r=>r.status==='rewarded').forEach(r=>{const first=bills.filter(b=>b.customerId===r.friendId).sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))[0];if(first){r.rewardedAt=first.createdAt;pushLedger(r.referrerId,'referral',r.rewardPoints,r.id,'Referral reward',first.createdAt)}});
  [['cust_2',20,'Birthday bonus'],['cust_3',35,'Billing correction'],['cust_4',25,'Service recovery'],['cust_5',40,'Welcome bonus'],['cust_6',30,'Weekend bonus'],['cust_7',45,'Loyalty bonus'],['cust_8',20,'Staff correction'],['cust_9',30,'Anniversary bonus']].forEach((x,i)=>pushLedger(x[0],'adjust',x[1],null,x[2],seedDaysAgo(12+i*9)));
  const redemptions=[], redSpec=[['cust_1','fulfilled',70,150],['cust_1','fulfilled',60,120],['cust_1','fulfilled',120,90],['cust_1','rejected',50,60],['cust_1','pending',120,5],['cust_2','fulfilled',70,140],['cust_3','fulfilled',120,130],['cust_4','fulfilled',60,110],['cust_5','fulfilled',70,100],['cust_6','fulfilled',160,88],['cust_7','fulfilled',70,76],['cust_8','fulfilled',120,65],['cust_9','fulfilled',60,52],['cust_10','fulfilled',70,42],['cust_11','rejected',60,35],['cust_12','rejected',70,28],['cust_13','pending',60,18],['cust_14','pending',70,12],['cust_15','pending',60,7],['cust_16','approved',70,22],['cust_17','approved',120,15]];
  redSpec.forEach(([customerId,status,points,days],i)=>{let created=seedDaysAgo(days);let balance=ledger.filter(x=>x.customerId===customerId&&new Date(x.createdAt)<=new Date(created)).reduce((s,x)=>s+x.points,0);let cost=Math.min(points,Math.max(20,Math.floor(Math.max(0,balance)/10)*10));if(cost>balance)cost=20;const r={id:`redeem_${i+1}`,restaurantId:RESTAURANT_ID,customerId,rewardId:`reward_${(i%8)+1}`,points:cost,status,reason:status==='rejected'?'Demo rejection':'',createdAt:created,updatedAt:created};redemptions.push(r);pushLedger(customerId,'redeem_hold',-cost,r.id,'Reward hold',created);if(status==='rejected')pushLedger(customerId,'redeem_return',cost,r.id,'Reward rejected',new Date(new Date(created).getTime()+3600000).toISOString())});
  return {restaurant,customer:customers,menuItem,reward,bill:bills,ledger,redemption:redemptions,referral:referrals};
}
const SEED_DATA=buildSeed();
