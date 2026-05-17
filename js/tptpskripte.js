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

/* ==========================================================================

   ZADUŽENJE ZA JS LOGIKU: Student Dženan Ćejvanović (sadrzaj.html)
   ========================================================================== */

/* ==========================================================================
   1. HAMBURGER MENI ZA MOBILNE UREĐAJE
   ========================================================================== */

// Selektujemo dugme (hamburger) i navigacijski meni iz HTML-a preko njihovih ID-ova
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Provjeravamo da li elementi uopšte postoje na stranici kako bismo spriječili JS greške
if (hamburger && mobileNav) {
    // Slušamo klik na hamburger dugme
    hamburger.addEventListener('click', () => {
        // Toggle metoda dodaje klasu 'open' ako ne postoji, ili je briše ako već postoji
        mobileNav.classList.toggle('open');
        
        /* AI DOKUMENTACIJA:
           Ovaj dio sa ternarnim operatorom za promjenu ikone sam optimizovao/la uz pomoć ChatGPT-a.
           Razumijem da: linija ispod mijenja tekstualni sadržaj dugmeta (innerHTML). Ako meni ima klasu 'open',
           ispisuje se znak '&times;' (što je simbol za X), a ako nema, vraća se početni simbol za meni '&#9776;' (tri crte).
        */
        hamburger.innerHTML = mobileNav.classList.contains('open') ? '&times;' : '&#9776;';
    });
}

// Selektujemo sve linkove unutar mobilne navigacije
document.querySelectorAll('.mobile-nav a').forEach(link => {
    // Kada korisnik klikne na bilo koji link u mobilnom meniju, meni se automatski zatvara
    link.addEventListener('click', () => {
        if (mobileNav) mobileNav.classList.remove('open');
        if (hamburger) hamburger.innerHTML = '&#9776;'; // Vraćamo ikonu na tri crte
    });
});


/* ==========================================================================
   2. "SKOČI NA VRH" (BACK TO TOP) DUGME
   ========================================================================== */

// Selektujemo dugme za povratak na vrh stranice
const backToTopBtn = document.getElementById('backToTop');

// Pratimo skrolovanje prozora (window) u realnom vremenu
window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        /* AI DOKUMENTACIJA:
           Logiku provjere pozicije skrola sam kreirao/la uz pomoć Claude AI alata.
           Razumijem da: 'window.scrollY' predstavlja broj piksela za koliko je stranica sklovana nadolje.
           Ako je korisnik sklovao više od 400px, dugmetu se dodaje klasa 'visible' (koja ga prikazuje kroz CSS),
           u suprotnom se ta klasa uklanja i dugme ponovo postaje nevidljivo.
        */
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});


/* ==========================================================================
   3. AKTIVNA KLASA ZA BOOKMARK NAVIGACIJU
   ========================================================================== */

// Selektujemo sve sekcije koje imaju definisan ID atribut i sve linkove unutar bookmark navigacije
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.bookmark-nav a');

