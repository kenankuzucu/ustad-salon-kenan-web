/* ==========================================================================
   ÜSTAD SALON KENAN — MOTOR (uygulama.js)
   Menü, bölümler, canlı radyo, tema/font seçimi ve gerçek 3D arka plan.
   Elle düzenlemeniz gerekmez; içerik için veri.js dosyasına bakın.
   ========================================================================== */
var DURUM = { bolum: "radyo", tema: "siyahaltin", yazi: "klasik", uc: true, kalite: "yuksek", arama: "" };

/* ---------------- 20 TEMA (her tema 3D sahneyi de boyar) ------------------ */
var TEMALAR = [
  { id: "siyahaltin", ad: "Siyah Altın", koyu: 1, v: { arka: "#0b0c0e", arka2: "#131418", kart: "#171a1f", cizgi: "#2b2f36", yazi: "#f3eee2", yazi2: "#b9b2a2", ana: "#d8b45c", ana2: "#f0dfa8", vurgu: "#e8c877", kod: "#1d2026" }, tint: [216, 180, 92] },
  { id: "zumrut", ad: "Zümrüt", koyu: 1, v: { arka: "#07110e", arka2: "#0b1a16", kart: "#0f221c", cizgi: "#1d3a30", yazi: "#eaf6f0", yazi2: "#a8c5b8", ana: "#3fbf8f", ana2: "#a6e9cc", vurgu: "#57d6a4", kod: "#0d1f1a" }, tint: [63, 191, 143] },
  { id: "gecemavi", ad: "Gece Mavisi", koyu: 1, v: { arka: "#070c18", arka2: "#0c1424", kart: "#101a2e", cizgi: "#1e2c48", yazi: "#e9f0fb", yazi2: "#a6b6d4", ana: "#5b8def", ana2: "#a9c6ff", vurgu: "#78a5ff", kod: "#0e1728" }, tint: [91, 141, 239] },
  { id: "bordo", ad: "Bordo Şarap", koyu: 1, v: { arka: "#140609", arka2: "#1e0a0f", kart: "#260d13", cizgi: "#43202a", yazi: "#fbeef0", yazi2: "#d3a9b1", ana: "#c8556d", ana2: "#f0a5b6", vurgu: "#d96f86", kod: "#240d12" }, tint: [200, 85, 109] },
  { id: "morkadife", ad: "Mor Kadife", koyu: 1, v: { arka: "#0d0817", arka2: "#150d24", kart: "#1c1230", cizgi: "#31214f", yazi: "#f2ecfd", yazi2: "#bdaedd", ana: "#9a6ae8", ana2: "#cbb0ff", vurgu: "#ab81ff", kod: "#1a1129" }, tint: [154, 106, 232] },
  { id: "bakir", ad: "Bakır", koyu: 1, v: { arka: "#120c08", arka2: "#1c120c", kart: "#241710", cizgi: "#41291c", yazi: "#fbf0e6", yazi2: "#d3b39a", ana: "#cf7f42", ana2: "#f3bd8b", vurgu: "#e3924f", kod: "#221610" }, tint: [207, 127, 66] },
  { id: "deniz", ad: "Deniz", koyu: 1, v: { arka: "#04100f", arka2: "#061a1a", kart: "#0a2423", cizgi: "#144040", yazi: "#e6f7f6", yazi2: "#9dc7c5", ana: "#2fb3ae", ana2: "#93e6e2", vurgu: "#43cec8", kod: "#092120" }, tint: [47, 179, 174] },
  { id: "orman", ad: "Orman", koyu: 1, v: { arka: "#08110a", arka2: "#0d1a0f", kart: "#122415", cizgi: "#204226", yazi: "#eaf6ea", yazi2: "#a9c5a9", ana: "#5aa85f", ana2: "#a9e0ad", vurgu: "#71c176", kod: "#102213" }, tint: [90, 168, 95] },
  { id: "gulkurusu", ad: "Gül Kurusu", koyu: 1, v: { arka: "#150d0e", arka2: "#1f1315", kart: "#29191c", cizgi: "#483034", yazi: "#fbeff0", yazi2: "#d6b1b2", ana: "#c07e84", ana2: "#eebfc3", vurgu: "#d29198", kod: "#27181b" }, tint: [192, 126, 132] },
  { id: "antrasit", ad: "Antrasit", koyu: 1, v: { arka: "#101114", arka2: "#171a1e", kart: "#1e2228", cizgi: "#31373f", yazi: "#eef1f5", yazi2: "#a9b1bd", ana: "#8ea3bd", ana2: "#c6d5e8", vurgu: "#a3b8d1", kod: "#1c2026" }, tint: [142, 163, 189] },
  { id: "kobalt", ad: "Kobalt", koyu: 1, v: { arka: "#060b1c", arka2: "#0a1228", kart: "#0e1834", cizgi: "#1d2c57", yazi: "#e9eefc", yazi2: "#a4b4dd", ana: "#4a6ef0", ana2: "#9db4ff", vurgu: "#6584ff", kod: "#0c152d" }, tint: [74, 110, 240] },
  { id: "kizil", ad: "Kızıl", koyu: 1, v: { arka: "#140606", arka2: "#1e0a0a", kart: "#260f0f", cizgi: "#472020", yazi: "#fcecec", yazi2: "#d6a9a9", ana: "#d1483f", ana2: "#ff9d92", vurgu: "#e4615a", kod: "#240d0d" }, tint: [209, 72, 63] },
  { id: "amber", ad: "Amber Terminal", koyu: 1, v: { arka: "#0c0a04", arka2: "#141008", kart: "#1c170b", cizgi: "#3a2f14", yazi: "#fdf6e0", yazi2: "#d4c08a", ana: "#d9a231", ana2: "#f6d789", vurgu: "#e9b545", kod: "#1a150a" }, tint: [217, 162, 49] },
  { id: "nefti", ad: "Neftî", koyu: 1, v: { arka: "#08100f", arka2: "#0c1817", kart: "#112220", cizgi: "#1f3d3a", yazi: "#e9f5f3", yazi2: "#a3c3bf", ana: "#4ea89b", ana2: "#96dcd2", vurgu: "#5fc0b2", kod: "#0f201e" }, tint: [78, 168, 155] },
  { id: "lila", ad: "Lila", koyu: 1, v: { arka: "#100b16", arka2: "#181024", kart: "#211731", cizgi: "#392a4f", yazi: "#f4eefb", yazi2: "#c2b0dc", ana: "#b17ad6", ana2: "#dbb8f5", vurgu: "#c48ce8", kod: "#201530" }, tint: [177, 122, 214] },
  { id: "kahvealtin", ad: "Kahve & Altın", koyu: 1, v: { arka: "#120e08", arka2: "#1c150d", kart: "#251c11", cizgi: "#43331d", yazi: "#fbf3e6", yazi2: "#d2bb98", ana: "#c69a5a", ana2: "#efd6a8", vurgu: "#d9ad6c", kod: "#231a10" }, tint: [198, 154, 90] },
  { id: "siyahinci", ad: "Siyah İnci", koyu: 1, v: { arka: "#0a0b0f", arka2: "#12141a", kart: "#181b22", cizgi: "#2c3038", yazi: "#f2f4f8", yazi2: "#b4bac6", ana: "#c9ced8", ana2: "#eef1f6", vurgu: "#dfe4ec", kod: "#1b1e25" }, tint: [201, 206, 216] },
  { id: "lacivert", ad: "Lacivert Klasik", koyu: 1, v: { arka: "#060b1a", arka2: "#0a1226", kart: "#0e1a35", cizgi: "#1d2e55", yazi: "#e8eefc", yazi2: "#a3b2d6", ana: "#3d5fd6", ana2: "#93a8ff", vurgu: "#5878ea", kod: "#0c1730" }, tint: [61, 95, 214] },
  { id: "kehribar", ad: "Kehribar", koyu: 1, v: { arka: "#150d05", arka2: "#1f1408", kart: "#291b0c", cizgi: "#4a3116", yazi: "#fdf2e2", yazi2: "#d8b98d", ana: "#e08a3c", ana2: "#f7c489", vurgu: "#ee9d4d", kod: "#271a0b" }, tint: [224, 138, 60] },
  { id: "safir", ad: "Safir", koyu: 1, v: { arka: "#07091f", arka2: "#0c1030", kart: "#121845", cizgi: "#252e6e", yazi: "#eaeafd", yazi2: "#aaafe0", ana: "#6a7bff", ana2: "#b3bcff", vurgu: "#8090ff", kod: "#101542" }, tint: [106, 123, 255] },
  { id: "yesilcam", ad: "Yeşilçam", koyu: 1, v: { arka: "#0c1210", arka2: "#121b17", kart: "#18241f", cizgi: "#2b4038", yazi: "#f0f6ec", yazi2: "#b3c4ab", ana: "#8fc072", ana2: "#cfe8b6", vurgu: "#a3d187", kod: "#16221d" }, tint: [143, 192, 114] },
  { id: "neon", ad: "Neon Gece", koyu: 1, v: { arka: "#05050f", arka2: "#0a0a1c", kart: "#10102c", cizgi: "#252356", yazi: "#f1eaff", yazi2: "#b5a6e6", ana: "#b060ff", ana2: "#dfa8ff", vurgu: "#c37cff", kod: "#0e0e28" }, tint: [176, 96, 255] },
  { id: "karpuz", ad: "Karpuz", koyu: 1, v: { arka: "#120708", arka2: "#1c0b0d", kart: "#261014", cizgi: "#4a1f24", yazi: "#fceff0", yazi2: "#d9a6ab", ana: "#d65a5a", ana2: "#ffa3a3", vurgu: "#e66f6f", kod: "#240e12" }, tint: [214, 90, 90] },
  { id: "seftali", ad: "Şeftali Gece", koyu: 1, v: { arka: "#150d09", arka2: "#1f130c", kart: "#291a11", cizgi: "#4a2f1e", yazi: "#fdf0e8", yazi2: "#dfb69b", ana: "#ff9c78", ana2: "#ffc8b0", vurgu: "#ffad8c", kod: "#271811" }, tint: [255, 156, 120] },
  { id: "gokyuzu", ad: "Gök Mavisi", koyu: 0, v: { arka: "#f2f7fd", arka2: "#e6eef9", kart: "#ffffff", cizgi: "#cfdcee", yazi: "#1c2734", yazi2: "#54637a", ana: "#1f6fb2", ana2: "#175a92", vurgu: "#2a7fc4", kod: "#eaf1fa" }, tint: [31, 111, 178] },
  { id: "gulbahce", ad: "Gül Bahçesi", koyu: 0, v: { arka: "#fdf3f6", arka2: "#f8e8ee", kart: "#ffffff", cizgi: "#eed3dc", yazi: "#2d2026", yazi2: "#6d5460", ana: "#a8405f", ana2: "#8a2f4a", vurgu: "#bf5273", kod: "#f9edf1" }, tint: [168, 64, 95] },
  { id: "aydinlik", ad: "Aydınlık", koyu: 0, v: { arka: "#f7f3ea", arka2: "#efe8db", kart: "#fffdf7", cizgi: "#ddd2bf", yazi: "#2b2620", yazi2: "#6b6153", ana: "#9a6a1f", ana2: "#7a4f11", vurgu: "#b07d2a", kod: "#f2ece0" }, tint: [154, 106, 31] },
  { id: "fildisi", ad: "Fildişi", koyu: 0, v: { arka: "#fbf8f2", arka2: "#f3eee3", kart: "#ffffff", cizgi: "#e2d9c8", yazi: "#241f19", yazi2: "#665d4f", ana: "#0f6b53", ana2: "#0b5340", vurgu: "#128268", kod: "#f5f0e6" }, tint: [15, 107, 83] },
  { id: "karbeyaz", ad: "Kar Beyazı", koyu: 0, v: { arka: "#f4f7fb", arka2: "#e9eef6", kart: "#ffffff", cizgi: "#d6dfec", yazi: "#1e2530", yazi2: "#5b6678", ana: "#2657b8", ana2: "#1c4590", vurgu: "#2f66d0", kod: "#eef2f8" }, tint: [38, 87, 184] },
  { id: "pembezarif", ad: "Pembe & Zarif", koyu: 0, v: { arka: "#fbf3f4", arka2: "#f6e7ea", kart: "#ffffff", cizgi: "#ecd4d9", yazi: "#2e2124", yazi2: "#6d565c", ana: "#b04b64", ana2: "#8c3348", vurgu: "#c85c76", kod: "#f8eef0" }, tint: [176, 75, 100] }
];

/* ---------------- YAZI TİPLERİ ------------------------------------------ */
var YAZILAR = [
  { id: "klasik", ad: "Klasik", bas: '"Playfair Display", Georgia, serif', gov: "Raleway, Segoe UI, sans-serif" },
  { id: "kitap", ad: "Eski Kitap", bas: '"EB Garamond", Georgia, serif', gov: '"EB Garamond", Georgia, serif' },
  { id: "zarif", ad: "Zarif", bas: '"Cormorant Garamond", Georgia, serif', gov: '"Cormorant Garamond", Georgia, serif' },
  { id: "elyazisi", ad: "El Yazısı", bas: '"Marck Script", cursive', gov: '"EB Garamond", Georgia, serif' },
  { id: "modern", ad: "Modern", bas: "Raleway, Segoe UI, sans-serif", gov: "Raleway, Segoe UI, sans-serif" },
  { id: "sistem", ad: "Sistem", bas: "Georgia, serif", gov: "Segoe UI, sans-serif" },
  { id: "amiri", ad: "Osmanlı (Amiri)", bas: '"Amiri", Georgia, serif', gov: '"Amiri", Georgia, serif' },
  { id: "cinzel", ad: "Antik (Cinzel)", bas: '"Cinzel", Georgia, serif', gov: '"Lora", Georgia, serif' },
  { id: "lora", ad: "Kitap Kurdu (Lora)", bas: '"Lora", Georgia, serif', gov: '"Lora", Georgia, serif' },
  { id: "merriweather", ad: "Gazete (Merriweather)", bas: '"Merriweather", Georgia, serif', gov: '"Merriweather", Georgia, serif' },
  { id: "montserrat", ad: "Sade (Montserrat)", bas: '"Montserrat", Segoe UI, sans-serif', gov: '"Montserrat", Segoe UI, sans-serif' },
  { id: "josefin", ad: "İnce (Josefin)", bas: '"Josefin Sans", Segoe UI, sans-serif', gov: '"Josefin Sans", Segoe UI, sans-serif' },
  { id: "caveat", ad: "Not Defteri (Caveat)", bas: '"Caveat", cursive', gov: '"Lora", Georgia, serif' },
  { id: "pacifico", ad: "Neşeli (Pacifico)", bas: '"Pacifico", cursive', gov: '"Josefin Sans", Segoe UI, sans-serif' },
  { id: "greatvibes", ad: "Davet (Great Vibes)", bas: '"Great Vibes", cursive', gov: '"Cormorant Garamond", Georgia, serif' },
  { id: "makine", ad: "Makine", bas: '"Roboto Mono", Consolas, monospace', gov: '"Roboto Mono", Consolas, monospace' }
];

/* ---------------- YARDIMCILAR ------------------------------------------- */
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function el(id) { return document.getElementById(id); }
function hepsi(sec) { return [].slice.call(document.querySelectorAll(sec)); }
function temaBul(id) { for (var i = 0; i < TEMALAR.length; i++) if (TEMALAR[i].id === id) return TEMALAR[i]; return TEMALAR[0]; }
function menüBul(id) { for (var i = 0; i < MENU.length; i++) if (MENU[i].id === id) return MENU[i]; return MENU[0]; }

function temaUygula(id, kaydet) {
  var t = temaBul(id); DURUM.tema = t.id;
  document.body.setAttribute("data-tema", t.id);
  for (var k in t.v) if (t.v.hasOwnProperty(k)) document.documentElement.style.setProperty("--" + k, t.v[k]);
  document.documentElement.style.setProperty("--koyu", t.koyu ? "1" : "0");
  if (kaydet) { try { localStorage.setItem("usk-tema", t.id); } catch (e) { } }
  if (typeof sahneRenk === "function") sahneRenk(t);
  temaNoktalari();
}
function yaziUygula(id, kaydet) {
  for (var i = 0; i < YAZILAR.length; i++) if (YAZILAR[i].id === id) DURUM.yazi = id;
  var y = null;
  for (var j = 0; j < YAZILAR.length; j++) if (YAZILAR[j].id === DURUM.yazi) y = YAZILAR[j];
  document.documentElement.style.setProperty("--fontBaslik", y.bas);
  document.documentElement.style.setProperty("--fontGovde", y.gov);
  if (kaydet) { try { localStorage.setItem("usk-yazi", DURUM.yazi); } catch (e) { } }
  yaziDugmeleri();
}
function yaziDugmeleri() {
  var kap = el("yaziSecim"); if (!kap) return;
  var h = "";
  for (var i = 0; i < YAZILAR.length; i++)
    h += '<button class="miniBtn' + (YAZILAR[i].id === DURUM.yazi ? " sec" : "") + '" onclick="yaziUygula(\'' + YAZILAR[i].id + '\',1)">' + (i + 1) + ". " + esc(YAZILAR[i].ad) + "</button>";
  kap.innerHTML = h;
}
function temaNoktalari() {
  var kap = el("temaNokta"); if (!kap) return;
  var h = "";
  for (var i = 0; i < TEMALAR.length; i++) {
    var t = TEMALAR[i];
    h += '<button class="nokta" title="' + esc(t.ad) + '" aria-label="' + esc(t.ad) + '" onclick="temaUygula(\'' + t.id + '\',1)"' +
      ' style="background:linear-gradient(135deg,' + t.v.ana + ' 0 55%,' + t.v.arka + ' 55% 100%)' +
      (t.id === DURUM.tema ? ";outline:2px solid var(--ana2);outline-offset:2px" : "") + '"></button>';
  }
  el("temaAd").textContent = temaBul(DURUM.tema).ad;
  kap.innerHTML = h;
}

/* ---------------- MENÜ -------------------------------------------------- */
function koyu(hex, k) {
  var h = String(hex || "").replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length < 6) return hex;
  var f = (k == null ? 0.62 : k);
  var p = [0, 2, 4].map(function (i) {
    var v = Math.min(255, Math.round(parseInt(h.substr(i, 2), 16) * f));
    return (v < 16 ? "0" : "") + v.toString(16);
  });
  return "#" + p.join("");
}

function bolumNot(m) {
  if (m.id === "egitim") return TOPLAM_BELGE + " belge";
  if (m.id === "radyo") return radyoListesi("radyo").length + " kanal";
  if (m.id === "islami") return radyoListesi("islami").length + " kanal";
  if (m.id === "kitaplar") return KITAPLAR.length + " kitap";
  if (m.id === "mekke") return tvListe().length + " kanal";
  if (m.id === "teknoloji" && typeof TEKNOLOJI !== "undefined") return TEKNOLOJI.length + " branş";
  if (m.id === "eserler" && typeof ESERLER !== "undefined") return ESERLER.length + " kitap";
  if (m.id === "kitaplar" && typeof KITAPLAR !== "undefined") return KITAPLAR.length + " kitap";
  if (m.id === "kuran") return "114 sûre · 6236 âyet";
  return m.not;
}
function menuCiz() {
  var h = "";
  for (var i = 0; i < MENU.length; i++) {
    var m = MENU[i];
    /* GÖRÜNÜRLÜK: "yalnız sahibe özel" bölümler ve üye bazlı kısıtlar menüde hiç gösterilmez */
    if (window.bolumGorunur && !window.bolumGorunur(m.id)) continue;
    var hexMi = String(m.renk).charAt(0) === "#";
    var s1 = hexMi ? m.renk : "var(--" + m.renk + ")";
    var s2 = hexMi ? koyu(m.renk, 1.35) : "var(--" + m.renk + "b)";
    h += '<button class="menuSatir' + (m.id === DURUM.bolum ? " aktif" : "") + '" data-git="' + m.id + '" ' +
      'style="--s:' + s1 + ";--s2:" + s2 + '" onclick="git(\'' + m.id + '\')">' +
      '<span class="mSimge">' + m.simge + "</span>" +
      '<span class="mAd">' + esc(m.ad) + '</span><span class="mNot">' + esc(bolumNot(m)) + "</span></button>";
  }
  el("menuListe").innerHTML = h;
}


function git(id) {
  /* yetki koruması: izni olmayan / yalnız sahibe özel bölüm adresle de açılamaz */
  if (window.bolumGorunur && !window.bolumGorunur(id)) {
    if (typeof uyari === "function") {
      uyari(window.bolumYalnizSahip && window.bolumYalnizSahip(id) ? "🔒 Bu bölüm yalnızca site sahibine görünür." : "🔒 Bu bölüm için yetkiniz yok.");
    }
    if (window.uyeGorunumTazele) { try { window.uyeGorunumTazele(); } catch (e) { } }
    return;
  }
  DURUM.bolum = id; DURUM.arama = "";
  document.body.setAttribute("data-bolum", id);
  menuCiz();
  var m = menüBul(id);
  var h = '<div class="bolumBas"><span class="bSimge">' + m.simge + '</span><div><div class="bUst">' +
    "ÜSTAD KENAN KUZUCU" + '</div><h2>' + esc(m.ad) + '</h2><div class="bAlt">' + esc(m.id === "egitim" ? "MEB 42 · Üniversite 35 · Akademi " + AKADEMILER.sayi + " · Genel Toplam " + TOPLAM_BELGE : bolumNot(m)) +
    '</div></div><button class="miniBtn geri" onclick="paylas()">🔗 Bağlantıyı Paylaş</button></div>';
  h += ciz(id);
  if ((id === "iletisim" || id === "tanitim") && window.uyelikKutu) { try { h += window.uyelikKutu(); } catch (e) { } }
  if (window.yorumKutu) { try { h += window.yorumKutu(id); } catch (e) { } }
  el("icerik").innerHTML = h;
  el("icerik").scrollTop = 0;
  window.scrollTo(0, 0);
  if (id === "radyo") { kanalCiz(); saatGuncelle(); sozGuncelle(); }
  if (id === "islami") { kanalCiz(); }
  if (id !== "mekke") tvSessizDurdur();
  paylasDugmeleri();
  if (window.innerWidth <= 900) kapakKapat();
}

/* ---------------- BÖLÜM ÇİZİMLERİ -------------------------------------- */
function ciz(id) {
  if (id === "radyo") return cizRadyo();
  if (id === "kuran") return KR.gorunum === "mushaf" ? cizKuranMushaf() : (KR.sureNo > 0 ? cizKuranSure() : cizKuran());
  if (id === "islami") return cizIslami();
  if (id === "mekke") return cizTv();
  if (id === "teknoloji") return cizTeknoloji();
  if (id === "siirler") return cizSiirler();
  if (id === "makaleler") return cizMakaleler();
  if (id === "mektuplar") return cizMektuplar();
  if (id === "eserler") return cizEserler();
  if (id === "kitaplar") return cizKitaplar();
  if (id === "sosyal") return cizSosyal();
  if (id === "tanitim") return cizTanitim();
  if (id === "egitim") return cizEgitim();
  if (id === "oyunlar" && window.cizOyunlar) return window.cizOyunlar();
  if (id === "galeri") return cizGaleri();
  if (id === "logo") return cizLogo();
  if (id === "iletisim") return cizIletisim();
  if (window.ozelBolum) { try { var oz = window.ozelBolum(id); if (oz) return oz; } catch (e) { } }
  return '<p class="bos">Bu bölüm hazırlanıyor.</p>';
}

