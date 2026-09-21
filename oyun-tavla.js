/* ==========================================================================
   🎲 ÜSTADIN TAVLASI — gerçek 3D tavla (zar, kırma, toplama) + yapay zekâ
   USTAD-SALON-KENAN-WEB
   ========================================================================== */
(function () {
  "use strict";
  function el(i) { return document.getElementById(i); }
  function uyari(m) { if (typeof window.uyari === "function") window.uyari(m); }

  /* nokta 1..24 · P[0]=1. nokta … P[23]=24. nokta · artı = sen (beyaz), eksi = yapay zekâ (siyah) */
  var T = {
    P: [], bar: { w: 0, b: 0 }, toplanan: { w: 0, b: 0 },
    zar: [], seciliZar: null, sira: "w", secili: null, hedefler: [], bitti: false,
    S3: null, pulNesneleri: [], gecmis: [], zorluk: 2, kup: null
  };

  function dizilis() {
    var P = [];
    for (var i = 0; i < 24; i++) P.push(0);
    P[23] = 2; P[12] = 5; P[7] = 3; P[5] = 5;      /* sen (beyaz) */
    P[0] = -2; P[11] = -5; P[16] = -3; P[18] = -5; /* yapay zekâ (siyah) */
    return P;
  }
  function kopyaP(P) { return P.slice(); }

  /* ---- kurallar ---- */
  function evdeMi(P, bar, renk) {
    if (bar[renk] > 0) return false;
    var isaret = renk === "w" ? 1 : -1;
    var bas = renk === "w" ? 0 : 18, son = renk === "w" ? 5 : 23;
    for (var i = 0; i < 24; i++) {
      if (P[i] * isaret <= 0) continue;
      if (i < bas || i > son) return false;
    }
    return true;
  }

  function hedefUygun(P, i, renk) {
    var v = P[i];
    if (renk === "w") return v >= -1;
    return v <= 1;
  }

  function tekHamleler(P, bar, toplanan, renk, zar) {
    var l = [], isaret = renk === "w" ? 1 : -1;
    var evde = evdeMi(P, bar, renk);
    if (bar[renk] > 0) {
      zar.forEach(function (z, zi) {
        var hedef = renk === "w" ? 24 - z : z;
        var i = hedef - 1;
        if (hedefUygun(P, i, renk)) l.push({ tip: "gir", zar: z, zi: zi, to: i, from: null });
      });
      return l;
    }
    for (var i = 0; i < 24; i++) {
      if (P[i] * isaret <= 0) continue;
      zar.forEach(function (z, zi) {
        var nokta = i + 1;
        if (renk === "w") {
          var hedefN = nokta - z;
          if (hedefN >= 1) {
            if (hedefUygun(P, hedefN - 1, renk)) l.push({ tip: "git", zar: z, zi: zi, from: i, to: hedefN - 1 });
          } else if (evde && nokta - z < 1) {
            /* toplama: tam sayı ya da fazlası */
            if (nokta === z) l.push({ tip: "topla", zar: z, zi: zi, from: i });
            else {
              var ustVar = false;
              for (var k = i + 1; k < 6; k++) if (P[k] > 0) ustVar = true;
              if (!ustVar) l.push({ tip: "topla", zar: z, zi: zi, from: i });
            }
          }
        } else {
          var hedefB = nokta + z;
          if (hedefB <= 24) {
            if (hedefUygun(P, hedefB - 1, renk)) l.push({ tip: "git", zar: z, zi: zi, from: i, to: hedefB - 1 });
          } else if (evde && nokta + z > 24) {
            if (nokta === 25 - z) l.push({ tip: "topla", zar: z, zi: zi, from: i });
            else {
              var ustVar2 = false;
              for (var k2 = 18; k2 < i; k2++) if (P[k2] < 0) ustVar2 = true;
              if (!ustVar2) l.push({ tip: "topla", zar: z, zi: zi, from: i });
            }
          }
        }
      });
    }
    return l;
  }

  function uygula(P, bar, toplanan, h, renk) {
    var yedi = null;
    if (h.tip === "gir") {
      bar[renk]--;
      if (renk === "w" && P[h.to] === -1) { P[h.to] = 0; bar.b++; yedi = "b"; }
      if (renk === "b" && P[h.to] === 1) { P[h.to] = 0; bar.w++; yedi = "w"; }
      P[h.to] += (renk === "w" ? 1 : -1);
    } else if (h.tip === "git") {
      P[h.from] += (renk === "w" ? -1 : 1);
      if (renk === "w" && P[h.to] === -1) { P[h.to] = 0; bar.b++; yedi = "b"; }
      if (renk === "b" && P[h.to] === 1) { P[h.to] = 0; bar.w++; yedi = "w"; }
      P[h.to] += (renk === "w" ? 1 : -1);
    } else {
      P[h.from] += (renk === "w" ? -1 : 1);
      toplanan[renk]++;
    }
    return yedi;
  }

  /* en çok zar kullanılan diziler (kural: mümkünse iki zar da oynanır) */
  function hamleDizileri(P, bar, toplanan, renk, zar) {
    var enIyi = [[]];
    function gez(Px, barx, topx, kalanZ, yol) {
      var tekler = tekHamleler(Px, barx, topx, renk, kalanZ);
      if (!tekler.length) {
        if (yol.length > enIyi[0].length) enIyi = [yol.slice()];
        else if (yol.length === enIyi[0].length && yol.length) enIyi.push(yol.slice());
        return;
      }
      /* büyük zardan başla (klasik öneri) */
      tekler.sort(function (a, b) { return b.zar - a.zar; });
      var gorulen = {};
      for (var i = 0; i < tekler.length; i++) {
        var h = tekler[i];
        var anahtar = h.tip + ":" + h.from + ":" + h.to + ":" + h.zar;
        if (gorulen[anahtar]) continue;
        gorulen[anahtar] = 1;
        var P2 = kopyaP(Px), b2 = { w: barx.w, b: barx.b }, t2 = { w: topx.w, b: topx.b };
        uygula(P2, b2, t2, h, renk);
        var kz = kalanZ.slice();
        var kullanilan = h.zi !== undefined ? h.zi : kz.indexOf(h.zar);
        kz.splice(kullanilan, 1);
        gez(P2, b2, t2, kz, yol.concat([h]));
      }
    }
    gez(kopyaP(P), { w: bar.w, b: bar.b }, { w: toplanan.w, b: toplanan.b }, zar.slice(), []);
    return enIyi;
  }

  function zarlariKaristir() {
    var a = 1 + Math.floor(Math.random() * 6), b = 1 + Math.floor(Math.random() * 6);
    return a === b ? [a, a, a, a] : [a, b];
  }

  /* ---- yapay zekâ: sonuç tablosunu puanla ---- */
  function puanla(P, bar, toplanan) {
    var s = 0;
    for (var i = 0; i < 24; i++) {
      var v = P[i];
      if (v > 0) s -= 1 + (23 - i) * 0.12 + (v === 1 ? 0.6 : 0);      /* beyaz iyi ise eksi (siyah bakışı) */
      else if (v < 0) s += 1 + i * 0.12 - (v === -1 ? 0.6 : 0);
    }
    s += bar.w * 3 - bar.b * 3 - toplanan.w * 4 + toplanan.b * 4;
    return s;
  }

  function aiDizisi(P, bar, toplanan, zar) {
    var d = hamleDizileri(P, bar, toplanan, "b", zar);
    if (!d.length) return null;
    if (T.zorluk === 1 && Math.random() < 0.35) return d[Math.floor(Math.random() * d.length)];
    var enIyi = null, enIyiP = -1e9;
    d.forEach(function (yol) {
      var P2 = kopyaP(P), b2 = { w: bar.w, b: bar.b }, t2 = { w: toplanan.w, b: toplanan.b };
      yol.forEach(function (h) { uygula(P2, b2, t2, h, "b"); });
      var p = puanla(P2, b2, t2) + Math.random() * 0.3;
      if (p > enIyiP) { enIyiP = p; enIyi = yol; }
    });
    return enIyi;
  }

  /* ================= 3D ================= */
  var NOKTA_UZAK = 1.02, SATIR_Z = 1.55, PUL_Y = 0.30;
  function noktaXZ(p) {
    var i = p - 1, satir = i < 12 ? 0 : 1, kol = i % 12;
    return { x: (kol - 5.5) * NOKTA_UZAK, z: satir === 0 ? SATIR_Z : -SATIR_Z };
  }

  function pulYap(renk) {
    var beyaz = renk === "w";
    var v = [[0.00, 0.00], [0.30, 0.00], [0.33, 0.03], [0.32, 0.08], [0.24, 0.11], [0.10, 0.13], [0.00, 0.14]]
      .map(function (n) { return new THREE.Vector2(n[0], n[1]); });
    var m = new THREE.Mesh(new THREE.LatheGeometry(v, 36), new THREE.MeshPhysicalMaterial({
      color: beyaz ? 0xf0e2c6 : 0x2f2018,
      map: window.oyunAhsapDoku(beyaz ? "tpBeyaz" : "tpSiyah", beyaz ? "#f4e7cd" : "#372417", beyaz ? "#c9ae86" : "#170d06", 14),
      roughness: 0.4, metalness: 0.06, clearcoat: 0.5, clearcoatRoughness: 0.32
    }));
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }

  function zarDoku(deger, ad) {
    var c = document.createElement("canvas"); c.width = c.height = 128;
    var g = c.getContext("2d");
    g.fillStyle = "#f6efe0"; g.fillRect(0, 0, 128, 128);
    g.strokeStyle = "rgba(0,0,0,.16)"; g.lineWidth = 6; g.strokeRect(3, 3, 122, 122);
    g.fillStyle = "#20242b";
    var yer = {
      1: [[64, 64]], 2: [[36, 36], [92, 92]], 3: [[34, 34], [64, 64], [94, 94]],
      4: [[36, 36], [92, 36], [36, 92], [92, 92]], 5: [[36, 36], [92, 36], [64, 64], [36, 92], [92, 92]],
      6: [[36, 30], [92, 30], [36, 64], [92, 64], [36, 98], [92, 98]]
    };
    (yer[deger] || yer[1]).forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 13, 0, 6.283); g.fill(); });
    var t = new THREE.CanvasTexture(c);
    return t;
  }

  function pulNesneBul(id) {
    for (var i = 0; i < T.pulNesneleri.length; i++) if (T.pulNesneleri[i].id === id) return T.pulNesneleri[i];
    return null;
  }

  function tahtayiCiz() {
    var S3 = T.S3;
    if (!S3) return;
    S3.temizle();
    T.pulNesneleri = [];
    /* masa + tahta gövdesi */
    window.oyunMasa(S3, 8.2, "#2b2f26");
    var ahsap = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.6, 5.4),
      new THREE.MeshStandardMaterial({ map: window.oyunAhsapDoku("tavlaGovde", "#7b4d22", "#3d240e", 40), roughness: 0.34, metalness: 0.14 }));
    ahsap.position.y = -0.05; ahsap.castShadow = true; ahsap.receiveShadow = true;
    S3.ekle(ahsap, "tavlaGovde", false);
    var kece = new THREE.Mesh(new THREE.BoxGeometry(12.9, 0.3, 4.9),
      new THREE.MeshStandardMaterial({ map: window.oyunKeceDoku("tavlaKece", "#123a2c"), roughness: 0.95 }));
    kece.position.y = 0.14; kece.receiveShadow = true;
    S3.ekle(kece, "tavlaKece", false);
    /* orta bar */
    var bar3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 4.9),
      new THREE.MeshStandardMaterial({ map: window.oyunAhsapDoku("tavlaBar", "#5c3a18", "#2b1808", 20), roughness: 0.4 }));
    bar3.position.set(0, 0.3, 0); bar3.castShadow = true;
    S3.ekle(bar3, "bar", false);
    /* 24 nokta (üçgen) */
    for (var p = 1; p <= 24; p++) {
      var u = noktaXZ(p);
      var satirUst = p > 12;
      var yon = satirUst ? -1 : 1;

      var ucgen = new THREE.Shape();
      ucgen.moveTo(-0.44, 0); ucgen.lineTo(0.44, 0); ucgen.lineTo(0, 1.55);
      var geo = new THREE.ExtrudeGeometry(ucgen, { depth: 0.1, bevelEnabled: false });
      var renk = (p % 2 === 1) ? 0x2f6b4f : 0x7a2f2f;
      var n = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        map: window.oyunKeceDoku("nokta" + renk, renk === 0x2f6b4f ? "#2f6b4f" : "#7a2f2f"), roughness: 0.9
      }));
      n.rotation.x = Math.PI / 2;
      n.rotation.z = satirUst ? 0 : Math.PI;
      n.position.set(u.x, 0.30, u.z + yon * 0.02);
      n.castShadow = false;
      S3.ekle(n, "nokta:" + p, true);
      /* tıklama alanı (görünmez kutu) */
      var kutu = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.5, 1.5),
        new THREE.MeshBasicMaterial({ visible: false }));
      kutu.position.set(u.x, 0.55, u.z + yon * 0.8);
      S3.ekle(kutu, "alan:" + p, true);
    }
    /* pullar */
    function pulKoy(renk, x, z, sira) {
      var pul = pulYap(renk);
      pul.position.set(x, PUL_Y + (sira || 0) * 0.16, z);
      var id = "pul:" + renk + ":" + Math.round(x * 100) + ":" + (sira || 0) + ":" + Math.round(z * 100);
      S3.ekle(pul, id, false);
      T.pulNesneleri.push({ id: id, nesne: pul, renk: renk });
      return pul;
    }
    function pulKoy2(renk, x, z, sira) {              /* bar sırtı */
      var pul = pulYap(renk);
      pul.position.set(x, 0.52 + (sira || 0) * 0.16, z);
      S3.ekle(pul, "barpul:" + renk + ":" + Math.round(z * 100) + ":" + (sira || 0), false);
      return pul;
    }
    for (var q = 0; q < 24; q++) {
      var v = T.P[q];
      if (!v) continue;
      var u2 = noktaXZ(q + 1);
      var adet = Math.abs(v), rr = v > 0 ? "w" : "b";
      var ust2 = (q + 1) > 12;
      var dis = ust2 ? -1 : 1;                      /* üçgenin ucu dışa bakar */
      var basZ = u2.z - dis * 0.60;                 /* bar tarafından başla */
      for (var a = 0; a < adet; a++) {
        var slot = a < 5 ? a : 4;                   /* 5 taneden sonrası üst üste */
        var ySira = a < 5 ? 0 : (a - 4);
        pulKoy(rr, u2.x, basZ + dis * slot * 0.30, ySira);
      }
    }
    /* bardaki pullar (bar sırtının üstünde) */
    for (var b1 = 0; b1 < T.bar.w; b1++) pulKoy2("w", -0.30, -0.9 + (b1 % 5) * 0.45, Math.floor(b1 / 5));
    for (var b2 = 0; b2 < T.bar.b; b2++) pulKoy2("b", 0.30, -0.9 + (b2 % 5) * 0.45, Math.floor(b2 / 5));
    /* zarlar */
    T.kup = [];
    for (var zi = 0; zi < T.zar.length; zi++) {
      var z = T.zar[zi];
      var mats = [];
      for (var f = 0; f < 6; f++) {
        var deger = [1, 6, 3, 4, 2, 5][f];       /* +x,-x,+y,-y,+z,-z */
        mats.push(new THREE.MeshStandardMaterial({ map: zarDoku(deger), roughness: 0.45 }));
      }
      var zar = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.62), mats);
      zar.castShadow = true;
      zar.position.set(2.35 + zi * 0.95, 0.52, 2.05);
      zar.rotation.set(Math.random() * 0.3, Math.random() * 0.6, Math.random() * 0.3);
      S3.ekle(zar, "zar:" + zi, true);
      T.kup.push(zar);
    }
    /* işaretler (hedefler) */
    isaretCiz();
    S3.tikla(function (id) {
      if (!id) return;
      var par = String(id).split(":");
      if (par[0] === "nokta" || par[0] === "alan") noktaTikla(parseInt(par[1], 10));
      else if (par[0] === "zar") { uyari("🎲 Zar: " + T.zar[parseInt(par[1], 10)]); }
    });
  }

  function isaretCiz() {
    var S3 = T.S3;
    if (!S3) return;
    /* eski işaretleri sil */
    for (var i = S3.grup.children.length - 1; i >= 0; i--) {
      var c = S3.grup.children[i];
      if (c.userData.oyunId === "isaret") { S3.grup.remove(c); }
    }
    T.hedefler.forEach(function (h) {
      if (h.to === undefined || h.to === null) return;
      var u = noktaXZ(h.to + 1);
      var satirUst = (h.to + 1) > 12;
      var m = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.06, 10, 28),
        new THREE.MeshStandardMaterial({ color: 0xf2c14e, emissive: 0xf2c14e, emissiveIntensity: 0.6 }));
      m.rotation.x = Math.PI / 2;
      m.position.set(u.x, 0.42, u.z + (satirUst ? -0.7 : 0.7));
      S3.ekle(m, "isaret", false);
    });
  }

  function durum(m) { var y = el("tavDurum"); if (y) y.innerHTML = m; }
  function sayaclariYaz() {
    var y = el("tavSayac");
    if (!y) return;
    var w = T.toplanan.w, b = T.toplanan.b;
    y.innerHTML = '<span class="dsBeyaz">⚪ Sen: <b>' + w + "/15</b> toplandı · barda " + T.bar.w + "</span>" +
      '<span class="dsSiyah">⚫ Yapay zekâ: <b>' + b + "/15</b> toplandı · barda " + T.bar.b + "</span>" +
      '<span class="dsSonuc">🎲 Zar: <b>' + (T.zar.length ? T.zar.join(" · ") : "atılmadı") + "</b></span>";
  }

  function noktaTikla(p) {
    if (T.bitti || T.sira !== "w" || !T.zar.length) { if (T.sira === "w" && !T.zar.length) uyari("Önce 🎲 Zar at."); return; }
    var i = p - 1;
    if (T.secili === null) {
      if (T.bar.w > 0) { uyari("Önce bardaki taşı içeri almalısın."); return; }
      if (T.P[i] <= 0) { uyari("Bu noktada senin taşın yok."); return; }
      T.secili = i;
      T.hedefler = tumHamleler().filter(function (h) { return h.from === i; });
      if (!T.hedefler.length) { T.secili = null; uyari("Bu taşla oynanacak hamle yok."); return; }
      isaretCiz();
      durum("⚪ <b>" + p + ". nokta</b> seçildi — sarı halkalı noktaya dokun.");
      return;
    }
    if (i === T.secili) { T.secili = null; T.hedefler = []; isaretCiz(); durum("Seçim iptal edildi."); return; }
    var sec = T.hedefler.filter(function (h) { return h.to === i; });
    if (!sec.length) { uyari("Oraya gidemez."); return; }
    /* aynı hedefe iki zarla gidilebiliyorsa büyük zarı kullan */
    sec.sort(function (a, b) { return b.zar - a.zar; });
    hamleyiYap(sec[0], "w");
  }

  function tumHamleler() {
    return T.anlikHamleler || [];
  }

  function hamleleriHazirla() {
    var d = hamleDizileri(T.P, T.bar, T.toplanan, "w", T.zar);
    /* en uzun dizilerin ilk hamlelerini sun */
    var enUzun = 0;
    d.forEach(function (y) { if (y.length > enUzun) enUzun = y.length; });
    var l = [], gorulen = {};
    d.forEach(function (y) {
      if (y.length !== enUzun || !y.length) return;
      var h = y[0];
      var anahtar = h.tip + ":" + h.from + ":" + h.to + ":" + h.zar;
      if (gorulen[anahtar]) return;
      gorulen[anahtar] = 1;
      l.push(h);
    });
    T.anlikHamleler = l;
    return l;
  }

  function hamleyiYap(h, renk) {
    T.gecmis.push({ P: kopyaP(T.P), bar: { w: T.bar.w, b: T.bar.b }, top: { w: T.toplanan.w, b: T.toplanan.b }, zar: T.zar.slice() });
    uygula(T.P, T.bar, T.toplanan, h, renk);
    /* kullanılan zarı düş */
    var zi = T.zar.indexOf(h.zar);
    if (zi > -1) T.zar.splice(zi, 1);
    T.secili = null; T.hedefler = [];
    tahtayiCiz(); sayaclariYaz();
    if (h.tip === "topla") uyari("⚪ Taş toplandı!");
    else if (T.bar.b > 0 && renk === "w") uyari("⚪ Rakip taşı kırdın!");
    if (T.toplanan.w >= 15) { kazandi("w"); return; }
    if (T.toplanan.b >= 15) { kazandi("b"); return; }
    if (!T.zar.length) { setTimeout(siraDegistir, 500); return; }
    var olan = hamleleriHazirla();
    if (!olan.length) { durum("⚪ Kalan zarla oynanacak hamle yok — sıra geçiyor."); setTimeout(siraDegistir, 700); return; }
    durum("⚪ Devam et — " + T.zar.length + " zar kaldı.");
  }

  function kazandi(renk) {
    T.bitti = true;
    var k = window.oyunSkor("tavla");
    var puan = (k.enIyi || 0) + (renk === "w" ? 1 : 0);
    window.oyunSkorYaz("tavla", puan);
    durum(renk === "w" ? "🏆 <b>Tebrikler, kazandın!</b> Bütün taşlarını topladın. Galibiyet puanın: " + puan
      : "⚫ <b>Yapay zekâ kazandı.</b> Taşlarını önce topladı.");
    sayaclariYaz();
  }

  function siraDegistir() {
    if (T.bitti) return;
    if (T.sira === "w") {
      T.sira = "b";
      durum("⚫ Yapay zekâ zar atıyor…");
      T.zar = zarlariKaristir();
      tahtayiCiz(); sayaclariYaz();
      setTimeout(function () {
        var yol = aiDizisi(T.P, T.bar, T.toplanan, T.zar);
        if (!yol || !yol.length) {
          uyari("⚫ Yapay zekâ oynayamadı, sıra sende.");
          zarAt();
          return;
        }
        var adim = 0;
        (function oyna() {
          if (adim >= yol.length) {
            if (T.toplanan.b >= 15) { kazandi("b"); return; }
            zarAt();
            return;
          }
          var h = yol[adim++];
          var z = T.zar.indexOf(h.zar);
          if (z > -1) T.zar.splice(z, 1);
          uygula(T.P, T.bar, T.toplanan, h, "b");
          tahtayiCiz(); sayaclariYaz();
          if (T.toplanan.b >= 15) { kazandi("b"); return; }
          setTimeout(oyna, 520);
        })();
      }, 700);
    } else {
      T.sira = "w";
      T.zar = [];
      durum("⚪ <b>Sıra sende</b> — 🎲 Zar at.");
      tahtayiCiz(); sayaclariYaz();
    }
  }

  window.tavlaZar = function () {
    if (T.bitti) return;
    if (T.sira !== "w") { uyari("Sıra yapay zekâda."); return; }
    if (T.zar.length) { uyari("Önce bu zarları oyna."); return; }
    T.zar = zarlariKaristir();
    tahtayiCiz(); sayaclariYaz();
    var olan = hamleleriHazirla();
    if (!olan.length) {
      uyari("Zar geldi ama oynanacak hamle yok — sıra geçiyor.");
      T.zar = [];
      setTimeout(siraDegistir, 600);
      return;
    }
    if (T.bar.w > 0) durum("🎲 " + T.zar.join(" · ") + " — <b>bardaki taşını içeri al.</b>");
    else if (T.toplanan.w === 15) durum("🎲 " + T.zar.join(" · "));
    else durum("🎲 " + T.zar.join(" · ") + " — <b>taşını seç.</b>");
  };
  function zarAt() { T.sira = "w"; T.zar = []; window.tavlaZar(); }

  window.tavlaGeriAl = function () {
    if (!T.gecmis.length) { uyari("Geri alınacak hamle yok."); return; }
    var g = T.gecmis.pop();
    T.P = g.P; T.bar = g.bar; T.toplanan = g.top; T.zar = g.zar; T.bitti = false; T.secili = null; T.hedefler = [];
    tahtayiCiz(); sayaclariYaz(); durum("⚪ Hamle geri alındı. Sıra sende.");
  };
  window.tavlaGec = function () { T.hedefler = []; T.secili = null; isaretCiz(); siraDegistir(); };
  window.tavlaZorluk = function (v) { T.zorluk = parseInt(v, 10) || 2; uyari("Zorluk: " + (T.zorluk === 1 ? "Kolay" : T.zorluk === 2 ? "Orta" : "Zor")); };

  window.tavlaBasla = function () {
    var a = el("oyunAlan");
    if (!a) return;
    T.P = dizilis(); T.bar = { w: 0, b: 0 }; T.toplanan = { w: 0, b: 0 };
    T.zar = []; T.sira = "w"; T.secili = null; T.hedefler = []; T.bitti = false; T.gecmis = []; T.anlikHamleler = [];
    a.innerHTML = window.oyunMarka("ÜSTADIN TAVLASI", "Gerçek çekme-tavla: zar, kırma, toplama") +
      '<div class="oyTahtaUst">' +
      '<div class="oyTahtaDurum" id="tavDurum">⚪ <b>Sıra sende</b> — 🎲 Zar at.</div>' +
      '<div class="oyTahtaAraclar">' +
      '<span class="oyZorlukSec"><label>Zorluk</label>' +
      '<select id="tavZorluk" onchange="tavlaZorluk(this.value)"><option value="1">Kolay</option><option value="2" selected>Orta</option><option value="3">Zor</option></select></span>' +
      '<button class="oyDugme ana" onclick="tavlaZar()">🎲 Zar at</button>' +
      '<button class="oyDugme" onclick="tavlaGeriAl()">↩️ Geri al</button>' +
      '<button class="oyDugme" onclick="tavlaGec()">⏭️ Sırayı geç</button>' +
      '<button class="oyDugme" onclick="tavlaBasla()">🔄 Yeni oyun</button>' +
      '<button class="oyDugme" onclick="oyunCik()">🎮 Lobi</button></div></div>' +
      '<div class="oyTahtaKap" id="tavKap"></div>' +
      '<div class="oyTahtaAlt" id="tavSayac"></div>' +
      '<div class="oyTahtaYardim">🎲 Zar at → taşını seç → sarı halkalı noktaya dokun. Kurallar: <b>kapalı nokta</b> (2+ taş) kırılamaz, tek taş (<b>blot</b>) kırılır, bardaki taş önce içeri girer, evdeki bütün taşlar <b>toplanınca</b> oyun biter. Tahtayı sürükleyerek döndürebilirsin.</div>';
    T.S3 = window.OYUN3D("tavKap", { yukseklik: 540, dikey: 0.64, uzak: 13.8, yatay: 0.02 });
    tahtayiCiz(); sayaclariYaz();
    setTimeout(function () { if (T.S3) T.S3.boyutla(); }, 120);
  };

  /* test kancaları */
  window.__tav = { T: T, hamleDizileri: hamleDizileri, tekHamleler: tekHamleler, aiDizisi: aiDizisi, dizilis: dizilis, kopyaP: kopyaP, evdeMi: evdeMi, zarlariKaristir: zarlariKaristir,
    noktaTikla: noktaTikla, hamleyiYap: hamleyiYap, siraDegistir: siraDegistir, hamleleriHazirla: hamleleriHazirla };
})();
