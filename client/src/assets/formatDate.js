// recibo fecha en formato 2024-05-12T17:24:05.615Z y la convierto a 12/05/2024 17:24

function formatDate(dateObjeto) {
  const date = new Date(dateObjeto);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default formatDate;
