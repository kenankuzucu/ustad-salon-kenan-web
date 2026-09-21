/* ==========================================================================
   ⚪ ÜSTADIN DAMASI — gerçek 3D Türk daması (yapay zekâ rakibi)
   Ahşap tahta, torna işi pullar, uçan damalar.  USTAD-SALON-KENAN-WEB
   ========================================================================== */
(function () {
  "use strict";
  function el(i) { return document.getElementById(i); }
  function esc(s) { return String(s == null ? "" : s); }
  function uyari(m) { if (typeof window.uyari === "function") window.uyari(m); }

  /* tahta: 0 boş · 1 beyaz pul · 2 beyaz dama · -1 siyah pul · -2 siyah dama
     satır 0 = üst (yapay zekâ) · satır 7 = alt (sen)   oynanabilir kareler: (r+c) % 2 === 1 */
  var D = { tahta: [], secili: null, zorluk: 2, hamleSayisi: 0, zincir: null, bitti: false, S3: null, pullar: [], isaretler: [], sonHareket: null, gecmis: [] };

  function bosTahta() {
    var t = [];
    for (var r = 0; r < 8; r++) { t.push([0, 0, 0, 0, 0, 0, 0, 0]); }
    for (var r2 = 0; r2 < 8; r2++) for (var c = 0; c < 8; c++) {
      if ((r2 + c) % 2 !== 1) continue;
      if (r2 < 3) t[r2][c] = -1;        /* yapay zekâ (üst, siyah) */
      if (r2 > 4) t[r2][c] = 1;         /* sen (alt, beyaz) */
    }
    return t;
  }
  var icMi = function (r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; };
  var beyazMi = function (p) { return p > 0; };
  var damaMi = function (p) { return p === 2 || p === -2; };

  /* ---- hamle üretimi ---- */
  function yonler(p) {
    if (damaMi(p)) return [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    return p > 0 ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
  }
  function tumYonler() { return [[-1, -1], [-1, 1], [1, -1], [1, 1]]; }

  function normalHamleler(t, r, c) {
    var p = t[r][c], h = [];
    if (!p) return h;
    if (damaMi(p)) {
      for (var i = 0; i < 4; i++) {
        var dr = tumYonler()[i][0], dc = tumYonler()[i][1];
        var rr = r + dr, cc = c + dc;
        while (icMi(rr, cc) && t[rr][cc] === 0) { h.push({ r: rr, c: cc, yeme: null }); rr += dr; cc += dc; }
      }
    } else {
      var y = yonler(p);
      for (var k = 0; k < y.length; k++) {
        var r1 = r + y[k][0], c1 = c + y[k][1];
        if (icMi(r1, c1) && t[r1][c1] === 0) h.push({ r: r1, c: c1, yeme: null });
      }
    }
    return h;
  }

  function yemeHamleleri(t, r, c) {
    var p = t[r][c], h = [];
    if (!p) return h;
    var y = tumYonler();
    for (var i = 0; i < 4; i++) {
      var dr = y[i][0], dc = y[i][1];
      if (damaMi(p)) {
        var rr = r + dr, cc = c + dc, bulundu = null;
        while (icMi(rr, cc)) {
          var v = t[rr][cc];
          if (v === 0) { if (bulundu) h.push({ r: rr, c: cc, yeme: bulundu }); rr += dr; cc += dc; continue; }
          if (beyazMi(v) === beyazMi(p)) break;     /* kendi taşı → dur */
          if (bulundu) break;                        /* ikinci rakip → dur */
          bulundu = { r: rr, c: cc };
          rr += dr; cc += dc;
        }
      } else {
        var r1 = r + dr, c1 = c + dc, r2 = r + 2 * dr, c2 = c + 2 * dc;
        if (!icMi(r2, c2) || !icMi(r1, c1)) continue;
        var orta = t[r1][c1];
        if (orta !== 0 && beyazMi(orta) !== beyazMi(p) && t[r2][c2] === 0) h.push({ r: r2, c: c2, yeme: { r: r1, c: c1 } });
      }
    }
    return h;
  }

  function hamleler(t, r, c) { return yemeHamleleri(t, r, c).concat(normalHamleler(t, r, c)); }

  function tumHamleler(t, beyaz) {
    var l = [];
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var p = t[r][c];
      if (!p || beyazMi(p) !== beyaz) continue;
      var h = hamleler(t, r, c);
      for (var i = 0; i < h.length; i++) { h[i].from = { r: r, c: c }; l.push(h[i]); }
    }
    return l;
  }

  /* yeme zinciri: aynı taş yemeye devam edebilir mi? */
  function zincirVarMi(t, r, c) { return yemeHamleleri(t, r, c).length > 0; }

  function uygula(t, h) {
    var p = t[h.from.r][h.from.c];
    t[h.from.r][h.from.c] = 0;
    if (h.yeme) t[h.yeme.r][h.yeme.c] = 0;
    t[h.r][h.c] = p;
    /* terfi */
    if (p === 1 && h.r === 0) t[h.r][h.c] = 2;
    if (p === -1 && h.r === 7) t[h.r][h.c] = -2;
    return t;
  }

  function kopya(t) { return t.map(function (s) { return s.slice(); }); }

  /* ---- puanlama & yapay zekâ ---- */
  function puan(t) {
    var s = 0;
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var p = t[r][c];
      if (!p) continue;
      var d = damaMi(p) ? 300 : 100;
      /* ilerleme bonusu (siyah yukarıdan aşağı ilerler) */
      var ileri = p < 0 ? (r * 3) : ((7 - r) * 3);
      s += (beyazMi(p) ? -1 : 1) * (d + ileri);     /* siyah (yapay zekâ) iyi ise pozitif */
    }
    return s;
  }

  function enIyiHamle(t, derinlik, alfa, beta, sira) {
    var l = tumHamleler(t, !sira);                /* sira: true → beyaz oynar */
    if (!l.length) return { puan: sira ? 99999 : -99999, hamle: null };
    /* yeme hamleleri önce (budama için) */
    l.sort(function (a, b) { return (b.yeme ? 1 : 0) - (a.yeme ? 1 : 0); });
    if (derinlik <= 0) return { puan: puan(t), hamle: null };
    var enIyi = null, enIyiP = sira ? 1e9 : -1e9;
    for (var i = 0; i < l.length; i++) {
      var y = kopya(t);
      uygula(y, l[i]);
      var s = enIyiHamle(y, derinlik - 1, alfa, beta, !sira).puan;
      if (sira) { if (s < enIyiP) { enIyiP = s; enIyi = l[i]; } if (enIyiP < beta) beta = enIyiP; }
      else { if (s > enIyiP) { enIyiP = s; enIyi = l[i]; } if (enIyiP > alfa) alfa = enIyiP; }
      if (beta <= alfa) break;
    }
    return { puan: enIyiP, hamle: enIyi };
  }

  function aiHamleSec(t) {
    var derinlik = D.zorluk === 1 ? 2 : (D.zorluk === 2 ? 4 : 5);
    if (D.zorluk === 1 && Math.random() < 0.25) {     /* kolay seviyede bazen rastgele */
      var l = tumHamleler(t, false);
      return l[Math.floor(Math.random() * l.length)];
    }
    return enIyiHamle(t, derinlik, -1e9, 1e9, false).hamle;
  }

  /* ================= 3D ÇİZİM ================= */
  function pulYap(p, boyut) {
    var profil = [];
    var profilNokta = [
      [0.00, 0.00], [0.36, 0.00], [0.40, 0.03], [0.41, 0.09], [0.36, 0.13],
      [0.24, 0.15], [0.30, 0.175], [0.31, 0.21], [0.26, 0.235],
      [0.14, 0.25], [0.16, 0.275], [0.15, 0.30], [0.00, 0.31]
    ];
    for (var i = 0; i < profilNokta.length; i++) profil.push(new THREE.Vector2(profilNokta[i][0] * boyut, profilNokta[i][1] * boyut));
    var geo = new THREE.LatheGeometry(profil, 48);
    var beyaz = p > 0;
    var mat = new THREE.MeshPhysicalMaterial({
      color: beyaz ? 0xf3e6cf : 0x3a2317,
      map: window.oyunAhsapDoku(beyaz ? "pulBeyaz" : "pulSiyah", beyaz ? "#f6ead4" : "#43291b", beyaz ? "#cbb492" : "#1d1109", 16),
      roughness: beyaz ? 0.42 : 0.5, metalness: 0.05, clearcoat: 0.5, clearcoatRoughness: 0.35
    });
    var g = new THREE.Group();
    var m = new THREE.Mesh(geo, mat);
    m.castShadow = true; m.receiveShadow = true;
    g.add(m);
    if (damaMi(p)) {                                   /* dama → altın taç halkası */
      var halka = new THREE.Mesh(new THREE.TorusGeometry(boyut * 0.26, boyut * 0.035, 12, 36),
        new THREE.MeshStandardMaterial({ color: 0xd9b44a, metalness: 0.95, roughness: 0.22 }));
      halka.rotation.x = Math.PI / 2; halka.position.y = boyut * 0.30;
      halka.castShadow = true;
      g.add(halka);
      var inci = new THREE.Mesh(new THREE.SphereGeometry(boyut * 0.075, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xfff0c0, metalness: 1, roughness: 0.15 }));
      inci.position.y = boyut * 0.34; inci.castShadow = true;
      g.add(inci);
    }
    return g;
  }

  function kareMerkez(r, c, olcu) { return new THREE.Vector3((c - 3.5) * olcu / 8, 0, (r - 3.5) * olcu / 8); }

  function tahtayiKur() {
    var S3 = D.S3;
    if (!S3) return;
    S3.temizle();
    D.pullar = []; D.isaretler = [];
    var olcu = 8.6;
    window.oyunMasa(S3, olcu * 0.72, "#20362b");
    /* ahşap çerçeve */
    var cerceve = new THREE.Mesh(new THREE.BoxGeometry(olcu + 1.5, 0.55, olcu + 1.5),
      new THREE.MeshStandardMaterial({ map: window.oyunAhsapDoku("cerceve", "#7a4f24", "#40260f", 34), roughness: 0.38, metalness: 0.12 }));
    cerceve.position.y = -0.05; cerceve.castShadow = true; cerceve.receiveShadow = true;
    S3.ekle(cerceve, "cerceve", false);
    var ic = new THREE.Mesh(new THREE.BoxGeometry(olcu + 0.35, 0.5, olcu + 0.35),
      new THREE.MeshStandardMaterial({ map: window.oyunKeceDoku("damakece", "#12402f"), roughness: 0.95 }));
    ic.position.y = 0.02; ic.receiveShadow = true;
    S3.ekle(ic, "ic", false);
    /* kareler */
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      if ((r + c) % 2 !== 1) continue;
      var koyu = ((r + c) % 4 === 1);
      var k = new THREE.Mesh(new THREE.BoxGeometry(olcu / 8, 0.14, olcu / 8),
        new THREE.MeshStandardMaterial({
          map: koyu ? window.oyunAhsapDoku("kareKoyu", "#8a5a2b", "#3b220c", 12) : window.oyunAhsapDoku("kareAcik", "#e6cfa2", "#a8865a", 12),
          roughness: 0.34, metalness: 0.06
        }));
      var m2 = kareMerkez(r, c, olcu);
      k.position.set(m2.x, 0.27, m2.z);
      k.receiveShadow = true;
      k.userData.kare = [r, c];
      S3.ekle(k, "kare:" + r + ":" + c, true);
    }
    /* pullar */
    D.tahta.forEach(function (satir, r) {
      satir.forEach(function (p, c) {
        if (!p) return;
        var pul = pulYap(p, 0.92);
        var m3 = kareMerkez(r, c, olcu);
        pul.position.set(m3.x, 0.34, m3.z);
        pul.userData.konum = { r: r, c: c };
        S3.ekle(pul, "pul:" + r + ":" + c, true);
        D.pullar.push({ r: r, c: c, nesne: pul });
      });
    });
    S3.tikla(function (id) {
      if (!id) { return; }
      var par = String(id).split(":");
      if (par[0] === "pul") tasTikla(parseInt(par[1], 10), parseInt(par[2], 10));
      else if (par[0] === "kare") kareTikla(parseInt(par[1], 10), parseInt(par[2], 10));
    });
  }

  function pulNesne(r, c) {
    for (var i = 0; i < D.pullar.length; i++) if (D.pullar[i].r === r && D.pullar[i].c === c) return D.pullar[i].nesne;
    return null;
  }

  function isaretleriCiz(hedefler) {
    D.isaretler.forEach(function (n) { if (D.S3) D.S3.grup.remove(n); });
    D.isaretler = [];
    if (!D.S3) return;
    var olcu = 8.6;
    hedefler.forEach(function (h) {
      var m = kareMerkez(h.r, h.c, olcu);
      var renk = h.yeme ? 0xff6b6b : 0xf2c14e;
      var n = new THREE.Mesh(new THREE.CylinderGeometry(h.yeme ? 0.30 : 0.22, h.yeme ? 0.30 : 0.22, 0.06, 28),
        new THREE.MeshStandardMaterial({ color: renk, emissive: renk, emissiveIntensity: 0.55, transparent: true, opacity: 0.9 }));
      n.position.set(m.x, 0.36, m.z);
      D.S3.ekle(n, "isaret", false);
      D.isaretler.push(n);
    });
  }

  function durumYaz(m) {
    var s = el("damaDurum");
    if (s) s.innerHTML = m;
  }

  function sayilariYaz() {
    var b = 0, si = 0;
    D.tahta.forEach(function (s) { s.forEach(function (p) { if (p > 0) b++; else if (p < 0) si++; }); });
    var y = el("damaSayaclar");
    if (y) y.innerHTML = '<span class="dsBeyaz">⚪ Sen: <b>' + b + '</b></span><span class="dsSiyah">⚫ Yapay zekâ: <b>' + si + "</b></span>";
  }

  /* ---- oyuncu etkileşimi ---- */
  function tasTikla(r, c) {
    if (D.bitti || D.zincir) return;
    var p = D.tahta[r][c];
    if (p <= 0) { uyari("Bu taş senin değil."); return; }
    D.secili = { r: r, c: c };
    var h = hamleler(D.tahta, r, c);
    h.forEach(function (x) { x.from = { r: r, c: c }; });      /* hamleYap "from" ister */
    isaretleriCiz(h);
    var n = pulNesne(r, c);
    if (n && D.S3) D.S3.tween(n, { x: n.position.x, y: n.position.y + 0.35, z: n.position.z }, 220);
    durumYaz("⚪ Seçili taş: <b>" + (r + 1) + ". satır " + (c + 1) + ". kolon</b> — parlayan karelerden birine dokun (" + h.length + " hamle)");
  }

  function kareTikla(r, c) {
    if (D.bitti) return;
    if (!D.secili) return;
    var h = hamleler(D.tahta, D.secili.r, D.secili.c);
    h.forEach(function (x) { x.from = { r: D.secili.r, c: D.secili.c }; });
    var sec = null;
    for (var i = 0; i < h.length; i++) if (h[i].r === r && h[i].c === c) sec = h[i];
    if (!sec) { uyari("Buraya gidemez."); return; }
    hamleYap(sec);
  }

  function hamleYap(sec) {
    D.gecmis.push({ tahta: kopya(D.tahta), hamleSayisi: D.hamleSayisi });
    var pul = pulNesne(sec.from.r, sec.from.c);
    var S3 = D.S3, olcu = 8.6;
    var hedef = kareMerkez(sec.r, sec.c, olcu);
    var yenenNesne = sec.yeme ? pulNesne(sec.yeme.r, sec.yeme.c) : null;
    uygula(D.tahta, sec);
    /* animasyon */
    if (pul) {
      if (yenenNesne) {
        yenenNesne.userData.sil = true;
        S3.tween(yenenNesne, { x: yenenNesne.position.x, y: yenenNesne.position.y - 1.4, z: yenenNesne.position.z }, 300);
      }
      S3.tween(pul, { x: hedef.x, y: 0.34, z: hedef.z, hop: 0.9 }, 330, function () {
        if (yenenNesne) { S3.grup.remove(yenenNesne); }
        pullariTazele();
        devamEt(sec);
      });
      D.pullar.forEach(function (p) { if (p.nesne === pul) { p.r = sec.r; p.c = sec.c; } });
    } else { pullariTazele(); devamEt(sec); }
    D.sonHareket = sec;
    if (sec.yeme) uyari("⚪ Taş yedin!");
    isaretleriCiz([]);
    D.secili = null;
  }

  function devamEt(sec) {
    /* zincir devam ediyorsa aynı taş yeniden yemeli */
    if (sec.yeme && zincirVarMi(D.tahta, sec.r, sec.c)) {
      D.zincir = { r: sec.r, c: sec.c };
      var h = yemeHamleleri(D.tahta, sec.r, sec.c);
      h.forEach(function (x) { x.from = { r: sec.r, c: sec.c }; });
      isaretleriCiz(h);
      durumYaz("⚪ <b>Zincir devam ediyor!</b> Aynı taşla yemeye devam et (" + h.length + " seçenek)");
      D.secili = { r: sec.r, c: sec.c };
      return;
    }
    D.zincir = null;
    sayilariYaz();
    if (oyunBittiMi()) return;
    siraYapay();
  }

  function pullariTazele() { tahtayiKur(); }

  function oyunBittiMi() {
    var beyazVar = tumHamleler(D.tahta, true).length > 0;
    var siyahVar = tumHamleler(D.tahta, false).length > 0;
    var b = 0, s = 0;
    D.tahta.forEach(function (x) { x.forEach(function (p) { if (p > 0) b++; else if (p < 0) s++; }); });
    if (!b) { D.bitti = true; durumYaz("⚫ <b>Yapay zekâ kazandı.</b> Pulsuz kaldın."); kaydet(false); return true; }
    if (!s) { D.bitti = true; durumYaz("🏆 <b>Sen kazandın!</b> Yapay zekânın bütün pullarını aldın."); kaydet(true); return true; }
    if (!beyazVar) { D.bitti = true; durumYaz("⚫ <b>Hamlen kalmadı — yapay zekâ kazandı.</b>"); kaydet(false); return true; }
    if (!siyahVar) { D.bitti = true; durumYaz("🏆 <b>Yapay zekânın hamlesi kalmadı — sen kazandın!</b>"); kaydet(true); return true; }
    return false;
  }

  function kaydet(kazandi) {
    var k = window.oyunSkor("dama");
    var puan = (k.enIyi || 0) + (kazandi ? 1 : 0);
    window.oyunSkorYaz("dama", puan);
    var y = el("damaSayaclar");
    if (y) y.innerHTML += '<span class="dsSonuc">' + (kazandi ? "🏆 Kazandın" : "⚫ Yenildin") + " · galibiyet puanı: <b>" + puan + "</b></span>";
  }

  function siraYapay() {
    if (D.bitti) return;
    durumYaz("⚫ Yapay zekâ düşünüyor…");
    setTimeout(function () {
      var h = aiHamleSec(D.tahta);
      if (!h) { oyunBittiMi(); return; }
      /* zincirleri parça parça oyna */
      var sec = h;
      var S3 = D.S3, olcu = 8.6;
      var pul = pulNesne(sec.from.r, sec.from.c);
      var hedef = kareMerkez(sec.r, sec.c, olcu);
      var yenenNesne = sec.yeme ? pulNesne(sec.yeme.r, sec.yeme.c) : null;
      uygula(D.tahta, sec);
      if (yenenNesne && S3) S3.tween(yenenNesne, { x: yenenNesne.position.x, y: yenenNesne.position.y - 1.4, z: yenenNesne.position.z }, 300);
      if (pul && S3) {
        D.pullar.forEach(function (p) { if (p.nesne === pul) { p.r = sec.r; p.c = sec.c; } });
        S3.tween(pul, { x: hedef.x, y: 0.34, z: hedef.z, hop: 0.9 }, 330, function () {
          if (yenenNesne) S3.grup.remove(yenenNesne);
          tahtayiKur();
          if (sec.yeme && zincirVarMi(D.tahta, sec.r, sec.c)) { siraYapayZincir(sec.r, sec.c); return; }
          sayilariYaz();
          if (oyunBittiMi()) return;
          durumYaz("⚪ <b>Sıra sende.</b> Taşını seç.");
          D.hamleSayisi++;
        });
      } else { tahtayiKur(); sayilariYaz(); durumYaz("⚪ <b>Sıra sende.</b>"); }
    }, 420);
  }

  function siraYapayZincir(r, c) {
    var h = yemeHamleleri(D.tahta, r, c);
    if (!h.length) { sayilariYaz(); durumYaz("⚪ Sıra sende."); return; }
    var sec = h[0];
    sec.from = { r: r, c: c };
    var S3 = D.S3, olcu = 8.6, pul = pulNesne(r, c), hedef = kareMerkez(sec.r, sec.c, olcu);
    var yenen = sec.yeme ? pulNesne(sec.yeme.r, sec.yeme.c) : null;
    uygula(D.tahta, sec);
    if (yenen && S3) S3.tween(yenen, { x: yenen.position.x, y: yenen.position.y - 1.4, z: yenen.position.z }, 280);
    if (pul && S3) {
      D.pullar.forEach(function (p) { if (p.nesne === pul) { p.r = sec.r; p.c = sec.c; } });
      S3.tween(pul, { x: hedef.x, y: 0.34, z: hedef.z, hop: 0.85 }, 300, function () {
        if (yenen) S3.grup.remove(yenen);
        tahtayiKur();
        if (zincirVarMi(D.tahta, sec.r, sec.c)) siraYapayZincir(sec.r, sec.c);
        else { sayilariYaz(); if (!oyunBittiMi()) durumYaz("⚪ Sıra sende."); }
      });
    }
  }

  /* ================= EKRAN ================= */
  window.damaBasla = function () {
    var a = el("oyunAlan");
    if (!a) return;
    D.tahta = bosTahta(); D.secili = null; D.bitti = false; D.zincir = null; D.gecmis = []; D.hamleSayisi = 0;
    a.innerHTML = window.oyunMarka("ÜSTADIN DAMASI", "Gerçek ahşap tahtada Türk daması") +
      '<div class="oyTahtaUst">' +
      '<div class="oyTahtaDurum" id="damaDurum">⚪ <b>Sıra sende.</b> Taşını seç.</div>' +
      '<div class="oyTahtaAraclar">' +
      '<span class="oyZorlukSec"><label>Zorluk</label>' +
      '<select id="damaZorluk" onchange="damaZorluk(this.value)">' +
      '<option value="1">Kolay</option><option value="2" selected>Orta</option><option value="3">Zor</option></select></span>' +
      '<button class="oyDugme" onclick="damaGeriAl()">↩️ Geri al</button>' +
      '<button class="oyDugme" onclick="damaBasla()">🔄 Yeni oyun</button>' +
      '<button class="oyDugme" onclick="oyunCik()">🎮 Lobi</button>' +
      "</div></div>" +
      '<div class="oyTahtaKap" id="damaKap"></div>' +
      '<div class="oyTahtaAlt" id="damaSayaclar"></div>' +
      '<div class="oyTahtaYardim">👆 Taşını seç → parlayan kareye dokun · 🖱️ Tahtayı sürükleyerek döndür, tekerlekle yakınlaştır · ⚪ pullar senin, ⚫ yapay zekânın · son satıra ulaşan pul <b>dama</b> olur ve uçabilir.</div>';
    D.S3 = window.OYUN3D("damaKap", { yukseklik: 560, dikey: 0.56, uzak: 16.5, yatay: 0.28 });
    tahtayiKur();
    sayilariYaz();
    setTimeout(function () { if (D.S3) D.S3.boyutla(); }, 120);
  };

  window.damaZorluk = function (v) { D.zorluk = parseInt(v, 10) || 2; uyari("Zorluk: " + (D.zorluk === 1 ? "Kolay" : D.zorluk === 2 ? "Orta" : "Zor")); };

  window.damaGeriAl = function () {
    if (!D.gecmis.length) { uyari("Geri alınacak hamle yok."); return; }
    var g = D.gecmis.pop();
    D.tahta = g.tahta; D.bitti = false; D.zincir = null;
    if (D.gecmis.length >= 2) { var g2 = D.gecmis.pop(); D.tahta = g2.tahta; }
    tahtayiKur(); sayilariYaz();
    durumYaz("⚪ Hamle geri alındı. <b>Sıra sende.</b>");
  };

  /* test kancaları */
  window.__dama = { D: D, hamleler: hamleler, tumHamleler: tumHamleler, aiHamleSec: aiHamleSec, uygula: uygula, bosTahta: bosTahta, kopya: kopya, puan: puan,
    tasTikla: tasTikla, kareTikla: kareTikla, siraYapay: siraYapay, zincirVarMi: zincirVarMi, yemeHamleleri: yemeHamleleri };
})();
