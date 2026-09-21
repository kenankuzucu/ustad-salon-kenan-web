(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={};
  try{ localStorage.clear(); sessionStorage.clear(); }catch(e){}
  yonAc(); await bekle(350);
  document.getElementById("p_giris").value="1981"; yonGiris(); await bekle(350);
  r.sekmeler=[].slice.call(document.querySelectorAll(".yonSek")).map(function(b){return b.textContent;}).join(" | ");
  // --- YENİ KATEGORİ AÇ ---
  yonSekme("kategori"); await bekle(300);
  r.katSatirSayisi=document.querySelectorAll(".yonKatSatir").length;
  document.getElementById("ky_ad").value="SEYAHAT NOTLARI";
  document.getElementById("ky_simge").value="🧭";
  document.getElementById("ky_renk").value="#22a2c4";
  document.getElementById("ky_aciklama").value="Yol notları ve gezi yazıları";
  kYeni(); await bekle(500);
  r.yeniKategoriVar=!!bolumBul("ozel1");
  r.menuSayisi=MENU.length;
  r.menuSon=MENU[MENU.length-1].ad+" / "+MENU[MENU.length-1].renk;
  r.menuDom=[].slice.call(document.querySelectorAll(".mAd")).map(function(e){return e.textContent;}).pop();
  // --- ÖZEL KATEGORİYE İÇERİK EKLE ---
  yonSekme("icerik"); await bekle(250);
  var sec=document.getElementById("f_kategori");
  r.secenekler=[].slice.call(sec.options).map(function(o){return o.value;}).join(",");
  sec.value="ozel1"; yonKategoriSec(); await bekle(300);
  r.ozelAlanlar=!!document.getElementById("f_ad")&&!!document.getElementById("f_paragraf")&&!!document.getElementById("f_link");
  document.getElementById("f_ad").value="Halfeti Notları";
  document.getElementById("f_paragraf").value="Fırat'ın kıyısında bir akşam.\n\nTaş evlerin gölgesi suya düşer.";
  document.getElementById("f_link").value="https://www.ustadkenankuzucu.com.tr";
  yonEkle(); await bekle(500);
  r.ozelIcerik=(JSON.parse(localStorage.getItem("usk-yonetim-v1")).icerikOzel.ozel1||[]).length;
  // bölümü aç
  yonKapat(); await bekle(200);
  window.git("ozel1"); await bekle(600);
  var t=document.getElementById("icerik").textContent;
  r.bolumBaslik=(document.querySelector(".bolumBas h2")||{}).textContent;
  r.bolumIcerik=(t.indexOf("Halfeti Notları")>-1)&&(t.indexOf("Fırat'ın kıyısında")>-1);
  r.yorumKutuOz=(t.indexOf("ZİYARETÇİ YORUMLARI")>-1);
  r.renkBeyan=document.body.style.getPropertyValue("--ana");
  r.menuAktif=[].slice.call(document.querySelectorAll(".menuSatir.aktif .mAd")).map(function(e){return e.textContent;}).join("");
  return JSON.stringify(r);
})()
