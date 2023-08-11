
var cedulaEncriptada= "";


let pacientesTratados = async () => {
  try {
    // Call listarPacientes and await its result
    const pacientes = await listarPacientes();

    let msg = "";
    if (pacientes != null && pacientes.length > 0) {
      
      msg += '<br>' +
        '<table class="pacientes">' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Cédula</th>' +
        '<th>Acciones</th>' +
        '</tr>';

      pacientes.forEach((paciente) => {
        
        localStorage.setItem("cedulaPaciente", paciente.cedula);
        msg +=
          '<tr>' +
          '<td>' + paciente.nombre + '</td>' +
          '<td>' + paciente.cedula + '</td>' +
          '<td>' +
          '<a href="info-pacientes.html" onclick="llenarInfoPaciente()"type="button">' +
          '<img src="../img/logo.jpg" class="actualizar"/>' +
          '</a>' +
          '<a href="InhabilitarPaciente.html" type="button">' +
          '<img src="../img/nefrologo.png" class="actualizar"/>' +
          '</a>' +
          '</td>' +
          '</tr>';
      });
    } else {
      msg += '<br>' +
        '<table class="pacientes">' +
        '<tr>' +
        '<th>Nombre</th>' +
        '<th>Cédula</th>' +
        '<th>Acciones</th>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="3">' + "No hay pacientes Registrados" + '</td>' +
        '</tr>';
    }
    msg += '</table>';
    document.getElementById("pacientes").innerHTML = msg;
  } catch (error) {
    console.error("Error in pacientesTratados:", error);
  }
};

// Call the pacientesTratados function to populate the table
pacientesTratados();