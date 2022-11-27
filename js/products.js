import { getJSONData, setProductID } from "./init.js";

/* --- Definicion Variables Plantilla Categories --- */
const ORDER_ASC_BY_PRICE = "0-9";
const ORDER_DESC_BY_PRICE = "9-0";
const ORDER_BY_SOLD_AMOUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
/* --- */
/* --- Definicion funciones Plantilla Categories --- */
/* --- Funcion de filtrado por precio y popularidad --- */
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_SOLD_AMOUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
/* ---- */

/* --- Funcion que almacena id del producto en almacenamiento local --- */
/* const setProductID = (id) => {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}; */
/* --- */

/* --- Funcion que genera el contenido para cada producto --- */
function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minPrice == undefined ||
        (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
      (maxPrice == undefined ||
        (maxPrice != undefined && parseInt(product.cost) <= maxPrice))
    ) {
      // Agregue id containerProd-i
      htmlContentToAppend +=
        /* `<div id="containerProd-${i}" onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
      <div class="row">
          <div class="col-3">
              <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
          </div>
          <div class="col">
          <!-- Agregue id title-n -->
              <div class="d-flex w-100 justify-content-between">
                  <h4 id="title-${i}" class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                  <small class="text-muted">${product.soldCount} vendidos</small>
              </div>
              <p class="mb-1">${product.description}</p>
          </div>
      </div>
  </div>`; */

        /* --- categories rediseño --- */
        /* --- contenedor original id generado iterable --- */
        /* <div id="containerProd-${i}" onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm"></div> */
        /* --- contenedor original id generado iterable --- */
        `<div id="${product.id}" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm" onmousedown="setProductID(${product.id})">
          <div class="row">
              <div class="col-3">
                  <img src="${product.image}" alt="${product.description}" class="img-thumbnail p-0 border-0 rounded-borders">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between pt-3">
                      <h4 id="product-title-${product.id}" class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                      <small class="text-muted pe-3">${product.soldCount} vendidos</small>
                  </div>
                  <p id="product-description-${product.id}" class="mb-1">${product.description}</p>
              </div>
          </div>
      </div>`;
      /* --- fin categories rediseño --- */
    }
  }
  document.getElementById("main-container").innerHTML = htmlContentToAppend;
}
/* --- Fin Funcion que genera el contenido para cada producto --- */

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );
  //Muestro las categorías ordenadas
  showProductsList();
}
/* --- Fin Definicion funciones Plantilla Categories --- */

