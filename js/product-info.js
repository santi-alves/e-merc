import { fetchData } from "../src/fetch/fetch.js";
import { setProductID } from "./init.js";

let objProductInfo = {};
let arrProductComments = [];
let objProductInfoRelatedExtra;
let averageScore = 0;
let totalScore = 0;
let commentsAmount = 0;

/* TEST INCREMENTO/DECREMENTO ELIMINAR let xd = 0;
console.log("xd++: ", xd++);
console.log("xd: ", xd);

xd = 0;
console.log("++xd: ", ++xd);
console.log("xd: ", xd);

xd = 0;
console.log("xd--: ", xd--);
console.log("xd: ", xd);

xd = 0;
console.log("--xd: ", --xd);
console.log("xd: ", xd); */

/* --- fetch producto pre-cargado(REVISAR FUNCIONALIDAD) --- */
/* const fetchInfo = async (url) => {
  try {
    const fetchProm = await fetch(url);
    if (fetchProm.ok) {
      fetchResp = await fetchProm.json();
      return fetchResp;
    } /* else {
      throw Error(fetchProm.status + " " + fetchProm.statusText);
    } /
  } catch (error) {
    return console.error(
      error + " " + fetchProm.status + " " + fetchProm.statusText
    );
  }
}; */
/* --- fin fetch producto pre-cargado(REVISAR FUNCIONALIDAD) --- */

/* --- Funcion que almacena id del producto en almacenamiento local --- */
/* function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
} */
/* --- */
/* --- Funcion que almacena id de la categoria en almacenamiento local --- */
/* function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
} */
/* --- */

