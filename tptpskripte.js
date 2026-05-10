/* Definicija varijabli - Kriterij 3 */
:root {
    --primarna-zelena: #2ecc71;
    --tamna-pozadina: #2c3e50;
    --svijetla-tekst: #ecf0f1;
    --razmak: 20px;
}

/* Osnovni layout - Flexbox za navigaciju */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--razmak);
    background-color: var(--primarna-zelena);
}

/* Grid za kartice - Kriterij 4 */
main {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 kolone na desktopu */
    gap: var(--razmak);
    padding: var(--razmak);
}

/* Responzivnost - Kriterij 5 */
@media (max-width: 900px) {
    main { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
    main { grid-template-columns: 1fr; }
    .layout-container { flex-direction: column; }
}

/* Hover efekti - Kriterij 6 */
.kartica:hover {
    transform: translateY(-5px);
    transition: 0.3s;
}