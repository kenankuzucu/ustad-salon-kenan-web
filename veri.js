/* ==========================================================================
   ÜSTAD SALON KENAN — İÇERİK DOSYASI (veri.js)
   Sitedeki bütün yazılar burada durur. HTML bilmenize gerek yok:
   tırnak içindeki metni değiştirin, kaydedin, sayfayı yenileyin.
   ========================================================================== */

var KISI = {
  ad: "ÜSTAD KENAN KUZUCU",
  kisa: "Üstad Kenan",
  isletme: "ÜSTAD SALON KENAN",
  unvan: "Saç Tasarım Uzmanı · Bilgisayar Teknisyeni",
  altUnvan: "Araştırmacı · Yazar · Şair · Siber Güvenlik Araştırmacısı · Web Tasarımcısı · Yapay Zekâ Araştırmacısı",
  slogan: "Sanat · Bilgi · Zarafet",
  soz: "Bilgi güçtür, sanat yaşamdır ve dostluk en büyük zenginliktir.",
  sehir: "Gaziantep"
};

/* ==========================================================================
   🕋 MEKKE MEDİNE CANLI TV  —  14 kanal, 3 bölüm
   Tüm adresler canlı olarak test edildi (HTTP 200 + geçerli HLS listesi).
   Yayınlar kanal sahiplerinin sunucularından gelir; site yayın barındırmaz.
   ========================================================================== */
var TV_GRUPLARI = [
  { id: "harem", ad: "MEKKE ve MEDİNE CANLI", simge: "🕋", liste: [
    ["Mekke — Mescid-i Haram (Kâbe)", "Suudi Arabistan Kur'an TV: Kâbe ve Mescid-i Haram'dan canlı yayın; vakit namazları ve tavaf görüntüleri", "http://m.live.net.sa:1935/live/quran/gmswf.m3u8", "🕋"],
    ["Medine — Mescid-i Nebevî", "Sünnet TV: Mescid-i Nebevî'den canlı yayın; vakit namazları ve ziyaretçi görüntüleri", "http://m.live.net.sa:1935/live/sunnah/gmswf.m3u8", "🕌"],
    ["Makkah TV", "Mekke şehri ve Harem bölgesinden canlı yayın", "https://media2.streambrothers.com:1936/8122/8122/playlist.m3u8", "🎥"],
    ["Al Madina TV", "Medine şehri ve Mescid-i Nebevî çevresinden canlı yayın", "https://streaming.zaytonatube.com:8081/AlMadinatv/almadina21/index.m3u8", "🎥"]
  ] },
  { id: "kurantv", ad: "KUR'AN TV KANALLARI", simge: "📖", liste: [
    ["Katar Kur'an TV", "Kur'an-ı Kerim tilaveti 24 saat", "https://qatartv.akamaized.net/hls/live/20000612/qtvquran/master.m3u8", "📖"],
    ["Iqraa Kur'an", "Mısır: Kur'an tilaveti ve dini sohbetler", "https://playlist.fasttvcdn.com/pl/dlkqw1ftuvuuzkcb4pxdcg/Iqraafasttv2/playlist.m3u8", "📖"],
    ["Kuveyt Kur'an TV", "Kuveyt: Kur'an-ı Kerim yayını", "https://ktvlive.online/stream/hls/ch1.m3u8", "📖"],
    ["Bahreyn Kur'an TV", "Bahreyn: Kur'an tilaveti (her zaman yayında olmayabilir)", "https://5c7b683162943.streamlock.net/live/ngrp:bahrainquran_all/playlist.m3u8", "📖"],
    ["Şarja Kur'an TV", "Şarja (BAE): Kur'an tilaveti ve meali", "https://live.kwikmotion.com/smcquranlive/quranradiolive/playlist.m3u8", "📖"]
  ] },
  { id: "tr", ad: "TÜRKÇE İSLAMİ TV", simge: "🇹🇷", liste: [
    ["Diyanet TV", "Diyanet İşleri Başkanlığı: vaaz, sohbet, Kur'an ve hac yayınları", "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3bf95a47e07.smil/playlist.m3u8", "🇹🇷"],
    ["TRT Diyanet Çocuk", "Çocuklara yönelik dini içerik", "https://tv-trtdiyanetcocuk.medya.trt.com.tr/master.m3u8", "🧒"],
    ["Meltem TV", "İslami sohbet ve aile programları", "https://vhxyrsly.rocketcdn.com/meltemtv/playlist.m3u8", "🇹🇷"],
    ["Semerkand TV", "İslami sohbet ve tasavvuf programları (her zaman yayında olmayabilir)", "https://b01c02nl.mediatriple.net/videoonlylive/mtisvwurbfcyslive/broadcast_58d915bd40efc.smil/playlist.m3u8", "🇹🇷"],
    ["Vav TV", "Aile ve kültür içerikli İslami yayın", "https://playlist.fasttvcdn.com/pl/rfrk9821hdy9dayo8wfyha/kltr-sanat-tv/playlist.m3u8", "🇹🇷"]
  ] }
];



/* ==========================================================================
   💻 TEKNOLOJİ & DİJİTAL — 5 branş (tanıtım / reklam bölümü)
   Metinleri buradan değiştirebilirsin. "logo" alanı uygulama.js içinde çizilir.
   ========================================================================== */
var TEKNOLOJI = [
  { id: "web", simge: "🌐", renk: "#5aa0e0", ad: "WEB TASARIM",
    kisa: "Kurumsal ve kişisel web sitesi — tek dosya, mobil uyumlu, hızlı açılır.",
    maddeler: ["Kurumsal / kişisel / salon sitesi", "Mobil ve tablet uyumlu tasarım",
      "Alan adı yönlendirme ve cPanel yayını", "Google görünürlüğü (başlık, açıklama, paylaşım kartı)",
      "Aylık bakım ve güncelleme desteği"] },
  { id: "apk", simge: "📱", renk: "#6fb463", ad: "APK & MOBİL UYGULAMA",
    kisa: "Android uygulaması — imzalı APK, internetsiz de çalışan sürümler.",
    maddeler: ["İmzalı Android APK (telefona elle kurulum)", "İnternetsiz çalışan uygulamalar",
      "Şifreli not / kasa / hatırlatıcı / kayıt uygulamaları", "Bol tema ve yazı tipi seçeneği",
      "Simgeler, ikonlar, açılış ekranı tasarımı"] },
  { id: "bakim", simge: "🛠️", renk: "#e8a33d", ad: "BİLGİSAYAR BAKIM & ONARIM",
    kisa: "Yavaşlayan, ısınan, açılmayan bilgisayara uçtan uca bakım.",
    maddeler: ["Donanım temizliği, termal macun, fan bakımı", "Windows kurulum / sıfırlama, sürücü ve güncelleme",
      "Virüs–reklam yazılımı temizliği", "Veri kurtarma ve yedekleme düzeni", "Hızlandırma ve bakım danışmanlığı"] },
  { id: "ai", simge: "🤖", renk: "#a97ae0", ad: "YAPAY ZEKÂ",
    kisa: "Yapay zekâ araçlarını işine ve günlük hayatına uyarlama.",
    maddeler: ["İşine özel yapay zekâ asistanı kurulumu", "Yerel model kurulumu (ollama / llama.cpp)",
      "İçerik, metin ve görsel üretimi eğitimi", "Tekrar eden işleri otomatikleştirme",
      "Prompt (komut) yazma ve kullanım eğitimi"] },
  { id: "grafik", simge: "🎨", renk: "#e07a9a", ad: "GRAFİK & DİJİTAL TASARIM",
    kisa: "Kurumsal kimlik ve baskı–dijital görseller.",
    maddeler: ["Logo, kartvizit, mühür ve kurumsal kimlik", "Afiş, broşür, menü ve tabela görseli",
      "Sosyal medya görselleri ve banner", "Kitap kapağı ve PDF/Word kurumsal doküman",
      "Fotoğraf düzenleme ve afiş baskıya hazırlama"] }
];

/* ---- CANLI RADYO — GRUPLU KANAL LİSTESİ (tamamı canlı test edildi) ------
   KANAL_GRUPLARI: menüde gruplar hâlinde gösterilir. Yeni kanal eklemek için
   ilgili grubun listesine ["Kanal Adı", "https://..."] satırı ekleyin.       */
