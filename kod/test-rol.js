(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={}; try{ localStorage.removeItem("usk-yonetim-v1"); }catch(e){}
  // --- MİSAFİR ---
  git("siirler"); await bekle(400);
  r.rozet=document.getElementById("rolDugme").textContent;
  r.yonetimDugme=document.getElementById("yonDugme").textContent;
  r.yorumKartVar=!!document.querySelector(".yorumKart");
  r.misafirYorumYazabilirMi=!!document.querySelector(".yorumKart button");
  // misafir kategoriye ekleyemez
  window.__yonKat="siirler"; var onceki=SIIRLER.length;
  yonEkle(); await bekle(150);
  r.misafirEklemeEngellendi=(SIIRLER.length===onceki);
  r.misafirUyari=(document.getElementById("yonUyari")||{}).textContent||"(panel kapalı)";
  // misafir önce üye olmadan yorum gönderemez
  r.onceUyeOlmali=(JSON.parse(localStorage.getItem("usk-yonetim-v1")||'{"yorumlar":[]}').yorumlar||[]).length;
  // üye ol
  var alan=document.querySelector(".yorumKart input");
  document.querySelector(".yorumKart input").value="Misafir Ziyaretçi";
  document.querySelectorAll(".yorumKart input")[1].value="0555 000 11 22";
  uyeOl("siirler"); await bekle(500);
  r.uyeOldu=localStorage.getItem("usk-uye");
  // yorum yaz
  git("siirler"); await bekle(400);
  var ta=document.getElementById("yo_metin_siirler");
  r.yorumAlaniVar=!!ta;
  ta.value="Şiirler çok güzel olmuş, elinize sağlık üstadım.";
  yorumGonder("siirler"); await bekle(500);
  var dep=JSON.parse(localStorage.getItem("usk-yonetim-v1"));
  r.yorumSayi=dep.yorumlar.length+" durum:"+dep.yorumlar[0].durum;
  r.misafirGoruyorMu=!!document.querySelector(".yorumOge");
  // --- YETKİLİ ---
  yonAc(); await bekle(300);
  document.getElementById("p_giris").value="0000"; yonGiris(); await bekle(150);
  r.yanlisPin=!document.getElementById("yonKutu").innerHTML;
  document.getElementById("p_giris").value="1981"; yonGiris(); await bekle(300);
  r.rozetSonra=document.getElementById("rolDugme").textContent;
  r.sekmeler=[].slice.call(document.querySelectorAll(".yonSek")).map(function(b){return b.textContent;}).join(" | ");
  // yorum onayla
  yonSekme("yorum"); await bekle(250);
  r.yorumSayac=(document.querySelector(".yonSayac")||{}).textContent;
  yorumOnayla(0); await bekle(300);
  r.onaySonrasi=JSON.parse(localStorage.getItem("usk-yonetim-v1")).yorumlar[0].durum;
  // yetkili içerik ekleyebilir
  yonSekme("icerik"); await bekle(200);
  document.getElementById("f_kategori").value="mektuplar"; yonKategoriSec(); await bekle(300);
  r.mektupAlanlari=!!document.getElementById("f_ad")&&!!document.getElementById("f_paragraf");
  document.getElementById("f_ad").value="Panel Test Mektubu";
  document.getElementById("f_paragraf").value="Birinci paragraf.\n\nİkinci paragraf.";
  var mcOnce=MEKTUPLAR.length; yonEkle(); await bekle(400);
  r.yetkiliEkladi=MEKTUPLAR.length>mcOnce;
  yonKapat(); await bekle(200);
  git("mektuplar"); await bekle(400);
  r.mektupSitede=[].slice.call(document.querySelectorAll(".makaleBaslik,.makaleGovde ~ *,h3")).map(function(e){return e.textContent.slice(0,30);}).join("|").indexOf("Panel Test")>-1;
  r.tasma=document.documentElement.scrollWidth-window.innerWidth;
  return JSON.stringify(r);
})()