function grupAdlari(G) {
  var l = [];
  for (var i = 0; i < G.length; i++) l.push(G[i].simge + " " + G[i].ad);
  return l.join(" · ");
}
/* Oynatıcı kutusu — her bölüm kendi ön ekiyle ("r" / "i") çizer */
function radyoKutu(onek, bolum) {
  return '<div class="radyoKap"><div class="radyoUst"><div class="radyoKapak">' + (bolum === "islami" ? "🕌" : "🎵") + "</div>" +
    '<div class="radyoBilgi"><div class="rKanal" id="' + onek + 'Kanal">Bir kanal seçin</div>' +
    '<div class="rDurum" id="' + onek + 'Durum">Yayın başlatılmadı</div>' +
    '<div class="rSeviye"><span>🔈</span><input id="' + onek + 'Ses" type="range" min="0" max="100" value="60" oninput="sesAyarla(\'' + onek + '\')"><span>🔊</span></div>' +
    '</div><div class="radyoDugme"><button class="anaBtn" id="' + onek + 'Dugme" onclick="radyoAcKapa(\'' + onek + '\')">▶ Dinle</button>' +
    '<button class="miniBtn" onclick="radyoDurdur(\'' + onek + '\')">■ Durdur</button></div></div>' +
    '<div class="kanalListe" id="' + onek + 'Liste"></div></div>';
}
/* ==========================================================================
   📖 KUR'AN-I KERİM BÖLÜMÜ — 114 sûre, 6236 âyet (Arapça + Diyanet meali)
   Tefsir: "Evrensel Kur'an Tefsiri" (sûre sûre, âyet aralıklarıyla)
   Büyük veri dosyaları (kuran/ayetler.js ~2,4 MB ve kuran/tefsir.js ~3,2 MB)
   yalnızca bu bölüm açılınca, ihtiyaç anında yüklenir.
   ========================================================================== */
var KR = { vere: 0, yuk: 0, sureNo: 0, boyut: 1, tefsir: {}, hata: 0, deneme: {},
           gorunum: "okuma", sayfa: 1, mFont: "sehrazade", kagit: "klasik", rozet: "klasik" };

var KR_HARITA = { sureler: "KURAN_SURELER", ayetler: "KURAN_AYETLER", tefsir: "KURAN_TEFSIR", sayfalar: "KURAN_SAYFALAR" };
function krDosya(ad, geri) {
  var globalAd = KR_HARITA[ad] || ("KURAN_" + ad.toUpperCase());
  if (window[globalAd]) { geri(); return; }                 /* zaten yüklü */
  var eski = document.getElementById("kr-" + ad);
  if (eski && eski.getAttribute("data-bitti") !== "1") { eski.addEventListener("load", geri); return; }
  if (eski) { try { eski.remove(); } catch (e) { } }         /* yüklendi ama global yok: yeniden dene */
  KR.deneme[ad] = (KR.deneme[ad] || 0) + 1;
  if (KR.deneme[ad] > 3) { KR.hata = 1; if (typeof uyari === "function") uyari("Kur'an verisi yüklenemedi: kuran/" + ad + ".js"); return; }
  var s = document.createElement("script");
  s.id = "kr-" + ad; s.src = "kuran/" + ad + ".js";
  s.onload = function () { s.setAttribute("data-bitti", "1"); geri(); };
  s.onerror = function () { KR.hata = 1; geri(); };
  document.head.appendChild(s);
}
function krHazir(geri) {   /* sûre listesi + âyetler */
  if (window.KURAN_SURELER && window.KURAN_AYETLER) { geri(); return; }
  krDosya("sureler", function () { krDosya("ayetler", geri); });
}
function krBoyut(yon) {
  KR.boyut = Math.min(1.7, Math.max(0.85, KR.boyut + yon * 0.1));
  var k = el("krMetin"); if (k) k.style.setProperty("--kuranYaz", KR.boyut);
  var ms = el("krMushafSayfa"); if (ms) ms.style.setProperty("--mBoyut", KR.boyut);
  try { localStorage.setItem("usk-kuran-yazi", String(KR.boyut)); } catch (e) { }
  if (typeof krYaziNot === "function") krYaziNot();
}
function krSureAc(no) {
  KR.sureNo = no; KR.tefsir = {};
  krTefsirHazir(function () { });   /* tefsir dosyasını arka planda hazırla */
  try { localStorage.setItem("usk-kuran-sure", String(no)); } catch (e) { }
  git("kuran");
}
function krAra(deger) {
  var s = document.getElementById("krSureListe"); if (!s) return;
  var q = trNorm(deger || "");
  var h = "";
  for (var i = 0; i < KURAN_SURELER.length; i++) {
    var x = KURAN_SURELER[i];
    var metin = trNorm(x.no + " " + x.ad + " " + x.anlam + " " + x.yer);
    if (q && metin.indexOf(q) < 0) continue;
    h += sureKarti(x);
  }
  s.innerHTML = h || '<p class="bos">Aradığın sûre bulunamadı.</p>';
}
function sureKarti(x) {
  return '<button class="sureKart" onclick="krSureAc(' + x.no + ')">' +
    '<span class="sureNo">' + x.no + '</span>' +
    '<span><span class="sureAd">' + esc(x.ad) + ' Sûresi</span><br>' +
    '<span class="sureAlt">' + x.ayet + " âyet · " + esc(x.yer) + " · " + esc(x.anlam) + '</span></span>' +
    '<span class="sureArap">' + esc(x.arapca.replace("سُورَةُ ", "")) + '</span></button>';
}
function krTefsirHazir(geri) {
  if (window.KURAN_TEFSIR) { geri(); return; }
  krDosya("tefsir", function () { krTefsirNotTazele(); geri(); });
}
function krTefsirNotMetni(no) {
  if (!window.KURAN_TEFSIR) return "Tefsir: yükleniyor…";
  var b = krTefsirBolumleri(no);
  return b ? "Tefsir: Evrensel Kur'an Tefsiri (" + b.length + " bölüm)" : "Tefsir: bu sûre kaynak eserde yer almıyor";
}
function krTefsirNotTazele() {
  var k = el("krTefsirNot"); if (k) k.textContent = krTefsirNotMetni(KR.sureNo);
}
function krTefsirBolumleri(no) {
  var t = window.KURAN_TEFSIR || {};
  return t[no] || null;
}
function krAralikNo(metin) {          /* "46, 47. ARASI..." / "1-5 ARASI..." → [ilk, son] */
  var m = String(metin).split("ARASI")[0].match(/\d+/g);
  if (!m || !m.length) return null;
  var ilk = parseInt(m[0], 10), son = m.length > 1 ? parseInt(m[1], 10) : ilk;
  return [Math.min(ilk, son), Math.max(ilk, son)];
}
function krTefsirAc(no, ayetNo) {
  var k = el("krt-" + ayetNo);
  if (!k) return;
  if (!window.KURAN_TEFSIR) {
    k.innerHTML = '<div class="tefsirYok">📖 Tefsir yükleniyor… (ilk açılışta 3 MB&#39;lık tefsir dosyası okunur, birkaç saniye sürebilir)</div>';
    k.setAttribute("data-acik", "1");
    krTefsirHazir(function () { k.setAttribute("data-acik", "0"); krTefsirAc(no, ayetNo); });
    return;
  }
  var b = krTefsirBolumleri(no);
  if (k.getAttribute("data-acik") === "1") { k.innerHTML = ""; k.setAttribute("data-acik", "0"); return; }
  if (!b) {
    k.innerHTML = '<div class="tefsirYok">Bu sûrenin tefsiri kaynak eserde yer almıyor. ' +
      'Tam tefsir için: <a href="https://kuran.diyanet.gov.tr/tefsir" target="_blank" rel="noopener">Diyanet Kur\'an Yolu Tefsiri</a></div>';
    k.setAttribute("data-acik", "1"); return;
  }
  var h = "";
  for (var i = 0; i < b.length; i++) {
    var ar = krAralikNo(b[i].aralik);
    if (ar && ayetNo && (ayetNo < ar[0] || ayetNo > ar[1])) continue;
    h += '<div class="tefsirKutu"><div class="tefsirBas">📖 ' + esc(b[i].aralik) + "</div>";
    for (var p = 0; p < b[i].p.length; p++) h += "<p>" + esc(b[i].p[p]) + "</p>";
    h += "</div>";
  }
  if (!h) h = '<div class="tefsirYok">Bu âyet için ayrı bir tefsir bölümü yok; sûrenin tamamına bakabilirsin.</div>';
  k.innerHTML = h; k.setAttribute("data-acik", "1");
}
function krTamTefsir() {
  var k = el("krTefsirTam");
  if (!k) return;
  if (!window.KURAN_TEFSIR) {
    k.innerHTML = '<div class="tefsirYok">📖 Tefsir yükleniyor…</div>';
    krTefsirHazir(function () { krTamTefsir(); });
    return;
  }
  var b = krTefsirBolumleri(KR.sureNo);
  if (k.getAttribute("data-acik") === "1") { k.innerHTML = ""; k.setAttribute("data-acik", "0"); return; }
  if (!b) { k.innerHTML = '<div class="tefsirYok">Bu sûrenin tefsiri kaynak eserde yer almıyor.</div>'; k.setAttribute("data-acik", "1"); return; }
  var h = "";
  for (var i = 0; i < b.length; i++) {
    h += '<div class="tefsirKutu"><div class="tefsirBas">📖 ' + esc(b[i].aralik) + "</div>";
    for (var p = 0; p < b[i].p.length; p++) h += "<p>" + esc(b[i].p[p]) + "</p>";
    h += "</div>";
  }
  k.innerHTML = h; k.setAttribute("data-acik", "1");
}
function krYaziNot() {
  var k = el("krYaziNot"); if (!k) return;
  k.textContent = "Yazı boyutu: %" + Math.round(KR.boyut * 100);
}

/* ---------- 1) Sûre listesi ---------- */
/* ==========================================================================
   💻 TEKNOLOJİ & DİJİTAL — 5 branş (tanıtım / reklam bölümü)
   Her branşın kendi logosu: satır içi SVG (keskin görünür, dosya gerekmez)
   ========================================================================== */
var TEK_LOGO = {
  web: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tg1" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#8fd0ff"/><stop offset="1" stop-color="#2f7ad8"/></linearGradient></defs>' +
    '<rect x="3" y="8" width="42" height="32" rx="5" fill="none" stroke="url(#tg1)" stroke-width="2.6"/>' +
    '<path d="M3 16h42" stroke="url(#tg1)" stroke-width="2.6"/>' +
    '<circle cx="9" cy="12" r="1.9" fill="#ff8a8a"/><circle cx="15" cy="12" r="1.9" fill="#ffd166"/><circle cx="21" cy="12" r="1.9" fill="#7ee787"/>' +
    '<path d="M14 24l-4 4 4 4M34 24l4 4-4 4M26 22l-5 12" stroke="#cfe8ff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  apk: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tg2" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#b6f5a8"/><stop offset="1" stop-color="#3fa04a"/></linearGradient></defs>' +
    '<rect x="12" y="4" width="24" height="40" rx="6" fill="none" stroke="url(#tg2)" stroke-width="2.6"/>' +
    '<rect x="17" y="12" width="14" height="20" rx="2.5" fill="url(#tg2)" opacity="0.85"/>' +
    '<circle cx="24" cy="38" r="2.4" fill="#d8ffd0"/>' +
    '<path d="M21 17l3 3 4-5" stroke="#0c2a12" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  bakim: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tg3" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#ffe0a8"/><stop offset="1" stop-color="#e08a1e"/></linearGradient></defs>' +
    '<path d="M30 8a9 9 0 0 0-9 11L7 33a3.2 3.2 0 0 0 4.5 4.5l14-14A9 9 0 1 0 30 8zm-2.5 5.5a2.5 2.5 0 1 1-3.5 3.5 2.5 2.5 0 0 1 3.5-3.5z" fill="url(#tg3)"/>' +
    '<circle cx="35" cy="34" r="8" fill="none" stroke="#ffd9a0" stroke-width="2.6"/>' +
    '<path d="M35 29v5l4 3" stroke="#ffe9c9" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>',
  ai: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tg4" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#e0c4ff"/><stop offset="1" stop-color="#7a48d8"/></linearGradient></defs>' +
    '<rect x="14" y="14" width="20" height="20" rx="5" fill="none" stroke="url(#tg4)" stroke-width="2.6"/>' +
    '<circle cx="24" cy="24" r="4" fill="url(#tg4)"/>' +
    '<path d="M24 6v8M24 34v8M6 24h8M34 24h8M11 11l5 5M32 32l5 5M37 11l-5 5M16 32l-5 5" stroke="#cbb4ff" stroke-width="2.2" stroke-linecap="round"/></svg>',
  grafik: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tg5" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#ffd0e0"/><stop offset="1" stop-color="#d84a7a"/></linearGradient></defs>' +
    '<path d="M24 6c10 0 18 7 18 15 0 5-4 8-8 8h-4c-2.6 0-4 1.8-4 4 0 3 2 4 2 6 0 2-1.6 3-4 3A18 18 0 0 1 24 6z" fill="none" stroke="url(#tg5)" stroke-width="2.6"/>' +
    '<circle cx="16" cy="19" r="2.6" fill="#ff9ec4"/><circle cx="24" cy="14" r="2.6" fill="#ffd166"/><circle cx="32" cy="19" r="2.6" fill="#9ecbff"/>' +
    '<path d="M30 34l8-8" stroke="#ffe3ee" stroke-width="2.4" stroke-linecap="round"/></svg>'
};
function tekWhatsapp(b) {
  return "https://wa.me/905377712438?text=" + encodeURIComponent("Merhaba Üstad Kenan, " + b.ad + " hizmeti hakkında bilgi/teklif almak istiyorum.");
}
function cizTeknoloji() {
  if (typeof TEKNOLOJI === "undefined") return '<p class="bos">Bu bölüm hazırlanıyor.</p>';
  var h = '<div class="tekUst"><div class="tekMadalyon"><img src="foto/ustad-kenan.jpg" alt="Üstad Kenan Kuzucu"></div>' +
    '<div class="tekUstBilgi"><span class="tekRozet">💻 TEKNOLOJİ &amp; DİJİTAL HİZMETLERİ</span>' +
    '<div class="tekUstAd">ÜSTAD KENAN KUZUCU</div>' +
    '<div class="tekAltAd" style="font-size:12.5px;color:var(--yazi2);margin:2px 0 4px">' + TEKNOLOJI.length + ' branşta teknik hizmet</div>' +
    '<div class="tekUstAlt">Web sitesi · mobil uygulama (APK) · bilgisayar bakım ve onarım · yapay zekâ · grafik tasarım. ' +
    "Gaziantep ve çevresine yerinde, Türkiye'nin her yerine uzaktan destek. Bilgi ve fiyat için WhatsApp: <b>" + esc(ILETISIM.cep) + "</b></div></div></div>";
  h += '<div class="tekIzgara">';
  for (var i = 0; i < TEKNOLOJI.length; i++) {
    var b = TEKNOLOJI[i], logo = TEK_LOGO[b.id] || TEK_LOGO.web;
    h += '<div class="tekKart" style="--s:' + esc(b.renk || "#2fb4d8") + '">' +
      '<div class="tekKimlik"><div class="tekLogo">' + logo + "</div>" +
      '<div><div class="tekAd">' + (b.simge || "💻") + " " + esc(b.ad) + '</div>' +
      '<div class="tekAltAd">' + esc(b.alt || "Kenan Kuzucu · Gaziantep") + "</div></div></div>" +
      '<p class="tekKisa">' + esc(b.kisa || "") + "</p>";
    if (b.maddeler && b.maddeler.length) {
      h += '<ul class="tekMadde">';
      for (var q = 0; q < b.maddeler.length; q++) h += "<li>" + esc(b.maddeler[q]) + "</li>";
      h += "</ul>";
    }
    h += '<div class="tekDugme"><a class="miniBtn" style="text-decoration:none" target="_blank" rel="noopener" href="' +
      tekWhatsapp(b) + '">💬 Bilgi / Teklif Al</a>' +
      '<button class="miniBtn" onclick="tekPaylas(' + i + ')">🔗 Bu hizmeti paylaş</button></div></div>';
  }
  h += "</div>";
  h += '<div class="tekTavsiye"><b>📋 Nasıl çalışır?</b> Ne yapmak istediğini yaz (ör. "salonuma site istiyorum", ' +
    "\"telefonum yavaşladı\", \"logom olsun\") — önce ücretsiz konuşuruz, fiyat ve süre net olarak söylenir, iş bitince teslim edilir. " +
    "Ayrıca bu bölümdeki tasarımların canlı örnekleri sitenin diğer bölümlerindedir (bu site ve uygulamalar Üstad Kenan Kuzucu tarafından yapılmıştır).</div>";
  h += paylasKutu();
  return h;
}
function tekPaylas(i) {
  if (typeof TEKNOLOJI === "undefined" || !TEKNOLOJI[i]) return;
  var b = TEKNOLOJI[i], metin = b.simge + " " + b.ad + " — Üstad Kenan Kuzucu\n" + (b.kisa || "") + "\nİletişim: " + ILETISIM.cep;
  if (navigator.share) { navigator.share({ title: b.ad, text: metin }).catch(function () { }); return; }
  if (navigator.clipboard) navigator.clipboard.writeText(metin).then(function () { alert("Hizmet tanıtımı kopyalandı — WhatsApp'a yapıştırabilirsin."); }).catch(function () { });
}

/* ==========================================================================
   🕋 MEKKE MEDİNE CANLI TV — hls.js ile canlı video oynatıcı
   Yayınlar kanal sahiplerinin sunucularından gelir (site yayın barındırmaz).
   ========================================================================== */
var TV = { i: -1, hls: null, video: null, liste: [] };

function tvListe() {
  var l = [];
  if (typeof TV_GRUPLARI === "undefined") return l;
  for (var g = 0; g < TV_GRUPLARI.length; g++) {
    var G = TV_GRUPLARI[g];
    for (var q = 0; q < G.liste.length; q++) {
      var kk = G.liste[q];
      /* 4'lü kayıt: [ad, açıklama, adres, simge] · 2'li kayıt (panelden eklenmişse): [ad, adres] */
      var duz = (kk.length >= 4) ? kk : [kk[0], "", kk[1], "📺"];
      l.push({ g: G, k: duz, gi: g, ki: q });
    }
  }
  return l;
}
function tvGrupYaz() {
  if (typeof TV_GRUPLARI === "undefined") return '<p class="bos">Kanal listesi yüklenemedi.</p>';
  var h = "", no = 0;
  for (var g = 0; g < TV_GRUPLARI.length; g++) {
    var G = TV_GRUPLARI[g];
    h += '<div class="kanalBas"><span class="kBasAd">' + (G.simge || "📺") + " " + esc(G.ad) + "</span>" +
      '<span class="kBasSayi">' + G.liste.length + " kanal</span></div>";
    h += '<div class="tvIzgara">';
    for (var q = 0; q < G.liste.length; q++) {
      var k = G.liste[q], i = no++;
      h += '<div class="tvKart' + (TV.i === i ? " caliyor" : "") + '" onclick="tvOynat(' + i + ')" title="' + esc(k[1] || "") + '">' +
        '<div class="tkAd"><span>' + (k[3] || "📺") + "</span>" + esc(k[0]) +
        (TV.i === i ? '<span class="tkCanli">CANLI</span>' : "") + "</div>" +
        '<div class="tkAlt">' + esc(k[1] || "") + "</div></div>";
    }
    h += "</div>";
  }
  return h;
}
/* Yan sütun: kanal isimleri (gruplu, tıklanabilir) */
function tvYanListe() {
  if (typeof TV_GRUPLARI === "undefined") return '<div class="tyBas">Kanal listesi yok</div>';
  var h = '<div class="tyBas">📺 Kanallar — bir isme dokunun</div>', no = 0;
  for (var g = 0; g < TV_GRUPLARI.length; g++) {
    var G = TV_GRUPLARI[g];
    h += '<div class="tyGrup">' + (G.simge || "📺") + " " + esc(G.ad) + " <span style=\'font-weight:400;color:var(--yazi2)\'>(" + G.liste.length + ")</span></div>";
    for (var q = 0; q < G.liste.length; q++) {
      var k = G.liste[q], i = no++;
      h += '<button class="tvSatir' + (TV.i === i ? " caliyor" : "") + '" onclick="tvOynat(' + i + ')" title="' + esc((k[1] || k[0])) + '">' +
        '<span class="tsNo">' + (i + 1) + "</span>" +
        "<span>" + esc(k[0]) + "</span>" +
        (TV.i === i ? '<span class="tsCanli">CANLI</span>' : "") + "</button>";
    }
  }
  return h;
}
function tvKutu() {
  return '<div class="tvKap"><div class="tvUst">' +
    '<div class="tvKapak">🕋</div>' +
    '<div class="tvBilgi"><div class="tAd" id="tvAd">Bir kanal seçin</div>' +
    '<div class="tDurum" id="tvDurum">Yayın başlatılmadı</div>' +
    '<div class="tSeviye"><span>🔈</span><input id="tvSes" type="range" min="0" max="100" value="70" oninput="tvSesAyarla()"><span>🔊</span></div></div>' +
    '<div class="tvDugme"><button class="anaBtn" id="tvDugme" onclick="tvAcKapa()">▶ İzle</button>' +
    '<button class="miniBtn" onclick="tvDurdur()">■ Durdur</button>' +
    '<button class="miniBtn" onclick="tvTamEkran()">⛶ Tam ekran</button></div></div>' +
    '<video class="tvVideo" id="tvVideo" playsinline controls onclick="tvVideoTikla(event)"></video>' +
    '<div class="tvNot">📡 Yayınlar kanal sahiplerinin sunucularından canlı olarak gelir — <b>internet bağlantısı gerekir</b> ' +
    "(site yayını barındırmaz, saklamaz). Yayın açılmazsa kanalın kendi yayını durmuş olabilir: başka bir kanal deneyin, " +
    "birkaç saniye sonra yeniden dokunun.</div></div>";
}
function tvVideoTikla(olay) { if (olay) olay.stopPropagation(); tvTamEkran(); }
function tvDurum(m, sinif) {
  var d = el("tvDurum");
  if (d) { d.textContent = m; d.className = "tDurum " + (sinif || ""); }
}
function tvHazir() {
  if (TV.video) return TV.video;
  TV.video = el("tvVideo");
  if (TV.video) {
    TV.video.volume = 0.7;
    TV.video.addEventListener("playing", function () {
      var k = tvListe()[TV.i];
      tvDurum("▶ Canlı: " + (k ? k.k[0] : ""), "canli");
    });
    TV.video.addEventListener("waiting", function () { tvDurum("Yayın yükleniyor...", ""); });
    TV.video.addEventListener("error", function () {
      tvDurum("Yayın açılamadı — kanalın yayını durmuş olabilir, başka kanal deneyin", "hata");
    });
  }
  return TV.video;
}
function tvOynat(i) {
  var L = tvListe(); if (!L[i]) return;
  TV.i = i;
  var v = tvHazir(); if (!v) return;
  var k = L[i];
  var ad = el("tvAd"); if (ad) ad.textContent = (k.k[3] || "📺") + " " + k.k[0];
  tvDurum("Bağlanıyor: " + k.k[0] + " ...", "");
  if (TV.hls) { try { TV.hls.destroy(); } catch (e) { } TV.hls = null; }
  var url = k.k[2];
  function basla(Hls) {
    if (!Hls) { v.src = url; v.play().catch(function () { }); return; }
    if (Hls.isSupported()) {
      TV.hls = new Hls({ liveDurationInfinity: true, enableWorker: true });
      TV.hls.loadSource(url); TV.hls.attachMedia(v);
      TV.hls.on(Hls.Events.MANIFEST_PARSED, function () { v.play().catch(function () { tvDurum("▶ İzle düğmesine dokunun", ""); }); });
      TV.hls.on(Hls.Events.ERROR, function (e, veri) {
        if (veri && veri.fatal) {
          var m = "Yayın hatası (" + (veri.details || "") + ")";
          if (veri.type === "networkError") m = "Ağ hatası: yayına ulaşılamadı — internet bağlantısını ve kanalı kontrol edin";
          if (veri.type === "mediaError") m = "Bu yayın bu tarayıcıda oynatılamıyor — başka kanal deneyin";
          tvDurum(m, "hata");
          if (veri.type === "networkError") { try { TV.hls.startLoad(); } catch (e2) { } }
        }
      });
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) { v.src = url; v.play().catch(function () { }); }
    else tvDurum("Bu tarayıcı canlı HLS yayınını desteklemiyor", "hata");
  }
  hlsYukle(basla);
  var du = el("tvDugme"); if (du) du.textContent = "⏸ Duraklat";
  tvListeleriTazele();
}
function tvListeleriTazele() {
  var a = el("tvListeKutu"); if (a) a.innerHTML = tvGrupYaz();
  var b = el("tvYan"); if (b) b.innerHTML = tvYanListe();
}
function tvDurdur(sessiz) {
  if (TV.video) { try { TV.video.pause(); } catch (e) { } }
  if (TV.hls) { try { TV.hls.destroy(); } catch (e) { } TV.hls = null; }
  if (TV.video) { try { TV.video.removeAttribute("src"); TV.video.load(); } catch (e) { } }
  if (!sessiz) { tvDurum("Yayın durduruldu", ""); var du = el("tvDugme"); if (du) du.textContent = "▶ İzle"; }
  TV.i = -1;
  if (!sessiz) tvListeleriTazele();
}
function tvSessizDurdur() { if (TV.i >= 0 || TV.hls) tvDurdur(1); }
function tvAcKapa() {
  if (TV.i < 0) { // hiç kanal seçilmemişse ilk kanalı aç
    if (tvListe().length) tvOynat(0);
    return;
  }
  var v = tvHazir();
  if (v && !v.paused) { v.pause(); var d = el("tvDugme"); if (d) d.textContent = "▶ Devam"; }
  else if (v) { v.play().catch(function () { }); var d2 = el("tvDugme"); if (d2) d2.textContent = "⏸ Duraklat"; }
}
function tvSesAyarla() { var s = el("tvSes"); if (TV.video && s) TV.video.volume = (+s.value) / 100; }
function tvTamEkran() {
  var v = TV.video; if (!v) return;
  try { if (v.requestFullscreen) v.requestFullscreen(); else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen(); } catch (e) { }
}
function cizTv() {
  var L = tvListe(), G = (typeof TV_GRUPLARI !== "undefined") ? TV_GRUPLARI.length : 0;
  var h = '<p class="giris">🕋 <b>Mekke ve Medine canlı yayınları</b> ile Kur\'an TV kanalları tek yerde. ' +
    "<b>" + L.length + " kanal</b> (" + G + " bölüm). Ekran <b>tıklanınca tam ekran</b> olur; kanal isimleri sağ taraftadır. " +
    "Yayın açılmazsa kanalın kendi yayını durmuş olabilir — başka bir kanal deneyin.</p>";
  h += '<div class="tvDuzen"><div>' + tvKutu() +
    '<div class="ikiSutun">' +
    '<div class="kart"><div class="kBaslik">🕋 Mekke — Mescid-i Haram</div><p class="metin">Kâbe ve Mescid-i Haram\'dan canlı yayın: ' +
    "vakit namazları, tavaf ve cemaat görüntüleri. Sağdaki listede 1 numaralı kanal.</p>" +
    '<button class="miniBtn" onclick="tvOynat(0)">🕋 Mekke yayınını aç</button></div>' +
    '<div class="kart"><div class="kBaslik">🕌 Medine — Mescid-i Nebevî</div><p class="metin">Mescid-i Nebevî\'den canlı yayın: ' +
    "vakit namazları ve Ravza çevresi. Sağdaki listede 2 numaralı kanal.</p>" +
    '<button class="miniBtn" onclick="tvOynat(1)">🕌 Medine yayınını aç</button></div></div>' +
    '<div class="kart"><div class="kBaslik">📗 Kur\'an-ı Kerim bölümü</div><p class="metin">114 sûrenin tamamı (6236 âyet), Diyanet meali, tefsir ve ' +
    '<b>604 sayfalık klasik mushaf görünümü</b> sitenin 📗 KUR\'AN-I KERİM bölümünde.</p>' +
    '<button class="miniBtn" onclick="git(\'kuran\')">📗 Kur\'an-ı Kerim\'e git →</button></div>' +
    '</div><div class="tvYan" id="tvYan">' + tvYanListe() + "</div></div>";
  h += paylasKutu();
  return h;
}