var KANAL_GRUPLARI = [

  /* ---------- 1) TÜRK SANAT MÜZİĞİ & TÜRKÜ ---------- */
  { ad: "Türk Sanat Müziği & Türkü", simge: "🎻", bolum: "radyo", liste: [
    ["TRT Nağme (Türk Sanat Müziği)", "https://rd-trtnagme.medya.trt.com.tr/master.m3u8"],
    ["Turkuvaz Musiki",               "https://trkvz-radyolar.ercdn.net/turkuvazmusiki/playlist.m3u8"],
    ["TRT Türkü",                     "https://rd-trtturku.medya.trt.com.tr/master_128.m3u8"],
    ["Radyo 7 Türkü",                 "https://moondigitaledge2.radyotvonline.net/radyo7turku/playlist.m3u8"],
    ["Türkülerle Türkiye",            "http://37.247.98.8/stream/22/;"],
    ["Radyo Turkuvaz",                "https://trkvz-radyolar.ercdn.net/radyoturkuvaz/playlist.m3u8"]
  ]},

  /* ---------- 2) ARABESK ---------- */
  { ad: "Arabesk", simge: "🎶", bolum: "radyo", liste: [
    ["Damar Türk FM",             "https://live.radyositesihazir.com:10997/stream"],
    ["102.1 Arabeskin Merkezi FM","http://canli.arabeskinmerkezi.com:9180/stream"],
    ["Arabesk Radyo (İstanbul)",  "https://yayin.radyoarabesk.com.tr:8000/stream"],
    ["Arabesk FM",                "http://yayin.arabeskfm.biz:8042/;stream"],
    ["Hayatmix Arabesk",          "https://radyo.yayin.com.tr:4078/mp3"],
    ["Sızır FM (Arabesk)",        "http://stream.radiojar.com/tamm1f7kk48uv"],
    ["Hemdem Radyo",              "http://yayin.hemdemradyo.com/"]
  ]},

  /* ---------- 3) İSLAMİ RADYOLAR (TÜRKÇE) ---------- */
  { ad: "İslami Radyolar (Türkçe)", simge: "📖", bolum: "islami", liste: [
    ["Diyanet Radyo",              "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3c1171d7d2a.smil/playlist.m3u8"],
    ["Diyanet Kur'an Radyo",       "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3c14192aa92.smil/playlist.m3u8"],
    ["Risalet Radyo",              "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3c1520b2626.smil/playlist.m3u8"],
    ["Akra FM",                    "https://d3r5bwwuab2v60.cloudfront.net/akracanli2/_definst_/livestream_aac/playlist.m3u8"],
    ["Erkam Radyo",                "https://api-tv5.yayin.com.tr:8002/mp3"],
    ["Radyo Fıtrat (İslami)",      "http://radyofitrat.radyotvonline.net/"],
    ["Her An Kur'an",              "https://radio.mihr.com/radio/8050/radio.mp3"],
    ["Gözyaşı FM",                 "http://yayin1.canliyayin.org:8700/;*.mp3"],
    ["Enderun FM",                 "http://yayin2.canliyayin.org:7052/;*.mp3"],
    ["İhya FM",                    "https://radyo.yayin.com.tr:2727/stream"],
    ["Gül FM",                     "https://yayin2.canliyayin.org:10989/;*.mp3"]
  ]},

  /* ---------- 4) KUR'AN-I KERİM — MEKKE & MEDİNE İMAMLARI ---------- */
  { ad: "Kur'an-ı Kerim · Mekke & Medine İmamları", simge: "🕌", bolum: "islami", liste: [
    ["Abdurrahman es-Sudeys (Mekke imamı)", "https://qurango.net/radio/abdulrahman_alsudaes"],
    ["Mahir el-Muaykıli (Mekke imamı)",     "https://qurango.net/radio/maher"],
    ["Saud eş-Şüreym (Mekke imamı)",        "https://qurango.net/radio/saud_alshuraim"],
    ["Yasir ed-Devseri (Mekke imamı)",      "https://qurango.net/radio/yasser_aldosari"],
    ["Bender Buleyla (Mekke imamı)",        "https://qurango.net/radio/bandar_balilah"],
    ["Abdullah el-Cuheni (Mekke imamı)",    "https://qurango.net/radio/abdullah_aljohany"],
    ["Ahmed Talib bin Humeyd (Mekke)",      "https://qurango.net/radio/a_binhameed"],
    ["Abdülmuhsin el-Kasım (Medine imamı)", "https://qurango.net/radio/abdulmohsen_alqasim"],
    ["Salah el-Budeyr (Medine imamı)",      "https://qurango.net/radio/salah_albudair"],
    ["Mişari el-Afasi",                     "https://qurango.net/radio/mishary_alafasi"],
    ["Abdülbasit Abdüssamed",               "https://qurango.net/radio/abdulbasit_abdulsamad"],
    ["Mahmud Halil el-Husarî",              "https://qurango.net/radio/mahmoud_khalil_alhussary"],
    ["Muhammed Sıddık el-Minşavi",          "https://qurango.net/radio/mohammed_siddiq_alminshawi"],
    ["Nasır el-Katami",                     "https://qurango.net/radio/nasser_alqatami"],
    ["Bader et-Turki",                     "https://qurango.net/radio/bader"],
    ["Yasir el-Kureyşi",                    "https://qurango.net/radio/yasser_alqurashi"],
    ["Mekke & Medine Canlı (Suudi Arabistan)", "https://stream.radiojar.com/0tpy1h0kxtzuv"],
    ["Kur'an Karması (seçme okuyuşlar)",    "https://qurango.net/radio/mix"],
    ["Kur'an-ı Kerim Türkçe Meal",          "https://qurango.net/radio/translation_quran_turkish"],
    ["Sûre-i Bakara (hocalardan)",          "https://qurango.net/radio/albaqarah"],
    ["Kur'an Tefsiri",                      "https://qurango.net/radio/tafseer"],
    ["Sakinleştiren Âyetler",               "https://qurango.net/radio/sakeenah"],
    ["Sabah Zikirleri & Salavat",           "https://qurango.net/radio/athkar_sabah"],
    ["Akşam Zikirleri & Salavat",           "https://qurango.net/radio/athkar_masa"],
    ["Peygamberimizin Hayatı (Siyer)",      "https://qurango.net/radio/almukhtasar_fi_alsiyra"],
    ["Sahabe Hayatları",                    "https://qurango.net/radio/sahabah"],
    ["Sahih-i Buharî",                      "https://qurango.net/radio/saheh-bokharee"],
    ["Rukye · Şifa Âyetleri",               "https://qurango.net/radio/roqiah"]
  ]},

  /* ---------- 5) POP & GENEL ---------- */
  { ad: "Pop & Genel", simge: "🎵", bolum: "radyo", liste: [
    ["TRT FM", "https://trt.radyotvonline.net/trtfm"],
    ["Habertürk Radyo", "https://haberturkradyo.radyotvonline.net/haberturkradyo"],
    ["Alem FM", "https://turkmedya.radyotvonline.net/alemfmaac"],
    ["Slow Türk", "https://radyo.duhnet.tv/ak_dtvh_slowturk"],
    ["Radyo Fenomen", "https://live.radyofenomen.com/fenomen/128/icecast.audio"],
    ["Fenomen Clubbin", "https://live.radyofenomen.com/fenomenclubbin/128/icecast.audio"],
    ["Metro FM", "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_FM_SC?/"],
    ["JoyTürk", "https://playerservices.streamtheworld.com/api/livestream-redirect/JOY_TURK_SC?/"],
    ["Joy FM", "https://playerservices.streamtheworld.com/api/livestream-redirect/JOY_FM_SC?/"],
    ["Süper FM", "https://playerservices.streamtheworld.com/api/livestream-redirect/SUPER_FM_SC?/"],
    ["Süper 2", "https://playerservices.streamtheworld.com/api/livestream-redirect/SUPER2_SC?/"],
    ["Virgin Radio", "https://playerservices.streamtheworld.com/api/livestream-redirect/VIRGIN_RADIO_SC?/"],
    ["PowerTürk", "https://listen.powerapp.com.tr/powerturk/mpeg/icecast.audio"],
    ["Power FM", "https://listen.powerapp.com.tr/powerfm/mpeg/icecast.audio"],
    ["Power POP", "https://listen.powerapp.com.tr/powerpop/mpeg/icecast.audio"],
    ["Power Gold", "https://listen.powerapp.com.tr/powergold/mpeg/icecast.audio"],
    ["Power Love", "https://listen.powerapp.com.tr/powerlove/mpeg/icecast.audio"],
    ["Power Dance", "https://listen.powerapp.com.tr/powerdance/mpeg/icecast.audio"],
    ["Süper FM (MP3)", "https://stream.super.fm:8443/superfm.mp3"],
    ["TV5 Radyo", "https://api-tv5.yayin.com.tr:8002/mp3"],
  ]}
];

/* Düz listeler — oynatıcı ve panel bunları kullanır.
   KANALLAR: 📻 RADYO bölümü  ·  ISLAMI_KANALLAR: 🕌 İSLAMİ YAYINLAR bölümü      */
var KANALLAR = [], ISLAMI_KANALLAR = [];
(function () {
  for (var g = 0; g < KANAL_GRUPLARI.length; g++) {
    var gr = KANAL_GRUPLARI[g], L = gr.liste, hedef = (gr.bolum === "islami") ? ISLAMI_KANALLAR : KANALLAR;
    for (var k = 0; k < L.length; k++) hedef.push(L[k]);
  }
})();


/* ---- ŞİİRLER ------------------------------------------------------------
   DİKKAT: metinler ÖRNEKTİR (tasarımı göstermek için). Kendi şiirlerinizi
   gönderdiğinizde birebir bunların yerine işlenir.                        */
var SIIRLER = [
  { ad: "Ustanın Aynası", tur: "ÖRNEK", dize: [
    "Aynada bir adam var, elleri sabır kokar,",
    "Her makas bir mısra, her tarak bir hece.",
    "Yıllar geçti tezgâhta, tıraş oldu bahar,",
    "Aynada kalan yüzler, giden bir bilmece."] },
  { ad: "Vicdan Sokağı", tur: "ÖRNEK", dize: [
    "Bir sokak vardı, adı vicdan,",
    "Kimse girmezdi, ışığı yok diye.",
    "Ben her akşam oradan geçerdim, sessizce,",
    "Bir yalanın gölgesi düşerdi önüme."] },
  { ad: "Anamın Elleri", tur: "ÖRNEK", dize: [
    "İki ekmek, bir dua, bir sabır tortusu,",
    "Ocakta kaynar durur anamın elleri.",
    "Dünya döner, devir değişir, unutur her şeyi,",
    "Unutmaz hiçbir şey anamın elleri."] },
  { ad: "Gaziantep Akşamı", tur: "ÖRNEK", dize: [
    "Bir akşam iner Gaziantep'e usulca,",
    "Fıstık kokusu karışır sıcak ekmek kokusuna.",
    "Dükkanımda bir şarkı çalar radyodan,",
    "Ve dünya bir tıraş boyu durur orada."] },
  { ad: "Kalem ve Makas", tur: "ÖRNEK", dize: [
    "Elimde iki alet: biri makas, biri kalem,",
    "Biri keser fazlalığı, öbürü yazar derdini.",
    "İkisi de aynı işi görür aslında:",
    "Bırakır insanın yüzünde en güzel yerini."] },
  { ad: "Gece Yarısı Notları", tur: "ÖRNEK", dize: [
    "Kod yazarken bakıyorum ekrana,",
    "Bir açık bir kapanış, binlerce ihtimal.",
    "Hayat da bir döngü; fazlalığı silersin,",
    "Kalır geriye tek bir doğru cevap."] }
];

/* ---- MEKTUPLAR ----------------------------------------------------------
   Kenan "mektup ..." diye yazdığında buraya işlenir. Sıra numarası
   otomatik verilir. İlk kayıt tasarımı göstermek için ÖRNEK'tir.        */
var MEKTUPLAR = [
  { ad: "Bir Ustadan Çırağına", tur: "ÖRNEK", tarih: "",
    paragraf: [
      "Sevgili çırağım; sana öğreteceğim ilk şey makas tutmak değil, sabırlı olmaktır. Ustalık elin hızı değil, gözün ölçüsüdür. Aynaya bakan insanı önce dinleyeceksin, sonra konuşacaksın; çünkü bir saç kesimi biraz da güven tamiridir.",
      "Bu tezgâhta utanacak iş bırakmayacaksın. Yarım bırakılan iş, eninde sonunda önüne döner ve seni rezil eder. Kendine yapılmasını istemediğini müşterine yapmayacaksın; hakkını alacaksın ama karşındakinin hakkını da gözeteceksin.",
      "Ben iki işi bir arada yürüttüm: bir elimde makas, öbür elimde kalem. Sana da söyleyeceğim şu: kendine bir ikinci alan seç. Tek zanaat, tek kapıya bağlı bir ömürdür; iki zanaat ise insanı ayakta tutar."
    ] }
];

/* ---- MAKALELER ---------------------------------------------------------- */
var MAKALELER = [
  { ad: "Vicdan Sustuğunda — Bir Toplumun Gerçek Çöküşü",
    tur: "KENDİ YAZISI",
    ozet: "Bir milleti ayakta tutan yalnızca kanunlar değildir; asıl çöküş vicdanın sustuğu gün başlar.",
    paragraf: [
      "Bir toplumun gerçek çöküşü, ne ekonomik krizlerle başlar ne de savaşların ilk kurşunuyla… Asıl çöküş; insanların doğruyu bildiği hâlde sustuğu, haksızlığı gördüğü hâlde görmezden geldiği ve vicdanını çıkarlarına teslim ettiği gün başlar. Çünkü vicdan sustuğunda adalet güçsüzleşir; adalet zayıfladığında güven yıkılır; güven yıkıldığında insanlar birbirine yabancılaşır. Merhametin yerini çıkar, doğruluğun yerini menfaat, ahlakın yerini ise sessizlik alır. İşte o zaman çürüme yalnızca bireylerde değil, bütün bir toplumun ruhunda kök salmaya başlar.",
      "Bir milleti ayakta tutan yalnızca kanunlar değildir. Kanunlar düzeni sağlayabilir; fakat bir toplumu gerçek anlamda yaşatan, insanların kalbindeki vicdan, birbirine duyduğu güven ve ahlaka olan bağlılığıdır. Vicdanını kaybeden bir toplum, önce insanlığını, sonra huzurunu, en sonunda ise geleceğini kaybetmeye mahkûmdur.",
      "Bu nedenle geleceğini korumak isteyen her toplum, önce vicdanını korumalıdır. Çünkü güçlü toplumlar büyük binalarla değil; güçlü karakterlerle, temiz vicdanlarla ve ahlaklı insanlarla inşa edilir."
    ] },
  { ad: "Ahlakın Ölçüsü Para Olduğunda",
    tur: "ÖRNEK",
    ozet: "Değerin parayla ölçüldüğü yerde insan, kendi aynasına bakmaktan korkar.",
    paragraf: [
      "Bir toplumda ölçü para olduğunda, tartı bozulur. Doğru söylemek kâr getirmiyorsa susulur; susmak da zamanla alışkanlığa, alışkanlık ise karaktere dönüşür. Oysa insanın değeri cebinde taşıdığıyla değil, kalbinde sakladığıyla ölçülür.",
      "Bugün herkes haklı çıkmak istiyor, kimse doğru olmak istemiyor. Haklı çıkmak yalnızca bir tartışmayı kazandırır; doğru olmak ise bir ömrü temiz tutar. Hangimiz akşam yatağa yattığında vicdanına hesap verebiliyor?",
      "Bir ustanın tezgâhında öğrendiğim ilk şey dürüstlüktü: işini yarım bırakmayacaksın, hakkını alacaksın ama karşındakinin hakkını da gözeteceksin. Bu, meslek ahlakıdır; ve aslında hayatın tamamının ahlakıdır."
    ] },
  { ad: "Gençliğe Mektup",
    tur: "ÖRNEK",
    ozet: "Sabır, maharetin anasıdır; acele eden el hiçbir işi ustaca bitiremez.",
    paragraf: [
      "Sevgili genç kardeşim; bilgisayarın, telefonun, sonsuz bir gürültünün içindesin. Her şey hızlı olsun istiyorsun. Bir mesleğin ustası olmak yıllar sürer; hiçbir makas ilk günden kusursuz kesmez. Sabır, maharetin anasıdır.",
      "Kendine bir alan seç ve o alanda derinleş. Bir yandan makas tutarken, bir yandan kod yazabilirsin. Ben ömrüm boyunca iki farklı dünyayı aynı tezgâhta birleştirdim: estetik ve teknoloji. İkisi de insana hizmet eder; ikisi de ayrıntıda gizlidir.",
      "Ve unutma: en büyük zenginlik, hakkında iyi konuşulmasıdır. Bir insanın bıraktığı en kıymetli miras, arkasından söylenen güzel bir sözdür."
    ] }
];

