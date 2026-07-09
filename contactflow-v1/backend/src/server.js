import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`ContactFlow V1 API escuchando en el puerto ${PORT}`);
});
