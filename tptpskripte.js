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
// Uz pomoć Claude-a sam razumio regex email validaciju
const emailRegex = /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i;

// Regex za telefon: + na početku (opcionalno), cifre, razmaci, crtice
const telefonRegex = /^[+]?[\d\s\-]{7,20}$/;

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
    } else {
        setFieldError('ime', 'err-ime', '');
    }

    // Prezime
    const prezime = document.getElementById('prezime');
    if (!prezime || prezime.value.trim().length < 2) {
        setFieldError('prezime', 'err-prezime', 'Prezime mora imati najmanje 2 znaka.');
        isValid = false;
    } else {
        setFieldError('prezime', 'err-prezime', '');
    }

    // Email
    const email = document.getElementById('email');
    if (!email || !emailRegex.test(email.value.trim())) {
        setFieldError('email', 'err-email', 'Unesite ispravnu email adresu (primjer@domena.com).');
        isValid = false;
    } else {
        setFieldError('email', 'err-email', '');
    }

    // Telefon
    const telefon = document.getElementById('telefon');
    if (!telefon || !telefonRegex.test(telefon.value.trim())) {
        setFieldError('telefon', 'err-telefon', 'Telefon: samo cifre, razmaci, crtice i + (min. 7 znakova).');
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

// Zatvori mobilni meni kada se klikne na link (bitno za bookmark linkove)
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
        // Dugme se pojavljuje tek nakon što korisnik skrola 400px naniže
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});


// 3. Aktivna klasa za Bookmark Navigaciju
// Ovo označava dugme u bookmark-navu zavisno od toga u kojoj si sekciji
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

// 1. Hvatanje svih dugmića sa pitanjima
const faqQuestions = document.querySelectorAll('.faq-question');

// 2. Prolazak kroz svaki dugme
faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        // Pronađi glavni div kontejner za to specifično pitanje (faq-item)
        const faqItem = btn.parentElement;
        
        // Provjeri da li je trenutno kliknuti element već otvoren
        const isActive = faqItem.classList.contains('active');

        // Zatvori sve ostale otvorene FAQ stavke (da bude urednije)
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Ako pitanje na koje smo kliknuli NIJE bilo aktivno, otvori ga
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

/*
/* ===========================================
   NAPREDNE FUNKCIJE: Modali, Progres Traka i Animacije
   =========================================== */

// 1. SCROLL PROGRESS BAR (Traka na vrhu)
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// 2. MODALI (Iskakući prozori)
const btnsMore = document.querySelectorAll('.btn-more');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

// Otvaranje modala
btnsMore.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
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
        document.body.style.overflow = 'auto'; // Vraća skrolanje pozadine
    });
});

// Zatvaranje klikom izvan prozora
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// 3. FADE-IN ANIMACIJE NA SKROLANJE
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15, // Aktivira se kad je 15% elementa vidljivo
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target); // Animira se samo jednom
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});