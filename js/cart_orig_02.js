const cartURL = CART_INFO_URL + 25801 + EXT_TYPE;

/* --- fetch producto pre-cargado(REVISAR FUNCIONALIDAD) --- */
const fetchInfo = async (url) => {
  try {
    const fetchProm = await fetch(url);
    if (fetchProm.ok) {
      fetchResp = await fetchProm.json();
      return fetchResp;
    } /* else {
      throw Error(fetchProm.status + " " + fetchProm.statusText);
    } */
  } catch (error) {
    return console.error(
      error + " " + fetchProm.status + " " + fetchProm.statusText
    );
  }
};
/* --- fin fetch producto pre-cargado(REVISAR FUNCIONALIDAD) --- */

/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", async () => {
  /* --- definicion variables --- */
  const cartPreloadedProds = await fetchInfo(cartURL);
  let { id, name, currency, unitCost, count, image } =
    cartPreloadedProds.articles[0];
  const containerProducts = document.querySelector("#container-products");
  //console.log(CART_INFO_URL + 25801 + EXT_TYPE);
  // REACTIVAR 03 ---> const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

  //let amountProduct = document.querySelector("#amount-product");
  const subtotalProduct = document.querySelector("#subtotal-cost");

  const stndrDelivery = document.querySelector("#standard-delivery");
  const exprsDelivery = document.querySelector("#express-delivery");
  const prmDelivery = document.querySelector("#premium-delivery");
  //const allRadios = document.querySelectorAll("[type=radio]");
  const radiosShippingType = document.querySelectorAll("[name=type-delivery]");
  const radioShippingType = document.querySelector(
    "[name=type-delivery]:checked"
  );

  const subtotalGeneral = document.querySelector("#p-subtotal-general");
  const shippingCostGeneral = document.querySelector("#p-shipping-cost");
  const totalCostGeneral = document.querySelector("#p-total-cost");
  //console.log(subtotalGeneral);

  /* --- fin definicion variables --- */

  /* --- Llamado funciones --- */
  /* --- obtener producto precargado carrito REACTIV --- */
  function getCartPreloadedProducts() {
    /* --- producto carrito categories template --- */
    /* <div id="containerProd-{i}" onclick="setProductID(${id})" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm"> */
    return `<div id="containerProd-{i}" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm sticky-top z-index-auto">
<div class="row">
    <div class="col-3">
        <img src="${image}" alt="" class="img-thumbnail p-0 border-0 rounded-borders" onclick="setProductID(${id})">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between pt-3">
            <h4 id="title-{i}" class="mb-1" onclick="setProductID(${id})">${name}</h4>
            <h4 class="text-muted pe-3">${currency} ${unitCost}</h4>
        </div>
        <!-- <p class="mb-1">descripcion</p> -->
         
        <form class=" row align-items-center" action="#" method="get" novalidate>
        <div class="form-floating col-3">
      <input id="amount-product" class="form-control rounded-borders" type="number" name="" min="1" value="${
        /* cartPreloadedProds.articles[0]. */ count
      }" placeholder="Cantidad" required>
      <label class="form-label" for="amount-product">Cantidad</label>
      
      
      <div class="invalid-feedback">
      Debes tener al menos 1 artículo en el carrito.


      </div>
  </div>

      <div class="col">
      <button id="btn-delete" class="btn btn-close" type="button"></button>
      </div>
    </form>
    
    </div>
    <!-- ELIM <span class="" id="subtotal-cost">
    subtotal ${currency} ${unitCost * count} 
  </span> --> 
</div>
</div>`;
    /* --- fin producto carrito categories template --- */
  }
  /* --- fin obtener producto precargado carrito REACTIV --- */

  /* --- calcular subtotal producto 01 ORIGINAL --- */
  /*  function getProductSubtotal(prodAmount, prodCost, currency) {
    if (prodAmount /* .value / >= 1) {
      let currentTotal = prodAmount /* .value / * prodCost;
      //currentTotal;
      return /* prodContainer.innerHTML = / currency + " " + currentTotal;
    } else {
      prodAmount /* .value / = 0;
      return /* prodContainer.innerHTML = / currency + " " + 0;
    }
  } */
  /* --- fin calcular subtotal producto 01 ORIGINAL --- */

  /* --- calcular subtotal producto 02 NO CURRENCY --- */
  function getProductSubtotal(prodAmount, prodCost) {
    if (prodAmount /* .value */ >= 1) {
      /* let currentTotal = prodAmount /* .value / * prodCost;
      //currentTotal;
      return /* prodContainer.innerHTML = / currentTotal; */
      return prodAmount * prodCost;
    } else {
      /* prodAmount /* .value / = 0; */
      return /* prodContainer.innerHTML = */ (prodAmount = 0);
    }
  }
  /* --- fin calcular subtotal producto 02 NO CURRENCY --- */
  //console.log("getProductSubtotal: ", getProductSubtotal(-5, 25));
  /* --- calcular costo envio producto --- */
  function getShippingCost(productCost, shippingCostPercent) {
    return (productCost * shippingCostPercent) / 100;
  }

  function getTotalToPay(productSubtotal, shippingCost) {
    return productSubtotal + shippingCost;
  }

  function getAllCost_1_Product(amountProduct, unitCost, element) {
    let subtotal_1_Product = getProductSubtotal(amountProduct.value, unitCost);
    let shippingCost_1_Product = getShippingCost(
      subtotal_1_Product,
      element.value
    );
    let totalToPay_1_Product = getTotalToPay(
      subtotal_1_Product,
      shippingCost_1_Product
    );
    return (allCosts_1_Product = {
      subtotal_1_Product: subtotal_1_Product,
      shippingCost_1_Product: shippingCost_1_Product,
      totalToPay_1_Product: totalToPay_1_Product,
    });
  }

  /* --- saber cual radio esta seleccionado --- */
  const whichIsChecked = (nodeListToCheck) => {
    return nodeListToCheck.forEach((element) => {
      /* element.addEventListener("change", (chng) => {
        /* if (element.checked) {
          return console.log("element.checked: ", element);
        } /
        //console.log("element.checked: ", element);
        return element;
      }); */
      if (element.checked) {
        return element;
      }
    });
  };

  /* const getCheckedElement = (htmlElement) => {
    if (htmlElement.checked) {
      return htmlElement;
    }
  }; <--- GET CHECKED INDIVIDUAL*/

  /*  stndrDelivery.addEventListener("change", (chng) => {
    console.log("getCheckedElement: ", getCheckedElement(stndrDelivery));
    // console.log("stndrDelivery: ", stndrDelivery);
  }); <---- ELIMINAR PRUEBA INDIVIDUAL*/

  /* let selectedShippingType;
  selectedShippingType = */ /*  radiosShippingType.forEach((radio) => {
    //let elementoSeleccionado = "";
    /* return / radio.addEventListener("change", (chng) => {
      /* if (radio.checked) {
        return radio;
      } / console.log(
        "getProductSubtotal: ",
        getProductSubtotal(amountProduct.value, radio.value)
      );
      return getProductSubtotal(amountProduct.value, radio.value);
      /* console.log(radio);
      return radio; /
      /* elementoSeleccionado = whichIsChecked(radiosShippingType);
        console.log("elementoSeleccionado: ", elementoSeleccionado); /

      /* console.log("getCheckedElement: ", getCheckedElement(radio));
        return getCheckedElement(radio); <--- GET CHECKED INDIVIDUAL/
    });
  }); */
  // console.log("selectedShippingType: ", selectedShippingType);
  //console.log("whichIsChecked: ", whichIsChecked(radiosShippingType));

  /* --- fin saber cual radio esta seleccionado --- */

  /*  let getCheckedRadioShippingType = (allRadios) => {
    let deliveryType = 0;
    allRadios.forEach((radio) => {
      radio.addEventListener("change", (chng) => {
        //console.log(radioShippingType);
        //console.log(radio.value);
        if (stndrDelivery.checked) {
          console.log(
            getShippingCost(amountProduct.value, stndrDelivery.value)
          );
          return (deliveryType = getShippingCost(
            amountProduct.value,
            stndrDelivery.value
          ));
          // return (deliveryType = stndrDelivery.value);
        } else if (exprsDelivery.checked) {
          console.log(
            getShippingCost(amountProduct.value, exprsDelivery.value)
          );
          return (deliveryType = getShippingCost(
            amountProduct.value,
            exprsDelivery.value
          ));
          //return (deliveryType = exprsDelivery.value);
        } else if (prmDelivery.checked) {
          console.log(getShippingCost(amountProduct.value, prmDelivery.value));
          return (deliveryType = getShippingCost(
            amountProduct.value,
            prmDelivery.value
          ));
          //return (deliveryType = prmDelivery.value);
        }
        //return getShippingCost(unitCost, deliveryType);
      });
      return deliveryType;
    });
    return deliveryType;
  }; */
  // console.log(getCheckedRadioShippingType(radiosShippingType));
  /* --- fin calcular costo envio producto --- */

  /* --- REACTIVAR --- */
  containerProducts.innerHTML += getCartPreloadedProducts();
  /* --- fin REACTIVAR --- */

  /* --- Subtotal inicial --- */
  subtotalProduct.innerHTML =
    currency + " " + getProductSubtotal(count, unitCost /*,  currency */);
  /* --- fin Subtotal inicial --- */

  /* --- Subtotal inicial conjunto --- */
  subtotalGeneral.innerHTML =
    currency + " " + getProductSubtotal(count, unitCost);
  /* --- fin Subtotal inicial conjunto --- */

  /* --- Carrito original --- */
  /*  const objRespCart = await userCartDetails(cartURL);
  containerProducts.innerHTML += `<tr>
  <td class="w-25"><img id="img-product" class="img-thumbnail w-75" src="${
    objRespCart.articles[0].image
  }" alt=""></td>
  <td class="align-middle" id="name-product">${
    objRespCart.articles[0].name
  }</td>
  <td class="align-middle" id="unit-currency-cost">${
    objRespCart.articles[0].currency + " " + objRespCart.articles[0].unitCost
  }</td>
  <td>
    <form class="form-floating" action="" method="">
      <input id="amount-product" class="form-control-sm" type="number" name="" min="1" value="${
        objRespCart.articles[0].count
      }">
    </form>
  </td>
  <td class="align-middle" id="subtotal-cost">
    <!-- subtotal -->
  </td>
</tr>`; */
  /* --- fin Carrito original --- */

  /* --- Hacer que sea una funcion para reutilizarla REACTIVAR --- */
  let amountProduct = document.querySelector("#amount-product");
  //let subtotalProduct = document.querySelector("#subtotal-cost");

  /* --- subtotal, costo envio, total a pagar --- */
  let allCosts_1_Product = {};
  /* let allCosts_1_Product = */ radiosShippingType.forEach((radio) => {
    //let elementoSeleccionado = "";
    /* return */ radio.addEventListener("change", (chng) => {
      /* if (radio.checked) {
      return radio;
    } */ /* console.log(
        "getProductSubtotal: ",
        getProductSubtotal(amountProduct.value, radio.value)
      );
      console.log(
        "amountProduct.value: ",
        amountProduct.value,
        "\n radio.value: ",
        radio.value
      ); */

      /* --- BLOQUE FUNCIONAL PREV ACTIVO --- */
      /*  let subtotal_1_Product = getProductSubtotal(
          amountProduct.value,
          unitCost
        );
        let shippingCost_1_Product = getShippingCost(
          subtotal_1_Product,
          radio.value
        );
        let totalToPay_1_Product = getTotalToPay(
          subtotal_1_Product,
          shippingCost_1_Product
        );
        return (allCosts_1_Product = {
          subtotal_1_Product: subtotal_1_Product,
          shippingCost_1_Product: shippingCost_1_Product,
          totalToPay_1_Product: totalToPay_1_Product,
        }); */
      /* --- FIN BLOQUE FUNCIONAL PREV ACTIVO --- */
      console.log(getAllCost_1_Product(amountProduct, unitCost, radio));
      getAllCost_1_Product(amountProduct, unitCost, radio);

      shippingCostGeneral.innerHTML =
        currency +
        " " +
        getShippingCost(
          getProductSubtotal(amountProduct.value, unitCost),
          radio.value
        );

      totalCostGeneral.innerHTML =
        currency +
        " " +
        (getProductSubtotal(amountProduct.value, unitCost) +
          getShippingCost(
            getProductSubtotal(amountProduct.value, unitCost),
            radio.value
          ));

      /* subtotal_1_Product + shippingCost_1_Product; */
      /* console.log(
        "subtotal_1_Product: ",
        subtotal_1_Product,
        "\n shippingCost_1_Product: ",
        shippingCost_1_Product,
        "\n totalToPay_1_Product: ",
        totalToPay_1_Product
      );
      console.log({
        subtotal_1_Product: subtotal_1_Product,
        shippingCost_1_Product: shippingCost_1_Product,
        totalToPay_1_Product: totalToPay_1_Product,
      }); */

      /* console.log(radio);
    return radio; */
      /* elementoSeleccionado = whichIsChecked(radiosShippingType);
      console.log("elementoSeleccionado: ", elementoSeleccionado); */

      /* console.log("getCheckedElement: ", getCheckedElement(radio));
      return getCheckedElement(radio); <--- GET CHECKED INDIVIDUAL*/
    });
  });
  /* --- fin subtotal, costo envio, total a pagar --- */

  function getAllCostAmountChangeProduct(amountProduct, unitCost, elements) {
    let subtotal_1_Product = getProductSubtotal(amountProduct.value, unitCost);
    let shippingCost_1_Product;
    elements.forEach((element) => {
      shippingCost_1_Product = getShippingCost(
        subtotal_1_Product,
        element.value
      );
    });

    let totalToPay_1_Product = getTotalToPay(
      subtotal_1_Product,
      shippingCost_1_Product
    );
    return (allCosts_1_Product = {
      subtotal_1_Product: subtotal_1_Product,
      shippingCost_1_Product: shippingCost_1_Product,
      totalToPay_1_Product: totalToPay_1_Product,
    });
  }

  amountProduct.addEventListener("input", () => {
    radiosShippingType.forEach((radio) => {
      radio.addEventListener("change", (chng) => {
        /* if (amountProduct.value >= 1) {
      let currentTotal =
        amountProduct.value * cartPreloadedProds.articles[0].unitCost;
      //currentTotal;
      return (subtotalProduct.innerHTML = currency + " " + currentTotal);
    } else {
      amountProduct.value = 0;
      return (subtotalProduct.innerHTML = currency + " " + 0);
    } */

        subtotalProduct.innerHTML =
          currency +
          " " +
          getProductSubtotal(
            amountProduct.value,
            unitCost /* ,
      currency */
          );

        /* --- Subtotal conjunto --- */
        subtotalGeneral.innerHTML =
          currency + " " + getProductSubtotal(amountProduct.value, unitCost);
        /* --- fin Subtotal conjunto --- */
        //console.log(parseInt(subtotalGeneral.innerHTML));
        console.log(subtotalGeneral.innerHTML.slice(4));
        /*  console.log(str.slice(4, 19));
 expected output: "quick brown fox" */
        /* --- costo envio conjunto --- */
        /* shippingCostGeneral.innerHTML =
      currency +
      " " +
      "COSTO ENVIO" /* getCheckedRadioShippingType(radiosShippingType) /; */

        shippingCostGeneral.innerHTML =
          currency +
          " " +
          getShippingCost(
            getProductSubtotal(amountProduct.value, unitCost),
            radio.value //subtotalGeneral.innerHTML.slice(4)
          );
        /* --- fin costo envio conjunto --- */

        /* --- total a pagar conjunto --- */
        /*  totalCostGeneral.innerHTML =
      currency +
      " " +
      "TOTAL A PAGAR" /* getCheckedRadioShippingType(radiosShippingType) /; */

        totalCostGeneral.innerHTML =
          currency +
          " " +
          (getProductSubtotal(amountProduct.value, unitCost) +
            getShippingCost(
              getProductSubtotal(amountProduct.value, unitCost),
              radio.value //subtotalGeneral.innerHTML.slice(4)
            ));
        /* --- fin total a pagar conjunto --- */

        //console.log(getAllCost_1_Product(amountProduct, unitCost));
        //console.log(allCosts_1_Product);
        //getAllCostAmountChangeProduct(amountProduct, unitCost, radiosShippingType);
      });
    });
  });
  /* --- fin Hacer que sea una funcion para reutilizarla REACTIVAR --- */

  /* --- funcion calcular total a pagar --- */
  const getSubtotalAllProducts = (arrProducts) => {
    /* --- Algoritmo calcular total a pagar --- */
    /*  subtotalProd_1 = 'prodUnitCost_1 * prodAmount_1';
    subtotalProd_2 = 'prodUnitCost_2 * prodAmount_2';
    subtotalProd_3 = 'prodUnitCost_3 * prodAmount_3';
    ·
    ·
    ·
    subtotalProd_n = 'prodUnitCost_n * prodAmount_n';
  
   subtotalAllProducts = 'subtotalProd_1 + subtotalProd_2 + subtotalProd_3 + ... + subtotalProd_n';
  
   shippingCost = '5%, 7%, 15%' of subtotalAllProducts;
   totalToPay = 'subtotalAllProducts + shippingCost'; */
    /* --- fin Algoritmo calcular total a pagar --- */

    /* --- calcular total a pagar --- */
    let subtotalAllProducts = 0;
    let shippingCost = 0;
    let totalToPay = 0;

    arrProducts.forEach((prod) => {
      return (subtotalAllProducts += getProductSubtotal(
        prod.count,
        prod.unitCost
      ));
    });

    /* function getShippingCost(productCost, shippingCostPercent) {
  return shippingCost = productCost * shippingCostPercent / 100;
}; */

    totalToPay = subtotalAllProducts + shippingCost;

    return totalToPay;
    /* --- fin calcular total a pagar --- */
  };
  /* --- funcion calcular total a pagar --- */

  /* --- fin Llamado funciones --- */

  /* --- Guardar cantidad productos localstorage v3 PREV ACTIVO --- */
  amountProduct.addEventListener("change", (event) => {
    //  event.returnValue = arrIdsCartProductsLocalStorage.splice(1, 1);
    // REACTIVAR 03 ---> localStorage.setItem("cartProducts", JSON.stringify(amountProduct.value));
    //subtotalGeneral.innerHTML = getCheckedRadioShippingType(radiosShippingType);
    /* --- Subtotal inicial conjunto --- */
    /* subtotalGeneral.innerHTML =
      currency + " " + getProductSubtotal(count, unitCost); */
    /* --- fin Subtotal inicial conjunto --- */
  });
  /* --- fin Guardar cantidad productos localstorage v3 PREV ACTIVO --- */

  /* --- cargar email usuario ---- */
  // loadUserEmail("#navbar-dropdown-user");
  /* --- fin cargar email usuario --- */

  const btnDelete = document.querySelector("#btn-delete");
  btnDelete.onclick = (evnt) => {
    /*  containerProducts.childNodes.forEach((child) => {
      child.remove();
    }); */
    //containerProducts.removeChild(containerProducts.children);
    function itemRemove(itemsToRemove, removeFromUI) {
      for (const child of /* containerProducts */ itemsToRemove.children) {
        child.remove();
        /* subtotalProduct */ removeFromUI.innerHTML = "";
      }
    }
    itemRemove(containerProducts, subtotalProduct);
  };

  /*  radiosShippingType.forEach((radio) => {
    return radio.addEventListener("change", (chng) => {
      return console.log("radio.checked: ", radio.checked);
    });
  }); */
});
/* --- fin DOMContentLoaded --- */
