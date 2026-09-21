/* ==========================================================================
   🎮 OYUN SORULARI — Üstad Kenan Kuzucu oyun salonu soru bankası
   Bankalar: milyoner (kolaydan zora) · kultur · tarih · zeka
   Biçim: { q: soru, s: [4 seçenek], c: doğru indeks, n: kısa açıklama (isteğe bağlı) }
   ========================================================================== */
window.OYUN_SORULAR = {

  /* ---------------- 💰 ÜSTADIN MİLYONERİ (kolaydan zora sıralı) ---------------- */
  milyoner: [
    { q: "Türkiye Cumhuriyeti hangi yıl kurulmuştur?", s: ["1923", "1920", "1919", "1938"], c: 0, n: "29 Ekim 1923'te Cumhuriyet ilan edildi." },
    { q: "Bir yılda kaç ay vardır?", s: ["12", "10", "11", "13"], c: 0 },
    { q: "Türkiye'nin başkenti neresidir?", s: ["Ankara", "İstanbul", "İzmir", "Bursa"], c: 0, n: "13 Ekim 1923'te Ankara başkent oldu." },
    { q: "Suyun deniz seviyesinde kaynama noktası kaç derecedir?", s: ["100 °C", "0 °C", "50 °C", "212 °C"], c: 0 },
    { q: "İstiklal Marşı'nın şairi kimdir?", s: ["Mehmet Akif Ersoy", "Yahya Kemal Beyatlı", "Namık Kemal", "Ziya Gökalp"], c: 0, n: "Bestesi Osman Zeki Üngör'e aittir." },
    { q: "Türkiye'de kaç il vardır?", s: ["81", "67", "79", "90"], c: 0 },
    { q: "İstanbul hangi yıl fethedilmiştir?", s: ["1453", "1071", "1299", "1517"], c: 0, n: "Fatih Sultan Mehmet, 29 Mayıs 1453." },
    { q: "Dünyanın en büyük okyanusu hangisidir?", s: ["Pasifik", "Atlas", "Hint", "Arktik"], c: 0 },
    { q: "İnsan vücudunda kaç odacıklı bir kalp vardır?", s: ["4", "2", "3", "6"], c: 0 },
    { q: "Periyodik tabloda oksijenin sembolü nedir?", s: ["O", "Ox", "Ok", "On"], c: 0 },
    { q: "Türkiye'nin en yüksek dağı hangisidir?", s: ["Ağrı Dağı", "Erciyes", "Uludağ", "Kaçkar"], c: 0, n: "5137 metre." },
    { q: "Ay'a ilk ayak basan insan kimdir?", s: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"], c: 0, n: "20 Temmuz 1969, Apollo 11." },
    { q: "Osmanlı Devleti'nin kurucusu kimdir?", s: ["Osman Bey", "Orhan Bey", "Ertuğrul Gazi", "Süleyman Şah"], c: 0 },
    { q: "Malazgirt Savaşı hangi yıl yapılmıştır?", s: ["1071", "1176", "1299", "1402"], c: 0, n: "Anadolu'nun kapıları Türklere açıldı." },
    { q: "Işık hızı yaklaşık saniyede kaç kilometredir?", s: ["300.000 km", "30.000 km", "3.000 km", "3.000.000 km"], c: 0 },
    { q: "DNA'nın yapısını çözen bilim insanları hangi modeli önerdi?", s: ["Çift sarmal", "Tek zincir", "Küre model", "Halka model"], c: 0, n: "Watson ve Crick, 1953." },
    { q: "Türkiye'nin en uzun nehri hangisidir?", s: ["Kızılırmak", "Fırat", "Dicle", "Sakarya"], c: 0, n: "1355 km, tamamı Türkiye'de." },
    { q: "Lozan Barış Antlaşması hangi yıl imzalanmıştır?", s: ["1923", "1920", "1921", "1925"], c: 0, n: "24 Temmuz 1923." },
    { q: "Dünyanın en yüksek dağı Everest'in zirvesi kaç metredir?", s: ["8849", "8100", "9200", "7990"], c: 0 },
    { q: "Roma İmparatorluğu'nun başkenti Roma hangi yıl kurulmuştur (geleneksel tarih)?", s: ["MÖ 753", "MÖ 509", "MS 330", "MÖ 1000"], c: 0 },
    { q: "Osmanlı'da ilk matbaayı kuran İbrahim Müteferrika hangi padişah döneminde çalıştı?", s: ["III. Ahmet", "II. Mahmut", "Kanuni", "IV. Murat"], c: 0, n: "1727'de ilk Türk matbaası açıldı." },
    { q: "Atomun çekirdeğinde hangi parçacıklar bulunur?", s: ["Proton ve nötron", "Yalnız elektron", "Elektron ve nötron", "Yalnız proton"], c: 0 }
  ],

  /* ---------------- 🌍 ÜSTADIN GENEL KÜLTÜRÜ ---------------- */
  kultur: [
    { q: "Dünyanın en kalabalık ülkesi hangisidir?", s: ["Hindistan", "Çin", "ABD", "Endonezya"], c: 0, n: "2023'ten beri nüfusta ilk sırada." },
    { q: "Mona Lisa tablosu hangi müzede sergilenmektedir?", s: ["Louvre", "Prado", "Uffizi", "British Museum"], c: 0, n: "Paris, Louvre Müzesi." },
    { q: "Olimpiyat bayrağında kaç halka vardır?", s: ["5", "4", "6", "3"], c: 0, n: "Beş kıtayı simgeler." },
    { q: "Kaç gezegen vardır (Güneş Sistemi)?", s: ["8", "9", "7", "10"], c: 0, n: "Plüton 2006'da cüce gezegen sayıldı." },
    { q: "Türkiye'nin plaka numarası 27 olan ili hangisidir?", s: ["Gaziantep", "Şanlıurfa", "Adana", "Hatay"], c: 0 },
    { q: "İnsan vücudundaki en büyük organ hangisidir?", s: ["Deri", "Karaciğer", "Akciğer", "Beyin"], c: 0 },
    { q: "Bir futbol takımı sahada kaç oyuncuyla başlar?", s: ["11", "10", "12", "9"], c: 0 },
    { q: "Sanatın 'Mona Lisa'sını yapan Leonardo da Vinci hangi alanda da eser verdi?", s: ["Anatomi ve mühendislik", "Yalnız mimarlık", "Yalnız müzik", "Yalnız matematik"], c: 0 },
    { q: "Türkiye'nin en büyük gölü hangisidir?", s: ["Van Gölü", "Tuz Gölü", "Eğirdir", "Beyşehir"], c: 0 },
    { q: "Nobel Barış Ödülü hangi şehirde verilir?", s: ["Oslo", "Stockholm", "Kopenhag", "Helsinki"], c: 0, n: "Diğer Nobel ödülleri Stockholm'de verilir." },
    { q: "Dünyanın en uzun duvarı hangisidir?", s: ["Çin Seddi", "Berlin Duvarı", "Hadrian Duvarı", "Babil Duvarı"], c: 0 },
    { q: "Saz şairi Âşık Veysel'in gözleri kaç yaşında görmez oldu?", s: ["7", "12", "20", "1"], c: 0, n: "Çiçek hastalığı sonrası." },
    { q: "Bilgisayarın beyni sayılan birim hangisidir?", s: ["İşlemci (CPU)", "RAM", "Ekran kartı", "Sabit disk"], c: 0 },
    { q: "En hızlı kara hayvanı hangisidir?", s: ["Çita", "Aslan", "At", "Tazı"], c: 0 },
    { q: "İstiklal Marşı hangi yıl kabul edilmiştir?", s: ["1921", "1923", "1920", "1930"], c: 0, n: "12 Mart 1921." },
    { q: "Dünyanın en büyük sıcak çölü hangisidir?", s: ["Sahra", "Gobi", "Kalahari", "Atacama"], c: 0 },
    { q: "Türkiye'de ilk nüfus sayımı hangi yıl yapılmıştır?", s: ["1927", "1923", "1935", "1950"], c: 0 },
    { q: "Su hangi iki elementten oluşur?", s: ["Hidrojen ve oksijen", "Hidrojen ve azot", "Oksijen ve karbon", "Karbon ve hidrojen"], c: 0, n: "H₂O." },
    { q: "Mevlânâ'nın en ünlü eseri hangisidir?", s: ["Mesnevî", "Divan-ı Hikmet", "Kutadgu Bilig", "Hüsn ü Aşk"], c: 0 },
    { q: "Bir üçgenin iç açıları toplamı kaç derecedir?", s: ["180", "360", "90", "270"], c: 0 },
    { q: "Türkiye'nin en kalabalık ili hangisidir?", s: ["İstanbul", "Ankara", "İzmir", "Bursa"], c: 0 },
    { q: "Kağıt hangi maddeden üretilir?", s: ["Odun hamuru", "Taş", "Kum", "Kömür"], c: 0 },
    { q: "İnsan kalbi günde yaklaşık kaç kez atar?", s: ["100.000", "10.000", "1.000", "500.000"], c: 0 },
    { q: "Dünya'nın uydusu hangisidir?", s: ["Ay", "Güneş", "Mars", "Venüs"], c: 0 },
    { q: "Türk edebiyatında ilk roman hangisidir?", s: ["Taaşşuk-ı Talat ve Fitnat", "Araba Sevdası", "İntibah", "Sergüzeşt"], c: 0, n: "Şemsettin Sami, 1872." },
    { q: "En sert doğal mineral hangisidir?", s: ["Elmas", "Kuvars", "Demir", "Altın"], c: 0 },
    { q: "Olimpiyatlar kaç yılda bir yapılır?", s: ["4", "2", "3", "5"], c: 0 },
    { q: "Türkiye'de Cumhuriyet'in ilk yıllarında harf devrimi hangi yıl yapıldı?", s: ["1928", "1923", "1934", "1940"], c: 0, n: "1 Kasım 1928, yeni Türk harfleri." },
    { q: "Gökyüzü neden mavi görünür?", s: ["Işığın atmosferde saçılması", "Denizin yansıması", "Ozon tabakası", "Güneş'in rengi"], c: 0, n: "Rayleigh saçılması." },
    { q: "Einstein hangi teorisiyle tanınır?", s: ["Görelilik", "Evrim", "Kuantum belirsizlik", "Yerçekimi kanunu (Newton'un)"], c: 0 }
  ],

  /* ---------------- 🏛️ ÜSTADIN TARİH YARIŞMASI ---------------- */
  tarih: [
    { q: "Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?", s: ["23 Nisan 1920", "29 Ekim 1923", "19 Mayıs 1919", "30 Ağustos 1922"], c: 0 },
    { q: "Çanakkale Savaşı hangi yıl yaşanmıştır?", s: ["1915", "1912", "1918", "1920"], c: 0 },
    { q: "Kurtuluş Savaşı'nda Büyük Taarruz hangi yıl yapıldı?", s: ["1922", "1921", "1920", "1923"], c: 0, n: "26 Ağustos 1922." },
    { q: "Atatürk hangi şehirde doğmuştur?", s: ["Selanik", "İstanbul", "Ankara", "Manastır"], c: 0, n: "1881, Selanik." },
    { q: "Osmanlı Devleti İstanbul'u hangi padişah döneminde fethetmiştir?", s: ["Fatih Sultan Mehmet", "Yavuz Sultan Selim", "Kanuni Sultan Süleyman", "II. Bayezid"], c: 0 },
    { q: "İkinci Dünya Savaşı hangi yıllar arasında sürmüştür?", s: ["1939-1945", "1914-1918", "1929-1935", "1945-1950"], c: 0 },
    { q: "Fransız Devrimi hangi yıl başlamıştır?", s: ["1789", "1776", "1815", "1848"], c: 0 },
    { q: "Amerika Birleşik Devletleri hangi yıl bağımsızlığını ilan etmiştir?", s: ["1776", "1789", "1620", "1801"], c: 0, n: "4 Temmuz 1776." },
    { q: "Berlin Duvarı hangi yıl yıkılmıştır?", s: ["1989", "1991", "1985", "1993"], c: 0 },
    { q: "Anadolu Selçuklu Devleti'nin başkenti neresiydi?", s: ["Konya", "Sivas", "Kayseri", "Ankara"], c: 0 },
    { q: "Preveze Deniz Savaşı hangi Osmanlı amirali tarafından kazanılmıştır?", s: ["Barbaros Hayrettin Paşa", "Turgut Reis", "Piri Reis", "Kılıç Ali Paşa"], c: 0, n: "1538." },
    { q: "Mohaç Savaşı hangi yıl yapılmıştır?", s: ["1526", "1514", "1538", "1571"], c: 0, n: "Kanuni döneminde." },
    { q: "Kadınlara seçme ve seçilme hakkı Türkiye'de hangi yıl verilmiştir?", s: ["1934", "1923", "1930", "1945"], c: 0, n: "5 Aralık 1934." },
    { q: "Kadeş Antlaşması hangi iki devlet arasında yapılmıştır?", s: ["Hititler ve Mısırlılar", "Romalılar ve Kartacalılar", "Persler ve Yunanlar", "Sümerler ve Akadlar"], c: 0, n: "Bilinen ilk yazılı antlaşma." },
    { q: "Yavuz Sultan Selim hangi savaşla Memlük Devleti'ne son vermiştir?", s: ["Ridaniye", "Çaldıran", "Mercidabık", "Otlukbeli"], c: 0, n: "1517, halifelik Osmanlı'ya geçti." },
    { q: "Kurtuluş Savaşı'nda ilk işgal edilen yer neresidir?", s: ["İzmir", "İstanbul", "Adana", "Antep"], c: 0, n: "15 Mayıs 1919." },
    { q: "Birinci Dünya Savaşı hangi olayla başlamıştır?", s: ["Arşidük Franz Ferdinand'ın öldürülmesi", "Versay Antlaşması", "Paris Barış Konferansı", "Rus Devrimi"], c: 0, n: "28 Haziran 1914, Saraybosna." },
    { q: "Roma İmparatorluğu'nun doğu kolu hangi isimle anıldı?", s: ["Bizans İmparatorluğu", "Kutsal Roma", "Sasani", "Vizigot"], c: 0 },
    { q: "18. yüzyılda Osmanlı'nın ilk kez toprak kaybettiği antlaşma hangisidir?", s: ["Karlofça", "Pasarofça", "Küçük Kaynarca", "Sevr"], c: 0, n: "1699." },
    { q: "Türkiye Cumhuriyeti'nin ilk cumhurbaşkanı kimdir?", s: ["Mustafa Kemal Atatürk", "İsmet İnönü", "Celal Bayar", "Fevzi Çakmak"], c: 0 },
    { q: "Sümerler hangi buluşuyla tarihe geçmiştir?", s: ["Yazı", "Pusula", "Barut", "Kağıt"], c: 0, n: "Çivi yazısı." },
    { q: "Anadolu'da Türk beyliklerinden Osmanoğulları hangi savaşla öne çıkmıştır?", s: ["Koyunhisar", "Varna", "Niğbolu", "Ankara"], c: 0, n: "1302, Bizans'a karşı." },
    { q: "Lozan Barış Antlaşması'nda Türkiye'yi temsil eden heyetin başkanı kimdi?", s: ["İsmet İnönü", "Rauf Orbay", "Fevzi Çakmak", "Kazım Karabekir"], c: 0 },
    { q: "Osmanlı'nın son döneminde ilan edilen I. Meşrutiyet hangi yılda gerçekleşmiştir?", s: ["1876", "1908", "1878", "1889"], c: 0, n: "Kanûn-ı Esâsî ilan edildi." }
  ],

  /* ---------------- 🧠 ÜSTADIN ZEKÂ TESTİ ---------------- */
  zeka: [
    { q: "2, 4, 8, 16, ? — dizide soru işaretinin yerine hangi sayı gelir?", s: ["32", "24", "20", "30"], c: 0, n: "Her adımda ikiye katlanıyor." },
    { q: "1, 1, 2, 3, 5, 8, ? — dizide sıradaki sayı nedir?", s: ["13", "11", "16", "12"], c: 0, n: "Fibonacci dizisi." },
    { q: "3, 6, 11, 18, ? — sıradaki sayı hangisidir?", s: ["27", "24", "26", "29"], c: 0, n: "Farklar 3, 5, 7, 9." },
    { q: "Bir çiftlikte 12 tavuk ve 5 koyun var. Toplam kaç bacak vardır?", s: ["44", "34", "48", "40"], c: 0, n: "12×2 + 5×4 = 44." },
    { q: "5 makine 5 dakikada 5 parça yapıyor. 100 makine 100 parçayı kaç dakikada yapar?", s: ["5", "100", "20", "10"], c: 0, n: "Her makine 5 dakikada 1 parça yapar." },
    { q: "Bir su birikintisindeki nilüfer her gün iki katına çıkıyor ve 48 günde gölün tamamını kaplıyor. Yarım kaplayınca kaç gün geçmiştir?", s: ["47", "24", "46", "36"], c: 0, n: "Yarım → ertesi gün tamamı: 47. gün." },
    { q: "Bir sayının 3 katı 45 ise, o sayının 5 katı kaçtır?", s: ["75", "60", "70", "80"], c: 0, n: "Sayı 15 → 5×15 = 75." },
    { q: "A+B=10 ve A−B=4 ise A kaçtır?", s: ["7", "6", "8", "5"], c: 0, n: "A=7, B=3." },
    { q: "Saat 15:15'te akrep ile yelkovan arasındaki açı kaç derecedir?", s: ["7,5", "0", "15", "30"], c: 0, n: "Yelkovan 90°, akrep 82,5° → 7,5°." },
    { q: "🏠 🚗 🏠 🚗 🏠 ? — örüntüde sıradaki hangisidir?", s: ["🚗", "🏠", "✈️", "⛵"], c: 0, n: "Sırayla ev–araba tekrar ediyor." },
    { q: "🔴 🔵 🔴 🔵 🔴 ? — örüntüye göre sıradaki hangisidir?", s: ["🔵", "🔴", "🟢", "🟡"], c: 0 },
    { q: "9, 7, 8, 6, 7, 5, ? — dizide sıradaki sayı nedir?", s: ["6", "4", "8", "5"], c: 0, n: "Her iki adımda birer azalıyor: 9-2, +1, -2, +1…" },
    { q: "2, 3, 5, 7, 11, 13, ? — dizide sıradaki sayı nedir?", s: ["17", "15", "19", "14"], c: 0, n: "Asal sayılar." },
    { q: "Bir sepette 3 elma, 2 armut var. 4 sepette kaç meyve vardır?", s: ["20", "12", "14", "24"], c: 0, n: "(3+2)×4 = 20." },
    { q: "Bir odada 4 köşe, her köşede 1 kedi, her kedinin karşısında 3 kedi var. Odada kaç kedi vardır?", s: ["4", "12", "8", "16"], c: 0, n: "Her kedi diğer üçünü görür." },
    { q: "Bir tren 60 km/sa hızla 2 saat, sonra 80 km/sa hızla 1 saat gidiyor. Toplam kaç km yol almıştır?", s: ["200", "140", "180", "220"], c: 0, n: "60×2 + 80×1 = 200." }
  ]
};
