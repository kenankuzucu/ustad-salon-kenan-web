/* ==========================================================================
   ♞ ÜSTADIN SATRANCI — tam kurallı satranç (rok, terfi, şah, mat) + 3D taşlar
   Yapay zekâ: alfa-beta budamalı minimax.  USTAD-SALON-KENAN-WEB
   ========================================================================== */
(function () {
  "use strict";
  function el(i) { return document.getElementById(i); }
  function uyari(m) { if (typeof window.uyari === "function") window.uyari(m); }

  /* tahta: 8x8 · büyük harf = beyaz (sen), küçük harf = siyah (yapay zekâ)
     S = 0. satır üst (siyah) · 7. satır alt (beyaz) */
  var S = {
    tahta: [], sira: "w", rok: { K: true, Q: true, k: true, q: true },
    ep: null, gecmis: [], secili: null, hedefler: [], bitti: false, S3: null,
    taslar: [], isaretler: [], zorluk: 2, sonHamle: null, terfiBekle: null, yariHamle: 0
  };
  var BASLA = ["rnbqkbnr", "pppppppp", "........", "........", "........", "........", "PPPPPPPP", "RNBQKBNR"];

  function bosTahta() {
    return BASLA.map(function (satir) {
      var s = [];
      for (var i = 0; i < 8; i++) { var ch = satir.charAt(i); s.push(ch === "." ? null : ch); }
      return s;
    });
  }
  function kopya(t) { return t.map(function (s) { return s.slice(); }); }
  var beyazMi = function (p) { return p && p === p.toUpperCase(); };
  var dusman = function (p) { return beyazMi(p) ? p.toLowerCase() : p.toUpperCase(); };
  var icMi = function (r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; };

  /* ---- hamle üretimi ---- */
  var AT = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
  var FIL = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  var KALE = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  var SAH = FIL.concat(KALE);

  function hamlelerPseudo(t, r, c, durum) {
    var p = t[r][c], h = [];
    if (!p) return h;
    var beyaz = beyazMi(p), tip = p.toLowerCase();
    function ek(rr, cc) { if (icMi(rr, cc) && (!t[rr][cc] || beyazMi(t[rr][cc]) !== beyaz)) h.push({ from: [r, c], to: [rr, cc] }); }
    if (tip === "p") {
      var yon = beyaz ? -1 : 1, bas = beyaz ? 6 : 1, son = beyaz ? 0 : 7;
      if (icMi(r + yon, c) && !t[r + yon][c]) {
        ek(r + yon, c);
        if (r === bas && !t[r + 2 * yon][c]) h.push({ from: [r, c], to: [r + 2 * yon, c], cift: true });
      }
      [-1, 1].forEach(function (d) {
        var rr = r + yon, cc = c + d;
        if (icMi(rr, cc) && t[rr][cc] && beyazMi(t[rr][cc]) !== beyaz) h.push({ from: [r, c], to: [rr, cc] });
        if (durum && durum.ep && durum.ep[0] === rr && durum.ep[1] === cc) h.push({ from: [r, c], to: [rr, cc], ep: true });
      });
    } else if (tip === "n") {
      AT.forEach(function (d) {
        var rr = r + d[0], cc = c + d[1];
        if (icMi(rr, cc) && (!t[rr][cc] || beyazMi(t[rr][cc]) !== beyaz)) h.push({ from: [r, c], to: [rr, cc] });
      });
    } else if (tip === "k") {
      SAH.forEach(function (d) {
        var rr = r + d[0], cc = c + d[1];
        if (icMi(rr, cc) && (!t[rr][cc] || beyazMi(t[rr][cc]) !== beyaz)) h.push({ from: [r, c], to: [rr, cc] });
      });
      if (durum) {
        var hak = beyaz ? { k: "K", q: "Q" } : { k: "k", q: "q" };
        if (r === (beyaz ? 7 : 0) && c === 4) {
          if (durum.rok[hak.k] && !t[r][5] && !t[r][6] && t[r][7] === (beyaz ? "R" : "r"))
            h.push({ from: [r, c], to: [r, 6], rok: "k" });
          if (durum.rok[hak.q] && !t[r][3] && !t[r][2] && !t[r][1] && t[r][0] === (beyaz ? "R" : "r"))
            h.push({ from: [r, c], to: [r, 2], rok: "q" });
        }
      }
    } else {
      var yonler = tip === "b" ? FIL : tip === "r" ? KALE : SAH;
      yonler.forEach(function (d) {
        var rr = r + d[0], cc = c + d[1];
        while (icMi(rr, cc)) {
          if (!t[rr][cc]) h.push({ from: [r, c], to: [rr, cc] });
          else { if (beyazMi(t[rr][cc]) !== beyaz) h.push({ from: [r, c], to: [rr, cc] }); break; }
          rr += d[0]; cc += d[1];
        }
      });
    }
    return h;
  }

  function saldiriAltinda(t, r, c, beyazTarafindan) {
    /* (r,c) karesi beyazTarafindan saldırı altında mı? */
    var t2 = t;
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) {
      var p = t2[i][j];
      if (!p || beyazMi(p) !== beyazTarafindan) continue;
      var tip = p.toLowerCase();
      if (tip === "p") {
        var yon = beyazTarafindan ? -1 : 1;
        if (i + yon === r && (j - 1 === c || j + 1 === c)) return true;
      } else if (tip === "n") {
        for (var a = 0; a < 8; a++) if (i + AT[a][0] === r && j + AT[a][1] === c) return true;
      } else if (tip === "k") {
        for (var b = 0; b < 8; b++) if (i + SAH[b][0] === r && j + SAH[b][1] === c) return true;
      } else {
        var yonler = tip === "b" ? FIL : tip === "r" ? KALE : SAH;
        for (var d = 0; d < yonler.length; d++) {
          var rr = i + yonler[d][0], cc = j + yonler[d][1];
          while (icMi(rr, cc)) {
            if (rr === r && cc === c) return true;
            if (t2[rr][cc]) break;
            rr += yonler[d][0]; cc += yonler[d][1];
          }
        }
      }
    }
    return false;
  }

  function sahiBul(t, beyaz) {
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) if (t[r][c] === (beyaz ? "K" : "k")) return [r, c];
    return null;
  }

  function hamleYap(t, h, durum) {
    var p = t[h.from[0]][h.from[1]];
    var yenenP = t[h.to[0]][h.to[1]];
    t[h.to[0]][h.to[1]] = p;
    t[h.from[0]][h.from[1]] = null;
    if (h.ep) t[h.from[0]][h.to[1]] = null;                         /* geçerken alma */
    if (h.rok) {                                                    /* rok */
      var satir = h.from[0];
      if (h.rok === "k") { t[satir][5] = t[satir][7]; t[satir][7] = null; }
      else { t[satir][3] = t[satir][0]; t[satir][0] = null; }
    }
    if (h.terfi) t[h.to[0]][h.to[1]] = beyazMi(p) ? h.terfi.toUpperCase() : h.terfi.toLowerCase();
    if (durum) {
      /* rok hakları */
      if (p === "K") { durum.rok.K = false; durum.rok.Q = false; }
      if (p === "k") { durum.rok.k = false; durum.rok.q = false; }
      if (h.from[1] === 0 && h.from[0] === 7) durum.rok.Q = false;
      if (h.from[1] === 7 && h.from[0] === 7) durum.rok.K = false;
      if (h.from[1] === 0 && h.from[0] === 0) durum.rok.q = false;
      if (h.from[1] === 7 && h.from[0] === 0) durum.rok.k = false;
      /* geçerken alma hedefi */
      durum.ep = h.cift ? [(h.from[0] + h.to[0]) / 2, h.from[1]] : null;
    }
    return yenenP;
  }

  function tumHamleler(t, beyaz, durum, sahKontrol) {
    var l = [];
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var p = t[r][c];
      if (!p || beyazMi(p) !== beyaz) continue;
      var hs = hamlelerPseudo(t, r, c, durum);
      for (var i = 0; i < hs.length; i++) {
        var h = hs[i];
        /* terfi */
        if (p.toLowerCase() === "p" && (h.to[0] === 0 || h.to[0] === 7)) { h.terfi = beyaz ? "q" : "q"; }
        if (!sahKontrol) { l.push(h); continue; }
        var d2 = { rok: { K: durum.rok.K, Q: durum.rok.Q, k: durum.rok.k, q: durum.rok.q }, ep: durum.ep };
        var t2 = kopya(t);
        hamleYap(t2, h, d2);
        var kr = sahiBul(t2, beyaz);
        if (kr && !saldiriAltinda(t2, kr[0], kr[1], !beyaz)) l.push(h);
      }
    }
    return l;
  }

  function sahta(t, beyaz, durum) {
    var kr = sahiBul(t, beyaz);
    return kr ? saldiriAltinda(t, kr[0], kr[1], !beyaz) : false;
  }

  /* ---- puanlama + yapay zekâ ---- */
  var DEGER = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
  var KONUM_P = [
    [0, 0, 0, 0, 0, 0, 0, 0], [50, 50, 50, 50, 50, 50, 50, 50], [10, 10, 20, 30, 30, 20, 10, 10],
    [5, 5, 10, 25, 25, 10, 5, 5], [0, 0, 0, 20, 20, 0, 0, 0], [5, -5, -10, 0, 0, -10, -5, 5],
    [5, 10, 10, -20, -20, 10, 10, 5], [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  function degerlendir(t) {
    var s = 0;
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var p = t[r][c];
      if (!p) continue;
      var d = DEGER[p.toLowerCase()] || 0;
      if (p.toLowerCase() === "p") d += KONUM_P[r][c];
      s += beyazMi(p) ? -d : d;                 /* siyah (yapay zekâ) iyi ise artı */
    }
    return s;
  }

  function ara(t, derinlik, alfa, beta, beyazSira, durum) {
    if (derinlik <= 0) return degerlendir(t);
    var l = tumHamleler(t, beyazSira, durum, true);
    if (!l.length) return sahta(t, beyazSira, durum) ? (beyazSira ? 90000 + derinlik : -90000 - derinlik) : 0;
    l.sort(function (a, b) { return (t[b.to[0]][b.to[1]] ? 1 : 0) - (t[a.to[0]][a.to[1]] ? 1 : 0); });
    if (beyazSira) {                                   /* beyaz en düşük puanı ister */
      var en = 1e9;
      for (var i = 0; i < l.length; i++) {
        var t2 = kopya(t), d2 = { rok: { K: durum.rok.K, Q: durum.rok.Q, k: durum.rok.k, q: durum.rok.q }, ep: durum.ep };
        hamleYap(t2, l[i], d2);
        en = Math.min(en, ara(t2, derinlik - 1, alfa, beta, false, d2));
        beta = Math.min(beta, en);
        if (beta <= alfa) break;
      }
      return en;
    } else {
      var en2 = -1e9;
      for (var j = 0; j < l.length; j++) {
        var t3 = kopya(t), d3 = { rok: { K: durum.rok.K, Q: durum.rok.Q, k: durum.rok.k, q: durum.rok.q }, ep: durum.ep };
        hamleYap(t3, l[j], d3);
        en2 = Math.max(en2, ara(t3, derinlik - 1, alfa, beta, true, d3));
        alfa = Math.max(alfa, en2);
        if (beta <= alfa) break;
      }
      return en2;
    }
  }

  function aiBul(t, durum) {
    var derinlik = S.zorluk === 1 ? 2 : (S.zorluk === 2 ? 3 : 4);
    var l = tumHamleler(t, false, durum, true);
    if (!l.length) return null;
    if (S.zorluk === 1 && Math.random() < 0.3) return l[Math.floor(Math.random() * l.length)];
    var enIyi = l[0], enIyiP = -1e9;
    l.sort(function (a, b) { return (t[b.to[0]][b.to[1]] ? 1 : 0) - (t[a.to[0]][a.to[1]] ? 1 : 0); });
    for (var i = 0; i < l.length; i++) {
      var t2 = kopya(t), d2 = { rok: { K: durum.rok.K, Q: durum.rok.Q, k: durum.rok.k, q: durum.rok.q }, ep: durum.ep };
      hamleYap(t2, l[i], d2);
      var p = ara(t2, derinlik - 1, -1e9, 1e9, true, d2);
      if (p > enIyiP) { enIyiP = p; enIyi = l[i]; }
    }
    return enIyi;
  }

  /* ================= 3D ================= */
  function tasYap(p) {
    var beyaz = beyazMi(p), tip = p.toLowerCase();
    var malzeme = new THREE.MeshPhysicalMaterial({
      color: beyaz ? 0xf2e4c9 : 0x35241a,
      map: window.oyunAhsapDoku(beyaz ? "tasBeyaz" : "tasSiyah", beyaz ? "#f7ecd7" : "#3d2a1e", beyaz ? "#cbb08a" : "#1b1009", 18),
      roughness: beyaz ? 0.38 : 0.44, metalness: 0.05, clearcoat: 0.55, clearcoatRoughness: 0.3
    });
    var g = new THREE.Group(), profiller = {
      p: [[0.30, 0.00], [0.34, 0.05], [0.30, 0.10], [0.20, 0.16], [0.16, 0.24], [0.24, 0.32], [0.26, 0.40], [0.20, 0.46], [0.11, 0.50], [0.06, 0.58], [0.00, 0.60]],
      r: [[0.32, 0.00], [0.36, 0.05], [0.30, 0.10], [0.22, 0.14], [0.24, 0.50], [0.34, 0.54], [0.34, 0.60], [0.30, 0.66], [0.00, 0.70]],
      b: [[0.30, 0.00], [0.34, 0.05], [0.28, 0.10], [0.19, 0.16], [0.16, 0.30], [0.22, 0.40], [0.15, 0.52], [0.10, 0.62], [0.16, 0.68], [0.05, 0.74], [0.00, 0.80]],
      q: [[0.34, 0.00], [0.38, 0.06], [0.30, 0.12], [0.21, 0.18], [0.18, 0.40], [0.24, 0.56], [0.16, 0.68], [0.27, 0.74], [0.21, 0.82], [0.08, 0.86], [0.05, 0.94], [0.00, 0.98]],
      k: [[0.34, 0.00], [0.38, 0.06], [0.30, 0.12], [0.21, 0.18], [0.18, 0.42], [0.25, 0.58], [0.17, 0.70], [0.28, 0.76], [0.22, 0.84], [0.11, 0.90], [0.14, 0.96], [0.05, 1.02], [0.00, 1.10]]
    };
    if (tip === "n") {
      var govde = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.36, 0.55, 28), malzeme);
      govde.position.y = 0.28; govde.castShadow = true; g.add(govde);
      var boyun = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.24, 0.30, 24), malzeme);
      boyun.position.set(0, 0.66, -0.02); boyun.castShadow = true; g.add(boyun);
      var kafa = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.34, 0.52), malzeme);
      kafa.position.set(0, 0.86, 0.10); kafa.rotation.x = -0.35; kafa.castShadow = true; g.add(kafa);
      var burun = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.26), malzeme);
      burun.position.set(0, 0.80, 0.34); burun.rotation.x = -0.5; burun.castShadow = true; g.add(burun);
      var kulak1 = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 12), malzeme);
      kulak1.position.set(0, 1.05, 0.02); kulak1.castShadow = true; g.add(kulak1);
      return g;
    }
    var noktalar = profiller[tip] || profiller.p;
    var v = noktalar.map(function (n) { return new THREE.Vector2(n[0], n[1]); });
    var mesh = new THREE.Mesh(new THREE.LatheGeometry(v, 40), malzeme);
    mesh.castShadow = true; mesh.receiveShadow = true;
    g.add(mesh);
    if (tip === "k") {
      var hac = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.24, 0.07), malzeme);
      hac.position.y = 1.20; hac.castShadow = true; g.add(hac);
      var hac2 = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.07, 0.07), malzeme);
      hac2.position.y = 1.24; hac2.castShadow = true; g.add(hac2);
    }
    if (tip === "q") {
      var top = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 14), malzeme);
      top.position.y = 1.04; top.castShadow = true; g.add(top);
      var tac = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.028, 10, 26),
        new THREE.MeshStandardMaterial({ color: beyaz ? 0xd9b44a : 0xc9a227, metalness: 0.9, roughness: 0.25 }));
      tac.rotation.x = Math.PI / 2; tac.position.y = 0.92; g.add(tac);
    }
    return g;
  }

  var KARE = 0.86, MERKEZ = 3.5;
  function kareMerkez(r, c) { return { x: (c - MERKEZ) * KARE, z: (r - MERKEZ) * KARE }; }

  function tahtaKur() {
    var S3 = S.S3;
    if (!S3) return;
    S3.temizle();
    S.taslar = []; S.isaretler = [];
    window.oyunMasa(S3, 6.5, "#2a2f3a");
    var cerceve = new THREE.Mesh(new THREE.BoxGeometry(8 * KARE + 0.9, 0.5, 8 * KARE + 0.9),
      new THREE.MeshStandardMaterial({ map: window.oyunAhsapDoku("scer", "#6d4520", "#3a220d", 30), roughness: 0.36, metalness: 0.14 }));
    cerceve.position.y = -0.06; cerceve.castShadow = true; cerceve.receiveShadow = true;
    S3.ekle(cerceve, "scer", false);
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var acik = (r + c) % 2 === 0;
      var k = new THREE.Mesh(new THREE.BoxGeometry(KARE, 0.16, KARE),
        new THREE.MeshStandardMaterial({
          map: acik ? window.oyunAhsapDoku("sAcik", "#e9d3a6", "#b18c58", 10) : window.oyunAhsapDoku("sKoyu", "#7d5228", "#37200b", 10),
          roughness: 0.34, metalness: 0.06
        }));
      var m = kareMerkez(r, c);
      k.position.set(m.x, 0.28, m.z); k.receiveShadow = true;
      S3.ekle(k, "kare:" + r + ":" + c, true);
    }
    S.tahta.forEach(function (satir, r) {
      satir.forEach(function (p, c) {
        if (!p) return;
        var t = tasYap(p), m2 = kareMerkez(r, c);
        t.position.set(m2.x, 0.36, m2.z);
        t.userData.konum = { r: r, c: c };
        S3.ekle(t, "tas:" + r + ":" + c, true);
        S.taslar.push({ r: r, c: c, nesne: t });
      });
    });
    S3.tikla(function (id) {
      if (!id) return;
      var p = String(id).split(":");
      if (p[0] === "tas") tasTikla(parseInt(p[1], 10), parseInt(p[2], 10));
      else if (p[0] === "kare") kareTikla(parseInt(p[1], 10), parseInt(p[2], 10));
    });
  }

  function tasNesne(r, c) {
    for (var i = 0; i < S.taslar.length; i++) if (S.taslar[i].r === r && S.taslar[i].c === c) return S.taslar[i].nesne;
    return null;
  }

  function isaretCiz(hedefler) {
    S.isaretler.forEach(function (n) { if (S.S3) S.S3.grup.remove(n); });
    S.isaretler = [];
    if (!S.S3) return;
    hedefler.forEach(function (h) {
      var m = kareMerkez(h.to[0], h.to[1]);
      var dolu = S.tahta[h.to[0]][h.to[1]];
      var renk = dolu ? 0xff6b6b : 0x8fd6a0;
      var n = new THREE.Mesh(new THREE.CylinderGeometry(dolu ? 0.34 : 0.16, dolu ? 0.34 : 0.16, 0.06, 26),
        new THREE.MeshStandardMaterial({ color: renk, emissive: renk, emissiveIntensity: 0.5, transparent: true, opacity: .92 }));
      n.position.set(m.x, 0.4, m.z);
      S.S3.ekle(n, "isaret", false);
      S.isaretler.push(n);
    });
  }

  function durum(m) { var y = el("satDurum"); if (y) y.innerHTML = m; }
  function durumTazele() {
    var sah = sahta(S.tahta, S.sira === "w", S);
    var l = tumHamleler(S.tahta, S.sira === "w", S, true);
    var bina = (S.sira === "w" ? "⚪ <b>Sıra sende.</b>" : "⚫ Yapay zekâ sırası…");
    if (!l.length) { bina = sah ? (S.sira === "w" ? "⚫ <b>Mat! Sen kaybettin.</b>" : "🏆 <b>Mat! Sen kazandın!</b>") : "🤝 <b>Pat — berabere.</b>"; }
    else if (sah) bina += (S.sira === "w" ? " ⚠️ <b>Şah! Kralını kurtar.</b>" : " ⚠️ Yapay zekâ şahta.");
    durum(bina);
    var y = el("satSayac");
    if (y) {
      var say = { w: 0, b: 0 };
      S.tahta.forEach(function (s) { s.forEach(function (p) { if (p) say[beyazMi(p) ? "w" : "b"]++; }); });
      y.innerHTML = '<span class="dsBeyaz">⚪ Sen: <b>' + say.w + '</b> taş</span><span class="dsSiyah">⚫ Yapay zekâ: <b>' + say.b + "</b> taş · hamle " + (S.yariHamle + 1) + "</span>";
    }
  }

  function tasTikla(r, c) {
    if (S.bitti || S.sira !== "w" || S.terfiBekle) return;
    var p = S.tahta[r][c];
    if (!p || !beyazMi(p)) { if (p) uyari("Bu taş yapay zekânın."); return; }
    S.secili = [r, c];
    S.hedefler = tumHamleler(S.tahta, true, S, true).filter(function (h) { return h.from[0] === r && h.from[1] === c; });
    isaretCiz(S.hedefler);
    var n = tasNesne(r, c);
    if (n && S.S3) S.S3.tween(n, { x: n.position.x, y: n.position.y + 0.28, z: n.position.z }, 200);
    durum("⚪ <b>" + p + "</b> seçildi — " + S.hedefler.length + " geçerli hamle. Hedef kareye dokun.");
  }

  function kareTikla(r, c) {
    if (S.bitti || S.sira !== "w" || S.terfiBekle || !S.secili) return;
    var sec = null;
    for (var i = 0; i < S.hedefler.length; i++) if (S.hedefler[i].to[0] === r && S.hedefler[i].to[1] === c) sec = S.hedefler[i];
    if (!sec) { uyari("Oraya gidemez."); return; }
    var p = S.tahta[S.secili[0]][S.secili[1]];
    if (p.toLowerCase() === "p" && (r === 0 || r === 7)) { terfiSor(sec); return; }
    hamleyiUygula(sec, "w");
  }

  function terfiSor(h) {
    S.terfiBekle = h;
    var k = el("satTerfi");
    if (k) k.style.display = "flex";
  }
  window.satTerfiSec = function (t) {
    var k = el("satTerfi"); if (k) k.style.display = "none";
    if (!S.terfiBekle) return;
    var h = S.terfiBekle; S.terfiBekle = null; h.terfi = t;
    hamleyiUygula(h, "w");
  };

  function hamleyiUygula(h, kim) {
    S.gecmis.push({ tahta: kopya(S.tahta), rok: { K: S.rok.K, Q: S.rok.Q, k: S.rok.k, q: S.rok.q }, ep: S.ep, sira: S.sira });
    var pulNesne = tasNesne(h.from[0], h.from[1]);
    var yenenNesne = h.ep ? tasNesne(h.from[0], h.to[1]) : tasNesne(h.to[0], h.to[1]);
    hamleYap(S.tahta, h, S);
    var m = kareMerkez(h.to[0], h.to[1]);
    function bitir() {
      if (yenenNesne && S.S3) S.S3.grup.remove(yenenNesne);
      if (h.rok && S.S3) {
        var satir = h.from[0], kc = h.rok === "k" ? [7, 5] : [0, 3];
        var kn = tasNesne(satir, kc[0]);
        if (kn) { var khedef = kareMerkez(satir, kc[1]); S.S3.tween(kn, { x: khedef.x, y: 0.36, z: khedef.z, hop: 0.5 }, 260); }
      }
      S.secili = null; S.hedefler = []; isaretCiz([]);
      setTimeout(function () {
        S.sira = (kim === "w") ? "b" : "w";
        tahtaKur();
        if (matKontrol()) return;
        durumTazele();
        if (kim === "w") { S.yariHamle++; setTimeout(siraYapay, 240); }
      }, 300);
    }
    if (pulNesne && S.S3) {
      if (yenenNesne && yenenNesne !== pulNesne) S.S3.tween(yenenNesne, { x: yenenNesne.position.x, y: yenenNesne.position.y - 1.2, z: yenenNesne.position.z }, 260);
      S.S3.tween(pulNesne, { x: m.x, y: 0.36, z: m.z, hop: 0.7 }, 300, bitir);
    } else bitir();
  }

  function matKontrol() {
    var beyazSira = S.sira === "w";
    var l = tumHamleler(S.tahta, beyazSira, S, true);
    if (l.length) return false;
    var sah = sahta(S.tahta, beyazSira, S);
    var k = window.oyunSkor("satranc");
    var puan = k.enIyi || 0;
    if (sah) {
      var senKazandin = !beyazSira;                  /* sen beyazsın; siyah mata düştüyse sen kazandın */
      puan += senKazandin ? 1 : 0;
      window.oyunSkorYaz("satranc", puan);
      durum(senKazandin ? "🏆 <b>MAT! Sen kazandın.</b> Galibiyet puanın: " + puan : "⚫ <b>Mat! Yapay zekâ kazandı.</b>");
    } else {
      window.oyunSkorYaz("satranc", puan + 1);
      durum("🤝 <b>Pat — berabere.</b> Hamle kalmadı ama şah yok.");
    }
    S.bitti = true;
    return true;
  }

  function siraYapay() {
    if (S.bitti) return;
    S.sira = "b";
    durum("⚫ Yapay zekâ düşünüyor…");
    setTimeout(function () {
      var h = aiBul(S.tahta, S);
      if (!h) { S.sira = "w"; matKontrol(); return; }
      var pulNesne = tasNesne(h.from[0], h.from[1]);
      var yenenNesne = tasNesne(h.to[0], h.to[1]);
      if (h.ep) yenenNesne = tasNesne(h.from[0], h.to[1]);
      hamleYap(S.tahta, h, S);
      var m = kareMerkez(h.to[0], h.to[1]);
      function bitir() {
        if (yenenNesne && S.S3) S.S3.grup.remove(yenenNesne);
        setTimeout(function () {
          tahtaKur();
          S.sira = "w";
          if (matKontrol()) return;
          durumTazele();
          if (sahta(S.tahta, true, S)) durum("⚠️ <b>Şah!</b> ⚪ <b>Sıra sende.</b>");
        }, 320);
      }
      if (pulNesne && S.S3) S.S3.tween(pulNesne, { x: m.x, y: 0.36, z: m.z, hop: 0.7 }, 320, bitir);
      else bitir();
    }, 380);
  }

  /* ================= EKRAN ================= */
  window.satrancBasla = function () {
    var a = el("oyunAlan");
    if (!a) return;
    S.tahta = bosTahta(); S.sira = "w"; S.rok = { K: true, Q: true, k: true, q: true }; S.ep = null;
    S.gecmis = []; S.secili = null; S.hedefler = []; S.bitti = false; S.terfiBekle = null; S.yariHamle = 0;
    a.innerHTML = window.oyunMarka("ÜSTADIN SATRANCI", "İşlenmiş ahşap taşlarla tam kurallı satranç") +
      '<div class="oyTahtaUst">' +
      '<div class="oyTahtaDurum" id="satDurum">⚪ <b>Sıra sende.</b> Taşını seç.</div>' +
      '<div class="oyTahtaAraclar">' +
      '<span class="oyZorlukSec"><label>Zorluk</label>' +
      '<select id="satZorluk" onchange="satrancZorluk(this.value)"><option value="1">Kolay</option><option value="2" selected>Orta</option><option value="3">Zor</option></select></span>' +
      '<button class="oyDugme" onclick="satrancGeriAl()">↩️ Geri al</button>' +
      '<button class="oyDugme" onclick="satrancBasla()">🔄 Yeni oyun</button>' +
      '<button class="oyDugme" onclick="oyunCik()">🎮 Lobi</button></div></div>' +
      '<div class="oyTahtaKap" id="satKap"></div>' +
      '<div class="oyTahtaAlt" id="satSayac"></div>' +
      '<div class="oyTahtaYardim">👆 Taşını seç → yeşil noktaya dokun (kırmızı = taş alma). Kurallar tam: <b>rok</b> (şahı iki kare yürüt), <b>piyon terfi</b> (son satıra ulaşınca taş seç), <b>geçerken alma</b>, <b>şah</b> ve <b>mat</b> kontrolü. Tahtayı sürükleyerek döndürebilirsin.</div>' +
      '<div class="oyTerfiPerde" id="satTerfi"><div class="oyTerfiKutu"><div>Hangi taşa terfi edilsin?</div>' +
      '<div class="oyTerfiDugmeler">' +
      '<button class="oyDugme ana" onclick="satTerfiSec(\'q\')">👑 Vezir</button>' +
      '<button class="oyDugme" onclick="satTerfiSec(\'r\')">🏰 Kale</button>' +
      '<button class="oyDugme" onclick="satTerfiSec(\'b\')">🐘 Fil</button>' +
      '<button class="oyDugme" onclick="satTerfiSec(\'n\')">🐴 At</button>' +
      "</div></div></div>";
    S.S3 = window.OYUN3D("satKap", { yukseklik: 560, dikey: 0.60, uzak: 13.5, yatay: 0 });
    tahtaKur(); durumTazele();
    setTimeout(function () { if (S.S3) S.S3.boyutla(); }, 120);
  };
  window.satrancZorluk = function (v) { S.zorluk = parseInt(v, 10) || 2; uyari("Zorluk: " + (S.zorluk === 1 ? "Kolay" : S.zorluk === 2 ? "Orta" : "Zor")); };
  window.satrancGeriAl = function () {
    if (S.gecmis.length < 2) { uyari("Geri alınacak hamle yok."); return; }
    var g = S.gecmis.pop(); g = S.gecmis.pop();
    S.tahta = g.tahta; S.rok = g.rok; S.ep = g.ep; S.sira = "w"; S.bitti = false;
    tahtaKur(); durumTazele(); durum("⚪ Hamle geri alındı. <b>Sıra sende.</b>");
  };

  /* test kancaları */
  window.__sat = { S: S, tumHamleler: tumHamleler, hamleYap: hamleYap, bosTahta: bosTahta, sahta: sahta, kopya: kopya, aiBul: aiBul, hamlelerPseudo: hamlelerPseudo,
    tasTikla: tasTikla, kareTikla: kareTikla, matKontrol: matKontrol, hamleyiUygula: hamleyiUygula, siraYapay: siraYapay,
    saldiriAltinda: saldiriAltinda, sahiBul: sahiBul };
})();