window.addEventListener('scroll', () => {
    let current = '';

    /* AI DOKUMENTACIJA:
       Proračun aktivne sekcije tokom skrolovanja je napisan uz pomoć Claude alata jer je logika bila kompleksna.
       Razumijem da: petlja prolazi kroz sve sekcije i provjerava 'section.offsetTop' (udaljenost sekcije od vrha stranice).
       Oduzimanjem 120px pravimo "offset/bfer" kako bi se klasa promijenila malo prije nego što sekcija dotakne sam vrh ekrana.
       'pageYOffset' (ili scrollY) nam govori trenutnu poziciju korisnika.
    */
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 120) {
            current = section.getAttribute('id'); // Uzimamo ID sekcije u kojoj se korisnik trenutno nalazi
        }
    });

    // Prolazimo kroz sve linkove u navigaciji i ažuriramo njihovu klasu
    navLinks.forEach(link => {
        link.classList.remove('active'); // Prvo brišemo aktivnu klasu sa svih linkova
        // Ako href atribut linka sadrži ID trenutne sekcije, tom linku dodajemo klasu 'active'
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


/* ==========================================================================
   4. LOGIKA ZA FAQ (HARMONIKA / ACCORDION)
   ========================================================================== */

// Selektujemo sva FAQ pitanja (dugmad/naslove) na stranici
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        // Pronalazimo roditeljski element kliknutog dugmeta (to je div sa klasom .faq-item)
        const faqItem = btn.parentElement;
        // Provjeravamo da li je taj element već otvoren (da li ima klasu 'active')
        const isActive = faqItem.classList.contains('active');

        /* AI DOKUMENTACIJA:
           Ovaj dio koda koji pravi "pravu harmoniku" (zatvara sve ostale stavke kada se jedna otvori) implementiran je uz pomoć ChatGPT-a.
           Razumijem da: ova unutrašnja petlja prolazi kroz apsolutno sve '.faq-item' elemente na stranici i preventivno im 
           uklanja klasu 'active'. Na taj način osiguravamo da samo jedna stavka može biti otvorena u isto vrijeme.
        */
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Ako stavka na koju je kliknuto nije bila aktivna, sada joj dodajemo klasu 'active' da se otvori
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


/* ==========================================================================
   5. MODALNI PROZORI (ISKAKUĆI PROZORI ZA INTERAKTIVNE MAPE)
   ========================================================================== */

// Selektujemo sve okidače modala (dugmad i klikabilna područja na mapi) te same modale i dugmad za zatvaranje
const modalTriggers = document.querySelectorAll('.btn-more, .map-trigger');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        // e.preventDefault() zaustavlja podrazumijevano ponašanje pretraživača (npr. skakanje stranice na vrh zbog href="#")
        e.preventDefault(); 
        
        /* AI DOKUMENTACIJA:
           Povezivanje klikabilne mape sa modalnim prozorima preko custom data atributa predložio je ChatGPT.
           Razumijem da: 'trigger.getAttribute('data-modal')' čita vrijednost atributa (npr. 'modal-solar').
           Zatim preko tog ID-a pronalazimo tačan modal u HTML-u i dodajemo mu klasu 'show' koja ga kroz CSS čini vidljivim.
           'document.body.style.overflow = 'hidden'' privremeno isključuje skrolovanje glavne stranice dok je modal otvoren.
        */
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        }
    });
});

// Zatvaranje modalnog prozora klikom na dugme "X"
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // '.closest('.modal')' ide uzvodno kroz DOM stablo i pronalazi najbliži modal u kojem se to X dugme nalazi
        const modal = btn.closest('.modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Ponovo omogućavamo skrolovanje stranice
    });
});

// Zatvaranje modalnog prozora klikom bilo gdje van sadržaja modala (u tamnu pozadinu)
window.addEventListener('click', (e) => {
    // Ako je cilj klika (e.target) upravo cijeli modalni kontejner (pozadina), a ne prozor sa tekstom
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto'; // Vraćamo skrolovanje pozadine
    }
});


/* ==========================================================================
   6. FADE-IN ANIMACIJE NA SKROLANJE (INTERSECTION OBSERVER)
   ========================================================================== */

// Selektujemo sve elemente koji na sebi imaju klasu 'fade-in'
const faders = document.querySelectorAll('.fade-in');

// Postavke za Intersection Observer API
const appearOptions = {
    threshold: 0.15,          // Element se smatra vidljivim kada je 15% njegovog sadržaja u ekranu
    rootMargin: "0px 0px -50px 0px" // Animacija se okida 50px prije nego element u potpunosti uđe u vidno polje
};

/* AI DOKUMENTACIJA:
   Konstrukciju i konfiguraciju IntersectionObserver-a sam implementirao/la uz pomoć Claude AI alata, 
   jer je ovo napredna ugrađena JS funkcija za performanse koja mijenja stari 'scroll' event listener.
   Razumijem da: 'IntersectionObserver' konstantno posmatra elemente. Kada element uđe u ekran ('entry.isIntersecting' postane true),
   dodaje mu se CSS klasa 'visible' koja pokreće glatku tranziciju pojavljivanja. 
   Funkcija 'appearOnScroll.unobserve(entry.target)' je ključna jer prestaje posmatrati element nakon što se jednom pojavi, 
   što štedi memoriju pretraživača.
*/
const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return; // Ako element nije u ekranu, ne radi ništa
        } else {
            entry.target.classList.add('visible'); // Dodajemo klasu za pokretanje CSS animacije
            appearOnScroll.unobserve(entry.target); // Isključujemo dalje posmatranje tog elementa
        }
    });
}, appearOptions);

// Aktivacija posmatranja za svaki pojedinačni element sa klasom 'fade-in'
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        const filter = this.getAttribute('data-filter');
        
        // Pronađi prvu karticu te kategorije
        const targetCard = document.querySelector(`.card[data-category="${filter}"]`);
        
        if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});