# -*- coding: utf-8 -*-
"""ÜSTAD SALON KENAN · 4K TV APK — künye kartı üretici (kendi ikonu + kare kod ile)
Kullanım: python tv-kart-uret.py [apk] [indirme-adresi] [cikti.png]
"""
import hashlib, io, os, re, sys, subprocess, zipfile
from PIL import Image, ImageDraw, ImageFont

S = os.path.dirname(os.path.abspath(__file__))
APK = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\kenan\AndroidBuild\salon-tv-app\build\USTAD-SALON-TV-4K-v1.0.apk"
ADRES = sys.argv[2] if len(sys.argv) > 2 else "https://kenankuzucu.github.io/ustad-salon-kenan-web/USTAD-SALON-TV-4K-v1.0.apk"
CIKTI = sys.argv[3] if len(sys.argv) > 3 else os.path.join(os.path.expanduser("~"), "OneDrive", "Desktop", "USTAD-SALON-TV-4K-v1.0-APK-KARTI.png")

EN, BOY = 1600, 1060
SDK_AD = {21: "5.0 Lollipop", 22: "5.1", 23: "6.0 Marshmallow", 24: "7.0 Nougat", 25: "7.1", 26: "8.0 Oreo",
          27: "8.1", 28: "9 Pie", 29: "10", 30: "11", 31: "12", 32: "12L", 33: "13", 34: "14", 35: "15"}
ARKA, KART, ALTIN, ALTIN2 = (9, 9, 12), (20, 21, 26), (216, 180, 92), (240, 223, 168)
YAZI, YAZI2 = (243, 238, 226), (185, 178, 162)


def yazi_tip(yollar, boy):
    for y in yollar:
        try:
            return ImageFont.truetype(y, boy)
        except Exception:
            pass
    return ImageFont.load_default()


RB = ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]
RN = ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]
RM = ["C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/arial.ttf"]


def badging(apk):
    bt = r"C:\Users\kenan\AndroidBuild\tools\bt30\android-11\aapt2.exe"
    b = {}
    try:
        c = subprocess.run([bt, "dump", "badging", apk], capture_output=True, text=True, timeout=120)
        for s in c.stdout.split("\n"):
            if s.startswith("package:"):
                b["paket"] = re.search(r"name='([^']+)'", s).group(1)
                b["surum"] = re.search(r"versionName='([^']+)'", s).group(1)
                b["kod"] = re.search(r"versionCode='([^']+)'", s).group(1)
            if s.startswith("sdkVersion:"):
                b["minSdk"] = s.split(":")[1].strip().strip("'")
            if s.startswith("targetSdkVersion:"):
                b["hedefSdk"] = s.split(":")[1].strip().strip("'")
            if "application-label:" in s:
                b["etiket"] = s.split(":", 1)[1].strip().strip("'")
            if "leanback-launchable-activity" in s:
                b["leanback"] = True
    except Exception as e:
        b["hata"] = str(e)
    return b


im = Image.new("RGB", (EN, BOY), ARKA)
dr = ImageDraw.Draw(im)

# çerçeve + üst altın şerit
dr.rectangle([0, 0, EN - 1, BOY - 1], outline=(58, 49, 27), width=3)
dr.rectangle([0, 0, EN - 1, 132], fill=(14, 13, 16))
for i in range(140):
    a = int(70 - i * 0.45)
    if a <= 0:
        break
    dr.line([(i * 12, 132), (i * 12 + 12, 132)], fill=(a + 140, a + 110, 60), width=3)

fb = lambda b: yazi_tip(RB, b)
fn = lambda b: yazi_tip(RN, b)
fm = lambda b: yazi_tip(RM, b)

# sol taraf: logo madalyonu
dg = os.path.join(S, "logo", "logo-altin-madalyon.png")
lg = Image.open(dg if os.path.exists(dg) else os.path.join(S, "logo", "logo-512.png")).convert("RGBA").resize((210, 210), Image.LANCZOS)
im.paste(lg, (56, 160), lg)
im.paste(lg.resize((78, 78), Image.LANCZOS), (20, 22), lg.resize((78, 78), Image.LANCZOS))

dr.text((300, 26), "ÜSTAD SALON KENAN", font=fb(52), fill=ALTIN)
dr.text((302, 88), "4K ANDROID TV (GOOGLE TV BOX) UYGULAMASI", font=fn(26), fill=YAZI2)

# sağ üst: APK künyesi
b = badging(APK)
boyut = os.path.getsize(APK)
sha = hashlib.sha256(open(APK, "rb").read()).hexdigest()
z = zipfile.ZipFile(APK)
ic = [x for x in z.namelist()]
ai = [x for x in ic if x.startswith("assets/")]

