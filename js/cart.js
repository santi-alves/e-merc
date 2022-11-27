import { fetchData } from "../src/fetch/fetch.js";

const cartURL =
  "http://localhost:3000/cart/" /* CART_INFO_URL */ +
  25801 +
  /* EXT_TYPE */ ".json";

/* --- eliminar items de contenedor padre --- */
export const itemRemove = (itemsToRemove, removeFromUI) => {
  for (const child of itemsToRemove.children) {
    child.remove();
  }
  removeFromUI.forEach((element) => {
    element.innerHTML = "";
  });
};
/* --- fin eliminar items de contenedor padre --- */

/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", async () => {
  /* --- definicion variables --- */
  const cartPreloadedProds = await fetchData(cartURL);
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

  const subtotalGeneral = document.querySelector("#subtotal-general-products");
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

  /* --- saber cual radio esta seleccionado (sirve de algo?) --- */
  const whichIsChecked = (nodeListToCheck) => {
    return nodeListToCheck.forEach((element) => {
      if (element.checked) {
        return element;
      }
    });
  };
  /* --- fin saber cual radio esta seleccionado (sirve de algo?) --- */

  /* --- carrito precargado --- */
  containerProducts.innerHTML += getCartPreloadedProducts();
  /* --- fin carrito precargado --- */

  /* --- Hacer que sea una funcion para reutilizarla --- */
  let amountProduct = document.querySelector("#amount-product");
  let allCosts_1_Product = {};

  /* --- funcion todo en uno (no se esta usando) --- */
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
  /* --- fin funcion todo en uno (no se esta usando) --- */

  /* --- fin Hacer que sea una funcion para reutilizarla --- */

  /* --- fin Llamado funciones --- */

  /* --- Guardar cantidad productos localstorage v3 PREV ACT--- */
  amountProduct.addEventListener("change", (event) => {
    //  event.returnValue = arrIdsCartProductsLocalStorage.splice(1, 1);
    // REACTIVAR 03 ---> localStorage.setItem("cartProducts", JSON.stringify(amountProduct.value));
    //subtotalGeneral.innerHTML = getCheckedRadioShippingType(radiosShippingType);
    /* --- Subtotal inicial conjunto --- */
    /* subtotalGeneral.innerHTML =
      currency + " " + getProductSubtotal(amount, unitCost); */
    /* --- fin Subtotal inicial conjunto --- */
  });
  /* --- fin Guardar cantidad productos localstorage v3 PREV ACT--- */

  /* --- Eliminar producto del carrito --- */
  const btnDelete = document.querySelector("#btn-delete");
  btnDelete.onclick = (clck) => {
    const fldstFrmGeneral = document.querySelector("#fldst-frm-buy");
    const fldstFrmBuyInputs = document.querySelectorAll("#fldst-frm-buy input");
    const invalidPaymentMethod = document.querySelector(
      "#invalid-payment-method"
    );
    const paymentMethodSelected = document.querySelector(
      "#payment-method-selected"
    );
    // console.log(clck.currentTarget.parentElement); <--- intentar iterar en jerarquia DOM hasta llegar a contenedor padre(comparar id), seleccionar y eliminar descendientes

    itemRemove(containerProducts, [
      subtotalGeneral,
      shippingCostGeneral,
      totalCostGeneral,
    ]);

    fldstFrmBuyInputs.forEach((input) => {
      input.value = "";
    });

    paymentMethodSelected.innerHTML = "No se ha seleccionado.";
    invalidPaymentMethod.classList.add("d-none");
    fldstFrmGeneral.setAttribute("disabled", "true");
  };
  /* --- fin Eliminar producto del carrito --- */

  /* --- diferentes selectores btnDelete --- */
  // JS path = document.querySelector("#btn-delete")
  // xpath = //*[@id="btn-delete"]
  // full xpath = /html/body/main/div/div/div[1]/div/div/div[2]/form/div[2]/button
  /* --- fin diferentes selectores btnDelete --- */
});
/* --- fin DOMContentLoaded --- */
