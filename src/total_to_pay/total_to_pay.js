/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", (dmcntld) => {
  // El subtotal general: la suma de los subtotales (costo por cantidad) de todos los artículos
  /* --- arr de prueba funciones --- */
  const arrProducts = [
    (prod_4 = { id: 39, unitCost: 3.5, count: 83 }),
    (prod_1 = { id: 7, unitCost: 1000, count: 5 }),
    (prod_5 = { id: 378, unitCost: 13, count: 22 }),
    (prod_1 = { id: 7, unitCost: 751, count: 1 }),
    (prod_3 = { id: 25, unitCost: 79, count: 1 }),
    (prod_2 = { id: 9, unitCost: 27, count: 3 }),
  ];
  // logica sort: a - b = [378, 39, 25, 9, 7, 7] ???
  // console.log(arrProducts[0] instanceof Object);
  //console.log(arrProducts[1].id);
  /* --- fin arr de prueba funciones --- */

  /* --- set test --- */
  /*  const set_01 = new Set([3, 831, "m", "3", 0.99, 831]);
  console.log(set_01.add("🥟")); */
  /* --- fin set test --- */

  /* --- subtotal producto individual --- */
  const getSubtotalProduct = (productCost, productCount) => {
    return productCost * productCount;
  };
  console.log(
    "getSubtotalProduct",
    getSubtotalProduct(arrProducts[5].unitCost, arrProducts[5].count)
  );
  /* --- fin subtotal producto individual --- */

  /* --- subtotal muchos productos forEach  --- */
  const getSubtotalGeneralProducts = (arrProducts) => {
    let subtotalAllProducts = 0;
    arrProducts.forEach((prod) => {
      return (subtotalAllProducts += getSubtotalProduct(
        prod.unitCost,
        prod.count
      ));
    });
    return subtotalAllProducts;
  };
  console.log(
    "getSubtotalGeneralProducts:",
    getSubtotalGeneralProducts(arrProducts)
  );
  /* --- fin subtotal muchos productos forEach  --- */

  /* --- array subtotal varios productos --- */
  const getArrSubtotalsOfProductsMapped = (arrProducts) => {
    return arrProducts.map((prod) => {
      return getSubtotalProduct(prod.unitCost, prod.count);
    });
  };
  console.log(
    "getArrSubtotalsOfProductsMapped:",
    getArrSubtotalsOfProductsMapped(arrProducts)
  );

  /* --- fin array subtotal varios productos --- */

  /* --- subtotal general productos (suma subtotales individuales) --- */
  const getSubtotalGeneralReduced = (arrSubtotalsOfProducts) => {
    return arrSubtotalsOfProducts.reduce((prevProd, currProd) => {
      return prevProd + currProd;
    });
  };
  console.log(
    "getSubtotalGeneralReduced:",
    getSubtotalGeneralReduced(getArrSubtotalsOfProductsMapped(arrProducts))
  );
  /* --- fin subtotal general productos (suma subtotales individuales) --- */

  //El costo de envío: calculado a partir del envío seleccionado por el usuario (5%, 7% o 15%) y siendo un porcentaje del valor anterior (el subtotal).
  const shippingType = { standard: 5, express: 7, premium: 15 };
  const getShippingCost = (productCost, shippingCostPercent) => {
    return (productCost * shippingCostPercent) / 100;
  };

  console.log(
    "El costo unitario del productos es: $",
    arrProducts[0].unitCost,
    "\n el porcentaje del envío unitario es:",
    shippingType.premium,
    "%",
    "\n el valor del envio por la compra unitaria es: $",
    getShippingCost(arrProducts[0].unitCost, shippingType.premium)
  );

  //El total a pagar: la suma de los dos valores anteriores.
  const totalToPay = (subtotalProduct, shippingCost) => {
    return subtotalProduct + shippingCost;
  };
  console.log(
    `El subtotal de todos los productos es: $ ${getSubtotalGeneralReduced(
      getArrSubtotalsOfProductsMapped(arrProducts)
    )},\n el porcentaje del envío es: ${
      shippingType.express
    }%,\n el valor del envio por la compra total es: $ ${getShippingCost(
      getSubtotalGeneralReduced(getArrSubtotalsOfProductsMapped(arrProducts)),
      shippingType.express
    )} \n el valor total de la compra es: $ ${totalToPay(
      getSubtotalGeneralReduced(getArrSubtotalsOfProductsMapped(arrProducts)),
      getShippingCost(
        getSubtotalGeneralReduced(getArrSubtotalsOfProductsMapped(arrProducts)),
        shippingType.express
      )
    )}`
  );
  console.log(
    "totalToPay:",
    totalToPay(
      getSubtotalGeneralReduced(getArrSubtotalsOfProductsMapped(arrProducts)),
      getShippingCost(
        getSubtotalGeneralReduced(getArrSubtotalsOfProductsMapped(arrProducts)),
        shippingType.express
      )
    )
  );

  /* --- findIndex segun id --- */
  const foundIndex = arrProducts.findLastIndex((prod) => {
    return prod.id === 7;
  });
  console.log("foundIndex:", foundIndex);
  /* --- fin findIndex segun id --- */

  /* --- findValue segun id --- */
  const foundValue = arrProducts.findLast((prod) => {
    return prod.id === 7;
  });
  console.log("foundValue:", foundValue);
  /* --- fin findValue segun id --- */

  /* --- indexOf segun id --- */
  const indexOfValue = arrProducts.indexOf(prod_3);
  console.log("indexOf:", indexOfValue);
  /* --- fin indexOf segun id --- */

  /* --- sort segun id --- */
  const sortedArr = arrProducts.sort((a, b) => {
    /* --- orden ascendente individual --- */
    // return a.id - b.id;
    /* --- fin orden ascendente individual --- */
    /* --- orden descendente individual --- */
    return b.id - a.id;
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
});
/* --- fin DOMContentLoaded --- */
// p1: 100, p2: 256, p3: 379
// primero sumar todos, despues calcular 5% del total: 735 * 0.05 = 36.75
// primero calcular 5% de c/u, despues sumar todos: 5 + 12.8 + 18.95 = 36,75