/* ---- YAZDIĞI ESERLER ---------------------------------------------------- */
/* Her eserde "onsuz" (ÖNSÖZ) alanı vardır: kitabın başındaki yazı.
   Panelden eklenir: 🛠 → ➕ İçerik Ekle → 📚 Eser → "Önsöz" kutusu.        */
var ESERLER = [
  { ad: "Ahlaksız Toplumlar", tur: "Kitap · Toplumsal İnceleme",
    not: "Toplumun çürüme sebeplerini, susulan haksızlıkları ve vicdan kavramını merkeze alan bir kitap." },
  { ad: "Leş Kalbinizi Vicdanınıza Anlatın", tur: "Kitap · Toplumsal Eleştiri",
    not: "İkiyüzlülüğü ve menfaat ilişkilerini cesur bir dille tartışan bir çalışma." },
  { ad: "Bir Annenin Kalbi", tur: "Kitap · Duygu / Anı",
    not: "Annelik, emek ve vefa üzerine; okurun boğazını düğümleyen bir kitap." },
  { ad: "Param Yok Ki Vergi Mi Vereyim", tur: "Kitap · Sosyal Adalet",
    not: "Ekonomik adaletsizliği ve dar gelirli insanın hikâyesini anlatan bir eleştiri." },
  { ad: "İyilik Maskesinde Kibir", tur: "Kitap · Psikolojik İnceleme",
    not: "İyilik görünümü altında saklanan kibrin ve gösterişin anatomisi." }
];

/* ---- OKUDUĞUM KİTAPLAR — panelden ya da buraya elle eklenir -------------
   Her kitap: { ad, yazar, tur, not, tarih, ozet }
     ozet : kitabın özeti — karta tıklanınca açılır. Paragrafları
            ["1. paragraf", "2. paragraf"] biçiminde yazabilirsiniz.         */
var KITAPLAR = [
  /* ÖRNEK (silinebilir):
  { ad: "Suç ve Ceza", yazar: "Dostoyevski", tur: "Roman", not: "Vicdan üzerine",
    tarih: "2026", ozet: ["Raskolnikov'un iç dünyası...", "İkinci paragraf..."] },
  */
];


var ESER_SAYI = [
  { ad: "Yayına Hazırlanan Kitap", sayi: 5 },
  { ad: "Film Senaryosu", sayi: 12 },
  { ad: "Şiir", sayi: 0, metin: "Yüzlerce" },
  { ad: "Makale & Deneme", sayi: 0, metin: "Devam ediyor" }
];

/* ---- EĞİTİM & BELGELER (hepsi doğrulanmış sayılar) --------------------- */
var MEB = { baslik: "T.C. Millî Eğitim Bakanlığı", sayi: 42 };
var UNIVERSITELER = { baslik: "Uluslararası Üniversite Sertifikası", sayi: 35, liste: [
  ["Harvard Üniversitesi", 2], ["Oxford Üniversitesi", 2], ["Johns Hopkins Üniversitesi", 7],
  ["Michigan Üniversitesi", 7], ["Maryland Üniversitesi", 5], ["Tazmanya Üniversitesi", 5],
  ["OP Jindal Global Üniversitesi", 5], ["The Open University", 2]] };
var AKADEMILER = { baslik: "Akademi & Kurum Sertifikası / Rozeti", sayi: 359, liste: [
  ["BTK Akademi", 94], ["LinkedIn Learning", 120], ["Microsoft (86 rozet + 25 kupa)", 86],
  ["IBM Birleşik Krallık", 3], ["Google", 4], ["Cisco Networking Academy", 2],
  ["YouTube Akademisi", 8], ["Udemy", 10], ["Semrush Academy", 4], ["Coursera", 4],
  ["Alison Academy", 2], ["HubSpot Academy", 1], ["Mindluster", 5],
  ["Geleceği Yazanlar / Turkcell Akademi", 8], ["SPL", 3], ["AI-Security-Certificate", 5]] };
var MESLEKI_BELGE = [
  "Usta Öğretici Belgesi – Kuaförlük ve Saç Tasarımı",
  "Bilgisayar Donanım Teknisyenliği Sertifikası",
  "Python Programlama Temelleri Sertifikası",
  "Siber Güvenlik ve Etik Hackerlık Eğitimi",
  "Osmanlı Türkçesi ve Arapça Dil Eğitimi Sertifikası"
];
var TOPLAM_BELGE = 436;

/* ---- BİYOGRAFİ --------------------------------------------------------- */
var KIMLIK = [
  ["Doğum", "1981 — Ankara / Çankaya"],
  ["Büyüdüğü Yer", "Adana / Ceyhan"],
  ["Aslen", "Şanlıurfa / Halfeti"],
  ["Yaşadığı Yer", "Gaziantep / Şehitkamil"],
  ["Meslek", "Erkek Kuaförü · Saç Tasarımı Uzmanı"],
  ["Uzmanlık", "Siber Güvenlik · Yazılım Geliştirme"]
];
var HIKAYE = [
  "Kenan Kuzucu — ya da bilinen adıyla Üstad Kenan — 1981 yılında Ankara / Çankaya'da doğdu. Çocukluğu ve gençliği Adana / Ceyhan'da geçti; aslen Şanlıurfa / Halfeti kökenlidir. Bugün Gaziantep / Şehitkamil'de yaşamakta ve ÜSTAD SALON KENAN'da mesleğini sürdürmektedir.",
  "Hayatında iki güçlü alanı ustalıkla birleştirmiştir: saç tasarımı ve bilgisayar teknolojileri. Bir yandan estetikle insanların özgüvenine dokunurken, diğer yandan Python, Kali Linux ve GitHub platformlarında siber güvenlik ve yazılım geliştirme alanlarında profesyonel çalışmalar yürütmektedir.",
  "Sanata, bilgiye ve kültürel mirasa derin bir bağlılıkla yaklaşan Üstad Kenan; berber koltuğunda başlayan sohbetlerin, kod yazarken kurulan bağlantıların ve iki dünyayı birleştiren disiplininin izinde bir yaşam kurmuştur. Yazdığı kitaplar, film senaryoları ve şiirlerle sözü de bir sanat gibi işler."
];
/* ---- AI GÜVENLİK SERTİFİKALARI (masaüstündeki sertifika dosyalarından) --- */
var AI_GUVENLIK = { baslik: "AI Güvenlik Sertifikaları", sayi: 5, liste: [
  "Introduction to AI Security — sertifika + rozet",
  "MCP Security Fundamentals — sertifika + rozet",
  "Managing Your Agentic Employees — sertifika + rozet",
  "Zero-Touch API Governance — sertifika + rozet"
], not: "Klasörde 4 kursun sertifikası ve rozeti (8 dosya) bulundu; toplam sayı 5 olarak kayıtlıdır." };

/* ---- BİYOGRAFİ — TAM METİN (Kenan Kuzucu'nun kendi metni, olduğu gibi) --
   Bu bölüm 21.09.2026'da Kenan'ın gönderdiği biyografi metninin BİREBİR
   hâlidir. Sıralama ve başlıklar onun yazdığı gibidir.                   */
