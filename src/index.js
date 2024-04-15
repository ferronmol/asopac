import app from "./app.js";
import { connect } from "./db.js";

const PORT = process.env.PORT || 9000;

connect();
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
