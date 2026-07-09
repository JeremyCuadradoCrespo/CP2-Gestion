import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`ContactFlow V2 API escuchando en el puerto ${PORT}`);
});
