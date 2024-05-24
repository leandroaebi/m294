/**
 * Funktion zum Abrufen der Kundendaten
 * 
 * @async
 * @function GetData
 * @description Ruft die Kundendaten von der API ab und erstellt eine Tabelle mit den Daten.
 * @returns {void}
 * 
 * @author Leandro Aebi
 */
async function GetData() {
  const request = await fetch('http://192.168.1.92:8080/library/customer');
  const response = await request.json();
  createTable(response);
}

/**
* Funktion zum Erstellen einer Tabelle mit Kundendaten
* 
* @function createTable
* @description Erstellt eine Tabelle und füllt sie mit den übergebenen Kundendaten.
* @param {Array} data - Die Kundendaten, die in die Tabelle eingefügt werden sollen.
* @returns {void}
*/
function createTable(data) {
  const tableContainer = document.getElementById('table-container');
  
  // Erstelle das Tabellenelement
  const table = document.createElement('table');
  table.classList.add('data-table');
  
  // Erstelle Tabellenkopf
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['KundenNr', 'Vorname', 'Nachname'];
  
  headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Erstelle Tabellenkörper
  const tbody = document.createElement('tbody');
  
  data.forEach(item => {
      const row = document.createElement('tr');
      
      const cell1 = document.createElement('td');
      cell1.textContent = item.id;
      row.appendChild(cell1);
      
      const cell2 = document.createElement('td');
      cell2.textContent = item.firstname;
      row.appendChild(cell2);
      
      const cell3 = document.createElement('td');
      cell3.textContent = item.lastname;
      row.appendChild(cell3);
      
      row.onclick = () => {
          // Kundeninformationen in localStorage speichern
          localStorage.setItem('selectedCustomer', JSON.stringify(item));

          // Zur "kundeerstellen.html"-Seite weiterleiten
          window.location.href = 'kundenerstellen.html';
      };
      
      tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

// Daten abrufen und Tabelle erstellen
GetData();