function cizKuran() {
  if (!window.KURAN_SURELER || !window.KURAN_AYETLER) {
    krHazir(function () { if (DURUM.bolum === "kuran" && window.KURAN_AYETLER) git("kuran"); });
    return '<p class="bos">📖 Kur\'an-ı Kerim yükleniyor… (Arapça metin + Diyanet meali)</p>';
  }
  if (KR.hata) return '<p class="bos">Kur\'an verisi yüklenemedi. Site klasöründeki <b>kuran</b> klasörü yerinde mi?</p>';
  var h = '<div class="kuranUst" style="--mFont:' + krFontKacis(krMushafFontCss()) + '"><input class="kAra" id="krAra" type="search" placeholder="Sûre ara: Bakara, 36, Kadir…" oninput="krAra(this.value)" value="">' +
    '<button class="miniBtn" onclick="krSureAc(1)">📗 Fâtiha ile başla</button>' +
    '<button class="miniBtn ana" onclick="krGorunum(\'mushaf\')">🕌 Mushaf görünümü (604 sayfa)</button>' +
    '<button class="miniBtn" onclick="krKaldigim()">🔖 Kaldığım sûre</button>' +
    '<span class="sureAlt">114 sûre · 6236 âyet · Arapça + Diyanet meali + tefsir (67 sûre)</span></div>';
  h += '<div class="sureIzgara" id="krSureListe">';
  for (var i = 0; i < KURAN_SURELER.length; i++) h += sureKarti(KURAN_SURELER[i]);
  h += "</div>";
  return h;
}
function krKaldigim() {
  var n = 0;
  try { n = parseInt(localStorage.getItem("usk-kuran-sure") || "0", 10); } catch (e) { }
  krSureAc(n > 0 && n <= 114 ? n : 1);
}

/* ---------- 2) Sûre okuma ekranı ---------- */
function cizKuranSure() {
  if (!window.KURAN_SURELER || !window.KURAN_AYETLER) {
    krHazir(function () { if (DURUM.bolum === "kuran") git("kuran"); });
    return '<p class="bos">📖 Sûre yükleniyor…</p>';
  }
  var no = KR.sureNo, s = KURAN_SURELER[no - 1], ay = KURAN_AYETLER[no - 1];
  var tb = krTefsirBolumleri(no);
  var h = '<div class="kuranBas"><div>' +
    '<button class="miniBtn" onclick="KR.sureNo=0;git(\'kuran\')">← Sûre listesi</button> ' +
    '<button class="miniBtn ana" onclick="krGorunum(\'mushaf\')">🕌 Mushaf görünümü</button> ' +
    (no > 1 ? '<button class="miniBtn" onclick="krSureAc(' + (no - 1) + ')">← ' + esc(KURAN_SURELER[no - 2].ad) + '</button> ' : "") +
    (no < 114 ? '<button class="miniBtn" onclick="krSureAc(' + (no + 1) + ')">' + esc(KURAN_SURELER[no].ad) + ' →</button>' : "") +
    '</div><div class="kuranHizli">' +
    '<button class="miniBtn" onclick="krBoyut(-1)">A−</button><button class="miniBtn" onclick="krBoyut(1)">A+</button>' +
    '<span class="sureAlt" id="krYaziNot">Yazı boyutu: %100</span>' +
    '<button class="miniBtn" onclick="krTamTefsir()">📖 Sûrenin tamamı (tefsir)</button></div></div>';
  h += '<div class="bolumBas" style="margin-top:4px"><span class="bSimge">' + s.no + '</span><div>' +
    '<div class="bUst">' + esc(s.yer) + " · " + s.ayet + " âyet · " + esc(s.anlam) + '</div>' +
    '<h2>' + esc(s.ad) + ' Sûresi <span style="font-family:Amiri,serif;font-size:22px;opacity:.8">' + esc(s.arapca.replace("سُورَةُ ", "")) + "</span></h2>" +
    '<div class="bAlt" id="krTefsirNot">' + krTefsirNotMetni(no) + "</div></div></div>";
  h += '<div class="kuranMetin" id="krMetin" style="--kuranYaz:' + KR.boyut + ';--mFont:' + krFontKacis(krMushafFontCss()) + '">';
  if (no !== 9 && no !== 1) h += '<div class="besmele">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>';
  h += '<div id="krTefsirTam"></div>';
  for (var i = 0; i < ay.length; i++) {
    var a = ay[i];
    h += '<div class="ayetKart"><div class="aBas"><span class="ayetNo">' + s.ad + " " + a.n + '</span><span class="ayetMenu">' +
      '<button class="yonKucuk" onclick="krTefsirAc(' + no + "," + a.n + ')">📖 Tefsir</button>' +
      '<button class="yonKucuk" onclick="ayetPaylas(' + no + "," + a.n + ')">📋 Kopyala</button>' +
      '</span></div>' +
      '<div class="ayetAr" lang="ar" dir="rtl">' + esc(a.ar) + "</div>" +
      '<div class="ayetTr">' + esc(a.tr) + "</div>" +
      '<div id="krt-' + a.n + '"></div></div>';
  }
  h += "</div>";
  h += '<div class="kuranBas" style="justify-content:center">' +
    (no > 1 ? '<button class="miniBtn" onclick="krSureAc(' + (no - 1) + ')">← Önceki sûre</button>' : "") +
    '<button class="miniBtn" onclick="KR.sureNo=0;git(\'kuran\')">📚 Sûre listesi</button>' +
    (no < 114 ? '<button class="miniBtn" onclick="krSureAc(' + (no + 1) + ')">Sonraki sûre →</button>' : "") + "</div>";
  setTimeout(krYaziNot, 30);
  return h;
}

/* ==========================================================================
   🕌 MUSHAF GÖRÜNÜMÜ — 604 sayfa (Madanî dizilim), cüz/hizb işaretleri,
   Osmanlı mushaf geleneğinden esinli sayfa düzeni (kendi tasarımım).
   Yazı tipleri telifsiz: Şehrazade (SIL OFL) · Amiri Kur'an (OFL) · Noto Nesih (OFL).
   ========================================================================== */
