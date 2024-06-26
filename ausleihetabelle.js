/**
 * Funktion zum Abrufen der Daten von der API
 * 
 * @async
 * @function GetData
 * @description Ruft die Ausleihdaten von der API ab und erstellt eine Tabelle mit den erhaltenen Daten.
 * @returns {void}
 */
async function GetData() {
  const request = await fetch('http://192.168.1.92:8080/library/loan');
  const response = await request.json();
  createTable(response);
}

/**
* Funktion zum Erstellen einer Tabelle mit den Ausleihdaten
* 
* @function createTable
* @description Erstellt eine HTML-Tabelle mit den bereitgestellten Ausleihdaten und fügt sie in den DOM ein.
* @param {Array} data - Ein Array von Ausleihdaten, die in der Tabelle angezeigt werden sollen.
* @returns {void}
*/
function createTable(data) {
  const tableContainer = document.getElementById('table-container');
  
  // Create table element
  const table = document.createElement('table');
  table.classList.add('data-table');
  
  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Inventarnummer', 'Kundennummer', 'Rückgabedatum'];
  
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement('tbody');
  
  data.forEach(item => {
    const row = document.createElement('tr');
    
    const cell1 = document.createElement('td');
    cell1.textContent = item.medium.id;
    row.appendChild(cell1);
    
    const cell2 = document.createElement('td');
    cell2.textContent = item.customer.id;
    row.appendChild(cell2);
    
    const cell3 = document.createElement('td');
    // Format the date using the formatDate function
    cell3.textContent = formatDate(item.checkOut);
    row.appendChild(cell3);
    
    tbody.appendChild(row);

    row.onclick = () => {
      window.location.href = 'ausleihebearbeiten.html';
      localStorage.setItem('selectedLoan', JSON.stringify(item));
    };
    
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

/**
* Funktion zur Formatierung eines Datumsstrings
* 
* @function formatDate
* @description Formatiert einen Datumsstring im Format 'YYYY-MM-DD' in das Format 'DD-MM-YYYY'.
* @param {string} dateString - Der zu formatierende Datumsstring.
* @returns {string} Der formatierte Datumsstring.
*/
function formatDate(dateString) {
// Create a Date object from the provided date string
const date = new Date(dateString);
// Get the parts of the date (year, month, day)
const year = date.getFullYear();
// Add 1 to month because getMonth returns 0-indexed values
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad with leading zero if necessary
const day = date.getDate().toString().padStart(2, '0'); // Pad with leading zero if necessary
// Return the formatted date string
return `${day}-${month}-${year}`;
}

GetData();