const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

//Ajouter folder pou fichiers yo sil pat egziste deja
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  // Ajouter non ki deye fichier an tnkou .jpeg , .png ...
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//Pou filtre fichier wap voye ale yo si yo c png oubyn jpeg
const fileFilter = function (req, file, cb) {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });
//Pran fichier an epi transfomel en yon URL
app.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("connected");
});

port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log("Server connected succesfully");
});
