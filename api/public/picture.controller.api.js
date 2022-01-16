const fs = require("fs");
const pictureService = require('../../services/admin.picture.service');
const userService = require('../../services/admin.user.service');
module.exports.getImageOfMobile = async (req, res) => {
  const { id } = req.params;
  const photo = await pictureService.getAvatarPictureByProductId(id);
  let img = __dirname + photo.link.slice(4);
  fs.access(img, fs.constants.F_OK, err => {
    console.log(`${img} ${err ? "does not exist" : "exists"}`);
  });

  fs.readFile(img, function (err, content) {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>No such image</h1>");
    } else {
      res.writeHead(200, { "Content-type": "image/jpg" });
      res.end(content);
    }
  });
}
module.exports.getImage = async (req, res) => {
  const { id } = req.params;
  let img = __dirname + `/uploads/products/${id}`;
  fs.access(img, fs.constants.F_OK, err => {
    console.log(`${img} ${err ? "does not exist" : "exists"}`);
  });

  fs.readFile(img, function (err, content) {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>No such image</h1>");
    } else {
      res.writeHead(200, { "Content-type": "image/jpg" });
      res.end(content);
    }
  });
}
module.exports.getAvatarOfUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findUserById(id);
  const link = user.avatar?.substring(0, 3) === "api" ? user.avatar?.slice(4) : null;
  let img = __dirname + link;
  fs.access(img, fs.constants.F_OK, err => {
    console.log(`${img} ${err ? "does not exist" : "exists"}`);
  });

  fs.readFile(img, function (err, content) {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>No such image</h1>");
    } else {
      res.writeHead(200, { "Content-type": "image/jpg" });
      res.end(content);
    }
  });
}