var BIO_BASLIK = ["Araştırmacı", "Yazar", "Şair", "Saç Tasarım Uzmanı", "Bilgisayar Teknisyeni", "Siber Güvenlik Araştırmacısı", "Web Tasarımcısı", "Yapay Zekâ Araştırmacısı"];
var BIO_TAM = [
  { bas: "KİŞİSEL BİLGİLER", cift: [
    ["Adı", "Kenan Kuzucu"],
    ["Doğum Yeri", "Ankara / Çankaya"],
    ["Doğum Yılı", "1981"],
    ["Büyüdüğü Yer", "Adana / Ceyhan"],
    ["Aslen", "Şanlıurfa / Halfeti"],
    ["Yaşadığı Yer", "Gaziantep / Şehitkamil"]
  ] },
  { bas: "MESLEKİ UZMANLIK", paragraf: [
    "Kenan Kuzucu; saç tasarımı, bilgisayar teknolojileri, yazılım ve siber güvenlik alanlarında çalışmalar yürüten, farklı disiplinleri bir araya getiren araştırmacı ve üreticidir.",
    "Mesleki hayatında saç tasarımı ve kuaförlük alanındaki deneyimini teknolojiye olan ilgisiyle birleştiren Kuzucu; Python, Kali Linux ve GitHub başta olmak üzere yazılım geliştirme, bilgisayar sistemleri ve siber güvenlik alanlarında kendisini sürekli geliştirmektedir.",
    "Saç tasarımı alanında ise insanların estetik görünümüne, özgüvenine ve kendilerini daha iyi hissetmelerine katkı sağlamayı amaçlamaktadır."
  ] },
  { bas: "EĞİTİMLER VE SERTİFİKALAR", paragraf: [
    "Kuzucu'nun farklı üniversite, akademi ve eğitim platformlarından edindiği çok sayıda eğitim ve başarı belgesi bulunmaktadır."
  ], cift: [
    ["T.C. Millî Eğitim Bakanlığı", "42 Belge"],
    ["Harvard Üniversitesi", "2 Sertifika"],
    ["Oxford Üniversitesi", "2 Sertifika"],
    ["Johns Hopkins Üniversitesi", "7 Sertifika"],
    ["Michigan Üniversitesi", "7 Sertifika"],
    ["Maryland Üniversitesi", "5 Sertifika"],
    ["Tazmanya Üniversitesi", "5 Sertifika"],
    ["OP Jindal Global Üniversitesi", "5 Sertifika"],
    ["The Open University", "2 Sertifika"],
    ["BTK Akademi", "94 Başarı Sertifikası"],
    ["LinkedIn Learning", "120 Tamamlama Sertifikası"],
    ["Microsoft", "86 Rozet ve 25 Başarı Kupası"],
    ["IBM Birleşik Krallık", "3 Başarı Sertifikası"],
    ["Google", "4 Sertifika"],
    ["Cisco Networking Academy", "2 Sertifika"],
    ["YouTube Akademisi", "8 Sertifika"],
    ["Udemy", "10 Sertifika"],
    ["Semrush Academy", "4 Sertifika"],
    ["Coursera", "4 Proje/Eğitim Sertifikası"],
    ["Alison Academy", "2 Sertifika"],
    ["HubSpot Academy", "1 Sertifika"],
    ["Mindluster", "5 Sertifika"],
    ["Geleceği Yazanlar / Turkcell Akademi", "8 Sertifika"],
    ["SPL – Sermaye Piyasaları Lisanslama ve Kayıt Kuruluşu", "3 Sertifika"],
    ["AI-Security-Certificate", "5 Sertifika"]
  ] },
  { bas: "MESLEKİ UZMANLIK BELGELERİ", madde: [
    "Usta Öğretici Belgesi – Kuaförlük ve Saç Tasarımı",
    "Bilgisayar Donanım Teknisyenliği Sertifikası",
    "Python Programlama Temelleri Sertifikası",
    "Siber Güvenlik ve Etik Hackerlık Eğitimi",
    "Osmanlı Türkçesi ve Arapça Dil Eğitimi Sertifikası"
  ] },
  { bas: "TEKNOLOJİ VE SİBER GÜVENLİK", paragraf: [
    "Teknolojiyi yalnızca bir araç olarak değil, sürekli öğrenme ve üretme alanı olarak gören Kenan Kuzucu; özellikle Python programlama, Linux sistemleri, Kali Linux, GitHub, bilgisayar donanımları ve siber güvenlik konularında çalışmalar gerçekleştirmektedir.",
    "Siber güvenlik alanındaki çalışmalarını etik hackerlık ve beyaz şapkalı güvenlik yaklaşımı çerçevesinde sürdürmekte; sistem güvenliği, dijital teknolojiler ve yapay zekâ ekosistemindeki gelişmeleri yakından takip etmektedir."
  ] },
  { bas: "SANAT, EDEBİYAT VE ARAŞTIRMACILIK", paragraf: [
    "Kenan Kuzucu, teknoloji çalışmalarının yanı sıra edebiyat, şiir, araştırma ve kültür alanlarında da üretim gerçekleştirmektedir.",
    "Toplumsal değişim, insan davranışları, ahlak, vicdan, güç, karakter ve modern toplumun dönüşümü gibi konular üzerine düşünsel çalışmalar yapmakta; bu çalışmalarını kitap, şiir ve çeşitli dijital içerik projelerine dönüştürmektedir.",
    "Yazarlık çalışmalarında insanı merkeze alan Kuzucu; toplumun görünmeyen yönlerini, bireyin iç dünyasını ve modern çağın insan ilişkileri üzerindeki etkilerini sorgulayan bir anlatım anlayışını benimsemektedir."
  ] },
  { bas: "YAŞAM FELSEFESİ", paragraf: [
    "Kenan Kuzucu'nun yaşam anlayışını şu söz özetlemektedir:"
  ], alinti: "Bilgi güçtür, sanat yaşamdır ve dostluk en büyük zenginliktir.", devam: [
    "Bu anlayış doğrultusunda bilgiye, sanata, teknolojiye ve kültürel mirasa değer vermekte; öğrenmenin hayat boyu devam eden bir yolculuk olduğuna inanmaktadır.",
    "Onun için başarı yalnızca edinilen belgelerin veya kazanılan unvanların toplamı değil; öğrenilen bilgiyi üretime, sanata ve insanlara faydaya dönüştürebilmektir."
  ] },
  { bas: "KENAN KUZUCU", paragraf: [
    "Araştırmacı, yazar, şair, saç tasarım uzmanı, bilgisayar teknisyeni ve siber güvenlik araştırmacısı.",
    "Farklı disiplinleri bir araya getirerek teknoloji, sanat, edebiyat ve insan odaklı çalışmalarını sürdürmektedir."
  ] }
];
var BIO_DIPNOT = "Bu biyografi metni, Üstad Kenan Kuzucu'nun kendi kaleme aldığı resmî metindir ve olduğu gibi yayımlanmaktadır.";

var MESLEKI = [
  { bas: "A", ad: "Estetik Cephesi", ac: "Saç tasarımı ve kuaförlükte usta öğretici kimliği; estetik ve özgüven tazeleyerek bireylerin hayatına dokunmak.",
    madde: ["Usta Öğretici Belgesi (Kuaförlük & Saç Tasarımı)", "Saç tasarımı, bakım ve stil yönetimi", "Müşteri odaklı danışmanlık ve görünüm tasarımı"] },
  { bas: "B", ad: "Teknoloji Cephesi", ac: "Bilgisayar donanımı ve yazılımda uzmanlık; siber güvenlik araçlarıyla profesyonel saha çalışmaları.",
    madde: ["Python programlama ve otomasyon", "Kali Linux — siber güvenlik ve etik hackleme", "GitHub platformunda yazılım geliştirme", "Bilgisayar donanım teknisyenliği"] }
];
var FELSEFE = "Bir toplumun gerçek çöküşü, ne ekonomik krizlerle başlar ne de savaşların ilk kurşunuyla… Asıl çöküş; insanların doğruyu bildiği hâlde sustuğu, haksızlığı gördüğü hâlde görmezden geldiği ve vicdanını çıkarlarına teslim ettiği gün başlar.";

/* ---- SALON & HİZMETLER (tanıtım) --------------------------------------- */
var HIZMETLER = [
  ["Saç, sakal kesim", "Komple bakım", "500 ₺", ""],
  ["Yalnız saç kesim", "Makas / makine", "350 ₺", ""],
  ["Yalnız sakal tıraşı", "Ustura ile", "250 ₺", ""],
  ["Makine ile sakal şekillendirme", "Şekil verme", "250 ₺", ""],
  ["Saç yıkama ve fön", "Bakım", "250 ₺", ""],
  ["Çocuk tıraşı saç kesimi", "Çocuk", "300 ₺", ""],
  ["Saç boyama", "Renk uygulama", "1.000 ₺", ""],
  ["Bıyık boyama", "Renk uygulama", "300 ₺", ""],
  ["Cilt bakımı, maske, ağda", "Bakım", "350 ₺", ""],
  ["Perma işlemi", "Kalıcı şekil", "1.500 ₺", ""],
  ["Keratin bakım", "Bakım", "700 ₺", ""],
  ["Damat tıraşı", "Özel gün paketi", "3.000 ₺", ""]
];
var SAATLER = [
  ["Hafta İçi", "08:00 – 21:00"],
  ["Cumartesi", "08:00 – 24:00"],
  ["Pazar", "Kapalı"]
];

/* ---- SAÇ MODELLERİ GALERİSİ ------------------------------------------- */
var MODELLER = [
  ["model-01.jpg", "Skin Fade & Sakal Uyumu"],
  ["model-02.jpg", "Modern Pompadour"],
  ["model-03.jpg", "Yandan Ayrık Dalgalı"],
  ["model-04.jpg", "Dokulu & Hacimli Kesim"],
  ["model-05.jpg", "Klasik Kısa Kesim"],
  ["model-06.jpg", "Yandan Ayrık Stil"],
  ["model-07.jpg", "Tarak İzi & Fade"],
  ["model-08.jpg", "Low Fade & Sakal"],
  ["model-09.jpg", "Ustura Sakal Tasarımı"],
  ["model-10.jpg", "Kısa Fade & Sakal Şekli"],
  ["model-11.jpg", "Kısa Üst & Dolgun Sakal"],
  ["model-12.jpg", "Doğal Dalgalı Kesim"]
];

/* ---- İLETİŞİM ---------------------------------------------------------- */
var ILETISIM = {
  cep: "0537 771 24 38",
  cepTel: "+905377712438",
  isTel: "0342 329 75 44",
  isTelTel: "+903423297544",
  whatsapp: "https://wa.me/905377712438",
  eposta: "ustadkenankuzucu@gmail.com",
  adres: "Selimiye Mah. 64111 Nolu Sok. No:33 · Şehitkamil / Gaziantep",
  harita: "https://www.google.com/maps/search/?api=1&query=Selimiye+Mah.+64111+Nolu+Sok.+No:33+%C5%9Eehitkamil+Gaziantep"
};

/* ---- SOSYAL MEDYA ------------------------------------------------------ */
var SOSYAL = [
  { ad: "YouTube",   hesap: "@USTADKENANKUZUCU",    ikon: "logo/ikon-youtube.svg",   url: "https://www.youtube.com/@USTADKENANKUZUCU", not: "Videolar ve içerikler" },
  { ad: "Instagram", hesap: "@kenankuzucuofficiall", ikon: "logo/ikon-instagram.svg", url: "https://instagram.com/kenankuzucuofficiall", not: "Çalışmalar ve günlük paylaşımlar" },
  { ad: "TikTok",    hesap: "@ustadkenankuzucu",    ikon: "logo/ikon-tiktok.svg",    url: "https://tiktok.com/@ustadkenankuzucu", not: "Tasarım ve teknik içerikler" },
  { ad: "Facebook",  hesap: "USTAD KENAN KUZUCU",   ikon: "logo/ikon-facebook.svg",  url: "https://www.facebook.com/USTADKENANKUZUCU", not: "Sayfa ve duyurular" },
  { ad: "LinkedIn",  hesap: "üstad-k-75491133a",    ikon: "logo/ikon-linkedin.svg",  url: "https://www.linkedin.com/in/%C3%BCstad-k-75491133a", not: "Profesyonel ağ" },
  { ad: "WhatsApp",  hesap: "0537 771 24 38",       ikon: "logo/ikon-whatsapp.svg",  url: "https://wa.me/905377712438", not: "Randevu & iletişim" },
  { ad: "E-posta",   hesap: "ustadkenankuzucu@gmail.com", ikon: "logo/ikon-gmail.svg", url: "mailto:ustadkenankuzucu@gmail.com", not: "İş teklifleri ve yazışmalar" }
];

/* ---- LOGO VARYANTLARI (kendi fotoğrafınızdan üretildi) ----------------- */
var LOGOLAR = [
  ["logo/logo-altin-madalyon.png", "Altın Madalyon", "Ana logo — siyah altın, en zarif duruş"],
  ["logo/logo-zumrut-arma.png",    "Zümrüt Arma",    "Zümrüt yeşili arma — resmî evrak ve tabela için"],
  ["logo/logo-muhur.png",          "Mühür",          "Yuvarlak mühür — imza ve kaşe havası"],
  ["logo/logo-kalem-makas.png",    "Kalem & Makas",  "Yazar + berber kimliğini birleştiren varyant"]
];

/* ---- GÜNÜN SÖZÜ (hepsi Üstad Kenan'ın kendi cümleleri) ----------------- */
var SOZLER = [
  "Bilgi güçtür, sanat yaşamdır ve dostluk en büyük zenginliktir.",
  "Vicdan sustuğunda adalet güçsüzleşir.",
  "Adalet zayıfladığında güven yıkılır; güven yıkıldığında insanlar birbirine yabancılaşır.",
  "Güçlü toplumlar büyük binalarla değil; güçlü karakterlerle, temiz vicdanlarla ve ahlaklı insanlarla inşa edilir.",
  "Bir milleti ayakta tutan yalnızca kanunlar değildir."
];

