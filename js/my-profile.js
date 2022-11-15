const getDataLocal = (dataName) => {
  return JSON.parse(localStorage.getItem(dataName));
};

/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", (dmcntld) => {
  const frmUserProfile = document.querySelector("#frm-user-profile");
  const inptEmail = document.querySelector("#inpt-email");
  const inptFirstName = document.querySelector("#inpt-first-name");
  const inptSecondName = document.querySelector("#inpt-second-name");
  const inptFirstLastname = document.querySelector("#inpt-first-lastname");
  const inptSecondLastname = document.querySelector("#inpt-second-lastname");
  const inptPhone = document.querySelector("#inpt-phone");
  const inptUserImage = document.querySelector("#inpt-user-image");
  const btnSaveChanges = document.querySelector("#btn-save-changes");

  const userImage = document.querySelector("#user-img");

  const userData = getDataLocal("userData");

  const showDataOnUI = (dataObj) => {
    if (dataObj !== null) {
      const {
        firstName,
        secondName,
        firstLastname,
        secondLastname,
        email,
        phone,
        image,
      } = dataObj;

      inptFirstName.value = firstName;
      inptSecondName.value = secondName;
      inptFirstLastname.value = firstLastname;
      inptSecondLastname.value = secondLastname;
      inptEmail.value = email;
      inptPhone.value = phone;
      //userImage.src = image; <-- convertir a url
    }
  };

  /* --- funcion verificar primer visita stack overflow --- */
  // let first_visit = false;

  /* function checkFirstVisit() {
    if (localStorage.getItem("was_visited")) {
      return;
    }
    first_visit = true;
    localStorage.setItem("was_visited", 1);
  } */
  /* --- fin funcion verificar primer visita stack overflow --- */

  const checkFirstVisit = () => {
    if (localStorage.getItem("was_visited")) {
      return false;
    }
    localStorage.setItem("was_visited", true);
    return true;
  };

  if (checkFirstVisit()) {
    inptEmail.value = localStorage.getItem("userEmail");
  } else {
    showDataOnUI(userData);
  }

  /* if (first_visit === true) {
    inptEmail.value = localStorage.getItem("userEmail");
  } else {
    showDataOnUI(userData);
  } */

  /* --- submit form --- */
  frmUserProfile.addEventListener("submit", (sbmt) => {
    /* const arrKeys = ["prop_1", "prop_2", "prop_3", "prop_4", "prop_5"];
    const arrValues = [1, 2, 3, 4, 5];

    const assignObjProperties = (arrOfKeys, arrOfValues) => {
      const obj = {};
      arrOfValues.map((value, i) => {
        obj[arrOfKeys[i]] = arrOfValues[i];
      });
      return obj;
    };

    const objResulting = assignObjProperties(arrKeys, arrValues);
    console.log("objResulting: ", objResulting); */

    const userData = {};

    userData.firstName = inptFirstName.value;
    userData.secondName = inptSecondName.value;
    userData.firstLastname = inptFirstLastname.value;
    userData.secondLastname = inptSecondLastname.value;
    userData.email = inptEmail.value;
    userData.phone = inptPhone.value;
    userData.image = inptUserImage.value;

    /* --- Validacion formulario --- */
    const checkFormValidity = (formToCheck) => {
      if (!formToCheck.checkValidity()) {
        formToCheck.classList.add("was-validated");
      }
      return formToCheck.checkValidity();
    };
    checkFormValidity(frmUserProfile);
    // console.log("checkFormValidity(): ", checkFormValidity(frmUserProfile));

    const storeDataLocal = (dataName, data, frmChecker) => {
      if (frmChecker) {
        return localStorage.setItem(dataName, JSON.stringify(data));
      } else {
        return false;
      }
    };
    storeDataLocal("userData", userData, checkFormValidity(frmUserProfile));
    // console.log("storeDataLocal(): ", storeDataLocal("userData", userData, checkFormValidity(frmUserProfile)));
    /* --- fin Validacion formulario --- */
  });
  /* --- fin submit form --- */
});
/* --- fin DOMContentLoaded --- */

/* --- funcion imagen perfil internet (revisar) --- */
/* console.log(".png, .jpg, jpeg".match(".jpg"));
function readImage(file) {
  // Check if the file is an image.
  if (
    file.type &&
    !file.type.includes(".png, .jpg, .jpeg") /* startsWith('image/') /
  ) {
    console.log("File is not an image.", file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    /* img / userImage.src = event.target.result;
  });
  reader.readAsDataURL(file);
} */
/* --- fin funcion imagen perfil internet (revisar) --- */
