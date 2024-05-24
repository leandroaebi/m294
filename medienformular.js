/* Funktion zur Durchführung einer Ausleihe */
async function performMedium() {
    // Werte aus den Eingabefeldern abrufen
    const autorId = document.getElementById('autorId').value;
    const titelId = document.getElementById('titelId').value;
    const genreId = document.getElementById('genreId').value;
    let fskId = document.getElementById('fskId').value;
    const eanid = document.getElementById('eanId').value;
    const locationId = document.getElementById('locationId').value;


    // Mediumdaten erstellen
    if (fskId == "") {
        fskId = null;
    } else if (autorId == "" || titelId == ""){
        alert('Anlegen des Mediums fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    } 
    const mediumData = {
            author: autorId,
            title: titelId,
            genre: genreId,
            fsk: fskId,
            ean: eanid,
            location: locationId
    }
    
    // Anfrage an den Server senden
    console.log(JSON.stringify(mediumData));
    const response = await fetch('http://192.168.1.92:8080/library/medium', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mediumData)
    });

    if (response.ok) {
        alert('Medium erfolgreich erstellt');
        // Ansicht ändern nach erfolgreicher Ausleihe
        window.location.href = 'index.html';  // Gehe zu der Seite, die die Ausleihen anzeigt
    } else {
        alert('Anlegen des Mediums fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const medium = JSON.parse(localStorage.getItem('selectedMedium'));
    if (medium) {
        document.getElementById('autorId').value = medium.author;
        document.getElementById('titelId').value = medium.title;
        document.getElementById('genreId').value = medium.genre;
        document.getElementById('fskId').value = medium.fsk || '';
        document.getElementById('eanId').value = medium.ean;
        document.getElementById('locationId').value = medium.location;
    }
});



async function performUpdateMedium() {
    const medium = JSON.parse(localStorage.getItem('selectedMedium'));

    const mediumData = {
        author: document.getElementById('autorId').value,
        title: document.getElementById('titelId').value,
        genre: document.getElementById('genreId').value,
        fsk: document.getElementById('fskId').value || null,
        ean: eanid,
        location: document.getElementById('locationId').value
    };

    const response = await fetch(`http://192.168.1.92:8080/library/medium/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mediumData)
    });

    if (response.ok) {
        alert('Medium erfolgreich aktualisiert!');
        window.location.href = 'mediumtabelle.html'; // Gehe zur Medientabelle
    } else {
        alert('Aktualisierung des Mediums fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
    }
}

async function deleteMedium() {
    const medium = JSON.parse(localStorage.getItem('selectedMedium'));

    const id = medium.id;
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



