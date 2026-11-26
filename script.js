// Buscar los elementos que vamos a utilizar.
const formulario = document.getElementById("formulario");
const temperatura = document.getElementById("temperatura");
const unidadOrigen = document.getElementById("unidadOrigen");
const unidadDestino = document.getElementById("unidadDestino");
const btnConvertir = document.getElementById("btnConvertir");
const resultado = document.getElementById("resultado");

// Nombres de las unidades para mostrarlos en pantalla.
const nombresUnidades = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
};

// Valores mínimos permitidos para cada unidad.
const ceroAbsoluto = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
};

// Revisar que los tres campos tengan información.
function revisarCampos() {
    const tieneTemperatura = temperatura.value.trim() !== "";
    const tieneOrigen = unidadOrigen.value !== "";
    const tieneDestino = unidadDestino.value !== "";

    btnConvertir.disabled = !(tieneTemperatura && tieneOrigen && tieneDestino);
}

// Pasar cualquier unidad a Celsius.
function pasarACelsius(valor, unidad) {
    if (unidad === "fahrenheit") {
        return (valor - 32) * 5 / 9;
    }

    if (unidad === "kelvin") {
        return valor - 273.15;
    }

    return valor;
}

// Pasar desde Celsius a la unidad que se eligió.
function convertirDesdeCelsius(valor, unidad) {
    if (unidad === "fahrenheit") {
        return valor * 9 / 5 + 32;
    }

    if (unidad === "kelvin") {
        return valor + 273.15;
    }

    return valor;
}

// Hacer la conversión completa.
function convertirTemperatura(valor, origen, destino) {
    const valorEnCelsius = pasarACelsius(valor, origen);
    return convertirDesdeCelsius(valorEnCelsius, destino);
}

// Mostrar el mensaje en el espacio de resultado.
function mostrarMensaje(mensaje, esError) {
    resultado.textContent = mensaje;
    resultado.classList.toggle("error", esError);
}

// Revisar los campos cada vez que el usuario escribe o cambia una unidad.
temperatura.addEventListener("input", function () {
    revisarCampos();
    mostrarMensaje("El resultado aparecerá aquí.", false);
});

unidadOrigen.addEventListener("change", function () {
    revisarCampos();
    mostrarMensaje("El resultado aparecerá aquí.", false);
});

unidadDestino.addEventListener("change", function () {
    revisarCampos();
    mostrarMensaje("El resultado aparecerá aquí.", false);
});

// Ejecutar la conversión cuando se presiona el botón.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const valor = Number(temperatura.value);
    const origen = unidadOrigen.value;
    const destino = unidadDestino.value;

    if (temperatura.value.trim() === "" || Number.isNaN(valor)) {
        mostrarMensaje("Escribe una temperatura válida.", true);
        return;
    }

    // No se permiten temperaturas por debajo del cero absoluto.
    if (valor < ceroAbsoluto[origen]) {
        mostrarMensaje(
            "La temperatura no puede ser menor que el cero absoluto.",
            true
        );
        return;
    }

    const conversion = convertirTemperatura(valor, origen, destino);
    const conversionRedondeada = Number(conversion.toFixed(2));

    mostrarMensaje(
        valor + " " + nombresUnidades[origen] + " equivalen a " +
        conversionRedondeada + " " + nombresUnidades[destino] + ".",
        false
    );
});

// Estado inicial del botón.
revisarCampos();
