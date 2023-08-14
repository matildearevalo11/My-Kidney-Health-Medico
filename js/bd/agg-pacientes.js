 let servidorAPI="http://localhost:8081/";

let validarPaciente = async () => {
  let documento = document.getElementById('documento').value;
  console.log(documento);

  const peticion = await fetch(servidorAPI + 'Medico/findAllPacientes', {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  });

  const pacientes = await peticion.json();
  console.log(pacientes);

  for (const paciente of pacientes) {
    let decryptedCedula = CryptoJS.AES.decrypt(paciente.cedula, 'clave_secreta').toString(CryptoJS.enc.Utf8);
    const cedulaCodificado = decodeURIComponent(decryptedCedula);
    console.log(cedulaCodificado);
    console.log(decryptedCedula);
    if (documento === cedulaCodificado) {
      return true;
    }
  }

  return false;
}
 
 let crearPaciente=async()=> {
  var  existe= await validarPaciente();
  console.log(existe);
      var nombre = document.getElementById('nombre').value;
      var documento = document.getElementById('documento').value;
      var fechaNacimiento = document.getElementById('fecha').value+'T02:45:05.101Z';
      var eps = document.getElementById('eps').value;
      var estatura = document.getElementById('estatura').value;
      var edad = document.getElementById('edad').value;
      var tiposangre = document.getElementById('tiposangre').value;
      var rh = document.getElementById('rh').value;
      var direccion = document.getElementById('direccion').value;
      var telefono = document.getElementById('telefono').value;
      var ocupacion = document.getElementById('ocupacion').value;
      var peso = document.getElementById('peso').value;
      var pesoSeco = document.getElementById('pesoseco').value;
     var  documentoEncriptado = CryptoJS.AES.encrypt(documento, 'clave_secreta').toString();
     var telefonoEncriptado = CryptoJS.AES.encrypt(telefono, 'clave_secreta').toString();
     var nombreEncriptado = CryptoJS.AES.encrypt(nombre, 'clave_secreta').toString();
     var diabetes = document.getElementById('diabetes').checked;
     var hipertension = document.getElementById('hipertension').checked;
  console.log(diabetes, hipertension);
      const pacienteInDto = {

       altura : estatura,
       cedula : documentoEncriptado,
       celular : telefonoEncriptado,
       contrasenia:documentoEncriptado,
       direccion : CryptoJS.AES.encrypt(direccion, 'clave_secreta').toString(),
       eps : CryptoJS.AES.encrypt(eps, 'clave_secreta').toString(),
       fechaNacimiento : fechaNacimiento,
       nombre : nombreEncriptado,
       ocupacion : CryptoJS.AES.encrypt(ocupacion, 'clave_secreta').toString(),
       peso : peso,
       pesoSeco : pesoSeco,   
       rh : rh,
       tipoSangre : CryptoJS.AES.encrypt(tiposangre, 'clave_secreta').toString(),
       diabetes:diabetes,
       hipertension:hipertension

      }

if(existe==false){
      let decryptedCedula = CryptoJS.AES.decrypt(pacienteInDto.nombre, 'clave_secreta').toString(CryptoJS.enc.Utf8);
console.log(decryptedCedula);
let decryptedNombre = CryptoJS.AES.decrypt(pacienteInDto.cedula, 'clave_secreta').toString(CryptoJS.enc.Utf8);
console.log(decryptedNombre);

      fetch(servidorAPI+"paciente/crearPaciente", {
        method: 'POST',
        headers: {
          "Accept":"application/json",
      "Content-Type":"application/json"
        },
        body: JSON.stringify(
          pacienteInDto
        )
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";
        pacienteForm.form.style.display = "none";

      })
    }
      else{
        $('#modal3').modal('show');
      }
 }

 let listarPacientes = async () => {
  try {
    const peticion = await fetch(servidorAPI + 'Medico/findAllPacientes', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (peticion.ok) {
      if (peticion.status === 200 || peticion.status === 204) {
        const pacientes = await peticion.json();

        // Map the patients array to decrypt each patient's cedula and nombre
        const pacientesDesencriptados = pacientes
        .filter(paciente => paciente.activo)
        .map(paciente => {
          let cedulaDesencriptada = CryptoJS.AES.decrypt(paciente.cedula, 'clave_secreta').toString(CryptoJS.enc.Utf8);
          let nombreDesencriptado = CryptoJS.AES.decrypt(paciente.nombre, 'clave_secreta').toString(CryptoJS.enc.Utf8);

          return {
            nombre: nombreDesencriptado,
            cedula: cedulaDesencriptada
          };
        });

        return pacientesDesencriptados; // Return the array of patients
      }
    } else {
      console.error("Error fetching patients:", peticion.status);
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};


let listarPacientesInactivos = async () => {
  try {
    const peticion = await fetch(servidorAPI + 'Medico/findAllPacientes', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (peticion.ok) {
      if (peticion.status === 200 || peticion.status === 204) {
        const pacientes = await peticion.json();

        // Map the patients array to decrypt each patient's cedula and nombre
        const pacientesDesencriptados = pacientes
        .filter(paciente => !paciente.activo)
        .map(paciente => {
          let cedulaDesencriptada = CryptoJS.AES.decrypt(paciente.cedula, 'clave_secreta').toString(CryptoJS.enc.Utf8);
          let nombreDesencriptado = CryptoJS.AES.decrypt(paciente.nombre, 'clave_secreta').toString(CryptoJS.enc.Utf8);

          return {
            nombre: nombreDesencriptado,
            cedula: cedulaDesencriptada
          };
        });

        return pacientesDesencriptados; // Return the array of patients
      }
    } else {
      console.error("Error fetching patients:", peticion.status);
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
  }
};

       
      
      

  
  