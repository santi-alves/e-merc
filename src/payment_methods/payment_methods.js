/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", (dmcntld) => {
  const radioPayMethodCreditCard = document.querySelector(
    "#radio-payment-method-credit-card"
  );
  const radioPayMethodBankTransference = document.querySelector(
    "#radio-payment-method-bank-transference"
  );
  const radiosPaymentMethods = document.querySelectorAll(
    "[name=payment-method]"
  );
  //console.log(radiosPaymentMethods);

  const mdlFieldsetCreditCard = document.querySelector(
    "#mdl-fieldset-credit-card"
  );
  const mdlFieldsetBankTransference = document.querySelector(
    "#mdl-fieldset-bank-transference"
  );

  /* const spinnerNumberInpt = document.querySelector(
    '[pseudo="-webkit-inner-spin-button"]'
  );
  console.log(spinnerNumberInpt); */
  //[pseudo="-webkit-inner-spin-button"], #spin

  // console.log(mdlFieldsetCreditCard, mdlFieldsetBankTransference);
  /* payMethod.onchange = (chng) => {
    radiosPaymentMethods.forEach((payMethod) => {
    console.log(payMethod);
    /* if (radioPayMethodCreditCard.checked) {
      //const mdlInptsCreditCard = document.querySelector("#mdl-inpts-credit-card > input");
     // console.log(payMethod);
    } /
});
  }; */

  radiosPaymentMethods.forEach((radiopayMethod) => {
    radiopayMethod.addEventListener("change", (chng) => {
      // radiopayMethod.toggleAttribute("disabled");
      if (radioPayMethodCreditCard.checked) {
        //const mdlInptsCreditCard = document.querySelector("#mdl-inpts-credit-card > input");

        //mdlFieldsetBankTransference.toggleAttribute("disabled");
        mdlFieldsetCreditCard.removeAttribute("disabled");
        mdlFieldsetBankTransference.setAttribute("disabled", "true");
      } else if (radioPayMethodBankTransference.checked) {
        //mdlFieldsetCreditCard.toggleAttribute("disabled");
        mdlFieldsetBankTransference.removeAttribute("disabled");
        mdlFieldsetCreditCard.setAttribute("disabled", "true");
      }

      /* else {
        mdlFieldsetCreditCard.setAttribute("disabled", "true");
        mdlFieldsetBankTransference.setAttribute("disabled", "true");
      } */
      /* --- switch test 01 --- */
      /* switch (radioPayMethodCreditCard) {
        case radioPayMethodCreditCard.checked:
          mdlFieldsetCreditCard.removeAttribute("disabled");
          mdlFieldsetBankTransference.setAttribute("disabled", "true");
          break;

        case !radioPayMethodCreditCard.checked:
          mdlFieldsetCreditCard.removeAttribute("disabled");
          mdlFieldsetBankTransference.setAttribute("disabled", "true");
          break;

        default:
          break;
      } */
      /* --- fin switch test 01 --- */
    });
  });
});
/* --- fin DOMContentLoaded --- */

/* --- switch test demo 02 --- */
/* const num = "uwu";

switch (num) {
  case 3:
    
    console.log("El valor seleccionado es: ", "<3");
    break;

  case 5:
    console.log("El valor seleccionado es: ", "<5");
    break;

  default:
    console.log("El valor seleccionado es: ", num);
     break labelOutside;
}

function name(params) {
    labelOutside: console.log("label outside");
} */
/* --- fin switch test demo 02 --- */
