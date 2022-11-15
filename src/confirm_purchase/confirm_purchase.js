import { fetchData } from "../fetch/fetch.js";
import { itemRemove } from "../../js/cart.js";

/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", async (dmcntld) => {
  const btnBuy = document.querySelector("#btn-buy");
  const radiosPaymentMethod = document.querySelectorAll(
    "[name=payment-method]"
  );
  const paymentMethodSelected = document.querySelector(
    "#payment-method-selected"
  );

  /* --- btnBuy.onclick eventListener --- */
  btnBuy.onclick = (click) => {
    const allForms = document.querySelectorAll("[novalidate]");
    const invalidPaymentMethod = document.querySelector(
      "#invalid-payment-method"
    );
    const alertPurchaseSuccesful = document.querySelector(
      "#alert-purchase-succesful"
    );
    const containerProducts = document.querySelector("#container-products");

    const subtotalGeneral = document.querySelector(
      "#subtotal-general-products"
    );
    const shippingCostGeneral = document.querySelector("#shipping-cost");
    const totalCostGeneral = document.querySelector("#total-cost");
    const fldstFrmGeneral = document.querySelector("#fldst-frm-buy");
    const fldstFrmBuyInputs = document.querySelectorAll("#fldst-frm-buy input");

    /* --- validacion array.from, every --- */
    const arrForms = Array.from(allForms);
    const arrFormsSpread = [...allForms];

    arrForms.every((form) => {});
    /* --- fin validacion array.from, every --- */

    /* --- validacion v2 cada elemento individual --- */
    /* --- obtener array con validaciones de todos los formularios --- */
    const getArrValidities = (iterableObject) => {
      const arrValidities = [];
      iterableObject.forEach((element, i) => {
        // form.submit();
        element.classList.add("was-validated");
        arrValidities.push(element.checkValidity());
      });
      return arrValidities;
    };

    const arrValidities = getArrValidities(allForms);
    /* --- fin obtener array con validaciones de todos los formularios --- */

    /* --- muestra/oculta alerta indicando que no se selecciono/completo medio de pago en modal correctamente --- */
    arrValidities[2] === false
      ? invalidPaymentMethod.classList.add("d-block")
      : invalidPaymentMethod.classList.remove("d-block");
    /* --- muestra/oculta alerta indicando que no se selecciono/completo medio de pago en modal correctamente --- */

    /* --- Mostrar medio de pago seleccionado --- */
    radiosPaymentMethod.forEach((radio) => {
      radio.addEventListener("change", (chng) => {
        radio.checked ? (paymentMethodSelected.innerHTML = radio.value) : "";
      });
    });
    /* --- fin Mostrar medio de pago seleccionado --- */

    /* --- verifica que todos los forms sean validos; y de serlo muestra alerta de compra exitosa, quita el producto del carrito, inhabilita interaccion con formulario, limpia valores de las entradas --- */
    if (
      arrValidities.every((formValidity) => {
        return formValidity === true;
      })
    ) {
      alertPurchaseSuccesful.classList.replace("d-none", "d-block"),
        itemRemove(containerProducts, [
          subtotalGeneral,
          shippingCostGeneral,
          totalCostGeneral,
        ]);

      fldstFrmBuyInputs.forEach((input) => {
        input.value = "";
        input.removeAttribute("checked");
      });

      fldstFrmGeneral.setAttribute("disabled", "true");
    }
    /* --- fin verifica que todos los forms sean validos --- */

    /* const arrBooleansTest = [true, true, true];
    console.log(
      "arrBooleansTest every: ",
      arrBooleansTest.every((formValidity) => {
        return formValidity === true;
      })
    );

    console.log(
      "arrBooleansTest reduce: ",
       arrBooleansTest.reduce(
        (previousValue, currentValue) => {
          return previousValue && currentValue;
        }
      )
    ); */
    /* --- fin validacion v2 cada elemento individual --- */
  };
  /* --- fin btnBuy.onclick eventListener --- */
});
/* --- fin DOMContentLoaded --- */
