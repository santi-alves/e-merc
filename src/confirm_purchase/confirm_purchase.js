/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", async (dmcntld) => {
  const btnBuy = document.querySelector("#btn-buy");
  const alertPurchaseSuccesful = document.querySelector(
    "#alert-purchase-succesful"
  );
  console.log(alertPurchaseSuccesful);

  /* --- btnBuy.onclick eventListener --- */
  btnBuy.onclick = (click) => {
    const allForms = document.querySelectorAll("[novalidate]");
    const form = document.querySelector("form");

    /* --- validacion intento .keys() --- */
    /* const formKeysList = allForms.values();
    let eachForm;
    for (const eachFormKey of formKeysList) {
      console.log("eachFormKey", eachFormKey);
    } intento con .keys() no funciona*/
    //console.log("eachForm: ", eachForm);
    /* --- fin validacion intento .keys() --- */

    //console.log("getComputedStyle: ", btnBuy.style);
    /* --- validacion array.from, every --- */
    const arrForms = Array.from(allForms);
    const arrFormsSpread = [...allForms];

    /* --- intento interfaz ValidityState --- */
    /* const validityStateTest_1 = () => ValidityState.prototype.valid; //<-- como se usan las interfaces ???
    console.log("validityStateTest_1: ", validityStateTest_1()); */
    /* --- fin intento interfaz ValidityState --- */

    console.log("arrForms: ", arrForms);
    console.log("arrFormsSpread: ", arrFormsSpread);

    /* --- ternary operator return test --- */
    const ternaryOperatorTest = (value) => (value ? "success" : "error");
    console.log("ternaryOperatorTest: ", ternaryOperatorTest(false));
    /* --- fin ternary operator return test --- */

    /* --- callbacks test 01 --- */
    const extendedAnswer = ({
      type,
      movement,
      food,
      typeCounter,
      typeWeakness,
    }) =>
      `... which type is ${type} 🐾, its most dangerous movement is ${movement} ⚡, it loves to eat ${food} 🍪, is strong versus ${typeCounter} 🎯. But weak against ${typeWeakness} 🤒`;

    const answer = (response, extendedResponse) => {
      return (
        "\n..." +
        response.toString().toUpperCase() +
        "❗ " +
        (extendedResponse
          ? extendedAnswer(extendedResponse)
          : "..That's all need to know →_→")
      );
    };

    const conversation = (question, response, extendedResponse) =>
      question + " 🕵️‍♂️" + answer(response, extendedResponse);

    console.log(
      conversation(
        "favourite pokemon?",
        "leafeon 🍃",
        undefined /* {
        type: "grass",
        movement: "solar beam",
        food: "berries",
        typeCounter: "earth",
        typeWeakness: "fire",
      } */
      )
    );
    /* --- fin callbacks test 01 --- */

    /* --- callbacks test 02 --- */
    const superpower = (sprpwr) => {
      return "fools... behold of my true power .. \t" + sprpwr + "🔥";
    };

    const strange = (weirdFeel, sprpwr) => {
      return `i'm starting to feel.. ${weirdFeel} \n it's here... ${superpower(
        sprpwr
      )}`;
    };

    const mood = (feeling, sprpwr) => {
      switch (feeling) {
        case ("strange", "weird", "awkward", "odd"):
          return strange(feeling, sprpwr);
          break;

        case ("splendorous",
        "sly",
        "cunning",
        "astute",
        "crafty",
        "clever",
        "devious"):
          return "😼";
          break;

        case ("lethal",
        "dangerous",
        "malicious",
        "cattish",
        "wicked",
        "mischievous"):
          return "🐱‍👤";
          break;

        case ("surprised", "scared", "afraid"):
          return "🙀";
          break;

        case ("heroic", "brave", "hero", "strong"):
          return "🐱‍🏍";
          break;

        case ("adventurous", "intrepid"):
          return "🐱‍🚀";
          break;

        case ("cat", "feline", "catlike", "gato", "gatuno", "felino", "neko"):
        default:
          return "🐈";
          break;
      }
    };

    console.log(mood("devious"));
    /* --- callbacks test 02 --- */

    //console.log("classList: ", btnBuy.classList);

    arrForms.every((form) => {
      // form.classList.add("was-validated");
      //<--- SEjiR CON EVERY
      /* return */ console.log("every form checkValidity: ");
    });
    /* --- fin validacion array.from, every --- */

    /* --- test .every() --- */
    /* const arrMixedEvery = [
      1,
      false,
      "xd..",
      {
        name: "plastiquito",
        class: "machinist",
        level: 50,
        _weapons: ["sub-rifle", "explosives", "drone", "cyber-suit"],
        isDangerous: true,
      },
      null,
      undefined,
    ];

    const arrSameTypeEvery = [false, false, true, false];

    arrSameTypeEvery.every((element) => {
      console.log("typeOf: ", typeof element === "boolean");
    }); */
    /* --- fin test .every() --- */

    /* --- validacion original --- */
    /* allForms.forEach((form) => {
      // form.submit();
      if (!form.checkValidity()) {
        //click.preventDefault();
        //click.stopPropagation(); //<--- son necesarios ?
      }
      //console.log(form);
      form.classList.add("was-validated");

      /* if (form.checkValidity()) {
        //<--- POR QUE NO LO AGARRA(NULL)???
        alertPurchaseSuccesful.classList.replace("d-none", "d-block");
      } /
      if (form.checkValidity()) {
        alertPurchaseSuccesful.classList.replace("d-none", "d-block");
      }
    }); */
    /* --- fin validacion original --- */

    /* --- validacion v2 cada elemento individual --- */
    const arrValidities = [];
    allForms.forEach((form, i) => {
      // form.submit();

      form.classList.add("was-validated");
      console.log(`form-${i} checkValidity: ${form.checkValidity()}`);
      return arrValidities.push(form.checkValidity());

      /* if (!form.checkValidity()) {
        //click.preventDefault();
        //click.stopPropagation(); //<--- son necesarios ?
      }
      //console.log(form);

      /* if (form.checkValidity()) {
        //<--- POR QUE NO LO AGARRA(NULL)???
        alertPurchaseSuccesful.classList.replace("d-none", "d-block");
      } /
      if (form.checkValidity()) {
        alertPurchaseSuccesful.classList.replace("d-none", "d-block");
      } */
    });
    console.log("arrValidities: ", arrValidities);

    const arrBooleansTest = [true, true, true];
    console.log(
      "arrBooleansTest every: ",
      arrBooleansTest.every((formValidity) => {
        return formValidity === true;
      })
    );

    console.log(
      "arrValidities reduce: ",
      /* arrValidities */ arrBooleansTest.reduce(
        (previousValue, currentValue) => {
          return previousValue && currentValue;
        }
      )
    );
    /* --- fin validacion v2 cada elemento individual --- */
  };
  /* --- fin btnBuy.onclick eventListener --- */

  //console.log(allForms);

  /* --- fetch GET users --- */
  console.log(
    "fetchDataGET: ",
    await fetchData(
      "https://dummyjson.com/users?limit=5&skip=3&select=id,firstName,lastName,age"
    )
  );
  /* --- fin fetch GET users --- */

  /* --- fetch PUT user --- */
  console.log(
    "fetchDataPUT: ",
    await fetchData("https://dummyjson.com/users/5", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "LEE",
        lastName: "THAL 🔪",
        age: 450,
        image: "〒▽〒",
      }),
    })
  );
  /* --- fin fetch PUT users --- */

  /* --- fetch POST user --- */
  console.log(
    "fetchDataPOST: ",
    await fetchData("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "NINJA",
        lastName: "CAT",
        age: "?",
        hair: {
          color: "BLACK",
        },
        image: "🐱‍👤",
        gender: undefined,
      }),
    })
  );
  /* --- fin fetch POST user --- */

  /* --- fetch DELETE user --- */
  console.log(
    "fetchDataDELETE: ",
    await fetchData("https://dummyjson.com/users/4", {
      method: "DELETE",
    })
  );
  /* --- fin fetch DELETE user --- */
});
/* --- fin DOMContentLoaded --- */

