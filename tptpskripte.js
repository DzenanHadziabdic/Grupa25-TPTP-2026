const darkToggle = document.getElementById('darkModeToggle');

function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    if (darkToggle) {
        darkToggle.textContent = isDark ? '☀️' : '🌙';
        darkToggle.setAttribute('aria-label', isDark ? 'Prebaci na svjetli mod' : 'Prebaci na tamni mod');
    }
}

const savedTheme = localStorage.getItem('oieTheme');
applyTheme(savedTheme === 'dark');

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('oieTheme', isDark ? 'dark' : 'light');
        darkToggle.textContent = isDark ? '☀️' : '🌙';
    });
}

// 1. Ime i prezime: Samo slova (uključujući i naša č, ć, ž, š, đ), razmake i crtice (za dupla prezimena) ,uz pomoć AI
const imePrezimeRegex = /^[A-Za-zČčĆćŽžŠšĐđ\s-]+$/;

// 2. Telefon: Tačan format +387 xx xxx xxx ili +387 xx xx xxx (pokriva fiksne i mobilne u BiH) //pomoc AI
// Dozvoljava prostor za 2 ili 3 cifre u pozivnom, i grupacije od 2, 3 ili 4 cifre, odvojene razmakom
const telefonBiHRegex = /^\+387\s\d{2}\s\d{2,3}\s\d{3,4}$/;

// 3. Email: Lista dozvoljenih domena
const dozvoljeneDomene = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
const emailRegex = /^[\w.-]+@([\w.-]+\.[a-z]{2,})$/i;

const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

function setFieldError(inputId, errId, message) {
    const input = document.getElementById(inputId);
    const errEl = document.getElementById(errId);
    if (!input || !errEl) return;

    if (message) {
        input.classList.add('error');
        errEl.textContent = message;
    } else {
        input.classList.remove('error');
        errEl.textContent = '';
    }
}

function validateForm() {
    let isValid = true;

    // Ime
    const ime = document.getElementById('ime');
    if (!ime || ime.value.trim().length < 2) {
        setFieldError('ime', 'err-ime', 'Ime mora imati najmanje 2 znaka.');
        isValid = false;
    } else if (!imePrezimeRegex.test(ime.value.trim())) {
        setFieldError('ime', 'err-ime', 'Ime može sadržavati samo slova.');
        isValid = false;
    } else {
        setFieldError('ime', 'err-ime', '');
    }

    // Prezime
    const prezime = document.getElementById('prezime');
    if (!prezime || prezime.value.trim().length < 2) {
        setFieldError('prezime', 'err-prezime', 'Prezime mora imati najmanje 2 znaka.');
        isValid = false;
    } else if (!imePrezimeRegex.test(prezime.value.trim())) {
        setFieldError('prezime', 'err-prezime', 'Prezime može sadržavati samo slova.');
        isValid = false;
    } else {
        setFieldError('prezime', 'err-prezime', '');
    }

    // Email
    const email = document.getElementById('email');
    if (!email) {
        isValid = false;
    } else {
        const emailValue = email.value.trim();
        const match = emailValue.match(emailRegex);

        if (!match) {
            setFieldError('email', 'err-email', 'Unesite ispravnu email adresu (primjer@domena.com).');
            isValid = false;
        } else {
            // match[1] izvlači samo dio nakon '@' (npr. gmail.com)
            const domena = match[1].toLowerCase();
            if (!dozvoljeneDomene.includes(domena)) {
                setFieldError('email', 'err-email', 'Dozvoljeni su samo popularni email servisi (Gmail, Yahoo, Hotmail...).');
                isValid = false;
            } else {
                setFieldError('email', 'err-email', '');
            }
        }
    }

    // Telefon
    const telefon = document.getElementById('telefon');
    if (!telefon || !telefonBiHRegex.test(telefon.value.trim())) {
        setFieldError('telefon', 'err-telefon', 'Format telefona mora biti: +387 xx xxx xxx ili +387 xx xx xxxx');
        isValid = false;
    } else {
        setFieldError('telefon', 'err-telefon', '');
    }

    // Tema (select)
    const tema = document.getElementById('tema');
    if (!tema || tema.value === '') {
        setFieldError('tema', 'err-tema', 'Odaberite temu upita.');
        isValid = false;
    } else {
        setFieldError('tema', 'err-tema', '');
    }

    // Poruka (textarea)
    const poruka = document.getElementById('poruka');
    if (!poruka || poruka.value.trim().length < 10) {
        setFieldError('poruka', 'err-poruka', 'Poruka mora imati najmanje 10 znakova.');
        isValid = false;
    } else {
        setFieldError('poruka', 'err-poruka', '');
    }

    return isValid;
}

