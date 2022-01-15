
const productService = require("../../../services/admin.product.service");
const specificationService = require("../../../services/admin.specification.service");
const brandService = require("../../../services/admin.brand.service");
const pictureService = require("../../../services/admin.picture.service");



exports.productList = async (req, res) => {


  const data = req.query;

  const page = parseInt(data.page) || 1;
  const limit = parseInt(data.limit) || 10;

  //filter
  //Lấy các giá trị filter
  const filter = {
    productId: data.productId,
    productName: data.productName,
    brandId: data.brandId,
    brandName: data.brandName,
    status: ((data.status) === '0') ? undefined : data.status,
    minRating: data.minRating,
    maxRating: data.maxRating,
    minCreatedDate: data.minCreatedDate || new Date(2021, 0, 1),
    maxCreatedDate: data.maxCreatedDate || new Date(),
    // minUpdatedDate: data.minUpdatedDate || new Date(2021, 0, 1),
    // maxUpdatedDate: data.maxUpdatedDate || new Date()
  }



  const brandNames = await brandService.getAllBrandName(true);

  //Lấy products
  const allProducts = await productService.productList(page, limit, filter, true);

  //products
  const products = allProducts.rows;
  //Số lượng các products
  const count = allProducts.count;

  for (let product of products) {
    const id = product.id;
    const picture = await pictureService.getAvatarPictureByProductId(id);
    product.picture = picture;
  }

  const pagination = {
    page: page,
    limit: limit,
    totalRows: count
  }
  // res.render('admin/product/productList', { title: 'Product List', layout: 'admin/layout.hbs', products, pagination, filter, brandNames});

  res.json(products);
}

// exports.specificationList = async (req, res) => {
//
//
//     // const page = undefined;
//     // const limit = undefined;
//
//     //Lấy products
//     const allSpecifications = await specificationService.specificationList();
//
//     //products
//     const specifications = allSpecifications.rows;
//     //Số lượng các products
//     const count = allSpecifications.count;
//
//     res.json(specifications);
// }
