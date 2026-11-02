/* Profile export, generated entirely on the device (no library, nothing uploaded):
   - PNG: phone-sized profile card (six tactics at a glance), readable in a photo gallery without zooming.
   - PDF: one A4 page with the profile and the description of every tactic, for printing or keeping.
   Browser: window.POISExport.  Node (tests): module.exports.buildPdf. */
(function(root){
'use strict';

var C={ground:'#f4f4f5',band:'#ebebec',tint:'#dadbdc',card:'#ffffff',cardLine:'rgba(147,147,147,.55)',
       ink:'#1e1e21',ink2:'#3c3c40',muted:'#5a5a5e',accent:'#ec2a8c',accentText:'#a3175f'};
var FAMILY="Assistant,'Segoe UI','Arial Hebrew',Arial,sans-serif";
var T={
  head:'שאלון אסטרטגיות השפעה',
  title:'פרופיל ההשפעה שלי',
  sub:'שש דרכי השפעה, ולצד כל אחת המיקום ביחס לעונים אחרים. אין דרך נכונה אחת; זו מראה, לא ציון.',
  legend:['נמוך','בינוני','גבוה'],
  note:'המיקום על הפס נקבע לפי נורמות השאלון: נמוך – מתחת לאחוזון ה־30; בינוני – אחוזון 30 עד 70; גבוה – אחוזון 70 ומעלה.'
};
/* Page formats, in points. k = canvas pixels per point. */
var FMT={
  card:{w:390,minH:0,k:3,m:20,pad:18,desc:false,
    s:{logo:30,head:13,date:12,titleGap:46,title:28,sub:15,subLH:21,subW:0.96,legend:12,name:18,level:14,
       blockTop:16,nameToTrack:13,track:10,blockBottom:18,marker:7.5,note:11.5,noteLH:16,tickW:28,radius:6}},
  a4:{w:595.28,minH:841.89,k:200/72,m:36,pad:18,desc:true,
    s:{logo:30,head:11,date:10,titleGap:42,title:26,sub:11.5,subLH:16,subW:0.9,legend:9.5,name:14,level:11,
       blockTop:14,nameToTrack:11,track:7,trackToDesc:13,desc:9.8,descLH:14.2,blockBottom:14,marker:5.5,
       note:9,noteLH:13,tickW:24,radius:4}}
};

function setFont(ctx,weight,size){ctx.font=weight+' '+size+'px '+FAMILY}
function wrap(ctx,text,width){
  var words=text.split(' '),lines=[],line='';
  for(var i=0;i<words.length;i++){
    var test=line?line+' '+words[i]:words[i];
    if(line&&ctx.measureText(test).width>width){lines.push(line);line=words[i]}else{line=test}
  }
  if(line)lines.push(line);
  return lines;
}
function rrect(ctx,x,y,w,h,r){
  r=Math.min(r,w/2,h/2);
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);
  ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);
  ctx.arcTo(x,y,x+r,y,r);ctx.closePath();
}

/* Measure pass: wrap every paragraph and work out positions and the page height. */
function plan(ctx,f,data){
  var S=f.s, cw=f.w-2*f.m, inner=cw-2*f.pad, y=f.m, p={rows:[]};
  p.headY=y; y+=S.logo;
  y+=S.titleGap-S.logo+S.title*0.75; p.titleY=y;
  setFont(ctx,400,S.sub); p.sub=wrap(ctx,T.sub,cw*S.subW);
  p.subY=y+S.subLH+2; y=p.subY+(p.sub.length-1)*S.subLH+20;
  p.legendY=y+S.legend*0.8; y+=S.legend+7;
  p.cardY=y; y+=4;
  if(f.desc)setFont(ctx,400,S.desc);
  data.rows.forEach(function(r){
    var b={y:y}; y+=S.blockTop;
    b.nameY=y+S.name*0.78; y+=S.name+S.nameToTrack;
    b.trackY=y; y+=S.track;
    if(f.desc){y+=S.trackToDesc; b.desc=wrap(ctx,r.desc,inner); b.descY=y+S.desc*0.78; y+=(b.desc.length-1)*S.descLH+S.desc}
    y+=S.blockBottom; p.rows.push(b);
  });
  y+=2; p.cardH=y-p.cardY;
  setFont(ctx,400,S.note); p.note=wrap(ctx,T.note,cw);
  y+=16; p.noteY=y+S.note*0.78; y+=(p.note.length-1)*S.noteLH+S.note;
  p.height=Math.max(f.minH,y+f.m);                      /* never clip: the page grows if content overflows */
  return p;
}

