
(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={}, paylas={};
  for(var i=0;i<MENU.length;i++){
    git(MENU[i].id); await bekle(120);
    var p=document.querySelectorAll("#icerik #paylasSatir .miniBtn, #icerik #paylasSatir a").length;
    paylas[MENU[i].id]=p;
  }
  r.paylasDugmeleri=paylas;
  git("radyo"); await bekle(150);
  r.kanal=document.querySelectorAll("#kanalListe .kanal").length;
  r.soz=(document.getElementById("sozBuyuk")||{}).textContent.length;
  r.saat=(document.getElementById("saatBuyuk")||{}).textContent;
  /* aynı id iki kez var mı */
  var idler={}, cift=[];
  [].slice.call(document.querySelectorAll("[id]")).forEach(function(e){ if(idler[e.id]) cift.push(e.id); idler[e.id]=1; });
  r.ciftId=cift;
  /* Türkçe karakter kaybı kontrolü: içerikte ASCII'ye düşmüş kelime var mı */
  var metin=document.getElementById("icerik").textContent;
  r.turkceOrnek=["şiir","makale","eser","iletişim","biyografi","eğitim","güvenlik","Gaziantep"].map(function(k){return k+":"+(metin.indexOf(k)>-1);}).join(" ");
  return JSON.stringify(r);
})()