/* ---- MENÜ (sol taraf) — sıra burada belirlenir ------------------------- */
var MENU = [
  { id: "radyo",     ad: "ÜSTAD CANLI RADYO",    simge: "📻", renk: "b1",  not: "kanal" },
  { id: "islami",    ad: "ÜSTAD İSLAMİ RADYO",   simge: "🕌", renk: "b12", not: "kanal" },
  { id: "kuran",     ad: "KUR'AN-I KERİM",       simge: "📗", renk: "b14", not: "114 sûre" },
  { id: "mekke",     ad: "MEKKE MEDİNE CANLI TV", simge: "🕋", renk: "b15", not: "kanal" },
  { id: "siirler",   ad: "ŞİİRLER",              simge: "🕊️", renk: "b2",  not: "sırayla eklenir" },
  { id: "makaleler", ad: "MAKALELER",            simge: "✍️", renk: "b3",  not: "3" },
  { id: "mektuplar", ad: "MEKTUPLAR",            simge: "✉️", renk: "b11", not: "1" },
  { id: "eserler",   ad: "YAZDIĞIM ESERLER",    simge: "📚", renk: "b4",  not: "5 kitap" },
  { id: "kitaplar",  ad: "OKUDUĞUM KİTAPLAR",    simge: "📖", renk: "b13", not: "kitap" },
  { id: "tanitim",   ad: "TANITIM ve BİYOGRAFİ", simge: "👤", renk: "b6",  not: "Salon + Hayat" },
  { id: "egitim",    ad: "EĞİTİM ve BELGELER",   simge: "🎓", renk: "b7",  not: "belge" },
  { id: "teknoloji", ad: "TEKNOLOJİ & DİJİTAL",  simge: "💻", renk: "b16", not: "5 branş" },
  { id: "sosyal",    ad: "SOSYAL İLETİŞİM",      simge: "🌐", renk: "b5",  not: "7 kanal" },
  { id: "galeri",    ad: "SAÇ MODELLERİ",        simge: "💈", renk: "b8",  not: "12" },
  { id: "oyunlar",   ad: "OYUNLAR",              simge: "🎮", renk: "b17", not: "7 oyun" },
  { id: "logo",      ad: "LOGO ve KÜNYE",        simge: "🖼️", renk: "b9",  not: "4 logo" },
  { id: "iletisim",  ad: "İLETİŞİM ve KONUM",    simge: "📞", renk: "b10", not: "Randevu" }
];

/* ==========================================================================
   📖 GÜNÜN SÖZÜ — her gün kendiliğinden değişir (bir gün âyet, bir gün hadis)
   Âyetler : Kur'an-ı Kerim (Arapça metin) + Diyanet İşleri Başkanlığı meali
   Hadisler: Sahih kaynaklar (Buhârî, Müslim, Tirmizî, Ebû Dâvûd, İbn Mâce…)
   Yeni söz eklemek için aşağıdaki listeye aynı biçimde satır ekle:
     { t: "ayet",  k: "Bakara Sûresi, 2/152", ar: "Arapça metin", tr: "Türkçe meal" }
     { t: "hadis", k: "Buhârî, Îmân 3",                            tr: "Hadis metni" }
   ========================================================================== */
