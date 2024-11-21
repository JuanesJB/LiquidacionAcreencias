document.getElementById('liquidation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Recuperar datos del formulario
    const salary = parseFloat(document.getElementById('salary').value) || 0; // Salario mensual
    const startDate = new Date(document.getElementById('start-date').value); // Fecha de inicio
    const endDate = new Date(document.getElementById('end-date').value); // Fecha de fin
    
    // Verificar si las fechas son válidas y la fecha de fin es posterior a la fecha de inicio
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert("Por favor, ingrese fechas válidas.");
        return;
    }

    if (endDate < startDate) {
        alert("La fecha de terminación no puede ser anterior a la fecha de inicio.");
        return;
    }

    // Calcular días trabajados
    const timeDifference = endDate - startDate; // Diferencia en milisegundos
    const daysWorked = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convertir a días

    // Evitar valores negativos si las fechas son demasiado cercanas
    if (daysWorked <= 0) {
        alert("El número de días trabajados no es válido.");
        return;
    }

    // Calcular conceptos
    const vacaciones = ((salary / 30) * (daysWorked / 360) * 15).toFixed(2);  // Liquidación de vacaciones
    const cesantias = ((salary / 30) * daysWorked).toFixed(2);  // Liquidación de cesantías
    const interesesCesantias = (cesantias * 0.12).toFixed(2);  // Intereses de cesantías

    // Actualizar resultados
    const results = [
        { concept: 'Vacaciones', value: `$${vacaciones}` },
        { concept: 'Cesantías', value: `$${cesantias}` },
        { concept: 'Intereses de Cesantías', value: `$${interesesCesantias}` }
    ];
    
    // Actualizar tabla de resultados
    const resultsTableBody = document.getElementById('results-table-body');
    resultsTableBody.innerHTML = '';
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.concept}</td><td>${result.value}</td>`;
        resultsTableBody.appendChild(row);
    });
});
