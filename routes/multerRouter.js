const multer = require("multer");
const path = require("path");

//TIPOS DE ARCHIVOS ACEPTADOS
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

//SUBIDA DE IMAGENES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/imgs/");
  },
  filename: (req, file, cb) => {
    const extension = MIME_TYPES[file.mimetype];
    cb(null, `${new Date().toISOString().replace(/:/g, "-")}.${extension}`);
  },
});
module.exports = multer({
  storage: storage,
});