var MUSHAF_GRUPLAR = [
  { id: "nesih",   ad: "📖 Nesih / mushaf hatları" },
  { id: "kiraat",  ad: "🌍 Kıraat üslupları" },
  { id: "ozel",    ad: "🎨 Özel / renkli" },
  { id: "sade",    ad: "✨ Sade / modern" },
  { id: "suslu",   ad: "🕌 Süslü / dekoratif" }
];
var MUSHAF_FONTLAR = [
  { id: "sehrazade",   g: "nesih",  ad: "Şehrazade",            not: "mushaf nesihi (varsayılan)", css: "'Mushaf Sehrazade','Mushaf Sehrazade Kalin',Georgia,serif" },
  { id: "sehrazade-k", g: "nesih",  ad: "Şehrazade Kalın",      not: "kalın nesih, uzaktan okunur", css: "'Mushaf Sehrazade Kalin','Mushaf Sehrazade',Georgia,serif" },
  { id: "amiri",       g: "nesih",  ad: "Amiri Kur'an",         not: "Kur'an için çizilmiş Amiri",   css: "'Mushaf Amiri','Mushaf Sehrazade',Georgia,serif" },
  { id: "amiri-klasik",g: "nesih",  ad: "Amiri Klasik",         not: "Amiri'nin klasik hâli",        css: "'Mushaf Amiri Klasik','Mushaf Amiri',Georgia,serif" },
  { id: "amiri-kalin", g: "nesih",  ad: "Amiri Kalın",          not: "kalın klasik nesih",           css: "'Mushaf Amiri Kalin','Mushaf Amiri',Georgia,serif" },
  { id: "nesih",       g: "nesih",  ad: "Nesih (Noto)",         not: "temiz nesih",                  css: "'Mushaf Nesih','Mushaf Sehrazade',Georgia,serif" },
  { id: "nesih-ui",    g: "nesih",  ad: "Nesih İnce",           not: "ekran için ince nesih",        css: "'Mushaf Nesih UI','Mushaf Nesih',Georgia,serif" },
  { id: "lateef",      g: "nesih",  ad: "Latif (Lateef)",       not: "SIL'in geleneksel nesihi",     css: "'Mushaf Lateef','Mushaf Sehrazade',Georgia,serif" },
  { id: "medine",      g: "nesih",  ad: "Medine Hattı",         not: "KFGQPC mushaf hattı (Medine basımı)", css: "'Mushaf Medine','Mushaf Sehrazade',Georgia,serif" },
  { id: "eski-medine", g: "nesih",  ad: "Eski Medine Mushafı",  not: "1995 eski Medine mushafı — 2 nadir işaret yedek hattan gelir", css: "'Mushaf Eski Medine','Mushaf Sehrazade',Georgia,serif" },
  { id: "me-quran",    g: "nesih",  ad: "me_quran",             not: "web için yapılmış mushaf hattı", css: "'Mushaf Mequran','Mushaf Sehrazade',Georgia,serif" },
  { id: "doori",       g: "kiraat", ad: "Dûrî hattı",           not: "KFGQPC kıraat hatlarından",    css: "'Mushaf Doori','Mushaf Sehrazade',Georgia,serif" },
  { id: "soosi",       g: "kiraat", ad: "Sûsî hattı",           not: "KFGQPC kıraat hatlarından",    css: "'Mushaf Soosi','Mushaf Sehrazade',Georgia,serif" },
  { id: "renkli",      g: "ozel",   ad: "Amiri Renkli (tecvid)",not: "işaretleri renkli gösteren mushaf hattı", css: "'Mushaf Renkli','Mushaf Amiri',Georgia,serif" },
  { id: "sade",        g: "sade",   ad: "Sade (Noto Sans)",     not: "sade, net, kolay okunur",      css: "'Mushaf Sade','Mushaf Nesih',Georgia,serif" },
  { id: "mada",        g: "sade",   ad: "Mada (sade)",          not: "ince modern Arapça",           css: "'Mushaf Mada','Mushaf Nesih',Georgia,serif" },
  { id: "ibm",         g: "sade",   ad: "IBM Plex (sade)",      not: "modern sade Arapça",           css: "'Mushaf Ibm','Mushaf Mada',Georgia,serif" },
  { id: "kufi",        g: "suslu",  ad: "Kûfî (Noto Kûfî)",     not: "eski mushaf kûfî üslubu",      css: "'Mushaf Kufi','Mushaf Nesih',Georgia,serif" },
  { id: "harmattan",   g: "suslu",  ad: "Harmattan",            not: "süslü nesih",                  css: "'Mushaf Harmattan','Mushaf Sehrazade',Georgia,serif" }
];
/* Âyet sonu rozeti stilleri */
var ROZET_STILLERI = [
  { id: "klasik",  ad: "Klasik rozet",   simge: "ﮎ" },
  { id: "madalyon",ad: "Altın madalyon", simge: "◯" },
  { id: "baklava", ad: "Baklava",        simge: "◇" },
  { id: "sade",    ad: "Sade",           simge: "( )" }
];
function rozetHTML(no) {
  var r = arapRakam(no);
  if (KR.rozet === "madalyon") return '<span class="rozetMadalyon"><i>' + r + "</i></span>";
  if (KR.rozet === "baklava")  return '<span class="rozetBaklava"><i>' + r + "</i></span>";
  if (KR.rozet === "sade")     return '<span class="aSon sadeRozet">(' + r + ")</span>";
  return '<span class="aSon">\u06DD' + r + "</span>";
}
var MUSHAF_KAGITLAR = [
  { id: "klasik",   ad: "Klasik krem", simge: "🕯️" },
  { id: "fildisi",  ad: "Fildişi",     simge: "📜" },
  { id: "kehribar", ad: "Kehribar",    simge: "🟠" },
  { id: "zumrut",   ad: "Zümrüt",      simge: "🟢" },
  { id: "bakir",    ad: "Bakır",       simge: "🟤" },
  { id: "safir",    ad: "Safir",       simge: "🔵" },
  { id: "gul",      ad: "Gül",         simge: "🌸" },
  { id: "gece",     ad: "Gece",        simge: "🌙" }
];
var ARAP_RAKAM = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function arapRakam(n) { var s = String(n), o = ""; for (var i = 0; i < s.length; i++) o += ARAP_RAKAM[+s[i]]; return o; }
function krMushafFont() { var f = MUSHAF_FONTLAR[0]; for (var i = 0; i < MUSHAF_FONTLAR.length; i++) if (MUSHAF_FONTLAR[i].id === KR.mFont) f = MUSHAF_FONTLAR[i]; return f; }
function krMushafFontCss() { return krMushafFont().css; }
function krFontKacis(s) { return String(s).replace(/"/g, "&quot;"); }

/* --- global âyet no ↔ sûre/âyet dönüşümü --- */
function krGlobalNo(sure, ayet) {
  var t = 0;
  for (var i = 0; i < sure - 1; i++) t += KURAN_AYETLER[i].length;
  return t + ayet;
}
function krSureAyet(globalNo) {
  var t = 0;
  for (var i = 0; i < KURAN_AYETLER.length; i++) {
    var n = KURAN_AYETLER[i].length;
    if (globalNo <= t + n) return { s: i + 1, a: globalNo - t };
    t += n;
  }
  return { s: 114, a: KURAN_AYETLER[113].length };
}
function krSayfaBaslangic(sure) {           /* sûrenin ilk sayfası */
  if (!window.KURAN_SAYFALAR || !window.KURAN_AYETLER) return 1;
  var hedef = krGlobalNo(sure, 1);
  for (var i = KURAN_SAYFALAR.length - 1; i >= 0; i--) if (KURAN_SAYFALAR[i].g <= hedef) return i + 1;
  return 1;
}
function krCuzSayfa(cuzNo) {
  for (var i = 0; i < KURAN_CUZLER.length; i++) if (KURAN_CUZLER[i].no === cuzNo) return krSayfaBul(KURAN_CUZLER[i].g);
  return 1;
}
function krSayfaBul(globalNo) {
  if (!window.KURAN_SAYFALAR) return 1;
  for (var i = KURAN_SAYFALAR.length - 1; i >= 0; i--) if (KURAN_SAYFALAR[i].g <= globalNo) return i + 1;
  return 1;
}

/* --- mushaf arayüz eylemleri --- */
function krGorunum(ne) {
  KR.gorunum = ne;
  if (ne === "mushaf" && !window.KURAN_SAYFALAR) {
    krDosya("sayfalar", function () { if (DURUM.bolum === "kuran" && window.KURAN_SAYFALAR) git("kuran"); });
  }
  if (ne === "mushaf" && KR.sureNo > 0 && window.KURAN_SAYFALAR) KR.sayfa = krSayfaBaslangic(KR.sureNo);
  try { localStorage.setItem("usk-kuran-gorunum", ne); } catch (e) { }
  git("kuran");
}
function krSayfaGit(n) {
  if (!window.KURAN_SAYFALAR) return;
  KR.sayfa = Math.min(KURAN_SAYFALAR.length, Math.max(1, n | 0));
  try { localStorage.setItem("usk-kuran-sayfa", String(KR.sayfa)); } catch (e) { }
  git("kuran");
}
function krSayfaKaydir(yon) {
  if (!window.KURAN_SAYFALAR) return;
  var hedef = KR.sayfa + yon;
  if (hedef < 1 || hedef > KURAN_SAYFALAR.length) return;
  krSayfaGit(hedef);
  var k = el("krMushafSar"); if (k) k.scrollIntoView({ behavior: "smooth", block: "start" });
}
function krFontSec(id) { KR.mFont = id; try { localStorage.setItem("usk-kuran-font", id); } catch (e) { } git("kuran"); }
function krRozetSec(id) { KR.rozet = id; try { localStorage.setItem("usk-kuran-rozet", id); } catch (e) { } git("kuran"); }
function krKagitSec(id) { KR.kagit = id; try { localStorage.setItem("usk-kuran-kagit", id); } catch (e) { } git("kuran"); }
function krSureyeGit(no) { if (no) krSayfaGit(krSayfaBaslangic(+no)); }
function krCuzGit(no) { if (no) krSayfaGit(krCuzSayfa(+no)); }
function krMushafKopyala() {
  if (!window.KURAN_SAYFALAR) return;
  var m = krMushafIcerik(KR.sayfa);
  if (!m) return;
  var t = "Kur'an-ı Kerim — " + m.sureAd + " Sûresi (" + m.metinSure + ")\nSayfa " + KR.sayfa + " / " + KURAN_SAYFALAR.length + "\n\n";
  for (var i = 0; i < m.ayetler.length; i++) t += m.ayetler[i].tr + " (" + m.ayetler[i].sureAd + " " + m.ayetler[i].a + ")\n\n";
  kopyala(t);
}

/* --- sayfa içeriğini hazırla --- */
function krMushafIcerik(sayfaNo) {
  if (!window.KURAN_SAYFALAR) return null;
  var i0 = sayfaNo - 1;
  var bas = KURAN_SAYFALAR[i0].g;
  var son = (i0 + 1 < KURAN_SAYFALAR.length) ? KURAN_SAYFALAR[i0 + 1].g - 1 : 6236;
  var ilk = krSureAyet(bas), sonuncu = krSureAyet(son);
  var ayetler = [], hizbler = {};
  for (var k = 0; k < KURAN_CUZLER.length; k++) hizbler[KURAN_CUZLER[k].g] = KURAN_CUZLER[k].no;
  for (var g = bas; g <= son; g++) {
    var sa = krSureAyet(g), s = KURAN_SURELER[sa.s - 1], a = KURAN_AYETLER[sa.s - 1][sa.a - 1];
    ayetler.push({ g: g, s: sa.s, a: sa.a, sureAd: s.ad, ar: a.ar.replace(/\ufeff/g, ""), tr: a.tr, yeniSure: (sa.a === 1), arapcaAd: s.arapca, yer: s.yer, ayetSayisi: s.ayet, anlam: s.anlam });
  }
  return { no: sayfaNo, ayetler: ayetler, cuz: KURAN_SAYFALAR[i0].c, sureAd: ilk.s === sonuncu.s ? KURAN_SURELER[ilk.s - 1].ad : KURAN_SURELER[ilk.s - 1].ad + " – " + KURAN_SURELER[sonuncu.s - 1].ad, metinSure: KURAN_SURELER[ilk.s - 1].ad, hizbler: hizbler };
}

/* --- mushaf sayfası çizimi --- */
function cizKuranMushaf() {
  if (!window.KURAN_SURELER || !window.KURAN_AYETLER || !window.KURAN_SAYFALAR) {
    krHazir(function () {
      krDosya("sayfalar", function () {
        if (DURUM.bolum === "kuran" && window.KURAN_SAYFALAR) git("kuran");
        else if (DURUM.bolum === "kuran" && KR.hata && el("icerik")) el("icerik").innerHTML = '<p class="bos">Mushaf verisi yüklenemedi. Site klasöründeki <b>kuran</b> klasörü yerinde mi?</p>';
      });
    });
    return '<p class="bos">🕌 Mushaf yükleniyor… (604 sayfa dizilimi)</p>';
  }
  if (!KR.sayfa) KR.sayfa = 1;
  var m = krMushafIcerik(KR.sayfa), f = krMushafFont();
  var h = '<div class="mushafSar" id="krMushafSar">' +
    '<div class="kuranHizli">' +
    '<button class="miniBtn" onclick="krSayfaKaydir(-1)">◀ Önceki</button>' +
    '<span class="sureAlt">Sayfa</span><input class="mSec mSayfaGir" type="number" min="1" max="' + KURAN_SAYFALAR.length + '" value="' + KR.sayfa + '" onchange="krSayfaGit(this.value)">' +
    '<span class="sureAlt">/ ' + KURAN_SAYFALAR.length + '</span>' +
    '<button class="miniBtn" onclick="krSayfaKaydir(1)">Sonraki ▶</button></div>' +
    '<div class="kuranHizli">' +
    '<select class="mSec genis" onchange="krSureyeGit(this.value)"><option value="">🕌 Sûreye git…</option>' +
    (function () { var o = ""; for (var i = 0; i < 114; i++) o += '<option value="' + (i + 1) + '">' + (i + 1) + ". " + esc(KURAN_SURELER[i].ad) + "</option>"; return o; })() +
    "</select>" +
    '<select class="mSec" onchange="krCuzGit(this.value)"><option value="">Cüz…</option>' +
    (function () { var o = ""; for (var i = 0; i < 30; i++) o += '<option value="' + (i + 1) + '">' + (i + 1) + ". cüz</option>"; return o; })() +
    "</select>" +
    '<button class="miniBtn" onclick="krBoyut(-1)">A−</button><button class="miniBtn" onclick="krBoyut(1)">A+</button>' +
    '<button class="miniBtn" onclick="krMushafKopyala()">📋 Sayfayı kopyala</button>' +
    '<button class="miniBtn" onclick="krGorunum(\'okuma\')">📖 Âyet âyet oku</button>' +
    "</div></div>";
  // yazı tipi + kâğıt seçimi
  h += '<div class="mushafSar musHattat"><div class="mHatSar">' +
    (function () {
      var o = "";
      for (var g = 0; g < MUSHAF_GRUPLAR.length; g++) {
        var gr = MUSHAF_GRUPLAR[g], ic = "";
        for (var i = 0; i < MUSHAF_FONTLAR.length; i++) {
          if (MUSHAF_FONTLAR[i].g !== gr.id) continue;
          ic += '<button class="miniBtn hatDugme' + (KR.mFont === MUSHAF_FONTLAR[i].id ? " ana" : "") + '" title="' + esc(MUSHAF_FONTLAR[i].not) + '" onclick="krFontSec(\'' + MUSHAF_FONTLAR[i].id + '\')">' + MUSHAF_FONTLAR[i].ad + "</button>";
        }
        if (ic) o += '<div class="mHatGrup"><span class="mHatBas">' + gr.ad + "</span>" + ic + "</div>";
      }
      return o;
    })() +
    '</div><div class="kuranHizli"><span class="sureAlt">Âyet rozeti:</span>' +
    (function () { var o = ""; for (var i = 0; i < ROZET_STILLERI.length; i++) o += '<button class="miniBtn' + (KR.rozet === ROZET_STILLERI[i].id ? " ana" : "") + '" onclick="krRozetSec(\'' + ROZET_STILLERI[i].id + '\')">' + ROZET_STILLERI[i].simge + " " + ROZET_STILLERI[i].ad + "</button>"; return o; })() +
    '</div><div class="kuranHizli"><span class="sureAlt">Kâğıt:</span>' +
    (function () { var o = ""; for (var i = 0; i < MUSHAF_KAGITLAR.length; i++) o += '<button class="miniBtn' + (KR.kagit === MUSHAF_KAGITLAR[i].id ? " ana" : "") + '" onclick="krKagitSec(\'' + MUSHAF_KAGITLAR[i].id + '\')">' + MUSHAF_KAGITLAR[i].simge + " " + MUSHAF_KAGITLAR[i].ad + "</button>"; return o; })() +
    "</div></div>";
  // sayfa
  h += '<div class="mushafKabuk"><div class="mushafSayfa" data-kagit="' + esc(KR.kagit) + '" id="krMushafSayfa" style="--mFont:' + krFontKacis(krMushafFontCss()) + ';--mBoyut:' + KR.boyut + '">';
  h += '<span class="mKose k1">' + krKoseSvg() + '</span><span class="mKose k2">' + krKoseSvg() + '</span><span class="mKose k3">' + krKoseSvg() + '</span><span class="mKose k4">' + krKoseSvg() + '</span>';
  // sûre başlığı (sayfa bir sûrenin başında ya da içinde sûre değişiyorsa)
  var basS = m.ayetler[0];
  h += '<div class="mushafBas"><div class="mSuresi">' + esc(basS.arapcaAd) + "</div>" +
    '<div class="mAdTr">' + esc(basS.sureAd) + " Sûresi · " + esc(basS.yer) + " · " + basS.ayetSayisi + " âyet</div>" +
    '<div class="mSusle"></div></div>';
  if (basS.s !== 9 && !(basS.s === 1)) h += '<div class="mushafBesmele">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>';
  // metin (tek akış, âyet sonu rozetleriyle)
  h += '<div class="mushafMetin" lang="ar" dir="rtl">';
  for (var i = 0; i < m.ayetler.length; i++) {
    var a = m.ayetler[i];
    if (i > 0 && a.yeniSure) {
      h += '</div><div class="mushafBas" style="margin:22px 0 12px"><div class="mSuresi">' + esc(a.arapcaAd) + "</div>" +
        '<div class="mAdTr">' + esc(a.sureAd) + " Sûresi · " + esc(a.yer) + " · " + a.ayetSayisi + ' âyet</div><div class="mSusle"></div></div>' +
        (a.s !== 9 ? '<div class="mushafBesmele">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>' : "") +
        '<div class="mushafMetin" lang="ar" dir="rtl">';
    }
    if (m.hizbler[a.g]) h += '<span class="hizb">۞ </span>';
    h += esc(a.ar) + " " + rozetHTML(a.a) + " ";
  }
  h += "</div>";
  h += '<div class="mushafAlt"><span>Cüz ' + m.cuz + '</span><span class="mushafNo">' + KR.sayfa + '</span><span>' + esc(m.sureAd) + "</span></div>";
  h += "</div></div>";
  h += '<div class="mushafNot">Bu sayfa düzeni Osmanlı mushaf geleneğinden esinlenerek bu site için hazırlanmıştır ' +
    '(Hayrât Neşriyat mushafının sayfa düzeni ya da fontu kopyalanmamıştır). Arapça metin: harekeli-osmanî hat ' +
    '(hareke, med, şedde ve vakıf işaretleri eksiksiz) · Meâl tefsir sekmesinde ve âyet âyet okumada. ' +
    'Sayfa dizilimi: Madanî mushaf (604 sayfa). Hattı değiştirmek için yukarıdaki <b>Hattı</b> düğmelerini kullan.</div>';
  setTimeout(function () { if (typeof krYaziNot === "function") krYaziNot(); }, 30);
  return h;
}
function krKoseSvg() {
  return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<path d="M2 18 C2 8 8 2 18 2"/><path d="M6 22 C6 12 12 6 22 6"/>' +
    '<circle cx="9" cy="9" r="2.2" fill="currentColor" stroke="none"/>' +
    '<path d="M2 26 C6 26 10 22 10 18" opacity=".8"/><path d="M26 2 C26 6 22 10 18 10" opacity=".8"/></svg>';
}

function ayetPaylas(no, ayetNo) {
  var s = KURAN_SURELER[no - 1], a = KURAN_AYETLER[no - 1][ayetNo - 1];
  kopyala(s.ad + " Sûresi " + a.n + ". âyet\n\n" + a.ar + "\n\n" + a.tr + "\n\n— Kur'an-ı Kerim (meâl: Diyanet İşleri Başkanlığı)");
}


function cizRadyo() {
  var GR = radyoGruplari("radyo");
  var h = '<p class="giris">Berber koltuğunda zaman hızla geçer. Aşağıdaki kanallardan birine dokunun, keyifli bekleyin — müzik bizden. ' +
    "<b>" + radyoListesi("radyo").length + " kanal</b> (" + GR.length + " bölüm): " + grupAdlari(GR) +
    ". Tamamı canlı olarak test edilmiştir. İslami yayınlar için 🕌 İSLAMİ YAYINLAR bölümüne bakın.</p>";
  h += radyoKutu("r", "radyo");
  h += '<div class="ikiSutun"><div class="kart"><div class="kBaslik">🕰️ Canlı Saat</div><div class="saatBuyuk" id="saatBuyuk">--:--:--</div>' +
    '<div class="saatAlt" id="saatAlt"></div></div>' +
    '<div class="kart"><div class="kBaslik">💬 Günün Sözü</div><div class="sozBuyuk" id="sozBuyuk"></div>' +
    '<div class="sozAlt">— Üstad Kenan Kuzucu</div></div></div>';
  h += '<div class="kart"><div class="kBaslik">📍 Nerede dinliyorum?</div><p class="metin">' + esc(ILETISIM.adres) +
    '</p><button class="miniBtn" onclick="git(\'iletisim\')">İletişim & Konum →</button></div>';
  h += paylasKutu();
  return h;
}

function cizIslami() {
  var GI = radyoGruplari("islami");
  var h = '<p class="giris">Bu bölüm <b>İslami yayınlar</b> içindir: Kur\'an-ı Kerim (Mekke ve Medine imamlarının okuyuşları), ' +
    "Kur\'an-ı Kerim Türkçe meal, tefsir, zikir ve salavat yayınları ile Türkçe İslami radyolar. " +
    "<b>" + radyoListesi("islami").length + " kanal</b> (" + GI.length + " bölüm): " + grupAdlari(GI) + ". Tamamı canlı test edildi.</p>";
  h += radyoKutu("i", "islami");
  h += '<div class="ikiSutun">' +
    '<div class="kart"><div class="kBaslik">🕋 Kur\'an-ı Kerim Türkçe Meal</div>' +
    '<p class="metin">Arapça okuyuşu anlamadan dinlemek isteyenler için "Kur\'an-ı Kerim Türkçe Meal" kanalı listede: ' +
    "âyet âyet Türkçe mealiyle birlikte okunur. Uygun kanal: <b>Kur\'an-ı Kerim Türkçe Meal</b> ve <b>Kur\'an ve Türkçe Meal</b>.</p></div>" +
    '<div class="kart"><div class="kBaslik">🕌 Mekke &amp; Medine İmamları</div>' +
    '<p class="metin">Haremeyn imamları ayrı ayrı kanal olarak eklendi: es-Sudeys, el-Muaykıli, eş-Şüreym, ed-Devseri, ' +
    "Buleyla, el-Cuheni, bin Humeyd (Mekke) · el-Kasım, el-Budeyr (Medine). Ayrıca <b>Mekke &amp; Medine Canlı</b> kanalı vardır.</p></div></div>";
  h += '<div class="kart"><div class="kBaslik">🎧 Nasıl dinlerim?</div><p class="metin">' +
    "Bir kanala dokunun; yayın hemen başlar. Tarayıcılar ilk açılışta sesi engelleyebilir — o durumda <b>▶ Dinle</b> düğmesine dokunun. " +
    "Sesi soldaki kaydırıcıdan ayarlayabilirsiniz. Yayın, kanal sahibinin sunucusundan gelir; site içerik barındırmaz.</p>" +
    '<button class="miniBtn" onclick="git(\'radyo\')">📻 Radyo bölümüne geç →</button></div>';
  h += paylasKutu();
  return h;
}

function kanalGrubuYaz(onek, bolum) {
  var G = radyoGruplari(bolum), h = "", no = 0;
  var cagri = (bolum === "islami") ? "oynatI" : "oynat";
  for (var g = 0; g < G.length; g++) {
    var gr = G[g], L = gr.liste || [];
    h += '<div class="kanalBas"><span class="kBasAd">' + (gr.simge || "🎵") + " " + esc(gr.ad) + "</span>" +
      '<span class="kBasSayi">' + L.length + " kanal</span></div>";
    h += '<div class="kanalGrup">';
    for (var q = 0; q < L.length; q++) {
      var i = no++;
      h += '<button class="kanal' + ((RY.onek === onek && i === RY.i) ? " caliyor" : "") + '" onclick="' + cagri + "(" + i + ')" title="' + esc(L[q][1]) + '">' +
        '<span class="kNo">' + (i + 1) + '</span><span class="kAd">' + esc(L[q][0]) + "</span>" +
        ((RY.onek === onek && i === RY.i) ? ' <span class="kCanli">CANLI</span>' : "") + "</button>";
    }
    h += "</div>";
  }
  return h;
}
function kanalCiz() {
  var ka = el("rListe"); if (ka) ka.innerHTML = kanalGrubuYaz("r", "radyo");
  var kb = el("iListe"); if (kb) kb.innerHTML = kanalGrubuYaz("i", "islami");
}

function cizKitaplar() {
  var h = '<p class="giris">Okuduğum kitaplar ve kısa notlarım. <b>' + KITAPLAR.length + ' kitap</b> kayıtlı. ' +
    "Kitap önerilerinizi ve kendi listelerinizi gönderebilirsiniz.</p>";
  if (!KITAPLAR.length) {
    h += '<div class="uyari">📖 Bu bölüme henüz kitap eklenmedi. Yönetim panelinden (🛠 → ➕ İçerik Ekle → 📖 Okuduğum kitap) ' +
      "kitap adı, yazar, tür ve kısa not yazarak ekleyebilirsiniz.</div>";
  } else {
    h += '<div class="kitaplarIzgara">';
    for (var i = 0; i < KITAPLAR.length; i++) {
      var k = KITAPLAR[i];
      h += '<div class="kart kitapKart" style="--i:' + i + '" onclick="kitapAc(' + i + ')" title="Kitabın özetini aç">' +
        '<div class="kitapAd">📖 ' + esc(k.ad || "") + "</div>" +
        (k.yazar ? '<div class="kitapYazar">✍️ ' + esc(k.yazar) + "</div>" : "") +
        (k.tur ? '<div class="kitapTur">🏷️ ' + esc(k.tur) + "</div>" : "") +
        (k.tarih ? '<div class="kitapTur">📅 ' + esc(k.tarih) + "</div>" : "") +
        (k.not ? '<p class="metin">' + esc(k.not) + "</p>" : "") +
        '<div class="kitapAc">Kitabın özetini oku →</div></div>';
    }
    h += "</div>";
  }
  h += paylasKutu();
  return h;
}

function paragraflariYaz(p) {
  if (!p) return "";
  if (Object.prototype.toString.call(p) === "[object Array]") {
    var h = "";
    for (var i = 0; i < p.length; i++) h += "<p>" + esc(p[i]) + "</p>";
    return h;
  }
  var d = String(p).split(/\n\s*\n/), s = "";
  for (var k = 0; k < d.length; k++) s += "<p>" + esc(d[k]) + "</p>";
  return s;
}
function kitapAc(i) {
  var k = KITAPLAR[i]; if (!k) return;
  var h = '<div class="kPerde" onclick="kitapKapat()"></div><div class="kKutu">' +
    '<div class="kBas"><span>📖 ' + esc(k.ad || "") + '</span><button class="minumBtn" onclick="kitapKapat()">✕ Kapat</button></div>' +
    '<div class="kAlt">' + (k.yazar ? "✍️ " + esc(k.yazar) : "") + (k.tur ? " · 🏷️ " + esc(k.tur) : "") +
    (k.tarih ? " · 📅 " + esc(k.tarih) : "") + "</div>" +
    (k.not ? '<p class="metin kitapNot">' + esc(k.not) + "</p>" : "") +
    '<div class="kOzet">' + (paragraflariYaz(k.ozet) || '<p class="soluk">Bu kitabın özeti henüz yazılmadı. ' +
      "Yönetim panelinden ekleyebilirsiniz (🛠 → ➕ İçerik Ekle → 📖 Okuduğum kitap → Kitabın özeti).</p>") + "</div>" +
    '<div class="kDugmeler"><button class="miniBtn" onclick="kitapKapat()">Kapat</button></div></div>';
  var kap = document.createElement("div");
  kap.id = "kitapPerde"; kap.className = "kitapPerde";
  kap.innerHTML = h;
  document.body.appendChild(kap);
  document.body.style.overflow = "hidden";
}
function kitapKapat() {
  var k = el("kitapPerde"); if (k) k.parentNode.removeChild(k);
  document.body.style.overflow = "";
}

function cizSiirler() {
  var h = '<p class="giris">Kaleminden dökülen dizeler. Aşağıdaki şiirler <b>örnek</b> olarak yerleştirildi; ' +
    "kendi şiirlerinizi gönderin, birebir bunların yerine işlenir.</p>";
  h += '<div class="uyari">✍️ Bu bölümdeki 6 şiir tasarım örneğidir. Şiirlerinizi WhatsApp ile gönderin, aynı güzellikte işleyelim.</div>';
  for (var i = 0; i < SIIRLER.length; i++) {
    var s = SIIRLER[i];
    h += '<div class="kart siirKart" style="--i:' + i + '"><div class="siirBas"><span class="siirNo">' + (i + 1) + "</span>" +
      "<h3>" + esc(s.ad) + '</h3><span class="etiket">' + esc(s.tur) + "</span></div><div class=\"siirGovde\">";
    for (var j = 0; j < s.dize.length; j++) h += "<p>" + esc(s.dize[j]) + "</p>";
    h += '</div><div class="siirAlt">— Üstad Kenan Kuzucu</div></div>';
  }
  h += paylasKutu();
  h += '<div class="kart cta"><div class="kBaslik">🕊️ Şiirlerinizi Gönderin</div><p class="metin">Şiir dosyanızı ya da yazılı hâlini gönderin; ' +
    "hepsi bu sayfaya, kendi adıyla ve tarihiyle işlenir.</p>" +
    '<a class="anaBtn" href="' + ILETISIM.whatsapp + '" target="_blank" rel="noopener">WhatsApp ile Gönder</a></div>';
  return h;
}

function cizMakaleler() {
  var h = '<p class="giris">Düşünen, sorgulayan ve yazan bir kalem. İlk makale <b>Üstad Kenan</b>\'ın kendi yazısıdır; ' +
    "diğer ikisi tasarımı göstermek için <b>örnek</b> olarak eklenmiştir.</p>";
  for (var i = 0; i < MAKALELER.length; i++) {
    var m = MAKALELER[i];
    h += '<div class="kart makale"><div class="makaleBas"><span class="makaleNo">' + (i + 1) + "</span>" +
      "<h3>" + esc(m.ad) + '</h3><span class="etiket' + (m.tur === "KENDİ YAZISI" ? " altin" : "") + '">' + esc(m.tur) + "</span></div>" +
      '<p class="ozet">' + esc(m.ozet) + "</p><div class=\"makaleGovde\">";
    for (var j = 0; j < m.paragraf.length; j++) h += "<p>" + esc(m.paragraf[j]) + "</p>";
    h += '</div><div class="siirAlt">— Üstad Kenan Kuzucu · ' + m.paragraf.length + " paragraf</div></div>";
  }
  h += paylasKutu();
  return h;
}

function cizMektuplar() {
  var h = '<p class="giris">Kalemden çıkan mektuplar. Kenan “mektup” başlığıyla yazdığı her metin buraya, sıra numarasıyla işlenir.</p>';
  if (!MEKTUPLAR.length) {
    h += '<div class="kart"><div class="kBaslik">✉️ Mektuplar bölümü hazır</div><p class="metin">İlk mektubunuzu gönderin, ' +
      "hemen bu sayfaya eklensin.</p></div>";
  }
  for (var i = 0; i < MEKTUPLAR.length; i++) {
    var m = MEKTUPLAR[i];
    h += '<div class="kart makale mektup"><div class="makaleBas"><span class="makaleNo">' + (i + 1) + "</span>" +
      "<h3>" + esc(m.ad) + '</h3><span class="etiket' + (m.tur === "ÖRNEK" ? "" : " altin") + '">' + esc(m.tur) + "</span></div>" +
      '<div class="makaleGovde">';
    for (var j2 = 0; j2 < m.paragraf.length; j2++) h += "<p>" + esc(m.paragraf[j2]) + "</p>";
    h += '</div><div class="siirAlt">— Üstad Kenan Kuzucu' + (m.tarih ? " · " + esc(m.tarih) : "") + "</div></div>";
  }
  h += '<div class="kart cta"><div class="kBaslik">✉️ Mektubunuzu Gönderin</div><p class="metin">Kime yazdığınızı ve metni gönderin; ' +
    "mektup, sıra numarası ve tarihiyle bu bölüme işlenir.</p>" +
    '<a class="anaBtn" href="' + ILETISIM.whatsapp + '" target="_blank" rel="noopener">WhatsApp ile Gönder</a></div>';
  h += paylasKutu();
  return h;
}

function cizEserler() {
  var h = '<p class="giris">Estetiğin ve teknolojinin yanında bir de kalemi var: kitaplar, film senaryoları ve şiirler. ' +
    "Sözü de bir sanat gibi işler.</p>";
  h += '<div class="sayiSerit">';
  for (var k = 0; k < ESER_SAYI.length; k++)
    h += '<div class="sayiKutu"><div class="sSayi">' + (ESER_SAYI[k].metin || ESER_SAYI[k].sayi) + "</div><div class=\"sAd\">" + esc(ESER_SAYI[k].ad) + "</div></div>";
  h += "</div>";
  h += '<div class="kitapSayiNot">📚 Bu bölümde şu an <b>' + ESERLER.length + "</b> eser listeleniyor — yeni kitaplar eklendikçe bu sayı kendiliğinden artar.</div>";
  h += '<div class="kitapIzgara">';
  var romen = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX"];
  for (var i = 0; i < ESERLER.length; i++) {
    var e = ESERLER[i];
    var kapakVar = e.kapak ? String(e.kapak).replace(/^\/+/, "") : "";
    var durum = e.durum || "✅ Yayında";
    var durumAd = String(durum).replace(/[✅🖨️📝🖋️]\s*/g, "");
    h += '<div class="kitapKart">';
    if (kapakVar) h += '<div class="kitapKapakFoto"><img src="' + esc(kapakVar) + '" alt="' + esc(e.ad) + ' kapak" loading="lazy"></div>';
    else h += '<div class="kitapKapak"><span class="kitapRomen">' + (romen[i] || (i + 1)) + "</span>" +
      '<span class="kitapAd">' + esc(e.ad) + '</span><span class="kitapCizgi"></span><span class="kitapAlt">ÜSTAD KENAN KUZUCU</span></div>';
    h += '<div class="kitapBilgi">';
    h += '<div class="kitapUst"><div class="etiket">' + esc(e.tur || "Kitap") + '</div><span class="kitapDurum">' + esc(durum) + "</span></div>";
    h += '<h3 class="kitapBaslik">' + esc(e.ad) + "</h3>";
    if (e.yil || e.sayfa) h += '<div class="kitapMeta">' + (e.yil ? "🗓️ " + esc(e.yil) : "") + (e.sayfa ? " · 📄 " + esc(e.sayfa) + " sayfa" : "") + "</div>";
    if (e.not) h += '<p class="kitapOzet">' + esc(e.not) + "</p>";
    if (e.aciklama && e.aciklama.length) h += '<div class="kitapAlan"><div class="kitapAlanBas" onclick="eserAc(this)">📖 Detaylı tanıtım</div><div class="kitapAlanMetin">' + paragraflariYaz(e.aciklama) + "</div></div>";
    h += '<div class="onsuzKutu"><div class="onsuzBas" onclick="eserAc(this)">📝 ÖNSÖZ</div>' +
      (e.onsuz && e.onsuz.length ? '<div class="onsuzMetin">' + paragraflariYaz(e.onsuz) + "</div>"
        : '<div class="soluk kucuk">Bu eserin önsözü henüz yayınlanmadı.</div>') + "</div>";
    if (e.link) h += '<div class="kitapLink"><a class="miniBtn" href="' + esc(e.link) + '" target="_blank" rel="noopener">🔗 Kitaba git</a></div>';
    h += "</div></div>";
  }
  h += "</div>";
  h += '<div class="kart siparisKart"><div class="kBaslik">🛒 Sipariş ve Teslim</div><p class="metin">' +
    "<b>Sipariş için iletişim bölümünü kullanın.</b> Kitaplarımız <b>PDF formatında</b> teslim edilecektir. " +
    "Bilgi ve sipariş: <b>" + esc(ILETISIM.cep || "") + "</b> · İş: " + esc(ILETISIM.isTel || "") + "</p>" +
    '<div class="dugmeSira"><a class="miniBtn" href="' + ILETISIM.whatsapp + '" target="_blank" rel="noopener">💬 WhatsApp ile Sipariş</a>' +
    '<button class="miniBtn" onclick="git(\'iletisim\')">📞 İletişim ve Konum →</button></div></div>';
  h += '<div class="kart"><div class="kBaslik">🎬 12 Film Senaryosu</div><p class="metin">Sinema ve dizi projeleri için yazılmış ' +
    "12 özgün senaryo bulunmaktadır. Yapımcı ve yönetmenler için senaryo dosyaları talep üzerine paylaşılır.</p>" +
    '<a class="miniBtn" href="' + ILETISIM.whatsapp + '" target="_blank" rel="noopener">Bilgi İçin Yazın</a></div>';
  h += paylasKutu();
  return h;
}

/* kitap kartındaki açılır kapanır bölümler */
function eserAc(bas) {
  var k = bas.parentNode;
  if (k) k.classList.toggle("acik");
}
function cizSosyal() {
  var h = '<p class="giris">Sosyal medya hesapları ve iletişim kanalları — hepsi tek yerde.</p><div class="sosyalIzgara">';
  for (var i = 0; i < SOSYAL.length; i++) {
    var s = SOSYAL[i];
    h += '<a class="sosyalKart" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
      '<img class="sIkon" src="' + esc(s.ikon) + '" alt="' + esc(s.ad) + '">' +
      '<div class="sBilgi"><div class="sAd">' + esc(s.ad) + '</div><div class="sHesap">' + esc(s.hesap) + "</div>" +
      '<div class="sNot">' + esc(s.not) + "</div></div><span class=\"sOk\">↗</span></a>";
  }
  h += "</div>";
  h += '<div class="kart"><div class="kBaslik">📣 Bu Sayfayı Paylaş</div><div class="paylasSatir" id="paylasSatir"></div></div>';
  return h;
}

function cizTanitim() {
  var h = '<div class="ikiSutun tanitimUst">' +
    '<div class="kart portreKart"><img class="portreResim" src="foto/portre-resmi.jpg" alt="Üstad Kenan Kuzucu">' +
    '<div class="portreAlt"><div class="pAd">ÜSTAD KENAN KUZUCU</div><div class="pUnvan">' + esc(KISI.unvan) + "</div>" +
    '<div class="pUnvan2">' + esc(KISI.altUnvan) + '</div></div></div>' +
    '<div class="kart"><div class="kBaslik">💈 ' + esc(KISI.isletme) + "</div>" +
    '<p class="metin">Selimiye Mahallesi\'nde, Gaziantep Şehitkamil\'de hizmet veren erkek kuaförü. Ustura sakal, ' +
    "saç ve sakal kesimi, boyama, cilt bakımı, perma, keratin bakımı ve damat tıraşı; hepsi titizlik ve hijyenle.</p>" +
    '<div class="satirListe">';
  for (var i = 0; i < HIZMETLER.length; i++) {
    var z = HIZMETLER[i];
    h += '<div class="satir"><span class="satAd">' + esc(z[0]) + '<em> · ' + esc(z[1]) + "</em></span>" +
      '<span class="satFiyat">' + (z[3] ? '<s>' + esc(z[3]) + "</s> " : "") + esc(z[2]) + "</span></div>";
  }
  h += "</div>";
  for (var j = 0; j < SAATLER.length; j++)
    h += '<div class="saatSatir"><span>' + esc(SAATLER[j][0]) + "</span><b>" + esc(SAATLER[j][1]) + "</b></div>";
  h += '<div class="dugmeSatir"><a class="anaBtn" href="' + ILETISIM.whatsapp + '" target="_blank" rel="noopener">💬 WhatsApp Randevu</a>' +
    '<a class="miniBtn" href="tel:' + ILETISIM.cepTel + '">📞 ' + esc(ILETISIM.cep) + "</a></div></div></div>";

  h += '<div class="kart bioKart"><div class="kBaslik">📖 BİYOGRAFİ — Tam Metin</div>' +
    '<div class="bioUnvan">' + esc(BIO_BASLIK.join(" • ")) + "</div>" +
    '<p class="kucuk">Kenan Kuzucu\'nun kendi kaleme aldığı resmî biyografi metni, başlıklarıyla birlikte olduğu gibi yayımlanmaktadır.</p>';
  for (var b = 0; b < BIO_TAM.length; b++) {
    h += '<div class="bioBolum"><div class="bioBas">' + esc(BIO_TAM[b].bas) + "</div>";
    if (BIO_TAM[b].paragraf)
      for (var bp = 0; bp < BIO_TAM[b].paragraf.length; bp++) h += '<p class="metin">' + esc(BIO_TAM[b].paragraf[bp]) + "</p>";
    if (BIO_TAM[b].cift) {
      h += '<div class="bioCift">';
      for (var c = 0; c < BIO_TAM[b].cift.length; c++)
        h += '<div class="ciftSatir"><span>' + esc(BIO_TAM[b].cift[c][0]) + "</span><b>" + esc(BIO_TAM[b].cift[c][1]) + "</b></div>";
      h += "</div>";
    }
    if (BIO_TAM[b].madde) {
      h += '<ul class="madde">';
      for (var md = 0; md < BIO_TAM[b].madde.length; md++) h += "<li>" + esc(BIO_TAM[b].madde[md]) + "</li>";
      h += "</ul>";
    }
    if (BIO_TAM[b].alinti) h += '<blockquote class="bioAlinti">“' + esc(BIO_TAM[b].alinti) + '”</blockquote>';
    if (BIO_TAM[b].devam)
      for (var dv = 0; dv < BIO_TAM[b].devam.length; dv++) h += '<p class="metin">' + esc(BIO_TAM[b].devam[dv]) + "</p>";
    h += "</div>";
  }
  h += '<p class="kucuk bioDipnot">' + esc(BIO_DIPNOT) + "</p>";
  h += "</div>";

  h += '<div class="kart"><div class="kBaslik">🧭 Yaşam Hattı</div><div class="zaman">';
  var hat = [["1981", "Ankara / Çankaya\'da doğdu"], ["Çocukluk", "Adana / Ceyhan\'da büyüdü"],
    ["Köken", "Şanlıurfa / Halfeti"], ["Meslek", "Kuaförlük ve saç tasarımı — usta öğretici"],
    ["Teknoloji", "Python, Kali Linux, GitHub — siber güvenlik ve yazılım"],
    ["Kalem", "5 kitap, 12 film senaryosu ve şiirler"], ["Bugün", "Gaziantep / Şehitkamil · ÜSTAD SALON KENAN"]];
  for (var t = 0; t < hat.length; t++)
    h += '<div class="zamanSatir"><span class="zYil">' + esc(hat[t][0]) + "</span><span class=\"zMetin\">" + esc(hat[t][1]) + "</span></div>";
  h += "</div></div>";

  h += '<div class="kart"><div class="kBaslik">🧿 Kimlik</div><div class="kimlikIzgara">';
  for (var q = 0; q < KIMLIK.length; q++)
    h += '<div class="kimlikKutu"><span>' + esc(KIMLIK[q][0]) + "</span><b>" + esc(KIMLIK[q][1]) + "</b></div>";
  h += "</div></div>";

  h += paylasKutu();
  return h;
}

function cizEgitim() {
  var h = '<p class="giris">Bugüne kadar alınan belgeler, sertifikalar ve rozetler. Toplam <b>' + TOPLAM_BELGE + " belge</b>.</p>";
  h += '<div class="sayiSerit"><div class="sayiKutu"><div class="sSayi">' + MEB.sayi + '</div><div class="sAd">MEB Başarı Belgesi</div></div>' +
    '<div class="sayiKutu"><div class="sSayi">' + UNIVERSITELER.sayi + '</div><div class="sAd">Üniversite Sertifikası</div></div>' +
    '<div class="sayiKutu"><div class="sSayi">' + AKADEMILER.sayi + '</div><div class="sAd">Akademi Sertifikası / Rozeti</div></div>' +
    '<div class="sayiKutu"><div class="sSayi">' + TOPLAM_BELGE + '</div><div class="sAd">Genel Toplam</div></div></div>';
  h += '<div class="kart"><div class="kBaslik">🏛️ ' + esc(MEB.baslik) + '</div><p class="metin">T.C. Millî Eğitim Bakanlığı onaylı ' +
    MEB.sayi + " adet başarı belgesi bulunmaktadır.</p></div>";
  function tablo(b) {
    var s = '<div class="kart"><div class="kBaslik">🎓 ' + esc(b.baslik) + " · <b>" + b.sayi + "</b></div><div class=\"tabloListe\">";
    for (var i = 0; i < b.liste.length; i++)
      s += '<div class="tabloSatir"><span>' + esc(b.liste[i][0]) + '</span><b>' + b.liste[i][1] + "</b></div>";
    s += "</div></div>";
    return s;
  }
  h += tablo(UNIVERSITELER);
  h += tablo(AKADEMILER);
  h += '<div class="kart"><div class="kBaslik">🤖 ' + esc(AI_GUVENLIK.baslik) + " · <b>" + AI_GUVENLIK.sayi + "</b></div>" +
    '<ul class="madde">';
  for (var ag = 0; ag < AI_GUVENLIK.liste.length; ag++) h += "<li>" + esc(AI_GUVENLIK.liste[ag]) + "</li>";
  h += '</ul><p class="kucuk">' + esc(AI_GUVENLIK.not) + "</p></div>";

  h += '<div class="kart"><div class="kBaslik">📜 Mesleki Uzmanlık Belgeleri</div><ul class="madde">';
  for (var i = 0; i < MESLEKI_BELGE.length; i++) h += "<li>" + esc(MESLEKI_BELGE[i]) + "</li>";
  h += "</ul></div>";
  h += paylasKutu();
  return h;
}

function cizGaleri() {
  var h = '<p class="giris">Salondan <b>' + MODELLER.length + " saç modeli</b>. Büyütmek için fotoğrafa dokunun.</p><div class=\"galeri\">";
  for (var i = 0; i < MODELLER.length; i++)
    h += '<figure class="gKart" onclick="buyut(\'foto/modeller/' + MODELLER[i][0] + '\',\'' + esc(MODELLER[i][1]) + '\')">' +
      '<img src="foto/modeller/' + MODELLER[i][0] + '" alt="' + esc(MODELLER[i][1]) + '" loading="lazy">' +
      '<figcaption><span class="gNo">' + (i + 1) + "</span>" + esc(MODELLER[i][1]) + "</figcaption></figure>";
  h += "</div>";
  h += '<div class="kart cta"><div class="kBaslik">📸 Kendi Modeliniz mi?</div><p class="metin">Salonda çekilmiş fotoğraflarınızı gönderin, ' +
    "galeriye ekleyelim.</p><a class=\"anaBtn\" href=\"" + ILETISIM.whatsapp + "\" target=\"_blank\" rel=\"noopener\">Fotoğraf Gönder</a></div>";
  h += paylasKutu();
  return h;
}

function cizLogo() {
  var h = '<p class="giris">Logolar, Üstad Kenan\'ın kendi fotoğrafından üretildi — <b>' + LOGOLAR.length +
    " zarif varyant</b>. Beğendiğinizi tabelada, kartvizitte ve sosyal medyada kullanabilirsiniz.</p>";
  h += '<div class="logoIzgara">';
  for (var i = 0; i < LOGOLAR.length; i++)
    h += '<div class="logoKart"><img src="' + esc(LOGOLAR[i][0]) + '" alt="' + esc(LOGOLAR[i][1]) +
      '" onclick="buyut(\'' + esc(LOGOLAR[i][0]) + '\',\'' + esc(LOGOLAR[i][1]) + '\')">' +
      '<div class="logoAd">' + esc(LOGOLAR[i][1]) + '</div><div class="logoNot">' + esc(LOGOLAR[i][2]) + "</div>" +
      '<a class="miniBtn" href="' + esc(LOGOLAR[i][0]) + '" download>⬇ İndir (PNG)</a></div>';
  h += "</div>";
  h += '<div class="kart"><div class="kBaslik">🖼️ Künye</div><div class="kunye">' +
    '<div class="kunyeSatir"><span>Logo tasarımı</span><b>Üstad Kenan Kuzucu portresinden üretildi</b></div>' +
    '<div class="kunyeSatir"><span>Varyantlar</span><b>Altın Madalyon · Zümrüt Arma · Mühür · Kalem & Makas</b></div>' +
    '<div class="kunyeSatir"><span>Kullanım</span><b>Tabela, kartvizit, sosyal medya, evrak</b></div>' +
    '<div class="kunyeSatir"><span>Favicon</span><b>logo/favicon.png</b></div>' +
    '<div class="kunyeSatir"><span>Şeffaf zemin</span><b>Evet — PNG dosyalarında arka plan yoktur</b></div>' +
    "</div></div>";
  h += paylasKutu();
  return h;
}

function cizIletisim() {
  var h = '<p class="giris">Randevu, kitap siparişi, iş birliği ya da sadece bir selam — her kanal aşağıda.</p>';
  h += '<div class="kart siparisKart"><div class="kBaslik">📚 KİTAP SİPARİŞİ ve TESLİM</div>' +
    "<p class=\"metin\">Kitap siparişleriniz için lütfen <b>iletişim bilgilerinden</b> bize ulaşın. " +
    "<b>Kitaplarımız PDF formatında teslim edilecektir.</b> Sipariş sonrası dosyanız WhatsApp ya da e-posta ile gönderilir.</p>" +
    '<div class="dugmeSira"><a class="miniBtn" href="' + ILETISIM.whatsapp + '" target="_blank" rel="noopener">💬 WhatsApp ile Sipariş Ver</a>' +
    '<a class="miniBtn" href="mailto:' + esc(ILETISIM.eposta) + '?subject=Kitap%20Sipari%C5%9Fi">✉️ E-posta ile Sipariş</a>' +
    '<button class="miniBtn" onclick="git(\'eserler\')">📚 Kitapları Gör →</button></div></div>';
  h += '<div class="iletisimIzgara">';
  var kartlar = [
    ["💬", "WhatsApp / Cep", ILETISIM.cep, ILETISIM.whatsapp],
    ["📞", "İş Telefonu", ILETISIM.isTel, "tel:" + ILETISIM.isTelTel],
    ["✉️", "E-posta", ILETISIM.eposta, "mailto:" + ILETISIM.eposta],
    ["📍", "Adres", ILETISIM.adres, ILETISIM.harita]
  ];
  for (var i = 0; i < kartlar.length; i++)
    h += '<a class="iletisimKart" href="' + esc(kartlar[i][3]) + '" target="_blank" rel="noopener"><span class="iSimge">' +
      kartlar[i][0] + '</span><div><div class="iAd">' + esc(kartlar[i][1]) + '</div><div class="iDeger">' + esc(kartlar[i][2]) + "</div></div></a>";
  h += "</div>";
  h += '<div class="kart"><div class="kBaslik">💬 Mesaj & Şiir İsteği Gönderin</div>' +
    '<div class="formSatir"><input id="fAd" placeholder="Adınız" autocomplete="name">' +
    '<input id="fKonu" placeholder="Konu (randevu, şiir, tebrik…)"></div>' +
    '<textarea id="fMesaj" rows="4" placeholder="Mesajınız..."></textarea>' +
    '<div class="dugmeSatir"><button class="anaBtn" onclick="mesajGonder()">WhatsApp\'tan Gönder</button>' +
    '<button class="miniBtn" onclick="el(\'fAd\').value=\'\';el(\'fKonu\').value=\'\';el(\'fMesaj\').value=\'\'">Temizle</button></div>' +
    '<p class="kucuk">Mesaj gönderilirken WhatsApp açılır; orada son kez kontrol edip yollayabilirsiniz.</p></div>';
  h += '<div class="kart"><div class="kBaslik">🗺️ Konum</div><p class="metin">' + esc(KISI.isletme) + " — " + esc(ILETISIM.adres) + "</p>" +
    '<a class="anaBtn" href="' + ILETISIM.harita + '" target="_blank" rel="noopener">🧭 Yol Tarifi Al</a></div>';
  if (window.uyelikKutu) { try { h += window.uyelikKutu(); } catch (e) { } }
  h += paylasKutu();
  return h;
}

function paylasKutu() {
  return '<div class="kart"><div class="kBaslik">🔗 Paylaş</div><div class="paylasSatir" id="paylasSatir"></div></div>';
}

/* ---------------- CANLI RADYO ------------------------------------------ */
/* ---- RADYO / İSLAMİ OYNATICI (iki bölüm, tek ses) ----------------------
   Her bölümün kendi oynatıcısı ve kendi kanal listesi var:
     📻 RADYO  → ön ek "r"  → KANALLAR
     🕌 İSLAMİ → ön ek "i"  → ISLAMI_KANALLAR                                    */
var RY = { i: -1, ses: null, caliyor: 0, onek: "r", liste: [], hls: null, son: { r: -1, i: -1 } };

function radyoGruplari(bolum) {
  if (typeof KANAL_GRUPLARI === "undefined") return [];
  var l = [];
  for (var i = 0; i < KANAL_GRUPLARI.length; i++)
    if ((KANAL_GRUPLARI[i].bolum || "radyo") === bolum) l.push(KANAL_GRUPLARI[i]);
  return l;
}
function radyoListesi(bolum) {
  if (bolum === "islami") return (typeof ISLAMI_KANALLAR !== "undefined") ? ISLAMI_KANALLAR : [];
  return (typeof KANALLAR !== "undefined") ? KANALLAR : [];
}
function sesKur() {
  if (RY.ses) return RY.ses;
  var a = new Audio(); a.preload = "none"; a.volume = 0.6;
  a.addEventListener("playing", function () { RY.caliyor = 1; radyoDurum("▶ Çalıyor: " + (RY.liste[RY.i] ? RY.liste[RY.i][0] : ""), "canli"); });
  a.addEventListener("error", function () {
    RY.caliyor = 0;
    var k = a.error ? a.error.code : 0, m = "Kanal açılamadı — başka bir kanal deneyin";
    if (k === 4) m = "Bu kanalın yayın biçimi bu tarayıcıda çalmıyor — başka bir kanal deneyin";
    else if (k === 2) m = "Ağ hatası: kanal yayınına ulaşılamadı (internet?)";
    else if (k === 3) m = "Yayın bozuk geldi — başka bir kanal deneyin";
    radyoDurum(m, "hata");
  });
  a.addEventListener("waiting", function () { radyoDurum("Yayın yükleniyor...", ""); });
  RY.ses = a; return a;
}
function hlsYukle(geriCagir) {
  if (window.Hls) { geriCagir(window.Hls); return; }
  var s = document.createElement("script");
  s.src = "hls.min.js";
  s.onload = function () { geriCagir(window.Hls); };
  s.onerror = function () { radyoDurum("HLS oynatıcı (hls.min.js) bulunamadı — site klasöründe olmalı", "hata"); geriCagir(null); };
  document.head.appendChild(s);
}
function hlsKapat() { if (RY.hls) { try { RY.hls.destroy(); } catch (e) { } RY.hls = null; } }

function digerBolumSifirla(onek) {
  var ob = (onek === "r") ? "i" : "r";
  var d = el(ob + "Durum"); if (d) { d.textContent = "Yayın başlatılmadı"; d.className = "rDurum "; }
  var b = el(ob + "Dugme"); if (b) b.textContent = "▶ Dinle";
}

/* liste: hangi bölümün kanalları · onek: "r" ya da "i" */
function yayinBasla(liste, i, onek) {
  if (!liste || !liste[i]) return;
  var a = sesKur();
  RY.liste = liste; RY.i = i; RY.onek = onek; RY.son[onek] = i;
  digerBolumSifirla(onek);
  var ad = liste[i][0], url = liste[i][1];
  hlsKapat();
  if (/\.m3u8($|\?)/i.test(url)) {
    /* HLS yayını: önce hls.js (her sunucuda çalışır), olmazsa tarayıcının kendi desteği */
    radyoDurum("HLS yayını hazırlanıyor: " + ad, "");
    hlsYukle(function (Hls) {
      if (Hls && Hls.isSupported()) {
        try { a.removeAttribute("src"); a.load(); } catch (e) { }
        var h = new Hls({ enableWorker: true, lowLatencyMode: false, maxBufferLength: 20, manifestLoadingMaxRetry: 3 });
        RY.hls = h;
        h.on(Hls.Events.ERROR, function (ev, d) {
          if (d && d.fatal) { radyoDurum("HLS kanalı açılamadı — başka bir kanal deneyin", "hata"); }
        });
        h.loadSource(url);
        h.attachMedia(a);
        var p = a.play();
        if (p && p.catch) p.catch(function () { radyoDurum("Tarayıcı otomatik çalmayı engelledi — ▶ düğmesine dokunun", ""); });
      } else {
        /* hls.js yok → tarayıcının kendi HLS desteği */
        if (!a.canPlayType("application/vnd.apple.mpegurl")) { radyoDurum("Bu tarayıcı HLS yayınını oynatamıyor — başka kanal deneyin", "hata"); return; }
        try { a.src = url; } catch (e) { }
        var p2 = a.play();
        if (p2 && p2.catch) p2.catch(function () { radyoDurum("Tarayıcı otomatik çalmayı engelledi — ▶ düğmesine dokunun", ""); });
      }
    });
    kanalCiz(); return;
  } else {
    try { a.src = url; } catch (e) { }
  }
  var p = a.play();
  if (p && p.catch) p.catch(function () { radyoDurum("Tarayıcı otomatik çalmayı engelledi — ▶ düğmesine dokunun", ""); });
  radyoDurum("Bağlanıyor: " + ad, "");
  kanalCiz();
}
function oynat(i) { yayinBasla(radyoListesi("radyo"), i, "r"); }    /* 📻 RADYO bölümü */
function oynatI(i) { yayinBasla(radyoListesi("islami"), i, "i"); }  /* 🕌 İSLAMİ bölümü */

function radyoAcKapa(onek) {
  onek = onek || RY.onek || "r";
  var a = sesKur();
  if (RY.onek !== onek) {                     /* diğer bölümün oynatıcısı → o bölümü başlat */
    var s = RY.son[onek]; yayinBasla(radyoListesi(onek), (s < 0 ? 0 : s), onek); return;
  }
  if (RY.i < 0) { yayinBasla(radyoListesi(onek), 0, onek); return; }
  if (RY.caliyor && !a.paused) {
    a.pause(); RY.caliyor = 0; radyoDurum("Duraklatıldı", "");
    var b = el(onek + "Dugme"); if (b) b.textContent = "▶ Dinle";
  } else { yayinBasla(RY.liste, RY.i, onek); }
}
function radyoDurdur(onek) {
  var on = onek || RY.onek || "r";
  hlsKapat();
  if (RY.ses) { RY.ses.pause(); try { RY.ses.currentTime = 0; } catch (e) { } }
  RY.caliyor = 0; RY.i = -1; kanalCiz(); radyoDurum("Yayın durduruldu", "");
  var b = el(on + "Dugme"); if (b) b.textContent = "▶ Dinle";
}
function sesAyarla(onek) { var a = sesKur(); var s = el((onek || RY.onek || "r") + "Ses"); a.volume = ((s ? s.value : 60) || 60) / 100; }
function radyoDurum(metin, sinif) {
  var on = RY.onek || "r";
  var d = el(on + "Durum"); if (!d) return;
  d.textContent = metin; d.className = "rDurum " + (sinif || "");
  var k = el(on + "Kanal"); if (k && RY.i >= 0 && RY.liste[RY.i]) k.textContent = RY.liste[RY.i][0];
  var b = el(on + "Dugme"); if (b) b.textContent = (RY.caliyor && RY.ses && !RY.ses.paused) ? "⏸ Duraklat" : "▶ Dinle";
}

/* ---------------- SAAT, SÖZ, ARAMA ------------------------------------- */
function saatGuncelle() {
  var d = new Date();
  function iki(n) { return (n < 10 ? "0" : "") + n; }
  var s = el("saatBuyuk"), a = el("saatAlt");
  if (!s) return;
  s.textContent = iki(d.getHours()) + ":" + iki(d.getMinutes()) + ":" + iki(d.getSeconds());
  var gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  a.textContent = d.getDate() + " " + aylar[d.getMonth()] + " " + d.getFullYear() + " · " + gunler[d.getDay()] + " · Gaziantep";
}
function sozGuncelle() {
  var s = el("sozBuyuk"); if (!s) return;
  var d = new Date(); var i = d.getDate() % SOZLER.length;
  s.textContent = SOZLER[i];
}
function trNorm(a) {
  return String(a || "").toLocaleLowerCase("tr-TR")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u");
}
function araGirdi(v) {
  DURUM.arama = trNorm(v);
  var kap = el("araSonuc");
  if (!DURUM.arama) { kap.style.display = "none"; kap.innerHTML = ""; return; }
  var bul = [];
  function ekle(tur, ad, bolum) { bul.push([tur, ad, bolum]); }
  var i, j;
  for (i = 0; i < MENU.length; i++) ekle("Bölüm", MENU[i].ad, MENU[i].id);
  for (i = 0; i < SIIRLER.length; i++) ekle("Şiir", SIIRLER[i].ad + " · " + SIIRLER[i].dize.join(" "), "siirler");
  for (i = 0; i < MAKALELER.length; i++) ekle("Makale", MAKALELER[i].ad + " · " + MAKALELER[i].ozet, "makaleler");
  for (i = 0; i < MEKTUPLAR.length; i++) ekle("Mektup", MEKTUPLAR[i].ad + " · mektup", "mektuplar");
  for (i = 0; i < ESERLER.length; i++) ekle("Kitap", ESERLER[i].ad + " · " + ESERLER[i].tur, "eserler");
  for (i = 0; i < MAKALELER.length; i++) ekle("Makale", MAKALELER[i].ad, "makaleler");
  for (i = 0; i < SIIRLER.length; i++) ekle("Şiir", SIIRLER[i].ad, "siirler");
  for (i = 0; i < MESLEKI_BELGE.length; i++) ekle("Belge", MESLEKI_BELGE[i], "egitim");
  for (i = 0; i < SOSYAL.length; i++) ekle("Sosyal", SOSYAL[i].ad + " · " + SOSYAL[i].hesap, "sosyal");
  for (i = 0; i < HIZMETLER.length; i++) ekle("Hizmet", HIZMETLER[i][0] + " · " + HIZMETLER[i][2], "tanitim");
  for (i = 0; i < MODELLER.length; i++) ekle("Saç Modeli", "Model " + (i + 1) + " · " + MODELLER[i][1] + " · saç modeli kesim", "galeri");
  for (i = 0; i < UNIVERSITELER.liste.length; i++) ekle("Üniversite", UNIVERSITELER.liste[i][0], "egitim");
  for (i = 0; i < AKADEMILER.liste.length; i++) ekle("Akademi", AKADEMILER.liste[i][0], "egitim");
  for (i = 0; i < AI_GUVENLIK.liste.length; i++) ekle("Sertifika", AI_GUVENLIK.liste[i], "egitim");
  var r = [];
  for (i = 0; i < bul.length; i++)
    if (trNorm(bul[i][1]).indexOf(DURUM.arama) > -1) r.push(bul[i]);
  var h = "";
  if (!r.length) h = '<div class="bos">Sonuç bulunamadı: ' + esc(v) + "</div>";
  else {
    h = '<div class="sonucBas">' + r.length + " sonuç</div>";
    for (i = 0; i < r.length && i < 30; i++)
      h += '<button class="sonucSatir" onclick="git(\'' + r[i][2] + '\');aramaKapat()"><span class="sTur">' + esc(r[i][0]) +
        "</span>" + esc(r[i][1]) + " →</button>";
  }
  kap.innerHTML = h; kap.style.display = "block";
}
function aramaKapat() { var k = el("araKutu"); if (k) k.value = ""; el("araSonuc").style.display = "none"; DURUM.arama = ""; }

/* ---------------- BÜYÜTME (lightbox) & PAYLAŞ --------------------------- */
function buyut(src, ad) {
  var k = el("buyut");
  el("buyutResim").src = src; el("buyutAd").textContent = ad || "";
  k.className = "buyutAcik";
}
function buyutKapat() { el("buyut").className = ""; }
function paylas() {
  var url = location.href.split("#")[0] + "#" + DURUM.bolum;
  var veri = { title: "ÜSTAD KENAN KUZUCU", text: "ÜSTAD KENAN KUZUCU — " + menüBul(DURUM.bolum).ad, url: url };
  if (navigator.share) { navigator.share(veri).catch(function () { }); return; }
  kopyala(url);
}
function kopyala(t) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(t).then(function () { uyari("Bağlantı kopyalandı ✓"); }, function () { uyari(t); });
  } else {
    var a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select();
    try { document.execCommand("copy"); uyari("Bağlantı kopyalandı ✓"); } catch (e) { uyari(t); }
    document.body.removeChild(a);
  }
}
function uyari(m) {
  var u = el("uyariKutu"); if (!u) return;
  u.textContent = m; u.className = "uyariKutu gorunur";
  setTimeout(function () { u.className = "uyariKutu"; }, 2600);
}
function paylasDugmeleri() {
  var kap = el("paylasSatir"); if (!kap) return;
  var url = encodeURIComponent(location.href.split("#")[0]);
  var bas = encodeURIComponent("ÜSTAD KENAN KUZUCU — Şiirler, Makaleler, Eserler");
  var d = [
    ["WhatsApp", "https://wa.me/?text=" + bas + "%20" + url],
    ["X (Twitter)", "https://twitter.com/intent/tweet?text=" + bas + "&url=" + url],
    ["Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + url],
    ["Telegram", "https://t.me/share/url?url=" + url + "&text=" + bas],
    ["LinkedIn", "https://www.linkedin.com/sharing/share-offsite/?url=" + url],
    ["Kopyala", "#kopyala"]
  ];
  var h = "";
  for (var i = 0; i < d.length; i++) {
    if (d[i][1] === "#kopyala")
      h += '<button class="miniBtn" onclick="kopyala(location.href)">🔗 ' + d[i][0] + "</button>";
    else
      h += '<a class="miniBtn" href="' + d[i][1] + '" target="_blank" rel="noopener">' + d[i][0] + "</a>";
  }
  kap.innerHTML = h;
}
function mesajGonder() {
  var ad = el("fAd").value || "", konu = el("fKonu").value || "", m = el("fMesaj").value || "";
  if (!m) { uyari("Lütfen mesajınızı yazın"); return; }
  var t = "Merhaba Üstad Kenan, ben " + ad + ". Konu: " + konu + " — " + m;
  window.open(ILETISIM.whatsapp + "?text=" + encodeURIComponent(t), "_blank");
}

/* ---------------- MOBİL ÇEKMECE ---------------------------------------- */
function kapakAc() { document.body.classList.add("cekmeceAcik"); }
function kapakKapat() { document.body.classList.remove("cekmeceAcik"); }

/* ---------------- 3D ARKA PLAN (Three.js — gerçek 3D) ------------------ */
var S3 = { hazir: 0, sahne: null, cizici: null, kamera: null, toz: null, taze: null,
  halka1: null, halka2: null, cekirdek: null, ic: null, fare: { x: 0, y: 0 }, t: 0, tik: 0, aktif: 1 };

/* ==================== 8 TATLI 3D SAHNE ==================================
   Her sahne kendi kurucusunu yazar; S3.guncelle(t) ve (varsa) S3.renk(tema)
   fonksiyonlarını tanımlar. Kullanıcı üst çubuktaki 🌌 düğmesinden seçer.  */

function ucDoku(svg) {
  var img = new Image();
  img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  var tuval = document.createElement("canvas"); tuval.width = 128; tuval.height = 128;
  tuval.getContext("2d").drawImage(img, 0, 0, 128, 128);
  return new THREE.CanvasTexture(tuval);
}
var UC_SAHNE_ID = "yildiz";
var _ucRas = null; try { _ucRas = localStorage.getItem("usk-3d-rastgele"); } catch (e) { }
if (_ucRas === "1" && typeof UC_SAHNELER !== "undefined") {
  var _rs = UC_SAHNELER[Math.floor(Math.random() * UC_SAHNELER.length)];
  if (_rs) { UC_SAHNE_ID = _rs.id; try { localStorage.setItem("usk-3d-sahne", _rs.id); } catch (e) { } }
}
try { var _uc = localStorage.getItem("usk-3d-sahne"); if (_uc) UC_SAHNE_ID = _uc; } catch (e) { }

var UC_SAHNELER = [
  { id: "yildiz",   ad: "Yıldız Galaksisi",   simge: "🌌", not: "altın galaksi tozu",        kur: null },
  { id: "altin",    ad: "Altın Toz",          simge: "✨", not: "parıldayan toz bulutu",     kur: null },
  { id: "kopuk",    ad: "Sabun Köpüğü",       simge: "🫧", not: "yüzen inci köpükler",       kur: null },
  { id: "kalp",     ad: "Kalp Yağmuru",       simge: "❤️", not: "yükselen kalpler",          kur: null },
  { id: "kar",      ad: "Kar Taneleri",       simge: "❄️", not: "süzülen kar",               kur: null },
  { id: "yaprak",   ad: "Çiçek Yaprakları",   simge: "🌸", not: "savrulan pembe yapraklar",  kur: null },
  { id: "kristal",  ad: "Kristal Bahçe",      simge: "🔮", not: "dönen kristaller",          kur: null },
  { id: "gezegen",  ad: "Mini Gezegenler",    simge: "🪐", not: "halkalı küçük gezegenler",  kur: null },
  { id: "balon",    ad: "Balon Yağmuru",      simge: "🎈", not: "renkli balonlar",         kur: null },
  { id: "nota",     ad: "Nota Bahçesi",        simge: "🎵", not: "yükselen notalar",        kur: null },
  { id: "kelebek",  ad: "Kelebekler",          simge: "🦋", not: "uçuşan kelebekler",       kur: null },
  { id: "kayan",    ad: "Kayan Yıldızlar",     simge: "🌠", not: "akan yıldız yağmuru",     kur: null },
  { id: "guvercin", ad: "Güvercinler",        simge: "🕊️", not: "uçuşan güvercinler",     kur: null },
  { id: "yagmur",   ad: "Yağmur",              simge: "🌧️", not: "süzülen yağmur",          kur: null },
  { id: "fisek",    ad: "Havai Fişek",         simge: "🎆", not: "patlayan renkli fişekler", kur: null },
  { id: "balik",    ad: "Balıklar",            simge: "🐠", not: "yüzen renkli balıklar",   kur: null },
  { id: "mum",      ad: "Mum Işıkları",        simge: "🕯️", not: "süzülen sıcak mum ışıkları", kur: null },
  { id: "fiskiye",  ad: "Fıskiye",             simge: "⛲", not: "sıçrayan su damlaları",   kur: null },
  { id: "ugur",     ad: "Uğur Böcekleri",      simge: "🐞", not: "uçuşan uğur böcekleri",   kur: null },
  { id: "can",      ad: "Rüzgâr Çanları",      simge: "🎐", not: "sallanan rüzgâr çanları", kur: null },
  { id: "elmas",    ad: "Elmas Yağmuru",       simge: "💎", not: "dönen elmaslar",          kur: null },
  { id: "yunus",    ad: "Yunuslar",            simge: "🐬", not: "süzülen yunuslar",        kur: null },
  { id: "kitap",    ad: "Uçan Kitaplar",       simge: "📚", not: "sayfaları uçuşan kitaplar", kur: null },
  { id: "kumsaati", ad: "Kum Saati",           simge: "⏳", not: "akan kum taneleri",       kur: null },
  { id: "ari",      ad: "Arılar",              simge: "🐝", not: "vızıldayan arılar",       kur: null },
  { id: "dalga",    ad: "Deniz Dalgası",       simge: "🌊", not: "dalgalanan su yüzeyi",    kur: null },
  { id: "gemi",     ad: "Kâğıt Gemiler",       simge: "⛵", not: "süzülen kâğıt gemiler",   kur: null },
  { id: "medusa",   ad: "Denizanaları",        simge: "🪼", not: "nefes alan denizanaları", kur: null },
];

/* ---- 17) Mum Işıkları ---- */
function sahneMum(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><radialGradient id="g"><stop offset="0" stop-color="#fffbe0"/><stop offset="45%" stop-color="#ffd36a"/><stop offset="100%" stop-color="#ff9a2e" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="32" r="31" fill="url(#g)"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 90 : 45;
  var geo = new THREE.BufferGeometry(), konum = new Float32Array(N * 3), hz = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    konum[i * 3] = (Math.random() - 0.5) * 17; konum[i * 3 + 1] = (Math.random() - 0.5) * 11; konum[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    hz[i] = 0.1 + Math.random() * 0.22;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  var mat = new THREE.PointsMaterial({ map: doku, color: 0xffc45c, size: 0.9, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
  sahne.add(new THREE.Points(geo, mat));
  S3.guncelle = function (t) {
    var a = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      a[i * 3 + 1] += hz[i] * 0.014;
      a[i * 3] += Math.sin(t * 0.7 + i) * 0.0016;
      if (a[i * 3 + 1] > 6.2) { a[i * 3 + 1] = -6.2; a[i * 3] = (Math.random() - 0.5) * 17; }
    }
    geo.attributes.position.needsUpdate = true;
    mat.size = 0.8 + Math.sin(t * 3.1) * 0.1 + Math.sin(t * 7.7) * 0.04;
    mat.opacity = 0.72 + Math.sin(t * 5.3) * 0.12;
  };
  S3.renk = null;
}

/* ---- 18) Fıskiye ---- */
function sahneFiskiye(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="13" fill="#fff"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 700 : 320;
  var geo = new THREE.BufferGeometry(), konum = new Float32Array(N * 3), hz = new Float32Array(N * 3);
  function firlat(i) {
    var a = Math.random() * 6.283, sp = 0.02 + Math.random() * 0.05;
    konum[i * 3] = (Math.random() - 0.5) * 0.3; konum[i * 3 + 1] = -3.6; konum[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    hz[i * 3] = Math.cos(a) * sp * 2.4; hz[i * 3 + 1] = 0.055 + Math.random() * 0.05; hz[i * 3 + 2] = Math.sin(a) * sp * 2.4;
  }
  for (var i = 0; i < N; i++) firlat(i);
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  var mat = new THREE.PointsMaterial({ map: doku, color: 0x9ee8ff, size: 0.17, transparent: true, opacity: 0.85, depthWrite: false });
  sahne.add(new THREE.Points(geo, mat));
  S3.guncelle = function () {
    var a = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      hz[i * 3 + 1] -= 0.0016;
      a[i * 3] += hz[i * 3]; a[i * 3 + 1] += hz[i * 3 + 1]; a[i * 3 + 2] += hz[i * 3 + 2];
      if (a[i * 3 + 1] < -3.9) firlat(i);
    }
    geo.attributes.position.needsUpdate = true;
  };
  S3.renk = null;
}

/* ---- 19) Uğur Böcekleri ---- */
function sahneUgur(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><ellipse cx="46" cy="58" rx="30" ry="26" fill="#e33b2e"/><circle cx="46" cy="26" r="13" fill="#2b2b2b"/><circle cx="33" cy="50" r="6.5" fill="#2b2b2b"/><circle cx="59" cy="50" r="6.5" fill="#2b2b2b"/><circle cx="46" cy="70" r="5" fill="#2b2b2b"/><rect x="43" y="32" width="6" height="50" fill="#2b2b2b" opacity="0.8"/><circle cx="38" cy="22" r="2.4" fill="#fff"/><circle cx="54" cy="22" r="2.4" fill="#fff"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 18 : 10, kap = [], duz = new THREE.PlaneGeometry(0.8, 0.8);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
    m.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.45 + Math.random() * 0.5);
    kap.push({ m: m, h: 0.5 + Math.random() * 1.2, f: Math.random() * 6.28, b: 0.4 + Math.random() * 0.9 });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.x += k.h * 0.012; k.m.position.y += Math.sin(t * 1.6 + k.f) * 0.004;
      k.m.rotation.z = Math.sin(t * 1.2 + k.f) * 0.12;
      if (k.m.position.x > 8.4) k.m.position.x = -8.4;
    }
  };
  S3.renk = null;
}

