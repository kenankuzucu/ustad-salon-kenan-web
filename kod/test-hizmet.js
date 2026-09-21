
(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={};
  git("tanitim"); await bekle(450);
  r.hizmetSatir=document.querySelectorAll(".satirListe .satir").length;
  r.fiyatlar=[].slice.call(document.querySelectorAll(".satFiyat")).map(function(e){return e.textContent.trim();}).join(" | ");
  r.hizmetAdlari=[].slice.call(document.querySelectorAll(".satAd")).map(function(e){return e.textContent.split(" · ")[0];}).join(" | ");
  r.saatSatir=document.querySelectorAll(".saatSatir").length;
  r.bioBolum=document.querySelectorAll(".bioBolum").length;
  r.sayfaTasma=document.documentElement.scrollWidth-window.innerWidth;
  window.scrollTo(0,300); await bekle(200);
  return JSON.stringify(r);
})()
