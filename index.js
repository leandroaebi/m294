/**
 * Funktion zum Abrufen der Mediendaten von der API
 * 
 * @async
 * @function GetData
 * @description Ruft die Mediendaten von der API ab und erstellt eine Tabelle mit den erhaltenen Daten.
 * @returns {void}
 * @author Leandro Aebi
 */
async function GetData() {
  const request = await fetch('http://192.168.1.92:8080/library/medium');
  const response = await request.json();
  createTable(response);
}

/**
 * Funktion zum Erstellen einer Tabelle mit den Mediendaten
 * 
 * @function createTable
 * @description Erstellt eine HTML-Tabelle mit den bereitgestellten Mediendaten und fügt sie in den DOM ein.
 * @param {Array} data - Ein Array von Mediendaten, die in der Tabelle angezeigt werden sollen.
 * @returns {void}
 */
function createTable(data) {
  const tableContainer = document.getElementById('table-container');
  
  //Erstellt ein Tabellenelemt
  const table = document.createElement('table');
  table.classList.add('data-table');
  
  // Erstellt die Tabellenüberschrift
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Inventarnummer', 'Titel', 'Autor'];
  
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  //Erstellt den Body der Tabelle
  const tbody = document.createElement('tbody');
  
  data.forEach(item => {
    const row = document.createElement('tr');
    
    const cell1 = document.createElement('td');
    cell1.textContent = item.id;
    row.appendChild(cell1);
    
    const cell2 = document.createElement('td');
    cell2.textContent = item.title;
    row.appendChild(cell2);
    
    const cell3 = document.createElement('td');
    cell3.textContent = item.author;
    row.appendChild(cell3);
    
    tbody.appendChild(row);

    row.onclick = () => {
       // Mediendaten in localStorage speichern
       localStorage.setItem('selectedMedium', JSON.stringify(item));
       window.location.href = 'medienformular.html';
    };
    
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

localStorage.removeItem('selectedCustomer');
GetData();
