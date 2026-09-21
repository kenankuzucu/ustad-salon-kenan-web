(async function () {
  var r = {};
  function bekle(ms) { return new Promise(function (c) { setTimeout(c, ms); }); }
  /* yumuşak kaydırma ve geçişleri kapat (ölçüm öncesi) */
  var st = document.createElement("style");
  st.textContent = "*{transition:none!important;animation:none!important}html{scroll-behavior:auto!important}";
  document.head.appendChild(st);

  r.ekran = [window.innerWidth, window.innerHeight];
  r.hamburgerGorunur = getComputedStyle(document.querySelector(".hamburger")).display;
  r.menuBaslangicSol = document.querySelector(".sol").getBoundingClientRect().left;

  /* gerçek parmak gibi: hamburger merkezine elementFromPoint + click */
  var h = document.querySelector(".hamburger");
  var k = h.getBoundingClientRect();
  var cx = Math.round(k.left + k.width / 2), cy = Math.round(k.top + k.height / 2);
  var ustte = document.elementFromPoint(cx, cy);
  r.hamburgerHit = (ustte && (ustte === h || h.contains(ustte))) ? "ULASIR" : ("ENGELLI:" + (ustte ? ustte.className : "yok"));
  h.click(); await bekle(60);
  r.cekmeceAcik = document.body.className.indexOf("cekmeceAcik") > -1;
  r.menuSol = document.querySelector(".sol").getBoundingClientRect().left;

  /* menüden bir kategoriye gerçek dokunuş */
  var satir = document.querySelector('#menuListe .menuSatir[data-git="siirler"]');
  var k2 = satir.getBoundingClientRect();
  var u2 = document.elementFromPoint(Math.round(k2.left + k2.width / 2), Math.round(k2.top + k2.height / 2));
  r.menuHit = (u2 && (u2 === satir || satir.contains(u2))) ? "ULASIR" : "ENGELLI";
  satir.click(); await bekle(120);
  r.sonraBolum = document.body.getAttribute("data-bolum");
  r.cekmeceKapandi = document.body.className.indexOf("cekmeceAcik") === -1;
  r.siirKart = document.querySelectorAll(".siirKart").length;

  /* yatay taşma + üst bar sarma */
  r.sayfaTasma = document.documentElement.scrollWidth - window.innerWidth;
  var ara = document.querySelector(".araKutu input").getBoundingClientRect();
  r.aramaGenislik = Math.round(ara.width);
  r.madalyonOlcu = Math.round(document.querySelector(".madalyon").getBoundingClientRect().width);

  /* radyo kanal düğmeleri gerçekten tıklanabiliyor mu */
  git("radyo"); await bekle(150);
  var kd = document.querySelector("#kanalListe .kanal");
  var k3 = kd.getBoundingClientRect();
  var u3 = document.elementFromPoint(Math.round(k3.left + k3.width / 2), Math.round(k3.top + k3.height / 2));
  r.kanalHit = (u3 && (u3 === kd || kd.contains(u3))) ? "ULASIR" : "ENGELLI";
  kd.click(); await bekle(300);
  r.kanalSecildi = document.getElementById("rKanal").textContent;
  radyoDurdur();

  /* galeri büyütme */
  git("galeri"); await bekle(150);
  var g = document.querySelector(".gKart"); g.click(); await bekle(120);
  r.buyutAcik = document.getElementById("buyut").className;
  r.buyutResim = document.getElementById("buyutResim").getAttribute("src");
  buyutKapat();
  return JSON.stringify(r);
})()
