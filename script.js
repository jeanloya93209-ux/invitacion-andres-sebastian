var URL_SHEETS = "https://script.google.com/macros/s/AKfycbx4k9DiO897cOB4h1Yy6qL9s7-TOjhAHXeu4P2DQbepXrBPjK7m8EDqiw12xYc0vh4cfg/exec";

var v = {
  k: 0,
  a: 0
};


// BOTONES + Y -
document.querySelectorAll(".step button[data-t]").forEach(function(btn) {

  btn.addEventListener("click", function() {

    var tipo = btn.dataset.t;
    var cambio = Number(btn.dataset.d);

    if (tipo === "k") {
      v.k = Math.max(0, Math.min(20, v.k + cambio));
      document.getElementById("k").textContent = v.k;
    }

    if (tipo === "a") {
      v.a = Math.max(0, Math.min(20, v.a + cambio));
      document.getElementById("a").textContent = v.a;
    }

    actualizarTotal();

  });

});


// ACTUALIZAR TOTAL
function actualizarTotal() {

  var total = v.k + v.a;

  document.getElementById("tot").textContent =
    "Total: " + total + (total === 1 ? " persona" : " personas");

}


// BOTÓN ENVIAR
document.getElementById("go").addEventListener("click", function() {

  var nombre = document.getElementById("nm").value.trim();

  if (nombre === "") {

    document.getElementById("msg").textContent =
      "Escribe tu nombre o familia.";

    return;
  }

  if (v.k + v.a === 0) {

    document.getElementById("msg").textContent =
      "Agrega al menos una persona.";

    return;
  }


  // CREAR FORMULARIO
  var form = document.createElement("form");

  form.method = "POST";
  form.action = URL_SHEETS;
  form.target = "enviarDatos";


  // NOMBRE
  var inputNombre = document.createElement("input");

  inputNombre.type = "hidden";
  inputNombre.name = "nombre";
  inputNombre.value = nombre;

  form.appendChild(inputNombre);


  // NIÑOS
  var inputNinos = document.createElement("input");

  inputNinos.type = "hidden";
  inputNinos.name = "ninos";
  inputNinos.value = v.k;

  form.appendChild(inputNinos);


  // ADULTOS
  var inputAdultos = document.createElement("input");

  inputAdultos.type = "hidden";
  inputAdultos.name = "adultos";
  inputAdultos.value = v.a;

  form.appendChild(inputAdultos);


  // ASISTENCIA
  var inputAsistencia = document.createElement("input");

  inputAsistencia.type = "hidden";
  inputAsistencia.name = "asistencia";
  inputAsistencia.value = "Sí";

  form.appendChild(inputAsistencia);


  // AGREGAR FORMULARIO
  document.body.appendChild(form);


  // ENVIAR
  form.submit();


  // MOSTRAR MENSAJE
  document.getElementById("msg").textContent =
    "¡Confirmación enviada correctamente!";


  // BORRAR FORMULARIO
  setTimeout(function() {
    form.remove();
  }, 1000);

});