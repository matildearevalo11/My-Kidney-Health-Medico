document.addEventListener('DOMContentLoaded', function() {
    var formulario = document.getElementById('formulario-paciente');
  
    // Obtener el identificador del paciente desde la URL (por ejemplo, usando ?id=123)
    var pacienteId = obtenerPacienteIdDesdeURL();
  
    // Obtener el paciente de la base de datos usando el pacienteId y completar los campos del formulario
    var paciente = obtenerPacienteDeBaseDeDatos(pacienteId);
    if (paciente) {
      document.getElementById('nombre').value = paciente.nombre;
      document.getElementById('documento').value = paciente.documento;
      document.getElementById('fecha').value = paciente.fecha;
      document.getElementById('eps').value = paciente.eps;
      document.getElementById('estatura').value = paciente.estatura;
      document.getElementById('edad').value = paciente.edad;
      document.getElementById('tiposangre').value = paciente.tiposangre;
      document.getElementById('rh').value = paciente.rh;
      document.getElementById('direccion').value = paciente.direccion;
      document.getElementById('telefono').value = paciente.telefono;
      document.getElementById('ocupacion').value = paciente.ocupacion;
    }
  
    // Escuchar el evento de envío del formulario
    formulario.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar el envío del formulario
  
      // Obtener los valores actualizados del formulario
      var nombre = getValue('nombre');
      var documento = getValue('documento');
      var fecha = getValue('fecha');
      var eps = getValue('eps');
      var estatura = getValue('estatura');
      var edad = getValue('edad');
      var tiposangre = getValue('tiposangre');
      var rh = getValue('rh');
      var direccion = getValue('direccion');
      var telefono = getValue('telefono');
      var ocupacion = getValue('ocupacion');
  
      // Actualizar el paciente en la base de datos usando el pacienteId y los nuevos valores
      actualizarPacienteEnBaseDeDatos(pacienteId, nombre, documento, fecha, eps, estatura, edad, tiposangre, rh, direccion, telefono, ocupacion);
  
      // Redirigir a la página de visualización del paciente
      window.location.href = 'info-paciente.html?documento=' + pacienteId;
    });
  });
  
  function getValue(elementId) {
    return document.getElementById(elementId).value;
  }
  
  function obtenerPacienteIdDesdeURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  function obtenerPacienteDeBaseDeDatos(pacienteId) {
    // Obtener el paciente de la base de datos usando el pacienteId
    // ...
    // Devolver el paciente encontrado o null si no existe
    // ...
  }
  
  function actualizarPacienteEnBaseDeDatos(pacienteId, nombre, documento, fecha, eps, estatura, edad, tiposangre, rh, direccion, telefono, ocupacion) {
    // Actualizar el paciente en la base de datos usando el pacienteId y los nuevos valores
  }
  