var GUNUN_SOZLERI = [
  {"t": "hadis", "k": "Buhârî, Edeb 28; Müslim, Birr 140-141", "tr": "Cebrâil bana komşu hakkında o kadar çok tavsiyede bulundu ki, komşuyu komşuya mirasçı kılacak zannettim."},
  {"t": "ayet", "k": "Nisâ Sûresi, 4/103", "tr": "Namazı kıldıktan başka, Allah'ı ayakta iken, otururken, yan yatarken de anın. Emniyete kavuştuğunuzda, namazı gereğince kılın. Namaz şüphesiz, inananlara belirli vakitlerde farz kılınmıştır.", "ar": "فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَٰمًۭا وَقُعُودًۭا وَعَلَىٰ جُنُوبِكُمْ ۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟ ٱلصَّلَوٰةَ ۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَٰبًۭا مَّوْقُوتًۭا"},
  {"t": "ayet", "k": "Ra'd Sûresi, 13/28", "tr": "Onlar inanmışlar, kalbleri Allah'ı anmakla huzura kavuşmuştur. Dikkat edin, kalbler ancak Allah'ı anmakla huzura kavuşur.", "ar": "ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ"},
  {"t": "ayet", "k": "Bakara Sûresi, 2/153", "tr": "Ey İnananlar! Sabır ve namazla yardım dileyin. Allah, muhakkak ki sabredenlerle beraberdir.", "ar": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ"},
  {"t": "ayet", "k": "Tahrîm Sûresi, 66/8", "tr": "Ey inananlar! Yürekten tevbe ederek Allah'a dönün ki, Rabbiniz kötülüklerinizi örtsün, sizi, içlerinden ırmaklar akan cennetlere koysun. Allah'ın Peygamberini ve onunla beraber olan müminleri utandırmayacağı o gün, ışıkları önlerinde ve defterleri sağlarından verilmiş olarak yürürler ve: \"Rabbimiz! Işığımızı tamamla, bizi bağışla, doğrusu Sen herşeye Kadir'sin\" derler.", "ar": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ تُوبُوٓا۟ إِلَى ٱللَّهِ تَوْبَةًۭ نَّصُوحًا عَسَىٰ رَبُّكُمْ أَن يُكَفِّرَ عَنكُمْ سَيِّـَٔاتِكُمْ وَيُدْخِلَكُمْ جَنَّٰتٍۢ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَٰرُ يَوْمَ لَا يُخْزِى ٱللَّهُ ٱلنَّبِىَّ وَٱلَّذِينَ ءَامَنُوا۟ مَعَهُۥ ۖ نُورُهُمْ يَسْعَىٰ بَيْنَ أَيْدِيهِمْ وَبِأَيْمَٰنِهِمْ يَقُولُونَ رَبَّنَآ أَتْمِمْ لَنَا نُورَنَا وَٱغْفِرْ لَنَآ ۖ إِنَّكَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌۭ"},
  {"t": "hadis", "k": "Müslim, Fedâil 66; Tirmizî, Birr 16", "tr": "İnsanlara merhamet etmeyene Allah merhamet etmez."},
  {"t": "ayet", "k": "Enbiyâ Sûresi, 21/107", "tr": "Biz seni ancak alemlere rahmet olarak gönderdik.", "ar": "وَمَآ أَرْسَلْنَٰكَ إِلَّا رَحْمَةًۭ لِّلْعَٰلَمِينَ"},
  {"t": "ayet", "k": "Furkân Sûresi, 25/74", "tr": "Onlar: \"Rabbimiz! Bize eşlerimizden ve çocuklarımızdan gözümüzün aydınlığı olacak insanlar ihsan et ve bizi, Allah'a karşı gelmekten sakınanlara önder yap\" derler.", "ar": "وَٱلَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّٰتِنَا قُرَّةَ أَعْيُنٍۢ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا"},
  {"t": "hadis", "k": "Tirmizî, Birr 33", "tr": "Hiçbir baba evlâdına güzel edepten daha hayırlı bir miras bırakmamıştır."},
  {"t": "hadis", "k": "Tirmizî, Kıyâme 49; İbn Mâce, Zühd 30", "tr": "Her insan hata eder; hata edenlerin en hayırlısı tevbe edenlerdir."},
  {"t": "hadis", "k": "Müslim, Îmân 164", "tr": "Bizi aldatan bizden değildir."},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/190", "tr": "Göklerin ve yerin yaratılışında, gece ile gündüzün birbiri ardınca gelmesinde akıl sahiblerine şüphesiz deliller vardır.", "ar": "إِنَّ فِى خَلْقِ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ وَٱخْتِلَٰفِ ٱلَّيْلِ وَٱلنَّهَارِ لَءَايَٰتٍۢ لِّأُو۟لِى ٱلْأَلْبَٰبِ"},
  {"t": "ayet", "k": "Bakara Sûresi, 2/286", "tr": "Allah kişiye ancak gücünün yeteceği kadar yükler; kazandığı iyilik lehine, ettiği kötülük de aleyhinedir. Rabbimiz! Eğer unutacak veya yanılacak olursak bizi sorumlu tutma. Rabbimiz bizden öncekilere yüklediğin gibi, bize de ağır yük yükleme. Rabbimiz! Bize gücümüzün yetmeyeceği şeyi taşıtma, bizi affet, bizi bağışla, bize acı. Sen Mevlamızsın, kafirlere karşı bize yardım et.", "ar": "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ"},
  {"t": "hadis", "k": "Tirmizî, İlim 14", "tr": "Hayra vesile olan, hayrı yapan gibidir."},
  {"t": "hadis", "k": "Müslim, Zühd 1", "tr": "Dünya müminin zindanı, kâfirin ise cennetidir."},
  {"t": "ayet", "k": "Hûd Sûresi, 11/88", "tr": "\"Ey Milletim! Rabbimden benim bir belgem olduğu ve bana güzel bir rızık da verdiği halde, O'na karşı gelebilir miyim? Söylesenize! Size yasak ettiğim şeylerde, aykırı hareket etmek istemem; gücümün yettiği kadar ıslah etmekten başka bir dileğim yoktur. Başarım ancak Allah'tandır, O'na güvendim; O'na yöneliyorum\" dedi.", "ar": "قَالَ يَٰقَوْمِ أَرَءَيْتُمْ إِن كُنتُ عَلَىٰ بَيِّنَةٍۢ مِّن رَّبِّى وَرَزَقَنِى مِنْهُ رِزْقًا حَسَنًۭا ۚ وَمَآ أُرِيدُ أَنْ أُخَالِفَكُمْ إِلَىٰ مَآ أَنْهَىٰكُمْ عَنْهُ ۚ إِنْ أُرِيدُ إِلَّا ٱلْإِصْلَٰحَ مَا ٱسْتَطَعْتُ ۚ وَمَا تَوْفِيقِىٓ إِلَّا بِٱللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ"},
  {"t": "ayet", "k": "Yûnus Sûresi, 10/57", "tr": "Ey insanlar! Rabbinizden size bir öğüt ve kalblerde olana şifa, inananlara doğruyu gösteren bir rehber ve rahmet gelmiştir.", "ar": "يَٰٓأَيُّهَا ٱلنَّاسُ قَدْ جَآءَتْكُم مَّوْعِظَةٌۭ مِّن رَّبِّكُمْ وَشِفَآءٌۭ لِّمَا فِى ٱلصُّدُورِ وَهُدًۭى وَرَحْمَةٌۭ لِّلْمُؤْمِنِينَ"},
  {"t": "ayet", "k": "Meryem Sûresi, 19/96", "tr": "İnanıp yararlı iş işleyenleri Rahman sevgili kılacaktır.", "ar": "إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ سَيَجْعَلُ لَهُمُ ٱلرَّحْمَٰنُ وُدًّۭا"},
  {"t": "ayet", "k": "Asr Sûresi, 103/3", "tr": "Ancak inanıp yararlı iş işleyenler, birbirlerine gerçeği tavsiye edenler ve sabırlı olmayı tavsiye edenler bunun dışındadır.", "ar": "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ"},
  {"t": "ayet", "k": "Ra'd Sûresi, 13/11", "tr": "Ardında ve önünde insanoğlunu takip edenler vardır; Allah'ın emriyle onu gözetirler. Bir millet kendini bozmadıkça Allah onların durumunu değiştirmez. Allah bir milletin fenalığını dileyince artık onun önüne geçilmez. Onlar için Allah'tan başka hamide bulunmaz.", "ar": "لَهُۥ مُعَقِّبَٰتٌۭ مِّنۢ بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِۦ يَحْفَظُونَهُۥ مِنْ أَمْرِ ٱللَّهِ ۗ إِنَّ ٱللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا۟ مَا بِأَنفُسِهِمْ ۗ وَإِذَآ أَرَادَ ٱللَّهُ بِقَوْمٍۢ سُوٓءًۭا فَلَا مَرَدَّ لَهُۥ ۚ وَمَا لَهُم مِّن دُونِهِۦ مِن وَالٍ"},
  {"t": "ayet", "k": "Nahl Sûresi, 16/97", "tr": "Kadın, erkek, inanmış olarak kim iyi iş işlerse, ona hoş bir hayat yaşatacağız. Ecirlerini yaptıklarından daha güzeli ile ödeyeceğiz.", "ar": "مَنْ عَمِلَ صَٰلِحًۭا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌۭ فَلَنُحْيِيَنَّهُۥ حَيَوٰةًۭ طَيِّبَةًۭ ۖ وَلَنَجْزِيَنَّهُمْ أَجْرَهُم بِأَحْسَنِ مَا كَانُوا۟ يَعْمَلُونَ"},
  {"t": "ayet", "k": "Ankebût Sûresi, 29/69", "tr": "Ama Bizim uğrumuzda cihat edenleri elbette yollarımıza eriştireceğiz. Allah şüphesiz, iyi davrananlarla beraberdir.", "ar": "وَٱلَّذِينَ جَٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ ٱللَّهَ لَمَعَ ٱلْمُحْسِنِينَ"},
  {"t": "hadis", "k": "Buhârî, Mezâlim 3; Müslim, Birr 58", "tr": "Müslüman, Müslümanın kardeşidir; ona zulmetmez, onu yardımsız bırakmaz. Kim kardeşinin bir ihtiyacını giderirse Allah da onun bir ihtiyacını giderir."},
  {"t": "ayet", "k": "İnşirâh Sûresi, 94/6", "tr": "Gerçekten, güçlükle beraber bir kolaylık vardır.", "ar": "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًۭا"},
  {"t": "ayet", "k": "Tevbe Sûresi, 9/40", "tr": "Ona (Muhammed'e) yardım etmezseniz, bilin ki, inkar edenler onu Mekke'den çıkardıklarında mağarada bulunan iki kişiden biri olarak Allah ona yardım etmişti. Arkadaşına (Ebu Bekir'e) \"Üzülme, Allah bizimledir\" diyordu; Allah da ona güven vermiş, görmediğiniz askerlerle onu desteklemiş, inkar edenlerin sözünü alçaltmıştı. Ancak Allah'ın sözü yücedir. Allah güçlüdür, hakimdir.", "ar": "إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ ٱللَّهُ إِذْ أَخْرَجَهُ ٱلَّذِينَ كَفَرُوا۟ ثَانِىَ ٱثْنَيْنِ إِذْ هُمَا فِى ٱلْغَارِ إِذْ يَقُولُ لِصَٰحِبِهِۦ لَا تَحْزَنْ إِنَّ ٱللَّهَ مَعَنَا ۖ فَأَنزَلَ ٱللَّهُ سَكِينَتَهُۥ عَلَيْهِ وَأَيَّدَهُۥ بِجُنُودٍۢ لَّمْ تَرَوْهَا وَجَعَلَ كَلِمَةَ ٱلَّذِينَ كَفَرُوا۟ ٱلسُّفْلَىٰ ۗ وَكَلِمَةُ ٱللَّهِ هِىَ ٱلْعُلْيَا ۗ وَٱللَّهُ عَزِيزٌ حَكِيمٌ"},
  {"t": "ayet", "k": "Talâk Sûresi, 65/3", "tr": "Kadınların iddet süreleri biteceğinde, onları ya uygun bir şekilde alıkoyun, ya da onlardan ayrılın; içinizden de iki adil şahit getirin; şahidliği Allah için yapın; işte bu, Allah'a ve ahiret gününe inanan kimseye verilen öğüttür. Allah, kendisine karşı gelmekten sakınan kimseye kurtuluş yolu sağlar, ona beklemediği yerden rızık verir. Allah'a güvenen kimseye O yeter. Allah, buyruğunu yerine getirendir. Allah her şey için bir ölçü var etmiştir.", "ar": "وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ ۚ إِنَّ ٱللَّهَ بَٰلِغُ أَمْرِهِۦ ۚ قَدْ جَعَلَ ٱللَّهُ لِكُلِّ شَىْءٍۢ قَدْرًۭا"},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/200", "tr": "Ey İnananlar! Sabredin, düşmanlarınızdan daha sabırlı olun, cihada hazır bulunun, Allah'a karşı gelmekten sakının ki başarıya erişebilesiniz.", "ar": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱصْبِرُوا۟ وَصَابِرُوا۟ وَرَابِطُوا۟ وَٱتَّقُوا۟ ٱللَّهَ لَعَلَّكُمْ تُفْلِحُونَ"},
  {"t": "hadis", "k": "Müslim, Birr 31", "tr": "İnsanların Allah'a en sevimli olanı, insanlara en faydalı olanıdır."},
  {"t": "ayet", "k": "İsrâ Sûresi, 17/80", "tr": "De ki: \"Rabbim! Beni dahil edeceğin yere hoşnutluk ve esenlikle dahil et; çıkaracağın yerden de hoşnutluk ve esenlikle çıkar. Katından beni destekleyecek bir kuvvet ver.\"", "ar": "وَقُل رَّبِّ أَدْخِلْنِى مُدْخَلَ صِدْقٍۢ وَأَخْرِجْنِى مُخْرَجَ صِدْقٍۢ وَٱجْعَل لِّى مِن لَّدُنكَ سُلْطَٰنًۭا نَّصِيرًۭا"},
  {"t": "ayet", "k": "Bakara Sûresi, 2/152", "tr": "Artık Beni anın, Ben de sizi anayım; Bana şükredin, nankörlük etmeyin.", "ar": "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ"},
  {"t": "hadis", "k": "Buhârî, İlim 12; Müslim, Cihâd 6", "tr": "Kolaylaştırınız, güçleştirmeyiniz; müjdeleyiniz, nefret ettirmeyiniz."},
  {"t": "ayet", "k": "Duhâ Sûresi, 93/3", "tr": "Rabbin seni ne bıraktı ve ne de sana darıldı.", "ar": "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ"},
  {"t": "hadis", "k": "Müslim, Îmân 93; Tirmizî, Sıfâtu'l-Kıyâme 56", "tr": "İman etmedikçe cennete giremezsiniz; birbirinizi sevmedikçe de iman etmiş olamazsınız."},
  {"t": "hadis", "k": "Buhârî, Edeb 47; Müslim, Edeb 47", "tr": "Üç kişi bir arada iken, ikisi ötekiyle gizli konuşmasın."},
  {"t": "hadis", "k": "Buhârî, Edeb 31; Müslim, Îmân 74-75", "tr": "Allah'a ve ahiret gününe iman eden, ya hayır söylesin ya da sussun."},
  {"t": "hadis", "k": "Buhârî, Îmân 3; Müslim, Îmân 57-58", "tr": "İman yetmiş küsur şubedir. En üstünü 'Allah'tan başka ilah yoktur' sözü, en aşağısı yoldan eziyet veren şeyi kaldırmaktır. Hayâ da imandandır."},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/26", "tr": "De ki: \"Mülkün sahibi olan Allah'ım! Mülkü dilediğine verirsin; dilediğinden çekip alırsın; dilediğini aziz kılar, dilediğini alçaltırsın; iyilik elindedir. Doğrusu Sen, her şeye Kadir'sin.", "ar": "قُلِ ٱللَّهُمَّ مَٰلِكَ ٱلْمُلْكِ تُؤْتِى ٱلْمُلْكَ مَن تَشَآءُ وَتَنزِعُ ٱلْمُلْكَ مِمَّن تَشَآءُ وَتُعِزُّ مَن تَشَآءُ وَتُذِلُّ مَن تَشَآءُ ۖ بِيَدِكَ ٱلْخَيْرُ ۖ إِنَّكَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌۭ"},
  {"t": "ayet", "k": "Tevbe Sûresi, 9/51", "tr": "De ki: \"Allah'ın bize yazdığından başkası başımıza gelmez. O bizim Mevlamızdır, inananlar Allah'a güvensin.\"", "ar": "قُل لَّن يُصِيبَنَآ إِلَّا مَا كَتَبَ ٱللَّهُ لَنَا هُوَ مَوْلَىٰنَا ۚ وَعَلَى ٱللَّهِ فَلْيَتَوَكَّلِ ٱلْمُؤْمِنُونَ"},
  {"t": "hadis", "k": "İbn Mâce, Ahkâm 17; Muvatta, Akdiye 31", "tr": "Zarar vermek ve zarara zararla karşılık vermek yoktur."},
  {"t": "hadis", "k": "Müslim, Îmân 95", "tr": "Din nasihattir (samimiyettir). 'Kime karşı?' dedik. 'Allah'a, Kitabına, Peygamberine, Müslümanların yöneticilerine ve bütün Müslümanlara' buyurdu."},
  {"t": "ayet", "k": "Hadîd Sûresi, 57/4", "tr": "Gökleri ve yeri altı günde yaratan, sonra arşa hükmeden, yere gireni ve ondan çıkanı, gökten ineni ve oraya yükseleni bilen O'dur. Nerede olursanız olun, O, sizinle beraberdir. Allah yaptıklarınızı görür.", "ar": "هُوَ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ فِى سِتَّةِ أَيَّامٍۢ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ ۚ يَعْلَمُ مَا يَلِجُ فِى ٱلْأَرْضِ وَمَا يَخْرُجُ مِنْهَا وَمَا يَنزِلُ مِنَ ٱلسَّمَآءِ وَمَا يَعْرُجُ فِيهَا ۖ وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۚ وَٱللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌۭ"},
  {"t": "ayet", "k": "Ahzâb Sûresi, 33/70", "tr": "Ey inananlar! Allah'tan sakının, dürüst söz söyleyin de Allah işlerinizi kendinize yararlı kılsın ve günahlarınızı size bağışlasın. Kim Allah'a ve Peygamber'ine itaat ederse, şüphesiz büyük bir kurtuluşa ermiş olur.", "ar": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ ٱللَّهَ وَقُولُوا۟ قَوْلًۭا سَدِيدًۭا"},
  {"t": "ayet", "k": "Kehf Sûresi, 18/28", "tr": "Sabah akşam Rablerinin rızasını dileyerek O'na yalvaranlarla beraber sen de sabret. Dünya hayatının güzelliklerini isteyerek gözlerini o kimselerden ayırma. Bizi anmasını kendisine unutturduğumuz ve işinde aşırı giderek hevesine uyan kimseye uyma.", "ar": "وَٱصْبِرْ نَفْسَكَ مَعَ ٱلَّذِينَ يَدْعُونَ رَبَّهُم بِٱلْغَدَوٰةِ وَٱلْعَشِىِّ يُرِيدُونَ وَجْهَهُۥ ۖ وَلَا تَعْدُ عَيْنَاكَ عَنْهُمْ تُرِيدُ زِينَةَ ٱلْحَيَوٰةِ ٱلدُّنْيَا ۖ وَلَا تُطِعْ مَنْ أَغْفَلْنَا قَلْبَهُۥ عَن ذِكْرِنَا وَٱتَّبَعَ هَوَىٰهُ وَكَانَ أَمْرُهُۥ فُرُطًۭا"},
  {"t": "hadis", "k": "Buhârî, Edeb 57-58", "tr": "Birbirinize haset etmeyin, kin gütmeyin, sırt çevirmeyin; ey Allah'ın kulları, kardeş olun."},
  {"t": "ayet", "k": "Nahl Sûresi, 16/128", "tr": "Allah şüphesiz sakınanlarla ve iyilik yapanlarla beraberdir.", "ar": "إِنَّ ٱللَّهَ مَعَ ٱلَّذِينَ ٱتَّقَوا۟ وَّٱلَّذِينَ هُم مُّحْسِنُونَ"},
  {"t": "ayet", "k": "Talâk Sûresi, 65/2", "tr": "Kadınların iddet süreleri biteceğinde, onları ya uygun bir şekilde alıkoyun, ya da onlardan ayrılın; içinizden de iki adil şahit getirin; şahidliği Allah için yapın; işte bu, Allah'a ve ahiret gününe inanan kimseye verilen öğüttür. Allah, kendisine karşı gelmekten sakınan kimseye kurtuluş yolu sağlar, ona beklemediği yerden rızık verir. Allah'a güvenen kimseye O yeter. Allah, buyruğunu yerine getirendir. Allah her şey için bir ölçü var etmiştir.", "ar": "فَإِذَا بَلَغْنَ أَجَلَهُنَّ فَأَمْسِكُوهُنَّ بِمَعْرُوفٍ أَوْ فَارِقُوهُنَّ بِمَعْرُوفٍۢ وَأَشْهِدُوا۟ ذَوَىْ عَدْلٍۢ مِّنكُمْ وَأَقِيمُوا۟ ٱلشَّهَٰدَةَ لِلَّهِ ۚ ذَٰلِكُمْ يُوعَظُ بِهِۦ مَن كَانَ يُؤْمِنُ بِٱللَّهِ وَٱلْيَوْمِ ٱلْءَاخِرِ ۚ وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًۭا"},
  {"t": "ayet", "k": "İhlâs Sûresi, 112/1", "tr": "De ki: O Allah bir tektir.", "ar": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ قُلْ هُوَ ٱللَّهُ أَحَدٌ"},
  {"t": "hadis", "k": "Müslim, Îmân 168; Tirmizî, Birr 79", "tr": "Söz taşıyanlar cennete giremezler."},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/185", "tr": "Her insan ölümü tadacaktır. Kıyamet günü, ecirleriniz size mutlaka ödenecektir. Ateşten uzaklaştırılıp cennete sokulan kimse artık kurtulmuştur. Dünya hayatı, zaten, sadece aldatıcı bir geçinmeden ibarettir.", "ar": "كُلُّ نَفْسٍۢ ذَآئِقَةُ ٱلْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ ٱلْقِيَٰمَةِ ۖ فَمَن زُحْزِحَ عَنِ ٱلنَّارِ وَأُدْخِلَ ٱلْجَنَّةَ فَقَدْ فَازَ ۗ وَمَا ٱلْحَيَوٰةُ ٱلدُّنْيَآ إِلَّا مَتَٰعُ ٱلْغُرُورِ"},
  {"t": "ayet", "k": "Bakara Sûresi, 2/155", "tr": "Muhakkak sizi biraz korku, biraz açlık ve mallardan, canlardan, ürünlerden biraz eksiltmekle deneriz, sabredenleri müjdele.", "ar": "وَلَنَبْلُوَنَّكُم بِشَىْءٍۢ مِّنَ ٱلْخَوْفِ وَٱلْجُوعِ وَنَقْصٍۢ مِّنَ ٱلْأَمْوَٰلِ وَٱلْأَنفُسِ وَٱلثَّمَرَٰتِ ۗ وَبَشِّرِ ٱلصَّٰبِرِينَ"},
  {"t": "hadis", "k": "Buhârî, Îmân 32; Müslim, Müsâfirîn 218", "tr": "Amellerin en hayırlısı, az da olsa devamlı olanıdır."},
  {"t": "hadis", "k": "Müslim, Îmân 78; Ebû Dâvûd, Salât 248", "tr": "Sizden kim bir kötülük görürse onu eliyle düzeltsin; gücü yetmezse diliyle, ona da gücü yetmezse kalbiyle. Bu ise imanın en zayıf derecesidir."},
  {"t": "hadis", "k": "Taberânî, el-Mu'cemü'l-Evsat 1/275; Beyhakî", "tr": "Sizden birinizin yaptığı işi sağlam ve iyi yapmasından Allah hoşnut olur."},
  {"t": "hadis", "k": "Buhârî, Îmân 39; Müslim, Müsâkât 107", "tr": "İnsanda bir organ vardır; o sağlıklı olursa bütün vücut sağlıklı olur, o bozulursa bütün vücut bozulur. Dikkat edin, o kalptir."},
  {"t": "ayet", "k": "Tâhâ Sûresi, 20/114", "tr": "Gerçek hükümdar olan Allah Yüce'dir. Kuran sana vahyedilirken, vahy bitmezden önce, unutmamak için, tekrarda acele edip durma, \"Rabbim! ilmimi artır\" de.", "ar": "فَتَعَٰلَى ٱللَّهُ ٱلْمَلِكُ ٱلْحَقُّ ۗ وَلَا تَعْجَلْ بِٱلْقُرْءَانِ مِن قَبْلِ أَن يُقْضَىٰٓ إِلَيْكَ وَحْيُهُۥ ۖ وَقُل رَّبِّ زِدْنِى عِلْمًۭا"},
  {"t": "hadis", "k": "Buhârî, Nafakât 1; Müslim, Zühd 41", "tr": "Dul ve fakirlere yardım eden kimse, Allah yolunda cihad eden gibi, gündüz oruç tutup gece ibadet eden gibi mükâfatlandırılır."},
  {"t": "ayet", "k": "Şûrâ Sûresi, 42/25", "tr": "Kullarının tevbesini kabul eden, kötülükleri affeden, yaptıklarınızı bilen, inanıp yararlı işler işleyenlerin duasını kabul eden, lütfuyla onların ecrini arttıran O'dur. Ama, inkarcılar için çetin azap vardır.", "ar": "وَهُوَ ٱلَّذِى يَقْبَلُ ٱلتَّوْبَةَ عَنْ عِبَادِهِۦ وَيَعْفُوا۟ عَنِ ٱلسَّيِّـَٔاتِ وَيَعْلَمُ مَا تَفْعَلُونَ"},
  {"t": "hadis", "k": "Tirmizî, Radâ 11; İbn Mâce, Nikâh 50", "tr": "Sizin en hayırlınız, hanımlarına karşı en iyi davrananınızdır."},
  {"t": "hadis", "k": "Tirmizî, Birr 15; Ebû Dâvûd, Edeb 66", "tr": "Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen bizden değildir."},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/159", "tr": "Allah'ın rahmetinden dolayı, sen onlara karşı yumuşak davrandın. Eğer kaba ve katı kalbli olsaydın, şüphesiz etrafından dağılır giderlerdi. Onları affet, onlara mağfiret dile, iş hakkında onlara danış, fakat karar verdin mi Allah'a güven, doğrusu Allah güvenenleri sever.", "ar": "فَبِمَا رَحْمَةٍۢ مِّنَ ٱللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ ٱلْقَلْبِ لَٱنفَضُّوا۟ مِنْ حَوْلِكَ ۖ فَٱعْفُ عَنْهُمْ وَٱسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِى ٱلْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى ٱللَّهِ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُتَوَكِّلِينَ"},
  {"t": "ayet", "k": "Haşr Sûresi, 59/22", "tr": "O, görüleni de görülmeyeni de bilen, kendisinden başka tanrı olmayan Allah'tır. O, acıyıcı olandır, acıyandır.", "ar": "هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَٰهَ إِلَّا هُوَ ۖ عَٰلِمُ ٱلْغَيْبِ وَٱلشَّهَٰدَةِ ۖ هُوَ ٱلرَّحْمَٰنُ ٱلرَّحِيمُ"},
  {"t": "ayet", "k": "Ahzâb Sûresi, 33/41", "tr": "Ey inananlar! Allah'ı çok anın.", "ar": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱذْكُرُوا۟ ٱللَّهَ ذِكْرًۭا كَثِيرًۭا"},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/173", "tr": "İnsanlar onlara: \"Düşmanınız olan insanlar size karşı bir ordu topladılar, onlardan korkun\" dediler. Bu, onların imanını artırdı da: \"Allah bize yeter. O ne güzel Vekil'dir\" dediler.", "ar": "ٱلَّذِينَ قَالَ لَهُمُ ٱلنَّاسُ إِنَّ ٱلنَّاسَ قَدْ جَمَعُوا۟ لَكُمْ فَٱخْشَوْهُمْ فَزَادَهُمْ إِيمَٰنًۭا وَقَالُوا۟ حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ"},
  {"t": "ayet", "k": "Nahl Sûresi, 16/90", "tr": "Allah şüphesiz adaleti, iyilik yapmayı, yakınlara bakmayı emreder; hayasızlığı, fenalığı ve haddi aşmayı yasak eder. Tutasınız diye size öğüt verir.", "ar": "۞ إِنَّ ٱللَّهَ يَأْمُرُ بِٱلْعَدْلِ وَٱلْإِحْسَٰنِ وَإِيتَآئِ ذِى ٱلْقُرْبَىٰ وَيَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ وَٱلْبَغْىِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ"},
  {"t": "hadis", "k": "Tirmizî, Birr 3", "tr": "Allah'ın rızası anne ve babanın rızasındadır; Allah'ın öfkesi de anne babanın öfkesindedir."},
  {"t": "hadis", "k": "Müslim, Birr 33; İbn Mâce, Zühd 9", "tr": "Allah sizin ne dış görünüşünüze ne de mallarınıza bakar; kalplerinize ve amellerinize bakar."},
  {"t": "hadis", "k": "Tirmizî, Birr 55", "tr": "Nerede olursan ol Allah'a karşı gelmekten sakın; kötülüğün peşinden bir iyilik yap ki onu silsin. İnsanlara güzel ahlâkla davran."},
  {"t": "ayet", "k": "Enbiyâ Sûresi, 21/87", "tr": "Zünnun (Balık Sahibi; Yunus) hakkında söylediğimizi de an. O, öfkelenerek giderken, kendisini sıkıntıya sokmayacağımızı sanmıştı; fakat sonunda karanlıklar içinde: \"Senden başka tanrı yoktur, Sen münezzehsin, doğrusu ben haksızlık edenlerdenim\" diye seslenmişti.", "ar": "وَذَا ٱلنُّونِ إِذ ذَّهَبَ مُغَٰضِبًۭا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِى ٱلظُّلُمَٰتِ أَن لَّآ إِلَٰهَ إِلَّآ أَنتَ سُبْحَٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّٰلِمِينَ"},
  {"t": "ayet", "k": "Bakara Sûresi, 2/255", "tr": "Allah, O'ndan başka tanrı olmayan, kendisini uyuklama ve uyku tutmayan, diri, her an yaratıklarını gözetip durandır. Göklerde olan ve yerde olan ancak O'nundur. O'nun izni olmadan katında şefaat edecek kimdir? Onların işlediklerini ve işleyeceklerini bilir, dilediğinden başka ilminden hiçbir şeyi kavrayamazlar. Hükümranlığı gökleri ve yeri kaplamıştır, onların gözetilmesi O'na ağır gelmez. O yücedir, büyüktür.", "ar": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ"},
  {"t": "ayet", "k": "İnşirâh Sûresi, 94/5", "tr": "Elbette güçlükle beraber şüphesiz bir kolaylık vardır.", "ar": "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"},
  {"t": "hadis", "k": "Müslim, Îmân 107", "tr": "Münafığın alâmeti üçtür: Konuştuğunda yalan söyler, söz verdiğinde sözünde durmaz, kendisine emanet edildiğinde ihanet eder."},
  {"t": "ayet", "k": "A'râf Sûresi, 7/180", "tr": "En güzel isimler Allah'ındır, O'na o isimlerle dua edin, O'nun isimleri konusunda eğriliğe sapanları bırakın. Onlar yaptıklarının cezasını göreceklerdir.", "ar": "وَلِلَّهِ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ فَٱدْعُوهُ بِهَا ۖ وَذَرُوا۟ ٱلَّذِينَ يُلْحِدُونَ فِىٓ أَسْمَٰٓئِهِۦ ۚ سَيُجْزَوْنَ مَا كَانُوا۟ يَعْمَلُونَ"},
  {"t": "hadis", "k": "Müslim, Zühd 64", "tr": "Müminin hâli ne güzeldir! Her işi hayırdır: Nimete kavuşsa şükreder, hayır olur; darlığa düşse sabreder, yine hayır olur."},
  {"t": "hadis", "k": "Buhârî, Îmân 7; Müslim, Îmân 71", "tr": "Hiçbiriniz kendisi için istediğini kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz."},
  {"t": "hadis", "k": "Müslim, Îmân 61", "tr": "Allah'a inandım de, sonra dosdoğru ol."},
  {"t": "ayet", "k": "Bakara Sûresi, 2/269", "tr": "Hikmeti dilediğine verir. Kime hikmet verilmişse şüphesiz ona çokça hayır verilmiştir. Bundan ancak akıl sahipleri ibret alır.", "ar": "يُؤْتِى ٱلْحِكْمَةَ مَن يَشَآءُ ۚ وَمَن يُؤْتَ ٱلْحِكْمَةَ فَقَدْ أُوتِىَ خَيْرًۭا كَثِيرًۭا ۗ وَمَا يَذَّكَّرُ إِلَّآ أُو۟لُوا۟ ٱلْأَلْبَٰبِ"},
  {"t": "hadis", "k": "Buhârî, Edeb 83; Müslim, Zühd 63", "tr": "Mümin, bir delikten iki defa ısırılmaz."},
  {"t": "ayet", "k": "Duhâ Sûresi, 93/5", "tr": "Rabbin şüphesiz sana verecek ve sen de hoşnut olacaksın.", "ar": "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰٓ"},
  {"t": "hadis", "k": "İbn Mâce, Ruhûn 4", "tr": "İşçiye ücretini, alnının teri kurumadan veriniz."},
  {"t": "hadis", "k": "Buhârî, Edeb 27; Müslim, Müsâkât 7-10", "tr": "Bir Müslümanın diktiği ağaçtan veya ektiği ekinden insan, hayvan ve kuşların yedikleri, onun için sadakadır."},
  {"t": "hadis", "k": "Tirmizî, Birr 33", "tr": "Hiçbir baba, çocuğuna güzel terbiyeden daha üstün bir hediye veremez."},
  {"t": "ayet", "k": "Bakara Sûresi, 2/156", "tr": "Onlara bir musibet geldiğinde: \"Biz Allah'ınız ve elbette O'na döneceğiz\" derler.", "ar": "ٱلَّذِينَ إِذَآ أَصَٰبَتْهُم مُّصِيبَةٌۭ قَالُوٓا۟ إِنَّا لِلَّهِ وَإِنَّآ إِلَيْهِ رَٰجِعُونَ"},
  {"t": "ayet", "k": "İbrâhîm Sûresi, 14/7", "tr": "Rabbiniz: \"Şükrederseniz and olsun ki, size karşılığını artıracağım; nankörlük ederseniz bilin ki azabım pek çetindir\" diye bildirmişti.", "ar": "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِى لَشَدِيدٌۭ"},
  {"t": "hadis", "k": "Müslim, Birr 58", "tr": "Kim bir müminin dünya sıkıntılarından birini giderirse, Allah da onun kıyamet sıkıntılarından birini giderir."},
  {"t": "ayet", "k": "Talâk Sûresi, 65/7", "tr": "Varlıklı olan kimse, nafakayı varlığına göre versin; rızkı ancak kendisine yetecek kadar verilmiş olan kimse, Allah'ın kendisine verdiğinden versin; Allah kimseye, verdiği rızkı aşan bir yük yüklemez. Allah, güçlükten sonra kolaylık verir.", "ar": "لِيُنفِقْ ذُو سَعَةٍۢ مِّن سَعَتِهِۦ ۖ وَمَن قُدِرَ عَلَيْهِ رِزْقُهُۥ فَلْيُنفِقْ مِمَّآ ءَاتَىٰهُ ٱللَّهُ ۚ لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا مَآ ءَاتَىٰهَا ۚ سَيَجْعَلُ ٱللَّهُ بَعْدَ عُسْرٍۢ يُسْرًۭا"},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/8", "tr": "Rabbimiz! Bizi doğru yola erdirdikten sonra kalblerimizi eğriltme, katından bize rahmet bağışla; şüphesiz Sen sonsuz bağışta bulunansın.", "ar": "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ"},
  {"t": "ayet", "k": "Nûr Sûresi, 24/35", "tr": "Allah göklerin ve yerin Nur'udur. O'nun nuru, içinde ışık bulunan bir kandil yuvasına benzer. O ışık bir cam içindedir, cam ise, sanki inci gibi parlayan bir yıldızdır; bu ne yalnız doğuda ve ne de yalnız batıda bulunan bereketli zeytin ağacından yakılır. Ateş değmese bile, nerdeyse yağın kendisi aydınlatacak! Nur üstüne nurdur. Allah dilediğini nuruna kavuşturur. Allah insanlara misaller verir. O, herşeyi bilir.", "ar": "۞ ٱللَّهُ نُورُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۚ مَثَلُ نُورِهِۦ كَمِشْكَوٰةٍۢ فِيهَا مِصْبَاحٌ ۖ ٱلْمِصْبَاحُ فِى زُجَاجَةٍ ۖ ٱلزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌۭ دُرِّىٌّۭ يُوقَدُ مِن شَجَرَةٍۢ مُّبَٰرَكَةٍۢ زَيْتُونَةٍۢ لَّا شَرْقِيَّةٍۢ وَلَا غَرْبِيَّةٍۢ يَكَادُ زَيْتُهَا يُضِىٓءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌۭ ۚ نُّورٌ عَلَىٰ نُورٍۢ ۗ يَهْدِى ٱللَّهُ لِنُورِهِۦ مَن يَشَآءُ ۚ وَيَضْرِبُ ٱللَّهُ ٱلْأَمْثَٰلَ لِلنَّاسِ ۗ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌۭ"},
  {"t": "ayet", "k": "Rahmân Sûresi, 55/60", "tr": "İyiliğin karşılığı ancak iyilik değil midir?", "ar": "هَلْ جَزَآءُ ٱلْإِحْسَٰنِ إِلَّا ٱلْإِحْسَٰنُ"},
  {"t": "hadis", "k": "Buhârî, Edeb 69; Müslim, Birr 103-104", "tr": "Doğruluk iyiliğe götürür, iyilik de cennete götürür. Kişi doğru söyleye söyleye Allah katında sıddîk diye yazılır."},
  {"t": "ayet", "k": "Zümer Sûresi, 39/53", "tr": "De ki: \"Ey kendilerine kötülük edip aşırı giden kullarım! Allah'ın rahmetinden umudunuzu kesmeyin. Doğrusu Allah günahların hepsini bağışlar. Çünkü O, bağışlayandır, merhametlidir.\"", "ar": "۞ قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ"},
  {"t": "ayet", "k": "Mü'min Sûresi, 40/60", "tr": "Rabbiniz: \"Bana dua edin ki duanıza icabet edeyim. Bana kulluk etmeyi büyüklüklerine yediremeyenler alçalmış olarak cehenneme gireceklerdir\" buyurmuştur.", "ar": "وَقَالَ رَبُّكُمُ ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ ۚ إِنَّ ٱلَّذِينَ يَسْتَكْبِرُونَ عَنْ عِبَادَتِى سَيَدْخُلُونَ جَهَنَّمَ دَاخِرِينَ"},
  {"t": "hadis", "k": "Müslim, Mukaddime 5", "tr": "Her duyduğunu söylemesi kişiye yalan olarak yeter."},
  {"t": "ayet", "k": "Hucurât Sûresi, 49/13", "tr": "Ey insanlar! Doğrusu Biz sizleri bir erkekle bir dişiden yarattık. Sizi milletler ve kabileler haline koyduk ki birbirinizi kolayca tanıyasınız. Şüphesiz, Allah katında en değerliniz, O'na karşı gelmekten en çok sakınanızdır. Allah bilendir, haberdardır.", "ar": "يَٰٓأَيُّهَا ٱلنَّاسُ إِنَّا خَلَقْنَٰكُم مِّن ذَكَرٍۢ وَأُنثَىٰ وَجَعَلْنَٰكُمْ شُعُوبًۭا وَقَبَآئِلَ لِتَعَارَفُوٓا۟ ۚ إِنَّ أَكْرَمَكُمْ عِندَ ٱللَّهِ أَتْقَىٰكُمْ ۚ إِنَّ ٱللَّهَ عَلِيمٌ خَبِيرٌۭ"},
  {"t": "ayet", "k": "Tegâbün Sûresi, 64/11", "tr": "Başa gelen hiçbir musibet Allah'ın izni olmaksızın olamaz; Allah'a kim inanırsa onun gönlünü doğruya yöneltir. Allah herşeyi bilendir.", "ar": "مَآ أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ ٱللَّهِ ۗ وَمَن يُؤْمِنۢ بِٱللَّهِ يَهْدِ قَلْبَهُۥ ۚ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌۭ"},
  {"t": "ayet", "k": "Yûnus Sûresi, 10/62", "tr": "İyi bilin ki, Allah'ın dostlarına korku yoktur, onlar üzülmeyeceklerdir.", "ar": "أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"},
  {"t": "hadis", "k": "Tirmizî, Birr 36", "tr": "Kardeşine tebessüm etmen sadakadır. İyiliği emredip kötülükten sakındırman sadakadır. Yoldan taş, diken, kemik kaldırman da sadakadır."},
  {"t": "ayet", "k": "Bakara Sûresi, 2/216", "tr": "Savaş, hoşunuza gitmediği halde size farz kılındı. İhtimal ki hoşlanmadığınız şey sizin iyiliğinizedir ve ihtimal ki sevdiğiniz bir şey sizin kötülüğünüzedir. Siz bilmezsiniz, Allah bilir.", "ar": "كُتِبَ عَلَيْكُمُ ٱلْقِتَالُ وَهُوَ كُرْهٌۭ لَّكُمْ ۖ وَعَسَىٰٓ أَن تَكْرَهُوا۟ شَيْـًۭٔا وَهُوَ خَيْرٌۭ لَّكُمْ ۖ وَعَسَىٰٓ أَن تُحِبُّوا۟ شَيْـًۭٔا وَهُوَ شَرٌّۭ لَّكُمْ ۗ وَٱللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ"},
  {"t": "ayet", "k": "Âl-i İmrân Sûresi, 3/139", "tr": "Gevşemeyin, üzülmeyin, inanmışsanız, mutlaka siz en üstünsünüzdür.", "ar": "وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ"},
  {"t": "ayet", "k": "Ra'd Sûresi, 13/29", "tr": "İnanan ve yararlı iş işleyen kimseler için hoş bir hayat ve dönülecek güzel bir yer vardır.", "ar": "ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ طُوبَىٰ لَهُمْ وَحُسْنُ مَـَٔابٍۢ"},
  {"t": "ayet", "k": "Bakara Sûresi, 2/186", "tr": "Kullarım sana Beni sorarlarsa, bilsinler ki Ben, şüphesiz onlara yakınım. Benden isteyenin, dua ettiğinde duasını kabul ederim. Artık onlar da davetimi kabul edip Bana inansınlar ki doğru yolda yürüyenlerden olsunlar.", "ar": "وَإِذَا سَأَلَكَ عِبَادِى عَنِّى فَإِنِّى قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا۟ لِى وَلْيُؤْمِنُوا۟ بِى لَعَلَّهُمْ يَرْشُدُونَ"},
  {"t": "ayet", "k": "Kehf Sûresi, 18/10", "tr": "Birkaç genç mağaraya sığınmış: \"Rabbimiz! Katından bize rahmet ver ve işimizde doğruyu göster, bizi başarılı kıl\" demişlerdi.", "ar": "إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةًۭ وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًۭا"}
];
