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
  // REACTIVAR 03 ---> const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

  //let amountProduct = document.querySelector("#amount-product");
  const subtotalProduct = document.querySelector("#subtotal-cost");

  const stndrDelivery = document.querySelector("#standard-delivery");
  const exprsDelivery = document.querySelector("#express-delivery");
  const prmDelivery = document.querySelector("#premium-delivery");

  const radiosShippingType = document.querySelectorAll("[name=type-delivery]");
  //const radioShippingType = document.querySelector("[name=type-delivery]:checked");

  const subtotalGeneral = document.querySelector("#p-subtotal-general");
  const shippingCostGeneral = document.querySelector("#p-shipping-cost");
  const totalCostGeneral = document.querySelector("#p-total-cost");

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

  /* --- fin calcular subtotal producto 01 ORIGINAL --- */

  /* --- calcular subtotal producto 02 NO CURRENCY --- */
  function getProductSubtotal(prodAmount, prodCost) {
    if (prodAmount /* .value */ >= 1) {
      return prodAmount * prodCost;
    } else {
      return (prodAmount = 0);
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
      if (element.checked) {
        return element;
      }
    });
  };
  /* --- fin saber cual radio esta seleccionado --- */

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

  /* --- subtotal, costo envio, total a pagar --- */
  let allCosts_1_Product = {};
  radiosShippingType.forEach((radio) => {
    radio.addEventListener("change", (chng) => {
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
        subtotalProduct.innerHTML =
          currency + " " + getProductSubtotal(amountProduct.value, unitCost);

        /* --- Subtotal conjunto --- */
        subtotalGeneral.innerHTML =
          currency + " " + getProductSubtotal(amountProduct.value, unitCost);
        /* --- fin Subtotal conjunto --- */

        console.log(subtotalGeneral.innerHTML.slice(4));

        shippingCostGeneral.innerHTML =
          currency +
          " " +
          getShippingCost(
            getProductSubtotal(amountProduct.value, unitCost),
            radio.value //subtotalGeneral.innerHTML.slice(4)
          );
        /* --- fin costo envio conjunto --- */

        /* --- total a pagar conjunto --- */

        totalCostGeneral.innerHTML =
          currency +
          " " +
          (getProductSubtotal(amountProduct.value, unitCost) +
            getShippingCost(
              getProductSubtotal(amountProduct.value, unitCost),
              radio.value //subtotalGeneral.innerHTML.slice(4)
            ));
        /* --- fin total a pagar conjunto --- */
      });
    });
  });
  /* --- fin Hacer que sea una funcion para reutilizarla REACTIVAR --- */

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
    function itemRemove(itemsToRemove, removeFromUI) {
      for (const child of itemsToRemove.children) {
        child.remove();
        removeFromUI.innerHTML = "";
      }
    }
    itemRemove(containerProducts, subtotalProduct);
  };
});
/* --- fin DOMContentLoaded --- */
