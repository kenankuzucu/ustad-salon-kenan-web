(async function(){
  function bekle(ms){return new Promise(function(c){setTimeout(c,ms);});}
  var r={};
  r.dugmeVar=!!document.getElementById("yonDugme");
  // 1) PIN perdesi
  yonAc(); await bekle(250);
  r.perde=document.getElementById("yonPerde").classList.contains("gor");
  r.pinAlani=!!document.getElementById("p_giris");
  document.getElementById("p_giris").value="0000"; yonGiris(); await bekle(100);
  r.yanlisPinEngellendi=!document.getElementById("yonKutu").innerHTML;
  document.getElementById("p_giris").value="1981"; yonGiris(); await bekle(200);
  r.panelAcildi=document.querySelectorAll(".yonSekmeler .yonSek").length;
  r.sekmeler=[].slice.call(document.querySelectorAll(".yonSek")).map(function(b){return b.textContent;}).join(" | ");
  // 2) şiir ekle
  var onceki=SIIRLER.length;
  yonSekme("icerik"); await bekle(120);
  window.__yonKat="siirler"; yonKategoriSec(); await bekle(150);
  document.getElementById("f_ad").value="Deneme Şiiri — Panel Testi";
  document.getElementById("f_dize").value="Birinci dize burada\nİkinci dize burada\nÜçüncü dize burada";
  yonEkle(); await bekle(300);
  r.siirArtti=SIIRLER.length+" ("+onceki+"→"+SIIRLER.length+")";
  r.eklenenSon=SIIRLER[SIIRLER.length-1].ad+" / dize:"+SIIRLER[SIIRLER.length-1].dize.length;
  r.menuNot=[].slice.call(document.querySelectorAll(".mNot")).map(function(e){return e.textContent;}).join(",");
  // 3) makale ekle
  window.__yonKat="makaleler"; yonKategoriSec(); await bekle(120);
  document.getElementById("f_ad").value="Panel Test Makalesi";
  document.getElementById("f_ozet").value="Kısa özet";
  document.getElementById("f_paragraf").value="Birinci paragraf.\n\nİkinci paragraf.";
  yonEkle(); await bekle(250);
  r.makale=MAKALELER.length+" son:"+MAKALELER[MAKALELER.length-1].ad+" paragraf:"+MAKALELER[MAKALELER.length-1].paragraf.length;
  // 4) örnek şiiri gizle
  var ilkAd=SIIRLER[0].ad;
  window.__yonKat="siirler"; yonKategoriSec(); await bekle(150);
  yonGizle(0); await bekle(200);
  r.gizleme=("gizli:"+JSON.parse(localStorage.getItem("usk-yonetim-v1")).gizli.siirler.join(","))+" | ilkAdArtik:"+(SIIRLER[0].ad!==ilkAd);
  // 5) kayıt defteri
  yonSekme("kayit"); await bekle(150);
  document.getElementById("k_ad").value="Ali Veli"; document.getElementById("k_tel").value="0500 000 00 00";
  yonKayitEkle(); await bekle(150);
  document.getElementById("k_ad").value="Ayşe Yılmaz"; document.getElementById("k_durum").value="Kayıt olmadı";
  yonKayitEkle(); await bekle(200);
  r.kayitSayaci=(document.querySelector(".yonSayac")||{}).textContent;
  // 6) yayın kaydı
  yonSekme("yayin"); await bekle(150);
  document.getElementById("y_eser").value="Ahlaksız Toplumlar"; document.getElementById("y_yer").value="YouTube";
  document.getElementById("y_tur").value="Kitap"; document.getElementById("y_link").value="https://www.youtube.com/@USTADKENANKUZUCU";
  yonYayinEkle(); await bekle(200);
  r.yayinSayaci=(document.querySelector(".yonSayac")||{}).textContent;
  // 7) eğitim belgesi ekle
  yonSekme("icerik"); window.__yonKat="belgeler"; yonKategoriSec(); await bekle(150);
  document.getElementById("f_ad").value="Test Akademi"; document.getElementById("f_sayi").value="3"; document.getElementById("f_kategori").value="akademi";
  yonEkle(); await bekle(250);
  r.belgeToplam=TOPLAM_BELGE+" | akademi:"+AKADEMILER.sayi;
  // 8) iletişim sayfası üyelik kutusu
  yonKapat(); await bekle(150);
  git("iletisim"); await bekle(400);
  r.uyelikKutu=!!document.getElementById("uyelikKart");
  if(r.uyelikKutu){ document.getElementById("u_ad").value="Siteden Gelen Üye"; document.getElementById("u_tel").value="0555 111 22 33"; uyelikGonder(); await bekle(250);
    r.uyelikSonuc=document.getElementById("uyelikKart").textContent.slice(0,60); }
  r.kayitToplam=JSON.parse(localStorage.getItem("usk-yonetim-v1")).kayitlar.length;
  r.tasma=document.documentElement.scrollWidth-window.innerWidth;
  return JSON.stringify(r);
})()
