# Akademik Hesablayıcı - Test Checklist

## ✅ Tamamlanan Xüsusiyyətlər

### 1. Buraxılış Bal Hesablama ✓
- [x] 9-cu və 11-ci sinif seçimi
- [x] Azərbaycan dili hesablama (20 qapalı, 10 açıq)
- [x] Riyaziyyat hesablama (13 qapalı, 5 açıq, 7 ətraflı)
- [x] Xarici dil hesablama (23 qapalı, 7 açıq)
- [x] Düzgün düsturlar:
  - Az dili: 2.5 × (2×açıq + qapalı)
  - Riyaziyyat: 3.125 × (2×ətraflı + açıq + qapalı)
  - Xarici dil: 2.7 × (2×açıq + qapalı)
- [x] Maksimum 300 bal limiti
- [x] Statistika görüntüsü
- [x] Qiymətləndirmə sistemləri:
  - 300: MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ
  - 250+: ÇOX YAXŞI
  - 160+: YAXŞI
  - 140+: KAFİ
  - 120+: ZƏİF
  - 60+: YAXŞI OLACAQ
  - 0: 0 BAL

### 2. Blok Bal Hesablama ✓
- [x] 1-4 qrup seçimi
- [x] 1-ci qrup: Rİ və RK seçimləri
  - Rİ: Riyaziyyat(150), Fizika(150), İnformatika(100)
  - RK: Riyaziyyat(150), Fizika(150), Kimya(100)
- [x] 2-ci qrup: Riyaziyyat(150), Tarix(150), Coğrafiya(100)
- [x] 3-cü qrup: DT və TC seçimləri
  - DT: Az dili(150), Tarix(150), Ədəbiyyat(100)
  - TC: Az dili(150), Tarix(150), Coğrafiya(100)
- [x] 4-cü qrup: Biologiya(150), Kimya(150), Fizika(100)
- [x] 22 qapalı, 5 açıq, 3 ətraflı sual üçün input
- [x] Düzgün düsturlar:
  - Qapalı: (düzgün - 0.25×səhv) × 3.03
  - Açıq/Ətraflı: (açıq + 2×ətraflı) × 3.03
  - Mənfi nəticə 0 qəbul edilir
- [x] Maksimum 400 bal limiti
- [x] Fən üzrə statistika
- [x] Qiymətləndirmə sistemləri (400 bal əsasında)

### 3. Yaş Hesablayıcı ✓
- [x] Doğum tarixi input (gün/ay/il formatı)
- [x] Dəqiq yaş hesablaması (il, ay, gün)
- [x] Ömür boyu yaşanılan günlərin sayı
- [x] Növbəti ad gününə qalan günlər
- [x] Texniki səhvsiz hesablama

### 4. Haqqında Bölməsi ✓
- [x] "O, boşluq yaradır." mətni göstərilir

### 5. Məlumat Bölməsi ✓
- [x] Akademik məlumat bölməsi
- [x] "Əlaçı olmaq üçün bütün fənlər 91+ olmalıdır" məlumatı
- [x] Developer üçün rahat struktur (HTML şərhlər ilə)

### 6. Sürətli Linklər ✓
- [x] BDU rəsmi saytı linki
- [x] SemsLogin tələbə portalı linki
- [x] Linklər yeni tab-da açılır
- [x] Developer üçün rahat struktur (şərhli nümunələr)

### 7. Ümumi Dizayn və Funksionallıq ✓
- [x] Ana səhifədə bütün bölmələr sıra ilə görünür
- [x] İstifadəçi istədiyi bölməyə daxil ola bilir
- [x] İçəridə seçim varsa alt səhifə göstərilir
- [x] Geri düyməsi ilə ana səhifəyə qayıtma
- [x] Yuxarıda sabit banner: "ən ucuz sərbəst iş hazırlanması"
- [x] WhatsApp ikonu: +994559406018 nömrəsinə yönləndirmə
- [x] Banner bütün səhifələrdə sabit qalır

### 8. PWA (Progressive Web App) ✓
- [x] manifest.json faylı
- [x] service-worker.js faylı
- [x] Quraşdırma (Install) düyməsi
- [x] Ana ekrana əlavə edilə bilir
- [x] Offline işləyir
- [x] Cache sistemi
- [x] Avtomatik cache yeniləməsi
- [x] Versiya sistemi (service-worker.js-də CACHE_VERSION)
- [x] Köhnə cache-lər avtomatik silinir
- [x] 192x192 və 512x512 ikonlar

### 9. Texniki Tələblər ✓
- [x] Backend yoxdur
- [x] Yalnız HTML, CSS, JavaScript
- [x] Düzgün qovluq strukturu
- [x] .gitignore faylı
- [x] README.md faylı
- [x] DEPLOYMENT.md deployment təlimatları
- [x] render.yaml konfiqurasiya faylı
- [x] GitHub-a push edilib: https://github.com/gupi9163-lab/kjjjjbbkj
- [x] Render.com üçün hazır

## 🎨 Əlavə Xüsusiyyətlər

- [x] Responsive dizayn (mobil və desktop)
- [x] Modern UI/UX (card-based layout)
- [x] Smooth animasiyalar
- [x] Rəng kodlaşdırılmış nəticələr
- [x] Input validasiyası
- [x] Maksimum dəyər yoxlamaları
- [x] User-friendly error mesajları

## 📋 Render.com Deployment Addımları

1. Render.com-a daxil olun
2. "New +" → "Static Site" seçin
3. GitHub repository seçin: `gupi9163-lab/kjjjjbbkj`
4. Settings:
   - Name: akademik-hesablayici
   - Branch: main
   - Build Command: (boş saxlayın)
   - Publish Directory: `.`
5. "Create Static Site" düyməsinə basın
6. Deploy tamamlandıqdan sonra URL-i test edin

## 🧪 Test Ssenariləri

### Buraxılış Test:
1. 9-cu sinif seçin
2. Az dili: 20 qapalı, 10 açıq → 100 bal
3. Riyaziyyat: 13 qapalı, 5 açıq, 7 ətraflı → 100 bal
4. Xarici dil: 23 qapalı, 7 açıq → 100 bal
5. Ümumi: 300 bal → "MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ"

### Blok Test:
1. 1-ci qrup → Rİ seçin
2. Hər fən üçün: 22 düzgün, 0 səhv, 5 açıq, 3 ətraflı → maksimum bal
3. Ümumi 400 bal yaxınlığında olmalı

### Yaş Test:
1. 2000-01-01 tarixi daxil edin
2. ~24-25 il yaş göstərilməli
3. Günlər sayı ~9000+ olmalı
4. Növbəti ad günü hesablanmalı

## ✅ Nəticə

Bütün tələblər tam və problemsiz şəkildə həyata keçirilib!