/* ELIMINAR OBJPRODINFO MUESTRA CONSOLA{
    "id": 50921,
    "name": "Chevrolet Onix Joy",
    "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
    "cost": 13500,
    "currency": "USD",
    "soldCount": 14,
    "category": "Autos",
    "images": [
        "img/prod50921_1.jpg",
        "img/prod50921_2.jpg",
        "img/prod50921_3.jpg",
        "img/prod50921_4.jpg"
    ],
    "relatedProducts": [
        {
            "id": 50924,
            "name": "Peugeot 208",
            "image": "img/prod50924_1.jpg"
        },
        {
            "id": 50922,
            "name": "Fiat Way",
            "image": "img/prod50922_1.jpg"
        }
    ]
} */
/* --- Funcion que genera el contenido para cada producto --- */
/* function */ const showProductInfo = (
  objProductDetails,
  objRelatedProduct
) => {
  const {
    id,
    name,
    description,
    cost,
    currency,
    images,
    soldCount,
    relatedProducts,
  } = objProductDetails;
  let mainHTMLProductInfo = "";
  let productImages = "";
  let productImagesCarouselIndicator = "";
  /* --- Deberia ser un string o un array ???? --- */
  let productsRel = "";
  /* --- */

  const carouselIndicatorsContainer = document.querySelector(
    "#carousel-indicators-container"
  );
  const carouselImagesContainer = document.querySelector(
    "#carousel-images-container"
  );
  const productDetailsTitle = document.querySelector("#product-details-title");
  const containerProductDetails = document.querySelector(
    "[data-id='container-product-details']"
  );
  const productSoldCount = document.querySelector("#product-sold-count");
  const productDescription = document.querySelector("#product-description");
  const containerRelatedProducts = document.querySelector(
    "#container-related-products"
  );

  /* --- Loop Carousel Imagenes --- */
  for (let index = 0; index < /* objProductInfo. */ images.length; index++) {
    if (index === 0) {
      productImages += `<div class="carousel-item active">
            <img src="${
              /* objProductInfo. */ images[index]
            }" class="d-block w-100" alt="Imagen de ${
        /* objProductInfo. */ name
      }-${index}">
          </div>`;

      productImagesCarouselIndicator += `<button type="button" data-bs-target="#carousel-product-images-container" data-bs-slide-to="${index}" class="active"
  aria-current="true" aria-label="Slide ${index + 1}"></button>`;
    } else {
      productImages += `<div class="carousel-item">
  <img src="${
    /* objProductInfo. */ images[index]
  }" class="d-block w-100" alt="Imagen de ${
        /* objProductInfo. */ name
      }-${index}">
</div>`;

      productImagesCarouselIndicator += `<button type="button" data-bs-target="#carousel-product-images-container" data-bs-slide-to="${index}"
      aria-label="Slide ${index + 1}"></button>`;
    }
  }
  /* --- Fin Loop Carousel Imagenes --- */

  /* --- Productos relacionados card Plantilla Categories --- */
  for (
    let index = 0;
    index < /* objProductInfo. */ relatedProducts.length;
    index++
  ) {
    productsRel += `<div id="related-product-card-${index}" data-product-id="${
      /* objProductInfo. */ relatedProducts[index].id
    }" onclick="setProductID(${
      /* objProductInfo. */ relatedProducts[index].id
    })" class="col-md-3">
            <div class="card mb-2 shadow-sm custom-card cursor-active min-height-100 rounded-borders py-0 border-0">
            <div class="card-header py-0 border-0"></div>
              <img class="bd-placeholder-img card-img-top" src="${
                /* objProductInfo. */ relatedProducts[index].image
              }"
                alt="Imagen de ${
                  /* objProductInfo. */ relatedProducts[index].name
                }-${index}">
                
              <h3 class="mx-3 my-0">${
                /* objProductInfo. */ relatedProducts[index].name
              } - ${objRelatedProduct.currency} ${objRelatedProduct.cost}</h3>
              
              <div class="card-body py-0">
              <!-- Estrellas Calificacion Promedio (Falta implementar calculo promedio, Agregar a una funcion) -->      
              <div tabindex="0" data-average-user-score="${averageScore}" class="average-stars-container d-inline" data-bs-trigger="hover" data-bs-placement="auto"
              data-bs-toggle="popover" data-bs-trigger="focus" title=""
              data-bs-content="Calificación promedio del producto según otros usuarios">
                <span class="star-item-1 fa fa-star"></span>
                <span class="star-item-2 fa fa-star"></span>
                <span class="star-item-3 fa fa-star"></span>
                <span class="star-item-4 fa fa-star"></span>
                <span class="star-item-5 fa fa-star"></span>
             </div>
         <!-- Fin Estrellas Calificacion Promedio -->
        
                <p class="card-text">${objRelatedProduct.description}</p>
              </div>
            </div>
            </div>`;
    /* --- Fin Productos relacionados card Plantilla Categories --- */
  }

  containerProductDetails.setAttribute("id", /* objProductInfo. */ id); //<--
  carouselIndicatorsContainer.innerHTML = productImagesCarouselIndicator;
  carouselImagesContainer.innerHTML = productImages;
  productDetailsTitle.innerHTML +=
    /* objProductInfo. */ name +
    " - " +
    /* objProductInfo. */ currency +
    " " +
    /* objProductInfo. */ cost;
  productDescription.innerHTML = /* objProductInfo. */ description;
  productSoldCount.innerHTML = /* objProductInfo. */ soldCount + " vendidos";
  containerRelatedProducts.innerHTML += productsRel;

  document.getElementById("main-container").innerHTML += mainHTMLProductInfo;
};
/* --- Fin Funcion que genera el contenido para cada producto --- */

/* --- Definicion Funcion que genera los comentarios de otros usuarios --- */
function getProductComments(arrOfProductComments) {
  /*  const [{ user, product, score, description, dateTime }] =
    arrOfProductComments; */
  let productComments = "";
  for (let index = 0; index < arrOfProductComments.length; index++) {
    /* --- calcular promedio calificacion (continuar) --- */
    totalScore += arrOfProductComments[index].score;
    commentsAmount++;
    /* --- fin calcular promedio calificacion (continuar) --- */

    productComments += `<div id="${arrOfProductComments[index].product}" class="list-group-item border-0 border-start border-5 border-start-light-indigo mb-2">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${arrOfProductComments[index].user}</h5>
        <small class="text-muted">${arrOfProductComments[index].dateTime}</small>
      </div>
      <!-- Estrellas Calificacion Comentarios de otros usuarios -->      
      <div data-other-user-score="${arrOfProductComments[index].score}" class="star-container">
           <span class="star-item-1 fa fa-star"></span>
           <span class="star-item-2 fa fa-star"></span>
           <span class="star-item-3 fa fa-star"></span>
           <span class="star-item-4 fa fa-star"></span>
           <span class="star-item-5 fa fa-star"></span>
         </div>
           <!-- Fin Estrellas Calificacion Comentarios de otros usuarios -->
      <p class="mb-1">${arrOfProductComments[index].description}</p>
    </div>`;
  }
  /* --- calcular promedio calificacion (continuar) --- */
  averageScore = Math.round(totalScore / commentsAmount);
  console.log(
    totalScore + " / " + commentsAmount + " = " + averageScore + " ) "
  );
  /* --- fin calcular promedio calificacion (continuar) --- */
  return productComments;
}
/* --- Fin Definicion Funcion que genera los comentarios de otros usuarios --- */

