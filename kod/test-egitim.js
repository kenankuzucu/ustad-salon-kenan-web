
(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  git("egitim"); await bekle(500);
  var r={};
  r.sayilar=[].slice.call(document.querySelectorAll("#icerik .sayiKutu .sSayi")).map(function(e){return e.textContent;}).join(",");
  r.aiKart=document.querySelectorAll("#icerik .kart").length;
  r.aiBaslik=[].slice.call(document.querySelectorAll(".kBaslik")).map(function(e){return e.textContent.split("·")[0].trim();}).join(" | ");
  r.aiMadde=[].slice.call(document.querySelectorAll(".kart")).map(function(k){return k.textContent;}).filter(function(t){return t.indexOf("MCP Security")>-1;}).length;
  r.toplamKutu=[].slice.call(document.querySelectorAll(".sayiKutu")).map(function(e){return e.textContent.replace(/\s+/g," ").trim();}).join(" || ");
  window.scrollTo(0,560); await bekle(200);
  r.tasma=document.documentElement.scrollWidth-window.innerWidth;
  return JSON.stringify(r);
})()
