(async function () {
  var r = {};
  function bekle(ms) { return new Promise(function (c) { setTimeout(c, ms); }); }
  git("radyo"); await bekle(250);
  r.kanalDugme = document.querySelectorAll("#kanalListe .kanal").length;
  r.soz = (document.getElementById("sozBuyuk") || {}).textContent;
  r.saat = (document.getElementById("saatBuyuk") || {}).textContent;
  araGirdi("şiir"); await bekle(150);
  r.aramaSiiir = document.querySelectorAll("#araSonuc .sonucSatir").length;
  araGirdi("Ahmet"); await bekle(120);
  r.aramaAhmet = document.querySelectorAll("#araSonuc .sonucSatir").length;
  araGirdi("makale"); await bekle(120);
  r.aramaMakale = document.querySelectorAll("#araSonuc .sonucSatir").length;
  aramaKapat();
  /* açık tema + bölüm rengi okunurluk ölçümü */
  var olcum = {};
  var acik = ["aydinlik", "fildisi", "karbeyaz", "pembezarif"];
  function parlak(hex) {
    hex = hex.replace("#", ""); if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var c = [0, 2, 4].map(function (i) { return parseInt(hex.substr(i, 2), 16) / 255; }).map(function (v) {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function kontrast(a, b) { var l1 = parlak(a), l2 = parlak(b); var x = Math.max(l1, l2), y = Math.min(l1, l2); return ((x + 0.05) / (y + 0.05)).toFixed(2); }
  for (var t = 0; t < acik.length; t++) {
    temaUygula(acik[t], 0);
    for (var i = 0; i < MENU.length; i++) {
      document.body.setAttribute("data-bolum", MENU[i].id);
      var st = getComputedStyle(document.body);
      var ana = st.getPropertyValue("--ana").trim(), kart = st.getPropertyValue("--kart").trim();
      olcum[acik[t] + "|" + MENU[i].id] = kontrast(ana, kart);
    }
  }
  r.kontrastAcik = olcum;
  temaUygula("siyahaltin", 0);
  var koyu = {};
  for (var m = 0; m < MENU.length; m++) {
    document.body.setAttribute("data-bolum", MENU[m].id);
    var st2 = getComputedStyle(document.body);
    koyu[MENU[m].id] = kontrast(st2.getPropertyValue("--ana").trim(), st2.getPropertyValue("--kart").trim());
  }
  r.kontrastKoyu = koyu;
  return JSON.stringify(r);
})()
