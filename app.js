// ========================================
// PWA SERVICE WORKER REGISTRATION & AUTO UPDATE
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
                
                // Check for updates every 10 seconds
                setInterval(() => {
                    registration.update();
                }, 10000);
                
                // Listen for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker installed, force refresh
                            console.log('New version available! Updating...');
                            newWorker.postMessage({ action: 'skipWaiting' });
                        }
                    });
                });
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        
        // Reload page when new service worker takes control
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    });
}

// ========================================
// PWA INSTALL PROMPT (FIXED BOTTOM)
// ========================================

let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const iosInstallHint = document.getElementById('iosInstallHint');

// Check if iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

// Show iOS install hint if iOS and not installed
if (isIOS && !isInStandaloneMode && iosInstallHint) {
    iosInstallHint.style.display = 'flex';
    
    // Hide hint when user clicks close
    const closeBtn = iosInstallHint.querySelector('.close-ios-hint');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            iosInstallHint.style.display = 'none';
            localStorage.setItem('iosHintDismissed', 'true');
        });
    }
    
    // Check if previously dismissed
    if (localStorage.getItem('iosHintDismissed')) {
        iosInstallHint.style.display = 'none';
    }
}

// Handle Android/Chrome install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
        installBtn.style.display = 'flex';
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            if (outcome === 'accepted') {
                deferredPrompt = null;
                installBtn.style.display = 'none';
            }
        }
    });
}

// Hide install button if already installed
window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    if (installBtn) {
        installBtn.style.display = 'none';
    }
    if (iosInstallHint) {
        iosInstallHint.style.display = 'none';
    }
});

// ========================================
// NAVIGATION SYSTEM WITH SCROLL POSITION
// ========================================

const scrollPositions = {};
let navigationHistory = [];

function navigateTo(pageId, saveScroll = true) {
    // Save current scroll position
    if (saveScroll) {
        const currentPage = document.querySelector('.page.active');
        if (currentPage) {
            scrollPositions[currentPage.id] = window.scrollY;
        }
    }
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Restore scroll position if exists, otherwise scroll to top
        if (saveScroll && scrollPositions[pageId] !== undefined) {
            setTimeout(() => {
                window.scrollTo(0, scrollPositions[pageId]);
            }, 0);
        } else if (!saveScroll) {
            window.scrollTo(0, 0);
        }
    }
}

// ========================================
// BURAXILIŞ BAL HESABLAMA
// ========================================

let selectedBuraxilisSinif = null;
let buraxilisState = 'select'; // 'select', 'form'

function selectBuraxilisSinif(sinif) {
    selectedBuraxilisSinif = sinif;
    buraxilisState = 'form';
    document.getElementById('buraxilisSelect').style.display = 'none';
    document.getElementById('buraxilisForm').style.display = 'block';
    document.getElementById('buraxilisResult').style.display = 'none';
    
    // Clear inputs
    document.getElementById('azDili_qapali').value = '';
    document.getElementById('azDili_aciq').value = '';
    document.getElementById('riyaz_qapali').value = '';
    document.getElementById('riyaz_aciq').value = '';
    document.getElementById('riyaz_etrafli').value = '';
    document.getElementById('xarici_qapali').value = '';
    document.getElementById('xarici_aciq').value = '';
    
    // Don't scroll to top
}

function hesablaBuraxilis() {
    // Get values
    const azDili_qapali = parseInt(document.getElementById('azDili_qapali').value) || 0;
    const azDili_aciq = parseInt(document.getElementById('azDili_aciq').value) || 0;
    const riyaz_qapali = parseInt(document.getElementById('riyaz_qapali').value) || 0;
    const riyaz_aciq = parseInt(document.getElementById('riyaz_aciq').value) || 0;
    const riyaz_etrafli = parseInt(document.getElementById('riyaz_etrafli').value) || 0;
    const xarici_qapali = parseInt(document.getElementById('xarici_qapali').value) || 0;
    const xarici_aciq = parseInt(document.getElementById('xarici_aciq').value) || 0;

    // Validate
    if (azDili_qapali > 20 || azDili_aciq > 10 || 
        riyaz_qapali > 13 || riyaz_aciq > 5 || riyaz_etrafli > 7 ||
        xarici_qapali > 23 || xarici_aciq > 7) {
        alert('Maksimum dəyərləri keçməyin!');
        return;
    }

    // Calculate (formulas are same for both 9th and 11th grade)
    let azDiliBal = 2.5 * (2 * azDili_aciq + azDili_qapali);
    let riyazBal = 3.125 * (2 * riyaz_etrafli + riyaz_aciq + riyaz_qapali);
    let xariciBal = 2.7 * (2 * xarici_aciq + xarici_qapali);

    // Cap at 100
    azDiliBal = Math.min(azDiliBal, 100);
    riyazBal = Math.min(riyazBal, 100);
    xariciBal = Math.min(xariciBal, 100);

    const totalBal = azDiliBal + riyazBal + xariciBal;
    const finalTotal = Math.min(totalBal, 300); // Cap at 300

    // Display result
    displayBuraxilisResult(azDiliBal, riyazBal, xariciBal, finalTotal);
}

