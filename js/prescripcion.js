
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia a los elementos del DOM
    var filtroInput = document.getElementById('filtro-paciente');
    //var btnFiltrar = document.getElementById('btn-filtrar');
    var tablaPacientes = document.getElementById('tabla-prescripciones-body');
    //var btnNuevo = document.getElementById('btn-nuevo');
    
    // Función para filtrar los pacientes por nombre
    function filtrarPacientes() {
      var filtro = filtroInput.value.toLowerCase();
  
      // Filtrar los pacientes según el valor del filtro
      var pacientesFiltrados = pacientesData.filter(function(paciente) {
        var nombreCompleto = paciente.nombre.toLowerCase() + ' ' + paciente.apellido.toLowerCase();
        return nombreCompleto.indexOf(filtro) !== -1;
      });
  
      // Actualizar la tabla con los pacientes filtrados
      actualizarTabla(pacientesFiltrados);
    }
  
    // Función para actualizar la tabla de pacientes
    function actualizarTabla(prescripciones) {
      // Limpiar el contenido actual de la tabla
      tablaPacientes.innerHTML = '';
  
      // Generar filas de la tabla con los pacientes
      prescripciones.forEach(function(prescripcion) {
        var row = document.createElement('tr');
        var nombresCell = document.createElement('td');
        nombresCell.textContent = prescripcion.paciente.nombre;
        var fechaInicio = document.createElement('td');
        fechaInicio.textContent = prescripcion.fecha;
        var fechaFin = document.createElement('td');
        fechaFin.textContent = prescripcion.fecha;
        var accionesCell = document.createElement('td');
        var verButton = document.createElement('button');
        verButton.textContent = 'Ver';
        verButton.className="btn btn-primary"
        var editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.className="ms-2 btn btn-warning"
        
  
        accionesCell.appendChild(verButton);
        accionesCell.appendChild(editarButton);
  
        row.appendChild(nombresCell);
        row.appendChild(fechaInicio);
        row.appendChild(fechaFin);
        row.appendChild(accionesCell);
  
        tablaPacientes.appendChild(row);
      });
    }
    
    // Agregar botón de filtrar
    //btnFiltrar.addEventListener('click', filtrarPacientes);
  
    // Redireccionar a agg-paciente.html para agregar el paciente 
    //btnNuevo.addEventListener('click', function() {
    //  window.location.href = 'agg-pacientes.html';
    //});
  
    // Obtener los datos de los pacientes al cargar la página
    async function obtenerPrescripciones() {
      const peticion = await fetch("http://localhost:8081/Medico/prescripciones/listPrescripciones", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      const prescripciones = await peticion.json();
      
      // Actualizar la tabla con los pacientes obtenidos de la base de datos
      actualizarTabla(prescripciones);
    }
  
    obtenerPrescripciones();
  });