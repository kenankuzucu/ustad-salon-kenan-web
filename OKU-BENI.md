# ÜSTAD SALON KENAN — WEB SİTESİ · OKU BENİ

Klasör: `C:\Users\kenan\OneDrive\Desktop\USTAD-SALON-KENAN-WEB`
Açmak için: **index.html** dosyasına çift tıkla. (İnternet gerekir: radyo yayını, Google yazı tipleri ve logo yazı tipleri internetten gelir. 3D sahne ve bütün fotoğraflar senin bilgisayarında, internetsiz de çalışır.)

## İçindeki dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Sitenin kendisi (tasarım + düzen) |
| `veri.js` | **Bütün yazıların durduğu yer.** Şiir, makale, kitap, telefon, sosyal medya — hepsi burada |
| `uygulama.js` | Menü, 3D sahne, canlı radyo, tema/font motoru (dokunmana gerek yok) |
| `three.min.js` | Gerçek 3D motoru (Three.js) — yerel, internet gerekmez |
| `kuran/` | Kur'an-ı Kerim: sûre listesi, 6236 âyet (Arapça + meal), tefsir |
| `foto/` | Madalyon, portre, Atatürk, 12 saç modeli fotoğrafı |
| `logo/` | 4 zarif logo (PNG, şeffaf zemin) + favicon + sosyal medya ikonları |
| `kod/` | Logo üreteci (`logo-uret.py`), içerik ekleme aracı (`icerik-ekle.py`), Word belgesi üreteçleri ve test araçları |

Masaüstünde senin için üretilen belgeler:
 - `USTAD-KENAN-KUZUCU-BIYOGRAFI.docx` — resmî biyografin (renkli başlıklar, tablolar) + Ek: hizmet/fiyat listesi
 - `USTAD-SALON-KENAN-WEB-KILAVUZU.docx` — site kılavuzu

## Sol menüdeki 18 bölüm (sırası böyle)

Site sahibi (sen) girişliyken 18 bölüm görünür. Ziyaretçi 16 bölüm görür:
👑 ÜSTAD YÖNETİM her zaman yalnız sana özel, 🎮 OYUNLAR ise fabrika ayarında yalnız
sana ve panelden izin verdiğin üyelere görünür.

