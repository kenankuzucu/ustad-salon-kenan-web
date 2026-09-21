/* ==========================================================================
   ÜSTAD SALON KENAN — YÖNETİM PANELİ  (yonetim.js)
   Bu dosya siteye sonradan eklenen kişisel yönetim katmanıdır.
   - İçerik ekleme: şiir, makale, mektup, eser, sosyal hesap, radyo kanalı,
     belge/sertifika (MEB / üniversite / akademi), mesleki belge, AI sertifikası
   - KAYIT DEFTERİ: kim kayıt oldu, kim olmadı (durum takibi + CSV/Word)
   - YAYIN KAYDI: hangi eser nerede, ne zaman yayınlandı (durum takibi + CSV/Word)
   - Kayıt: localStorage (anında) + veri.js dosyasına doğrudan yazma + JSON yedek
   Panelin açılışı: sağ üstteki 🛠 YÖNETİM düğmesi ya da Ctrl+Alt+Y
   ========================================================================== */
(function () {
  "use strict";

  var ANAHTAR = "usk-yonetim-v1";
  var ACMAK = "usk-yon-acik";
  var varsayilan = function () {
    return {
      pin: "1981",
      eklenen: { siirler: [], makaleler: [], mektuplar: [], eserler: [], kitaplar: [], sosyal: [], kanallar: [], belgeler: [], mesleki: [], ai: [], kuran: [], teknoloji: [] },
      gizli: { siirler: [], makaleler: [], mektuplar: [], eserler: [], kitaplar: [], sosyal: [], kanallar: [], mesleki: [], kuran: [], teknoloji: [] },
      kayitlar: [],
      yayinlar: [],
      yorumlar: [],
      bolumler: [],
      duzenle: {},
      gizliBolum: [],
      sira: [],
      icerikOzel: {}
    };
  };
  var YON = varsayilan();
  try {
    var ham = localStorage.getItem(ANAHTAR);
    if (ham) {
      var o = JSON.parse(ham);
      for (var k in o) YON[k] = o[k];
      var v = varsayilan();
      if (!YON.eklenen) YON.eklenen = v.eklenen;
      for (var e in v.eklenen) if (!YON.eklenen[e]) YON.eklenen[e] = [];
      if (!YON.gizli) YON.gizli = v.gizli;
      for (var g in v.gizli) if (!YON.gizli[g]) YON.gizli[g] = [];
      if (!YON.kayitlar) YON.kayitlar = [];
      if (!YON.yayinlar) YON.yayinlar = [];
      if (!YON.pin) YON.pin = "1981";
      if (!YON.yorumlar) YON.yorumlar = [];
      if (!YON.bolumler) YON.bolumler = [];
      if (!YON.duzenle) YON.duzenle = {};
      if (!YON.gizliBolum) YON.gizliBolum = [];
      if (!YON.sira) YON.sira = [];
      if (!YON.icerikOzel) YON.icerikOzel = {};
    }
  } catch (e) { YON = varsayilan(); }

  /* 👑 ÜSTAD YÖNETİM — her durumda var olan, yalnız site sahibine görünen özel bölüm */
  if (!YON.bolumler) YON.bolumler = [];
  if (!YON.duzenle) YON.duzenle = {};
  if (!YON.sira) YON.sira = [];
  if (!YON.gizliBolum) YON.gizliBolum = [];
  if (!YON.icerikOzel) YON.icerikOzel = {};
  /* 🎮 OYUNLAR: fabrika ayarı → yalnız site sahibi + izin verdiği üyeler (bir kez kurulur) */
  if (!YON._oyunIzin) {
    if (!YON.duzenle["oyunlar"]) YON.duzenle["oyunlar"] = {};
    if (YON.duzenle["oyunlar"].izinli === undefined) YON.duzenle["oyunlar"].izinli = true;
    YON._oyunIzin = 1;
    try { localStorage.setItem("usk-yonetim", JSON.stringify(YON)); } catch (e) { }
  }
  (function () {
    var varMi = false;
    for (var _i = 0; _i < YON.bolumler.length; _i++) { if (YON.bolumler[_i].id === "uyepano") { varMi = true; } }
    if (varMi) return;
    YON.bolumler.push({ id: "uyepano", ad: "ÜSTAD YÖNETİM", simge: "👑", renk: "#9a6ad6", not: "sahibe özel",
      aciklama: "Üyeler, yüzler, durum tablosu ve onay bekleyen yorumlar — bu bölümü yalnızca site sahibi görür.", sahip: true });
    /* sol menüde "LOGO ve KÜNYE"nin hemen ALTINA yerleştir */
    try {
      var _sir = (YON.sira && YON.sira.length) ? YON.sira.slice() : (typeof MENU !== "undefined" ? MENU.map(function (m) { return m.id; }) : []);
      if (_sir.indexOf("uyepano") < 0) {
        var _li = _sir.indexOf("logo");
        if (_li > -1) { _sir.splice(_li + 1, 0, "uyepano"); } else { _sir.push("uyepano"); }
      }
      YON.sira = _sir;
    } catch (e) { }
  })();
  try { bolumleriKur(); } catch (e) { }
  /* sonradan eklenen kategoriler kaydedilmiş sırada yoksa doğru yere yerleştir */
  try {
    var _sr = YON.sira || [];
    if (_sr.length && _sr.indexOf("oyunlar") < 0) {
      var _g = _sr.indexOf("galeri");
      if (_g > -1) { _sr.splice(_g + 1, 0, "oyunlar"); } else { _sr.push("oyunlar"); }
      YON.sira = _sr; try { bolumleriKur(); } catch (e) { }
    }
  } catch (e) { }

  // Başka cihazda açıldığında: veri.js içine yazılmış YON_EKLER varsa onu temel al
  if (typeof YON_EKLER !== "undefined" && YON_EKLER && !localStorage.getItem(ANAHTAR)) {
    try {
      YON = YON_EKLER;
      var _v = varsayilan();
      if (!YON.eklenen) YON.eklenen = _v.eklenen;
      for (var _e in _v.eklenen) if (!YON.eklenen[_e]) YON.eklenen[_e] = [];
      if (!YON.gizli) YON.gizli = _v.gizli;
      for (var _g in _v.gizli) if (!YON.gizli[_g]) YON.gizli[_g] = [];
      YON.bolumler = YON.bolumler || []; YON.duzenle = YON.duzenle || {};
      YON.gizliBolum = YON.gizliBolum || []; YON.sira = YON.sira || [];
      YON.icerikOzel = YON.icerikOzel || {};
      YON.kayitlar = YON.kayitlar || []; YON.yayinlar = YON.yayinlar || []; YON.yorumlar = YON.yorumlar || [];
      if (!YON.pin) YON.pin = "1981";
    } catch (e) { }
  }

  function kaydet() {
    try { localStorage.setItem(ANAHTAR, JSON.stringify(YON)); } catch (e) { }
    if (DOSYA.tutamac) dosyayaYaz(true);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function el(i) { return document.getElementById(i); }
  function satirlar(t) { return String(t || "").replace(/\r/g, "").split("\n"); }
  function paragraflar(t) { return String(t || "").trim().split(/\n\s*\n/).map(function (p) { return p.replace(/\s+/g, " ").trim(); }).filter(Boolean); }
  function bugun() {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear();
  }

  /* ---------- 1) SİTE VERİSİNE KATMA ---------- */
  var IKONLAR = ["logo/ikon-youtube.svg", "logo/ikon-instagram.svg", "logo/ikon-facebook.svg", "logo/ikon-linkedin.svg", "logo/ikon-tiktok.svg", "logo/ikon-whatsapp.svg", "logo/ikon-gmail.svg"];

  function suz(liste, gizliAdlar) {
    var g = gizliAdlar || [];
    return (liste || []).filter(function (x) { return g.indexOf(x.ad) < 0; });
  }

  function kat() {
    if (typeof SIIRLER !== "undefined") SIIRLER = suz(SIIRLER, YON.gizli.siirler).concat(YON.eklenen.siirler);
    if (typeof MAKALELER !== "undefined") MAKALELER = suz(MAKALELER, YON.gizli.makaleler).concat(YON.eklenen.makaleler);
    if (typeof MEKTUPLAR !== "undefined") MEKTUPLAR = suz(MEKTUPLAR, YON.gizli.mektuplar).concat(YON.eklenen.mektuplar);
    if (typeof KITAPLAR !== "undefined") KITAPLAR = suz(KITAPLAR, YON.gizli.kitaplar).concat(YON.eklenen.kitaplar);
    if (typeof ESERLER !== "undefined") ESERLER = suz(ESERLER, YON.gizli.eserler).concat(YON.eklenen.eserler);
    if (typeof SOSYAL !== "undefined") SOSYAL = suz(SOSYAL, YON.gizli.sosyal).concat(YON.eklenen.sosyal);
    kanallariKur();
    if (typeof MESLEKI_BELGE !== "undefined") MESLEKI_BELGE = MESLEKI_BELGE.concat(YON.eklenen.mesleki);
    if (typeof AI_GUVENLIK !== "undefined") {
      AI_GUVENLIK.liste = AI_GUVENLIK.liste.concat(YON.eklenen.ai);
      AI_GUVENLIK.sayi = 5 + YON.eklenen.ai.length;
    }
    // belge sayıları
    var meb = 0, uni = 0, aka = 0;
    YON.eklenen.belgeler.forEach(function (b) {
      if (b.kategori === "meb") meb += b.sayi;
      else if (b.kategori === "universite") {
        uni += b.sayi;
        if (typeof UNIVERSITELER !== "undefined") UNIVERSITELER.liste.push([b.ad, b.sayi]);
      } else { aka += b.sayi; if (typeof AKADEMILER !== "undefined") AKADEMILER.liste.push([b.ad, b.sayi]); }
    });
    if (typeof MEB !== "undefined" && meb) MEB.sayi += meb;
    if (typeof UNIVERSITELER !== "undefined" && uni) UNIVERSITELER.sayi += uni;
    if (typeof AKADEMILER !== "undefined" && aka) AKADEMILER.sayi += aka;
    if (typeof TOPLAM_BELGE !== "undefined") TOPLAM_BELGE += meb + uni + aka;
    // menü sayaçları
    if (typeof MENU !== "undefined") {
      MENU.forEach(function (m) {
        if (m.id === "siirler" && typeof SIIRLER !== "undefined") m.not = SIIRLER.length ? SIIRLER.length + " şiir" : "sırayla eklenir";
        if (m.id === "makaleler" && typeof MAKALELER !== "undefined") m.not = String(MAKALELER.length);
        if (m.id === "mektuplar" && typeof MEKTUPLAR !== "undefined") m.not = String(MEKTUPLAR.length);
        if (m.id === "eserler" && typeof ESERLER !== "undefined") m.not = ESERLER.length + " eser";
        if (m.id === "kitaplar" && typeof KITAPLAR !== "undefined") m.not = KITAPLAR.length + " kitap";
        if (m.id === "sosyal" && typeof SOSYAL !== "undefined") m.not = SOSYAL.length + " kanal";
        if (m.id === "radyo" && typeof KANALLAR !== "undefined") m.not = KANALLAR.length + " kanal";
        if (m.id === "mekke" && typeof TV_GRUPLARI !== "undefined") m.not = (function () { var n = 0; for (var q = 0; q < TV_GRUPLARI.length; q++) n += TV_GRUPLARI[q].liste.length; return n + " kanal"; })();
        if (m.id === "teknoloji" && typeof TEKNOLOJI !== "undefined") m.not = TEKNOLOJI.length + " branş";
        if (m.id === "galeri") m.not = m.not || "12";
      });
    }
    bolumleriKur();
    if (typeof MENU !== "undefined") MENU.forEach(function (m) {
      if (m.id === "siirler" && typeof SIIRLER !== "undefined") m.not = SIIRLER.length ? SIIRLER.length + " şiir" : "sırayla eklenir";
      if (m.id === "makaleler" && typeof MAKALELER !== "undefined") m.not = String(MAKALELER.length);
      if (m.id === "mektuplar" && typeof MEKTUPLAR !== "undefined") m.not = String(MEKTUPLAR.length);
      if (m.id === "eserler" && typeof ESERLER !== "undefined") m.not = ESERLER.length + " eser";
      if (m.id === "sosyal" && typeof SOSYAL !== "undefined") m.not = SOSYAL.length + " kanal";
      if (m.id === "radyo" && typeof KANALLAR !== "undefined") m.not = KANALLAR.length + " kanal";
        if (m.id === "mekke" && typeof TV_GRUPLARI !== "undefined") m.not = (function () { var n = 0; for (var q = 0; q < TV_GRUPLARI.length; q++) n += TV_GRUPLARI[q].liste.length; return n + " kanal"; })();
        if (m.id === "teknoloji" && typeof TEKNOLOJI !== "undefined") m.not = TEKNOLOJI.length + " branş";
    });
  }


  /* ---------- 1b) KATEGORİ YÖNETİMİ (ekle, adını değiştir, renk, sıra, gizle) ---------- */
  function koyuRenk(hex, k) {
    var h = String(hex || "").replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length < 6) return hex;
    var f = (k == null ? 0.62 : k);
    return "#" + [0, 2, 4].map(function (i) {
      var v = Math.min(255, Math.round(parseInt(h.substr(i, 2), 16) * f));
      return (v < 16 ? "0" : "") + v.toString(16);
    }).join("");
  }
  function bolumBul(id) {
    if (typeof MENU === "undefined") return null;
    for (var i = 0; i < MENU.length; i++) if (MENU[i].id === id) return MENU[i];
    return null;
  }
  function ozelMi(id) { return (YON.bolumler || []).some(function (b) { return b.id === id; }); }

  var TEMEL_MENU = null;
  function temelAl() {
    if (!TEMEL_MENU && typeof MENU !== "undefined")
      TEMEL_MENU = MENU.map(function (m) { return { id: m.id, ad: m.ad, simge: m.simge, renk: m.renk, not: m.not }; });
    return TEMEL_MENU || [];
  }
  function temelKopya() {
    return temelAl().map(function (m) { return { id: m.id, ad: m.ad, simge: m.simge, renk: m.renk, not: m.not }; });
  }

  function bolumleriKur() {
    if (typeof MENU === "undefined") return;
    if (!TEMEL_MENU) temelAl();
    var temel = temelKopya();
    var liste = temel.filter(function (m) { return (YON.gizliBolum || []).indexOf(m.id) < 0; });
    liste.forEach(function (m) {
      var d = (YON.duzenle || {})[m.id];
      if (!d) return;
      if (d.ad) m.ad = d.ad;
      if (d.simge) m.simge = d.simge;
      if (d.renk) m.renk = d.renk;
      if (d.not != null && d.not !== "") m.not = d.not;
    });
    (YON.bolumler || []).forEach(function (b) { if (!liste.some(function (m) { return m.id === b.id; })) liste.push(b); });
    var sr = YON.sira || [];
    if (sr.length) liste.sort(function (a, b) {
      var ia = sr.indexOf(a.id), ib = sr.indexOf(b.id);
      if (ia < 0) ia = 999; if (ib < 0) ib = 999;
      return ia - ib;
    });
    MENU.length = 0;
    liste.forEach(function (m) { MENU.push(m); });
  }

  function sirayiKaydet() {
    if (typeof MENU === "undefined") return;
    YON.sira = MENU.map(function (m) { return m.id; });
  }


  /* ================= 👑 ÜSTAD YÖNETİM — üye panosu (yalnız site sahibine görünür) ================= */
  /* 👑 ÜSTAD YÖNETİM sayfasında seçili üye (kişiye tıklayınca yetki tablosu açılır) */
  var UYPANO_ID = null;
  var UY_RENK = ["#e0704a", "#4a9fe0", "#63b566", "#c9a227", "#9a6ad6", "#e06a9a", "#3fb6b0", "#d08a3a"];
  function yuzRengi(id) {
    var k = 0, s = String(id || "x");
    for (var i = 0; i < s.length; i++) k += s.charCodeAt(i) * (i + 3);
    return UY_RENK[k % UY_RENK.length];
  }
  function yuzBasHarf(u) {
    var ad = String((u && (u.adSoyad || u.kadi)) || "?").trim();
    return ad.charAt(0).toUpperCase();
  }
  function uyDurumKisa(d) {
    if (d === "onayli") return "✅ onaylı";
    if (d === "red") return "⛔ onaylanmadı";
    if (d === "yasakli") return "🚫 yasaklı";
    return "⏳ onay bekliyor";
  }
  function uyYuzKarti(u) {
    var g = uyeGorListesi(u);
    return '<div class="uyYuz tiklanir" onclick="uyPanoSec(\'' + esc(u.id) + '\')" title="' + esc(u.kadi + " · " + u.eposta) + " — tıkla: neyi görebilir / göremez" + '">' +
      '<div class="uyYuzDaire" style="--y:' + yuzRengi(u.id) + '">' + esc(yuzBasHarf(u)) + "</div>" +
      '<div class="uyYuzAd">' + esc(u.kadi) + "</div>" +
      '<div class="uyYuzAlt">' + uyDurumKisa(u.durum) + "<br>" + (g ? ("🔐 " + g.length + " bölüm") : "🔐 tüm bölümler") + "</div></div>";
  }
  function uySatir(u, i) {
    var g = uyeGorListesi(u);
    var b = '<button class="yonKucuk" title="Onayla" onclick="event.stopPropagation(); uyPanoDurum(\'' + esc(u.id) + '\',\'onayli\')">✅</button>' +
      '<button class="yonKucuk" title="Onaylama" onclick="event.stopPropagation(); uyPanoDurum(\'' + esc(u.id) + '\',\'red\')">⛔</button>' +
      '<button class="yonKucuk" title="Beklemeye al" onclick="event.stopPropagation(); uyPanoDurum(\'' + esc(u.id) + '\',\'beklemede\')">⏳</button>' +
      '<button class="yonKucuk" title="Yasakla" onclick="event.stopPropagation(); uyPanoDurum(\'' + esc(u.id) + '\',\'yasakli\')">🚫</button>' +
      '<button class="yonKucuk" title="Geçici şifre üret" onclick="event.stopPropagation(); uyPanoGecici(\'' + esc(u.id) + '\')">🔑</button>' +
      '<button class="yonKucuk" title="Hangi bölümleri görebilsin" onclick="event.stopPropagation(); uyPanoSec(\'' + esc(u.id) + '\')">🔐</button>' +
      '<button class="yonKucuk" title="E-posta yaz" onclick="event.stopPropagation(); uyPanoMail(\'' + esc(u.id) + '\')">📧</button>' +
      '<button class="yonKucuk" title="Sil" onclick="event.stopPropagation(); uyPanoSil(\'' + esc(u.id) + '\')">🗑️</button>';
    return '<tr class="tiklanir" onclick="uyPanoSec(\'' + esc(u.id) + '\')" title="tıkla: neyi görebilir / göremez">' +
      '<td class="uyNo">' + (i + 1) + "</td>" +
      '<td><div class="uyMini" style="--y:' + yuzRengi(u.id) + '">' + esc(yuzBasHarf(u)) + "</div></td>" +
      "<td><b>" + esc(u.kadi) + "</b>" + (u.adSoyad ? "<br><span class=\"uyKucuk\">" + esc(u.adSoyad) + "</span>" : "") + "</td>" +
      '<td class="uyEposta">' + esc(u.eposta) + "</td>" +
      "<td>" + uyDurumKisa(u.durum) + "</td>" +
      '<td class="uyKucuk">' + esc(u.tarih || "-") + "</td>" +
      '<td class="uyKucuk">' + esc(u.sonGiris || "hiç girmemiş") + "</td>" +
      '<td class="uyKucuk">' + (g ? (g.length + " / " + gorunurBolumSayisi()) : "tümü") + "</td>" +
      '<td class="uyIslem">' + b + "</td></tr>";
  }
  function uyDetayKutu(l, m) {   /* m = MENU maddesi */
    var sec = !l || l.indexOf(m.id) > -1;
    var yalniz = bolumYalnizSahip(m.id);
    var izinli = bolumIzinli(m.id);
    return '<tr><td class="uyNo">' + (yalniz ? "👑" : "") + '</td>' +
      '<td><b>' + m.simge + " " + esc(m.ad) + '</b>' + (yalniz ? ' <span class="uyKucuk">(yalnız site sahibi)</span>' : (izinli ? ' <span class="uyKucuk">(yalnız izin verdiğin üyeler)</span>' : "")) + "</td>" +
      '<td><span class="uyDurum' + (sec && !yalniz ? " var" : " yok") + '" data-uy-durum="' + m.id + '">' + (yalniz ? "🚫 göremez" : (sec ? "✅ görebilir" : "🚫 göremez")) + "</span></td>" +
      '<td><input type="checkbox" data-ykp="' + m.id + '"' + (sec && !yalniz ? " checked" : "") + (yalniz ? " disabled" : "") +
      ' style="width:19px;height:19px" onchange="uyPanoKutu(this)"></td></tr>';
  }
  function uyDetayEkrani() {
    var u = null, L = uyeleriOku(), i;
    for (i = 0; i < L.length; i++) { if (L[i].id === UYPANO_ID) u = L[i]; }
    if (!u) { UYPANO_ID = null; return cizUyePanosu(); }
    var g = uyeGorListesi(u);
    var h = '<div class="uyPano">';
    h += '<div class="yonDugmeler" style="margin:6px 0 10px">' +
      '<button class="yonDugme" onclick="uyPanoKapat()">◀️ Üye listesine dön</button>' +
      '<button class="yonDugme" onclick="yonAc(\'uyeler\'); setTimeout(function(){ try{ uyeYetkiAc(\'' + esc(u.id) + '\'); }catch(e){} }, 80)">🛠 Panelde de düzenle</button>' +
      '<button class="yonDugme" onclick="event.stopPropagation(); uyPanoMail(\'' + esc(u.id) + '\')">📧 E-posta yaz</button>' +
      (u.durum === "beklemede" ? '<button class="yonDugme ana" onclick="event.stopPropagation(); uyPanoDurum(\'' + esc(u.id) + '\',\'onayli\')">✅ Üyeliğini onayla</button>' : "") +
      (u.durum === "onayli" ? '<button class="yonDugme" onclick="event.stopPropagation(); uyPanoDurum(\'' + esc(u.id) + '\',\'yasakli\')">🚫 Yasakla</button>' : "") +
      "</div>";
    h += '<div class="kart"><div class="kBaslik">' + esc(yuzBasHarf(u)) + " · " + esc(u.kadi) + " — GÖRÜNÜRLÜK TABLOSU</div>" +
      '<div class="uyKimlik"><div class="uyYuzDaire buyuk" style="--y:' + yuzRengi(u.id) + '">' + esc(yuzBasHarf(u)) + "</div><div>" +
      '<div class="uyKimlikAd">' + esc(u.adSoyad || u.kadi) + "</div>" +
      '<div class="uyKucuk">' + esc(u.eposta) + "</div>" +
      '<div class="uyKucuk">' + uyDurumKisa(u.durum) + " · kayıt: " + esc(u.tarih || "-") + " · son giriş: " + esc(u.sonGiris || "hiç girmemiş") + "</div>" +
      '<div class="uyKimlikSayac">Görebildiği bölüm: <b id="uyPanoSayac">' + (g ? (g.length + " / " + gorunurBolumSayisi()) : ("tümü · " + gorunurBolumSayisi())) + "</b></div>" +
      "</div></div></div>";
    h += '<div class="kart"><div class="kBaslik">🔐 NEYİ GÖREBİLİR, NEYİ GÖREMEZ</div>' +
      '<div class="yonBilgi">İşaretli olan bölümleri <b>görebilir</b>, boş olanları <b>göremez</b> (menüde hiç çıkmaz, adresle de açamaz). ' +
      '👑 işaretli satır yalnızca sana görünen bölümdür, üyeye hiç gösterilmez.</div>' +
      '<div class="yonDugmeler" style="margin:8px 0">' +
      '<button class="yonKucuk" onclick="uyPanoHepsi(1)">✅ Tümünü işaretle</button>' +
      '<button class="yonKucuk" onclick="uyPanoHepsi(0)">⛔ Hiçbirini işaretleme</button>' +
      '<button class="yonKucuk" onclick="uyPanoVarsayilan()">↩️ Varsayılan (tümü açık)</button></div>' +
      '<div class="yonDugmeler" style="margin:0 0 10px">' +
      '<button class="yonKucuk" onclick="uyPanoSadece([\'radyo\',\'islami\',\'mekke\'])">🎵 Yalnız radyo & TV</button>' +
      '<button class="yonKucuk" onclick="uyPanoSadece([\'islami\',\'kuran\',\'mekke\'])">🕌 Yalnız İslami bölümler</button>' +
      '<button class="yonKucuk" onclick="uyPanoSadece([\'siirler\',\'makaleler\',\'mektuplar\',\'eserler\',\'kitaplar\'])">🖋 Yalnız yayınlarım</button>' +
      '<button class="yonKucuk" onclick="uyPanoSadece([\'tanitim\',\'egitim\',\'teknoloji\',\'sosyal\',\'galeri\',\'logo\',\'iletisim\'])">👤 Yalnız tanıtım & iletişim</button></div>';
    h += '<div class="uyTabloKap"><table class="uyTablo uyYetkiTablo"><tr><th></th><th>Bölüm</th><th>Durum</th><th>İzin</th></tr>';
    for (i = 0; i < MENU.length; i++) { h += uyDetayKutu(g, MENU[i]); }
    h += "</table></div>";
    h += '<div class="yonDugmeler" style="margin-top:12px">' +
      '<button class="yonDugme ana" onclick="uyPanoKaydet(\'' + esc(u.id) + '\')">💾 Yetkileri Kaydet</button>' +
      '<button class="yonDugme" onclick="uyPanoKapat()">◀️ Üye listesine dön</button></div></div>';
    h += "</div>";
    return h;
  }
  window.uyPanoSec = function (id) { UYPANO_ID = id; git("uyepano"); try { window.scrollTo(0, 0); } catch (e) { } };
  window.uyPanoKapat = function () { UYPANO_ID = null; git("uyepano"); };
  window.uyPanoKutulari = function () { return [].slice.call(document.querySelectorAll("[data-ykp]")).filter(function (c) { return !c.disabled; }); };
  window.uyPanoKutu = function (c) {
    var t = document.querySelector('[data-uy-durum="' + c.getAttribute("data-ykp") + '"]');
    if (t) { t.textContent = c.checked ? "✅ görebilir" : "🚫 göremez"; t.className = "uyDurum " + (c.checked ? "var" : "yok"); }
    var s = document.getElementById("uyPanoSayac");
    if (s) {
      var n = window.uyPanoKutulari().filter(function (x) { return x.checked; }).length;
      var t2 = gorunurBolumSayisi();
      s.textContent = (n === t2) ? ("tümü · " + t2) : (n + " / " + t2);
    }
  };
  window.uyPanoHepsi = function (v) { window.uyPanoKutulari().forEach(function (c) { c.checked = !!v; window.uyPanoKutu(c); }); };
  window.uyPanoVarsayilan = function () { window.uyPanoHepsi(1); uyari("Varsayılan: tüm bölümler açık. Kaydetmeyi unutma."); };
  window.uyPanoSadece = function (liste) {
    window.uyPanoKutulari().forEach(function (c) { c.checked = liste.indexOf(c.getAttribute("data-ykp")) > -1; window.uyPanoKutu(c); });
    uyari("İşaretleme yapıldı — kaydetmek için 💾 Yetkileri Kaydet.");
  };
  window.uyPanoKaydet = function (id) {
    var L = uyeleriOku(), u = null, i;
    for (i = 0; i < L.length; i++) { if (L[i].id === id) u = L[i]; }
    if (!u) { uyari("Üye bulunamadı."); return; }
    var sec = window.uyPanoKutulari().filter(function (c) { return c.checked; }).map(function (c) { return c.getAttribute("data-ykp"); });
    var toplam = gorunurBolumSayisi();
    if (sec.length >= toplam) { try { delete u.gor; } catch (e) { u.gor = undefined; } } else { u.gor = sec; }
    u.yetkiTarih = bugun() + " " + uyeSaat();
    uyeleriYaz(L);
    uyari(sec.length >= toplam ? "✔ Kaydedildi: bu üye tüm bölümleri görecek." : ("✔ Kaydedildi: üye " + sec.length + "/" + toplam + " bölüm görecek."));
    var aktif = uye();
    if (aktif && aktif.id === u.id) { try { window.uyeGorunumTazele(); } catch (e) { } }
    UYPANO_ID = null;                 /* listeye dön (detay ekranı kapanır) */
    git("uyepano");
  };
  function cizUyePanosu() {
    if (yetkiliMi() && UYPANO_ID) return uyDetayEkrani();
    if (!yetkiliMi()) {
      return '<div class="kart"><div class="kBaslik">👑 ÜSTAD YÖNETİM</div>' +
        '<p class="metin">Bu bölüm yalnızca site sahibine görünür; üyeler ve ziyaretçiler bu kategoriyi hiç görmez. Açmak için klavyeden <b>Ctrl + Alt + Y</b> tuşlarına bas ve PIN ile giriş yap.</p>' +
        '<div class="uyeDugmeler" style="justify-content:flex-start"><button class="yonDugme ana" onclick="yonAc()">🔐 Sahip Girişi</button></div></div>';
    }
    var L = uyeleriOku();
    var on = L.filter(function (x) { return x.durum === "onayli"; }).length;
    var bk = L.filter(function (x) { return x.durum === "beklemede"; }).length;
    var ys = L.filter(function (x) { return x.durum === "yasakli"; }).length;
    var yb = (YON.yorumlar || []).filter(function (x) { return !x.yayin; }).length;
    var h = '<div class="uyPano">';
    h += '<div class="uyOzet">' +
      '<div class="uyCip"><b>' + L.length + '</b><span>Toplam üye</span></div>' +
      '<div class="uyCip iyi"><b>' + on + '</b><span>Onaylı üye</span></div>' +
      '<div class="uyCip bek"><b>' + bk + '</b><span>Onay bekleyen</span></div>' +
      '<div class="uyCip kotu"><b>' + ys + '</b><span>Yasaklı</span></div>' +
      '<div class="uyCip"><b>' + yb + '</b><span>Onay bekleyen yorum</span></div></div>';
    h += '<div class="yonBilgi">👑 <b>Bu bölümü yalnızca sen görürsün.</b> Üyeler bu kategoriyi menüde görmez, adresle de açamaz. Aşağıdaki düğmelerle üyeleri onayla, reddet, yasakla, geçici şifre üret ve <b>hangi bölümleri görebileceklerini</b> 🔐 ile seç.</div>';
    h += '<div class="yonDugmeler" style="margin:10px 0">' +
      '<button class="yonDugme ana" onclick="yonAc(\'uyeler\')">🛠 Yönetim panelinde üyeleri yönet</button>' +
      '<button class="yonDugme" onclick="yonCSV(\'uyeler\')">📄 Excel/CSV indir</button>' +
      '<button class="yonDugme" onclick="yonWord(\'uyeler\')">📝 Word indir</button>' +
      '<button class="yonDugme" onclick="git(\'iletisim\')">🤝 Üyelik kartını gör</button></div>';
    if (!L.length) {
      h += '<div class="kart"><div class="kBaslik">Henüz üye yok</div><p class="kucuk">Sitedeki “🤝 ÜYE OL” düğmesinden kayıt olan kişiler burada yüzleriyle ve tabloda görünecek, onayını bekleyecek.</p></div></div>';
      return h;
    }
    h += '<div class="kart"><div class="kBaslik">👥 YÜZLER (' + L.length + ')</div><div class="uyYuzler">' + L.map(uyYuzKarti).join("") + "</div></div>";
    h += '<div class="kart"><div class="kBaslik">📋 ÜYE TABLOSU</div><div class="uyTabloKap"><table class="uyTablo">' +
      "<tr><th>#</th><th>Yüz</th><th>Kullanıcı adı</th><th>E-posta</th><th>Durum</th><th>Kayıt</th><th>Son giriş</th><th>Gördüğü bölüm</th><th>İşlemler</th></tr>" +
      L.map(uySatir).join("") + "</table></div>" +
      '<p class="kucuk">✅ onayla · ⛔ onaylama · ⏳ beklemeye al · 🚫 yasakla · 🔑 geçici şifre · 🔐 görünürlük yetkileri · 📧 e-posta · 🗑️ sil</p></div>';
    h += "</div>";
    return h;
  }
  /* Sayfa düğmeleri: panel kapalıyken de çalışsın */
  function uyPanoYenile() { try { if (typeof DURUM !== "undefined" && DURUM.bolum === "uyepano") git("uyepano"); } catch (e) { } }
  window.uyPanoDurum = function (id, d) { window.yonUyeDurum(id, d); uyPanoYenile(); };
  window.uyPanoGecici = function (id) { window.yonUyeGeciciSifre(id); uyPanoYenile(); };
  window.uyPanoMail = function (id) { window.yonUyeMail(id); };
  window.uyPanoSil = function (id) { window.yonUyeSil(id); uyPanoYenile(); };
  window.uyPanoYetki = function (id) { yonAc("uyeler"); setTimeout(function () { try { window.uyeYetkiAc(id); } catch (e) { } }, 80); };

  window.ozelBolum = function (id) {
    if (id === "uyepano") return cizUyePanosu();
    var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0];
    var liste = (YON.icerikOzel || {})[id];
    if (!b && !liste) return null;
    var ad = b ? b.ad : "Bölüm";
    var h = '<p class="giris">' + esc((b && b.aciklama) ? b.aciklama : ad + " — Üstad Kenan Kuzucu") + "</p>";
    if (!liste || !liste.length) {
      h += '<div class="kart"><div class="kBaslik">' + esc(b ? b.simge + " " + ad : ad) + '</div><p class="kucuk">Bu bölüme henüz içerik eklenmedi. Yönetim panelindeki "İçerik Ekle" bölümünden bu kategoriyi seçip yazını ekleyebilirsin.</p></div>';
    } else {
      liste.forEach(function (it, i) {
        h += '<div class="kart"><div class="kBaslik">' + esc(it.ad) + (yetkiliMi() ? ' <button class="yonKucuk" onclick="ozelSil(\'' + esc(id) + "'," + i + ')">🗑️</button>' : "") + "</div>";
        (it.paragraf || []).forEach(function (pr) { h += '<p class="metin">' + esc(pr) + "</p>"; });
        if (it.link) h += '<div class="yonDugmeler"><a class="yonDugme" href="' + esc(it.link) + '" target="_blank" rel="noopener">↗ Bağlantıyı aç</a></div>';
        h += "</div>";
      });
    }
    if (typeof paylasKutu === "function") { try { h += paylasKutu(); } catch (e) { } }
    return h;
  };

  window.ozelSil = function (id, i) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    (YON.icerikOzel[id] || []).splice(i, 1);
    kaydet(); yenile(); uyari("İçerik silindi.");
  };

  function renkUygula(id) {
    var d = (YON.duzenle || {})[id] || {};
    var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0] || {};
    var r = d.renk || b.renk;
    var s = document.body.style;
    if (r && String(r).charAt(0) === "#") {
      s.setProperty("--ana", r);
      s.setProperty("--ana2", koyuRenk(r, 1.45));
      s.setProperty("--vurgu", koyuRenk(r, 1.2));
    } else { s.removeProperty("--ana"); s.removeProperty("--ana2"); s.removeProperty("--vurgu"); }
  }
  window.__renkUygula = renkUygula;

  /* kategori seçim listesi (özel kategoriler dahil) */
  function katListesi() {
    var l = [];
    if (typeof MENU !== "undefined") MENU.forEach(function (m) { l.push({ id: m.id, ad: m.simge + " " + m.ad }); });
    l.push({ id: "mesleki", ad: "📜 Mesleki uzmanlık belgesi" });
    l.push({ id: "ai", ad: "🤖 AI güvenlik sertifikası" });
    return l;
  }

  /* ---------- 2) veri.js DOSYASINA YAZMA / YEDEK ---------- */
  var ROL_ANAHTAR = "usk-rol";
  var UYE_ANAHTAR = "usk-uye";
  var DOSYA = { tutamac: null, ad: "veri.js" };
  var BASLA = "/* ==== YÖNETİM PANELİNDEN EKLENENLER (otomatik) ==== */";

  function ekBlok() {
    var s = "\n" + BASLA + "\n";
    s += "var YON_EKLER = " + JSON.stringify({ eklenen: YON.eklenen, gizli: YON.gizli, kayitlar: YON.kayitlar, yayinlar: YON.yayinlar, yorumlar: YON.yorumlar, bolumler: YON.bolumler, duzenle: YON.duzenle, gizliBolum: YON.gizliBolum, sira: YON.sira, icerikOzel: YON.icerikOzel }, null, 1) + ";\n";
    s += "(function(){\n";
    s += "  function suz(l,g){return (l||[]).filter(function(x){return (g||[]).indexOf(x.ad)<0;});}\n";
    s += "  if(typeof SIIRLER!=='undefined')SIIRLER=suz(SIIRLER,YON_EKLER.gizli.siirler).concat(YON_EKLER.eklenen.siirler);\n";
    s += "  if(typeof MAKALELER!=='undefined')MAKALELER=suz(MAKALELER,YON_EKLER.gizli.makaleler).concat(YON_EKLER.eklenen.makaleler);\n";
    s += "  if(typeof MEKTUPLAR!=='undefined')MEKTUPLAR=suz(MEKTUPLAR,YON_EKLER.gizli.mektuplar).concat(YON_EKLER.eklenen.mektuplar);\n";
    s += "  if(typeof KITAPLAR!=='undefined')KITAPLAR=suz(KITAPLAR,YON_EKLER.gizli.kitaplar).concat(YON_EKLER.eklenen.kitaplar);\n";
    s += "  if(typeof ESERLER!=='undefined')ESERLER=suz(ESERLER,YON_EKLER.gizli.eserler).concat(YON_EKLER.eklenen.eserler);\n";
    s += "  if(typeof SOSYAL!=='undefined')SOSYAL=suz(SOSYAL,YON_EKLER.gizli.sosyal).concat(YON_EKLER.eklenen.sosyal);\n";
    s += "  if(typeof KANAL_GRUPLARI!=='undefined'){\n";
    s += "    var _ek=YON_EKLER.eklenen.kanallar||[];\n";
    s += "    for(var _i=0;_i<_ek.length;_i++){var _k=_ek[_i];if(typeof _k[2]==='string'&&_k[2].indexOf('tv:')===0){if(typeof TV_GRUPLARI!=='undefined'){var _tn=_k[2].slice(3);for(var _tg=0;_tg<TV_GRUPLARI.length;_tg++)if(TV_GRUPLARI[_tg].ad===_tn)TV_GRUPLARI[_tg].liste.push([_k[0],'',_k[1],'📺']);}continue;}var _gi=(typeof _k[2]==='number'&&KANAL_GRUPLARI[_k[2]])?_k[2]:(KANAL_GRUPLARI.length-1);KANAL_GRUPLARI[_gi].liste.push([_k[0],_k[1]]);}\n";
    s += "    var _gz=YON_EKLER.gizli.kanallar||[];KANALLAR=[];if(typeof ISLAMI_KANALLAR!=='undefined')ISLAMI_KANALLAR=[];\n";
    s += "    for(var _g=0;_g<KANAL_GRUPLARI.length;_g++){var _gr=KANAL_GRUPLARI[_g],_L=_gr.liste;var _h=(_gr.bolum==='islami'&&typeof ISLAMI_KANALLAR!=='undefined')?ISLAMI_KANALLAR:KANALLAR;for(var _s=0;_s<_L.length;_s++){if(_gz.indexOf(_L[_s][0])>-1)continue;_h.push(_L[_s]);}}\n";
    s += "  } else if(typeof KANALLAR!=='undefined'){KANALLAR=suz(KANALLAR,YON_EKLER.gizli.kanallar).concat(YON_EKLER.eklenen.kanallar);}\n";
    s += "  if(typeof MESLEKI_BELGE!=='undefined')MESLEKI_BELGE=MESLEKI_BELGE.concat(YON_EKLER.eklenen.mesleki);\n";
    s += "  if(typeof AI_GUVENLIK!=='undefined'){AI_GUVENLIK.liste=AI_GUVENLIK.liste.concat(YON_EKLER.eklenen.ai);AI_GUVENLIK.sayi=5+YON_EKLER.eklenen.ai.length;}\n";
    s += "  var m=0,u=0,a=0;\n";
    s += "  YON_EKLER.eklenen.belgeler.forEach(function(b){if(b.kategori==='meb')m+=b.sayi;else if(b.kategori==='universite'){u+=b.sayi;if(typeof UNIVERSITELER!=='undefined')UNIVERSITELER.liste.push([b.ad,b.sayi]);}else{a+=b.sayi;if(typeof AKADEMILER!=='undefined')AKADEMILER.liste.push([b.ad,b.sayi]);}});\n";
    s += "  if(typeof MEB!=='undefined'&&m)MEB.sayi+=m; if(typeof UNIVERSITELER!=='undefined'&&u)UNIVERSITELER.sayi+=u; if(typeof AKADEMILER!=='undefined'&&a)AKADEMILER.sayi+=a;\n";
    s += "  if(typeof TOPLAM_BELGE!=='undefined')TOPLAM_BELGE+=m+u+a;\n";
    s += "  if(typeof MENU!=='undefined'){\n";
    s += "    var _l=MENU.slice().filter(function(m){return (YON_EKLER.gizliBolum||[]).indexOf(m.id)<0;});\n";
    s += "    _l.forEach(function(m){var d=(YON_EKLER.duzenle||{})[m.id];if(d){if(d.ad)m.ad=d.ad;if(d.simge)m.simge=d.simge;if(d.renk)m.renk=d.renk;if(d.not!=null&&d.not!=='')m.not=d.not;}});\n";
    s += "    (YON_EKLER.bolumler||[]).forEach(function(b){if(!_l.some(function(m){return m.id===b.id;}))_l.push(b);});\n";
    s += "    var _s=YON_EKLER.sira||[];\n";
    s += "    if(_s.length)_l.sort(function(a,b){var ia=_s.indexOf(a.id),ib=_s.indexOf(b.id);if(ia<0)ia=999;if(ib<0)ib=999;return ia-ib;});\n";
    s += "    MENU.length=0;_l.forEach(function(m){MENU.push(m);});\n";
    s += "  }\n";
    s += "})();\n";
    return s;
  }

  function veriJsMetni(temelMetin) {
    var t = temelMetin;
    var i = t.indexOf(BASLA);
    if (i > -1) t = t.slice(0, i);
    return t.replace(/\s+$/, "") + "\n" + ekBlok();
  }

  function indir(ad, icerik, tur) {
    var b = new Blob([icerik], { type: tur || "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = ad;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }

  function yedekJSON() {
    indir("ustad-yonetim-yedegi-" + bugun().replace(/\./g, "-") + ".json", JSON.stringify(YON, null, 1), "application/json");
  }

  function dosyaSec() {
    if (!window.showSaveFilePicker) { uyari("Bu tarayıcı doğrudan dosyaya yazmayı desteklemiyor. 'veri.js indir' düğmesini kullan."); return; }
    window.showSaveFilePicker({
      suggestedName: "veri.js",
      types: [{ description: "Site veri dosyası", accept: { "text/javascript": [".js"] } }]
    }).then(function (h) { DOSYA.tutamac = h; dosyayaYaz(); }).catch(function () { });
  }

  function dosyayaYaz(sessiz) {
    if (!DOSYA.tutamac) return;
    DOSYA.tutamac.createWritable().then(function (w) {
      return fetch("veri.js").then(function (r) { return r.text(); }).catch(function () { return ""; }).then(function (temel) {
        return w.write(veriJsMetni(temel)).then(function () { return w.close(); });
      });
    }).then(function () {
      if (!sessiz) uyari("✔ veri.js dosyasına yazıldı.");
    }).catch(function (e) { if (!sessiz) uyari("Dosyaya yazılamadı: " + e.message); });
  }

  function dosyadanYukle(dosya) {
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var o = JSON.parse(rd.result);
        YON = o; kaydet(); kat(); yenile();
        uyari("✔ Yedek yüklendi.");
      } catch (e) { uyari("Yedek okunamadı: " + e.message); }
    };
    rd.readAsText(dosya);
  }


  /* ---------- 2b) ROL (YETKİLİ / MİSAFİR), ÜYELİK ve YORUMLAR ---------- */
  var HATIRLA = "usk-hatirla";
  function rol() {
    try {
      if (sessionStorage.getItem(ROL_ANAHTAR) === "yetkili") return "yetkili";
      if (localStorage.getItem(HATIRLA) === "1") return "yetkili";
      return "misafir";
    } catch (e) { return "misafir"; }
  }
  function yetkiliMi() { return rol() === "yetkili"; }
  function rolKur(r) {
    try { sessionStorage.setItem(ROL_ANAHTAR, r); } catch (e) { }
    rozetGuncelle();
    try { if (window.uyeGorunumTazele) window.uyeGorunumTazele(); } catch (e) { }
  }
  window.rolKur = rolKur;
  window.rolTikla = function () {
    if (yetkiliMi()) { try { localStorage.removeItem(HATIRLA); } catch (e) { } rolKur("misafir"); uyari("Yetkili oturumu kapatıldı. Artık misafir olarak geziyorsun."); yenile(); return; }
    uyeAc();
  };
  /* rozetGuncelle · uye() · uyeVar() · uyeCikis() → aşağıdaki ÜYELİK SİSTEMİ bölümünde */

  window.yorumKutu = function (bolum) {
    var liste = (YON.yorumlar || []).filter(function (y) { return y.bolum === bolum && (yetkiliMi() || y.durum === "Yayında"); });
    var bekleyen = (YON.yorumlar || []).filter(function (y) { return y.bolum === bolum && y.durum !== "Yayında"; }).length;
    var u = uye();
    var h = '<div class="kart yorumKart"><div class="kBaslik">💬 ZİYARETÇİ YORUMLARI (' + liste.length + ")" + (yetkiliMi() && bekleyen ? ' <span class="yonEtiket bek">' + bekleyen + " onay bekliyor</span>" : "") + "</div>";
    if (!liste.length) h += '<p class="kucuk">Bu bölüme henüz yorum yazılmamış. İlk yorumu sen yaz.</p>';
    else {
      h += '<div class="yorumListe">';
      liste.forEach(function (y) {
        h += '<div class="yorumOge"><span class="yorumAd">' + esc(y.ad) + '</span><span class="yorumTarih">' + esc(y.tarih) + "</span>" +
          (yetkiliMi() && y.durum !== "Yayında" ? '<span class="yonEtiket bek">Onay bekliyor</span>' : "") +
          '<div class="yorumMetin">' + esc(y.metin) + "</div></div>";
      });
      h += "</div>";
    }
    if (uyeOnayliMi()) {
      h += '<div class="yonForm"><label class="yonAlan"><span>Yorumun (' + esc(u.kadi) + " olarak yazıyorsun)</span>" +
        '<textarea id="yo_metin_' + esc(bolum) + '" rows="3" placeholder="Düşünceni yaz..."></textarea></label></div>' +
        '<div class="yonDugmeler"><button class="yonDugme ana" onclick="yorumGonder(\'' + esc(bolum) + '\')">✍️ Yorumu Gönder</button>' +
        '<button class="yonDugme" onclick="uyeAc()">👤 Üyelik Kartım</button></div>' +
        '<div class="kucuk">Yorumun, site sahibinin onayından sonra yayımlanır.</div>';
    } else if (u && u.durum === "beklemede") {
      h += '<div class="yonBilgi">⏳ <b>Kaydın alındı ama yönetici onayı bekliyor.</b> Onaylandıktan sonra bu bölüme yorum yazabilirsin.</div>' +
        '<div class="yonDugmeler"><button class="yonDugme" onclick="uyeAc()">👤 Durumu Gör</button></div>';
    } else {
      h += '<div class="yonBilgi">Yorum yazabilmek için <b>üye olman ve site sahibinin onayını alman</b> yeterli — kategoriye yazı eklemek ise yalnızca site sahibinin yetkisindedir.</div>' +
        '<div class="yonDugmeler"><button class="yonDugme ana" onclick="uyeAc(\'kayit\')">🤝 ÜYE OL</button>' +
        '<button class="yonDugme" onclick="uyeAc(\'giris\')">🔑 GİRİŞ YAP</button></div>';
    }
    h += "</div>";
    return h;
  };
  window.yorumGonder = function (bolum) {
    var u = uye();
    if (!uyeOnayliMi()) { uyari("Yorum yazmak için üye olup yönetici onayı almalısın."); uyeAc("kayit"); return; }
    var t = (el("yo_metin_" + bolum) || {}).value || "";
    t = t.trim();
    if (t.length < 3) { uyari("Yorum çok kısa."); return; }
    var tarihSaat = bugun() + " " + uyeSaat();
    YON.yorumlar.push({ ad: u.kadi, uye: u.kadi, eposta: u.eposta || "", tel: u.tel || "", bolum: bolum, metin: t, tarih: tarihSaat,
      durum: (uyeAyar().yorumOnay ? "Onay bekliyor" : "Yayında") });
    kaydet(); yenile();
    uyari(uyeAyar().yorumOnay ? "✔ Yorumun alındı, onaydan sonra yayımlanacak." : "✔ Yorumun yayımlandı.");
  };
  window.yorumOnayla = function (i) {
    var y = YON.yorumlar[i];
    y.durum = y.durum === "Yayında" ? "Onay bekliyor" : "Yayında";
    kaydet(); yenile(); sekmeCiz();
  };
  window.yorumSil = function (i) { YON.yorumlar.splice(i, 1); kaydet(); yenile(); sekmeCiz(); };

  /* ---------- ÜYE İŞLEMLERİ (panel) ---------- */
  window.uyeAra = function (v) {
    v = String(v || "").toLowerCase();
    var n = 0;
    [].slice.call(document.querySelectorAll(".uyeSatirUye")).forEach(function (s) {
      var uy = (s.getAttribute("data-ara") || "").indexOf(v) > -1;
      s.style.display = uy ? "" : "none";
      if (uy) n++;
    });
  };
  window.yonUyeDurum = function (id, d) {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    var l = window.uyeleriAl();
    for (var i = 0; i < l.length; i++) if (l[i].id === id) {
      l[i].durum = d;
      if (d === "onayli") { l[i].not = "onaylandı"; l[i].sifirla = ""; }
      var ad = l[i].kadi;
    }
    window.uyeleriYaz(l); kaydet(); sekmeCiz();
    uyari("✔ " + ad + " → " + uyeDurumEtiket(d));
  };
  window.yonUyeSil = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    var l = window.uyeleriAl(), y = l.filter(function (x) { return x.id !== id; });
    window.uyeleriYaz(y); kaydet(); sekmeCiz(); uyari("🗑️ Üye kaydı silindi.");
  };
  window.yonUyeGeciciSifre = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    var h = "ACDEFGHJKLMNPQRSTUVWXYZ23456789", y = "";
    for (var i = 0; i < 8; i++) y += h.charAt(Math.floor(Math.random() * h.length));
    var l = window.uyeleriAl(), u = null;
    for (var j = 0; j < l.length; j++) if (l[j].id === id) { u = l[j]; l[j].sifre.tuz = tuzUret(); l[j].sifre.ozet = sifreOzet(y, l[j].sifre.tuz); l[j].sifirla = ""; l[j].durum = l[j].durum === "yasakli" ? "onayli" : l[j].durum; }
    window.uyeleriYaz(l); kaydet(); sekmeCiz();
    var mesaj = "🔑 " + u.kadi + " için yeni geçici şifre: " + y;
    alert(mesaj + "\n\nBu şifreyi bir kenara yaz ve üyeye WhatsApp/e-posta ile gönder. Üye girdikten sonra 'Şifremi Değiştir' ile kendi şifresini belirler.");
    try { if (navigator.clipboard) navigator.clipboard.writeText(y); } catch (e) { }
  };
  window.yonUyeMail = function (id) {
    var l = window.uyeleriAl(), u = null;
    for (var i = 0; i < l.length; i++) if (l[i].id === id) u = l[i];
    if (!u) return;
    var konu = "ÜSTAD KENAN KUZUCU — Üyelik kaydın";
    var govde = "Merhaba " + u.kadi + ",\n\n" +
      (u.durum === "onayli" ? "Sitemizdeki üyeliğin ONAYLANDI. Artık kullanıcı adın ve şifrenle giriş yapıp yorum yazabilirsin." :
        u.durum === "beklemede" ? "Üyelik kaydın alındı, şu an ONAY sırasında. Onaylandığında kullanıcı adın ve şifrenle giriş yapabilirsin." :
          "Üyelik kaydınla ilgili bilgi vermek isterim.") +
      "\n\nKullanıcı adı: " + u.kadi + "\nSite: ustadkenankuzucu.com.tr\n\nÜstad Kenan Kuzucu · 0537 771 24 38";
    window.open("mailto:" + encodeURIComponent(u.eposta) + "?subject=" + encodeURIComponent(konu) + "&body=" + encodeURIComponent(govde), "_blank");
  };
  window.yonUyeWA = function (id) {
    var l = window.uyeleriAl(), u = null;
    for (var i = 0; i < l.length; i++) if (l[i].id === id) u = l[i];
    if (!u || !u.tel) { uyari("Bu üyenin telefonu kayıtlı değil."); return; }
    var tel = String(u.tel).replace(/[^0-9]/g, "");
    if (tel.charAt(0) === "0") tel = "9" + tel;
    else if (tel.indexOf("90") !== 0) tel = "90" + tel;
    var mesaj = "Merhaba " + u.kadi + ", Üstad Kenan Kuzucu sitesinden yazıyorum. Üyelik kaydın: " + uyeDurumEtiket(u.durum);
    window.open("https://wa.me/" + tel + "?text=" + encodeURIComponent(mesaj), "_blank");
  };
  window.yonUyeEpostaKopyala = function () {
    var l = window.uyeleriAl().filter(function (x) { return x.durum === "onayli"; }).map(function (x) { return x.eposta; });
    var t = l.join("; ");
    try { if (navigator.clipboard) navigator.clipboard.writeText(t); } catch (e) { }
    alert("📋 " + l.length + " onaylı üyenin e-postası panoya kopyalandı:\n\n" + t);
  };

  /* ---------- GÖRÜNÜM İŞLEMLERİ (3D · tema · renkler) ---------- */
  var PANEL_RENKLER = ["#c9a227", "#2fb4d8", "#2fa97a", "#d1685f", "#8f79e8", "#cf7ab0", "#8fae3a", "#e0993d", "#6d8cf0", "#e05a4f", "#0fa3b1", "#b9c2cf"];
  var KISAYOLLAR = [
    { tus: "Ctrl + Alt + Y", ad: "🔐 Yönetim panelini aç / kapat" },
    { tus: "Ctrl + Alt + G", ad: "🎨 Görünüm ve 3D sekmesi" },
    { tus: "Ctrl + Alt + U", ad: "👤 Üyelik penceresi (kayıt · giriş)" },
    { tus: "Ctrl + Alt + K", ad: "🗂️ Kategoriler listesi" },
    { tus: "Ctrl + Alt + S", ad: "🎛️ 3D sahne panelini aç / kapat" },
    { tus: "Ctrl + Alt + R", ad: "🎲 Rastgele 3D sahne" },
    { tus: "Ctrl + Alt + T", ad: "🎨 Sıradaki tema" },
    { tus: "Ctrl + Alt + F", ad: "🔤 Sıradaki yazı tipi" },
    { tus: "Ctrl + Alt + B", ad: "📻 Radyo bölümüne git" },
    { tus: "Ctrl + Alt + A", ad: "🔍 Arama kutusuna git" },
    { tus: "Esc", ad: "Kapat (üyelik penceresi / panel)" }
  ];
  window.uskKisayollar = KISAYOLLAR;
  function uskAl(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function uskYaz(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  window.uskAl = uskAl; window.uskYaz = uskYaz;

  function uskKatRenkHesap(m) {
    var s = getComputedStyle(document.documentElement).getPropertyValue("--" + (m.renk || "b1"));
    s = String(s || "").trim();
    return /^#[0-9a-fA-F]{6}$/.test(s) ? s : "#c9a227";
  }
  /* kategori renkleri + panel rengi → tek stil kutusu */
  function uskStilTazele() {
    var k = el("uskStil");
    if (!k) { k = document.createElement("style"); k.id = "uskStil"; document.body.appendChild(k); }
    var su = {};
    try { var t = uskAl("usk-kat-renk"); if (t) su = JSON.parse(t) || {}; } catch (e) { }
    var css = "";
    for (var id in su) if (su.hasOwnProperty(id)) {
      css += 'body[data-bolum="' + id + '"]{--ana:' + su[id] + ';--ana2:' + su[id] + ";}\n";
    }
    var pr = uskAl("usk-panel-renk");
    if (pr) css += ":root{--panAna:" + pr + ";}\n";
    else css += ":root{--panAna:var(--b9);}\n";
    k.innerHTML = css;
  }
  window.uskStilTazele = uskStilTazele;
  window.yonSahneSec = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    ucSahneSec(id); sekmeCiz();
    var a = "";
    for (var i = 0; i < UC_SAHNELER.length; i++) if (UC_SAHNELER[i].id === id) a = UC_SAHNELER[i].ad;
    uyari("🎬 3D sahne: " + a);
  };
  window.yonRastgeleSahne = function () {
    var s = UC_SAHNELER[Math.floor(Math.random() * UC_SAHNELER.length)];
    ucSahneSec(s.id); sekmeCiz(); uyari("🎲 3D sahne: " + s.simge + " " + s.ad);
  };
  window.yonSahneAcilis = function () {
    uskYaz("usk-3d-rastgele", uskAl("usk-3d-rastgele") === "1" ? "0" : "1"); sekmeCiz();
    uyari(uskAl("usk-3d-rastgele") === "1" ? "⏱️ Site her açılışta rastgele bir 3D sahneyle başlayacak." : "✔ Sabit sahne kullanılacak.");
  };
  window.yonSahneKapatAc = function () {
    var kapali = uskAl("usk-3d") === "0";
    uskYaz("usk-3d", kapali ? "1" : "0");
    uyari("3D arka plan " + (kapali ? "açıldı" : "kapatıldı") + " — açılışta geçerli olur.");
    sekmeCiz();
  };
  window.yonTemaSec = function (id) { if (!yetkiliMi()) { uyari("Yalnızca site sahibi."); return; } temaUygula(id, 1); sekmeCiz(); uyari("🎨 Tema değişti."); };
  window.yonYaziSec = function (id) { if (!yetkiliMi()) { uyari("Yalnızca site sahibi."); return; } yaziUygula(id, 1); sekmeCiz(); uyari("🔤 Yazı tipi değişti."); };
  window.yonKatRenk = function (id, hex) {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    var su = {};
    try { var t = uskAl("usk-kat-renk"); if (t) su = JSON.parse(t) || {}; } catch (e) { }
    su[id] = hex; uskYaz("usk-kat-renk", JSON.stringify(su));
    uskStilTazele(); sekmeCiz(); uyari("🎨 Kategori rengi kaydedildi: " + hex);
  };
  window.yonKatRenkSifirla = function (id) {
    var su = {};
    try { var t = uskAl("usk-kat-renk"); if (t) su = JSON.parse(t) || {}; } catch (e) { }
    delete su[id]; uskYaz("usk-kat-renk", JSON.stringify(su));
    uskStilTazele(); sekmeCiz(); uyari("↩️ Kategori kendi rengine döndü.");
  };
  window.yonTumKatRenkSifirla = function () {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    uskYaz("usk-kat-renk", "{}"); uskStilTazele(); sekmeCiz(); uyari("↩️ Bütün kategori renkleri fabrika ayarına döndü.");
  };
  window.yonKatRenkSerpistir = function () {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    var su = {};
    MENU.forEach(function (m, i) {
      su[m.id] = PANEL_RENKLER[i % PANEL_RENKLER.length];
    });
    uskYaz("usk-kat-renk", JSON.stringify(su)); uskStilTazele(); sekmeCiz();
    uyari("🌈 " + MENU.length + " kategoriye uyumlu renk dağıtıldı. Beğenmezsen 'sıfırla' de.");
  };
  window.yonPanelRenk = function (hex) {
    if (!yetkiliMi()) { uyari("Bu işlem yalnızca site sahibinindir."); return; }
    if (hex) uskYaz("usk-panel-renk", hex); else { try { localStorage.removeItem("usk-panel-renk"); } catch (e) { } }
    uskStilTazele(); sekmeCiz(); uyari(hex ? "🛠 Panel rengi: " + hex : "↩️ Panel rengi varsayılana döndü.");
  };

  /* ---------- KISAYOLLAR ---------- */
  function sonrakiTema(yon) {
    var i = 0;
    for (var a = 0; a < TEMALAR.length; a++) if (TEMALAR[a].id === DURUM.tema) i = a;
    var y2 = (i + (yon ? 1 : -1) + TEMALAR.length) % TEMALAR.length;
    temaUygula(TEMALAR[y2].id, 1);
    return TEMALAR[y2].ad;
  }
  function sonrakiYazi(yon) {
    var i = 0;
    for (var a = 0; a < YAZILAR.length; a++) if (YAZILAR[a].id === DURUM.yazi) i = a;
    var y2 = (i + (yon ? 1 : -1) + YAZILAR.length) % YAZILAR.length;
    yaziUygula(YAZILAR[y2].id, 1);
    return YAZILAR[y2].ad;
  }
  window.uskKisayolDinle = function (e) {
    if (e.key === "Escape") { uyeKapat(); if (typeof yonKapat === "function") { try { yonKapat(); } catch (err) { } } return; }
    if (!e.ctrlKey || !e.altKey) return;
    var k = String(e.key || "").toLowerCase();
    var islemler = {
      y: function () { window.yonAc(); },
      g: function () { window.yonAc(); SEKME = "gorunum"; sekmeCiz(); },
      u: function () { uyeAc(); },
      k: function () { kapakAc(); },
      s: function () { var d = el("ucPanel"); if (d) { d.classList.contains("gor") ? ucPanelKapat() : ucPanelAc(); } },
      r: function () { window.yonRastgeleSahne(); },
      t: function () { uyari("🎨 Tema: " + sonrakiTema(1)); },
      f: function () { uyari("🔤 Yazı tipi: " + sonrakiYazi(1)); },
      b: function () { git("radyo"); },
      a: function () { var kk = el("arama"); if (kk) { kk.focus(); } }
    };
    if (islemler[k]) { e.preventDefault(); islemler[k](); }
  };

  /* ---------- SİMGE / EMOJİ SEÇİCİ ---------- */
  var SIMGELER = [
    ["✍️ Yazı & Edebiyat", ["✍️", "📝", "📖", "📚", "📜", "📃", "🖋️", "🖊️", "📔", "📕", "📗", "📘", "📙", "📓", "🗒️", "🗞️", "🎭", "📄"]],
    ["🕊️ Şiir & Duygu", ["🕊️", "🪶", "💌", "✉️", "📮", "🎐", "🌸", "🌷", "🎵", "🎶", "🎼", "🌙", "⭐", "💫", "❣️", "💗"]],
    ["💻 Teknoloji & Siber", ["💻", "🖥️", "⌨️", "🖱️", "🔐", "🔑", "🛡️", "🕵️", "🐍", "🐧", "🛰️", "📡", "🤖", "💾", "🧠", "⚙️", "🔧", "🛠️", "🧰", "🔎"]],
    ["🎓 Eğitim & Bilim", ["🎓", "🏛️", "🔬", "🧪", "📐", "📊", "📈", "🧭", "🗺️", "🔭", "🧮", "📎", "📌", "🏆", "🥇", "🎖️", "📋", "🗂️"]],
    ["💈 Salon & Güzellik", ["💈", "✂️", "🪒", "🧴", "🧼", "💅", "💇", "🎨", "🖌️", "🪞", "💎", "👑", "🎩", "👔", "👞", "🧔", "💐", "✨"]],
    ["🌐 İletişim & Medya", ["🌐", "📱", "☎️", "📞", "📧", "💬", "🗨️", "🔔", "📢", "📣", "📸", "🎥", "📺", "🎬", "▶️", "🛰️", "📻", "🎙️"]],
    ["💼 İş & Kariyer", ["💼", "💰", "🧾", "⚖️", "🏪", "🏢", "🤝", "📅", "🕒", "⏰", "✅", "🔖", "📁", "🗃️", "🏦", "🧑‍💼"]],
    ["🌿 Doğa & Yol", ["🌿", "🍃", "🏔️", "🌊", "☀️", "⛅", "🌍", "✈️", "🚗", "⚓", "🕯️", "🪔", "🌺", "🍀", "🦅", "🐎", "🔥", "❄️"]],
    ["❤️ Yaşam & Sağlık", ["❤️", "💚", "🧿", "🩺", "💊", "🌱", "🏃", "🧘", "☕", "🍵", "🎯", "🧩", "🎲", "🎁", "🎉", "🙏", "🫱", "🫶"]]
  ];

  var SIMGE_HEDEF = "yeni";
  window.simgeHedef = function (id) {
    SIMGE_HEDEF = id || "yeni";
    sekmeCiz();
    var k = document.querySelector(".simgeSecici");
    if (k && k.scrollIntoView) k.scrollIntoView({ block: "center" });
    uyari(SIMGE_HEDEF === "yeni" ? "Simge seçimi: yeni kategori" : "Simge seçimi: " + (bolumBul(SIMGE_HEDEF) || {}).ad);
  };
  window.simgeSec = function (s) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    if (SIMGE_HEDEF === "yeni") {
      var i = el("ky_simge");
      if (i) i.value = s;
      uyari("Simge seçildi: " + s + " — kategori adını yazıp KAYIT ET düğmesine bas.");
    } else {
      var id = SIMGE_HEDEF;
      var r = el("kb_simge_" + id);
      if (r) r.value = s;
      kKaydet(id);
      uyari("Simge kaydedildi: " + s);
    }
  };
  function simgePaleti() {
    var hedefAd = SIMGE_HEDEF === "yeni" ? "YENİ KATEGORİ" : ((bolumBul(SIMGE_HEDEF) || {}).ad || SIMGE_HEDEF);
    var h = '<div class="simgeSecici"><div class="simgeUst">🎨 SİMGE SEÇ · seçim yeri: <b>' + esc(hedefAd) + "</b>";
    if (SIMGE_HEDEF !== "yeni") h += ' <button class="yonDugme" onclick="simgeHedef(\'yeni\')">↩️ Yeni kategoriye dön</button>';
    h += "</div>";
    SIMGELER.forEach(function (grup) {
      h += '<div class="simgeGrup">' + esc(grup[0]) + "</div><div class=\"simgeIzgara\">";
      grup[1].forEach(function (s) {
        h += '<button class="simgeDugme" onclick="simgeSec(\'' + s + '\')" title="' + esc(s) + '">' + s + "</button>";
      });
      h += "</div>";
    });
    h += "</div>";
    return h;
  }

  /* ---------- 3) PANEL ARAYÜZÜ ---------- */
  var SEKME = "icerik";
  /* >0 ise 👥 Üyeler sekmesinde o üyenin görünürlük yetkileri düzenleniyor */
  var YETKI_ID = null;

  function uyari(m) {
    var k = el("yonUyari");
    if (!k) {
      k = el("yonUyariGenel");
      if (!k) {
        k = document.createElement("div");
        k.id = "yonUyariGenel"; k.className = "yonUyari";
        document.body.appendChild(k);
      }
    }
    k.textContent = m; k.classList.add("gor");
    clearTimeout(k.__t); k.__t = setTimeout(function () { k.classList.remove("gor"); }, 2600);
  }

  var ALANLAR = {
    siirler: [{ k: "ad", b: "Şiirin adı", t: "metin" }, { k: "dize", b: "Dizeler (her satır bir dize)", t: "cok" }],
    makaleler: [{ k: "ad", b: "Makalenin başlığı", t: "metin" }, { k: "ozet", b: "Kısa özet (tek satır)", t: "metin" }, { k: "paragraf", b: "Yazı (paragrafları boş satırla ayır)", t: "cok" }],
    kitaplar: [{ k: "ad", b: "Kitap adı", t: "metin" }, { k: "yazar", b: "Yazar", t: "metin" },
      { k: "tur", b: "Tür (roman / şiir / tarih / bilim...)", t: "metin" }, { k: "not", b: "Kısa not / düşüncem", t: "metin" },
      { k: "ozet", b: "Kitabın özeti (karta tıklanınca açılır — paragrafları boş satırla ayır)", t: "cok" },
      { k: "tarih", b: "Okuduğum yıl (isteğe bağlı)", t: "metin" }],
    mektuplar: [{ k: "ad", b: "Mektubun başlığı", t: "metin" }, { k: "tarih", b: "Tarih (isteğe bağlı)", t: "metin" }, { k: "paragraf", b: "Mektup metni (paragrafları boş satırla ayır)", t: "cok" }],
    eserler: [{ k: "ad", b: "📕 KİTABIN ADI (zorunlu)", t: "metin" },
      { k: "durum", b: "Kitabın durumu", t: "secim", secenekler: ["✅ Yayında", "🖨️ Baskıda", "📝 Hazırlanıyor", "🖋️ Yazılıyor"] },
      { k: "tur", b: "Türü (Roman · İnceleme · Şiir · Senaryo · Deneme…)", t: "metin" },
      { k: "yil", b: "Yazım / yayın yılı", t: "sayi" },
      { k: "sayfa", b: "Sayfa sayısı (isteğe bağlı)", t: "sayi" },
      { k: "kapak", b: "Kapak görseli (foto/kitap-adi.jpg ya da https://...) — boş bırakılabilir", t: "metin" },
      { k: "not", b: "KISA TANITIM (kartın üstünde görünür — 1-2 cümle)", t: "cok" },
      { k: "aciklama", b: "UZUN TANITIM / arka kapak yazısı (paragrafları boş satırla ayır)", t: "cok" },
      { k: "onsuz", b: "ÖNSÖZ (isteğe bağlı — paragrafları boş satırla ayır)", t: "cok" },
      { k: "link", b: "Satın alma / okuma bağlantısı (isteğe bağlı)", t: "metin" }],
    sosyal: [{ k: "ad", b: "Platform adı", t: "metin" }, { k: "hesap", b: "Kullanıcı adı / hesap", t: "metin" }, { k: "url", b: "Bağlantı (https://...)", t: "metin" }, { k: "ikon", b: "Simge", t: "secim", secenekler: IKONLAR }, { k: "not", b: "Kısa not", t: "metin" }],
    kanallar: [{ k: "ad", b: "Kanal adı", t: "metin" }, { k: "url", b: "Yayın adresi (https://...)", t: "metin" },
      { k: "grup", b: "Hangi radyo / TV bölümüne eklensin?", t: "secim", secenekler: function () { return radioGruplari(); } }],
    belgeler: [{ k: "ad", b: "Kurum adı", t: "metin" }, { k: "sayi", b: "Belge sayısı", t: "sayi" }, { k: "kategori", b: "Kategori", t: "secim", secenekler: ["meb", "universite", "akademi"] }],
    mesleki: [{ k: "ad", b: "Belgenin adı", t: "metin" }],
    ai: [{ k: "ad", b: "Sertifika / kurs adı", t: "metin" }]
  };
  var KATEGORI_AD = {
    siirler: "🕊️ Şiir", makaleler: "✍️ Makale", mektuplar: "✉️ Mektup", eserler: "📚 Eser (kitap/senaryo)",
    sosyal: "🌐 Sosyal hesap", kanallar: "📻 Radyo / 📺 TV kanalı", belgeler: "🎓 Belge / sertifika sayısı",
    kitaplar: "📖 Okuduğum kitap",
    mesleki: "📜 Mesleki uzmanlık belgesi", ai: "🤖 AI güvenlik sertifikası"
  };

  function aktifKategori() { return window.__yonKat || "siirler"; }

  /* ---- RADYO BÖLÜMLERİ (gruplu kanal listesi) ---- */
  function radioGruplari() {
    if (typeof KANAL_GRUPLARI === "undefined") return ["Pop & Genel"];
    var l = [];
    for (var i = 0; i < KANAL_GRUPLARI.length; i++) {
      var g = KANAL_GRUPLARI[i];
      l.push((g.bolum === "islami" ? "🕌 ÜSTAD İSLAMİ RADYO → " : "📻 ÜSTAD CANLI RADYO → ") + g.ad);
    }
    if (typeof TV_GRUPLARI !== "undefined")
      for (var t = 0; t < TV_GRUPLARI.length; t++) l.push("📺 MEKKE MEDİNE CANLI TV → " + TV_GRUPLARI[t].ad);
    return l;
  }
  function radioGrupAdSuz(etiket) {   /* etiketten grubun gerçek adını bul */
    var i = etiket.indexOf("→ ");
    return i > -1 ? etiket.slice(i + 2) : etiket;
  }
  function radioGrupNo(ad) {
    if (typeof KANAL_GRUPLARI === "undefined") return 0;
    ad = radioGrupAdSuz(ad);
    for (var i = 0; i < KANAL_GRUPLARI.length; i++) if (KANAL_GRUPLARI[i].ad === ad) return i;
    if (typeof TV_GRUPLARI !== "undefined")
      for (var t = 0; t < TV_GRUPLARI.length; t++) if (TV_GRUPLARI[t].ad === ad) return "tv:" + ad;
    return KANAL_GRUPLARI.length - 1;
  }
  /* Eklenen kanalları bölümlerine yerleştirir, gizlenenleri çıkarır */
  function kanallariKur() {
    if (typeof KANAL_GRUPLARI === "undefined" || typeof KANALLAR === "undefined") {
      if (typeof KANALLAR !== "undefined") KANALLAR = suz(KANALLAR, YON.gizli.kanallar).concat(YON.eklenen.kanallar);
      return;
    }
    var ekl = YON.eklenen.kanallar || [];
    for (var i = 0; i < ekl.length; i++) {
      var k = ekl[i];
      if (typeof k[2] === "string" && k[2].indexOf("tv:") === 0 && typeof TV_GRUPLARI !== "undefined") {
        var gt = null;
        for (var t = 0; t < TV_GRUPLARI.length; t++) if (TV_GRUPLARI[t].ad === k[2].slice(3)) { gt = TV_GRUPLARI[t]; break; }
        if (gt) {
          var varMI2 = false;
          for (var q2 = 0; q2 < gt.liste.length; q2++) if (gt.liste[q2][0] === k[0]) { varMI2 = true; break; }
          if (!varMI2) gt.liste.push([k[0], "", k[1], "📺"]);
        }
        continue;
      }
      var gi = (typeof k[2] === "number" && KANAL_GRUPLARI[k[2]]) ? k[2] : (KANAL_GRUPLARI.length - 1);
      var L = KANAL_GRUPLARI[gi].liste, varMI = false;
      for (var q = 0; q < L.length; q++) if (L[q][1] === k[1]) { varMI = true; break; }
      if (varMI) continue;
      L.push([k[0], k[1]]);
    }
    var giz = (YON.gizli && YON.gizli.kanallar) ? YON.gizli.kanallar : [];
    KANALLAR = [];
    if (typeof ISLAMI_KANALLAR !== "undefined") ISLAMI_KANALLAR = [];
    for (var g = 0; g < KANAL_GRUPLARI.length; g++) {
      var gr = KANAL_GRUPLARI[g], G = gr.liste;
      var hedef = (gr.bolum === "islami" && typeof ISLAMI_KANALLAR !== "undefined") ? ISLAMI_KANALLAR : KANALLAR;
      for (var s = 0; s < G.length; s++) { if (giz.indexOf(G[s][0]) > -1) continue; hedef.push(G[s]); }
    }
  }

  var OTO_NOT = ["siirler", "makaleler", "mektuplar", "eserler", "kitaplar", "sosyal", "radyo"];
  var OZEL_ALANLAR = [{ k: "ad", b: "Başlık", t: "metin" }, { k: "paragraf", b: "Yazı (paragrafları boş satırla ayır)", t: "cok" }, { k: "link", b: "Bağlantı (isteğe bağlı)", t: "metin" }];
  function katAlanlari(id) { return ozelMi(id) ? OZEL_ALANLAR : (ALANLAR[id] || []); }
  function katAd(id) {
    var m = bolumBul(id);
    return m ? m.simge + " " + m.ad : (KATEGORI_AD[id] || id);
  }

  function formCiz() {
    var a = katAlanlari(aktifKategori());
    var h = "";
    a.forEach(function (f) {
      h += '<label class="yonAlan"><span>' + esc(f.b) + "</span>";
      if (f.t === "secim") {
        var secenekler = (typeof f.secenekler === "function") ? f.secenekler() : f.secenekler;
        h += '<select id="f_' + f.k + '">' + secenekler.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + "</option>"; }).join("") + "</select>";
      } else if (f.t === "cok") {
        h += '<textarea id="f_' + f.k + '" rows="6" placeholder="Yazıyı buraya yapıştır..."></textarea>';
      } else {
        h += '<input id="f_' + f.k + '" type="' + (f.t === "sayi" ? "number" : "text") + '" placeholder="' + esc(f.b) + '">';
      }
      h += "</label>";
    });
    return h;
  }

  function icerikListesi() {
    var K = aktifKategori();
    if (ozelMi(K)) {
      return (YON.icerikOzel[K] || []).map(function (x) { return { ad: x.ad, yerli: true, ham: x }; });
    }
    var map = { siirler: ["SIIRLER", "gizli.siirler"], makaleler: ["MAKALELER", "gizli.makaleler"], mektuplar: ["MEKTUPLAR", "gizli.mektuplar"], eserler: ["ESERLER", "gizli.eserler"], kitaplar: ["KITAPLAR", "gizli.kitaplar"], sosyal: ["SOSYAL", "gizli.sosyal"], kanallar: ["KANALLAR", "gizli.kanallar"] };
    var m = map[K];
    if (!m) {
      var liste = K === "mesleki" ? (typeof MESLEKI_BELGE !== "undefined" ? MESLEKI_BELGE : []) : (typeof AI_GUVENLIK !== "undefined" ? AI_GUVENLIK.liste : []);
      return liste.map(function (x) { return { ad: typeof x === "string" ? x : x.ad, yerli: false, ham: x }; });
    }
    var dizi = window[m[0]] || [];
    var parcalar = m[1].split(".");
    var gizliListe = YON.gizli[parcalar[1]] || [];
    return dizi.map(function (x) {
      var ad = typeof x === "string" ? x : (Array.isArray(x) ? x[0] : x.ad);
      var yerli = YON.eklenen[K].some(function (y) { return (y.ad || y[0]) === ad; });
      return { ad: ad, yerli: yerli, gizli: gizliListe.indexOf(ad) > -1, ham: x };
    });
  }

  function sekmeCiz() {
    if (!el("yonGovde")) return;   /* panel açık değilse çizme (dışarıdan çağrılarda hata vermez) */
    var h = '<div class="yonSekmeler">';
    [["icerik", "➕ İçerik Ekle"], ["kategori", "🗂️ Kategoriler"], ["gorunum", "🎨 Görünüm & 3D"], ["yorum", "💬 Yorumlar"], ["uyeler", "👥 Üyeler"], ["kayit", "🗂️ Kayıt Defteri"], ["yayin", "📣 Yayın Kaydı"], ["dosya", "💾 Yedek & Dosya"]].forEach(function (s) {
      h += '<button class="yonSek' + (SEKME === s[0] ? " sec" : "") + '" onclick="yonSekme(\'' + s[0] + '\')">' + s[1] + "</button>";
    });
    h += "</div>";

    if (SEKME === "icerik") {
      h += '<div class="yonSatir"><label class="yonAlan"><span>Ne eklemek istiyorsun?</span><select id="f_kategori">' +
        katListesi().map(function (k) { return '<option value="' + k.id + '"' + (k.id === (window.__yonKat || "siirler") ? " selected" : "") + ">" + esc(k.ad) + "</option>"; }).join("") + "</select></label>" +
        '<button class="yonDugme" onclick="yonKategoriSec()">Seç</button></div>';
      window.__yonKat = window.__yonKat || "siirler";
      h += '<div class="yonHizli"><span class="yonHizliBas">Hızlı seç:</span>' +
        [["eserler", "📚 YAZDIĞIM ESERLER (kitap ekle)"], ["siirler", "🕊️ Şiir"], ["makaleler", "✍️ Makale"],
         ["kitaplar", "📖 Okuduğum kitap"], ["mektuplar", "✉️ Mektup"], ["sosyal", "🌐 Sosyal hesap"]]
          .map(function (k) { return '<button class="yonKucuk hizli" onclick="yonKatSec(\'' + k[0] + '\')">' + k[1] + "</button>"; }).join("") + "</div>";
      if (aktifKategori() === "eserler") {
        h += '<div class="yonBilgi kitapBilgi"><b>📚 YENİ KİTAP / ESER EKLE — adım adım</b>' +
          '<div class="kitapAdimlar">' +
          "<span>1.</span> Aşağıdaki <b>KİTABIN ADI</b> alanına kitabın adını yaz." +
          "<span>2.</span> <b>Durumu</b> seç (Yayında · Baskıda · Hazırlanıyor · Yazılıyor)." +
          "<span>3.</span> <b>Türü</b>, <b>yılı</b> ve istersen <b>sayfa sayısını</b> yaz." +
          "<span>4.</span> Kapağın fotoğrafını sitenin <b>foto</b> klasörüne koy, adını <b>Kapak görseli</b> alanına yaz (örn. foto/ahlaksiz-toplumlar.jpg). Kapak istemiyorsan boş bırak." +
          "<span>5.</span> <b>KISA TANITIM</b> ve <b>UZUN TANITIM</b> yazılarını gir (paragrafları boş satırla ayır)." +
          "<span>6.</span> En altta <b>💾 KAYIT ET ve YAYINA AL</b> düğmesine bas. Kitap anında sitedeki YAZDIĞIM ESERLER bölümünde görünür." +
          "</div>" +
          '<div class="kitapNotSatir">💡 İstediğin kadar kitap ekleyebilirsin; her eklediğin kitap bu tarayıcıda saklanır ve <b>💾 Yedek & Dosya</b> sekmesinden yedeklenebilir. Yazdığın kitaplar şu an: <b>' + icerikListesi().length + "</b> adet.</div></div>";
      }
      h += '<div class="yonForm">' + formCiz() + "</div>";
      h += '<div class="yonDugmeler"><button class="yonDugme ana" onclick="yonEkle()">💾 KAYIT ET ve YAYINA AL</button>' +
        '<button class="yonDugme" onclick="yonTemizle()">🧹 Formu Temizle</button></div>';
      h += '<div class="yonListeBas">Mevcut kayıtlar: ' + katAd(aktifKategori()) + " (" + icerikListesi().length + " adet)" +
        '<input class="yonSuzgec" id="yonSuzgec" placeholder="🔍 Listede ara..." oninput="yonSuz(this.value)"></div><div class="yonListe">';
      var items = icerikListesi();
      if (!items.length) h += '<div class="yonBos">Bu bölümde henüz kayıt yok. Yukarıdaki forma yazıp "Kaydet ve Yayına Al" düğmesine bas.</div>';
      items.forEach(function (it, i) {
        h += '<div class="yonOge' + (it.gizli ? " gizli" : "") + '"><span class="yonOgeAd">' + esc(it.ad) + "</span>" +
          '<span class="yonEtiket">' + (it.yerli ? "panelden" : "sitende") + (it.gizli ? " · gizli" : "") +
            (it.ham && it.ham.durum ? " · " + esc(String(it.ham.durum).replace(/[✅🖨️📝🖋️]\s*/g, "")) : "") +
            (it.ham && it.ham.yil ? " · " + esc(it.ham.yil) : "") + "</span>" +
          (it.yerli ? '<button class="yonKucuk" onclick="yonSil(' + i + ')" title="Bu kaydı sil">🗑️</button>' : "") +
          '<button class="yonKucuk" onclick="yonGizle(' + i + ')">' + (it.gizli ? "👁️" : "🙈") + "</button></div>";
      });
      h += "</div>";
    }



    if (SEKME === "kategori") {
      h += '<div class="yonBilgi"><b>Kategorileri buradan yönetirsin:</b> yeni kategori açabilir, adını/simgesini/rengini değiştirebilir, sırasını oynatabilir, gizleyebilir veya silebilirsin. Değişiklikler anında sol menüye ve bölümlere yansır.</div>';
      // yeni kategori
      h += '<div class="yonForm yonIzgara">' +
        '<label class="yonAlan"><span>Yeni kategori adı</span><input id="ky_ad" placeholder="Örn. SEYAHAT NOTLARI"></label>' +
        '<label class="yonAlan"><span>Simge (aşağıdaki simgelerden de seçebilirsin)</span><input id="ky_simge" placeholder="🧭" value="🧭"></label>' +
        '<label class="yonAlan"><span>Renk</span><input id="ky_renk" type="color" value="#e8a33d" style="height:40px;padding:2px"></label>' +
        '<label class="yonAlan"><span>Üst yazı (isteğe bağlı)</span><input id="ky_aciklama" placeholder="Bu bölümde neler var?"></label>' +
        "</div>";
      h += simgePaleti();
      h += '<div class="yonDugmeler">' +
        '<button class="yonDugme ana buyukKaydet" onclick="kKaydetHepsi()">💾 KAYIT ET (bütün değişiklikler)</button>' +
        '<button class="yonDugme" onclick="kYeni()">➕ KAYIT ET ve YENİ KATEGORİ AÇ</button>' +
        '<button class="yonDugme" onclick="kSifirla()">↩️ Adları/sırayı eski hâline döndür</button></div>';
      // liste
      var gizliler = (YON.gizliBolum || []).map(function (id) {
        var t = temelAl().filter(function (x) { return x.id === id; })[0];
        return t ? t : { id: id, ad: id, simge: "❓", renk: "#888888", not: "" };
      });
      var tumu = (typeof MENU !== "undefined" ? MENU.map(function (m, i) { return { m: m, i: i, gizli: false }; }) : []).concat(
        gizliler.map(function (m) { return { m: m, i: -1, gizli: true }; }));
      h += '<div class="yonListeBas">Bütün kategoriler (' + tumu.length + ')</div>';
      if ((YON.gizliBolum || []).length) {
        h += '<div class="yonUyariSatir">🙈 ' + YON.gizliBolum.length + ' kategori gizli durumda — menüde görünmez. Aşağıdaki <b>👁️ Geri Getir</b> düğmesine basarak tekrar göster.' +
          ' <button class="yonDugme" onclick="kHepsiniGoster()">👁️ Bütün gizlenenleri geri getir</button></div>';
      }
      h += '<div class="yonListe yonUzun">';
      tumu.forEach(function (kb) {
        var m = kb.m, i = kb.i, gizliMi = kb.gizli;
        var ozel = ozelMi(m.id);
        h += '<div class="yonOge yonKatSatir' + (gizliMi ? " gizliKat" : "") + '">' +
          '<span class="yonKucuk" title="sıra">' + (gizliMi ? "🙈" : (i + 1)) + "</span>" +
          '<input class="yonMini" id="kb_simge_' + esc(m.id) + '" value="' + esc(m.simge) + '" title="simge">' +
          '<input class="yonMini genis" id="kb_ad_' + esc(m.id) + '" value="' + esc(m.ad) + '" title="ad">' +
          (OTO_NOT.indexOf(m.id) > -1
            ? '<input class="yonMini orta" id="kb_not_' + esc(m.id) + '" value="' + esc((m.not || "") + " (otomatik)") + '" disabled title="Bu yan yazı içerik sayısından otomatik hesaplanır">'
            : '<input class="yonMini orta" id="kb_not_' + esc(m.id) + '" value="' + esc(m.not || "") + '" title="yan yazı (elle yazılır)">') +
          '<input type="color" id="kb_renk_' + esc(m.id) + '" value="' + (String(m.renk).charAt(0) === "#" ? m.renk : "#e8a33d") + '" title="renk" onchange="kRenk(\'' + esc(m.id) + '\')">' +
          '<button class="yonKucuk" onclick="simgeHedef(\'' + esc(m.id) + '\')" title="bu kategoriye simge seç">🎨 Simge</button>' +
          '<button class="yonKucuk kaydet" onclick="kKaydet(\'' + esc(m.id) + '\')" title="bu satırı kaydet">💾 Kaydet</button>' +
          '<button class="yonKucuk" onclick="kGit(\'' + esc(m.id) + '\')" title="bölüme git">↗ Git</button>' +
          '<button class="yonKucuk" onclick="kYukari(\'' + esc(m.id) + '\')" title="yukarı taşı">🔼</button>' +
          '<button class="yonKucuk" onclick="kAsagi(\'' + esc(m.id) + '\')" title="aşağı taşı">🔽</button>' +
          '<button class="yonKucuk geriGetir" onclick="kGeriGetir(\'' + esc(m.id) + '\')" title="' +
            (gizliMi ? "Bu kategoriyi menüye geri getir" : "Adını/simgesini/rengini ilk hâline döndür ve menüde göster") + '">👁️ Geri Getir</button>' +
          '<button class="yonKucuk" onclick="kGizle(\'' + esc(m.id) + '\')" title="menüden gizle (yazılar silinmez)">🙈 Gizle</button>' +
          '<button class="yonKucuk" onclick="kSahip(\'' + esc(m.id) + '\')" title="bu kategoriyi yalnızca site sahibi görsün / herkese açık olsun">' +
            (bolumYalnizSahip(m.id) ? "🔒 Yalnız ben" : "👁️ Herkese açık") + '</button>' +
          '<button class="yonKucuk" onclick="kIzinli(\'' + esc(m.id) + '\')" title="bu kategoriyi yalnızca izin verdiğim üyeler görsün / herkese açık olsun">' +
            (bolumIzinli(m.id) ? "🔐 Yalnız izinli üyeler" : "🔓 Üyelere aç") + '</button>' +
          (ozel ? '<button class="yonKucuk" onclick="kSil(\'' + esc(m.id) + '\')" title="kategoriyi sil">🗑️</button>' : '') +
          "</div>";
      });
      h += "</div>";
      h += '<div class="yonDugmeler"><button class="yonDugme ana buyukKaydet" onclick="kKaydetHepsi()">💾 KAYIT ET (bütün değişiklikler)</button>' +
        '<button class="yonDugme" onclick="yonKapat()">✔️ Kaydettim, paneli kapat</button></div>';
      h += '<div class="yonBilgi"><b>Nasıl kaydedilir?</b> Adı/simgeyi/yan yazıyı değiştirdikten sonra ya satırdaki <b>💾 Kaydet</b> düğmesine, ya da alttaki/üstteki <b>💾 KAYIT ET</b> düğmesine bas. <b>Renk</b> ve <b>sıra</b> (🔼 🔽) seçtiğin an kendiliğinden kaydedilir.</div>';
    }

    if (SEKME === "yorum") {
      var yay = YON.yorumlar.filter(function (y) { return y.durum === "Yayında"; }).length;
      var bek = YON.yorumlar.length - yay;
      h += '<div class="yonSayac"><b>' + YON.yorumlar.length + "</b> yorum · <b>" + yay + "</b> yayında · <b>" + bek + "</b> onay bekliyor</div>";
      h += '<div class="yonDugmeler"><button class="yonDugme" onclick="yonCSV(\'yorum\')">📄 Excel/CSV indir</button>' +
        '<button class="yonDugme" onclick="yonWord(\'yorum\')">📝 Word indir</button></div>';
      h += '<div class="yonListe">';
      if (!YON.yorumlar.length) h += '<div class="yonBos">Henüz yorum yok. Misafirler üye olup yorum yazdığında burada görünür.</div>';
      YON.yorumlar.forEach(function (y, i) {
        h += '<div class="yonOge"><span class="yonOgeAd">' + esc(y.ad) + "</span>" +
          '<span class="yonEtiket">' + esc(y.bolum) + " · " + esc(y.tarih) + "</span>" +
          '<span class="yonEtiket ' + (y.durum === "Yayında" ? "iyi" : "bek") + '">' + esc(y.durum) + "</span>" +
          '<span class="yonKucukNot">' + esc(y.metin.slice(0, 70)) + "</span>" +
          '<button class="yonKucuk" onclick="yorumOnayla(' + i + ')">' + (y.durum === "Yayında" ? "🚫" : "✅") + "</button>" +
          '<button class="yonKucuk" onclick="yorumSil(' + i + ')">🗑️</button></div>';
      });
      h += "</div>";
    }

    if (SEKME === "gorunum") {
      h += '<div class="yonBilgi"><b>Görünümü buradan yönetirsin:</b> 3D arka plan sahnesi, site teması, yazı tipi, <b>her kategorinin kendi rengi</b> ve <b>yönetim panelinin rengi</b>. Seçtiğin an uygulanır, bu bilgisayarda hatırlanır.</div>';

      h += '<div class="yonBaslikK">🎬 3D ARKA PLAN SAHNESİ (' + (typeof UC_SAHNELER !== "undefined" ? UC_SAHNELER.length : 0) + ' sahne)</div>';
      h += '<div class="yonDugmeler"><button class="yonDugme" onclick="yonRastgeleSahne()">🎲 Rastgele sahne ver</button>' +
        '<button class="yonDugme" onclick="yonSahneAcilis()">' + (uskAl("usk-3d-rastgele") === "1" ? "✅ Her açılışta rastgele sahne" : "⏱️ Her açılışta rastgele sahne") + '</button>' +
        '<button class="yonDugme" onclick="ucPanelAc()">🎛️ 3D panelini aç</button>' +
        '<button class="yonDugme" onclick="yonSahneKapatAc()">' + (uskAl("usk-3d") === "0" ? "3D arka plan kapalı" : "3D arka plan açık") + '</button></div>';
      if (typeof UC_SAHNELER !== "undefined") {
        h += '<div class="yonIzgaraSahne">';
        UC_SAHNELER.forEach(function (s) {
          h += '<button class="yonSahneBtn' + (s.id === UC_SAHNE_ID ? " sec" : "") + '" onclick="yonSahneSec(\'' + s.id + '\')" title="' + esc(s.not || "") + '">' +
            '<span class="ysSimge">' + s.simge + '</span><span class="ysAd">' + esc(s.ad) + "</span></button>";
        });
        h += "</div>";
      }

      h += '<div class="yonBaslikK">🎨 SİTE TEMASI (' + (typeof TEMALAR !== "undefined" ? TEMALAR.length : 0) + ')</div>';
      h += '<div class="yonSatir"><label class="yonAlan"><span>Tema seç</span><select onchange="yonTemaSec(this.value)">';
      if (typeof TEMALAR !== "undefined") TEMALAR.forEach(function (t) {
        h += '<option value="' + t.id + '"' + (DURUM.tema === t.id ? " selected" : "") + ">" + esc(t.ad) + "</option>";
      });
      h += '</select></label></div>';

      h += '<div class="yonBaslikK">🔤 YAZI TİPİ (' + (typeof YAZILAR !== "undefined" ? YAZILAR.length : 0) + ')</div>';
      h += '<div class="yonSatir"><label class="yonAlan"><span>Yazı tipi seç</span><select onchange="yonYaziSec(this.value)">';
      if (typeof YAZILAR !== "undefined") YAZILAR.forEach(function (z) {
        h += '<option value="' + z.id + '"' + (DURUM.yazi === z.id ? " selected" : "") + ">" + esc(z.ad) + "</option>";
      });
      h += '</select></label></div>';

      h += '<div class="yonBaslikK">🎨 KATEGORİ RENKLERİ</div>' +
        '<div class="yonBilgi">Her kategorinin kendi kimlik rengi vardır; buradan değiştirebilirsin. Hangi kategoride olduğunu renkten anlarsın.</div>' +
        '<div class="yonListe">';
      if (typeof MENU !== "undefined") MENU.forEach(function (m) {
        var su = uskAl("usk-kat-renk") ? JSON.parse(uskAl("usk-kat-renk")) : {};
        var renk = su[m.id] || uskKatRenkHesap(m);
        h += '<div class="yonOge"><span class="yonOgeAd">' + m.simge + " " + esc(m.ad) + '</span>' +
          '<input type="color" value="' + renk + '" onchange="yonKatRenk(\'' + m.id + '\', this.value)" title="Renk seç" class="yonRenkGirdi">' +
          '<span class="yonKucukNot">' + esc(renk) + "</span>" +
          '<button class="yonKucuk" title="Bu kategoriyi eski rengine döndür" onclick="yonKatRenkSifirla(\'' + m.id + '\')">↩️</button></div>';
      });
      h += "</div>" +
        '<div class="yonDugmeler"><button class="yonDugme" onclick="yonTumKatRenkSifirla()">↩️ Bütün kategori renklerini sıfırla</button>' +
        '<button class="yonDugme" onclick="yonKatRenkSerpistir()">🌈 Uyumlu renkleri otomatik dağıt</button></div>';

      h += '<div class="yonBaslikK">🛠 YÖNETİM PANELİNİN RENGİ</div>' +
        '<div class="yonBilgi">Panelin kendi rengi (sekmeler ve ana düğmeler). Kategorilerden bağımsızdır.</div>' +
        '<div class="yonDugmeler">';
      PANEL_RENKLER.forEach(function (r) {
        h += '<button class="yonRenkNokta" style="background:' + r + '" onclick="yonPanelRenk(\'' + r + '\')" title="' + r + '"></button>';
      });
      h += '<input type="color" value="' + (uskAl("usk-panel-renk") || "#c9a227") + '" onchange="yonPanelRenk(this.value)" class="yonRenkGirdi" title="Özel renk">' +
        '<button class="yonDugme" onclick="yonPanelRenk(\'\')">↩️ Varsayılan</button></div>';

      h += '<div class="yonBaslikK">⌨️ KISAYOLLAR</div>' +
        '<div class="yonListe">' +
        KISAYOLLAR.map(function (k) {
          return '<div class="yonOge"><span class="yonOgeAd">' + k.ad + '</span><span class="yonEtiket">' + k.tus + "</span></div>";
        }).join("") +
        "</div>";
    }

    if (SEKME === "uyeler") {
      if (YETKI_ID) {
        h += uyeYetkiEkrani();
      } else {
      var UL = window.uyeleriAl ? window.uyeleriAl() : [];
      var on = UL.filter(function (x) { return x.durum === "onayli"; }).length;
      var bk = UL.filter(function (x) { return x.durum === "beklemede"; }).length;
      var rd = UL.filter(function (x) { return x.durum === "red"; }).length;
      var ys = UL.filter(function (x) { return x.durum === "yasakli"; }).length;
      var istek = UL.filter(function (x) { return x.sifirla; }).length;
      h += '<div class="yonSayac"><b>' + UL.length + '</b> kayıtlı üye · <b>' + on + '</b> onaylı · <b>' + bk + '</b> onay bekliyor · <b>' + rd + '</b> onaylanmadı' +
        (ys ? " · <b>" + ys + "</b> yasaklı" : "") + (istek ? " · <b>" + istek + "</b> şifre sıfırlama isteği" : "") + "</div>";
      if (bk) h += '<div class="yonBilgi">⏳ <b>' + bk + ' kişi onayını bekliyor.</b> Onayladığın an o kişi kullanıcı adı ve şifresiyle giriş yapabilir, yorum yazabilir.</div>';
      var A = uyeAyar();
      h += '<div class="yonBilgi"><b>Üyelik ayarları:</b><div class="yonDugmeler" style="margin-top:6px">' +
        '<button class="yonKucuk" onclick="uyeAyarDegistir(\'kayitAcik\')">' + (A.kayitAcik ? "✅ Yeni kayıt açık" : "⛔ Yeni kayıt kapalı") + "</button>" +
        '<button class="yonKucuk" onclick="uyeAyarDegistir(\'yorumOnay\')">' + (A.yorumOnay ? "✅ Yorum onaydan sonra yayımlanır" : "⚡ Yorumlar hemen yayımlanır") + "</button></div></div>";
      h += '<div class="yonDugmeler"><button class="yonDugme ana" onclick="yonKapat(); git(\'uyepano\')">👑 ÜSTAD YÖNETİM Sayfası (tablo + yüzler)</button>' +
        '<button class="yonDugme" onclick="yonUyeEpostaKopyala()">📋 Onaylı üyelerin e-postalarını kopyala</button>' +
        '<button class="yonDugme" onclick="yonCSV(\'uyeler\')">📄 Excel/CSV indir</button>' +
        '<button class="yonDugme" onclick="yonWord(\'uyeler\')">📝 Word indir</button></div>';
      h += '<div class="yonSatir"><label class="yonAlan"><span>Üye ara (kullanıcı adı veya e-posta)</span><input id="uy_ara" oninput="uyeAra(this.value)" placeholder="yazınca liste süzülür..."></label></div>';
      h += '<div class="yonListe" id="uy_liste">';
      if (!UL.length) h += '<div class="yonBos">Henüz üye kaydı yok. Sitedeki "ÜYE OL" penceresinden kayıt olanlar buraya düşer ve onayını bekler.</div>';
      var sirali = UL.slice().sort(function (a, b) {
        var s = { "beklemede": 0, "onayli": 1, "red": 2, "yasakli": 3 };
        return (s[a.durum] === undefined ? 9 : s[a.durum]) - (s[b.durum] === undefined ? 9 : s[b.durum]);
      });
      sirali.forEach(function (u) {
        var renk = u.durum === "onayli" ? "iyi" : (u.durum === "beklemede" ? "bek" : "kotu");
        h += '<div class="yonOge uyeSatirUye" data-ara="' + esc((u.kadi + " " + u.eposta + " " + (u.adSoyad || "")).toLowerCase()) + '">' +
          '<span class="yonOgeAd">👤 ' + esc(u.kadi) + (u.rol === "editor" ? " ✏️" : "") + "</span>" +
          '<span class="yonEtiket">' + esc(u.eposta) + "</span>" +
          '<span class="yonEtiket ' + renk + '">' + uyeDurumEtiket(u.durum) + "</span>" +
          '<span class="yonEtiket">' + (uyeGorListesi(u) ? ("🔐 " + uyeGorListesi(u).length + " bölüm") : "🔐 tüm bölümler") + "</span>" +
          '<span class="yonKucukNot">kayıt: ' + esc(u.tarih) + (u.sonGiris ? " · son giriş: " + esc(u.sonGiris) : " · hiç girmemiş") +
          (u.sifirla ? ' · <b>🔑 şifre sıfırlama isteği (' + esc(u.sifirla) + ")</b>" : "") + '</span>' +
          '<button class="yonKucuk" title="Onayla" onclick="yonUyeDurum(\'' + u.id + '\',\'onayli\')">✅</button>' +
          '<button class="yonKucuk" title="Onaylama" onclick="yonUyeDurum(\'' + u.id + '\',\'red\')">⛔</button>' +
          '<button class="yonKucuk" title="Beklemeye al" onclick="yonUyeDurum(\'' + u.id + '\',\'beklemede\')">⏳</button>' +
          '<button class="yonKucuk" title="Yasakla" onclick="yonUyeDurum(\'' + u.id + '\',\'yasakli\')">🚫</button>' +
          '<button class="yonKucuk" title="Geçici şifre üret" onclick="yonUyeGeciciSifre(\'' + u.id + '\')">🔑</button>' +
          '<button class="yonKucuk" title="Hangi bölümleri görebilsin" onclick="uyeYetkiAc(\'' + u.id + '\')">🔐</button>' +
          '<button class="yonKucuk" title="E-posta yaz" onclick="yonUyeMail(\'' + u.id + '\')">📧</button>' +
          (u.tel ? '<button class="yonKucuk" title="WhatsApp" onclick="yonUyeWA(\'' + u.id + '\')">💬</button>' : "") +
          '<button class="yonKucuk" title="Sil" onclick="yonUyeSil(\'' + u.id + '\')">🗑️</button></div>';
      });
      h += "</div>";
      h += '<div class="yonBilgi"><b>🔐 Görünürlük yetkileri:</b> Her üyenin satırındaki <b>🔐</b> düğmesine bas; o üyenin <b>hangi bölümleri görebileceğini</b> işaretle. Kapalı bölümler o üyenin menüsünde hiç görünmez.</div>' +
        '<div class="yonBilgi"><b>Nasıl çalışıyor?</b> Üye kaydı bu bilgisayarın tarayıcı deposunda tutulur; <b>💾 Yedek &amp; Dosya</b> sekmesindeki "veri.js dosyasına yaz" ile kalıcı hâle gelir ve yedekle birlikte taşınır. ' +
        "Onayladığın üyeler sitede giriş yapıp yorum yazabilir; kategoriye yazı eklemek yalnızca sana aittir. Şifreler düz metin saklanmaz (rastgele tuz + 5000 turlu SHA-256).</div>";
    }

    }

    if (SEKME === "kayit") {
      var olan = YON.kayitlar.filter(function (r) { return r.durum === "Kayıt oldu"; }).length;
      h += '<div class="yonSayac"><b>' + YON.kayitlar.length + "</b> kişi kayıtlı · <b>" + olan + "</b> kayıt oldu · <b>" + (YON.kayitlar.length - olan) + "</b> olmadı/bekliyor</div>";
      h += '<div class="yonForm yonIzgara">' +
        '<label class="yonAlan"><span>Ad Soyad</span><input id="k_ad" placeholder="Ad Soyad"></label>' +
        '<label class="yonAlan"><span>Telefon</span><input id="k_tel" placeholder="05xx xxx xx xx"></label>' +
        '<label class="yonAlan"><span>Tarih</span><input id="k_tarih" value="' + bugun() + '"></label>' +
        '<label class="yonAlan"><span>Durum</span><select id="k_durum"><option>Kayıt oldu</option><option>Kayıt olmadı</option><option>Bekliyor</option></select></label>' +
        '<label class="yonAlan genis"><span>Not</span><input id="k_not" placeholder="Not (isteğe bağlı)"></label>' +
        "</div>";
      h += '<div class="yonDugmeler"><button class="yonDugme ana" onclick="yonKayitEkle()">💾 KAYIT ET (kişi)</button>' +
        '<button class="yonDugme" onclick="yonCSV(\'kayit\')">📄 Excel/CSV indir</button>' +
        '<button class="yonDugme" onclick="yonWord(\'kayit\')">📝 Word indir</button></div>';
      h += '<div class="yonListe">';
      if (!YON.kayitlar.length) h += '<div class="yonBos">Henüz kimse kayıtlı değil. Sitedeki "ÜYE OL" formundan gelenler de buraya düşer.</div>';
      YON.kayitlar.forEach(function (r, i) {
        var renk = r.durum === "Kayıt oldu" ? "iyi" : (r.durum === "Kayıt olmadı" ? "kotu" : "bek");
        h += '<div class="yonOge"><span class="yonOgeAd">' + esc(r.ad) + " · " + esc(r.tel || "-") + '</span>' +
          '<span class="yonEtiket ' + renk + '">' + esc(r.durum) + " · " + esc(r.tarih || "-") + "</span>" +
          '<span class="yonKucukNot">' + esc(r.not || "") + "</span>" +
          '<button class="yonKucuk" onclick="yonDurum(' + i + ')">🔄</button>' +
          '<button class="yonKucuk" onclick="yonKayitSil(' + i + ')">🗑️</button></div>';
      });
      h += "</div>";
    }

    if (SEKME === "yayin") {
      var yayinda = YON.yayinlar.filter(function (r) { return r.durum === "Yayınlandı"; }).length;
      h += '<div class="yonSayac"><b>' + YON.yayinlar.length + "</b> kayıt · <b>" + yayinda + "</b> yayınlandı · <b>" + (YON.yayinlar.length - yayinda) + "</b> bekliyor</div>";
      h += '<div class="yonForm yonIzgara">' +
        '<label class="yonAlan"><span>Eser / içerik adı</span><input id="y_eser" placeholder="Örn. Ahlaksız Toplumlar"></label>' +
        '<label class="yonAlan"><span>Tür</span><input id="y_tur" placeholder="Kitap / Şiir / Makale / Video"></label>' +
        '<label class="yonAlan"><span>Yayın yeri (platform)</span><input id="y_yer" placeholder="YouTube, Instagram, Blog, Gazete..."></label>' +
        '<label class="yonAlan"><span>Tarih</span><input id="y_tarih" value="' + bugun() + '"></label>' +
        '<label class="yonAlan"><span>Bağlantı</span><input id="y_link" placeholder="https://..."></label>' +
        '<label class="yonAlan"><span>Durum</span><select id="y_durum"><option>Yayınlandı</option><option>Hazırlanıyor</option><option>Bekliyor</option></select></label>' +
        "</div>";
      h += '<div class="yonDugmeler"><button class="yonDugme ana" onclick="yonYayinEkle()">💾 KAYIT ET (yayın kaydı)</button>' +
        '<button class="yonDugme" onclick="yonCSV(\'yayin\')">📄 Excel/CSV indir</button>' +
        '<button class="yonDugme" onclick="yonWord(\'yayin\')">📝 Word indir</button></div>';
      h += '<div class="yonListe">';
      if (!YON.yayinlar.length) h += '<div class="yonBos">Henüz yayın kaydı yok. Neyi nerede yayınladığını buraya işle; hepsi listelenir.</div>';
      YON.yayinlar.forEach(function (r, i) {
        h += '<div class="yonOge"><span class="yonOgeAd">' + esc(r.eser) + "</span>" +
          '<span class="yonEtiket">' + esc(r.yer || "-") + " · " + esc(r.tur || "-") + " · " + esc(r.tarih || "-") + "</span>" +
          (r.link ? '<a class="yonKucuk" href="' + esc(r.link) + '" target="_blank" rel="noopener">↗</a>' : "") +
          '<span class="yonEtiket ' + (r.durum === "Yayınlandı" ? "iyi" : "bek") + '">' + esc(r.durum) + "</span>" +
          '<button class="yonKucuk" onclick="yonYayinDurum(' + i + ')">🔄</button>' +
          '<button class="yonKucuk" onclick="yonYayinSil(' + i + ')">🗑️</button></div>';
      });
      h += "</div>";
    }

    if (SEKME === "dosya") {
      h += '<div class="yonBilgi"><b>Kayıt nerede tutuluyor?</b><br>1) Bu bilgisayarın tarayıcı deposunda (anında kayıt) — siteyi açtığında eklediklerin hazır gelir.<br>' +
        "2) İstersen doğrudan <b>veri.js</b> dosyasına da yazar; o zaman başka bilgisayarda/telefonda da görünür.<br>" +
        "3) Yedek dosyası (JSON) ile her yere taşıyabilirsin.</div>";
      h += '<div class="yonDugmeler">' +
        '<button class="yonDugme ana" onclick="yonDosyaSec()">⚡ veri.js Dosyasına Yazmayı Aç</button>' +
        '<button class="yonDugme" onclick="yonDosyayaYaz()">💾 Şimdi veri.js\'e Yaz</button>' +
        '<button class="yonDugme" onclick="yonVeriJsIndir()">📄 veri.js olarak indir</button>' +
        '<button class="yonDugme" onclick="yonYedek()">⬇️ Yedek al (JSON)</button>' +
        '<button class="yonDugme" onclick="el(\'yonYukleDosya\').click()">⬆️ Yedek yükle</button>' +
        '<button class="yonDugme kirmizi" onclick="yonSifirla()">🧹 Panel eklerini sıfırla</button>' +
        "</div>";
      h += '<label class="yonAlan"><span>Panel şifresi (PIN) — şu an: ' + esc(YON.pin) + "</span>" +
        '<input id="p_yeni" placeholder="Yeni PIN (4-8 hane)"><button class="yonDugme" onclick="yonPin()">PIN\'i Değiştir</button></label>';
      h += '<input type="file" id="yonYukleDosya" accept=".json" style="display:none" onchange="yonYukle(this.files[0])">';
      h += '<div class="yonSayac">Paneldeki kayıt sayısı: ' + (YON.eklenen.siirler.length + YON.eklenen.makaleler.length + YON.eklenen.mektuplar.length + YON.eklenen.eserler.length + YON.eklenen.kitaplar.length + YON.eklenen.sosyal.length + YON.eklenen.kanallar.length + YON.eklenen.belgeler.length + YON.eklenen.mesleki.length + YON.eklenen.ai.length) + " · Kayıt defteri: " + YON.kayitlar.length + " · Yayın kaydı: " + YON.yayinlar.length + "</div>";
    }
    el("yonGovde").innerHTML = h;
  }

  function panelCiz() {
    el("yonKutu").innerHTML =
      '<div class="yonBas"><span>🛠 ÜSTAD YÖNETİM PANELİ</span>' +
        '<span class="gunMiniKap"><button class="miniBtn gunMini" onclick="gunAc()">📖 Günün Âyeti</button>' +
        '<button class="yonKapat" onclick="yonKapat()">✕</button></span></div>' +
      '<div class="yonKimlik"><b>' + (typeof KISI !== "undefined" ? esc(KISI.ad) : "Kenan Kuzucu") + '</b>' +
      '<span>' + (typeof KISI !== "undefined" ? esc(KISI.unvan + " · " + KISI.altUnvan) : "") + '</span></div>' +
      '<div class="yonGun" id="yonGun" onclick="gunAc()"></div>' +
      '<div id="yonGovde"></div><div id="yonUyari" class="yonUyari"></div>';
    sekmeCiz();
    yonGun();
  }

  function yonGun() {
    var k = el("yonGun"); if (!k) return;
    if (typeof gunSoz !== "function") { k.style.display = "none"; return; }
    var s = gunSoz(); if (!s) { k.style.display = "none"; return; }
    k.style.display = "";
    k.innerHTML = "<b>" + esc(gunBaslik(s)) + "</b><span>" + esc(gunKisa(s.tr, 150)) + "</span><i>" + esc(s.k) + "</i>";
  }

  function yenile() { kat(); if (typeof menuCiz === "function") menuCiz(); if (typeof git === "function") git(document.body.getAttribute("data-bolum") || "radyo"); }

  function alanDegerleri() {
    var o = {}, a = katAlanlari(aktifKategori());
    for (var i = 0; i < a.length; i++) {
      var e = el("f_" + a[i].k);
      if (!e) continue;
      var v = e.value.trim();
      if (a[i].t === "cok") o[a[i].k] = paragraflar(v);
      else if (a[i].t === "sayi") o[a[i].k] = parseInt(v, 10) || 0;
      else o[a[i].k] = v;
    }
    return o;
  }


  window.bolumBul = bolumBul;
  window.ozelMi = ozelMi;
  window.katListesi = katListesi;
  window.yonVeri = function () { return YON; };
  window.kGit = function (id) { if (typeof git === "function") { git(id); window.yonKapat(); } };
  window.kYeni = function () {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var ad = (el("ky_ad").value || "").trim().toUpperCase();
    if (!ad) { uyari("Kategori adını yaz."); return; }
    var simge = (el("ky_simge").value || "🧭").trim() || "🧭";
    var renk = (el("ky_renk").value || "#e8a33d");
    var aciklama = (el("ky_aciklama").value || "").trim();
    var n = 1;
    while ((YON.bolumler || []).some(function (b) { return b.id === "ozel" + n; })) n++;
    YON.bolumler.push({ id: "ozel" + n, ad: ad, simge: simge, renk: renk, not: "", aciklama: aciklama });
    if (!YON.icerikOzel["ozel" + n]) YON.icerikOzel["ozel" + n] = [];
    YON.sira = [];
    kaydet(); yenile(); sekmeCiz();
    uyari("✔ Yeni kategori açıldı: " + simge + " " + ad);
  };
  window.kKaydet = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var g_simge = (el("kb_simge_" + id) || {}).value, g_ad = (el("kb_ad_" + id) || {}).value,
      g_not = (el("kb_not_" + id) || {}).value, g_renk = (el("kb_renk_" + id) || {}).value;
    if (g_ad) g_ad = g_ad.trim();
    var ozel = ozelMi(id);
    if (!YON.duzenle[id]) YON.duzenle[id] = {};
    if (g_ad) YON.duzenle[id].ad = g_ad;
    if (g_simge) YON.duzenle[id].simge = g_simge.trim();
    if (g_not != null && OTO_NOT.indexOf(id) < 0) YON.duzenle[id].not = g_not.trim();
    if (g_renk) YON.duzenle[id].renk = g_renk;
    if (ozel) {
      var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0];
      if (b) { if (g_ad) b.ad = g_ad; if (g_simge) b.simge = g_simge.trim(); if (g_not != null) b.not = g_not.trim(); if (g_renk) b.renk = g_renk; }
    }
    kaydet(); yenile(); sekmeCiz();
    uyari("✔ Kategori güncellendi.");
  };
  window.kKaydetHepsi = function () {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var n = 0;
    (typeof MENU !== "undefined" ? MENU : []).forEach(function (m) {
      var a = el("kb_ad_" + m.id), si = el("kb_simge_" + m.id), no = el("kb_not_" + m.id), re = el("kb_renk_" + m.id);
      if (!a && !si && !no && !re) return;
      if (!YON.duzenle[m.id]) YON.duzenle[m.id] = {};
      if (a && a.value.trim()) YON.duzenle[m.id].ad = a.value.trim();
      if (si && si.value.trim()) YON.duzenle[m.id].simge = si.value.trim();
      if (no && OTO_NOT.indexOf(m.id) < 0) YON.duzenle[m.id].not = no.value.trim();
      if (re && re.value) YON.duzenle[m.id].renk = re.value;
      if (ozelMi(m.id)) {
        var b = (YON.bolumler || []).filter(function (x) { return x.id === m.id; })[0];
        if (b) {
          if (a && a.value.trim()) b.ad = a.value.trim();
          if (si && si.value.trim()) b.simge = si.value.trim();
          if (no && OTO_NOT.indexOf(m.id) < 0) b.not = no.value.trim();
          if (re && re.value) b.renk = re.value;
        }
      }
      n++;
    });
    kaydet(); yenile(); sekmeCiz();
    uyari("✔ " + n + " kategorinin bütün değişiklikleri kaydedildi.");
  };
  window.kRenk = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var re = el("kb_renk_" + id);
    if (!re) return;
    if (!YON.duzenle[id]) YON.duzenle[id] = {};
    YON.duzenle[id].renk = re.value;
    if (ozelMi(id)) {
      var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0];
      if (b) b.renk = re.value;
    }
    kaydet(); yenile();
    renkUygula(document.body.getAttribute("data-bolum") || "");
    uyari("🎨 Renk kaydedildi: " + re.value);
  };
  window.kYukari = function (id) { yerDegistir(id, -1); };
  window.kAsagi = function (id) { yerDegistir(id, 1); };
  function yerDegistir(id, yon) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var i = -1;
    for (var k = 0; k < MENU.length; k++) if (MENU[k].id === id) i = k;
    var j = i + yon;
    if (i < 0 || j < 0 || j >= MENU.length) return;
    var t = MENU[i]; MENU[i] = MENU[j]; MENU[j] = t;
    sirayiKaydet(); kaydet(); menuCiz(); sekmeCiz();
  }
  window.kGizle = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var g = YON.gizliBolum, i = g.indexOf(id);
    if (i > -1) { g.splice(i, 1); uyari("Kategori yeniden göründü."); } else { g.push(id); uyari("Kategori gizlendi."); }
    kaydet(); yenile(); sekmeCiz();
  };
  window.kGeriGetir = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var t = temelAl().filter(function (x) { return x.id === id; })[0];
    YON.gizliBolum = (YON.gizliBolum || []).filter(function (x) { return x !== id; });
    if (t && !ozelMi(id)) {
      delete YON.duzenle[id];
      var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0];
      if (b) YON.bolumler = (YON.bolumler || []).filter(function (x) { return x.id !== id; });
    }
    if (ozelMi(id)) delete YON.duzenle[id];
    kaydet(); yenile(); sekmeCiz();
    uyari("👁️ Geri getirildi: " + (t ? t.ad : id) + " — ilk adı, simgesi ve rengiyle menüde.");
  };
  window.kIzinli = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    if (!YON.duzenle[id]) YON.duzenle[id] = {};
    YON.duzenle[id].izinli = !bolumIzinli(id);
    if (YON.duzenle[id].izinli) { YON.duzenle[id].sahip = false; }
    kaydet(); yenile();
    if (window.uyeGorunumTazele) { try { window.uyeGorunumTazele(); } catch (e) { } }
    sekmeCiz();
    uyari(YON.duzenle[id].izinli
      ? "🔐 Bu kategori artık yalnızca SANA ve izin verdiğin üyelere görünür (ziyaretçi ve izinsiz üye göremez)."
      : "👁️ Bu kategori herkese açık hâle geldi.");
  };
  window.kGoster = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    YON.gizliBolum = (YON.gizliBolum || []).filter(function (x) { return x !== id; });
    kaydet(); yenile(); sekmeCiz();
    uyari("👁️ Kategori menüye geri geldi.");
  };
  window.kHepsiniGoster = function () {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    var n = (YON.gizliBolum || []).length;
    YON.gizliBolum = [];
    kaydet(); yenile(); sekmeCiz();
    uyari("👁️ " + n + " gizli kategori geri getirildi.");
  };
  window.kSil = function (id) {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    if (!window.__kSilOnay) { window.__kSilOnay = id; uyari("Kategori ve içindeki yazılar silinecek. Onay için 🗑️ düğmesine tekrar bas."); return; }
    if (window.__kSilOnay !== id) { window.__kSilOnay = id; uyari("Onay için 🗑️ düğmesine tekrar bas."); return; }
    window.__kSilOnay = false;
    YON.bolumler = (YON.bolumler || []).filter(function (b) { return b.id !== id; });
    delete YON.icerikOzel[id];
    delete YON.duzenle[id];
    YON.sira = [];
    kaydet(); yenile();
    if (typeof git === "function") git("radyo");
    sekmeCiz();
    uyari("Kategori silindi.");
  };
  window.kSifirla = function () {
    if (!yetkiliMi()) { uyari("Bu işlem site sahibinin yetkisindedir."); return; }
    if (!window.__kSifirlaOnay) { window.__kSifirlaOnay = true; uyari("Bütün kategori değişiklikleri geri alınacak. Onay için tekrar bas."); return; }
    window.__kSifirlaOnay = false;
    YON.duzenle = {}; YON.gizliBolum = []; YON.sira = [];
    kaydet(); yenile(); sekmeCiz();
    uyari("Kategoriler eski adına/sırasına döndü (kendi açtığın kategoriler ve yazıların korundu).");
  };

  /* ---------- 4) DIŞA AÇIK İŞLEMLER ---------- */
  window.yonSekme = function (s) { SEKME = s; sekmeCiz(); };
  window.yonKategoriSec = function () {
    var v = el("f_kategori").value;
    window.__yonKat = v; SEKME = "icerik";
    sekmeCiz();
  };
  window.yonEkle = function () {
    if (!yetkiliMi()) { uyari("Kategoriye yazı eklemek yalnızca site sahibinin yetkisindedir. Yorum yazabilirsin."); return; }
    var kat_ = aktifKategori();
    var o = alanDegerleri();
    if (!o.ad) { uyari("Ad/başlık alanı boş olamaz."); return; }
    if (kat_ === "kanallar") {
      if (!o.url) { uyari("Yayın adresi gerekli."); return; }
      YON.eklenen.kanallar.push([o.ad, o.url, radioGrupNo(o.grup)]);
    } else if (kat_ === "belgeler") {
      if (!o.sayi) { uyari("Belge sayısını yaz."); return; }
      YON.eklenen.belgeler.push({ ad: o.ad, sayi: o.sayi, kategori: o.kategori || "akademi" });
    } else if (kat_ === "mesleki" || kat_ === "ai") {
      YON.eklenen[kat_].push(o.ad);
    } else if (kat_ === "sosyal") {
      YON.eklenen.sosyal.push({ ad: o.ad, hesap: o.hesap || "", url: o.url || "", ikon: o.ikon || IKONLAR[0], not: o.not || "" });
    } else if (kat_ === "siirler") {
      YON.eklenen.siirler.push({ ad: o.ad, tur: "KENAN KUZUCU", dize: o.dize });
    } else if (kat_ === "makaleler") {
      YON.eklenen.makaleler.push({ ad: o.ad, tur: "KENAN KUZUCU", ozet: o.ozet || "", paragraf: o.paragraf });
    } else if (kat_ === "kitaplar") {
      YON.eklenen.kitaplar.push({ ad: o.ad, yazar: o.yazar || "", tur: o.tur || "", not: o.not || "", tarih: o.tarih || "", ozet: o.ozet || [] });
    } else if (kat_ === "mektuplar") {
      YON.eklenen.mektuplar.push({ ad: o.ad, tur: "KENAN KUZUCU", tarih: o.tarih || bugun(), paragraf: o.paragraf });
    } else if (kat_ === "eserler") {
      YON.eklenen.eserler.push({
        ad: o.ad, durum: o.durum || "✅ Yayında", tur: o.tur || "Kitap",
        yil: o.yil || "", sayfa: o.sayfa || "", kapak: o.kapak || "",
        not: o.not || "", aciklama: o.aciklama || [], onsuz: o.onsuz || [], link: o.link || ""
      });
    } else if (ozelMi(kat_)) {
      if (!YON.icerikOzel[kat_]) YON.icerikOzel[kat_] = [];
      YON.icerikOzel[kat_].push({ ad: o.ad, paragraf: o.paragraf || [], link: o.link || "" });
    }
    kaydet(); yenile(); sekmeCiz();
    uyari("✔ Kaydedildi ve yayına alındı: " + o.ad);
  };
  window.yonTemizle = function () { sekmeCiz(); };
  window.yonKatSec = function (id) {
    window.__yonKat = id;
    var sec = el("f_kategori"); if (sec) sec.value = id;
    sekmeCiz();
    uyari("Seçili bölüm: " + katAd(id) + " — form aşağıda.");
  };
  window.yonSuz = function (metin) {
    metin = String(metin || "").toLocaleLowerCase("tr");
    [].slice.call(document.querySelectorAll("#yonGovde .yonOge")).forEach(function (o) {
      o.style.display = (!metin || o.textContent.toLocaleLowerCase("tr").indexOf(metin) > -1) ? "" : "none";
    });
  };
  window.yonSil = function (i) {
    var kat_ = aktifKategori();
    var it = icerikListesi()[i];
    if (!it || !it.yerli) return;
    if (ozelMi(kat_)) {
      (YON.icerikOzel[kat_] || []).splice(i, 1);
      kaydet(); yenile(); sekmeCiz(); uyari("Silindi: " + it.ad);
      return;
    }
    YON.eklenen[kat_] = YON.eklenen[kat_].filter(function (y) { return (y.ad || y[0]) !== it.ad; });
    kaydet(); yenile(); sekmeCiz();
    uyari("Silindi: " + it.ad);
  };
  window.yonGizle = function (i) {
    var kat_ = aktifKategori(), map = { siirler: "siirler", makaleler: "makaleler", mektuplar: "mektuplar", eserler: "eserler", kitaplar: "kitaplar", sosyal: "sosyal", kanallar: "kanallar" };
    if (!map[kat_]) return;
    var it = icerikListesi()[i]; if (!it) return;
    var g = YON.gizli[kat_];
    var y = g.indexOf(it.ad);
    if (y > -1) g.splice(y, 1); else g.push(it.ad);
    kaydet(); yenile(); sekmeCiz();
    uyari((y > -1 ? "Yeniden göründü: " : "Gizlendi: ") + it.ad);
  };
  window.yonKayitEkle = function () {
    if (!yetkiliMi()) { uyari("Kayıt defteri yalnızca site sahibine açıktır."); return; }
    var ad = (el("k_ad").value || "").trim();
    if (!ad) { uyari("Ad Soyad gerekli."); return; }
    YON.kayitlar.push({ ad: ad, tel: (el("k_tel").value || "").trim(), tarih: el("k_tarih").value, durum: el("k_durum").value, not: (el("k_not").value || "").trim() });
    kaydet(); sekmeCiz(); uyari("✔ Kayıt defterine eklendi: " + ad);
  };
  window.yonDurum = function (i) {
    var sira = ["Kayıt oldu", "Kayıt olmadı", "Bekliyor"];
    var r = YON.kayitlar[i]; r.durum = sira[(sira.indexOf(r.durum) + 1) % 3];
    kaydet(); sekmeCiz();
  };
  window.yonKayitSil = function (i) { YON.kayitlar.splice(i, 1); kaydet(); sekmeCiz(); };
  window.yonYayinEkle = function () {
    if (!yetkiliMi()) { uyari("Yayın kaydı yalnızca site sahibine açıktır."); return; }
    var e = (el("y_eser").value || "").trim();
    if (!e) { uyari("Eser/içerik adı gerekli."); return; }
    YON.yayinlar.push({ eser: e, tur: (el("y_tur").value || "").trim(), yer: (el("y_yer").value || "").trim(), tarih: el("y_tarih").value, link: (el("y_link").value || "").trim(), durum: el("y_durum").value });
    kaydet(); sekmeCiz(); uyari("✔ Yayın kaydı eklendi: " + e);
  };
  window.yonYayinDurum = function (i) {
    var sira = ["Yayınlandı", "Hazırlanıyor", "Bekliyor"];
    var r = YON.yayinlar[i]; r.durum = sira[(sira.indexOf(r.durum) + 1) % 3];
    kaydet(); sekmeCiz();
  };
  window.yonYayinSil = function (i) { YON.yayinlar.splice(i, 1); kaydet(); sekmeCiz(); };

  function tabloMetni(tur) {
    var satir = [];
    if (tur === "kayit") {
      satir.push("Ad Soyad;Telefon;Tarih;Durum;Not");
      YON.kayitlar.forEach(function (r) { satir.push([r.ad, r.tel, r.tarih, r.durum, r.not].join(";")); });
    } else if (tur === "uyeler") {
      satir.push("Kullanıcı Adı;E-posta;Ad Soyad;Telefon;Kayıt Tarihi;Durum;Son Giriş;Not");
      window.uyeleriAl().forEach(function (u) { satir.push([u.kadi, u.eposta, u.adSoyad || "", u.tel || "", u.tarih, uyeDurumEtiket(u.durum), u.sonGiris || "", u.not || ""].join(";")); });
    } else if (tur === "yorum") {
      satir.push("Ad;Tarih;Bölüm;Yorum;Durum");
      YON.yorumlar.forEach(function (y) { satir.push([y.ad, y.tarih, y.bolum, String(y.metin).replace(/;/g, ","), y.durum].join(";")); });
    } else {
      satir.push("Eser/İçerik;Tür;Yayın Yeri;Tarih;Bağlantı;Durum");
      YON.yayinlar.forEach(function (r) { satir.push([r.eser, r.tur, r.yer, r.tarih, r.link, r.durum].join(";")); });
    }
    return satir.join("\n");
  }
  window.yonCSV = function (t) { indir((t === "kayit" ? "kayit-defteri" : t === "yorum" ? "yorumlar" : t === "uyeler" ? "uyeler" : "yayin-kaydi") + "-" + bugun().replace(/\./g, "-") + ".csv", "\ufeff" + tabloMetni(t), "text/csv;charset=utf-8"); };
  window.yonWord = function (t) {
    var bas = t === "kayit" ? "KAYIT DEFTERİ" : t === "yorum" ? "ZİYARETÇİ YORUMLARI" : "YAYIN KAYDI";
    var sat = tabloMetni(t).split("\n");
    var g = sat.shift().split(";");
    var h = "<html><head><meta charset='utf-8'></head><body style='font-family:Calibri'><h2 style='color:#1F6F5C'>ÜSTAD KENAN KUZUCU — " + bas + "</h2><p>" + bugun() + " tarihli liste</p><table border='1' cellpadding='6' style='border-collapse:collapse'><tr>" +
      g.map(function (x) { return "<th style='background:#1F6F5C;color:#fff'>" + x + "</th>"; }).join("") + "</tr>";
    sat.forEach(function (s) { h += "<tr>" + s.split(";").map(function (x) { return "<td>" + x + "</td>"; }).join("") + "</tr>"; });
    h += "</table></body></html>";
    indir((t === "kayit" ? "kayit-defteri" : t === "yorum" ? "yorumlar" : "yayin-kaydi") + "-" + bugun().replace(/\./g, "-") + ".doc", h, "application/msword");
  };
  window.yonYedek = yedekJSON;
  window.yonYukle = dosyadanYukle;
  window.yonDosyaSec = dosyaSec;
  window.yonDosyayaYaz = function () { if (!DOSYA.tutamac) { dosyaSec(); return; } dosyayaYaz(); };
  window.yonVeriJsIndir = function () {
    fetch("veri.js").then(function (r) { return r.text(); }).then(function (t) { indir("veri.js", veriJsMetni(t), "text/javascript"); })
      .catch(function () { indir("veri.js", veriJsMetni(""), "text/javascript"); });
  };
  window.yonSifirla = function () {
    if (!window.__yonSifirlaOnay) { window.__yonSifirlaOnay = true; uyari("Emin misin? Silmek için düğmeye bir kez daha bas."); return; }
    window.__yonSifirlaOnay = false;
    var p = YON.pin; YON = varsayilan(); YON.pin = p; kaydet(); yenile(); sekmeCiz();
    uyari("Panel temizlendi.");
  };
  window.yonPin = function () {
    var y = (el("p_yeni").value || "").trim();
    if (y.length < 4) { uyari("PIN en az 4 hane olmalı."); return; }
    YON.pin = y; kaydet(); sekmeCiz(); uyari("✔ PIN değişti.");
  };
  window.yonAc = function (sekme) {
    if (sekme) SEKME = sekme;
    var hatirla = false;
    try { hatirla = localStorage.getItem(HATIRLA) === "1"; } catch (e) { }
    if ((sessionStorage.getItem(ACMAK) === "1" || hatirla) && yetkiliMi()) { el("yonPerde").classList.add("gor"); panelCiz(); return; }
    el("yonPerde").classList.add("gor");
    el("yonPinKutu").innerHTML = '<div class="yonBas"><span>🔐 Yönetim Girişi</span><button class="yonKapat" onclick="yonPerdeKapat()">✕</button></div>' +
      '<div class="yonForm"><label class="yonAlan"><span>PIN (ilk şifre: 1981)</span><input id="p_giris" type="password" inputmode="numeric" placeholder="••••"></label>' +
      '<label class="yonAlan"><span><input type="checkbox" id="p_hatirla" style="width:auto;margin-right:6px">Bu bilgisayarda beni hatırla (giriş istemesin)</span></label></div>' +
      '<div class="yonBilgi">Bu bölüm <b>site sahibine</b> aittir. Misafirler yorum yazabilir, kategoriye yazı ekleyemez.</div>' +
      '<div class="yonDugmeler"><button class="yonDugme ana" onclick="yonGiris()">Giriş</button>' +
      '<button class="yonDugme" onclick="yonPerdeKapat()">Misafir olarak devam et</button></div><div id="yonUyari" class="yonUyari"></div>';
    setTimeout(function () { var g = el("p_giris"); if (g) g.focus(); }, 150);
  };
  window.yonGiris = function () {
    var v = (el("p_giris").value || "").trim();
    if (v !== YON.pin) { uyari("PIN yanlış."); return; }
    sessionStorage.setItem(ACMAK, "1");
    try {
      var h = el("p_hatirla");
      if (h && h.checked) localStorage.setItem(HATIRLA, "1"); else localStorage.removeItem(HATIRLA);
    } catch (e) { }
    rolKur("yetkili");
    el("yonPinKutu").innerHTML = ""; panelCiz();    try { if (typeof git === "function") git("uyepano"); } catch (e) { }
  
  };
  window.yonPerdeKapat = function () { el("yonPerde").classList.remove("gor"); };
  window.yonKapat = function () { el("yonPerde").classList.remove("gor"); el("yonKutu").innerHTML = ""; el("yonPinKutu").innerHTML = ""; };

  /* ---------- 5) ÜYELİK SİSTEMİ: KAYIT · GİRİŞ · YÖNETİM ONAYI ---------- */
  var UYELER_ANAHTAR = "usk-uyeler";        /* bütün üye kayıtları */
  var HATIRLA_ANAHTAR = "usk-uye-hatirla";  /* "beni hatırla" */
  var KILIT_ANAHTAR = "usk-uye-kilit";      /* 5 hatalı giriş → 60 sn kilit */
  var UYE_AYAR_ANAHTAR = "usk-uye-ayar";    /* kayıt açık mı, yorum onayı */
  var HASH_TUR = 5000;                      /* şifre özeti turu */
  var UYE_SEKME = "giris";
  var UYE_MESAJ = "";
  var UYE_MESAJ_TIP = "";

  function uyeSaat() { var d = new Date(); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function uKucuk(s) { return String(s == null ? "" : s).trim().toLowerCase(); }
  function uyeYeniId() { return "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* --- üye deposu: bu bilgisayarın tarayıcısında; panele "veri.js'ye yaz" ile kalıcılaşır --- */
  function uyeleriOku() {
    try { var t = localStorage.getItem(UYELER_ANAHTAR); var l = t ? JSON.parse(t) : []; return (l instanceof Array) ? l : []; }
    catch (e) { return []; }
  }
  function uyeleriYaz(l) {
    try { localStorage.setItem(UYELER_ANAHTAR, JSON.stringify(l)); } catch (e) { }
    if (typeof YON === "object" && YON) YON.uyeler = l;
    try { rozetGuncelle(); } catch (e) { }
  }
  window.uyeleriAl = uyeleriOku;
  window.uyeleriYaz = uyeleriYaz;
  window.uyeKayitlari = uyeleriOku;
  function uyeBul(kul) {
    var k = uKucuk(kul), l = uyeleriOku();
    for (var i = 0; i < l.length; i++) {
      if (uKucuk(l[i].kadi) === k || uKucuk(l[i].eposta) === k) return l[i];
    }
    return null;
  }
  function uyeIdIle(id) { var l = uyeleriOku(); for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i]; return null; }

  /* --- şifre güvenliği: rastgele tuz + 5000 turlu SHA-256. Düz metin şifre ASLA saklanmaz. --- */
  function sha256Hex(metin) {
    function rr(x, n) { return (x >>> n) | (x << (32 - n)); }
    function h8(x) { x = x >>> 0; var s = x.toString(16); while (s.length < 8) s = "0" + s; return s; }
    var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var b = [], i, c;
    for (i = 0; i < metin.length; i++) {
      c = metin.charCodeAt(i);
      if (c < 128) b.push(c);
      else if (c < 2048) { b.push(192 | (c >> 6), 128 | (c & 63)); }
      else { b.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63)); }
    }
    var uzun = b.length * 8;
    b.push(128);
    while (b.length % 64 !== 56) b.push(0);
    for (i = 7; i >= 0; i--) b.push(Math.floor(uzun / Math.pow(2, i * 8)) & 255);
    var w = new Array(64);
    for (var off = 0; off < b.length; off += 64) {
      for (i = 0; i < 16; i++) w[i] = (b[off + i * 4] << 24) | (b[off + i * 4 + 1] << 16) | (b[off + i * 4 + 2] << 8) | b[off + i * 4 + 3];
      for (i = 16; i < 64; i++) {
        var s0 = rr(w[i - 15], 7) ^ rr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        var s1 = rr(w[i - 2], 17) ^ rr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      var a = H[0], bb = H[1], cc = H[2], d = H[3], e = H[4], f = H[5], g = H[6], hh = H[7];
      for (i = 0; i < 64; i++) {
        var S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (hh + S1 + ch + K[i] + w[i]) | 0;
        var S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22);
        var mj = (a & bb) ^ (a & cc) ^ (bb & cc);
        var t2 = (S0 + mj) | 0;
        hh = g; g = f; f = e; e = (d + t1) | 0; d = cc; cc = bb; bb = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + cc) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + hh) | 0;
    }
    return h8(H[0]) + h8(H[1]) + h8(H[2]) + h8(H[3]) + h8(H[4]) + h8(H[5]) + h8(H[6]) + h8(H[7]);
  }
  function sifreOzet(sifre, tuz) {
    var v = tuz + "#" + sifre;
    for (var i = 0; i < HASH_TUR; i++) v = sha256Hex(v + "#" + i);
    return v;
  }
  function tuzUret() {
    var s = "", i, a;
    try {
      if (window.crypto && crypto.getRandomValues) {
        a = new Uint8Array(16); crypto.getRandomValues(a);
        for (i = 0; i < 16; i++) s += ("0" + a[i].toString(16)).slice(-2);
        return s;
      }
    } catch (e) { }
    var p = "0123456789abcdef";
    for (i = 0; i < 32; i++) s += p.charAt(Math.floor(Math.random() * 16));
    return s;
  }
  function sifreGuc(s) {
    var p = 0;
    if (s.length >= 6) p++;
    if (s.length >= 10) p++;
    if (/[0-9]/.test(s) && /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(s)) p++;
    if (/[^0-9A-Za-zÇĞİÖŞÜçğıöşü]/.test(s)) p++;
    if (s.length < 6) return { ad: "Zayıf", sinif: "zayif", ipucu: "en az 6 karakter olmalı" };
    if (p <= 1) return { ad: "Zayıf", sinif: "zayif", ipucu: "harf ve rakam karıştır, uzat" };
    if (p === 2) return { ad: "Orta", sinif: "orta", ipucu: "büyük harf ya da işaret ekle" };
    return { ad: "Güçlü", sinif: "guclu", ipucu: "bu şifre sağlam" };
  }

  /* --- ayarlar: kayıt açık mı, yorum onayı gerekiyor mu --- */
  function uyeAyar() {
    var v = { kayitAcik: true, yorumOnay: true, uyeYorum: true };
    try { var t = localStorage.getItem(UYE_AYAR_ANAHTAR); if (t) { var o = JSON.parse(t); for (var k in v) if (typeof o[k] === "boolean") v[k] = o[k]; } } catch (e) { }
    return v;
  }
  function uyeAyarYaz(v) { try { localStorage.setItem(UYE_AYAR_ANAHTAR, JSON.stringify(v)); } catch (e) { } }
  window.uyeAyar = uyeAyar;
  window.uyeAyarDegistir = function (k) {
    if (!yetkiliMi()) { uyari("Bu ayarı yalnızca site sahibi değiştirebilir."); return; }
    var v = uyeAyar(); v[k] = !v[k]; uyeAyarYaz(v); sekmeCiz();
    uyari("✔ Ayar güncellendi: " + k + " = " + (v[k] ? "açık" : "kapalı"));
  };

  /* --- oturum --- */
  function uye() {
    try {
      var t = localStorage.getItem(UYE_ANAHTAR); if (t) return JSON.parse(t);
      var s = sessionStorage.getItem(UYE_ANAHTAR); return s ? JSON.parse(s) : null;
    } catch (e) { return null; }
  }
  function uyeVar() { var u = uye(); return !!(u && (u.kadi || u.ad)); }
  function uyeOnayliMi() { var u = uye(); return !!(u && u.durum === "onayli"); }
  window.uyeOnayliMi = uyeOnayliMi;
  /* ================= ÜYE BAZLI GÖRÜNÜRLÜK (hangi üye hangi bölümleri görür) ================= */
  function uyeGorKaydi(id) {                       /* üye kaydını taze bul: yetki değişikliği anında etki etsin */
    try { var L = uyeleriOku(); for (var i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; } catch (e) { }
    return null;
  }
  function uyeGorListesi(u) {
    if (!u) return null;
    return (Object.prototype.toString.call(u.gor) === "[object Array]") ? u.gor : null;   /* null = kısıt yok */
  }
  /* Menü bölümlerini süzer. Site sahibi ve girişsiz ziyaretçi için hepsi açıktır. */
  window.uyeGorebilirMi = function (bolumId) {
    if (yetkiliMi()) return true;
    var o = uye();
    if (!o || o.durum !== "onayli") return true;
    var kayit = uyeGorKaydi(o.id) || o;
    var g = uyeGorListesi(kayit);
    if (!g) return true;
    return g.indexOf(bolumId) > -1;
  };
  /* ---- "Yalnız site sahibine görünsün" bayrağı ---- */
  function gorunurBolumSayisi() {
    var n = 0;
    if (typeof MENU === "undefined") return n;
    for (var i = 0; i < MENU.length; i++) { if (!bolumYalnizSahip(MENU[i].id)) n++; }
    return n;
  }
  window.gorunurBolumSayisi = gorunurBolumSayisi;
  function bolumYalnizSahip(id) {
    if (id === "uyepano") return true;                                   /* ÜSTAD YÖNETİM her zaman sahibe özel */
    var d = (YON.duzenle || {})[id] || {};
    var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0] || {};
    return !!(d.sahip || b.sahip);
  }
  window.bolumYalnizSahip = bolumYalnizSahip;
  /* ---- "Yalnız izin verdiğim üyeler görsün" bayrağı (örn. 🎮 OYUNLAR) ---- */
  function bolumIzinli(id) {
    var d = (YON.duzenle || {})[id] || {};
    var b = (YON.bolumler || []).filter(function (x) { return x.id === id; })[0] || {};
    return !!(d.izinli || b.izinli);
  }
  window.bolumIzinli = bolumIzinli;
  /* Menü/bölüm görünürlüğü: izinli-üye kuralı + "yalnız sahip" kuralı + üye kısıtı */
  window.bolumGorunur = function (id) {
    if (bolumIzinli(id) && !bolumYalnizSahip(id)) {
      if (yetkiliMi()) return true;                       /* site sahibi her zaman görür */
      var o = uye();
      if (!o || o.durum !== "onayli") return false;        /* ziyaretçi / onaysız üye göremez */
      return window.uyeGorebilirMi ? window.uyeGorebilirMi(id) : false;   /* yalnız izin verilen üye */
    }
    if (bolumYalnizSahip(id) && !yetkiliMi()) return false;
    if (window.uyeGorebilirMi && !window.uyeGorebilirMi(id)) return false;
    return true;
  };
  window.kSahip = function (id) {
    if (!yetkiliMi()) { uyari("Bu ayar yalnızca site sahibinindir."); return; }
    if (id === "uyepano") { uyari("👑 ÜSTAD YÖNETİM bölümü her zaman yalnızca sana görünür."); return; }
    if (!YON.duzenle[id]) YON.duzenle[id] = {};
    YON.duzenle[id].sahip = !bolumYalnizSahip(id);
    kaydet(); yenile(); sekmeCiz();
    uyari(YON.duzenle[id].sahip ? "🔒 Bu bölüm artık yalnızca sana görünür (üyeler ve ziyaretçiler göremez)." : "👁️ Bu bölüm yeniden herkese açık.");
  };

  /* Yetki/oturum değişince menüyü tazele; açık olan bölüm yasaklandıysa ilk uygun bölüme geç */
  /* ---- Üye görünürlük yetkileri ekranı (panel içinde, 👥 Üyeler sekmesi) ---- */
  function uyeYetkiKutulari() { return [].slice.call(document.querySelectorAll("[data-yk]")); }
  function yetkiIste(liste) {
    uyeYetkiKutulari().forEach(function (c) { c.checked = liste.indexOf(c.getAttribute("data-yk")) > -1; });
    uyari("İşaretleme yapıldı — kaydetmek için 💾 Yetkileri Kaydet.");
  }
  function uyeYetkiEkrani() {
    var u = uyeIdIle(YETKI_ID);
    if (!u) { YETKI_ID = null; return '<div class="yonBos">Üye bulunamadı.</div>'; }
    var g = uyeGorListesi(u);
    var h = '<div class="yonBaslikK">🔐 ' + esc(u.kadi) + ' — GÖRÜNÜRLÜK YETKİLERİ</div>';
    h += '<div class="yonBilgi"><b>Nasıl çalışır?</b> İşaretlediğin bölümler bu üyeye <b>görünür</b>; işaretlemediklerini üye ' +
      '<b>menüde hiç görmez</b> ve adresle de açamaz. “↩️ Tümünü aç (varsayılan)” dersen kısıt kalkar. Hiçbirini işaretlemezsen üye hiçbir bölümü göremez. ' +
      'Şu an: <b>' + (g ? (g.length + " bölüm açık") : "kısıt yok (tüm bölümler açık)") + '</b>.</div>';
    h += '<div class="yonDugmeler" style="margin:8px 0">' +
      '<button class="yonKucuk" onclick="uyeYetkiHepsi(1)">✅ Tümünü işaretle</button>' +
      '<button class="yonKucuk" onclick="uyeYetkiHepsi(0)">⛔ Hiçbirini işaretleme</button>' +
      '<button class="yonKucuk" onclick="uyeYetkiSifirla()">↩️ Tümünü aç (varsayılan)</button></div>';
    h += '<div class="yonDugmeler" style="margin:0 0 8px">' +
      '<button class="yonKucuk" onclick="uyeYetkiSadece([\'radyo\',\'islami\',\'mekke\'])">🎵 Yalnız radyo & TV</button>' +
      '<button class="yonKucuk" onclick="uyeYetkiSadece([\'islami\',\'kuran\',\'mekke\'])">🕌 Yalnız İslami bölümler</button>' +
      '<button class="yonKucuk" onclick="uyeYetkiSadece([\'siirler\',\'makaleler\',\'mektuplar\',\'eserler\',\'kitaplar\'])">🖋 Yalnız yayınlarım</button>' +
      '<button class="yonKucuk" onclick="uyeYetkiSadece([\'tanitim\',\'egitim\',\'teknoloji\',\'sosyal\',\'galeri\',\'logo\',\'iletisim\'])">👤 Yalnız tanıtım & iletişim</button></div>';
    h += '<div class="yonListe">';
    for (var i = 0; i < MENU.length; i++) {
      var m = MENU[i];
      var secili = !g || g.indexOf(m.id) > -1;
      h += '<label class="yonOge" style="cursor:pointer"><input type="checkbox" data-yk="' + m.id + '"' + (secili ? " checked" : "") +
        ' style="margin-right:10px"><span class="yonOgeAd">' + m.simge + " " + esc(m.ad) + '</span>' +
        '<span class="yonEtiket">' + (m.not === "kanal" ? "canlı yayın" : esc(String(m.not))) + '</span></label>';
    }
    h += '</div>';
    h += '<div class="yonDugmeler" style="margin-top:10px">' +
      '<button class="yonDugme" onclick="uyeYetkiKaydet()">💾 Yetkileri Kaydet</button>' +
      '<button class="yonDugme" onclick="uyeYetkiKapat()">◀️ Üyeler listesine dön</button></div>';
    return h;
  }
  window.uyeYetkiAc = function (id) { YETKI_ID = id; sekmeCiz(); try { window.scrollTo(0, 0); } catch (e) { } };
  window.uyeYetkiKapat = function () { YETKI_ID = null; sekmeCiz(); };
  window.uyeYetkiHepsi = function (v) { uyeYetkiKutulari().forEach(function (c) { c.checked = !!v; }); };
  window.uyeYetkiSifirla = function () { uyeYetkiKutulari().forEach(function (c) { c.checked = true; }); uyari("Tüm bölümler açıldı — kaydetmek için 💾 Yetkileri Kaydet."); };
  window.uyeYetkiSadece = function (liste) { yetkiIste(liste || []); };
  window.uyeYetkiKaydet = function () {
    var L = uyeleriOku(), u = null, i;
    for (i = 0; i < L.length; i++) { if (L[i].id === YETKI_ID) { u = L[i]; } }
    if (!u) { uyari("Üye bulunamadı."); return; }
    var sec = uyeYetkiKutulari().filter(function (c) { return c.checked; }).map(function (c) { return c.getAttribute("data-yk"); });
    if (sec.length === MENU.length) { try { delete u.gor; } catch (e) { u.gor = undefined; } }
    else { u.gor = sec; }
    u.yetkiTarih = bugun() + " " + uyeSaat();
    uyeleriYaz(L);
    uyari(sec.length === MENU.length ? "✔ Kaydedildi: bu üye tüm bölümleri görecek." : ("✔ Kaydedildi: üye " + sec.length + "/" + MENU.length + " bölüm görecek."));
    var aktif = uye();
    if (aktif && aktif.id === u.id) { try { window.uyeGorunumTazele(); } catch (e) { } }
    YETKI_ID = null; sekmeCiz();
  };

  window.uyeGorunumTazele = function () {
    try {
      if (typeof menuCiz === "function") menuCiz();
      if (typeof DURUM !== "undefined" && window.bolumGorunur && !window.bolumGorunur(DURUM.bolum)) {
        for (var i = 0; i < MENU.length; i++) {
          if (window.bolumGorunur(MENU[i].id)) { git(MENU[i].id); return; }
        }
        if (typeof uyari === "function") uyari("🔒 Site sahibi hiçbir bölüm için görüntüleme izni vermemiş. Lütfen yönetici ile görüşün.");
      }
    } catch (e) { }
  };

  function uyeDurumEtiket(d) {
    if (d === "onayli") return "✅ Onaylı üye";
    if (d === "red") return "⛔ Onaylanmadı";
    if (d === "yasakli") return "🚫 Yasaklı";
    return "⏳ Yönetici onayı bekliyor";
  }
  window.uyeDurumEtiket = uyeDurumEtiket;
  function oturumKur(u, hatirla) {
    var o = { id: u.id, kadi: u.kadi, ad: u.adSoyad || u.kadi, eposta: u.eposta, tel: u.tel || "", durum: u.durum, rol: u.rol || "uye", giris: bugun() + " " + uyeSaat() };
    try {
      if (hatirla) { localStorage.setItem(UYE_ANAHTAR, JSON.stringify(o)); localStorage.setItem(HATIRLA_ANAHTAR, "1"); }
      else { localStorage.removeItem(UYE_ANAHTAR); sessionStorage.setItem(UYE_ANAHTAR, JSON.stringify(o)); }
    } catch (e) { }
    try { if (window.uyeGorunumTazele) window.uyeGorunumTazele(); } catch (e) { }
  }
  function oturumKapat() {
    try { localStorage.removeItem(UYE_ANAHTAR); localStorage.removeItem(HATIRLA_ANAHTAR); sessionStorage.removeItem(UYE_ANAHTAR); } catch (e) { }
  }
  window.uyeCikis = function () {
    oturumKapat(); formuTemizle(true); rozetGuncelle(); yenile();
    if (el("uyePencere") && el("uyeKap").className.indexOf("acik") > -1) uyePencereCiz();
    uyari("Üyelik oturumu kapatıldı. Artık misafir olarak geziyorsun.");
      try { if (window.uyeGorunumTazele) window.uyeGorunumTazele(); } catch (e) { }
  };
  function kilitBilgi() {
    try { var t = localStorage.getItem(KILIT_ANAHTAR); return t ? JSON.parse(t) : { hata: 0, kilit: 0 }; } catch (e) { return { hata: 0, kilit: 0 }; }
  }
  function kilitYaz(o) { try { localStorage.setItem(KILIT_ANAHTAR, JSON.stringify(o)); } catch (e) { } }

  /* --- KAYIT OL --- */
  window.uyeKayitOl = function () {
    formuSakla();
    var g = function (id) { var e = el(id); return e ? String(e.value || "") : ""; };
    var kadi = g("u_kadi").trim(), eposta = g("u_eposta").trim(), s1 = g("u_sifre"), s2 = g("u_sifre2");
    var ad = g("u_adsoyad").trim(), tel = "";
    var izin = el("u_izin") && el("u_izin").checked;
    if (!uyeAyar().kayitAcik) { uyeMesajKoy("kotu", "Şu an yeni kayıt alınmıyor. Daha sonra tekrar dene."); return; }
    var hata = [];
    if (!/^[A-Za-z0-9ÇĞİÖŞÜçğıöşü._-]{3,20}$/.test(kadi)) hata.push("kullanıcı adı 3-20 karakter olmalı (harf, rakam, nokta, tire, alt çizgi)");
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(eposta)) hata.push("geçerli bir e-posta yaz (örnek: ad@gmail.com)");
    if (s1.length < 6) hata.push("şifre en az 6 karakter olmalı");
    if (s1 !== s2) hata.push("iki şifre birbirini tutmuyor");
    if (!izin) hata.push("bilgilerinin bu sitede saklanmasına izin vermelisin");
    if (!hata.length && uyeBul(kadi)) hata.push("bu kullanıcı adı alınmış, başka bir ad seç");
    if (!hata.length && uyeBul(eposta)) hata.push("bu e-posta ile zaten kayıt var");
    if (hata.length) { uyeMesajKoy("kotu", "⚠️ " + hata.join("<br>⚠️ ")); return; }
    var tuz = tuzUret(), l = uyeleriOku();
    var yeni = {
      id: uyeYeniId(), kadi: kadi, eposta: eposta, adSoyad: ad, tel: tel,
      sifre: { tuz: tuz, ozet: sifreOzet(s1, tuz), yontem: "sha256-" + HASH_TUR },
      tarih: bugun() + " " + uyeSaat(), durum: "beklemede", rol: "uye", sonGiris: "", not: "", sifirla: ""
    };
    l.push(yeni);
    uyeleriYaz(l);
    YON.kayitlar.push({ ad: kadi + " · " + eposta, tel: "", tarih: bugun(), durum: "Bekliyor", not: "siteden üye kaydı — yönetici onayı bekliyor" });
    kaydet();
    var bekleyen = l.filter(function (x) { return x.durum === "beklemede"; }).length;
    uyeMesajKoy("iyi", "✅ <b>Kaydın alındı, " + esc(kadi) + "!</b><br>Sırada <b>yönetici onayı</b> var. Site sahibi onayladıktan sonra kullanıcı adın (veya e-postan) ve şifrenle giriş yapabilirsin.<br>" +
      "Şu an onay bekleyen üye sayısı: <b>" + bekleyen + "</b>. Onaylandığında bu pencereden giriş yapabilirsin.");
    formuTemizle(true);
    UYE_SEKME = "giris";
    yenile();
  };
  /* hatalı denemede yazılanlar kaybolmasın: form durumu saklanır ve yeniden çizimde geri konur */
  var UYE_FORM = {};
  function formuSakla() {
    ["u_kadi", "u_eposta", "u_sifre", "u_sifre2", "u_adsoyad", "g_kullanici", "g_sifre",
      "p_adsoyad", "s_eski", "s_yeni", "s_yeni2"].forEach(function (id) {
        var e = el(id); if (e) UYE_FORM[id] = e.value;
      });
    var i = el("u_izin"); if (i) UYE_FORM.u_izin = i.checked;
    var hh = el("g_hatirla"); if (hh) UYE_FORM.g_hatirla = hh.checked;
  }
  function formuGeri() {
    for (var id in UYE_FORM) if (UYE_FORM.hasOwnProperty(id)) {
      var e = el(id); if (!e) continue;
      if (e.type === "checkbox") e.checked = !!UYE_FORM[id]; else e.value = UYE_FORM[id];
    }
  }
  function formuTemizle(hepsi) {
    UYE_FORM = {};
    if (hepsi) ["u_kadi", "u_eposta", "u_sifre", "u_sifre2", "u_adsoyad", "g_kullanici", "g_sifre"].forEach(function (id) {
      var e = el(id); if (e) e.value = "";
    });
  }
  function uyeMesajKoy(tip, metin) { formuSakla(); UYE_MESAJ = metin; UYE_MESAJ_TIP = tip; uyePencereCiz(); }

  /* --- GİRİŞ YAP --- */
  window.uyeGirisYap = function () {
    formuSakla();
    var k = (el("g_kullanici") || {}).value || "", s = (el("g_sifre") || {}).value || "";
    var hatirla = el("g_hatirla") && el("g_hatirla").checked;
    k = k.trim();
    if (!k || !s) { UYE_MESAJ = "Kullanıcı adını (veya e-postanı) ve şifreni yaz."; UYE_MESAJ_TIP = "uyari"; uyePencereCiz(); return; }
    var kb = kilitBilgi(), simdi = Date.now();
    if (kb.kilit > simdi) {
      UYE_MESAJ = "Çok fazla hatalı deneme. Lütfen <b>" + Math.ceil((kb.kilit - simdi) / 1000) + " saniye</b> sonra tekrar dene.";
      UYE_MESAJ_TIP = "kotu"; uyePencereCiz(); return;
    }
    var u = uyeBul(k);
    if (!u || u.sifre.ozet !== sifreOzet(s, u.sifre.tuz)) {
      kb.hata = (kb.hata || 0) + 1;
      if (kb.hata >= 5) { kb.kilit = simdi + 60000; kb.hata = 0; UYE_MESAJ = "5 kez hatalı giriş yapıldı. Hesap <b>60 saniye</b> kilitlendi."; UYE_MESAJ_TIP = "kotu"; }
      else { UYE_MESAJ = "Kullanıcı adı veya şifre hatalı. (" + (5 - kb.hata) + " deneme hakkın kaldı)"; UYE_MESAJ_TIP = "kotu"; }
      kilitYaz(kb); uyePencereCiz(); return;
    }
    kilitYaz({ hata: 0, kilit: 0 });
    if (u.durum === "beklemede") { UYE_MESAJ = "⏳ <b>Hesabın yönetici onayı bekliyor.</b><br>Site sahibi onayladıktan sonra giriş yapabilirsin. Acele ediyorsan WhatsApp'tan hatırlatabilirsin: <b>0537 771 24 38</b>"; UYE_MESAJ_TIP = "uyari"; uyePencereCiz(); return; }
    if (u.durum === "red") { UYE_MESAJ = "⛔ Bu kayıt site sahibi tarafından onaylanmadı. Bilgi için iletişim bölümünden yazabilirsin."; UYE_MESAJ_TIP = "kotu"; uyePencereCiz(); return; }
    if (u.durum === "yasakli") { UYE_MESAJ = "🚫 Bu hesap yasaklanmış. Bilgi için site sahibine ulaş."; UYE_MESAJ_TIP = "kotu"; uyePencereCiz(); return; }
    var l = uyeleriOku();
    for (var i = 0; i < l.length; i++) if (l[i].id === u.id) l[i].sonGiris = bugun() + " " + uyeSaat();
    uyeleriYaz(l);
    oturumKur(u, hatirla);
    UYE_MESAJ = "✅ <b>Hoş geldin " + esc(u.kadi) + "!</b><br>Artık yorum yazabilirsin. Kategoriye yazı eklemek yalnızca site sahibinin yetkisindedir.";
    UYE_MESAJ_TIP = "iyi";
    formuTemizle(true);
    rozetGuncelle(); yenile(); uyePencereCiz();
  };

  /* --- şifremi unuttum: yöneticiye istek düşer --- */
  window.uyeSifreUnuttum = function () {
    var k = (el("g_kullanici") || {}).value || "";
    k = k.trim();
    if (!k) { UYE_MESAJ = "Önce kullanıcı adını ya da e-postanı yaz, sonra 'şifremi unuttum'a bas."; UYE_MESAJ_TIP = "uyari"; uyePencereCiz(); return; }
    var u = uyeBul(k);
    if (!u) { UYE_MESAJ = "Bu kullanıcı adı/e-posta ile kayıt bulunamadı."; UYE_MESAJ_TIP = "kotu"; uyePencereCiz(); return; }
    var l = uyeleriOku();
    for (var i = 0; i < l.length; i++) if (l[i].id === u.id) l[i].sifirla = bugun() + " " + uyeSaat();
    uyeleriYaz(l);
    YON.kayitlar.push({ ad: u.kadi + " · " + u.eposta, tel: u.tel || "", tarih: bugun(), durum: "Bekliyor", not: "şifre sıfırlama isteği — panele düştü" });
    kaydet();
    UYE_MESAJ = "🔑 Şifre sıfırlama isteğin site sahibine iletildi.<br>Panelden senin için yeni bir geçici şifre üretebilir ve WhatsApp/e-posta ile gönderebilir.";
    UYE_MESAJ_TIP = "uyari"; uyePencereCiz();
  };

  /* --- üye kendi profilini düzenler --- */
  window.uyeProfilKaydet = function () {
    var u = uye(); if (!u) return;
    var ad = (el("p_adsoyad") || {}).value || "";
    var l = uyeleriOku();
    for (var i = 0; i < l.length; i++) if (l[i].id === u.id) { l[i].adSoyad = ad.trim(); l[i].tel = ""; }
    uyeleriYaz(l);
    var o = uye(); o.ad = ad.trim() || u.kadi;
    try { if (localStorage.getItem(HATIRLA_ANAHTAR) === "1") localStorage.setItem(UYE_ANAHTAR, JSON.stringify(o)); else sessionStorage.setItem(UYE_ANAHTAR, JSON.stringify(o)); } catch (e) { }
    uyari("✔ Profil bilgilerin güncellendi.");
    uyePencereCiz();
  };
  window.uyeSifreDegistir = function () {
    var u = uye(); if (!u) return;
    formuSakla();
    var eski = (el("s_eski") || {}).value || "", y1 = (el("s_yeni") || {}).value || "", y2 = (el("s_yeni2") || {}).value || "";
    var kayit = uyeIdIle(u.id);
    if (!kayit) { uyari("Kayıt bulunamadı."); return; }
    if (kayit.sifre.ozet !== sifreOzet(eski, kayit.sifre.tuz)) { UYE_MESAJ = "Mevcut şifren hatalı."; UYE_MESAJ_TIP = "kotu"; uyePencereCiz(); return; }
    if (y1.length < 6) { UYE_MESAJ = "Yeni şifre en az 6 karakter olmalı."; UYE_MESAJ_TIP = "uyari"; uyePencereCiz(); return; }
    if (y1 !== y2) { UYE_MESAJ = "Yeni şifreler birbirini tutmuyor."; UYE_MESAJ_TIP = "uyari"; uyePencereCiz(); return; }
    var l = uyeleriOku();
    for (var i = 0; i < l.length; i++) if (l[i].id === u.id) { l[i].sifre.tuz = tuzUret(); l[i].sifre.ozet = sifreOzet(y1, l[i].sifre.tuz); l[i].sifirla = ""; }
    uyeleriYaz(l);
    UYE_MESAJ = "✅ Şifren değiştirildi. Yeni şifrenle giriş yapabilirsin."; UYE_MESAJ_TIP = "iyi"; uyePencereCiz();
  };
  window.sifreGucCiz = function () {
    var s = (el("u_sifre") || {}).value || "", g = sifreGuc(s);
    var k = el("u_gucKutu"); if (k) { k.className = "sifreGuc " + (s ? g.sinif : ""); }
    var y = el("u_gucYazi"); if (y) y.innerHTML = s ? ("Şifre gücü: <b>" + g.ad + "</b> — " + g.ipucu) : "En az 6 karakter; harf + rakam + işaret karıştır.";
  };
  window.gozAc = function (id, dugme) {
    var e = el(id); if (!e) return;
    if (e.type === "password") { e.type = "text"; if (dugme) dugme.textContent = "🙈"; }
    else { e.type = "password"; if (dugme) dugme.textContent = "👁"; }
  };

  /* --- üyelik penceresi (madalyonlu giriş perdesi) --- */
  window.uyeAc = function (sekme) {
    if (sekme) UYE_SEKME = sekme;
    UYE_MESAJ = ""; UYE_MESAJ_TIP = "";
    if (!uyeOnayliMi()) { UYE_FORM = {}; }
    var k = el("uyeKap"); if (!k) return;
    k.className = "uyeKap acik";
    uyePencereCiz();
    var i = el("g_kullanici") || el("u_kadi"); if (i) { try { i.focus(); } catch (e) { } }
  };
  window.uyeKapat = function () { var k = el("uyeKap"); if (k) k.className = "uyeKap"; };
  window.uyeSekmeGit = function (s) { UYE_SEKME = s; UYE_MESAJ = ""; uyePencereCiz(); };
  window.uyePencereCiz = uyePencereCiz;
  function uyePencereCiz() {
    var k = el("uyePencere"); if (!k) return;
    var u = uye();
    var h = '<button class="kapatX" onclick="uyeKapat()" title="Kapat (Esc)">✕</button>' +
      '<div class="uyeMadalyon"><img src="foto/ustad-kenan.jpg" alt="Üstad Kenan Kuzucu"></div>' +
      '<h3>ÜSTAD KENAN KUZUCU</h3>' +
      '<div class="uyeAltYazi">ÜYELİK · ' + (uyeAyar().kayitAcik ? "kayıt açık" : "kayıt kapalı") + '</div>';
    if (UYE_MESAJ) h += '<div class="uyeMesaj ' + (UYE_MESAJ_TIP || "uyari") + '">' + UYE_MESAJ + '</div>';

    if (uyeOnayliMi() || (u && u.rol === "editor")) {
      /* --- giriş yapmış üye: üyelik kartı --- */
      var kayit = uyeIdIle(u.id) || {};
      var yorumSay = (YON.yorumlar || []).filter(function (y) { return uKucuk(y.ad) === uKucuk(u.kadi) || uKucuk(y.uye) === uKucuk(u.kadi); }).length;
      h += '<div class="uyeUyeKart">' +
        '<div class="uyeAvatar">' + esc(String(u.kadi || "?").charAt(0).toUpperCase()) + '</div>' +
        '<div class="uyeSatir"><span>Kullanıcı adı</span><b>' + esc(u.kadi) + '</b></div>' +
        '<div class="uyeSatir"><span>E-posta</span><b>' + esc(u.eposta || "-") + '</b></div>' +
        '<div class="uyeSatir"><span>Durum</span><b>' + uyeDurumEtiket(kayit.durum || u.durum) + '</b></div>' +
        '<div class="uyeSatir"><span>Üyelik tarihi</span><b>' + esc(kayit.tarih || "-") + '</b></div>' +
        '<div class="uyeSatir"><span>Son giriş</span><b>' + esc(kayit.sonGiris || "şimdi") + '</b></div>' +
        '<div class="uyeSatir"><span>Yorumların</span><b>' + yorumSay + '</b></div>' +
        '</div>' +
        '<div class="uyeBosluk"></div>' +
        '<div class="uyeAlanlar">' +
        '<label><span>Ad Soyad (sitede görünmez)</span><input id="p_adsoyad" value="' + esc(kayit.adSoyad || "") + '" placeholder="Ad Soyad"></label>' +
        '<div class="uyeDugmeler"><button class="yonDugme" onclick="uyeProfilKaydet()">💾 Profili Kaydet</button></div>' +
        '<div class="uyeBosluk"></div>' +
        '<div class="uyeIki">' +
        '<label><span>Mevcut şifre</span><div class="sifreKap"><input id="s_eski" type="password"><button class="goz" onclick="gozAc(\'s_eski\',this)">👁</button></div></label>' +
        '<label><span>Yeni şifre</span><div class="sifreKap"><input id="s_yeni" type="password"><button class="goz" onclick="gozAc(\'s_yeni\',this)">👁</button></div></label>' +
        '</div><label><span>Yeni şifre (tekrar)</span><div class="sifreKap"><input id="s_yeni2" type="password"><button class="goz" onclick="gozAc(\'s_yeni2\',this)">👁</button></div></label>' +
        '<div class="uyeDugmeler"><button class="yonDugme" onclick="uyeSifreDegistir()">🔑 Şifremi Değiştir</button></div></div>' +
        '<div class="uyeDugmeler"><button class="yonDugme ana" onclick="uyeKapat()">✔ Kapat</button>' +
        '<button class="yonDugme" onclick="uyeCikis()">🚪 Üyelikten Çık</button></div>' +
        '<div class="uyeKucukNot">Kategoriye yazı eklemek yalnızca site sahibinin yetkisindedir; üyeler yorum yazabilir. Yorumlar sahibin onayından sonra yayımlanır.</div>';
    } else if (UYE_SEKME === "kayit") {
      /* --- kayıt formu --- */
      var kapali = !uyeAyar().kayitAcik;
      h += '<div class="uyeSekmeler"><button class="uyeSek" onclick="uyeSekmeGit(\'giris\')">🔑 GİRİŞ YAP</button>' +
        '<button class="uyeSek sec" onclick="uyeSekmeGit(\'kayit\')">🤝 ÜYE OL</button></div>';
      if (kapali) {
        h += '<div class="uyeMesaj uyari">Yeni kayıt şu an kapalı. Daha sonra tekrar dene ya da iletişim bölümünden yaz.</div>';
      } else {
        h += '<div class="uyeAlanlar">' +
          '<label><span>Kullanıcı adı (sitede görünecek isim)</span><input id="u_kadi" maxlength="20" placeholder="örnek: kenan81"></label>' +
          '<label><span>E-posta / Gmail</span><input id="u_eposta" type="email" placeholder="ornek@gmail.com"></label>' +
          '<div class="uyeIki">' +
          '<label><span>Şifre</span><div class="sifreKap"><input id="u_sifre" type="password" oninput="sifreGucCiz()"><button class="goz" onclick="gozAc(\'u_sifre\',this)">👁</button></div></label>' +
          '<label><span>Şifre (tekrar)</span><div class="sifreKap"><input id="u_sifre2" type="password"><button class="goz" onclick="gozAc(\'u_sifre2\',this)">👁</button></div></label>' +
          '</div>' +
          '<div class="sifreGuc" id="u_gucKutu"><i></i></div><div class="uyeGucYazi" id="u_gucYazi">En az 6 karakter; harf + rakam + işaret karıştır.</div>' +
          '<label><span>Ad Soyad (opsiyonel — sitede görünmez)</span><input id="u_adsoyad" placeholder="Ad Soyad"></label>' +
          '<label style="display:flex;gap:8px;align-items:flex-start;font-size:12.3px;color:var(--yazi2)">' +
          '<input type="checkbox" id="u_izin" style="width:auto;margin-top:2px"><span>Yalnız kullanıcı adı ve e-postamın saklanmasına izin veriyorum. <b>Telefon numarası istenmez.</b> Şifrem düz metin olarak değil, geri çevrilemeyen özet olarak tutulur.</span></label>' +
          '</div>' +
          '<div class="uyeDugmeler"><button class="yonDugme ana" onclick="uyeKayitOl()">✅ KAYDIMI GÖNDER</button></div>' +
          '<div class="uyeKucukNot">Kaydın <b>yönetici onayına</b> düşer. Site sahibi (Üstad Kenan) onayladıktan sonra kullanıcı adın ve şifrenle giriş yapabilir, yorum yazabilirsin. Şifren hiçbir yerde açık yazılmaz.</div>';
      }
    } else {
      /* --- giriş formu --- */
      h += '<div class="uyeSekmeler"><button class="uyeSek sec" onclick="uyeSekmeGit(\'giris\')">🔑 GİRİŞ YAP</button>' +
        '<button class="uyeSek" onclick="uyeSekmeGit(\'kayit\')">🤝 ÜYE OL</button></div>' +
        '<div class="uyeAlanlar">' +
        '<label><span>Kullanıcı adı veya e-posta</span><input id="g_kullanici" placeholder="kenan81 veya ornek@gmail.com"></label>' +
        '<label><span>Şifre</span><div class="sifreKap"><input id="g_sifre" type="password" onkeydown="if(event.key===\'Enter\')uyeGirisYap()"><button class="goz" onclick="gozAc(\'g_sifre\',this)">👁</button></div></label>' +
        '<label style="display:flex;gap:8px;align-items:center;font-size:12.3px;color:var(--yazi2)"><input type="checkbox" id="g_hatirla" checked style="width:auto"><span>Beni bu bilgisayarda hatırla</span></label>' +
        '</div>' +
        '<div class="uyeDugmeler"><button class="yonDugme ana" onclick="uyeGirisYap()">🔓 GİRİŞ YAP</button>' +
        '<button class="yonDugme" onclick="uyeSifreUnuttum()">🔑 Şifremi unuttum</button></div>' +
        '<div class="uyeKucukNot">Onay bekleyen ya da onaylanmayan kayıtlarla giriş yapılamaz. 5 hatalı denemede giriş 60 saniye kilitlenir. Site sahibi girişi gizli bir kısayolla yapılır (misafirlere gösterilmez).</div>';
    }
    k.innerHTML = h;
    formuGeri();
    var gk = el("u_gucKutu");
    if (gk && el("u_sifre")) { var sv = el("u_sifre").value; if (sv) { var gg = sifreGuc(sv); gk.className = "sifreGuc " + gg.sinif; var gy = el("u_gucYazi"); if (gy) gy.innerHTML = "Şifre gücü: <b>" + gg.ad + "</b> — " + gg.ipucu; } }
  }

  /* --- İLETİŞİM bölümündeki üyelik kartı --- */
  window.uyelikKutu = function () {
    var l = uyeleriOku();
    var onayli = l.filter(function (x) { return x.durum === "onayli"; }).length;
    var bekleyen = l.filter(function (x) { return x.durum === "beklemede"; }).length;
    var u = uye();
    var h = '<div class="kart" id="uyelikKart"><div class="kBaslik">🤝 ÜYELİK · KAYIT · GİRİŞ</div>';
    h += '<p class="metin">Üye olursan <b>yorum yazabilir</b>, yeni şiir/makale duyurularını öğrenirsin. Kayıt için kullanıcı adı, e-posta (Gmail) ve şifre yeterli — kaydın <b>site sahibinin onayına</b> düşer. Kategoriye yazı eklemek yalnızca sahibin yetkisindedir.</p>';
    if (yetkiliMi()) {
      h += '<div class="yonBilgi">Onaylı üye: <b>' + onayli + '</b> · Onay bekleyen: <b>' + bekleyen + '</b> · Şu an: <b>' +
        (uyeOnayliMi() ? "👤 " + esc(u.kadi) : "👑 site sahibi") + '</b>' + (uyeAyar().kayitAcik ? "" : " · ⚠️ yeni kayıt kapalı") + '</div>';
    } else {
      h += '<div class="yonBilgi">Şu an: <b>' + (uyeOnayliMi() ? "👤 " + esc(u.kadi) : "giriş yapılmadı") + '</b>' + (uyeAyar().kayitAcik ? "" : " · ⚠️ yeni kayıt kapalı") + '</div>';
    }
    if (uyeOnayliMi()) {
      var gl = uyeGorListesi(uyeGorKaydi(u.id) || u);
      h += '<div class="yonBilgi">🔐 Görebildiğiniz bölüm: <b>' + (gl ? (gl.length + " / " + gorunurBolumSayisi()) : gorunurBolumSayisi()) + '</b>' +
        (gl ? ' — site sahibi bazı bölümleri hesabınız için kapalı tutuyor.' : ' — tüm bölümler açık.') + '</div>';
    }
    if (uyeOnayliMi()) h += '<div class="uyeDugmeler" style="justify-content:flex-start"><button class="yonDugme ana" onclick="uyeAc()">👤 Üyelik Kartım</button>' +
      '<button class="yonDugme" onclick="uyeCikis()">🚪 Çıkış</button></div>';
    else h += '<div class="uyeDugmeler" style="justify-content:flex-start"><button class="yonDugme ana" onclick="uyeAc(\'kayit\')">🤝 ÜYE OL</button>' +
      '<button class="yonDugme" onclick="uyeAc(\'giris\')">🔑 GİRİŞ YAP</button></div>';
    h += '<div class="kucuk">Kayıtta <b>telefon numarası istenmez</b>; yalnız kullanıcı adı ve e-posta saklanır. Şifreler düz metin olarak saklanmaz — rastgele tuz + ' + HASH_TUR + ' turlu SHA-256 özeti tutulur.</div></div>';
    return h;
  };

  /* --- üye rozeti / rol --- */
  /* ---------- YÖNETİM PANELİ DÜĞMESİ: yalnız sahip girişliyken görünür ---------- */
  function yonDugmesiniKur() {
    var var_olan = el("yonDugme");
    var uc = el("ucDugme");
    if (!uc) return;
    if (yetkiliMi()) {
      if (!var_olan) {
        var b = document.createElement("button");
        b.id = "yonDugme"; b.className = "miniBtn";
        b.innerHTML = "🛠 YÖNETİM PANELİ";
        b.title = "Yönetim paneli (gizli kısayol: Ctrl + Alt + Y)";
        b.onclick = function () { window.yonAc(); };
        uc.parentNode.insertBefore(b, uc.nextSibling);
      }
    } else if (var_olan && var_olan.parentNode) {
      var_olan.parentNode.removeChild(var_olan);   /* ziyaretçinin sayfasında bu düğme hiç bulunmaz */
    }
  }
  window.yonDugmesiniKur = yonDugmesiniKur;

  function rozetGuncelle() {
    var b = el("rolDugme");
    var u = uye();
    /* MİSAFİR düğmesi kaldırıldı: girişli üye için kendi adı, girişsiz ziyaretçi için hiç görünmez */
    if (b) {
      if (uyeOnayliMi()) {
        b.innerHTML = "👤 " + esc(String(u.kadi));
        b.className = "miniBtn rolUye";
        b.title = "Üye olarak giriş yapıldı · üyelik kartın için dokun";
        b.style.display = "";
      } else if (u && u.durum === "beklemede") {
        b.innerHTML = "⏳ onay bekliyor";
        b.className = "miniBtn rolMisafir";
        b.title = "Kaydın yönetici onayı bekliyor · durumu görmek için dokun";
        b.style.display = "";
      } else {
        b.style.display = "none";
      }
    }
    var kd2 = el("kayitDugme");
    var girisli = uyeOnayliMi() || yetkiliMi() || (u && u.durum === "beklemede");
    if (kd2) { kd2.style.display = girisli ? "none" : ""; kd2.innerHTML = "🤝 ÜYE OL"; }
    /* YETKİLİ GİRİŞİ yazısı ziyaretçiye hiç gösterilmez: düğme yalnızca sahip girişliyken DOM'a eklenir */
    yonDugmesiniKur();
    var k = el("uyelikKartRol");
    if (k) k.textContent = uyeOnayliMi() ? "👤 " + u.kadi : (u && u.durum === "beklemede" ? "⏳ onay bekliyor" : "giriş yapılmadı");
  }
  window.rozetGuncelle = rozetGuncelle;
  window.uyeAcOturum = function () { var u = uye(); if (u && u.durum === "beklemede") return true; return false; };

  /* ---------- 6) KURULUM ---------- */
  kat();
  try { uskStilTazele(); } catch (e) { }
  try {
    if (!YON.uyeler) YON.uyeler = window.uyeleriAl ? window.uyeleriAl() : [];
    else if ((!localStorage.getItem("usk-uyeler")) && YON.uyeler.length) localStorage.setItem("usk-uyeler", JSON.stringify(YON.uyeler));
  } catch (e) { }
  document.addEventListener("keydown", window.uskKisayolDinle);
  try { yonDugmesiniKur(); } catch (e) { }


  document.addEventListener("DOMContentLoaded", function () {
    // üst çubuğa yönetim düğmesi
    var ustCubuk = el("ucDugme");
    if (ustCubuk && !el("rolDugme")) {
      var rb = document.createElement("button");
      rb.id = "rolDugme"; rb.className = "miniBtn"; rb.onclick = function () { window.rolTikla(); };
      ustCubuk.parentNode.insertBefore(rb, ustCubuk.nextSibling);
      /* 🤝 KAYIT OL düğmesi — misafir rozetinin hemen yanında */
      if (!el("kayitDugme")) {
        var kd = document.createElement("button");
        kd.id = "kayitDugme"; kd.className = "miniBtn rolKayit"; kd.innerHTML = "🤝 ÜYE OL";
        kd.title = "Kullanıcı adı, e-posta (Gmail) ve şifre ile üye ol — kaydın yönetici onayına düşer";
        kd.onclick = function () { uyeAc("kayit"); };
        rb.parentNode.insertBefore(kd, rb.nextSibling);
      }

    }
    if (ustCubuk && !el("yonDugme")) {
      var b = document.createElement("button");
      b.id = "yonDugme"; b.className = "miniBtn"; b.innerHTML = "🛠 YÖNETİM PANELİ";
      b.onclick = function () { window.yonAc(); };
      ustCubuk.parentNode.insertBefore(b, ustCubuk.nextSibling);
    }
    // perde + kutu
    if (!el("yonPerde")) {
      var p = document.createElement("div"); p.id = "yonPerde"; p.className = "yonPerde";
      p.innerHTML = '<div class="yonKatman" onclick="yonPerdeKapat()"></div><div class="yonKutuAlani"><div id="yonPinKutu" class="yonKutu"></div><div id="yonKutu" class="yonKutu"></div></div>';
      document.body.appendChild(p);
    }
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.altKey && (e.key === "y" || e.key === "Y")) { e.preventDefault(); window.yonAc(); }
    });
    /* Kolay giriş yolu: adresin sonuna #yonetim (veya #panel / #sahip) yazılınca sahip şifre perdesi açılır */
    function adresKapisi() {
      var hh = String(location.hash || "").toLowerCase();
      if (hh === "#yonetim" || hh === "#panel" || hh === "#sahip") { window.yonAc(); }
    }
    window.addEventListener("hashchange", adresKapisi);
    setTimeout(adresKapisi, 80);
    rozetGuncelle();
    // git sarmalayıcı: bölüm açılınca kendi rengini uygular
    if (typeof window.git === "function" && !window.__gitSarildi) {
      var _git = window.git;
      window.git = function (id) { _git(id); renkUygula(id); };
      window.__gitSarildi = true;
    }
    // katma sonrası menü/sayfa tazele
    yenile();
    renkUygula(document.body.getAttribute("data-bolum") || "radyo");
  });
})();
