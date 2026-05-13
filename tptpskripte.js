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
const savedTheme = localStorage.getItem('tema');
applyTheme(savedTheme === 'dark');

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('tema', isDark ? 'dark' : 'light');
        darkToggle.textContent = isDark ? '☀️' : '🌙';
    });
}