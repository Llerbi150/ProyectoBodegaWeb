// Establecer el tiempo de inactividad deseado en milisegundos (por ejemplo, 10 minutos)
var tiempoInactividad = 5 * 60 * 1000; // 10 segundos

// Variable para almacenar el temporizador de inactividad
var temporizadorInactividad;

// Función para iniciar el temporizador de inactividad
function iniciarTemporizadorInactividad() {
  // Reiniciar el temporizador si ya está en marcha
  if (temporizadorInactividad) {
    clearTimeout(temporizadorInactividad);
  }

  // Iniciar el temporizador de inactividad
  temporizadorInactividad = setTimeout(redirigirALogin, tiempoInactividad);
}

// Función para redirigir a la página de inicio de sesión
function redirigirALogin() {
  // Aquí puedes realizar la redirección a la página de inicio de sesión
  window.location.href = "indexLogin.html";
}

// Evento para detectar la actividad del usuario
document.addEventListener("mousemove", iniciarTemporizadorInactividad);
document.addEventListener("keypress", iniciarTemporizadorInactividad);

// Iniciar el temporizador de inactividad al cargar la página
iniciarTemporizadorInactividad();
