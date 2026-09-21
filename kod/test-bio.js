
(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={};
  git("tanitim"); await bekle(400); window.scrollTo(0,430); await bekle(250);
  r.bioBolum=document.querySelectorAll(".bioBolum").length;
  r.bioBasliklar=[].slice.call(document.querySelectorAll(".bioBas")).map(function(e){return e.textContent;}).join(" | ");
  r.unvan=(document.querySelector(".bioUnvan")||{}).textContent;
  r.ciftSatir=document.querySelectorAll(".ciftSatir").length;
  r.alinti=(document.querySelector(".bioAlinti")||{}).textContent;
  r.bioUzunluk=document.querySelector(".bioKart").textContent.trim().length;
  r.dipnot=(document.querySelector(".bioDipnot")||{}).textContent.slice(0,60);
  r.tabloSatir=document.querySelectorAll(".tabloSatir").length;
  r.toplamSayi=[].slice.call(document.querySelectorAll(".sayiKutu .sSayi")).map(function(e){return e.textContent;}).join(",");
  git("egitim"); await bekle(200);
  r.egitimSayi=[].slice.call(document.querySelectorAll("#icerik .sayiKutu .sSayi")).map(function(e){return e.textContent;}).join(",");
  r.btk=[].slice.call(document.querySelectorAll("#icerik .tabloSatir")).map(function(e){return e.textContent;}).filter(function(t){return t.indexOf("BTK")>-1;})[0];
  r.sayfaTasma=document.documentElement.scrollWidth-window.innerWidth;
  r.tasan=(function(){var n=0;[].slice.call(document.querySelectorAll("#icerik *")).forEach(function(e){var b=e.getBoundingClientRect(); if(b.width>0&&(b.left<-2||b.right>window.innerWidth+2)) n++;});return n;})();
  return JSON.stringify(r);
})()
