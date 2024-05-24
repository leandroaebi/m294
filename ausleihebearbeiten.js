/**
 * Funktion zur Durchführung einer Ausleihe
 * 
 * @async
 * @function performLoan
 * @description Führt eine Ausleihe durch, indem es die Daten vom Formular abruft und eine POST-Anfrage an den Server sendet.
 * @returns {void}
 * @author Aebi Leandro
 */
async function performLoan() {
    // Werte aus den Eingabefeldern abrufen
    const customerId = document.getElementById('customerId').value;
    const inventoryId = document.getElementById('itemId').value;

    // Ausleihdaten erstellen
    const loanData = {
        customer: { id: customerId },
        medium: { id: inventoryId }
    };

    console.log(JSON.stringify(loanData));
    // Anfrage an den Server senden
    const response = await fetch(`http://192.168.1.92:8080/library/loan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanData)
    });

    if (response.ok) {
        alert('Ausleihe erfolgreich durchgeführt!');
        // Ansicht ändern nach erfolgreicher Ausleihe
        window.location.href = 'ausleihetabelle.html';  // Gehe zu der Seite, die die Ausleihen anzeigt
    } else {
        alert('Ausleihe fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

/**
 * Lädt die Daten einer ausgewählten Ausleihe beim Laden der Seite und füllt die Eingabefelder aus
 * 
 * @function
 * @description Lädt die ausgewählten Ausleihdaten aus dem localStorage und füllt die Formularfelder damit aus.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    const loan = JSON.parse(localStorage.getItem('selectedLoan'));
    if (loan) {
        document.getElementById('customerId').value = loan.customer.id;
        document.getElementById('itemId').value = loan.medium.id;
    }
});

/**
 * Funktion zur Aktualisierung einer Ausleihe
 * 
 * @async
 * @function performUpdateLoan
 * @description Aktualisiert eine bestehende Ausleihe durch das Senden einer PUT-Anfrage an den Server.
 * @returns {void}
 */
async function performUpdateLoan() {
    const loan = JSON.parse(localStorage.getItem('selectedLoan'));
    if (!loan) {
        alert('Keine Ausleihe zum Aktualisieren gefunden.');
        return;
    }

    const id = loan.id;
    const loanData = {
        itemid: document.getElementById('itemId').value,
        customerid: document.getElementById('customerId').value,
    };

    const response = await fetch(`http://192.168.1.92:8080/library/loan/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanData)
    });

    console.log(loanData);
    if (response.ok) {
        alert('Ausleihe erfolgreich aktualisiert!');
        window.location.href = 'ausleihetabelle.html'; // Gehe zur Ausleihetabelle
    } else {
        alert('Aktualisierung der Ausleihe fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

/**
 * Funktion zum Löschen einer Ausleihe
 * 
 * @async
 * @function deleteMedium
 * @description Löscht eine Ausleihe durch das Senden einer DELETE-Anfrage an den Server.
 * @returns {void}
 */
async function deleteMedium() {
    const loan = JSON.parse(localStorage.getItem('selectedLoan'));
    if (!loan) {
        alert('Keine Ausleihe zum Löschen gefunden.');
        return;
    }

    const id = loan.id;
    console.log(id);

    const response = await fetch(`http://192.168.1.92:8080/library/medium/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Ausleihe erfolgreich gelöscht!');
        window.location.href = 'ausleihetabelle.html'; // Gehe zur Ausleihetabelle
    } else {
        alert('Löschen der Ausleihe fehlgeschlagen.');
    }
}



