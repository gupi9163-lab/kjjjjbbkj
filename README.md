# Akademik Hesablayıcı

Azərbaycan tələbələri üçün buraxılış və blok bal hesablama, yaş hesablama və akademik məlumatlar təqdim edən Progressive Web Application (PWA).

## 🎓 Xüsusiyyətlər

### 1. Buraxılış Bal Hesablama
- 9-cu və 11-ci sinif buraxılış imtahanı ballarını hesablayır
- Azərbaycan dili, Riyaziyyat və Xarici dil fənləri
- Maksimum 300 bal
- Ətraflı statistika və qiymətləndirmə

### 2. Blok Bal Hesablama
- 1-4-cü qrup blok imtahan ballarını hesablayır
- Alt qrup seçimləri (Rİ, RK, DT, TC)
- Maksimum 400 bal
- Qapalı, açıq və ətraflı suallar üçün dəqiq hesablama

### 3. Yaş Hesablayıcı
- Dəqiq yaş hesablaması (il, ay, gün)
- Ömür boyu yaşanılan günlərin sayı
- Növbəti ad gününə qalan günlər

### 4. Akademik Məlumatlar
- Əlaçı olmaq üçün tələblər
- Faydalı akademik qaydalar

### 5. Sürətli Linklər
- BDU rəsmi web saytı
- SemsLogin tələbə portalı
- Digər faydalı resurslar

## 📱 PWA Xüsusiyyətləri

✅ Offline işləyir (Service Worker)  
✅ Ana ekrana əlavə edilə bilər  
✅ Quraşdırıla bilər (Install)  
✅ Avtomatik cache yeniləməsi  
✅ Mobil-friendly dizayn  

## 🚀 Deployment

### Render.com üçün

1. GitHub repository yaradın
2. Render.com-da yeni Static Site yaradın
3. Repository-ni seçin
4. Build Command: boş saxlayın (statik fayllar)
5. Publish Directory: `/` (root)
6. Deploy edin

### Lokal test

Sadəcə `index.html` faylını brauzerda açın və ya lokal server işlədin:

```bash
# Python HTTP server
python3 -m http.server 8000

# Node.js http-server (npx ilə)
npx http-server
```

## 📂 Fayl Strukturu

```
webapp/
├── index.html              # Ana HTML faylı
├── styles.css             # CSS stilləri
├── app.js                 # JavaScript funksiyaları
├── service-worker.js      # PWA Service Worker
├── manifest.json          # PWA Manifest
├── icon-192.png          # 192x192 ikon
├── icon-512.png          # 512x512 ikon
└── README.md             # Bu fayl
```

## 🔧 Developer üçün qeydlər

### Məlumat əlavə etmək

**index.html** faylında `melumatPage` bölməsində:

```html
<div class="info-card">
    <h3>📌 Başlıq</h3>
    <p>Məlumat mətni buraya yazılır.</p>
</div>
```

### Link əlavə etmək

**index.html** faylında `linklerPage` bölməsində:

```html
<a href="URL_BURAYA" target="_blank" class="link-card">
    <div class="link-icon">İKON_BURAYA</div>
    <div class="link-content">
        <h3>Başlıq</h3>
        <p>Açıqlama</p>
    </div>
</a>
```

### Cache versiyasını yeniləmək

**service-worker.js** faylında:

```javascript
const CACHE_VERSION = 'v1.0.1'; // Versiyanı artırın
```

Versiya dəyişdirildikdə köhnə cache-lər avtomatik silinir və yeni fayllar yüklənir.

## 📊 Hesablama Düsturları

### Buraxılış (9-cu və 11-ci sinif)

- **Azərbaycan dili**: `2.5 × (2 × açıq + qapalı)`
- **Riyaziyyat**: `3.125 × (2 × ətraflı + açıq + qapalı)`
- **Xarici dil**: `2.7 × (2 × açıq + qapalı)`

### Blok İmtahanı

- **Qapalı suallar**: `(düzgün - 0.25 × səhv) × 3.03`
- **Açıq/Ətraflı**: `(açıq + 2 × ətraflı) × 3.03`

## 🎨 Rəng Sxemi

- Primary: `#4F46E5` (Indigo)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Danger: `#EF4444` (Red)

## 📄 Lisenziya

Bu layihə təhsil məqsədləri üçün hazırlanmışdır.

## 📞 Əlaqə

WhatsApp: +994559406018

---

**ən ucuz sərbəst iş hazırlanması** 📚
