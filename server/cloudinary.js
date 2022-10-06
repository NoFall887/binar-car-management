const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgmknbm2h",
  api_key: "747897534543522",
  api_secret: "O3M3qaUmj4iV4mZreBDhzoOHRb4",
  secure: true,
});

function handleUpload(req, res, next) {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;
  cloudinary.uploader
    .upload(file)
    .then((res) => {
      console.log(res);
      req.photo = res;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json(err);
    });
}

module.exports = { handleUpload, cloudinary };
