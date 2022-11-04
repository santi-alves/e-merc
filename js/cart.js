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
  let {
    id,
    name,
    currency,
    unitCost,
    count: amount,
    image,
  } = cartPreloadedProds.articles[0];
  const containerProducts = document.querySelector("#container-products");
  // REACTIVAR 03 ---> const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

  const subtotalProduct = document.querySelector("#subtotal-cost");

  const stndrDelivery = document.querySelector("#standard-delivery");
  const exprsDelivery = document.querySelector("#express-delivery");
  const prmDelivery = document.querySelector("#premium-delivery");

  const radiosShippingType = document.querySelectorAll("[name=type-delivery]");
  //const radioShippingType = document.querySelector("[name=type-delivery]:checked");

  const subtotalGeneral = document.querySelector("#subtotal-general");
  const shippingCostGeneral = document.querySelector("#shipping-cost");
  const totalCostGeneral = document.querySelector("#total-cost");

  /* --- fin definicion variables --- */

  /* --- Llamado funciones --- */
  /* --- obtener producto precargado carrito --- */
  function getCartPreloadedProducts() {
    /* --- producto carrito categories template --- */
    /* <div id="containerProd-{i}" onclick="setProductID(${id})" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm"> */
    return `<div id="containerProd-{i}" class="list-group-item list-group-item-action cursor-active p-0 border-0 mb-3 rounded-borders shadow-sm sticky-top z-index-auto">
<div class="row">
    <div class="col-3">
        <img src="${image}" alt="" class="img-thumbnail p-0 border-0 rounded-borders" onclick="setProductID(${id})">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-evenly pt-3">
          <div>
            <h4 id="title-{i}" class="mb-1 d-inline" onclick="setProductID(${id})">${name} </h4>
            <h5 class="text-muted d-inline pe-3">- ${currency} ${unitCost}</h5>
          </div>  

          <form id="frm-product-amount" class="" action="#" method="get" novalidate>
        <div class="form-floating col-8">
      <input id="amount-product" class="form-control rounded-borders" type="number" name="" min="1" value="${amount}" placeholder="Cantidad" required>
      <label class="form-label" for="amount-product">Cantidad</label>
     
      <!-- <div class="invalid-feedback">
      Debes tener al menos 1 artículo en el carrito.
      </div> -->
  </div>
    </form>

          <h4 id="subtotal-product" class="text-muted pe-3">${currency} ${unitCost}</h4> 
        
          <div class="col my-auto me-3">
          <button id="btn-delete" class="btn btn-close " type="button" form="frm-product-amount"></button>
          </div>
        
          </div>
        
       
        
    
    </div>
</div>
</div>`;
    /* --- fin producto carrito categories template --- */
  }
  /* --- fin obtener producto precargado carrito --- */

  /* --- funciones todos los costos REACTIVAR SI total_to_pay_final NO FUNCIONA --- */
  /* --- calcular subtotal producto 02 NO CURRENCY --- */
  /*  function getProductSubtotal(prodAmount, prodCost) {
    if (prodAmount /* .value / >= 1) {
      return prodAmount * prodCost;
    } else {
      return (prodAmount = 0);
    }
  } */
  /* --- fin calcular subtotal producto 02 NO CURRENCY --- */
  /* --- funciones todos los costos REACTIVAR SI total_to_pay_final NO FUNCIONA --- */

  //console.log("getProductSubtotal: ", getProductSubtotal(-5, 25));
  /* --- calcular costo envio producto --- */

  /* --- funciones todos los costos REACTIVAR SI total_to_pay_final NO FUNCIONA --- */
  /* function getShippingCost(productCost, shippingCostPercent) {
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
  } */
  /* --- funciones todos los costos REACTIVAR SI total_to_pay_final NO FUNCIONA --- */
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

  /* --- carrito precargado --- */
  containerProducts.innerHTML += getCartPreloadedProducts();
  /* --- fin carrito precargado --- */

  /* --- funciones todos los costos REACTIVAR SI total_to_pay_final NO FUNCIONA --- */
  /* --- Subtotal inicial --- */
  /*  subtotalProduct.innerHTML =
    currency + " " + getProductSubtotal(amount, unitCost);
  /* --- fin Subtotal inicial --- /

  /* --- Subtotal inicial conjunto(AGREGAR COSTO ENVIO, TOTAL A PAGAR) --- /
  subtotalGeneral.innerHTML =
    currency + " " + getProductSubtotal(amount, unitCost); */
  /* --- fin Subtotal inicial conjunto(AGREGAR COSTO ENVIO, TOTAL A PAGAR) --- */
  /* --- funciones todos los costos REACTIVAR SI total_to_pay_final NO FUNCIONA --- */

  /* --- Hacer que sea una funcion para reutilizarla --- */
  let amountProduct = document.querySelector("#amount-product");

  /* --- subtotal, costo envio, total a pagar radioChange REACTIVAR SI total_to_pay_final NO FUNCIONA --- */
  let allCosts_1_Product = {};
  /*radiosShippingType.forEach((radio) => {
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
  /* --- FIN BLOQUE FUNCIONAL PREV ACTIVO --- /

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
  }); */
  /* --- fin  /* --- subtotal, costo envio, total a pagar radioChange REACTIVAR SI total_to_pay_final NO FUNCIONA --- */

  /* --- no se esta usando --- */
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
  /* --- no se esta usando --- */
  /* --- subtotal, costo envio, total a pagar inputAmount + radioChange REACTIVAR SI total_to_pay_final NO FUNCIONA --- */
  /* amountProduct.addEventListener("input", () => {
    radiosShippingType.forEach((radio) => {
      radio.addEventListener("change", (chng) => {
        subtotalProduct.innerHTML =
          currency + " " + getProductSubtotal(amountProduct.value, unitCost);

        /* --- Subtotal conjunto --- /
        subtotalGeneral.innerHTML =
          currency + " " + getProductSubtotal(amountProduct.value, unitCost);
        /* --- fin Subtotal conjunto --- /

        console.log(subtotalGeneral.innerHTML.slice(4));

        shippingCostGeneral.innerHTML =
          currency +
          " " +
          getShippingCost(
            getProductSubtotal(amountProduct.value, unitCost),
            radio.value //subtotalGeneral.innerHTML.slice(4)
          );
        /* --- fin costo envio conjunto --- /

        /* --- total a pagar conjunto --- /

        totalCostGeneral.innerHTML =
          currency +
          " " +
          (getProductSubtotal(amountProduct.value, unitCost) +
            getShippingCost(
              getProductSubtotal(amountProduct.value, unitCost),
              radio.value //subtotalGeneral.innerHTML.slice(4)
            ));
        /* --- fin total a pagar conjunto --- /
      });
    });
  }); */
  /* --- fin subtotal, costo envio, total a pagar inputAmount + radioChange REACTIVAR SI total_to_pay_final NO FUNCIONA --- */

  /* --- fin Hacer que sea una funcion para reutilizarla --- */

  /* --- fin Llamado funciones --- */

  /* --- Guardar cantidad productos localstorage v3 PREV ACTIVO --- */
  amountProduct.addEventListener("change", (event) => {
    //  event.returnValue = arrIdsCartProductsLocalStorage.splice(1, 1);
    // REACTIVAR 03 ---> localStorage.setItem("cartProducts", JSON.stringify(amountProduct.value));
    //subtotalGeneral.innerHTML = getCheckedRadioShippingType(radiosShippingType);
    /* --- Subtotal inicial conjunto --- */
    /* subtotalGeneral.innerHTML =
      currency + " " + getProductSubtotal(amount, unitCost); */
    /* --- fin Subtotal inicial conjunto --- */
  });
  /* --- fin Guardar cantidad productos localstorage v3 PREV ACTIVO --- */

  /* --- cargar email usuario ---- */
  // loadUserEmail("#navbar-dropdown-user");
  /* --- fin cargar email usuario --- */

  const btnDelete = document.querySelector("#btn-delete");
  btnDelete.onclick = (clck) => {
    console.log(clck.currentTarget.parentElement);
    function itemRemove(itemsToRemove, removeFromUI) {
      for (const child of itemsToRemove.children) {
        child.remove();
      }
      removeFromUI.forEach((element) => {
        element.innerHTML = "";
      });
    }
    itemRemove(containerProducts, [
      subtotalProduct,
      subtotalGeneral,
      shippingCostGeneral,
      totalCostGeneral,
    ]);
  };
  /* --- diferentes selectores btnDelete --- */
  // JS path = document.querySelector("#btn-delete")
  // xpath = //*[@id="btn-delete"]
  // full xpath = /html/body/main/div/div/div[1]/div/div/div[2]/form/div[2]/button
  /* --- fin diferentes selectores btnDelete --- */

  /* --- script dinamico StckOvrflw --- */
  /* const scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = "src/total_to_pay/total_to_pay_final.js";
  });

  scriptPromise.then(() => {
    console.log(arrProducts);
  }); */
  /* --- fin script dinamico StckOvrflw --- */

  /* --- script dinamico mio --- */
  /* document.body.innerHTML +=
    '<script src="src/total_to_pay/total_to_pay_final.js"></script>'; */
  /* --- fin script dinamico mio --- */
});
/* --- fin DOMContentLoaded --- */
