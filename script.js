var URL_SHEETS = "https://script.google.com/macros/s/AKfycbx4k9DiO897cOB4h1Yy6qL9s7-TOjhAHXeu4P2DQbepXrBPjK7m8EDqiw12xYc0vh4cfg/exec";

var v = { k: 0, a: 0 };

var tot = document.getElementById("tot");
var msg = document.getElementById("msg");
var nombre = document.getElementById("nm");
var boton = document.getElementById("go");

function actualizarTotal() {
  var n = v.k + v.a;
  tot.textContent = "Total: " + n + (n === 1 ? " persona" : " personas");
}

// BOTONES + Y -
document.querySelectorAll(".step button[data-t]").forEach(function (btn) {
  btn.addEventListener("click", function () {

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

// ENVIAR CONFIRMACIÓN A GOOGLE SHEETS
boton.addEventListener("click", function (e) {

  e.preventDefault();

  var quien = nombre.value.trim();
  var n = v.k + v.a;

  if (!quien) {
    msg.textContent = "Escribe tu nombre o familia.";
    nombre.focus();
    return;
  }

  if (n === 0) {
    msg.textContent = "Agrega al menos una persona.";
    return;
  }

  boton.disabled = true;
  msg.textContent = "Enviando...";

  // PREPARAMOS LOS DATOS PARA GOOGLE SHEETS
  var datos = new URLSearchParams();

  datos.append("nombre", quien);
  datos.append("ninos", v.k);
  datos.append("adultos", v.a);
  datos.append("asistencia", "Sí");

  fetch(URL_SHEETS, {
    method: "POST",
    mode: "no-cors",
    body: datos
  })
    .then(function () {
      msg.textContent = "¡Gracias! Tu confirmación fue enviada. 🎉";
    })
    .catch(function () {
      boton.disabled = false;
      msg.textContent = "No se pudo enviar. Intenta de nuevo.";
    });
});