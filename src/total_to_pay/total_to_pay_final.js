/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", async (dmcntld) => {
  // El subtotal general: la suma de los subtotales (costo por cantidad) de todos los artículos
  /* --- fetch repetido --- */
  const cartPreloadedProds = await fetchInfo(cartURL);
  const [articles] = cartPreloadedProds.articles;
  const { id, name, currency, unitCost, count: amount, image } = articles;
  //console.log("articles: ", articles);
  //console.log("id: ", id);
  const radiosShippingType = document.querySelectorAll("[name=type-delivery]");
  const amountProduct = document.querySelector("#amount-product");

  const subtotalProduct = document.querySelector("#subtotal-product");
  const subtotalGeneral = document.querySelector("#subtotal-general-products");
  const shippingCostGeneral = document.querySelector("#shipping-cost");
  const totalCostGeneral = document.querySelector("#total-cost");

  const arrSubtotalEachProduct = [];
  /* --- fin fetch repetido --- */
  /* --- arr de prueba funciones --- */
  const arrProducts = [
    (prod_4 = { id: 39, unitCost: 3.5, amount: 83 }),
    (prod_1 = { id: 7, unitCost: 1000, amount: 5 }),
    (prod_5 = { id: 378, unitCost: 13, amount: 22 }),
    (prod_1 = { id: 7, unitCost: 751, amount: 1 }),
    (prod_3 = { id: 25, unitCost: 79, amount: 1 }),
    (prod_2 = { id: 9, unitCost: 27, amount: 3 }),
  ];
  console.log("arrProducts: ", arrProducts);
  /* --- fin arr de prueba funciones --- */
  console.log(radiosShippingType);
  /* --- subtotal producto individual --- */
  const getSubtotalProduct = (productCost, productAmount) => {
    if (productAmount < 0) {
      productAmount = 0;
    }
    return productCost * productAmount;
  };
  console.log(
    "getSubtotalProduct_1",
    getSubtotalProduct(arrProducts[2].unitCost, arrProducts[2].amount),
    "getSubtotalProduct_2",
    getSubtotalProduct(arrProducts[1].unitCost, arrProducts[1].amount)
  );

  /* --- intento devolviendo array de subtotales ---  */
  const getArraySubtotalEachProduct = (productCost, productAmount) => {
    // const arrSubtotalEachProduct = [];
    if (productAmount < 0) {
      productAmount = 0;
    }
    arrSubtotalEachProduct.push(productCost * productAmount);
    // return arrSubtotalEachProduct;
  };
  /* console.log(
    "getArraySubtotalEachProduct_1",
    getArraySubtotalEachProduct(arrProducts[2].unitCost, arrProducts[2].amount),
    "getArraySubtotalEachProduct_2",
    getArraySubtotalEachProduct(arrProducts[5].unitCost, arrProducts[5].amount),
    "getArraySubtotalEachProduct_3",
    getArraySubtotalEachProduct(arrProducts[3].unitCost, arrProducts[3].amount),
    "arrSubtotalEachProduct: ",
    arrSubtotalEachProduct
  ); */
  /* --- fin intento devolviendo array de subtotales ---  */
  /* --- fin subtotal producto individual --- */

  /* --- subtotal muchos productos forEach  --- */
  const getSubtotalGeneralProducts = (
    /* [{ unitCost, amount }] */ getSubtotalProduct
  ) => {
    /* let subtotalGeneralProducts = 0;
    return arrProducts.forEach((prod) => {
      return  subtotalGeneralProducts += getSubtotalProduct(
        prod.unitCost,
        prod.amount
      );
    });
     return subtotalGeneralProducts; */

    let subtotalGeneralProducts = 0;
    [{ unitCost, amount }].forEach(() => {
      return (subtotalGeneralProducts += getSubtotalProduct(unitCost, amount));
    });
    return subtotalGeneralProducts;
  };
  console.log(
    "getSubtotalGeneralProducts:",
    getSubtotalGeneralProducts(
      /* [
      { unitCost, amount },
      arrProducts[1].unitCost,
      arrProducts[1].amount,
    ] */ function () {
        return getSubtotalProduct(unitCost, amount);
      }
    )
  );

  /* --- test velocidad bucles --- */
  /* --- array de 1 a 1.000.000 --- */
  const arrNums = [];
  for (let i = 0; i < 1000000; i++) {
    arrNums.push(i);
  }
  /* --- fin array de 1 a 1.000.000 --- */
  //console.log(arrNums);

  /* --- for --- */
  regularFor = function () {
    console.time("regularForTimer");
    let index = 0;
    for (; index < arrNums.length; index++) {
      /*  if (index === 500000) {
        //console.timeStamp("regularForTimer");
        //console.timeLog("regularForTimer");
        console.log(
          "regularForIndex: ",
          index,
          console.timeStamp("regularForTimer")
        );
      } */
    }

    return index, console.timeEnd("regularForTimer");
  };
  regularFor();
  //console.log("regularFor(): ", regularFor());
  /* --- fin for --- */

  /* --- for of --- */
  forOfLoop = function () {
    console.time("forOfTimer");
    let index = 0;
    for (index of arrNums) {
    }

    return index, console.timeEnd("forOfTimer");
  };
  forOfLoop();
  /* --- fin for of --- */

  /* --- forEach --- */
  forEachLoop = function () {
    console.time("forEachTimer");
    return arrNums.forEach((index) => index), console.timeEnd("forEachTimer");

    //return index, console.timeEnd("forEachTimer");
  };
  forEachLoop();
  /* --- fin forEach --- */

  /* --- test velocidad bucles --- */

  /* --- fin subtotal muchos productos forEach  --- */

  /* --- array subtotal varios productos --- */
  const getArrSubtotalsOfProductsMapped = ([{ unitCost, amount }]) => {
    return [{ unitCost, amount }].map((prod) => {
      return getSubtotalProduct(unitCost, amount);
    });
  };
  console.log(
    "getArrSubtotalsOfProductsMapped:",
    getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
  );

  /* --- fin array subtotal varios productos --- */

  /* --- subtotal general productos (suma subtotales individuales) --- */
  const getSubtotalGeneralReduced = ([arrNumbers]) => {
    return [arrNumbers].reduce((prevProd, currProd) => {
      return prevProd + currProd;
    });
  };

  console.log(
    "getSubtotalGeneralReduced:",
    getSubtotalGeneralReduced(
      getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
    )
  );
  /* --- fin subtotal general productos (suma subtotales individuales) --- */

  //El costo de envío: calculado a partir del envío seleccionado por el usuario (5%, 7% o 15%) y siendo un porcentaje del valor anterior (el subtotal).
  const shippingType = { standard: 5, express: 7, premium: 15 };
  const getShippingCost = (productCost, shippingCostPercent) => {
    return (productCost * shippingCostPercent) / 100;
  };

  console.log(
    "El costo unitario del productos es: $",
    unitCost,
    "\n el porcentaje del envío unitario es:",
    shippingType.premium,
    "%",
    "\n el valor del envio por la compra unitaria es: $",
    getShippingCost(unitCost, shippingType.premium)
  );

  //El total a pagar: la suma de los dos valores anteriores.
  const totalToPay = (subtotalProduct, shippingCost) => {
    return subtotalProduct + shippingCost;
  };
  console.log(
    `El subtotal de todos los productos es: $ ${getSubtotalGeneralReduced(
      getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
    )},\n el porcentaje del envío es: ${
      shippingType.express
    }%,\n el valor del envio por la compra total es: $ ${getShippingCost(
      getSubtotalGeneralReduced(
        getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
      ),
      shippingType.express
    )} \n el valor total de la compra es: $ ${totalToPay(
      getSubtotalGeneralReduced(
        getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
      ),
      getShippingCost(
        getSubtotalGeneralReduced(
          getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
        ),
        shippingType.express
      )
    )}`
  );
  console.log(
    "totalToPay:",
    totalToPay(
      getSubtotalGeneralReduced(
        getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
      ),
      getShippingCost(
        getSubtotalGeneralReduced(
          getArrSubtotalsOfProductsMapped([{ unitCost, amount }])
        ),
        shippingType.express
      )
    )
  );

  /* --- findIndex segun id --- */
  const foundIndex = [articles].findIndex((prod) => {
    return prod.id === 50924;
  });
  console.log("foundIndex:", foundIndex);
  /* --- fin findIndex segun id --- */

  /* --- findValue segun id --- */
  const foundValue = [articles].find((prod) => {
    return prod.id === 50924;
  });
  console.log("foundValue:", foundValue);
  /* --- fin findValue segun id --- */

  /* --- indexOf segun id --- */
  const indexOfValue = [articles.id].indexOf(50924);
  console.log("indexOf:", indexOfValue);
  /* --- fin indexOf segun id --- */

  /* --- sort segun id --- */
  const sortedArr = [id].sort((a, b) => {
    /* --- orden ascendente individual --- */
    // return a.id - b.id;
    /* --- fin orden ascendente individual --- */
    /* --- orden descendente individual --- */
    return b - a;
    /* --- fin orden descendente individual --- */

    /* --- orden inmaculado individual ??? --- */
    // return a.id === b.id;
    /* --- fin orden inmaculado individual ??? --- */

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
  console.log("sort:", sortedArr);
  /* --- fin sort segun id --- */

  /* --- Implementacion funciones --- */
  /* --- al cargar la pagina --- */
  /* --- Subtotal general conjunto --- */
  subtotalGeneral.innerHTML =
    currency +
    " " +
    /* getProductSubtotal(amountProduct.value, unitCost) */ getSubtotalProduct(
      unitCost,
      amount
    );
  /* --- fin Subtotal general conjunto --- */
  /* --- costo envio conjunto --- */
  //console.log(subtotalGeneral.innerHTML.slice(4));
  radiosShippingType.forEach((radio) => {
    shippingCostGeneral.innerHTML = currency + " " + 0;
  });
  /* --- fin costo envio conjunto --- /
  /* --- fin al cargar la pagina --- */

  /* --- al cambiar el tipo de envio --- */
  radiosShippingType.forEach((shippingType) => {
    shippingType.addEventListener("change", (chng) => {
      console.log("shippingType: ", shippingType.value);
      //chng.target.parentNode ?
      //ir hacia atras con for ? shippingType.parentElement.id ="frm-buy"
      shippingCostGeneral.innerHTML =
        currency +
        " " +
        getShippingCost(
          getSubtotalProduct(amountProduct.value, unitCost),
          shippingType.value //subtotalGeneral.innerHTML.slice(4)
        );

      console.log(
        "shippingType.parentElement.id: ",
        shippingType.parentElement.parentElement.parentElement,
        shippingType.parentElement.parentElement.parentElement.attributes.getNamedItem(
          "id"
        ) == "frm-buy" //<--- SEGIOR AQUI
      ); //self.

      /* --- total a pagar conjunto --- */
      totalCostGeneral.innerHTML =
        currency +
        " " +
        (getSubtotalProduct(unitCost, amountProduct.value) +
          getShippingCost(
            getSubtotalProduct(unitCost, amountProduct.value),
            shippingType.value //subtotalGeneral.innerHTML.slice(4)
          ));
      /* --- fin total a pagar conjunto --- */
    });
  });
  /* --- fin al cambiar el tipo de envio --- */

  /* --- al cambiar la cantidad del producto --- */
  amountProduct.addEventListener("input", (inpt) => {
    console.log("amountProduct: ", amountProduct.value, inpt.currentTarget);

    /* --- Subtotal producto conjunto --- */
    subtotalProduct.innerHTML =
      currency +
      " " +
      /* getProductSubtotal(amountProduct.value, unitCost) */ getSubtotalProduct(
        unitCost,
        amountProduct.value
      );
    /* --- Subtotal producto conjunto --- */

    /* --- Subtotal general conjunto --- */
    subtotalGeneral.innerHTML =
      currency +
      " " +
      /* getProductSubtotal(amountProduct.value, unitCost) */ getSubtotalProduct(
        unitCost,
        amountProduct.value
      );
    /* --- fin Subtotal general conjunto --- */

    /* --- costo envio y total a pagar conjunto --- */
    /* --- costo envio conjunto --- */
    //console.log(subtotalGeneral.innerHTML.slice(4));
    radiosShippingType.forEach((radio) => {
      if (radio.checked) {
        shippingCostGeneral.innerHTML =
          currency +
          " " +
          getShippingCost(
            getSubtotalProduct(unitCost, amountProduct.value),
            radio.value //subtotalGeneral.innerHTML.slice(4)
          );
      } /* else {
        shippingCostGeneral.innerHTML = currency + " " + 0;
      } */
      /* --- fin costo envio conjunto --- */

      /* --- total a pagar conjunto --- */
      totalCostGeneral.innerHTML =
        currency +
        " " +
        (getSubtotalProduct(unitCost, amountProduct.value) +
          getShippingCost(
            getSubtotalProduct(unitCost, amountProduct.value),
            radio.value //subtotalGeneral.innerHTML.slice(4)
          ));
      /* --- fin total a pagar conjunto --- */
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
