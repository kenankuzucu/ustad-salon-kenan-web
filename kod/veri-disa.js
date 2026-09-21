// veri.js içeriğini JSON olarak dışa verir (Word belgesi üretmek için).
// Kullanım: node veri-disa.js > veri.json
const fs = require("fs");
const yol = process.argv[2] || "veri.js";
const src = fs.readFileSync(yol, "utf8");
const f = new Function(src + "; return {KISI:KISI, BIO_BASLIK:BIO_BASLIK, BIO_TAM:BIO_TAM, BIO_DIPNOT:BIO_DIPNOT, KIMLIK:KIMLIK, HIZMETLER:HIZMETLER, SAATLER:SAATLER, SIIRLER:SIIRLER, MAKALELER:MAKALELER, MEKTUPLAR:MEKTUPLAR, ESERLER:ESERLER, ESER_SAYI:ESER_SAYI, MEB:MEB, UNIVERSITELER:UNIVERSITELER, AKADEMILER:AKADEMILER, MESLEKI_BELGE:MESLEKI_BELGE, TOPLAM_BELGE:TOPLAM_BELGE, ILETISIM:ILETISIM, SOSYAL:SOSYAL, SOZLER:SOZLER, MENU:MENU, KANALLAR:KANALLAR};");
console.log(JSON.stringify(f()));
