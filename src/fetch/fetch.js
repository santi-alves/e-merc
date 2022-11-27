/* --- custom function fetch --- */
export const fetchData = async (url, methodHeadersBody) => {
  const fetchResponse = await fetch(url, methodHeadersBody);
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
    //console.error(error);
    return error;
  }
};
/* --- fin custom function fetch --- */
