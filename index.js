

async function GetData() {
  const request = await fetch('http://192.168.1.92:8080/library/medium');
  const response = await request.json();
  createTable(response);
}

function createTable(data) {
  const tableContainer = document.getElementById('table-container');
  
  // Create table element
  const table = document.createElement('table');
  table.classList.add('data-table');
  
  // Create table header
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
  
  // Create table body
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

       // Kundeninformationen in localStorage speichern
       localStorage.setItem('selectedMedium', JSON.stringify(item));

      window.location.href = 'medienformular.html';

          
  };
  
  tbody.appendChild(row);
});
  
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

localStorage.removeItem('selectedCustomer');
GetData()
   


