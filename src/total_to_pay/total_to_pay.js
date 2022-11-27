import { fetchData } from "../fetch/fetch.js";

/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", async (dmcntld) => {
  // El subtotal general: la suma de los subtotales (costo por cantidad) de todos los artículos

  /* --- fetch repetido --- */
  const cartPreloadedProds = await fetchData(
    /* CART_INFO_URL + 25801 + EXT_TYPE */ "http://localhost:3000/cart/" /* CART_INFO_URL */ +
      25801 +
      /* EXT_TYPE */ ".json"
  );
  const [articles] = cartPreloadedProds.articles;
  const { id, name, currency, unitCost, count: amount, image } = articles;

  const radiosShippingType = document.querySelectorAll("[name=type-delivery]");
  const amountProduct = document.querySelector("#amount-product");

  const subtotalProduct = document.querySelector("#subtotal-product");
  const subtotalGeneral = document.querySelector("#subtotal-general-products");
  const shippingCostGeneral = document.querySelector("#shipping-cost");
  const totalCostGeneral = document.querySelector("#total-cost");

  const arrSubtotalEachProduct = [];
  /* --- fin fetch repetido --- */

  /* --- subtotal producto individual --- */
  const getSubtotalProduct = (productCost, productAmount) => {
    if (productAmount < 0) {
      productAmount = 0;
    }
    return productCost * productAmount;
  };

  /* --- intento devolviendo array de subtotales (no se utiliza) ---  */
  const getArraySubtotalEachProduct = (productCost, productAmount) => {
    const arrSubtotalEachProduct = [];
    if (productAmount < 0) {
      productAmount = 0;
    }
    arrSubtotalEachProduct.push(productCost * productAmount);
    return arrSubtotalEachProduct;
  };
  /* --- fin intento devolviendo array de subtotales (no se utiliza) ---  */
  /* --- fin subtotal producto individual --- */

  /* --- subtotal muchos productos forEach (no se utiliza) --- */
  const getSubtotalGeneralProducts = (getSubtotalProduct) => {
    let subtotalGeneralProducts = 0;
    [{ unitCost, amount }].forEach(() => {
      subtotalGeneralProducts += getSubtotalProduct(unitCost, amount);
    });
    return subtotalGeneralProducts;
  };
  /* --- fin subtotal muchos productos forEach (no se utiliza) --- */

  /* --- array subtotal varios productos (no se utiliza) --- */
  const getArrSubtotalsOfProductsMapped = (
    /*[{ unitCost, amount } 
  ]*/ arrOfSubtotalProds
  ) => {
    return /* { unitCost, amount } */ arrOfSubtotalProds.map((prod) => {
      return getSubtotalProduct(prod.unitCost, prod.amount);
    });
  };
  console.log(
    "getArrSubtotalsOfProductsMapped: ",
    getArrSubtotalsOfProductsMapped([
      { unitCost: 5, amount: 2 },
      { unitCost: 5, amount: 7 },
      { unitCost: 4, amount: 6 },
    ])
  );
  /* --- fin array subtotal varios productos (no se utiliza) --- */

  /* --- subtotal general productos (suma subtotales individuales) (no se utiliza) --- */
  const getSubtotalGeneralReduced = (/* [arrNumbers] */ arrOfNumbers) => {
    return /* [arrNumbers] */ arrOfNumbers.reduce((prevProd, currProd) => {
      return prevProd + currProd;
    });
  };
  console.log(
    "getSubtotalGeneralReduced: ",
    getSubtotalGeneralReduced([10, 35, 24])
  );
  /* --- fin subtotal general productos (suma subtotales individuales) (no se utiliza) --- */

  //El costo de envío: calculado a partir del envío seleccionado por el usuario (5%, 7% o 15%) y siendo un porcentaje del valor anterior (el subtotal).
  const getShippingCost = (productCost, shippingCostPercent) => {
    return (productCost * shippingCostPercent) / 100;
  };

  //El total a pagar: la suma de los dos valores anteriores.
  const getTotalToPay = (subtotalProduct, shippingCost) => {
    return subtotalProduct + shippingCost;
  };

  /* --- findIndex segun id --- */
  const foundIndex = [articles].findIndex((prod) => {
    return prod.id === 50924;
  });
  //console.log("foundIndex:", foundIndex);
  /* --- fin findIndex segun id --- */

  /* --- findValue segun id --- */
  const foundValue = [articles].find((prod) => {
    return prod.id === 50924;
  });
  //console.log("foundValue:", foundValue);
  /* --- fin findValue segun id --- */

  /* --- indexOf segun id --- */
  const indexOfValue = [articles.id].indexOf(50924);
  //console.log("indexOf:", indexOfValue);
  /* --- fin indexOf segun id --- */

  /* --- sort segun id --- */
  const sortedArr = [id].sort((a, b) => {
    /* --- orden descendente individual --- */
    return b - a;
    /* --- fin orden descendente individual --- */

    /* --- orden ascendente custom --- */
    /* if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    } else {
      return 0;
    } */
    /* --- fin orden ascendente custom --- */
  });
  //console.log("sort:", sortedArr);
  /* --- fin sort segun id --- */

  /* --- Implementacion funciones --- */
  /* --- al cargar la pagina --- */
  /* --- Subtotal general conjunto --- */
  subtotalGeneral.innerHTML =
    currency + " " + getSubtotalProduct(unitCost, amount);
  /* --- fin Subtotal general conjunto --- */

  /* --- fin al cargar la pagina --- */

  /* --- al cambiar el tipo de envio --- */
  radiosShippingType.forEach((shippingType) => {
    shippingType.addEventListener("change", (chng) => {
      //chng.target.parentNode ?
      //ir hacia atras con for ? shippingType.parentElement.id ="frm-buy"
      shippingCostGeneral.innerHTML =
        currency +
        " " +
        getShippingCost(
          getSubtotalProduct(amountProduct.value, unitCost),
          shippingType.value
        );

      /* --- total a pagar conjunto --- */
      totalCostGeneral.innerHTML =
        currency +
        " " +
        getTotalToPay(
          getSubtotalProduct(unitCost, amountProduct.value),
          getShippingCost(
            getSubtotalProduct(unitCost, amountProduct.value),
            shippingType.value
          )
        );
      /* --- fin total a pagar conjunto --- */
    });
  });
  /* --- fin al cambiar el tipo de envio --- */

  /* --- al cambiar la cantidad del producto --- */
  amountProduct.addEventListener("input", (inpt) => {
    /* --- Subtotal producto conjunto --- */
    subtotalProduct.innerHTML =
      currency + " " + getSubtotalProduct(unitCost, amountProduct.value);
    /* --- Subtotal producto conjunto --- */

    /* --- Subtotal general conjunto --- */
    subtotalGeneral.innerHTML =
      currency + " " + getSubtotalProduct(unitCost, amountProduct.value);
    /* --- fin Subtotal general conjunto --- */

    /* --- costo envio y total a pagar conjunto --- */
    /* --- costo envio conjunto --- */
    radiosShippingType.forEach((radio) => {
      if (radio.checked) {
        shippingCostGeneral.innerHTML =
          currency +
          " " +
          getShippingCost(
            getSubtotalProduct(unitCost, amountProduct.value),
            radio.value
          );
        /* --- fin costo envio conjunto --- */

        /* --- total a pagar conjunto --- */
        totalCostGeneral.innerHTML =
          currency +
          " " +
          getTotalToPay(
            getSubtotalProduct(unitCost, amountProduct.value),
            getShippingCost(
              getSubtotalProduct(unitCost, amountProduct.value),
              radio.value
            )
          );
        /* --- fin total a pagar conjunto --- */
      }
    });
    /* --- fin costo envio y total a pagar conjunto --- */
  });
  /* --- fin al cambiar la cantidad del producto --- */
  /* --- fin Implementacion funciones --- */
});
/* --- fin DOMContentLoaded --- */