/* data: {date, logo (loaded <img>), rows:[{name, desc, level, score, max, pct, top}]}; kind: 'card' | 'a4' */
function render(data,kind){
  var f=FMT[kind], S=f.s, K=f.k;
  var cv=document.createElement('canvas');
  cv.setAttribute('dir','rtl'); cv.className='export-canvas';
  document.body.appendChild(cv);                        /* inside the RTL document, so text direction resolves to rtl */
  var p=plan(cv.getContext('2d'),f,data);
  cv.width=Math.round(f.w*K); cv.height=Math.round(p.height*K);
  var ctx=cv.getContext('2d');
  ctx.setTransform(K,0,0,K,0,0);
  try{ctx.direction='rtl'}catch(e){}
  ctx.textBaseline='alphabetic';

  var R=f.w-f.m, L=f.m, cw=R-L, iR=R-f.pad, iL=L+f.pad, iw=iR-iL;

  ctx.fillStyle=C.ground; ctx.fillRect(0,0,f.w,p.height);

  /* header: logo and questionnaire name on the right, date on the left */
  var lh=S.logo, lw=data.logo&&data.logo.naturalWidth?lh*data.logo.naturalWidth/data.logo.naturalHeight:0;
  if(lw)ctx.drawImage(data.logo,R-lw,p.headY,lw,lh);
  setFont(ctx,700,S.head); ctx.fillStyle=C.ink2; ctx.textAlign='right';
  ctx.fillText(T.head,R-lw-(lw?10:0),p.headY+lh/2+S.head*0.35);
  setFont(ctx,400,S.date); ctx.fillStyle=C.muted; ctx.textAlign='left';
  ctx.fillText(data.date,L,p.headY+lh/2+S.date*0.35);

  /* title and subtitle */
  ctx.textAlign='right';
  setFont(ctx,800,S.title); ctx.fillStyle=C.ink; ctx.fillText(T.title,R,p.titleY);
  setFont(ctx,400,S.sub); ctx.fillStyle=C.muted;
  p.sub.forEach(function(l,i){ctx.fillText(l,R,p.subY+i*S.subLH)});

  /* legend, centred over the three bands (low on the right, high on the left) */
  setFont(ctx,400,S.legend); ctx.fillStyle=C.muted; ctx.textAlign='center';
  [0.15,0.5,0.85].forEach(function(x,i){ctx.fillText(T.legend[i],iR-x*iw,p.legendY)});

  /* card: white, silver hairline, magenta top tick */
  ctx.save();
  ctx.shadowColor='rgba(30,30,33,.08)'; ctx.shadowBlur=18*K; ctx.shadowOffsetY=5*K;
  rrect(ctx,L,p.cardY,cw,p.cardH,S.radius); ctx.fillStyle=C.card; ctx.fill();
  ctx.restore();
  rrect(ctx,L,p.cardY,cw,p.cardH,S.radius); ctx.lineWidth=0.75; ctx.strokeStyle=C.cardLine; ctx.stroke();
  ctx.fillStyle=C.accent; ctx.fillRect(R-f.pad-S.tickW,p.cardY,S.tickW,3);

  data.rows.forEach(function(r,i){
    var b=p.rows[i];
    if(i>0){ctx.fillStyle=C.tint; ctx.fillRect(L,b.y,cw,0.75)}
    setFont(ctx,800,S.name); ctx.fillStyle=C.ink; ctx.textAlign='right'; ctx.fillText(r.name,iR,b.nameY);
    /* "level · score of max" on the left, as two runs so the level can be bold */
    var raw=' · '+r.score+' מתוך '+r.max;
    setFont(ctx,400,S.level); var rw=ctx.measureText(raw).width;
    ctx.fillStyle=C.muted; ctx.textAlign='left'; ctx.fillText(raw,iL,b.nameY);
    setFont(ctx,700,S.level); ctx.fillStyle=r.top?C.accentText:C.muted; ctx.fillText(r.level,iL+rw,b.nameY);
    /* track: 30 / 40 / 30 bands, low band on the right */
    var g=2;
    [[0,0.3],[0.3,0.7],[0.7,1]].forEach(function(s,k){
      var x1=iR-s[1]*iw+(k<2?g/2:0), x2=iR-s[0]*iw-(k>0?g/2:0);
      rrect(ctx,x1,b.trackY,x2-x1,S.track,S.track*0.28); ctx.fillStyle=k===1?C.tint:C.band; ctx.fill();
    });
    /* marker: graphite, magenta for the top tactic(s) */
    var mx=iR-Math.max(0,Math.min(100,r.pct))/100*iw, my=b.trackY+S.track/2;
    ctx.save(); ctx.shadowColor='rgba(0,0,0,.22)'; ctx.shadowBlur=2.5*K; ctx.shadowOffsetY=0.6*K;
    ctx.beginPath(); ctx.arc(mx,my,S.marker+S.marker*0.3,0,Math.PI*2); ctx.fillStyle=C.card; ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.arc(mx,my,S.marker,0,Math.PI*2); ctx.fillStyle=r.top?C.accent:C.ink; ctx.fill();
    if(f.desc){
      setFont(ctx,400,S.desc); ctx.fillStyle=C.ink2; ctx.textAlign='right';
      b.desc.forEach(function(l,j){ctx.fillText(l,iR,b.descY+j*S.descLH)});
    }
  });

  setFont(ctx,400,S.note); ctx.fillStyle=C.muted; ctx.textAlign='right';
  p.note.forEach(function(l,i){ctx.fillText(l,R,p.noteY+i*S.noteLH)});

  cv.remove();
  return {canvas:cv,w:f.w,h:p.height};
}

