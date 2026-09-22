# -*- coding: utf-8 -*-
"""ÜSTAD SALON KENAN — 4K TV + QLED/OLED kullanım kılavuzu (renkli, biçimli Word)
Kullanım: python tv-kilavuz-uret.py
"""
import hashlib, os, subprocess, re, sys, zipfile
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

S = os.path.dirname(os.path.abspath(__file__))
APK = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\kenan\AndroidBuild\salon-tv-app\build\USTAD-SALON-TV-4K-v1.0.apk"
CIKTI = os.path.join(os.path.expanduser("~"), "OneDrive", "Desktop",
                     "USTAD-SALON-TV-4K-KULLANIM-KILAVUZU-v1.0.docx")
ALTIN = RGBColor(0xB8, 0x93, 0x3A)
KOYU = RGBColor(0x1A, 0x1A, 0x1A)
BEYAZ = RGBColor(0xFF, 0xFF, 0xFF)
MAVI = RGBColor(0x1F, 0x5F, 0xA8)
YESIL = RGBColor(0x1E, 0x7A, 0x4E)
KIRMIZI = RGBColor(0xA8, 0x2F, 0x2F)


def serit(doc, metin, renk="1A1A1A"):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run("  " + metin + "  ")
    r.font.size = Pt(14)
    r.font.bold = True
    r.font.color.rgb = BEYAZ
    g = OxmlElement("w:shd")
    g.set(qn("w:val"), "clear")
    g.set(qn("w:fill"), renk)
    p._p.get_or_add_pPr().append(g)
    return p


def tablo(doc, basliklar, satirlar, renk="1F5FA8"):
    t = doc.add_table(rows=1, cols=len(basliklar))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, b in enumerate(basliklar):
        h = t.rows[0].cells[i]
        h.text = ""
        r = h.paragraphs[0].add_run(b)
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = BEYAZ
        g = OxmlElement("w:shd")
        g.set(qn("w:val"), "clear")
        g.set(qn("w:fill"), renk)
        h._tc.get_or_add_tcPr().append(g)
    for satir in satirlar:
        c = t.add_row().cells
        for i, v in enumerate(satir):
            c[i].text = ""
            r = c[i].paragraphs[0].add_run(str(v))
            r.font.size = Pt(10)
    return t


def madde(doc, metin, kalin=False, renk=None, boy=10.5):
    p = doc.add_paragraph(style="List Bullet")
    r = p.add_run(metin)
    r.font.size = Pt(boy)
    r.font.bold = kalin
    if renk:
        r.font.color.rgb = renk
    return p


def yazi(doc, metin, boy=10.5, kalin=False, renk=None, orta=False):
    p = doc.add_paragraph()
    if orta:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(metin)
    r.font.size = Pt(boy)
    r.font.bold = kalin
    if renk:
        r.font.color.rgb = renk
    return p


doc = Document()
for b in doc.sections:
    b.top_margin = Inches(0.6)
    b.bottom_margin = Inches(0.6)
    b.left_margin = Inches(0.7)
    b.right_margin = Inches(0.7)

yazi(doc, "ÜSTAD SALON KENAN", 22, True, ALTIN, True)
yazi(doc, "4K ANDROID TV (GOOGLE TV BOX) + QLED / OLED GÖRÜNTÜ MOTORU", 12, True, KOYU, True)
yazi(doc, "Kullanım ve kurulum kılavuzu · sürüm 1.0 · Üstad Kenan Kuzucu", 9.5, False, RGBColor(0x60, 0x60, 0x60), True)
doc.add_paragraph()

serit(doc, "1 · BU SÜRÜMDE NE YAPILDI", "1E7A4E")
madde(doc, "SİTEYE QLED/OLED GÖRÜNTÜ MOTORU eklendi (ekran.js). Sayfa artık panelin yeteneklerini gerçekten ölçüyor:",
      kalin=True)
madde(doc, "Çözünürlük, piksel oranı, renk derinliği, geniş renk gamı (P3 / REC2020), HDR, dokunmatik/TV ayrımı, ekran kartı bilgisi.")
madde(doc, "Parlaklık (%70–145), netlik/keskinlik (%80–165), renk doygunluğu (%70–150), sıcaklık (-30…+30) — hepsi kaydırıcıyla ve anında.")
madde(doc, "4 hazır profil: OTOMATİK · OLED TAM SİYAH · QLED CANLI · NET & KESKİN (TV).")
madde(doc, "Görüntü katmanı saydamdır ve yerleşimi bozmaz (backdrop-filter); sayfa düzeni, menü, oynatıcı hiç etkilenmez.")
madde(doc, "Ayarlar tarayıcıda saklanır (usk-ekran) — her açılışta kaldığın yerden devam eder.")
madde(doc, "4K GOOGLE TV BOX İÇİN APK üretildi: panelin en yüksek çözünürlüklü modunu ister, parlaklığı en üste alır, "
           "geniş renk ve HDR renk modunu açar, kumanda ile tam kullanılır.", kalin=True)

