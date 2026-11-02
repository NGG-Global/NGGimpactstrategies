(function(){
'use strict';
var ITEMS=[
 ['משיג את תמיכתם של יתר עמיתי לעבודה'],
 ['גורם לו להרגיש חשוב','״רק אתה תוכל לעשות זאת משום כישוריך וניסיונך״'],
 ['מגיש לו בכתב מסמך מפורט (תוכנית פעולה), המנמק ומצדיק את דעתי'],
 ['מציג בפניו לוח זמנים ובו הוא מתבקש לעשות את מה שביקשתי'],
 ['מציע לו עסקת חליפין','״אם תעשה את זה כפי שביקשתי, אעזור לך בעתיד כשאתה תבקש״'],
 ['מתנהג בנימוס ובענווה בעת הצגת בקשתי'],
 ['פונה לדרג בכיר יותר כדי להפעיל עליו לחץ'],
 ['מנדנד לו שוב ושוב ומטרידו, עד שיבצע את מבוקשי'],
 ['מזכיר לו טובות שעשיתי לו בעבר ורומז לו שעכשיו תורו להחזיר לי טובה'],
 ['פונה בבקשה פורמלית לדרגים בכירים כדי שיביעו תמיכה בבקשתי'],
 ['מוודא שהוא מרגיש כלפיי אהדה ורק אז מציג בפניו את בקשתי'],
 ['מבקש ממנו לפנות לממונה שלו אם יש לו קושי לטפל בבקשתי'],
 ['משתף אותו בחביבות בבעיות העלולות לנבוע ממילוי בקשתי, מביע כלפיו סימפטיה ומעודד אותו לעמוד בקושי'],
 ['מזכיר לו כל הזמן את בקשתי'],
 ['משתמש בטיעונים הגיוניים על מנת לשכנע אותו'],
 ['מתנדב לבצע עבורו טובות הקשורות לעבודה כתמורה למילוי בקשתי'],
 ['מחכה עד שהוא נראה במצב רוח מתאים ואז מציג בפניו את בקשתי'],
 ['נכנס איתו לעימות ישיר בו אני מציג בתקיפות את בקשתי'],
 ['מתנהג איתו בחביבות לפני הצגת הבקשה','שיחות על דא ועל הא, אזכור חוויות משותפות'],
 ['מציג לו נתונים ועובדות התומכים בבקשתי'],
 ['משיג לו את תמיכתם של הנוגעים בדבר (כפיפיו, גורמי חוץ) ואז פונה אליו'],
 ['משיג תמיכה וגיבוי בלתי פורמליים של בעלי דרגים בכירים'],
 ['מציע לו שאבצע איזושהי הקרבה אישית מבחינתי אם בקשתי תבוצע'],
 ['מזכיר לו שנוהלי הארגון מחייבים שיענה לבקשתי'],
 ['מציע לו לעזור בפעילויות שלו'],
 ['מסביר לו בפרוטרוט את הסיבות לבקשתי']
];
var SCALE=[[5,'כמעט תמיד'],[4,'לעיתים קרובות'],[3,'לפעמים'],[2,'לעיתים רחוקות'],[1,'אף פעם']];
var TACTICS=[
 {id:'up',name:'פנייה מעלה',desc:'פונה לדרגים בכירים יותר כדי להשיג את הסכמתם, ובעזרתה לקדם את עמדותיו. מקור סמכותו חיצוני, בדרך כלל מגורמים ממונים. עשוי לשלוח כפיף לגורם ממונה אם מתקשה לשכנע. מסתייע בגורמים פורמליים, בלתי פורמליים אך בעלי השפעה, ובכללים וחוקים שנמצאים ״מעל כולם״.'},
 {id:'coal',name:'בניית קואליציות',desc:'פועל להשגת הסכמה של עמיתיו לעבודה. כשצריך להגיע להחלטה, מרבה לעשות עבודה מקדימה טרם קבלתה. מנסה לא להיקלע לעימותים והכרעות ישירים.'},
 {id:'press',name:'הפעלת לחץ (תקיפות)',desc:'מציב לוחות זמנים נוקשים ולעיתים לחוצים. ״מנדנד שוב ושוב״ להשגת ההסכמה של האחרים. מזכיר תכופות את בקשותיו. מוכן להיכנס לעימותים. לעיתים משתמש במניפולציות.'},
 {id:'barg',name:'מיקוח',desc:'מציע ״עסקת חליפין״ (משהו שיעשה תמורת קבלת הסכמה). מזכיר ״טובות״ שעשה בעבר, או התחייבויות פורמליות או בלתי פורמליות שנוצרו בעבר. מגלה נכונות ״להקריב משהו אישי״ תמורת ההסכמה. מציע עזרה, ולעיתים אף ״מתחנף״.'},
 {id:'emo',name:'פנייה לרגש',desc:'גורם לצד השני להרגיש חשוב (״רק אתה יכול לעשות את זה״) או אשם (״אם לא תסכים, כל מאמציי ירדו לטמיון״). מתנהג בנימוס ובחביבות, ויוצר מצבים שלא מאפשרים לסרב לבקשתו, מדגיש חוויות משותפות חיוביות. משתמש בנימוקים רגשיים. בונה על רגישותם של האחרים.'},
 {id:'reason',name:'פנייה לשכל (היגיון)',desc:'מציג הנמקות ורציונל מפורטים. משתמש בטיעונים הגיוניים. מציג נתונים, עובדות ותקדימים מהעבר. מרבה להסביר בפירוט, ומזמין את הצד השני לחשוב ״באובייקטיביות״. פחות מתייחס לטיעונים רגשיים, שלעיתים נראים אצלו לא רלוונטיים או בעלי ״מעמד משני״.'}
];
var SCORING_KEY=POIS.SCORING_KEY, pct=POIS.pct, level=POIS.level;
function score(id){return POIS.score(answers,id)}

var N=ITEMS.length, KEY='ngg-pois-v1', answers=new Array(N).fill(null), idx=0, busy=false;
var $=function(id){return document.getElementById(id)};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Review mode (?review=1) opens demo states for design review; it never writes to storage,
   so a participant's real progress on the same device is left untouched. */
var review=/(?:^|[?&])review=1(?:&|$)/.test(location.search.slice(1));

function save(){if(review)return;try{localStorage.setItem(KEY,JSON.stringify({a:answers,i:idx}))}catch(e){}}
function load(){try{var s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&Array.isArray(s.a)&&s.a.length===N){answers=s.a;idx=Math.min(s.i|0,N);return true}}catch(e){}return false}
function clear(){try{localStorage.removeItem(KEY)}catch(e){}}
function two(n){return (n<10?'0':'')+n}

function show(id){
  ['s-intro','s-deck','s-results'].forEach(function(s){$(s).classList.toggle('on',s===id)});
  $('count').hidden=id!=='s-deck';
}

/* answer buttons */
SCALE.forEach(function(s){
  var b=document.createElement('button');
  b.className='ans';b.type='button';b.dataset.v=s[0];b.setAttribute('aria-pressed','false');
  b.innerHTML='<span class="n">'+s[0]+'</span><span class="lbl">'+s[1]+'</span>';
  b.addEventListener('click',function(){answer(s[0])});
  $('answers').appendChild(b);
});

function fillCard(i){
  var card=$('card');
  if(i>=N){
    card.classList.add('done-card');
    $('q').innerHTML='זה היה הכרטיס האחרון.<span class="ex">כל 26 המשפטים סומנו. אפשר לחזור ולתקן, או לעבור לפרופיל.</span>';
    $('left').textContent='';
  }else{
    card.classList.remove('done-card');
    var it=ITEMS[i];
    $('q').innerHTML=it[0]+(it[1]?'<span class="ex">'+it[1]+'</span>':'');
    var rem=N-i-1;
    $('left').textContent=rem?('נותרו '+rem):'אחרון';
  }
  var rem2=Math.max(0,N-i-1);
  $('l1').classList.toggle('hide',rem2<1||i>=N);
  $('l2').classList.toggle('hide',rem2<2||i>=N);
  $('count').innerHTML=i>=N?'<b>26</b> / 26':'<b>'+two(i+1)+'</b> / 26';
  $('back').disabled=i===0;
  var done=i>=N;
  $('answers').style.display=done?'none':'';
  $('hint').textContent='';
  if(done){renderDoneCTA()}else{removeDoneCTA()}
  document.querySelectorAll('.ans').forEach(function(b){b.setAttribute('aria-pressed',String(answers[i]===+b.dataset.v))});
}
function renderDoneCTA(){
  if($('toResults'))return;
  var b=document.createElement('button');b.id='toResults';b.className='btn-primary';b.textContent='לפרופיל שלי';
  b.style.margin='0 20px';b.style.width='calc(100% - 40px)';
  b.addEventListener('click',results);
  $('answers').parentNode.insertBefore(b,$('answers'));
}
function removeDoneCTA(){var b=$('toResults');if(b)b.remove()}

function animate(dir,next){
  var card=$('card');
  if(reduce){next();return}
  busy=true;
  if(dir==='fwd'){
    card.className='card out';
    setTimeout(function(){
      next();
      card.className='card from-deck'+(idx>=N?' done-card':'');
      void card.offsetWidth;
      card.className='card settle'+(idx>=N?' done-card':'');
      setTimeout(function(){busy=false},180);
    },300);
  }else{
    next();
    card.className='card from-out'+(idx>=N?' done-card':'');
    void card.offsetWidth;
    card.className='card settle'+(idx>=N?' done-card':'');
    setTimeout(function(){busy=false},260);
  }
}

function answer(v){
  if(busy||idx>=N)return;
  answers[idx]=v;save();
  document.querySelectorAll('.ans').forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.v===v))});
  busy=true;
  setTimeout(function(){busy=false;animate('fwd',function(){idx++;save();fillCard(idx)})},reduce?0:140);
}
function back(){
  if(busy||idx===0)return;
  animate('back',function(){idx--;save();fillCard(idx)});
}

