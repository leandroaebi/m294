/* Funktion zur Durchführung einer Ausleihe */
async function performLoan() {
    // Werte aus den Eingabefeldern abrufen
    const customerId = document.getElementById('customerId').value;
    const inventoryId = document.getElementById('itemId').value;

    // Ausleihdaten erstellen
    const loanData = {
        customer: {id: customerId},
        medium: {id: inventoryId}
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


document.addEventListener('DOMContentLoaded', () => {
    const loan = JSON.parse(localStorage.getItem('selectedLoan'));
    const customerId = loan.customer.id;
    const itemId = loan.medium.id;
    if (loan) {
        document.getElementById('customerId').value = customerId;
        document.getElementById('itemId').value = itemId;
    }
});



async function performUpdateLoan() {  
    const loan = JSON.parse(localStorage.getItem('selectedLoan'));

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
        alert('Medium erfolgreich aktualisiert!');
        window.location.href = 'mediumtabelle.html'; // Gehe zur Medientabelle
    } else {
        alert('Aktualisierung des Mediums fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

async function deleteMedium() {
    const loan = JSON.parse(localStorage.getItem('selectedLoan'));

    const id = loan.id;
    console.log(id);

    const response = await fetch(`http://192.168.1.92:8080/library/medium/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Medium erfolgreich gelöscht!');
        window.location.href = 'index.html'; // Gehe zur Medientabelle
    } else {
        alert('Löschen des Mediums fehlgeschlagen.');
    }
}



