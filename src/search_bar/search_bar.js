/* --- DOMContentLoaded --- */
document.addEventListener("DOMContentLoaded", () => {
  const btnSearch = document.querySelector("#btn-search");
  // Buscar en product.html, categories.html, etc.
  /* --- btnSearch click --- */
  btnSearch.addEventListener("click", () => {
    const navInptSearch = document.querySelector("#nav-inpt-search");
    const navInptSearchRegExp = new RegExp(navInptSearch.value, "gi");
    //const navInptSearchRegExp = `/${navInptSearch.value}/gi` <-- NO FUNCIONA;

    const productsTitleAndDescription = document.querySelectorAll(
      "[id*=title-], [id*=product-description-]"
    );
    const prodTitleAndDesc = document.querySelector("#product-description-0");

    /* --- match search.value convertido a regexp --- */
    console.log("navInptSearchRegExp: ", navInptSearchRegExp);
    console.log(
      "prodTitleAndDesc.innerText.match(navInptSearch.value): ",
      prodTitleAndDesc.innerText.match(navInptSearchRegExp)
    );
    /* --- fin match search.value convertido a regexp --- */

    /* --- nodelist titulo y descripcion productos --- */
    productsTitleAndDescription.forEach((prod_title_and_desc) => {
      console.log(prod_title_and_desc.innerText.match(navInptSearch.value));
    });
    console.log("productsTitleAndDescription: ", productsTitleAndDescription);
    /* --- fin nodelist titulo y descripcion productos --- */

    /* --- array from nodelist titulo y descripcion productos --- */
    const arrProductsTitleAndDescription = Array.from(
      productsTitleAndDescription
    );

    console.log(
      "arrProductsTitleAndDescription: ",
      arrProductsTitleAndDescription
    );
    /* --- fin array from nodelist titulo y descripcion productos --- */

    /* --- matchAll --- */
    const matchStr = navInptSearch.value.matchAll(/usd/gi);
    console.log("matchAll :", matchStr);
    for (const iterator of matchStr) {
      console.log("matchAll :", iterator);
    }
    /* --- fin matchAll --- */

    /* --- exec --- */
    const execStr = /usd/gi.exec(navInptSearch.value);
    console.log("execStr :", execStr);
    /* --- fin exec --- */
  });
  /* --- fin btnSearch click --- */
});
/* --- fin DOMContentLoaded --- */
