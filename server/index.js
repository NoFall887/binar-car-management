const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const multer = require("multer");
const { handleUpload } = require("./cloudinary");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { cars } = require("./models");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

const list = [
  {
    id: 1,
    name: "Ferrari",
    rentPerDay: 200000,
    size: "small",
    updatedAt: new Date(),
    image:
      "https://cdn1-production-images-kly.akamaized.net/xYZbzQjOOEb6btW-ckQmg0aPxYA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2820664/original/096463900_1559315929-Ferrari_hybrid.jpg",
  },
  {
    id: 2,
    name: "Ferrari",
    rentPerDay: 200000,
    size: "small",
    updatedAt: new Date(),
    image:
      "https://cdn1-production-images-kly.akamaized.net/xYZbzQjOOEb6btW-ckQmg0aPxYA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2820664/original/096463900_1559315929-Ferrari_hybrid.jpg",
  },
  {
    id: 3,
    name: "Ferrari",
    rentPerDay: 200000,
    size: "small",
    updatedAt: new Date(),
    image:
      "https://cdn1-production-images-kly.akamaized.net/xYZbzQjOOEb6btW-ckQmg0aPxYA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2820664/original/096463900_1559315929-Ferrari_hybrid.jpg",
  },
  {
    id: 4,
    name: "Ferrari",
    rentPerDay: 200000,
    size: "small",
    updatedAt: new Date(),
    image:
      "https://cdn1-production-images-kly.akamaized.net/xYZbzQjOOEb6btW-ckQmg0aPxYA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2820664/original/096463900_1559315929-Ferrari_hybrid.jpg",
  },
  {
    id: 5,
    name: "Ferrari",
    rentPerDay: 200000,
    size: "small",
    updatedAt: new Date(),
    image:
      "https://cdn1-production-images-kly.akamaized.net/xYZbzQjOOEb6btW-ckQmg0aPxYA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2820664/original/096463900_1559315929-Ferrari_hybrid.jpg",
  },
];

const sizeMap = {
  small: 1,
  medium: 2,
  large: 3,
};

app.post("/cars", upload.single("photo"), handleUpload, (req, res) => {
  console.log(req.body);
  cars
    .create({
      image: req.photo.secure_url,
      rentPerDay: parseInt(req.body.rent),
      name: req.body.name,
      sizeId: sizeMap[req.body.size.toLowerCase()],
    })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
});

app.get("/cars", (req, res) => {
  res.json(list);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
