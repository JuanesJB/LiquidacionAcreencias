document.getElementById('liquidation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve form data
    const employeeName = document.getElementById('employee-name').value;
    const contractType = document.getElementById('contract-type').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const terminationReason = document.getElementById('termination-reason').value;
    
    // Perform calculations (to be implemented)
    const results = [
        { concept: 'Vacaciones', value: '$0' },
        { concept: 'Cesantías', value: '$0' },
        { concept: 'Intereses de Cesantías', value: '$0' }
    ];
    
    // Update results table
    const resultsTableBody = document.getElementById('results-table-body');
    resultsTableBody.innerHTML = '';
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.concept}</td><td>${result.value}</td>`;
        resultsTableBody.appendChild(row);
    });
});
