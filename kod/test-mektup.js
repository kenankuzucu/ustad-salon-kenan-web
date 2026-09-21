
(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={};
  r.menuSayisi=document.querySelectorAll("#menuListe .menuSatir").length;
  r.menuIdler=MENU.map(function(m){return m.id;}).join(",");
  var sayim={};
  for(var i=0;i<MENU.length;i++){
    git(MENU[i].id); await bekle(110);
    sayim[MENU[i].id]={renk:getComputedStyle(document.body).getPropertyValue("--ana").trim(),
      kart:document.querySelectorAll("#icerik .kart").length,
      paylas:document.querySelectorAll("#icerik #paylasSatir .miniBtn, #icerik #paylasSatir a").length,
      uzunluk:document.getElementById("icerik").textContent.trim().length};
  }
  r.bolumler=sayim;
  git("mektuplar"); await bekle(150);
  r.mektupAd=(document.querySelector(".kart.mektup h3")||{}).textContent;
  r.mektupParagraf=document.querySelectorAll(".kart.mektup .makaleGovde p").length;
  git("tanitim"); await bekle(150);
  r.bioBolum=document.querySelectorAll(".bioBolum").length;
  r.bioBasliklar=[].slice.call(document.querySelectorAll(".bioBas")).map(function(e){return e.textContent;}).join(" | ");
  r.bioUzunluk=document.querySelector(".bioKart").textContent.trim().length;
  r.zamanSatir=document.querySelectorAll(".zamanSatir").length;
  r.kimlikKutu=document.querySelectorAll(".kimlikKutu").length;
  r.salonFiyatSatir=document.querySelectorAll(".satir").length;
  araGirdi("mektup"); await bekle(120);
  r.aramaMektup=document.querySelectorAll("#araSonuc .sonucSatir").length;
  aramaGuncel=document.getElementById("araSonuc").textContent.slice(0,40);
  aramaKapat();
  r.sayfaTasma=document.documentElement.scrollWidth-window.innerWidth;
  r.ciftId=(function(){var s={},c=[];[].slice.call(document.querySelectorAll("[id]")).forEach(function(e){if(s[e.id])c.push(e.id);s[e.id]=1;});return c;})();
  return JSON.stringify(r);
})()