/* ---- 20) Rüzgâr Çanları ---- */
function sahneCan(sahne) {
  var N = DURUM.kalite === "yuksek" ? 14 : 7, kap = [];
  for (var i = 0; i < N; i++) {
    var grup = new THREE.Group();
    var ip = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.9, 5),
      new THREE.MeshBasicMaterial({ color: 0xd8cfa8, transparent: true, opacity: 0.55 }));
    ip.position.y = -0.45; grup.add(ip);
    var can = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.44, 12, 1, true),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xd8b45c : 0xf0e6c8, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    can.position.y = -1.12; grup.add(can);
    var dil = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0x9a8a5a }));
    dil.position.y = -1.36; grup.add(dil);
    grup.position.set((i - (N - 1) / 2) * 1.45 + (Math.random() - 0.5) * 0.3, 3.6 - Math.random() * 0.7, (Math.random() - 0.5) * 4 - 1);
    kap.push({ g: grup, f: Math.random() * 6.28, h: 0.5 + Math.random() * 0.5 });
    sahne.add(grup);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.g.rotation.z = Math.sin(t * 0.9 * k.h + k.f) * 0.32;
      k.g.rotation.x = Math.sin(t * 0.7 * k.h + k.f * 1.4) * 0.16;
    }
  };
  S3.renk = null;
}

