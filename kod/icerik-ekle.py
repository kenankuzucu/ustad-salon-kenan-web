# -*- coding: utf-8 -*-
"""İÇERİK EKLE — veri.js'e güvenli kayıt ekler (Kenan'ın gönderdiği metinler).

Kullanım:
  python icerik-ekle.py siir "Şiirin Adı" metin.txt
  python icerik-ekle.py makale "Makalenin Adı" metin.txt
  python icerik-ekle.py mektup "Mektubun Adı" metin.txt

- Metin dosyası: her satır bir dize (şiir), boş satırla ayrılmış bloklar paragraf
  (makale/mektup). İsterseniz metni doğrudan komut satırından da verin (dosya yerine).
- Kayıt listenin SONUNA eklenir (geliş sırası korunur), numaralandırma otomatik.
- Yazma sonrası `node --check veri.js` koşar; hata varsa dosya geri alınır.
"""
import os
import re
import subprocess
import sys

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERI = os.path.join(KOK, "veri.js")
NODE = r"C:\Users\kenan\AppData\Local\hermes\node\node.exe"

DIZI = {"siir": "SIIRLER", "makale": "MAKALELER", "mektup": "MEKTUPLAR"}


def js_dize(metin):
    """JS tek tırnaklı string içinde sorun çıkaran karakterleri temizler."""
    return (metin.replace("\\", "\\\\").replace('"', '\\"')
            .replace("'", "\u2019").replace("\r", " "))


def dizi_sonu(kaynak, ad):
    """`var AD = [ ... ];` bloğunun kapanış parantezinin konumunu bulur."""
    bas = kaynak.index("var %s = [" % ad)
    i = kaynak.index("[", bas)
    derinlik, j = 0, i
    while j < len(kaynak):
        if kaynak[j] == "[":
            derinlik += 1
        elif kaynak[j] == "]":
            derinlik -= 1
            if derinlik == 0:
                return j
        j += 1
    raise ValueError("dizi kapanışı bulunamadı: " + ad)


def ekle(tur, ad, metin):
    tur = tur.strip().lower()
    if tur not in DIZI:
        print("Bilinmeyen tür:", tur, "| olması gereken:", ", ".join(DIZI))
        return 1
    dizi = DIZI[tur]
    kaynak = open(VERI, encoding="utf-8").read()
    satirlar = [s.strip() for s in metin.splitlines()]
    bloklar = [b.strip() for b in re.split(r"\n\s*\n", "\n".join(satirlar)) if b.strip()]

    if tur == "siir":
        icerik = "dize: [" + ", ".join('"%s"' % js_dize(s) for s in satirlar if s) + "]"
    else:
        icerik = "ozet: \u201c%s\u201d,\n    paragraf: [" % js_dize(bloklar[0][:160] if bloklar else "")
        icerik += ", ".join('"%s"' % js_dize(b) for b in bloklar) + "]"
        if tur == "mektup":
            icerik = "tarih: \"\",\n    " + icerik

    yeni = '  { ad: "%s", tur: "%s", %s }' % (
        js_dize(ad), "ŞİİR" if tur == "siir" else ("MAKALE" if tur == "makale" else "MEKTUP"), icerik)

    kapanis = dizi_sonu(kaynak, dizi)
    govde = kaynak[:kapanis].rstrip()
    onceki_dolu = bool(re.search(r"\{\s*$", govde.split("\n")[-1] + "") )
    ayrac = ",\n" if not govde.endswith("[") else "\n"
    # son elemandan sonra virgül yoksa ekle
    if not govde.endswith(",") and not govde.endswith("["):
        govde += ","
    kaynak_yeni = govde + "\n" + yeni + "\n" + kaynak[kapanis:]

    yedek = kaynak
    open(VERI, "w", encoding="utf-8").write(kaynak_yeni)
    r = subprocess.run([NODE, "--check", VERI], capture_output=True, text=True)
    if r.returncode != 0:
        open(VERI, "w", encoding="utf-8").write(yedek)
        print("HATA: veri.js bozuldu, geri alındı.\n", r.stderr[-600:])
        return 1
    kaynak_yeni2 = open(VERI, encoding="utf-8").read()
    b2 = kaynak_yeni2.index("var %s = [" % dizi)
    son2 = b2 + kaynak_yeni2[b2:].index("\n];")
    sayi = kaynak_yeni2[b2:son2].count("ad: \"")
    print("EKLENDİ → %s · '%s' · %s içinde toplam %d kayıt" % (dizi, ad, dizi, sayi))
    print("Sıradaki adım: sayfayı yenile, içerik görünür.")
    return 0


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)
    tur, ad, kaynak = sys.argv[1], sys.argv[2], sys.argv[3]
    metin = open(kaynak, encoding="utf-8").read() if os.path.exists(kaynak) else kaynak
    sys.exit(ekle(tur, ad, metin))
