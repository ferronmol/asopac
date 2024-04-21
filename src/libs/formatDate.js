//Función para devolver las fechas en formato dd/mm/yyyy como un objeto tipo Date que entiende MongoDB

export const formatDate = (date) => {
  if (date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00.000Z`);
  }
  return null;
};