// p1: 100, p2: 256, p3: 379
// primero sumar todos, despues calcular 5% del total: 735 * 0.05 = 36.75
// primero calcular 5% de c/u, despues sumar todos: 5 + 12.8 + 18.95 = 36,75
// subtotalP1 = 10 * 5 = 50
// subtotalP2 = 25 * 3 = 75
/* --- logica calcular costos --- */
//1. obtener subtotal del producto:
// subtotalProducto = precioProducto * cantidadProducto

//2. obtener subtotal general de los productos
// subtotalGeneralProductos = subtotalProducto_1 + subtotalProducto_2 + subtotalProducto_3 + ... subtotalProducto_n

//3. obtener costo de envio
// costoEnvio = (subtotalProducto * tipoEnvio(5%, 7%, 15%)) / 100

//4. obtener total a pagar
// totalAPagar = subtotalProducto + costoEnvio
/* --- fin logica calcular costos --- */

/* --- logica implementacion calcular costos --- */
//1. al cargar pagina
//1.a. obtener productoCarritoPrecargado, productosCarritoLocalStorage
//1.b. mostrar subtotalProducto, subtotalGeneralProductos del productoCarritoPrecargado

//2. al cambiar cantidadProducto pagina
//2.a. actualizar subtotalProducto, subtotalGeneralProductos, costoEnvio, totalAPagar

//3. al cambiar tipoEnvio pagina
//3.a. actualizar subtotalGeneralProductos, costoEnvio, totalAPagar

//4. al eliminar producto pagina
//4.a. actualizar subtotalGeneralProductos, costoEnvio, totalAPagar
/* --- fin logica implementacion calcular costos --- */
