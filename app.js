// DATA ODIERNA
document.getElementById("data-odierna").textContent =
    new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// VARIABILI
let fascia = "giorno";
let settore = "TUTTI";

// TABS
document.getElementById("btn-giorno").onclick = () => switchFascia("giorno");
document.getElementById("btn-sera").onclick = () => switchFascia("sera");

function switchFascia(f) {
    fascia = f;
    document.getElementById("btn-giorno").classList.toggle("active", f === "giorno");
    document.getElementById("btn-sera").classList.toggle("active", f === "sera");
    caricaAttivita();
}

// FILTRI SETTORI
document.querySelectorAll(".pill").forEach(pill => {
    pill.onclick = () => {
        document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        settore = pill.dataset.sector;
        caricaAttivita();
    };
});

// DATI DI TEST (sostituibili con Google Sheet)
let attivita = [
    {
        nome: "Benvenuto MiniClub",
        settore: "VIK",
        fascia: "giorno",
        orario: "10:00 - 11:30"
    },
    {
        nome: "Torneo Ping Pong",
        settore: "TORNEI",
        fascia: "giorno",
        orario: "15:00"
    },
    {
        nome: "Spettacolo Serale",
        settore: "SPETTACOLI",
        fascia: "sera",
        orario: "21:30"
    }
];

// RENDER ATTIVITÀ
function caricaAttivita() {
    const contenitore = document.getElementById("attivita-container");
    const empty = document.getElementById("empty-state");

    contenitore.innerHTML = "";

    const filtrate = attivita.filter(a =>
        a.fascia === fascia &&
        (settore === "TUTTI" || a.settore === settore)
    );

    if (filtrate.length === 0) {
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    filtrate.forEach(a => {
        const card = document.createElement("div");
        card.className = "card border-" + a.settore;

        card.innerHTML =
            `<div class="card-title">${a.nome}</div>
             <div class="card-time">${a.orario}</div>`;

        contenitore.appendChild(card);
    });
}

caricaAttivita();