kx, ky = 300, 168
dr.text((kx, ky), "APK KÜNYESİ", font=fb(30), fill=ALTIN2)
satir = [
    ("Dosya", os.path.basename(APK)),
    ("Boyut", "{:,} bayt ({:.1f} MB)".format(boyut, boyut / 1048576).replace(",", ".")),
    ("Paket", b.get("paket", "-")),
    ("Sürüm", "{} (kod {})".format(b.get("surum", "-"), b.get("kod", "-"))),
    ("Uyumluluk", "Android {} ve üzeri (minSdk {})".format(SDK_AD.get(int(b.get("minSdk", 21)), b.get("minSdk")), b.get("minSdk", "-"))),
    ("Hedef sürüm", "Android {} (targetSdk {})".format(SDK_AD.get(int(b.get("hedefSdk", 30)), "-"), b.get("hedefSdk", "-"))),
    ("TV uyumu", "LEANBACK var - TV ana menusunde gorunur" if b.get("leanback") else "yok"),
    ("İçerik", "{} dosya - {} varlık".format(len(ic), len(ai))),
    ("QLED/OLED motoru", "ekran.js pakette (var)"),
    ("Kumanda imleci", "tv-imlec.js pakette (var)"),
    ("SHA-256", sha[:32] + "…"),
]
fn_k = fn(24)
for i, (a, v) in enumerate(satir):
    y = ky + 44 + i * 36
    dr.text((kx, y), a, font=fb(23), fill=ALTIN)
    dr.text((kx + 250, y), v, font=fn(23), fill=YAZI if i < 9 else YAZI2)

# altın çizgi
dr.line([(300, 648), (EN - 90, 648)], fill=(58, 49, 27), width=2)

# özellik kutuları
kutular = [
    ("4K PANEL MODU", "Panelin EN YÜKSEK çözünürlüklü modu\nistenir (3840×2160 @50/60Hz)"),
    ("HDR + GENİŞ RENK", "COLOR_MODE_HDR / WIDE_COLOR_GAMUT\nile P3-REC2020 renk hacmi"),
    ("QLED PARLAKLIK", "Parlaklık %70–145 · doygunluk %70–150\ncanlı renk, keskin kenar"),
    ("OLED TAM SİYAH", "Gerçek #000000 zemin, sıfır ışıma\nkontrast 1,18 ile siyah kırpma"),
    ("NET & KESKİN", "Yazı kenarı kalınlaştırma (+%14 ayrıntı)\nTV için büyük 10 ayak arayüzü"),
    ("KUMANDA", "Oklar gezinir · OK tıklar\nKANAL ↕ kaydırır · GERİ çıkar"),
]
kgen, kyk = 400, 122
for i, (baslik, aciklama) in enumerate(kutular):
    x = 300 + (i % 3) * (kgen + 14)
    y = 668 + (i // 3) * (kyk + 12)
    dr.rounded_rectangle([x, y, x + kgen, y + kyk], radius=12, fill=KART, outline=(47, 42, 30), width=2)
    dr.line([(x + 14, y + 34), (x + kgen - 14, y + 34)], fill=(47, 42, 30), width=1)
    dr.text((x + 14, y + 9), baslik, font=fb(22), fill=ALTIN2)
    for j, s in enumerate(aciklama.split("\n")):
        dr.text((x + 14, y + 44 + j * 26), s, font=fn(19), fill=YAZI2)

# kare kod (indirme)
try:
    import qrcode
    q = qrcode.QRCode(box_size=10, border=2, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(ADRES)
    q.make(fit=True)
    kd = q.make_image(fill_color=(20, 18, 14), back_color=(243, 238, 226)).convert("RGB").resize((230, 230), Image.NEAREST)
    kx2, ky2 = 56, 648
    dr.rounded_rectangle([kx2 - 12, ky2 - 12, kx2 + 254, ky2 + 232], radius=14, fill=(243, 238, 226))
    im.paste(kd, (kx2, ky2))
    dr.text((kx2 + 4, ky2 + 202), "TELEFONDAN İNDİR", font=fb(18), fill=(24, 20, 12))
    dr.text((kx2 + 4, ky2 + 226), "Kare kodu okutun", font=fn(16), fill=(70, 60, 40))
except Exception as e:
    dr.text((56, BOY - 140), "kare kod üretilemedi: %s" % e, font=fn(16), fill=(200, 120, 120))

dr.text((300, BOY - 108), "İndirme adresi:", font=fn(19), fill=YAZI2)
dr.text((300, BOY - 82), ADRES, font=fm(19), fill=ALTIN)
dr.text((300, BOY - 48), "Kurulum: TV kutuda Ayarlar > Güvenlik > Bilinmeyen kaynaklar açık olmalı.", font=fn(18), fill=YAZI2)
dr.text((300, BOY - 22), "Üstad Kenan Kuzucu · Selimiye Mah. 64111 Nolu Sok. No:33 · Şehitkamil / Gaziantep", font=fn(17), fill=YAZI2)

im.save(CIKTI)
print("KART:", CIKTI, os.path.getsize(CIKTI), "bayt")
print("boyut:", boyut, "| sha256:", sha[:16], "| paket:", b.get("paket"), "| leanback:", b.get("leanback"))
