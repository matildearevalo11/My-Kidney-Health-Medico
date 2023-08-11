document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencia a los elementos del DOM
  var filtroInput = document.getElementById('filtro-paciente');
  var btnFiltrar = document.getElementById('btn-filtrar');
  var tablaRecambios = document.getElementById('tabla-recambios');
  
  // Obtener los datos de los recambios desde la base de datos 
  // Suponiendo que los recambios se obtienen mediante la función fetchRecambios() 
  function obtenerRecambios() {
    return fetchRecambios().then(function(recambios) {
      return recambios;
    }).catch(function(error) {
      console.error(error);
      return [];
    });
  }
  
  // Función para filtrar los recambios por paciente
  function filtrarRecambios() {
    var filtro = filtroInput.value.toLowerCase();
    
    // Obtener los recambios desde la fuente de datos
    obtenerRecambios().then(function(recambiosData) {
      // Filtrar los recambios según el valor del filtro
      var recambiosFiltrados = recambiosData.filter(function(recambio) {
        return recambio.paciente.toLowerCase().indexOf(filtro) !== -1;
      });
      
      // Actualizar la tabla con los recambios filtrados
      actualizarTabla(recambiosFiltrados);
    });
  }
  
  // Función para actualizar la tabla de recambios
  function actualizarTabla(recambios) {
    // Limpiar el contenido actual de la tabla
    tablaRecambios.innerHTML = '';
    
    // Generar filas de la tabla con los recambios
    recambios.forEach(function(recambio) {
      var row = document.createElement('tr');
      var pacienteCell = document.createElement('td');
      pacienteCell.textContent = recambio.paciente;
      var fechaCell = document.createElement('td');
      fechaCell.textContent = recambio.fecha;
      var descripcionCell = document.createElement('td');
      descripcionCell.textContent = recambio.descripcion;
      
      row.appendChild(pacienteCell);
      row.appendChild(fechaCell);
      row.appendChild(descripcionCell);
      
      tablaRecambios.appendChild(row);
    });
  }
  
  // Agregar evento de clic al botón de filtrar
  btnFiltrar.addEventListener('click', filtrarRecambios);
  
  // Mostrar todos los recambios al cargar la página
  obtenerRecambios().then(function(recambiosData) {
    actualizarTabla(recambiosData);
  });
});
