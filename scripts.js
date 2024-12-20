<form id="liquidation-form">
    <label for="salary">Salario mensual (Ej: $10.000.000):</label>
    <input type="text" id="salary" placeholder="Ejemplo: $10.000.000" required><br><br>
    
    <label for="start-date">Fecha de inicio:</label>
    <input type="date" id="start-date" required><br><br>
    
    <label for="end-date">Fecha de fin:</label>
    <input type="date" id="end-date" required><br><br>
    
    <button type="submit">Calcular</button>
</form>

<table>
    <thead>
        <tr>
            <th>Concepto</th>
            <th>Valor</th>
        </tr>
    </thead>
    <tbody id="results-table-body">
        <!-- Resultados se agregarán aquí -->
    </tbody>
</table>

<script>
// Función para formatear el salario con el símbolo $ y la puntuación adecuada
function formatSalaryInput(input) {
    let value = input.value.replace(/[^\d]/g, ''); // Eliminar caracteres no numéricos
    if (value) {
        input.value = '$' + value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Añadir puntos de miles
    }
}

// Función para formatear valores con puntos de miles y símbolo $
function formatWithThousands(value) {
    const number = parseFloat(value);
    if (isNaN(number)) return '$0';
    return `$${new Intl.NumberFormat('es-CO').format(number)}`;
}

document.getElementById('salary').addEventListener('input', function () {
    formatSalaryInput(this); // Llamada cada vez que el usuario ingrese un valor en el campo de salario
});

document.getElementById('liquidation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Recuperar datos del formulario
    let salary = document.getElementById('salary').value.trim();
    salary = parseFloat(salary.replace(/[^\d.-]/g, '')) || 0; // Eliminar cualquier caracter no numérico y convertir a número
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
    const vacaciones = ((salary / 30) * (daysWorked / 360) * 15).toFixed(0);  // Liquidación de vacaciones
    const cesantias = ((salary / 30) * daysWorked).toFixed(0);  // Liquidación de cesantías
    const interesesCesantias = (cesantias * 0.12).toFixed(0);  // Intereses de cesantías

    // Actualizar resultados con formato adecuado
    const results = [
        { concept: 'Vacaciones', value: formatWithThousands(vacaciones) },
        { concept: 'Cesantías', value: formatWithThousands(cesantias) },
        { concept: 'Intereses de Cesantías', value: formatWithThousands(interesesCesantias) }
    ];
    
    // Actualizar tabla de resultados
    const resultsTableBody = document.getElementById('results-table-body');
    resultsTableBody.innerHTML = ''; // Limpiar los resultados previos
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.concept}</td><td>${result.value}</td>`;
        resultsTableBody.appendChild(row);
    });

    // Limpiar el formulario después de la acción (opcional)
    document.getElementById('liquidation-form').reset(); // Limpia los campos de entrada después de enviar
});
</script>