/* --- Carga de la página --- */
document.addEventListener("DOMContentLoaded", async function (dmcntld) {
  //const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
  //const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
  //const EXT_TYPE = ".json";

  const productInfoURL =
    /* "https://japceibal.github.io/emercado-api/products/" */ "http://localhost:3000/product-info/" +
    localStorage.getItem("productID") +
    ".json";
  console.log(productInfoURL);
  const productInfoCommentsURL =
    /* "https://japceibal.github.io/emercado-api/products_comments/" */ "http://localhost:3000/product-info-comments/" +
    localStorage.getItem("productID") +
    ".json";

  const productsRelatedURL =
    /* "https://japceibal.github.io/emercado-api/products/" */ "http://localhost:3000/product-info/" +
    /* document.querySelector(
          "[data-product-id]"
        ) */ 50741 /*localStorage.getItem("productID") */ +
    ".json";

  /* PRUEBAS ELIMINAR */
  /*  const bye = null ?? "bye";
  //console.log(bye);
  const sd = {
    hi() {
      return "hi";
    },
    bye,
  };

  //console.log(sd);
  const fn = (xd = false) => {
    return xd?.hi?.bye;
  };
  console.log(fn(sd));

  const fnProm = (param) => {
    return new Promise((resolve, reject) => {
      //setTimeout(() => {
      param ? resolve(param) : reject(false);
      //}, 1000);
    });
  };

  console.log(
    fnProm(true)
      .then((res) => {
        //return Promise.resolve(res);
        return res.json();
      })
      .catch((err) => {
        //return Promise.reject(err);
        return err;
      })
  ); */

  //const responses = Promise.all([]);
  /* fin PRUEBAS ELIMINAR */

  /* objProductInfo = await fetchInfo(
    PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE
  );
  arrProductComments = await fetchInfo(
    PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE
  );
  objProductInfoRelatedExtra = await fetchInfo(
    PRODUCT_INFO_URL +
      /* document.querySelector(
              "[data-product-id]"
            ) / 50741 /*localStorage.getItem("productID") / +
      EXT_TYPE
  ); */

  /* const customFetch = await fetchData(
    "http://localhost:3000/product-info/" +
      localStorage.getItem("productID") +
      ".json"
  );
  console.log(customFetch); */
  const allFetch = await Promise.all([
    fetchData(productInfoURL),
    fetchData(productsRelatedURL),
    fetchData(productInfoCommentsURL),
  ]);

  const [objProductInfo, objProductInfoRelatedExtra, arrProductComments] =
    allFetch;
  console.log(
    "objProductInfo: ",
    objProductInfo,
    "\nobjProductInfoRelatedExtra: ",
    objProductInfoRelatedExtra,
    "\narrProductComments: ",
    arrProductComments
  );

  /* objProductInfo = await fetchData(productInfoURL);
  objProductInfoRelatedExtra = await fetchData(productsRelatedURL);
  arrProductComments = await fetchData(productInfoCommentsURL);
  console.log(arrProductComments); */

  const {
    id,
    name,
    count = 1,
    cost: unitCost,
    currency,
    images: [image],
  } = objProductInfo;
  console.log("image: ", image);

  /* --- Llamado a la funcion que genera el contenido a partir de la respuesta que devuelve fetch a la URL general de productos mas el id de la categoria almacenado en localStorage y la extension .json --- */

  showProductInfo(objProductInfo, objProductInfoRelatedExtra);

  /* --- pruebas --- */
  const lel = function (arg) {
    return arg;
  };

  const uwu = (arg) => {
    return lel(arg);
  };

  console.log(
    "anonymous function iife: ",
    ((tf) => {
      return tf;
    })("strange")
  );
  console.log("uwu > lel", uwu({ key: "value" }));
  const randomNumber = Math.random();
  const rearrangeLetters = (letters) => {
    //letterRange = new RegExp(/[A-Z]/gi)}
    return letters
      .toString()
      .split("")
      .sort((a, b) => {
        return a.localeCompare(b);
      })
      .join("");
  };
  //console.log("localCompare()", "B".localeCompare("A"));
  console.log("rearrangeLetters(): ", rearrangeLetters("57488910318"));
  console.log("obj random property name: ", { [randomNumber]: "randomValue" });

  /* function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
  } ELIMINAR*/
  //ELIMINAR const btnAddToCart = document.querySelector("#btn-add-to-cart");

  // const h3_Sutitle = [`<h3 onclick=${""}>subtitulo h3</h3>`];
  // btnAddToCart.insertAdjacentHTML("afterend", h3_Sutitle);
  /* --- fin pruebas --- */

  /* --- agregar al carrito("addEventListener" no lo agarra porque se inserto con "innerHTML"??) --- */
  const btnAddToCart = document.querySelector("#btn-add-to-cart");
  const amountProduct = document.querySelector("#amount-product");

  btnAddToCart.addEventListener("click", (clck) => {
    let count = document.querySelector("#amount-product").value;
    if (count >= 1) {
      const objRightFormat = {
        user: localStorage.getItem("userEmail"),
        articles: [
          {
            id: id,
            name: name,
            count: count,
            unitCost: unitCost,
            currency: currency,
            image: image,
          },
        ],
      };

      let arrProds = localStorage.getItem("cartProducts");
      //console.log("arrProds: ", arrProds);
      arrProds !== "undefined" ? JSON.parse(arrProds) : (arrProds = []); //?????????
      //let arrProds = JSON.parse(localStorage.getItem("cartProducts"));
      if (arrProds === null || arrProds === undefined) {
        arrProds = [];
        arrProds.push(objRightFormat);
      } else {
        let ind = arrProds.findIndex((prod) => {
          return prod.articles[0].id === objRightFormat.id;
        });

        if (ind != -1) {
          arrProds[ind].articles[0].count = parseInt(
            arrProds[ind].articles[0].count
          );
          arrProds[ind].articles[0].count += Number(count);
        } else {
          arrProds.push(objRightFormat);
        }
      }

      /* --- REACTIVAR FINDINDEX --- */
      /* let indiceCoincidenciaId = JSON.parse(
            localStorage.getItem("cartProducts")
          ).findIndex((prod, i) => {
            return prod[0].id === objProductInfo.id;
            //  console.log(
             // "objProductInfo id: " + objProductInfo.id,
              //"prod id: " + prod[0].id
           // );
           //console.log(prod); 
            // return objProductInfo.id == prod[0].id;
          }); */
      /* --- fin REACTIVAR FINDINDEX --- */

      localStorage.setItem("cartProducts", JSON.stringify(arrProds));
    }
  });
  /* --- fin agregar al carrito --- */

  const categoryBreadcrumbs = document.querySelector("#category-breadcrumbs");
  const productNameBreadcrumbs = document.querySelector(
    "#product-name-breadcrumbs"
  );
  categoryBreadcrumbs.innerHTML = objProductInfo.category;
  productNameBreadcrumbs.innerHTML = objProductInfo.name;

  const navFormSearch = document.querySelector("#nav-form-search");
  const navInptSearch = document.querySelector("#nav-inpt-search");
  const btnSearch = document.querySelector("#btn-search");

  const commentsContainer = document.querySelector("#comments-container");
  commentsContainer.innerHTML += getProductComments(arrProductComments);

  const ndListStarsContainer = document.querySelectorAll(".star-container");
  function commentStars() {
    /* --- Bucle estrellas puntuacion otros usuarios --- */
    for (let index = 0; index < arrProductComments.length; index++) {
      for (let j = 0; j < ndListStarsContainer[index].children.length; j++) {
        if (j < arrProductComments[index].score) {
          ndListStarsContainer[index].children[j].classList.add("checked");
        } else {
          ndListStarsContainer[index].children[j].classList.add("unchecked");
        }
      }
    }
  }
  /* --- Fin Bucle estrellas puntuacion otros usuarios --- */

  /* --- Funcion que genera estrellas para cada comentario de otros usuarios --- */
  commentStars();
  /* --- */

  /* --- Formulario comentarios --- */
  const btnComment = document.querySelector("#btn-comment");
  btnComment.addEventListener("click", async () => {
    const txtComment = document.querySelector("#txt-comment");
    const slctScore = document.querySelector("#slct-score");
    const frmComment = document.querySelector("#frm-comment");
    const commentDateTime = new Date();

    /* --- promedio calificacion otros + propio 02 --- */
    /* function getAverageScore(ttlScr, cmmntAmnt, slctScr) {
          ttlScr += parseInt(slctScr.value);
          cmmntAmnt += 1;
          return (averageScore = Math.round(ttlScr / cmmntAmnt));

          //console.log(averageScore + " = " + totalScore + " / " + commentsAmount);
        } */

    /* function getAverageScore(resAdding, addedNumbs, amountNumbs) {
          let avrgNum = 0;
          resAdding += parseInt(addedNumbs.value);
          amountNumbs += 1;

          avrgNum = Math.round(resAdding / amountNumbs);
          console.log(
            averageScore + " = " + totalScore + " / " + commentsAmount,
            "\n" + avrgNum + " = " + resAdding + " / " + amountNumbs
          );
        } */

    function getAverageScore() {
      totalScore += parseInt(slctScore.value);
      commentsAmount += 1;
      averageScore = Math.round(totalScore / commentsAmount);

      console.log(averageScore + " = " + totalScore + " / " + commentsAmount);
    }
    /* --- fin promedio calificacion otros + propio 02 --- */

    if (!frmComment.checkValidity()) {
      frmComment.classList.add("was-validated");
    } else {
      commentsContainer.innerHTML +=
        /* --- Realizar Comentario Bs --- */
        `<div class="list-group-item border-0 border-start border-5 border-orange mb-2" data-id="star-container-select">
           <div class="d-flex w-100 justify-content-between">
             <h5 class="mb-1"><a class="text-indigo text-decoration-none" href="#">${localStorage.getItem(
               "userEmail"
             )}</a></h5>
             <small class="text-muted">${
               commentDateTime.getFullYear() +
               "-" +
               (commentDateTime.getMonth() + 1) +
               "-" +
               commentDateTime.getDate() +
               " " +
               commentDateTime.getHours() +
               ":" +
               commentDateTime.getMinutes() +
               ":" +
               commentDateTime.getSeconds()
             }</small>
           </div>
           <!-- Estrellas Select Commentarios -->      
           <div data-user-score="${slctScore.value}" class="star-container">
           ${slctScore.value} - <span class="star-item-1 fa fa-star"></span>
                <span class="star-item-2 fa fa-star"></span>
                <span class="star-item-3 fa fa-star"></span>
                <span class="star-item-4 fa fa-star"></span>
                <span class="star-item-5 fa fa-star"></span>
              </div>
                <!-- Fin Estrellas Select Commentarios -->
           <p class="mb-1">${txtComment.value}</p>
         </div>`;
      /* --- fin Realizar Comentario Bs --- */

      slctScore.value = "";
      txtComment.value = "";
      frmComment.classList.remove("was-validated");

      for (let index = 0; index < commentsContainer.children.length; index++) {
        /* --- Bucle Estrellas Comentario Propio 01 (Arreglar?) --- */
        for (let i = 0; i < ndListStarsContainer[0].children.length; i++) {
          if (
            i <
            parseInt(
              document.querySelectorAll("[data-user-score]")[0].attributes[0]
                .value
            )
          ) {
            document
              .querySelectorAll("[data-user-score]")[0]
              .children[i].classList.add("checked");
          } else {
            document
              .querySelectorAll("[data-user-score]")[0]
              .children[i].classList.add("unchecked");
          }
        }
        /* --- Fin Bucle Estrellas Comentario Propio 01 --- */
      }
    }
  });
  /* --- Fin Formulario comentarios --- */

  /* --- Bootstrap Popovers Inicializador --- */
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  /* --- Fin Bootstrap Popovers Inicializador --- */

  const averageUsersScoreContainer = document.querySelector(
    "[data-average-user-score]"
  );
  const avrgScoreElementNode = document.createElement("span");
  const avrgScoreTextNode = document.createTextNode(averageScore + " - ");

  avrgScoreElementNode.append(avrgScoreTextNode);
  averageUsersScoreContainer.insertBefore(
    avrgScoreElementNode,
    averageUsersScoreContainer.firstElementChild
  );

  averageUsersScoreContainer.setAttribute(
    "data-average-user-score",
    averageScore
  );
  console.log(
    "Average users score: " +
      averageUsersScoreContainer.getAttribute("data-average-user-score")
  );
});
/* --- fin Carga de la página --- */