function displayBuraxilisResult(azDiliBal, riyazBal, xariciBal, totalBal) {
    let grade = '';
    let gradeClass = '';

    if (totalBal === 0) {
        grade = '0 BAL';
        gradeClass = 'grade-fail';
    } else if (totalBal >= 300) {
        grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
        gradeClass = 'grade-excellent';
    } else if (totalBal >= 250) {
        grade = 'ÇOX YAXŞI';
        gradeClass = 'grade-very-good';
    } else if (totalBal >= 160) {
        grade = 'YAXŞI';
        gradeClass = 'grade-good';
    } else if (totalBal >= 140) {
        grade = 'KAFİ';
        gradeClass = 'grade-sufficient';
    } else if (totalBal >= 120) {
        grade = 'ZƏİF';
        gradeClass = 'grade-weak';
    } else if (totalBal >= 60) {
        grade = 'YAXŞI OLACAQ';
        gradeClass = 'grade-weak';
    } else {
        grade = 'ZƏİF';
        gradeClass = 'grade-fail';
    }

    const resultHTML = `
        <div class="result-stats">
            <div class="stat-card">
                <div class="stat-label">Azərbaycan dili</div>
                <div class="stat-value">${azDiliBal.toFixed(2)}</div>
                <div class="stat-label">/ 100</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Riyaziyyat</div>
                <div class="stat-value">${riyazBal.toFixed(2)}</div>
                <div class="stat-label">/ 100</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Xarici dil</div>
                <div class="stat-value">${xariciBal.toFixed(2)}</div>
                <div class="stat-label">/ 100</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Ümumi bal</div>
            <div class="stat-value" style="font-size: 36px;">${totalBal.toFixed(2)} / 300</div>
        </div>
        <div class="result-grade ${gradeClass}">
            ${grade}
        </div>
    `;

    const resultDiv = document.getElementById('buraxilisResult');
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

function resetBuraxilis() {
    buraxilisState = 'select';
    document.getElementById('buraxilisSelect').style.display = 'block';
    document.getElementById('buraxilisForm').style.display = 'none';
    document.getElementById('buraxilisResult').style.display = 'none';
    selectedBuraxilisSinif = null;
}

// ========================================
// BLOK BAL HESABLAMA
// ========================================

let selectedBlokQrup = null;
let selectedAltQrup = null;
let blokFenler = [];
let blokState = 'qrupSelect'; // 'qrupSelect', 'altQrupSelect', 'form'

const blokData = {
    1: {
        name: '1-ci qrup',
        altQrup: {
            'Rİ': { name: 'Riyaziyyat-İnformatika', fenler: ['Riyaziyyat (150)', 'Fizika (150)', 'İnformatika (100)'] },
            'RK': { name: 'Riyaziyyat-Kimya', fenler: ['Riyaziyyat (150)', 'Fizika (150)', 'Kimya (100)'] }
        }
    },
    2: {
        name: '2-ci qrup',
        fenler: ['Riyaziyyat (150)', 'Tarix (150)', 'Coğrafiya (100)']
    },
    3: {
        name: '3-cü qrup',
        altQrup: {
            'DT': { name: 'Dil-Tarix', fenler: ['Azərbaycan dili (150)', 'Tarix (150)', 'Ədəbiyyat (100)'] },
            'TC': { name: 'Tarix-Coğrafiya', fenler: ['Azərbaycan dili (150)', 'Tarix (150)', 'Coğrafiya (100)'] }
        }
    },
    4: {
        name: '4-cü qrup',
        fenler: ['Biologiya (150)', 'Kimya (150)', 'Fizika (100)']
    }
};

function selectBlokQrup(qrup) {
    selectedBlokQrup = qrup;
    document.getElementById('blokQrupSelect').style.display = 'none';

    const qrupData = blokData[qrup];
    
    if (qrupData.altQrup) {
        // Show alt qrup selection
        blokState = 'altQrupSelect';
        const altQrupButtons = document.getElementById('altQrupButtons');
        altQrupButtons.innerHTML = '';
        
        for (let key in qrupData.altQrup) {
            const btn = document.createElement('button');
            btn.className = 'select-btn';
            btn.textContent = qrupData.altQrup[key].name;
            btn.onclick = () => selectAltQrup(key);
            altQrupButtons.appendChild(btn);
        }
        
        document.getElementById('blokAltQrupSelect').style.display = 'block';
    } else {
        // No alt qrup, directly show form
        blokState = 'form';
        blokFenler = qrupData.fenler;
        showBlokForm();
    }
}

function selectAltQrup(altQrup) {
    selectedAltQrup = altQrup;
    blokState = 'form';
    blokFenler = blokData[selectedBlokQrup].altQrup[altQrup].fenler;
    document.getElementById('blokAltQrupSelect').style.display = 'none';
    showBlokForm();
}

function showBlokForm() {
    let formHTML = '';
    
    blokFenler.forEach((fen, index) => {
        formHTML += `
            <div class="form-group">
                <label>${fen}</label>
                <div class="input-row">
                    <input type="number" id="blok_duzgun_${index}" min="0" max="22" placeholder="Düzgün qapalı (max 22)">
                    <input type="number" id="blok_sehv_${index}" min="0" max="22" placeholder="Səhv qapalı (max 22)">
                    <input type="number" id="blok_aciq_${index}" min="0" max="5" placeholder="Açıq (max 5)">
                    <input type="number" id="blok_etrafli_${index}" min="0" max="3" placeholder="Ətraflı (max 3)">
                </div>
            </div>
        `;
    });

    formHTML += '<button class="calculate-btn" onclick="hesablaBlok()">Hesabla</button>';
    formHTML += '<div id="blokResult" class="result-section" style="display: none;"></div>';

    document.getElementById('blokForm').innerHTML = formHTML;
    document.getElementById('blokForm').style.display = 'block';
}

function hesablaBlok() {
    const results = [];
    let totalBal = 0;

    blokFenler.forEach((fen, index) => {
        const duzgun = parseInt(document.getElementById(`blok_duzgun_${index}`).value) || 0;
        const sehv = parseInt(document.getElementById(`blok_sehv_${index}`).value) || 0;
        const aciq = parseInt(document.getElementById(`blok_aciq_${index}`).value) || 0;
        const etrafli = parseInt(document.getElementById(`blok_etrafli_${index}`).value) || 0;

        // Validate
        if (duzgun > 22 || sehv > 22 || aciq > 5 || etrafli > 3) {
            alert('Maksimum dəyərləri keçməyin!');
            return;
        }

        if (duzgun + sehv > 22) {
            alert('Qapalı sualların cəmi 22-dən çox ola bilməz!');
            return;
        }

        // Calculate closed questions score
        let qapaliBal = (duzgun - 0.25 * sehv) * 3.03;
        if (qapaliBal < 0) qapaliBal = 0;

        // Calculate open and detailed questions score
        const aciqEtrafliBal = (aciq + 2 * etrafli) * 3.03;

        // Total for this subject
        let fenBal = qapaliBal + aciqEtrafliBal;

        // Cap based on subject max (150 or 100)
        const maxBal = fen.includes('(150)') ? 150 : 100;
        fenBal = Math.min(fenBal, maxBal);

        results.push({ fen, bal: fenBal, max: maxBal });
        totalBal += fenBal;
    });

    // Cap total at 400
    totalBal = Math.min(totalBal, 400);

    displayBlokResult(results, totalBal);
}

function displayBlokResult(results, totalBal) {
    let grade = '';
    let gradeClass = '';

    if (totalBal === 0) {
        grade = '0 BAL';
        gradeClass = 'grade-fail';
    } else if (totalBal >= 400) {
        grade = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
        gradeClass = 'grade-excellent';
    } else if (totalBal >= 250) {
        grade = 'ÇOX YAXŞI';
        gradeClass = 'grade-very-good';
    } else if (totalBal >= 160) {
        grade = 'YAXŞI';
        gradeClass = 'grade-good';
    } else if (totalBal >= 140) {
        grade = 'KAFİ';
        gradeClass = 'grade-sufficient';
    } else if (totalBal >= 120) {
        grade = 'ZƏİF';
        gradeClass = 'grade-weak';
    } else if (totalBal >= 60) {
        grade = 'YAXŞI OLACAQ';
        gradeClass = 'grade-weak';
    } else {
        grade = 'ZƏİF';
        gradeClass = 'grade-fail';
    }

    let statsHTML = '<div class="result-stats">';
    results.forEach(result => {
        const fenName = result.fen.split('(')[0].trim();
        statsHTML += `
            <div class="stat-card">
                <div class="stat-label">${fenName}</div>
                <div class="stat-value">${result.bal.toFixed(2)}</div>
                <div class="stat-label">/ ${result.max}</div>
            </div>
        `;
    });
    statsHTML += '</div>';

    const resultHTML = `
        ${statsHTML}
        <div class="stat-card">
            <div class="stat-label">Ümumi bal</div>
            <div class="stat-value" style="font-size: 36px;">${totalBal.toFixed(2)} / 400</div>
        </div>
        <div class="result-grade ${gradeClass}">
            ${grade}
        </div>
    `;

    const resultDiv = document.getElementById('blokResult');
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

function resetBlok() {
    // Go back based on current state
    if (blokState === 'form') {
        // If in form, go back to alt qrup select (if exists) or qrup select
        if (selectedAltQrup !== null) {
            // Has alt qrup, go back to alt qrup select
            blokState = 'altQrupSelect';
            document.getElementById('blokForm').style.display = 'none';
            document.getElementById('blokAltQrupSelect').style.display = 'block';
            selectedAltQrup = null;
            blokFenler = [];
        } else {
            // No alt qrup, go back to qrup select
            blokState = 'qrupSelect';
            document.getElementById('blokForm').style.display = 'none';
            document.getElementById('blokQrupSelect').style.display = 'block';
            selectedBlokQrup = null;
            blokFenler = [];
        }
    } else if (blokState === 'altQrupSelect') {
        // If in alt qrup select, go back to qrup select
        blokState = 'qrupSelect';
        document.getElementById('blokAltQrupSelect').style.display = 'none';
        document.getElementById('blokQrupSelect').style.display = 'block';
        selectedBlokQrup = null;
    }
}

// ========================================
// YAŞ HESABLAYICI
// ========================================

function hesablaYas() {
    const dogumTarixi = document.getElementById('dogumTarixi').value;
    
    if (!dogumTarixi) {
        alert('Zəhmət olmasa doğum tarixinizi daxil edin!');
        return;
    }

    const today = new Date();
    const birthDate = new Date(dogumTarixi);

    if (birthDate > today) {
        alert('Doğum tarixi gələcəkdə ola bilməz!');
        return;
    }

    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total days lived
    const timeDiff = today - birthDate;
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate next birthday
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Display result
    displayYasResult(years, months, days, totalDays, daysToNextBirthday);
}

function displayYasResult(years, months, days, totalDays, daysToNextBirthday) {
    const resultHTML = `
        <div class="result-stats">
            <div class="stat-card">
                <div class="stat-label">Yaş</div>
                <div class="stat-value">${years}</div>
                <div class="stat-label">il ${months} ay ${days} gün</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Yaşadığınız günlər</div>
                <div class="stat-value">${totalDays.toLocaleString()}</div>
                <div class="stat-label">gün</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Növbəti ad gününə</div>
                <div class="stat-value">${daysToNextBirthday}</div>
                <div class="stat-label">gün qalıb</div>
            </div>
        </div>
    `;

    const resultDiv = document.getElementById('yasResult');
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

// ========================================
// CUSTOM BACK BUTTON HANDLERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Buraxilis back button
    const buraxilisBackBtn = document.querySelector('#buraxilisPage .back-btn');
    if (buraxilisBackBtn) {
        buraxilisBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (buraxilisState === 'form') {
                resetBuraxilis();
            } else {
                navigateTo('homePage');
            }
        });
    }

    // Blok back button
    const blokBackBtn = document.querySelector('#blokPage .back-btn');
    if (blokBackBtn) {
        blokBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (blokState !== 'qrupSelect') {
                resetBlok();
            } else {
                navigateTo('homePage');
            }
        });
    }
    
    // Other page back buttons
    const otherBackBtns = document.querySelectorAll('.back-btn:not(#buraxilisPage .back-btn):not(#blokPage .back-btn)');
    otherBackBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('homePage');
        });
    });
});
