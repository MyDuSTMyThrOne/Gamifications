const DEPTS=[['Production','الإنتاج'],['Maintenance','الصيانة'],['Quality','الجودة'],['Warehouse & Logistics','المستودعات واللوجستيات'],['HSE','السلامة والصحة'],['Admin / HR / Finance','الإدارة / الموارد البشرية / المالية'],['Other','أخرى']];
// Add a new game = add one line here + one new .html file in this same folder.
const GAMES=[
{id:'hunt',file:'hunt.html',icon:'🔍',en:'Safety Golden Rules Treasure Hunt',ar:'لعبة البحث عن قواعد السلامة الذهبية',de:'Find hidden hazards in a workplace photo',da:'اكتشف المخاطر المخفية في صورة موقع العمل',live:true},
{id:'food',icon:'🍽️',en:'Food & Pharma Hygiene Hunt',ar:'لعبة النظافة وسلامة الغذاء والدواء',de:'Same format, GMP / hygiene photos',da:'نفس الفكرة بصور الممارسات الجيدة والنظافة',live:false},
{id:'brand',icon:'🏷️',en:'Company Identity Quiz',ar:'اختبار هوية الشركة',de:'Recognise logos, products, values from photos',da:'تعرّف على الشعارات والمنتجات والقيم من الصور',live:false},
{id:'match',icon:'🧩',en:'Golden Rules Match-Up',ar:'مطابقة القواعد الذهبية',de:'Match situations to the right Golden Rule',da:'اربط كل موقف بالقاعدة الصحيحة',live:false}];
const Store={online:false,
 hdr(){const a=sessionStorage.getItem('adm');return a?{'X-Admin':a}:{}},
 async save(rec){const L=JSON.parse(localStorage.getItem('sh_res')||'[]');L.push(rec);localStorage.setItem('sh_res',JSON.stringify(L));
  try{const r=await fetch((CONFIG.API_URL||'api/results'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(rec)});return (await r.json()).ok===true}catch(e){return false}},
 async load(){try{const r=await fetch((CONFIG.API_URL||'api/results'),{headers:this.hdr()});
  if(r.status===401){sessionStorage.removeItem('adm');alert('Wrong password / كلمة المرور خاطئة')}
  else if(r.ok){this.online=true;return await r.json()}}catch(e){}this.online=false;return JSON.parse(localStorage.getItem('sh_res')||'[]')}
};