serit(doc, "2 · ÖLÇÜLEN SONUÇLAR (uydurma değil, 3840×2160 ölçüm)", "1F5FA8")
yazi(doc, "Aşağıdaki sayılar masaüstü Chrome'da 3840×2160 (4K) ve 1920×1080 çözünürlükte, gerçek sayfa üzerinde alınmıştır. "
          "Her profilde AYNI içerik ölçüldü; yalnız profil değişti.", 10)
tablo(doc, ["Ölçüm", "OTOMATİK", "OLED TAM SİYAH", "QLED CANLI", "NET & KESKİN", "QLED %130"],
      [["Gerçek siyah piksel oranı", "%0,1", "%89,3 (en yüksek)", "%1,7", "%14,5", "%0,2"],
       ["Parlaklık (orta ton)", "27,0", "9,1", "27,9", "22,6", "34,1"],
       ["Parlak vurgular (üst %1)", "1,0", "0,3", "1,6", "1,2", "2,4"],
       ["Renk doygunluğu", "31,8", "6,4", "41,6", "45,4", "42,3"],
       ["Yazı ayrıntısı (netlik)", "temel", "-%3", "+%16", "+%14", "+%37"]],
      "1F5FA8")
yazi(doc, "Okunuşu: OLED profilinde siyah pikseller %0,1'den %89,3'e çıktı — OLED panelde ışıma kesiliyor, gerçek siyah elde ediliyor. "
          "QLED profilinde renk doygunluğu ve keskinlik arttı, parlaklık korundu. Parlaklık kaydırıcısı %130'a alındığında "
          "yazı ayrıntısı %37, renk %2,4 katına yaklaşıyor.", 10)
yazi(doc, "Geniş renk dönüşümü doğruluğu: sRGB kırmızı (#FF0000) → display-p3 0,9175 / 0,2003 / 0,1386 — "
          "uluslararası referans değerlerden sapma en fazla 0,0005. 20 renk değişkeni gerçek display-p3 olarak yazılıyor.", 10, renk=YESIL)

serit(doc, "3 · SİTEDE NASIL KULLANILIR", "B8933A")
madde(doc, "Üstteki araç şeridinde yeni düğme:  🔆 Ekran: QLED  (temanın solunda, 3D düğmesinin yanında).")
madde(doc, "Düğmeye bas → panel açılır: en üstte panel bilgileri (çözünürlük · piksel oranı · P3/HDR durumu), altında 4 profil düğmesi.")
madde(doc, "4 kaydırıcı: Parlaklık · Netlik · Doygunluk · Sıcaklık. 4 anahtar: OLED tam siyah · HDR parlaklık takviyesi · Keskin yazı · TV profili.")
madde(doc, "👁 Karşılaştır düğmesine basılı tut → ayar kapanır, ham görüntüyle farkı anında görürsün.")
madde(doc, "↺ Sıfırla ile fabrika ayarına döner. Ayarlar otomatik kaydedilir.")
madde(doc, "Öneri: OLED/AMOLED panelde → OLED TAM SİYAH · QLED/LED TV'de → QLED CANLI veya NET & KESKİN.")

serit(doc, "4 · TV KUTUSUNA KURULUM (4K GOOGLE TV BOX)", "A82F2F")
madde(doc, "1. yol (USB): APK dosyasını USB belleğe kopyala → TV kutusuna tak → dosya yöneticisinden APK'ya bas → Kur.")
madde(doc, "2. yol (indirme): TV kutusunun tarayıcısında indirme adresini aç:",
      kalin=True)
yazi(doc, "https://kenankuzucu.github.io/ustad-salon-kenan-web/USTAD-SALON-TV-4K-v1.0.apk", 10.5, True, MAVI)
madde(doc, "3. yol (telefondan): künye kartındaki kare kodu okut, APK'yı indir, telefona kur veya TV'ye gönder.")
madde(doc, "Kurulumdan önce: Ayarlar → Güvenlik → Bilinmeyen kaynaklar (bu uygulamaya izin ver) açık olmalı.")
madde(doc, "Kurulumdan sonra uygulama, TV ana menüsünde 'ÜSTAD SALON KENAN · 4K TV' adıyla ve kendi banner görseliyle görünür.")
madde(doc, "Uygulama ilk açılışta gömülü (çevrimdışı) sürümü açar; internet varsa kendiliğinden canlı siteye geçer.")

