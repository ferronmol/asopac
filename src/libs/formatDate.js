export const formatDate = (date) => {
  if (date) {
    //utc -2
    const utcMinusTwoHours = new Date(date.getTime() - 2 * 60 * 60 * 1000);
    const day = String(utcMinusTwoHours.getDate()).padStart(2, "0");
    const month = String(utcMinusTwoHours.getMonth() + 1).padStart(2, "0");
    const year = utcMinusTwoHours.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return null;
};
