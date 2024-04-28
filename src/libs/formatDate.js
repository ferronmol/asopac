export const formatDate = (date) => {
  if (date) {
    //utc -2  Madrid
    const utcMinusTwoHours = new Date(date.getTime() - 2 * 60 * 60 * 1000);
    const day = String(utcMinusTwoHours.getDate()).padStart(2, "0");
    const month = String(utcMinusTwoHours.getMonth() + 1).padStart(2, "0");
    const year = utcMinusTwoHours.getFullYear();
    const hour = String(utcMinusTwoHours.getHours()).padStart(2, "0");
    const minute = String(utcMinusTwoHours.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
  return null;
};