/* ---- 21) Elmas Yağmuru ---- */
function sahneElmas(sahne) {
  var geo = new THREE.OctahedronGeometry(0.42, 0);
  var renkler = [0x9ad7ff, 0xffffff, 0xffd9f2, 0xc9ffe4, 0xffe6a8];
  var N = DURUM.kalite === "yuksek" ? 26 : 14, kap = [];
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: renkler[i % renkler.length], wireframe: true, transparent: true, opacity: 0.6 }));
    m.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 1);
    m.scale.setScalar(0.45 + Math.random() * 0.8);
    kap.push({ m: m, h: 0.012 + Math.random() * 0.026, d: (Math.random() - 0.5) * 0.02, e: (Math.random() - 0.5) * 0.03 });
    sahne.add(m);
  }
  S3.guncelle = function () {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y -= k.h; k.m.position.x += k.d;
      k.m.rotation.x += k.e; k.m.rotation.y += k.e * 1.4;
      if (k.m.position.y < -6.4) { k.m.position.y = 6.4; k.m.position.x = (Math.random() - 0.5) * 16; }
      if (k.m.position.x > 8.5) k.m.position.x = -8.5; if (k.m.position.x < -8.5) k.m.position.x = 8.5;
    }
  };
  S3.renk = null;
}

/* ---- 22) Yunuslar ---- */
function sahneYunus(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="72"><g fill="#fff"><path d="M14 36 C34 10 78 10 100 30 C112 22 122 24 126 34 C118 36 112 40 106 44 C86 62 40 62 14 36 Z"/><path d="M56 20 L52 4 L70 18 Z"/><circle cx="92" cy="28" r="3.4" fill="#1a2a3a"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 14 : 8, kap = [], duz = new THREE.PlaneGeometry(1.5, 0.85);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide, color: i % 2 ? 0xbfe4ff : 0xdfefff }));
    m.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.5 + Math.random() * 0.7);
    kap.push({ m: m, h: 0.014 + Math.random() * 0.03, f: Math.random() * 6.28, g: 0.5 + Math.random() * 0.9, y0: m.position.y });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.x += k.h;
      k.m.position.y = k.y0 + Math.sin(t * k.g + k.f) * 0.7;
      k.m.rotation.z = Math.cos(t * k.g + k.f) * 0.16;
      if (k.m.position.x > 8.6) { k.m.position.x = -8.6; k.y0 = (Math.random() - 0.5) * 9; k.m.scale.x = Math.abs(k.m.scale.x); }
      k.m.scale.x = Math.abs(k.m.scale.x);
    }
  };
  S3.renk = null;
}


/* ---- 23) Uçan Kitaplar ---- */
function sahneKitap(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="140" height="100"><g><path d="M18 24 L68 16 L68 84 L18 92 Z" fill="#fff6e0"/><path d="M122 24 L72 16 L72 84 L122 92 Z" fill="#f0e2c4"/><path d="M68 16 L70 84" stroke="#b08a4a" stroke-width="2"/><path d="M26 36 L62 30 M26 48 L62 42 M26 60 L62 54 M78 30 L114 36 M78 42 L114 48 M78 54 L114 60" stroke="#c9b18a" stroke-width="2.4"/><path d="M14 22 L70 12 L126 22" stroke="#8a6a2f" stroke-width="3" fill="none"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 16 : 9, kap = [], duz = new THREE.PlaneGeometry(1.35, 0.95);
  var renkler = [0xfff3d8, 0xf6e2b8, 0xffe9c9, 0xe8dcc0];
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide, color: renkler[i % renkler.length] }));
    m.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 7 - 1);
    m.scale.setScalar(0.5 + Math.random() * 0.7);
    kap.push({ m: m, h: 0.008 + Math.random() * 0.016, f: Math.random() * 6.28, d: (Math.random() - 0.5) * 0.006 });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y += k.h; k.m.position.x += k.d;
      k.m.rotation.z = Math.sin(t * 0.8 + k.f) * 0.14;
      k.m.rotation.y = Math.sin(t * 0.6 + k.f) * 0.35;
      if (k.m.position.y > 6.2) k.m.position.y = -6.2;
      if (k.m.position.x > 8.4) k.m.position.x = -8.4; if (k.m.position.x < -8.4) k.m.position.x = 8.4;
    }
  };
  S3.renk = null;
}

/* ---- 24) Kum Saati ---- */
function sahneKumsaati(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10" fill="#fff"/></svg>');
  var grup = new THREE.Group();
  var cam = new THREE.MeshBasicMaterial({ color: 0xffe6b0, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
  var tel = new THREE.MeshBasicMaterial({ color: 0xd8b45c, wireframe: true, transparent: true, opacity: 0.4 });
  var ust = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.13, 1.5, 24, 1, true), cam); ust.position.y = 0.77; grup.add(ust);
  var alt = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 1.15, 1.5, 24, 1, true), cam); alt.position.y = -0.77; grup.add(alt);
  var cu = new THREE.Mesh(new THREE.CylinderGeometry(1.16, 0.17, 1.46, 24, 1, true), tel); cu.position.y = 0.77; grup.add(cu);
  var ca = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 1.16, 1.46, 24, 1, true), tel); ca.position.y = -0.77; grup.add(ca);
  var kapak = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.22, 0.09, 24), new THREE.MeshBasicMaterial({ color: 0xd8b45c, transparent: true, opacity: 0.55 }));
  kapak.position.y = 1.55; grup.add(kapak);
  var kapak2 = kapak.clone(); kapak2.position.y = -1.55; grup.add(kapak2);
  sahne.add(grup);
  var N = DURUM.kalite === "yuksek" ? 900 : 420;
  var geo = new THREE.BufferGeometry(), konum = new Float32Array(N * 3), hz = new Float32Array(N);
  function yerlestir(i, ustte) {
    var y = ustte ? (Math.random() * 1.3 + 0.15) : (Math.random() * 1.3 - 1.52);
    var t = ustte ? (1.45 - (y - 0.15)) / 1.45 : (1.45 - (y + 1.52)) / 1.45;
    var r = Math.max(0.12, (0.13 + t * 1.0)) * Math.sqrt(Math.random());
    var a = Math.random() * 6.283;
    konum[i * 3] = Math.cos(a) * Math.min(r, 1.1);
    konum[i * 3 + 1] = y;
    konum[i * 3 + 2] = Math.sin(a) * Math.min(r, 1.1);
    hz[i] = 0.005 + Math.random() * 0.013;
  }
  for (var i = 0; i < N; i++) yerlestir(i, i % 2 === 0);
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  var mat = new THREE.PointsMaterial({ map: doku, color: 0xf0d79a, size: 0.075, transparent: true, opacity: 0.95, depthWrite: false });
  sahne.add(new THREE.Points(geo, mat));
  S3.guncelle = function () {
    var a = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      a[i * 3 + 1] -= hz[i];
      if (Math.abs(a[i * 3]) > 1.1) { a[i * 3] *= 0.94; a[i * 3 + 2] *= 0.94; }
      if (a[i * 3 + 1] < -1.56) yerlestir(i, true);
    }
    geo.attributes.position.needsUpdate = true;
  };
  S3.renk = null;
}

