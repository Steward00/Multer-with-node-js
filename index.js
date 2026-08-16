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
    req.err = "file is not a valid image";
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

//Pran fichier an epi transfomel en yon URL

app.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  if (req.err) {
    return res.status(422).json({ message: req.err });
  }
  res.status(200).json({
    message: "Image uploaded succesfully",
  });
});

//ajouter plusieurs fichiers pour konya li just pou plusieurs pdf
const uploadFiles = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "applicaton/pdf") {
      cb(null, true);
    } else {
      req.err = "file is not .pdf";
      cb(null, false);
    }
  },
});

const uploadFiles = app.post(
  "/files",
  uploadFiles.array("documents"),
  (req, file) => {
    console.log(req.files);
    if (req.err) {
      return res.status(422).json({ message: req.err });
    }
    res.status(200).json({
      message: "Documents uploaded succesfully",
    });
  },
);

port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log("Server connected succesfully");
});