// Ostatak tvog koda za submitBtn, resetBtn i real-time validaciju ostaje POTPUNO ISTI.
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        if (validateForm()) {
            const ime = document.getElementById('ime').value.trim();
            const tema = document.getElementById('tema');
            const temaText = tema.options[tema.selectedIndex].text;

            const successMsg = document.getElementById('successMsg');
            if (successMsg) {
                successMsg.innerHTML = `
          ✅ Hvala, <strong>${ime}</strong>! Vaša poruka o temi "<em>${temaText}</em>" je uspješno poslana.
          Odgovorićemo Vam u najkraćem mogućem roku.
        `;
                successMsg.style.display = 'block';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Sakrij formu polja vizualno
            submitBtn.disabled = true;
            submitBtn.textContent = '✓ Poruka poslana';
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // Resetuj sva polja
        ['ime', 'prezime', 'email', 'telefon', 'poruka'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        const tema = document.getElementById('tema');
        if (tema) tema.value = '';

        // Očisti sve greške
        document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Sakrij success poruku
        const successMsg = document.getElementById('successMsg');
        if (successMsg) successMsg.style.display = 'none';

        // Re-enable submit button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Pošalji poruku';
        }
    });
}

// Real-time validacija (brisanje greške pri unosu)
['ime', 'prezime', 'email', 'telefon', 'poruka'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => {
            if (el.classList.contains('error')) {
                el.classList.remove('error');
                const errEl = document.getElementById('err-' + id);
                if (errEl) errEl.textContent = '';
            }
        });
    }
});
// Dark mode – localStorage pamćenje
/*const savedTheme = localStorage.getItem('tema');
applyTheme(savedTheme === 'dark');

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('tema', isDark ? 'dark' : 'light');
        darkToggle.textContent = isDark ? '☀️' : '🌙';
    });
}
    */

/* ===========================================
   DODATAK ZA NAVIGACIJU I INTERAKCIJU u sadrzaju
   =========================================== */

// 1. Hamburger meni za mobilne uređaje
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        // Promjena ikone iz ☰ u X
        hamburger.innerHTML = mobileNav.classList.contains('open') ? '&times;' : '&#9776;';
    });
}

// Zatvori mobilni meni kada se klikne na link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNav) mobileNav.classList.remove('open');
        if (hamburger) hamburger.innerHTML = '&#9776;';
    });
});


// 2. "Skoči na vrh" (Back to Top) dugme
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});


// 3. Aktivna klasa za Bookmark Navigaciju
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.bookmark-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


/* ===========================================
   LOGIKA ZA FAQ (Harmonika)
   =========================================== */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        const faqItem = btn.parentElement;
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


/* ===========================================
   NAPREDNE FUNKCIJE: Modali i Animacije
   =========================================== */

// 1. MODALI (Iskakući prozori)
const modalTriggers = document.querySelectorAll('.btn-more, .map-trigger');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault(); // Sprječava stranicu da skoči na vrh zbog href="#"
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Zabranjuje skrolanje pozadine
        }
    });
});

// Zatvaranje na X
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; 
    });
});

// Zatvaranje klikom izvan prozora
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// 2. FADE-IN ANIMACIJE NA SKROLANJE
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target); 
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});