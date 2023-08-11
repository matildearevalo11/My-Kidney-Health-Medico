document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Obtén el valor del campo de correo electrónico
  var email = document.getElementById("emailInput").value;

  // Realiza la validación del correo electrónico aquí
  if (!validateEmail(email)) {
    var statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = "El correo electrónico ingresado no es válido";
    statusMessage.classList.remove('success');
    statusMessage.classList.add('error');
    return; // Detiene la ejecución del código
  }

  // Realiza una solicitud al backend para enviar el correo electrónico de recuperación
  fetch('/recuperar-contrasena', {
    method: 'POST',
    body: JSON.stringify({ email }), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    // Comprueba si la respuesta del backend fue exitosa
    if (response.ok) {
      // Muestra el mensaje de éxito
      var statusMessage = document.getElementById("statusMessage");
      statusMessage.textContent = "Se ha enviado un correo electrónico de recuperación a " + email;
      statusMessage.classList.remove('error');
      statusMessage.classList.add('success');
    } else {
      // Muestra el mensaje de error
      throw new Error('Error en la solicitud');
    }
  })
  .catch(function(error) {
    console.error(error);
    // Muestra el mensaje de error
    var statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = "Ha ocurrido un error al enviar el correo electrónico de recuperación.";
    statusMessage.classList.remove('success');
    statusMessage.classList.add('error');
  });
});
function validateEmail(email) {
  // Expresión regular para validar el formato del correo electrónico
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}