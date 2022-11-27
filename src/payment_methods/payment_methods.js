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

  const mdlFieldsetCreditCard = document.querySelector(
    "#mdl-fieldset-credit-card"
  );
  const mdlFieldsetBankTransference = document.querySelector(
    "#mdl-fieldset-bank-transference"
  );

  radiosPaymentMethods.forEach((radiopayMethod) => {
    radiopayMethod.addEventListener("change", (chng) => {
      if (radioPayMethodCreditCard.checked) {
        mdlFieldsetCreditCard.removeAttribute("disabled");
        mdlFieldsetBankTransference.setAttribute("disabled", "true");
      } else if (radioPayMethodBankTransference.checked) {
        mdlFieldsetBankTransference.removeAttribute("disabled");
        mdlFieldsetCreditCard.setAttribute("disabled", "true");
      }
    });
  });
});
/* --- fin DOMContentLoaded --- */