1. **📻 ÜSTAD CANLI RADYO** — 33 kanal (Sanat 6 · Arabesk 7 · Pop 20), kendi oynatıcısı.
2. **🕌 ÜSTAD İSLAMİ RADYO** — 39 kanal (İslami/Türkçe 11 · Kur'an 28), ayrı oynatıcı.
3. **📗 KUR'AN-I KERİM** — 114 sûre, 6236 âyet: Arapça metin + Türkçe meali + tefsir + 604 sayfalık mushaf görünümü (19 hat).
4. **🕋 MEKKE MEDİNE CANLI TV** — 14 kanal, hls.js oynatıcı + yan kanal listesi.
5. **🕊️ ŞİİRLER** — sen şiir gönderdikçe sıra sıra eklenir.
6. **✍️ MAKALELER** — senin kendi yazıların.
7. **✉️ MEKTUPLAR**
8. **📚 YAZDIĞIM ESERLER** — kitaplar (📕 zengin kitap kartı: kapak, durum, yıl, sayfa,
   kısa + uzun tanıtım, 📝 ÖNSÖZ, kitaba git bağlantısı) + film senaryoları.
   **Panelden tek tek kitap ekleyebilirsin** — aşağıda "Kitap ekleme" bölümüne bak.
9. **📖 OKUDUĞUM KİTAPLAR** — karta tıklayınca kitabın özeti tam sayfa açılır.
10. **👤 TANITIM ve BİYOGRAFİ** — Salon (hizmetler, fiyatlar, saatler) + BİYOGRAFİ — TAM METİN + portre.
11. **🎓 EĞİTİM ve BELGELER** — MEB 42 · üniversite 35 · akademi/kurum 359 → 436 belge.
12. **💻 TEKNOLOJİ & DİJİTAL** — 5 branş (web tasarım, APK & mobil, bilgisayar bakım-onarım, yapay zekâ, grafik-dijital tasarım) + reklam/bloglama kartları.
13. **🌐 SOSYAL İLETİŞİM** — YouTube, Instagram, TikTok, Facebook, LinkedIn, WhatsApp, E-posta.
14. **💈 SAÇ MODELLERİ** — 12 fotoğraf, tıkla büyüt.
15. **🎮 OYUNLAR** — 7 oyun, 3 boyutlu: ÜSTADIN DAMASI · ÜSTADIN SATRANCI · ÜSTADIN TAVLASI ·
    ÜSTADIN MİLYONERİ (Kim 500 Milyar İster) · ÜSTADIN GENEL KÜLTÜRÜ · ÜSTADIN TARİH YARIŞMASI · ÜSTADIN ZEKÂ TESTİ.
16. **🖼️ LOGO ve KÜNYE** — 4 logo varyantı, PNG olarak indirilebilir.
17. **👑 ÜSTAD YÖNETİM** — yalnız sana görünen üye panosu (LOGO ve KÜNYE'nin altında).
18. **📞 İLETİŞİM ve KONUM** — cep, iş telefonu, e-posta, adres, yol tarifi, WhatsApp mesaj formu.

## İçerik gönderme akışı (sen yazarsın, ben bölümüne atarım)

Sen sohbette yazman yeterli; ben doğru bölüme, sıra numarasıyla işlerim:

- **"şiir: <adı>"** → ŞİİRLER bölümüne
- **"makale: <adı>"** → MAKALELER bölümüne
- **"mektup: <adı>"** → MEKTUPLAR bölümüne

Birden fazla metni tek seferde gönderebilirsin; hepsi geliş sırasına göre numaralanır.

## Yazı eklemek / değiştirmek (kolay yol)

1. `veri.js` dosyasını Not Defteri ile aç.
2. Kendi şiirini `SIIRLER` listesinin en başına ekle. Örnek kalıp:

```js
  { ad: "Şiirin Adı", tur: "ŞİİR", dize: [
    "Birinci dize,",
    "İkinci dize,",
    "Üçüncü dize."] },
```

3. Kaydet, `index.html`'i yenile. Yeni şiir listede görünür.

- Makale için: `MAKALELER` listesine `{ ad, tur, ozet, paragraf: [ "...", "..." ] }` ekle. `tur` alanına `"KENDİ YAZISI"` yazarsan yazı "KENDİ YAZISI" etiketiyle ve altın renkte görünür.
- Yeni kitap için: `ESERLER` listesine `{ ad, tur, not }` ekle.
- Telefon/adres/sosyal medya: `ILETISIM` ve `SOSYAL` bölümleri.

> DİKKAT: Metinlerin içinde kesme işareti (') kullanacaksan **düz ' yerine ’ (sağa yatık kesme)** kullan ya da metni çift tırnak içine al. Aksi hâlde bütün menü sessizce kaybolur.

## Nasıl yayına alınır?

- **cPanel (ustadkenankuzucu.com.tr):** bu klasörün tamamını (index.html + 4 dosya + foto + logo) `public_html` altındaki bir alt klasöre yükle. Adres: `ustadkenankuzucu.com.tr/salon-kenan/`
- **Netlify (en hızlı):** netlify.com/drop aç, klasörü sürükle-bırak. Adres saniyeler içinde hazır.
- Yayında **https** kullan (radyo yayınlarının bir kısmı http adreslerde çalmaz).

## Dürüst notlar

- ŞİİRLER bölümündeki 6 şiir ve MAKALELER'deki 2 makale **örnektir**; haber verdiğin an kendi yazdıklarınla değiştirilir. Uydurma metni senin adına yazıya koymadım.
- 3D sahne: gerçek WebGL (Three.js). Eski bir tarayıcıda açarsan 3D kapanır, sayfa normal çalışır.
- Radyo: 20 kanalın tamamı sunucudan 200 (yayın var) cevabı aldı. Tarayıcılar ilk açılışta otomatik sesi engeller; ▶ düğmesine dokunmak yeterlidir.


## 📚 KİTAP EKLEME (YAZDIĞIM ESERLER) — panelden, adım adım

Yazdığın kitapları tek tek kendin ekleyebilirsin; sınırsız sayıda kitap ekleyebilirsin.

1. Sağ üstten **🛠 YÖNETİM PANELİ** düğmesine bas (giriş yapmadıysan önce Ctrl+Alt+Y ile PIN gir).
2. **➕ İçerik Ekle** sekmesine geç.
3. Üstteki **Hızlı seç** düğmelerinden **📚 YAZDIĞIM ESERLER (kitap ekle)** düğmesine bas.
4. Açılan formda sırayla doldur:
   - **📕 Kitabın adı** — zorunlu.
   - **Kitabın durumu** — ✅ Yayında · 🖨️ Baskıda · 📝 Hazırlanıyor · 🖋️ Yazılıyor.
   - **Türü** — Roman · İnceleme · Şiir · Senaryo · Deneme…
   - **Yazım/yayın yılı** ve **sayfa sayısı** (isteğe bağlı).
   - **Kapak görseli** — kapağın fotoğrafını sitenin `foto` klasörüne koy, adını buraya yaz
     (örn. `foto/ahlaksiz-toplumlar.jpg`). Kapak istemiyorsan boş bırak; o zaman
     üzerinde roman numarası olan şık bir kapak çizilir.
   - **KISA TANITIM** — kartın üstünde görünen 1-2 cümle.
   - **UZUN TANITIM** — arka kapak yazısı; paragrafları boş satırla ayır (kartta "📖 Detaylı tanıtım" açılır kutusuna girer).
   - **ÖNSÖZ** — isteğe bağlı.
   - **Bağlantı** — satın alma/okuma adresi (isteğe bağlı).
5. **💾 KAYIT ET ve YAYINA AL** düğmesine bas. Kitap anında sitedeki YAZDIĞIM ESERLER
   bölümünde görünür; bölüm sayacı ("… kitap") kendiliğinden artar.
6. Yanlış girdiysen alttaki **Mevcut kayıtlar** listesinde kitabı bul, **🗑️** ile sil.
   Liste kalabalıklaşırsa üstteki **🔍 Listede ara** kutusuyla arayabilirsin.

> Not: Panelden eklenen kitaplar bu bilgisayarın tarayıcı deposunda saklanır.
> **💾 Yedek & Dosya** sekmesinden yedek alırsan kaybolmaz. Sitedeki mevcut 5 kitap
> `veri.js` içinde durur; panelden eklediklerin onlara eklenir.

## 🎮 OYUNLAR BÖLÜMÜ (7 oyun · hepsi 3 boyutlu)

Sol menüde **🎮 OYUNLAR**. Oyun salonunda 7 kart var:

- **⚪ ÜSTADIN DAMASI** — gerçek ahşap tahtada Türk daması: uçan damalar, zincirli yeme,
  yapay zekâ rakibi (Kolay/Orta/Zor), geri alma.
- **♞ ÜSTADIN SATRANCI** — işlenmiş ahşap taşlarla **tam kurallı** satranç: rok, piyon terfi,
  geçerken alma, şah ve mat kontrolü, yapay zekâ rakibi.
- **🎲 ÜSTADIN TAVLASI** — gerçek çekme-tavla: zar, kırma, kapalı nokta, bardan giriş,
  toplama; yapay zekâ rakibi.
- **💰 ÜSTADIN MİLYONERİ** — Kim 500 Milyar İster usulü 15 soruluk ödül merdiveni;
  💠 50:50 ve 👥 Seyirci jokerleri, "🚪 Çekil" ile ödülü alma.
- **🌍 ÜSTADIN GENEL KÜLTÜRÜ** — 10 soruluk süreli bilgi yarışması.
- **🏛️ ÜSTADIN TARİH YARIŞMASI** — Türk ve dünya tarihi soruları.
- **🧠 ÜSTADIN ZEKÂ TESTİ** — sayı dizileri, örüntüler, mantık; sonunda eğlence amaçlı zekâ puanı.

Tahtalar gerçek 3D: **fareyle tutup döndür**, **tekerlekle yakınlaştır**, taşını seç → parlayan
kareye/noktaya dokun. Her oyunun rekoru bu cihazda saklanır ve lobide kartın üstünde görünür.

**Kimler görür?** 🎮 OYUNLAR fabrika ayarında **yalnız sana ve izin verdiğin üyelere** görünür.
Bir üyeye oyunları açmak için: panel → 👥 Üyeler → üyeye tıkla → OYUNLAR satırını işaretle →
💾 Yetkileri Kaydet. Herkese açmak istersen: panel → 🗂️ Kategoriler → OYUNLAR satırındaki
**🔐 Yalnız izinli üyeler** düğmesine bas (herkese açılır).

## YÖNETİM PANELİ (kendi yazılarını kendin ekle)

Panel yazıları büyütüldü (istenirse daha da büyütülebilir): panel genişliği 880 px, başlık 17 px,
sekmeler 15 px, alan etiketleri 14 px, yazı kutuları 15,5 px, düğmeler 15 px, kategori satırları 15 px.
Telefonda (390 px) yazılar 14 px'e iner ve panel taşmadan sığar.

Sağ üst köşede iki düğme var:
 - 👤 MİSAFİR / 👑 YETKİLİ — şu an kim olarak gezdiğini gösterir. Üzerine basınca giriş/çıkış yapılır.
 - 🔐 YETKİLİ GİRİŞİ / 🛠 YÖNETİM PANELİ (kısayol: Ctrl+Alt+Y) — paneli açar. İlk şifre: **1981**

Panelde 5 bölüm var:
 1. ➕ İÇERİK EKLE — Şiir, makale, mektup, kitap/senaryo, sosyal hesap, radyo kanalı, belge/sertifika, mesleki belge ve AI sertifikası ekleyebilirsin. Yazıyı yapıştır, "Kaydet ve Yayına Al" düğmesine bas; sayfa anında güncellenir.
 2. 💬 YORUMLAR — misafirlerin yorumları. ✅ ile yayına al, 🚫 ile kaldır, 🗑️ ile sil.
 3. 🗂️ KAYIT DEFTERİ — kim kayıt oldu, kim olmadı (durum: Kayıt oldu / Kayıt olmadı / Bekliyor). CSV (Excel) ve Word indirilebilir.
 4. 📣 YAYIN KAYDI — hangi eseri nerede, ne zaman yayınladın (platform + tarih + bağlantı + durum).
 5. 💾 YEDEK & DOSYA — anında kayıt zaten açık; istersen "veri.js Dosyasına Yazmayı Aç" ile içerikleri doğrudan siteye yazar, "Yedek al" ile JSON yedeği indirirsin.

Yetki kuralı (senin istediğin gibi):
 - YETKİLİ (sahip): kategoriye yazı ekler, yorumları onaylar, kayıt defterini görür.
 - MİSAFİR: her şeyi okur, üye olur ve yorum yazar; **kategoriye yazı ekleyemez**.

Misafir yorumu nasıl işler: ziyaretçi bölümün altındaki "ÜYE OL ve yorum yaz" ile adını bırakır, yorumunu yazar. Yorum "Onay bekliyor" olarak panele düşer; sen onaylayana kadar sitede görünmez.

Kayıt nerede tutulur:
 - Tarayıcının kendi deposunda (anında, internetsiz).
 - İstersen veri.js dosyasına da yazılır → o zaman başka bilgisayar ve telefonda da görünür.
 - JSON yedeği ile taşınabilir.

## KATEGORİ YÖNETİMİ (panele eklendi)

Panelde **🗂️ Kategoriler** sekmesi: panelin her yerinde değişiklik yapabilirsin.
 - **Yeni kategori aç:** ad + simge (emoji) + renk + üst yazı → "YENİ KATEGORİ AÇ". Kategori anında sol menüde görünür ve İçerik Ekle listesine düşer.
 - **Adını değiştir:** satırdaki ad alanını değiştir, 💾 düğmesine bas. Simgeyi ve yan yazıyı da aynı satırdan değiştirirsin.
 - **Rengini değiştir:** satırdaki renk kutusundan rengi seç, 💾 bas. O kategorinin menüsü, başlığı ve kartları anında o renge döner.
 - **Sırasını değiştir:** 🔼 / 🔽 ile yukarı-aşağı oynat.
 - **Gizle / göster:** 🙈 ile kategorinin tamamını menüden gizle (yazıları silinmez).
 - **Kategori sil:** kendi açtığın kategorilerde 🗑️ (iki kez basman gerekir, emin olmak için).
 - **↩️ Adları/sırayı eski hâline döndür:** sadece ad/sıra/gizleme değişikliklerini geri alır; kendi açtığın kategoriler ve yazıların korunur.

SİMGE (EMOJİ) SEÇİCİ:
 - Kategoriler sekmesinde hazır **simge paleti** var: 9 grup (Yazı & Edebiyat, Şiir & Duygu, Teknoloji & Siber, Eğitim & Bilim, Salon & Güzellik, İletişim & Medya, İş & Kariyer, Doğa & Yol, Yaşam & Sağlık) ve toplam **160 simge**.
 - **Yeni kategori için:** paletten simgeye dokun → simge kutusuna yazılır → adı yaz → KAYIT ET.
 - **Mevcut kategori için:** satırdaki **🎨 Simge** düğmesine bas → palet o kategoriye kilitlenir (üstte "seçim yeri: ŞİİRLER" yazar) → simgeye dokunduğun an kaydedilir ve menüde görünür.
 - İstersen simge kutusuna kendi emojini elle de yazabilirsin.

GİZLE ve GERİ GETİR:
 - **🙈 Gizle** — kategoriyi sol menüden kaldırır; yazıları silinmez, sonra geri getirebilirsin.
 - **👁️ Geri Getir** — HER satırın yanında durur. Gizlenmişse menüye geri getirir; görünüyorsa adını, simgesini ve rengini ilk hâline döndürür.
 - Gizlediklerin panel listesinden kaybolmaz: listenin altında "🙈 gizli durumda" olarak görünür ve orada da 👁️ Geri Getir düğmesi vardır.
 - Toplu düzeltme: **👁️ Bütün gizlenenleri geri getir** düğmesi hepsini tek seferde menüye döndürür.

KAYIT ET nasıl çalışır:
 - **💾 KAYIT ET (bütün değişiklikler)** — üstte ve altta duran büyük düğme. Adı/simgeyi değiştirdiğin bütün kategorileri tek basışta kaydeder.
 - **💾 Kaydet** — satırın kendi kaydet düğmesi; sadece o kategoriyi kaydeder.
 - **🎨 Renk** ve **🔼 🔽 sıra** seçtiğin an kendiliğinden kaydedilir, düğmeye basman gerekmez.
 - Yan yazı alanı "··· (otomatik)" yazan kategorilerde içerik sayısından hesaplanır (şiir, makale, mektup, eser, sosyal, radyo); diğerlerine elle yazılır.

Yeni açtığın kategoriye yazı eklemek: **➕ İçerik Ekle** → listeden kategorini seç → başlık + yazı (+ istersen bağlantı) → "Kaydet ve Yayına Al".

Not: Panelden eklediğin her şey anında kaydedilir. Başka bilgisayarda da görünmesi için **💾 Yedek & Dosya** sekmesindeki "veri.js Dosyasına Yazmayı Aç" düğmesini bir kez kullan (veri.js dosyasını seçip izin ver).

## İKİ RADYO KATEGORİSİ AYRI

Sol menüde radyo iki ayrı kategori oldu:

  📻 **ÜSTAD CANLI RADYO — 33 kanal** (kendi oynatıcısı, altın renk)
     1. 🎻 Türk Sanat Müziği & Türkü (6)  2. 🎶 Arabesk (7)  3. 🎵 Pop & Genel (20)

  🕌 **ÜSTAD İSLAMİ RADYO — 39 kanal** (kendi oynatıcısı, yeşil renk)
     1. 📖 İslami Radyolar (Türkçe) (11)  2. 🕌 Kur'an-ı Kerim · Mekke & Medine İmamları (28)

İki bölümün oynatıcısı birbirine karışmaz: birinde müzik, öbüründe Kur'an çalarken hangisine
bastıysanız o bölümün durumu yazar; ses tek kanaldan çıkar.

## RADYO KANALLARI (hepsi canlı test edildi)

Radyo bölümü artık gruplu; menüde sırayla şu başlıklar var:

 1. 🎻 Türk Sanat Müziği & Türkü (6)   → TRT Nağme, Turkuvaz Musiki, TRT Türkü, Radyo 7 Türkü, Türkülerle Türkiye, Radyo Turkuvaz
 2. 🎶 Arabesk (7)                      → Damar Türk FM, 102.1 Arabeskin Merkezi FM, Arabesk Radyo, Arabesk FM, Hayatmix Arabesk, Sızır FM, Hemdem Radyo
 3. 📖 İslami Radyolar / Türkçe (11)    → Diyanet Radyo, Diyanet Kur'an Radyo, Risalet Radyo, Akra FM, Erkam Radyo, Kur'an ve Türkçe Meal,
                                          Her An Kur'an, Gözyaşı FM, Enderun FM, İhya FM, Gül FM
 4. 🕌 Kur'an-ı Kerim · Mekke & Medine İmamları (28)
      Mekke imamları: Abdurrahman es-Sudeys · Mahir el-Muaykıli · Saud eş-Şüreym · Yasir ed-Devseri ·
                      Bender Buleyla · Abdullah el-Cuheni · Ahmed Talib bin Humeyd
      Medine imamları: Abdülmuhsin el-Kasım · Salah el-Budeyr
      Ayrıca: Mişari el-Afasi, Abdülbasit Abdüssamed, Mahmud Halil el-Husarî, Minşavi, Nasır el-Katami,
              Saad el-Gamdi, Yasir el-Kureyşi, Mekke-Medine canlı, Kur'an karması, Türkçe meal,
              Sûre-i Bakara, Tefsir, Sakinleştiren Âyetler, Sabah/Akşam zikirleri, Siyer, Sahabe hayatları,
              Sahih-i Buharî, Rukye (şifa âyetleri)
 5. 🎵 Pop & Genel (20)                 → TRT FM, Alem FM, Slow Türk, Fenomen, Metro, Joy, Süper, Power, Virgin...

Yeni kanal eklemek (panel): 🛠 YÖNETİM PANELİ → ➕ İçerik Ekle → Kategori: "📻 Radyo kanalı"
  • Kanal adı + Yayın adresi (https:// ile) yaz
  • "Hangi radyo bölümüne eklensin?" kutusunda iki kategori birlikte listelenir:
      "📻 ÜSTAD CANLI RADYO → Arabesk"  /  "🕌 ÜSTAD İSLAMİ RADYO → Kur'an-ı Kerim ..."
    hangisini seçersen kanal O kategorinin menüsüne girer.
  • ➕ KAYIT ET → kanal anında seçtiğin bölümün altına girer.

Yeni kanal eklemek (elle): veri.js içinde KANAL_GRUPLARI listesindeki ilgili grubun `liste` kısmına
  ["Kanal Adı", "https://yayin.adresi"],  satırı ekle. Menü sayacı ve oynatıcı kendiliğinden güncellenir.

Bazı kanallar HLS (.m3u8) yayınıdır; oynatıcı bunları otomatik tanır (gerektiğinde hls.min.js devreye girer).

## TEMALAR (30) ve YAZI TİPLERİ (16)

Üst çubukta **TEMA** şeridi: 30 renk noktası. Noktaya bas → tema değişir (adı sağındaki kutuda yazar).
Yeni temalar: Siyah İnci · Lacivert Klasik · Kehribar · Safir · Yeşilçam · Neon Gece · Karpuz · Şeftali Gece ·
Gök Mavisi (açık) · Gül Bahçesi (açık). Her tema bütün bölümlerin rengini, 3D sahnesini ve kartları birlikte değiştirir.

**Yazı Tipi** düğmesine bas → 16 seçenek: Klasik, Eski Kitap, Zarif, El Yazısı, Modern, Sistem,
Osmanlı (Amiri), Antik (Cinzel), Kitap Kurdu (Lora), Gazete (Merriweather), Sade (Montserrat),
İnce (Josefin), Not Defteri (Caveat), Neşeli (Pacifico), Davet (Great Vibes), Makine.
(Yazı tipleri internetten yükleniyor; internet yoksa sistem yazı tipi görünür.)

## 28 TATLI 3D SAHNE (seçilebilir)

Üst çubuktaki **🌌 düğmesine** bas → kompakt "3D SAHNE SEÇ" paneli açılır; 12 sahne arasından seç:

 1. 📚 Uçan Kitaplar · ⏳ Kum Saati · 🐝 Arılar · 🌊 Deniz Dalgası · ⛵ Kâğıt Gemiler · 🪼 Denizanaları (en yeni 6 sahne) · 🕯️ Mum Işıkları · ⛲ Fıskiye · 🐞 Uğur Böcekleri · 🎐 Rüzgâr Çanları · 💎 Elmas Yağmuru · 🐬 Yunuslar · 🌌 Yıldız Galaksisi — altın galaksi tozu, çekirdek, yörünge halkaları, uçuşan tüyler
 2. ✨ Altın Toz — parıldayan toz bulutu, yumuşak nabız
 3. 🫧 Sabun Köpüğü — yüzen inci köpükler
 4. ❤️ Kalp Yağmuru — yükselen kalpler
 5. ❄️ Kar Taneleri — süzülen kar
 6. 🌸 Çiçek Yaprakları — savrulan pembe yapraklar
 7. 🔮 Kristal Bahçe — dönen kristaller
 8. 🪐 Mini Gezegenler — halkalı küçük gezegenler yörüngede
 9. 🎈 Balon Yağmuru — rengarenk balonlar yükseliyor
10. 🎵 Nota Bahçesi — yükselen müzik notaları
11. 🦋 Kelebekler — uçuşan, kanat çırpan kelebekler
12. 🌠 Kayan Yıldızlar — akan yıldız yağmuru
 9. 🎈 Balon Yağmuru — rengarenk balonlar yükseliyor
10. 🎵 Nota Bahçesi — yükselen müzik notaları
11. 🦋 Kelebekler — uçuşan, kanat çırpan kelebekler
12. 🌠 Kayan Yıldızlar — akan yıldız yağmuru

Seçtiğin sahne tarayıcıda hatırlanır (kapatıp açsan da aynı sahne gelir). Aynı panelde
**3D: AÇIK / KAPALI** düğmesi var (kapalıyken sayfa daha hızlı açılır, internet gerekmez).
Sahneler temanın rengine göre kendini boyar: tema değiştirince 3D de o renge döner.

## OKUDUĞUM KİTAPLAR (yeni kategori)

Sol menüde **📖 OKUDUĞUM KİTAPLAR** bölümü var (mor renk). Panelden kitap ekleme:
  🛠 → ➕ İçerik Ekle → Kategori: **📖 Okuduğum kitap** → Kitap adı, Yazar, Tür, Kısa not,
  **Kitabın özeti** (uzun yazı — paragrafları boş satırla ayır), Okuduğum yıl → ➕ KAYIT ET.
Kartta tıklayınca kitabın özeti tam sayfa açılır (✕ Kapat ile kapanır).

## PANEL YAZILARI BÜYÜTÜLDÜ

Yönetim panelindeki yazılar okunur hâle getirildi: panel genişliği 880 piksel, panel başlığı 17 px,
sekmeler 15 px, alan etiketleri 14 px, yazı kutuları 15,5 px, düğmeler 15 px, kategori satırları 15 px,
simge paleti düğmeleri 14 px. Telefonda (390 piksel) yazılar 14 px'e iner ve panel taşmadan sığar.
Daha büyük ya da daha küçük istersen söyle, tek yerden ayarlanır.

## GÜNÜN ÂYETİ / HADİSİ (sağ üst köşe — her gün kendiliğinden değişir)

Sağ üst köşede ince bir şerit durur: **📖 GÜNÜN ÂYETİ** ya da **🕋 GÜNÜN HADİSİ**.
Üzerine basınca kibar bir kart açılır:

 - Âyet günlerinde **Arapça metin** (sağdan sola, Amiri yazı tipiyle) + **Türkçe meal** (Diyanet İşleri Başkanlığı) + kaynak: "Bakara Sûresi, 2/153".
 - Hadis günlerinde **Türkçe hadis metni** + kaynak künyesi: "Buhârî, Îmân 3; Müslim, Îmân 57".
 - Kartta "📋 Sözü Kopyala" ve "💬 WhatsApp'ta Paylaş" düğmeleri var.

Gece yarısını geçince sayfa açık kalsa bile söz **kendiliğinden değişir** (dakikada bir kontrol edilir).
Yönetim panelinin en üstünde de aynı şerit vardır; oradan da tıklayıp tam metni açabilirsin.

Şu an içinde **101 söz** var: 61 âyet (Arapça + Türkçe) ve 40 sahih hadis.
Sıra güne göre otomatik ilerler, 101 gün sonra başa döner.

**Yeni söz eklemek:** `veri.js` içindeki `GUNUN_SOZLERI` listesinin sonuna ekle:

    { t: "ayet",  k: "Bakara Sûresi, 2/152", ar: "Arapça metin", tr: "Türkçe meal" },
    { t: "hadis", k: "Buhârî, Îmân 3",       tr: "Hadis metni" },

Kaydettiğin an siteye girer; sıralamayı ben karıştırırım, sen sadece ekle.

## 📗 KUR'AN-I KERİM BÖLÜMÜ

Sol menüde, iki radyonun hemen altında (3. sıra). İçinde **Kur'an'ın tamamı** var:

- **114 sûre · 6236 âyet** — hepsi tam, eksiksiz.
- Her âyette **Arapça metin** (harekeli, sağdan sola, büyük ve net yazı) + altında
  **Türkçe meal** (Diyanet İşleri Başkanlığı meali).
- **Tefsir**: 67 sûrenin tefsiri (**Evrensel Kur'an Tefsiri**) âyet aralıkları hâlinde ekli.
  Her âyetin altındaki **📖 Tefsir** düğmesi o âyetin tefsirini açar; üstteki
  **📖 Sûrenin tamamı (tefsir)** düğmesi sûrenin bütün tefsirini açar.
  Tefsiri olmayan sûrelerde (Bakara gibi uzun sûreler) açıkça "bu sûrenin tefsiri kaynak eserde
  yer almıyor" yazar ve Diyanet'in Kur'an Yolu tefsirine bağlantı verir.
- **Yazı boyutu**: sağ üstte **A− / A+** düğmeleri; seçtiğin boyut tarayıcıda hatırlanır.
- **Sûre ara**: arama kutusuna "Bakara", "36" ya da "Kadir" yaz → sûre anında gelir.
- **🔖 Kaldığım sûre**: en son okuduğun sûreye tek tuşla dönersin.
- **📋 Kopyala**: âyeti (Arapça + meal) kopyalar.
- Sûreler arasında **← Önceki / Sonraki →** ile geçilir; sûre başında besmele görünür.

### Kur'an verisi nerede duruyor?
`kuran` klasöründe üç dosya var. Site açılırken **yüklenmezler**, yalnızca Kur'an bölümüne
girince yüklenirler (o yüzden site hızlı açılmaya devam ediyor):

| Dosya | İçinde ne var |
|---|---|
| `kuran/sureler.js` | 114 sûrenin adı, âyet sayısı, iniş yeri, anlamı |
| `kuran/ayetler.js` | 6236 âyetin Arapça metni + Türkçe meali (2,4 MB) |
| `kuran/tefsir.js` | 67 sûrenin tefsiri (3,2 MB) |

Kur'an metni değişmez bir metindir; bu dosyaları elle düzenlemene gerek yok.

## 🕌 MUSHAF GÖRÜNÜMÜ (klâsik Kur'an sayfası — 604 sayfa)

Kur'an bölümünde üstte duran **🕌 Mushaf görünümü (604 sayfa)** düğmesine basınca
sayfa, gerçek bir mushaf gibi açılır:

- **604 sayfalık Madanî dizilim** (Fâtiha 1. sayfa, Bakara 2. sayfadan başlar; son sayfa 604 = İhlâs–Felak–Nâs).
- Sayfa çevirme: **◀ Önceki / Sonraki ▶**, sayfa numarası yazma, **🕌 Sûreye git** (114 sûre) ve **Cüz…** (30 cüz) listeleri.
- Sayfada: altın çift çerçeve, köşe tezhipleri, sûre başlık şeridi (Arapça sûre adı + "Bakara Sûresi · Mekke · 286 âyet"),
  besmele, tek akış hâlinde **iki yana yaslı (justified)** Arapça metin, her âyetin sonunda **rozet içinde âyet numarası**
  (۝١ ۝٢ …), cüz başlangıçlarında **۞** işareti, altta "Cüz 3 · Sayfa 22 · Bakara".
- **📋 Sayfayı kopyala** düğmesi sayfadaki âyetlerin Türkçe meallerini kaynak künyesiyle kopyalar.

### Arapça metin ve işaretler
Metin **harekeli-osmanî hat**tır: hareke (fetha, kesre, damme), sükûn, şedde, med (ٓ), üstün-elif (ٰ),
elif-vasla (ٱ), vakıf/sekâvîl işaretleri (ۖ ۗ ۘ ۙ ۚ ۛ), küçük mîm (ۢ), âyet sonu rozeti (۝) ve hizb işareti (۞)
eksiksiz görüntülenir. Bunu ölçerek doğruladım: sayfadaki metinde geçen 70 ayrı yazı işaretinin tamamı
kullanılan hatlarda mevcut (font kapsama testi: eksik işaret yok).

### Hat (yazı tipi) seçimi — 19 hat, 5 grup

**📖 Nesih / mushaf hatları (9)**

| Hat | Font | Kaynak / lisans |
|---|---|---|
| **Şehrazade** (varsayılan) | Scheherazade New | SIL OFL 1.1 |
| **Şehrazade Kalın** | Scheherazade New (kalın) | SIL OFL 1.1 |
| **Amiri Kur'an** | Amiri Quran | SIL OFL 1.1 |
| **Amiri Klasik** | Amiri | SIL OFL 1.1 |
| **Nesih (Noto)** | Noto Naskh Arabic | SIL OFL 1.1 |
| **Nesih İnce** | Noto Naskh Arabic UI | SIL OFL 1.1 |
| **Latif (Lateef)** | Lateef | SIL OFL 1.1 |
| **Medine Hattı** | KFGQPC Uthmanic Hafs | KFGQPC — Kral Fahd Mushaf Basım Kompleksi'nin ücretsiz dağıttığı mushaf hattı |
| **Eski Medine Mushafı** | DigitalKhatt oldmadinafont (1995 mushafı) | SIL OFL 1.1 |
| **me_quran** | me_quran | ücretsiz dağıtılan web mushaf hattı |
| **Amiri Kalın** | Amiri Bold | SIL OFL 1.1 |

**🌍 Kıraat üslupları (2):** **Dûrî hattı** ve **Sûsî hattı** — KFGQPC'nin kıraat hatları (ücretsiz dağıtım); nesih dışında farklı bir kalem üslubu.

**🎨 Özel / renkli:** **Amiri Renkli (tecvid)** — Amiri Quran Colored (OFL 1.1); harekeler ve işaretler renkli gösterilir.

**✨ Sade / modern:** **Sade (Noto Sans)** — Noto Sans Arabic · **Mada (sade)** — Mada · **IBM Plex (sade)** — IBM Plex Sans Arabic (üçü de OFL 1.1)

**🕌 Süslü / dekoratif:** **Kûfî (Noto Kûfî)** — Noto Kufi Arabic · **Harmattan** — Harmattan (ikisi de OFL 1.1)

Hepsi sitede **yerel** durur (`font/` klasörü), internetsiz de çalışır; bir hat yalnızca seçildiğinde yüklenir.
Her hat tek tek ölçüldü: **19/19 hat** hareke, sükûn, şedde, med, elif-vasla, vakıf işaretleri (ۖ ۗ ۘ ۙ ۚ ۛ),
küçük mîm (ۢ), âyet sonu rozeti (۝) ve hizb işaretini (۞) gösteriyor. (Eski Medine Mushafı hattında 6236 âyetin
tamamında yalnızca **2 adet** çok nadir işaret — ۪ ve ۫ — yoktur; o iki işaret yedek hattan görünür, okunuşu değişmez.
Ölçüp denenip **elediğim** hatlar da oldu: KFGQPC'nin "akıllı cihaz" sürümü, Reem Kûfî, Aref Ruqaa, Markazi,
Gulzar, Nastaliq, Kûfam, Cairo ve benzerleri işaretlerin bir kısmını taşımadığı için **listeye alınmadı**.)

Hepsi Osmanlı/İslam mushaf geleneğinin üsluplarını taşıyan özgür yazı tipleridir; hiçbiri
**Hayrât Neşriyat'ın mushaf fontunun ya da sayfa düzeninin kopyası değildir**.

### Âyet sonu rozeti (4 stil)
ﮎ **Klasik rozet** (۝١ — mushaf işareti) · ◯ **Altın madalyon** (daire içinde rakam) · ◇ **Baklava** (köşeli madalyon) · ( ) **Sade** (parantez içinde rakam).

### Kâğıt (zemin) seçimi — 8 seçenek
🕯️ Klasik krem · 📜 Fildişi · 🟠 Kehribar · 🟢 Zümrüt · 🟤 Bakır · 🔵 Safir · 🌸 Gül · 🌙 Gece.
Hepsinin yazı/zemin karşıtlığı ölçüldü ve WCAG sınırının üstünde (en düşük 4,86:1; sınır 4,5).

### Yazı boyutu ve hatırlama
Mushaf ekranında da **A− / A+** düğmeleri var (aynı boyut ayarı âyet âyet okumada da geçerli).
Son baktığın sayfa, seçtiğin hat, kâğıt ve yazı boyutu tarayıcıda hatırlanır — açtığında kaldığın yerden devam edersin.

### Not: tevafuklu diziliş
Hayrât Neşriyat'ın Ahmed Hüsrev Efendi hattıyla hazırlanan **tevafuklu** mushaflarında sayfaların alt alta
denk gelmesi (tevafuk) özel bir dizgi işidir; o düzen ve o mushafın fontu telifli olduğu için kopyalanmaz.
Burada o estetiğin **genel görünümü** (çerçeve, sûre şeridi, rozetli âyet sonları, yaslı nesih hat) esas alındı,
sayfa bölümlemesi ise standart Madanî mushaf dizilimine (604 sayfa) göre yapıldı.


---

## 🕋 MEKKE MEDİNE CANLI TV (yeni bölüm)

Sol menüde **KUR'AN-I KERİM'in hemen altında** durur (4. sıra, altın rengi).

- **14 kanal, 3 bölüm:**
  - 🕋 **MEKKE ve MEDİNE CANLI (4):** Mekke — Mescid-i Haram (Kâbe) · Medine — Mescid-i Nebevî · Makkah TV · Al Madina TV
  - 📖 **KUR'AN TV KANALLARI (5):** Katar Kur'an TV · Iqraa Kur'an (Mısır) · Kuveyt Kur'an TV · Bahreyn Kur'an TV · Şarja Kur'an TV
  - 🇹🇷 **TÜRKÇE İSLAMİ TV (5):** Diyanet TV · TRT Diyanet Çocuk · Meltem TV · Semerkand TV · Vav TV
- **Her kanalın adresi tek tek test edildi** (yayın açılıyor mu diye tarayıcıda denendi; 720p yayın açıldı).
- **Yerleşim:** oynatıcı solda (küçük, en çok 620×330), **kanal isimleri sağdaki listede** (gruplu, numaralı).
  Telefonda tek sütuna iner (liste oynatıcının altına geçer).
- Yayın başlatma: sağdaki listeden bir isme dokunun ya da ▶ İzle. **Ekrana dokununca tam ekran** olur.
  ■ Durdur ve ses kaydırıcısı vardır.
- Yayınlar kanal sahiplerinin sunucularından gelir; **internet gerekir**. Yayın açılmazsa kanalın kendi yayını durmuş olabilir — başka kanal deneyin.
- Yönetim panelinden ➕ İçerik Ekle → **📻 Radyo / 📺 TV kanalı** seçip "Hangi radyo / TV bölümüne eklensin?" listesinden **📺 MEKKE MEDİNE CANLI TV** bölümünü seçerek kendi kanalını ekleyebilirsin.


---

## 💻 TEKNOLOJİ & DİJİTAL (5 branş — tanıtım bölümü)

Sol menüde **EĞİTİM ve BELGELER'in hemen altında** (12. sıra, camgöbeği/mavi renk) durur.

| Branş | Kapsam |
|---|---|
| 🌐 **WEB TASARIM** | Kurumsal/kişisel site, mobil uyumlu, cPanel yayını, Google görünürlüğü, bakım |
| 📱 **APK & MOBİL UYGULAMA** | İmzalı Android APK, internetsiz çalışan uygulamalar, şifreli not/kasa/hatırlatıcı, temalar |
| 🛠️ **BİLGİSAYAR BAKIM & ONARIM** | Donanım temizliği/termal macun, Windows kurulum-sıfırlama, virüs temizliği, veri kurtarma |
| 🤖 **YAPAY ZEKÂ** | İşe özel asistan kurulumu, yerel model (ollama/llama.cpp), içerik üretimi, otomasyon |
| 🎨 **GRAFİK & DİJİTAL TASARIM** | Logo/kartvizit/mühür, afiş-broşür, sosyal medya görselleri, kitap kapağı, Word/PDF doküman |

- Her branşın **kendi logosu** vardır (sayfa içinde çizilen keskin SVG amblem — dosya gerekmez) ve kartın üstünde kendi renk şeridi bulunur.
- Her kartta **💬 Bilgi / Teklif Al** (WhatsApp'a hazır mesajla gider) ve **🔗 Bu hizmeti paylaş** düğmesi vardır.
- Bölümün başında **senin profil fotoğrafın** yuvarlak madalyon olarak (üst bardakiyle birebir aynı ayar: 104 px, yuvarlak, yüz ortada) ve adın **ÜSTAD KENAN KUZUCU** yazar; altında telefon numarası görünür.
- Metinleri `veri.js` içindeki **TEKNOLOJI** dizisinden değiştirebilirsin (ad, kısa tanıtım, madde madde hizmet listesi, renk).
  Yeni branş eklemek için diziye yeni bir kayıt ekle; amblem `uygulama.js` içindeki `TEK_LOGO`'dan gelir.

---

## 🤝 ÜYELİK SİSTEMİ (kayıt · giriş · yönetici onayı)

Kayıt olmak isteyen kişi şu bilgileri verir: **kullanıcı adı**, **e-posta (Gmail)**, **şifre** (+ şifre tekrar),
istersen **ad soyad** (sitede görünmez). <b>Telefon numarası istenmez.</b> Kayıt **yönetici onayına** düşer; sen onaylamadan kimse giriş yapamaz.

- **Nasıl açılır:** sağ üstteki **🤝 KAYIT OL** veya **🔑 GİRİŞ** düğmesi · İLETİŞİM bölümündeki "🤝 ÜYELİK · KAYIT · GİRİŞ" kartı ·
  yorum kutusundaki "🤝 ÜYE OL" düğmesi · **Ctrl + Alt + U** kısayolu.
- **Kullanıcı adı kuralları:** 3–20 karakter; Türkçe harf, rakam, nokta, tire, alt çizgi. Aynı ad/e-posta ikinci kez alınamaz.
- **Şifre:** en az 6 karakter; ekranda **güç göstergesi** (Zayıf/Orta/Güçlü) ve 👁 göster-gizle düğmesi var.
- **Güvenlik:** şifre **düz metin saklanmaz**; her üyeye rastgele tuz verilir ve şifre **5000 turlu SHA-256** ile özete çevrilir.
  5 hatalı girişte giriş **60 saniye** kilitlenir. "Beni hatırla" işaretlenmezse oturum pencere kapanınca biter.
- **Giriş:** kullanıcı adı **veya** e-posta + şifre. Onay bekleyen / onaylanmayan / yasaklı hesap giriş yapamaz ve
  sebebini kendisine söyleyen bir mesaj görür.
- **🔑 Şifremi unuttum:** istek panele düşer; sen "🔑 geçici şifre üret" ile yeni şifre oluşturup WhatsApp/e-posta ile gönderirsin.
  Üye girdikten sonra kendi şifresini "🔑 Şifremi Değiştir" ile belirler.
- **Üye kartı:** giriş yaptıktan sonra 👤 düğmesi üyelik kartını açar — kullanıcı adı, e-posta, durum, üyelik tarihi,
  son giriş, yorum sayısı; ad soyad/telefon düzenleme ve şifre değiştirme burada.
- **Yorumlar:** yalnız **onaylı üyeler** yorum yazar; yorumlar senin onayından sonra yayımlanır. Misafir yorum yazamaz,
  kategoriye yazı **yalnızca sende**.

### 👥 ÜYELER sekmesi (yönetim paneli)
- Sayaçlar: kaç kayıtlı, kaç onaylı, kaç onay bekliyor, kaç onaylanmadı, kaç yasaklı, kaç şifre sıfırlama isteği.
- Her üye için düğmeler: **✅ onayla · ⛔ onaylama · ⏳ beklemeye al · 🚫 yasakla · 🔑 geçici şifre üret · 📧 e-posta yaz · 💬 WhatsApp · 🗑️ sil**
- Üye arama kutusu, 📋 onaylı üyelerin e-postalarını kopyala, 📄 Excel/CSV indir, 📝 Word indir.
- **Üyelik ayarları:** "yeni kayıt açık/kapalı" ve "yorumlar onaydan sonra / hemen yayımlanır".

## 🎨 GÖRÜNÜM & 3D SEKMESİ (yönetim paneli)

Panelden yönetebildiğin her şey: **3D arka plan sahnesi** (28 sahne, tek tıkla), **🎲 rastgele sahne**,
**⏱️ her açılışta rastgele sahne**, 3D aç/kapa · **site teması** (30) · **yazı tipi** (16) ·
**her kategorinin kendi rengi** (renk seçici; tek tek veya "🌈 otomatik dağıt") · **yönetim panelinin kendi rengi**
(12 hazır renk + özel renk seçici) · **⌨️ kısayol listesi**.

### ⌨️ Klavyeden kısayollar
| Kısayol | İş |
|---|---|
| Ctrl + Alt + Y | 🔐 Yönetim panelini aç / kapat |
| Ctrl + Alt + G | 🎨 Görünüm ve 3D sekmesi |
| Ctrl + Alt + U | 👤 Üyelik penceresi (kayıt · giriş) |
| Ctrl + Alt + K | 🗂️ Kategoriler listesi |
| Ctrl + Alt + S | 🎛️ 3D sahne panelini aç / kapat |
| Ctrl + Alt + R | 🎲 Rastgele 3D sahne |
| Ctrl + Alt + T | 🎨 Sıradaki tema |
| Ctrl + Alt + F | 🔤 Sıradaki yazı tipi |
| Ctrl + Alt + B | 📻 Radyo bölümüne git |
| Ctrl + Alt + A | 🔍 Arama kutusuna git |
| Esc | Açık pencereyi kapat |

---

## 👑 ÜSTAD YÖNETİM BÖLÜMÜ (yalnız site sahibine görünür)

Sol menüde **LOGO ve KÜNYE'nin hemen ALTINDA** duran **👑 ÜSTAD YÖNETİM** bölümü vardır. Bu kategori:
- **Yalnızca sen girişliyken görünür.** Üyeler ve ziyaretçiler menüde görmez; adresle açmak isteseler
  "🔒 Bu bölüm yalnızca site sahibine görünür" uyarısı çıkar (`bolumYalnizSahip` + `bolumGorunur`).
- İçinde **özet sayaçlar** (toplam/onaylı/onay bekleyen/yasaklı üye + onay bekleyen yorum),
  **👥 YÜZLER** (her üye, baş harfinden oluşan renkli madalyon) ve **📋 ÜYE TABLOSU**
  (# · yüz · kullanıcı adı · e-posta · durum · kayıt · son giriş · gördüğü bölüm · işlemler) bulunur.
- **Kişiye tıkla → "🔐 NEYİ GÖREBİLİR, NEYİ GÖREMEZ" tablosu** açılır: her bölümün karşısında
  ✅ görebilir / 🚫 göremez yazar; kutuyu işaretleyince yazı ve sayaç anında değişir; 💾 Yetkileri Kaydet ile üyeye işler.
- Hazır seçenekler: 🎵 Yalnız radyo & TV · 🕌 Yalnız İslami · 🖋 Yalnız yayınlarım · 👤 Yalnız tanıtım & iletişim ·
  ✅ Tümünü işaretle · ⛔ Hiçbirini işaretleme · ↩️ Varsayılan.
- Üye kaydı alanları: `gor` (izin verilen bölüm id'leri; yok = tümü açık), `yetkiTarih`.
  Uygulama: `window.bolumGorunur(id)` → menü (`menuCiz`), bölüm açma (`git`) ve oturum/yeri değişiminde
  `window.uyeGorunumTazele()` bu kuralı uygular; kısıtlanan bölüm menüde çıkmaz, adresle de açılmaz.
- Panelden de aynı iş: **👥 Üyeler → satırdaki 🔐** (`uyeYetkiAc`).
- Herhangi bir kategoriyi de yalnız kendine açmak için: **🗂️ Kategoriler → satırdaki 👁️ Herkese açık / 🔒 Yalnız ben**
  (`window.kSahip`; `YON.duzenle[id].sahip`).

## 🔐 YÖNETİM PANELİNE NASIL GİRERİM? (üç yol)

1. **Klavyeden kısayol (en kolay):** **Ctrl + Alt + Y** → "🔐 Yönetim Girişi" perdesi açılır → **PIN: 1981** → **Giriş**.
   (Giriş yaptıktan sonra şeritte **🛠 YÖNETİM PANELİ** düğmesi kendiliğinden belirir; oradan da açabilirsin.)
2. **Adresten:** tarayıcı adresinin sonuna **#yonetim** yaz (`...\index.html#yonetim`) → aynı PIN perdesi açılır.
   (#panel ve #sahip de çalışır.)
3. Zaten panel açıkken sekmelerden gez: ➕ İçerik Ekle · 🗂️ Kategoriler · 🎨 Görünüm & 3D · 💬 Yorumlar · 👥 Üyeler · 🗂️ Kayıt Defteri · 📣 Yayın Kaydı · 💾 Yedek & Dosya

- **"Beni bu bilgisayarda hatırla"** işaretlersen bir daha PIN sormaz.
- **PIN'i değiştirmek için:** panel → **💾 Yedek & Dosya** sekmesi → "Panel şifresi (PIN) — şu an: 1981" satırı → yeni PIN yaz → **PIN'i Değiştir**.
- Ziyaretçiler bu perdeyi göremez; şeritte hiçbir "yetkili girişi" düğmesi yoktur.

## 🧭 ÜST ÇUBUK DÜĞMELERİ (güncel)

Araç şeridinde soldan sağa: `Tema noktaları · 🔤 Yazı Tipi · 🌌 3D sahne · 🔗 Bağlantı · 🤝 ÜYE OL`

- **MİSAFİR düğmesi kaldırıldı. "🔐 YETKİLİ GİRİŞİ" düğmesi de kaldırıldı.**
- Girişsiz ziyaretçi **yalnız 🤝 ÜYE OL** düğmesini görür (kayıt penceresini açar; pencere içinde "🔑 GİRİŞ YAP" sekmesi
  da vardır, oradan giriş yapılır — ama düğme olarak görünmez).
- Üye girişi yapıldığında 🤝 ÜYE OL kaybolur, yerine **👤 kullanıcı adı** gelir (üyelik kartını açar).
- **Site sahibi girişliyse** şeritte **🛠 YÖNETİM PANELİ** düğmesi belirir. Sahip girişi yapılmamışken bu düğme
  sayfaya hiç eklenmez — yani ziyaretçinin sayfasında "YÖNETİM PANELİ" yazısı DOM'da bile bulunmaz.
- **Sahip girişi gizli kısayoldan:** **Ctrl + Alt + Y** → sahip şifre perdesi açılır (PIN). Giriş yapıldığı an
  yönetim paneli düğmesi görünür ve panel açılır.
- **Gizlilik:** üye sayıları (kaç onaylı / kaç bekleyen) yalnızca sahip girişliyken görünür; ziyaretçiye gösterilmez.
  Ziyaretçi hiçbir üyeyi, e-postayı göremez — üye listesi **yalnızca senin panelinin 👥 ÜYELER sekmesinde**dir.
- Üye listesi **veri.js dosyasına yazılmaz** (o dosya siteyi yayınladığında herkes okuyabilir); liste tarayıcı
  deposunda tutulur ve "💾 Yedek al (JSON)" ile taşınır.
