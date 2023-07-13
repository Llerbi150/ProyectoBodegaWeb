function iniciarSesion() {
  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById("contrasena").value;

  if (usuario === "administrador" && contrasena === "1234") {
    // Redirigir al panel de administrador
    window.open("PanelAdministrador.html");
    alert("Haz Entrado");
    location.reload();
  } else if (usuario === "trabajador" && contrasena === "1234") {
    // Redirigir al panel de trabajador
    window.open("PanelTrabajador.html");
    alert("Haz Entrado");
    location.reload();
  } else {
    // Mostrar mensaje de error
    alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    location.reload();
  }
}
