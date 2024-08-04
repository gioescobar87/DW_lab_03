
document.addEventListener("DOMContentLoaded", () => {
  const caja = document.getElementById("caja");
  const botones = document.querySelectorAll(".boton");

  let valorActual = "0";
  let valorAnterior = "";
  let operador = "";
  let resetear = false;

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const valor = boton.id;
      console.log(valor);
      if (boton.classList.contains("numero")) {
        validaNumero(valor);
      } else if (boton.classList.contains("operador")) {
        validaOperador(valor);
      } else if (boton.classList.contains("funcion")) {
        validaFuncion(valor);
      }

      actualizarInput();
    });
  });

  function validaNumero(valor) {
    if (valorActual === "0" || resetear) {
      valorActual = valor;
      resetear = false;
    }
    else {
      valorActual += valor;
    }
  }

  function validaOperador(valor) {
    if (operador && !resetear) {
      calcular();
    }
    operador = valor;
    valorAnterior = valorActual;
    resetear = true;
  }

  function calcular() {
    if (operador && valorAnterior !== "") {
      const anterior = parseFloat(valorAnterior);
      const actual = parseFloat(valorActual);
      switch (operador) {
        case "suma":
          valorActual = (anterior + actual).toString();
          break;
        case "resta":
          valorActual = (anterior - actual).toString();
          break;
        case "multiplica":
          valorActual = (anterior * actual).toString();
          break;
        case "divide":
          if (actual != 0) {
            valorActual = (anterior / actual).toString();
            break;
          } else {
            valorActual = "División de cero";
          }
          break;
      }
    }
    resetear = true;
  }

  function actualizarInput() {
    caja.value = valorActual;
  }

  function validaFuncion(valor) {
    switch (valor) {
      case "limpiar":
        valorActual = "0";
        valorAnterior = "";
        operador = "";
        break;
      case "borrar":
        if (valorActual.length > 1) {
          valorActual = valorActual.slice(0, -1);
        } else {
          valorActual = "0";
        }
        break;
      case "porcentaje":
        console.log(valorActual);
        valorActual = (parseFloat(valorActual) / 100).toString();
        console.log(valorActual);
        break;
      case "negacion":
        valorActual = (parseFloat(valorActual) * -1).toString();
        break;
      case "decimal":
        if (!valorActual.includes(".")) {
          valorActual += ".";
        }
        break;
      case "igual":
        calcular();
        operador = "";
        break;
      default:
        break;
    }
  }
});