/* ---------- files ---------- */
function dataUrlBytes(url){
  var s=atob(url.slice(url.indexOf(',')+1)), b=new Uint8Array(s.length);
  for(var i=0;i<s.length;i++)b[i]=s.charCodeAt(i);
  return b;
}
function ascii(s){var b=new Uint8Array(s.length);for(var i=0;i<s.length;i++)b[i]=s.charCodeAt(i)&255;return b}
function utf16hex(s){
  var h='FEFF';
  for(var i=0;i<s.length;i++)h+=('000'+s.charCodeAt(i).toString(16).toUpperCase()).slice(-4);
  return '<'+h+'>';
}
function pad10(n){return ('000000000'+n).slice(-10)}

/* One-page PDF whose page (pageW x pageH points) is filled by a single JPEG image of pxW x pxH. */
function buildPdf(jpeg,pxW,pxH,pageW,pageH,title){
  var parts=[],len=0,offs=[];
  function put(x){var b=typeof x==='string'?ascii(x):x;parts.push(b);len+=b.length}
  function obj(n,body){offs[n]=len;put(n+' 0 obj\n'+body+'\nendobj\n')}
  var w=pageW.toFixed(2), h=pageH.toFixed(2), draw='q '+w+' 0 0 '+h+' 0 0 cm /Im0 Do Q';
  put('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
  obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+w+' '+h+'] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
  offs[4]=len;
  put('4 0 obj\n<< /Type /XObject /Subtype /Image /Width '+pxW+' /Height '+pxH+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.length+' >>\nstream\n');
  put(jpeg); put('\nendstream\nendobj\n');
  obj(5,'<< /Length '+draw.length+' >>\nstream\n'+draw+'\nendstream');
  obj(6,'<< /Title '+utf16hex(title||'')+' /Producer (NGG) >>');
  var xref=len, x='xref\n0 7\n0000000000 65535 f \n';
  for(var n=1;n<=6;n++)x+=pad10(offs[n])+' 00000 n \n';
  put(x+'trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n'+xref+'\n%%EOF\n');
  var out=new Uint8Array(len),o=0;
  parts.forEach(function(b){out.set(b,o);o+=b.length});
  return out;
}

function png(r){return new Blob([dataUrlBytes(r.canvas.toDataURL('image/png'))],{type:'image/png'})}
function pdf(r){
  var jpeg=dataUrlBytes(r.canvas.toDataURL('image/jpeg',0.95));
  return new Blob([buildPdf(jpeg,r.canvas.width,r.canvas.height,r.w,r.h,T.title)],{type:'application/pdf'});
}

/* Phones: the system share sheet (save to Photos or Files, or send). Elsewhere: a regular download.
   Must be called synchronously from the tap, or the browser refuses the share request. */
function download(blob,name){
  var u=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=u;a.download=name;a.hidden=true;document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(u)},5000);
}
function save(blob,name){
  var file=null;
  try{file=new File([blob],name,{type:blob.type})}catch(e){}
  var phone=root.matchMedia&&root.matchMedia('(pointer:coarse)').matches;
  if(phone&&file&&navigator.canShare&&navigator.canShare({files:[file]})){
    navigator.share({files:[file],title:T.title}).catch(function(e){if(!e||e.name!=='AbortError')download(blob,name)});
    return 'share';
  }
  download(blob,name);
  return 'download';
}

var api={render:render,png:png,pdf:pdf,save:save,buildPdf:buildPdf};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.POISExport=api;
})(typeof window!=='undefined'?window:globalThis);
