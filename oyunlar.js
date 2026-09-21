/* ==========================================================================
   🎮 OYUNLAR — çekirdek (lobi, skor, 3D yardımcıları, bilgi yarışması motoru)
   ÜSTAD KENAN KUZUCU · USTAD-SALON-KENAN-WEB
   Tahta oyunları ayrı dosyalarda: oyun-dama.js · oyun-satranc.js · oyun-tavla.js
   ========================================================================== */
(function () {
  "use strict";

  var SKOR_ANAHTAR = "usk-oyun-skor";

  /* ---------------- oyun listesi ---------------- */
  var LIG = [
    { id: "dama",     ad: "ÜSTADIN DAMASI",        simge: "⚪", renk: "#e8a33d", tur: "Tahta", zor: "Orta",
      kisa: "Gerçek ahşap tahtada Türk daması — uçan damalar, yapay zekâ rakibi.", not: "Yapay zekâya karşı" },
    { id: "satranc",  ad: "ÜSTADIN SATRANCI",     simge: "♞", renk: "#b9a06a", tur: "Tahta", zor: "Zor",
      kisa: "İşlenmiş ahşap taşlarla tam kurallı satranç: rok, terfi, şah, mat.", not: "Yapay zekâya karşı" },
    { id: "tavla",    ad: "ÜSTADIN TAVLASI",       simge: "🎲", renk: "#c9a227", tur: "Tahta", zor: "Orta",
      kisa: "Gerçek çekme-tavla: zar, kırma, toplama; yapay zekâ rakibi.", not: "Yapay zekâya karşı" },
    { id: "milyoner", ad: "ÜSTADIN MİLYONERİ",    simge: "💰", renk: "#d94f6a", tur: "Yarışma", zor: "Zor",
      kisa: "Kim 500 Milyar İster usulü 15 soruluk ödül merdiveni · 50:50 ve seyirci jokerleri.", not: "15 soru" },
    { id: "kultur",   ad: "ÜSTADIN GENEL KÜLTÜRÜ", simge: "🌍", renk: "#2fb4d8", tur: "Yarışma", zor: "Kolay",
      kisa: "Coğrafya, bilim, sanat ve spor karışık bilgi yarışması.", not: "10 soru" },
    { id: "tarih",    ad: "ÜSTADIN TARİH YARIŞMASI", simge: "🏛️", renk: "#8fae3a", tur: "Yarışma", zor: "Orta",
      kisa: "Türk ve dünya tarihi soruları, süreli yarışma.", not: "10 soru" },
    { id: "zeka",     ad: "ÜSTADIN ZEKÂ TESTİ",    simge: "🧠", renk: "#8f79e8", tur: "Test", zor: "Orta",
      kisa: "Sayı dizileri, şekil örüntüleri ve mantık sorularıyla zekâ ölçümü.", not: "12 soru" }
  ];
  window.OYUN_LIGI = LIG;

  function skorlar() {
    try { return JSON.parse(localStorage.getItem(SKOR_ANAHTAR) || "{}") || {}; } catch (e) { return {}; }
  }
  function skorYaz(id, puan) {
    var s = skorlar();
    if (!s[id]) s[id] = { enIyi: 0, oynanma: 0, son: 0 };
    s[id].oynanma++;
    s[id].son = puan;
    if (puan > (s[id].enIyi || 0)) s[id].enIyi = puan;
    try { localStorage.setItem(SKOR_ANAHTAR, JSON.stringify(s)); } catch (e) { }
    return s[id];
  }
  window.oyunSkor = function (id) { var s = skorlar(); return s[id] || { enIyi: 0, oynanma: 0, son: 0 }; };
  window.oyunSkorYaz = skorYaz;

  /* ---------------- yardımcılar ---------------- */
  function el(i) { return document.getElementById(i); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function uyari(m) { if (typeof window.uyari === "function") window.uyari(m); }
  function karistir(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  window.oyunUyari = uyari;

  /* seçenekleri karıştır ve doğru cevabın yeni yerini bul */
  function secenekKaristir(s) {
    var kap = karistir(s.s.map(function (_, i) { return i; }));
    var y = {};
    for (var a in s) if (Object.prototype.hasOwnProperty.call(s, a)) y[a] = s[a];
    y.s = kap.map(function (i) { return s.s[i]; });
    y.c = kap.indexOf(s.c);
    return y;
  }
  window.oyunSecenekKaristir = secenekKaristir;

  /* ================= 3D YARDIMCISI (Three.js) ================= */
  /* oyun tahtaları için sahne + ışık + gölge + fare ile döndürme + tıklama ışını */
  window.OYUN3D = function (kapId, secenek) {
    var kap = el(kapId);
    if (!kap || typeof THREE === "undefined") return null;
    secenek = secenek || {};
    var W = kap.clientWidth || 700, H = secenek.yukseklik || 520;
    var sahne = new THREE.Scene();
    var kamera = new THREE.PerspectiveCamera(secenek.fov || 42, W / H, 0.1, 200);
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    kap.innerHTML = "";
    kap.appendChild(renderer.domElement);
    renderer.domElement.className = "o3Tuval";

    /* ışıklar — "tatlı" görünüm: yumuşak ana ışık + sıcak dolgu + parlak tepe */
    sahne.add(new THREE.HemisphereLight(0xfff2d5, 0x2a2016, 0.85));
    var ana = new THREE.DirectionalLight(0xffffff, 0.95);
    ana.position.set(6, 12, 7);
    ana.castShadow = true;
    ana.shadow.mapSize.set(1024, 1024);
    ana.shadow.camera.left = -12; ana.shadow.camera.right = 12;
    ana.shadow.camera.top = 12; ana.shadow.camera.bottom = -12;
    ana.shadow.bias = -0.0016;
    sahne.add(ana);
    var dolgu = new THREE.PointLight(0xffcf7a, 0.55, 60);
    dolgu.position.set(-8, 7, -6);
    sahne.add(dolgu);

    var grup = new THREE.Group();
    sahne.add(grup);

    /* döndürme / yakınlaştırma */
    var kure = { yatay: secenek.yatay || 0, dikey: secenek.dikey || 0.95, uzak: secenek.uzak || 16 };
    var cekiliyor = false, sonX = 0, sonY = 0, surukledi = false;
    function bak() {
      var x = kure.uzak * Math.sin(kure.dikey) * Math.sin(kure.yatay);
      var z = kure.uzak * Math.sin(kure.dikey) * Math.cos(kure.yatay);
      var y = kure.uzak * Math.cos(kure.dikey);
      kamera.position.set(x, y, z);
      kamera.lookAt(0, 0, 0);
    }
    bak();
    kap.addEventListener("pointerdown", function (e) { cekiliyor = true; surukledi = false; sonX = e.clientX; sonY = e.clientY; });
    window.addEventListener("pointerup", function () { cekiliyor = false; });
    window.addEventListener("pointermove", function (e) {
      if (!cekiliyor) return;
      var dx = e.clientX - sonX, dy = e.clientY - sonY;
      if (Math.abs(dx) + Math.abs(dy) > 6) surukledi = true;
      sonX = e.clientX; sonY = e.clientY;
      kure.yatay -= dx * 0.008;
      kure.dikey = Math.max(0.28, Math.min(1.45, kure.dikey - dy * 0.006));
      bak();
    });
    kap.addEventListener("wheel", function (e) {
      e.preventDefault();
      kure.uzak = Math.max(9, Math.min(34, kure.uzak + (e.deltaY > 0 ? 1 : -1)));
      bak();
    }, { passive: false });

    var dokunulabilir = [];          /* tıklanabilir nesneler */
    var animasyonlar = [];
    var duruyor = false;

    function tween(nesne, hedef, sure, bitti) {
      animasyonlar.push({ n: nesne, bas: null, sure: sure, hedef: hedef, bitti: bitti, ilk: null });
    }
    function kare(t) {
      if (duruyor) return;
      requestAnimationFrame(kare);
      for (var i = animasyonlar.length - 1; i >= 0; i--) {
        var a = animasyonlar[i];
        if (a.bas === null) { a.bas = t; a.ilk = { x: a.n.position.x, y: a.n.position.y, z: a.n.position.z }; }
        var k = Math.min(1, (t - a.bas) / a.sure);
        var y = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;   /* easeInOutQuad */
        a.n.position.x = a.ilk.x + (a.hedef.x - a.ilk.x) * y;
        a.n.position.y = a.ilk.y + (a.hedef.y - a.ilk.y) * y + Math.sin(k * Math.PI) * (a.hedef.hop || 0);
        a.n.position.z = a.ilk.z + (a.hedef.z - a.ilk.z) * y;
        if (k >= 1) { animasyonlar.splice(i, 1); if (a.bitti) a.bitti(); }
      }
      if (secenek.herKare) secenek.herKare(t);
      renderer.render(sahne, kamera);
    }
    requestAnimationFrame(kare);
    window.addEventListener("resize", function () { boyutla(); });
    function boyutla() {
      if (!kap.clientWidth) return;
      W = kap.clientWidth; H = secenek.yukseklik || 520;
      kamera.aspect = W / H; kamera.updateProjectionMatrix(); renderer.setSize(W, H);
    }

    /* tıklama → nesne bul */
    var ray = new THREE.Raycaster(), fare = new THREE.Vector2();
    var tikFonksiyon = null;
    kap.addEventListener("click", function (e) {
      if (surukledi || !tikFonksiyon) return;
      var r = renderer.domElement.getBoundingClientRect();
      fare.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      fare.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(fare, kamera);
      var isaretliler = ray.intersectObjects(dokunulabilir.map(function (d) { return d.n; }), true);
      if (!isaretliler.length) { tikFonksiyon(null); return; }
      var n = isaretliler[0].object;
      while (n && !n.userData.oyunId) n = n.parent;
      tikFonksiyon(n ? n.userData.oyunId : null, isaretliler[0]);
    });

    return {
      sahne: sahne, kamera: kamera, renderer: renderer, grup: grup,
      ekle: function (n, id, dokun) { grup.add(n); n.userData.oyunId = id; if (dokun !== false) dokunulabilir.push({ n: n, id: id }); return n; },
      temizle: function () { dokunulabilir = []; animasyonlar = []; while (grup.children.length) { var c = grup.children.pop(); grup.remove(c); } },
      tikla: function (f) { tikFonksiyon = f; },
      tween: tween,
      bekle: function (ms) { return new Promise(function (c) { setTimeout(c, ms); }); },
      bak: bak, kure: kure, boyutla: boyutla,
      durdur: function () { duruyor = true; }
    };
  };

  /* ================= ÜSTAD MARKA ŞERİDİ ================= */
  window.oyunMarka = function (oyunAdi, altYazi) {
    return '<div class="oyMarka">' +
      '<span class="oyMarkaTaç">👑</span>' +
      '<span class="oyMarkaAd">' + esc(oyunAdi) + "</span>" +
      '<span class="oyMarkaAlt">' + esc(altYazi || "ÜSTAD KENAN KUZUCU") + "</span>" +
      '<button class="oyMarkaCik" onclick="oyunCik()">✕</button></div>';
  };

  /* ================= GERÇEKÇİ DOKULAR (canvas ile, dosya gerekmez) ================= */
  var DOKU = {};
  function tuval(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h || w; return c; }
  /* ahşap: damar çizgileri + hafif benek */
  window.oyunAhsapDoku = function (ad, acik, koyu, damarSayi) {
    if (DOKU[ad]) return DOKU[ad];
    var c = tuval(512), g = c.getContext("2d");
    g.fillStyle = acik; g.fillRect(0, 0, 512, 512);
    damarSayi = damarSayi || 26;
    for (var i = 0; i < damarSayi; i++) {
      g.beginPath();
      var y = Math.random() * 512;
      g.moveTo(0, y);
      for (var x = 0; x <= 512; x += 24) {
        g.lineTo(x, y + Math.sin((x / 512) * Math.PI * (1 + Math.random() * 2) + i) * (3 + Math.random() * 7) + (Math.random() - 0.5) * 3);
      }
      g.strokeStyle = koyu;
      g.globalAlpha = 0.10 + Math.random() * 0.22;
      g.lineWidth = 0.6 + Math.random() * 2.6;
      g.stroke();
    }
    g.globalAlpha = 1;
    var img = g.getImageData(0, 0, 512, 512), d = img.data;
    for (var q = 0; q < d.length; q += 4) {
      var n = (Math.random() - 0.5) * 13;
      d[q] += n; d[q + 1] += n; d[q + 2] += n;
    }
    g.putImageData(img, 0, 0);
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    DOKU[ad] = t;
    return t;
  };
  /* keçe / kadife */
  window.oyunKeceDoku = function (ad, renk) {
    if (DOKU[ad]) return DOKU[ad];
    var c = tuval(256), g = c.getContext("2d");
    g.fillStyle = renk; g.fillRect(0, 0, 256, 256);
    var img = g.getImageData(0, 0, 256, 256), d = img.data;
    for (var q = 0; q < d.length; q += 4) {
      var n = (Math.random() - 0.5) * 26;
      d[q] += n; d[q + 1] += n; d[q + 2] += n;
    }
    g.putImageData(img, 0, 0);
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    DOKU[ad] = t;
    return t;
  };
  /* mermer / taş zemin */
  window.oyunTasDoku = function (ad, renk) {
    if (DOKU[ad]) return DOKU[ad];
    var c = tuval(512), g = c.getContext("2d");
    g.fillStyle = renk; g.fillRect(0, 0, 512, 512);
    for (var i = 0; i < 40; i++) {
      g.beginPath();
      g.moveTo(Math.random() * 512, 0);
      g.bezierCurveTo(Math.random() * 512, 170, Math.random() * 512, 340, Math.random() * 512, 512);
      g.strokeStyle = "rgba(255,255,255," + (0.03 + Math.random() * 0.09) + ")";
      g.lineWidth = 0.5 + Math.random() * 3;
      g.stroke();
    }
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    DOKU[ad] = t;
    return t;
  };
  /* zemin ışıması: tahtanın altına serilen "masa" */
  window.oyunMasa = function (S3, olcu, keceRenk) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(olcu * 0.95, olcu * 0.95, 0.35, 64),
      new THREE.MeshStandardMaterial({ map: window.oyunKeceDoku("kece" + keceRenk, keceRenk || "#1f3a2e"), roughness: 0.96, metalness: 0.02 }));
    m.position.y = -0.62; m.receiveShadow = true;
    S3.ekle(m, "masa", false);
    return m;
  };

  /* tahta zemini (ortak) */
  window.oyunTahtaZemini = function (S3, olcu, renk1, renk2) {
    var kal = 0.5, g = new THREE.Group();
    var taban = new THREE.Mesh(new THREE.BoxGeometry(olcu + 1.1, kal, olcu + 1.1),
      new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.75, metalness: 0.15 }));
    taban.position.y = -kal / 2 - 0.001; taban.receiveShadow = true;
    g.add(taban);
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) {
      var k = new THREE.Mesh(new THREE.BoxGeometry(olcu / 8, kal - 0.16, olcu / 8),
        new THREE.MeshStandardMaterial({ color: (i + j) % 2 ? renk2 : renk1, roughness: 0.62, metalness: 0.08 }));
      k.position.set((j - 3.5) * olcu / 8, -0.001, (i - 3.5) * olcu / 8);
      k.receiveShadow = true;
      k.userData.kare = [i, j];
      g.add(k);
    }
    return g;
  };

  /* ================= BİLGİ YARIŞMASI MOTORU ================= */
  var Y = { tur: null, i: 0, puan: 0, soru: [], secili: -1, bitti: false, joker5050: false, jokerSeyirci: false, kalan: 0, zaman: null, olan: true };

  function soruSec(tur, adet) {
    var havuz = (window.OYUN_SORULAR || {})[tur] || [];
    if (tur === "milyoner") {                       /* kolay → orta → zor: 5+5+5, sıralı merdiven */
      var k = karistir(havuz.slice(0, 8)).slice(0, 5);
      var o = karistir(havuz.slice(8, 15)).slice(0, 5);
      var z = karistir(havuz.slice(15)).slice(0, 5);
      return k.concat(o, z).map(secenekKaristir);
    }
    return karistir(havuz).slice(0, adet).map(secenekKaristir);
  }

  var TURLER = {
    kultur: { ad: "GENEL KÜLTÜR", sure: 25, adet: 10, puanSoru: 100, simge: "🌍" },
    tarih: { ad: "TARİH YARIŞMASI", sure: 25, adet: 10, puanSoru: 100, simge: "🏛️" },
    zeka: { ad: "ZEKÂ TESTİ", sure: 40, adet: 12, puanSoru: 120, simge: "🧠" }
  };
  var MILYON = [1000, 2000, 3000, 5000, 7500, 15000, 30000, 60000, 125000, 250000, 500000, 1000000, 2000000, 3000000, 5000000];

  window.oyunBasla = function (tur) {
    Y.tur = tur; Y.i = 0; Y.puan = 0; Y.secili = -1; Y.bitti = false; Y.joker5050 = false; Y.jokerSeyirci = false; Y.olan = true;
    Y.soru = tur === "milyoner" ? soruSec("milyoner", 15) : soruSec(tur, TURLER[tur].adet);
    window.oyunCiz();
  };

  function sayacDurdur() { if (Y.zaman) { clearInterval(Y.zaman); Y.zaman = null; } }

  function sayacBasla() {
    sayacDurdur();
    var sure = Y.tur === "milyoner" ? 45 : TURLER[Y.tur].sure;
    Y.kalan = sure;
    var cubuk = el("oyZamanCubuk"), yazi = el("oyZamanYazi");
    function ciz() {
      if (cubuk) cubuk.style.width = (100 * Y.kalan / sure) + "%";
      if (yazi) yazi.textContent = "· Süre: " + Y.kalan + " sn";
      if (cubuk) cubuk.className = "oyZamanCubuk" + (Y.kalan <= 5 ? " az" : "");
    }
    ciz();
    Y.zaman = setInterval(function () {
      if (!Y.olan) return;
      Y.kalan--;
      ciz();
      if (Y.kalan <= 0) { sayacDurdur(); window.oyunCevapla(-1); }
    }, 1000);
  }

  window.oyunCiz = function () {
    var k = el("oyunAlan"); if (!k) return;
    if (!Y.soru.length) { k.innerHTML = '<div class="oy3Kart"><div class="oy3Bas">Sorular yüklenemedi</div><p class="kucuk">Soru bankası bulunamadı.</p></div>'; return; }
    if (Y.bitti || Y.i >= Y.soru.length) { k.innerHTML = sonucHTML(); return; }
    var s = Y.soru[Y.i];
    var h = "";
    if (Y.tur === "milyoner") {
      h += '<div class="oyMerdiven">';
      for (var m = MILYON.length - 1; m >= 0; m--) {
        h += '<div class="oyBasamak' + (m === Y.i ? " suanki" : (m < Y.i ? " gecti" : "")) + '"><span>' + (m + 1) + '</span><b>' + MILYON[m].toLocaleString("tr-TR") + " ₺</b></div>";
      }
      h += "</div>";
    }
    h += '<div class="oySoruKart">';
    h += '<div class="oyUst"><span class="oySoruNo">' + (Y.tur === "milyoner" ? ("SORU " + (Y.i + 1) + " / 15") : ((Y.i + 1) + " / " + Y.soru.length)) + "</span>" +
      '<span class="oyPuan">💰 ' + Y.puan.toLocaleString("tr-TR") + ' puan <span class="oyZamanYazi" id="oyZamanYazi"></span></span></div>';
    h += '<div class="oyZaman"><div class="oyZamanCubuk" id="oyZamanCubuk"></div></div>';
    h += '<div class="oySoru">' + esc(s.q) + "</div>";
    if (s.g) h += '<div class="oySoruGorsel">' + s.g + "</div>";
    h += '<div class="oySecenekler">';
    for (var i = 0; i < s.s.length; i++) {
      var harf = "ABCD".charAt(i);
      var gizle = s._gizli && s._gizli.indexOf(i) > -1;
      h += '<button class="oySec' + (gizle ? " gizli" : "") + (Y.secili === i ? " secili" : "") + '" ' +
        (gizle ? "disabled" : ("onclick=\"oyunCevapla(" + i + ")\"")) + '><span class="oyHarf">' + harf + "</span><span>" + esc(s.s[i]) + "</span></button>";
    }
    h += "</div>";
    if (s._seyirci) h += '<div class="oySeyirci">👥 Seyirci: ' + s._seyirci + "</div>";
    h += '<div class="oyAlt">';
    if (Y.tur === "milyoner") {
      h += '<button class="oyJoker' + (Y.joker5050 ? " kullanildi" : "") + '" ' + (Y.joker5050 ? "disabled" : 'onclick="oyunJoker(5050)"') + '>💠 50:50</button>' +
        '<button class="oyJoker' + (Y.jokerSeyirci ? " kullanildi" : "") + '" ' + (Y.jokerSeyirci ? "disabled" : 'onclick="oyunJoker(seyirci)"') + '>👥 Seyirci</button>' +
        '<button class="oyCekil" onclick="oyunCekil()">🚪 Çekil (' + (Y.i > 0 ? MILYON[Y.i - 1].toLocaleString("tr-TR") : "0") + ' ₺)</button>';
    } else {
      h += '<button class="oyCekil" onclick="oyunCik()">◀️ Lobiye dön</button>';
    }
    h += "</div></div>";
    k.innerHTML = h;
    sayacBasla();
  };

  function seyirciDagilim(dogru, adet) {
    var d = [8, 8, 8, 8], kalan = 76;
    d[dogru] = 45 + Math.floor(Math.random() * 20);
    kalan = 100 - d.reduce(function (a, b) { return a + b; }, 0);
    var i = 0;
    while (kalan > 0) { var y = (dogru + 1 + i) % 4; d[y]++; kalan--; i++; }
    return d.map(function (v, ix) { return "ABCD".charAt(ix) + ": %" + v; }).join(" · ");
  }

  window.oyunJoker = function (ne) {
    var s = Y.soru[Y.i];
    if (ne === 5050) {
      if (Y.joker5050) return;
      Y.joker5050 = true;
      var yanlislar = [];
      for (var i = 0; i < s.s.length; i++) if (i !== s.c) yanlislar.push(i);
      yanlislar = karistir(yanlislar).slice(0, 2);
      s._gizli = yanlislar;
      uyari("💠 50:50 — iki yanlış seçenek elendi.");
    } else {
      if (Y.jokerSeyirci) return;
      Y.jokerSeyirci = true;
      s._seyirci = seyirciDagilim(s.c, s.s.length);
      uyari("👥 Seyirci oylaması alındı.");
    }
    window.oyunCiz();
  };

  window.oyunCevapla = function (i) {
    if (!Y.olan || Y.bitti || Y.i >= Y.soru.length) return;
    Y.olan = false; sayacDurdur();
    var s = Y.soru[Y.i];
    var dogru = i === s.c;
    var kartlar = document.querySelectorAll(".oySec");
    if (kartlar && kartlar.length) {
      if (s.c < kartlar.length) kartlar[s.c].classList.add("dogru");
      if (i > -1 && i !== s.c && i < kartlar.length) kartlar[i].classList.add("yanlis");
    }
    var kazanilan = 0;
    if (dogru) {
      kazanilan = Y.tur === "milyoner" ? MILYON[Y.i] : TURLER[Y.tur].puanSoru + Math.max(0, Y.kalan) * 2;
      Y.puan += kazanilan;
    }
    var mesaj = dogru ? ("✅ Doğru! +" + kazanilan.toLocaleString("tr-TR") + " puan") : ("❌ Yanlış. Doğru cevap: " + "ABCD".charAt(s.c));
    if (s.n) mesaj += " — " + s.n;
    uyari(mesaj);
    setTimeout(function () {
      if (!dogru) { Y.bitti = true; }
      else { Y.i++; if (Y.i >= Y.soru.length) Y.bitti = true; }
      Y.olan = true;
      if (!Y.bitti) { Y.secili = -1; window.oyunCiz(); }
      else {
        var kayit = skorYaz(Y.tur, Y.puan);
        Y.sonKayit = kayit;
        var a = el("oyunAlan"); if (a) a.innerHTML = sonucHTML();
      }
    }, dogru ? 900 : 1900);
  };

  window.oyunCekil = function () {
    var puan = Y.i > 0 ? MILYON[Y.i - 1] : 0;
    Y.puan = puan; Y.bitti = true; Y.olan = false; sayacDurdur();
    Y.sonKayit = skorYaz("milyoner", puan);
    var a = el("oyunAlan"); if (a) a.innerHTML = sonucHTML();
  };

  function sonucHTML() {
    var toplam = Y.tur === "milyoner" ? 15 : (TURLER[Y.tur] ? TURLER[Y.tur].adet : Y.soru.length);
    var dogruSayi = Y.tur === "milyoner" ? Y.i : Math.min(Y.i, toplam);
    var k = Y.sonKayit || oyunSkor(Y.tur);
    var yuzde = Math.round(100 * dogruSayi / toplam);
    var h = '<div class="oyBitis">' +
      '<div class="oyBitisBas">' + (Y.tur === "milyoner" ? "💰 YARIŞMA BİTTİ" : "🏁 TEST BİTTİ") + "</div>" +
      '<div class="oyBitisPuan">' + Y.puan.toLocaleString("tr-TR") + " puan</div>" +
      '<div class="oyBitisSatir">Doğru cevap: <b>' + dogruSayi + " / " + toplam + "</b> (%" + yuzde + ")</div>";
    if (Y.tur === "zeka") {
      var iq = 75 + Math.round(yuzde * 0.55);
      h += '<div class="oyIq">Tahmini zekâ puanı: <b>' + iq + "</b> <span class='kucuk'>(eğlence amaçlı, bilimsel test değildir)</span></div>";
    }
    h += '<div class="oyBitisSatir">🏆 En iyi: <b>' + (k.enIyi || 0).toLocaleString("tr-TR") + "</b> puan · oynanma: " + (k.oynanma || 1) + "</div>" +
      '<div class="oyBitisDugmeler">' +
      '<button class="oyDugme ana" onclick="oyunBasla(\'' + Y.tur + '\')">🔄 Tekrar oyna</button>' +
      '<button class="oyDugme" onclick="oyunCik()">🎮 Oyun lobisine dön</button>' +
      '<button class="oyDugme" onclick="oyunPaylas()">🔗 Sonucu paylaş</button>' +
      "</div></div>";
    return h;
  }
  window.oyunSonucHTML = sonucHTML;

  window.oyunPaylas = function () {
    var m = (LIG.filter(function (o) { return o.id === Y.tur; })[0] || {}).ad || "Oyun";
    var metin = "🎮 " + m + " oyununda " + Y.puan.toLocaleString("tr-TR") + " puan yaptım! Sen de dene: " + location.href;
    if (navigator.share) { navigator.share({ title: "ÜSTAD KENAN KUZUCU — Oyunlar", text: metin }).catch(function () { }); }
    else { try { navigator.clipboard.writeText(metin); uyari("🔗 Sonuç kopyalandı."); } catch (e) { uyari(metin); } }
  };

  window.oyunCik = function () { sayacDurdur(); Y.tur = null; Y.olan = false; var a = el("oyunAlan"); if (a) { a.innerHTML = lobiHTML(); window.scrollTo(0, 0); } else { window.cizOyunlar(); } };

  /* ================= LOBİ ================= */
  function lobiHTML() {
    var s = skorlar();
    var h = '<div class="oyGiris">' +
      '<div class="oyGirisBas"><span class="oyGirisSimge">🎮</span><div><div class="oyGirisUst">ÜSTAD KENAN KUZUCU</div>' +
      '<h2>OYUN SALONU</h2><div class="oyGirisAlt">Tahta oyunları · bilgi yarışmaları · zekâ testi — hepsi 3 boyutlu, hepsi ücretsiz</div></div></div>' +
      '<p class="oyGirisYazi">Tahtalar gerçek 3D: fareyle tutup döndürebilir, tekerlek ile yakınlaştırabilirsin. Her oyun kendi rekorunu bu cihazda saklar.</p>' +
      "</div>";
    h += '<div class="oyIzgara">';
    LIG.forEach(function (o) {
      var sk = s[o.id] || { enIyi: 0, oynanma: 0 };
      var tahta = ["dama", "satranc", "tavla"].indexOf(o.id) > -1;
      h += '<div class="oyKart" style="--o:' + o.renk + '">' +
        '<div class="oyKartUst"><span class="oyKartSimge">' + o.simge + '</span><span class="oyTur">' + o.tur + (tahta ? " · 3D" : "") + "</span></div>" +
        '<div class="oyKartAd">' + o.ad + "</div>" +
        '<div class="oyKartKisa">' + o.kisa + "</div>" +
        '<div class="oyKartAlt"><span class="oyZorluk">' + o.zor + '</span><span class="kucuk">' + (o.not || "") + "</span></div>" +
        (sk.oynanma ? '<div class="oySkor">🏆 ' + sk.enIyi.toLocaleString("tr-TR") + " puan · " + sk.oynanma + " kez oynandı</div>" : "") +
        '<button class="oyDugme ana" onclick="oyunAc(\'' + o.id + '\')">' + (tahta ? "♟ OYNA" : "▶️ BAŞLA") + "</button>" +
        "</div>";
    });
    h += "</div>";
    h += '<div class="oyNot"><b>Nasıl oynanır?</b> Tahta oyunlarında taşını seç, hedef kareyi tıkla. Tahtayı döndürmek için sürükle, yakınlaştırmak için tekerleği kullan. Bilgi yarışmalarında süre biterse cevap yanlış sayılır.</div>';
    return h;
  }
  window.oyunLobiHTML = lobiHTML;

  window.cizOyunlar = function () {
    sayacDurdur(); Y.tur = null; Y.olan = true;
    return '<div class="oyunKok" id="oyunKok"><div id="oyunAlan">' + lobiHTML() + "</div></div>";
  };

  window.oyunAc = function (id) {
    var a = el("oyunAlan");
    if (!a) return;
    sayacDurdur();
    Y.tur = null;
    if (id === "dama" && window.damaBasla) return window.damaBasla();
    if (id === "satranc" && window.satrancBasla) return window.satrancBasla();
    if (id === "tavla" && window.tavlaBasla) return window.tavlaBasla();
    if (id === "milyoner" || id === "kultur" || id === "tarih" || id === "zeka") return window.oyunBasla(id);
    uyari("Bu oyun yükleniyor…");
  };

  window.oyunLobiye = window.oyunCik;
})();