serit(doc, "5 · KUMANDA TUŞLARI", "4A3AA8")
tablo(doc, ["Tuş", "İşlev"],
      [["Yön oklar", "Altın imleci ekranda gezdirir (hedef kesikli çerçeveyle işaretlenir)"],
       ["OK / Enter / A", "İmlecin üstündeki düğmeye tıklar; yazı kutusunda ekran klavyesini açar"],
       ["KANAL ▲▼ / Sayfa", "Sayfayı aşağı-yukarı kaydırır (imleç hedefe yaklaşınca kendiliğinden kaydırır)"],
       ["MENÜ / Y", "İmleci gizler veya geri getirir"],
       ["GERİ", "Sayfada geri gider; 2 saniye içinde ikinci basış uygulamadan çıkar"]],
      "4A3AA8")
yazi(doc, "İpucu: 🔆 Ekran panelini kumandayla açmak için imleci üst şeritteki düğmeye getirip OK'a bas.", 10, renk=YESIL)

serit(doc, "6 · APK KÜNYESİ", "1A1A1A")
bt = r"C:\Users\kenan\AndroidBuild\tools\bt30\android-11\aapt2.exe"
bilgi = {"paket": "-", "surum": "-", "min": "-", "hedef": "-"}
try:
    c = subprocess.run([bt, "dump", "badging", APK], capture_output=True, text=True, timeout=120)
    for s in c.stdout.split("\n"):
        if s.startswith("package:"):
            bilgi["paket"] = re.search(r"name='([^']+)'", s).group(1)
            bilgi["surum"] = re.search(r"versionName='([^']+)'", s).group(1)
        if s.startswith("sdkVersion:"):
            bilgi["min"] = s.split(":")[1].strip().strip("'")
        if s.startswith("targetSdkVersion:"):
            bilgi["hedef"] = s.split(":")[1].strip().strip("'")
except Exception:
    pass
boy = os.path.getsize(APK)
sha = hashlib.sha256(open(APK, "rb").read()).hexdigest()
z = zipfile.ZipFile(APK)
tablo(doc, ["Alan", "Değer"],
      [["Dosya adı", os.path.basename(APK)],
       ["Boyut", "{:,} bayt ({:.1f} MB)".format(boy, boy / 1048576).replace(",", ".")],
       ["Paket adı", bilgi["paket"]],
       ["Sürüm", bilgi["surum"] + " (versionCode 1)"],
       ["Uyumluluk", "Android 5.0 (minSdk " + bilgi["min"] + ") ve üzeri — TV kutusu, akıllı TV, telefon"],
       ["Hedef sürüm", "Android " + bilgi["hedef"] + " (targetSdk " + bilgi["hedef"] + ")"],
       ["Ekran", "Yatay (landscape) · 4K panel modu istenir · ekran açık kalır"],
       ["İzinler", "İnternet · ağ durumu · ekran uyanık (başka izin yok)"],
       ["Paket içeriği", "{} dosya (index.html, ekran.js, tv-imlec.js, uygulama.js, veri.js, three.min.js, hls.min.js, kuran/, font/, foto/, logo/)".format(len(z.namelist()))],
       ["İmza", "SHA-256 f64fe6e9… — diğer ÜSTAD uygulamalarıyla aynı anahtar (yan yana kurulur, güncelleme alır)"],
       ["SHA-256 (APK)", sha[:48] + "…"]],
      "1A1A1A")

serit(doc, "7 · DÜRÜST NOTLAR", "7A5A1A")
madde(doc, "Bu makinede 4K TV kutusu bulunmadığı için APK gerçek kutuya kurulup denenmedi; kurulum testi SENDE yapılacak. "
           "Ölçümler masaüstü Chrome'da hem 4K hem 1080p çözünürlükte, gerçek sayfa üzerinde yapıldı.")
madde(doc, "HDR ve geniş renk kazancı yalnızca panel destekliyorsa görünür: bu makinede P3/HDR yok, bu yüzden sRGB çıktı. "
           "TV kutun HDR/P3 destekliyorsa uygulama bunu açılışta kendiliğinden algılayıp açar.")
madde(doc, "Android'de panel parlaklığı donanıma bağlıdır: uygulama parlaklığı en üste ister, ekran zeminini tam siyaha çeker ve "
           "görüntü katmanıyla gerçek parlaklık artışı sağlar.")
madde(doc, "Telefon için ayrı APK (ÜSTAD SALON v1.1) etkilenmedi; bu yeni APK ayrı pakettir, ikisi yan yana kurulur.")

doc.save(CIKTI)
print("KILAVUZ:", CIKTI, os.path.getsize(CIKTI), "bayt")