/* ---- 25) Arılar ---- */
function sahneAri(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="72"><g><ellipse cx="46" cy="42" rx="24" ry="16" fill="#f2c230"/><path d="M34 28 L34 56 M44 27 L44 57" stroke="#2b2b2b" stroke-width="7"/><circle cx="70" cy="40" r="9" fill="#2b2b2b"/><circle cx="74" cy="36" r="2.2" fill="#fff"/><ellipse cx="42" cy="22" rx="16" ry="9" fill="#ffffff" opacity="0.75" transform="rotate(-18 42 22)"/><ellipse cx="58" cy="20" rx="14" ry="8" fill="#ffffff" opacity="0.6" transform="rotate(12 58 20)"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 16 : 9, kap = [], duz = new THREE.PlaneGeometry(0.72, 0.54);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.92, depthWrite: false, side: THREE.DoubleSide }));
    m.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.45 + Math.random() * 0.55);
    kap.push({ m: m, f: Math.random() * 6.28, h: 0.6 + Math.random() * 1.1, r: 0.5 + Math.random() * 1.4, y0: m.position.y, x0: m.position.x });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i], a = t * k.h + k.f;
      k.m.position.x = k.x0 + Math.cos(a) * k.r;
      k.m.position.y = k.y0 + Math.sin(a * 1.7) * k.r * 0.5;
      k.m.rotation.z = Math.sin(a * 2) * 0.3;
      k.m.rotation.y = Math.cos(a) * 0.4;
    }
  };
  S3.renk = null;
}

/* ---- 26) Deniz Dalgası ---- */
function sahneDalga(sahne) {
  var kal = DURUM.kalite === "yuksek" ? 54 : 34;
  var geo = new THREE.PlaneGeometry(24, 14, kal, Math.round(kal * 0.62));
  var taban = geo.attributes.position.array.slice(0);
  var mat = new THREE.MeshBasicMaterial({ color: 0x8fd3ff, wireframe: true, transparent: true, opacity: 0.5 });
  var m = new THREE.Mesh(geo, mat); m.position.set(0, 0, -3);
  sahne.add(m);
  /* arkasında yumuşak derinlik katmanı */
  var geo2 = new THREE.PlaneGeometry(24, 14, 12, 8), tb2 = geo2.attributes.position.array.slice(0);
  var m2 = new THREE.Mesh(geo2, new THREE.MeshBasicMaterial({ color: 0x2f6f9c, transparent: true, opacity: 0.2 }));
  m2.position.set(0, 0, -3.6); sahne.add(m2);
  S3.guncelle = function (t) {
    var a = geo.attributes.position.array;
    for (var i = 0; i < a.length; i += 3) {
      var x = taban[i], y = taban[i + 1];
      a[i + 2] = Math.sin(x * 0.42 + t * 1.25) * 0.85 + Math.cos(y * 0.6 + t * 0.95) * 0.6
        + Math.sin((x + y) * 0.25 + t * 0.7) * 0.45;
    }
    geo.attributes.position.needsUpdate = true;
    var b = geo2.attributes.position.array;
    for (var q = 0; q < b.length; q += 3) {
      var x2 = tb2[q], y2 = tb2[q + 1];
      b[q + 2] = Math.sin(x2 * 0.3 + t * 1.1) * 0.5 + Math.cos(y2 * 0.45 + t * 0.8) * 0.4;
    }
    geo2.attributes.position.needsUpdate = true;
  };
  S3.renk = null;
}

/* ---- 27) Kâğıt Gemiler ---- */
function sahneGemi(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="96"><g><path d="M10 62 L118 62 L96 90 L32 90 Z" fill="#fff8ea"/><path d="M64 10 L64 62 M64 12 L112 58 L64 58 Z M64 20 L26 58 L64 58 Z" fill="#f0e2c4" stroke="#c9b18a" stroke-width="2"/></g></svg>');
  var su = new THREE.Mesh(new THREE.PlaneGeometry(22, 13, 1, 1), new THREE.MeshBasicMaterial({ color: 0x2f6f9c, transparent: true, opacity: 0.28 }));
  su.rotation.x = -Math.PI / 2.2; su.position.set(0, -1.5, -1); sahne.add(su);
  var N = DURUM.kalite === "yuksek" ? 10 : 6, kap = [], duz = new THREE.PlaneGeometry(1.05, 0.8);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide, color: 0xfff6e2 }));
    var z = (Math.random() - 0.5) * 8 - 1;
    m.position.set((Math.random() - 0.5) * 16, -1.2 + Math.random() * 0.5, z);
    m.scale.setScalar(0.5 + Math.random() * 0.6 + (z > -1 ? 0.3 : 0));
    kap.push({ m: m, f: Math.random() * 6.28, h: 0.012 + Math.random() * 0.02, g: 0.5 + Math.random() * 1.0 });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.x += k.h;
      k.m.position.y = -1.15 + Math.sin(t * k.g + k.f) * 0.22;
      k.m.rotation.z = Math.sin(t * k.g + k.f) * 0.16;
      if (k.m.position.x > 9) { k.m.position.x = -9; }
    }
  };
  S3.renk = null;
}

/* ---- 28) Denizanaları ---- */
function sahneMedusa(sahne) {
  var N = DURUM.kalite === "yuksek" ? 9 : 5, kap = [];
  function kur() {
    var grup = new THREE.Group();
    var sapka = new THREE.Mesh(new THREE.SphereGeometry(0.65, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xd8c4ff, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
    grup.add(sapka);
    var cizgi = new THREE.Mesh(new THREE.SphereGeometry(0.66, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28, wireframe: true }));
    grup.add(cizgi);
    var dk = [];
    for (var q = 0; q < 6; q++) {
      var d = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.012, 1.5 + Math.random() * 0.9, 5),
        new THREE.MeshBasicMaterial({ color: 0xc4b0ff, transparent: true, opacity: 0.45 }));
      var a = (q / 6) * 6.283;
      d.position.set(Math.cos(a) * 0.34, -0.95, Math.sin(a) * 0.34);
      grup.add(d); dk.push({ d: d, a: a });
    }
    return { g: grup, d: dk, sapka: sapka };
  }
  for (var i = 0; i < N; i++) {
    var o = kur();
    o.g.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 1);
    o.g.scale.setScalar(0.6 + Math.random() * 0.9);
    o.f = Math.random() * 6.28; o.y0 = o.g.position.y; o.h = 0.006 + Math.random() * 0.014;
    kap.push(o); sahne.add(o.g);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i], nefes = 1 + Math.sin(t * 1.5 + k.f) * 0.12;
      k.g.position.y += k.h;
      k.g.scale.set(k.g.scale.x, nefes, k.g.scale.z);
      k.sapka.scale.set(nefes, 1 / nefes, nefes);
      for (var q = 0; q < k.d.length; q++) {
        var d = k.d[q];
        d.d.rotation.z = Math.sin(t * 1.8 + k.f + d.a) * 0.22;
        d.d.rotation.x = Math.cos(t * 1.4 + k.f + d.a) * 0.18;
      }
      if (k.g.position.y > 6.4) k.g.position.y = -6.4;
    }
  };
  S3.renk = null;
}

var UC_KURUCULAR = { yildiz: sahneYildiz, altin: sahneAltin, kopuk: sahneKopuk, kalp: sahneKalp,
  kar: sahneKar, yaprak: sahneYaprak, kristal: sahneKristal, gezegen: sahneGezegen,
  balon: sahneBalon, nota: sahneNota, kelebek: sahneKelebek, kayan: sahneKayan,
  guvercin: sahneGuvercin, yagmur: sahneYagmur, fisek: sahneFisek, balik: sahneBalik,
  mum: sahneMum, fiskiye: sahneFiskiye, ugur: sahneUgur, can: sahneCan, elmas: sahneElmas, yunus: sahneYunus,
  kitap: sahneKitap, kumsaati: sahneKumsaati, ari: sahneAri, dalga: sahneDalga, gemi: sahneGemi, medusa: sahneMedusa };

/* ---- 1) Yıldız Galaksisi (özgün sahne) ---- */
function sahneYildiz(sahne) {
  /* --- 1) Galaksi tozu (özel shader: yumuşak yuvarlak ışık) --- */
  var N = DURUM.kalite === "yuksek" ? 13000 : 6000;
  var konum = new Float32Array(N * 3), boyut = new Float32Array(N), renk = new Float32Array(N * 3);
  var palet = [new THREE.Color(0xf0dfa8), new THREE.Color(0xd8b45c), new THREE.Color(0xfff3cf), new THREE.Color(0xa9762e)];
  for (var i = 0; i < N; i++) {
    var kol = i % 4, r = Math.pow(Math.random(), 0.55) * 5.8 + 0.25;
    var a = kol * (Math.PI / 2) + r * 0.85 + (Math.random() - 0.5) * 0.5;
    var sa = (Math.random() - 0.5) * (0.9 - r * 0.1);
    konum[i * 3] = Math.cos(a) * r + sa;
    konum[i * 3 + 1] = (Math.random() - 0.5) * Math.pow(1 - r / 6.2, 2) * 1.9;
    konum[i * 3 + 2] = Math.sin(a) * r + sa;
    var c = palet[i % 4].clone().multiplyScalar(0.45 + 0.55 * (1 - r / 6.2));
    renk[i * 3] = c.r; renk[i * 3 + 1] = c.g; renk[i * 3 + 2] = c.b;
    boyut[i] = 0.05 + Math.random() * 0.13;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  geo.setAttribute("aBoyut", new THREE.BufferAttribute(boyut, 1));
  geo.setAttribute("color", new THREE.BufferAttribute(renk, 3));
  var matToz = new THREE.ShaderMaterial({
    uniforms: { uSure: { value: 0 }, uTint: { value: new THREE.Color(0xd8b45c) } },
    vertexShader: [
      "attribute float aBoyut;", "varying vec3 vRenk;",
      "void main(){", " vRenk = color;",
      " vec4 mv = modelViewMatrix * vec4(position,1.0);",
      " gl_PointSize = aBoyut * (520.0 / -mv.z);",
      " gl_Position = projectionMatrix * mv;", "}"].join("\n"),
    fragmentShader: [
      "uniform vec3 uTint; varying vec3 vRenk;",
      "void main(){",
      " vec2 d = gl_PointCoord - vec2(0.5);",
      " float dist = length(d);",
      " if(dist > 0.5) discard;",
      " float yum = smoothstep(0.5, 0.0, dist);",
      " vec3 c = mix(vRenk, uTint, 0.45);",
      " gl_FragColor = vec4(c * (0.72 + yum), yum * 1.0);", "}"].join("\n"),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true
  });
  var toz = new THREE.Points(geo, matToz); sahne.add(toz);

  /* --- 2) Enerji çekirdeği + iç çekirdek (zarif geometri) --- */
  var cekirdek = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28, 2),
    new THREE.MeshBasicMaterial({ color: 0xd8b45c, wireframe: true, transparent: true, opacity: 0.22 }));
  sahne.add(cekirdek);
  var ic = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82, 1),
    new THREE.MeshBasicMaterial({ color: 0xf0dfa8, wireframe: true, transparent: true, opacity: 0.3 }));
  sahne.add(ic);

  /* --- 3) Yörünge halkaları --- */
  function halka(r, t, renk2, egim) {
    var m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 8, 180),
      new THREE.MeshBasicMaterial({ color: renk2, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending }));
    m.rotation.x = egim; sahne.add(m); return m;
  }
  var halka1 = halka(2.5, 0.008, 0xf0dfa8, 1.15);
  var halka2 = halka(3.25, 0.006, 0xd8b45c, -0.55);

  /* --- 4) Uçuşan tüyler (yazar kalemi) + altın toz --- */
  var taze = [];
  var tuyler = [];
  function tuyDokusu() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
      '<g fill="none" stroke="#f4e8c8" stroke-width="3" stroke-linecap="round">' +
      '<path d="M20 108 C50 84 84 52 106 20"/>' +
      '<path d="M40 96 C58 92 74 84 84 70"/><path d="M52 84 C66 80 78 72 86 60"/>' +
      '<path d="M66 70 C78 66 88 58 94 48"/><path d="M78 56 C88 52 96 44 100 36"/>' +
      '<path d="M34 100 C46 104 58 102 68 94"/><path d="M48 88 C58 92 68 90 76 82"/>' +
      '</g></svg>';
    var img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
    var tuval = document.createElement("canvas"); tuval.width = 128; tuval.height = 128;
    var ctx = tuval.getContext("2d"); ctx.drawImage(img, 0, 0, 128, 128);
    return new THREE.CanvasTexture(tuval);
  }
  var doku = tuyDokusu();
  var duz = new THREE.PlaneGeometry(0.5, 0.5);
  var sayiTuy = DURUM.kalite === "yuksek" ? 26 : 14;
  for (var k = 0; k < sayiTuy; k++) {
    var mm = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true,
      opacity: 0.55, depthWrite: false, side: THREE.DoubleSide, color: 0xf0dfa8 }));
    mm.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 6 - 1);
    mm.rotation.z = Math.random() * 6.28;
    taze.push({ m: mm, h: 0.006 + Math.random() * 0.014, y: Math.random() * 6.28, s: 0.4 + Math.random() * 0.7 });
    sahne.add(mm);
  }
  S3.toz = toz; S3.taze = taze; S3.cekirdek = cekirdek; S3.ic = ic; S3.halka1 = halka1; S3.halka2 = halka2;
  S3.guncelle = function (t) {
    toz.rotation.y = t * 0.32; toz.rotation.x = Math.sin(t * 0.2) * 0.06;
    cekirdek.rotation.y = t * 0.85; cekirdek.rotation.x = t * 0.42;
    ic.rotation.y = -t * 1.2; ic.rotation.z = t * 0.6;
    halka1.rotation.z = t * 0.55; halka2.rotation.z = -t * 0.4;
    for (var i = 0; i < taze.length; i++) {
      var f = taze[i];
      f.m.position.y -= f.h;
      f.m.position.x += Math.sin(t * f.s + f.y) * 0.006;
      f.m.rotation.z += 0.004;
      if (f.m.position.y < -7.5) { f.m.position.y = 7.5; f.m.position.x = (Math.random() - 0.5) * 14; }
    }
  };
  S3.renk = null;   /* varsayılan renklendirme (sahneRenk) kullanılır */
}

/* ---- 2) Altın Toz ---- */
function sahneAltin(sahne) {
  var N = DURUM.kalite === "yuksek" ? 1400 : 700;
  var geo = new THREE.BufferGeometry();
  var konum = new Float32Array(N * 3), hiz = new Float32Array(N), faz = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    konum[i * 3] = (Math.random() - 0.5) * 16;
    konum[i * 3 + 1] = (Math.random() - 0.5) * 12;
    konum[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;
    hiz[i] = 0.002 + Math.random() * 0.008; faz[i] = Math.random() * 6.28;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  var mat = new THREE.PointsMaterial({ color: 0xf0cf78, size: 0.09, transparent: true, opacity: 0.85,
    depthWrite: false, blending: THREE.AdditiveBlending, map: ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><circle cx="64" cy="64" r="52" fill="#fff"/></svg>') });
  var toz = new THREE.Points(geo, mat); sahne.add(toz);
  var kalp = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 1),
    new THREE.MeshBasicMaterial({ color: 0xf0dfa8, wireframe: true, transparent: true, opacity: 0.16 }));
  sahne.add(kalp);
  S3.guncelle = function (t) {
    var p = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      p[i * 3 + 1] += hiz[i];
      if (p[i * 3 + 1] > 6.2) p[i * 3 + 1] = -6.2;
      p[i * 3] += Math.sin(t * 0.8 + faz[i]) * 0.0022;
    }
    geo.attributes.position.needsUpdate = true;
    mat.size = 0.075 + Math.abs(Math.sin(t * 1.4)) * 0.05;
    kalp.rotation.y = t * 0.3; kalp.rotation.x = t * 0.18;
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255);
    mat.color = c.clone().lerp(new THREE.Color(0xfff0c0), 0.45); kalp.material.color = c;
  };
}

/* ---- 3) Sabun Köpüğü ---- */
function sahneKopuk(sahne) {
  var N = DURUM.kalite === "yuksek" ? 22 : 12, kup = [];
  for (var i = 0; i < N; i++) {
    var y = new THREE.Mesh(new THREE.SphereGeometry(0.28 + Math.random() * 0.55, 20, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14, wireframe: true }));
    y.position.set((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 11, (Math.random() - 0.5) * 7 - 1);
    kup.push({ m: y, h: 0.004 + Math.random() * 0.01, f: Math.random() * 6.28, d: 0.4 + Math.random() });
    sahne.add(y);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kup.length; i++) {
      var k = kup[i];
      k.m.position.y += k.h;
      k.m.position.x += Math.sin(t * k.d + k.f) * 0.008;
      k.m.rotation.y += 0.006; k.m.rotation.x += 0.003;
      if (k.m.position.y > 6.5) { k.m.position.y = -6.5; k.m.position.x = (Math.random() - 0.5) * 13; }
    }
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xffffff), 0.55);
    for (var i = 0; i < kup.length; i++) kup[i].m.material.color = c;
  };
}

/* ---- 4) Kalp Yağmuru ---- */
function sahneKalp(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path d="M64 112 C10 74 14 30 40 24 C54 21 64 32 64 40 C64 32 74 21 88 24 C114 30 118 74 64 112 Z" fill="#fff"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 34 : 18, kap = [];
  var duz = new THREE.PlaneGeometry(0.62, 0.62);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.5 + Math.random() * 0.4, depthWrite: false, side: THREE.DoubleSide, color: 0xff8fb0 }));
    m.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.6 + Math.random() * 1.5);
    kap.push({ m: m, h: 0.006 + Math.random() * 0.012, f: Math.random() * 6.28, s: 0.5 + Math.random() });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y += k.h;
      k.m.position.x += Math.sin(t * k.s + k.f) * 0.01;
      k.m.rotation.z = Math.sin(t * k.s * 0.8 + k.f) * 0.35;
      if (k.m.position.y > 7) { k.m.position.y = -7; k.m.position.x = (Math.random() - 0.5) * 14; }
    }
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xffb3c9), 0.6);
    for (var i = 0; i < kap.length; i++) kap[i].m.material.color = c;
  };
}

/* ---- 5) Kar Taneleri ---- */
function sahneKar(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><g stroke="#fff" stroke-width="6" stroke-linecap="round"><line x1="64" y1="14" x2="64" y2="114"/><line x1="14" y1="64" x2="114" y2="64"/><line x1="28" y1="28" x2="100" y2="100"/><line x1="100" y1="28" x2="28" y2="100"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 700 : 350;
  var geo = new THREE.BufferGeometry(); var konum = new Float32Array(N * 3), hz = new Float32Array(N), fz = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    konum[i * 3] = (Math.random() - 0.5) * 18; konum[i * 3 + 1] = (Math.random() - 0.5) * 14; konum[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;
    hz[i] = 0.004 + Math.random() * 0.012; fz[i] = Math.random() * 6.28;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  var mat = new THREE.PointsMaterial({ map: doku, color: 0xeaf4ff, size: 0.16, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
  var kar = new THREE.Points(geo, mat); sahne.add(kar);
  S3.guncelle = function (t) {
    var p = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      p[i * 3 + 1] -= hz[i];
      p[i * 3] += Math.sin(t * 0.6 + fz[i]) * 0.0035;
      if (p[i * 3 + 1] < -7) { p[i * 3 + 1] = 7; p[i * 3] = (Math.random() - 0.5) * 18; }
    }
    geo.attributes.position.needsUpdate = true;
    mat.size = 0.14 + Math.abs(Math.sin(t * 0.9)) * 0.05;
  };
  S3.renk = function (tema) {
    mat.color = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xffffff), 0.82);
  };
}

/* ---- 6) Çiçek Yaprakları ---- */
function sahneYaprak(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path d="M64 8 C104 40 104 92 64 120 C24 92 24 40 64 8 Z" fill="#fff"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 40 : 20, kap = [];
  var duz = new THREE.PlaneGeometry(0.5, 0.72);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.45 + Math.random() * 0.4, depthWrite: false, side: THREE.DoubleSide, color: 0xffc2d8 }));
    m.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6 - 1);
    m.rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
    kap.push({ m: m, h: 0.005 + Math.random() * 0.01, f: Math.random() * 6.28, s: 0.4 + Math.random() });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y -= k.h; k.m.position.x += Math.sin(t * k.s + k.f) * 0.012;
      k.m.rotation.x += 0.004; k.m.rotation.y += 0.006; k.m.rotation.z = Math.sin(t * 0.7 + k.f) * 0.6;
      if (k.m.position.y < -7) { k.m.position.y = 7; k.m.position.x = (Math.random() - 0.5) * 15; }
    }
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xffd0e2), 0.62);
    for (var i = 0; i < kap.length; i++) kap[i].m.material.color = c;
  };
}

/* ---- 7) Kristal Bahçe ---- */
function sahneKristal(sahne) {
  var N = DURUM.kalite === "yuksek" ? 16 : 9, kap = [];
  for (var i = 0; i < N; i++) {
    var y = new THREE.Mesh(new THREE.OctahedronGeometry(0.42 + Math.random() * 0.55, 0),
      new THREE.MeshBasicMaterial({ color: 0xbfe9ff, transparent: true, opacity: 0.34, wireframe: true }));
    y.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 1);
    kap.push({ m: y, f: Math.random() * 6.28, s: 0.3 + Math.random() * 0.8, y0: y.position.y });
    sahne.add(y);
  }
  var cek = new THREE.Mesh(new THREE.OctahedronGeometry(1.35, 1),
    new THREE.MeshBasicMaterial({ color: 0xd8ecff, wireframe: true, transparent: true, opacity: 0.22 }));
  sahne.add(cek);
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.rotation.x += 0.006 * k.s; k.m.rotation.y += 0.009 * k.s;
      k.m.position.y = k.y0 + Math.sin(t * k.s + k.f) * 0.55;
    }
    cek.rotation.y = t * 0.5; cek.rotation.x = t * 0.25;
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255);
    cek.material.color = c;
    for (var i = 0; i < kap.length; i++) kap[i].m.material.color = c.clone().lerp(new THREE.Color(0xffffff), 0.5);
  };
}

/* ---- 8) Mini Gezegenler ---- */
function sahneGezegen(sahne) {
  var gunes = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 18),
    new THREE.MeshBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0.9 }));
  sahne.add(gunes);
  var N = DURUM.kalite === "yuksek" ? 7 : 4, kap = [];
  for (var i = 0; i < N; i++) {
    var r = 1.9 + i * 0.62;
    var ge = new THREE.Mesh(new THREE.SphereGeometry(0.2 + Math.random() * 0.26, 18, 14),
      new THREE.MeshBasicMaterial({ color: 0x9ad7ff, wireframe: true, transparent: true, opacity: 0.7 }));
    var halka = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.012, 6, 90),
      new THREE.MeshBasicMaterial({ color: 0xffe8b0, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
    halka.rotation.x = 1.2; ge.add(halka);
    var yor = new THREE.Mesh(new THREE.TorusGeometry(r, 0.004, 6, 150),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending }));
    yor.rotation.x = Math.PI / 2; sahne.add(yor);
    kap.push({ m: ge, r: r, h: 0.16 + Math.random() * 0.3, f: Math.random() * 6.28, e: (Math.random() - 0.5) * 0.5 });
    sahne.add(ge);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i], a = t * k.h + k.f;
      k.m.position.set(Math.cos(a) * k.r, Math.sin(a * 0.7) * 0.9 + k.e, Math.sin(a) * k.r);
      k.m.rotation.y += 0.01;
    }
    gunes.rotation.y = t * 0.35;
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255);
    gunes.material.color = c.clone().lerp(new THREE.Color(0xfff0c0), 0.5);
    for (var i = 0; i < kap.length; i++) kap[i].m.material.color = c.clone().lerp(new THREE.Color(0xffffff), 0.4);
  };
}


/* ---- 9) Balon Yağmuru ---- */
function sahneBalon(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="160"><ellipse cx="64" cy="62" rx="42" ry="50" fill="#fff"/><path d="M64 112 l-9 -12 18 0 z" fill="#fff"/><path d="M64 112 q10 22 0 42" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 26 : 14, kap = [];
  var renkler = [0xff9db0, 0xffd98a, 0x9ad7ff, 0xb8f0a8, 0xd8b3ff, 0xffc39d, 0x9ff0e0];
  var duz = new THREE.PlaneGeometry(0.75, 0.94);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.72, depthWrite: false, side: THREE.DoubleSide, color: renkler[i % renkler.length] }));
    m.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 13, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.55 + Math.random() * 1.1);
    kap.push({ m: m, h: 0.008 + Math.random() * 0.014, f: Math.random() * 6.28, s: 0.6 + Math.random() });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y += k.h;
      k.m.position.x += Math.sin(t * k.s + k.f) * 0.012;
      k.m.rotation.z = Math.sin(t * k.s * 0.7 + k.f) * 0.16;
      if (k.m.position.y > 7.5) { k.m.position.y = -7.5; k.m.position.x = (Math.random() - 0.5) * 15; }
    }
  };
  S3.renk = null;
}

