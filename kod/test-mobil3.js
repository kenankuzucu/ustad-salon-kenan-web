
(async function(){
  var r={}; function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  git("radyo"); await bekle(200);
  var kd=document.querySelector("#kanalListe .kanal");
  kd.scrollIntoView({block:"center",behavior:"instant"}); await bekle(60);
  var k=kd.getBoundingClientRect();
  r.konum=[Math.round(k.top),Math.round(k.bottom),window.innerHeight];
  var u=document.elementFromPoint(Math.round(k.left+k.width/2),Math.round(k.top+k.height/2));
  r.kanalHit=(u&&(u===kd||kd.contains(u)))?"ULASIR":("ENGELLI:"+(u?u.className:"yok"));
  var btn=document.getElementById("rDugme");
  btn.scrollIntoView({block:"center",behavior:"instant"}); await bekle(60);
  var k2=btn.getBoundingClientRect();
  var u2=document.elementFromPoint(Math.round(k2.left+k2.width/2),Math.round(k2.top+k2.height/2));
  r.dinleHit=(u2&&(u2===btn||btn.contains(u2)))?"ULASIR":"ENGELLI";
  var mn=document.querySelector('#menuListe .menuSatir[data-git="logo"]');
  kapakAc(); await bekle(60);
  mn=document.querySelector('#menuListe .menuSatir[data-git="logo"]');
  var k3=mn.getBoundingClientRect();
  var u3=document.elementFromPoint(Math.round(k3.left+k3.width/2),Math.round(k3.top+k3.height/2));
  r.logoHit=(u3&&(u3===mn||mn.contains(u3)))?"ULASIR":"ENGELLI";
  mn.click(); await bekle(200);
  r.bolum=document.body.getAttribute("data-bolum");
  r.logoKart=document.querySelectorAll(".logoKart").length;
  r.logoResimYuklendi=[].slice.call(document.querySelectorAll(".logoKart img")).map(function(i){return i.naturalWidth;});
  r.cekmeceKapandi=document.body.className.indexOf("cekmeceAcik")===-1;
  return JSON.stringify(r);
})()
