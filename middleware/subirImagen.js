import multer from "multer";
import path from "path";
import { generarId} from "../helpers/tokens.js";

const storage = multer.diskStorage({
  // Configurar el destino y nombre del archivo, donde se va guardar
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, generarId() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;