/* ---- 10) Nota Bahçesi ---- */
function sahneNota(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><g fill="#fff"><ellipse cx="38" cy="92" rx="20" ry="15" transform="rotate(-20 38 92)"/><rect x="54" y="24" width="9" height="70" rx="4"/><ellipse cx="88" cy="78" rx="20" ry="15" transform="rotate(-20 88 78)"/><rect x="104" y="12" width="9" height="68" rx="4"/><rect x="54" y="18" width="59" height="12" rx="5"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 30 : 16, kap = [];
  var duz = new THREE.PlaneGeometry(0.62, 0.62);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.4 + Math.random() * 0.45, depthWrite: false, side: THREE.DoubleSide, color: 0xffe9a8 }));
    m.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 13, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.5 + Math.random() * 1.3);
    kap.push({ m: m, h: 0.007 + Math.random() * 0.013, f: Math.random() * 6.28, s: 0.5 + Math.random() });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y += k.h;
      k.m.position.x += Math.sin(t * k.s + k.f) * 0.014;
      k.m.rotation.z = Math.sin(t * k.s * 0.9 + k.f) * 0.3;
      if (k.m.position.y > 7.5) { k.m.position.y = -7.5; k.m.position.x = (Math.random() - 0.5) * 15; }
    }
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xffe9a8), 0.65);
    for (var i = 0; i < kap.length; i++) kap[i].m.material.color = c;
  };
}

/* ---- 11) Kelebekler ---- */
function sahneKelebek(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><g fill="#fff"><path d="M62 64 C30 20 6 32 14 60 C20 84 46 84 62 64 Z"/><path d="M66 64 C98 20 122 32 114 60 C108 84 82 84 66 64 Z"/><path d="M62 70 C34 96 20 112 40 116 C56 119 64 92 62 70 Z"/><path d="M66 70 C94 96 108 112 88 116 C72 119 64 92 66 70 Z"/><rect x="61" y="44" width="6" height="46" rx="3"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 18 : 10, kap = [];
  var renkler = [0xffd08a, 0xa8e6ff, 0xffb3d1, 0xc8f0a8, 0xd8b3ff];
  var duz = new THREE.PlaneGeometry(0.8, 0.8);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.75, depthWrite: false, side: THREE.DoubleSide, color: renkler[i % renkler.length] }));
    m.position.set((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6 - 1);
    m.scale.setScalar(0.5 + Math.random() * 0.9);
    kap.push({ m: m, r: 2 + Math.random() * 4, h: 0.1 + Math.random() * 0.25, f: Math.random() * 6.28, e: (Math.random() - 0.5) * 2.4, s: 4 + Math.random() * 6 });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i], a = t * k.h + k.f;
      k.m.position.set(Math.cos(a) * k.r, Math.sin(a * 1.7) * 1.5 + k.e, Math.sin(a) * k.r * 0.5 - 1);
      k.m.rotation.y = Math.sin(t * 0.6 + k.f) * 1.2;
      k.m.rotation.z = Math.sin(t * k.s + k.f) * 0.25;
      var o = 0.55 + Math.abs(Math.sin(t * k.s + k.f)) * 0.45;
      k.m.scale.set(k.m.scale.x, 0.5 + o * 0.5, 1);
    }
  };
  S3.renk = null;
}

/* ---- 12) Kayan Yıldızlar ---- */
function sahneKayan(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="256" height="32"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.7" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient></defs><rect x="0" y="10" width="256" height="12" rx="6" fill="url(#g)"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 22 : 12, kap = [];
  var duz = new THREE.PlaneGeometry(2.6, 0.32);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, color: 0xfff2c8 }));
    m.rotation.z = 0.6;
    m.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.2) * 14, (Math.random() - 0.5) * 7 - 2);
    m.scale.setScalar(0.5 + Math.random() * 1.2);
    kap.push({ m: m, h: 0.05 + Math.random() * 0.09, f: Math.random() });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.y -= k.h; k.m.position.x += k.h * 0.75;
      if (k.m.position.y < -8 || k.m.position.x > 12) {
        k.m.position.set(-12 + Math.random() * 4, 6 + Math.random() * 4, (Math.random() - 0.5) * 7 - 2);
      }
    }
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xfff6d8), 0.7);
    for (var i = 0; i < kap.length; i++) kap[i].m.material.color = c;
  };
}


/* ---- 13) Güvercinler ---- */
function sahneGuvercin(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="96"><g fill="#fff"><ellipse cx="60" cy="56" rx="26" ry="15"/><circle cx="86" cy="42" r="10"/><path d="M94 42 l14 5 -14 5z"/><path d="M46 48 C20 22 8 34 16 52 C22 66 40 64 46 48Z"/><path d="M60 52 C44 30 30 34 34 52 C37 66 52 64 60 52Z"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 16 : 9, kap = [], duz = new THREE.PlaneGeometry(0.9, 0.68);
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.82, depthWrite: false, side: THREE.DoubleSide, color: 0xf4f7ff }));
    m.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6 - 1);
    kap.push({ m: m, h: 0.14 + Math.random() * 0.3, f: Math.random() * 6.28, e: (Math.random() - 0.5) * 2.2, y: 3 + Math.random() * 5 });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i], a = t * k.h + k.f;
      k.m.position.set(Math.cos(a) * 6.5, Math.sin(a * 2.2) * 0.8 + k.e, Math.sin(a) * 4 - 1);
      k.m.rotation.z = Math.sin(a * 3) * 0.35;
      k.m.rotation.y = Math.cos(a * 2) * 0.3;
    }
  };
  S3.renk = null;
}

/* ---- 14) Yağmur ---- */
function sahneYagmur(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect x="28" y="4" width="8" height="56" rx="4" fill="#fff"/></svg>');
  var N = DURUM.kalite === "yuksek" ? 520 : 260;
  var geo = new THREE.BufferGeometry(), konum = new Float32Array(N * 3), hz = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    konum[i * 3] = (Math.random() - 0.5) * 20; konum[i * 3 + 1] = (Math.random() - 0.5) * 16; konum[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    hz[i] = 0.05 + Math.random() * 0.13;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
  var mat = new THREE.PointsMaterial({ map: doku, color: 0xbfe4ff, size: 0.2, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending });
  var yag = new THREE.Points(geo, mat); sahne.add(yag);
  S3.guncelle = function (t) {
    var p = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      p[i * 3 + 1] -= hz[i];
      if (p[i * 3 + 1] < -8) { p[i * 3 + 1] = 8; p[i * 3] = (Math.random() - 0.5) * 20; }
    }
    geo.attributes.position.needsUpdate = true;
  };
  S3.renk = function (tema) {
    mat.color = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xcfe8ff), 0.7);
  };
}

/* ---- 15) Havai Fişek ---- */
function sahneFisek(sahne) {
  var N = DURUM.kalite === "yuksek" ? 6 : 3, kap = [];
  for (var i = 0; i < N; i++) {
    var say = DURUM.kalite === "yuksek" ? 90 : 50;
    var geo = new THREE.BufferGeometry(), konum = new Float32Array(say * 3), dir = [];
    for (var s = 0; s < say; s++) {
      var u = Math.random() * 2 - 1, th = Math.random() * 6.283, r = Math.sqrt(1 - u * u);
      dir.push(new THREE.Vector3(r * Math.cos(th), u, r * Math.sin(th)));
      konum[s * 3] = 0; konum[s * 3 + 1] = 0; konum[s * 3 + 2] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(konum, 3));
    var mat = new THREE.PointsMaterial({ color: 0xffd9a0, size: 0.09, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending });
    var p = new THREE.Points(geo, mat); p.position.set((Math.random() - 0.5) * 10, -4 + Math.random() * 8, (Math.random() - 0.5) * 5 - 1);
    sahne.add(p);
    kap.push({ p: p, g: geo, d: dir, t0: Math.random() * 6, sure: 1.6 + Math.random() * 1.1, renk: Math.random() });
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i], yas = (t - k.t0) % 3.6; if (yas < 0) yas += 3.6;
      var a = yas / k.sure;
      var arr = k.g.attributes.position.array;
      for (var s = 0; s < k.d.length; s++) {
        var d = k.d[s] * Math.min(a, 1) * (3.1 - a * 1.2);
        arr[s * 3] = d.x; arr[s * 3 + 1] = d.y - Math.max(0, a - 0.7) * 2.2; arr[s * 3 + 2] = d.z;
      }
      k.g.attributes.position.needsUpdate = true;
      k.p.material.opacity = Math.max(0, 1 - a * 0.95);
      if (a > 1) { k.p.position.set((Math.random() - 0.5) * 11, -5 + Math.random() * 9, (Math.random() - 0.5) * 5 - 1); }
    }
  };
  S3.renk = function (tema) {
    var c = new THREE.Color(tema.tint[0] / 255, tema.tint[1] / 255, tema.tint[2] / 255).lerp(new THREE.Color(0xffe0b0), 0.65);
    for (var i = 0; i < kap.length; i++) kap[i].p.material.color = c;
  };
}

/* ---- 16) Balıklar ---- */
function sahneBalik(sahne) {
  var doku = ucDoku('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="80"><g fill="#fff"><ellipse cx="70" cy="40" rx="34" ry="20"/><path d="M40 40 L6 18 L12 40 L6 62 Z"/><circle cx="88" cy="33" r="4" fill="#222"/></g></svg>');
  var N = DURUM.kalite === "yuksek" ? 22 : 12, kap = [], duz = new THREE.PlaneGeometry(0.95, 0.6);
  var renkler = [0xffd08a, 0x9ad7ff, 0xffb3d1, 0xb8f0a8, 0xd8b3ff, 0xffc39d];
  for (var i = 0; i < N; i++) {
    var m = new THREE.Mesh(duz, new THREE.MeshBasicMaterial({ map: doku, transparent: true, opacity: 0.72, depthWrite: false, side: THREE.DoubleSide, color: renkler[i % renkler.length] }));
    m.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 7 - 1);
    m.scale.setScalar(0.5 + Math.random() * 0.9);
    kap.push({ m: m, h: 0.01 + Math.random() * 0.03, f: Math.random() * 6.28, s: 0.4 + Math.random() * 0.8, e: (Math.random() - 0.5) * 0.4 });
    sahne.add(m);
  }
  S3.guncelle = function (t) {
    for (var i = 0; i < kap.length; i++) {
      var k = kap[i];
      k.m.position.x += k.h;
      k.m.position.y += Math.sin(t * k.s + k.f) * 0.006 + k.e * 0.002;
      k.m.rotation.z = Math.sin(t * k.s * 1.5 + k.f) * 0.16;
      if (k.m.position.x > 8.5) { k.m.position.x = -8.5; k.m.position.y = (Math.random() - 0.5) * 9; }
    }
  };
  S3.renk = null;
}

/* (UC_KURUCULAR yukarıda, 22 sahne ile tanımlıdır) */

function ucSahneKur(id) {
  if (!S3.hazir || !UC_KURUCULAR[id]) id = "yildiz";
  UC_SAHNE_ID = id; S3.guncelle = null; S3.renk = null;
  S3.toz = S3.taze = S3.cekirdek = S3.ic = S3.halka1 = S3.halka2 = null;
  var s = S3.sahne;
  while (s.children.length) s.remove(s.children[0]);
  UC_KURUCULAR[id](s);
  sahneRenk(temaBul(DURUM.tema));
  try { localStorage.setItem("usk-3d-sahne", id); } catch (e) { }
  ucPanelTazele();
}

/* Kamera uzaklığı ekran genişliğine göre (telefonda sahne biraz uzaktan görünür) */
function kameraUzaklik() {
  var w = window.innerWidth;
  if (w < 620) return 9.4;
  if (w < 1000) return 8.2;
  return 7.2;
}
/* Pencere boyutu değişince tuvali ve kamerayı güncelle */
function boyutla() {
  if (!S3.hazir) return;
  S3.kamera.aspect = window.innerWidth / window.innerHeight;
  S3.kamera.position.z = kameraUzaklik();
  S3.kamera.updateProjectionMatrix();
  S3.cizici.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  S3.cizici.setSize(window.innerWidth, window.innerHeight);
}

function ucBoyut() {
  if (typeof THREE === "undefined") { el("bgKapak").style.display = "none"; return; }
  var kap = el("bg");
  var cizici = new THREE.WebGLRenderer({ canvas: kap, antialias: true, alpha: true });
  var sahne = new THREE.Scene();
  var kamera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
  kamera.position.set(0, 0, kameraUzaklik());
  cizici.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  cizici.setSize(window.innerWidth, window.innerHeight);
  sahne.fog = new THREE.FogExp2(0x0b0c0e, 0.055);
  S3.sahne = sahne; S3.cizici = cizici; S3.kamera = kamera; S3.hazir = 1;
  ucSahneKur(UC_SAHNE_ID);
  if (!S3.guncelle) S3.guncelle = function () { };
  window.addEventListener("resize", boyutla);
  window.addEventListener("mousemove", function (e) {
    S3.fare.x = (e.clientX / window.innerWidth - 0.5) * 2;
    S3.fare.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  el("bgKapak").style.display = "none";
  dongu();
}

function dongu() {
  if (!S3.hazir) return;
  requestAnimationFrame(dongu);
  if (!S3.aktif) return;
  S3.t += 0.006;
  if (S3.guncelle) S3.guncelle(S3.t);
  S3.kamera.position.x += (S3.fare.x * 0.85 - S3.kamera.position.x) * 0.045;
  S3.kamera.position.y += (-S3.fare.y * 0.6 - S3.kamera.position.y) * 0.045;
  S3.kamera.lookAt(0, 0, 0);
  S3.cizici.render(S3.sahne, S3.kamera);
}

function sahneRenk(t) {
  if (!S3.hazir) return;
  var r = t.tint[0] / 255, g = t.tint[1] / 255, b = t.tint[2] / 255;
  var c = new THREE.Color(r, g, b);
  if (S3.toz && S3.toz.material.uniforms && S3.toz.material.uniforms.uTint) S3.toz.material.uniforms.uTint.value = c;
  if (S3.cekirdek) S3.cekirdek.material.color = c;
  if (S3.halka1) S3.halka1.material.color = c.clone().lerp(new THREE.Color(0xffffff), 0.35);
  if (S3.halka2) S3.halka2.material.color = c;
  if (S3.ic) S3.ic.material.color = c.clone().lerp(new THREE.Color(0xffffff), 0.5);
  if (S3.sahne && S3.sahne.fog) S3.sahne.fog.color = new THREE.Color(t.koyu ? t.v.arka : t.v.arka2);
  if (S3.taze) for (var i = 0; i < S3.taze.length; i++) S3.taze[i].m.material.color = c.clone().lerp(new THREE.Color(0xffffff), 0.4);
  if (typeof S3.renk === "function") S3.renk(t);
}

/* ---- 3D sahne seçici (üst çubuktaki 🌌 düğmesi) ---- */
function ucPanelKur() {
  if (el("ucPanel")) return;
  var d = document.createElement("div");
  d.id = "ucPanel"; d.className = "ucPanel";
  document.body.appendChild(d);
  ucPanelTazele();
}
function ucPanelTazele() {
  var d = el("ucPanel"); if (!d) return;
  var h = '<div class="ucBas"><span>🌌 3D SAHNE SEÇ</span>' +
    '<button class="minumBtn" onclick="ucPanelKapat()">✕</button></div><div class="ucIzgara">';
  for (var i = 0; i < UC_SAHNELER.length; i++) {
    var s = UC_SAHNELER[i];
    h += '<button class="ucOge' + (s.id === UC_SAHNE_ID ? " secili" : "") + '" onclick="ucSahneSec(\'' + s.id + '\')">' +
      '<span class="ucSimge">' + s.simge + '</span><span class="ucAd">' + esc(s.ad) + '</span>' +
      '<span class="ucNot">' + esc(s.not) + "</span></button>";
  }
  h += '</div><div class="ucAlt"><b>' + UC_SAHNELER.length + ' sahne</b> · Sahne seçimin kayıtlı kalır · ' +
    'Kapalıyken sayfa daha hızlı açılır: <button class="miniBtn" onclick="ucBoyutAcKapa();ucPanelTazele()">' +
    (DURUM.uc ? "🌌 3D: AÇIK" : "🌌 3D: KAPALI") + "</button></div>";
  d.innerHTML = h;
}
function ucPanelAc() { ucPanelKur(); var d = el("ucPanel"); if (d) d.classList.add("gor"); ucPanelTazele(); }
function ucPanelKapat() { var d = el("ucPanel"); if (d) d.classList.remove("gor"); }
function ucSahneSec(id) {
  if (S3.hazir) ucSahneKur(id);
  else { UC_SAHNE_ID = id; try { localStorage.setItem("usk-3d-sahne", id); } catch (e) { } }
  var s = null;
  for (var i = 0; i < UC_SAHNELER.length; i++) if (UC_SAHNELER[i].id === id) s = UC_SAHNELER[i];
  if (s) { try { alertYerine("🎨 3D sahne değişti: " + s.simge + " " + s.ad); } catch (e) { } }
  ucPanelTazele();
}
function alertYerine(m) {
  var k = el("ucBilgi");
  if (!k) { k = document.createElement("div"); k.id = "ucBilgi"; k.className = "ucBilgi"; document.body.appendChild(k); }
  k.textContent = m; k.classList.add("gor");
  setTimeout(function () { k.classList.remove("gor"); }, 2200);
}

function ucDugmeYaz() {
  var d = el("ucDugme"); if (!d) return;
  if (!DURUM.uc) { d.textContent = "🌌 3D: KAPALI"; return; }
  var s = null;
  for (var i = 0; i < UC_SAHNELER.length; i++) if (UC_SAHNELER[i].id === UC_SAHNE_ID) s = UC_SAHNELER[i];
  d.textContent = s ? (s.simge + " " + s.ad) : "🌌 3D: AÇIK";
}
function ucBoyutAcKapa() {
  DURUM.uc = !DURUM.uc;
  S3.aktif = DURUM.uc ? 1 : 0;
  el("bg").style.display = DURUM.uc ? "block" : "none";
  el("bgKapak").style.display = DURUM.uc ? "none" : "none";
  ucDugmeYaz();
  try { localStorage.setItem("usk-3d", DURUM.uc ? "1" : "0"); } catch (e) { }
}

/* ---------------- AÇILIŞ ------------------------------------------------- */

/* ================== GÜNÜN SÖZÜ (âyet / hadis) — her gün otomatik değişir ================== */
var GUN = { gun: -1, acik: 0 };

function gunGunNo() {                       /* yerel güne göre gün numarası (gece yarısı değişir) */
  var d = new Date();
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}
function gunSira() {
  var n = (typeof GUNUN_SOZLERI !== "undefined") ? GUNUN_SOZLERI.length : 0;
  if (!n) return -1;
  return ((gunGunNo() % n) + n) % n;
}
function gunSoz() {
  var i = gunSira();
  return i < 0 ? null : GUNUN_SOZLERI[i];
}
function gunBaslik(s) { return s.t === "ayet" ? "📖 GÜNÜN ÂYETİ" : "🕋 GÜNÜN HADİSİ"; }
function gunKisa(t, n) { t = String(t || ""); return t.length > n ? t.slice(0, n - 1).trim() + "…" : t; }

function gunKur() {                          /* üst sağdaki ince şerit */
  var kap = el("gunPil"); if (!kap) return;
  var s = gunSoz(); if (!s) { kap.style.display = "none"; return; }
  kap.style.display = "";
  kap.innerHTML = "<b>" + esc(gunBaslik(s)) + "</b>" +
    '<span class="gpMetin">' + esc(gunKisa(s.tr, 62)) + "</span>";
  GUN.gun = gunGunNo();
}

function gunYenile() {                        /* gece yarısını geçince kendiliğinden yenilenir */
  if (gunGunNo() !== GUN.gun) { gunKur(); if (GUN.acik) gunAc(); }
}

function gunAc() {                            /* tam metin: Arapça + Türkçe + kaynak */
  var s = gunSoz(); if (!s) return;
  gunKapat();
  var p = document.createElement("div");
  p.className = "gunPerde"; p.id = "gunPerde";
  p.setAttribute("onclick", "if(event.target===this)gunKapat()");
  var tarih = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  var h = '<div class="gunKart" role="dialog" aria-label="Günün sözü">' +
    '<div class="gunBas"><b>' + esc(gunBaslik(s)) + "</b><small>" + esc(tarih) + " · yarın kendiliğinden değişir</small></div>";
  if (s.ar) h += '<div class="gunArap" lang="ar" dir="rtl">' + esc(s.ar) + "</div>";
  h += '<div class="gunTr">' + esc(s.tr) + "</div>" +
    '<div class="gunKaynak">Kaynak: ' + esc(s.k) + (s.t === "ayet" ? " (meâl: Diyanet İşleri Başkanlığı)" : "") + "</div>" +
    '<div class="gunDugmeSira">' +
      '<button class="miniBtn" onclick="gunPaylas()">📋 Sözü Kopyala</button>' +
      '<button class="miniBtn" onclick="gunWhatsapp()">💬 WhatsApp&#39;ta Paylaş</button>' +
      '<button class="miniBtn" onclick="gunKapat()">✕ Kapat</button>' +
    "</div></div>";
  p.innerHTML = h;
  document.body.appendChild(p);
  GUN.acik = 1;
}
function gunKapat() {
  var p = el("gunPerde"); if (p) p.parentNode.removeChild(p);
  GUN.acik = 0;
}
function gunMetin() {
  var s = gunSoz(); if (!s) return "";
  return gunBaslik(s) + "\n\n" + (s.ar ? s.ar + "\n\n" : "") + s.tr + "\n\n— " + s.k;
}
function gunPaylas() { kopyala(gunMetin()); }
function gunWhatsapp() {
  var u = "https://wa.me/?text=" + encodeURIComponent(gunMetin() + "\n\nÜstad Kenan Kuzucu");
  window.open(u, "_blank", "noopener");
}

function basla() {
  try {
    var kb = parseFloat(localStorage.getItem("usk-kuran-yazi") || "1"); if (kb >= 0.85 && kb <= 1.7) KR.boyut = kb;
    var kg = localStorage.getItem("usk-kuran-gorunum"); if (kg === "mushaf" || kg === "okuma") KR.gorunum = kg;
    var kf = localStorage.getItem("usk-kuran-font"); if (kf) KR.mFont = kf;
    var kk = localStorage.getItem("usk-kuran-kagit"); if (kk) KR.kagit = kk;
    var krz = localStorage.getItem("usk-kuran-rozet"); if (krz) KR.rozet = krz;
    var ks = parseInt(localStorage.getItem("usk-kuran-sayfa") || "1", 10); if (ks >= 1 && ks <= 604) KR.sayfa = ks;
  } catch (e) { }
  gunKur();
  setInterval(gunYenile, 60000);
  try { var t = localStorage.getItem("usk-tema"); if (t && temaBul(t).id === t) DURUM.tema = t; } catch (e) { }
  try { var y = localStorage.getItem("usk-yazi"); if (y) DURUM.yazi = y; } catch (e) { }
  try { var u = localStorage.getItem("usk-3d"); if (u === "0") DURUM.uc = false; } catch (e) { }
  temaUygula(DURUM.tema, 0);
  yaziUygula(DURUM.yazi, 0);
  menuCiz();
  var id = (location.hash || "").replace("#", "");
  git(menüBul(id).id);
  kanalCiz();
  saatGuncelle(); setInterval(saatGuncelle, 1000);
  sozGuncelle();
  paylasDugmeleri();
  ucDugmeYaz();
  if (!DURUM.uc) el("bg").style.display = "none";
  if (DURUM.uc) { try { ucBoyut(); } catch (e) { el("bgKapak").style.display = "none"; } }
  else el("bgKapak").style.display = "none";
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { buyutKapat(); aramaKapat(); } });
}
document.addEventListener("DOMContentLoaded", basla);
