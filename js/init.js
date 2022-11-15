const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

const emercadoAPI = "https://japceibal.github.io/emercado-api/";
//var dcmnt = new Window.prototype.document();
/* ----------------- Definicion de Funciones  ----------------- */
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
/* ------------------------------- */

/* --------- Funcion que almacena id del producto en almacenamiento local --------- */
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}
/* ---------- */
/* --------- Funcion que almacena id de la categoria en almacenamiento local --------- */
function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}
/* ---------- */

/* ------------- Funcion que muestra email del usuario guardado en localStorage REACT ------------- */
function loadUserEmail(cssSlctr) {
  if (location.pathname != "/index.html") {
    return (document.querySelector(cssSlctr).innerHTML =
      localStorage.getItem("userEmail"));
  }
}
/* ---------------------------------- */

/* --- Elimina email de local storage TERMINAR --- */
/* const deleteUserEmail = (logOutBtn) => {
  logOutBtn.addEventListener("click" => {
    localStorage.removeItem("userEmail")
  })
} */
/* --- Fin Elimina email de local storage TERMINAR --- */

/* --- Verificacion inicio sesion ---- */
const logInCheck = (elementToInsert) => {
  if (
    location.pathname != "/index.html" &&
    localStorage.getItem("userEmail") === null
  ) {
    location.pathname = "/index.html";
  } else if (location.pathname != "/index.html") {
    //añadido
    /* document.querySelector("#navbar-dropdown-user") */ elementToInsert.innerHTML =
      localStorage.getItem("userEmail");
    console.log("El usuario inició sesión correctamente");
  }
};

/* document.onload = logInCheck(); */
/* --- fin Verificacion inicio sesion ---- */

/* --- DOMContentLoaded ---- */
document.addEventListener("DOMContentLoaded", () => {
  /* ----------------- Definicion de Variables ----------------- */
  const navFormSearch = document.querySelector("#nav-form-search");
  const formsAll = document.querySelectorAll("form");
  // --- No se usa mas ??? ---
  const navMyProfile = document.querySelector("#nav-my-profile");
  const navUserEmail = document.querySelector("#navbar-dropdown-user");
  const navLogout = document.querySelector("#idLogout");

  /* --- cargar email usuario REACT ---- */
  //loadUserEmail("#navbar-dropdown-user");
  /* --- fin cargar email usuario --- */

  /* --- Previene envio de todos los formularios --- */
  const preventFormSubmission = (frmNodeList) => {
    frmNodeList.forEach((form) => {
      form.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        submitEvent.stopPropagation();
        console.log("default prevented");
      });
    });
  };

  preventFormSubmission(formsAll);
  /* --- fin Previene envio de todos los formularios --- */

  /* --- Previene envio de todos los formularios test 01 CONTIN--- */
  /*function checkFormValidity(arrForms) {
     arrForms.forEach((form) => {
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
      } else {

      form.addEventListener("submit", (submit) => {
        submit.preventDefault();
      });
    }
    }); 
  }*/

  /* --- fin Previene envio de todos los formularios test 01 CONTIN --- */

  /* --- Verificar validación temporal --- */
  /* btnInSesion.addEventListener("click", function () {
  if (!loginForm.checkValidity()) {
    loginForm.classList.add("was-validated");
  } else {
    loginForm.addEventListener("submit", function (submit) {
      submit.preventDefault();
      //submit.stopPropagation();
    });
    /* ----------------- fin Bootstrap validación login prevDefault -------------------- /

    /* ---------------- Guarda email del usuario en localStorage para mostrarlo luego en la barra de navegación ------------------ /
    localStorage.setItem("userEmail", inptEmail.value);
    /* --------------------------- */
  /* ----------- Redireccionamiento a la Página principal ----------- /
    window.location.href = "home.html";
  }
}); */
  /* --- fin Verificar validación temporal --- */

  logInCheck(navUserEmail);
});
/* --- fin DOMContentLoaded ---- */
