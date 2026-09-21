
(async function(){
  var r={};
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var st=document.createElement("style");
  st.textContent="*{transition:none!important;animation:none!important}html{scroll-behavior:auto!important}";
  document.head.appendChild(st);
  r.ekran=[window.innerWidth,window.innerHeight];
  r.hamburger=getComputedStyle(document.querySelector(".hamburger")).display;
  r.menuBaslangicSol=Math.round(document.querySelector(".sol").getBoundingClientRect().left);
  var h=document.querySelector(".hamburger"), k=h.getBoundingClientRect();
  var cx=Math.round(k.left+k.width/2), cy=Math.round(k.top+k.height/2);
  var ustte=document.elementFromPoint(cx,cy);
  r.hamburgerHit=(ustte&&(ustte===h||h.contains(ustte)))?"ULASIR":("ENGELLI:"+(ustte?ustte.className:"yok"));
  h.click(); await bekle(60);
  r.cekmeceAcik=document.body.className.indexOf("cekmeceAcik")>-1;
  r.menuSol=Math.round(document.querySelector(".sol").getBoundingClientRect().left);
  var satir=document.querySelector("#menuListe .menuSatir[data-git=\"siirler\"]"), k2=satir.getBoundingClientRect();
  var u2=document.elementFromPoint(Math.round(k2.left+k2.width/2),Math.round(k2.top+k2.height/2));
  r.menuHit=(u2&&(u2===satir||satir.contains(u2)))?"ULASIR":"ENGELLI";
  satir.click(); await bekle(140);
  r.sonraBolum=document.body.getAttribute("data-bolum");
  r.cekmeceKapandi=document.body.className.indexOf("cekmeceAcik")===-1;
  r.siirKart=document.querySelectorAll(".siirKart").length;
  r.sayfaTasma=document.documentElement.scrollWidth-window.innerWidth;
  r.aramaGenislik=Math.round(document.querySelector(".araKutu input").getBoundingClientRect().width);
  r.madalyon=Math.round(document.querySelector(".madalyon").getBoundingClientRect().width);
  r.h2=Math.round(document.querySelector("#icerik h2").getBoundingClientRect().width);
  git("radyo"); await bekle(180);
  var kd=document.querySelector("#kanalListe .kanal"), k3=kd.getBoundingClientRect();
  var u3=document.elementFromPoint(Math.round(k3.left+k3.width/2),Math.round(k3.top+k3.height/2));
  r.kanalHit=(u3&&(u3===kd||kd.contains(u3)))?"ULASIR":"ENGELLI";
  r.kanalSayi=document.querySelectorAll("#kanalListe .kanal").length;
  kd.click(); await bekle(250);
  r.kanalSecildi=document.getElementById("rKanal").textContent;
  radyoDurdur();
  git("galeri"); await bekle(180);
  var g=document.querySelector(".gKart"); g.click(); await bekle(100);
  r.buyut=document.getElementById("buyut").className;
  r.buyutKaynak=document.getElementById("buyutResim").getAttribute("src");
  buyutKapat();
  r.galeriFoto=document.querySelectorAll(".gKart").length;
  return JSON.stringify(r);
})()
