# -*- coding: utf-8 -*-
"""ÜSTAD KENAN KUZUCU — zarif logo üreteci (PIL).
4 varyant üretir: altin madalyon, zumrut arma, muhur, kalem-makas monogram.
Ayrıca karsilastirma sayfası (PNG) uretir. Çıktı: ../logo/"""
import os, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOTO = os.path.join(KOK, "foto", "ustad-kenan.jpg")
CIKTI = os.path.join(KOK, "logo")
os.makedirs(CIKTI, exist_ok=True)

GEO = r"C:\Windows\Fonts\georgia.ttf"
GEOB = r"C:\Windows\Fonts\georgiab.ttf"
GEOI = r"C:\Windows\Fonts\georgiai.ttf"
CAMB = r"C:\Windows\Fonts\cambria.ttc"
CAMBB = r"C:\Windows\Fonts\cambriab.ttf"

S = 1024  # ana logo kenari


def font(yol, boy):
    try:
        return ImageFont.truetype(yol, boy)
    except Exception:
        return ImageFont.truetype(GEO, boy)


def yuvarlak_foto(boy, kaydir=0.06, zoom=1.0):
    """Fotoğrafı daireye kırpar (üstten pay bırakır)."""
    im = Image.open(FOTO).convert("RGB")
    w, h = im.size
    k = int(min(w, h) / zoom)
    x = (w - k) // 2
    y = int((h - k) * kaydir)
    im = im.crop((x, y, x + k, y + k)).resize((boy, boy), Image.LANCZOS)
    maske = Image.new("L", (boy * 4, boy * 4), 0)
    ImageDraw.Draw(maske).ellipse((0, 0, boy * 4 - 1, boy * 4 - 1), fill=255)
    maske = maske.resize((boy, boy), Image.LANCZOS)
    cik = Image.new("RGBA", (boy, boy), (0, 0, 0, 0))
    cik.paste(im, (0, 0), maske)
    return cik