/* --- custom function fetch --- */
const fetchData = async (url, methodHeadersBody) => {
  /* if (methodHeadersBody) {
 const { method, headers, body } = methodHeadersBody;
  }  */

  /* const methodToUse = method !== 'GET'? JSON.parse(method) : JSON.stringify(method); */

  /*  if (methodHeadersBody !== undefined && methodHeadersBody.method !== "GET") {
    JSON.stringify(methodHeadersBody.body);
  } */
  const fetchResponse = await fetch(
    url,
    methodHeadersBody /* {methodToUse, headers, body} */
  );
  try {
    if (fetchResponse.ok) {
      return await fetchResponse.json();
    }
    throw new Error(
      "URL incorrecta, Respuesta del servidor: " +
        fetchResponse.status +
        ": " +
        fetchResponse.statusText +
        " (╯°□°）╯︵ ┻━┻"
    );
  } catch (error) {
    console.error(error);
    return error;
  }
};

/* const fetchCustomFunctionResponse = fetchData(
  "https://dummyjson.com/products/"
); */
/* --- fin custom function fetch --- */
/* --- fetch json placeholder/dummy --- */
/* fetch("https://dummyjson.com/products/")
  .then((res) => res.json())
  .then((json) => console.log(json)); */

/* const dataFetched = fetch("");
return new Promise((resolve, reject) => {})
  .then((result) => {})
  .catch((err) => {}); */
/* --- fin fetch json placeholder/dummy --- */

/* --- pruebas async --- */
/* const forFunction = async (param) => {
if (await param === undefined) {
  
}

  for (const index = 0; index < 1000000; index++) {}

  const promiseAll = Promise.all([a, b])
  .then()

}; */
/* --- pruebas async --- */
