(async function () {
  var r = {};
  function bekle(ms) { return new Promise(function (c) { setTimeout(c, ms); }); }
  r.baslik = document.title;
  r.threeVar = (typeof THREE);
  r.globaller = ["git", "ciz", "temaUygula", "yaziUygula", "oynat", "araGirdi", "buyut", "paylas", "mesajGonder", "ucBoyut"]
    .map(function (f) { return f + ":" + (typeof window[f]); }).join(" ");
  r.temaSayisi = TEMALAR.length;
  r.yaziSayisi = YAZILAR.length;
  r.kanalSayisi = KANALLAR.length;
  r.menuSayisi = document.querySelectorAll("#menuListe .menuSatir").length;
  r.noktaSayisi = document.querySelectorAll("#temaNokta .nokta").length;

  /* her bölümü gez */
  r.bolumler = {};
  var idler = MENU.map(function (m) { return m.id; });
  for (var i = 0; i < idler.length; i++) {
    git(idler[i]);
    await bekle(140);
    var kart = document.querySelectorAll("#icerik .kart").length;
    var img = document.querySelectorAll("#icerik img").length;
    var kirik = 0;
    [].slice.call(document.querySelectorAll("#icerik img")).forEach(function (im) {
      if (im.complete && im.naturalWidth === 0) kirik++;
    });
    r.bolumler[idler[i]] = {
      renk: getComputedStyle(document.body).getPropertyValue("--ana").trim(),
      kart: kart,
      img: img,
      kirik: kirik,
      uzunluk: document.getElementById("icerik").textContent.trim().length,
      baslik: (document.querySelector("#icerik h2") || {}).textContent
    };
  }

  /* tema imzası: her tema farklı --ana üretiyor mu */
  var imza = [], tek = {};
  for (var t = 0; t < TEMALAR.length; t++) {
    temaUygula(TEMALAR[t].id, 0);
    var a = getComputedStyle(document.body).getPropertyValue("--ana").trim() + "|" +
      getComputedStyle(document.body).getPropertyValue("--arka").trim();
    imza.push(a);
  }
  for (var k = 0; k < imza.length; k++) tek[imza[k]] = 1;
  r.temaImzaTek = Object.keys(tek).length;
  temaUygula("siyahaltin", 0);

  /* yazı tipleri gerçekten değişiyor mu */
  var olcum = [];
  var farkli = ["klasik", "kitap", "elyazisi", "makine"];
  for (var f = 0; f < farkli.length; f++) {
    yaziUygula(farkli[f], 0);
    olcum.push(getComputedStyle(document.body).getPropertyValue("--fontBaslik").trim());
  }
  r.yaziImza = olcum;
  yaziUygula("klasik", 0);

  /* radyo: kanal düğmeleri ve oynatma çağrısı */
  git("radyo"); await bekle(200);
  r.radyoKanalDugmesi = document.querySelectorAll("#rListe .kanal").length;
  oynat(0); await bekle(300);
  r.radyoDurum = (document.getElementById("rDurum") || {}).textContent;
  radyoDurdur();

  /* arama */
  araGirdi("şiir"); await bekle(120);
  r.aramaSiiir = document.querySelectorAll("#araSonuc .sonucSatir").length;
  araGirdi("Harvard"); await bekle(120);
  r.aramaHarvard = document.querySelectorAll("#araSonuc .sonucSatir").length;
  araGirdi("kalem"); await bekle(120);
  r.aramaKalem = document.querySelectorAll("#araSonuc .sonucSatir").length;
  aramaKapat();

  /* 3D sahne ölçümü */
  r.ucHazir = S3.hazir;
  if (S3.hazir && S3.cizici) {
    S3.cizici.render(S3.sahne, S3.kamera);
    var gl = S3.cizici.getContext();
    var px = new Uint8Array(4);
    gl.readPixels(Math.floor(gl.drawingBufferWidth / 2), Math.floor(gl.drawingBufferHeight / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    var kose = new Uint8Array(4);
    gl.readPixels(2, 2, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, kose);
    r.pikselOrta = [px[0], px[1], px[2], px[3]];
    r.pikselKose = [kose[0], kose[1], kose[2], kose[3]];
    r.ucgen = S3.cizici.info.render.triangles;
    r.cagri = S3.cizici.info.render.calls;
    r.tuy = S3.taze.length;
    r.nokta = S3.toz.geometry.attributes.position.count;
    r.puanBoyut = S3.cizici.getContext().getParameter(0x0D33) > 0;
  }
  r.kameraBaslangic = [S3.kamera.position.x.toFixed(2), S3.kamera.position.y.toFixed(2), S3.kamera.position.z.toFixed(2)];

  /* yatay taşma */
  var tasan = [];
  [].slice.call(document.querySelectorAll("#icerik *")).forEach(function (e) {
    var b = e.getBoundingClientRect();
    if (b.width > 0 && (b.left < -2 || b.right > window.innerWidth + 2)) {
      tasan.push((e.tagName + "." + (e.className || "")).slice(0, 46));
    }
  });
  r.tasanSayi = tasan.length;
  r.tasanIlk = tasan.slice(0, 5);
  r.sayfaTasma = document.documentElement.scrollWidth - window.innerWidth;

  /* saat ve söz */
  saatGuncelle();
  r.saat = (document.getElementById("saatBuyuk") || {}).textContent;
  r.soz = ((document.getElementById("sozBuyuk") || {}).textContent || "").slice(0, 40);
  r.madalyon = (document.querySelector(".madalyon img") || {}).naturalWidth;
  r.logoYuklendi = (document.querySelector('.footer img') || {}).naturalWidth;
  return JSON.stringify(r);
})()
