const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const multer = require("multer");
const { handleUpload } = require("./cloudinary");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { cars, size } = require("./models");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

const sizeMap = {
  small: 1,
  medium: 2,
  large: 3,
};

// create new car data
app.post("/cars", upload.single("image"), handleUpload, (req, res) => {
  cars
    .create({
      image: req.photo.secure_url,
      rentPerDay: parseInt(req.body.rentPerDay),
      name: req.body.name,
      sizeId: sizeMap[req.body.size.toLowerCase()],
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
});

// update car data
app.put("/cars/:id", upload.single("image"), handleUpload, (req, res) => {
  cars
    .update(
      {
        image: req.photo.secure_url,
        rentPerDay: parseInt(req.body.rentPerDay),
        name: req.body.name,
        sizeId: sizeMap[req.body.size.toLowerCase()],
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
});

// get cars data
app.get("/cars", (req, res) => {
  const options = { include: size };

  if (req.query.size) {
    options.where = {
      sizeId: sizeMap[req.query.size.toLowerCase()],
    };
  }

  cars
    .findAll(options)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
});

// get car data based on id
app.get("/cars/:id", (req, res) => {
  cars
    .findByPk(req.params.id, { include: size })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
});

app.delete("/cars/:id", (req, res) => {
  cars
    .destroy({ where: { id: parseInt(req.params.id) } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
