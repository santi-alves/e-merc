import { getJSONData, setCatID } from "./init.js";

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

/* --- Definicion de funciones --- */
function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

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

/* function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
} */

/* function showCategoriesList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let /* category / { id, name, description, productCount, imgSrc } =
        currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(productCount) <= maxCount))
    ) {
      htmlContentToAppend +=
        /* --- categories rediseño --- /
        //onclick="setCatID(${category.id})"
        `<div id="${id}" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm">
                <div class="row">
                    <div class="col-3">
                        <img src="${imgSrc}" alt="${description}" class="img-thumbnail p-0 border-0 rounded-borders">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between pt-3">
                            <h4 class="mb-1">${name}</h4>
                            <small class="text-muted pe-3">${productCount} artículos</small>
                        </div>
                        <p class="mb-1">${description}</p>
                    </div>
                </div>
            </div>`;
      /* --- fin categories rediseño --- /
    }

    document.getElementById("categories-list-container").innerHTML =
      htmlContentToAppend;
  }
} */

/* --- verifica si un numero esta entre un minimo y maximo establecido --- */
const checkMinAndMax = (min, max, productCount) => {
  return (
    (min == undefined || (min != undefined && parseInt(productCount) >= min)) &&
    (max == undefined || (max != undefined && parseInt(productCount) <= max))
  );
};
//console.log("checkMinAndMax() :>> ", checkMinAndMax(3, 5, 1));
/* --- fin verifica si un numero esta entre un minimo y maximo establecido --- */

/* --- reescritura generar contenido --- */
const showCategoriesList = (arrOfObjs, containerElement) => {
  //let htmlContentToAppend = "";

  /* let contentToShow = */ return (containerElement.innerHTML = arrOfObjs.map(
    (obj, i) => {
      let { id, name, description, productCount, imgSrc } = obj;

      if (checkMinAndMax(minCount, maxCount, productCount)) {
        /* if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(productCount) <= maxCount))
    ) { */
        //htmlContentToAppend +=
        /* --- categories rediseño --- */
        //onclick="setCatID(${category.id})"
        //onclick="setCatID(${id})"
        return `<div id="${id}" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm" onclick="setCatID(${id})">
                <div class="row">
                    <div class="col-3">
                        <img src="${imgSrc}" alt="${description}" class="img-thumbnail p-0 border-0 rounded-borders">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between pt-3">
                            <h4 class="mb-1">${name}</h4>
                            <small class="text-muted pe-3">${productCount} artículos</small>
                        </div>
                        <p class="mb-1">${description}</p>
                    </div>
                </div>
            </div>`;
        /* --- fin categories rediseño --- */
        //}
        /*  obj.onclick = (clck) => {
        setCatID("id");
      }; */
        //container.setAttribute("onclick", "setCatID('container.id')");
      }
      return;
    }
  ));
  //return (containerElement.innerHTML = contentToShow);

  // document.getElementById("categories-list-container").innerHTML = htmlContentToAppend;
  // }
};
/* --- fin reescritura generar contenido --- */

/* --- intento clase --- */
/* class HtmlElem extends HTMLElement {
  _content = "";
  constructor(element, style) {
    super(HTMLElement);
    this.cloneNode();
    this.style = style;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    return (this._content = value);
  }
}
const h1 = document.createElement("h1");
h1.style.background = "lightblue";

const h1Copy = h1.cloneNode();
console.log(h1, h1Copy.baseURI);

const htmlElem = new HtmlElem(h1, "background = 'lightblue'");
console.log("url :> ", htmlElem); */
/* --- fin intento clase --- */

function sortAndShowCategories(
  sortCriteria,
  categoriesArray,
  containerElement
) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray; //Array.from(categoriesArray); [...categoriesArray];
  }
  console.log("currentCategoriesArray :>> ", currentCategoriesArray);
  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  //showCategoriesList();
  showCategoriesList(currentCategoriesArray, containerElement);
}
/* --- Fin Definicion de funciones --- */

/* --- DOMContentLoaded --- */
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (dmcntld) {
  const CATEGORIES_URL =
    /* REACTIVAR "https://japceibal.github.io/emercado-api/cats/cat.json"; */ "http://localhost:3000/categories/";
  const categoriesListContainer = document.querySelector(
    "#categories-list-container"
  );
  getJSONData(CATEGORIES_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCategoriesArray = resultObj.data;

      showCategoriesList(currentCategoriesArray, categoriesListContainer);
      //categoriesListContainer.innerHTML += showCategoriesList(currentCategoriesArray);

      //showCategoriesList();
      //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);

      /* --- HACER FUNCION Y LLAMAR CADA VEZ DESPUES DE showCategoriesList() O INSERTAR DENTRO DE showCategoriesList() --- */
      /* const eachCategoriesContainers = document.querySelectorAll(
        "#categories-list-container > [id*='10']"
      );

      
      eachCategoriesContainers.forEach((container) => {
        container.onclick = (clck) => {
          setCatID(container.id);
        };
        //container.setAttribute("onclick", "setCatID('container.id')");
      }); */
      //console.log("eachCategoriesContainers :>> ", eachCategoriesContainers);
      /* --- Fin HACER FUNCION Y LLAMAR CADA ... --- */
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(
      ORDER_ASC_BY_NAME,
      undefined,
      categoriesListContainer
    );
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(
      ORDER_DESC_BY_NAME,
      undefined,
      categoriesListContainer
    );
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(
      ORDER_BY_PROD_COUNT,
      undefined,
      categoriesListContainer
    );
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList(currentCategoriesArray, categoriesListContainer);
      //showCategoriesList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      //showCategoriesList();
      showCategoriesList(currentCategoriesArray, categoriesListContainer);
    });
});
/* --- fin DOMContentLoaded --- */
