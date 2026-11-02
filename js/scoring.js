/* POIS scoring: item-to-tactic key and percentile norms.
   Source: original NGG POIS sheets ("ריכוז תוצאות", "דף נורמות"); see docs/reference/.
   Works in the browser (window.POIS) and in Node (module.exports) for tests. */
(function(root){
'use strict';
/* Scoring key and norms: transcribed from the original POIS sheets ("ריכוז תוצאות", "דף נורמות"), Nov 2026.
   NORMS: per tactic, percentile bins [from,to] each holding score slots in ascending order; a slot may hold several scores. */
var SCORING_KEY={up:[7,10,12,22],coal:[1,21],press:[4,8,14,18,24],barg:[5,9,16,23,25],emo:[2,6,11,13,17,19],reason:[3,15,20,26]};
function r(a,b){var o=[];for(var x=a;x<=b;x++)o.push(x);return o}
var NORMS={
 up:[[10,20,[[4]]],[20,30,[[5]]],[30,40,[[6]]],[60,70,[[7]]],[70,80,[[8],[9]]],[80,90,[[10],[11]]],[90,100,[[12],[13],r(14,20)]]],
 coal:[[10,20,[[2]]],[20,30,[[3]]],[30,40,[[4]]],[50,60,[[5]]],[70,80,[[6]]],[80,90,[[7],[8]]],[90,100,[[9],[10]]]],
 press:[[0,10,[[5,6]]],[10,20,[[7]]],[20,30,[[8],[9]]],[30,40,[[10]]],[40,50,[[11]]],[50,60,[[12]]],[60,70,[[13]]],[70,80,[[14],[15],[16]]],[80,90,[[17],[18]]],[90,100,[[19],[20],r(21,25)]]],
 barg:[[0,10,[[5]]],[10,20,[[6]]],[20,30,[[7],[8]]],[30,40,[[9]]],[50,60,[[10]]],[60,70,[[11]]],[70,80,[[12,13],[14,15],[16,17]]],[80,90,[[18,19],[20,21]]],[90,100,[[22,23],[24,25]]]],
 emo:[[0,10,[[6],[7],[8]]],[10,20,[[9],[10],[11]]],[20,30,[[12],[13],[14]]],[30,40,[[15]]],[40,50,[[16]]],[50,60,[[17]]],[60,70,[[18]]],[70,80,[[19],[20],[21]]],[80,90,[[22],[23]]],[90,100,[[24],[25],r(26,30)]]],
 reason:[[0,10,[[4],[5],[6]]],[10,20,[[7],[8],[9]]],[20,30,[[10],[11],[12]]],[30,40,[[13]]],[50,60,[[14]]],[60,70,[[15]]],[70,80,[[16],[17]]],[80,90,[[18]]],[90,100,[[19],[20]]]]
};
function score(answers,id){return SCORING_KEY[id].reduce(function(t,n){return t+(answers[n-1]||0)},0)}
function pct(id,sc){
  var bins=NORMS[id];
  for(var i=0;i<bins.length;i++){var b=bins[i],slots=b[2];
    for(var j=0;j<slots.length;j++){if(slots[j].indexOf(sc)>-1)return b[0]+(j+.5)/slots.length*(b[1]-b[0])}}
  return sc<SCORING_KEY[id].length*3?5:95;
}
function level(p){return p>=70?'גבוה':p>=30?'בינוני':'נמוך'}

var api={SCORING_KEY:SCORING_KEY,NORMS:NORMS,score:score,pct:pct,level:level};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.POIS=api;
})(typeof window!=='undefined'?window:globalThis);