/* --- DOMContentLoaded Fetch Plantilla Categories --- */
document.addEventListener("DOMContentLoaded", (dmcntld) => {
  const categoryTitle = document.querySelector("#categoryTitle");
  /* const mainContainer = document.querySelector("#main-container"); */
  const navSearch = document.querySelector("#nav-inpt-search");

  const PRODUCTS_URL =
    /* "https://japceibal.github.io/emercado-api/cats_products/" */ "http://localhost:3000/products/";

  /* --- ELIMINAR */
  /*  function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
  } */
  /* --- ELIMINAR */

  /* --- Llamado a la funcion que genera el contenido a partir de la respuesta que devuelve fetch a la URL general de productos mas el id de la categoria almacenado en localStorage y la extension .json --- */
  getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + ".json")
    .then((resultObj) => {
      if (resultObj.status === "ok") {
        currentProductsArray = resultObj.data.products;
        showProductsList();
        console.log(currentProductsArray);

        /* ······· */
        /*  //prod.id > 40000
        const eachProductContainers = document.querySelectorAll(
          "#categories-list-container > [id*='10']" // <-- SEGUIR ACA, ENCONTRAR SELECTOR CONTENEDORES PRODUCTOS
        );

        eachProductContainers.forEach((container) => {
          container.onclick = (clck) => {
            setProductID(container.id);
          };
        }); */
        /* ······ */

        //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        console.log(PRODUCTS_URL + localStorage.getItem("catID") + ".json");
        /* --- Genera el Título de la Categoria segun el nombre de la misma --- */
        categoryTitle.innerHTML += resultObj.data.catName + ".";
        /* --- */

        /* --- Buscador (funciona, optimizar)--- */
        /* --- Filtrado por Busqueda (No esta completo) --- */
        navSearch.addEventListener("input", () => {
          const mainContainer = document.querySelector("#main-container");
          /* ---Terminar; al usar Otros Filtros lo anulan... No es necesario crear id, ya tienen uno (buscar en resultObj.data.products[i].id) --- */
          /* if (
            document
              .querySelector("#containerProd-2")
              .innerText.toLowerCase()
              .includes(navSearch.value.toLowerCase())
          ) {
            document.querySelector("#containerProd-2").style =
              "display: block;";
          } else {
            document.querySelector("#containerProd-2").style = "display: none;";
          } */

          const searchForInPage = (searchFor, searchIn /* searchInArr */) => {
            // searchInArr.forEach((searchIn) => {
            //console.log(searchIn);
            if (
              searchIn.toLowerCase().includes(searchFor.toLowerCase()) &&
              searchFor !== ""
            ) {
              //searchIn.classList.replace("d-none", "d-block");
              return searchIn
                .toLowerCase()
                .match(searchFor.toLowerCase()); /* searchIn.charAt(
                  searchIn.toLowerCase().match(searchFor.toLowerCase())
                ); */
            } else {
              //searchIn.classList.replace("d-block", "d-none")
              return "No se encontraron coincidencias";
            }
            // });
          };

          /*  console.log(
            searchForInPage(
              navSearch.value,
              document.querySelector(
                "[id*=product-title-], [id*=product-description-]"
                /* "[id*=product-title-], [id*=product-description-]" /
              ).innerText
            )
          ); */

          const searchResult = currentProductsArray.filter((product) => {
            /* if (
                product.name
                  .toLowerCase()
                  .includes(navSearch.value.toLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(navSearch.value.toLowerCase())
              ) { */
            return (
              product.name
                .toLowerCase()
                .includes(navSearch.value.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(navSearch.value.toLowerCase())
            ); /* product */
            //}
          });

          console.log("searchResult: ", searchResult);

          const renderProductsList = (arrOfObjsProds) => {
            const { id, name, description, image, cost, currency, soldCount } =
              arrOfObjsProds;
            return `<div id="${id}" onclick="setProductID(${id})" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm">
            <div class="row">
                <div class="col-3">
                    <img src="${image}" alt="${description}" class="img-thumbnail p-0 border-0 rounded-borders">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between pt-3">
                        <h4 id="product-title-${id}" class="mb-1">${name} - ${currency} ${cost}</h4>
                        <small class="text-muted pe-3">${soldCount} vendidos</small>
                    </div>
                    <p id="product-description-${id}" class="mb-1">${description}</p>
                </div>
            </div>
        </div>`;
          };

          const searchResultsRendered = searchResult.map((prod) => {
            return renderProductsList(prod);
          });

          console.log("searchResultsRendered: ", searchResultsRendered);
          mainContainer.innerHTML = searchResultsRendered;
          /* ELIMINAR console.log(
            "document.getElementById(50744).innerText: ",
            document.getElementById(50743).innerText,
            "\ndocument.getElementById(50744).innerHTML: ",
            document.getElementById(50743).innerHTML,
            "\ndocument.getElementById(50744).textContent: ",
            document.getElementById(50743).textContent,
            "\ndocument.getElementById(50744).outerText: ",
            document.getElementById(50743).outerText,
            "\ndocument.getElementById(50744).outerHTML: ",
            document.getElementById(50743).outerHTML
          ); */
        });
        /* --- fin Buscador --- */
      }

      /* --- import NO sirve con: contenedor.innertHTML = <div onclick="setProductID"></div> (devuelve undefined al llamar funcion); pero SI sirve con creando nodos --- */
      const div = document.createElement("div");
      /* --- intento asignar varios estilos con bucle ? --- */
      /* ["background:red", "height:3rem", "width:75vw"].map((keyValStr) => {
        return keyValStr.split(":").map((keyVal) => {
          return (div.style.keyVal[0] = keyVal[1]);
        });
      }); */
      /* --- fin intento asignar varios estilos con bucle ? --- */
      div.style.background = "red";
      div.style.height = "3rem";
      div.style.borderRadius = ".5rem";

      div.id = "asd";
      document
        .querySelector("#main-container")
        .insertBefore(
          div,
          document.querySelector("#main-container").firstElementChild
        );

      div.onclick = (clck) => {
        return xd(50921);
      };
      /* --- fin import NO sirve con: contenedor.innertHTML = <div onclick=... --- */
    })
    .then(() => {
      /* console.log(
      document
        .querySelectorAll(
          "[id*=product-title-], [id*=product-description-]"
          /* "[id*=product-title-], [id*=product-description-]" /
        )
        .forEach((element) => {
          element.innerText;
        })
    ); */
      //console.log(".then result", currentProductsArray);
    })
    .catch((err) => {
      console.log(err);
    });
  /* --- Fin Fetch Plantilla Categories --- */

  /* --- Llamado a funciones Plantilla Categories --- */
  document
    .getElementById("sortAscPrice")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

  document
    .getElementById("sortDescPrice")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

  document
    .getElementById("sortBySoldAmount")
    .addEventListener("click", function () {
      sortAndShowProducts(ORDER_BY_SOLD_AMOUNT);
    });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minPrice = document.getElementById("rangeFilterCountMin").value;
      maxPrice = document.getElementById("rangeFilterCountMax").value;

      if (minPrice != undefined && minPrice != "" && parseInt(minPrice) >= 0) {
        minPrice = parseInt(minPrice);
      } else {
        minPrice = undefined;
      }

      if (maxPrice != undefined && maxPrice != "" && parseInt(maxPrice) >= 0) {
        maxPrice = parseInt(maxPrice);
      } else {
        maxPrice = undefined;
      }

      showProductsList();
    });
  /* --- Fin Llamado a funciones Plantilla Categories --- */
});
/* --- fin DOMContentLoaded --- */
