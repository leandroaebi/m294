/**
 * Funktion zum Erstellen eines Kunden
 * 
 * @async
 * @function performKunde
 * @description Erstellt einen neuen Kunden und sendet die Daten an die API.
 * @returns {void}
 * @author Leandro Aebi
 */
async function performKunde() {
    const vorname = document.getElementById('vornameid').value;
    const nachname = document.getElementById('nachnameid').value;
    const geburtsdatum = document.getElementById('geburtsdatumid').value;
    const email = document.getElementById('emailid').value;
    const strasse = document.getElementById('strassenid').value;
    const zip = document.getElementById('zipid').value;
    const ort = document.getElementById('ortid').value;

    // Kundendaten speichern
    const kundenData = {
        firstname: vorname,
        lastname: nachname,
        birthdate: geburtsdatum,
        email: email,
        street: strasse,
        zip: zip,
        city: ort
    };

    // POST Funktion um einen neuen Kunden zu erstellen
    const response = await fetch('http://192.168.1.92:8080/library/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(kundenData)
    });

    if (response.ok) {
        alert('Kunde erfolgreich erstellt!');
        window.location.href = 'kundentabelle.html';
    } else {
        alert('Anlegen des Kunden fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

/**
 * Funktion zur Initialisierung der Kundendaten beim Laden der Seite
 * 
 * @function
 * @description Lädt die gespeicherten Kundendaten aus dem localStorage und füllt die Formularfelder damit aus.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    const customer = JSON.parse(localStorage.getItem('selectedCustomer'));
    if (customer) {
        document.getElementById('vornameid').value = customer.firstname;
        document.getElementById('nachnameid').value = customer.lastname;
        document.getElementById('geburtsdatumid').value = formatDate(customer.birthdate);
        document.getElementById('emailid').value = customer.email;
        document.getElementById('strassenid').value = customer.street;
        document.getElementById('zipid').value = customer.zip;
        document.getElementById('ortid').value = customer.city;
    }
});

/**
 * Funktion zum Aktualisieren eines Kunden
 * 
 * @async
 * @function performUpdateKunde
 * @description Aktualisiert die Daten eines bestehenden Kunden und sendet die aktualisierten Daten an die API.
 * @returns {void}
 */
async function performUpdateKunde() {
    const customer = JSON.parse(localStorage.getItem('selectedCustomer'));
    const id = customer.id;

    const kundenData = {
        firstname: document.getElementById('vornameid').value,
        lastname: document.getElementById('nachnameid').value,
        birthdate: document.getElementById('geburtsdatumid').value,
        email: document.getElementById('emailid').value,
        street: document.getElementById('strassenid').value,
        zip: document.getElementById('zipid').value,
        city: document.getElementById('ortid').value
    };

    const response = await fetch(`http://192.168.1.92:8080/library/customer/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(kundenData)
    });

    if (response.ok) {
        alert('Kunde erfolgreich aktualisiert!');
        window.location.href = 'kundentabelle.html'; // Gehe zur Kundentabelle
    } else {
        alert('Aktualisieren des Kunden fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

/**
 * Funktion zum Löschen eines Kunden
 * 
 * @async
 * @function submitDelete
 * @description Löscht einen bestehenden Kunden anhand der ID und sendet die Anfrage an die API.
 * @returns {void}
 */
async function submitDelete() {
    const customer = JSON.parse(localStorage.getItem('selectedCustomer'));
    const id = customer.id;

    const response = await fetch(`http://192.168.1.92:8080/library/customer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Kunde erfolgreich gelöscht!');
        localStorage.removeItem('selectedCustomer');
        window.location.href = 'kundentabelle.html'; // Gehe zur Kundentabelle
    } else {
        alert('Löschen des Kunden fehlgeschlagen.');
    }
}

/**
 * Funktion zur Formatierung eines Datumsstrings
 * 
 * @function formatDate
 * @description Formatiert einen Datumsstring in das Format YYYY-MM-DD.
 * @param {string} dateString - Der Datumsstring, der formatiert werden soll.
 * @returns {string} Der formatierte Datumsstring.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
