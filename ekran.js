/* ==========================================================================
   ÜSTAD SALON KENAN — GÖRÜNTÜ MOTORU (ekran.js)
   QLED ve OLED ekranlar için PARLAKLIK + NETLİK + GENİŞ RENK (P3) + HDR.
   · Panel yeteneklerini gerçekten ölçer (renk gamı, HDR, piksel oranı, GPU).
   · Görüntüyü bozmadan uygular: yerleşimi etkilemeyen saydam katman (backdrop-filter).
   · 4 profil: OTOMATİK · OLED TAM SİYAH · QLED CANLI · NET & KESKİN (TV)
   · Ayarlar tarayıcıda saklanır (usk-ekran), internet gerekmez.
   ========================================================================== */
(function () {
  "use strict";

  var SURUM = "1.0";
  var ANAHTAR = "usk-ekran";

  var E = {
    mod: "auto",          /* auto | oled | qled | net */
    parlaklik: 100,       /* % 70 - 145  */
    netlik: 100,          /* % 80 - 165  */
    doygunluk: 100,       /* % 70 - 150  */
    sicaklik: 0,          /* -30 (soğuk) .. +30 (sıcak) */
    oledSiyah: true,      /* OLED'de tam siyah zemin + siyah kırpma */
    hdr: true,            /* HDR ekranda parlaklık takviyesi */
    keskinYazi: true,     /* metin kenar keskinleştirme */
    tv: false,            /* 10 ayak (TV) profili: büyük yazı, odak halkası */
    aktif: true
  };

  var P = {};             /* panel yetenekleri (algılama) */

  /* ---------------------------------------------------------------- algılama */
  function destek(sorgu) {
    try { return !!(window.matchMedia && window.matchMedia(sorgu).matches); } catch (e) { return false; }
  }

  function gpuAdi() {
    try {
      var c = document.createElement("canvas");
      var gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) return "yok";
      var u = gl.getExtension("WEBGL_debug_renderer_info");
      var ad = u ? gl.getParameter(u.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
      gl.getExtension("WEBGL_lose_context") && gl.getExtension("WEBGL_lose_context").loseContext();
      return String(ad || "").slice(0, 90);
    } catch (e) { return "okunamadı"; }
  }

  function algila() {
    var p3 = destek("(color-gamut: p3)");
    var rec2020 = destek("(color-gamut: rec2020)");
    var hdr = destek("(dynamic-range: high)");
    var hdrVideo = destek("(video-dynamic-range: high)");
    var dpr = window.devicePixelRatio || 1;
    var bf = false;
    try { bf = !!(window.CSS && CSS.supports && (CSS.supports("backdrop-filter", "brightness(1.1)") || CSS.supports("-webkit-backdrop-filter", "brightness(1.1)"))); } catch (e) { }
    var dokunma = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    var tvUygulama = !!window.__TV_APP;

    P = {
      en: Math.round(screen.width), boy: Math.round(screen.height),
      pikselOran: Number(dpr.toFixed(2)),
      renkDerinligi: screen.colorDepth || 24,
      p3: p3, rec2020: rec2020, hdr: hdr, hdrVideo: hdrVideo,
      genisRenk: rec2020 ? "rec2020" : (p3 ? "p3" : "srgb"),
      arkaFiltre: bf,
      dokunmatik: dokunma,
      gpu: gpuAdi(),
      tv: tvUygulama || (!dokunma && screen.width >= 1280) || /TV|BRAVIA|MiBOX|AndroidTV|AFT/i.test(navigator.userAgent || ""),
      uygulama: tvUygulama ? "TV BOX" : (/; wv\)/.test(navigator.userAgent || "") ? "Android uygulama" : "Tarayıcı")
    };
    P.oneri = oneriBul();
    return P;
  }

  function oneriBul() {
    if (P.tv || P.hdr || P.genisRenk !== "srgb") return "qled";
    if (P.dokunmatik) return "oled";          /* telefonda OLED olasılığı yüksek */
    return "net";
  }

  /* ------------------------------------------------- gerçek geniş renk (P3) */
  /* sRGB → display-p3 dönüşümü (renk bilimi matrisleri) + canlılık takviyesi  */
  var M_S_RGB_XYZ = [0.4123908, 0.3575843, 0.1804808, 0.2126390, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322];
  var M_XYZ_P3 = [2.4934969, -0.9313836, -0.4027108, -0.8294890, 1.7626641, 0.0236247, 0.0358458, -0.0761724, 0.9568845];

  function _lin(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function _gam(c) { return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; }
  function _kirp(x) { return x < 0 ? 0 : (x > 1 ? 1 : x); }

  function p3Cevir(hex, canli) {
    var h = String(hex || "").trim().replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    var r = _lin(parseInt(h.slice(0, 2), 16) / 255),
        g = _lin(parseInt(h.slice(2, 4), 16) / 255),
        b = _lin(parseInt(h.slice(4, 6), 16) / 255);
    /* XYZ (D65) */
    var X = M_S_RGB_XYZ[0] * r + M_S_RGB_XYZ[1] * g + M_S_RGB_XYZ[2] * b;
    var Y = M_S_RGB_XYZ[3] * r + M_S_RGB_XYZ[4] * g + M_S_RGB_XYZ[5] * b;
    var Z = M_S_RGB_XYZ[6] * r + M_S_RGB_XYZ[7] * g + M_S_RGB_XYZ[8] * b;
    /* display-p3 doğrusal */
    var R = M_XYZ_P3[0] * X + M_XYZ_P3[1] * Y + M_XYZ_P3[2] * Z;
    var G = M_XYZ_P3[3] * X + M_XYZ_P3[4] * Y + M_XYZ_P3[5] * Z;
    var B = M_XYZ_P3[6] * X + M_XYZ_P3[7] * Y + M_XYZ_P3[8] * Z;
    /* gam dışıysa kırp (gamut eşleme) */
    R = _kirp(R); G = _kirp(G); B = _kirp(B);
    R = _gam(R); G = _gam(G); B = _gam(B);
    /* canlılık: rengi kendi parlaklığından uzaklaştır (QLED hissi) */
    canli = (canli == null) ? 1.0 : canli;
    if (canli !== 1) {
      var l = 0.2126 * R + 0.7152 * G + 0.0722 * B;
      R = _kirp(l + (R - l) * canli); G = _kirp(l + (G - l) * canli); B = _kirp(l + (B - l) * canli);
    }
    return "color(display-p3 " + R.toFixed(4) + " " + G.toFixed(4) + " " + B.toFixed(4) + ")";
  }

  var GENIS_DEGISKENLER = ["ana", "ana2", "vurgu"].concat(
    Array.apply(null, { length: 17 }).map(function (_, i) { return "b" + (i + 1); }));

  function genisRenkTemizle() {
    GENIS_DEGISKENLER.forEach(function (k) { document.documentElement.style.removeProperty("--" + k); });
  }

  function genisRenkUygula() {
    var profil = (E.mod === "auto") ? (P.oneri || "net") : E.mod;
    if (!E.aktif || !P.genisRenk || P.genisRenk === "srgb" || profil === "oled" || profil === "net") {
      genisRenkTemizle(); return 0;
    }
    var canli = (profil === "qled") ? 1.14 : 1.06;
    var bg = getComputedStyle(document.body);
    var yazilan = 0;
    GENIS_DEGISKENLER.forEach(function (k) {
      var v = (document.documentElement.style.getPropertyValue("--" + k) || bg.getPropertyValue("--" + k) || "").trim();
      var yeni = p3Cevir(v, canli);
      if (yeni) { document.documentElement.style.setProperty("--" + k, yeni); yazilan++; }
    });
    P.p3Yazilan = yazilan;
    return yazilan;
  }

  /* ------------------------------------------------------------------ filtre */
  function filtreYaz() {
    var b = E.parlaklik / 100, n = E.netlik / 100, d = E.doygunluk / 100, s = E.sicaklik / 100;

    var parlak = b, kontrast = 1, doygun = d;
    var sepya = 0, donus = 0;

    if (E.mod === "oled") {
      /* OLED: siyahları gerçek siyaha çek (kontrast yukarı), parlaklığı dengede tut */
      kontrast = 1 + 0.18 * n;
      parlak = b * (E.oledSiyah ? 0.985 : 1);
      doygun = d * 0.96;
    } else if (E.mod === "qled") {
      /* QLED: canlı renk + yüksek parlaklık + hafif kontrast */
      kontrast = 1 + 0.10 * n;
      doygun = d * 1.12;
      parlak = b * (E.hdr && P.hdr ? 1.10 : 1.04);
    } else if (E.mod === "net") {
      /* NET & KESKİN: TV/bilgisayar — kenar netliği önde, sahne kararmasın */
      kontrast = 1 + 0.12 * n;
      doygun = d * 1.05;
      parlak = b * 1.06;                 /* kontrastın karartmasını dengele */
    } else {
      /* OTOMATİK: panelden ölçülen yeteneğe göre */
      if (P.hdr) { kontrast = 1 + 0.12 * n; parlak = b * 1.06; doygun = d * 1.08; }
      else if (P.genisRenk !== "srgb") { kontrast = 1 + 0.10 * n; doygun = d * 1.06; parlak = b; }
      else { kontrast = 1 + 0.06 * n; parlak = b; doygun = d; }
    }

    if (s > 0) { sepya = s * 0.35; }                 /* sıcak: sarıya kayar */
    else if (s < 0) { donus = s * 22; sepya = Math.abs(s) * 0.06; }  /* soğuk: maviye kayar */

    var parcalar = [
      "brightness(" + parlak.toFixed(3) + ")",
      "contrast(" + kontrast.toFixed(3) + ")",
      "saturate(" + doygun.toFixed(3) + ")"
    ];
    if (sepya > 0.002) parcalar.push("sepia(" + sepya.toFixed(3) + ")");
    if (donus) parcalar.push("hue-rotate(" + donus.toFixed(1) + "deg)");
    return parcalar.join(" ");
  }

  /* --------------------------------------------------------------- uygulama */
  function stilKur() {
    if (document.getElementById("ekranStil")) return;
    var s = document.createElement("style");
    s.id = "ekranStil";
    s.textContent = [
      "/* --- görüntü katmanı: yerleşimi etkilemez --- */",
      "#ekranKat{position:fixed;inset:0;pointer-events:none;z-index:2147483000;display:none}",
      "#ekranKat.acik{display:block}",
      "#ekranKat.filtre{-webkit-backdrop-filter:var(--ekranFiltre);backdrop-filter:var(--ekranFiltre)}",
      "#ekranKat.beyaz{background:#fff;mix-blend-mode:screen;opacity:var(--ekranBeyaz)}",
      "#ekranKarart{position:fixed;inset:0;pointer-events:none;z-index:2147482999;background:#000;opacity:var(--ekranKarart);display:none}",
      "#ekranKarart.acik{display:block}",

      "/* --- OLED: tam siyah zemin, sıfır ışıma --- */",
      "body[data-ekran='oled']{--arka:#000000;--arka2:#000000;--kart:#050505;--cizgi:#141414;--kod:#0a0a0a}",
      "body[data-ekran='oled'] .govde,body[data-ekran='oled'] .icerik{background:#000}",
      "body[data-ekran='oled'] #bg{filter:brightness(.55) saturate(.8) contrast(1.05)}",
      "body[data-ekran='oled'] #bgKapak{display:none}",
      "body[data-ekran='oled'].oled-siyah #ekranKarart{background:#000}",
      "body[data-ekran='oled'] .kart,body[data-ekran='oled'] .kutu{background:#050505;border-color:#151515}",
      "body[data-ekran='oled'] .madalyon img{box-shadow:none}",

      "/* --- QLED: canlı renk, parlak vurgular --- */",
      "body[data-ekran='qled'] #bg{filter:saturate(1.18) contrast(1.06) brightness(1.04)}",
      "body[data-ekran='qled'] .icerik img,body[data-ekran='qled'] .foto img{filter:saturate(1.12) contrast(1.05)}",

      "/* --- NET & KESKİN: kenar netliği --- */",
      "body.ekran-keskin{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}",
      "body.ekran-keskin .icerik,body.ekran-keskin .ustBar,body.ekran-keskin .menuKap{-webkit-text-stroke:var(--ekranKalinlik) currentColor}",
      "body.ekran-keskin .icerik img,body.ekran-keskin .foto img{image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges}",
      "body.ekran-keskin #bg{image-rendering:auto}",

      "/* --- TV (10 ayak) profili --- */",
      "body.ekran-tv{--olcu:20px}",
      "body.ekran-tv .miniBtn{min-height:52px;padding:12px 18px;font-size:1rem}",
      "body.ekran-tv .hamburger{width:64px;height:64px;font-size:1.6rem}",
      "body.ekran-tv .icerik{font-size:1.08rem;line-height:1.75}",
      "body.ekran-tv :focus{outline:3px solid var(--ana);outline-offset:3px;border-radius:6px}",
      "body.ekran-tv .menuKap a,body.ekran-tv .menuKap button{min-height:52px;font-size:1.05rem}",
      "body.ekran-tv .yaziKutu,body.ekran-tv .kart{max-width:1600px}",

      "/* --- panel --- */",
      "#ekranPanel{position:fixed;right:14px;top:70px;width:min(420px,94vw);max-height:86vh;overflow:auto;",
      "  background:linear-gradient(180deg,var(--kart),var(--arka2));border:1px solid var(--cizgi);border-radius:16px;",
      "  box-shadow:0 24px 70px rgba(0,0,0,.6);padding:16px 16px 18px;z-index:2147483100;display:none;font-size:.94rem}",
      "#ekranPanel.acik{display:block}",
      "#ekranPanel h3{margin:0 0 4px;font-family:var(--fontBaslik);color:var(--ana);font-size:1.06rem}",
      "#ekranPanel .alt{color:var(--yazi2);font-size:.8rem;margin-bottom:10px}",
      "#ekranPanel .blok{border-top:1px dashed var(--cizgi);padding:10px 0 2px;margin-top:10px}",
      "#ekranPanel .satir{display:flex;align-items:center;gap:10px;justify-content:space-between}",
      "#ekranPanel .modlar{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0 4px}",
      "#ekranPanel .modBtn{cursor:pointer;border:1px solid var(--cizgi);background:var(--kod);color:var(--yazi);",
      "  border-radius:10px;padding:11px 10px;font-family:var(--fontGovde);font-size:.86rem;text-align:left;line-height:1.3}",
      "#ekranPanel .modBtn b{display:block;color:var(--ana2);font-size:.95rem}",
      "#ekranPanel .modBtn.sec{border-color:var(--ana);background:linear-gradient(180deg,rgba(255,255,255,.07),transparent)}",
      "#ekranPanel input[type=range]{width:100%;accent-color:var(--ana);height:26px}",
      "#ekranPanel .olcum{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:.8rem;color:var(--yazi2)}",
      "#ekranPanel .olcum b{color:var(--yazi)}",
      "#ekranPanel .anahtar{display:flex;align-items:center;gap:8px;padding:7px 0;cursor:pointer}",
      "#ekranPanel .anahtar input{width:20px;height:20px;accent-color:var(--ana)}",
      "#ekranPanel .altDugme{cursor:pointer;border:1px solid var(--cizgi);background:transparent;color:var(--yazi2);",
      "  border-radius:9px;padding:9px 12px;font-size:.82rem}",
      "#ekranPanel .altDugme:hover{color:var(--ana);border-color:var(--ana)}",
      "#ekranPanel .kapat{position:absolute;right:12px;top:10px;cursor:pointer;border:0;background:transparent;color:var(--yazi2);font-size:1.3rem}",
      "#ekranRozet{display:inline-flex;align-items:center;gap:6px;margin-top:6px;font-size:.76rem;color:var(--ana2);",
      "  background:rgba(255,255,255,.05);border:1px solid var(--cizgi);border-radius:999px;padding:4px 10px}"
    ].join("\n");
    document.head.appendChild(s);
  }

  function katmanKur() {
    if (!document.getElementById("ekranKat")) {
      var k = document.createElement("div"); k.id = "ekranKat"; document.body.appendChild(k);
      var c = document.createElement("div"); c.id = "ekranKarart"; document.body.appendChild(c);
    }
  }

  function uygula(kaydet) {
    stilKur(); katmanKur();
    var kat = document.getElementById("ekranKat");
    var karart = document.getElementById("ekranKarart");
    var f = filtreYaz();

    document.documentElement.style.setProperty("--ekranFiltre", f);
    var kalinlik = 0.15 * (E.netlik / 100) * ((P.pikselOran && P.pikselOran >= 2) ? 1.5 : 1);
    if (P.tv || E.tv) kalinlik *= 1.25;                    /* TV: 10 ayaktan bakılıyor */
    document.documentElement.style.setProperty("--ekranKalinlik", Math.min(0.45, kalinlik).toFixed(2) + "px");

    /* parlaklık/doygunluk: arka filtre destekleniyorsa tek katman, yoksa beyaz/siyah katman */
    var beyaz = 0, karartma = 0;
    if (P.arkaFiltre) {
      kat.className = "acik filtre";
      kat.style.opacity = "";
      karart.className = "";
    } else {
      kat.className = "acik beyaz"; kat.style.opacity = "";
      if (E.parlaklik > 100) beyaz = Math.min(0.28, (E.parlaklik - 100) / 100 * 0.55);
      if (E.parlaklik < 100) karartma = Math.min(0.5, (100 - E.parlaklik) / 100 * 0.8);
      document.documentElement.style.setProperty("--ekranBeyaz", beyaz.toFixed(3));
      karart.className = karartma > 0.001 ? "acik" : "";
      karart.style.opacity = karartma.toFixed(3);
    }
    document.documentElement.style.setProperty("--ekranKarart", karartma.toFixed(3));

    document.body.setAttribute("data-ekran", E.mod === "auto" ? (P.oneri || "net") : E.mod);
    document.body.classList.toggle("ekran-keskin", !!E.keskinYazi && E.mod !== "auto");
    document.body.classList.toggle("oled-siyah", !!E.oledSiyah);
    document.body.classList.toggle("ekran-tv", !!E.tv);
    if (!E.aktif) { kat.className = ""; karart.className = ""; }

    rozetYaz();
    genisRenkUygula();
    if (kaydet) { try { localStorage.setItem(ANAHTAR, JSON.stringify(E)); } catch (e) { } }
    return f;
  }

  /* -------------------------------------------------------------------- panel */
  function panelKur() {
    if (document.getElementById("ekranPanel")) return;
    var d = document.createElement("div");
    d.id = "ekranPanel";
    d.innerHTML = [
      '<button class="kapat" id="ekranKapat" title="Kapat">✕</button>',
      '<h3>🔆 EKRAN — QLED &amp; OLED</h3>',
      '<div class="alt" id="ekranAlgi"></div>',
      '<div class="modlar" id="ekranModlar"></div>',
      '<div class="blok">',
      '  <div class="satir"><span>Parlaklık</span><b id="ekranParlakY">%100</b></div>',
      '  <input type="range" id="ekranParlak" min="70" max="145" value="100">',
      '  <div class="satir"><span>Netlik (keskinlik)</span><b id="ekranNetY">%100</b></div>',
      '  <input type="range" id="ekranNet" min="80" max="165" value="100">',
      '  <div class="satir"><span>Renk doygunluğu</span><b id="ekranDoyY">%100</b></div>',
      '  <input type="range" id="ekranDoy" min="70" max="150" value="100">',
      '  <div class="satir"><span>Sıcaklık</span><b id="ekranSicY">0</b></div>',
      '  <input type="range" id="ekranSic" min="-30" max="30" value="0">',
      '</div>',
      '<div class="blok" id="ekranAnahtarlar">',
      '  <label class="anahtar"><input type="checkbox" id="ekranOled"> <span>OLED tam siyah (ışımayı keser, gerçek siyah)</span></label>',
      '  <label class="anahtar"><input type="checkbox" id="ekranHdr"> <span>HDR/QLED parlaklık takviyesi</span></label>',
      '  <label class="anahtar"><input type="checkbox" id="ekranKeskin"> <span>Keskin yazı (kenar netleştirme)</span></label>',
      '  <label class="anahtar"><input type="checkbox" id="ekranTv"> <span>TV profili (büyük yazı, kumanda odağı)</span></label>',
      '</div>',
      '<div class="blok satir">',
      '  <button class="altDugme" id="ekranSifirla">↺ Sıfırla</button>',
      '  <button class="altDugme" id="ekranKarsilastir">👁 Karşılaştır</button>',
      '</div>',
      '<div class="blok"><div class="olcum" id="ekranOlcum"></div></div>'
    ].join("\n");
    document.body.appendChild(d);

    document.getElementById("ekranKapat").onclick = panelKapat;
    document.getElementById("ekranParlak").oninput = function () { E.parlaklik = +this.value; yaziGuncelle(); uygula(1); };
    document.getElementById("ekranNet").oninput = function () { E.netlik = +this.value; yaziGuncelle(); uygula(1); };
    document.getElementById("ekranDoy").oninput = function () { E.doygunluk = +this.value; yaziGuncelle(); uygula(1); };
    document.getElementById("ekranSic").oninput = function () { E.sicaklik = +this.value; yaziGuncelle(); uygula(1); };
    document.getElementById("ekranOled").onchange = function () { E.oledSiyah = this.checked; uygula(1); };
    document.getElementById("ekranHdr").onchange = function () { E.hdr = this.checked; uygula(1); };
    document.getElementById("ekranKeskin").onchange = function () { E.keskinYazi = this.checked; uygula(1); };
    document.getElementById("ekranTv").onchange = function () { E.tv = this.checked; uygula(1); };
    document.getElementById("ekranSifirla").onclick = function () { sifirla(); };
    var k = document.getElementById("ekranKarsilastir");
    k.addEventListener("pointerdown", karsilastirAc);
    k.addEventListener("pointerup", karsilastirKapat);
    k.addEventListener("pointerleave", karsilastirKapat);
    k.addEventListener("click", function () { karsilastirAc(); setTimeout(karsilastirKapat, 1600); });
  }

  var MODLAR = [
    { id: "auto", ad: "OTOMATİK", aciklama: "Panelden ölçülene göre" },
    { id: "oled", ad: "OLED TAM SİYAH", aciklama: "Gerçek siyah, sıfır ışıma" },
    { id: "qled", ad: "QLED CANLI", aciklama: "Parlak + geniş renk" },
    { id: "net", ad: "NET & KESKİN", aciklama: "TV / bilgisayar" }
  ];

  function panelCiz() {
    panelKur();
    var a = document.getElementById("ekranAlgi");
    var m = document.getElementById("ekranModlar");
    m.innerHTML = MODLAR.map(function (x) {
      return '<button class="modBtn' + (E.mod === x.id ? " sec" : "") + '" data-mod="' + x.id + '"><b>' + x.ad +
        "</b>" + x.aciklama + "</button>";
    }).join("");
    [].slice.call(m.querySelectorAll(".modBtn")).forEach(function (b) {
      b.onclick = function () { mod(b.getAttribute("data-mod")); };
    });
    a.innerHTML = "📺 <b>" + P.en + "×" + P.boy + "</b> · " + P.pikselOran + "x piksel · " + P.renkDerinligi + " bit · " +
      (P.rec2020 ? "REC2020" : P.p3 ? "P3 geniş renk" : "sRGB") +
      (P.hdr ? " · HDR ✔" : "") + "<br>" + P.uygulama + " · " + P.gpu.slice(0, 42) +
      '<br><span id="ekranRozet"></span>';
    yaziGuncelle();
    olcumCiz();
  }

  function yaziGuncelle() {
    var p = document.getElementById("ekranParlakY"), n = document.getElementById("ekranNetY");
    var d = document.getElementById("ekranDoyY"), s = document.getElementById("ekranSicY");
    if (p) p.textContent = "%" + E.parlaklik;
    if (n) n.textContent = "%" + E.netlik;
    if (d) d.textContent = "%" + E.doygunluk;
    if (s) s.textContent = (E.sicaklik > 0 ? "+" : "") + E.sicaklik;
    var r = document.getElementById("ekranParlak"); if (r) r.value = E.parlaklik;
    var r2 = document.getElementById("ekranNet"); if (r2) r2.value = E.netlik;
    var r3 = document.getElementById("ekranDoy"); if (r3) r3.value = E.doygunluk;
    var r4 = document.getElementById("ekranSic"); if (r4) r4.value = E.sicaklik;
    var o = document.getElementById("ekranOled"); if (o) o.checked = !!E.oledSiyah;
    var h = document.getElementById("ekranHdr"); if (h) h.checked = !!E.hdr;
    var k = document.getElementById("ekranKeskin"); if (k) k.checked = !!E.keskinYazi;
    var t = document.getElementById("ekranTv"); if (t) t.checked = !!E.tv;
  }

  function olcumCiz() {
    var o = document.getElementById("ekranOlcum");
    if (!o) return;
    var satir = [];
    satir.push("<b>Uygulanan filtre</b><span>" + filtreYaz() + "</span>");
    satir.push("<b>Profil</b><span>" + (E.mod === "auto" ? "OTOMATİK → " + (P.oneri || "net").toUpperCase() : E.mod.toUpperCase()) + "</span>");
    satir.push("<b>Katman</b><span>" + (P.arkaFiltre ? "backdrop-filter (yerleşim bozulmaz)" : "beyaz/siyah katman (yedek)") + "</span>");
    satir.push("<b>Geniş renk</b><span>" + (P.genisRenk === "srgb" ? "sRGB (panel desteklemiyor)" :
      (P.genisRenk === "rec2020" ? "REC2020" : "display-p3") + " · " + (P.p3Yazilan || 0) + " renk değişkeni dönüştürüldü") + "</span>");
    satir.push("<b>Önerilen</b><span>" + (P.oneri || "-").toUpperCase() + "</span>");
    o.innerHTML = satir.join("");
  }

  function rozetYaz() {
    var r = document.getElementById("ekranRozet");
    var r2 = document.getElementById("ekranDugme");
    var et = "QLED";
    if (E.mod === "oled" || (E.mod === "auto" && P.oneri === "oled")) et = "OLED";
    else if (E.mod === "net") et = "NET";
    else if (E.mod === "qled" || (E.mod === "auto" && P.oneri === "qled")) et = "QLED";
    if (r2) r2.textContent = "🔆 Ekran: " + et + (E.parlaklik !== 100 ? " %" + E.parlaklik : "");
    if (r) {
      var p = [];
      if (P.p3) p.push("P3");
      if (P.rec2020) p.push("REC2020");
      if (P.hdr) p.push("HDR");
      if (E.oledSiyah) p.push("tam siyah");
      r.textContent = "✔ " + et + " etkin" + (p.length ? " · " + p.join(" · ") : "");
    }
  }

  /* ------------------------------------------------------------------- API */
  function mod(id) {
    E.mod = id;
    if (id === "oled") { E.oledSiyah = true; }
    if (id === "qled" && E.parlaklik < 105) E.parlaklik = 108;
    if (id === "net" && E.netlik < 110) E.netlik = 118;
    panelCiz(); uygula(1);
    return E.mod;
  }

  function ayar(k, v) {
    if (!(k in E)) return null;
    E[k] = v; yaziGuncelle(); olcumCiz(); uygula(1);
    return E[k];
  }

  function sifirla() {
    E.mod = "auto"; E.parlaklik = 100; E.netlik = 100; E.doygunluk = 100; E.sicaklik = 0;
    E.oledSiyah = true; E.hdr = true; E.keskinYazi = true;
    panelCiz(); uygula(1);
  }

  var _yedekFiltre = "";
  function karsilastirAc() { _yedekFiltre = E.aktif ? filtreYaz() : ""; E.aktif = false; uygula(0); }
  function karsilastirKapat() { E.aktif = true; uygula(0); }

  function panelAc() {
    panelKur(); panelCiz();
    document.getElementById("ekranPanel").classList.add("acik");
  }
  function panelKapat() {
    var d = document.getElementById("ekranPanel"); if (d) d.classList.remove("acik");
  }
  function panelDegistir() {
    var d = document.getElementById("ekranPanel");
    if (!d) { panelAc(); return; }
    if (d.classList.contains("acik")) panelKapat(); else panelAc();
  }

  function dugmeKur() {
    if (document.getElementById("ekranDugme")) return;
    var serit = document.querySelector(".aracSerit");
    if (!serit) return;
    var b = document.createElement("button");
    b.className = "miniBtn"; b.id = "ekranDugme"; b.type = "button";
    b.title = "QLED / OLED ekran parlaklığı ve netliği";
    b.textContent = "🔆 Ekran";
    b.onclick = panelDegistir;
    var uc = document.getElementById("ucDugme");
    if (uc && uc.parentNode === serit) serit.insertBefore(b, uc.nextSibling);
    else serit.appendChild(b);
  }

  /* ------------------------------------------------------------------ açılış */
  function yukle() {
    try {
      var s = localStorage.getItem(ANAHTAR);
      if (s) {
        var o = JSON.parse(s);
        for (var k in E) if (k in o && typeof o[k] === typeof E[k]) E[k] = o[k];
      }
    } catch (e) { }
  }

  function tvProfil() {
    if (P.tv) { E.tv = true; if (E.mod === "auto") E.mod = "auto"; }
  }

  function temaSarmala() {
    if (typeof window.temaUygula !== "function" || window.temaUygula.__ekran) return;
    var eski = window.temaUygula;
    var yeni = function () {
      var r = eski.apply(this, arguments);
      try { setTimeout(function () { genisRenkUygula(); }, 0); } catch (e) { }
      return r;
    };
    yeni.__ekran = true; window.temaUygula = yeni;
  }

  function hazir() {
    algila();
    yukle();
    tvProfil();
    uygula(0);
    dugmeKur();
    panelKur();
    temaSarmala();
    rozetYaz();
    /* geniş renk / HDR algılaması değişirse yeniden uygula */
    try {
      ["(color-gamut: p3)", "(dynamic-range: high)"].forEach(function (s) {
        var mq = window.matchMedia(s);
        var f = function () { algila(); uygula(1); };
        if (mq.addEventListener) mq.addEventListener("change", f); else if (mq.addListener) mq.addListener(f);
      });
    } catch (e) { }
    window.addEventListener("resize", function () { algila(); rozetYaz(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(hazir, 60); });
  else setTimeout(hazir, 60);

  /* dışarıya açık (ölçüm ve yönetim için) */
  window.EKRAN = {
    surum: SURUM,
    V: function () { return JSON.parse(JSON.stringify(E)); },
    P: function () { return JSON.parse(JSON.stringify(P)); },
    mod: mod, ayar: ayar, sifirla: sifirla,
    panelAc: panelAc, panelKapat: panelKapat, panelDegistir: panelDegistir,
    filtre: filtreYaz, uygula: function () { return uygula(1); },
    algila: function () { return algila(); },
    profil: function () { return E.mod === "auto" ? (P.oneri || "net") : E.mod; },
    p3Cevir: p3Cevir,
    /* panel P3 desteklemiyorsa bile dönüşüm yolunu sınamak için (ölçüm/kanıt) */
    genisRenkZorla: function (tip) {
      if (tip) { P.genisRenk = tip; } else { algila(); }
      return genisRenkUygula();
    },
    genisRenk: function () { return genisRenkUygula(); },
    rozet: function () { var r = document.getElementById("ekranDugme"); return r ? r.textContent : ""; }
  };
})();
