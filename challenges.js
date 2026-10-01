// Answer key for the Treasure Hunt. x,y,r are % of photo width/height (r = hit radius, % of width).
// rule = index in the Golden Rules list. k = keywords (EN+AR) that earn the corrective-action bonus.
// To move a hotspot: open hunt.html?edit=1 and click the photo to read x,y.
const HUNT={image:'challenge1.jpg',hot:[
{id:'weld',x:11.5,y:34.5,r:8,rule:5,en:'Welding without face/eye protection',ar:'لحام بدون حماية للوجه والعينين',k:['helmet','mask','shield','face','goggles','ppe','glasses','خوذة','قناع','واقي','نظارات','حماية']},
{id:'cyl',x:20,y:28,r:7,rule:8,en:'Gas cylinders not secured',ar:'أسطوانات الغاز غير مثبتة',k:['chain','secure','strap','fasten','trolley','rack','سلسلة','تثبيت','ربط','حامل']},
{id:'spill',x:66,y:70,r:11,rule:0,en:'Liquid spill on walkway (slip)',ar:'سوائل مسكوبة على الممر (انزلاق)',k:['clean','mop','wipe','dry','sign','barrier','absorb','leak','تنظيف','مسح','تجفيف','لافتة','حاجز','تسريب']},
{id:'lift',x:68.5,y:42,r:9,rule:4,en:'Poor manual lifting posture',ar:'وضعية رفع يدوي خاطئة',k:['knee','back','posture','lift','trolley','team','equipment','ركب','ظهر','وضعية','عربة','مساعدة','معدات']},
{id:'ladder',x:78,y:35,r:8,rule:0,en:'Unsecured ladder left in aisle',ar:'سلم غير مؤمّن في الممر',k:['store','secure','remove','fold','lock','put away','تخزين','تأمين','إزالة','طي','تثبيت']},
{id:'hose',x:30,y:63,r:10,rule:0,en:'Hoses/cables across the floor',ar:'خراطيم وكابلات على الأرضية',k:['cable','hose','route','overhead','cover','tidy','organi','manage','كابل','خرطوم','تنظيم','تغطية','تعليق','ترتيب']},
{id:'fork',x:38,y:34,r:9,rule:3,en:'Forklift working near pedestrians/workstations',ar:'رافعة شوكية قرب المشاة ومحطات العمل',k:['segregat','pedestrian','barrier','separate','route','speed','spotter','horn','فصل','مشاة','حاجز','مسار','سرعة','منبه']},
{id:'pallet',x:85,y:87,r:11,rule:0,en:'Broken pallets / poor housekeeping in aisle',ar:'طبالي تالفة وسوء ترتيب في الممر',k:['remove','discard','repair','store','house','clean','إزالة','إصلاح','تخزين','ترتيب','نظافة']}
]};
