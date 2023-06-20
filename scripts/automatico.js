// Obtén los elementos del DOM
var automaticoBtn = document.getElementById("automatico");
var selectTiempo = document.getElementById("selectTiempo");
var iniciarBtn = document.getElementById("iniciar");
var selSel = document.getElementById("selectTiempo");

var intervalId; // Almacena el ID del intervalo

function startAutomatico() {
  automaticoBtn.classList.add("active"); // Agrega la clase "active" para cambiar el color del botón
  iniciarBtn.disabled = true; // Deshabilita el botón "INICIAR"
  selSel.disabled= true; //select off

  // Obtiene el valor seleccionado del select y conviértelo a segundos
  var tiempoSeleccionado = parseInt(selectTiempo.value, 10) * 1000;

  // Ejecuta la función pickARandomNumber() cada cierto intervalo de tiempo
  intervalId = setInterval(pickARandomNumber, tiempoSeleccionado);
}

function stopAutomatico() {
  automaticoBtn.classList.remove("active"); // Remueve la clase "active" para restaurar el color del botón
  iniciarBtn.disabled = false; // Habilita el botón "INICIAR"
  selSel.disabled= false; //select on


  clearInterval(intervalId); // Detiene la ejecución automática
}

// Agrega el evento de clic al botón "Automatico"
// Agrega el evento de clic al botón "Automatico"
automaticoBtn.addEventListener("click", function() {
    if (automaticoBtn.classList.contains("active")) {
      stopAutomatico();
    } else {
      startAutomatico();
    }
  });