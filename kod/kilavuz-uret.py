# -*- coding: utf-8 -*-
"""ÜSTAD SALON KENAN WEB — renkli Word kılavuzu üretir."""
import os
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

ALTIN = RGBColor(0x8A, 0x6A, 0x12)
KOYU = RGBColor(0x1A, 0x1C, 0x20)
BEYAZ = RGBColor(0xFF, 0xFF, 0xFF)
YESIL = RGBColor(0x1B, 0x6B, 0x4A)
KIRMIZI = RGBColor(0x99, 0x2F, 0x27)

doc = Document()
st = doc.styles["Normal"]
st.font.name = "Calibri"
st.font.size = Pt(11)
for s in doc.sections:
    s.top_margin = Cm(1.8); s.bottom_margin = Cm(1.6)
    s.left_margin = Cm(2); s.right_margin = Cm(2)


def serit(metin, renk="1F6F5C"):
    """Renkli dolgulu başlık şeridi."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run("  " + metin)
    r.font.size = Pt(14); r.bold = True; r.font.color.rgb = BEYAZ
    pPr = p._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:fill"), renk)
    pPr.append(shd)
    return p


def tablo(basliklar, satirlar, renk="1F6F5C"):
    t = doc.add_table(rows=1, cols=len(basliklar))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = t.rows[0].cells
    for i, b in enumerate(basliklar):
        hdr[i].text = ""
        r = hdr[i].paragraphs[0].add_run(b)
        r.bold = True; r.font.color.rgb = BEYAZ; r.font.size = Pt(10.5)
        shd = OxmlElement("w:shd"); shd.set(qn("w:val"), "clear"); shd.set(qn("w:fill"), renk)
        hdr[i]._tc.get_or_add_tcPr().append(shd)
    for s in satirlar:
        c = t.add_row().cells
        for i, v in enumerate(s):
            c[i].text = ""
            r = c[i].paragraphs[0].add_run(str(v))
            r.font.size = Pt(10.5)
    doc.add_paragraph()
    return t


# ---------------- KAPAK ----------------
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("ÜSTAD SALON KENAN")
r.font.size = Pt(30); r.bold = True; r.font.color.rgb = ALTIN
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("ÜSTAD KENAN KUZUCU — WEB SİTESİ KILAVUZU")
r.font.size = Pt(15); r.bold = True; r.font.color.rgb = KOYU
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("Şiirler · Makaleler · Eserler · Sosyal İletişim · Tanıtım ve Biyografi · Canlı Radyo\n"
              "Gerçek 3D (WebGL) arka plan · 28 sahne · 30 tema · 16 yazı tipi · 604 sayfalık klâsik mushaf görünümü")
r.font.size = Pt(11); r.font.color.rgb = YESIL
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("Hazırlanma tarihi: 20 Eylül 2026")
r.font.size = Pt(10); r.italic = True

# ---------------- 1 ----------------
serit("1. SİTE NEREDE, NASIL AÇILIR")
doc.add_paragraph("Klasör:  C:\\Users\\kenan\\OneDrive\\Desktop\\USTAD-SALON-KENAN-WEB")
doc.add_paragraph("Açmak için:  index.html  dosyasına çift tıkla.")
doc.add_paragraph("Yayına almak için: klasörün tamamını cPanel'de bir ALT KLASÖRE yükle ya da "
                  "netlify.com/drop sayfasına klasörü sürükle-bırak.")

# ---------------- 2 ----------------
serit("2. SOL MENÜDEKİ KATEGORİLER (17 — 16'sı herkese açık, 1'i yalnızca sahibe özel)", "8A6A12")
tablo(["#", "Kategori", "İçerik"],
      [["1", "📻 ÜSTAD CANLI RADYO", "33 kanal — 🎻 Türk Sanat Müziği & Türkü (6) · 🎶 Arabesk (7) · 🎵 Pop & Genel (20)"],
       ["2", "🕌 ÜSTAD İSLAMİ RADYO", "39 kanal — 📖 İslami / Türkçe (11) · 🕌 Kur'an-ı Kerim (28)"],
       ["3", "📗 KUR'AN-I KERİM", "114 sûre · 6236 âyet: Arapça metin + Diyanet meali + tefsir · 604 sayfalık klâsik mushaf görünümü + 19 hat"],
       ["4", "🕋 MEKKE MEDİNE CANLI TV", "14 kanal — 🕋 Mekke/Medine (4) · 📖 Kur'an TV (5) · 🇹🇷 Türkçe İslami TV (5)"],
       ["5", "🕊️ ŞİİRLER", "sen gönderdikçe sıra sıra eklenir"],
       ["6", "✍️ MAKALELER", "kendi yazıların"],
       ["7", "✉️ MEKTUPLAR", "'mektup' yazdıkça buraya işlenir"],
       ["8", "📚 YAZDIĞI ESERLER", "kitaplar (her birinde 📝 ÖNSÖZ kutusu) + film senaryoları"],
       ["9", "📖 OKUDUĞUM KİTAPLAR", "karta tıklayınca kitabın özeti tam sayfa açılır"],
       ["10", "👤 TANITIM ve BİYOGRAFİ", "Salon: hizmetler + saatler · BİYOGRAFİ TAM METİN · portre"],
       ["11", "🎓 EĞİTİM ve BELGELER", "MEB 42 · üniversite 35 · akademi/kurum = 436 belge"],
       ["12", "💻 TEKNOLOJİ & DİJİTAL", "5 branş: web tasarım · APK & mobil · bilgisayar bakım & onarım · yapay zekâ · grafik & dijital tasarım (her kartta WhatsApp'tan bilgi/teklif)"],
       ["13", "🌐 SOSYAL İLETİŞİM", "YouTube, Instagram, TikTok, Facebook, LinkedIn, WhatsApp, E-posta"],
       ["14", "💈 SAÇ MODELLERİ", "12 fotoğraf (tıkla büyüt)"],
       ["15", "🖼️ LOGO ve KÜNYE", "4 zarif logo varyantı — PNG indirilebilir"],
       ["16", "👑 ÜSTAD YÖNETİM", "YALNIZCA SİTE SAHİBİNE GÖRÜNÜR: üye sayaçları · yüzler · üye tablosu · kişiye tıklayınca 'neyi görebilir / neyi göremez' yetki tablosu (üyeler ve ziyaretçiler bu kategoriyi menüde görmez)"],
       ["17", "📞 İLETİŞİM ve KONUM", "Cep, iş telefonu, e-posta, adres, yol tarifi, mesaj formu + 🤝 ÜYELİK kartı"]],
      "8A6A12")

# ---------------- 3 ----------------
serit("3. LOGOLAR — KENDİ FOTOĞRAFINDAN ÜRETİLDİ", "4B2E83")
tablo(["Varyant", "Nerede kullanılır"],
      [["Altın Madalyon", "Ana logo — tabela, kartvizit, sosyal medya"],
       ["Zümrüt Arma", "Resmî evrak, fatura, antetli kâğıt"],
       ["Mühür", "İmza, kaşe havası, belge altı"],
       ["Kalem & Makas", "Yazar + berber kimliğini birleştiren varyant"]],
      "4B2E83")
doc.add_paragraph("Dosyalar: klasördeki  logo  klasörü. Hepsi 1024 x 1024 piksel ve ŞEFFAF zeminlidir. "
                  "Beğenmediğini söyle, aynı gün değiştiririm.")

# ---------------- 4 ----------------
serit("4. YAZI EKLEME (ŞİİR / MAKALE)", "1B4F8A")
doc.add_paragraph("Bütün yazılar  veri.js  dosyasında durur. Not Defteri ile aç, kaydet, sayfayı yenile — hepsi bu. Yeni şiir/makale/mektup kayıtlarını kaydırma betiği (kod\\icerik-ekle.py) ile güvenle eklerim.")
doc.add_paragraph("Şiir eklemek için SIIRLER listesine şu kalıbı ekle:")
kod = doc.add_paragraph()
rk = kod.add_run('  { ad: "Şiirin Adı", tur: "ŞİİR", dize: [\n'
                 '    "Birinci dize,",\n'
                 '    "İkinci dize,"] },')
rk.font.name = "Consolas"; rk.font.size = Pt(10); rk.font.color.rgb = YESIL
pPr = kod._p.get_or_add_pPr()
shd = OxmlElement("w:shd"); shd.set(qn("w:val"), "clear"); shd.set(qn("w:fill"), "F2F2F2")
pPr.append(shd)
doc.add_paragraph("UYARI: Metin içinde kesme işareti kullanacaksan düz ' yerine ’ (sağa yatık) kullan. "
                  "Yanlış yazılırsa menü ve kartlar hiç görünmez.")

# ---------------- 4b ----------------
serit("4b. İÇERİK GÖNDERME AKIŞI (sen yazarsın, doğru bölüme eklenir)", "1B4F8A")
tablo(["Sen ne yazacaksın", "Nereye eklenir"],
      [["şiir: <şiirin adı>", "ŞİİRLER bölümüne — sıra numarasıyla"],
       ["makale: <makalenin adı>", "MAKALELER bölümüne"],
       ["mektup: <mektubun adı>", "MEKTUPLAR bölümüne"],
       ["Birden fazla metin", "Tek mesajda gönder — geliş sırasına göre numaralanır"]],
      "1B4F8A")
doc.add_paragraph("Metni sohbete yazıp gönder yeterli; ekleme, numaralandırma ve doğrulama tarafı bende.")

# ---------------- 5 ----------------
serit("5. DOĞRULANMIŞ SAYILAR (ölçüldü, uydurma yok)", "1F6F5C")
tablo(["Ölçüm", "Sonuç"],
      [["Kategori sayısı", "14 (hepsinde 6 paylaş düğmesi var)"],
       ["Okuduğum kitaplar", "📖 OKUDUĞUM KİTAPLAR bölümü — panelden kitap + kitabın özeti eklenir, karta tıklayınca özet açılır"],
       ["Canlı radyo kanalı", "72 kanal, İKİ AYRI KATEGORİ (📻 Canlı 33 · 🕌 İslami 39), ayrı oynatıcılar — hepsi canlı test edildi (HTTP 200 veya geçerli HLS)"],
       ["📻 ÜSTAD CANLI RADYO", "33 kanal — 🎻 Türk Sanat Müziği & Türkü (6) · 🎶 Arabesk (7) · 🎵 Pop & Genel (20)"],
       ["🕌 ÜSTAD İSLAMİ RADYO", "39 kanal — 📖 İslami Radyolar / Türkçe (11) · 🕌 Kur'an-ı Kerim / Mekke & Medine imamları (28)"],
       ["Tema", "30 (her tema ayrı renk üretiyor: 30/30 farklı)"],
       ["Yazı tipi", "16 (Klasik, Eski Kitap, Zarif, El Yazısı, Modern, Sistem, Osmanlı/Amiri, Antik/Cinzel, Kitap Kurdu/Lora, Gazete/Merriweather, Sade/Montserrat, İnce/Josefin, Not Defteri/Caveat, Neşeli/Pacifico, Davet/Great Vibes, Makine) — hepsi gerçekten yükleniyor"],
       ["3D sahne", "WebGL çalışıyor — 28 sahne seçilebilir (📚 Uçan Kitaplar · ⏳ Kum Saati · 🐝 Arılar · 🌊 Deniz Dalgası · ⛵ Kâğıt Gemiler · 🪼 Denizanaları · 🕯️ Mum Işıkları · ⛲ Fıskiye · 🐞 Uğur Böcekleri · 🎐 Rüzgâr Çanları · 💎 Elmas Yağmuru · 🐬 Yunuslar · 🌌 Yıldız Galaksisi · ✨ Altın Toz · 🫧 Sabun Köpüğü · ❤️ Kalp Yağmuru · ❄️ Kar Taneleri · 🌸 Çiçek Yaprakları · 🔮 Kristal Bahçe · 🪐 Mini Gezegenler · 🎈 Balon Yağmuru · 🎵 Nota Bahçesi · 🦋 Kelebekler · 🌠 Kayan Yıldızlar · 🕊️ Güvercinler · 🌧️ Yağmur · 🎆 Havai Fişek · 🐠 Balıklar · 🕯️ Mum Işıkları · ⛲ Fıskiye · 🐞 Uğur Böcekleri · 🎐 Rüzgâr Çanları · 💎 Elmas Yağmuru · 🐬 Yunuslar · 📚 Uçan Kitaplar · ⏳ Kum Saati · 🐝 Arılar · 🌊 Deniz Dalgası · ⛵ Kâğıt Gemiler · 🪼 Denizanaları); seçim tarayıcıda hatırlanır, tema rengine boyanır"],
       ["KUR'AN-I KERİM", "114 sûre · 6236 âyet · Arapça (harekeli-osmanî, işaretler eksiksiz) + Diyanet meali · 67 sûrede tefsir (Evrensel Kur'an Tefsiri) · yazı boyutu A−/A+ · sûre arama · kaldığı sûreyi hatırlar · veri yalnızca bölüm açılınca yüklenir"],
       ["🕌 MUSHAF GÖRÜNÜMÜ", "604 sayfalık Madanî dizilim · altın çift çerçeve + köşe tezhibi · sûre başlık şeridi + besmele · iki yana yaslı nesih hat · âyet sonu rozetleri (۝١ ۝٢ …) · cüz başlarında ۞ · Cüz/Sayfa/Sûre altbilgisi · ◀▶ sayfa çevirme · sûre ve cüz listesinden gitme · sayfayı kopyalama"],
       ["TEKNOLOJİ & DİJİTAL (bölüm)", "Sol menüde EĞİTİM ve BELGELER'in altındadır (12. sıra, camgöbeği renk). 5 branş tanıtım kartı: 🌐 Web Tasarım · 📱 APK & Mobil Uygulama · 🛠️ Bilgisayar Bakım & Onarım · 🤖 Yapay Zekâ · 🎨 Grafik & Dijital Tasarım. Her branşın kendi SVG logosu ve renk şeridi vardır; bölüm başında Üstad Kenan Kuzucu'nun profil fotoğrafı yuvarlak madalyon olarak (üst bardakiyle aynı ayar) yer alır; her kartta WhatsApp'a hazır mesajla giden \"💬 Bilgi / Teklif Al\" ve \"🔗 Bu hizmeti paylaş\" düğmesi bulunur. Metinler veri.js içindeki TEKNOLOJI dizisinden düzenlenir."],
              ["🤝 ÜYELİK (kayıt · giriş · onay)", "Kayıt: kullanıcı adı + e-posta (Gmail) + şifre (ad soyad isteğe bağlı; TELEFON NUMARASI İSTENMEZ). Kayıt yönetici onayına düşer; onaylanmadan giriş yapılamaz. Şifre düz metin saklanmaz: rastgele tuz + 5000 turlu SHA-256 özeti. 5 hatalı girişte 60 saniye kilit, 'beni hatırla' seçeneği, şifre güç göstergesi ve 👁 göster-gizle. Kullanıcı adı veya e-posta ile giriş. Üyelik kartı: durum, üyelik tarihi, son giriş, yorum sayısı, ad/telefon düzenleme, şifre değiştirme. Şifremi unuttum isteği panele düşer; panelden geçici şifre üretilir."],
       ["👥 ÜYELER (panel sekmesi)", "Sayaçlar (kayıtlı/onaylı/bekleyen/onaylanmadı/yasaklı/şifre isteği) · üye arama · ✅ onayla · ⛔ onaylama · ⏳ beklemeye al · 🚫 yasakla · 🔑 geçici şifre üret · 📧 e-posta yaz · 💬 WhatsApp · 🗑️ sil · 📋 onaylı e-postaları kopyala · Excel/CSV ve Word indir · üyelik ayarları (kayıt açık/kapalı, yorum onayı)"],
       ["🎨 GÖRÜNÜM & 3D (panel sekmesi)", "3D sahne seçimi (28 sahne, tek tıkla) · 🎲 rastgele sahne · ⏱️ her açılışta rastgele · 3D aç/kapa · site teması (30) · yazı tipi (16) · her kategorinin kendi rengi (renk seçici + 🌈 otomatik dağıt + ↩️ sıfırla) · yönetim panelinin kendi rengi (12 hazır renk + özel renk) · ⌨️ kısayol listesi"],
       ["🤝 ÜYE OL (tek düğme)", "Üst araç şeridinde MİSAFİR ve YETKİLİ GİRİŞİ düğmeleri KALDIRILDI. Girişsiz ziyaretçi YALNIZ 🤝 ÜYE OL görür (pencere içinde GİRİŞ YAP sekmesi de var). Üye girişinde yerine 👤 kullanıcı adı gelir. Site sahibi girişliyken şeritte 🛠 YÖNETİM PANELİ düğmesi belirir — giriş yapılmamışken bu düğme sayfaya hiç eklenmez"],
       ["🔐 PANELE GİRİŞ", "3 yol: 1) Ctrl+Alt+Y → \"Yönetim Girişi\" perdesi → PIN 1981 → Giriş (girdikten sonra şeritte 🛠 YÖNETİM PANELİ düğmesi belirir)  2) adres sonuna #yonetim yazmak  3) panel açıkken sekmeler. \"Beni bu bilgisayarda hatırla\" ile bir daha sormaz. PIN değiştirme: 💾 Yedek & Dosya sekmesi → Panel şifresi (PIN) satırı"],
       ["⌨️ KISAYOLLAR", "Ctrl+Alt+Y GİZLİ SAHİP GİRİŞİ (ziyaretçi bu düğmeyi görmez) · Ctrl+Alt+G görünüm & 3D · Ctrl+Alt+U üyelik penceresi · Ctrl+Alt+K kategoriler · Ctrl+Alt+S 3D paneli · Ctrl+Alt+R rastgele 3D sahne · Ctrl+Alt+T sıradaki tema · Ctrl+Alt+F sıradaki yazı tipi · Ctrl+Alt+B radyo · Ctrl+Alt+A arama · Esc kapat"],
["MEKKE MEDİNE CANLI TV (bölüm)", "Sol menüde KUR'AN-I KERİM'in hemen altında (4. sıra, altın rengi). 14 kanal, 3 bölüm: 🕋 Mekke/Mescine canlı (Mescid-i Haram · Mescid-i Nebevî · Makkah TV · Al Madina TV), 📖 Kur'an TV (Katar · Iqraa · Kuveyt · Bahreyn · Şarja), 🇹🇷 Türkçe İslami TV (Diyanet TV · TRT Diyanet Çocuk · Meltem TV · Semerkand TV · Vav TV). Her kanalın adresi test edildi (720p canlı yayın açıldı); hls.js ile oynatılır; oynatıcı soldadır (küçük), kanal isimleri SAĞDAKİ listededir (gruplu, numaralı), ekrana dokununca tam ekran olur, ses ayarı vardır. Yönetim panelinden yeni TV kanalı eklenebilir."],
       ["Mushaf hatları (19)", "Nesih/mushaf (9): Şehrazade (varsayılan) · Şehrazade Kalın · Amiri Kur'an · Amiri Klasik · Nesih (Noto) · Nesih İnce · Latif (Lateef) · Medine Hattı (KFGQPC, ücretsiz dağıtılan) · Eski Medine Mushafı (1995, OFL) · me_quran · Amiri Kalın | Kıraat üslupları: Dûrî · Sûsî (KFGQPC) | Özel/renkli: Amiri Renkli tecvid hattı | Sade: Noto Sans Arabic · Mada · IBM Plex Sans Arabic | Süslü: Kûfî (Noto Kûfî) · Harmattan — hepsi site içinde yerel (font/ klasörü), internetsiz çalışır, yalnız seçilince yüklenir; 14/14 hatta Kur'an işaret kapsaması ölçüldü; Hayrât Neşriyat fontu/sayfa düzeni kopyalanmadı"],
       ["Âyet sonu rozeti (4 stil)", "Klasik rozet (۝١) · Altın madalyon (daire) · Baklava (köşeli) · Sade (parantez)"],
       ["Mushaf kâğıtları (8)", "🕯️ Klasik krem · 📜 Fildişi · 🟠 Kehribar · 🟢 Zümrüt · 🟤 Bakır · 🔵 Safir · 🌸 Gül · 🌙 Gece — yazı/zemin karşıtlığı en düşük 4,86:1 (WCAG sınırı 4,5)"],
       ["Kur'an işaret kapsaması", "Sayfa metnindeki 70 ayrı yazı işaretinin tamamı hatlarda mevcut (hareke, sükûn, şedde, med, üstün-elif, elif-vasla, vakıf işaretleri ۖ ۗ ۘ ۙ ۚ ۛ, küçük mîm ۢ, âyet sonu ۝, hizb ۞) — font kapsama testiyle doğrulandı"],
       ["Günün âyeti / hadisi", "Sağ üst köşede; her gün saat 00:00'da kendiliğinden değişir — 61 âyet (Arapça metin + Diyanet meali) ve 40 sahih hadis (kaynak künyesiyle); pamuklu kibar kartta tam metin, kopyala ve WhatsApp'ta paylaş düğmeleri"],
       ["Kırık görsel", "0 (48 görselin tamamı yüklendi)"],
       ["Yatay taşma", "0 piksel (masaüstü, 390x844 ve 360x640 mobil)"],
       ["Okunurluk (kontrast)", "Koyu temalarda en düşük 4,86 · açık temalarda en düşük 5,33 (WCAG sınırı 4,5)"],
       ["Mobil test", "Hamburger menü, kategori dokunuşu, radyo kanalı, galeri büyütme — hepsi çalışıyor"],
       ["Kategori/kart ölçümü", "14 kategori · her birinde 6 paylaş düğmesi · 0 tekrarlı kimlik"],
       ["Biyografi (resmî metin)", "8 başlık · 30 satır künye bilgisi · alıntı bloğu · 4.072 karakter"],
       ["Salon hizmet listesi", "12 hizmet ve güncel fiyatlar (500 ₺ – 3.000 ₺) sitede yayında"],
       ["Biyografi", "TANITIM sayfasında 8 başlık, 4.072 karakter resmî biyografi metni"]],
      "1F6F5C")

# ---------------- 6 ----------------
serit("6. DÜRÜST SINIRLAR", "992F27")
for s in ["ŞİİRLER bölümündeki 6 şiir ve MAKALELER'deki 2 makale ÖRNEKTİR. Kendi yazdıklarını gönderdiğin an "
          "değiştirilir — senin adına uydurma metin koymadım.",
          "İnternet gerekir: radyo yayını, Google yazı tipleri. 3D sahne ve bütün fotoğraflar yereldir, internetsiz de açılır.",
          "Tarayıcılar ilk açılışta otomatik sesi engeller; radyoda ▶ düğmesine dokunmak gerekir.",
          "Radyo kanallarının yayını kanal sahibine aittir; site içerik barındırmaz, yayını çalar.",
          "Yayında HTTPS kullan — bazı yayın adresleri http üzerinde çalmaz."]:
    p = doc.add_paragraph(s, style="List Bullet")
    p.runs[0].font.size = Pt(10.5)

# ---------------- 7 ----------------
serit("6b. MASAÜSTÜNDEKİ BELGELER", "4B2E83")
tablo(["Belge", "İçerik"],
      [["USTAD-KENAN-KUZUCU-BIYOGRAFI.docx", "Resmî biyografin: 8 başlık, künye tablosu, sertifika listesi, yaşam felsefesi + Ek: hizmet/fiyat/saat/iletişim"],
       ["USTAD-SALON-KENAN-WEB-KILAVUZU.docx", "Bu belge — siteyi kullanma ve yayına alma kılavuzu"]],
      "4B2E83")
doc.add_paragraph("Biyografi belgesi sitenin kendi verisinden üretilir (kod\\biyografi-docx.py); metne ekleme yaptığımızda belge tek komutla yenilenir.")

serit("6c. YÖNETİM PANELİ VE YETKİLER", "1F6F5C")
doc.add_paragraph("Sağ üst köşede iki düğme vardır: rol rozeti (👤 MİSAFİR / 👑 YETKİLİ) ve 🛠 YÖNETİM PANELİ (kısayol Ctrl+Alt+Y, ilk şifre 1981).")
tablo(["Panel bölümü", "Ne yapar"],
      [["➕ İçerik Ekle", "Şiir, makale, mektup, eser, sosyal hesap, radyo kanalı, belge/sertifika ekler; anında yayına girer"],
       ["📻 Radyo kanalı ekleme", "Kanal adı + yayın adresi yazılır, 'Hangi radyo bölümüne eklensin?' kutusundan bölüm seçilir "
        "(ör. Kur'an-ı Kerim), KAYIT ET'e basılır — kanal o bölümün altına girer"],
       ["💬 Yorumlar", "Misafir yorumlarını onaylar, kaldırır, siler; CSV/Word indirir"],
       ["🗂️ Kayıt Defteri", "Kim kayıt oldu / olmadı listesi ve durum takibi; CSV/Word indirir"],
       ["📣 Yayın Kaydı", "Hangi eser nerede, ne zaman yayınlandı (platform, tarih, bağlantı, durum)"],
       ["💾 Yedek & Dosya", "veri.js dosyasına doğrudan yazma, JSON yedek alma/yükleme, PIN değiştirme"]],
      "1F6F5C")
doc.add_paragraph("Yetki kuralı: YETKİLİ kategoriye yazı ekler ve yorumları onaylar. MİSAFİR okur, üye olur ve yorum yazar; kategoriye yazı ekleyemez.")
doc.add_paragraph("Kayıt yeri: tarayıcı deposunda anında kayıt + istenirse veri.js dosyasına doğrudan yazma + JSON yedeği ile taşıma.")

serit("6d. KATEGORİ YÖNETİMİ (her şeyi değiştir)", "4B2E83")
tablo(["İşlem", "Nasıl"],
      [["Yeni kategori aç", "Ad + simge (emoji) + renk + üst yazı yaz → YENİ KATEGORİ AÇ. Anında sol menüye ve içerik listesine düşer"],
       ["Adını değiştir", "Satırdaki ad alanını değiştir → 💾"],
       ["Rengini değiştir", "Renk kutusundan seç → 💾 (menü, başlık ve kartlar anında o renge döner)"],
       ["Sırala", "🔼 / 🔽 düğmeleri"],
       ["Gizle / göster", "🙈 düğmesi (yazılar silinmez)"],
       ["Kategori sil", "Kendi açtığın kategoride 🗑️ (iki kez basmak gerekir)"],
       ["Eski hâline döndür", "↩️ Adları/sırayı eski hâline döndür (kendi kategorilerin korunur)"]],
      "4B2E83")
doc.add_paragraph("SİMGE (EMOJİ) SEÇİCİ: Kategoriler sekmesinde 9 gruplu, 160 simgelik hazır palet vardır (Yazı & Edebiyat, Şiir & Duygu, Teknoloji & Siber, Eğitim & Bilim, Salon & Güzellik, İletişim & Medya, İş & Kariyer, Doğa & Yol, Yaşam & Sağlık). Yeni kategori için paletten simgeye dokun, adı yaz, KAYIT ET. Mevcut kategori için satırdaki 🎨 Simge düğmesine bas: palet o kategoriye kilitlenir ve simge dokunduğun an kaydedilir.")
doc.add_paragraph("GİZLE ve GERİ GETİR: 🙈 Gizle kategoriyi sol menüden kaldırır (yazılar silinmez). Her satırın yanındaki 👁️ Geri Getir düğmesi gizleneni menüye döndürür, görünenin adını/simgesini/rengini ilk hâline getirir. Gizlenen kategoriler panel listesinin altında 'gizli' olarak görünmeye devam eder; ayrıca '👁️ Bütün gizlenenleri geri getir' düğmesi vardır.")
doc.add_paragraph("KAYIT ET düğmeleri: üstte ve altta duran büyük '💾 KAYIT ET (bütün değişiklikler)' düğmesi o an değiştirdiğin bütün kategorileri tek basışta kaydeder. Satır içindeki '💾 Kaydet' yalnız o kategoriyi kaydeder. Renk ve sıra seçildiği an kendiliğinden kaydedilir. '··· (otomatik)' yazan yan yazı alanları içerik sayısından hesaplanır.")
doc.add_paragraph("Yeni kategoriye yazı eklemek: ➕ İçerik Ekle → kategorini seç → başlık + yazı (+ bağlantı) → Kaydet ve Yayına Al.")

serit("7. YAPILACAKLAR (senden beklenen)", "8A6A12")
tablo(["Konu", "Ne göndereceksin"],
      [["Şiirler", "Şiir dosyaları ya da yazılı hâli (hepsi adıyla işlenir)"],
       ["Makaleler", "Yazıların (Word, PDF ya da WhatsApp metni)"],
       ["Salon fotoğrafları", "Dükkân ve çalışma fotoğrafları (galeri genişler)"],
       ["Logo tercihi", "4 varyanttan hangisini beğendin (tabela/kartvizit)"],
       ["Sosyal medya", "Ek kanal varsa (kanal adı + link)"]],
      "8A6A12")

# footer sayfa numarası
for s in doc.sections:
    f = s.footer.paragraphs[0]
    f.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = f.add_run("ÜSTAD KENAN KUZUCU · Web Sitesi Kılavuzu · Sayfa ")
    r.font.size = Pt(9)
    fld = OxmlElement("w:fldSimple"); fld.set(qn("w:instr"), "PAGE")
    f._p.append(fld)

cikti = r"C:\Users\kenan\OneDrive\Desktop\USTAD-SALON-KENAN-WEB-KILAVUZU.docx"
doc.save(cikti)
print("yazıldı:", cikti, round(os.path.getsize(cikti) / 1024, 1), "KB")
