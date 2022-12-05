const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  nombre: /^[a-zA-Z0-9\_\-]{5,25}$/, // Letras, numeros, guion y guion_bajo, minimo 5 max 25
  apellido: /^[a-zA-Z0-9\_\-]{5,25}$/, //Letras, numeros, guion y guion_bajo, minimo 5 max 25
  direccion: /^(cll|cra|av|anv|trans)[a-zA-Z0-9\_\-\#\s]+$/, // comenzar por cll, cra, av ,anv ,trans y 1 a muchos para letras,guiones,guiones al piso, numerales y espacios
  cc: /^[a-zA-Z0-9]{11,20}$/, // solo puede contener letras y numeros, no caracteres extraños. Minimo 15 max 20 caracteres.
  password: /^[a-zA-Z0-9\#\%\/\&]{15,20}$/, // Puede contener letras, numeros y los siguientes caracteres: #,%,/& minimo 15 y maximo 20 caracteres.
  correo: /^[a-zA-Z0-9_.+-]{1,40}@[a-zA-Z0-9-]{1,40}\.[a-zA-Z0-9-.]{1,40}$/, // se dividio cada parte que compone el correo en 3 para que maximo sean 120 caracteres por parte
  telefono: /^\d{7,14}$/, // solo numneros de 7 a 14
};

const campos = {
  usuario: false,
  nombre: false,
  cc: false,
  password: false,
  correo: false,
  telefono: false,
  apellido: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "direccion":
      validarCampo(expresiones.direccion, e.target, "direccion");
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;

    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;

    case "cc":
      validarCampo(expresiones.cc, e.target, "cc");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["password"] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("terminos");
  if (
    campos.nombre &&
    campos.apellido &&
    campos.direccion &&
    campos.cc &&
    campos.telefono &&
    campos.password &&
    campos.correo &&
    terminos.checked
  ) {
    formulario.reset();

    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});