function results(){
  show('s-results');
  var box=$('profile');box.innerHTML='';
  var res=TACTICS.map(function(t){var sc=score(t.id),p=pct(t.id,sc);return {t:t,sc:sc,p:p,max:SCORING_KEY[t.id].length*5}});
  var max=Math.max.apply(null,res.map(function(x){return x.p}));
  res.forEach(function(x){
    var t=x.t,p=x.p,lvl=level(p);
    var d=document.createElement('details');d.className='tac'+(p===max?' top':'');
    d.innerHTML='<summary><div class="tac-head"><span class="tac-name">'+t.name+'</span><span class="tac-level">'+lvl+'<span class="raw"> · '+x.sc+' מתוך '+x.max+'</span></span></div>'+
      '<div class="track" role="img" aria-label="'+t.name+': '+lvl+'"><i></i><i></i><i></i><span class="marker"></span></div>'+
      '<span class="more">מה זה אומר<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span></summary>'+
      '<p class="desc">'+t.desc+'</p>';
    d.querySelector('.marker').style.right=p+'%'; /* set via CSSOM: the CSP blocks inline style attributes */
    box.appendChild(d);
  });
  box.classList.remove('shown');
  requestAnimationFrame(function(){requestAnimationFrame(function(){box.classList.add('shown')})});
  $('s-results').scrollTop=0;
}

$('start').addEventListener('click',function(){answers=new Array(N).fill(null);idx=0;save();show('s-deck');fillCard(0)});
$('resume').addEventListener('click',function(){show('s-deck');fillCard(idx)});
$('back').addEventListener('click',back);
$('restart').addEventListener('click',function(){clear();answers=new Array(N).fill(null);idx=0;$('resume').hidden=true;show('s-intro')});
document.addEventListener('keydown',function(e){
  if(!$('s-deck').classList.contains('on'))return;
  if(e.key>='1'&&e.key<='5'){answer(+e.key)}
  else if(e.key==='Backspace'||e.key==='ArrowRight'){e.preventDefault();back()}
});

if(load()&&answers.some(function(a){return a!==null})){$('resume').hidden=false}
/* review hooks: only with ?review=1, e.g. index.html?review=1#results */
if(review){
  var h=location.hash;
  if(h==='#deck'){show('s-deck');idx=6;answers[5]=4;fillCard(6)}
  if(h==='#done'){show('s-deck');idx=N;fillCard(N)}
  if(h==='#results'){answers=[3,4,5,2,3,4,2,2,3,1,4,2,4,3,5,3,4,2,4,5,3,2,2,3,3,5];results()}
}
})();