def gradyan_daire(boy, c1, c2):
    """Radyal renk geçişli daire (halka dolgusu için)."""
    g = Image.new("RGBA", (boy, boy), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    m = boy / 2.0
    for i in range(boy // 2, 0, -1):
        t = i / m
        c = tuple(int(c1[j] + (c2[j] - c1[j]) * (1 - t)) for j in range(3))
        d.ellipse((m - i, m - i, m + i, m + i), fill=c + (255,))
    return g


def halka(tuval, merkez, r_dis, kalinlik, c1, c2, ic_bos=True):
    boy = int(r_dis * 2)
    g = gradyan_daire(boy, c1, c2)
    maske = Image.new("L", (boy, boy), 0)
    md = ImageDraw.Draw(maske)
    r_ic = r_dis - kalinlik
    md.ellipse((0, 0, boy - 1, boy - 1), fill=255)
    if ic_bos:
        md.ellipse((kalinlik, kalinlik, boy - 1 - kalinlik, boy - 1 - kalinlik), fill=0)
    tuval.paste(g, (int(merkez[0] - r_dis), int(merkez[1] - r_dis)), maske)


def elmas(d, x, y, r, renk, oran=0.42):
    w = r * oran
    d.polygon([(x, y - r), (x + w, y), (x, y + r), (x - w, y)], fill=renk)


def yay_yazi(tuval, yazi, merkez, r, fontu, renk, bas=90.0, son=270.0, disari=True):
    """Metni daire yayı üzerine yerleştirir (üstten başlayıp saat yönünde)."""
    g = Image.new("RGBA", tuval.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    gen = []
    toplam = 0
    for ch in yazi:
        try:
            bb = d.textbbox((0, 0), ch, font=fontu)
        except Exception:
            bb = (0, 0, 10, 10)
        w = bb[2] - bb[0]
        gen.append((ch, w))
        toplam += w + 2
    aci = bas
    adim = (son - bas) / max(toplam, 1)
    for ch, w in gen:
        aci += (w / 2.0 + 1) * adim
        a = math.radians(aci)
        x = merkez[0] - math.cos(a) * r
        y = merkez[1] - math.sin(a) * r
        kat = Image.new("RGBA", (int(w + 40), int(fontu.size * 2.2)), (0, 0, 0, 0))
        kd = ImageDraw.Draw(kat)
        kd.text((20, 0), ch, font=fontu, fill=renk)
        dondur = kat.rotate(-(aci - 90), resample=Image.BICUBIC, expand=True)
        g.paste(dondur, (int(x - dondur.size[0] / 2), int(y - dondur.size[1] / 2)), dondur)
        aci += (w / 2.0 + 1) * adim
    tuval.alpha_composite(g)


ALTIN1 = (255, 236, 176)
ALTIN2 = (196, 146, 42)
ALTIN3 = (120, 82, 16)
ZUMRUT1 = (168, 235, 205)
ZUMRUT2 = (26, 122, 92)
ZUMRUT3 = (8, 60, 46)
FILDISI = (247, 241, 228)
KOYU = (16, 22, 20)


def varyant_madalyon():
    t = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    m = (S / 2, 440)
    # dış zarif halkalar (simetrik)
    halka(t, m, 392, 6, ALTIN3, ALTIN1)
    halka(t, m, 352, 26, ALTIN1, ALTIN2)
    halka(t, m, 330, 3, ALTIN1, ALTIN3)
    # fotoğraf
    f = yuvarlak_foto(600)
    t.alpha_composite(f, (int(m[0] - 300), int(m[1] - 300)))
    # fotoğraf kenarına ince altın çizgi
    d = ImageDraw.Draw(t)
    d.ellipse((m[0] - 302, m[1] - 302, m[0] + 302, m[1] + 302), outline=ALTIN1 + (255,), width=4)
    # simetrik yan süsler
    for yon in (-1, 1):
        for i, r in enumerate((15, 10, 6)):
            x = m[0] + yon * (368 + i * 30)
            elmas(d, x, m[1], r, ALTIN1 if i % 2 == 0 else ALTIN2)
    elmas(d, m[0], m[1] - 392, 16, ALTIN1)
    elmas(d, m[0], m[1] + 392, 16, ALTIN1)
    # yazı
    d.text((m[0], 862), "ÜSTAD", font=font(GEOB, 38), fill=ALTIN1, anchor="mm")
    d.text((m[0], 948), "KENAN KUZUCU", font=font(CAMBB, 100), fill=FILDISI, anchor="mm")
    return t


def cizgi(d, x, y, yari):
    d.line((x - yari, y, x - 22, y), fill=ALTIN2 + (255,), width=3)
    d.line((x + 22, y, x + yari, y), fill=ALTIN2 + (255,), width=3)
    elmas(d, x, y, 13, ALTIN1)


def varyant_arma():
    t = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(t)
    # yuvarlak yaka biçimli geniş arma (yazılar için bol yer)
    m = (S / 2, 404)
    R = 356
    dis = []
    for a in range(0, 360, 2):
        rad = math.radians(a)
        r = R - 40 * math.sin(rad) ** 3 if 0 < a < 180 else R
        dis.append((m[0] + math.cos(rad) * r, m[1] + math.sin(rad) * r))
    d.polygon(dis, fill=KOYU + (255,))
    d.line(dis + [dis[0]], fill=ALTIN2 + (255,), width=10)
    d.line(dis + [dis[0]], fill=ALTIN1 + (255,), width=2)
    ic = [(m[0] + math.cos(math.radians(a)) * (R - 26), m[1] + math.sin(math.radians(a)) * (R - 26))
          for a in range(0, 360, 2)]
    d.polygon(ic, fill=ZUMRUT3 + (255,))
    d.text((m[0], 128), "ÜSTAD", font=font(GEOB, 44), fill=ALTIN1, anchor="mm")
    f = yuvarlak_foto(320, zoom=1.0)
    t.alpha_composite(f, (int(m[0] - 160), 194))
    d.ellipse((m[0] - 163, 191, m[0] + 163, 517), outline=ALTIN1 + (255,), width=6)
    for yon in (-1, 1):   # simetrik defne yaprakları
        for i in range(7):
            y = 210 + i * 44
            x = m[0] + yon * (232 + int(16 * math.sin(i * 0.9)))
            yari = 26 - i * 2
            d.arc((x - yari, y - 13, x + yari, y + 13), 0 if yon > 0 else 180,
                  180 if yon > 0 else 360, fill=ALTIN2 + (200,), width=3)
    ft = font(CAMBB, 78)
    d.text((m[0], 566), "KENAN", font=ft, fill=FILDISI, anchor="mm")
    d.text((m[0], 648), "KUZUCU", font=ft, fill=FILDISI, anchor="mm")
    d.text((m[0], 716), "SANAT · BİLGİ · ZARAFET", font=font(GEO, 30), fill=ALTIN1, anchor="mm")
    d.text((m[0], 810), "1981 · GAZİANTEP", font=font(GEO, 28), fill=ALTIN2, anchor="mm")
    elmas(d, m[0], 862, 18, ALTIN1)
    for yon in (-1, 1):
        d.line((m[0] + yon * 40, 862, m[0] + yon * 320, 862), fill=ALTIN2 + (255,), width=3)
    return t


def varyant_muhur():
    t = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    m = (S / 2, S / 2)
    halka(t, m, 470, 14, ALTIN1, ALTIN3)
    halka(t, m, 430, 4, ALTIN2, ALTIN1)
    halka(t, m, 300, 5, ALTIN1, ALTIN3)
    yay_yazi(t, "ÜSTAD KENAN KUZUCU", m, 372, font(CAMBB, 60), ALTIN1, 200, 340)
    yay_yazi(t, "GAZİANTEP  ·  SALON KENAN", m, 372, font(GEO, 42), ALTIN2, 20, 160, disari=False)
    d = ImageDraw.Draw(t)
    for a in range(0, 360, 15):
        r1, r2 = 418, 442
        rad = math.radians(a)
        d.line((m[0] + math.cos(rad) * r1, m[1] + math.sin(rad) * r1,
                m[0] + math.cos(rad) * r2, m[1] + math.sin(rad) * r2), fill=ALTIN2 + (170,), width=2)
    f = yuvarlak_foto(430)
    t.alpha_composite(f, (int(m[0] - 215), int(m[1] - 215)))
    d.ellipse((m[0] - 217, m[1] - 217, m[0] + 217, m[1] + 217), outline=ALTIN1 + (255,), width=5)
    for a in (0, 90, 180, 270):
        rad = math.radians(a)
        elmas(d, m[0] + math.cos(rad) * 404, m[1] + math.sin(rad) * 404, 13, ALTIN1)
    return t


def varyant_kalem_makas():
    t = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(t)
    m = (S / 2, 420)
    # iki yanda simetrik zarif süs: ince yay + elmas zinciri
    for yon in (-1, 1):
        for i in range(3):
            r = 320 + i * 22
            kutu = (m[0] - r, m[1] - r, m[0] + r, m[1] + r)
            d.arc(kutu, -34 if yon > 0 else 146, 34 if yon > 0 else 214,
                  fill=(ALTIN2 if i % 2 else ALTIN1) + (205,), width=3)
        for i, rr in enumerate((13, 9, 6)):
            elmas(d, m[0] + yon * (376 + i * 26), m[1], rr, ALTIN1 if i % 2 == 0 else ALTIN2)
    halka(t, m, 296, 22, ALTIN1, ALTIN3)
    halka(t, m, 266, 3, ALTIN1, ALTIN2)
    f = yuvarlak_foto(470)
    t.alpha_composite(f, (int(m[0] - 235), int(m[1] - 235)))
    d.ellipse((m[0] - 238, m[1] - 238, m[0] + 238, m[1] + 238), outline=ALTIN1 + (255,), width=5)
    for a in (0, 90, 180, 270):
        rad = math.radians(a)
        elmas(d, m[0] + math.cos(rad) * 296, m[1] + math.sin(rad) * 296, 14, ALTIN1)
    d.text((m[0], 792), "ÜSTAD", font=font(GEOB, 38), fill=ALTIN1, anchor="mm")
    d.text((m[0], 878), "KENAN KUZUCU", font=font(CAMBB, 100), fill=FILDISI, anchor="mm")
    cizgi(d, m[0], 952, 300)
    return t


def favicon_kaydet(yol_kaynak, cikti):
    im = Image.open(yol_kaynak).convert("RGBA")
    # ortadaki madalyonu kareye indir
    im = im.resize((256, 256), Image.LANCZOS)
    im.save(cikti)


def karsilastirma(yollar):
    yuk = 620
    satir = Image.new("RGBA", (len(yollar) * (yuk + 30), yuk + 120), (18, 20, 24, 255))
    d = ImageDraw.Draw(satir)
    f = font(GEO, 26)
    for i, (ad, yol) in enumerate(yollar):
        im = Image.open(yol).convert("RGBA")
        im.thumbnail((yuk, yuk), Image.LANCZOS)
        x = i * (yuk + 30) + (yuk + 30 - im.size[0]) // 2
        # gerçek boyut örneği (72 px)
        kucuk = im.resize((72, 72), Image.LANCZOS)
        satir.alpha_composite(im, (x, 30))
        satir.alpha_composite(kucuk, (x + im.size[0] + 6 if im.size[0] + 80 < yuk else x, yuk + 40))
        d.text((x, yuk + 78), ad, font=f, fill=(235, 225, 190))
    out = os.path.join(CIKTI, "LOGO-KARSILASTIRMA.png")
    satir.convert("RGB").save(out)
    return out


if __name__ == "__main__":
    uretilen = [
        ("logo-altin-madalyon.png", varyant_madalyon),
        ("logo-zumrut-arma.png", varyant_arma),
        ("logo-muhur.png", varyant_muhur),
        ("logo-kalem-makas.png", varyant_kalem_makas),
    ]
    yollar = []
    for ad, fn in uretilen:
        t = fn()
        yol = os.path.join(CIKTI, ad)
        t.save(yol)
        yollar.append((ad.replace("logo-", "").replace(".png", "").upper(), yol))
        print("yazildi", yol, t.size)
    print("karsilastirma:", karsilastirma(yollar))
